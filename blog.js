// Blog Management System
class BlogManager {
    constructor() {
        this.blogs = [];
        this.currentBlog = null;
    }

    async init() {
        await this.loadBlogs();
        this.setupEventListeners();
        this.checkRoute();
    }

    async loadBlogs() {
        try {
            const response = await fetch('blogs/blogs.json');
            this.blogs = await response.json();
            // Sort blogs by date (newest first)
            this.blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        } catch (error) {
            console.error('Error loading blogs:', error);
            this.showError('Failed to load blog posts');
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
        if (!container) return;

        container.innerHTML = '';

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
            // Fetch markdown content
            const response = await fetch(`blogs/${blog.file}`);
            const markdown = await response.text();

            // Parse markdown to HTML using marked library
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
            this.showError('Failed to load blog post');
        }
    }

    showBlogListView() {
        document.getElementById('blog-posts-section').style.display = 'block';
        document.getElementById('blog-post-view').style.display = 'none';
        window.history.pushState({}, '', 'blog.html');
        window.scrollTo(0, 0);
    }

    highlightCode() {
        // If Prism.js is available, use it
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    }

    getCategoryIcon(category) {
        const icons = {
            'DevSecOps': 'fas fa-shield-alt',
            'Cloud': 'fas fa-cloud',
            'DevOps': 'fas fa-cogs',
            'AI/ML': 'fas fa-robot',
            'Infrastructure': 'fas fa-server',
            'Monitoring': 'fas fa-chart-line'
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
                <div class="error-message" style="text-align: center; padding: 3rem; color: var(--red);">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p style="font-size: 1.2rem;">${message}</p>
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

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.checkRoute();
        });
    }
}

// Initialize blog manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const blogManager = new BlogManager();
    blogManager.init();
});
