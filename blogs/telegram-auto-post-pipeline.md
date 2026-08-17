---
title: "I built a pipeline to auto-post my Telegram channel everywhere. Then I stopped."
date: "2026-07-26"
category: "DevOps"
tags: ["n8n", "Automation", "AI Agents", "Telegram", "DevOps"]
excerpt: "I tried to build a pipeline that captures posts from my Telegram channel and redistributes them across LinkedIn, Twitter, Instagram, Facebook, and Dev.to automatically. I got most of it working. Then I stopped."
author: "Roshan Nagekar"
---

## The Idea

I have a Telegram channel — [@securedevops](https://t.me/securedevops) — where I post short takes on DevSecOps, AI agents, and automation. The content is already written. I just have to post it everywhere else manually, which I don't.

So I decided to automate it. One post on Telegram, and it goes everywhere: LinkedIn, Twitter, Instagram, Facebook, Dev.to. With ChatGPT reformatting the content for each platform so it doesn't feel copy-pasted.

## What I Built

Built it in n8n. The architecture was straightforward:

1. A webhook catches new posts from the Telegram channel
2. A dedup check makes sure nothing gets posted twice
3. ChatGPT reformats the content for each target platform
4. Posts go out to LinkedIn, Twitter, Instagram, Facebook, Dev.to

The webhook and dedup logic work. The ChatGPT integration works. I never finished the multi-platform posting.

## Where It Broke Down

ngrok.

I used ngrok's free tier to expose the webhook to Telegram. Free tier ngrok gives you a public URL — until you restart your machine. Then the URL changes, and Telegram doesn't know about the new one, so you have to manually re-register the webhook every time.

An automation system that requires daily manual maintenance isn't an automation system. It's a slightly faster manual process.

## The Actual Problem

The ngrok issue is fixable. Buy a static domain, use a VPS, run it on a server that doesn't restart. That's maybe two hours of work.

I didn't do it.

I spent time on the n8n workflow design, the dedup logic, the ChatGPT prompt tuning — all the parts that felt like building something. The part that would make it actually run unattended? I kept putting it off.

This is a pattern I've seen in a lot of DevOps and automation work. Developers gravitate toward the intellectually interesting 20% — the architecture, the AI integration, the clever deduplication — and procrastinate on the unglamorous 80% that determines whether the system operates without you touching it.

Stable endpoints. Persistent processes. Restart recovery. Error alerting. That's the work. That's what makes automation actually automated.

## Where It Stands

The pipeline still exists. It still works — if I manually re-register the webhook after each restart. Which defeats the entire purpose.

I'll probably fix it eventually. Or I'll keep posting manually and tell myself I'll fix it eventually.

Either way, the lesson is the same: the exciting part of automation is not the part that makes it work.

## How to Actually Fix the Endpoint Problem

The ngrok URL problem is genuinely fixable. Here are the options, in order of effort:

1. **Use a VPS with a static IP.** DigitalOcean and Hetzner both have instances starting around $5/month. Run n8n there permanently — no URL changes, no restart issues, and you get a real server you control. This is the most operationally clean option if you're already comfortable managing a Linux box.
2. **n8n Cloud.** Hosted n8n with a stable webhook URL, no infrastructure to manage. You pay a monthly fee, but you get the webhook stability and don't have to think about process management or restarts. If your goal is running the automation, not running the infrastructure, this is the right call.
3. **Cloudflare Tunnel (free).** Cloudflare Tunnel routes traffic from a stable public URL to your local machine without requiring a static IP or opening firewall ports. You get a stable `*.trycloudflare.com` URL, or you can point your own domain at it. The tunnel client runs as a local process — you still need to handle process persistence, but the URL stability problem is solved at no cost.
4. **ngrok paid plan.** Static domain at around $10/month. Lowest friction if you're already using ngrok and just want to pay for the one missing feature.

The right answer depends on how much you value running n8n locally versus the maintenance overhead. For an automation that should run unattended and reliably, a VPS or n8n Cloud is the correct call. The local setup made sense for development and testing. It's not the right substrate for something that's supposed to run while you're not watching.

## The Operational 80% Pattern in DevOps

This pattern — building the interesting core and skipping the operational concerns — is one of the most common causes of abandoned internal tooling. I've seen it in teams, and I've done it myself. The specific things that usually get skipped:

- **Persistent process management**: the tool works when you run it manually, breaks when the server reboots, and nobody notices for three days. A process manager (systemd, PM2, Docker with restart policies) costs maybe an hour to set up and eliminates the problem entirely.
- **Error alerting**: the pipeline fails silently. Posts stop going out. Nobody knows until someone manually checks. A simple alerting mechanism — even just an email when the workflow errors — changes this from a silent failure to a visible one.
- **Idempotency**: running the pipeline twice produces duplicate posts or conflicting state. The dedup logic I built addresses one dimension of this, but idempotency has to be thought through for every step, not just the obvious ones.
- **Monitoring**: no way to know if it's running without manually inspecting the system. If you can't answer "is this thing working right now?" without opening a terminal, it's not really automated.

In professional DevOps work, none of these are optional. A deployment pipeline that works when you're watching it but fails silently at 3am isn't a pipeline — it's a script that occasionally runs. The [n8n documentation](https://docs.n8n.io/) covers webhook configuration and process management for self-hosted deployments; the setup is straightforward once you decide to do it.

The unglamorous 80% is what separates tooling that works from tooling that runs.

## What I'd Build Differently

If I rebuild this pipeline, the architecture changes from the start:

Run n8n on a VPS or use n8n Cloud from day one. The local development setup is fine for testing the workflow logic, but the infrastructure decision should be made before writing the first node, not after. Choosing the wrong substrate early creates rework — everything I built on the assumption of a local ngrok setup would need to be reconsidered for a stable hosted environment.

Add a dead-man's switch: a daily health check that alerts me if the pipeline hasn't processed anything in 24 hours. This is the operational inversion of normal monitoring. Instead of alerting when something fails, you alert when nothing happens — because silence might mean the system is down and nobody knows. For a content distribution pipeline, zero activity for 24 hours is itself anomalous.

Handle platform API failures gracefully. LinkedIn has rate limits. Twitter's API has changed pricing and access tiers multiple times. Instagram's API access for automated posting is restricted. If one platform is down or returns an error, the pipeline shouldn't fail the whole batch — it should log the failure, skip that destination, and continue. Partial success is better than total failure.

Keep a posting log. A simple record of what went out, when, and to which platform makes the system auditable. If something gets posted twice, or a post goes missing, you can trace it. Without a log, you're debugging from memory.

The dedup logic I built first was the right instinct — preventing duplicate posts matters and it's easy to miss. I just needed to close the loop on the infrastructure before moving on to the next interesting problem.
