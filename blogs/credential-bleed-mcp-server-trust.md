---
title: "Credential bleed: what happens when your MCP server trusts the wrong thing"
date: "2026-07-26"
category: "Security"
tags: ["MCP", "AI Agents", "Security", "Terraform", "MySQL", "DevSecOps"]
excerpt: "I set up a MySQL MCP server on port 9100 using FastMCP and immediately noticed a problem — the server doesn't inherently know the difference between an agent I authorized and one that just happened to find my endpoint."
author: "Roshan Nagekar"
---

## Overview

I set up a MySQL MCP server on port 9100 using FastMCP, exposing database tools to any connecting agent. It worked. And then I started thinking about what "worked" actually meant.

The server doesn't inherently know the difference between an agent I authorized and one that happened to find my endpoint. That's the problem.

## The Core Security Problem

MCP servers sit between agents and real systems. They translate natural language intent into actual actions — database queries, Terraform applies, file writes. To do that, they need credentials. Those credentials have to live somewhere inside this translation layer.

The vulnerability: most MCP deployments trust the connection, not the identity. Anything that connects gets access to the tools. That's credential bleed by default.

## A Real Example

I documented this in a Terraform agent demo. An ambiguous prompt walked straight through `terraform_plan` into `terraform_apply` and created a real S3 bucket in AWS. The boundary that was supposed to prevent unintended execution didn't exist. The agent had the tools, the credentials were available, and nothing required it to stop and verify intent.

The server did exactly what it was configured to do. That was the problem.

## Why This Gets Worse at Scale

A barely-used vulnerable server is one thing. An MCP server routing enterprise traffic — with credentials scoped to production databases, cloud accounts, or internal APIs — is another.

As MCP adoption grows and teams expose more tools, the attack surface doesn't just expand linearly. Every new tool added to an unauthenticated server is another action an unauthorized agent can take.

## What to Do Instead

Connection should not equal identity. These aren't optional hardening steps — they're the baseline:

- **Ephemeral credentials** — don't store long-lived secrets in the MCP layer; issue scoped, short-lived tokens per session
- **Scoped tools** — not every agent needs every tool; expose only what's required for the task
- **Intent validation before execution** — for destructive or irreversible actions, require explicit confirmation before the tool runs

These shouldn't be afterthoughts bolted on after the demo works. They should be part of the design from the start.

## The Question to Ask

Stop asking "does it work?" and start asking "what does this server trust, exactly?"

If the answer is "whatever connected to it" — you have a credential bleed problem, whether you've noticed it yet or not.

## Detecting Credential Bleed in Practice

The gap between "it works" and "it's secure" is usually visible if you actually look. Here's how I audit an MCP deployment:

**Start with what's exposed.** List every tool registered on the server. Ask: does each tool need to be there? An agent doing read-only reporting doesn't need a `terraform_apply` tool available. If it's registered, it can be called.

**Check what credentials each tool uses.** Are they shared across tools, or scoped per tool? A single long-lived AWS key shared across a database tool, a file tool, and an infrastructure tool is a single point of compromise. One tool getting called in the wrong context drags all three credential sets with it.

**Look for an authentication layer.** Is there any token, header validation, mTLS, or API key check before the MCP handshake completes? If the answer is "the server is only accessible from our internal network," that's network-layer access control — it's not identity. An attacker already inside your network, or any compromised internal service, still gets full access.

**Checklist for auditing an MCP deployment:**

- [ ] Is there an authentication mechanism at the MCP server level (not just network firewall)?
- [ ] Are tools scoped by caller identity, or does every connected agent get every tool?
- [ ] Are credentials stored as long-lived secrets in the server environment, or issued ephemerally per session?
- [ ] Are destructive tools (deletes, applies, writes) gated behind explicit intent confirmation?
- [ ] Is there an audit log of which agent called which tool with which arguments?
- [ ] Are unused or experimental tools removed from production deployments?
- [ ] Is the MCP server process running with least-privilege OS permissions?
- [ ] Have you tested what happens when an unexpected client connects to the server port?

The [OWASP API Security Top 10](https://owasp.org/API-Security/editions/2023/en/0x11-t10/) covers broken authentication as a top-tier API risk for exactly this reason. MCP servers are, at their core, APIs. The same failure modes apply.

## Network-Level Controls Aren't Enough

The instinct I see most often is to firewall the MCP port and call it done. Bind to `127.0.0.1`, restrict to a specific CIDR, put it behind a VPN. These are useful controls. They're not sufficient.

Here's why: the credential bleed problem is at the application layer, not the network layer. If your MCP server trusts any connection it receives, then anyone or anything that can reach the port — which includes every other process on the same host, every service in the same VPC, every compromised container in the same cluster — gets access to every tool.

In a microservices environment, "internal network" means hundreds of services that can all reach each other. Lateral movement from a compromised service to your MCP server is a one-hop attack.

The principle of least privilege has to apply to the application layer too: each caller should get exactly the access it needs to do its job, nothing more. This means identity-aware access control at the MCP layer itself, not just a network perimeter around it.

[NIST SP 800-207 Zero Trust Architecture](https://csrc.nist.gov/publications/detail/sp/800-207/final) makes this explicit — trust is never implicit based on network location alone. Every access request should be authenticated and authorized regardless of where it originates. MCP deployments that treat internal network access as implicit trust are building exactly the kind of perimeter-dependent architecture that zero trust is meant to replace.

Concretely: even if you can't add full authentication to your MCP server today, you can move toward it incrementally. Start by logging every tool call with the source. Add a shared secret header check. Then move to per-session tokens. The goal is to make "what connected" less important than "who is this and what are they allowed to do."

## A Practical Hardening Checklist

Use this when standing up a new MCP server or reviewing an existing one:

- [ ] **Network binding**: Bind to `127.0.0.1` or a specific internal interface, never `0.0.0.0` unless you have a strong reason and compensating controls
- [ ] **Authentication**: Require a token, API key, or mTLS certificate before the MCP session is established — connection alone is not identity
- [ ] **Scoped credentials**: Use separate credentials per tool category; don't share one AWS key across infrastructure, database, and file tools
- [ ] **Audit logging**: Log every tool invocation with timestamp, caller identifier, tool name, and arguments — make this tamper-evident
- [ ] **Tool whitelisting per caller**: If your MCP framework supports it, restrict which tools each agent identity can call
- [ ] **Intent confirmation for destructive operations**: `terraform_apply`, `DELETE` queries, file overwrites — require an explicit confirmation step before execution, not just a plan
- [ ] **Credential rotation**: Treat MCP server credentials like any other secret; rotate them on a schedule and on suspected compromise
- [ ] **Monitoring and alerting**: Alert on unusual tool call patterns — high volume, off-hours calls, calls to tools that are rarely used
- [ ] **Minimal tool surface**: Remove tools from production that aren't needed; every registered tool is an available attack surface
- [ ] **Dependency review**: Audit the libraries your MCP server uses; a supply-chain compromise in a FastMCP dependency is a compromise of everything the server can reach

None of this is exotic. It's the same security hygiene you'd apply to any internal API. The difference is that MCP servers tend to be stood up fast, in demo mode, and left running. That's how credential bleed becomes a production incident.
