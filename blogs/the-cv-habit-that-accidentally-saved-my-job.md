---
title: "The CV Habit That Accidentally Saved My Job"
date: "2026-09-21"
category: "Cloud"
tags: ["Administration", "AWS", "DevOps", "Documentation"]
excerpt: "Every engineer knows this problem. You switch jobs after a year and a half, sit down to update your CV, and go completely blank. What did I even do all this..."
author: "Roshan Nagekar"
---

Every engineer knows this problem. You switch jobs after a year and a half, sit down to update your CV, and go completely blank. What did I even do all this time? You worked hard, you know you did, but the specifics have evaporated.


That's exactly what happened to me after my first job switch. I worked in a small company, so it wasn't like I had ten different clients with ten different stories to tell. Just one job, multiple responsibilities, and somehow none of it stuck in memory when I needed it most.


So I built a habit. Nothing fancy. Just an Excel sheet. Date, what I worked on that day, two or three lines, status: in progress or done. That's it. No fancy tool, no elaborate system. Just discipline.


It worked exactly as intended. Next time I job-hopped, I knew precisely what I'd built, what I'd learned, what to put on the CV. Simple win.


Then one day, the habit paid off in a way I never expected.


I was the only other DevOps engineer besides my boss, who lived in a different time zone. Over a phone call, he asked me to delete a list of S3 buckets, unused, just sitting there costing money. I did it. And because I'd made note-taking a daily habit by then, I logged it too: deleted these buckets, told they were unimportant.


A few weeks later, the engineering team noticed a monthly report had stopped generating. Nobody knew why. My boss dug in during his hours and found that an important S3 bucket was gone. No CloudTrail back then, no audit log, no way to trace who did what. And it wasn't just the two of us with AWS access, several people in the company had it.


When I came online, he asked me to investigate. I went straight to my Excel sheet. There it was, dated weeks earlier: deleted those buckets, was told to.


That log ended the mystery in minutes. We knew exactly what happened, when, and why. It was human error, not a hack, not malice, just a bucket that should never have been on that delete list. My boss also gave me an important lesson that day: being told to do something doesn't mean you skip verifying it yourself. As a DevOps engineer, that judgment call is on you too.


But the real hero of that day was a habit I'd started for a completely unrelated reason: keeping my CV honest.


I kept that habit for years after. What began as a fix for a bad memory turned into something closer to a safety net. You don't always know which note you write today will matter six months from now. Sometimes it's just for your CV. Sometimes it's the only thing standing between "human error" and "we have no idea what happened."


So here's my question to you: do you keep any kind of daily work log? Not for performance reviews, not because someone told you to, just for yourself. And if you don't, after reading this, would you start?