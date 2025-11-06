---
title: "Copying ssh keys easily"
date: "2019-02-09"
category: "DevOps"
tags: ["Ansible", "SSH", "ssh-copy-id", "ssh-keyscan", "Vagrant"]
excerpt: "I use VMs/Vagrant a lot in my day work for all sysadmin/devops automation. One of the problems that I always face with the systems is to authorize my..."
author: "Roshan Nagekar"
---

I use VMs/Vagrant** a lot in my day work for all sysadmin/devops** automation. One of the problems that I always face with the systems is to authorize my server for the 1st time with my master host. If I am using 10 VMs I need to authorize them 10 times? I wrote a small script to automate this process:

1. Create a "list" file and add all IPs and hostnames for the VMs in it.
2. Create a "password" file to write your **SSH** password in it, you may choose to write the password in the bash, however I feel this gives me the flexibility to add the bash to my source code if need by putting password file in a.gitignore
3. Next create a shell script that will read the IP addresses and the hostnames from the "list" file and password/s from the password file(I generally keep the same password for all VMs for simplicity)
4. Remember 2 commands are useful here **ssh-copy-ip and **ssh-keyscan. Here's how you use them:

|  |
| --- |
| ```     **ssh-keyscan -H <IP> >> ~/.ssh/known_hosts                                                                                                                                     sshpass -f <password> **ssh-copy-id -i ~/.ssh/id_rsa.pub <USER>@<IP> ``` |

The **ssh-keyscan command command is for gathering the public **ssh** host key of a VM host specified. After collecting the publich **ssh-key it adds it to your localhost. You can verify this by checking the contents of "~/.ssh/known_hosts"

The **ssh-copy-id command copies the public key of your default identity (otherwise use -i identity_file for other identities) to the remote host. You can verify this by checking the content on ~/.ssh/authorized_keys in the VM host.

The final script looks like this with a loop:

|  |
| --- |
| ``` #!/bin/bash                                                                                                                                                                  user="**vagrant**"                                                                                                                                                               for ip in `cat ./list`; do                                                                                                                                                       **ssh-keyscan -H $ip >> ~/.ssh/known_hosts                                                                                                                                     sshpass -f password.txt **ssh-copy-id -i ~/.ssh/id_rsa.pub $user@$ip                                                                                                       done ``` |

That's how my "list" file looks like:

|  |
| --- |
| ``` consul-server1                                                                                                                                                               consul-server2                                                                                                                                                               bootstrap-server1                                                                                                                                                            client1                                                                                                                                                                      client2                                                                                                                                                                      client3                                                                                                                                                                      client4                                                                                                                                                                      client5                                                                                                                                                                      192.168.3.111                                                                                                                                                                192.168.3.112                                                                                                                                                                192.168.3.121                                                                                                                                                                192.168.3.151                                                                                                                                                                192.168.3.152                                                                                                                                                                192.168.3.153                                                                                                                                                                192.168.3.154                                                                                                                                                                192.168.3.155 ``` |

I purposely add IP as well as hostname as I keep using them interchangeably. I also came to know about **ansible** authorized_keys module that does the **ssh-copy-id task:

```yaml
- name: Set authorized key for user ubuntu copying it from current user
  authorized_key:
    user: ubuntu
    state: present
    key: "{{ lookup('file', lookup('env','HOME') + '/.ssh/id_rsa.pub') }}"
```

However, you will still need the the **ssh-keyscan here. This script goes handy for ops who keep destroying their local environment and use a new one.This is available on **Github: https://github.com/iamrawtion/ansible-autossh
