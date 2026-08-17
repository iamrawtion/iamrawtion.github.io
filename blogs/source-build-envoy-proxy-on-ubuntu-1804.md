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

## RELAX, ITS GOING TO TAKE LONG TIME

To generate the example configurations run the following from the root of the repo:

```bash
mkdir -p generated/configs
bazel build //configs:example_configs
```

## RELAX, ITS GOING TO TAKE LONG TIME

I wrote an **Ansible playbook too for this. I will publish it later on **Github

## Why Build Envoy from Source?

Most teams never need to do this. If you're running Envoy in production, you're almost certainly pulling it from [the official Docker images](https://hub.docker.com/r/envoyproxy/envoy) or getting it injected as a sidecar by a service mesh like Istio. That's the right call for the vast majority of deployments — official images are tested, signed, and updated with security patches.

Source builds are for specific situations:

- You need to apply a patch that hasn't made it into a release yet. Maybe you hit a bug and there's a fix in `main` but the next release is weeks away.
- You're targeting an architecture or OS where Envoy doesn't publish official binaries.
- You're contributing to Envoy and need a development build with debug symbols.
- You want to understand the build system before submitting a PR.

If none of those apply to you, use the Docker image. Seriously.

## What Takes So Long

The first build took me around 75 minutes on a reasonably spec'd machine, and that surprised me until I understood what Bazel was actually doing.

Envoy has no pre-compiled dependencies. Bazel downloads and builds everything from source: gRPC, BoringSSL (Google's OpenSSL fork), Protobuf, abseil-cpp, libevent, and more. Each of those has its own dependency tree. On a first build, you're compiling several hundred thousand lines of C++ with no shortcuts.

The good news: subsequent builds are much faster. Bazel caches every build artifact in `~/.cache/bazel/`, keyed by content hash. If you change one file in Envoy's HTTP filter code, Bazel only recompiles the affected translation units and re-links the binary. Incremental rebuilds on a warm cache typically run in a few minutes.

On CI, the trick is persisting `~/.cache/bazel` between runs. Most CI platforms support artifact caching keyed by a hash of your dependency lockfiles. A warm Bazel cache on CI cuts Envoy rebuild time from 60+ minutes to under 10.

## Faster Alternative: Use the Official Docker Image

For anything that isn't a source build scenario, this is the right starting point:

```bash
docker pull envoyproxy/envoy:v1.29-latest
docker run --rm -it \
  -p 9901:9901 \
  -p 10000:10000 \
  -v $(pwd)/envoy.yaml:/etc/envoy/envoy.yaml \
  envoyproxy/envoy:v1.29-latest
```

You'll need a minimal `envoy.yaml` to get anything running. Here's the smallest useful config — an admin endpoint and a single listener that proxies HTTP:

```yaml
admin:
  address:
    socket_address:
      address: 0.0.0.0
      port_value: 9901

static_resources:
  listeners:
  - name: listener_0
    address:
      socket_address:
        address: 0.0.0.0
        port_value: 10000
    filter_chains:
    - filters:
      - name: envoy.filters.network.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
          stat_prefix: ingress_http
          route_config:
            name: local_route
            virtual_hosts:
            - name: backend
              domains: ["*"]
              routes:
              - match:
                  prefix: "/"
                route:
                  cluster: service_backend
          http_filters:
          - name: envoy.filters.http.router
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.http.router.v3.Router
  clusters:
  - name: service_backend
    connect_timeout: 0.25s
    type: LOGICAL_DNS
    load_assignment:
      cluster_name: service_backend
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: example.com
                port_value: 80
```

Port 9901 is the admin endpoint. Hit `http://localhost:9901/stats` and you get a wall of metrics. `http://localhost:9901/ready` returns 200 when Envoy is healthy — that's your health check endpoint for load balancers.

## Verifying the Build

Once the Bazel build finishes, confirm the binary actually works before doing anything else with it:

```bash
./bazel-bin/source/exe/envoy-static --version
./bazel-bin/source/exe/envoy-static -c generated/configs/google_com_proxy.v2.yaml
```

The `--version` output should print the Envoy version string plus the build label. If the binary is corrupt or missing dependencies, this is where it fails cleanly rather than at runtime. The second command runs Envoy with the example Google proxy config generated earlier — it's a real config that exercises the listener and cluster code paths. If Envoy starts up and logs that it's listening, your build is good. Check the [Envoy documentation](https://www.envoyproxy.io/docs/envoy/latest/) for what to expect in the startup logs.

## When to Use a Service Mesh Instead

If you're planning to run Envoy as a sidecar across more than a handful of services, stop and evaluate [Istio](https://istio.io/latest/docs/) or Linkerd before going further down the manual route. Both inject and manage Envoy sidecars automatically, handle mTLS certificate rotation, distribute xDS configs via a control plane, and surface observability data through integrated dashboards.

Rolling your own sidecar management means you're also building the certificate rotation, the config distribution mechanism, and the operational tooling to debug it all. That's a significant undertaking. Source building Envoy makes sense for contributors and for specific patching scenarios. For production sidecar deployments across many services, a service mesh is almost always the better investment.
