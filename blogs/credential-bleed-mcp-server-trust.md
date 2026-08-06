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
