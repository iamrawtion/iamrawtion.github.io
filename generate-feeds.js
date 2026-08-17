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

function blogPostHtml(blog, bodyHtml, allBlogs) {
  const BASE = 'https://iamrawtion.github.io';
  const url = `${BASE}/blogs/${blog.id}.html`;
  const desc = blog.excerpt.replace(/"/g, '&quot;').slice(0, 160);
  const tags = (blog.tags || []).join(', ');

  // Related posts: up to 3 from the same category, excluding self
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

  const breadcrumbJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE + "/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": BASE + "/blog.html" },
      { "@type": "ListItem", "position": 3, "name": blog.title, "item": url }
    ]
  });

  const postJsonLd = JSON.stringify({
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
  <meta name="robots" content="index, follow">
  <meta name="language" content="en">
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
  <link rel="preconnect" href="https://cdnjs.cloudflare.com">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></noscript>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"></noscript>
  <script type="application/ld+json">${postJsonLd}</script>
  <script type="application/ld+json">${breadcrumbJsonLd}</script>
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
      <nav aria-label="breadcrumb" style="margin-bottom:1.5rem; font-size:0.85rem; color:var(--text-color);">
        <a href="../index.html" style="color:var(--primary-color);">Home</a>
        <span style="margin:0 0.4rem; opacity:0.5;">›</span>
        <a href="../blog.html" style="color:var(--primary-color);">Blog</a>
        <span style="margin:0 0.4rem; opacity:0.5;">›</span>
        <span style="color:var(--text-color);">${escape(blog.title)}</span>
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
        ${relatedHtml}
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
  { url: `${BASE_URL}/consulting.html`, lastmod: new Date().toISOString().split('T')[0], priority: '0.9' },
];

const blogSitemapEntries = blogs.map(b => ({
  url: `${BASE_URL}/blogs/${b.id}.html`,
  lastmod: b.date,
  priority: '0.8'
}));

const changefreqMap = { '1.0': 'weekly', '0.9': 'weekly', '0.8': 'monthly' };
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticPages, ...blogSitemapEntries].map(e => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${changefreqMap[e.priority] || 'monthly'}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemap);
console.log(`✅ sitemap.xml — ${staticPages.length + blogSitemapEntries.length} URLs`);

// --- feed.xml ---
const items = blogs.map(b => {
  const url = `${BASE_URL}/blogs/${b.id}.html`;
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
  const html = blogPostHtml(blog, bodyHtml, blogs);
  fs.writeFileSync(`blogs/${blog.id}.html`, html);
  generated++;
}
console.log(`✅ static blog pages — ${generated} HTML files written to blogs/`);

// --- blog.html: inject ItemList JSON-LD ---
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
// Replace either the placeholder (first run) or previous JSON-LD (subsequent runs)
blogHtml = blogHtml.replace(/<!--BLOG_ITEMLIST_JSONLD-->|(\{"@context":"https:\/\/schema\.org","@type":"ItemList"[\s\S]*?\})/, itemListJsonLd);
fs.writeFileSync('blog.html', blogHtml);
console.log(`✅ blog.html — ItemList JSON-LD injected (${blogs.length} entries)`);
