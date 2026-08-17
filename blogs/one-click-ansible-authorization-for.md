---
title: "Copying ssh keys easily"
date: "2019-02-09"
category: "DevOps"
tags: ["Ansible", "SSH", "ssh-copy-id", "ssh-keyscan", "Vagrant"]
excerpt: "I use VMs/Vagrant a lot in my day work for all sysadmin/devops automation. One of the problems that I always face with the systems is to authorize my..."
author: "Roshan Nagekar"
---

I use VMs/Vagrant a lot in my day work for all sysadmin/devops automation. One of the problems that I always face with the systems is to authorize my server for the 1st time with my master host. If I am using 10 VMs I need to authorize them 10 times? I wrote a small script to automate this process:

1. Create a "list" file and add all IPs and hostnames for the VMs in it.
2. Create a "password" file to write your SSH password in it, you may choose to write the password in the bash, however I feel this gives me the flexibility to add the bash to my source code if need by putting password file in a.gitignore
3. Next create a shell script that will read the IP addresses and the hostnames from the "list" file and password/s from the password file(I generally keep the same password for all VMs for simplicity)
4. Remember 2 commands are useful here **ssh-copy-ip and **ssh-keyscan. Here's how you use them:

|  |
| --- |
| ```     **ssh-keyscan -H <IP> >> ~/.ssh/known_hosts                                                                                                                                     sshpass -f <password> **ssh-copy-id -i ~/.ssh/id_rsa.pub <USER>@<IP> ``` |

The **ssh-keyscan command command is for gathering the public **ssh host key of a VM host specified. After collecting the publich ssh-key it adds it to your localhost. You can verify this by checking the contents of "~/.ssh/known_hosts"

The ssh-copy-id command copies the public key of your default identity (otherwise use -i identity_file for other identities) to the remote host. You can verify this by checking the content on ~/.ssh/authorized_keys in the VM host.

The final script looks like this with a loop:

|  |
| --- |
| ``` #!/bin/bash                                                                                                                                                                  user="**vagrant**"                                                                                                                                                               for ip in `cat ./list`; do                                                                                                                                                       **ssh-keyscan -H $ip >> ~/.ssh/known_hosts                                                                                                                                     sshpass -f password.txt **ssh-copy-id -i ~/.ssh/id_rsa.pub $user@$ip                                                                                                       done ``` |

That's how my "list" file looks like:

|  |
| --- |
| ``` consul-server1                                                                                                                                                               consul-server2                                                                                                                                                               bootstrap-server1                                                                                                                                                            client1                                                                                                                                                                      client2                                                                                                                                                                      client3                                                                                                                                                                      client4                                                                                                                                                                      client5                                                                                                                                                                      192.168.3.111                                                                                                                                                                192.168.3.112                                                                                                                                                                192.168.3.121                                                                                                                                                                192.168.3.151                                                                                                                                                                192.168.3.152                                                                                                                                                                192.168.3.153                                                                                                                                                                192.168.3.154                                                                                                                                                                192.168.3.155 ``` |

I purposely add IP as well as hostname as I keep using them interchangeably. I also came to know about **ansible authorized_keys module that does the **ssh-copy-id task:

```yaml
- name: Set authorized key for user ubuntu copying it from current user
  authorized_key:
    user: ubuntu
    state: present
    key: "{{ lookup('file', lookup('env','HOME') + '/.ssh/id_rsa.pub') }}"
```

However, you will still need the the **ssh-keyscan here. This script goes handy for ops who keep destroying their local environment and use a new one.This is available on **Github: https://github.com/iamrawtion/ansible-autossh

## Why This Approach Scales

The script above starts to show its value the moment you go past five or six hosts. With ten VMs you might tolerate doing it by hand. With fifty, you can't — you'll make mistakes, miss hosts, and waste half an hour on something that should take thirty seconds.

The loop-based approach handles any number of hosts identically. Add a new IP to the list file and re-run the script. The `ssh-keyscan` call is fast (sub-second per host on a local network), and `ssh-copy-id` does the key distribution without you touching each machine individually.

This is also the right pattern for ephemeral environments — Vagrant clusters, AWS Auto Scaling groups during testing, Docker Swarm nodes spun up for a load test. You tear them down, rebuild, run the script, and you're authorized on all of them again in seconds.

The Ansible `authorized_key` module referenced above is what you'd use if you're already running Ansible plays against an inventory. It handles the same job at the task level, and it's idempotent — running it twice doesn't break anything. But you still need `ssh-keyscan` to populate `known_hosts` before Ansible can connect the first time, which is why the shell script is still useful as a bootstrapping step.

## Making It More Secure

The password file approach works, but there are a few things worth tightening up before you use this in anything beyond a local dev cluster.

**Use separate key pairs per environment.** Don't use the same `id_rsa` for your Vagrant dev cluster as you use for production servers. If the key leaks from a dev context, you don't want it to work anywhere else. Generate a dedicated key for each environment:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/vagrant_dev -C "vagrant-dev-$(date +%Y%m%d)"
```

Then pass `-i ~/.ssh/vagrant_dev.pub` to `ssh-copy-id`.

**Drop the password file in favor of ssh-agent.** The `password.txt` file is a plaintext secret on disk. It's fine for a throwaway local cluster, but if this script ever makes it into a CI pipeline or a shared machine, that file is a liability. The cleaner approach:

```bash
eval $(ssh-agent)
ssh-add ~/.ssh/id_rsa
# Now ssh-copy-id works without sshpass, because the agent handles auth
for ip in $(cat ./list); do
    ssh-keyscan -H $ip >> ~/.ssh/known_hosts
    ssh-copy-id -i ~/.ssh/id_rsa.pub $user@$ip
done
```

The agent holds the decrypted key in memory for the session. No plaintext file, no `sshpass` dependency.

**Consider OpenSSH certificates for longer-lived setups.** If you're managing keys across a team or a large fleet, individual key distribution doesn't scale well — you end up with dozens of public keys in each `authorized_keys` file and no clean way to revoke a single key without touching every host. OpenSSH certificate authorities let you sign keys with an expiry date. A host is configured to trust the CA, not individual keys. When someone's access should expire, you just don't renew their certificate. The [OpenSSH certificate authority documentation](https://man.openbsd.org/ssh-keygen#CERTIFICATES) covers the full setup — it's more upfront work than `ssh-copy-id`, but it's the right answer at scale.

## Idempotency: Running It Safely Multiple Times

One thing worth understanding before you run the script repeatedly: `ssh-keyscan` is safe to re-run, but it will add duplicate entries to `~/.ssh/known_hosts` if the host is already there.

This isn't a security problem — SSH will use the first matching entry — but the file will grow over time and the duplicates can cause confusion when you rotate host keys. After running the script, deduplicate the file:

```bash
sort -u ~/.ssh/known_hosts -o ~/.ssh/known_hosts
```

The `-u` flag removes duplicates, and `-o` writes the result back in place. Safe to run anytime.

The Ansible `authorized_key` module handles idempotency correctly — if the key is already present in `authorized_keys`, it won't add it again. The shell script using `ssh-copy-id` also checks before adding, so repeated runs won't leave duplicate keys on the remote hosts.

If you're rebuilding VMs frequently, you may also see SSH warnings about changed host keys (because the new VM has a different host key than the old one). Handle this by removing the old entry before scanning:

```bash
for ip in $(cat ./list); do
    ssh-keygen -R $ip  # remove old known_hosts entry
    ssh-keyscan -H $ip >> ~/.ssh/known_hosts
    ssh-copy-id -i ~/.ssh/id_rsa.pub $user@$ip
done
sort -u ~/.ssh/known_hosts -o ~/.ssh/known_hosts
```

## When to Use Ansible Instead

If you already have an Ansible inventory set up and Ansible can reach your hosts, skip this script entirely and use the `authorized_key` module directly in a play:

```yaml
- name: Distribute SSH keys to all hosts
  hosts: all
  tasks:
    - name: Authorize management key
      ansible.posix.authorized_key:
        user: "{{ ansible_user }}"
        state: present
        key: "{{ lookup('file', '~/.ssh/id_rsa.pub') }}"
```

This is cleaner, produces structured output, and plugs into your existing inventory and variable management. See the [Ansible authorized_key module docs](https://docs.ansible.com/ansible/latest/collections/ansible/posix/authorized_key_module.html) for the full parameter reference, including how to manage multiple keys and handle key removal.

The shell script in this post is most useful for bootstrapping — when you have a fresh set of hosts and Ansible can't connect yet because the keys aren't distributed. Run the script once, get Ansible connected, then manage everything through Ansible from that point on.
