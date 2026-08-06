#!/usr/bin/env node
// Run after adding new blogs: node generate-feeds.js
const fs = require('fs');

const blogs = JSON.parse(fs.readFileSync('blogs/blogs.json', 'utf8'));
const BASE_URL = 'https://iamrawtion.github.io';
const NOW = new Date().toUTCString();

const escape = s => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

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
