---
title: "Software Configuration Management System"
date: "2015-08-18"
category: "DevOps"
tags: ["Configuration Management", "Deployment", "Devops", "Provisioning"]
excerpt: "Picture credits : Paul Downey Any application would generally consist of Web servers, Application Servers, Memcache systems, SQL and NoSQL Database..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigFP8PYvG5hxL3wI9jFcBNs-r-O_zxjB4rdlgpUY9fdyAaZ8V2vbp5Oc3oOR18p2S4_lo0FQCTgKIQqpjkTDgcNPvCJICvzYLHcHV4-BxGT8ZQhU9cY9WjfFf57XCfcXbgfxjb0PAY3_I/s1600/8634021085_96a6619de6_m.jpg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigFP8PYvG5hxL3wI9jFcBNs-r-O_zxjB4rdlgpUY9fdyAaZ8V2vbp5Oc3oOR18p2S4_lo0FQCTgKIQqpjkTDgcNPvCJICvzYLHcHV4-BxGT8ZQhU9cY9WjfFf57XCfcXbgfxjb0PAY3_I/s1600/8634021085_96a6619de6_m.jpg)

Picture credits : [Paul Downey](https://www.flickr.com/photos/psd/)

  
Any application would generally consist of Web servers, Application Servers, Memcache systems, SQL and NoSQL Database servers, Load Balancers, Messaging queues, etc. Although this is pretty much enough, however as a precaution/privilege we also ensure proper redundancies so that whenever there is a failure we have a back plan in place to handle the failure. In order to keep a track of server performances we also have logging servers, Analytics servers and Monitoring servers in place. All these servers need to available again within no time in case something goes wrong(which does go wrong).  
  
In traditional systems the admin guy managed all these by managing the wiring of the server and SSHing the servers and maintaining them throughout. There was nothing wrong with the idea except of time taken to get the process done. When something goes wrong get into that machine and spend hours finding out what went wrong and correct it my defining a good downtime. With a configuration management(CM) system in place now, we describe a state of a server and use some tool that just ensures that the server resides in that state throughout. The CM system ensures that right packages are installed, config files have correct values and permissions set and that the expected services are running on the host system and many more.  
  
Software Deployment is another concern that a Devops person has to take care of which is at times addressed by CM tools too, although may not be considered a good practice always. Deployment is the process where the software that is written/developed by a company is built/compiled/processed and the required binaries and static files and other necessary files are copied to the server. The expected services are started as well. This is done mostly by using some scripting language and now we have some deployment specific tools that have their own advantages over scripting languages rollback being an important one. Capistrano and Fabric are famous ones.  
  
Many a times the deployment process involves multiple remote servers. In complex environments the deployment process, the order of execution of tasks play an important role. A deployment may fail if an expected event occurs before another. E.g the database server needs to be up and running before the web server is brought up. Or in a high availability environment servers needs to be 1st taken out of the load balancer one by one before deployment and later added back to the load balancer post successful deployment. This automated arrangement, coordination and management of complex systems is called orchestration.  
  
With a bunch of IAAS providers in the cloud market, virtualization has taken up huge pace. The evaluation of any new CM tool that comes to the IT world is largely done based on the number of cloud providers it supports. An important feature of a CM tool is provisioning. Provisioning is the process of spinning up of server for that cloud provider automatically. Many CM tools providers have plugins written to communicate with many cloud providers. Chef, Ansible, Puppet, CFEnginer, Salt have already become favorite for many out there.  
  
I have personally used Ansible and Chef as of now. Cloud is fun indeed .. :)