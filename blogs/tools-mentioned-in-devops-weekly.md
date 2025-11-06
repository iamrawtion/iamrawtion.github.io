---
title: "Tools mentioned in Devops Weekly"
date: "2017-12-18"
category: "DevOps"
tags: []
excerpt: "All credits to http://www.devopsweekly.com/ looked after by Looked after by Gareth Rushgrove. Kashti is a dashboard for anyone using Brigade, a tool..."
author: "Roshan Nagekar"
---

All credits to http://www.devopsweekly.com/ looked after by Looked after by [Gareth Rushgrove](http://morethanseven.net/).  
  
  
  
Kashti is a dashboard for anyone using Brigade, a tool I’ve mentioned
previously for building elaborate pipelines composed of multiple
containers running on Kubernetes.  
  
<https://open.microsoft.com/2017/12/06/kashti-kubernetes-open-source-microsoft/>  
<https://github.com/Azure/kashti>  
  
  
Jo is a handy utility which can output JSON based on arguments to the CLI tool. Handy for API testing and other use cases.  
  
<https://github.com/jpmens/jo>  
  
  
Kitchen Terraform is a plugin for Test Kitchen to allow for testing resources provisioned by Terraform.  
  
<https://newcontext-oss.github.io/kitchen-terraform/>  
  
  
Escape is a toolset for release engineering, life-cycle management and
continuous delivery of software platforms and artefacts. Unlike some
similar tools it hands off much of the work to other lower-level
platforms or command line tools and focuses on the integration piece.  
  
<https://github.com/ankyra/escape/>  
<https://escape.ankyra.io/docs/what-is-escape/>  
  
  
Metaparticle is a new project aiming to be the standard library for
distributed systems. It takes advantage of the capabilities of
Kubernetes to expose features like master election and container
packaging and scale out, with current implementations in .NET, Java and
Javascript.  
  
<https://metaparticle.io/posts/welcome-to-metaparticle/>  
<https://metaparticle.io/>  
  
  
SockGuard is a eat new project which provides a proxy to the Docker socket which exposes some useful access control features.  
  
<https://github.com/buildkite/sockguard>  
  
 MetalLB is a Kubernetes-native load balancer for environments where the
cloud-provider load balancer integration isn’t suitable, for instance
when running a bare-metal cluster.  
  
<https://github.com/google/metallb>  
  
  
SPIFFE is a set of open-source standards for securely identifying
software systems in dynamic and heterogeneous production environments.
It’s still in development, but a useful shared solution to a common
problem.  
  
<https://spiffe.io/>  
<https://github.com/spiffe/spiffe>  
  
  
The Chaos Toolkit is a set of tools for describing and running chaos
engineering style experiments against your systems. The tutorial does a
good job of introducing the toolset.  
  
<http://chaostoolkit.org/>  
<https://github.com/chaostoolkit/>  
  
 container-diff is a new tool for comparing container images, either
locally or from a remote repository. It detects packages from a number
of package management tools, as well as filesystem changes. Useful for
debugging image build problems.  
  
<https://opensource.googleblog.com/2017/11/container-diff-for-comparing-container-images.html>  
<https://github.com/GoogleCloudPlatform/container-diff>  
  
  
Open Policy Agent is an interesting new project providing which provides
a DSL for describing policy, and software to ensure described systems
remain compliant. Examples include managing Kubernetes API admission,
Terraform permissions and SSH authorization.  
  
<http://www.openpolicyagent.org/>  
  
I’ve seen (and build) a few integration testing setups for container
images, but DockerSpec aims to come with everything out-of-the-box.
RSpec helpers for testing Dockerfiles, image builds, running containers,
Compose and more.  
  
<https://github.com/zuazo/dockerspec>  
  
Neugram is a new scripting language, based heavily on Go, but with some
useful tricks to cut down on some of the syntax. It also provides a REPL
and shebang support.  
  
<https://neugram.io/blog/neugram-briefly>  
<https://neugram.io/>  
  
  
Psykube provides a slightly higher-level abstraction that the raw APIs for describing applications running on Kubernetes.  
  
<https://github.com/CommercialTribe/psykube>  
  
  
CIM looks like a handy tool for anyone managing AWS CloudFormation
templates. Rather than try and provide an abstraction, CIM provides a
number of helpful user interface tools which make working with templates
easier.  
  
<https://medium.com/@rgfindley/meet-cim-cloud-infrastructure-manager-bc8bcfe0593c>  
<https://github.com/thestackshack/cim>  
  
lstags is a handy tool for comparing Docker images between repositories,
as well as automatically syncing images between repositories.  
  
<https://github.com/ivanilves/lstags>  
  
  
Brigade is a new workflow tool for Kubernetes environments, allowing for
writing JavaScript to define pipelines for running containers. Supports
timers, listening to events from services like GitHub or Docker image
repositories and more.  
  
<http://brigade.sh/>  
<https://github.com/azure/brigade/>  
  
OpenMetrics is a public working group looking to determine a standard
for exposing metrics data, influenced by the Prometheus exposition
format. I’m a big fan of adhoc agreement so hopeful this takes off.  
  
<https://github.com/RichiH/OpenMetrics>  
  
Kapitan is another Jsonnet based configuration tool for Kubernetes. As
well as configuration templates it provides built-in support for
generating documentation and scripts, and a tool for separating data
from configuration.  
  
<https://github.com/deepmind/kapitan>  
  
  
Tarmak is a new toolkit for managing and provisioning a Kubernetes
cluster. It makes use of Packer, Puppet, Terraform and Docker to provide
a degree of platform independence, but provides a higher-level CLI
interface and good defaults for a secure, CI/CD ready cluster.  
  
<http://docs.tarmak.io/en/latest/>  
<https://github.com/jetstack/tarmak>  
  
Kedge aims to provide a high-level data-centric interface for describing
Kubernetes applications, with a focus on good defaults and familiarity
for folks already using the lower-level APIs.  
  
<http://kedgeproject.org/>  
<https://github.com/kedgeproject/kedge>  
  
  
The Docker Version Manager (dvm) is a cross-platform command-line tool
that helps you install and switch between Docker clients. Handy if
you’re working with a range of different server versions.  
  
<https://howtowhale.github.io/dvm/>  
   
  
Kubesh is a handy tool for anyone managing several Kubernetes clusters.
It allows for spawning new shells with different Kubernetes contexts.  
  
<https://medium.com/@lestrrat/handling-multiple-kubernetes-clusters-using-kubesh-a7e2a1606bfa>  
<https://github.com/lestrrat/kubesh>  
  
  
Vespa is a new open source engine for executing and serving computations
over large data sets in real time. It allows you to write and persist
any amount of data, and execute high volumes of queries over the data
which typically complete in tens of milliseconds.  
  
<http://vespa.ai/>  
  
Chart Museum is an open source Helm Chart repository, for anyone using
the helm package manager with Kubernetes. It supports S3, Google Cloud
Storage backends and local storage, and the README contains details for
how to get up and running.  
  
<https://github.com/chartmuseum/chartmuseum>  
  
  
Ducktape is a framework for writing high-level system integration tests
for distributed systems, originally written to test Kafka.  
  
<https://github.com/confluentinc/ducktape>  
<https://ducktape-docs.readthedocs.io/en/latest/>  
  
  
Jaeger is an open source system for monitoring distributed systems, using the OpenTracing API.  
  
<https://github.com/jaegertracing/jaeger>  
  
Pumba is a tool for chaos testing in a Docker environment. Supports
interfering with network traffic to simulate connectivity issues and
stopping containers.  
  
<http://blog.terranillius.com/post/pumba_docker_chaos_testing/>  
<https://github.com/gaia-adm/pumba>  
  
  
AWX provides a browser-based user interface and API for Ansible. It
represents part of the Ansible Tower product, now available as an open
```bash
source project.  
```

  
<https://github.com/ansible/awx>  
  
  
Webhooks can be a useful way of integrating different software, but how
best to run a set of hooks? Enter webhook. Describe hooks in a simple
configuration file and point it ad executables and it exposes a simple
HTTP/S interface to run them.  
  
<https://github.com/adnanh/webhook>  
  
OK Log is a distributed and coördination-free log management system for
large clusters. It's designed to be a building block: easy to
understand, easy to operate, and easy to extend.  
  
<https://github.com/oklog/oklog>  
  
  
Cruise-control (not the CI system) is a new tool to fully automate the
```bash
dynamic workload rebalancing and self-healing of a large kafka cluster.  
```

  
<https://engineering.linkedin.com/blog/2017/08/open-sourcing-kafka-cruise-control>  
<https://github.com/linkedin/cruise-control>  
  
  
Gosu solves a specific problem for anyone building Docker images, namely
running an application as a different user but without interfering with
signal processing and TTY.  
  
<https://github.com/tianon/gosu>  
  
  
PlantUML is a text-based diagramming tool, and this project provides
primitives for diagraming with AWS service. Lots of good examples in the
README.  
  
<https://github.com/milo-minderbinder/AWS-PlantUML>  
  
 Squash looks like an interesting idea to build a debugger for
microservices. Currently it supports Kubernetes and VSCode. The rolling
demo gives you an idea of how it works.  
  
<https://github.com/solo-io/squash>  
  
  
Serverless applications have typically relied on platform-specific
services. For those interested in more cross-platform approaches the new
event gateway application from the folks behind the serverless
framework looks useful.  
  
<https://serverless.com/blog/introducing-serverless-event-gateway/>  
<https://github.com/serverless/event-gateway>  
  
  
Kubernetes Deploy is a new, high level, tool for deploying applications
to Kubernetes. It focuses not just on submitting changes, but helping
the user understand exactly what changed.  
  
<https://github.com/Shopify/kubernetes-deploy>  
  
Functions as a Service (or FaaS) is a new serverless framework aimed at running on top of Docker or Kubernetes.  
  
<https://blog.alexellis.io/introducing-functions-as-a-service/>  
<https://github.com/alexellis/faas>  
  
  
OpenEBS provides containerized block storage with per-container (or pod)
QoS SLAs, tiering and replica policies across AZs and environments, and
predictable and scalable performance.  
  
<https://github.com/openebs/openebs>  
   
  
Supercronic nicely solves the problem of running cron jobs in
containers, providing a cron implementation which happily takes
environment variables and outputs straight to stdout and stderr amongst
other features.  
  
<https://github.com/aptible/supercronic>  
  
  
Atlantis is a workflow tool for teams working with Terraform. It
provides some nice features to prevent common mult-users issues and
integrates with GitHub pull requests.  
  
<https://github.com/hootsuite/atlantis>  
  
Manifesto is a new tool for storing and retrieving Docker image metadata
alongside the image in question in a repository, including on Docker
Hub.  
  
<https://github.com/aquasecurity/manifesto>  
  
  
Terraboard is a handy dashboard for anyone using Terraform. It allows
for visualising and querying terraform state from a simple browser-based
interface.  
  
<https://github.com/camptocamp/terraboard>  
  
Kedge is looking to provide a concise application definition for
kubernetes. Higher-level than the full API wireformat, Kedge describes a
YAML file format which can be expanded by the bundled command line
kedge tool.  
  
<http://kedgeproject.org/>  
<https://github.com/kedgeproject/kedge>  
  
  
Jsonnet is cropping up in a number of places for managing configuration so it’s nice to see a native unit testing framework.  
  
<https://github.com/yugui/jsonnetunit>  
  
  
Buildah is a new tool for building OCI-compatible and Docker-compatible
images. It provides a series of commands for building images up, and can
also use existing Dockerfiles.  
  
<https://github.com/projectatomic/buildah>  
  
  
Karn is a tool for creating seccomp and apparmor profiles. It provides a
simple TOML based description language and a tool to convert multiple
declarations to the more complex profiles.  
  
<https://github.com/GrantSeltzer/karn>  
  
K8Guard is an auditing system for Kubernetes clusters. It monitors
different entities, like image size, third-party repository usage,
missing metadata, etc. on your cluster for possible violations.  
  
<https://target.github.io/infrastructure/k8guard-the-guardian-angel-for-kuberentes>  
<https://k8guard.github.io/>  
  
  
Kubicorn is another project in the Kubernetes management space. A
library more than a tool to use directly, kubicorn is a new projects but
with some interesting design goals.  
  
<https://github.com/kris-nova/kubicorn>  
  
Smith is a command line utility for building microcontainers from rpm
packages or oci images. The resulting image only contains the process to
be run and its direct dependencies, is particular careful about file
ownership and permissions and can be run read-only.  
  
<https://github.com/oracle/smith>  
  
  
 
Kubeval is something I’ve been hacking on recently to validate
Kubernetes config files. Especially if you’re generating those files
with templates, or supporting multiple versions of Kubernetes, this
might be handy.  
  
<https://github.com/garethr/kubeval>  
  
  
Kube Shell is exactly what you’d expect, a shell for interacting with
Kubernetes. Auto completion, command suggestion, history, inline
documentation and more.  
  
<https://github.com/cloudnativelabs/kube-shell>  
  
Kube-bench is a handy tool for checking a Kubernetes installation
against the published security guidelines in the CIS Kubernetes 1.6
Benchmark.  
  
<https://github.com/aquasecurity/kube-bench>  
  
  
ImageWolf is a new tool to help quickly distribute Docker images around a
cluster using BitTorrent. ImageWolf runs on Docker Swarm and can
integrate with both the Docker Hub and local registries.  
  
<http://container-solutions.com/lightning-image-deployment-imagewolf/>  
<https://github.com/ContainerSolutions/ImageWolf>  
  
  
Buildkit is a new, low level, tool for building container images. The
intention is to provide the backend for build in a separate package,
allowing for compatible but new and different build interfaces to be
built.  
  
<https://github.com/moby/buildkit>  
  
  
Managing secrets in a way that feels native to Kubernetes has been much
discussed. Sealed Secrets therefore looks like an potential approach
with some interesting properties.  
  
<https://github.com/bitnami/sealed-secrets>  
   
  
A nifty tool for anyone integrating Kubernetes into an existing
environment, pam_hook allows for using unix-style users and groups and
LDAP to provide tokens for use with the Kubernetes API.  
  
<https://github.com/bjhaid/pam_hook>  
  
  
CredStash is a very simple, easy to use credential management and
distribution system that uses AWS Key Management Service (KMS) for key
wrapping and master-key storage, and DynamoDB for credential storage and
sharing.  
  
<https://github.com/fugue/credstash>  
  
  
Have you ever wanted to search through a filesystem but forgotten the
magic incantations to find or ack? Fsql provides an interesting SQL
alternative for a wide range of file system queries.  
  
<https://github.com/kshvmdn/fsql>  
  
  
Welder is a simple script execution tool, intended for bootstrapping server instances with as few features as possible.  
  
<https://github.com/pch/welder>  
  
Draft is a new high-level tool for managing kubernetes applications,
targeting the local development experience with packs for common
development environments.  
  
<https://github.com/Azure/draft>  
  
  
An interesting approach to creating distroless container images, using
Bazel to build a minimal base image and accompanying language runtime
images for Java, Python and more.  
  
<https://github.com/GoogleCloudPlatform/distroless>  
  
  
K2 is a new tool for deploying a Kubernetes cluster on top of CoreOS using Terraform and Ansible under the hood.  
  
<https://github.com/samsung-cnct/k2>  
<https://github.com/samsung-cnct/k2cli>  
   
  
Istio is a new service mesh for microservice applications based on
Kubernetes. It provides a standard way to connect, secure, manage and
monitor microservices, based on the Envoy proxy.  
  
<https://istio.io/blog/istio-service-mesh-for-microservices.html>  
<https://github.com/istio/istio>  
  
  
  
Lumogon is a little something I’ve been working on at Puppet recently.
It’s an open source tool for inspecting running Docker containers.
Initially it can report on software packages installed in the container,
but we have lots more ideas for other capabilities.  
  
<https://github.com/puppetlabs/lumogon>  
<https://lumogon.com/>  
  
  
Gixy is a static analyzer for Nginx configuration, intended to detect
common security misconfigurations. This would be great in a CI pipeline.  
  
<https://github.com/yandex/gixy>  
  
If you’re using lots of Kubernetes you might have different contexts you
want to manage. Enter kubectx, a handy tool for flipping backwards and
forward, with support for aliases and shell completion.  
  
<https://ahmet.im/blog/kubectx/>  
  
  
BeePing is a service to allow for HTTP Monitoring via API. When running
BeePing you can hit it’s API and it will confirm various properties like
performance or SSL cert expiry for the requested domain.  
  
<https://github.com/yanc0/beeping>  
  
  
JSONNET is a handy programming language for creating JSON, useful for
all sorts of configuration tasks. Kube.libjsonnet is a library for
helping manage Kubernetes configs in a sane manner.  
  
<https://github.com/heptio/kube.libsonnet>  
  
Gordon is a tool for deploying and managing AWS Lambda functions, backed
by CloudFormation. It provides a nice high-level abstraction over the
many underlying services, and the documentation has lots of useful
examples.  
  
<https://github.com/jorgebastida/gordon>  
  
Kubemr is a mapreduce framework for data processing on Kubernetes. It’s
an interesting example of using the various Kubernetes primitives to
build higher-level systems.  
  
<http://www.sajalkayan.com/post/kubemr.html>  
<https://github.com/turbobytes/kubemr>  
  
  
Vaul UI is a user interface for the Vault secrets management
application. It’s neatly packaged as either a local application or a
shared web app, and supports a number of backends for authentication.  
  
<https://github.com/djenriquez/vault-ui>  
  
  
Deputize neatly integrates PagerDuty and LDAP, by exporting on-call
information from a PagerDuty schedule to a configurable LDAP group.  
  
<https://blog.threatstack.com/balancing-security-and-your-on-call-rotation-using-deputize>  
<https://github.com/threatstack/deputize>  
  
  
Weathervane is a new application for conducting a performance benchmark against a virtualized or cloud environment.  
  
<https://blogs.vmware.com/performance/2017/04/weathervane-performance-benchmarking-now-open-source.html>  
<https://github.com/vmware/weathervane>  
   
  
Cerebro is an alerting system build to integrate with Graphite. The
```bash
service layer currently integrates with Seyren to store alarms, schedule
```

checks and send alerts  
  
<https://github.com/voyages-sncf-technologies/cerebro>  
  
  
Codeflow is a new deployment pipeline tool aimed at 12-factor apps on
Kubernetes. It features a plugin based system for extending the core
functionality too.  
  
<https://codeflow.checkr.com/>  
<https://github.com/checkr/codeflow>  
  
  
Kube Applier is another kubernetes deployment tool, this time aimed at
running kubernetes configuration files on a schedule and reporting on
any drift.  
  
<https://blog.box.com/blog/introducing-kube-applier-declarative-configuration-for-kubernetes/>  
<https://github.com/box/kube-applier>  
  
springboard is a cli utility to help get your secrets into vault. It
allows for storing encrypted files in source control, and publishing
those secrets securely in Vault.  
  
<https://github.com/benschw/springboard>  
  
  
One of the issues for some with the unikernel approach is the need to
use specific programming languages. This demonstration shows a possible
alternative, in this case transpiling PHP.  
  
<https://github.com/tfjmp/php2uni>  
<https://www.cl.cam.ac.uk/research/srg/opera/publications/papers/2017ic2ePHP2Uni.pdf>  
   
  
Dockerscan is another security scanning tool for use with Docker images,
but one focused on gathering information useful for an attacker. Useful
for defence in better understanding your exposure.  
  
<https://github.com/cr0hn/dockerscan>  
  
  
Related to the opentracing presentation above, Loki is a new opentracing
compatible tracing application with similar design sensibilities to the
prometheus monitoring system.  
  
<https://github.com/weaveworks-experiments/loki>  
  
  
DNSControl is a system for maintaining DNS zones for different provides
(including Route53, CloudFlare, and Gandi), using a custom DSL and
runtime. It apparently generates the most beautiful BIND zone files
ever.  
  
<https://github.com/StackExchange/dnscontrol>  
<https://stackexchange.github.io/dnscontrol/>  
  
  
LXDock is a tool intended for building a local development environment.
It acts as a thin wrapper around LXD and provides a YAML based users
interface for describing what you need.  
  
<https://github.com/lxdock/lxdock>  
<https://lxdock.readthedocs.io/en/stable/>  
  
  
If you’re writing tools against the AWS APIs testing can be a challenge.
Localstack provides an easy-to-use test and mocking framework with
local copies of several AWS APIs including Lambda, DynamoDB, S3, API
Gateway and more, all packaged as a Docker image.  
  
<https://github.com/atlassian/localstack>  
  
  
FireHOL is a language (and a program to run it) which builds secure,
stateful firewalls from easy to understand, human-readable
configurations. It also includes FireQOS which provides extensions for
traffic shaping too.  
  
<http://firehol.org/>  
  
  
Ctop is a top-like interface for container metrics, connecting to a
Docker socket and presenting information about container memory, CPU and
network usage.  
  
<https://bcicen.github.io/ctop/>  
<https://github.com/bcicen/ctop>  
  
  
Kubecfg is a tool for managing complex Kubernetes configurations, by providing a nice wrapper around jsonnet templates.  
  
<https://github.com/anguslees/kubecfg>  
  
  
  
Cloud Custodian is a tool to help with keeping an AWS account to a set
of defined policies, like ensuring tags are applied or that ec2
instances have encrypted volumes.  
  
<https://github.com/capitalone/cloud-custodian>  
  
  
Prophet is a tool for producing high quality forecasts from time series
data. It is focused on allowing for accurate forecasting to be done by
non-experts  
  
<https://research.fb.com/prophet-forecasting-at-scale/>  
<https://github.com/facebookincubator/prophet>  
  
  
Trilogy is a new tool for testing database logic. Test cases are
represented by markdown files and it’s designed to be used with a
continuous integration system.  
  
<http://engineering.pivotal.io/post/trilogy-the-sql-testing-framework/>  
<https://github.com/pivotalsharedireland/trilogy>  
  
An interesting set of tools for managing security in Google Cloud, focused on enforcing firewall rules across multiple projects.  
  
<https://labs.spotify.com/2017/02/22/google-cloud-security-toolbox/>  
<https://github.com/spotify/gcp-firewall-enforcer>  
<https://github.com/spotify/gcp-audit>  
  
awless is a CLI for Amazon Web Services which aims to be fast, powerful
and easy-to-use. Useful to exploring an existing infrastructure as well
```bash
as ad-hoc commands.  
```

  
<https://github.com/wallix/awless>  
  
  
Mach is a new build tool trying to take some of the things about Make
that make it great and bring to them projects (including Java and
CLojure projects) that use a hierarchical file system.  
  
<https://github.com/juxt/mach>  
   
  
HubCommander is a new chatbox for GitHub organization management. You
can create new repos, grant permissions, enable Travis all from your
chat room.  
  
<https://github.com/Netflix/hubcommander>  
<http://techblog.netflix.com/2017/02/introducing-hubcommander.html>  
  
Minishift is a quick way of getting a local OpenShift cluster up and running in a VM with the minimum of fuss.  
  
<https://github.com/minishift/minishift>  
  
  
LogHub is a new log forwarder with some powerful data pipeline features.
It received events from external sources, process them and send them,
and is configured with it’s own DSL.  
  
<https://github.com/fbacchella/LogHub>  
  
  
zetcd is a simple forwarder for etcd which allows you to use etcd as the backend for zookeeper clients.  
  
<https://github.com/coreos/zetcd>  
  
  
Beringei is a high performance, in-memory storage engine for time series
data.  It’s been designed specifically for storing health and
performance monitoring data with very high write loads.  
  
<https://code.facebook.com/posts/952820474848503/beringei-a-high-performance-time-series-storage-engine/>  
<https://github.com/facebookincubator/beringei>  
  
Vuls looks like an excellent, modern, vulnerability scanner for Linux
and FreeBSD. Run either interactively or on cron it has support for
scanning containers as well as the host OS.  
  
<https://github.com/future-architect/vuls>  
  
  
Tig is a text mode interface for Git. Something more than the command
line can be useful when exploring a repository or learning git, but not
everyone wants a full-blown GUI.  
  
<https://jonas.github.io/tig/>  
  
  
A build toolchain for MirageOS unikernels built around Docker. Integrates Solo5 to provide targets for kvm, ukvm and qemu.  
  
<https://github.com/mato/docker-unikernel-runner>  
  
  
Pipenv is a new tool for python dependency management. It’s aim is to
combine pip, the new Pipfile, virtualenv and ideas from other language
systems into a single polished user interface.  
  
<https://www.kennethreitz.org/essays/announcing-pipenv>  
  
Cernan is a new telemetry and logging aggregation server. It exposes
multiple interfaces for ingestion (eg. statsd, graphite, line-oriented
log files ) and can emit to multiple aggregation sources while doing
in-flight manipulation of data.  
  
<https://medium.com/@bltroutwine/announcing-cernan-28c245a12f91#.4nbmtqh5q>  
<https://github.com/postmates/cernan/>  
  
  
Hellogopher is a Makefile that makes your conventional Go project build
from anywhere, for anyone, with just make. Aimed more at the occasional
Go programmer, it makes the point that Go developers should know and use
GOPATH but it shouldn't be the first thing they are exposed to.  
  
<https://github.com/cloudflare/hellogopher>  
  
Kubeplay is a REPL for the Kubernetes API. It allows for exploring and
displaying information about Kubernetes resources using a Ruby DSL, with
some commands for modifying resources too.  
  
<https://github.com/errordeveloper/kubeplay>  
  
  
Kubernetes provides a number of ways for third parties to extend it,
kubevirt runs with that and is adding the ability for Kubernetes to
manage virtual machines, adding the new VM resource amongst others.  
  
<https://github.com/kubevirt/kubevirt>  
  
  
Systemdlogger is a small tool to used to export systemd journald logs to
an external service, for example cloudwatch or elasticsearch. It’s
designed to be simple, simpy running out of cron.  
  
<https://github.com/techjacker/systemdlogger>  
  
  
Screwdriver is a new Continuous Delivery build system. It runs atop
Kubernetes or Docker Swarm and provides a web UI as well as the ability
to define pipelines in a YAML dataformat.  
  
<https://yahooeng.tumblr.com/post/155765242061/open-sourcing-screwdriver-yahoos-continuous>  
<http://screwdriver.cd/>  
  
   
  
Cherami is a new distributed, scalable, durable, and highly available
message queue system. The accompanying blog post does a good job of
explaining why another queuing server, and the animations give you a
good sense of the design.  
  
<https://eng.uber.com/cherami/>  
<https://github.com/uber/cherami-server>  
  
  
Grumpy is a Python to Go source code transcompiler and runtime. That
means you can convert your Python code to a Go static binary, avoiding
the python global interpreter lock and runtime dependency. Still early
days but very interesting.  
  
<https://github.com/google/grumpy>  
  
Conductor is a new microservices orchestration engine. It provides a
blueprint DSL to describe a process flow, and then wires up individual
microservices as well as providing a useful visualisation of the
topology.  
  
<https://github.com/Netflix/conductor>  
<https://netflix.github.io/conductor/>  
  
  
Burry is a backup and recovery tool for etcd and zookeeper. As these
tools are often used as critical components of some systems being able
to use backups to recover from some failure modes is likely to be
critical.  
  
<https://github.com/mhausenblas/burry.sh>  
  
  
Alerta is a powerful addition to a monitoring setup, providing a single
place to manage alerts. It integrates with a wide range of monitoring
systems and does simple de-duplication and correlation.  
  
<http://alerta.io/>  
  
  
Banshee is a real-time anomaly detection system for periodic metrics. It
integrates nicely with statsd and can issue alerts as well as providing
a nice dashboard.  
  
<https://github.com/eleme/banshee>  
  
  
Ostent collects metrics (memory, CPU, network IO, disk space, etc.) and
forwards them to tools like InfluxDB, Graphite or Librato. It also
features a simple user interface.  
  
<https://github.com/ostrost/ostent>  
   
  
A lot of information is stored in a github repository as it’s used, and
the git CLI tools provide one interface to that information. GitQL
provides a more SQL like read-only view, handy for repository anaylsis.  
  
<https://github.com/cloudson/gitql>  
  
  
  
I’m seeing lots of interest in using Kubernetes as a platform on which
to run serverless architectures. Fission looks like a good early
approach to this, although it’s described as being in “early alpha”.  
  
<http://fission.io/>  
<https://github.com/platform9/fission>  
  
  
pREST is a handy looking tool for very simply exposing a PostgreSQL database via an HTTP interface.  
  
<https://github.com/nuveo/prest>  
  
  
Anistrano is a port of the features and usage patterns of Capistrano 2.0
to Ansible, providing a deploy and rollback role to aid with
application deployment.  
  
<https://github.com/ansistrano/deploy>  
  
  
Jid is a simple tool for exploring JSON documents interactively. Very
handy if you’re dealing with large JSON documents, say with the AWS CLI
responses.  
  
<https://github.com/simeji/jid>  
  
  
Grafanalib is a nifty library for generating Grafana dashboards from simple Python scripts.  
  
<https://github.com/weaveworks/grafanalib>  
  
  
runv is analogous to the runc container runtime, except runv runs your
container on top of a real hypervisor. Currently supports kvm, xen and
virtualbox. Useful if you need additional isolation guarantees.  
  
<https://github.com/hyperhq/runv>  
  
  
Funker is an interesting experimental approach to packaging up pieces of
your application (functions or otherwise) as Docker containers and have
them run on-demand on a swarm.  
  
<https://github.com/bfirsh/funker>  
  
  
ProxySQL is a high performance MySQL proxy which allows for query
caching, routing queries to different clusters, smart query firewall
rules and more.  
  
<https://github.com/sysown/proxysql>  
<http://www.proxysql.com/>  
  
Storing credentials in your shell profile and exporting them as
environment variables is incredibly handy but very insecure. Envchain
looks to provide the same ease of use but to use  OS X Keychain or
gnome-keyring as the backing service.  
  
<https://github.com/sorah/envchain>  
  
  
Pinpoint is an open source Application Performance Management tool for
large-scale distributed systems. It features some tracing capabilities,
the various screenshots give a good sense of its capabilities.  
  
<https://github.com/naver/pinpoint>  
  
  
IronFunctions is an open source serverless platform which supports
running Docker images via a simple API. It’s quite early but the
documentation walks you through how to try it out quickly.  
  
<https://github.com/iron-io/functions>  
   
  
If you’re building your own dashboards it can be easier to start with
some sort of framework. Enter this project, which provides a set of
responsive templates specifically aimed at making dashboards quickly.  
  
<https://github.com/keen/dashboards>  
  
  
RackHD describes itself as a stack for enabling automated hardware
management and orchestration. It’s an opinionated set of existing tools,
bundled together with a high-level API server.  
  
<http://rackhd.readthedocs.io/en/latest/>  
  
  
  
I’ve talked before about the potential for alternative container build
tools. One such recent addition is box, which builds images using a
subset of Ruby, using mruby embedded in a Go application.  
  
<https://github.com/erikh/box>  
  
  
And for those more familiar with Puppet the recent Puppet image_build
module allows for building containers images direct from Puppet’s domain
specific language.  
  
<https://github.com/puppetlabs/puppetlabs-image_build>  
  
  
A handy tool announced at PuppetConf, octocatalog-diff allows for some
interesting testing of Puppet code, in particular helping to reduce the
risk of refactoring existing code.  
  
<http://githubengineering.com/octocatalog-diff-github-s-puppet-development-and-testing-tool/>  
<https://github.com/github/octocatalog-diff>  
  
  
Lots of people will tell you containers are made of cgroups and
namespaces, but how do you dig into those? Enter cinf which provides a
handy tool for low-level container prodding.  
  
<https://github.com/mhausenblas/cinf>  
  
Gradle is a popular and powerful build tool used in a number of
different language environments, and PyGrade brings that capability to
Python.  
  
<https://github.com/linkedin/pygradle>  
  
  
Gogeta is a reverse proxy backed by etcd. It provides real time dynamic
reconfiguration of routes without having to restart the process.  
  
<https://github.com/arkenio/gogeta>  
  
For lots of workflows setting the GitHub master branch to protected is a
sensible choice, but it’s relatively recent addition and you may have
lots of repos. Enter Petter, a simple tool to change the setting for all
repos in a given organisation.  
  
<https://github.com/jessfraz/pepper>  
  
  
Zentral is a nice looking tool for host inventory and acting on
inventory data, built atop osquery, Santa, Sal, ElasticSearch and with
integration with various other tools.  
  
<https://github.com/zentralopensource/zentral/wiki>  
  
  
Cillium is another container networking approach, but one which uses
experimental kernel features like BFP and XDP. It aims to provide fast
in-kernel networking along with string security policy enforcement.  
  
<https://github.com/cilium/cilium>  
   
  
Doorman is a very interesting approach to rate limiting for internal
services, pushing some of the authority to the client but providing a
central service knowledgable about the needs and wants to the different
clients.  
  
<https://github.com/youtube/doorman>  
  
  
Babushka is a tool for automating systems administration tasks which
makes explicit the configuration change and the test to verify the
change.  
  
<http://babushka.me/>  
  
  
LambCI is a CI and build system designed to run on AWS Lambda. This
makes for some interesting properties, including potentially large cost
savings depending on your build profile.  
  
<https://medium.com/@hichaelmart/lambci-4c3e29d6599b#.fhhti6fbs>  
<https://github.com/lambci/lambci>  
  
  
Static site generators are nothing new, but Trestus is interesting as
it’s very domain specific. It aims to build status pages, for
communicating with users around outages, with the data coming from
Trello. If you’re using Trello internally to manage an outage that could
be a nice workflow.  
  
<https://canonical-ols.github.io/trestus/>  
  
  
SQLint is a simple SQL syntax checker, ideal for sanity checking SQL files as part of a continuous integration workflow.  
  
<https://github.com/purcell/sqlint>  
  
Envoy is a new proxy and network bus that runs on every host and
abstracts the network by providing common features (load balancing,
circuit breaking, service discovery, etc.) for your applications and
services.  
  
<https://eng.lyft.com/announcing-envoy-c-l7-proxy-and-communication-bus-92520b6c8191#.vlashkab0>  
<https://lyft.github.io/envoy/>  
  
  
Minio is an object storage server which provides compatibility with
Amazon S3. It provides a nice command line and web based interface and
can serve an existing directory of files.  
  
<https://github.com/minio/minio>  
  
  
CoreDNS is a new DNS based service discovery tool, intended to be the
next generation of the popular SkyDNS project. It’s built using Caddy
and already comes with several optional middleware components.  
  
<https://coredns.io/>  
   
  
I love Make and you should too. But writing maintainable Make files is
often a challenge. Enter Checkmake, an opinionated linting tool for Make  
  
<https://github.com/mrtazz/checkmake>  
  
  
My Looking Glass is an open source software utility which combines the
functions of several different network probes (HTTP, ping, DNS, port
scanning and more) in one network diagnostic tool.  
  
<http://mylg.io/>  
  
  
Pshtt is a handy tool for anyone managing a large number of sites and
trying to enforce HTTPS best practices like use of HSTS or specific
cypher suites.  
  
<https://github.com/dhs-ncats/pshtt>  
  
Terraform is an increasingly common tool for describing cloud
infrastructure in code, but using it in teams requires some sharing of
state. Enter Terragrunt, an open source service you can run to support
locking and sharing state between users.  
  
<https://blog.gruntwork.io/add-automatic-remote-state-locking-and-configuration-to-terraform-with-terragrunt-656a57565a4d#.ejrf45azt>  
<https://github.com/gruntwork-io/terragrunt>  
  
  
An interesting approach to creating an Apt package repository on S3,
using Lambda to build the package index automatically when you upload
new packages.  
  
<http://webscale.plumbing/managing-apt-repos-in-s3-using-lambda>  
<https://github.com/szinck/s3apt>  
  
  
Skopeo is a command line utility for various operations on container
images and image repositories. The main feature is the ability to
explore image and layer metadata without pulling the filesystem portion.  
  
<https://github.com/projectatomic/skopeo>  
   
  
Hubblestack is a security auditing tool build on top of SaltStack. It
provides tools for file integrity scanning, integration with osquery and
a reporting engine.  
  
<http://hubblestack.io/>  
  
  
Fabio is a fast, modern, zero-conf load balancing HTTP(S) router for
deploying microservices managed by consul. Also provides integration
with AWS ELB and API Gateway, and natively outputs graphite metrics.  
  
<https://github.com/eBay/fabio>  
  
  
Test Kitchen is a popular acceptance testing framework for
infrastructure, and kitchen-terraform provides a plugin using Terraform
to provision the infrastructure under test.  
  
<https://github.com/newcontext/kitchen-terraform>  
  
  
In pursuit of everything as code, Mermaid is a DSL for generating a wide
variety of charts and diagrams, from gantt charts and flowcharts to
sequence diagrams and more. It provides a powerful online editor and
output to SVG too.  
  
<http://knsv.github.io/mermaid/index.html#mermaid>  
  
Remote management of servers is a common problem, and Chopsticks is a
new solution. Rather than focus on a command line interface and a data
language, Chopsticks is just a Python library.  
  
<http://mauveweb.co.uk/posts/2016/07/chopsticks.html>  
<https://github.com/lordmauve/chopsticks>  
  
  
Cli53 is a handy command line tool for managing Amazon Route53 DNS
records. As well as the ability to list, create and delete records you
can also import and export from BIND formatted records.  
  
<https://github.com/barnybug/cli53>  
  
Configuring SSL is complicated. The TLS Observatory project provides a
useful scanning tool which has the useful feature of providing
recommendations for things to change.  
  
<https://github.com/mozilla/tls-observatory>  
  
 
There's been an explosion of tools recently for bootstrapping a
Kubernetes or Docker cluster. Spread is one such tool, but with a few
nice looking features around reproducibility.  
  
<https://github.com/redspread/spread>  
  
  
Entropy is a fault injection system for Docker based systems. Define a
policy and point it at your docker endpoints to trigger failures of
containers to aid with building resilient systems.  
  
<https://github.com/buildertools/entropy>  
  
  
If you already have a reasonable size AWS setup, adopting a tool like
CloudFormation can mean a lot of re-work. Bellerophon aims to generate
CF templates automatically from existing AWS resources by querying the
API.  
  
<https://github.com/arminhammer/bellerophon>  
  
dploy is an interesting looking opinionated deployment tool that leverages DC/OS and GitHub.  
  
<https://medium.com/@mhausenblas/introducing-dploy-f112f6a6bbdf#.br5feah1g>  
  
SwarmKit is a new toolkit from Docker for orchestrating distributed
systems. It includes primitives for node discovery, raft-based
consensus, task scheduling and more.  
  
<https://github.com/docker/swarmkit>  
  
  
Cake is an open source and cross platform build automation system with a C# DSL, particularly handy for building NuGet packages.  
  
<http://cakebuild.net/>  
   
Snapcraft is the packaging tool for the snappy Ubuntu Core transactional
packaging system. It allows for composing software from multiple other
package formats into a single tree.  
  
<https://github.com/ubuntu-core/snapcraft>  
  
  
Torus is an open source project for distributed storage coordinated
through etcd. It ships with a simple block-device volume plugin, but is
extensible to more and is seeing lots of development at the moment.  
  
<https://github.com/coreos/torus>  
  
  
SQL is one of those powerful and widely used common tools. KSQL brings
the power of SQL to Kubernetes, allowing for querying resources like
pods and services using SQL.  
  
<https://github.com/brendandburns/ksql>  
  
  
For all the simplicity in the basic Dockerfile, following the current
best practice can be tricky. Dockerize Me provides an opinionated,
wizard-like, approach to building Docker images.  
  
<https://github.com/fiunchinho/dockerize-me>  
  
  
Rocker is another Docker build tool, in this case one which adds some
new features to the standard Dockerfile - including tagging and pushing
from within the file, mounting build-time volumes and attaching to the
build process part way through to aid debugging.  
  
<https://github.com/grammarly/rocker>  
  
  
We often talk about the importance of holding a learning review or
blameless postmortem after an incident, but how do you track those over
time? Enter Morgue. A simple web application, plus some interesting Jira
and IRC integration.  
  
<https://github.com/etsy/morgue>  
  
  
If you run SSH on a non-standard port you still run the risk of people
discovering that port. So why not change the port every 30s and use TOTP
codes to discover it?  
  
<https://github.com/benjojo/totp-ssh-fluxer>  
  
  
Managing the configuration of a complex piece of software can too easily
fall back into manual, error prone practices. Monkey Ops is an
application which aims to ensure your OpenShift setup is robust by
finding and finding resources like Pods or DeploymentConfigs and
randomly terminating them.  
  
<https://github.com/Produban/monkey-ops>  
  
  
jwtproxy is an application for  authenticating, and possibly authorizing
requests between services. It implements JSON Web Tokens and provides a
forward and reverse proxy configuration for verification.  
  
<https://github.com/coreos/jwtproxy>  
  
  
Distributedlog from Twitter is a high-performance, replicated log
service, offering durability, replication and strong consistency as
essentials for building reliable distributed systems.  
  
<https://github.com/twitter/distributedlog>  
  
JMESPath is a query language for JSON. It comes with multiple compatible
implementations in different languages, all based on a solid
specification and test suite. I can see multiple uses for this.  
  
<http://jmespath.org/>  
  
  
Knox is another secrets management server with support for key rotation,
auditing secrets access and with a desire to be developer friendly.  
  
<https://github.com/pinterest/knox>  
  
  
I’m a fan of using Cucumber style tests for infrastructure acceptance.
The varnishtest cucumber project provides a set of steps for testing
your VCL configurations, some good examples in the README.  
  
<https://github.com/nstielau/varnishtest_cucumber>  
  
  
Unik is an interesting attempt to build a unikernel deployment platform.
It currently supports C/C++, Go (targeting rumprun) and Java (targeting
OSv) and deployments to AWS, vSphere and Virtualbox.  
  
<https://github.com/emc-advanced-dev/unik>  
  
  
Many organisations using the same tools adopt different workflows to
accomplish similar results. This Chef plugin helps sync local cookbooks
with a Chef server, based around a workflow that eschews cookbook
versioning.  
  
<https://github.com/PagerDuty/pd-sync-chef>  
   
Binctr allows you to create fully static, unprivileged, self-contained,
containers as executable binaries. Which is pretty neat once you unpack
that description and look at the demos.  
  
<https://github.com/jfrazelle/binctr>  
  
  
Harbor is a new container registry server for Docker containers with a
nod towards enterprise features like role based access control and
auditing capabilities.  
  
<http://vmware.github.io/harbor/>  
<https://github.com/vmware/harbor>  
  
Airflow is a system to programmatically author, schedule and monitor
data pipelines. The idea is to describe pipelines as directed acyclic
graphs using Python. Airflow also comes with some great looking
visualisation tools too.  
  
<https://github.com/airbnb/airflow>  
  
  
Habitus is a build tool for Docker images. It builds on Dockerfile,
allowing for multi-stage builds as well as simple secrets management and
environment variable injection.  
  
<http://www.habitus.io/>  
  
  
Napalm, or Network Automation and Programmability Abstraction Layer with
Multivendor support, is a suite of tools for driving network devices
with code, in this case Python. SUpport is already impressive, with
JunOS, EOS, NXOS, IOS and more on the list.  
  
<https://github.com/napalm-automation/napalm>  
  
BCC is a set of dynamic tracing tools for linux. Powered by BFS which is
available in 4 series kernels, BCC has tools for I/O latency, new
processes, slow disk operations and lots more.  
  
<https://iovisor.github.io/bcc/>  
  
  
A number of operating systems are experimenting with different, and
automatic, update mechanisms. CoreRoller is a set of tools to control
and monitor the rollout of your updates, aimed at being an open source
alternative to CoreOS CoreUpdate.  
  
<https://github.com/coreroller/coreroller>  
  
  
CFSSL is a toolkit for managing PKI/TLS. It contains lots of tools,
including a certificate authority server that can use multiple signing
keys, tools for managing certificate pool bundles and for generating
private keys and CSRs.  
<https://github.com/cloudflare/cfssl>  
  
  
VIC, or vSphere Integrated Containers, is container runtime aimed at
allowing developers familiar with Docker to develop in containers while
allowing management via the familiar vSphere UI.  
  
<https://github.com/vmware/vic>  
  
Mas is a simple command line interface for the Mac App Store. Designed for scripting and automation.  
  
<https://github.com/argon/mas>  
  
  
Teleport is a tool for remotely accessing isolated clusters of Linux
servers via SSH or HTTPS. It supports a number of team focused features
as well as support for 2 factor authentication and auto-expiring keys.  
  
<https://www.lvh.io/posts/introducing-teleport.html>  
<https://github.com/gravitational/teleport>  
  
  
An interesting new DNS server, CoreDNS is a fork of the Go based Caddy
server which allows for writing middleware to influence DNS queries.  
  
<https://miek.nl/2016/March/18/announcing-coredns/>  
<https://github.com/miekg/coredns>  
   
  
Libretto is a new Golang library to create Virtual Machines (VMs) on any
cloud and Virtual Machine hosting platforms such as AWS, Azure,
OpenStack, vSphere, or VirtualBox.  
  
<https://www.apcera.com/blog/using-golang-virtual-machine-management>  
<https://github.com/apcera/libretto>  
  
  
Dalmatiner is a new metrics database that is fast, low overhead, and
easy to query and manage. It uses ZFS under the hood for checksums,
compressions and caching.  
  
<https://dalmatiner.io/>  
<https://github.com/dalmatinerdb/dalmatinerdb>  
  
  
Kube2Consul is a simple bridge between Kubernetes and Consul. It will
watch the kubernetes API for changes in Services and then register those
Services in Consul.  
  
<https://github.com/Beldur/kube2consul>  
  
  
Blaz is a tool for bundling up you scripts into docker containers. It
provides a simple Python based API, and allows for nested execution in
separate containers too.  
  
<https://github.com/amiorin/blaz>  
  
  
Juttle is described as a dataflow programming language. Along with the
language are an entire ecosystem of tools for using it to interpret data
from graphite, elasticsearch, slack, AWS, various databases and more.
Interesting to see more examples of how this fits into a monitoring
setup.  
  
<https://github.com/juttle/juttle>  
<https://github.com/juttle/juttle-engine>  
  
CPUStat describes itself as a “fancy top”. It’s an interactive tool for
analysing CPU utilization and saturation in a helpful way, focusing on
taking highly granular samples every 200ms.  
  
<https://github.com/uber-common/cpustat>  
   
  
DbDat is a tool for checking the security of your database, in
particular working out which CVEs the database in question may be
affected by. It has support for scanning everything from Postgres to
Oracle and DB2 to Mongo.  
  
<https://github.com/foospidy/DbDat>  
  
Solo5 is a new base for unikernels, specifically providing a base to run
other stacks on QEMU/KVM. The repository contains an example of running
Mirage under KVM rather than Xen.  
  
<https://developer.ibm.com/open/2016/02/10/solo5-unikernel-low-level-programming-produces-high-return/>  
<https://github.com/djwillia/solo5>  
  
  
Linkerd is described as a Modern RPC proxy for microservices. It uses
Finangle and supports runtime traffic routing, load balancing, service
discovery and built-in instrumentation,  
  
<https://blog.buoyant.io/2016/02/18/linkerd-twitter-style-operability-for-microservices/>  
<https://linkerd.io/>  
<https://github.com/BuoyantIO/linkerd>  
  
Teletraan is a new application deployment tool which provides support
for zero downtime deploy, rollback, staging, continuous deploy; and many
convenient features such as showing commit details and comparing
different deploys.  
  
<https://engineering.pinterest.com/blog/open-sourcing-teletraan-code-deployment-system>  
<https://engineering.pinterest.com/blog/under-hood-teletraan-deploy-system>  
<https://github.com/pinterest/teletraan>  
  
  
Maltrain is a malicious traffic scanning utility, designed to run on all
your nodes and collect information about potential malware of other
problems revealed by looking at the network traffic. The documentation
is excellent, with lots of clear examples.  
  
<https://github.com/stamparm/maltrail>  
  
  
Inductor is a command line tool used in conjunction with packer-windows to create Windows Vagrant boxes.  
  
<https://github.com/joefitzgerald/inductor>  
  
  
A demonstration of using a base image for running rumprun unikernels as
Docker containers using KVM, fully integrated with Docker networking.  
  
<https://github.com/mato/docker-unikernel-runner>  
  
Simple tool for talking the contents of a configuration file and saving
it as a Kubernetes secret for use by other Kubernetes resources.  
  
<https://github.com/kelseyhightower/conf2kube>  
  
  
Uphold is an interesting looking tool intended to verify backups. It
downloads the backup, decompressing, loading and then running
programmatic tests against it.  
  
<https://github.com/forward3d/uphold>  
  
 Builds servers can become complex quickly, sometimes because the problem
you’re trying to solve is itself complicated. But if you have highly
opinionated (git and GitHub only) and simpler CI requirements then Surf
might be worth a look.  
  
<https://github.com/surf-build/surf>  
  
  
Goad is a nice demonstration of building a useful tool using Apache
Lambda. It’s a Go based distributed load testing tool that takes
advantage of the serverless architecture of Lambda to spin up on demand.  
  
<https://goad.io/>  
  
  
Keeping up with what service is running on what port is always tricky,
and the commands to get the information tend to be somewhat cryptic.
Enter whatportis, a simple interface for getting the ports in use by a
service, or the service running on a specified port.  
  
<https://github.com/ncrocfer/whatportis>  
  
The debate about init systems and PID 1 inside a container has spawned a
number of projects. S6 overlay looks particularly interesting, and
makes some good arguments about why one thing, rather than one process,
per container is a useful distinction.  
  
<https://github.com/just-containers/s6-overlay>  
  
ShellCheck is a static analysis tool for shell scripts. As well as
providing hints on syntax it can also pick up on unused variables and in
some cases suggest corrections for typos.  
  
<https://github.com/koalaman/shellcheck>  
  
  
Building on ShellCheck, Hadolint is a linter for Dockerfiles. As well as
providing information based on Docker published guidelines it also
picks up on issues with shell code using in RUN directives.  
  
<https://github.com/lukasmartinelli/hadolint>  
  
  
If you’re already familiar with Docker, but interested in runc, then the
riddler tool is likely useful. It can inspect a running docker
container and automatically generate the config and runtime files
required to start the same container under runc.  
  
<https://github.com/jfrazelle/riddler>  
   
Minimesos is a set of tools to make running a Mesos cluster locally
easy, even on OSX. Particularly useful if you’re developing your own
mesos frameworks.  
  
<http://container-solutions.com/minimesos-0-5-0-mac-os-x-support-and-improved-docker-support/>  
<https://github.com/ContainerSolutions/minimesos>  
  
  
Apex is a CLI tool for working with AWS Lambda, providing simple
deployment, build and introspection capabilities and supporting Go and
Python as well as the native Node.js.  
  
<https://github.com/apex/apex>  
  
  
Caddy is a new web server with out-of-the-box support for HTTP/2, IPv6
and WebSockets. It also has nifty built-in support for Let’s Encrypt to
provide HTTPS by default.  
  
<https://caddyserver.com/>  
<https://github.com/mholt/caddy>  
  
  
A nice idea for providing minimal help documentation focused on typical
examples for common unix tools. A bit like a community contributed and
stripped down man.  
  
<http://tldr-pages.github.io/>  
  
  
Pash is an Open Source reimplementation of Windows PowerShell, for Mono.  
  
<https://github.com/Pash-Project/Pash>  
  
A unikernel experiment, this time attempting to use Clojure but
compiling down to Javascript and running on runtime.js under QEMU.  
  
<https://github.com/txus/cljs-on-unikernel-demo>  
   
AWSspec is a set of rspec matchers for testing AWS. The library supports
a wide range of AWS resources and has nicely documented matchers for
testing everything from whether an EC2 instance is in the correct VPC to
whether an autoscaling group has been setup with a load balancer.  
  
<https://github.com/k1LoW/awspec>  
  
  
Containerd is daemon with an API and a command line client, intended to
manage runc based containers on single machine. It from Docker, aimed
specifically at high density and performance.  
  
<https://containerd.tools/>  
  
  
Git-appraise is a git plugin which implements a code review workflow for
distributed teams, storing the review data in the fit repository
itself.  
  
<https://github.com/google/git-appraise>  
  
With the public nature of GitHub and other repositories leaking
passwords and other credentials is becoming a bigger problem. Enter
git-secrets, which uses local git hooks to prevent you pushing code with
know passphrases and other sensitive information in.  
  
<https://github.com/awslabs/git-secrets>  
  
  
Most systems administrators need to quickly find things stored in CSV
files at some point. Q looks like a handy tool to do just that using a
subset of SQL.  
  
<https://github.com/harelba/q>  
  
Snap is a new tool for gathering of telemetry from systems, with a focus
on being particularly modular and easy to administer. The accompanying
blog post goes into some of the why and where the project is going.  
  
<https://github.com/intelsdi-x/snap>  
<http://nickapedia.com/2015/12/02/what-if-collecting-data-center-telemetry-was-a-snap/>  
  
  
There are always risks with a rapid shift in technology, and in normally
slow moving organisations adopting fast moving technology. This cost
looks a containers and picks out several concerning trends or gaps in
understanding which could lead to problems.  
  
<http://www.juliandunn.net/2015/12/04/the-oncoming-train-of-enterprise-container-deployments/>  
  
  
Documentation is an important part of any internal or external
application. Slate is a documentation generator focused on API
documentation. It provides functional and attractive templates and works
well on mobile too.  
  
<https://github.com/tripit/slate>  
  
  
Herokuish is a tool for bringing parts of the heroku workflow to
containers. Specifically it allows for use of buildpacks and the
Procfile with Docker, and aims to be a low level component for others to
reuse that require this functionality.  
  
<https://github.com/gliderlabs/herokuish>  
  
  
The Docker event stream is underappreciated in my experience, giving you
a stream of everything happening in Docker. Ahab is an interesting new
tool for processing this stream in Python, the blog post gives an
example of using it for dynamic assignment of IP addresses.  
  
<https://tech.instacart.com/ahab/>  
<https://github.com/instacart/ahab>  
  
Wagl is a new tool for service discovery via DNS intended for use in Docker Swarm clusters.  
  
<http://ahmetalpbalkan.github.io/wagl/>  
<https://github.com/ahmetalpbalkan/wagl>  
  
  
Sup describes itself as “make for network servers”. It allows you to
describe a set of hosts and commands, and provides a simple CLI to
interact with them. Similar to Fabric in Python, but in this case
written in Go with a YAML configuration file.  
  
<https://github.com/pressly/sup>  
  
  
The King’s Hand is a tool for organizing ad-hoc scripts written in Go.
It provides a simple discovery mechanism and a way of loading arbitrary
go binaries into the kh tool.  
  
<https://github.com/bryanwb/kh>  
   
Facette is a new and nice looking time series and graphing engine, featuring integration with RRD, Graphite, Collectd and more.  
  
<https://facette.io/>  
  
  
AppCatalyst looks an interesting local development tool. Billed as a
desktop hypervisor for developers, it provides a simple Photon OS based
image for launching Docker containers for local development.  
  
<http://getappcatalyst.com/>  
  
  
Kurma is another minimal OS, built on the notion that everything is a
container. It also provides an API for use in managing containers across
a cluster of hosts.  
  
<https://github.com/apcera/kurma>  
<https://github.com/apcera/kurmaos>  
  
  
Clair is a container vulnerability analysis service. IT aims to provide
vulnerability information about containers based on Ubuntu, Debian and
Centos - doing so using published upstream vulnerability information.  
  
<https://github.com/coreos/clair>  
  
  
Ansible-dk is an omnibus package providing Ansible and a number of
related tools for developers, like ansible-lint and test-kitchen,
intended to make getting started with a consistent environment easier.  
  
<https://github.com/omniti-labs/ansible-dk>  
  
  
Inspec is a new infrastructure testing tool based on the rspec Ruby
testing framework. It has some nifty ideas, from a solid separation of
transport to simple custom resources and dedicated CLI tool.  
  
<https://github.com/chef/inspec>  
  
  
A handy tool for anyone using Redis in a clustered setup. Redis Cluster
Tool is a CLI app for checking the status of the cluster, rebalancing
and getting and setting configuration data.  
  
<https://github.com/deep011/redis-cluster-tool>  
  
  
If you’ve ever wanted to use Ruby natively in your shell, instead of
Bash, then Rush might be for you. Some nice examples and rationale.  
  
<https://s-mage.github.io/2015/10/25/rush.html>  
   
Helm is an interesting new project which aims to provide a package
manager for Kubernetes, along with a shared community repository
modelled after homebrew called Charts.  
  
<https://github.com/deis/helm>  
<https://github.com/deis/charts>  
  
  
Sops is an editor of encrypted files that supports YAML, JSON and TEXT
formats and encrypts with AWS KMS and PGP. Another useful tool for
secrets management with excellent documentation.  
  
<https://github.com/mozilla/sops>  
  
  
Credstash is another tool for secrets management, specifically making
use of AWS Kye Management Service but providing a nice clear user
interface.  
  
<https://github.com/fugue/credstash>  
  
  
Snyk is a new tool aimed at discovering and fixing security
vulnerabilities in third party packages included in your node.js
project.  
  
<https://github.com/Snyk/snyk>  
  
  
Vegur is the newly opensourced reverse proxy library in use by Heroku.
Provided as an Erlang library, this means you can implement custom
routing yourself as a callback.  
  
<https://github.com/heroku/vegur>  
  
  
An interesting experiment in writing a threat model in code, alongside
the application code. Threatspec parses comments in a specific format
and outputs useful documentation and diagrams.  
  
<http://threatspec.org/>  
<https://github.com/pki-io/threatspec>  
  
  
Anycast is commonly used in datacentres but generally not available in
typical cloud environments like AWS. AWSnycast aims to address that by
creating a routing daemon for AWS route tables. It can already be used
to create an HA NAT service.  
  
<https://github.com/bobtfish/AWSnycast>  
  
An alternative user interface for Mesos. It provides a nice overview of
cluster resources, insight into individual frameworks running and access
to the master logs all from a web browser.  
  
<http://capgemini.github.io/devops/mesos-ui/>  
<https://github.com/Capgemini/mesos-ui>  
  
Gryffin is a security scanning tool out of Yahoo that’s aimed to work at
scale. The deduplication of tests sounds very useful for getting
results quickly with testing identical pages.  
  
<https://github.com/yahoo/gryffin>  
  
  
Syntribos is another security scanner, but one specifically geared not to HTML and web pages, but to testing APIs.  
  
<https://github.com/rackerlabs/syntribos>  
  
  
A nice little dashboard that shows the number of commits on a repo since
the last deploy. Surfacing this information can help avoid large
deploys later.  
  
<https://github.com/dsingleton/deploy-lag-radiator>  
  
  
Amazon’s ECS service automatically allocates containers to hosts, which
is great until you want to better understand your utilisation and where
software is running. Enter Cloud Container Cluster Visualizer.  
  
<http://blog.mattcallanan.net/2015/10/c3vis-finding-your-docker-containers-on.html>  
<https://github.com/ExpediaDotCom/c3vis>  
  
  
Automating your local development environment is useful, both for
learning new tools and in any growing team environment. Superlumic is a
new tool in that space that’s a thin wrapper around Ansible, which comes
to some example configurations.  
  
<https://github.com/superlumic/superlumic>  
<https://github.com/superlumic/superlumic-config>  
   
  
Muxy looks like a pretty comprehensive tool for testing network
activity, by introducing delays, bandwidth constraints or other issues.
It works as a simple proxy with a configuration file to control the
features.  
  
<https://github.com/mefellows/muxy>  
  
  
Traefik looks an interesting new reverse proxy with some modern
capabilities like integration with service management frameworks, hot
reloading of configuration, exposing metrics over HTTP and an API for
configuration.  
  
<https://github.com/EmileVauge/traefik>  
  
  
At this point the AWS interface is huge, so SAWS might be a good
alternative command line interface. In particular it provides command
completion and shortcuts which should make things both quicker and more
discoverable.  
  
<https://github.com/donnemartin/saws>  
  
System XVI (or S16 for short) is a new modular init system which is currently under heavy development. Might be one to watch.  
  
<https://github.com/ServiceManager/ServiceManager>  
  
Whether the contents of a container present a security risk has been
much discussed, and we’re starting to see tools emerge to help answer
and automate parts of the problem. This example uses OpenSCAP to scan
Docker containers, though this requires a SCAP profile for your chosen
OS/image.  
  
<https://github.com/OpenSCAP/container-compliance>  
  
  
Dinit is a nice looking solution to running multiple processes inside a
Docker container. It’s not a full init system which keeps things simple,
and aims to fit well into a typical Docker build process.  
  
<https://github.com/miekg/dinit>  
  
  
Applikatoni looks like a nice, simple deployment server and provides a
web based dashboard and CLI for a team to trigger and see software
deployments.  
  
<http://applikatoni.com/>  
  
  
rtop-bot is a simple chat bot for bringing basic monitoring data to your
Slack or HipChat room. Under the hood it simply SSH’s into machines to
collect data on load, CPU and memory usage.  
  
<http://www.rtop-monitor.org/rtop-bot/>  
  
The problem of building Docker containers is definitely ripe for new
tools to emerge, and dockramp looks interesting - it extends the
Dockerfile syntax, makes smarter decisions about the creation of layers
and aims to be faster than the standard docker build command.  
  
<https://github.com/jlhawn/dockramp>  
  
  
Many infrastructures will use an SSH jump box or two, rather than
exposing all machines directly. SSHmuxd is an application which aims to
```bash
make this easier to manage, at the same time as introducing some basic
```

access control features.  
  
<https://github.com/joushou/sshmuxd>  
  
  
An interesting take on testing Puppet code, Puppet Spec uses the Puppet
language to write tests for Puppet by adding a new assertion type to the
language.  
  
<https://github.com/jolshevski/puppet-spec>  
  
  
Cloudsploit Scans is an interesting set of checks for scanning your AWS setup for potential security issues.  
  
<https://github.com/cloudsploit/scans>  
  
Hyper is described as a hypervisor agnostic docker engine. It’s able to
launch tiny vms using the docker interface, providing the isolation of
hardware virtualisation with the speed and user interface of containers.
Very interesting.  
  
<https://hyper.sh/>  
  
  
Portus is  nice-looking user interface for the self-hosted Docker
registry which also provides a team centric authorization service, so
different teams can have there own namespace in the registry.  
  
<https://github.com/SUSE/Portus>  
  
  
Jungle is the start of a higher-level command line interface for AWS, currently supporting EC2 and ELB services.  
  
<https://github.com/achiku/jungle>  
  
  
Gotty is a handy application which exposes a command line application as a web application. It’s surprisingly configurable too.  
  
<https://github.com/yudai/gotty>  
  
  
Testing infrastructure is one of my pet topics, so these cucumber steps
for openshift looked interesting. Some good examples of how to use them
to test your applications are able to be installed and run.  
  
<https://github.com/vbehar/openshift-cucumber>  
  
  
Mantl is a distribution of software for running a container based
infrastructure. It aims to integrate Mesos, Docker, Kubernetes, Calico
and Logstash amongst other tools.  
  
<http://mantl.io/>  
  
  
Another interesting high-level distribution, Trusted Analytics
integrates Cloud Foundry with various parts of the Hadoop ecosystem and
aims to create a platform-as-a-service for data analytics.  
  
<http://trustedanalytics.github.io/>  
  
  
Sellsword is an interesting looking tool to switch between different
environments (say a set of environment variables) - handy if you support
different clients or work on lots of separate projects.  
  
<https://github.com/bryanwb/sellsword>  
  
dlayer is a handy tool for anyone building several docker images. It
produces statistics about the use of layers, including how many layers
are reused and how much space is being take up.  
  
<https://github.com/wercker/dlayer>  
  
  
Battleschool is a development environment provisioning tool based on Ansible, similar to Boxen or Kitchenplan.  
  
<https://github.com/spencergibb/battleschool>  
  
  
Testing your systems with inputs designed to cause problems is a good
idea, but requires a good list of bad inputs. This list of naughty
strings should come in handy.  
  
<https://github.com/minimaxir/big-list-of-naughty-strings>  
  
Y10K is a tool to deploy Yum/RPM repositories and mirrors in your local
environment using settings described in a simple Yumfile.  
  
<https://github.com/cavaliercoder/y10k>  
  
  
Terraframe is an interesting approach to using Terraform for describing
your infrastructure, specifically it provides Ruby based DSL interface
rather than HCL.  
  
<https://github.com/eropple/terraframe>  
  
  
An interesting approach to building an application using the latest AWS
features. Specifically it combines Lambda, API Gateway and DynamoDB for a
stack that requires no managed servers.  
  
<https://github.com/jaws-stack/JAWS>  
  
ActiveMQ Artemis is a multi-protocol, embeddable, very high performance,
clustered, asynchronous messaging system. It provides high availability
and wide range of clustering options out of the box.  
  
<https://activemq.apache.org/artemis/>  
  
  
Python has always had a hand in data analysis work, but mainly for
smaller or medium sized data sets. Ibis aims to change that, with first
class integration the Hadoop ecosystem, without compromises in
functionality, usability, or performance.  
  
<https://github.com/cloudera/ibis>  
<http://www.ibis-project.org/>  
  
  
Racker is an opinionated Ruby DSL for generating Packer JSON templates.
The main advantage appears to be composition and reuse, handy if you’re
maintaining a number of templates.  
  
<https://github.com/aspring/racker>  
  
  
Testinfra is a tool for writing unit tests for infrastructure, similar
to Serverspec but implemented in Python. It supports a few standard
privatives like files, services, packages and users, as well as
featuring integration with Salt and Puppet.  
  
<https://github.com/philpep/testinfra>  
<http://testinfra.readthedocs.org/en/latest/>  
  
Hygieia is a single, configurable, easy to use dashboard to visualize near real-time status of a continuous delivery pipeline.  
  
<https://github.com/capitalone/Hygieia>  
  
  
Waffles is intended to be a simple configuration management and deployment system written entirely in Bash for portability.  
  
<http://waffles.terrarum.net/>  
<https://github.com/jtopjian/waffles>  
  
  
Pupa is a handy bootstrapping tool for an opinionated modern Puppet
setup using the latest puppet-agent as well as r10k to manage
environments.  
  
<https://daenney.github.io/2015/07/23/Pupa.html>  
<https://github.com/daenney/pupa>  
  
Apache nifi is a tool for data flow management. It provides a GUI for
creating flows which can deal with system failure, overflowing data and
more. The site also features comprehensive documentation on the
capabilities and a good introduction.  
  
<http://nifi.apache.org/>  
  
  
SwifttypeMonitoring is an interesting looking set of Ruby helpers to
help build application-level monitoring checks. with build-in examples
of checkings for MySQL, ElasticSearch and Redis it’s relatively easy to
see how to write your own checks.  
  
<https://github.com/swiftype/swiftype-monitoring>  
  
Aeron looks like an interesting new messaging system intended for very
high throughput and very low latency. It’s described as a message
oriented replacement for TCP rather than a general purpose messaging
platform.  
  
<http://highscalability.com/blog/2014/11/17/aeron-do-we-really-need-another-messaging-system.html>  
<https://github.com/real-logic/Aeron>  
  
Notary is a tool designed to allow people to publish and verify content.
Based on the Tor update framework model, one of the usecases is to
allow for the current curl sudo bash install model but with a
verification model.  
  
<https://github.com/docker/notary>  
  
  
Image sprawl can be a problem with Docker and Sherdock aims to help. 
Sherdock is a simple image management tool which features garbage
collection of unused images as well as identifying orphaned volumes and
other cleanliness-centric features.  
  
<http://rancher.com/sherdock/>  
<https://github.com/rancherio/sherdock>  
  
Mesos-consul automatically registers/deregisters services run as Mesos
tasks, so you can use consul for service discovery purposes in a Mesos
cluster.  
  
<https://github.com/CiscoCloud/mesos-consul>  
  
  
Brubeck is a statsd compatible stats aggregator written in C. The
initial post explains the problems with statsd, and in particular the
use of UDP for monitoring.  
  
<http://githubengineering.com/brubeck/>  
<https://github.com/github/brubeck>  
  
  
CollectdWin a system statistics collection daemon for Windows, inspired by 'collectd'.  
  
<https://github.com/bloomberg/collectdwin>  
  
Summon is a command-line tool that reads a config file and injects
secrets as environment variables into any process. It’s intended to use
different providers for the actual secret storage, and currently
supports Conjur, S3 and OSX Keychain.  
  
<http://blog.conjur.net/introducing-summon>  
<https://conjurinc.github.io/summon/>  
  
  
Security Content Automation Protocol (SCAP) is a way of describing
various security and compliance controls. The Foreman project has just
added an interesting integration, meaning you can run automated
vulnerability assessment and security compliance audits across Foreman
managed hosts.  
  
<http://foreman-shlomizadok.rhcloud.com/2015/06/09/openscap-foreman/>  
  
I’m a big fan of sysdig as an all-in-one tracing tool. Csysdig is a new,
interactive, command line user interface to sysdig. It supports
querying live data as well as looking through previously captured
traces.  
  
<https://sysdig.com/announcing-csysdig-strace-htop-lua-container-support/>  
  
  
A nifty tool for sending alerts (to HipChat, PagerDuty, email, Slack, Influxdb) based on changes in Consul health checks.  
  
<https://github.com/AcalephStorage/consul-alerts>  
  
Tipboard is an open source dashboarding framework. It’s specifically
designed for large screens and deals with all the display issues so you
can just focus on the data.  
  
<http://allegrotech.io/tipboard/>  
<https://github.com/allegro/tipboard>  
  
  
An interesting attempt to build a human readable workflow language for
operations. Allows for writing reusable operations and then tying them
together with flows.  
  
<http://www.cloudslang.io/>  
<https://github.com/CloudSlang>  
  
  
EGADS (Extendible Generic Anomaly Detection System) is designed to
automatically detect anomalies in large scale time-series data. Looks
well suited to integration with some monitoring systems.  
  
<http://labs.yahoo.com/news/announcing-the-open-source-of-egads-a-scalable-configurable-and-novel-anomaly-detection-system/>  
<https://github.com/yahoo/egads>  
  
Percheron is a command line and YAML based tool for describing a stack of related Docker containers.  
  
<https://github.com/ashmckenzie/percheron>  
  
  
A handy command line tool for interacting with the Marathon API. The
README shows a simple text format example for describing applications
running in Marathon.  
  
<https://github.com/eBayClassifiedsGroup/marathon_deploy>  
  
Terraframe is a Ruby based DSL for Terraform, giving you the power of a
full programming language with the Terraform support for different cloud
providers.  
  
<http://edcanhack.com/2015/01/terraframe-making-hashicorps-terraform-awesome/>  
<https://github.com/eropple/terraframe>  
  
Chaos HTTP Proxy is a simple HTTP proxy which can be configured to break
in ways useful to testing distributed systems. Mess with MD5 hashes,
add client or server timeouts, throw in redirects, reorder response
headers and return error codes.  
  
<https://github.com/bouncestorage/chaos-http-proxy>  
  
  
Scope, from Weaveworks, is a new tool for visualising how your growing
container based infrastructure connects together, focusing on how the
network reveals your architecture.  
  
<http://blog.weave.works/2015/05/13/announcing-weaveworks-scope-container-visibility/>  
<https://github.com/weaveworks/scope>  
  
  
Swaddle is another take on building a single tool for packaging, whether
you require debs, rpms or tars. It handily builds website documentation
for each created package, supports signed packages and builds
repositories as well as individual packages.  
  
<https://github.com/raphaelcohn/swaddle>  
   
  
Apollo is a collection of tools (Mesos, Weave, Docker, Consul, HAProxy
and more) integrated together to allow for building your own
platform-as-a-service.  
  
<https://github.com/Capgemini/Apollo>  
  
  
Nulecule is a work-in-progress specification for an open format to
describe multi-component applications, similar to Docker Compose. I’ve
included a link to an example manifest too.  
  
<https://github.com/projectatomic/nulecule>  
<https://github.com/projectatomic/atomicapp/blob/master/examples/wordpress/nulecule>  
  
I talked about secret and key management being a common problem a few
weeks back. Vault is another entrant into the space with a few nice
features, including clear audit logs, rolling credentials and support
for multiple storage backends.  
  
<https://www.vaultproject.io/>  
  
  
Disque is a an in-memory, distributed job queue. Its goal is to capture
the essence of the "Redis as a jobs queue" use case. Currently described
as alpha quality, but interesting to keep an eye on.  
  
<https://github.com/antirez/disque>  
  
  
CloudRouter is a Linux based full-stack SDN implementation including
OpenDaylight.  It includes the features of traditional hardware routers,
as well as support for emerging technologies such as containers and
software-defined interconnection.  
  
[https://cloudrouter.org](https://cloudrouter.org/)  
  
  
Captain is a simple opinionated workflow for building, testing and publishing containers.  
  
<https://github.com/harbur/captain>  
  
Bottled Water is an interesting looking tool for streaming data from
PostgreSQL to Kafka. You could then use that stream for warming caches,
building a search index or doing any form of stream processing.  
  
<http://blog.confluent.io/2015/04/23/bottled-water-real-time-integration-of-postgresql-and-kafka/>  
<https://github.com/confluentinc/bottledwater-pg>  
  
  
Following on from last weeks tools for secret management, Sneaker is a
tool for storing secrets on S3 using Amazon Key Management Store.
Excellent documentation describing various different threat models too.  
  
<https://github.com/codahale/sneaker>  
  
  
A nice example of an opinionated container, it provides an Nginx HTTP
load balancer which updates automatically based on information from
etcd. It also integrates with another container running registrator to
do this automatically.  
  
<https://github.com/factorish/proxy>  
   
  
Sometimes you just want a lo-fi dashboard. A browser window to refresh
and reload as needed. Page Refreshr solves that problem nice and simply.  
  
<https://github.com/Jimdo/page-refreshr>  
  
  
Smolder is a simple tool for testing API endpoints. Describe the URLs,
headers and required responses in JSON and run tests against your API.
I’d probably prefer something more human  
  
<https://github.com/sky-shiny/smolder>  
  
  
Vega is a distributed mailbox, with an HTTP API and plans for AMQP and
STOMP support. It’s designed to be durable and resilient under failure,
and uses Consul under the hood. It’s intended as the backbone for how
other components communicate with each other.  
  
<https://github.com/vektra/vega>  
  
  
Hub release is a handy utility for automatically populating release notes on github based on commit messages and closed issues.  
  
<https://github.com/zestia/hubrelease>  
  
As containers become the unit of work in distributed systems, scheduling
across hosts becomes increasingly important. Citadel is interesting
because, rather than being just an out of the box solution it’s
positioned as a toolkit for writing your own custom schedulers.  
  
<http://citadeltoolkit.org/>  
<https://github.com/citadel/citadel>  
  
  
Shpec is an rspec-like testing framework for shell scripts. The README
gives you an idea of the syntax, and show how easy it is to extend with
your own matchers.  
  
<https://github.com/rylnd/shpec>  
  
  
A simple Rake library which allows building Debian packages using either
git-buildpackage or fpm. It would be nice if this supported other
package types like RPM as well.  
  
<https://github.com/jimdo/buildtasks>  
  
   
  
  
Graphite beacon is a very simple alerting system for Graphite metrics.
Just install the app and describe your alerts in JSON. Can alert via
SMTP, Hipchat, Slack or HTTP.  
  
<https://github.com/klen/graphite-beacon>  
  
  
A nifty little tool, httpdiff allows you to diff two HTTP requests and
show any differences in the headers. Useful for exploration or building
testing tools on top of.  
  
<https://github.com/jgrahamc/httpdiff>  
  
  
Bazel is a new build tool from Google, it’s able to build a wide range
of software quickly and is particularly suited to organisation using a
single very large monolithic repository.  
  
<http://bazel.io/>  
  
A nice and simple way of getting metrics from elasticsearch to graphite. Nice screenshots to show you what you’re getting too.  
  
<https://github.com/jamiealquiza/es-stats>  
  
  
A minimal githook application configured using a json file. You can set
commands to run based on the repository changing and sent output to
stdout and to slack.  
  
<https://github.com/octplane/small-deployer>  
  
Shutit is a build tool for Docker containers, moving from the Dockerfile
syntax to using python as a build language and providing an opinionated
workflow.  
  
<http://ianmiell.github.io/shutit/>  
<https://github.com/ianmiell/shutit>  
  
A new CI system with a very pipeline native setup. It’s automatically
deployed using BOSH and features some interesting integration with
Pivotal Tracker, Docker, S3 and more.  
  
<http://concourse.ci/>  
  
  
A collection of Puppet modules and scripts aimed at compliance with more
than 1000 requirements from nine US Department of Defence policy
documents. Some interesting autogenerated documentation with Latex which
might be applicable to others too.  
  
<https://github.com/afseo/cmits>  
  
  
The combination of low level system tools with embedded scripting with
Lua is, I think/hope, one we’ll see more of. Nginx already does this
well. go-lua is a Lua runtime for Go, which I’d love to see in the
emerging Go system tools.  
  
<https://github.com/Shopify/go-lua>  
  
  
Curl is amazing, but it’s also somewhat cryptic. Httpie is a a Curl
replacement designed with a more friendly, and HTTP native, interface.  
  
<https://github.com/jakubroztocil/httpie>  
   
  
RancherOS is a minimal Linux distro designed to run Docker containers.
It basically runs Docker as PID 1 a top the Linux kernel, meaning the
image itself is tiny compared to a normal distribution.  
  
<http://rancher.com/rancher-os/>  
  
  
Packetbeat is an open source application monitoring and packet tracing
system. It works by sniffing the traffic between your application
services, correlating them into transactions and using Elasticsearch for
```bash
analysing them and for ad-hoc queries.  
```

  
<https://github.com/packetbeat/packetbeat>  
  
  
The data in AWS CloudTrail is essential for security and compliance in
AWS. Traildash grabs those files, stores them in ElasticSearch, and
presents a Kibana dashboard so you can analyze recent activity in your
AWS account.  
  
<https://github.com/AppliedTrust/traildash>  
  
  
Burlesque is a message queue with a long polling HTTP API for easy
integration. The excellent documentation gives a rundown of how to use
it and the various configuration options.  
  
<https://github.com/KosyanMedia/burlesque>  
  
A very good looking dashboard for managing a fleet of Apple computers using Munki.  
  
<https://github.com/salsoftware/sal>  
  
  
Gogs is a self-hosted Git server. It’s aim is to be cross-platform
(running on Windows, Mac and Linux), light-weight and very easy to
install.  
  
<http://gogs.io/>  
  
  
Baci is a tools for building ACIs, the Rocket container format. It
handily reuses the Dockerfile format, but also speculates a little about
a more general container build language which sounds interesting.  
  
<https://github.com/sgotti/baci>  
  
Project Jellyfish is a broker system. It allows admins to create a
product catalog of any type of service (SaaS, IaaS, PaaS, etc.) and
allows them to be assigned a cost, and then users can create projects
and add those services to a project.  
  
<http://www.projectjellyfish.org/>  
<https://github.com/projectjellyfish/api>  
  
  
Cram is a testing framework for command line applications. Cram tests
look like snippets of interactive shell sessions which makes writing
tests nice and easy.  
  
<https://bitheap.org/cram/>  
  
  
Building system packages always required a fairly good understanding of
the packaging tool chain, and building packages for different operating
systems required even more work. This project uses Docker under the hood
to create reproducible RPM build environments nicely.  
  
<https://github.com/alanfranz/docker-rpm-builder>  
  
Debops is a collection of ansible playbooks and supporting scripts intended to make administering debian easier.  
  
<http://debops.org/>  
<https://github.com/debops/debops>  
  
Comcast is a tool designed to simulate common network problems like
latency, bandwidth restrictions, and dropped/reordered/corrupted
packets. Very handy for testing distributed systems under non-ideal
network conditions.  
  
<https://github.com/tylertreat/Comcast>  
  
  
Toxiproxy is another tool for simulating network errors for testing
purposes. It provides a proxy with an API, which allows for altering the
network conditions cleanly. The example gives you a great idea of
what’s possible.  
  
<https://github.com/Shopify/toxiproxy>  
  
huptime is a clever utility to enable zero-downtime reloading of
processes, without modifying the application. It supports running under
init systems like upstart too.  
  
<https://github.com/amscanne/huptime>  
  
  
If you’re on Windows and prefer a bundled software over installing and
managing lots of small pieces then Bills Kitchen might be for you. It
provides Vagrant, Chef and a Ruby developent environment along with
various Vagrant plugins, the Putty SSH client, the SublimeText editor
and more.  
  
<https://github.com/tknerr/bills-kitchen>  
  
  
A comprehensive set of Puppet and Chef code for hardening servers.
Includes code for base operating systems, ssh, mysql, postgresql, apache
and nginx and supports Ubuntu, RedHat, Debian, Centos and Oracle.  
  
<https://telekomlabs.github.io/>  
  
  
Jetpack is a work-in-progress implementation of the Application Container Specification using FreeBSD Jail and ZFS.  
  
<https://github.com/3ofcoins/jetpack>  
  
  
Dashiell is a nice frontend to osquery and facter, allowing you to query the state of a cluster of servers very quickly.  
  
<https://github.com/maclennann/dashiell>  
  
Novm is an interesting take on a hypervisor, mixing some of the benefits
of virtualisation with some of the advantages of containers. The README
does a good job of explaining the rationale.  
  
<https://github.com/google/novm>  
  
  
An attempt to write a Chef client in PowerShell. Adds new Chef resources
and Knife commands which use PowerShell and DSC on the backend.  
  
<https://github.com/POSHChef/POSHChef>  
  
  
Cachet is an open source status page system that aims to be simple to
use and easy to manage. A good starting point if you’d prefer to run
your own status page.  
  
<https://cachethq.io/>  
  
  
A simple application which generates a Vagrantfile suitable for common Ruby on Rails development tasks.  
  
<https://railsbox.io/>  
   
  
DeployDB is a tool for storing the state of deployments, and is designed
to integrate with existing tools like Jenkins and RunDeck and actually
do the deployment.  
  
<http://hackers.lookout.com/deploydb/>  
<https://github.com/lookout/deploydb>  
  
  
RFC Reader does exactly what you expect, it provides a nice web interface for reading individual RFCs.  
  
<http://www.rfcreader.com/>  
  
Socketplane have released a technology preview of their container
networking technology. The preview features things like ZeroConf
```bash
multi-host networking for Docker, support for multiple networks and
```

distributed IP Address Management (IPAM).  
  
<https://github.com/socketplane/socketplane>  
  
  
vCloud Air now has a nice looking open source command line interface. This post and repo cover the basic functionality.  
  
<http://blog.pacogomez.com/vcloud-air-command-line-interface/>  
<https://github.com/vmware/vca-cli>  
   
  
Spigio is an interesting tool for modelling gossip based communications
in large networks. The output to both GraphML and graphJSON make
visualising results easy.  
  
<https://github.com/adrianco/spigo>  
  
Conn Check is a new tool for verifying software deployments, things like
can  a service talk to a database or another service, or is
authentication setup correctly. It can also auto-generate tests for some
types of applications.  
  
<http://1stvamp.org/verifying-post-deploy-connections-with-conn-check>  
  
  
Dockerana is a packaged version of Graphite and Grafana, specifically targeted at metrics from Docker.  
  
<http://dockerana.com/>  
  
  
Seagull is another monitoring tool aimed at Docker environments. It
provides a dashboard containing information about the images and
containers, and allows simple actions like deleting an image or stopping
a container.  
  
<https://github.com/tobegit3hub/seagull>  
  
Charted is a way of sharing graphs. I’m a big fan of using monitoring
tools for business metrics, but exposing that data can be hard. Charted
looks a great bridge to get other people interested in data.  
  
<https://medium.com/data-lab/introducing-charted-15161b2cd71e>  
  
Rancher is an attempt to bring AWS-like functions, such as EBS, VPC, ELB
and Security Groups, and make them available across any servers, using
```bash
docker under the hood.  
```

  
<http://www.rancher.io/>  
<https://github.com/rancherio/rancher>  
  
  
VclFiddle is an online tool for experimenting with the Varnish Cache
HTTP reverse-proxy in a sandboxed environment. The hosted version gives
you a really easy way of debugging Varnish configuration.  
  
<https://github.com/vclfiddle/vclfiddle>  
<http://www.vclfiddle.net/>  
  
Bosun is an all-in-one monitoring system backed by OpenTSDB. It provides
alerting, time series data collection and visualisation as well as
metric collection. It also treats both Linux and Windows as first class
citizens.  
  
<http://bosun.org/>  
  
  
Octopush is another tool for using Jenkins for deployment automation. It
provides a dedicated user interface and API, as well as integration
with GitHub for authentication.  
  
<https://github.com/olx-inc/octopush>  
<http://olx-inc.github.io/octopush/>  
  
Walter is described as a tiny deployment pipeline. IT reminds me of the
wercker build file, but can run locally as well as within a CI system.
Useful for testing pipelines locally.  
  
<http://ainoya.io/walter>  
<https://github.com/Walter-cd/Walter/>  
  
  
Stager is a nifty looking tool to automatically build staging environments from GitHub pull requests.  
  
<http://info.localytics.com/engineering-blog/stager-staging-environments-on-autopilot>  
<https://github.com/localytics/stager-server>  
  
osquery exposes information about your operating system via a SQL
interface, allowing for some pretty powerful tooling. Also supports
querying across multiple hosts.  
  
<https://code.facebook.com/posts/844436395567983/introducing-osquery/>  
<https://github.com/facebook/osquery>  
  
  
Dwight Conrad is an OpenResty based HTTP routing component, backed by
Redis. It supports a number of features useful for feature toggling and
canary releases.  
  
<https://github.com/3scale/dwight-conrad>  
  
  
Cluppet is a tool to maintain a part of your AWS infrastructure in code, specifically as a clojure based DSL.  
  
<https://github.com/mixradio/cluppet>  
  
Stocker is an interesting approach to securely managing environment
variables for use by applications, in particular containers. It’s
currently Redis backed though could support multiple backends in the
future.  
  
<https://github.com/buth/stocker>  
   
  
Boxstarter is a tool for bootstrapping a new Windows machine. It makes
heavy use of Choclately packages and provides a number of very simple
ways of getting started. Great documentation too.  
  
<http://boxstarter.org/>  
  
  
Carbonate is a set of command line tools for managing a Graphite
cluster. It packages tools for listing and finding metrics,
synchronizing metrics between nodes, backfilling whisper data from other
files and more.  
  
<https://github.com/jssjr/carbonate>  
  
  
If you’re building software on GitHub and want an easy way of managing
GitHub releases then look no further than this simple command line tool.
The main features are around setting release metadata and uploading
binary files as part of the release.  
  
<https://github.com/aktau/github-release>  
  
Taste tester is another workflow tool for Chef, it launches a Chef-Zero
instance locally and then checks what changes would happen to a remote
machine with your local changes.  
  
<https://github.com/facebook/taste-tester>  
  
  
A set of scripts useful for hardening a typical Linux system. Partly
useful for learning about a good practices, I’d also love to see this
converted into various config management code flavours.  
  
<https://github.com/marshyski/quick-secure>  
  
Chef Guard looks like a useful tool, specifically it protects your Chef
server from untested and uncommitted cookbooks. Several useful features,
including emailing of configuration change diffs and validation of
changes.  
  
<http://xanzy.io/projects/chef-guard/introduction/overview.html>  
  
  
Learning new tools and languages is always hard so anything that makes
it easier it a good idea. Chef Koans takes inspiration from other
similar projects and applies it to Chef, a good starting point if you’ve
done similar learning exercises before.  
  
<https://github.com/leftathome/chef-koans>  
  
  
Zonify is a set of command line tools for managing Route53 DNS for an
AWS infrastructure. It intelligently uses tags and other metadata to
automatically create the associated DNS records.  
  
<https://github.com/airbnb/zonify>  
   
  
The new puppet server was released at Puppet Conf. Puppet server is a
drop-in replacement for the current puppet master with some pretty big
performance and scalability improvements.  
  
<https://github.com/puppetlabs/puppet-server>  
  
  
If you’re using Route53 DNS then Roadworker should be of interest. It’s a
Ruby based DSL for creating zones and records. Good examples too.  
  
<https://github.com/winebarrel/roadworker>  
  
  
If like me you’re maintaining a number of puppet modules you probably
have an occasional day when you try and remember to update lots of
static files (Rakefile, .travis.yml, Gemfile, etc.) across all of them.
Modulesync looks a nice solution to that issue.  
  
<https://github.com/puppetlabs/modulesync>  
  
Blender is a modular remote command execution framework. It provides a
few basic primitives to automate cross server workflows, with those
workflows expressed in a ruby DSL and executed using the provided
command line tools.  
  
<https://github.com/PagerDuty/blender>  
  
  
Mcrouter is a tool for those running large memcached clusters. It’s a
memcached protocol router designed to shard data across a cluster of
memcached instances, with uses for load balancing, cache distribution
and a number of other failure cases.  
  
<https://github.com/facebook/mcrouter>  
<https://code.facebook.com/posts/296442737213493/introducing-mcrouter-a-memcached-protocol-router-for-scaling-memcached-deployments/>  
  
  
Vitess is a project to provide servers and tools which facilitate
scaling of MySQL databases for large scale web services. Comprehensive
user documentation is provided if you want to try it out.  
  
<https://github.com/youtube/vitess>  
  
  
Urknall is an interesting looking remote execution framework written in
Go. Much of the functions make use of standard shell commands, which
makes getting started very simple.  
  
<http://urknall.dynport.de/>  
<https://github.com/dynport/urknall>  
  
If you’re doing any real PowerShell work in the console that PSReadLine
is for you. It provides a much nicer command line interface with
completion, history, syntax highlighting, multiline support and lots
more.  
  
<https://github.com/lzybkr/PSReadLine>  
<http://rkeithhill.wordpress.com/2013/10/18/psreadline-a-better-line-editing-experience-for-the-powershell-console/>  
  
  
The concept of a single source of truth for everything pertaining to
your infrastructure isn’t a new idea, but Collins looks like a more
modern take on the CMDB. A documented API and client libraries, along
with support for physical servers, switches, racks and higher level
software properties.  
  
<http://tumblr.github.io/collins/>  
  
  
Portainer is an interesting combination of mesos and docker, aimed at
building containers rather than running them. Worth investigating is
you’re finding yourself building lots of containers and managing
dedicated machines to do so.  
  
<https://github.com/duedil-ltd/portainer>  
  
  
Oh My Vagrant is an opinionated development environment suitable for
docker, puppet and more development activities. Based around Vagrant,
Fedora, libvert and more.  
  
<http://ttboj.wordpress.com/2014/09/03/introducing-oh-my-vagrant/>  
  
  
If you’ve found yourself writing small scripts in bash, and then
re-implementing those same scripts for Windows as batch files then Batsh
might be for you. A small scripting language that compiles to batch and
bash. The online demo is pretty nifty.  
  
<https://github.com/BYVoid/Batsh>  
<http://batsh.org/>  
  
If you’re using Test Kitchen then you might find the kitchen-sync plugin
useful. It provides alternative file sync strategies which should be
faster than the defaults for certain setups.  
  
<https://github.com/coderanger/kitchen-sync>  
  
  
An interesting DNS server which connects to the AWS API and returns DNS records based on instance names or roles.  
  
<https://github.com/ConradIrwin/aws-name-server>  
  
  
Scumblr is an interesting tool for keeping an eye on potential exploits
or discussions of your company/application elsewhere on the internet.
All sorts of potential monitoring applications for this.  
  
<https://github.com/netflix/scumblr>  
<http://techblog.netflix.com/2014/08/announcing-scumblr-and-sketchy-search.html>  
  
  
Dockersh is a user shell for isolated, containerized environments and is
designed to be used as a login shell on machines with multiple
interactive users.  
  
<http://engineeringblog.yelp.com/2014/08/hack209-dockersh.html>  
<https://github.com/Yelp/dockersh>  
  
  
Helios is another docker orchestration platform designed for managing
containers across a large fleet. Instructive documentation, debian
packages and a vagrant setup for trying it out are all plus points.  
  
<https://github.com/spotify/helios>  
   
  
Mentioned in the ftrace blog post above this set of scripts is a great
resource if you’re doing any low-level performance tuning on Linux.  
  
<https://github.com/brendangregg/perf-tools>  
  
  
Vessel is another tool for automating the setup and use of docker based
development environments. It integrates Vagrant, CoreOS, Consul, docker
and Atom into a slick opinionated package. The user interface looks
particularly impressive from the screenshots.  
  
<http://awvessel.github.io/>  
  
  
Ganger is a tool for running short-lived network services inside Docker
containers, and then proxying client connections to them. It’s designed
mainly for data processing batch jobs that require a fresh environment
each time, but could have other interesting uses.  
  
<https://github.com/andytinycat/ganger>  
  
  
Chef-runner is a tool for executing chef recipes on remote machines,
over SSH. It features vagrant integration and is built to be much faster
than the in-built provisioning for this use-case.  
  
<https://github.com/mlafeldt/chef-runner>  
  
Cloud Foundry is a pretty complex distributed system, and running the
entire thing locally when all you want to do is develop apps to run on
it isn’t ideal. Enter Cloud Focker, which combines Docker with Cloud
Foundry buildpacks under a nice command line interface.  
  
<https://github.com/CloudCredo/cloudfocker>  
  
   
  
Kibana-rack embeds the Kibana ElasticSearch interface into a Rack
middleware, making running it alongside existing ruby apps simpler. The
example showing authentication integration with Devise shows why this
might be a good idea for some.  
  
<https://github.com/tabolario/kibana-rack>  
  
  
An interesting curated set of Go libraries for common operations and
automation tasks. Everything from DNS and consensus protocols to load
testing and metrics collection.  
  
<https://github.com/mindreframer/golang-devops-stuff>  
  
  
This packer provisioner allows for running provisioning command on the
```bash
host rather than the new machine being built. I can imagine a few uses
```

for this, from black box testing to recording the results of packer
builds.  
  
<https://github.com/shaunduncan/packer-provisioner-host-command>  
  
  
Diplomat is an mechanism for integrating Ruby applications with the
Consul service discovery tool. The blog post nicely covers some of the
advantages of this approach.  
  
<https://github.com/WeAreFarmGeek/diplomat>  
<http://johnhamelink.com/distributed-web-systems-with-consul-haproxy-and-envoy.html>  
  
Managing local machines with Vagrantfiles has lots of advantages, but
when recreating that environment in production you might turn to
something like libcloud. Duplicate no more, with with vagrant driver for
libcloud.  
  
<https://github.com/carletes/libcloud-vagrant>  
  
  
Terraform is a tool aimed at giving you a single view of your entire
infrastructure in code. Describe instances and supporting services (like
DNS) via a domain specific language and use the command line tool to
launch across multiple infrastructure providers.  
  
<http://www.terraform.io/>  
  
  
Consul is an orchestration mechanism with fault-tolerance based on the
gossip protocol and a key/value store that is eventually consistent.
Hiera-consul will allow hiera to write to the k/v store for metadata
centralisation and harmonisation.  
  
<https://github.com/lynxman/hiera-consul>  
  
Devstep is described as a development environment builder powered by
Docker and buildpacks. The getting started docs give you a flavour of
the workflow and a list of the current buildpacks.  
  
<https://github.com/fgrehm/devstep>  
<http://fgrehm.viewdocs.io/devstep>  
  
  
Infrataster is another tool for writing unit tests for infrastructure.
It’s designed to complement serverspec, by focusing on running tests
from outside the virtual machine to test external interfaces like HTTP
or SSH.  
  
<https://speakerdeck.com/ryotarai/infrataster-infra-behavior-testing-framework-number-oedo04>  
<http://infrataster.net/>  
  
  
Uchiwa looks like a great addition to the Sensu monitoring framework.
The screenshots give you an idea about it’s capabilities. It’s also
packaged as a docker container which I think is something we’ll see more
and more of.  
  
<https://github.com/sensu/uchiwa>  
  
  
Goiardi is a Chef server written in Go with the ability to run entirely
in memory, with optional persistence saving the in-memory data to disk
or using MySQL or Postgres. I’m not sure of the why in this case, but
having open integration test suites make this an interesting
possibility.  
  
<https://github.com/ctdk/goiardi>  
  
  
Another log parsing tool, Petit has a number of impressive features from
hashing, graphing and discovering important repeated items in log
files.  
  
<http://crunchtools.com/software/petit/>  
   
MaestroNG is an orchestration tool for multi-host docker environments.
The examples in the README give the best idea, showing YAML files
describing the entire environment.  
  
<https://github.com/signalfuse/maestro-ng>  
  
  
Anode is a utility for analyzing graphite metrics. It’s currently quite
experimental, containing a single three sigma analyzer that takes a time
series from graphite and creates new metrics alongside.  
  
<https://github.com/mattrco/anode.exp>  
  
  
Log File Navigator is an advanced log file viewer for the small-scale.
It’s only really useful for a single host but provides some impressive
command line visualisation tools as well as a powerful SQL query engine.  
  
<http://lnav.org/>  
  
  
Haka is described as an open source security oriented language which
allows to apply security policies on (live) captured traffic. It’s based
on Lua and looks to be a great way of writing certain kinds of network
tools.  
  
<http://haka-security.org/>  
  
  
Another interesting networking stack, again using Lua (LuaJit in this
case). Snabb Switch is designed for high throughput, low latency network
sytems suitable for use by ISPs. It speaks natively to ethernet
hardware, hypervisors, and the linux kernel. Interesting times for
networking.  
  
<https://github.com/SnabbCo/snabbswitch>  
  
  
An interesting approach to server authentication, swapping the
AuthorizedKeysCommand for a custom application which checks keys
published to GitHub rather than a local public key. The examples
directory makes understanding how it works nice and easy.  
  
<https://github.com/davidpelaez/gh-keys>  
  
  
Tesera is yet another graphite frontend with a nifty way of separating
the query from the visualisation, leading to some nice features. It
looks gorgeous too with multiple colour themes available.  
  
<http://urbanairship.com/blog/2014/06/30/introducing-tessera-a-graphite-frontend>  
<https://github.com/urbanairship/tessera>  
  
  
Another lovely looking dashboard, Puppet Explorer is a frontend for
PuppetDB. It’s intended to exploring Puppet resource and node
information with nice visualisations and the powerful PuppetDB query
language.  
  
<https://github.com/spotify/puppetexplorer>  
  
  
Toaster is another tool designed for testing infrastructure stacks. It
makes use of LXC under the hood to provide isolated test environments
and comes bundled with a web interface to observe and manage test runs.  
  
<https://github.com/whummer/toaster>  
  
  
Given our daily use of version control systems they contain an awful lot
of data past just the source code. This tool allows for exporting a git
repository into the solr search engine for data mining.  
  
<https://github.com/arafalov/git-to-solr>  
  
  
I’ve mentioned OSv previous as an interesting take on the operating
system, but trying it out locally had required a lot of effort. Enter
capstan, which provides a very nice command line interface to launch OSv
instances locally on your machine.  
  
<https://github.com/cloudius-systems/capstan>  
  
  
Cayley is an open source Graph database. It supports multiple storage
backends, an HTTP based API as well as a REPL and a built-in query
editor and visualiser.  
  
<https://github.com/google/cayley>  
  
If you’ve ever looked into ways of securing traffic between internal
services you’ll have found lots of options, most of them lots of work.
Certified is an internal CA that’s designed to be easy to use  
  
<https://github.com/rcrowley/certified>  
  
Kubernetes is the open source version of Google’s container cluster
manager, including support for docker. The setup instructions are based
around Google Compute Engine but the software can run anywhere.  
  
<https://github.com/GoogleCloudPlatform/kubernetes>  
  
  
Another announcement from DockerCon, Centurion is a deployment tool
designed for docker. It provides a Rake based DSL which makes specifying
hosts and images. The examples give you an idea, but the rolling update
feature in particular is nice.  
  
<https://github.com/newrelic/centurion>  
   
  
Following on from a recent blog post about alert design, Nagios Herald
is a notification application designed to help add context to monitoring
alerts. The included examples should give you lots of ideas.  
  
<http://codeascraft.com/2014/06/06/introducing-nagios-herald/>  
<https://github.com/etsy/nagios-herald>  
  
  
Logstash has always been very much about the plugins. This project aims
to make writing those plugins much easier. Still early days but it looks
to automate some of the common tasks.  
  
<https://github.com/coolacid/logstash-pluginbase>  
  
  
  
Changelog is a tool designed to answer the question “What changed in the
last twenty minutes?”. It provides a simple HTTP api and a web
interface and is intended for tracking everything from deployments, dns
changes, reboots, creation of servers, etc.  
  
<http://engineering.prezi.com/blog/2014/05/28/changelog-a-tool-designed-to-help-you-recover-faster/>  
<https://github.com/prezi/changelog>  
  
  
Openduty is an open source Alerting and incident escalation tool. It
supports alerting with XMPP, email, SMS, Phone and Push notifications,
and supports the Pagerduty API for triggering alerts.  
  
<https://github.com/ustream/openduty>  
  
  
Checkzilla is simple tool for letting you know about out-of-date
software versions. It currently supports Rubygems and NPM, but it’s
extensible for other package types. Being able to manage this in one
place feels like a good thing.  
  
<https://github.com/mickey/checkzilla>  
  
Container agent is a tool for launching a set of containers based on a
simple manifest file. Although designed for Google Compute Engine it
appears like it should work anywhere. The documentation contains lots of
good examples.  
  
<https://github.com/GoogleCloudPlatform/container-agent>  
  
  
Radial is described as being intended to help understand, record, and
put into practice the intersection between Twelve-Factor App
best-practices and Docker features. It’s provides a defined language as
well as examples of how to compose a set of containers.  
  
<https://github.com/radial/docs>  
  
  
An OWASP project, Mantra is a browser for use when auditing the security
of web applications. Under the hood it’s Firefox with a large number of
very useful plugins, from traffic capture to XSS scanners.  
  
<http://www.getmantra.com/index.html>  
  
Packetbeat looks like a very nice new open source application monitoring
and packet tracing system. A lovely Kibana based interface and agents
which can detect various types of traffic once installed make for a very
simple getting started experience.  
  
<http://packetbeat.com/>  
  
  
A neat approach to managing users in a large GitHub organisation.
Provides tools for auditing users, ensuring two factor authentication is
enabled and providing reporting of issues.  
  
<https://github.com/guardian/gu-who>  
  
  
Managing multiple different git hooks across multiple repositories for
```bash
self-hosted git repos can be a pain. cpthook aims to make that easier,
```

moving the configuration into a simple YAML file and providing a command
line to manage the hooks.  
  
<http://cpthook.com/>  
  
I’ve been starting to think about more dynamic load balancing recently
and projects like Vulcand are very interesting. It combining a custom
HTTP Proxy with configuration stored in Etcd, with the configuration
updating automatically as the config changes.  
  
<https://github.com/mailgun/vulcand>  
  
  
A very simple but powerful deployment user interface based around Git and a simple YAML configuration file.  
  
<https://github.com/gengo/goship>  
  
  
Kamon is a nice, opinionated, distribution of tools designed to make
collecting metrics from scala applications easier. It uses Graphite or
New Relic as the backend and provides modules for monitoring actors,
tracing application requests and logging.  
  
<http://kamon.io/>