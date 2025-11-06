---
title: "RootConf 2014"
date: "2014-07-16"
category: "DevOps"
tags: ["Devops"]
excerpt: "](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjzFLxvjrSHhvwUjmD0n9Bd9LPRoaMHS9jMMgde_OLZX7l_3VPOGn1fXEbbQDR4WxxlBxz_WInXqRdsKaxQuPROJBa..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjzFLxvjrSHhvwUjmD0n9Bd9LPRoaMHS9jMMgde_OLZX7l_3VPOGn1fXEbbQDR4WxxlBxz_WInXqRdsKaxQuPROJBa86qhdKZcaNsLlcHXH4R7o0hlMrQekdx6Lxb1ThPUbFTQiZ9yC1u4/s1600/IMG_20140717_063551.jpg)I attended conference and workshop on Devops and Cloud Infrastructure - [RootConf 2014](https://rootconf.in/2014/) at Bangalore from 14th May to 17th May 2014.

Go Continuous Integration Tool developed by Thoughtworks

CI and Release Management tool developed by Thoughtworks. Helps to manage the build, test it and finally release. It allows you to distribute your build across many systems. So you can run your software on different platforms and make sure that it runs over all of them. You can even divide your tests and parallely run them on different systems, that way you get faster results. All the environments can be managed centrally, so you can promote builds from one environment to the next one.

Simple Steps:

1. Install Go Agent software on all the machines that are part of you system/cloud.

2. Next configure all the agents to connect to the Go Server

3. Finally Approve every build from Management Dashboard.

4. Associate relevant resources tags for appropriate build tasks with the compatible agents (e.g resource **linux**, etc)

## SELinux : Security Enhanced Linux

This session typically discussed about how SELinux is useful and how people do not understand its importance. Some security policies were discussed. Three important modes of SELinux; enforcing, permissive and disable. Also the hands on session discussed the behavior of these 3 modes of SELinux.

Docker : Light weight linux container

The dry-run of this session was conducted in the Docker-meetup we attended.
It was a nice revision as well as some additional parts of docker were known in the session.

Docker is a containerization tool that helps you make a light weight **Linux container to pack, ship and run you application anywhere.**

It is an easy to learn tool with very few commands to be learnt and make your own Dockerfile.
The containers can be shipped by making an image registry(or by using **docker**'s image registry) by pushing the container from a dev environment and then pulling it from stage, test or prod.

You are sure to see the similar environment as that of dev.
So no more, "It works on my machine" reason to be heard.

## Ansible : Configuration Management Tool

This is just another configuration management tool just like chef. The pros about the tools are :

1. No client server architecture

2. Very easy to install and almost no configuration needed.

3. Very simple to write playbooks, a non programmer can as well understand and write the code within no time since its just a yaml file.

Cons are:

1. Doesn't work on windows.

2. Not much support available since its relatively new.

## Jenkins : Continuous Integration

Continuous Integration workshop was pretty much the way we do it traditionally. The workshop covered basics of Jenkins how a job is made and a build is tested an automated.

## Conference Update

Most of the conference talks focused on **Docker LXC, **Puppet/Ansible. Self healing techniques was introduced and sounded something that we could try and introduce wherein the servers would first intelligently check and see if the problem could be solved by its own with various scripts based on the type of issue.

Technique to **on board a new team member without merely asking him to read documentation and rather practice hands on was discussed in brief. **Tsuru is a new tool that we heard of that may help us to simplify and automate docker as well.

A demo on how to testing your infrastructure with **Kitchen was shown and that is exactly how we learned it also a part of it showed integration with **Docker which is something we need to implement.

Introduction to **Microsoft Azure cloud gave us an idea of how it is different than other cloud providers. **Heartbleed was discussed in brief along with few other security threats and a demo on how Heartbleed actually affected.
