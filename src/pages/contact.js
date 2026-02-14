// Contact page
import { createNavbar } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';
import { initSmoothScroll } from '../components/smooth-scroll.js';
import { initScrollAnimations } from '../components/scroll-animations.js';
import { applyPageOverrides } from '../components/page-content.js';

document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('is-hidden');
        setTimeout(() => loader.remove(), 600);
    }, 800);

    createNavbar('contact');
    createFooter();
    initSmoothScroll();

    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            form.style.display = 'none';
            success.classList.add('is-visible');
        }, 1200);
    });

    await applyPageOverrides('contact');
    initScrollAnimations();
});
