// Home Page — Main Entry
import { createNavbar } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';
import { initSmoothScroll } from '../components/smooth-scroll.js';
import { initScrollAnimations } from '../components/scroll-animations.js';
import { WebGLWheel } from '../components/webgl-wheel.js';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Hide loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('is-hidden');
        setTimeout(() => loader.remove(), 600);
    }, 800);

    // Navbar & Footer
    createNavbar('home');
    createFooter();

    // Smooth scroll
    initSmoothScroll();

    // WebGL Hero
    const heroCanvas = document.getElementById('heroCanvas');
    if (heroCanvas) {
        const wheel = new WebGLWheel(heroCanvas, {
            particleCount: 2500,
            color: 0xffffff,
            radius: 3,
            rotationSpeed: 0.001,
        });

        // Fade hero content on scroll
        const heroContent = document.querySelector('.hero__content');
        const scrollIndicator = document.querySelector('.scroll-indicator');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const fadeStart = 100;
            const fadeEnd = 500;
            const progress = Math.min(1, Math.max(0, (scrollY - fadeStart) / (fadeEnd - fadeStart)));

            if (heroContent) {
                heroContent.style.opacity = 1 - progress;
                heroContent.style.transform = `translateY(${progress * -50}px)`;
            }
            if (scrollIndicator) {
                scrollIndicator.style.opacity = Math.max(0, 0.4 - progress);
            }
        }, { passive: true });
    }

    // Scroll animations
    initScrollAnimations();

    // Era grid responsive
    const eraGrid = document.getElementById('eraGrid');
    if (eraGrid && window.innerWidth < 768) {
        eraGrid.style.gridTemplateColumns = '1fr';
    }
});
