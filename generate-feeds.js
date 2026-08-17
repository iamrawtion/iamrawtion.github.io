#!/usr/bin/env node
// Run after adding new blogs: node generate-feeds.js
const fs = require('fs');
const { execSync } = require('child_process');
const { marked } = require('marked');

const blogs = JSON.parse(fs.readFileSync('blogs/blogs.json', 'utf8'));
const BASE_URL = 'https://iamrawtion.github.io';
const NOW = new Date().toUTCString();
const TODAY = new Date().toISOString().split('T')[0];

const escape = s => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Schema type overrides: HowTo for step-by-step guides, TechArticle for deep technical posts
const SCHEMA_TYPE_MAP = {
  // HowTo — step-by-step procedural guides
  'install-cobbler-2610-on-ubuntu-1404': 'HowTo',
  'setting-up-your-own-ftp-server-ubuntu': 'HowTo',
  'local-drupal-setup': 'HowTo',
  'build-your-own-private-cloud-with-1': 'HowTo',
  'build-your-own-private-cloud-with-2': 'HowTo',
  'install-patched-ruby-interpreter-with': 'HowTo',
  'one-click-ansible-authorization-for': 'HowTo',
  'easily-scprsync-through-bastion-host-or': 'HowTo',
  'sample-docker-compose-guide': 'HowTo',
  'rhce-preparation': 'HowTo',
  'data-recovery-with-testdisk': 'HowTo',
  // TechArticle — in-depth technical explanations
  'credential-bleed-mcp-server-trust': 'TechArticle',
  'source-build-envoy-proxy-on-ubuntu-1804': 'TechArticle',
  'skenai-devsecops-walkthrough': 'TechArticle',
  'skenais-role-in-devsecops-cicd-pipeline': 'TechArticle',
  'aws-tagger': 'TechArticle',
  'software-configuration-management-system': 'TechArticle',
  'infrastructure-monitoring-with-nagios': 'TechArticle',
  'automation-for-vmware-vcloud-director': 'TechArticle',
  '27': 'TechArticle',
  'integrating-docker-with-chef': 'TechArticle',
  'configuration-management-with-ansible': 'TechArticle',
  'checking-open-ports-on-remote-computer': 'TechArticle',
  'monitoring-in-linuxunix-environment': 'TechArticle',
  'public-private-and-hybrid-cloud': 'TechArticle',
  'hadoop-10': 'TechArticle',
  'creating-exactly-similar-snapshot-of': 'TechArticle',
  's3cmd-to-push-large-files-greater-then': 'TechArticle',
  'devsecops-pune-meetup-1': 'TechArticle',
  'devsecops-pune-meetup-2': 'TechArticle',
  'devsecops-pune-meetup-3': 'TechArticle',
  'devsecops-pune-meetup-4': 'TechArticle',
};

// --- shared nav/head helpers ---
function sharedHead({ title, desc, url, canonical, depth = '' }) {
  return `  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <meta name="language" content="en">
  <meta name="author" content="Roshan Nagekar">
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(desc)}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(desc)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${BASE_URL}/profile.jpg">
  <meta property="og:site_name" content="Roshan Nagekar">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@iamrawtion">
  <meta name="twitter:title" content="${escape(title)}">
  <meta name="twitter:description" content="${escape(desc)}">
  <meta name="twitter:image" content="${BASE_URL}/profile.jpg">
  <link rel="alternate" type="application/rss+xml" title="Roshan Nagekar Blog" href="${BASE_URL}/feed.xml">
  <link rel="search" type="application/opensearchdescription+xml" title="Roshan Nagekar Blog" href="${BASE_URL}/opensearch.xml">
  <link rel="manifest" href="${BASE_URL}/manifest.json">
  <meta name="theme-color" content="#7aa2f7">
  <link rel="stylesheet" href="${depth}styles.css">
  <link rel="preconnect" href="https://cdnjs.cloudflare.com">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></noscript>`;
}

function sharedNav(depth = '') {
  return `  <div class="terminal-nav">
    <div class="container">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <span class="terminal-button close"></span>
          <span class="terminal-button minimize"></span>
          <span class="terminal-button maximize"></span>
        </div>
        <div class="terminal-title">roshan@blog:~$</div>
      </div>
    </div>
  </div>
  <nav class="sidebar-nav">
    <div class="nav-toggle" id="nav-toggle">
      <span></span><span></span><span></span>
    </div>
    <ul class="nav-links" id="nav-links">
      <li><a href="${depth}index.html#home"><i class="fas fa-home"></i> <span>Home</span></a></li>
      <li><a href="${depth}about.html"><i class="fas fa-user"></i> <span>About</span></a></li>
      <li><a href="${depth}index.html#experience"><i class="fas fa-briefcase"></i> <span>Experience</span></a></li>
      <li><a href="${depth}index.html#skills"><i class="fas fa-code"></i> <span>Skills</span></a></li>
      <li><a href="${depth}blog.html"><i class="fas fa-blog"></i> <span>Blog</span></a></li>
      <li><a href="${depth}consulting.html"><i class="fas fa-handshake"></i> <span>Hire Me</span></a></li>
      <li><a href="${depth}index.html#contact"><i class="fas fa-envelope"></i> <span>Contact</span></a></li>
    </ul>
  </nav>`;
}

function sharedNavScript() {
  return `  <script>
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav-links');
    if (toggle) toggle.addEventListener('click', () => nav.classList.toggle('active'));
  </script>`;
}

// Extract H2/H3 headings from rendered HTML for TOC
function extractHeadings(html) {
  const headings = [];
  const re = /<h([23])[^>]*>(.*?)<\/h[23]>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const level = parseInt(m[1]);
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    const id = slugify(text);
    headings.push({ level, text, id });
  }
  return headings;
}

// Add id attributes to H2/H3 tags in rendered HTML
function addHeadingIds(html) {
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h[23]>/gi, (_, level, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    const id = slugify(text);
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });
}

// --- blog post HTML ---
function blogPostHtml(blog, bodyHtml, allBlogs, wordCount = 0, readMinutes = 1, idx = -1) {
  const BASE = BASE_URL;
  const url = `${BASE}/blogs/${blog.id}.html`;
  const desc = blog.excerpt.replace(/"/g, '&quot;').slice(0, 160);
  const tags = (blog.tags || []).join(', ');

  // Prev/next by date (allBlogs sorted newest-first; prev = newer, next = older)
  const prevPost = idx > 0 ? allBlogs[idx - 1] : null;
  const nextPost = idx < allBlogs.length - 1 ? allBlogs[idx + 1] : null;

  const related = allBlogs
    .filter(b => b.id !== blog.id && b.category === blog.category)
    .slice(0, 3);

  const relatedHtml = related.length ? `
  <section style="margin-top:3rem; padding-top:2rem; border-top:1px solid #414868;">
    <h3 style="color:var(--heading-color); margin-bottom:1.25rem; font-size:1.1rem;">Related Posts</h3>
    <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:1rem;">
      ${related.map(r => `
      <a href="../blogs/${r.id}.html" style="display:block; padding:1rem; background:var(--bg-darker); border:1px solid #414868; border-radius:6px; text-decoration:none; transition:border-color 0.2s;">
        <span style="color:var(--accent-color); font-size:0.75rem; font-family:monospace;">${escape(r.category)}</span>
        <p style="color:var(--heading-color); font-size:0.9rem; margin:0.4rem 0 0; line-height:1.4;">${escape(r.title)}</p>
        <p style="color:var(--text-color); font-size:0.78rem; margin-top:0.4rem;">${new Date(r.date).getFullYear()}</p>
      </a>`).join('')}
    </div>
  </section>` : '';

  const prevNextHtml = (prevPost || nextPost) ? `
  <nav aria-label="Post navigation" style="margin-top:3rem; padding-top:2rem; border-top:1px solid #414868; display:flex; justify-content:space-between; gap:1rem; flex-wrap:wrap;">
    ${prevPost ? `<a href="../blogs/${prevPost.id}.html" style="flex:1; min-width:160px; padding:1rem; background:var(--bg-darker); border:1px solid #414868; border-radius:6px; text-decoration:none; display:block;">
      <span style="color:var(--text-color); font-size:0.75rem; opacity:0.7; display:block; margin-bottom:0.3rem;">← Newer</span>
      <span style="color:var(--heading-color); font-size:0.9rem; line-height:1.4;">${escape(prevPost.title)}</span>
    </a>` : '<span style="flex:1;"></span>'}
    ${nextPost ? `<a href="../blogs/${nextPost.id}.html" style="flex:1; min-width:160px; padding:1rem; background:var(--bg-darker); border:1px solid #414868; border-radius:6px; text-decoration:none; display:block; text-align:right;">
      <span style="color:var(--text-color); font-size:0.75rem; opacity:0.7; display:block; margin-bottom:0.3rem;">Older →</span>
      <span style="color:var(--heading-color); font-size:0.9rem; line-height:1.4;">${escape(nextPost.title)}</span>
    </a>` : '<span style="flex:1;"></span>'}
  </nav>` : '';

  const catSlug = slugify(blog.category);
  const breadcrumbJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE + "/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": BASE + "/blog.html" },
      { "@type": "ListItem", "position": 3, "name": blog.category, "item": `${BASE}/categories/${catSlug}.html` },
      { "@type": "ListItem", "position": 4, "name": blog.title, "item": url }
    ]
  });

  const plainText = bodyHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 5000);
  const schemaType = SCHEMA_TYPE_MAP[blog.id] || 'BlogPosting';
  const postJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": schemaType,
    "inLanguage": "en",
    "headline": blog.title,
    "description": blog.excerpt,
    "articleSection": blog.category,
    "image": { "@type": "ImageObject", "url": `${BASE}/profile.jpg`, "width": 1200, "height": 630 },
    "author": { "@type": "Person", "name": "Roshan Nagekar", "url": BASE },
    "datePublished": blog.date,
    "url": url,
    "keywords": tags,
    "wordCount": wordCount,
    "timeRequired": `PT${readMinutes}M`,
    "articleBody": plainText,
    "publisher": { "@type": "Person", "name": "Roshan Nagekar" }
  });

  // TOC: only for posts with 3+ headings
  const headings = extractHeadings(bodyHtml);
  const bodyHtmlWithIds = addHeadingIds(bodyHtml);
  const tocHtml = headings.length >= 3 ? `
    <nav aria-label="Table of contents" style="margin-bottom:2rem; padding:1.25rem 1.5rem; background:var(--bg-darker); border:1px solid #414868; border-radius:6px; font-size:0.9rem;">
      <p style="color:var(--text-color); font-size:0.78rem; font-family:monospace; margin:0 0 0.75rem; opacity:0.7;">TABLE OF CONTENTS</p>
      <ol style="margin:0; padding-left:1.25rem; color:var(--text-color);">
        ${headings.map(h => `<li style="margin-bottom:0.35rem;${h.level === 3 ? ' margin-left:1rem;' : ''}"><a href="#${h.id}" style="color:var(--primary-color); text-decoration:none;">${escape(h.text)}</a></li>`).join('')}
      </ol>
    </nav>` : '';

  const prevLink = prevPost ? `<link rel="prev" href="${BASE}/blogs/${prevPost.id}.html">` : '';
  const nextLink = nextPost ? `<link rel="next" href="${BASE}/blogs/${nextPost.id}.html">` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
  <meta name="language" content="en">
  <title>${escape(blog.title)} | Roshan Nagekar</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="${url}">
  ${prevLink}
  ${nextLink}
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escape(blog.title)}">
  <meta property="og:description" content="${desc}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${BASE}/profile.jpg">
  <meta property="og:site_name" content="Roshan Nagekar">
  <meta property="article:published_time" content="${blog.date}">
  <meta property="article:author" content="Roshan Nagekar">
  <meta property="article:section" content="${escape(blog.category)}">
  ${(blog.tags || []).map(t => `<meta property="article:tag" content="${escape(t)}">`).join('\n  ')}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@iamrawtion">
  <meta name="twitter:title" content="${escape(blog.title)}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="${BASE}/profile.jpg">
  <meta name="twitter:label1" content="Reading time">
  <meta name="twitter:data1" content="${readMinutes} min read">
  <meta name="twitter:label2" content="Category">
  <meta name="twitter:data2" content="${escape(blog.category)}">
  <meta name="author" content="Roshan Nagekar">
  <link rel="alternate" type="application/rss+xml" title="Roshan Nagekar Blog" href="${BASE}/feed.xml">
  <link rel="search" type="application/opensearchdescription+xml" title="Roshan Nagekar Blog" href="${BASE}/opensearch.xml">
  <link rel="manifest" href="${BASE}/manifest.json">
  <meta name="theme-color" content="#7aa2f7">
  <link rel="stylesheet" href="../styles.css">
  <link rel="preconnect" href="https://cdnjs.cloudflare.com">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></noscript>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"></noscript>
  <script type="application/ld+json">${postJsonLd}</script>
  <script type="application/ld+json">${breadcrumbJsonLd}</script>
</head>
<body>
${sharedNav('../')}
  <main class="blog-post-page" style="margin-top:80px; padding: 2rem 0;">
    <div class="container" style="max-width:860px;">
      <nav aria-label="breadcrumb" style="margin-bottom:1.5rem; font-size:0.85rem; color:var(--text-color);">
        <a href="../index.html" style="color:var(--primary-color);">Home</a>
        <span style="margin:0 0.4rem; opacity:0.5;">›</span>
        <a href="../blog.html" style="color:var(--primary-color);">Blog</a>
        <span style="margin:0 0.4rem; opacity:0.5;">›</span>
        <a href="../categories/${catSlug}.html" style="color:var(--primary-color);">${escape(blog.category)}</a>
        <span style="margin:0 0.4rem; opacity:0.5;">›</span>
        <span style="color:var(--text-color);">${escape(blog.title)}</span>
      </nav>
      <article>
        <header style="margin-bottom:2rem;">
          <div style="margin-bottom:0.75rem;">
            <a href="../categories/${catSlug}.html" style="color:var(--accent-color); font-size:0.85rem; font-family:monospace; text-decoration:none;">${escape(blog.category)}</a>
            ${(blog.tags || []).map(t => `<a href="../tags/${slugify(t)}.html" class="tag" style="margin-left:0.4rem; text-decoration:none;">${escape(t)}</a>`).join('')}
          </div>
          <h1 style="color:var(--heading-color); font-size:2rem; line-height:1.3; margin-bottom:0.75rem;">${escape(blog.title)}</h1>
          <p style="color:var(--text-color); font-size:0.9rem;">
            <i class="fas fa-calendar" style="color:var(--primary-color);"></i>
            <time datetime="${blog.date}">${new Date(blog.date).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}</time>
            &nbsp;·&nbsp;
            <i class="fas fa-user" style="color:var(--primary-color);"></i>
            Roshan Nagekar
            &nbsp;·&nbsp;
            <i class="fas fa-clock" style="color:var(--primary-color);"></i>
            ${readMinutes} min read
          </p>
        </header>
        ${tocHtml}
        <div class="blog-post-content markdown-body">
          ${bodyHtmlWithIds}
        </div>
        ${relatedHtml}
        ${prevNextHtml}
        <footer style="margin-top:3rem; padding-top:2rem; border-top:1px solid #414868;">
          <p style="color:var(--text-color); margin-bottom:1rem;">
            Found this useful?
            <a href="https://twitter.com/iamrawtion" target="_blank" style="color:var(--primary-color);">Share on Twitter</a>
            &nbsp;·&nbsp;
            <a href="../consulting.html" style="color:var(--primary-color);">Hire me for consulting</a>
            &nbsp;·&nbsp;
            <a href="../blog.html" style="color:var(--primary-color);">All posts</a>
          </p>
          <p style="color:var(--text-color); font-size:0.85rem;">
            <a href="../index.html" style="color:var(--primary-color);">Home</a> ·
            <a href="../index.html#experience" style="color:var(--primary-color);">Experience</a> ·
            <a href="../index.html#skills" style="color:var(--primary-color);">Skills</a> ·
            <a href="../consulting.html" style="color:var(--primary-color);">Consulting</a> ·
            <a href="../blog.html" style="color:var(--primary-color);">Blog</a> ·
            <a href="../index.html#contact" style="color:var(--primary-color);">Contact</a>
          </p>
        </footer>
      </article>
    </div>
  </main>
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
${sharedNavScript()}
</body>
</html>`;
}

// --- category landing page HTML ---
function categoryPageHtml(category, posts) {
  const slug = slugify(category);
  const url = `${BASE_URL}/categories/${slug}.html`;
  const desc = `${posts.length} posts on ${category} by Roshan Nagekar — senior DevOps consultant with 15+ years of experience.`;

  const collectionJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "inLanguage": "en",
    "name": `${category} — Roshan Nagekar`,
    "description": desc,
    "url": url,
    "author": { "@type": "Person", "name": "Roshan Nagekar", "url": BASE_URL },
    "hasPart": posts.map(b => ({
      "@type": "BlogPosting",
      "headline": b.title,
      "url": `${BASE_URL}/blogs/${b.id}.html`,
      "datePublished": b.date
    }))
  });

  const breadcrumbJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL + "/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": BASE_URL + "/blog.html" },
      { "@type": "ListItem", "position": 3, "name": category, "item": url }
    ]
  });

  const postCards = posts.map(b => `
    <article style="padding:1.25rem; background:var(--bg-darker); border:1px solid #414868; border-radius:6px; margin-bottom:1rem;">
      <a href="../blogs/${b.id}.html" style="text-decoration:none;">
        <h2 style="color:var(--heading-color); font-size:1.1rem; margin:0 0 0.5rem; line-height:1.4;">${escape(b.title)}</h2>
      </a>
      <p style="color:var(--text-color); font-size:0.88rem; margin:0 0 0.75rem;">${escape(b.excerpt.slice(0, 140))}…</p>
      <div style="display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap;">
        <time datetime="${b.date}" style="color:var(--text-color); font-size:0.8rem; opacity:0.7;">${new Date(b.date).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' })}</time>
        ${(b.tags || []).slice(0, 3).map(t => `<a href="../tags/${slugify(t)}.html" class="tag" style="font-size:0.75rem; text-decoration:none;">${escape(t)}</a>`).join('')}
      </div>
    </article>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
${sharedHead({ title: `${category} Posts | Roshan Nagekar`, desc, url, depth: '../' })}
  <script type="application/ld+json">${collectionJsonLd}</script>
  <script type="application/ld+json">${breadcrumbJsonLd}</script>
</head>
<body>
${sharedNav('../')}
  <main style="margin-top:80px; padding:2rem 0;">
    <div class="container" style="max-width:860px;">
      <nav aria-label="breadcrumb" style="margin-bottom:1.5rem; font-size:0.85rem; color:var(--text-color);">
        <a href="../index.html" style="color:var(--primary-color);">Home</a>
        <span style="margin:0 0.4rem; opacity:0.5;">›</span>
        <a href="../blog.html" style="color:var(--primary-color);">Blog</a>
        <span style="margin:0 0.4rem; opacity:0.5;">›</span>
        <span style="color:var(--text-color);">${escape(category)}</span>
      </nav>
      <header style="margin-bottom:2rem;">
        <h1 style="color:var(--heading-color); font-size:1.8rem;">${escape(category)}</h1>
        <p style="color:var(--text-color); font-size:0.95rem;">${posts.length} post${posts.length !== 1 ? 's' : ''} · <a href="../blog.html" style="color:var(--primary-color);">All categories</a></p>
      </header>
      ${postCards}
    </div>
  </main>
${sharedNavScript()}
</body>
</html>`;
}

// --- tag landing page HTML ---
function tagPageHtml(tag, posts) {
  const slug = slugify(tag);
  const url = `${BASE_URL}/tags/${slug}.html`;
  const desc = `${posts.length} posts tagged "${tag}" by Roshan Nagekar — DevOps consultant covering Kubernetes, Docker, CI/CD, cloud, and security.`;

  const collectionJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "inLanguage": "en",
    "name": `${tag} — Roshan Nagekar`,
    "description": desc,
    "url": url,
    "author": { "@type": "Person", "name": "Roshan Nagekar", "url": BASE_URL },
    "hasPart": posts.map(b => ({
      "@type": "BlogPosting",
      "headline": b.title,
      "url": `${BASE_URL}/blogs/${b.id}.html`,
      "datePublished": b.date
    }))
  });

  const breadcrumbJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL + "/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": BASE_URL + "/blog.html" },
      { "@type": "ListItem", "position": 3, "name": tag, "item": url }
    ]
  });

  const postCards = posts.map(b => `
    <article style="padding:1.25rem; background:var(--bg-darker); border:1px solid #414868; border-radius:6px; margin-bottom:1rem;">
      <a href="../blogs/${b.id}.html" style="text-decoration:none;">
        <h2 style="color:var(--heading-color); font-size:1.1rem; margin:0 0 0.5rem; line-height:1.4;">${escape(b.title)}</h2>
      </a>
      <p style="color:var(--text-color); font-size:0.88rem; margin:0 0 0.75rem;">${escape(b.excerpt.slice(0, 140))}…</p>
      <div style="display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap;">
        <time datetime="${b.date}" style="color:var(--text-color); font-size:0.8rem; opacity:0.7;">${new Date(b.date).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' })}</time>
        <a href="../categories/${slugify(b.category)}.html" style="color:var(--accent-color); font-size:0.78rem; font-family:monospace; text-decoration:none;">${escape(b.category)}</a>
      </div>
    </article>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
${sharedHead({ title: `${tag} Posts | Roshan Nagekar`, desc, url, depth: '../' })}
  <script type="application/ld+json">${collectionJsonLd}</script>
  <script type="application/ld+json">${breadcrumbJsonLd}</script>
</head>
<body>
${sharedNav('../')}
  <main style="margin-top:80px; padding:2rem 0;">
    <div class="container" style="max-width:860px;">
      <nav aria-label="breadcrumb" style="margin-bottom:1.5rem; font-size:0.85rem; color:var(--text-color);">
        <a href="../index.html" style="color:var(--primary-color);">Home</a>
        <span style="margin:0 0.4rem; opacity:0.5;">›</span>
        <a href="../blog.html" style="color:var(--primary-color);">Blog</a>
        <span style="margin:0 0.4rem; opacity:0.5;">›</span>
        <span style="color:var(--text-color);">${escape(tag)}</span>
      </nav>
      <header style="margin-bottom:2rem;">
        <h1 style="color:var(--heading-color); font-size:1.8rem;">${escape(tag)}</h1>
        <p style="color:var(--text-color); font-size:0.95rem;">${posts.length} post${posts.length !== 1 ? 's' : ''} · <a href="../blog.html" style="color:var(--primary-color);">All posts</a></p>
      </header>
      ${postCards}
    </div>
  </main>
${sharedNavScript()}
</body>
</html>`;
}

// --- 404 page HTML ---
function notFoundPageHtml(recentPosts) {
  const url = `${BASE_URL}/404.html`;
  const webPageJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Page Not Found | Roshan Nagekar",
    "url": url,
    "description": "The page you were looking for doesn't exist. Find DevOps and security content by Roshan Nagekar here."
  });

  const postLinks = recentPosts.map(b => `
    <a href="blogs/${b.id}.html" style="display:block; padding:0.75rem 1rem; background:var(--bg-darker); border:1px solid #414868; border-radius:6px; text-decoration:none; margin-bottom:0.5rem;">
      <span style="color:var(--accent-color); font-size:0.75rem; font-family:monospace;">${escape(b.category)}</span>
      <p style="color:var(--heading-color); font-size:0.95rem; margin:0.25rem 0 0;">${escape(b.title)}</p>
    </a>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
${sharedHead({ title: 'Page Not Found | Roshan Nagekar', desc: "The page you were looking for doesn't exist. Browse DevOps, Kubernetes, and cloud security posts by Roshan Nagekar.", url, depth: '' })}
  <script type="application/ld+json">${webPageJsonLd}</script>
</head>
<body>
${sharedNav('')}
  <main style="margin-top:80px; padding:4rem 0; text-align:center;">
    <div class="container" style="max-width:640px;">
      <p style="color:var(--accent-color); font-family:monospace; font-size:1rem; margin-bottom:0.5rem;">404</p>
      <h1 style="color:var(--heading-color); font-size:2rem; margin-bottom:1rem;">Page not found</h1>
      <p style="color:var(--text-color); margin-bottom:2.5rem;">The page you were looking for doesn't exist or may have moved. Try one of these instead:</p>

      <div style="text-align:left; margin-bottom:2rem;">
        <h2 style="color:var(--heading-color); font-size:1rem; margin-bottom:1rem;">Recent posts</h2>
        ${postLinks}
      </div>

      <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; margin-bottom:2rem;">
        <a href="blog.html" style="color:var(--primary-color); font-weight:600;">All blog posts →</a>
        <a href="consulting.html" style="color:var(--primary-color); font-weight:600;">Hire me for consulting →</a>
        <a href="index.html" style="color:var(--primary-color); font-weight:600;">Go home →</a>
      </div>
    </div>
  </main>
${sharedNavScript()}
</body>
</html>`;
}

// ============================================================
// sitemap entries — build progressively
// ============================================================
const staticPages = [
  { url: `${BASE_URL}/`, lastmod: TODAY, priority: '1.0' },
  { url: `${BASE_URL}/about.html`, lastmod: TODAY, priority: '0.9' },
  { url: `${BASE_URL}/blog.html`, lastmod: TODAY, priority: '0.9' },
  { url: `${BASE_URL}/consulting.html`, lastmod: TODAY, priority: '0.9' },
];

function gitLastmod(filePath) {
  try {
    const out = execSync(`git log --format="%ai" -1 -- "${filePath}"`, { encoding: 'utf8' }).trim();
    if (out) return out.slice(0, 10);
  } catch (_) {}
  return TODAY;
}

const blogSitemapEntries = blogs.map(b => ({
  url: `${BASE_URL}/blogs/${b.id}.html`,
  lastmod: gitLastmod(`blogs/${b.file}`),
  priority: '0.8'
}));

// ============================================================
// feed.xml
// ============================================================
const items = blogs.map(b => {
  const url = `${BASE_URL}/blogs/${b.id}.html`;
  const pubDate = new Date(b.date).toUTCString();
  const categories = b.tags.map(t => `    <category>${escape(t)}</category>`).join('\n');
  const mdPath = `blogs/${b.file}`;
  let cdataContent = '';
  if (fs.existsSync(mdPath)) {
    const raw = fs.readFileSync(mdPath, 'utf8');
    const body = raw
      .replace(/^---[\s\S]*?---\n/, '')
      .replace(/^(Some rights reserved|image credits?)[^\n]*\n?/gim, '');
    cdataContent = `\n    <content:encoded><![CDATA[${marked(body)}]]></content:encoded>`;
  }
  return `  <item>
    <title>${escape(b.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <pubDate>${pubDate}</pubDate>
    <description>${escape(b.excerpt)}</description>
    <author>iamrawtion@gmail.com (Roshan Nagekar)</author>
${categories}${cdataContent}
  </item>`;
}).join('\n');

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Roshan Nagekar — DevOps &amp; Security Blog</title>
    <link>${BASE_URL}/blog.html</link>
    <description>Technical insights on DevOps, Cloud Infrastructure, and Security</description>
    <language>en-us</language>
    <managingEditor>iamrawtion@gmail.com (Roshan Nagekar)</managingEditor>
    <webMaster>iamrawtion@gmail.com (Roshan Nagekar)</webMaster>
    <lastBuildDate>${NOW}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

fs.writeFileSync('feed.xml', feed);
console.log(`✅ feed.xml — ${blogs.length} items`);

// ============================================================
// static blog HTML pages
// ============================================================
let generated = 0;
for (let i = 0; i < blogs.length; i++) {
  const blog = blogs[i];
  const mdPath = `blogs/${blog.file}`;
  if (!fs.existsSync(mdPath)) {
    console.warn(`⚠️  skipping ${blog.id} — ${mdPath} not found`);
    continue;
  }
  const raw = fs.readFileSync(mdPath, 'utf8');
  const bodyRaw = raw.replace(/^---[\s\S]*?---\n/, '');
  // Strip image credit lines ("Some rights reserved by X", "image credits: X", etc.)
  const body = bodyRaw.replace(/^(Some rights reserved|image credits?)[^\n]*\n?/gim, '');
  const wordCount = body.split(/\s+/).filter(Boolean).length;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 200));
  const bodyHtml = marked(body);
  const html = blogPostHtml(blog, bodyHtml, blogs, wordCount, readMinutes, i);
  fs.writeFileSync(`blogs/${blog.id}.html`, html);
  generated++;
}
console.log(`✅ static blog pages — ${generated} HTML files written to blogs/`);

// ============================================================
// category pages
// ============================================================
if (!fs.existsSync('categories')) fs.mkdirSync('categories');
const categories = {};
for (const b of blogs) {
  if (!categories[b.category]) categories[b.category] = [];
  categories[b.category].push(b);
}
const categorySitemapEntries = [];
for (const [cat, posts] of Object.entries(categories)) {
  const slug = slugify(cat);
  fs.writeFileSync(`categories/${slug}.html`, categoryPageHtml(cat, posts));
  categorySitemapEntries.push({ url: `${BASE_URL}/categories/${slug}.html`, lastmod: TODAY, priority: '0.7' });
}
console.log(`✅ category pages — ${Object.keys(categories).length} pages written to categories/`);

// ============================================================
// tag pages
// ============================================================
if (!fs.existsSync('tags')) fs.mkdirSync('tags');
const tagMap = {};
for (const b of blogs) {
  for (const t of (b.tags || [])) {
    if (!tagMap[t]) tagMap[t] = [];
    tagMap[t].push(b);
  }
}
const tagSitemapEntries = [];
for (const [tag, posts] of Object.entries(tagMap)) {
  const slug = slugify(tag);
  fs.writeFileSync(`tags/${slug}.html`, tagPageHtml(tag, posts));
  tagSitemapEntries.push({ url: `${BASE_URL}/tags/${slug}.html`, lastmod: TODAY, priority: '0.6' });
}
console.log(`✅ tag pages — ${Object.keys(tagMap).length} pages written to tags/`);

// ============================================================
// 404 page
// ============================================================
const recentPosts = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
fs.writeFileSync('404.html', notFoundPageHtml(recentPosts));
console.log(`✅ 404.html — generated with ${recentPosts.length} recent posts`);

// ============================================================
// sitemap.xml — all pages
// ============================================================
const changefreqMap = { '1.0': 'weekly', '0.9': 'weekly', '0.8': 'monthly', '0.7': 'weekly', '0.6': 'monthly' };
const allSitemapEntries = [...staticPages, ...blogSitemapEntries, ...categorySitemapEntries, ...tagSitemapEntries];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allSitemapEntries.map(e => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${changefreqMap[e.priority] || 'monthly'}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemap);
console.log(`✅ sitemap.xml — ${allSitemapEntries.length} URLs`);

// ============================================================
// blog.html: inject ItemList JSON-LD
// ============================================================
const itemListJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "DevOps & Security Blog by Roshan Nagekar",
  "description": "Technical posts on DevOps, Kubernetes, cloud infrastructure, DevSecOps, CI/CD, and security.",
  "url": `${BASE_URL}/blog.html`,
  "itemListElement": blogs.map((b, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": b.title,
    "url": `${BASE_URL}/blogs/${b.id}.html`
  }))
});
let blogHtml = fs.readFileSync('blog.html', 'utf8');
blogHtml = blogHtml.replace(/<!--BLOG_ITEMLIST_JSONLD-->|(\{"@context":"https:\/\/schema\.org","@type":"ItemList"[\s\S]*?\})/, itemListJsonLd);
fs.writeFileSync('blog.html', blogHtml);
console.log(`✅ blog.html — ItemList JSON-LD injected (${blogs.length} entries)`);

// ============================================================
// index.html: inject recent posts widget + WebSite schema
// ============================================================
const recentPostsHtml = `<!-- RECENT_POSTS_START -->
    <section style="padding:4rem 0; background:var(--bg-darker);">
      <div class="container">
        <h2 class="section-title" style="text-align:center; margin-bottom:2rem;">Recent Posts</h2>
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:1.5rem; max-width:960px; margin:0 auto;">
          ${recentPosts.slice(0, 3).map(b => `<a href="blogs/${b.id}.html" style="display:block; padding:1.5rem; background:var(--bg-color); border:1px solid #414868; border-radius:8px; text-decoration:none; transition:border-color 0.2s;">
            <span style="color:var(--accent-color); font-size:0.78rem; font-family:monospace;">${escape(b.category)}</span>
            <h3 style="color:var(--heading-color); font-size:1rem; margin:0.5rem 0; line-height:1.4;">${escape(b.title)}</h3>
            <p style="color:var(--text-color); font-size:0.85rem; margin:0 0 0.75rem; line-height:1.5;">${escape(b.excerpt.slice(0, 100))}…</p>
            <span style="color:var(--primary-color); font-size:0.82rem;">${new Date(b.date).toLocaleDateString('en-US', { year:'numeric', month:'short' })}</span>
          </a>`).join('')}
        </div>
        <p style="text-align:center; margin-top:2rem;"><a href="blog.html" style="color:var(--primary-color); font-weight:600;">View all ${blogs.length} posts →</a></p>
        <div style="text-align:center; margin-top:1.25rem; display:flex; flex-wrap:wrap; gap:0.5rem; justify-content:center;">
          <span style="color:var(--text-color); font-size:0.85rem; opacity:0.7;">Browse by topic:</span>
          ${Object.keys(categories).map(cat => `<a href="categories/${slugify(cat)}.html" style="color:var(--primary-color); font-size:0.85rem; font-weight:500;">${escape(cat)}</a>`).join('<span style="color:var(--text-color); opacity:0.4; font-size:0.85rem;">·</span>')}
        </div>
      </div>
    </section>
    <!-- RECENT_POSTS_END -->`;

let indexHtml = fs.readFileSync('index.html', 'utf8');
// Replace between markers on subsequent runs, or inject before footer on first run
if (indexHtml.includes('<!-- RECENT_POSTS_START -->')) {
  indexHtml = indexHtml.replace(/<!-- RECENT_POSTS_START -->[\s\S]*?<!-- RECENT_POSTS_END -->/, recentPostsHtml);
} else {
  indexHtml = indexHtml.replace('    <!-- Footer -->', `${recentPostsHtml}\n\n    <!-- Footer -->`);
}

// Inject WebSite JSON-LD with SearchAction if not already present
if (!indexHtml.includes('"@type":"WebSite"')) {
  const websiteJsonLd = `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Roshan Nagekar",
    "url": BASE_URL,
    "description": "DevOps Consultant & Trainer — Remote. 15+ years experience in Kubernetes, CI/CD, cloud, and DevSecOps.",
    "author": { "@type": "Person", "name": "Roshan Nagekar" },
    "potentialAction": {
      "@type": "SearchAction",
      "target": { "@type": "EntryPoint", "urlTemplate": `${BASE_URL}/blog.html?q={search_term_string}` },
      "query-input": "required name=search_term_string"
    }
  })}</script>`;
  indexHtml = indexHtml.replace('</head>', `  ${websiteJsonLd}\n</head>`);
}

// Inject ContactPoint JSON-LD if not already present
if (!indexHtml.includes('"@type":"ContactPoint"')) {
  const contactJsonLd = `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Roshan Nagekar",
    "url": BASE_URL,
    "email": "roshan4074@gmail.com",
    "telephone": "+91-9011092618",
    "jobTitle": "DevOps Consultant & Trainer",
    "worksFor": { "@type": "Organization", "name": "Freelance / Independent" },
    "address": { "@type": "PostalAddress", "addressLocality": "Pune", "addressRegion": "Maharashtra", "addressCountry": "IN" },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "consulting",
      "email": "roshan4074@gmail.com",
      "telephone": "+91-9011092618",
      "availableLanguage": "en",
      "areaServed": "Worldwide"
    }
  })}</script>`;
  indexHtml = indexHtml.replace('</head>', `  ${contactJsonLd}\n</head>`);
}

// Update robots meta to include max-snippet on index.html
indexHtml = indexHtml.replace(
  '<meta name="robots" content="index, follow">',
  '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">'
);

fs.writeFileSync('index.html', indexHtml);
console.log(`✅ index.html — recent posts widget + WebSite JSON-LD injected`);
