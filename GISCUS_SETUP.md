# Giscus Comments Setup Guide

This guide will help you set up Giscus comments on your blog. Giscus uses GitHub Discussions to power the comment system.

## Prerequisites

✅ Your repository must be **public**
✅ GitHub account with admin access to the repository

## Step 1: Enable GitHub Discussions

1. Go to your repository: https://github.com/iamrawtion/iamrawtion.github.io
2. Click on **Settings** tab
3. Scroll down to the **Features** section
4. Check the box next to **Discussions**
5. Click **Set up discussions** if prompted

## Step 2: Create a Discussion Category for Blog Comments

1. Go to the **Discussions** tab in your repository
2. Click on the **Categories** icon (pencil icon) or gear icon
3. Click **New category**
4. Create a category with these settings:
   - **Name:** `Blog Comments`
   - **Description:** `Comments from blog posts`
   - **Discussion Format:** Choose **Announcement** (you can moderate and approve comments)
   - **Emoji:** 💬 (or any you prefer)
5. Click **Create**

## Step 3: Install Giscus App

1. Go to https://github.com/apps/giscus
2. Click **Install**
3. Choose **Only select repositories**
4. Select `iamrawtion/iamrawtion.github.io`
5. Click **Install**

## Step 4: Get Your Repository ID and Category ID

1. Go to https://giscus.app
2. In the **Configuration** section:
   - **Repository:** Enter `iamrawtion/iamrawtion.github.io`
   - **Page ↔️ Discussions Mapping:** Select `pathname`
   - **Discussion Category:** Select `Blog Comments`

3. Scroll down to the **Enable giscus** section
4. You'll see a script tag that looks like this:

```html
<script src="https://giscus.app/client.js"
        data-repo="iamrawtion/iamrawtion.github.io"
        data-repo-id="R_kgDO..."  ← COPY THIS VALUE
        data-category="Blog Comments"
        data-category-id="DIC_kwDO..."  ← COPY THIS VALUE
        ...
</script>
```

5. **Copy** the values for:
   - `data-repo-id` (starts with `R_kgDO`)
   - `data-category-id` (starts with `DIC_kwDO`)

## Step 5: Update blog.js with Your IDs

1. Open `blog.js` in your repository
2. Find the `loadGiscusComments()` function (around line 187)
3. Replace the placeholder values:

**Before:**
```javascript
script.setAttribute('data-repo-id', 'YOUR_REPO_ID'); // You'll need to update this
script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID'); // You'll need to update this
```

**After:**
```javascript
script.setAttribute('data-repo-id', 'R_kgDO...'); // Paste your actual repo ID
script.setAttribute('data-category-id', 'DIC_kwDO...'); // Paste your actual category ID
```

4. Commit and push the changes

## Step 6: Test the Comments

1. Visit your blog in production: https://iamrawtion.github.io/blog.html
2. Click on any blog post
3. Scroll down to the **Discussion** section at the bottom
4. You should see the Giscus comment widget
5. Try posting a test comment (you'll need to be logged into GitHub)

## How to Moderate Comments

Since you chose the **Announcement** category format:

1. All comments will appear as discussions in your GitHub repository
2. Go to **Discussions** → **Blog Comments** category
3. You can:
   - ✅ Approve comments
   - ❌ Delete spam
   - 💬 Reply to comments
   - 🔒 Lock discussions
   - 📌 Pin important discussions

## Features Users Will See

- 💬 Comment using GitHub account
- 👍 React to comments (like, heart, etc.)
- 💡 Markdown support in comments
- 🔗 Code blocks with syntax highlighting
- 📱 Mobile-friendly interface
- 🌙 Dark theme matching your site

## Troubleshooting

### Comments not showing up?

1. **Check if Discussions are enabled** in your repository settings
2. **Verify the repository is public**
3. **Check browser console** for any errors
4. **Verify repo-id and category-id** are correct

### Can't see the comment box?

- Make sure you're logged into GitHub
- Try refreshing the page
- Check if the Giscus app is installed on your repository

### Comments showing on wrong posts?

- Verify `data-mapping` is set to `pathname`
- Each blog post URL creates a separate discussion thread

## Privacy & Security

✅ **No tracking or ads** - Giscus is open source and privacy-focused
✅ **GitHub authentication** - Users must have GitHub accounts
✅ **Full control** - All data stored in your GitHub Discussions
✅ **Spam protection** - GitHub's built-in spam filters
✅ **Moderation** - You control what appears on your blog

## Need Help?

- Giscus Documentation: https://giscus.app
- Giscus GitHub: https://github.com/giscus/giscus
- Issues: https://github.com/giscus/giscus/issues

---

**That's it!** Your blog now has a professional, privacy-friendly comment system powered by GitHub Discussions. 🎉
