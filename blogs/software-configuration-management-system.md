---
title: "Software Configuration Management System"
date: "2015-08-18"
category: "DevOps"
tags: ["Configuration Management", "Deployment", "Devops", "Provisioning"]
excerpt: "Picture credits : Paul Downey Any application would generally consist of Web servers, Application Servers, Memcache systems, SQL and NoSQL Database..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigFP8PYvG5hxL3wI9jFcBNs-r-O_zxjB4rdlgpUY9fdyAaZ8V2vbp5Oc3oOR18p2S4_lo0FQCTgKIQqpjkTDgcNPvCJICvzYLHcHV4-BxGT8ZQhU9cY9WjfFf57XCfcXbgfxjb0PAY3_I/s1600/8634021085_96a6619de6_m.jpg)

Picture credits : [Paul Downey](https://www.flickr.com/photos/psd/)

Any application would generally consist of Web servers, Application Servers, Memcache systems, SQL and NoSQL Database servers, Load Balancers, Messaging queues, etc.

Although this is pretty much enough, however as a precaution/privilege we also ensure proper redundancies so that whenever there is a failure we have a back plan in place to handle the failure.

In order to keep a track of server performances we also have logging servers, Analytics servers and Monitoring servers in place.

All these servers need to available again within no time in case something goes wrong(which does go wrong).

In traditional systems the admin guy managed all these by managing the wiring of the server and SSHing the servers and maintaining them throughout.

There was nothing wrong with the idea except of time taken to get the process done.
When something goes wrong get into that machine and spend hours finding out what went wrong and correct it my defining a good downtime.

With a configuration management(CM) system in place now, we describe a state of a server and use some tool that just ensures that the server resides in that state throughout.

The CM system ensures that right packages are installed, config files have correct values and permissions set and that the expected services are running on the host system and many more.

Software Deployment is another concern that a Devops person has to take care of which is at times addressed by CM tools too, although may not be considered a good practice always.

Deployment is the process where the software that is written/developed by a company is built/compiled/processed and the required binaries and static files and other necessary files are copied to the server.

The expected services are started as well.
This is done mostly by using some scripting language and now we have some deployment specific tools that have their own advantages over scripting languages rollback being an important one.

Capistrano and Fabric are famous ones.

Many a times the deployment process involves multiple remote servers.
In complex environments the deployment process, the order of execution of tasks play an important role.

A deployment may fail if an expected event occurs before another.
E.g the database server needs to be up and running before the web server is brought up.
Or in a high availability environment servers needs to be 1st taken out of the load balancer one by one before deployment and later added back to the load balancer post successful deployment.

This automated arrangement, coordination and management of complex systems is called orchestration.

With a bunch of IAAS providers in the cloud market, virtualization has taken up huge pace.
The evaluation of any new CM tool that comes to the IT world is largely done based on the number of cloud providers it supports.

An important feature of a CM tool is provisioning.
Provisioning is the process of spinning up of server for that cloud provider automatically.
Many CM tools providers have plugins written to communicate with many cloud providers.
Chef, **Ansible**, Puppet, CFEnginer, Salt have already become favorite for many out there.

I have personally used Ansible and Chef as of now. Cloud is fun indeed .. :)

## The CM Tool Landscape in 2024

The tools I listed above have each taken different trajectories over the past decade. Here's where things stand:

- **Ansible**: the most widely adopted CM tool for agentless configuration and cloud provisioning. Its YAML playbook syntax is approachable for people who aren't systems programmers, and not requiring an agent on managed nodes significantly reduces operational overhead — no agent fleet to maintain and update. It's particularly common for application deployment, cloud resource provisioning, and one-off operational tasks. [Ansible documentation](https://docs.ansible.com/) is the best entry point for teams new to CM.
- **Chef**: still strong in enterprises, especially where Ruby expertise exists. Acquired by Progress Software in 2020. The recipe/cookbook model is powerful for complex configuration logic but carries a steeper learning curve than Ansible.
- **Puppet**: enterprise-focused, with strong tooling for large-scale declarative state management. The Puppet DSL takes time to learn but scales well to thousands of nodes with consistent enforcement.
- **SaltStack**: acquired by VMware, now part of the Broadcom stack following the VMware acquisition. Faster execution model than Ansible (ZeroMQ messaging bus) but more operational complexity to stand up.
- **Terraform**: worth mentioning separately — not a traditional CM tool (it doesn't manage running state on servers), but it has become the standard for infrastructure provisioning across all major cloud providers. Where CM tools configure what's on a server, Terraform provisions the server itself.

## Infrastructure as Code: The Evolution

The early CM tools were designed to manage state on running servers — install packages, write config files, ensure services are running. They solved the right problem for their era. What evolved from there was a recognition that the servers themselves should also be described as code.

Terraform filled that gap: provision the VPCs, subnets, security groups, load balancers, and compute instances as code with the same version control and review workflow you'd apply to application code. The result is a two-layer IaC stack that most serious infrastructure teams use today:

1. **Terraform** provisions the infrastructure — the cloud resources themselves
2. **Ansible (or Chef/Puppet)** configures what runs on that infrastructure — packages, services, application config

Some teams take this further with immutable infrastructure: instead of configuring running servers after they boot, you bake the entire CM configuration into an AMI or container image at build time using tools like Packer. When you need to update configuration, you build a new image and replace the instances — you never modify a running server. This eliminates an entire class of configuration drift problems at the cost of longer build pipelines.

## Idempotency: The Core Principle

The defining property of a good CM system is idempotency: running the configuration once or running it ten times should produce exactly the same result. The second run should report no changes if the system is already in the desired state.

This matters because CM tools are typically run continuously or on a schedule to enforce state — not just once at provisioning time. If your playbook or cookbook is not idempotent, you'll get configuration drift: servers that diverged from the desired state because a task was applied inconsistently, or failed partway through, or was applied in a different order than expected.

The practical test for idempotency: run your CM tool against a freshly configured server, then run it a second time immediately and check whether the second run reports any changes. If it does, you have an idempotency problem to fix. Well-written Ansible modules are idempotent by design — the `apt` module checks whether a package is already installed before installing it, the `template` module checks whether the file content has changed before writing it. See the [Ansible playbook guide](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_intro.html) for patterns that preserve idempotency.

## Practical CM Workflow

CM tools don't exist in isolation — they're part of a broader automation pipeline. The workflow I've landed on across several teams:

1. **Define desired state in code**: Ansible playbook, Chef cookbook, or Puppet manifest checked into a Git repository like any other code
2. **Branch, review, merge**: CM changes go through pull requests with peer review — the same process as application code, because a bad CM change can take down production just as easily
3. **Test in staging**: apply the CM run against a staging environment using the exact same tool and playbook before touching production; this is where you catch drift and environment-specific surprises
4. **Apply to production via CI/CD pipeline**: Jenkins, GitHub Actions, or GitLab CI runs the CM tool against production after the staging run succeeds — not a human SSHing into servers and running `ansible-playbook` manually
5. **Schedule periodic enforcement**: Ansible Tower (the commercial product) or its open-source equivalent AWX can schedule CM runs on an interval to continuously enforce desired state and alert on drift

This makes the CM tool part of the pipeline rather than a separate manual process. The playbook is version-controlled, the runs are auditable, and the drift is detected automatically rather than discovered when something breaks. That's the shift from traditional server administration to actual infrastructure as code.
