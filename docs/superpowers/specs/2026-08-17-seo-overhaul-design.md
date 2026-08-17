# SEO Overhaul Design Spec

## Goal

Make `iamrawtion.github.io` discoverable by Google for recruiters searching for remote DevOps consultants and trainers, without spending money on ads or external SaaS services.

## Problem Statement

The site is currently invisible to Google:
- All 65 blog posts are rendered via JavaScript at `blog.html?post=slug` — Google cannot reliably index JS-rendered, query-parameter URLs
- The homepage meta tags are generic and don't match recruiter search queries
- No dedicated page targets hiring/consulting keywords
- `site:iamrawtion.github.io` returns zero results — the site is not indexed

## Solution

### Part A — Pre-render Blog Posts as Static HTML

Extend `generate-feeds.js` to generate a static `.html` file per blog post at `blogs/<slug>.html`. Each file:
- Has its own `<title>`, `<meta description>`, Open Graph and Twitter Card tags
- Contains fully rendered HTML of the post body (markdown converted at build time using `marked`)
- Includes JSON-LD `BlogPosting` structured data
- Links back to `blog.html` listing page
- Preserves the existing terminal nav/sidebar aesthetic
- `blog.html?post=slug` redirects to `blogs/<slug>.html` so no existing links break

The sitemap and RSS feed point to `blogs/<slug>.html` instead of `blog.html?post=slug`.

### Part B — Hire/Consulting Landing Page + Homepage Meta Improvements

1. **New `consulting.html`** — keyword-rich page targeting:
   - "DevOps consultant for hire", "remote DevOps trainer", "DevSecOps consultant remote", "Kubernetes infrastructure consultant", "cloud infrastructure consultant 15 years"
   - Sections: services offered, credentials, testimonials/logos, clear CTA
   - JSON-LD `Person` + `Service` structured data
   - Full Open Graph and Twitter Card tags

2. **Update `index.html` meta tags**:
   - Title: `Roshan Nagekar | DevOps Consultant & Trainer — Remote, 15+ Years`
   - Description: `Hire Roshan Nagekar — senior DevOps & DevSecOps consultant with 15+ years. Remote training, infrastructure strategy, Kubernetes, CI/CD, cloud. Available for consulting.`
   - JSON-LD `Person` schema with `jobTitle`, `knowsAbout`, `hasOccupation`, `availableForHire`

### Build Workflow

`node generate-feeds.js` handles everything: static blog HTML + sitemap + RSS feed. Run once after adding any new post.

## Success Criteria

- `site:iamrawtion.github.io` returns 65+ indexed pages
- Each blog post has a unique title and meta description in Google search results
- `consulting.html` appears for recruiter keyword searches within 2-4 weeks of indexing
- Homepage appears for "Roshan Nagekar DevOps consultant" searches

## Constraints

- No external SaaS services
- No framework migration — keep vanilla HTML/CSS/JS
- Preserve existing terminal aesthetic on all new pages
- Single build command: `node generate-feeds.js`
