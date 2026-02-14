// Projects Page
import { createNavbar } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';
import { initSmoothScroll } from '../components/smooth-scroll.js';
import { initScrollAnimations } from '../components/scroll-animations.js';

const projectData = {
    'yes-wheelchair': {
        era: 'Era 01 — Digitization',
        color: '#34D399',
        title: 'Yes WheelChair',
        overview: 'The first step in our journey: embedding IoT sensors into wheelchairs to transform physical movement into measurable, actionable data.',
        problem: 'Wheelchair users lack visibility into their daily activity, health metrics, and safety status. Caregivers cannot monitor falls or unusual patterns remotely.',
        solution: 'We designed and integrated a sensor array — accelerometers, gyroscopes, and distance trackers — into the wheelchair frame. A companion app displays real-time metrics including distance, speed, calories, and fall detection alerts.',
        technology: ['ESP32 Microcontroller', 'MPU6050 IMU Sensor', 'Ultrasonic Distance Sensor', 'Bluetooth Low Energy', 'Flutter Mobile App'],
        impact: 'First IoT-enabled wheelchair in our research group. Laid the foundation for all subsequent innovations. Achieved accurate fall detection with 95%+ reliability.',
    },
    'all-wheelchair': {
        era: 'Era 02 — Interaction',
        color: '#A78BFA',
        title: 'All Wheelchair',
        overview: 'Transforming the wheelchair into a game controller, merging physical therapy with exergaming for engaging rehabilitation.',
        problem: 'Traditional wheelchair rehabilitation exercises are monotonous and patients often lose motivation, leading to insufficient physical activity and slower recovery.',
        solution: 'We developed a motion-tracking system that converts wheelchair movements into game inputs. Users navigate virtual obstacles, compete in challenges, and track their therapy progress — all while exercising.',
        technology: ['Motion Tracking Algorithms', 'WebSocket Real-time Communication', 'Unity Game Engine', 'Custom Motion Controller', 'Bluetooth HID Protocol'],
        impact: 'Published in PLOS ONE. Won IPITEx Gold Medal. Demonstrated measurable improvement in patient engagement during rehabilitation sessions.',
    },
    'marathon-racing': {
        era: 'Era 03 — Expansion',
        color: '#FB923C',
        title: 'Marathon & Racing',
        overview: 'Breaking distance barriers with GPS and cellular connectivity for wheelchair racing and marathon telemetry.',
        problem: 'Wheelchair marathon organizers cannot track participants in real-time. Athletes lack performance analytics for training optimization.',
        solution: 'We integrated GPS modules and 4G LTE connectivity into the wheelchair sensor suite, enabling real-time position tracking, speed analysis, and race telemetry displayed on a live dashboard.',
        technology: ['GPS Module (NEO-6M)', '4G LTE Module (SIM7600)', 'Real-time Dashboard', 'Google Maps API', 'MQTT Protocol'],
        impact: 'Successfully deployed in wheelchair marathon events. Enabled live spectator tracking and post-race performance analysis for athletes.',
    },
    'wheelsense': {
        era: 'Era 04 — Intelligence',
        color: '#60A5FA',
        title: 'WheelSense',
        overview: 'The pinnacle of our innovation — an AI-powered smart environment that transforms the wheelchair into an intelligent companion.',
        problem: 'Wheelchair users in home environments face challenges controlling smart devices, monitoring their surroundings, and maintaining independence.',
        solution: 'WheelSense integrates computer vision (YOLO object detection), voice control, and smart home automation. The system understands user context, detects activities and risks, and provides seamless control of home devices.',
        technology: ['ESP32-S3 with Camera', 'YOLOv8 Object Detection', 'Home Assistant Integration', 'MCP (Model Context Protocol)', 'Node-RED Automation', 'TinyML On-device Processing'],
        impact: 'Creates a complete smart living ecosystem for wheelchair users. Voice-controlled home automation, real-time activity monitoring, and predictive safety alerts.',
    },
};

document.addEventListener('DOMContentLoaded', () => {
    // Loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('is-hidden');
        setTimeout(() => loader.remove(), 600);
    }, 800);

    createNavbar('projects');
    createFooter();
    initSmoothScroll();
    initScrollAnimations();

    // Project card click -> detail view
    const cards = document.querySelectorAll('.project-card');
    const detail = document.getElementById('projectDetail');
    const detailContent = document.getElementById('projectDetailContent');
    const detailClose = document.getElementById('projectDetailClose');

    cards.forEach(card => {
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
                ${data.technology.map(t => `<span style="font-size: var(--text-small); color: var(--color-text-secondary); padding: 6px 16px; border-radius: var(--radius-full); border: 1px solid rgba(255,255,255,0.08);">${t}</span>`).join('')}
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

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            detail.classList.remove('is-open');
            document.body.style.overflow = '';
        }
    });
});
