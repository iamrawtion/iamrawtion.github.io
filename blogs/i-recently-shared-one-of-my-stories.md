---
title: "Second Place Story : Server ghouls haunt bulk ingestion"
date: "2013-11-03"
category: "Programming"
tags: ["Server", "Storage", "Troubleshooting"]
excerpt: "Some rights reserved by Julie Rybarczyk I recently shared one of my stories while monitoring an Ingestion Server with AppFirst for one of the..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHkXCfyNHTRUA1SrYS1UpDmrku0fP0iVUpcrPVM3pZuE0UGWO7_eSGWrqkEmxf0weIo62K6FpneKbNlaMumUt_Ds3d0-CEJK74hbcZhxtATlnTPMPw-hreOUZuXoinjFg4ZWwzTgcKDmE/s1600/5096035675_fbc69eac8f_m.jpg)

Some rights reserved by [Julie Rybarczyk](https://www.flickr.com/photos/48424574@N07/)

I recently shared one of my stories while monitoring an Ingestion Server with [AppFirst](http://www.appfirst.com/) for one of the Halloween contest they conducted. Thankfully, won 2nd prize in the same. Sharing the same story here along with the [link](http://www.appfirst.com/blog/halloween-infographic-and-horror-story-winners/) to visit.

Second Place Story

## Server ghouls haunt bulk ingestion

## Company: Roshvert

## I was suppose to monitor an Ingestion Server that was performing a

bulk ingestion through an EC2 instance with around 200 GB of data to be
ingested to another server.
Since it was a huge amount of data and the ingestion would take
another day to complete, I kept the ingestion going and the logs were
performing well. I decided then that I’d log in early tomorrow morning
to check the ingestion status. During this time, the log files were
supposed to be created automatically through the ingestion and the name
of the log file for any particular day should be log_dd-mm-yyyy.txt with
date of that day mentioned. It was a staging server and the code was
supposed to be supplied for UAT in a day or two.
I logged in early the next morning to check the ingestion status. I
was totally puzzled as I couldn’t make out what was happening:

- The log file for the previous day log_27-08-2013.txt was showing

  everything went well until 11pm midnight and no logs thereafter.

- The log file for today log_28-08-2013.txt got created with no data in it.
- The ingestion process was running with no errors.
- The server logs showed no errors.
- The system never went down.
- Nearly 150 GB of data was still to be ingested and was not progressing at all.
- None of the logs showed any updates as to why the ingestion was not progressing.

---

## Since the delivery was urgent, I stopped the ingestion on the

instance and restarted it. To my horror, the ingestion was not
progressing at all. I tried running ingestion on other instances, and it
worked fine.
Then something hit me, and I went back to check the logs of
ingestion. The ingestion logs still showed nothing with 0 kb space used
by the logs. Wait!!! Space? 0kb? 150 GB data still remaining?
I immediately checked the disk space and found zero space available. Whoaa!!!
What actually happened is while performing the ingestion, the server
created a duplicate copy of the data on the same instance, and until the
entire ingestion completes, this data used to remain there. Around 250
GB of disk space was used by ingestion by midnight and the disk was
full. I immediately attached a bigger volume to the instance and
restarted the ingestion. Thankfully it was complete in a few hours and
that saved me from a big trouble!!!

## What Actually Caused This

The root cause was straightforward once I had visibility into what happened: the ingestion process had no pre-flight check for available disk space before starting. It assumed the disk would be large enough to hold both the source data and the temporary working copy it created during processing. The duplicate was not a bug in the application logic — it was an intentional intermediate artifact that would have been cleaned up automatically after ingestion completed. The problem was that nobody asked the question "will this fit?" before kicking it off.

When the disk filled at midnight, the ingestion process kept running — no crash, no abort, no error returned to the caller. Writes to the log file silently failed because there was no space left to write them either. That's why the logs showed nothing after 11pm. The application was alive but completely stuck, with no way to tell that from the outside.

## The Monitoring Gap

Here's the part that bothered me more than the disk filling: the real failure wasn't the disk running out of space. A full disk is a recoverable situation — attach a bigger volume and restart. The failure was not knowing it was happening until the next morning.

Proper monitoring would have alerted at 80% disk utilization, hours before midnight, with enough time to either expand the volume or reschedule the job. Instead, every layer of visibility was missing:

- No disk space alert existed on the instance
- The application didn't log an error when writes failed — it just dropped them silently
- The ingestion process didn't report its progress in any way that could be polled or monitored externally

This is a textbook observability gap. The system was running but not healthy, and there was no mechanism to tell the difference from outside the process. A monitoring dashboard showing "EC2 instance: running" tells you almost nothing useful about a long-running batch job.

## How to Prevent This

Three fixes, applied in layers:

**Pre-flight disk space check** — add this at the top of the ingestion script before any processing begins:

```bash
AVAILABLE=$(df -BG /data | awk 'NR==2 {gsub("G",""); print $4}')
REQUIRED=250  # GB needed for data + working copy
if [ "$AVAILABLE" -lt "$REQUIRED" ]; then
    echo "Insufficient disk space: ${AVAILABLE}G available, ${REQUIRED}G required"
    exit 1
fi
```

Fail fast and loud before the job starts. A pre-flight check that takes two seconds saves you from discovering the problem eight hours in.

**Disk utilization monitoring** — a simple cron-based alert as a minimum:

```bash
# Alert if disk > 80% full
USAGE=$(df / | awk 'NR==2 {gsub("%",""); print $5}')
if [ "$USAGE" -gt 80 ]; then
    echo "DISK ALERT: / is ${USAGE}% full" | mail -s "Disk Alert" ops@company.com
fi
```

But for any serious environment, use a proper monitoring stack. [Prometheus node_exporter](https://github.com/prometheus/node_exporter) exposes `node_filesystem_avail_bytes` and `node_filesystem_size_bytes` metrics that you can alert on with Alertmanager. A `disk_used_percent > 80` alert rule with a 5-minute evaluation window is the standard approach and takes about 10 minutes to configure once node_exporter is running.

**Application-level progress logging** — the ingestion process should log periodically throughout its run: bytes processed, percentage complete, estimated time remaining. Not just at the start and end. If a job runs for 8 hours and only logs at completion, you have no way to detect a stall or a slowdown until it's too late. Even a simple "processed X of Y records" every 5 minutes gives you something to watch.

## The Lesson That Stayed With Me

This was an early production operations experience, and it shaped how I approach every batch job and data pipeline I've built since. The lesson wasn't "use bigger volumes" — storage is cheap and easy to expand. The lesson was:

Every long-running process needs three things before it touches production:
1. Pre-flight validation — check your assumptions before starting, not during
2. Progress visibility — emit enough signal that you can tell whether the job is healthy or stuck
3. Resource monitoring with alerts — don't rely on humans noticing things manually

A job that runs silently for 8 hours and then fails with no logs is not a job. It's a problem waiting to be discovered at the worst moment — usually at midnight, usually before a delivery deadline. The fix I applied that morning (bigger volume, restart) took 20 minutes. Setting up proper disk monitoring and adding a pre-flight check would have taken an hour. That hour of prevention would have meant I never got the early-morning call in the first place.

For the modern implementation of this kind of alerting, see [Prometheus alerting rules](https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/) — the pattern of defining alert thresholds as code, storing them in version control, and having Alertmanager route them to the right people is the standard approach now and far more reliable than cron-based scripts.
