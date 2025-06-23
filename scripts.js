const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');
let mouseX = 0;
let mouseY = 0;

if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
        cursorOutline.style.setProperty('--x', `${mouseX - 20}px`);
        cursorOutline.style.setProperty('--y', `${mouseY - 20}px`);
        cursorOutline.style.transform = `translate3d(${mouseX - 20}px, ${mouseY - 20}px, 0)`;
    });

    document.querySelectorAll('a, button, .interactive').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('scale-150', 'bg-accent-blue', 'border-accent-blue', 'opacity-20'); 
            cursorOutline.classList.remove('opacity-100'); 
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('scale-150', 'bg-accent-blue', 'border-accent-blue', 'opacity-20');
            cursorOutline.style.animation = 'cursor-pulse 2s infinite ease-in-out';
        });
    });
} else {
    cursorDot.style.display = 'none';
    cursorOutline.style.display = 'none';
}


document.addEventListener('DOMContentLoaded', () => {
    if (window.particlesJS) {
        particlesJS('particles-container', {
            "particles": { "number": { "value": 60, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#38bdf8" }, "shape": { "type": "circle" }, "opacity": { "value": 0.2, "random": true, "anim": { "enable": true, "speed": 0.5, "opacity_min": 0.05, "sync": false } }, "size": { "value": 2.5, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#a78bfa", "opacity": 0.1, "width": 1 }, "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false } }, 
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "bubble": { "distance": 250, "size": 4, "duration": 2, "opacity": 0.6 }, "push": { "particles_nb": 4 } } },
            "retina_detect": true
        });
    } else {
        console.error("particles.js is not loaded.");
    }

    const typedTextSpan = document.getElementById('typed-text');
    const phrases = ["IT Enthusiast", "Junior Network Specialist", "Junior Mikrotik", "Junior Fiber Optic", "Junior Prompt Engineer", "Junior Engineer"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        const typingSpeed = isDeleting ? 75 : 150;
        setTimeout(type, typingSpeed);
    }
    setTimeout(type, 500); 


    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 }); 

    revealElements.forEach(el => revealObserver.observe(el));


    const mainHeader = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    let activeSectionId = 'hero'; 

    const updateHeaderAndNav = () => {
        const scrollY = window.scrollY;
        
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - mainHeader.offsetHeight - 20; 
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                activeSectionId = sectionId;
            }
        });

        navLinks.forEach(link => {
            if (link.dataset.section === activeSectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', updateHeaderAndNav);
    updateHeaderAndNav(); 


    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    let isMobileMenuOpen = false;

    mobileMenuToggle.addEventListener('click', () => {
        isMobileMenuOpen = !isMobileMenuOpen;
        if (isMobileMenuOpen) {
            mobileMenu.classList.remove('opacity-0', 'invisible');
            mobileMenu.classList.add('opacity-100', 'visible');
            mobileMenuToggle.classList.add('active');
            mobileMenuToggle.querySelector('i').classList.replace('fa-bars', 'fa-times');
            document.body.style.overflow = 'hidden'; 
        } else {
            mobileMenu.classList.remove('opacity-100', 'visible');
            mobileMenu.classList.add('opacity-0', 'invisible');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            document.body.style.overflow = ''; 
        }
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMobileMenuOpen = false;
            mobileMenu.classList.remove('opacity-100', 'visible');
            mobileMenu.classList.add('opacity-0', 'invisible');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            document.body.style.overflow = ''; 
        });
    });
}); 
