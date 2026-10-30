---
title: "Finally Found a Local LLM Setup That Seems to be Promising"
date: "2026-10-29"
category: "DevOps"
tags: ["AI Agents", "LLM", "Ollama", "Homelab", "Open Source", "DevOps"]
excerpt: "After multiple failed attempts with local LLMs, I found a setup that actually works for my homelab — Cindy agent, Ollama, and Qwen3-Coder 30B on an M3 Max. Slow but honest."
author: "Roshan Nagekar"
---

## The Bill Problem

I love Claude. I love ChatGPT. I use Gemini too. All three, for work. But at the end of the month, the bills arrive. Like a relative who comes for a day but doesn't want to leave.

For office work, it's fine. But for my personal stuff? My open source projects, homelab setup, random late-night experiments. Paying for every token felt wrong. Especially when I have good machines with decent hardware.

So I wanted a local LLM. On my own machine. No meter running in the background.

I tried. Many times. I tried Cline, Openclaw, and a bunch of other tools I don't even remember now. Every time, same story. Either the tool froze. Or the model told me things that were not true, with such confidence. I felt like talking to an uncle at a wedding about crypto.

Honestly, I gave up. More than once.

## Then Came Cindy

I follow the AI Weekly newsletter. The last issue mentioned Cindy. An open-source AI agent that "works out of the box." I have heard "works out of the box" before so many times that I am no longer amazed to find the box empty now.

So I tried it anyway. And this time, something was different.

A little about Cindy. It's open source, Apache 2.0. It runs on your own machine and works with your real files. You can bring your own model, including a local one. That last part was all I needed to hear.

Then I read the tagline. "Consider it done." Wait. I have heard this before. If you did engineering in Pune, you have too. Syntel used "Consider IT Done" for years. Capital IT, of course. Besides, Syntel and Cindy sounds the same too. Cindy's tagline is "Think it. Consider it done". So I got it set up.

## My Setup

- **Machine** → MacBook Pro, M3 Max, 48 GB unified memory
- **Model runner** → Ollama
- **Model** → Qwen3-Coder 30B
- **Agent** → Cindy

Setup was fairly simple on Mac. Linux is a bit more complex — I am going to do that next:

```bash
# Step 1: Install Ollama and pull the model
ollama pull qwen3-coder:30b
```

Then:

1. Download Cindy from cindy.app.
2. On the login screen, choose **Skip Sign-In**. This runs local agents. No Cindy account needed.
3. Point Cindy to the local Ollama model.

That's it.

## What Did I Use It For?

I have a homelab. A Kubernetes cluster. A monitoring stack. A few hobby apps. Earlier, I used Claude and ChatGPT to keep an eye on them. Now I asked Cindy simple questions:

- Which pods are not running? Did anything restart recently?
- Is my monitoring actually monitoring, or just sitting there looking pretty?
- It also did some administration jobs — SSHing to bare metals, monitoring processes, setting up cron jobs.
- Some internet research and documentation work. Yet to try serious programming.

And here is the surprising part. It does not make things up.

When a pod was down, it said the pod was down. When all was fine, it said all was fine. No imaginary CrashLoopBackOff for extra drama.

I don't know the exact secret sauce. My guess? Cindy behaves like an agent. It checks real output instead of guessing from memory. Whatever it is, somebody engineered it well.

Let me not oversell. It is slow. Claude and ChatGPT reply in seconds. A local 30B model takes its time. Sometimes I make chai while it thinks.

But I don't mind. For my homelab, speed is not the goal. Accuracy is. I would rather wait two minutes for a correct answer than get a wrong one in two seconds.

## Next Stop: Linux

Mac is sorted. Next, my Linux machine. Cindy has a proper Linux guide. Ubuntu 22.04 and 24.04 get an official `.deb` through `apt`. Arch-based systems get a one-line install, as your normal user. It can be a bit tricky.

I am going to try this on Manjaro. Yes, I know Manjaro is not real Arch.

Feel free to try this and let me know how it works for you.

---

*drafted with ai assist, because practicing what I preach.*
