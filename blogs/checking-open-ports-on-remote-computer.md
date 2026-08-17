---
title: "Checking Open Ports on a Remote Computer using PortQry"
date: "2014-02-07"
category: "Linux"
tags: ["Server", "Troubleshooting"]
excerpt: "Some rights reserved by Ryan Franklin Today for one of the projects the SFTP connection kept failing for some reason. The user-id password used for..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgfJEnwQHq3SBLagC2orvNOxsQM_U3XlV4dOOiXqkWNkeclXp4xRoLwrfa0i6KPHvYofYMs_NOcW0nizugQEVm52lXLh1wyvqq5Gzhe02P_YcmRoP-R1WlbftUZFdiiONrlSEuHt_I0DeI/s1600/139617707_d2b49ba43b_m.jpg)

Some rights reserved by [Ryan Franklin](https://www.flickr.com/photos/rfranklinaz/)

 Today for one of the projects the SFTP connection kept failing for
some reason. The user-id password used for connecting to the host was
correct the hostname was as well correct. There was no way to find out
what went wrong. Thankfully command-line gives a good log to verify what
goes wrong.

## I tried connecting to the SFTP host with various

tools like FileZilla, WinSCP but could not get good enough logs. Finally
i tried connecting the server using **ssh on command-line using my **Ubuntu
machine. The connection used to time out. That is what i see in the logs
as well. I assumed that probably the SFTP port number 22 was closed for
the host.

## I googled for if i could find a tool to check if a

particular port on a machine is accessible or not. I finally found
something called as PortQry taht could be used on Windows machine using
Commandline.

---

## Its a very small 140 KB command-line based software

tool that you can use to check if a port on some machine is accessible
or not.

---

## After using this tool i got to know that the machine had a

Firewall  kind of protection which wasn't allowing me to access the
SFTP port on it.

## Here's how you PortQry on Windows

```yaml
- Download the software using the link : http://www.microsoft.com/en-in/download/details.aspx?id=17148

- Double click an unzip the files to any location say C:/

- Hit Windows+R in the run box enter "cmd"

- Go to the directory where the PortQry was extracted.

- Execute the program PortQry by entering PortQry<enter>

- This will display a list of help information and the correct usage of the command

```

---

## The following is the syntax to check the port status

*portqry -n myhostname.net -e 80*

PortQry can inform the status of a port as "Listening", "Not Listening", or "Filtered"
Listening : There is some service active on that port
Not Listening : Port is closed
Filtered : No response, Presumably its behind some kind of firewall.

Syntax
```bash
portqry -n name_to_query [-p protocol] [-e || -r || -o endpoint(s)]
```

---

## Common command line switches

-n : IP address or name of system to query
-p : TCP or UDP or BOTH (default is TCP)
-e : single port to query (valid range: 1-65535)
-r : range of ports to query (start:end)

For single port use

*portqry -n 127.0.0.1 -e 80*

---

## For a Range of ports, use the -r switch

*portqry -n 127.0.0.1 -r 80:85*

```yaml
Note:
- PortQry also displays extended information for known services, such as
```

SMTP, POP3, IMAP4, **FTP**, and is capable of performing LDAP queries.

- A GUI based alternative is also available now called PortQryUI

---

## Sample Output

C:\PortQryV2>portqry -n 127.0.0.1 -e 40

---

## Querying target system called

 127.0.0.1

Attempting to resolve name to IP address...
Name resolved to xx.xx.xx.xx
querying...
## TCP port 22 (ssh service): FILTERED

C:\PortQryV2>portqry -n 127.0.0.1 -e 80

---

## Querying target system called

 127.0.0.1

Attempting to resolve IP address to a name...
IP address resolved to xx.xx.xx.xx
querying...
TCP port 80 (http service): LISTENING

C:\PortQryV2>portqry -n 127.0.0.1 -e 22

---

## Querying target system called

 127.0.0.1

Attempting to resolve IP address to a name...
IP address resolved to xx.xx.xx.xx
querying...
## TCP port 22 (ssh service): NOT LISTENING

## Linux/Mac Equivalents

PortQry is Windows-only. If you're on Linux or Mac, you have better built-in options that don't require downloading anything.

**netcat (nc)** — the simplest tool for quick port checks:
```bash
nc -zv hostname 22        # test single port
nc -zv hostname 80 443    # test multiple ports
nc -zvw3 hostname 22      # 3 second timeout
```

The `-z` flag means "scan only, don't send data." The `-v` flag gives you verbose output so you can see whether the connection succeeded or refused. Without `-v`, nc exits silently.

**nmap** — more powerful, works like PortQry for remote port scanning:
```bash
nmap -p 22 hostname               # single port
nmap -p 80,443,8080 hostname      # multiple ports
nmap -p 1-1024 hostname           # range
nmap -sV -p 22 hostname           # detect service version
```

nmap gives you the same Listening/Not Listening/Filtered classification as PortQry, plus service version detection and more. See the [nmap documentation](https://nmap.org/docs.html) for the full reference — it goes well beyond simple port checks.

**curl** for HTTP/HTTPS specifically:
```bash
curl -v --connect-timeout 5 telnet://hostname:22
curl -o /dev/null -sw "%{http_code}" http://hostname:80
```

The second form is useful for scripting — it prints just the HTTP status code (200, 404, 503, etc.) and discards the body output.

**ss and netstat** for local port checking (not remote):
```bash
ss -tlnp          # TCP listening ports with process
ss -ulnp          # UDP listening ports
```

`ss` is the modern replacement for `netstat`. Use it on the server itself to verify a service is actually listening before you blame the network.

## When Ports Show as "Filtered"

"Filtered" is the most confusing status. It means the host is not responding at all — no RST (reset) packet, no ICMP port unreachable message. Your packet went out and nothing came back.

This almost always means a stateful firewall is silently dropping packets. There's an important distinction here: a firewall can either DROP packets (silently discard, no response) or REJECT packets (actively send back an error). DROP produces the "filtered" status. REJECT would produce "not listening" or a connection refused error, which is actually more informative.

Common causes of filtered ports:

- **AWS Security Group** not allowing inbound traffic on that port — the most common cause in cloud environments
- **iptables DROP rule** on the target host (as opposed to REJECT, which would return a response)
- **Network ACL** blocking traffic upstream of the instance
- **Corporate firewall** blocking outbound traffic from your machine on that port

How to distinguish "filtered" from "host is down": try a port you know should be open. If the server is running a web app, try port 80. If port 80 responds normally and port 22 is filtered, the host is up and the firewall is blocking SSH specifically. If nothing responds at all — not even a port you expect to be open — the host may be unreachable entirely (wrong IP, routing issue, or the instance is actually down).

## A Practical Port Troubleshooting Workflow

The original problem in this post was an SFTP connection failing. Here's the systematic approach I'd use now, which eliminates possibilities one by one rather than guessing:

```bash
# 1. Check if the host is reachable at all
ping hostname

# 2. Check if SSH port is open
nc -zv hostname 22

# 3. If filtered, check from inside the network
#    (eliminates client-side firewall as a variable)
ssh jump-host "nc -zv target-host 22"

# 4. On the target server, verify the service is actually listening
ss -tlnp | grep :22

# 5. Check iptables/firewall rules on the target
sudo iptables -L -n | grep 22
```

The logic: step 1 eliminates basic network reachability. Step 2 eliminates port-level access. Step 3 eliminates your local network or client-side firewall as the problem — if it works from a jump host inside the same network, the block is on your side. Step 4 confirms the service (sshd) is actually running and bound to that port. Step 5 checks for local host-level firewall rules.

This sequence matters because jumping straight to "the firewall must be blocking it" wastes time if sshd isn't running in the first place, or straight to "check if sshd is running" when the traffic is being blocked before it reaches the host.

For more advanced scanning techniques — SYN scans, UDP scanning, OS detection — the [nmap port scanning techniques documentation](https://nmap.org/book/man-port-scanning-techniques.html) is the reference to bookmark.
