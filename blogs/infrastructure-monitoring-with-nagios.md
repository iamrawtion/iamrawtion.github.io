---
title: "Infrastructure Monitoring with Nagios"
date: "2015-10-10"
category: "DevOps"
tags: ["Configuration Management", "CPU", "Devops", "Infrastructure", "Monitoring", "Nagios", "Open Source", "Operations", "RAM", "Server", "SLA", "Troubleshooting", "Uptime"]
excerpt: "Image Credits : xmodulo Server management is a real pain and the pain keeps getting worse with more and more server getting added to the..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgBDBAX3PUYseF0KdDIzLl7tj6B7OqrwED_mPhwe8HRN5ff0Js_Ax_N9FDFoSZETkSJ2Hg-btwDwNSrMnbeFBYzsVvr_bny32YcLuv6MrfymQDyoxaDvZrNbIa-Zg2A8TT5ryooQAQAyWI/s320/13331169795_2457bf011d_m-2.jpg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgBDBAX3PUYseF0KdDIzLl7tj6B7OqrwED_mPhwe8HRN5ff0Js_Ax_N9FDFoSZETkSJ2Hg-btwDwNSrMnbeFBYzsVvr_bny32YcLuv6MrfymQDyoxaDvZrNbIa-Zg2A8TT5ryooQAQAyWI/s1600/13331169795_2457bf011d_m-2.jpg)

Image Credits : [xmodulo](https://www.flickr.com/photos/xmodulo/)

Server management is a real pain and the pain keeps getting worse with more and more server getting added to the infrastructure. So how do organizations sustain with huge server farms, datacenters in place? How can super admins promise an SLA of 99.99% uptime with a very low response and resolution time? Quiet obviously the answer is server monitoring solutions. It could have been so tedious for a human to monitor servers 24x7 especially when most of the systems are stable and its only once in a while some manual intervention is needed.  
  
So what is it that needs to be really monitored? It really depends from one organization to other. For a  web development platform, response time of the page may matter a lot. The kind of traffic, 4xx's 5xx's could be a concern too. Disk Space, CPU, Memory, Swap space, particular processes and services running, DB server replication, read writes, no. of connections, query execution time and many more parameters together. Most of these checks are required by all organizations. Out of the many monitoring tools out there, one of the most used is Nagios.  
  
Nagios is an open source software application that helps in monitoring systems, network and Infrastructure. Nagios is on top of the Linux and hence, whatever you could do with Linux could also be done with Nagios. The best part of using Nagios is the plugin based architecture and 100's and 1000's of plugins that it supports to literally allow you to monitor anything.  
  
Nagios comes with multiple notable features that makes it distinguishing. It uses the standard protocols i.e TCP, UDP, ICMP for monitoring servers across network. You can perform multiple resource checks on any host using the NRPE addon, the checks varies from CPU, Disk RAM and many more. Not just resource checks, you could also add event handlers that perform certain actions when certain events are noticed. Checks are performed at the specified intervals, by default the interval is 5 minutes. There are 2 types of checks, Active - The one that are nags initiated. Passive - The one that are initiated externally.  
  
Nagios consists of various objects that needs to be defined and used.  
  

```json
1. Hosts : Hosts are the systems/ servers that need to be monitored in the infrastructure. Nagios also provides the facility to group set of hosts together to give a better monitoring experience. Say you can group all web servers together in a "WebServers" host group. Typically a host definition may look like : "define host{

   use                             linux-box

   host_name                       test_host

   alias                           CentOS 6

   address                         5.175.142.66

   }"
```

```json
2. Services : Services are the checks that needs to be performed. There are a wide range of service checks that can be performed on any host. Just like host group, service checks can also be grouped together. E.g you may need to check the CPU utilization of all servers together, you may group it that way. A service definition may look like : "define service{

   use                     generic-service

   host_name               test_host

   service_description     CPU Load

   check_command           check_nrpe!check_load

           }"
```

```json
3. Contacts : Contacts are the people who need to be contacted if a notification needs to be sent for any event that occurs. You can configure contacts to send emails, samosas, or even custom messages to any service that allows messaging. Contacts can also be grouped together into a contact group. E.g there is a notification about come process getting shut down on QA server that the Admin may not necessarily be bothered about, in such a case the notification can only be sent to QA group. A contact definition will look like : "[define contact{

   name                            generic-contact

   service_notification_period     24x7

   host_notification_period        24x7

   service_notification_options    w,u,c,r,f,s

   host_notification_options       d,u,r,f,s

   service_notification_commands   notify-service-by-email

   host_notification_commands      notify-host-by-email

   register                        0

     
           }"
4. Commands : Commands define the exact command that will be executed on the remote hosts while executing a particular check. These are the simplest way to get particular check executed, you may also pass bash commands to perform any particular check. A command definition may look like : "define command{

   command_name check_nrpe

   command_line $USER1$/check_nrpe -H $HOSTADDRESS$ -c $ARG1$

           }"
5. Time Period : If a downtime is scheduled at a particular time regularly and you don't want Nagios to send you any alert at these hours, you can achieve this by adding a time period definition. This looks like : "define timeperiod{

   timeperiod_name 24x7-except-night-12-2

   alias           24x7 Except 00:00 - 02:00

   sunday          02:00-23:59

   monday          02:00-23:59

   tuesday         02:00-23:59

   wednesday       02:00-23:59

   thursday        02:00-23:59

   friday          02:00-23:59

   saturday        02:00-23:59

   }"

You can also set a monitoring schedule for a particular object if you do not want to add it to the existing service/hosts check. This allows you to explicitly look at a particular check.

Sometimes writing the definition can become a real pain using the same definition for all services and hosts can be a real pain even if you decide to copy-paste the definitions. Templates come for help here. You can define a template with all the necessary details of definition and simply use the same template everywhere in the configs. A typical template definition look like :

define host{

name                            generic-host

notifications_enabled           1

event_handler_enabled           1

flap_detection_enabled          1

process_perf_data               1

retain_status_information       1

retain_nonstatus_information    1

notification_period             24x7

register                        0

}

define contact{

name                            generic-contact

service_notification_period     24x7

host_notification_period        24x7

service_notification_options    w,u,c,r,f,s

host_notification_options       d,u,r,f,s

service_notification_commands   notify-service-by-email

host_notification_commands      notify-host-by-email

register                        0

}

Monitoring in Nagios is parallel, i.e a number of hosts and service checks will go simultaneously in parallel. This could be resource consuming but this is always better than sequential monitoring as you can be sure that all your servers are doing well and don't have to wait too long for any kind of update. The add ons for Nagios are simple to make and add to the Nagios community. The configs are all split and simple to understand too. Nagios has a huge documentation and help examples for quickly getting started.

Happy Monitoring!!
```
