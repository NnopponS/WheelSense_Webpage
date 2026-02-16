// Projects page (TypeScript)
import { createNavbar } from '../components/navbar.ts';
import { createFooter } from '../components/footer.ts';
import { initSmoothScroll } from '../components/smooth-scroll.ts';
import { initScrollAnimations } from '../components/scroll-animations.ts';
import { applyPageOverrides } from '../components/page-content.ts';

type ProjectMetric = {
    label: string;
    value: string;
};

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
    goals: string[];
    workflow: string[];
    deliverables: string[];
    metrics: ProjectMetric[];
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
        overview: 'The first generation that transformed a wheelchair into an IoT-enabled health and safety node.',
        problem: 'Wheelchair users and caregivers had no continuous visibility into mobility behavior, activity intensity, or emergency events such as falls.',
        solution: 'We integrated a sensor suite and edge firmware to capture movement, detect anomalies, and stream data to a mobile interface for day-to-day monitoring.',
        technology: ['ESP32', 'MPU6050 IMU', 'Ultrasonic Sensor', 'BLE', 'Flutter App', 'Firebase'],
        impact: 'Created the hardware/software foundation used by all later WheelSense generations and improved confidence in safety monitoring.',
        videoEmbed: 'https://www.youtube.com/embed/iOWTV3rmhbo',
        goals: [
            'Record wheelchair activity in real time using embedded sensors.',
            'Detect fall-like events and send alert notifications to caregivers.',
            'Make daily mobility data visible through a simple app dashboard.',
        ],
        workflow: [
            'Collect movement and orientation signals from onboard sensors.',
            'Run edge processing for event detection and filtered telemetry.',
            'Sync metrics to a mobile app for trend visualization and alerts.',
        ],
        deliverables: [
            'Sensor-integrated wheelchair prototype.',
            'Realtime monitoring mobile application.',
            'Fall alert and activity analytics module.',
        ],
        metrics: [
            { label: 'System Focus', value: 'Safety + Activity' },
            { label: 'Core Modality', value: 'IoT Telemetry' },
            { label: 'Deployment Type', value: 'On-chair Edge + App' },
            { label: 'Generation', value: 'Foundational Platform' },
        ],
    },
    'all-wheelchair': {
        era: 'Era 02 - Interaction',
        color: '#A78BFA',
        title: 'ALL Wheelchair',
        overview: 'A rehabilitation platform that converts wheelchair movement into game interactions for exergaming-based therapy.',
        problem: 'Conventional rehabilitation can feel repetitive and low-motivation, which reduces consistency and weakens long-term outcomes.',
        solution: 'We mapped wheelchair motion to interactive game mechanics so users could perform therapeutic movement through engaging sessions.',
        technology: ['Motion Tracking', 'Unity Engine', 'WebSocket', 'Bluetooth HID', 'Custom Controller'],
        impact: 'Increased rehabilitation engagement and generated data-driven insights for exercise progress and system tuning.',
        videoEmbed: 'https://www.youtube.com/embed/DeMcUm_TiKc',
        goals: [
            'Increase rehabilitation adherence with playful interaction loops.',
            'Capture physical movement performance during each session.',
            'Provide immediate feedback for both users and coaches.',
        ],
        workflow: [
            'Read wheelchair motion events through a custom tracking layer.',
            'Translate motion vectors into game commands with low latency.',
            'Log session performance and progression indicators.',
        ],
        deliverables: [
            'Wheelchair-driven exergaming prototype.',
            'Realtime score and movement dashboard.',
            'Motion calibration profile for therapy use.',
        ],
        metrics: [
            { label: 'System Focus', value: 'Rehabilitation Engagement' },
            { label: 'Core Modality', value: 'Motion-Controlled Games' },
            { label: 'Session Type', value: 'Interactive Therapy' },
            { label: 'Generation', value: 'Human Interaction Layer' },
        ],
    },
    'marathon-racing': {
        era: 'Era 03 - Expansion',
        color: '#FB923C',
        title: 'smartVibe',
        overview: 'A field-ready mobility intelligence platform for outdoor sessions, adaptive feedback, and live telemetry experiences.',
        problem: 'Outdoor activities and events require stable tracking, route awareness, and responsive interaction beyond indoor lab environments.',
        solution: 'smartVibe combines telemetry streaming, context-aware feedback, and event-level dashboards to support real-world wheelchair mobility scenarios.',
        technology: ['GPS', '4G LTE', 'Realtime Dashboard', 'Route Mapping', 'Adaptive Feedback Layer'],
        impact: 'Extended WheelSense capabilities into outdoor and event-scale operations with measurable observability.',
        videoEmbed: 'https://www.youtube.com/embed/poNDNRhPYCk',
        goals: [
            'Track route-level mobility data in outdoor environments.',
            'Enable live status visibility for teams and event organizers.',
            'Deliver adaptive prompts based on session context.',
        ],
        workflow: [
            'Stream location and activity packets via cellular connectivity.',
            'Process route and session state into operator dashboards.',
            'Apply adaptive interaction cues during live mobility sessions.',
        ],
        deliverables: [
            'Outdoor telemetry stack with live dashboard.',
            'Route intelligence and status feed module.',
            'Event-ready tracking interface for support teams.',
        ],
        metrics: [
            { label: 'System Focus', value: 'Outdoor Mobility Intelligence' },
            { label: 'Core Modality', value: 'Realtime Telemetry' },
            { label: 'Coverage', value: 'Field + Event Scale' },
            { label: 'Generation', value: 'Expansion Platform' },
        ],
    },
    wheelsense: {
        era: 'Era 04 - Intelligence',
        color: '#60A5FA',
        title: 'WheelSense',
        overview: 'An AI-powered assistive ecosystem that links vision, voice, and smart-home automation into daily wheelchair experience.',
        problem: 'Users need intuitive and context-aware assistance indoors, where manual control of multiple devices can be complex and fatiguing.',
        solution: 'WheelSense integrates computer vision, natural-language interaction, and automation pipelines to make home environments safer and easier to control.',
        technology: ['ESP32-S3 Camera', 'YOLO', 'Home Assistant', 'MCP', 'Node-RED', 'TinyML'],
        impact: 'Moves assistive mobility from passive tools to proactive, intelligent support for everyday life.',
        videoEmbed: 'https://www.youtube.com/embed/kkGf6-B96K0',
        goals: [
            'Understand user context and nearby objects through vision.',
            'Offer natural-language control for smart-home devices.',
            'Orchestrate reliable automations for daily routines.',
        ],
        workflow: [
            'Capture environment data from camera and embedded sensors.',
            'Run AI inference and command interpretation pipelines.',
            'Trigger smart-home actions with safety-aware automation rules.',
        ],
        deliverables: [
            'AI-enhanced wheelchair interaction architecture.',
            'Smart-home assistant integration with MCP workflows.',
            'Context-aware automation and control dashboard.',
        ],
        metrics: [
            { label: 'System Focus', value: 'AI Assistive Intelligence' },
            { label: 'Core Modality', value: 'Vision + Voice + Automation' },
            { label: 'Environment', value: 'Smart Home Integration' },
            { label: 'Generation', value: 'Intelligent Companion' },
        ],
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

function renderList(items: string[]): string {
    return `<ul class="project-panel__list">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
}

function renderProjectDetail(data: ProjectData): string {
    return `
    <div class="project-detail__hero">
      <div class="project-detail__hero-bg" style="background: linear-gradient(140deg, ${data.color}3a, transparent 60%);"></div>
      <div class="container container-wide" style="position: relative; z-index: 1;">
        <div class="project-detail__hero-shell">
          <p class="project-detail__hero-kicker" style="color: ${data.color};">${data.era}</p>
          <h1 class="project-detail__hero-title">${data.title}</h1>
          <p class="project-detail__hero-overview">${data.overview}</p>
          <div class="project-detail__hero-chips">
            ${data.technology.slice(0, 4).map((item) => `<span class="project-chip">${item}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>

    <div class="project-detail__sections">
      <div class="container container-wide">
        <section class="project-detail-layout">
          <article class="project-panel project-panel--video">
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
            <div class="project-columns project-columns--mini">
              <div class="project-column">
                <p class="project-section__label">Project Goals</p>
                ${renderList(data.goals)}
              </div>
              <div class="project-column">
                <p class="project-section__label">System Workflow</p>
                ${renderList(data.workflow)}
              </div>
            </div>
          </article>

          <article class="project-panel">
            <p class="project-section__label">Engineering Snapshot</p>
            <div class="project-kpi-grid">
              ${data.metrics
                    .map(
                        (metric) => `
                  <div class="project-kpi">
                    <p class="project-kpi__label">${metric.label}</p>
                    <p class="project-kpi__value">${metric.value}</p>
                  </div>
                `,
                    )
                    .join('')}
            </div>

            <div class="project-columns">
              <div class="project-column">
                <p class="project-section__label">The Problem</p>
                <p class="project-panel__text">${data.problem}</p>
              </div>
              <div class="project-column">
                <p class="project-section__label">Our Solution</p>
                <p class="project-panel__text">${data.solution}</p>
              </div>
              <div class="project-column">
                <p class="project-section__label">Measured Impact</p>
                <p class="project-panel__text">${data.impact}</p>
              </div>
            </div>
          </article>
        </section>

        <section class="project-panel project-panel--tech">
          <p class="project-section__label">Technology Stack</p>
          <div class="project-tech-cloud">
            ${data.technology.map((item) => `<span class="project-tech-pill">${item}</span>`).join('')}
          </div>
          <div class="project-panel__divider"></div>
          <p class="project-section__label">Key Deliverables</p>
          ${renderList(data.deliverables)}
        </section>
      </div>
    </div>
  `;
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

    const openProjectDetail = (projectId: string): void => {
        const data = projectData[projectId];
        if (!data || !detail || !detailContent) return;

        detailContent.innerHTML = renderProjectDetail(data);
        detail.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        detail.scrollTop = 0;
    };

    cards.forEach((card) => {
        initVideoPreview(card);
    });

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            const projectId = (card as HTMLElement).dataset.project || '';
            openProjectDetail(projectId);
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

    const params = new URLSearchParams(window.location.search);
    const initialProject = params.get('project') || '';
    if (initialProject && projectData[initialProject]) {
        openProjectDetail(initialProject);
    }

    await applyPageOverrides('projects');
    initScrollAnimations();
});
