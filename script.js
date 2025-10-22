// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 25, 47, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 25, 47, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
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

// Observe all sections and cards
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

// Mobile menu toggle (if needed in future)
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar .container');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-toggle';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.style.cssText = 'display: none; background: none; border: none; color: var(--primary-color); font-size: 1.5rem; cursor: pointer;';
    
    const navMenu = document.querySelector('.nav-menu');
    
    menuButton.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Show menu button on mobile
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMobileMenu = (e) => {
        if (e.matches) {
            menuButton.style.display = 'block';
            navMenu.style.cssText = 'display: none; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: var(--bg-dark); padding: 1rem;';
        } else {
            menuButton.style.display = 'none';
            navMenu.style.cssText = '';
        }
    };
    
    mediaQuery.addListener(handleMobileMenu);
    handleMobileMenu(mediaQuery);
    
    navbar.insertBefore(menuButton, navMenu);
};

createMobileMenu();

// Add active state to navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = 'var(--text-color)';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        }
    });
});

// Typing effect for tagline (optional enhancement)
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
};

// Initialize on load
window.addEventListener('load', () => {
    // Add any initialization code here
    console.log('Portfolio loaded successfully!');
});

// Particle background effect (optional enhancement)
const createParticles = () => {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5};
            animation: float ${5 + Math.random() * 10}s infinite;
        `;
        hero.appendChild(particle);
    }
    
    // Add float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
            }
            50% {
                transform: translateY(-20px) translateX(10px);
            }
        }
    `;
    document.head.appendChild(style);
};

// Uncomment to enable particles
// createParticles();
