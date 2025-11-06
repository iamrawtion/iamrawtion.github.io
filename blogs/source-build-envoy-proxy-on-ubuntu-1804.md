---
title: "Source build Envoy proxy on Ubuntu 18.04"
date: "2019-02-20"
category: "DevOps"
tags: ["envoy", "load balancer", "proxy", "source build", "ubuntu"]
excerpt: "sudo apt-get update sudo apt-get install openjdk-8-jdk build-essential autoconf libtool cmake ninja-build echo \"deb [arch=amd64]..."
author: "Roshan Nagekar"
---

```bash
sudo apt-get update  
sudo apt-get install openjdk-8-jdk build-essential autoconf libtool cmake ninja-build  
echo "deb [arch=amd64] http://storage.googleapis.com/bazel-apt stable jdk1.8" | sudo tee /etc/apt/sources.list.d/bazel.list  
curl https://bazel.build/bazel-release.pub.gpg | sudo apt-key add -  
sudo apt-get update && sudo apt-get install bazel  
wget https://dl.google.com/go/go1.11.5.linux-amd64.tar.gz  
tar -xvf go1.11.5.linux-amd64.tar.gz  
sudo chown -R root:root ./go  
sudo mv go /usr/local  
echo "export GOPATH=$HOME/go" >> ~/.profile  
echo "export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin" >> ~/.profile  
 git clone https://github.com/envoyproxy/envoy.git  
cd envoy/  
bazel build --package_path %workspace%:/home/<user>/envoy/ //source/exe:envoy-static  
```

  
**RELAX, ITS GOING TO TAKE LONG TIME**  
  
  
  
  
To generate the example configurations run the following from the root of the repo:  
  
```bash
mkdir -p generated/configs  
bazel build //configs:example_configs  
```

  
**RELAX, ITS GOING TO TAKE LONG TIME**  
  
I wrote an **Ansible** playbook too for this**.** I will publish it later on **Github**