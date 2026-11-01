---
title: "PHP2Shell: How a Simple File Editor Nearly Became a Backdoor Into Our Entire Lab"
date: "2026-11-01"
category: "Security"
tags: ["Security", "WordPress", "Kubernetes", "Homelab", "DevSecOps", "PHP", "Hardening"]
excerpt: "A home lab security story — from a WordPress file editor to potential root access on bare metal. How a PHP webshell exploits the application layer where firewalls can't reach, and how we closed the door."
author: "Roshan Nagekar"
---

## The Short Version, For Everyone

Before we go deep, let me explain this the simple way.

Imagine you run a school notice board. Anyone in the school can stick a notice on it. Now imagine someone sneaks in a notice that says: *"Hey building manager, go open the server room door and leave it unlocked."* The notice board was never meant to do that — but because no one was checking what was being posted, it happened anyway.

That is PHP2Shell in a nutshell.

A PHP webshell is a small piece of PHP code — sometimes just one line — that an attacker uploads to your web server. Once it's there, it acts like a remote control. The attacker types commands into their browser, and your server executes them. Delete files, steal data, pivot to other machines — all from a browser tab.

The scary part? The server thinks it is just serving a web page. It has no idea it has been compromised.

---

## What We Are Running in the Lab

My home lab runs a Kubernetes cluster that hosts a handful of self-hosted applications — some for personal use, some shared with a few friends and fellow engineers. A good chunk of them are PHP-based. CMS tools, analytics platforms, survey tools, wiki software — the usual self-hosted stack.

Every single one of those PHP applications is a potential entry point if not hardened correctly.

The challenge with PHP applications in a shared cluster is that they often run in adjacent namespaces. One compromised instance is bad. Multiple compromised instances sharing the same cluster network is a different problem entirely.

---

## What PHP2Shell Actually Does — The Real Explanation

PHP is a server-side language. When you visit a PHP website, your browser sends a request, the server runs PHP code, and sends back HTML. Normal.

Now imagine an attacker finds a way to upload their own PHP file to your server. WordPress, for example, has a built-in **Plugin and Theme File Editor** in the dashboard. If an attacker gets admin credentials — through a weak password, credential stuffing, or a vulnerable plugin — they can open the file editor and inject a webshell directly into a theme file.

The simplest webshell looks like this:

```php
<?php system($_GET['cmd']); ?>
```

That's it. One line. Save it to any PHP file on the server, then visit:

```
https://yoursite.com/wp-content/themes/yourtheme/functions.php?cmd=id
```

The server responds with:

```
uid=33(www-data) gid=33(www-data) groups=33(www-data)
```

You now have remote code execution on the web server. The attacker is in.

---

## The OSI Layer Perspective — Why This Is So Dangerous

Security people talk about the OSI model — the seven-layer framework that describes how network communication works. Most people think of security as a firewall problem (Layer 3/4). PHP2Shell operates at **Layer 7 — the Application Layer** — the very top. And that is what makes it uniquely dangerous.

Here is why it matters:

```
Layer 7 - Application   ← PHP webshell lives HERE (looks like normal web traffic)
Layer 6 - Presentation
Layer 5 - Session
Layer 4 - Transport     ← Firewall blocks ports here
Layer 3 - Network       ← IP filtering, VPN tunnels here
Layer 2 - Data Link
Layer 1 - Physical      ← Bare metal servers, cables, hypervisors
```

Your firewall at Layer 3/4 sees HTTPS traffic on port 443. It lets it through — that is exactly what it is supposed to do. Your VPN operates at Layer 3. Your OS-level firewall operates at Layer 3/4. **None of them can distinguish a legitimate web request from a webshell command.**

The attacker slides in through the front door, dressed as a normal visitor.

Once inside the container via the webshell, the attack path could look like this:

1. **Layer 7** — Webshell uploaded via a PHP application's file editor
2. **Container escape** — Exploit a misconfigured pod security context or mounted host path to break out of the container
3. **Node compromise** — Land on the Kubernetes worker node as root
4. **Cluster pivot** — Access the Kubernetes API, read secrets, move laterally to other pods and namespaces
5. **Layer 1** — Reach the hypervisors. At this point, every VM, every disk, every backup is exposed

From one line of PHP to bare metal access. That is the blast radius.

In a shared cluster where PHP applications sit next to namespaces running databases, secrets, and internal tooling — all on the same cluster network — a single compromised pod is a risk to everything else.

---

## Our Lab's Security Posture — Many Layers, But Not Bulletproof

I covered the homelab security setup in the [previous post in this series](/blogs/?post=inside-my-homelab-architecture-philosophy-and-why-it-exists). The short version: there are multiple layers in place — a CDN and WAF in front, VPN-gated administrative access, OS-level firewalls on every node, intrusion prevention, centralised log monitoring.

By any standard, this is a well-defended home lab. Most people running PHP applications at home have none of this.

---

## Why None of That Was Enough

Here is the uncomfortable truth: **all of those protections operate below Layer 7**.

The CDN and WAF filter known bad actors. The router firewall blocks unexpected ports. VPN gates all administrative access. Intrusion prevention stops brute force. Log monitoring catches anomalous behaviour — after the fact.

But when a legitimate HTTP/HTTPS request carrying a webshell command arrives at port 443, every single one of those controls waves it through. Because to them, it looks exactly like a normal web request.

This is the fundamental nature of application-layer vulnerabilities. You cannot firewall your way out of a PHP2Shell attack. You have to patch it at the application layer itself.

And that is exactly what we had to do.

---

## The Fix — Patching at the Application Layer

### WordPress: Disabling the File Editor

The root problem with WordPress was the built-in **Theme and Plugin File Editor**. By default, any WordPress admin user can open this editor in the dashboard and modify PHP files directly on the server. No FTP, no deployment pipeline, no audit trail. Just a browser and an admin password.

We disabled this across all WordPress instances by injecting two PHP constants into `wp-config.php`:

```php
define('DISALLOW_FILE_EDIT', true);
define('DISALLOW_FILE_MODS', true);
```

- `DISALLOW_FILE_EDIT` — Removes the file editor from the WordPress dashboard entirely. Even if an attacker has admin credentials, there is no editor to abuse.
- `DISALLOW_FILE_MODS` — Goes further. Disables all file modification from the dashboard, including plugin and theme installation. The filesystem becomes read-only from WordPress's perspective.

Because the homelab manages deployments as code, this change was applied consistently across all WordPress instances at once — one of the practical advantages of treating infrastructure as code.

### Other PHP Applications: Pinning Image Tags

For other PHP applications in the cluster, the issue was different but related: some were running on **floating image tags**. Floating tags — things like `latest`, or a major version label without a patch number — mean the container image can silently change on the next pull.

An attacker who compromises a container registry, or who finds a vulnerability in a newer version of an image, could exploit it without you knowing the image had changed underneath you.

We audited all PHP-based deployments and pinned every one to an explicit version tag. If something needs to update, it is a deliberate change in version control — not a silent drift.

---

## The Collateral Damage — Sites That Went Down

This vulnerability did not stay theoretical. During the period when protections were not yet in place, some of the PHP-based sites hosted in the lab experienced availability issues. The combination of unpatched file-write access and an actively probed environment led to instability in certain parts of the cluster.

Some sites were taken offline temporarily. Pods entered crash loops. Databases became inconsistent. It took deliberate remediation — not just configuration fixes, but restarts, database checks, and full configuration review — to bring things back to a stable state.

This is the real cost of an application-layer vulnerability in a multi-tenant environment. One exploited entry point does not just affect one site. When your applications share a cluster, a compromised pod is a risk to every other workload running alongside it.

---

## What We Learned

1. **Defence in depth is necessary but not sufficient.** Having a WAF, VPN, firewalls, and log monitoring is excellent. But if your application has a file-write vulnerability, those layers are bypassed entirely.

2. **Floating image tags are a security risk.** If you do not control exactly what version of an image is running, you do not fully control what code is on your server.

3. **Least privilege applies to applications too.** A CMS should never need to write PHP files at runtime. Disabling that capability removes an entire class of attack.

4. **Multi-tenancy amplifies risk.** In a single-site setup, a compromise is bad. In a shared Kubernetes cluster with multiple workloads, it is potentially catastrophic.

5. **The OSI model is not just for networking.** Think about your security controls at every layer — not just at the firewall.

---

## For Student Readers — The One-Line Summary

A PHP webshell is a tiny script that turns a web server into a remote-controlled computer. WordPress's file editor was the unlocked door. We locked it. But we only had to lock it because someone was already trying the handle.

Always patch the application layer. Firewalls cannot read PHP.

---

*Home Lab — Security Hardening Series*
