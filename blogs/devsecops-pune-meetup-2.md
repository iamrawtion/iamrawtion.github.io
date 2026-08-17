---
title: "DevSecOps Pune Meetup 2"
date: "2019-01-18"
category: "DevOps"
tags: ["Devops", "DevSecOps", "Information Security", "Meetups", "SecOps"]
excerpt: "For the 2nd DevSecOps meetup, we already had our first swag sponsor. For DevOps Pune, I received swags from Docker and Ansible. Hashicorp was also..."
author: "Roshan Nagekar"
---

For the 2nd **DevSecOps meetup, we already had our first swag sponsor. For **DevOps Pune, I received swags from **Docker and **Ansible. Hashicorp was also planning to send a few.

With DevSecOps our 1st swag sponsor was [Polyverse](https://polyverse.io/) :) I couldn't resist posting these.

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhvy1sH1jsAkoV6WY3S23Y4B_9QXsaupA8BKO91obfWaSTNR54oZSacCR4LvFmkLAK597Bq-PCNQYj1eCBr5qEPzIkYqhPQZMFGCS-L6LFnPU_O30elVV3HgRocsWG7XXalMZpdoEoyZls/s1600/02_1.jpeg)

For this meetup, I changed the RSVP format to get an exact count. I was expecting to start soon at a bigger location. We couldn't risk wasting of resources. Lean coffee needs logistics to take care of and hence needs to be addressed really well. Everyone who RSVP' at the meetup page was informed to Call/SMS/WhatsApp the organizers to book a slot. So the Meetup page RSVP meant nothing.

[Qualys](https://www.qualys.com/) Pune, was our venue, logistics and refreshment sponsor this time. When I 1st told them about the meetup, this is how the they arranged the seating :) :

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgo7uwxsHuGEoEwRwPNE2o_IaqBzQuO6wGkURca5Kvc3SPGA7FZuIp0pPbF70C1SrO-o79LXl5GRzt01x3_urM6havb0_9pnevs0pf1hiHJuldJMLl-d6EKl3acbJkSjLIdszT48g9G65s/s1600/IMG_20190112_092119.jpg)

I told them about the format and later we changed the seating to best suit the format.

We had 12 RSVP and 10 attendees this time with just 1 last minute informed cancellation. That was a perfect number . We also made sure that the refreshment we take was a packed and long lasting one so we don't waste food.

With 10 attendees we stared pretty much on time and this time we had a huge list to discuss and the participants were from mixed domains unlike last meetup. This time we had QAs, Support Engineers, **DevOps**, Consultants and Developers altogether.

The following topics got discussed:

- Understanding PKI - Public Key Infra (How SSL Works?)
- CIS Benchmarking
- SOAR (Security, Orchestration, Automation and Response)
- AWS Compliance
- Securing serverless in **Azure** (Function as a Service)
- Debian Linux and Contributing to it
- Microservices with an example

SSL and PKI got discussed a lot since [Muneeb Shaikh](https://www.linkedin.com/in/nixmaniack/) really explained concepts that we were unaware of that goes behind PKI formation and how public and private keys work. A 5 minutes discussion prolonged to a good long 30 minutes with inputs from everyone.

SOAR was a new process and concept that Rahul spoke about and worth reading for everyone.
CIS compliance was a hit one this time too.
We understood that it was topic worth presentation hence added to the DevOps Pune meetups Agenda.
Later we spoke about **AWS compliance and how Prowler could be used to ensure compliance in **AWS.
We also discussed importance of good naming conventions and Tagging in AWS.
There was a chaos when we spoke about both serverless and microservices resulting to a debate topic that we discussed at the end of the meetup.

The final closure was on Debian systems and how we would contribute to it.

Takeaways from this session for speakers to prepare were:

- PKI and SSL encryption
- Microservices

A few topics that did not get discussed were:

- Types of Security and importance of each
- GRC - Governance, Risk and Compliance
- Security Testing with Selenium
- Achieving **CI/CD with **Ansible

This turned out to be a long event in spite of small number of attendees. Muneeb got Polyverse T-Shirt to keep PKI discussion happening and also actively participating in all other topics as well. Some others got stickers.

Some clicks :)

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjLW30vwclP0J9yoU4xgz4OKBatIHtiMWRD9lTUwzpAKXHQq47-NMvAmODkiU_bBO0L1qY_Z-7h0bR7djyiOs4N7PggrNl38AJNEZHkye6VZGLRiL-_LdYatyhvtbXguvIzS01v7mHv_Gs/s1600/02_2.jpeg)

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhjD4irBjuoSZeVaCgweb_-QEGUFyDxlanogqctWgUIeZlUiAdOzWFxgHUpoJriVTay_XIWv3R6OxJHqarHbbVKIbT7OvtJKbM_khNZJ6AIC1Z5e9JngTVWZXrMQzkiDLEflLzGswncrbc/s1600/02_3.jpeg)

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj06u9Fh0RlhOv3KvbbPV1Mp6BmaGrrHlDNVTVvgxkAHkEPP0mLBxDHKXV6H90DnJr7sJjTzMiatlpeEwf2Wc9TbPQWAVv1PUYwsrOBuRhL3TN7kQaEXSjuXV3iOtzWTFTYDSpnN_O6LQE/s1600/02_6.jpeg)

## Why PKI Got 30 Minutes Instead of 5

The PKI discussion was supposed to be a quick 5-minute overview. It ended up running 30 minutes because Muneeb started explaining what actually happens under the hood — and most of us in the room realized we'd been using TLS without really understanding it.

Here's what he covered. A certificate chain works in three layers: a root CA (trusted by browsers and operating systems out of the box), an intermediate CA (issued by the root CA, adds a layer of separation), and a leaf certificate (the one your server presents). Your browser trusts your certificate because it can walk this chain up to a root CA it already trusts. That trust relationship is the foundation of HTTPS.

Muneeb walked through how asymmetric encryption underpins this: you generate a key pair — a private key that stays on your server and never leaves, and a public key embedded in your certificate. Data encrypted with one key can only be decrypted with the other. When a client connects, the TLS handshake uses the public key to establish a shared symmetric session key, and from that point the session uses symmetric encryption (much faster).

A Certificate Signing Request (CSR) is what you send to a CA when you want a cert issued. It contains your public key and details about your organization. The CA signs it with their private key, creating the certificate. The signature is what makes it trustworthy — anyone can verify it using the CA's public key.

Why does this matter operationally? Because when a certificate expires and your service goes down at 2am, you need to understand the chain to debug it quickly. Is it the leaf cert expired? Is the intermediate CA cert missing from your server's bundle? Is the root CA no longer trusted by a newer OS version? These are different problems with different fixes. If you want a solid primer on the mechanics, [Let's Encrypt's explanation of how HTTPS works](https://letsencrypt.org/how-it-works/) is one of the clearest I've found.

## CIS Benchmarks in Practice

Not everyone in the room was familiar with CIS Benchmarks, so this is worth explaining properly.

The Center for Internet Security publishes hardening guides — called benchmarks — for operating systems, cloud platforms, Kubernetes, Docker, databases, and more. Each benchmark is a scored checklist of security controls. They're divided into two levels: Level 1 controls are safe to apply broadly with minimal impact on functionality. Level 2 controls are stricter, more security-focused, and may break things if you apply them without understanding the tradeoffs.

For AWS, the CIS Benchmark covers IAM policies (MFA on root, no root access keys, password policy requirements), CloudTrail logging (enabled in all regions, log file validation on), S3 bucket permissions (block public access, no public buckets), security groups (no unrestricted inbound on 0.0.0.0/0 for sensitive ports), and more.

The manual audit would take days. Tools like [Prowler](https://github.com/prowler-cloud/prowler) — which came up in the meetup discussion — automate this. Prowler runs against your AWS account and outputs a report showing which CIS controls you pass, fail, or have exceptions for. It's open source and actively maintained. Running it periodically (or in a CI pipeline) gives you a continuous compliance posture rather than a point-in-time snapshot.

The full list of available benchmarks is at [CIS Benchmarks](https://www.cisecurity.org/cis-benchmarks). If you're doing anything in AWS, the CIS AWS Foundations Benchmark is the starting point.

## SOAR: What It Is and When You Need It

SOAR stands for Security Orchestration, Automation and Response. Rahul introduced this to the group and it was a new concept for most attendees, including me.

Here's how it fits in the security tooling stack. A SIEM (Security Information and Event Management) collects logs and security events from across your infrastructure — servers, firewalls, endpoints, cloud accounts — and correlates them to surface alerts. Something like: "we saw 20 failed SSH login attempts from the same IP in 5 minutes." That's a SIEM alert.

SOAR is the layer that responds to that alert automatically. Instead of paging someone to go manually block that IP, update a ticket, and notify the team, a SOAR playbook does it: looks up whether the IP is known malicious, blocks it at the firewall level if it is, creates a ticket in your issue tracker, and posts a message to your security Slack channel — all without human intervention.

The value is mean time to respond (MTTR). At scale, security alerts are noisy and most don't need human attention. SOAR handles the routine ones automatically and escalates only what requires judgment. That's the difference between a security team that's constantly firefighting and one that can focus on actual investigation.

For teams that want to explore this without buying an enterprise product, [Shuffle](https://shuffler.io/) and [TheHive](https://thehive-project.org/) are the open source options worth looking at.

## Why the Serverless vs Microservices Debate Got Heated

By early 2019, serverless (FaaS — AWS Lambda, Azure Functions, Google Cloud Functions) had built up a lot of hype. Some were claiming it would replace microservices. That claim landed in a room full of people who actually build and run services, and the debate that followed was probably the most energetic part of the meetup.

The core disagreements:

Are serverless and microservices the same thing? No. Microservices is an architectural pattern about how you decompose a system into independently deployable services. Serverless is a deployment model where you run individual functions without managing servers. You can build microservices on serverless infrastructure. They're different dimensions.

Does serverless eliminate ops? No — it shifts ops concerns. You're no longer managing servers or OS patches, but you're now managing cold start times, function timeouts, per-invocation costs, distributed tracing across many small functions, and vendor lock-in. The operational surface changes; it doesn't disappear.

Can you build stateful systems serverlessly? With difficulty. Lambda is inherently stateless between invocations. You can work around this with external state (DynamoDB, ElastiCache), but it adds complexity and latency. Some workloads genuinely fit the stateless function model. Most enterprise systems don't map cleanly onto it.

The debate was productive precisely because it surfaced real tradeoffs that teams in the room were dealing with. The answer then, and still now: use the right tool for the workload. Serverless is excellent for event-driven, bursty, stateless workloads. Microservices with persistent infrastructure make more sense for long-running, stateful, or latency-sensitive services. The interesting architectural question is where the boundary sits for your specific system.
