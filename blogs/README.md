# Blog System Documentation

This folder contains all blog posts for the portfolio website. The blog system is designed to be simple and maintainable, allowing you to write posts in Markdown and have them automatically appear on the blog page.

## 📁 Folder Structure

```
blogs/
├── README.md                              # This file

├── blogs.json                             # Blog metadata index

├── implementing-devsecops-cicd.md         # Sample blog post

├── kubernetes-cost-optimization.md        # Sample blog post

├── gitops-infrastructure-management.md    # Sample blog post

├── mlops-machine-learning-operations.md   # Sample blog post

└── terraform-best-practices-multicloud.md # Sample blog post

```

---

## ✍️ Adding a New Blog Post

Follow these steps to add a new blog post:

### Step 1: Create a Markdown File

Create a new `.md` file in the `blogs/` directory. Use a descriptive filename with hyphens (e.g., `my-new-blog-post.md`).

### Step 2: Add Frontmatter

At the top of your markdown file, add frontmatter with metadata:

```markdown
---
title: "Your Blog Post Title"
date: "YYYY-MM-DD"
category: "Category Name"
tags: ["Tag1", "Tag2", "Tag3"]
excerpt: "A brief 1-2 sentence description of your post that appears in the blog list."
author: "Roshan Nagekar"
---

# Your Blog Post Title

Your blog content goes here...
```

### Step 3: Write Your Content

Write your blog post using standard Markdown syntax:

- Headings: `# H1`, `## H2`, `### H3`, etc.

- **Bold: `**bold text`
- Italic: `*italic text*`
- Links: `[link text](https://example.com)`
- Images: `![alt text](image-url.jpg)`
- Code blocks: Use triple backticks with language identifier

---

## Example code block

````markdown
```python

---

## def hello_world()

    print("Hello, World!")
```
````

### Step 4: Update blogs.json

## Add an entry to `blogs/blogs.json`

```json
{
  "id": "my-new-blog-post",
  "title": "Your Blog Post Title",
  "date": "YYYY-MM-DD",
  "category": "Category Name",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "excerpt": "A brief 1-2 sentence description.",
  "author": "Roshan Nagekar",
  "file": "my-new-blog-post.md"
}
```

---

## Important

- The `id` should match your filename (without `.md`)
- The `file` should be your filename
- Add your entry to the array, maintaining the JSON structure
- Posts are automatically sorted by date (newest first)

### Step 5: Commit and Push

```bash
git add blogs/my-new-blog-post.md blogs/blogs.json
git commit -m "Add new blog post: Your Blog Post Title"
git push
```

Your blog post will automatically appear on the blog page!

---

## 📝 Markdown Formatting Guide

### Headings

```markdown

# H1 - Main title (automatically added from frontmatter)

## H2 - Section heading

### H3 - Subsection heading

#### H4 - Minor heading

```

### Text Formatting

```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
`inline code`
```

### Lists

```markdown
- Unordered list item 1
- Unordered list item 2
  - Nested item

1. Ordered list item 1
2. Ordered list item 2
```

### Links and Images

```markdown
[Link text](https://example.com)
![Image alt text](https://example.com/image.jpg)
```

### Code Blocks

Use triple backticks with language identifier for syntax highlighting:

````markdown
```bash
echo "Hello, World!"
```

```python

---

## def greet(name)

    return f"Hello, {name}!"
```

```yaml
apiVersion: v1
kind: Pod

---

## metadata

  name: my-pod
```
````

Supported languages include: bash, **python**, **javascript**, **yaml**, **json**, go, **java**, **terraform**, dockerfile, and many more.

### Quotes

```markdown
> This is a blockquote
> It can span multiple lines
```

### Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |
```

### Horizontal Rule

```markdown
---
```

---

## 🎨 Available Categories

Use these predefined categories for consistent styling:

- **DevSecOps** - Security in DevOps practices
- **Cloud** - Cloud infrastructure and services
- **DevOps** - General DevOps practices
- **AI/ML** - Machine learning and AI operations
- **Infrastructure** - Infrastructure as Code, networking
- **Monitoring** - Observability and monitoring

You can also create new categories as needed.

---

## 🏷️ Tagging Best Practices

- Use 2-4 tags per post
- Keep tags specific and relevant
- Use consistent capitalization
- Common tags: **Kubernetes**, **Docker**, **AWS**, **GCP**, **Azure**, **Terraform**, **Ansible**, **CI/CD**, Security, GitOps, etc.

---

## 📋 Blog Post Template

Copy and paste this template when creating a new blog post:

```markdown
---
title: "Your Compelling Blog Post Title"
date: "2025-01-15"
category: "DevOps"
tags: ["Kubernetes", "Docker", "CI/CD"]
excerpt: "A concise description that makes readers want to click and read more."
author: "Roshan Nagekar"
---

# Your Compelling Blog Post Title

Introduction paragraph that hooks the reader and explains what they'll learn.

## Main Section 1

Content with examples, code snippets, and explanations.

```bash

# Example command

kubectl get pods
```

## Main Section 2

More content...

### Subsection

Details and examples...

## Best Practices

- Key point 1
- Key point 2
- Key point 3

## Conclusion

Summary of what was covered and key takeaways.

---

**Questions or feedback? Connect with me on [LinkedIn](https://linkedin.com/in/roshannagekar) or via [email](mailto:roshan4074@gmail.com).
```

---

## 🔧 Troubleshooting

### Blog post not showing up?

1. Check that the markdown file is in the `blogs/` folder
2. Verify the entry in `blogs.json**` is valid **JSON
3. Ensure the `id` matches the filename (without `.md`)
4. Clear browser cache and hard refresh (Ctrl+Shift+R)

### Formatting looks wrong?

1. Check your markdown syntax
2. Ensure code blocks use triple backticks
3. Verify frontmatter is properly formatted with `---` delimiters

### Images not displaying?

1. Use absolute URLs for images (e.g., `https://...`)
2. Or place images in a folder and reference relatively
3. Ensure image URLs are accessible publicly

---

## 🚀 Advanced Features

### Syntax Highlighting

Code blocks automatically get syntax highlighting using Prism.js. Specify the language after the opening backticks:

````
```python

# Python code

```
````

### Responsive Design

All blog posts are automatically responsive and mobile-friendly.

### SEO Friendly

The blog system generates proper metadata from your frontmatter for better SEO.

---

## 📞 Need Help?

If you have questions or run into issues:

1. Check the sample blog posts for reference
2. Review the markdown syntax guide above
3. Reach out via [email](mailto:roshan4074@gmail.com)

Happy blogging! 🎉
