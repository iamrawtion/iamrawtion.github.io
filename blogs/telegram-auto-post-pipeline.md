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
