---
title: "Mumbai Technology Meetup - DevOps Special"
date: "2014-07-27"
category: "DevOps"
tags: ["Devops", "Meetups"]
excerpt: "On July 27th 10 am a DevOps special meetup was conducted at Directiplex, Mumbai. Its very rare to see a meetup given importance as much as any other..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgywesR83JUnIPbQr1Sn_FlUbKyMB7sFybgSVvQuR3o9652KkRedpzyc2GwQGX6tTwCGKF8N6PQ1TnuvgGLeBh_ShxgSVZjQ4WybIXbYWRm2lI1R1f0hZOh9DI7pkmTrxYOl-C1BlWmXS8/s1600/July+MTP+++DevOps+Special+++Mumbai+Technology+Meetup++Mumbai++++Meetup.png)
On July 27th 10 am a DevOps special meetup was conducted at Directiplex, Mumbai. Its very rare to see a meetup given importance as much as any other technology conference. Speakers from different organizations were present and shared their knowledge. Tremendous knowledge and experience shared free of cost. The meetup went on from 10 am (Started a little late) and went around till 5.30 pm. The agenda itself was too appealing.

No entry fees. Its a free event. Just ensure you learn and make use of that learniing :-)

```

11.00 am - 12.00 pm : SaltStack [incl. LXC basic]: by Rigved Rakshit - Directi

Rigved introduced to LXC its setup, its concepts and how its similar/different than Docker. SOme commands and configs. Due to lack of time he could not cover Saltstack though

```

12.00 pm - 1.00 pm : Configuration Management at Rackspace by Shaunak Kashyap - Rackspace

Shaunak conducted this on Hangout while he was at a 12 hr difference. Shaunak showed how rackspace uses Ansible for getting provisioning and other CM task automated.

```python

1.00 pm - 1.30 pm : Chef Fundamentals and DevOps by Sanju Burkule - OpexSoftware

Sanju took a brief introduction to Chef and how OpexSoftware who are partners of Chef and conduct professional Chef training with certifications. Sanju also shared his knowledge on how Chef is different from Puppet as he has used both.

```

1.30 pm - 2.00 pm : Lunch - Lets not talk about this. Blame the rain.

```

2.00 pm - 3.00 pm: Puppet [incl. preparatory VirtualBox fundamentals] by Ashish Chandra. - Reliance Jio

Ashish took introduction to Puppet some basics , how easy is it to setup a Puppet master and get going. He also shared some of his scripts that he uses to provision 500 instances in 6 - 7 minutes.

```

3.00 pm - 4.00 pm: Ansible by Aditya Patawari - BrowserStack

This was the 2nd time I met Aditya, we met earlier at RootConf in Bangalore. Aditya shared introduction to Ansible and how is it better/different than Chef//Puppet.

```

4.00 pm - 5.00 pm : Capistrano by Mayur Rokade - Directi

Mayur conducted a live demo of how to use Cap for deploys and a a little intro and setup for Capistrano.

```

5.00 pm - 6.00 pm : Docker Fundamentals by Augustine Correa - Organizer of the event

Augustine covered Docker fundamentals — what containers are, how they differ from VMs (shared kernel, copy-on-write filesystem, namespaces and cgroups for isolation), and the basics of `docker run`, `docker build`, and Dockerfiles. In 2014, Docker was less than a year old. Most of the room had heard of it but hadn't run it in production. The demo was straightforward, but the concept clicked: if you could package an application and its dependencies into a container image and ship that image, you'd eliminate the "works on my machine" problem that plagued every deployment. Nobody in that room predicted how completely containers would reshape the industry in the next five years.

## What This Meetup Represented

In mid-2014, the DevOps tooling landscape was fragmenting fast. SaltStack, Ansible, Chef, Puppet, and Capistrano were all live options with real production users. Docker was brand new — less than a year from its first public release. Kubernetes didn't exist yet in any usable form; it was announced by Google in June 2014, the same month as this meetup, and wasn't production-ready for another two years.

The questions being asked that day — "which config management tool should we use?" and "should we use containers?" — were genuinely open questions. There were no clear answers. Everyone in that room was figuring it out at the same time.

Looking back from 2024, the industry converged on some clear answers: Kubernetes won container orchestration and became the standard substrate for production workloads. Ansible became the dominant agentless configuration management tool for a large segment of the market, particularly for cloud provisioning and application deployment. Docker became the standard container image format and runtime, and the OCI spec that formalized it became the foundation for the whole ecosystem.

The fact that none of this was obvious in July 2014 is worth remembering. The tools that won didn't win because they were obviously superior at the time — they won through a combination of technical merit, community adoption, timing, and backing. Betting on the wrong tool in 2014 wasn't a bad engineering call; it was just how things were.

## The Configuration Management Convergence

The meetup covered four CM tools in one day because no one knew which would win. By 2024, here's where they landed:

- **Ansible**: dominant for agentless automation, particularly cloud provisioning and application deployment. No agent to install, YAML playbooks that are readable by non-developers, and a massive collection of community roles via Ansible Galaxy. The [Ansible documentation](https://docs.ansible.com/) is one of the better-maintained sets of open source project docs.
- **Chef**: strong in large enterprises, particularly where Ruby expertise already existed. The Chef DSL is powerful but has a steeper learning curve than Ansible's YAML. Still in active use in organizations that invested heavily in it early.
- **Puppet**: strong in enterprises with large-scale node management. Puppet's declarative model and Puppet Forge module ecosystem kept it relevant, especially in Windows-heavy environments where Ansible historically had weaker support.
- **SaltStack**: acquired by VMware in 2020, then folded into the Broadcom stack after Broadcom acquired VMware. The open source edition continues, but the commercial roadmap is murkier than it once was. Still has a loyal community, particularly for large-scale event-driven automation.
- **Capistrano**: still the standard deployment tool for Ruby on Rails applications. Less common for general infrastructure automation — it was always opinionated toward application deployment rather than node configuration.

The community didn't win by picking a single tool. It won by having multiple mature options and selecting the right one for the context. That's still the right approach.

## Why Community Meetups Still Matter

This kind of meetup — free entry, speaker-driven, multiple topics in a single day — compressed months of individual research into a few hours. In 2014 there was no curated YouTube playlist for "DevOps tools comparison." The knowledge transfer happened in rooms like the one at Directiplex. You'd spend a full day, hear from practitioners who had actually run these tools in production at Rackspace and Reliance Jio, and leave with a much clearer picture of the landscape than any blog post could give you.

That format still works. The DevSecOps Pune meetup I started in 2019 was a direct continuation of this approach — get practitioners in a room, have them share what they're actually doing, make it free. The specific tools change. The value of direct practitioner knowledge in person doesn't.
