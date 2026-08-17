---
title: "Bugzilla Mail Sending Issue"
date: "2014-07-16"
category: "Linux"
tags: ["Bugzilla", "cpan", "Perl", "Troubleshooting"]
excerpt: "Lately an issue was assigned to me where Bugzilla Email notification failed with an 504 gateway timed out error. We use gmail service for sending..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgMuNWl5viJkCSwxzfJUodpgh0ORdGTJDls8YFwJveddR827Tf2tKCo7TvSAEHWG3hODU1auN1vzswYFShIgxwYGs1nN5ipoI8GRRl2-Y_JoLrgCVqWATuUCRyJtZ1MzdVJwfqzvCacG-k/s1600/bugzilla.jpeg)

Lately an issue was assigned to me where Bugzilla Email notification failed with an 504 gateway timed out error. We use gmail service for sending mails.

After checking the configuration everything seemed to be just fine, except the email was not getting sent and while updating any issue in Bugzilla a 504 error was sure to come.

After a little debugging we got rid of 504 by disabling Email service, but this was not quiet what we wanted. After googling a bit I got to know Bugzilla did not support Gmail as SMTP earlier, but now it did and that we need to install a few external packages for this. I found a tonne of articles with some misleading information or I don't know if I was doing something wrong there.

I applied [this](https://bug466419.bugzilla.mozilla.org/attachment.cgi?id=552569) patch 1st in the Bugzilla setup directory.

patch < mypatchfile

I first installed Net-SMTP-SSL package after reading a few blogs with CPAN Shell

perl -MCPAN -e shell

cpan> install Net::SMTP::SSL

./checksetup.pl

Check for Net-SMTP-SSL (v1.01)     ok: found v1.01

Later I tried sending notifications with SMTP in Administration > Parameters > Email (Many articles say that you will see a Gmail option or TLS option, however after installing many packages I didn't see any of those. I was unable to send a mail with SMTP even after many trails.

I finally switched to Sendmail, there was a delay but the mail was getting sent now. But the old problem was still there. Every time you update an issue, you get a 504. I suspect that because there was a delay in the mail being sent, the page used to wait for the mail being sent and then show up, but since it was too long, there could be a time-out value either in **Apache or in **Bugzilla config that showed up the 504 page.

Next I chose the option use_mailer_queue to be ON, and started the jobqueue.pl deamon. Now the mails are getting sent with no 504. I still suspect that it might have worked without the Net-SMTP-SSL package too.

## Root Cause Analysis

The actual failure chain was more specific than "Gmail doesn't work." Bugzilla's default mail delivery is synchronous — when you update a bug, the HTTP request handler sends the email inline before returning a response to the browser. Every bug update literally waited for the full SMTP transaction to complete before the page loaded.

Gmail's SMTP introduced its own delays: OAuth handshakes, TLS negotiation, and authentication checks that added several seconds to each transaction. Apache had a proxy timeout configured (the default is often 60 seconds), and when the combined delay of Bugzilla's synchronous mail call plus Gmail's SMTP latency pushed past that timeout, Apache killed the connection and returned the 504 to the browser — even though Bugzilla was still running and hadn't crashed.

The `use_mailer_queue` setting breaks this dependency. Instead of sending email inline during the HTTP request, Bugzilla writes the outgoing message to a queue table in its database and immediately returns the HTTP response. A separate background process (`jobqueue.pl`) reads from that queue and handles actual delivery asynchronously. HTTP response time is decoupled from email delivery time, so no amount of SMTP latency can cause a 504.

The Sendmail switch was also relevant: Sendmail hands off to the local mail transfer agent immediately and returns, rather than waiting for the full SMTP transaction. Combined with the job queue, delivery became genuinely asynchronous and the 504s stopped entirely.

## Key Bugzilla Email Settings to Understand

All of these live in Administration > Parameters > Email:

- `mail_delivery_method`: Controls the transport. `SMTP` uses direct SMTP (subject to the latency problems described above), `Sendmail` invokes the local MTA, and `Test` writes emails to a log file instead of delivering them. Test mode is underrated for debugging — it lets you confirm that Bugzilla is generating the right email content without needing a working mail server.
- `use_mailer_queue`: When set to ON, outgoing emails are written to a database queue table and delivered by `jobqueue.pl` in the background. This is what fixed the 504 issue. Should be ON in any production setup with any mail delivery method.
- `smtp_timeout`: How many seconds Bugzilla waits for an SMTP server to respond before giving up. Increasing this value can help with slow SMTP servers but doesn't fix the fundamental problem — you're still blocking the HTTP request. Raising the timeout just makes the 504 take longer to appear.

## Running jobqueue.pl Reliably

The daemon needs to be running continuously for queued email to get delivered. During debugging you can run it manually to test the queue:

```bash
# Check if it's running
ps aux | grep jobqueue

# Run it manually for testing
perl /var/www/html/bugzilla/jobqueue.pl start

# Set up as a cron job for reliability (not ideal but common)
*/5 * * * * perl /var/www/html/bugzilla/jobqueue.pl start 2>/dev/null
```

The cron approach is a stopgap — it's common, but it means emails can sit in the queue for up to five minutes if the daemon exits unexpectedly, and you won't notice the daemon is down unless you're watching the queue depth. For production, run it as a proper systemd service:

```ini
[Unit]
Description=Bugzilla Job Queue
After=network.target

[Service]
ExecStart=/usr/bin/perl /var/www/html/bugzilla/jobqueue.pl foreground
Restart=always
User=apache

[Install]
WantedBy=multi-user.target
```

Save this to `/etc/systemd/system/bugzilla-jobqueue.service`, then enable and start it with `systemctl enable --now bugzilla-jobqueue`. systemd handles restart-on-failure automatically via the `Restart=always` directive, and `journalctl -u bugzilla-jobqueue` gives you centralized logs alongside everything else on the system.

## Preventing This in Future Setups

If you're setting up Bugzilla fresh, enable `use_mailer_queue` during initial configuration before any users are on the system. Don't wait for the 504s to appear in production — they will, eventually, and debugging SMTP issues under pressure is worse than getting it right upfront.

For the SMTP provider itself, Gmail is convenient but fragile for application mail. Transactional email services like Mailgun, SendGrid, or AWS SES are built for this use case: higher rate limits, dedicated IP reputation, bounce and complaint handling, and delivery logs you can actually use for debugging. The authentication is simpler too — API key or SMTP credentials without OAuth complexity.

See the [Bugzilla email configuration docs](https://bugzilla.readthedocs.io/en/latest/administering/parameters.html#email) for the complete parameter reference and current recommendations.
