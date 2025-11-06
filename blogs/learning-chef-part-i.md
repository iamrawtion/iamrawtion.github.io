---
title: "Learning Chef - Part - I"
date: "2014-04-26"
category: "DevOps"
tags: ["Chef", "Devops", "Server"]
excerpt: "some rights reserved by Matt Ray The information here has been collected from Nathan Harvey's Video tutorials on Chef's website and from Chef's..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj41IkzbAwgVTtYH_dpbXIYtkTpYU7v4GCUgG0hbYPH6oS6Ff5fVaIVIyQw8Q_K8zm3EB0fEi-wXBzjJtk2gcVJG8JIVavRsyobzKtFwr8tpq3F-UJhA1zqQ09g5VBDzFptS9yrUuy6Te4/s1600/5596555824_bcdedb0d50_m.jpg)

some rights reserved by [Matt Ray](https://www.flickr.com/photos/mray/)

The information here has been collected from Nathan Harvey's Video tutorials on Chef's website and from Chef's official documentation. Before starting with the tutorial, I thought it would be better to understand common jargons used in chef.

Three primary entities: workstation, chef-server, node

- **Chef-Work Station** : System from where the configuration management professional / **devops** / sys admin will be working.
- **Chef-Server** : System/Server where all the infrastructure as a code will be stored. Also the Chef-Server will have many other features that we will seee later.
- **Nodes** : Servers in your infrastructure that will be managed by chef,

  They may represent a physical server or a virtual server. They may
  represent hardware you own or multiple compute instances in a public or a
  private cloud. Each node will belong to one organization and and other
  organization may not have access to it. Each node will belong to one
  environment. Either in staging or Production etc. Each node will have
  zero or more roles. An application called chef-client run on each of
  the node. The chef-client will gather the current system configuration.
  It will download the desired system configuration from the Chef-server
  and configure that node such that it adheres to the policy defined.

- **Knife** : Command line utility that acts as an interface between local chef-repo(on work station) and server. Knife

  lets you manage nodes, cookbooks, recipes, roles, stores of **json** data,
  including encrypted data, environments, cloud resources including
  provisioning. The installation of chef on management workstations,
  Searching of indexed data on chef server. You can even extend knife to
  use plugins for managing cloud resources. E.g knife-ec2,
  knife-rackspace, knife-vcloud plugins.

- **Cookbooks** : A cookbook is a container to describe or to contain our

  configuration data. It contain the recipes. It can also include
  templates, files, custom resources etc.

- **Recipes** : A Recipe is a

  configuration file that describes resources and their desired state. A
  recipe can install and configure software components, Manage files,
  Deploy Applications, Execute other recipes, etc.

- Sample Recipe

package
"apache2" // 1st resource is package and chef knows that it should be
installed on the server. If the package doesn’t exist it will install it.

template
"/etc/apache2/apache.conf" do //Next resource is a template. The
template will manage a file at /etc/apache2/apache.conf

```bash
source "apache2.conf.erb"
```

owner "root"

group "root"

mode "0644"

variable(:allow_override => "All")

notifies :reload, "service[apache2] //state of the apache2 if
apache2.conf exist it knows that it doesn’t need to create that file.
However chef needs to make sure that the file has proper contents. So it
will generate a temporary file. It will use the source that we
specified above apache2.conf.erb and then it will also use any variable
content that we specified, i.e AllowOverride All. Once the temporary
file is created, Chef will then compare the two files. If they are the
same, chef will discard the temporary file and then move on to the next
resource, then notifies line will be ignored. However if the two files
are different. The chef-client will discard the version on the disk and
place the temporary file into the proper location, i.e overwrite
existing file. Whenever the overwrite happens a notification will be
sent. Then it will tell **Apache** to reload with new configs.

end

```bash
service "apache2" do //service should be enabled and start automatically
```

action [:enable,:start]

```bash
supports :reload => true
```

end

- **Roles** : A way of identfying different types of servers. e.g Load-balancer, app server, DB cache, DB , monitoring etc. Roles may

  include list of configs to be applied called as runlist. May include
  data attributes for configuring infra, i.e ports to listen on, list of
  apps to be deployed.

- **Data bags** : Stores of **json** data
- **Attributes** : Attributes are mentioned in cookbooks/recipes. An attribute gives the detail about the node. It tells about the state of the node; before the chef-client run, present state and state after the chef-client run
- **Resources** : Items that we sysadmins manipulate to manage complexity.

  i.e Networking, Files, Directories, Symlinks, Mounts, Registry key,
  Scripts, Users, Groups, Packages, Services File-systems etc. Resource
  represent a piece of the system and its desired state. e.g a package to
  be installed, A service to be running, A file to be generated, a cronjob
  to be configured, a user to be managed, etc.

- **Ohai** : Ohai is a tool used to detect the attributes on the node. These attributes are then passed to the chef client at the beginning of the chef-client run. Ohai is installed on a node as a part of chef-client installation. Ohai has the following types of attributes: Platform details, Network usage, Memory usage, Processor usage, Kernel data, Hostnames, FQDNs, etc. So, Ohai is a utility that will give you all the information of your system level data.
- **Shef** : Chef-Shell was earlier known as Shef. Its a recipe debugging tool that allows breakpoints within recipes. Its runs as an irb session.
- **Environments** : Environments can be development, test, staging and

  production. They may contain data attributes specific to an environment.
  Starts with single environment e.g default is 1st. Different names/URLs for payment services, location for package repository, version of
  chef configs etc.

- **Run List** : The joining of a node to a set of

  policies is called as a run-list. The chef-client will download all the
  necessary components that make up the run-list.e.g recipe[npt::client],
  recipe[users], role[webserver]. Run List is a collection of policies
  that a node should follow. Chef-client obtains the run-list from
  chef-server. chef-client ensures the node complies with the policy in
  the run-list.

- **Search** : You can search for nodes with Roles, Find topology data, i.e IP addresses, hostnames, FQDNs. Searchable

  index about your infrastructure. e.g load balancer needs to know which
  application should I be sending requests to? Chef-client can ask
  Chef-server which application servers are available and which
  application server should I be sending load to. And in return the chef
  server can send a list of nodes and then the load balancer can figure
  out which one based on the hostname or IP address or Fully Qualified Domain Name.

- **Organization** : Everyone has their own infra and wont

  manage anyone else's infra. Organizations are independent tenants on Enterprise chef. So this could be different companies, business units or
  departments for managing.
