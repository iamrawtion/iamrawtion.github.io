// Blog Management System
class BlogManager {
    constructor() {
        this.blogs = [];
        this.currentBlog = null;
    }

    async init() {
        console.log('Initializing blog manager...');
        await this.loadBlogs();
        this.setupEventListeners();
        this.checkRoute();
    }

    async loadBlogs() {
        try {
            console.log('Loading blogs from blogs/blogs.json...');
            const response = await fetch('blogs/blogs.json');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            this.blogs = await response.json();
            console.log(`Loaded ${this.blogs.length} blog posts`);

            // Sort blogs by date (newest first)
            this.blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

        } catch (error) {
            console.error('Error loading blogs:', error);
            this.showError(`Failed to load blog posts. Error: ${error.message}`);
        }
    }

    checkRoute() {
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = urlParams.get('post');

        if (blogId) {
            this.showBlogPost(blogId);
        } else {
            this.showBlogList();
        }
    }

    showBlogList() {
        const container = document.getElementById('blog-grid');
        if (!container) {
            console.error('blog-grid container not found');
            return;
        }

        container.innerHTML = '';

        if (this.blogs.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 3rem; grid-column: 1 / -1;">
                    <i class="fas fa-inbox" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                    <p style="color: var(--text-color); font-size: 1.2rem;">No blog posts found yet.</p>
                    <p style="color: var(--text-color); opacity: 0.7;">Check back soon for new content!</p>
                </div>
            `;
            return;
        }

        console.log(`Rendering ${this.blogs.length} blog cards`);
        this.blogs.forEach(blog => {
            const card = this.createBlogCard(blog);
            container.appendChild(card);
        });
    }

    createBlogCard(blog) {
        const article = document.createElement('article');
        article.className = 'blog-card';

        const categoryIcon = this.getCategoryIcon(blog.category);
        const formattedDate = this.formatDate(blog.date);

        article.innerHTML = `
            <div class="blog-card-header">
                <span class="blog-category">
                    <i class="${categoryIcon}"></i> ${blog.category}
                </span>
                <span class="blog-date">
                    <i class="far fa-calendar"></i> ${formattedDate}
                </span>
            </div>
            <h2 class="blog-card-title">${blog.title}</h2>
            <p class="blog-card-excerpt">${blog.excerpt}</p>
            <div class="blog-card-tags">
                ${blog.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="?post=${blog.id}" class="blog-card-link" data-blog-id="${blog.id}">
                Read More <i class="fas fa-arrow-right"></i>
            </a>
        `;

        // Add click handler for the link
        const link = article.querySelector('.blog-card-link');
        link.addEventListener('click', (e) => {
            e.preventDefault();
            this.showBlogPost(blog.id);
            window.history.pushState({}, '', `?post=${blog.id}`);
        });

        return article;
    }

    async showBlogPost(blogId) {
        const blog = this.blogs.find(b => b.id === blogId);
        if (!blog) {
            this.showError('Blog post not found');
            return;
        }

        try {
            console.log(`Loading blog post: ${blog.file}`);

            // Fetch markdown content
            const response = await fetch(`blogs/${blog.file}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let markdown = await response.text();
            console.log(`Loaded markdown content (${markdown.length} characters)`);

            // Remove frontmatter (YAML between --- delimiters)
            markdown = this.removeFrontmatter(markdown);

            // Parse markdown to HTML using marked library
            if (typeof marked === 'undefined') {
                throw new Error('Marked.js library not loaded');
            }

            const htmlContent = marked.parse(markdown);

            // Hide blog list, show blog post
            document.getElementById('blog-posts-section').style.display = 'none';
            document.getElementById('blog-post-view').style.display = 'block';

            // Update blog post content
            const postContent = document.getElementById('blog-post-content');
            postContent.innerHTML = htmlContent;

            // Add syntax highlighting to code blocks
            this.highlightCode();

            // Scroll to top
            window.scrollTo(0, 0);

        } catch (error) {
            console.error('Error loading blog post:', error);
            this.showError(`Failed to load blog post. Error: ${error.message}`);
        }
    }

    showBlogListView() {
        document.getElementById('blog-posts-section').style.display = 'block';
        document.getElementById('blog-post-view').style.display = 'none';
        window.history.pushState({}, '', 'blog.html');
        window.scrollTo(0, 0);
    }

    removeFrontmatter(markdown) {
        // Remove YAML frontmatter (content between --- delimiters at the start)
        const frontmatterRegex = /^---\s*\n[\s\S]*?\n---\s*\n/;
        return markdown.replace(frontmatterRegex, '');
    }

    highlightCode() {
        // If Prism.js is available, use it
        if (typeof Prism !== 'undefined') {
            console.log('Applying syntax highlighting...');
            Prism.highlightAll();
        } else {
            console.warn('Prism.js not available for syntax highlighting');
        }
    }

    getCategoryIcon(category) {
        const icons = {
            'DevSecOps': 'fas fa-shield-alt',
            'Cloud': 'fas fa-cloud',
            'DevOps': 'fas fa-cogs',
            'AI/ML': 'fas fa-robot',
            'Infrastructure': 'fas fa-server',
            'Monitoring': 'fas fa-chart-line',
            'Security': 'fas fa-lock',
            'Automation': 'fas fa-robot',
            'Containers': 'fas fa-box',
            'Database': 'fas fa-database',
            'Networking': 'fas fa-network-wired',
            'Tutorial': 'fas fa-graduation-cap'
        };
        return icons[category] || 'fas fa-file-alt';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    showError(message) {
        const container = document.getElementById('blog-grid') || document.getElementById('blog-post-content');
        if (container) {
            container.innerHTML = `
                <div class="error-message" style="text-align: center; padding: 3rem; color: var(--red); grid-column: 1 / -1;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p style="font-size: 1.2rem;">${message}</p>
                    <p style="font-size: 0.9rem; opacity: 0.8; margin-top: 1rem;">Check the browser console for more details.</p>
                </div>
            `;
        }
    }

    setupEventListeners() {
        // Back to blog list button
        const backButton = document.getElementById('back-to-blog-list');
        if (backButton) {
            backButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.showBlogListView();
            });
        }

        // Floating back button
        const floatingBackButton = document.getElementById('floating-back-button');
        if (floatingBackButton) {
            floatingBackButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.showBlogListView();
            });
        }

        // Show/hide floating button on scroll
        window.addEventListener('scroll', () => {
            const floatingBtn = document.getElementById('floating-back-button');
            const blogPostView = document.getElementById('blog-post-view');

            if (floatingBtn && blogPostView && blogPostView.style.display !== 'none') {
                // Show button after scrolling down 300px
                if (window.scrollY > 300) {
                    floatingBtn.classList.add('show');
                } else {
                    floatingBtn.classList.remove('show');
                }
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.checkRoute();
        });
    }
}

// Initialize blog manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, starting blog manager...');
    const blogManager = new BlogManager();
    blogManager.init();
});
