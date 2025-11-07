---
title: "Learning Chef - Part - II"
date: "2014-05-23"
category: "DevOps"
tags: ["Chef", "Devops", "Server"]
excerpt: "some rights reserved by Matt Ray ...continued from Learning Chef - Part - I Consider you have to install an application. You 1st install and..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj41IkzbAwgVTtYH_dpbXIYtkTpYU7v4GCUgG0hbYPH6oS6Ff5fVaIVIyQw8Q_K8zm3EB0fEi-wXBzjJtk2gcVJG8JIVavRsyobzKtFwr8tpq3F-UJhA1zqQ09g5VBDzFptS9yrUuy6Te4/s1600/5596555824_bcdedb0d50_m.jpg)

some rights reserved by [Matt Ray](https://www.flickr.com/photos/mray/)

...continued from  [Learning Chef - Part - I](http://roshannagekar.blogspot.in/2014/04/learning-chef-part-i.html)

Consider you have to install an application. You 1st install and configure the application on a single server. It could be a developers laptop/workstation. In order to setup the application you have to perform various installation procedures i.e install packages, start services, manage database etc.
After sometime you are going to make the Application available to a larger number of public than your laptop/workstation can handle and so will need to add a database server and will make this a multi tier application. So now we have one server handling the Application request and a separate server for database. To avoid data loss we will add another App server and Database server to keep the data redundant so that data loss is avoided.
As time passes the load increases on the server with more number of people trying to access the server so we may need to add a scaling solution like a load-balancer to the server.
As in how the application usage increase and the amount of users increases we will need to add more and more app servers and add more load balancers for them.
As the database is not able to cope up with the high demand, we need to add a DB cache to the existing solution, Making the infra even more complex.

Chef is Infrastructure as a code.
Using Chef you can programmatically provision and configure components.
Chef ensures that each node complies to the policy.
Policies are determined by the configurations included in each Node's run list.
You can define the policy in your Chef configuration.
Your policy states what state each resource should be in, but not how to get there.
Chef-client will pull the policy from the Chef-server and enforce the policy on the Node.
Policy will state what needs to installed but not how it needs to install.
Chef is intelligent enough to figure that out.
Chef will enforce the policy based on the resource that you specified.

## Setup

Setup a Chef Environment first by setting up Chef workstation, use the following command on **Ubuntu**,

```bash
curl -L https://www.opscode.com/chef/install.sh | sudo bash
```

 Login to manage.opscode.com and download the starter-kit there. Extract the chef-repo to your home directory. It should show the following contents.

```bash
cd chef-repo
ls
```

  .berkshelf
  .chef
  cookbooks
  roles
  .gitignore
  Berksfile
  chefignore
  README.md
  Vagrantfile

Check the .chef file present in the directory, it should show the following content.

```bash
cd .chef
```

  knife.rb
  org-validator.pem
  user.pem

Knife.rb will show your chef-server configuration for the workstation to be identified by the chef-server.

vim knife.rb
  # See http://docs.opscode.com/config_rb_knife.html for more information on knife configuration options

  current_dir = File.dirname(__FILE__)
  log_level                :info
  log_location             STDOUT
  node_name                "user"
  client_key               "#{current_dir}/user.pem"
  validation_client_name   "org-validator"
  validation_key           "#{current_dir}/org-validator.pem"
  chef_server_url          "https://api.opscode.com/organizations/user"
  cache_type               'BasicFile'
  cache_options( :path => "#{ENV['HOME']}/.chef/checksums" )
  cookbook_path            ["#{current_dir}/../chef-repo/cookbooks"]

## Writing Recipes

*package "apache2" do*
*action :install*
*end*

*template "/etc/apache2/apache.conf" do*
*source "apache2.conf.erb"*
*owner "root"*
*group "root"*
*mode "0644"*
*variable(:allow_override => "All")*
*notifies :reload, "service[apache2]*

*service "apache2" do*
*action [:enable,:start]*
*supports :reload => true*
*end*

Lets consider the above recipe and understand it.
Each recipe has resources in it. The resources have :

- types -> package, template, service are the types of resources in the code
- names -> apache2, /etc/apache2/apache.conf, apache2(service) are the names of the resources in the code
- parameters ->   source "apache2.conf.erb"   owner "root"   group "root"   mode "0644"   supports :reload => true
- action to put the resource on desired state -> action :install, action [:enable,:start]
- send notification to other resources -> notifies :reload, "service[apache2]

A cookbook can be created by the command

*knife cookbook create cookbookname*

This will automatically create the cookbook along with all the necessary files inside it. You can delete, check the available cookbooks, delete a cookbook, upload and download a cookbook using different knife commands. You can check all the options by

*knife cookbook --help*

To bootstrap a new node you need to use the following command*:*

```bash
knife bootstrap hostname --sudo -x username -P password --ssh-port 2222 -N nodename
```

## Creating Environments

Many a times you will want development environment and production environment to have little different configurations. e.g xdebug to be installed on dev but not on production. PayPal enabled on prod but not dev etc. Chef allows you to define different environments and also allows you to assign different nodes to a particular environment.

create a directory called environments in the chef-repo. Add the following content to a file dev.rb in it.

name "dev"
description "The dev environment"

create another file called prod.rb there and add the following content to it.

name "prod"
description "The prod environment"

Upload the environment to the chef server.
You can verify whether the environments are created in the chef server by logging in there.

## Creating roles

Roles provide a way to apply a group of recipes and attributes to all the nodes performing a particular function. e.g all the nodes which would work as db server can be assigned a db server roles and accordingly all the db server specific recipes can be applied to those nodes.

Roles can be created in the following manner. Create a roles directory in the chef-repo if it does not exist. add a file base.rb there with the following content.

name "base"
description "Base role applied to all nodes."
run_list(
  "recipe[users::sysadmins]",
  "recipe[sudo]",
  "recipe[apt]",
  "recipe[git]",
  "recipe[build-essential]",
  "recipe[vim]"
)
override_attributes(
```json
  :authorization => {
    :sudo => {
      :users => ["ubuntu", "vagrant"],
      :passwordless => true
    }
  }
```

)

Here the runlist method defines a list of recipes to be applied to all the nodes that have base role. The override_attributes method tells lets us override the default attributes used by the recipes in the list. Here we are overriding attributes used by the sudo cookbook so that "**vagrant**" and "**ubuntu**" users can run sudo without entering password.

Next create another role Webserver by creating a file webserver.rb in the roles directory with the following content.

name "webserver"
description "Web server role"
```json
all_env = [
  "role[base]",
  "recipe[php]",
  "recipe[php::module_mysql]",
  "recipe[apache2]",
  "recipe[apache2::mod_php5]",
  "recipe[apache2::mod_rewrite]",
]
```

run_list(all_env)

env_run_lists(
  "_default" => all_env,
  "prod" => all_env,
  #"dev" => all_env + ["recipe[php:module_xdebug]"],
  "dev" => all_env,
)

Here it shows that a method env_run_lists method in a role to define different run lists for different environments. To simplify things we create an all_env array to define the common run list for all environments, and then merge in any additional run list items unique to each environment.

Next create another role db_master.rb file with following contents:

name "db_master"
description "Master database server"

```json
all_env = [
  "role[base]",
  "recipe[mysql::server]"
]
```

run_list(all_env)

env_run_lists(
  "_default" => all_env,
  "prod" => all_env,
  "dev" => all_env,
)

---

## upload the created roles to chef-server and also verify the same. Upload roles by

knife role from file roles/base.rb
knife role from file roles/webserver.rb
knife role from file roles/db_master.rbenv

---

## Setting up a user account for sys-admin

Define a user account for yourself on all the nodes with admin privileges. This can be done by defining a data bag for the users cookbook, with attributes that describe the user account to create.

```bash
mkdir -p data_bags/users
vim data_bags/users/$USER.json
```

Add the following to the $USER.json
```json
{
  "id": "jkg",
  "ssh_keys": "ssh-rsa ...SecretKey... roshan4074@gmail.com",
  "groups": [ "sysadmin", "dba", "devops" ],
  "uid": 2001,
  "shell": "\/bin\/bash"
}
```

Upload the data bag as well to the chef-server and verify
knife data bag create users
knife data bag from file users $USER.json
