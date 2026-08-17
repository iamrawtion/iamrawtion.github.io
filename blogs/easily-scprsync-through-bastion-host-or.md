---
title: "Easily SCP/Rsync through bastion host or SCP/Rsync through multiple hops"
date: "2019-02-20"
category: "Programming"
tags: ["hop", "rsync", "scp", "SSH", "ssh tunnel"]
excerpt: "Often we work in environment where we need to copy files or directories from a local system to another server that can be accessed only through a..."
author: "Roshan Nagekar"
---

## Often we work in environment where we need to copy files or directories from a local system to another server that can be accessed only through a Bastion host. In such cases, typically we transfer from local machine to Bastion and from Bastion to the intended server. This is time consuming, repetitive and unreliable too. There are many ways you can make this automated. I found a way to get this done through SSH tunneling. Here's how it works

There are 3 machines involved here:

1. localhost
2. Bastion host
3. Intended server

1. Create an SSH tunnel from localhost to the intended host through bastion. The tunnel will be created from port 1234 at localhost. You may choose any other port.
```bash
ssh -L 1234:<intended_server>:22 <user>@<bastion-host> cat -
2. In a new tab initiate the file/directory transfer using the tunnel port
scp -P 1234 <file_to_transfer> <user_of_intended_server>@127.0.0.1:~/
```

As I did this, I realized SCP is very slow in getting the transfer done due to its linear and sequential file transfer behavior. Hence, I used Rsync which made it pretty fast due to its delta based transfer algorithm

|  |
| --- |
| ``` rsync -avz -e "**ssh** -p 1234" <file_to_transfer> <user_of_intended_server>@127.0.0.1:~/ ``` |

## Why This Matters in Modern DevOps

The tunnel approach above works, but it's worth understanding why bastion hosts exist in the first place and where the tooling has moved since.

Bastion hosts (also called jump servers) are a foundational pattern in network security. You put one hardened, publicly accessible host on the edge of your network, and everything else stays private. All SSH access to internal servers routes through it. This gives you a single place to enforce MFA, log access, and rotate credentials — instead of managing that across every internal host.

In zero-trust architectures, the bastion is still relevant, but the implementation has evolved. On AWS, you may not need a bastion at all for some use cases. **AWS Systems Manager Session Manager** gives you shell access to EC2 instances without opening any inbound SSH ports — no security group rule, no key management, full session logging to CloudWatch. If you're on AWS and starting fresh, [check the Session Manager docs](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html) before setting up a bastion.

That said, bastions are still the right call in multi-cloud setups, on-prem environments, or anywhere you need protocol-level SSH access rather than a browser or CLI session proxy. The techniques below apply in all of those contexts.

## Using SSH ProxyJump Instead (Modern Approach)

The SSH tunnel method I described at the top works, but it has a friction problem: you need two terminal windows, you have to remember the port number, and you have to keep the tunnel process alive. It also doesn't compose well into scripts.

OpenSSH 7.3 (released in 2016) added `ProxyJump`, and it's the cleaner solution. It handles the bastion hop inline, in a single command:

```bash
# SSH directly to the target through the bastion
ssh -J user@bastion user@target-server

# SCP a file through the bastion in one command
scp -J user@bastion file.txt user@target-server:~/

# Works for directories too
scp -J user@bastion -r ./local-dir user@target-server:~/remote-dir/
```

No separate terminal. No local port to manage. The `-J` flag tells SSH to use the specified host as a jump proxy — it handles the TCP forwarding through the bastion transparently. The connection to the target server is encrypted end-to-end; the bastion sees an opaque tunnel, not your session traffic.

## ProxyJump in SSH Config

If you're jumping through the same bastion regularly, put it in `~/.ssh/config` so you don't have to type the flag every time:

```
Host bastion-host
    HostName 54.123.45.67
    User ec2-user
    IdentityFile ~/.ssh/bastion-key.pem

Host target-server
    HostName 10.0.1.50
    User ubuntu
    ProxyJump bastion-host
    IdentityFile ~/.ssh/target-key.pem
```

After that, `ssh target-server` just works. SCP and rsync pick up the config automatically too:

```bash
scp file.txt target-server:~/
```

If you have multiple targets behind the same bastion, add a wildcard entry to keep the config DRY:

```
Host 10.0.*
    ProxyJump bastion-host
    User ubuntu
    IdentityFile ~/.ssh/target-key.pem
```

## rsync with ProxyJump

rsync uses SSH as its transport, so ProxyJump works through the `-e` flag:

```bash
# Single file
rsync -avz -e "ssh -J user@bastion" file.txt user@target-server:~/

# Directory, with progress
rsync -avz --progress -e "ssh -J user@bastion" ./local-dir/ user@target-server:~/remote-dir/

# Dry run first (always a good idea)
rsync -avzn -e "ssh -J user@bastion" ./local-dir/ user@target-server:~/remote-dir/
```

If you've already set up the SSH config above, you can skip the `-e` flag entirely:

```bash
rsync -avz ./local-dir/ target-server:~/remote-dir/
```

rsync's delta transfer algorithm means only changed blocks are sent on subsequent syncs, which makes this genuinely fast for large directories — much faster than repeated SCP.

## Security Considerations

A few things worth getting right when working with bastions:

**Don't use agent forwarding (`-A`) unless you have a specific reason.** Agent forwarding passes your local SSH key material through the bastion to the target, which means anyone with root on the bastion can use your keys while the forwarded session is active. ProxyJump doesn't have this problem — it negotiates separate key authentication at each hop, so your private key never leaves your machine.

**Use a dedicated bastion with MFA.** The bastion is your chokepoint for all SSH access. It should have multi-factor authentication enabled, minimal software installed, and aggressive session logging. It's the one host you'd notice if it were compromised — treat it accordingly.

**Rotate bastion host keys regularly.** When you rotate or rebuild the bastion, update `~/.ssh/known_hosts` on client machines to remove the old host key. Stale known_hosts entries create confusion and can mask legitimate MITM warnings.

**Consider separate keys for bastion and target hosts.** If one key is compromised, you don't want it to grant access to every host in the chain. The SSH config approach above makes it easy to specify different identity files per host.

The [CIS Benchmark for SSH](https://www.cisecurity.org/benchmark/distribution_independent_linux) is worth reading if you're hardening a bastion — it covers the specific sshd_config settings that matter (MaxAuthTries, PermitRootLogin, AllowUsers, etc.).
