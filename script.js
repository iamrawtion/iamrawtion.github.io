// Terminal Command System
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const isBlogPage = !!document.getElementById('blog-grid');

// ─── Portfolio commands (index.html) ────────────────────────────────────────

const portfolioCommands = {
    help: {
        description: 'Show all available commands',
        action: () => `
Available commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<span class="terminal-output-command">help</span>     - Show this help message
<span class="terminal-output-command">whoami</span>   - About me section
<span class="terminal-output-command">github</span>   - GitHub statistics
<span class="terminal-output-command">work</span>     - Work experience
<span class="terminal-output-command">skills</span>   - Technical skills
<span class="terminal-output-command">awards</span>   - Achievements
<span class="terminal-output-command">contact</span>  - Contact information
<span class="terminal-output-command">clear</span>    - Clear terminal output
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tip: Use Tab for autocomplete, Arrow keys for history`.trim()
    },
    whoami: {
        description: 'About me section',
        action: () => { scrollToSection('about'); return '<span class="terminal-output-success">✓</span> Navigating to About Me section...'; }
    },
    github: {
        description: 'GitHub statistics',
        action: () => { scrollToSection('github'); return '<span class="terminal-output-success">✓</span> Loading GitHub statistics...'; }
    },
    work: {
        description: 'Work experience',
        action: () => { scrollToSection('experience'); return '<span class="terminal-output-success">✓</span> Displaying work experience...'; }
    },
    skills: {
        description: 'Technical skills',
        action: () => { scrollToSection('skills'); return '<span class="terminal-output-success">✓</span> Showing technical skills...'; }
    },
    awards: {
        description: 'Achievements',
        action: () => { scrollToSection('achievements'); return '<span class="terminal-output-success">✓</span> Loading achievements...'; }
    },
    contact: {
        description: 'Contact information',
        action: () => { scrollToSection('contact'); return '<span class="terminal-output-success">✓</span> Contact information loaded...'; }
    },
    clear: {
        description: 'Clear terminal',
        action: () => { terminalOutput.innerHTML = ''; return null; }
    }
};

// ─── Blog commands (blog.html) ───────────────────────────────────────────────

function getBlogPosts() {
    return window.__blogPosts || [];
}

function formatPost(p, index) {
    const num = String(index + 1).padStart(3, ' ');
    const year = p.date ? p.date.slice(0, 4) : '????';
    const title = p.title || 'Untitled';
    const url = p.id ? `blogs/${p.id}.html` : '#';
    return `${num}  <span style="opacity:0.5">${year}</span>  <a href="${url}" style="color:var(--primary-color);text-decoration:none;">${title}</a>`;
}

const blogCommands = {
    help: {
        description: 'Show available commands',
        action: () => `
Available commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
<span class="terminal-output-command">ls</span>                  - List recent 10 posts
<span class="terminal-output-command">ls --all</span>            - List all posts
<span class="terminal-output-command">grep &lt;keyword&gt;</span>      - Search posts by keyword
<span class="terminal-output-command">cat &lt;tag&gt;</span>           - Show posts by category/tag
<span class="terminal-output-command">clear</span>               - Clear terminal output
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Examples:
  grep kubernetes
  cat devops
  cat linux
Tip: Use Tab for autocomplete, Arrow keys for history`.trim()
    },
    ls: {
        description: 'List recent posts',
        action: (args) => {
            const posts = getBlogPosts();
            if (!posts.length) return '<span class="terminal-output-error">Posts not loaded yet — try again in a moment.</span>';
            const all = args && args[0] === '--all';
            const slice = all ? posts : posts.slice(0, 10);
            const lines = slice.map((p, i) => formatPost(p, i)).join('\n');
            const note = !all && posts.length > 10
                ? `\n<span style="opacity:0.5">… and ${posts.length - 10} more. Run <span class="terminal-output-command">ls --all</span> to see everything.</span>`
                : `\n<span style="opacity:0.5">${posts.length} posts total.</span>`;
            return lines + note;
        }
    },
    grep: {
        description: 'Search posts by keyword',
        action: (args) => {
            if (!args || !args.length) return '<span class="terminal-output-error">Usage: grep &lt;keyword&gt;</span>';
            const posts = getBlogPosts();
            if (!posts.length) return '<span class="terminal-output-error">Posts not loaded yet — try again in a moment.</span>';
            const keyword = args.join(' ').toLowerCase();
            const matches = posts.filter(p => {
                const haystack = [p.title, p.excerpt, ...(p.tags || [])].join(' ').toLowerCase();
                return haystack.includes(keyword);
            });
            if (!matches.length) return `<span class="terminal-output-error">No posts matching "${keyword}"</span>`;
            return matches.map((p, i) => formatPost(p, i)).join('\n')
                + `\n<span style="opacity:0.5">${matches.length} result${matches.length === 1 ? '' : 's'}.</span>`;
        }
    },
    cat: {
        description: 'Show posts by category or tag',
        action: (args) => {
            if (!args || !args.length) return '<span class="terminal-output-error">Usage: cat &lt;tag&gt;</span>';
            const posts = getBlogPosts();
            if (!posts.length) return '<span class="terminal-output-error">Posts not loaded yet — try again in a moment.</span>';
            const tag = args.join(' ').toLowerCase();
            const matches = posts.filter(p => {
                const cats = [(p.category || ''), ...(p.tags || [])].map(t => t.toLowerCase());
                return cats.some(t => t.includes(tag));
            });
            if (!matches.length) {
                const allTags = [...new Set(posts.flatMap(p => [(p.category || ''), ...(p.tags || [])]).filter(Boolean))].sort();
                return `<span class="terminal-output-error">No posts tagged "${tag}"</span>\nAvailable: <span style="opacity:0.7">${allTags.join(', ')}</span>`;
            }
            return matches.map((p, i) => formatPost(p, i)).join('\n')
                + `\n<span style="opacity:0.5">${matches.length} post${matches.length === 1 ? '' : 's'} in "${args.join(' ')}".</span>`;
        }
    },
    clear: {
        description: 'Clear terminal',
        action: () => { terminalOutput.innerHTML = ''; return null; }
    }
};

const commands = isBlogPage ? blogCommands : portfolioCommands;

// ─── Tab autocomplete token list ─────────────────────────────────────────────

function getCompletions(input) {
    const baseCommands = Object.keys(commands);
    if (!input.includes(' ')) {
        return baseCommands.filter(cmd => cmd.startsWith(input));
    }
    if (isBlogPage) {
        const parts = input.split(' ');
        const cmd = parts[0];
        const partial = parts.slice(1).join(' ').toLowerCase();
        if (cmd === 'cat') {
            const posts = getBlogPosts();
            const allTags = [...new Set(posts.flatMap(p => [(p.category || ''), ...(p.tags || [])]).filter(Boolean).map(t => t.toLowerCase()))].sort();
            return allTags.filter(t => t.startsWith(partial)).map(t => `cat ${t}`);
        }
        if (cmd === 'ls') {
            return ['ls --all'].filter(s => s.startsWith(input));
        }
    }
    return [];
}

// ─── Core terminal mechanics ─────────────────────────────────────────────────

const commandHistory = [];
let historyIndex = -1;

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({ top: section.getBoundingClientRect().top + window.pageYOffset - 120, behavior: 'smooth' });
    }
}

function addOutput(command, output) {
    if (output !== null) {
        const outputLine = document.createElement('div');
        outputLine.className = 'terminal-output-line';
        outputLine.innerHTML = `
            <span class="terminal-output-command">visitor@blog:~$</span> ${command}
            <div class="terminal-output-text">${output}</div>
        `;
        terminalOutput.appendChild(outputLine);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
}

function processCommand(input) {
    const trimmed = input.trim();
    if (trimmed === '') return;

    commandHistory.unshift(trimmed);
    historyIndex = -1;

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (commands[cmd]) {
        const output = commands[cmd].action(args);
        addOutput(trimmed, output);
    } else {
        addOutput(trimmed, `<span class="terminal-output-error">Command not found: ${cmd}</span>\nType '<span class="terminal-output-command">help</span>' for available commands`);
    }

    terminalInput.value = '';
}

if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            processCommand(terminalInput.value);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = -1;
                terminalInput.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const input = terminalInput.value.toLowerCase();
            const matches = getCompletions(input);
            if (matches.length === 1) terminalInput.value = matches[0];
        }
    });
}

const terminalBody = document.querySelector('.terminal-body');
if (terminalBody && terminalInput) {
    terminalBody.addEventListener('click', () => terminalInput.focus());
}

// ─── Sidebar toggle ───────────────────────────────────────────────────────────

const navToggle = document.getElementById('nav-toggle');
const navLinksElement = document.getElementById('nav-links');

if (navToggle && navLinksElement) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinksElement.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
        if (!navLinksElement.contains(e.target) && !navToggle.contains(e.target)) {
            navLinksElement.classList.remove('active');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        scrollToSection(this.getAttribute('href').substring(1));
        if (navLinksElement && navLinksElement.classList.contains('active')) {
            navLinksElement.classList.remove('active');
        }
    });
});

// ─── Welcome message ──────────────────────────────────────────────────────────

window.addEventListener('load', () => {
    if (terminalOutput) {
        if (isBlogPage) {
            addOutput('', `<span class="terminal-output-success">blog terminal ready.</span> Type <span class="terminal-output-command">help</span> to see commands, or try <span class="terminal-output-command">ls</span> to list recent posts.`);
        } else {
            addOutput('', `<span class="terminal-output-success">Welcome to Roshan's Portfolio Terminal!</span>\nType '<span class="terminal-output-command">help</span>' to see available commands.`);
        }
    }
});

// ─── Animations (index.html only) ────────────────────────────────────────────

if (!isBlogPage) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('fade-in'); observer.unobserve(entry.target); }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('section, .timeline-item, .skill-category, .achievement-card').forEach(el => observer.observe(el));

    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        glitchText.addEventListener('mouseenter', () => {
            let iteration = 0;
            const text = glitchText.textContent;
            const interval = setInterval(() => {
                glitchText.textContent = text.split('').map((char, index) => {
                    if (index < iteration) return text[index];
                    return String.fromCharCode(65 + Math.floor(Math.random() * 26));
                }).join('');
                if (iteration >= text.length) { clearInterval(interval); glitchText.textContent = text; }
                iteration += 1/3;
            }, 30);
        });
    }
}
