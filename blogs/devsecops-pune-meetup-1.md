---
title: "DevSecOps Pune Meetup 1"
date: "2019-01-18"
category: "DevOps"
tags: ["Devops", "DevSecOps", "Information Security", "Meetups", "SecOps"]
excerpt: "After some good success, a huge gap and some mixed learning experiences with organizing DevOps Pune meetups, I decided to start with DevSecOps Pune..."
author: "Roshan Nagekar"
---

After some good success, a huge gap and some mixed learning experiences with organizing [DevOps Pune](https://www.meetup.com/DevOps-Pune/members/?op=leaders) meetups, I decided to start with [DevSecOps Pune](https://www.meetup.com/DevSecOps-Pune/members/?op=leaders) meetup.

This was mainly since I was exploring possibilities in Information Security world.
The idea started after seeing [DevSecOps Seattle](https://www.meetup.com/Seattle-DevSecOps/) Meetup and the learning experience I had their simply by reading their updates.

I saw regular posts on Facebook about this meetup group from my long time mentor [Archis Gore](https://www.linkedin.com/in/archis).

I was still confused whether to start a meetup in Pune or just stick to Seattle meetup and attend it virtually.

You don't always have to be an organizer to learn.

However, Archis told me that the Seattle meetup could not be attended virtually, as the format could not support virtual attendance.

This was a Lean Coffee format.
Something different for me.
On learning more about the format, it sounded really like a plan to start a similar meetup in Pune.
Archis was here in Pune in October 2018, when I met him to understand the organizer's roles in this format.

And then, and we were in or a great start.
I got [Rahul Khengare](https://in.linkedin.com/in/rahulkhengare) with me this time as a Co-organizer and started the meetup group.

[Cloudneeti](https://www.cloudneeti.com/) helped us sponsor the meetup group.

The first meetup I knew would be a small one with limited attendees. I expected less than 10 attendees to show up and the RSVP count always go wrong. I remember wasting lot of food and other resources in the past due to incorrect RSVP count. I chose a location to the central Pune so that its easy to commute to everyone. Thanks to [Bobby Jadhav](https://www.linkedin.com/in/bobbyjadhav) for sponsoring the venue, i.e [HauteBook](http://hautebook.com/)'s office.

We had 5 attendees in this meetup as expected. The count was not important. What was more important was whether good topics came up. With Lean Coffee we expect every participant to come up with good topics to vote for and speak about. The topics that got discussed were:

- Docker image security and its challenges (Highest voted)
- **DevSecOps** **CI/CD pipeline with **Kubernetes
- Cloud Security
- **Metasploit** - Kali Linux

We discussed a lot about **Docker security and **Snyk**, **Twistlock being the docker security tools were also explored further. How CIS compliance helps cloud security and the recent how engineers disable SELinux first on any system and that is a bad practice. Although just 5, the discussion went along for a huge 2 hours and it was indeed a wonderful learning experience.

## We also decided later that the takeaways from these lean-coffee format will end up becoming speaker-attendee format topic for us to deep dive into important topics further. This was a great takeaway since with DevOps meetups we only spoke about what the speaker was best at, and may or may not be community learning requirement. Takeaways from this session for Speakers to prepare about was

- CIS Compliance
- SELinux / Apparmour

## These topics were added as Topics on DevOps Pune meetup and the hunt for the speaker started there. A few topics that did not get discussed due to lack of time were

- iptables
- **Ansible**, **Terraform and **CI/CD for pod deployments on AWS
- AWS security alternatives
- Security compliance
- Securing Nginx

Overall it was a wonderful learning experience. Cheers to all the attendees.

Some clicks :)

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgacwGVYJOUuFy7SOos1SSxa3ppmGqIJqYDEtATNLq_kEs9ekjGBGmmUFBsYBIAfXYZ9lt5tCL_avDexGaGmcSMMcwNnpT5yawcaKYTu9latvQjnw3oFFd9W5gbuef362Y_bnE72SkaGgc/s1600/01_1.jpeg)
![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgKI-cgFbg-anfgnLC8s9rMeEsWWSoe-akX9vNvj3TN-5SWLXVuyrPDy6-k3dhy0Dti-egPH451H-SWFY3GrQ5ZAS65vmJTnLva7OQdFE0i7wWwm3H3-CsaS9dcMjAL_lclBiJewfhWNRM/s1600/01_4.jpeg)

## The Lean Coffee Format

I mention the lean coffee format in most of my meetup write-ups, but I've never fully explained it for readers who haven't encountered it before.

Lean Coffee is a structured but agenda-less meeting format. There's no pre-assigned speaker, no prepared slides, no agenda set by the organizer. Instead, it works like this: each participant writes topics on cards or sticky notes — one topic per card. Everyone puts their cards on the table. The group dot-votes on which topics they want to discuss most (each person gets a fixed number of dots to distribute). The highest-voted topic gets a time-boxed discussion, typically 8 minutes. When the timer goes off, the group votes to continue (if the discussion still has momentum) or move to the next topic. It keeps going through the ranked list until time runs out.

There's no single person in the "expert" seat. Anyone in the room can contribute to any topic. The discussion moves at the pace the room wants.

For a security meetup, this works especially well. Security topics are broad and practitioners come in with wildly different backgrounds — developers who want to understand Docker security, ops folks dealing with compliance requirements, consultants who work across multiple client environments. A traditional meetup format forces you to pick one speaker and one topic that may or may not be relevant to what the audience actually needs. Lean Coffee surfaces that need directly.

The original format description is at [leancoffee.org](http://leancoffee.org/) if you want to run one yourself.

## Docker Security in 2019 vs Today

The Docker security conversation in this first meetup covered the main concerns of the time: vulnerable base images, containers running as root, unrestricted Linux capabilities, and inadequate image scanning. These concerns are still valid today. What's changed is that the tooling has matured significantly.

At the time, Snyk and Twistlock were the notable names in the space:

- **Snyk**: still active and has expanded beyond container scanning into a broader developer security platform covering code, dependencies, container images, and infrastructure-as-code.
- **Twistlock**: acquired by Palo Alto Networks in 2019 and rebranded as Prisma Cloud. Enterprise-focused, full lifecycle container security.

The open source ecosystem has also grown considerably. For image scanning, [Trivy](https://github.com/aquasecurity/trivy) is now the go-to — it's fast, has a low false-positive rate, scans OS packages and language-specific dependencies, and supports container images, filesystems, and IaC. Grype (from Anchore) is another solid option. Clair was one of the earlier open source scanners but has largely been superseded.

For runtime security — detecting malicious behavior inside running containers — Falco is the standard. It uses Linux kernel tracing to alert on things like unexpected process spawning, file writes to sensitive directories, or privilege escalation attempts inside a container.

The CIS Docker Benchmark is the authoritative hardening guide. It covers the Docker daemon configuration, container runtime settings, image hygiene, and network configuration. If you're running containers in production and haven't gone through it, that's where to start.

## SELinux: Why Engineers Disable It (And Why They Shouldn't)

The SELinux discussion in this meetup kept coming back to one observation: engineers disable it the first time it causes a problem, and then never turn it back on. This is a pattern I've seen repeatedly, and it's worth unpacking why it happens and what to do instead.

SELinux is a Linux kernel security module that enforces mandatory access controls (MAC). Unlike discretionary access controls (the standard Unix permission model where the file owner decides who can access a file), MAC is enforced by the kernel regardless of what the process or user wants. Every process and every file has a security label. The kernel checks these labels on every access attempt — if the policy doesn't explicitly allow it, it's denied.

When SELinux causes a problem, you'll see it in `/var/log/audit/audit.log` as an AVC denial. The denial tells you exactly what was blocked: which process, which file, which operation. The correct fix is to write a policy rule that permits the specific operation you need. The lazy fix is `setenforce 0`, which switches SELinux to permissive mode (logs denials but doesn't enforce them) or disables it entirely. That removes the protection for everything, not just the thing that was breaking.

The reason engineers reach for the lazy fix: SELinux error messages are genuinely cryptic. "Permission denied" from SELinux doesn't look like a normal permission denied. The audit log output isn't human-friendly. But there's tooling that bridges the gap.

The `audit2allow` and `audit2why` tools are what you actually need:

```bash
# Check what SELinux is denying
ausearch -m avc -ts recent | audit2why

# Generate a policy module for the denial
ausearch -m avc -ts recent | audit2allow -M mypolicy

# Apply the policy
semodule -i mypolicy.pp
```

`audit2why` explains the denial in plain language. `audit2allow` reads the audit log and generates a policy module that would permit the denied operation. `semodule -i` applies it. This is more work than `setenforce 0` but it maintains the security posture — you're allowing exactly what needs to be allowed, not disabling the entire enforcement mechanism.

The Red Hat SELinux guide is the authoritative reference: [Using SELinux on RHEL 9](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html/using_selinux/index). It applies broadly even if you're running a different distribution.

## What the Lean Coffee Model Produced

Looking back at this first meetup, the topics that surfaced — Docker security, CIS compliance, SELinux — weren't chosen by an organizer or suggested by a sponsor. They came from the five people in the room writing down what they actually wanted to understand. That's the point of the format.

We made a deliberate decision early on: topics that generate strong discussion in lean coffee format would become the pipeline for speaker-format sessions at later DevOps Pune meetups. The lean coffee meetup is community research — it tells you what practitioners need to learn. The speaker meetup is the delivery mechanism.

That feedback loop worked. CIS compliance became a speaker session. SELinux/AppArmor became a speaker session. The Docker security discussion here directly influenced what we invited speakers to present on later.

The DevSecOps Pune group grew from 5 attendees in this first meetup to hundreds of members over the following months. A lot of that growth came from the content staying relevant to what practitioners actually needed — because we were asking them directly rather than guessing.
