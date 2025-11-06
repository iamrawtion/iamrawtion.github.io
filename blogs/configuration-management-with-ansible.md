---
title: "Configuration Management with Ansible"
date: "2016-04-26"
category: "DevOps"
tags: ["AWS", "Configuration Management", "Devops", "Provisioning", "Virtualization"]
excerpt: "What is Ansible? Opensource IT Automation tool that handles: - Application Deployment - Muti-tier Orchestration - Configuration Management Why..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEipix8RkKO6og6BTf4yd7Dzw_mBQAY3CZM4EIxWrAB4-1rInIHxPxoQV7GTD80YKzv9_0mXTMxT2MFneaP7nRxNY5RQoReZ20JQeyqD3chCTyzVx5wY9FzmYO4RictroghcSgiQ5d9mRYM/s1600/ansible-logo.png)  
What is **Ansible**?  
Opensource IT Automation tool that handles:  

- Application Deployment  
- Muti-tier Orchestration  
- Configuration Management  

  
Why **Ansible**?  

- Agentless architechture  
- Operates over **SSH**  
- Configuration as data and not as code  
- **Python**  
- Self Documented/Explanatory  
- Feature rich - more than 150 modules - new modules are easy to write  
- Full configuration management and deployment  

  

## Installing ansible

**Python** package index - pip install **ansible**  
OS Package install - sudo apt-get install **ansible**  
**Git** repo and run setup.py - git clone **https**://**github**.com/**ansible**/ansible.git  
  

## Ansible Modes

Playbook mode - Execution of a series of commands in order as per written in a playbook  
Non Playbook mode - Executing an **ansible** module command on target host  
  
Getting Started:  

- Clone the parallax repo  
- the repo contains a **ansible**.cfg file which contains following:  

```json
[defaults]  
# more at http://docs.ansible.com/intro_configuration.html#the-ansible-configuration-file  
# host_key_checking=False  
remote_user=user  
```

This file contains global config setting to adjust **ansible**  
  

## Playbooks

They represent collection of 'plays', configuration policies, which gets applied to defined groups of hosts  

## A sample playbook is as follows

```
- name: Install all the packages and stuff required for an EXAMPLE SERVICE  
  hosts: example_servers  
  user: user  
  sudo: yes  
  roles:  
    - common  
    - mongodb  
    - zeromq  
    - service_example  
    - nodejs  
#    - nginx  
#    - python  
#    - postgresql  
#    - redis  
#    - memcached  
#    - deployment  
```

  

## Anatomy of a Playbook


## A sample playbook structure is as follows

```
.  
├── example_servers.yml  
├── group_vars  
│   ├── all  
│   └── example_servers  
├── host_vars  
│   └── example-repository  
├── hosts  
├── repository_server.yml  
├── roles  
│   ├── __template__  
│   ├── common  
│   ├── gridfs  
│   ├── memcached  
│   ├── mongodb  
│   ├── nginx  
│   ├── nodejs  
│   ├── redis  
│   ├── repository  
│   ├── service_example  
│   └── zeromq  
└── site.yml  
```

If we look at the tree we see a few **YAML** files and a few directories. There is also a filed called as 'hosts'. The hosts file is the the **Ansible** inventory file, it stores the hosts and their mappings to the hostgroups. The hosts file looks like this.  
  

## Simple Playbook

--- //The three dashes on the top tells you that this is a **YAML**(Yet another markup language) file. **Ansible** playbooks are written in yaml.  
```yaml
- name: install and start apache //"name" keyword defines the name of the play.  
  hosts: webservers //"hosts" keyword tells which hosts will the play target.  
  user: root //"user" keyword tells what system user will ansible use to execute the task below  
  
 tasks: //"tasks" under tasks you can define what module you use and you configuration  
- name: install httpd  
  yum: name=httpd state=present //"yum" module is being used to install httpd  
  
- name: start httpd  
  service: name=httpd state=running //"service" module is being used to start the httpd service  
```

  

## Ansible Architechture

It runs as a server on your laptop. It has a inventorial host and has set of modules, there are series of playbooks that define the automation tasks. It pushes the outstanding modules modules out to the managed servers using **SSH**, the module runs and the resukt is returned and then the module is removed from the system. No agents are necessary for this process. This is only SSH and **python** are the requirements.  
  
How does a playbook work?  
When you execute a palybook, the 1st thing that happens is we gather facts. **Ansible** will first gather lot of useful facts from that remote system. THese can be used later on in playbooks templates and config files as variables. The tasks provided in the playbook will then be performed say 'install **apache**'. SO we will see that we get a changed response. which means something has been changed on the systems. if you run the same playbook again you will not get the changed response for the 2nd time, as the changes were already done in the 1st run. This is because that the expected state that we told Ansible to perform was already there and hence it did not do it for the 2nd time. This is the idempotency of Ansible.  
  
Host Inventory: Basics  
Host inventory can come from several different places, it is usually a list of hosts that you organize in a group. It can come from a file or a directory of files or from a cloud provisioning environment like EC2, Rackspace etc.  

contd...