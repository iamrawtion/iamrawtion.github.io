---
title: "Getting Into DevOps: Notes and Job Research"
date: "2012-10-18"
category: "DevOps"
tags: ["DevOps", "Linux", "Chef", "Puppet", "Career"]
excerpt: "Putting together my notes on what DevOps actually means and what I need to learn. Going through job postings, bookmarking resources, mapping the tool landscape."
author: "Roshan Nagekar"
---

*Putting together my notes on what DevOps actually means and what I need to learn. Going through job postings, bookmarking resources, mapping the tool landscape.*

---

## The Tool List

Every job posting I read mentions some combination of these. Building a list of things to get familiar with:

**Version control:**
Git, SVN, Mercurial — Git seems to be winning, but SVN still shows up a lot.

**Configuration management:**
Puppet / Puppet Enterprise, Chef, Cfengine, MCollective — these keep appearing together. Chef and Puppet seem to be the two main ones. Started reading through this RightScale Chef tutorial: http://support.rightscale.com/12-Guides/Chef_Cookbooks_Developer_Guide/02-Getting_Started/02-Beginner_Chef_Tutorial

**Testing / CI:**
Cucumber, Hudson/Jenkins — Hudson and Jenkins seem to be the same project that split. Need to understand this better.

**Monitoring:**
Ganglia/Cacti/Munin, Nagios, Zenoss — monitoring keeps showing up as a hard requirement, not just a nice-to-have.

**Other:**
Vagrant — useful for local dev environments, need to try this.

---

## Where the Community Is

If I'm going to learn this stuff, I need to be where the practitioners are. Keeping a list:

**In-person:**
- DevOps Days
- PuppetConf
- Velocity Conference

**Online:**
- IRC
- serverfault.com and Stack Overflow for Q&A
- Reddit, Slashdot for news
- LinkedIn groups
- Vendor and open source mailing lists
- Blogs and Twitter — need to find the right people to follow

---

## What Companies Are Actually Asking For

Going through job postings to understand what the market looks like. A few patterns:

**The core DevOps / Linux infrastructure role** shows up consistently with:
- Linux is non-negotiable — listed as mandatory almost everywhere
- Config management: Chef or Puppet, sometimes both
- CI tools: Jenkins/Hudson/TeamCity/Go
- Monitoring: Nagios, Zenoss, Cacti
- Scripting: Shell is baseline, Ruby and Python come up a lot
- Cloud: OpenStack, AWS, Rackspace — not always required but increasingly mentioned
- Virtualisation: VMware/vSphere, Xen, KVM, VirtualBox

The interesting ones describe the role as bridging dev and ops — understanding what developers need and building the infrastructure and tooling around that. ThoughtWorks had a posting that framed it this way: understand client needs across ops and dev, build solutions around continuous delivery, infrastructure strategy, and release management. Hands-on, not just advisory.

**SCM and build tools** keep appearing together:
- SCM: Git, SVN, Mercurial, Perforce
- Build: Ant, Rake, NAnt
- These feel like basics I should already have — partial check on Git and SVN from last year's notes.

**Ruby / Rails comes up more than I expected** in DevOps-adjacent roles. Some postings want config management (Chef is Ruby-based) plus actual Rails development ability. Not purely infra — they want someone who can also build and ship code.

**Big Data is starting to appear** — Hadoop, Hive, Pig, HBase, Oozie. Mostly in separate Data Engineering roles but sometimes bundled into broader "infrastructure + data" descriptions. Java and Python listed as required. This feels like a different track.

---

## Gaps I Need to Close

Honest list of what I don't know well enough yet:

- **Chef** — need to actually work through a cookbook end to end, not just read about it
- **Puppet** — same
- **Cloud platforms** — AWS and OpenStack keep appearing; zero hands-on experience so far
- **Ruby** — shows up constantly, both for Chef and for Rails-adjacent roles; need to get past basics
- **CI pipelines** — understand the concept but haven't set up Jenkins end to end
- **Monitoring stack** — Nagios especially; it's listed as a hard requirement in most infra roles

The virtualisation piece feels more manageable — have used VirtualBox and VMware, just need to get comfortable with KVM/Xen terminology.

---

*The picture forming is: Linux + scripting + config management (Chef/Puppet) + CI + monitoring is the core stack. Cloud is becoming a differentiator. The "DevOps" label is being applied to a pretty wide range of roles right now — some are pure infra, some want a developer who also understands ops, some want both.*
