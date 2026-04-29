// ============================================
// OMKAR A TEMKAR - PORTFOLIO WEBSITE JAVASCRIPT
// Modern 3D Portfolio with Animations
// ============================================

// ============================================
// 1. PARTICLE BACKGROUND ANIMATION
// ============================================

function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = window.innerWidth > 1200 ? 150 : 80;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        const xPos = Math.random() * window.innerWidth;
        const yPos = Math.random() * window.innerHeight * 2;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = xPos + 'px';
        particle.style.top = yPos + 'px';
        particle.style.opacity = Math.random() * 0.6 + 0.2;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';

        // Randomize colors between cyan and purple
        const colors = [
            'rgba(34, 211, 238, 0.9)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(34, 211, 238, 0.6)',
            'rgba(167, 139, 250, 0.7)',
            'rgba(6, 182, 212, 0.8)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;

        // Add horizontal drift variation
        const drift = (Math.random() - 0.5) * 200;
        particle.style.setProperty('--drift', drift + 'px');
        
        particlesContainer.appendChild(particle);
    }
}

// Create particles on load
window.addEventListener('load', createParticles);

// Recreate particles on resize
window.addEventListener('resize', () => {
    const particlesContainer = document.querySelector('.particles');
    particlesContainer.innerHTML = '';
    createParticles();
});

// ============================================
// 2. NAVIGATION AND HAMBURGER MENU
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        hamburger.querySelectorAll('span').forEach((span, index) => {
            span.style.transition = 'all 0.3s ease';
        });
    });
}

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ============================================
// 3. SMOOTH SCROLL AND ACTIVE NAV LINK
// ============================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

updateActiveNavLink();

// ============================================
// 4. ENHANCED CURSOR MOVEMENT AND TRACKING
// ============================================

// Create custom cursor element
const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
cursorDot.style.cssText = `
    width: 8px;
    height: 8px;
    background: #22d3ee;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    box-shadow: 0 0 15px rgba(34, 211, 238, 0.8), 0 0 30px rgba(139, 92, 246, 0.4);
    transition: all 0.1s ease-out;
    display: none;
`;
document.body.appendChild(cursorDot);

// Create cursor trail
const cursorTrail = document.createElement('div');
cursorTrail.className = 'cursor-trail';
cursorTrail.style.cssText = `
    width: 30px;
    height: 30px;
    border: 2px solid rgba(34, 211, 238, 0.5);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    display: none;
    box-shadow: 0 0 20px rgba(34, 211, 238, 0.3);
`;
document.body.appendChild(cursorTrail);

let cursorX = 0;
let cursorY = 0;
let trailX = 0;
let trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    // Update cursor dot
    cursorDot.style.left = (cursorX - 4) + 'px';
    cursorDot.style.top = (cursorY - 4) + 'px';
    cursorDot.style.display = 'block';
    
    // Update cursor trail with delay
    setTimeout(() => {
        cursorTrail.style.left = (cursorX - 15) + 'px';
        cursorTrail.style.top = (cursorY - 15) + 'px';
        cursorTrail.style.display = 'block';
    }, 100);
    
    // Enhanced parallax effect on shapes with stronger movement
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const moveX = (mouseX / window.innerWidth) * 30;
        const moveY = (mouseY / window.innerHeight) * 30;
        
        shape.style.transform = `translate(${moveX * (index + 1)}px, ${moveY * (index + 1)}px) scale(1.05)`;
    });
    
    // Add interactive effect to cards on mouse near
    const cards = document.querySelectorAll('.glass-effect, .project-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(mouseX - cardCenterX, 2) + 
            Math.pow(mouseY - cardCenterY, 2)
        );
        
        if (distance < 200) {
            const angle = Math.atan2(mouseY - cardCenterY, mouseX - cardCenterX);
            const moveX = Math.cos(angle) * (200 - distance) * 0.02;
            const moveY = Math.sin(angle) * (200 - distance) * 0.02;
            
            card.style.boxShadow = `
                0 20px 60px rgba(0, 0, 0, 0.4),
                ${moveX * 5}px ${moveY * 5}px 30px rgba(34, 211, 238, 0.3)
            `;
        }
    });
});

// Hide cursor when not moving
document.addEventListener('mouseleave', () => {
    cursorDot.style.display = 'none';
    cursorTrail.style.display = 'none';
});

// ============================================
// 5. MOUSE PARALLAX EFFECT
// ============================================

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// ============================================
// 5. SCROLL REVEAL ANIMATION
// ============================================

const revealElements = () => {
    const elements = document.querySelectorAll('section, .project-card, .about-card, .skill-card, .timeline-content');
    
    const reveal = () => {
        elements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('scroll-reveal');
                if (!element.classList.contains('reveal')) {
                    element.classList.add('reveal');
                }
            }
        });
    };

    // Initial check
    reveal();

    // Check on scroll
    window.addEventListener('scroll', reveal);
};

window.addEventListener('load', revealElements);

// ============================================
// 6. ENHANCED TYPING ANIMATION
// ============================================

function typeWriter() {
    const element = document.querySelector('.typing-text');
    if (!element) return;

    const fullText = element.textContent;
    element.textContent = '';
    let index = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const type = () => {
        const currentText = element.textContent;

        if (!isDeleting) {
            if (index < fullText.length) {
                element.textContent += fullText[index];
                index++;
                setTimeout(type, typeSpeed);
            } else {
                // Wait before deleting
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, 2000);
            }
        } else {
            if (currentText.length > 0) {
                element.textContent = currentText.slice(0, -1);
                setTimeout(type, 50);
            } else {
                isDeleting = false;
                index = 0;
                setTimeout(type, 500);
            }
        }
    };

    type();
}

window.addEventListener('load', typeWriter);

// ============================================
// 7. TILT EFFECT FOR CARDS
// ============================================

function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card, .skill-card, .about-card, .glass-effect');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

window.addEventListener('load', initTiltEffect);

// ============================================
// 8. FORM SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Validate
        if (name && email && message) {
            // Show success message
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = '✓ Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #22d3ee, #06b6d4)';

            // Reset form
            contactForm.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);

            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, message });
        }
    });
}

// ============================================
// 9. DOWNLOAD RESUME FUNCTION
// ============================================

function downloadResume() {
    const link = document.createElement('a');
    link.href = 'Omkar_Resume_26.pdf';
    link.download = 'Omkar_A_Temkar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('Resume PDF downloaded successfully!');
}

// ============================================
// 10. SKILL CARDS ANIMATION
// ============================================

function animateSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    let delay = 0;

    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, delay);

        delay += 50;
    });
}

window.addEventListener('load', animateSkillCards);

// ============================================
// 11. PROJECT CARDS CLICK HANDLER
// ============================================

document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get the project title
        const projectTitle = btn.closest('.project-card').querySelector('h3').textContent;
        
        // Show alert or navigate to project
        alert(`View ${projectTitle} Demo - Coming Soon!`);
        
        // In production, you would navigate to the actual project URL
        // window.open(projectUrl, '_blank');
    });
});

// ============================================
// 12. LOADING ANIMATION
// ============================================

function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0e27 0%, #1a1a3e 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeOut 0.5s ease 2s forwards;
    `;

    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(0, 212, 255, 0.3);
        border-top: 3px solid #00d4ff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; display: none; }
        }
    `;

    document.head.appendChild(style);
    loader.appendChild(spinner);
    document.body.insertBefore(loader, document.body.firstChild);
}

window.addEventListener('load', showLoadingAnimation);

// ============================================
// 13. SCROLL-TO-TOP BUTTON
// ============================================

function createScrollToTopButton() {
    const btn = document.createElement('button');
    btn.id = 'scrollToTopBtn';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #00d4ff, #00a8cc);
        border: none;
        border-radius: 50%;
        color: #0a0e27;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 0 30px rgba(0, 212, 255, 0.4);
    `;

    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effect
    btn.addEventListener('mouseover', () => {
        btn.style.transform = 'translateY(-5px)';
        btn.style.boxShadow = '0 0 50px rgba(0, 212, 255, 0.6)';
    });

    btn.addEventListener('mouseout', () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.4)';
    });
}

window.addEventListener('load', createScrollToTopButton);

// ============================================
// 14. DARK MODE / LIGHT MODE TOGGLE
// ============================================

function initThemeToggle() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Optional: Add theme toggle button later if needed
}

initThemeToggle();

// ============================================
// 15. PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images (if any)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// 16. KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Press 'H' to go to home
    if (e.key === 'h' || e.key === 'H') {
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }

    // Press 'C' to go to contact
    if (e.key === 'c' || e.key === 'C') {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }

    // Press 'P' to go to projects
    if (e.key === 'p' || e.key === 'P') {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
});

// ============================================
// 17. ACCESSIBILITY ENHANCEMENTS
// ============================================

// Announce to screen readers when sections are revealed
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.classList.contains('reveal')) {
            // Could add aria-label updates here
        }
    });
});

observer.observe(document.body, { subtree: true, classNameList: true });

// ============================================
// 18. SMOOTH ANIMATIONS ON SCROLL
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.shape');

    parallaxElements.forEach((element, index) => {
        element.style.transform = `translateY(${scrolled * 0.5 * (index + 1)}px)`;
    });
});

// ============================================
// 19. CONSOLE EASTER EGG
// ============================================

console.log(
    '%c%s',
    'color: #00d4ff; font-size: 20px; font-weight: bold;',
    'Welcome to Omkar A Temkar\'s Portfolio!'
);
console.log(
    '%cHello there! 👋 Thanks for visiting my portfolio.\nFor keyboard shortcuts, press: H (Home), C (Contact), P (Projects)',
    'color: #9d4edd; font-size: 14px; font-weight: 500;'
);

// ============================================
// 20. INITIALIZATION
// ============================================

window.addEventListener('load', () => {
    console.log('Portfolio fully loaded and interactive!');
});

// Initial checks
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing animations...');
    revealElements();
});
