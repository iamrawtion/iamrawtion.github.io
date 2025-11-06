---
title: "Bugzilla Mail Sending Issue"
date: "2014-07-16"
category: "Linux"
tags: ["Bugzilla", "cpan", "Perl", "Troubleshooting"]
excerpt: "Lately an issue was assigned to me where Bugzilla Email notification failed with an 504 gateway timed out error. We use gmail service for sending..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgMuNWl5viJkCSwxzfJUodpgh0ORdGTJDls8YFwJveddR827Tf2tKCo7TvSAEHWG3hODU1auN1vzswYFShIgxwYGs1nN5ipoI8GRRl2-Y_JoLrgCVqWATuUCRyJtZ1MzdVJwfqzvCacG-k/s1600/bugzilla.jpeg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgMuNWl5viJkCSwxzfJUodpgh0ORdGTJDls8YFwJveddR827Tf2tKCo7TvSAEHWG3hODU1auN1vzswYFShIgxwYGs1nN5ipoI8GRRl2-Y_JoLrgCVqWATuUCRyJtZ1MzdVJwfqzvCacG-k/s1600/bugzilla.jpeg)
  

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

I finally switched to Sendmail, there was a delay but the mail was getting sent now. But the old problem was still there. Every time you update an issue, you get a 504. I suspect that because there was a delay in the mail being sent, the page used to wait for the mail being sent and then show up, but since it was too long, there could be a time-out value either in Apache or in Bugzilla config that showed up the 504 page.

Next I chose the option use_mailer_queue to be ON, and started the jobqueue.pl deamon. Now the mails are getting sent with no 504. I still suspect that it might have worked without the Net-SMTP-SSL package too.