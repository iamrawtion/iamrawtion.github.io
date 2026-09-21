---
title: "The Day I Missed My First IPL Match (And Learned the Most Important Lesson of My Career)"
date: "2026-09-20"
category: "DevSecOps"
tags: ["Administration", "Automation", "AWS", "Deployment", "DevOps", "DevSecOps", "Documentation", "Linux", "VirtualBox"]
excerpt: "I still remember the date almost. Not exactly, because it's been years. But I remember it was a Friday. I remember it was IPL season. And I remember I had a..."
author: "Roshan Nagekar"
---

I still remember the date almost. Not exactly, because it's been years. But I remember it was a Friday. I remember it was IPL season. And I remember I had a ticket in my pocket for my first ever live cricket match.


I was an intern back then. QA team. I'd been handed a project because I "liked Linux." That's it. That was my entire qualification. I'd played around with LAMP stacks, set up WordPress a few times, run enough commands to feel dangerous. So when they needed someone to set up a QA environment for a PHP application, my name came up.


Simple task, they said. Get the environment running. Make it accessible. Client's in Australia, they need to see it live if things go wrong.


Nothing about that sentence was simple.


#### The Setup From Hell


I started with VirtualBox, because that's what I knew. My boss shut that down immediately. Had to be AWS. Public URL. Client access.


New OS setup. New cloud platform. New tool called Composer that I'd never touched. I did what every self-respecting engineer with no documentation does: I Googled my way through it.


Every install hit a wall. Every wall meant a new Jira comment. Developers would reply with fixes: use this version, open this port, set the database up like this. I'd write it all down on a random notepad. Spin up a new instance. Try again. Snapshot everything because god forbid I lose progress. Scrap the instance. Repeat.


Three weeks of this. Three weeks of two steps forward, one step into a wall.


#### The Comment That Ruined My Friday


Mid-day, that Friday, I saw it. A comment on the ticket from the client. Something like "not happy with the delay."


As an intern, that hits different. You don't have the thick skin yet. I read it and felt genuinely sick.


I made a decision right there: I'll fix this today. Match or no match.


6 PM came and went. 6:30 too. Office was emptying out. I was still at my desk, notepad open, trying combination number forty of the same setup.


That's when my boss's boss walked past. Not my direct manager, the guy above him. Saw an intern still sitting there at that hour and got curious enough to ask what was going on.


I showed him the comment. Told him I couldn't crack the setup.


#### The Question That Changed Everything


He sat down next to me. We started fresh, new instance, working through it together. At some point he noticed my notepad, full of scribbled notes from old chats and Jira threads.


"What's this? Who gave you this?"


I explained. Historical Jira comments, cobbled together over three weeks.


Then he asked the question I should have asked myself on day one:


"Do you not have documentation for this setup? Surely someone who built this environment before has notes. Did you ever ask?"


I hadn't. It genuinely hadn't occurred to me that documentation was something you could ask for. I thought my job was to figure it out, silently, on my own, because asking felt like admitting I wasn't good enough.


He looked at me and said something I've never forgotten: learn to say no, or learn to ask for help, when you need it. You're an intern. You're not the highest paid person in the room. Nobody expects you to know everything. But dragging on for three weeks because you were too afraid to ask a question? That helps nobody.


#### The Email


We tried the setup a couple more times together. Then we did something I hadn't thought to do in three weeks: we wrote an honest email to the client. Explained the real story. No documentation had ever been shared. No process existed. That's why this dragged on, not because anyone was slacking.


We left the office around 10 PM. I walked out past people who'd already watched their match and were heading home. My ticket was still sitting unused in my bag.


I won't lie, I was gutted about the match. But I was also carrying something heavier than disappointment. I'd learned something that had nothing to do with Linux or AWS or Composer.


#### The Payoff


Next morning, a full documentation package landed in my inbox from the ops team on the other side. Turned out it existed all along. Nobody had thought to hand it to an intern, and I'd never thought to ask.


With that doc in hand, I set up the entire environment in one shot. Automated it with a shell script right after, just so nobody after me would have to go through what I did.


#### Why This Still Matters


That lesson didn't stay in that internship. Years later, at a different company, a server went down and the CEO's email landed straight in my inbox asking what DevOps was doing about it. I told him straight: DevOps isn't magic. Some things need process, not miracles. That confidence to say it plainly came from that Friday night.


Since then, I've made it a habit. If I know the answer, I say yes upfront. If I don't, I say so, without the fear of looking incapable. That fear is expensive. It cost me three weeks and a cricket match. It doesn't need to cost you anything if you learn the lesson early.


So here's the takeaway, for every intern, every junior engineer, every person new to a team: ask for the documentation. Ask for help. Say no when you need to. Nobody's going to think less of you for it. If anything, they'll respect you more for not wasting three weeks pretending you have it figured out.


I missed a cricket match to learn that. You don't have to.


---