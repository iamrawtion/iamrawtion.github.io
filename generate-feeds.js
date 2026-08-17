#!/usr/bin/env node
// Run after adding new blogs: node generate-feeds.js
const fs = require('fs');
const { marked } = require('marked');

const blogs = JSON.parse(fs.readFileSync('blogs/blogs.json', 'utf8'));
const BASE_URL = 'https://iamrawtion.github.io';
const NOW = new Date().toUTCString();

const escape = s => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

function blogPostHtml(blog, bodyHtml) {
  const BASE = 'https://iamrawtion.github.io';
  const url = `${BASE}/blogs/${blog.id}.html`;
  const desc = blog.excerpt.replace(/"/g, '&quot;').slice(0, 160);
  const tags = (blog.tags || []).join(', ');
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt,
    "author": { "@type": "Person", "name": "Roshan Nagekar", "url": BASE },
    "datePublished": blog.date,
    "url": url,
    "keywords": tags,
    "publisher": { "@type": "Person", "name": "Roshan Nagekar" }
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escape(blog.title)} | Roshan Nagekar</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escape(blog.title)}">
  <meta property="og:description" content="${desc}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${BASE}/profile.jpg">
  <meta property="og:site_name" content="Roshan Nagekar">
  <meta property="article:published_time" content="${blog.date}">
  <meta property="article:author" content="Roshan Nagekar">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@iamrawtion">
  <meta name="twitter:title" content="${escape(blog.title)}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="${BASE}/profile.jpg">
  <link rel="alternate" type="application/rss+xml" title="Roshan Nagekar Blog" href="${BASE}/feed.xml">
  <link rel="stylesheet" href="../styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
  <script type="application/ld+json">${jsonLd}</script>
</head>
<body>
  <div class="terminal-nav">
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
      <li><a href="../index.html#home"><i class="fas fa-home"></i> <span>Home</span></a></li>
      <li><a href="../index.html#about"><i class="fas fa-user"></i> <span>About</span></a></li>
      <li><a href="../index.html#experience"><i class="fas fa-briefcase"></i> <span>Experience</span></a></li>
      <li><a href="../index.html#skills"><i class="fas fa-code"></i> <span>Skills</span></a></li>
      <li><a href="../blog.html"><i class="fas fa-blog"></i> <span>Blog</span></a></li>
      <li><a href="../consulting.html"><i class="fas fa-handshake"></i> <span>Hire Me</span></a></li>
      <li><a href="../index.html#contact"><i class="fas fa-envelope"></i> <span>Contact</span></a></li>
    </ul>
  </nav>
  <main class="blog-post-page" style="margin-top:80px; padding: 2rem 0;">
    <div class="container" style="max-width:860px;">
      <nav class="breadcrumb" style="margin-bottom:1.5rem; font-size:0.9rem;">
        <a href="../blog.html" style="color:var(--primary-color);">← All Posts</a>
      </nav>
      <article>
        <header style="margin-bottom:2rem;">
          <div style="margin-bottom:0.75rem;">
            <span style="color:var(--accent-color); font-size:0.85rem; font-family:monospace;">${escape(blog.category)}</span>
            ${(blog.tags || []).map(t => `<span class="tag" style="margin-left:0.4rem;">${escape(t)}</span>`).join('')}
          </div>
          <h1 style="color:var(--heading-color); font-size:2rem; line-height:1.3; margin-bottom:0.75rem;">${escape(blog.title)}</h1>
          <p style="color:var(--text-color); font-size:0.9rem;">
            <i class="fas fa-calendar" style="color:var(--primary-color);"></i>
            ${new Date(blog.date).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}
            &nbsp;·&nbsp;
            <i class="fas fa-user" style="color:var(--primary-color);"></i>
            Roshan Nagekar
          </p>
        </header>
        <div class="blog-post-content markdown-body">
          ${bodyHtml}
        </div>
        <footer style="margin-top:3rem; padding-top:2rem; border-top:1px solid #414868;">
          <p style="color:var(--text-color);">
            Found this useful?
            <a href="https://twitter.com/iamrawtion" target="_blank" style="color:var(--primary-color);">Share on Twitter</a>
            or
            <a href="../consulting.html" style="color:var(--primary-color);">hire me for consulting</a>.
          </p>
        </footer>
      </article>
    </div>
  </main>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
  <script>
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav-links');
    if (toggle) toggle.addEventListener('click', () => nav.classList.toggle('active'));
  </script>
</body>
</html>`;
}

// --- sitemap.xml ---
const staticPages = [
  { url: `${BASE_URL}/`, lastmod: new Date().toISOString().split('T')[0], priority: '1.0' },
  { url: `${BASE_URL}/blog.html`, lastmod: new Date().toISOString().split('T')[0], priority: '0.9' },
];

const blogSitemapEntries = blogs.map(b => ({
  url: `${BASE_URL}/blog.html?post=${b.id}`,
  lastmod: b.date,
  priority: '0.8'
}));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPages, ...blogSitemapEntries].map(e => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemap);
console.log(`✅ sitemap.xml — ${staticPages.length + blogSitemapEntries.length} URLs`);

// --- feed.xml ---
const items = blogs.map(b => {
  const url = `${BASE_URL}/blog.html?post=${b.id}`;
  const pubDate = new Date(b.date).toUTCString();
  const categories = b.tags.map(t => `    <category>${escape(t)}</category>`).join('\n');
  return `  <item>
    <title>${escape(b.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <pubDate>${pubDate}</pubDate>
    <description>${escape(b.excerpt)}</description>
    <author>iamrawtion@gmail.com (Roshan Nagekar)</author>
${categories}
  </item>`;
}).join('\n');

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
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

// --- static blog HTML pages ---
let generated = 0;
for (const blog of blogs) {
  const mdPath = `blogs/${blog.file}`;
  if (!fs.existsSync(mdPath)) {
    console.warn(`⚠️  skipping ${blog.id} — ${mdPath} not found`);
    continue;
  }
  const raw = fs.readFileSync(mdPath, 'utf8');
  const body = raw.replace(/^---[\s\S]*?---\n/, '');
  const bodyHtml = marked(body);
  const html = blogPostHtml(blog, bodyHtml);
  fs.writeFileSync(`blogs/${blog.id}.html`, html);
  generated++;
}
console.log(`✅ static blog pages — ${generated} HTML files written to blogs/`);
