---
title: "Docker - Lightweight Linux Container"
date: "2014-05-09"
category: "DevOps"
tags: ["Devops", "Docker"]
excerpt: "Docker: Its a tool that helps you to pack, ship and run any application as a light-weight Linux container. More on https://www.docker.io/ Works best..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjaZfGc5siQIuH_2BU-RUhgws5dLEGJVW5Nay4Bgzls7-xB7KL0858qF4E-Ph6iZNNTN-3eVOJcRy_JfedPNFnuUt9FRWTZldr6GRaa1WnROyRBAnSor1PhxdKdY8v90F_OuiJ6P8TF2mk/s1600/small_v-dark.png)

**Docker**: Its a tool that helps you to pack, ship and run any application as a light-weight **Linux** container. More on **https**://www.docker.io/

Works best on **Linux** kernel 3.8 **Ubuntu** 12.04 precise has 3.2 and needs to be upgraded.

Install **Docker** with on **Ubuntu** 12.04:

```bash
sudo apt-get update
sudo apt-get install linux-image-generic-lts-raring linux-headers-generic-lts-raring
sudo reboot
```


To check **docker** version:

```bash
sudo docker version
```


Client version: 0.11.1

Client **API** version: 1.11

Go version (client): go1.2.1

**Git** commit (client): fb99f99

Server version: 0.11.1

Server **API** version: 1.11

**Git** commit (server): fb99f99

Go version (server): go1.2.1

Last stable version: 0.11.1

To check info about **docker** installed:

```bash
sudo docker info
```


```yaml
Containers: 1

Images: 9
```


Storage Driver: aufs

Root Dir: /var/lib/**docker**/aufs

Dirs: 11

Execution Driver: native-0.2

Kernel Version: 3.11.0-20-generic

WARNING: No swap limit support

To pull an existing **docker** image:

```bash
sudo docker pull <imagename>
sudo docker pull busybox
```


HelloWorld in **docker**:

```bash
sudo docker run busybox echo HelloWorld
```


Search for an existing image in the index:

```bash
docker search <image-name>
sudo docker search stackbrew/ubuntu
```


NAME                       DESCRIPTION                                     STARS     OFFICIAL   TRUSTED

stackbrew/**ubuntu**           Barebone ubuntu images                          36

jprjr/stackbrew-node       A stackbrew/**ubuntu**-based image for **Docker**,...   2                    [OK]

hcvst/erlang               Erlang R14B04 based on stackbrew/**ubuntu**         0                    [OK]

stackbrew/**ubuntu**-upstart                                                   0

Pull an existing image:

```bash
sudo docker pull ubuntu
```


Pulling repository **ubuntu**

a7cf8ae4e998: Pulling dependent layers

3db9c44f4520: Downloading [=================>                                 ] 22.18 MB/63.51 MB 2m19s

74fe38d11401: Pulling dependent layers

316b678ddf48: Pulling dependent layers

99ec81b80c55: Pulling dependent layers

5e019ab7bf6d: Pulling dependent layers

511136ea3c5a: Download complete

6cfa4d1f33fb: Download complete

To the check the available images:

```bash
sudo docker images
```


REPOSITORY          TAG                 IMAGE ID            CREATED             VIRTUAL SIZE

**ubuntu**              13.10               5e019ab7bf6d        2 weeks ago         180 MB

**ubuntu**              saucy               5e019ab7bf6d        2 weeks ago         180 MB

**ubuntu**              12.04               74fe38d11401        2 weeks ago         209.6 MB

**ubuntu**              precise             74fe38d11401        2 weeks ago         209.6 MB

**ubuntu**              12.10               a7cf8ae4e998        2 weeks ago         171.3 MB

**ubuntu**              quantal             a7cf8ae4e998        2 weeks ago         171.3 MB

**ubuntu**              14.04               99ec81b80c55        2 weeks ago         266 MB

**ubuntu**              latest              99ec81b80c55        2 weeks ago         266 MB

**ubuntu**              trusty              99ec81b80c55        2 weeks ago         266 MB

**ubuntu**              raring              316b678ddf48        2 weeks ago         169.4 MB

**ubuntu**              13.04               316b678ddf48        2 weeks ago         169.4 MB

busybox             latest              2d8e5b282c81        2 weeks ago         2.489 MB

**ubuntu**              10.04               3db9c44f4520        2 weeks ago         183 MB

**ubuntu**              lucid               3db9c44f4520        2 weeks ago         183 MB

To run a command within an image:

```bash
docker run<image> command
sudo docker run ubuntu echo HelloWorld
```


HelloWorld

To install something on an **ubuntu** image

```bash
sudo docker run apt-get install <package>
find ID of the container
sudo docker ps -l
```


CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                      PORTS               NAMES

0dac167b178d        **ubuntu**:14.04        ps aux              12 minutes ago      Exited (0) 12 minutes ago                       goofy_bell

committing changes made to the images:

```bash
docker commit 0da firstcommit
```


723aa6ead77a14ff05cd2c640163345ec5a36fa9a4c757a6872a1ec919ab9345

To get log of the present container:

```bash
sudo docker logs 0dac167b178d
```


USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND

root         1  0.0  0.0   7132   644 ?        Rs   09:10   0:00 ps aux

To inpect the details of an image

```bash
sudo docker inspect <id: 3-4 characters of id will work too>
sudo docker inspect 0da
```


<**json** output>

Push container image to the index

```bash
sudo docker push ubuntu
```


Creating Dockerfile:

All instructions in Dokerfile are in the form of

INSTRUCTION arguments

Instruction are not case sensitive but CAPS are recommended. The first instruction in any Dockerfile is the FROM instruction. The syntax is:

FROM <image>

FROM **ubuntu**

This will look for the image in **Docker** index. You can also search docker index by the command docker search

Next is the RUN instruction. The RUN instruction will execute any commands on the current image. After executing, it will also commit the changes. The committed image can be used for the next instructions from the Dockerfile. This way the committed changes form a layer of changes just like any other source code control system. Syntax of RUN command:

RUN <command>

RUN apt get install -y apache2

Here the RUN command is equivalent to **docker** run image command + docker commit container_id. Here image will be automatically replaced with the current image and container_id is the result of the previous commit.

Once you have created your Dockerfile you can use **docker** build to create you image from it. You can use the command in this way.

Create a Dockerfile with the content

FROM **ubuntu**

RUN apt-get install -y memcached

Save and close the file. If the file is in you r present directory:

```bash
docker build .
```


If the file in in some other location

```bash
docker build path/to/file
```


If passing through STDIN

```bash
docker build - < Dockerfile
```


If passing through **github** URL

```bash
docker build github.com/roshan4074
```


you can check the container with the command:

```bash
sudo docker images
```


To apply a tag to an image you the command: **docker** tag

```bash
sudo docker tag <container_id>
```


To comment a code use the "#' symbol followed by the text

To specify the contact info of the Maintainer of the Dockerfile:

MAINTAINER Name contact@email

To trigger a command as soon as a container starts, use ENTRYPOINT instruction

ENTRYPOINT echo "Hello, Container Started"

Another Format to use ENTRYPOINT Instrcution is

ENTRYPOINT ["echo", "Hello, Container Started"]

This is the preferred format

e.g

ENTRYPOINT ["wc", "-l"]

To execute a certain command by a particular user use the command USER

USER roshan

T open a particular port for a process use EXPOSE instruction

EXPOSE 8080