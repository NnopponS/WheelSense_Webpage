// Contact page
import { createNavbar } from '../components/navbar.ts';
import { createFooter } from '../components/footer.ts';
import { initSmoothScroll } from '../components/smooth-scroll.ts';
import { initScrollAnimations } from '../components/scroll-animations.ts';
import { applyPageOverrides } from '../components/page-content.ts';

document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('is-hidden');
            setTimeout(() => loader.remove(), 600);
        }, 800);
    }

    createNavbar('contact');
    createFooter();
    initSmoothScroll();

    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    const errorEl = document.getElementById('formError');

    if (form instanceof HTMLFormElement && success) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            if (!(submitBtn instanceof HTMLButtonElement)) {
                return;
            }

            if (errorEl) {
                errorEl.textContent = '';
                errorEl.classList.remove('is-visible');
            }

            const formData = new FormData(form);
            const payload = {
                name: String(formData.get('name') || '').trim(),
                email: String(formData.get('email') || '').trim(),
                subject: String(formData.get('subject') || '').trim(),
                message: String(formData.get('message') || '').trim(),
            };

            if (!payload.name || !payload.email || !payload.message) {
                if (errorEl) {
                    errorEl.textContent = 'Please complete Name, Email, and Message before sending.';
                    errorEl.classList.add('is-visible');
                }
                return;
            }

            const originalText = submitBtn.textContent || 'Send Message';
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                let responseBody: Record<string, unknown> = {};
                try {
                    responseBody = await response.json();
                } catch {
                    responseBody = {};
                }

                if (!response.ok) {
                    const serverError = typeof responseBody.error === 'string' ? responseBody.error : '';
                    if (errorEl) {
                        errorEl.textContent = serverError || 'Unable to send message right now. Please try again.';
                        errorEl.classList.add('is-visible');
                    }
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    return;
                }

                form.reset();
                form.style.display = 'none';
                success.classList.add('is-visible');
            } catch {
                if (errorEl) {
                    errorEl.textContent = 'Unable to connect to the mail service. Please try again.';
                    errorEl.classList.add('is-visible');
                }
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    await applyPageOverrides('contact');
    initScrollAnimations();
});


