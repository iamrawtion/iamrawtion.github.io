# How to Add a New Blog Post

This guide explains how to create and publish a new blog post on your GitHub Pages blog.

## Quick Start (3 Steps)

1. **Create markdown file** in `blogs/` folder
2. **Add images** to `images/blog-images/` folder
3. **Update** `blogs/blogs.json` with metadata

---

## Step 1: Create Your Blog Post

### Create the Markdown File

Create a new file in the `blogs/` folder with a descriptive filename:

```bash
blogs/my-new-blog-post.md
```

**Naming convention:**
- Use lowercase
- Separate words with hyphens (-)
- Use descriptive names
- Example: `kubernetes-deployment-guide.md`

### Use the Template

Copy the template from `BLOG_TEMPLATE.md` or use this structure:

```markdown
---
title: "Your Blog Title Here"
date: "2025-01-15"
category: "DevOps"
tags: ["Docker", "Kubernetes", "CI/CD"]
excerpt: "A brief description of your blog post (2-3 sentences). This appears in the blog list."
author: "Roshan Nagekar"
---

Your blog content starts here...

## Introduction

Write your introduction here.

## Main Content

Add your main content with proper headings.

### Subheading

More details...

## Code Examples

Use code blocks with language tags:

```bash
kubectl get pods
```

```python
def hello_world():
    print("Hello, World!")
```

## Images

Add images like this:

![Image description](/images/blog-images/my-blog/screenshot.png)

## Conclusion

Wrap up your blog post.
```

---

## Step 2: Add Images (Simple Method)

### Option A: Using GitHub Repo (Recommended)

**This is the simplest method - everything stays in one place!**

1. **Create a folder** for your blog images:
   ```bash
   images/blog-images/your-blog-name/
   ```

2. **Add your images** to that folder:
   ```
   images/blog-images/kubernetes-guide/
   ├── architecture.png
   ├── dashboard.png
   └── deployment.png
   ```

3. **Reference images** in your markdown:
   ```markdown
   ![Architecture Diagram](/images/blog-images/kubernetes-guide/architecture.png)

   ![Dashboard Screenshot](/images/blog-images/kubernetes-guide/dashboard.png)
   ```

**Benefits:**
- ✅ All content in one repository
- ✅ Version controlled
- ✅ No external dependencies
- ✅ Fast loading (GitHub CDN)
- ✅ Works offline during development

### Option B: Using External Image Hosting

If you prefer external hosting:

1. **Upload to Imgur/Imgbb**:
   - Go to https://imgur.com/ or https://imgbb.com/
   - Upload your image
   - Copy the direct link

2. **Use in markdown**:
   ```markdown
   ![Description](https://i.imgur.com/abc123.png)
   ```

### Option C: Using GitHub Issues (Quick Method)

1. **Create a dummy issue** in your repo
2. **Drag and drop images** into the comment box
3. **Copy the generated URL** (GitHub hosts it)
4. **Use the URL** in your markdown
5. **Close the issue** (image URL still works)

---

## Step 3: Update blogs.json

Add an entry to `blogs/blogs.json`:

```json
{
  "title": "Your Blog Title",
  "date": "2025-01-15",
  "category": "DevOps",
  "tags": ["Docker", "Kubernetes"],
  "excerpt": "Brief description (2-3 sentences) that appears in blog list.",
  "author": "Roshan Nagekar",
  "id": "your-blog-title",
  "file": "your-blog-title.md"
}
```

**Important:**
- `id`: Use lowercase with hyphens (matches URL)
- `file`: Must match your .md filename
- `date`: Format as "YYYY-MM-DD"
- `excerpt`: Keep it under 150 characters

---

## Step 4: Test Locally

1. **Start local server**:
   ```bash
   python3 -m http.server 8000
   ```

2. **Open in browser**:
   ```
   http://localhost:8000/blog.html
   ```

3. **Verify**:
   - Blog appears in list
   - Images load correctly
   - Links work
   - Code blocks have syntax highlighting

---

## Step 5: Commit and Push

```bash
# Add all changes
git add blogs/your-new-blog.md
git add images/blog-images/your-blog-name/
git add blogs/blogs.json

# Commit
git commit -m "Add new blog: Your Blog Title"

# Push to GitHub
git push origin main
```

Your blog will be live on GitHub Pages in a few minutes!

---

## Markdown Best Practices

### Headings

```markdown
# H1 - Only use for blog title (automatic from frontmatter)
## H2 - Main sections
### H3 - Subsections
```

### Text Formatting

```markdown
**Bold text** for emphasis
*Italic text* for slight emphasis
`inline code` for commands or code
```

### Lists

```markdown
- Unordered item 1
- Unordered item 2

1. Ordered item 1
2. Ordered item 2
```

### Links

```markdown
[Link text](https://example.com)
[Internal link](#heading-name)
```

### Code Blocks

Always use language tags for syntax highlighting:

```markdown
```bash
docker ps
```

```python
print("Hello")
```

```yaml
apiVersion: v1
kind: Pod
```
```

### Blockquotes

```markdown
> Important note or quote
> that spans multiple lines
```

### Tables

```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

---

## Categories and Tags

### Available Categories

Use one of these for consistency:
- DevOps
- Cloud
- Security
- DevSecOps
- Linux
- Networking
- Programming

### Tags

Use specific, relevant tags:
- Technology names: Docker, Kubernetes, Jenkins, Ansible
- Concepts: CI/CD, Automation, Monitoring
- Cloud providers: AWS, Azure, GCP
- Tools: Git, Terraform, Prometheus

---

## Image Best Practices

### Image Sizes

Optimize images before uploading:
- **Screenshots**: 1200px wide max
- **Diagrams**: 800px wide max
- **Icons**: 400px wide max

### Image Formats

- **PNG**: Screenshots, diagrams (supports transparency)
- **JPG**: Photos, images without transparency
- **SVG**: Logos, icons (scalable)

### Compression

Use tools to reduce file size:
- https://tinypng.com/
- https://imageoptim.com/
- Or command line: `convert input.png -quality 85 output.png`

---

## Common Issues and Solutions

### Images Not Loading

**Problem**: Images show broken link icon

**Solutions:**
1. Check path is correct: `/images/blog-images/...`
2. Verify image file exists in repo
3. Check filename case (case-sensitive!)
4. Clear browser cache (Ctrl+Shift+R)

### Blog Not Appearing in List

**Problem**: New blog doesn't show up

**Solutions:**
1. Check `blogs.json` syntax (valid JSON)
2. Verify `file` matches actual filename
3. Ensure comma after previous entry in JSON
4. Clear browser cache

### Syntax Highlighting Not Working

**Problem**: Code appears as plain text

**Solutions:**
1. Add language tag: ```bash not just ```
2. Check language is supported (bash, python, yaml, json, etc.)
3. Close code block with ```

### Formatting Looks Wrong

**Problem**: Markdown not rendering correctly

**Solutions:**
1. Check for unclosed bold markers (**)
2. Verify blank lines around headings
3. Ensure lists have blank line before/after
4. Check code blocks are properly closed

---

## Example: Complete New Blog

**File**: `blogs/docker-best-practices.md`

```markdown
---
title: "Docker Best Practices for Production"
date: "2025-01-15"
category: "DevOps"
tags: ["Docker", "Containers", "DevOps"]
excerpt: "Learn essential Docker best practices for running containers in production. Covers security, optimization, and monitoring."
author: "Roshan Nagekar"
---

![Docker Logo](/images/blog-images/docker-best-practices/docker-logo.png)

## Introduction

Running Docker containers in production requires careful planning...

## Security Best Practices

### Use Official Base Images

```dockerfile
FROM node:18-alpine
```

### Run as Non-Root User

```dockerfile
USER node
```

![Security Architecture](/images/blog-images/docker-best-practices/security.png)

## Optimization Tips

### Multi-Stage Builds

```dockerfile
FROM node:18 AS builder
WORKDIR /app
COPY package.json .
RUN npm install

FROM node:18-alpine
COPY --from=builder /app /app
```

## Monitoring

Set up proper monitoring with:
- Prometheus
- Grafana
- Container logs

## Conclusion

Following these practices ensures...
```

**Images folder**:
```
images/blog-images/docker-best-practices/
├── docker-logo.png
├── security.png
└── monitoring-dashboard.png
```

**blogs.json entry**:
```json
{
  "title": "Docker Best Practices for Production",
  "date": "2025-01-15",
  "category": "DevOps",
  "tags": ["Docker", "Containers", "DevOps"],
  "excerpt": "Learn essential Docker best practices for running containers in production. Covers security, optimization, and monitoring.",
  "author": "Roshan Nagekar",
  "id": "docker-best-practices",
  "file": "docker-best-practices.md"
}
```

---

## Quick Reference

### File Paths

```
Your repo structure:
├── blogs/
│   ├── blogs.json          ← Update this
│   └── your-new-blog.md    ← Create this
├── images/
│   └── blog-images/
│       └── your-blog-name/  ← Create folder
│           ├── image1.png   ← Add images
│           └── image2.png
└── HOW_TO_ADD_NEW_BLOG.md  ← This guide
```

### Commands Cheat Sheet

```bash
# Create blog folder for images
mkdir -p images/blog-images/my-blog-name

# Start local server
python3 -m http.server 8000

# Git workflow
git add .
git commit -m "Add new blog: Title"
git push origin main
```

### Markdown Cheat Sheet

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold** *Italic* `Code`

[Link](url)
![Image](path)

- List item
1. Numbered item

> Quote

```language
code block
```

| Table | Header |
|-------|--------|
| Cell  | Cell   |
```

---

## Need Help?

If you run into issues:

1. **Check this guide** for common solutions
2. **Test locally** before pushing
3. **Validate JSON** at https://jsonlint.com/
4. **Check browser console** for errors (F12)

Happy blogging! 🚀
