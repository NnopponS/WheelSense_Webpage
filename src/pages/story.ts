// Story page scrollytelling
import { createNavbar } from '../components/navbar';
import { createFooter } from '../components/footer';
import { initSmoothScroll } from '../components/smooth-scroll';
import { initScrollAnimations, ScrollTrigger } from '../components/scroll-animations';
import { applyPageOverrides } from '../components/page-content';

document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('is-hidden');
        setTimeout(() => loader.remove(), 600);
    }, 800);

    createNavbar('our story');
    createFooter();
    initSmoothScroll();

    const phases = document.querySelectorAll('.story-phase');
    const progressDots = document.querySelectorAll('.story-progress__dot');
    const visualLabel = document.getElementById('storyVisualLabel');
    const storyVisual = document.getElementById('storyVisual');
    const coords = document.getElementById('storyCoords');

    const phaseLabels = [
        'Phase 0 - Origin',
        'Phase 1 - Digitization',
        'Phase 2 - Interaction',
        'Phase 3 - Expansion',
        'Phase 4 - Intelligence',
        'Phase 5 - Integration',
    ];

    const phaseColors = [0xffffff, 0x34D399, 0xA78BFA, 0xFB923C, 0x60A5FA, 0xF472B6];
    const phaseClasses = ['phase-0', 'phase-1', 'phase-2', 'phase-3', 'phase-4', 'phase-5'];

    let currentPhase = -1;
    let coordsTicker = null;

    phases.forEach((phase, index) => {
        ScrollTrigger.create({
            trigger: phase,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => activatePhase(index),
            onEnterBack: () => activatePhase(index),
        });
    });

    function startCoordinateTicker() {
        if (!coords || coordsTicker) return;

        const baseLat = 13.7563;
        const baseLong = 100.5018;

        coordsTicker = window.setInterval(() => {
            const lat = (baseLat + (Math.random() - 0.5) * 0.015).toFixed(4);
            const lng = (baseLong + (Math.random() - 0.5) * 0.015).toFixed(4);
            coords.textContent = `Lat ${lat} | Long ${lng}`;
        }, 900);
    }

    function stopCoordinateTicker() {
        if (!coordsTicker) return;
        window.clearInterval(coordsTicker);
        coordsTicker = null;
    }

    function activatePhase(index) {
        if (currentPhase === index) return;
        currentPhase = index;

        phases.forEach((phase, i) => {
            phase.classList.toggle('is-active', i === index);
        });

        progressDots.forEach((dot, i) => {
            dot.classList.toggle('is-active', i === index);
        });

        if (visualLabel) {
            visualLabel.textContent = phaseLabels[index] || '';
            visualLabel.style.color = `#${phaseColors[index].toString(16).padStart(6, '0')}`;
        }

        if (storyVisual) {
            phaseClasses.forEach((name) => storyVisual.classList.remove(name));
            storyVisual.classList.add(phaseClasses[index]);
        }

        if (index === 3) {
            startCoordinateTicker();
        } else {
            stopCoordinateTicker();
        }

    }

    progressDots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const index = Number.parseInt((dot as HTMLElement).dataset.index || '-1', 10);
            const target = phases[index];
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    activatePhase(0);
    await applyPageOverrides('story');
    initScrollAnimations();

    window.addEventListener('beforeunload', () => {
        stopCoordinateTicker();
    });
});


