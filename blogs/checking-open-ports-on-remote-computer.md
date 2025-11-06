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
i tried connecting the server using **ssh** on command-line using my **Ubuntu**
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

**Here's how you PortQry on Windows:

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
TCP port 22 (**ssh** service): FILTERED

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
TCP port 22 (**ssh** service): NOT LISTENING
