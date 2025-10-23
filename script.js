// Terminal Command System
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const commands = {
    help: {
        description: 'Show all available commands',
        action: () => {
            return `
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
Tip: Use Tab for autocomplete, Arrow keys for history
            `.trim();
        }
    },
    whoami: {
        description: 'About me section',
        action: () => {
            scrollToSection('about');
            return '<span class="terminal-output-success">✓</span> Navigating to About Me section...';
        }
    },
    github: {
        description: 'GitHub statistics',
        action: () => {
            scrollToSection('github');
            return '<span class="terminal-output-success">✓</span> Loading GitHub statistics...';
        }
    },
    work: {
        description: 'Work experience',
        action: () => {
            scrollToSection('experience');
            return '<span class="terminal-output-success">✓</span> Displaying work experience...';
        }
    },
    skills: {
        description: 'Technical skills',
        action: () => {
            scrollToSection('skills');
            return '<span class="terminal-output-success">✓</span> Showing technical skills...';
        }
    },
    awards: {
        description: 'Achievements',
        action: () => {
            scrollToSection('achievements');
            return '<span class="terminal-output-success">✓</span> Loading achievements...';
        }
    },
    contact: {
        description: 'Contact information',
        action: () => {
            scrollToSection('contact');
            return '<span class="terminal-output-success">✓</span> Contact information loaded...';
        }
    },
    clear: {
        description: 'Clear terminal',
        action: () => {
            terminalOutput.innerHTML = '';
            return null;
        }
    }
};

const commandHistory = [];
let historyIndex = -1;

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = 120;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function addOutput(command, output) {
    if (output !== null) {
        const outputLine = document.createElement('div');
        outputLine.className = 'terminal-output-line';
        outputLine.innerHTML = `
            <span class="terminal-output-command">visitor@portfolio:~$</span> ${command}
            <div class="terminal-output-text">${output}</div>
        `;
        terminalOutput.appendChild(outputLine);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
}

function processCommand(input) {
    const command = input.trim().toLowerCase();
    
    if (command === '') return;
    
    commandHistory.unshift(command);
    historyIndex = -1;
    
    if (commands[command]) {
        const output = commands[command].action();
        addOutput(command, output);
    } else {
        const output = `<span class="terminal-output-error">Command not found: ${command}</span>
Type '<span class="terminal-output-command">help</span>' for available commands`;
        addOutput(command, output);
    }
    
    terminalInput.value = '';
}

// Terminal input handler
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
            const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input));
            if (matches.length === 1) {
                terminalInput.value = matches[0];
            }
        }
    });
}

// Auto-focus terminal input when clicking anywhere in terminal
const terminalBody = document.querySelector('.terminal-body');
if (terminalBody && terminalInput) {
    terminalBody.addEventListener('click', () => {
        terminalInput.focus();
    });
}

// Sidebar toggle functionality
const navToggle = document.getElementById('nav-toggle');
const navLinksElement = document.getElementById('nav-links');

if (navToggle && navLinksElement) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinksElement.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinksElement.contains(e.target) && !navToggle.contains(e.target)) {
            navLinksElement.classList.remove('active');
        }
    });
}

// Smooth scrolling for all anchor links (CTA button and sidebar links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
        
        // Close sidebar after clicking
        if (navLinksElement && navLinksElement.classList.contains('active')) {
            navLinksElement.classList.remove('active');
        }
    });
});

// Show welcome message on load
window.addEventListener('load', () => {
    if (terminalOutput) {
        const welcomeMsg = `
<span class="terminal-output-success">Welcome to Roshan's Portfolio Terminal!</span>
Type '<span class="terminal-output-command">help</span>' to see available commands.
        `.trim();
        addOutput('', welcomeMsg);
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section, .timeline-item, .skill-category, .achievement-card').forEach(el => {
    observer.observe(el);
});

// Glitch effect on hover for title
const glitchText = document.querySelector('.glitch');
if (glitchText) {
    glitchText.addEventListener('mouseenter', () => {
        let iteration = 0;
        const text = glitchText.textContent;
        const interval = setInterval(() => {
            glitchText.textContent = text
                .split('')
                .map((char, index) => {
                    if (index < iteration) {
                        return text[index];
                    }
                    return String.fromCharCode(65 + Math.floor(Math.random() * 26));
                })
                .join('');
            
            if (iteration >= text.length) {
                clearInterval(interval);
                glitchText.textContent = text;
            }
            
            iteration += 1/3;
        }, 30);
    });
}
