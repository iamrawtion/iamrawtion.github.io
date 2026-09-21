---
title: "Continuous Integration with Jenkins"
date: "2014-06-07"
category: "DevOps"
tags: []
excerpt: "Continuous Integration: What's the deal? As per a tutorial that I came across a few months ago, its a process in which all the development work is integrated..."
author: "Roshan Nagekar"
---

Continuous Integration:


What's the deal? As per a [tutorial](http://www.vogella.com/tutorials/Jenkins/article.html) that I came 
across a few months ago, its a process in which all the development work
 is integrated at some predefined time interval and the resulting work 
is tested and built automatically.


So the basic functionality of Jenkins is to monitor a version 
control system and if changes are encountered in it, it will start the 
build system and monitor it. Build system could be e.g Apache ant or 
Maven. Jenkins can monitor entire build process and it has functionality
 to report the monitoring and send out notifications as per the results 
encountered. Plugins could be added to Jenkins for building and testing 
many kind of applications.


To use Jenkins, you will need,

An accessible source code repository, e.g github, with your code checked in.

A
 working build script e.g maven script checked into the repository. 
Jenkins can be started from a command line or also from a web 
application server.


Installation of Jenkins:

Jenkins provides debian/ubuntu packages that installs it. Post installation, you can start jenkins with:

Download Jenkins.war file and install using the following command:

java -jar jenkins.war --httpPort=9000


sudo service jenkins start or

/etc/init.d/jenkins start


Running jenkins locally will start in on [http://localhost:8080](http://localhost:8080/)


At
 times you may also want to create a virtual host for Jenkins to run. 
You can create a virtual host on ubuntu by adding a file in 
/etc/apache2/sites-available/jenkins


Following details need to be added in this file:


<VirtualHost *:80>

ServerAdmin webmaster@localhost

ServerName jenkins.local

ServerAlias ci

ProxyRequests Off

<Proxy *>

Order deny,allow

Allow from all

</Proxy>

ProxyPreserveHost on

ProxyPass / [http://localhost:8080/](http://localhost:8080/)

</VirtualHost>


You will then need to enable this virtual host by the following command

sudo a2ensite jenkins


To disable this site at any instance you can use the command

sudo dissite jenkins


Once the site is accessible on your localhost, you will need to 


--------------------------------------------------------------------------------

meetup 

for installation goto [jenkins-ci.org](http://jenkins-ci.org/)

latest versus LTS try to go for LTS and not latest. latest might give you good plugins and fast processing etc. but it may break

installation can also be done using the war file java -jar jenkins.war


Configure Jenkins Server