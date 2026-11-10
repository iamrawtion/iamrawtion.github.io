# GA4 MCP Server — Design Spec

**Date:** 2026-11-10  
**Author:** Roshan Nagekar  
**Status:** Approved

---

## Goal

Connect Claude Code to the blog's Google Analytics 4 property so analytics questions can be answered in natural language during any Claude Code session — without opening the GA4 dashboard.

---

## Scope

- Install and configure the official `googleanalytics/google-analytics-mcp` server locally on the Mac
- Authenticate using OAuth via Application Default Credentials (ADC)
- Register the server globally in `~/.claude/settings.json` so it is available in all projects
- No changes to the blog repo itself

Out of scope: dashboards, scheduled reports, write access to GA4.

---

## Architecture

```
Claude Code session
      │
      ▼
~/.claude/settings.json  ←  MCP server registration
      │  (spawns on session start)
      ▼
npx @google-analytics/mcp  (official Google MCP server, runs locally)
      │
      ▼  read-only OAuth scope
GA4 Data API
      │
      ▼
GA4 Property: G-0HYR51YD9W  (iamrawtion.github.io)
```

---

## Components

### 1. gcloud CLI
Used once to generate Application Default Credentials via `gcloud auth application-default login`. Credentials are cached at `~/.config/gcloud/application_default_credentials.json` and picked up automatically by the MCP server. No ongoing interaction with gcloud required after initial login.

Install via Homebrew: `brew install --cask google-cloud-sdk`

### 2. Official GA4 MCP Server
Package: `@google-analytics/mcp` (published by Google)  
Invocation: `npx -y @google-analytics/mcp`  
Auth: reads ADC credentials automatically — no key file, no env var for the secret  
Scope: `https://www.googleapis.com/auth/analytics.readonly`

### 3. Claude Code Global Settings
Entry in `~/.claude/settings.json` under `mcpServers`:

```json
{
  "mcpServers": {
    "google-analytics": {
      "command": "npx",
      "args": ["-y", "@google-analytics/mcp"],
      "env": {
        "GA_PROPERTY_ID": "G-0HYR51YD9W"
      }
    }
  }
}
```

---

## Authentication Flow

1. Install gcloud CLI
2. Run: `gcloud auth application-default login`  
   → browser opens, sign in with the Google account that has access to the GA4 property  
   → credentials written to `~/.config/gcloud/application_default_credentials.json`
3. The MCP server reads ADC automatically on every session start — no further auth steps

Credentials do not expire in normal use (ADC uses refresh tokens). Re-auth only needed if credentials are explicitly revoked.

---

## GA4 Property Access

The Google account used for OAuth must have at least **Viewer** role on the GA4 property `G-0HYR51YD9W`. This is configured in GA4 Admin → Property Access Management.

---

## What You Can Ask Claude After Setup

- "Which blog post got the most pageviews this week?"
- "Where is my traffic coming from — search, direct, social?"
- "Show me sessions for the last 30 days"
- "Which posts have the highest bounce rate?"
- "How many unique visitors did I get in October?"
- "Is there a spike in traffic today compared to last week?"

---

## Implementation Steps

1. Install gcloud CLI via Homebrew
2. Run `gcloud auth application-default login` (interactive — Roshan runs this)
3. Update `~/.claude/settings.json` with the MCP server entry
4. Start a new Claude Code session and verify the `google-analytics` MCP server is listed
5. Run a test query to confirm data flows correctly

---

## Risks

| Risk | Mitigation |
|---|---|
| gcloud not in PATH for Claude Code | Set full path to npx in settings if needed |
| Google account lacks GA4 access | Verify Viewer role in GA4 Admin before testing |
| ADC credentials stale after long period | Re-run `gcloud auth application-default login` |
