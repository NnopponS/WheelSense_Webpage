// Projects page
import { createNavbar } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';
import { initSmoothScroll } from '../components/smooth-scroll.js';
import { initScrollAnimations } from '../components/scroll-animations.js';
import { applyPageOverrides } from '../components/page-content.js';

const projectData = {
    'yes-wheelchair': {
        era: 'Era 01 - Digitization',
        color: '#34D399',
        title: 'YES Wheelchair',
        overview: 'The first step in our journey: embedding IoT sensors into wheelchairs to transform physical movement into measurable, actionable data.',
        problem: 'Wheelchair users often lack visibility into daily activity, health metrics, and safety status. Caregivers cannot reliably monitor falls or unusual patterns remotely.',
        solution: 'We designed and integrated a sensor array with accelerometers, gyroscopes, and distance tracking into the wheelchair frame. A companion app displays real-time metrics including distance, speed, calories, and fall alerts.',
        technology: ['ESP32 Microcontroller', 'MPU6050 IMU Sensor', 'Ultrasonic Distance Sensor', 'Bluetooth Low Energy', 'Flutter Mobile App'],
        impact: 'Established the foundational IoT architecture for later generations and achieved high fall-detection reliability.',
    },
    'all-wheelchair': {
        era: 'Era 02 - Interaction',
        color: '#A78BFA',
        title: 'ALL Wheelchair',
        overview: 'Transforming the wheelchair into a game controller, merging physical therapy with exergaming for engaging rehabilitation.',
        problem: 'Traditional rehabilitation routines are repetitive. Users often lose motivation, which can reduce physical activity and slow progress.',
        solution: 'We developed motion tracking that maps wheelchair movement to game interactions. Users can train through interactive tasks while maintaining measurable therapy progress.',
        technology: ['Motion Tracking Algorithms', 'WebSocket Real-Time Communication', 'Unity Game Engine', 'Custom Motion Controller', 'Bluetooth HID Protocol'],
        impact: 'Demonstrated stronger user engagement in rehabilitation environments and strengthened translational research output.',
    },
    'marathon-racing': {
        era: 'Era 03 - Expansion',
        color: '#FB923C',
        title: 'Marathon and Racing',
        overview: 'Breaking distance barriers with GPS and cellular connectivity for wheelchair racing and marathon telemetry.',
        problem: 'Race organizers and coaches need reliable long-range tracking to monitor positioning, speed, and pacing in real time.',
        solution: 'We integrated GPS and 4G modules with a live telemetry dashboard, enabling continuous tracking and race analytics.',
        technology: ['GPS Module (NEO-6M)', '4G LTE Module (SIM7600)', 'Real-Time Dashboard', 'Google Maps API', 'MQTT Protocol'],
        impact: 'Enabled race-grade telemetry workflows for outdoor events and performance review.',
    },
    wheelsense: {
        era: 'Era 04 - Intelligence',
        color: '#60A5FA',
        title: 'WheelSense',
        overview: 'An AI-powered smart environment that transforms the wheelchair into an intelligent companion.',
        problem: 'Users in home environments need better context awareness, safer interaction, and simpler control of connected devices.',
        solution: 'WheelSense integrates computer vision, voice control, and smart-home automation to assist context-aware daily living.',
        technology: ['ESP32-S3 Camera Platform', 'YOLO Object Detection', 'Home Assistant Integration', 'Model Context Protocol', 'Node-RED Automation', 'TinyML'],
        impact: 'Advances assistive mobility toward proactive and intelligent support in daily life.',
    },
};

document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('is-hidden');
        setTimeout(() => loader.remove(), 600);
    }, 800);

    createNavbar('projects');
    createFooter();
    initSmoothScroll();

    const cards = document.querySelectorAll('.project-card');
    const detail = document.getElementById('projectDetail');
    const detailContent = document.getElementById('projectDetailContent');
    const detailClose = document.getElementById('projectDetailClose');

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            const data = projectData[projectId];
            if (!data) return;

            detailContent.innerHTML = `
        <div class="project-detail__hero">
          <div class="project-detail__hero-bg" style="background: linear-gradient(135deg, ${data.color}33, transparent);"></div>
          <div class="container" style="position: relative; z-index: 1;">
            <p class="text-small" style="color: ${data.color}; letter-spacing: var(--tracking-wider); text-transform: uppercase; margin-bottom: var(--space-sm);">${data.era}</p>
            <h1 class="h1" style="margin-bottom: var(--space-md);">${data.title}</h1>
            <p class="text-body-lg text-secondary" style="max-width: 600px;">${data.overview}</p>
          </div>
        </div>
        <div class="project-detail__sections">
          <div class="container container-narrow">
            <div class="project-section">
              <p class="project-section__label">The Problem</p>
              <p class="text-body-lg text-secondary" style="line-height: var(--leading-relaxed);">${data.problem}</p>
            </div>
            <div class="project-section">
              <p class="project-section__label">Our Solution</p>
              <p class="text-body-lg text-secondary" style="line-height: var(--leading-relaxed);">${data.solution}</p>
            </div>
            <div class="project-section">
              <p class="project-section__label">Technology Stack</p>
              <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: var(--space-sm);">
                ${data.technology
                    .map((item) => `<span style="font-size: var(--text-small); color: var(--color-text-secondary); padding: 6px 16px; border-radius: var(--radius-full); border: 1px solid rgba(255,255,255,0.08);">${item}</span>`)
                    .join('')}
              </div>
            </div>
            <div class="project-section">
              <p class="project-section__label">Impact</p>
              <p class="text-body-lg text-secondary" style="line-height: var(--leading-relaxed);">${data.impact}</p>
            </div>
          </div>
        </div>
      `;

            detail.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        });
    });

    detailClose.addEventListener('click', () => {
        detail.classList.remove('is-open');
        document.body.style.overflow = '';
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            detail.classList.remove('is-open');
            document.body.style.overflow = '';
        }
    });

    await applyPageOverrides('projects');
    initScrollAnimations();
});
