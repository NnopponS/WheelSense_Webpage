// Home page main entry
import { createNavbar } from '../components/navbar.ts';
import { createFooter } from '../components/footer.ts';
import { initSmoothScroll } from '../components/smooth-scroll.ts';
import { initScrollAnimations } from '../components/scroll-animations.ts';
import { WebGLWheel } from '../components/webgl-wheel.ts';
import { applyPageOverrides } from '../components/page-content.ts';

function normalizeHomeSectionText(): void {
    const targets = [
        { selector: '#storyPreview .reveal p', fallback: 'Our Journey' },
        { selector: '#storyPreview .reveal h2', fallback: 'Four Eras of Innovation' },
        { selector: '#portfolio .reveal p', fallback: 'Portfolio' },
        { selector: '#portfolio .reveal h2', fallback: 'Our Work' },
        { selector: '#bentoGrid .bento-grid__item:nth-child(1) .text-small', fallback: 'Featured Project' },
    ];

    targets.forEach((target) => {
        const element = document.querySelector(target.selector);
        if (!element) return;

        const current = (element.textContent || '').replace(/\.shfud;jkouh/gi, '').trim();
        element.textContent = current || target.fallback;
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('is-hidden');
        setTimeout(() => loader.remove(), 600);
    }, 800);

    createNavbar('home');
    createFooter();
    initSmoothScroll();

    const heroCanvas = document.getElementById('heroCanvas');
    if (heroCanvas) {
        const wheel = new WebGLWheel(heroCanvas, {
            particleCount: 2500,
            color: 0xffffff,
            radius: 3,
            rotationSpeed: 0.001,
        });

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

        // Keep reference in case future interactions need it.
        void wheel;
    }

    const eraGrid = document.getElementById('eraGrid');
    if (eraGrid && window.innerWidth < 768) {
        eraGrid.style.gridTemplateColumns = '1fr';
    }

    await applyPageOverrides('home');
    normalizeHomeSectionText();
    initScrollAnimations();
});


