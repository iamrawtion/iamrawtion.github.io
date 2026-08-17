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

We left all the other information fields there blank except for the MAC-ADDRESS. You can get the mac address of your computer by ipconfig on windows and ifconfig on **Ubuntu** - Ubuntu users can do:

```bash
ifconfig | grep hwadrs
```

## Then we went to

http://maas.ubuntu.com/docs/juju-quick-start.html

Thereafter we created ~/.juju/environments.yaml
vim ~/.juju/environments.yaml
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

## roshan@ubuntu-cloud:~$ sudo juju bootstrap
error: cannot start bootstrap instance: cannot run instances: gomaasapi: got error back from server: 409 CONFLICT

CONFLICT from maas means that it doesn't have any nodes available for juju to acquire (juju bootstrap needs to boot a node).
It's not the best error unfortunately, juju needs fixing to show all the text. You need the server edition of 12.04

Nodes were disconnected for sometime...
Next article should have the addition of nodes...

## Why Private Cloud Still Makes Sense in 2024

Public cloud providers like AWS, GCP, and Azure dominate the conversation around infrastructure, and for good reason — they offer virtually unlimited scale, global availability, and a managed-everything model that lets small teams move fast. But private cloud is far from obsolete. For many organizations, it remains the more sensible choice, and here is why.

**Cost at scale.** The economics of public cloud flip around the 200-node mark. Below that threshold, the operational overhead of running your own hardware typically outweighs the monthly bill savings. Above it, the math reverses sharply. A bare-metal node you own and operate costs a fixed amount amortized over three to five years; an equivalent cloud VM carries an ongoing per-hour charge that compounds. Large enterprises and research institutions running steady-state workloads — not variable, bursty ones — consistently find on-premises infrastructure cheaper at sustained scale.

**Data sovereignty and compliance.** Regulations such as GDPR in Europe and HIPAA in the United States impose strict requirements on where data lives and who can access it. Multi-tenant public cloud environments can satisfy these requirements, but doing so often requires premium tiers, additional contractual agreements, and complex network architectures. A private cloud gives you unambiguous control: the data physically stays on your hardware, in your facility, subject to your access policies. For healthcare providers, financial institutions, and government agencies, this is not optional — it is a hard requirement.

**Latency-sensitive workloads.** Real-time trading systems, industrial control systems, and low-latency media processing cannot tolerate the variable round-trip times inherent in traversing the public internet to a cloud provider's data center. Co-locating compute with data — which a private cloud enables — can shave milliseconds that matter enormously in these contexts.

**Hybrid scenarios.** Private cloud does not have to mean cloud-free. A common pattern is to run steady-state workloads on-premises while bursting to public cloud during demand spikes. MAAS integrates well with this model: it provisions the on-premises layer, and tools like Juju or Terraform handle the hybrid orchestration layer on top.

## MAAS in 2024: What's Changed

MAAS has matured considerably since the early 2013 days described in this post. Version 3.x introduced several features that make it competitive with more complex provisioning stacks.

**Kubernetes integration** is now a first-class concern. MAAS 3.x can serve as the bare-metal provisioning layer for Charmed Kubernetes deployments, with better lifecycle hooks for machine commissioning and decommissioning that align with Kubernetes node join/drain workflows.

**LXD VM support** allows MAAS to provision not just physical machines but also LXD virtual machines running on MAAS-managed hosts. This is useful for mixed fleets where you want hardware-level control over some nodes but need the flexibility of VMs for others — all managed through a single MAAS interface.

**Improved UI and API.** The web interface has been significantly redesigned for clarity, and the REST API has stabilized enough to support robust automation. Infrastructure-as-code pipelines can drive MAAS via its API without resorting to manual click-through.

For current documentation and release notes, see [https://maas.io/docs](https://maas.io/docs).

## Alternatives to MAAS

MAAS is one tool in a broader ecosystem. Depending on your requirements, one of these alternatives may be a better fit.

**OpenStack** is the go-to choice when you need a full IaaS stack — compute, networking (Neutron), block storage (Cinder), and object storage (Swift) — that closely mirrors what public cloud providers offer. It is significantly more complex to deploy and operate than MAAS, but it gives you tenant isolation, self-service provisioning, and a rich API surface. Use it when you need multi-tenant cloud functionality at scale.

**Proxmox VE** is a hypervisor management platform built on KVM and LXC. It is far simpler to get running than either MAAS or OpenStack, and its web UI is approachable for teams without a dedicated infrastructure engineer. The trade-off is that it is fundamentally a hypervisor manager rather than a bare-metal provisioner — it does not handle PXE booting physical machines into arbitrary OS configurations the way MAAS does. Use it when your workloads are VM-based and your cluster is small to medium sized.

**Harvester** is a newer entry in the hyperconverged infrastructure (HCI) space. Built on Kubernetes, Longhorn storage, and KubeVirt, it lets you run VMs directly on a Kubernetes-native platform. If your target destination is Kubernetes and you want a single platform that handles both VMs and containers, Harvester is worth evaluating. It integrates directly with Rancher for multi-cluster management.

**When to use MAAS:** You need to provision diverse bare-metal hardware into heterogeneous operating systems at scale, and you want a lightweight tool that stays out of the way beyond provisioning.

## Adding Kubernetes on Top

One of the most compelling use cases for MAAS is as the foundation for a bare-metal Kubernetes cluster. Rather than running Kubernetes on VMs (which adds a hypervisor layer and its associated overhead), you can use MAAS to provision physical nodes directly into Ubuntu, then install Kubernetes on top.

**MicroK8s** is the simplest path. Once MAAS has commissioned and deployed your nodes, you install MicroK8s on each one:

```bash
sudo snap install microk8s --classic
microk8s add-node  # run on the control plane to get the join command
```

Worker nodes join the cluster with a single command output by `add-node`. MicroK8s handles the rest, including an optional built-in load balancer and storage add-ons.

**k3s** is a lightweight Kubernetes distribution from Rancher that works equally well on MAAS-provisioned nodes. It is particularly suited to edge deployments or clusters where resource overhead needs to be minimal:

```bash
curl -sfL https://get.k3s.io | sh -   # on the server node
curl -sfL https://get.k3s.io | K3S_URL=https://<server>:6443 K3S_TOKEN=<token> sh -  # on agents
```

The result is a production-capable Kubernetes cluster running on hardware you own and control, provisioned and lifecycle-managed by MAAS. When a node needs to be replaced, MAAS handles re-imaging; when Kubernetes needs a new node, MAAS provides it. The combination gives you the automation of cloud-style infrastructure without the recurring cost or data sovereignty concerns of a public cloud deployment.
