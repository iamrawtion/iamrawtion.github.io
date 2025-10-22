# Roshan Nagekar - Portfolio Website

A modern, responsive portfolio website showcasing DevOps and DevSecOps expertise.

## 🚀 Quick Setup for GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it: `iamrawtion.github.io` (IMPORTANT: Use this exact name format)
3. Make it public
4. Don't initialize with README (we'll add files manually)

### Step 2: Upload Files

You can upload files using either method:

#### Method A: Using GitHub Web Interface
1. In your new repository, click "uploading an existing file"
2. Upload these three files:
   - `index.html`
   - `styles.css`
   - `script.js`
3. Commit the changes

#### Method B: Using Git Command Line
```bash
# Clone your repository
git clone https://github.com/iamrawtion/iamrawtion.github.io.git
cd iamrawtion.github.io

# Copy the three files (index.html, styles.css, script.js) into this directory

# Add and commit files
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository settings
2. Click on "Pages" in the left sidebar
3. Under "Source", select "main" branch
4. Click "Save"

### Step 4: Access Your Website

Your website will be live at: `https://iamrawtion.github.io`

It may take a few minutes for GitHub to build and deploy your site.

## 🎨 Customization

### Updating Content

Edit `index.html` to update:
- Personal information
- Work experience
- Skills
- Projects
- Contact details

### Changing Colors

Edit `styles.css` and modify the CSS variables at the top:
```css
:root {
    --primary-color: #00d9ff;      /* Main accent color */
    --secondary-color: #0a192f;    /* Background color */
    --accent-color: #64ffda;       /* Secondary accent */
}
```

### Adding Projects Section

To add a projects section, add this code in `index.html` between the Skills and Achievements sections:

```html
<!-- Projects Section -->
<section id="projects" class="projects">
    <div class="container">
        <h2 class="section-title">Projects</h2>
        <div class="projects-grid">
            <!-- Add your project cards here -->
        </div>
    </div>
</section>
```

## 📱 Features

- ✅ Fully responsive design
- ✅ Smooth scrolling navigation
- ✅ Modern dark theme
- ✅ Interactive animations
- ✅ SEO optimized
- ✅ Fast loading
- ✅ Mobile-friendly

## 🛠️ Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- JavaScript (Vanilla)
- Font Awesome Icons
- Google Fonts

## 📝 File Structure

```
iamrawtion.github.io/
├── index.html      # Main HTML file
├── styles.css      # Stylesheet
├── script.js       # JavaScript for interactions
└── README.md       # This file
```

## 🔧 Local Development

To test locally:

1. Download all files
2. Open `index.html` in your web browser
3. Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```
4. Visit `http://localhost:8000`

## 📞 Support

If you need help with setup or customization:
- Email: roshan4074@gmail.com
- GitHub: [@iamrawtion](https://github.com/iamrawtion)

## 📄 License

Feel free to use this template for your own portfolio. Attribution appreciated but not required.

---

Built with 💙 by Roshan Nagekar
