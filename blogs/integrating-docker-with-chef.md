---
title: "Integrating Docker with Chef"
date: "2014-06-03"
category: "DevOps"
tags: ["Chef", "Devops", "Docker"]
excerpt: "Ever since Docker was introduced to me, the first thing that came to my mind was, Docker is a replacement for Chef. Docker does almost everything..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi-ox1UXrI49tBuPLYJCEd9Ms4F4lVprV7ajXzZsA-3Z6g6nVXM5S-1HCA9oRZG2l23r3ZsSDo5XZuFOVpSBg_K-hDqySGP4VuSSNIvkl8Ev1H8V7Kwe9eOJME4q03QaIB2fifq7myOi-Q/s1600/chefdocker.png)

Ever since **Docker** was introduced to me, the first thing that came to my mind was, **Docker** is a replacement for Chef. **Docker** does almost everything that Chef did and provides me with a light weight solution. While Chef just configures the system. Well I was wrong. I read many articles, heard many speeches and came to a conclusion that, it was not Chef vs **Docker**, it was Chef with **Docker. When they work together, you get the most powerful tool to deliver fast, light and efficiently.

I conducted a demo at [Docker-Bangalore meetup #4](http://www.meetup.com/Docker-Bangalore/events/183969082/) to show how integration with Chef and **Docker** works. More information on the meetup page.

**What is Chef?**

- Configuration Management Tool.
- Helps write Infrastructure as a code.
- Users write code called ‘recipes’ to help manage and configure servers and applications.
- Runs in client/server as well as stand-alone configuration called chef-solo.
- Ensures each resource is properly configured and is in the desired state.
- More on my blog [Learning Chef](http://roshannagekar.blogspot.in/2014/04/learning-chef-part-i.html).

**What is **Docker**?**

- Light weight **Linux** container that packages an application and all its dependencies in a virtual container.
- The container can be packed, shipped and the application can run on any **Linux** machine on public cloud, private cloud or bare metal.
- Does not include OS.
- Layers the changes made in the container just like a version control system, which allows you to reach any previous state within no time.
- More on my blog [Docker](http://roshannagekar.blogspot.in/2014/05/docker-lightweight-linux-container.html).

**Why use Chef+**Docker**, What are the issues with **Vagrant**+Chef?**

- If each project is in its own VM, resource usage is prohibited.
- All the projects in a Single VM, management will be difficult, different versions for same software for different projects.
- Building and Rebuilding takes long time, partial builds or rebuilds are difficult. Unless explicitly snapshot is created at various stages.
- If you rely on external dependencies(which we do), full rebuilds can fail  due to one or more broken dependencies.
- If your stack has multiple components (web, db, cache, etc) and they are installed in 1 **Vagrant** VM, the resulting setup differs from production. Or you could use multiple VMs… but point # 1 holds.

**Chef Pros:

- Great at provisioning (knife bootstrap and plugins)
- Configuring services – Writing your infrastructure as a code.
- Testing your Infrastructure

**Chef Cons:

- Packaging applications
- Deployments and rollbacks
- Dynamic service delivery

**Docker Pros:

- Packaging applications
- Deployments and rollbacks
- Dynamic service delivery

**Docker Cons:

- Managing persistent storage
- Complex networking
- Monolithic services

**How to get Chef and **Docker** work together?**

The key is understanding the Developers and Operations workflow and making them work together.

**Developers own:

- Code and Libraries
- Build and Test Automation
- System Packages
- Runtime Configuration
- Release Management
- Logs monitoring
- Horizontal Scaling

**Operations own the Platform:

- Hosts
- Routers
- Monitoring
- Logs
- Security
- Backing Services

*Basically,*

*Developers take the control of the containers

&
Everything outside containers for Operations*

**Setting up Chef and **Docker** to work together:

- Install Chef workstation with Omnibus Installer.
- Create an account on manage.opscode.com or create your own chef-server.
- Create a **vagrant** node or a cloud instance.
- Site install **docker** community cookbook with site install.
- Create your own cookbook which depends on **docker.
- Upload all cookbooks.
- Bootstrap the node.
- Login and verify of the node has the required images.

**References:

- Brain Flad's chef-docker** cookbook
- Gabriel Monroy's ChefConf presentation
- StackOverflow, Google groups and Quora
