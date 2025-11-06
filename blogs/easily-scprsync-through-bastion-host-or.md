---
title: "Easily SCP/Rsync through bastion host or SCP/Rsync through multiple hops"
date: "2019-02-20"
category: "Programming"
tags: ["hop", "rsync", "scp", "SSH", "ssh tunnel"]
excerpt: "Often we work in environment where we need to copy files or directories from a local system to another server that can be accessed only through a..."
author: "Roshan Nagekar"
---

Often we work in environment where we need to copy files or directories from a local system to another server that can be accessed only through a Bastion host. In such cases, typically we transfer from local machine to Bastion and from Bastion to the intended server. This is time consuming, repetitive and unreliable too. There are many ways you can make this automated. I found a way to get this done through SSH tunneling. Here's how it works:  
  
There are 3 machines involved here:  

1. localhost
2. Bastion host
3. Intended server

  
1. Create an SSH tunnel from localhost to the **intended** host through bastion. The tunnel will be created from port 1234 at localhost. You may choose any other port.  
ssh -L 1234:<intended_server>:22 <user>@<bastion-host> cat -  
2. In a new tab initiate the file/directory transfer using the tunnel port  
scp -P 1234 <file_to_transfer> <user_of_intended_server>@127.0.0.1:~/  
  
As I did this, I realized SCP is very slow in getting the transfer done due to its linear and sequential file transfer behavior. Hence, I used Rsync which made it pretty fast due to its delta based transfer algorithm  
  

|  |
| --- |
| ``` rsync -avz -e "ssh -p 1234" <file_to_transfer> <user_of_intended_server>@127.0.0.1:~/ ``` |