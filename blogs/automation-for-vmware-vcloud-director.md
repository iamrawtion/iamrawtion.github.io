---
title: "Automation for VMware vCloud Director using Chef's knife-vcloud"
date: "2014-03-17"
category: "DevOps"
tags: ["Chef", "Cloud Computing", "VMWare vCloud"]
excerpt: "Some right reserved by jdhancock Plugin is available at <https://github.com/opscode/knife-vcloud> Configuration used: - CentOS 6.5 - Chef 11.8.2 -..."
author: "Roshan Nagekar"
---

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgyNcpTiQ8exUkJSq57cSwVbXDcgCI5dGxg6zzFwhbq8hJl5MWEO4HoDDLlD18u0JCKRQrMXCDfNtJ1FsOFQQc0x6NRuBOvdcJWwb0VzcRkRVQsfOQ6QQ9KhAoLa8NY3hDk0u58gE-q7e4/s1600/5049287009_9d310d2c2a_q.jpg)

Some right reserved by [jdhancock](https://www.flickr.com/photos/jdhancock/)

Plugin is available at <https://github.com/opscode/knife-vcloud>

*Configuration used:*

- **CentOS** 6.5
- Chef 11.8.2
- knife-vcloud 1.0.0

*Following steps were used to complete the automation process:*

```bash
cd ~
git clone <https://github.com/opscode/knife-vcloud.git>
cd knife-vcloud/
```

bundle install
```bash
gem build knife-vcloud.gemspec
gem install knife-vcloud-1.0.0.gem
gem list | grep vcloud
- See if after entering the above command you
see the gem knife-cloud. If yes the setup was successful. If no
```

something went wrong.

```bash
cd ~./chef
```

vim knife.rb

- add the following details to the last line of this file (Note: username is @ i.e organisation name supplied) :

knife[:vcloud_username] = "username@orgname"
knife[:vcloud_password] = "##########"
knife[:vcloud_host] = "xxx.xxxxxxxxxxxxx.com"

[ESC]:wq

knife vcloud server list

- Should list all the existing servers

You can also create your own server using "**knife vcloud server create**" with additional parameters with caution.

e.g

knife
```bash
vcloud server create --vcpus 2 -m 1024 -I TestServer -A 'roshan' -K
"MyPassword" -r 'role[webserver]' --network myNetword-id
```

Good Luck!!

*Reference Links:*

- <https://github.com/opscode/knife-vcloud>
- <http://blogs.clogeny.com/category/tutorials/>
- <http://www.getchef.com/blog/chefconf-talks/writing-a-knife-plugin-for-your-shiny-new-vmware-vcloud-director-based-cloud-chirag-jog/>

## Why Automate vCloud Director?

vCloud Director is VMware's cloud orchestration layer — the control plane sitting above vSphere that service providers and enterprises use to carve up compute resources into tenant-facing virtual datacenters. Without automation, every new VM means clicking through the vCD web UI: pick a template, configure compute, assign a network, wait for provisioning. That workflow doesn't scale past a handful of VMs, and it's not repeatable in any meaningful sense.

knife-vcloud extends Chef's knife CLI to treat vCD the same way knife-ec2 treats AWS. You get a consistent interface — list servers, create servers, delete servers — without touching the UI. For teams already running Chef for configuration management, this was a natural fit: provision the VM through knife-vcloud, then immediately bootstrap it into your Chef environment. One pipeline, no manual handoffs.

This approach was particularly valuable in the 2013-2014 timeframe before Terraform's vCD provider existed and before infrastructure-as-code tooling for private clouds had matured. If you were running a VMware-based private cloud and wanted any kind of programmable provisioning, knife plugins were one of the few practical options.

## What knife-vcloud Can Do

The main operations you'd use day-to-day:

```bash
knife vcloud server list          # list all VMs
knife vcloud server create ...    # provision a new VM
knife vcloud server delete <id>   # destroy a VM
knife vcloud vapp list            # list vApps
knife vcloud network list         # list available networks
```

The `server create` command is where the real work happens. You pass it parameters for vCPUs, memory, the template ID, network assignment, and Chef role — and it handles provisioning and bootstrapping in one shot. The `vapp list` command is useful for understanding the vCD resource hierarchy: VMs live inside vApps, and vApps live inside virtual datacenters, so knowing your vApp structure is a prerequisite for anything else.

One practical note: the `knife.rb` configuration requires the username in `username@orgname` format because vCD uses organization-scoped authentication. Getting that format wrong produces authentication errors that aren't always obviously auth-related — worth double-checking if you're hitting connection issues on a fresh setup.

## The Modern Alternative: Terraform vCD Provider

If you're starting a new vCD automation project today, the [VMware vCloud Director provider for Terraform](https://registry.terraform.io/providers/vmware/vcd/latest/docs) is where you should start. It provides full declarative lifecycle management of vApps, VMs, networks, edge gateways, and organization settings as HCL code.

```hcl
provider "vcd" {
  user     = var.vcd_user
  password = var.vcd_password
  url      = "https://vcd.example.com/api"
  org      = "MyOrg"
  vdc      = "MyVDC"
}

resource "vcd_vapp" "web_tier" {
  name = "web-vapp"
}

resource "vcd_vapp_vm" "web_server" {
  vapp_name     = vcd_vapp.web_tier.name
  name          = "web-01"
  catalog_name  = "MyOrg-Catalog"
  template_name = "CentOS-7-Template"
  memory        = 2048
  cpus          = 2
  cpu_cores     = 1

  network {
    type               = "org"
    name               = "MyOrgNet"
    ip_allocation_mode = "POOL"
  }
}
```

The Terraform approach gives you state tracking (Terraform knows what it created and can destroy or modify it later), a plan step that shows you what will change before it happens, and the full ecosystem of Terraform modules and CI integration. knife-vcloud was an imperative tool — run a command, something happens. Terraform is declarative — describe the desired state, Terraform figures out the steps.

## Lessons from Early IaC

Looking back, knife-vcloud represented one of the earliest practical attempts at infrastructure-as-code for VMware environments. The tooling was rough — the plugin ecosystem was fragmented, error messages were opaque, and keeping knife plugins compatible with Chef upgrades was its own ongoing maintenance burden.

But the underlying principle was exactly right: treat your infrastructure the same way you treat your application code. Define it programmatically, apply it consistently, version-control the definitions. knife-vcloud did that, just with more friction than we'd accept today.

Terraform didn't change the concept — it just made the execution much cleaner. The declarative model, state management, and plan/apply workflow that Terraform introduced solved the biggest operational problems with the imperative approach. If you're evaluating IaC tooling now, start with [HashiCorp Terraform](https://developer.hashicorp.com/terraform/docs). The vCD provider is actively maintained and covers the full vCD API surface.
