---
title: "Virtualization with Vagrant"
date: "2014-02-24"
category: "DevOps"
tags: ["Vagrant", "VirtualBox", "Virtualization", "VMWare"]
excerpt: "some rights reserved by MedithIT going ahead with Chef configuration management tutorials i came across \"Vagrant\". I heard this term many a times...."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi51IzgtjkyuyM8RHG3lO05zUFmq2RFLw8jea0pdouizGvrNVR0ORMlS3uboSpwttDEaTFEyMWWLSgWAj5ibJaKd2uZC3xaerHSu33gYmO0CmCdzvMUdwIMlA7ipx0Wr5UrxvmMn9staY4/s1600/8105172928_85711c5d95_m.jpg)

some rights reserved by [MedithIT](https://www.flickr.com/photos/medithit/)

  
While
going ahead with Chef configuration management tutorials i came across
"Vagrant". I heard this term many a times. For quite sometime i
thought it was just another VirtualBox like application. until i finally
started using it.

  

**What is
Vagrant?**

  

Open Source
application for creating and configuring virtual dev environment. Vagrant
manages VMs hosted in VirtualBox. Basically its a commandline utility that
allows you to communicate with VirtualBox (or any virtualization software) with
an easy set of commands. Many describe it as a wrapper around the
virtualization software too.

  

**How is it
used?**

  

Fist of
all download Vagrant for your OS from this [link](http://www.vagrantup.com/downloads).
Install it. As mentioned its a commandline utility tool, you need commandline
to access this.

1. You will need to **initialize
   vagrant box** using the init command. This will initialize a
   vagrant environment in the present directory you are in. The second
   argument will set the name for your box and the third will set the URL
   to access in the Vagrant file.

- *Syntax: vagrant init [box-name] [url-to-access]*
- *Example: vagrant init precise32 <http://files.vagrantup.com/precise32.box>*

2. Next you need to **create and configure** the vagrant box as per your vagrant file. Use the up command for this. This command will be used frequently as this is how you **start** you machine as well.

- *vagrant up*

3. Now that the machine has started you still have not logged in to the machine. You can use **ssh to login**. You don't need to use the traditional long ssh command to login to your box a simple vagrant ssh suffices.

- *vagrant ssh*

- Note:
  Please check the documentation on the vagrant website as there is a
  list of optional parameters that you may need in case you run into any
  errors. Fatal can be expected.

4. To check valid **configurations to ssh** into a running vagrant box use vagrant ssh-config

- *vagrant ssh-config*

5. As you now know how to setup and start using your vagrant box, we also need to know how to **shut it down**. This is simple too by just a "vagrant halt" similar to the halt command in linux machine.

- *vagrant halt*

6. These were the few basics of vagrant. You can do more with vagrant as well. The vagrant box command gives you **other alternatives** that you could try out.

- *vagrant box add [box-name] [url-path]*

- This adds a box with the specified name using the local file path or url specified to access it.

- *vagrant box list*

- Lists all the boxes installed and available

- *vagrant box remove [box-name] [provider]*

- Removes the box with the specified box name for the specific provider. Providers are VirtualBox or VMWare or any other utility.

- *vagrant box repackage [box-name] [provider]*

- Repackages
  the given box and puts it to present directory for redistribution
  purpose. When a box is added, vagrant unpacks and stores it internally
  and the original box is not preserved.

7. **Restarting** a vagrant machine can be done using vagrant reload. Its equivalent to a vagrant halt and vagrant up.

- *vagrant reload*

8. To **check the current state** of the machine, i.e to verify if the machine is running, stopped or not created etc a status command helps

- *vagrant status*

9. To **save the status of the machine and suspend** it so that you can resume it at a later instance and not completely shut it down, you can use suspend command.

- *vagrant suspend*

10. To **resume a suspended machine** use vagrant resume

- *vagrant resume*

11. Finally, to **stop and delete/destroy**
    and existing machine use the destroy command. All the resources
    allocated are destroyed as if the machine was never there. This command
    asks for confirmation before destroying.

- *vagrant destroy*