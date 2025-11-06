---
title: "Build your own private cloud with Ubuntu - II"
date: "2013-07-19"
category: "Cloud Computing"
tags: []
excerpt: "Some rights reserved by ErinOfEarth Continuing from... Build your own private cloud with Ubuntu - I Create node for your MAAS server. You must have..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi9h_yuYjfB-wTAvOKz71c_IGxnCp5xenpcW_cPm4GgnkQkEeOG1UbGZ-LOpcGQ4jJs-tLh1SDT-rbcHfMBwunut5edkvZ99EXfW7BbBPr4s18fd3ci-0DMfssijOg6ijpucXqVN1el31c/s1600/5527495896_4c39148366_m.jpg)

Some rights reserved by [ErinOfEarth](https://www.flickr.com/photos/erinofearth/)

Continuing from...

### [Build your own private cloud with Ubuntu - I](http://roshannagekar.blogspot.in/2013/06/build-your-own-private-cloud-with.html)

Create node for your MAAS server. You must have atleast 2 nodes before going ahead with juju setup. Go to the webpage for maas server and Click on Add nodes.

We left all the other information fields there blank except for the MAC-ADDRESS. You can get the mac address of your computer by ipconfig on windows and ifconfig on **Ubuntu** - **Ubuntu** users can do:

```bash
ifconfig | grep hwadrs
```

## Then we went to

http://maas.ubuntu.com/docs/juju-quick-start.html

Thereafter we created ~/.juju/environments.yaml**
vim ~/.juju/environments.yaml**
Added the following details to this file

```yaml
juju: environments
environments:
  maas:
    type: maas
    maas-server: 'http://localhost:5240'
    maas-oauth: '${maas-api-key}'
    admin-secret: 'nothing'
```

Got an error default-series: missing

Added this line to the above file
    default-series: 'precise'
Error Gone

juju status
New error
Juju INFO Connecting to environment... Unhandled error in Deferred: Unhandled Error

---

## Investigated, result

Juju packages needs to be installed from ppa:juju/pkg

Went to

https://juju.ubuntu.com/docs/

removed existing juju
```bash
sudo apt-get update
            sudo apt-get install juju-core (error no package)
```

```bash
sudo add-apt-repository ppa:juju/devel
            sudo apt-get update && sudo apt-get install juju-core
```

Configuring Juju
juju generate-config -w   
previously written environment.yml was moved and the changes were added to the new yml file.

error: environment has no access-key or secret-key

changed default: amazon to default: maas
juju bootsrap
error:no tools
```bash
sudo juju -v sync-tools
```

roshan@**ubuntu-cloud:~$ sudo juju bootstrap
error: cannot start bootstrap instance: cannot run instances: gomaasapi: got error back from server: 409 CONFLICT

CONFLICT from maas means that it doesn't have any nodes available for juju to acquire (juju bootstrap needs to boot a node).
It's not the best error unfortunately, juju needs fixing to show all the text. You need the server edition of 12.04

Nodes were disconnected for sometime...
Next article should have the addition of nodes...
