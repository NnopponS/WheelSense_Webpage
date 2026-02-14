// Our Story Page — Scrollytelling
import { createNavbar } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';
import { initSmoothScroll } from '../components/smooth-scroll.js';
import { initScrollAnimations, gsap, ScrollTrigger } from '../components/scroll-animations.js';
import { WebGLWheel } from '../components/webgl-wheel.js';

document.addEventListener('DOMContentLoaded', () => {
    // Loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('is-hidden');
        setTimeout(() => loader.remove(), 600);
    }, 800);

    createNavbar('our story');
    createFooter();
    initSmoothScroll();

    // WebGL in story visual
    const storyCanvas = document.getElementById('storyCanvas');
    let wheel = null;

    if (storyCanvas) {
        wheel = new WebGLWheel(storyCanvas, {
            particleCount: 3000,
            color: 0xffffff,
            radius: 2.5,
            rotationSpeed: 0.001,
        });
    }

    // Scrollytelling phases
    const phases = document.querySelectorAll('.story-phase');
    const progressDots = document.querySelectorAll('.story-progress__dot');
    const visualLabel = document.getElementById('storyVisualLabel');

    const phaseLabels = ['Phase 0 — Origin', 'Phase 1 — Digitization', 'Phase 2 — Interaction', 'Phase 3 — Expansion', 'Phase 4 — Intelligence'];
    const phaseColors = [0xffffff, 0x34D399, 0xA78BFA, 0xFB923C, 0x60A5FA];
    const phaseShapes = ['wheel', 'sensorWheel', 'gameController', 'raceTrack', 'brain'];

    let currentPhase = -1;

    phases.forEach((phase, index) => {
        ScrollTrigger.create({
            trigger: phase,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => activatePhase(index),
            onEnterBack: () => activatePhase(index),
        });
    });

    function activatePhase(index) {
        if (currentPhase === index) return;
        currentPhase = index;

        // Update phase visibility
        phases.forEach((p, i) => {
            p.classList.toggle('is-active', i === index);
        });

        // Update progress dots
        progressDots.forEach((dot, i) => {
            dot.classList.toggle('is-active', i === index);
        });

        // Update visual label
        if (visualLabel) {
            visualLabel.textContent = phaseLabels[index] || '';
            visualLabel.style.color = `#${phaseColors[index].toString(16).padStart(6, '0')}`;
        }

        // Update WebGL
        if (wheel) {
            wheel.setColor(phaseColors[index]);
            wheel.morphTo(phaseShapes[index]);
        }
    }

    // Click on progress dots
    progressDots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index, 10);
            const target = phases[index];
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    // Init scroll animations for ending
    initScrollAnimations();
});
