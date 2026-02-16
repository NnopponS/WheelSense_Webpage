// Projects page (TypeScript)
import { createNavbar } from '../components/navbar.ts';
import { createFooter } from '../components/footer.ts';
import { initSmoothScroll } from '../components/smooth-scroll.ts';
import { initScrollAnimations } from '../components/scroll-animations.ts';
import { applyPageOverrides } from '../components/page-content.ts';

type ProjectData = {
    era: string;
    color: string;
    title: string;
    overview: string;
    problem: string;
    solution: string;
    technology: string[];
    impact: string;
    videoEmbed: string;
};

type EmbedOptions = {
    autoplay?: boolean;
    mute?: boolean;
    loop?: boolean;
    controls?: boolean;
};

const projectData: Record<string, ProjectData> = {
    'yes-wheelchair': {
        era: 'Era 01 - Digitization',
        color: '#34D399',
        title: 'YES Wheelchair',
        overview: 'The first step in our journey: embedding IoT sensors into wheelchairs to transform physical movement into measurable, actionable data.',
        problem: 'Wheelchair users often lack visibility into daily activity, health metrics, and safety status. Caregivers cannot reliably monitor falls or unusual patterns remotely.',
        solution: 'We designed and integrated a sensor array with accelerometers, gyroscopes, and distance tracking into the wheelchair frame. A companion app displays real-time metrics including distance, speed, calories, and fall alerts.',
        technology: ['ESP32 Microcontroller', 'MPU6050 IMU Sensor', 'Ultrasonic Distance Sensor', 'Bluetooth Low Energy', 'Flutter Mobile App'],
        impact: 'Established the foundational IoT architecture for later generations and achieved high fall-detection reliability.',
        videoEmbed: 'https://www.youtube.com/embed/iOWTV3rmhbo',
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
        videoEmbed: 'https://www.youtube.com/embed/DeMcUm_TiKc',
    },
    'marathon-racing': {
        era: 'Era 03 - Expansion',
        color: '#FB923C',
        title: 'smartVibe',
        overview: 'smartVibe extends the platform to outdoor intelligent mobility experiences and live telemetry scenarios.',
        problem: 'Outdoor activity and event scenarios need reliable tracking, status visibility, and motivating interaction feedback for users and teams.',
        solution: 'smartVibe combines route context, telemetry visualization, and adaptive interaction cues for real-time outdoor mobility sessions.',
        technology: ['GPS Telemetry', '4G Connectivity', 'Real-Time Dashboard', 'Route Mapping', 'Adaptive Interaction Layer'],
        impact: 'Expanded WheelSense into field-scale smart mobility experiences with measurable engagement and analytics.',
        videoEmbed: 'https://www.youtube.com/embed/poNDNRhPYCk',
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
        videoEmbed: 'https://www.youtube.com/embed/kkGf6-B96K0',
    },
};

function extractYoutubeVideoId(embedUrl: string): string {
    const match = embedUrl.match(/embed\/([a-zA-Z0-9_-]{6,})/);
    return match ? match[1] : '';
}

function buildYoutubeEmbedUrl(embedUrl: string, options: EmbedOptions = {}): string {
    const videoId = extractYoutubeVideoId(embedUrl);
    if (!videoId) {
        return embedUrl;
    }

    const autoplay = options.autoplay ? 1 : 0;
    const mute = options.mute ? 1 : 0;
    const loop = options.loop ? 1 : 0;
    const controls = options.controls === false ? 0 : 1;

    const params = new URLSearchParams({
        autoplay: String(autoplay),
        mute: String(mute),
        loop: String(loop),
        controls: String(controls),
        playsinline: '1',
        rel: '0',
        modestbranding: '1',
    });

    if (loop) {
        params.set('playlist', videoId);
    }

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function initVideoPreview(card: Element): void {
    const projectId = (card as HTMLElement).dataset.project || '';
    const data = projectData[projectId];
    if (!data) return;

    const visual = card.querySelector('.project-card__visual') as HTMLElement | null;
    if (!visual) return;

    const preview = document.createElement('iframe');
    preview.className = 'project-card__video-preview';
    preview.src = buildYoutubeEmbedUrl(data.videoEmbed, {
        autoplay: true,
        mute: true,
        loop: true,
        controls: false,
    });
    preview.loading = 'lazy';
    preview.tabIndex = -1;
    preview.setAttribute('aria-hidden', 'true');
    preview.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
    preview.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');

    const shade = document.createElement('div');
    shade.className = 'project-card__preview-shade';

    visual.prepend(shade);
    visual.prepend(preview);
}

document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('is-hidden');
            setTimeout(() => loader.remove(), 600);
        }, 800);
    }

    createNavbar('projects');
    createFooter();
    initSmoothScroll();

    const cards = document.querySelectorAll('.project-card');
    const detail = document.getElementById('projectDetail');
    const detailContent = document.getElementById('projectDetailContent');
    const detailClose = document.getElementById('projectDetailClose');

    cards.forEach((card) => {
        initVideoPreview(card);
    });

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            const projectId = (card as HTMLElement).dataset.project || '';
            const data = projectData[projectId];
            if (!data || !detail || !detailContent) return;

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
              <p class="project-section__label">Project Video</p>
              <div class="project-video">
                <iframe
                  src="${buildYoutubeEmbedUrl(data.videoEmbed, { autoplay: true, controls: true })}"
                  title="${data.title} video"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
            </div>

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

    detailClose?.addEventListener('click', () => {
        if (!detail) return;
        detail.classList.remove('is-open');
        document.body.style.overflow = '';
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && detail) {
            detail.classList.remove('is-open');
            document.body.style.overflow = '';
        }
    });

    await applyPageOverrides('projects');
    initScrollAnimations();
});


