// Projects page (TypeScript)
import { createNavbar } from '../components/navbar';
import { createFooter } from '../components/footer';
import { initSmoothScroll } from '../components/smooth-scroll';
import { initScrollAnimations } from '../components/scroll-animations';
import { applyPageOverrides } from '../components/page-content';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

type ProjectMetric = {
    label: string;
    value: string;
};

type ProjectDocumentationTable = {
    title: string;
    columns: string[];
    rows: string[][];
};

type ProjectScreenshot = {
    src?: string;
    alt: string;
    caption: string;
};

type ProjectScreenshotGroup = {
    title: string;
    screenshots: ProjectScreenshot[];
    /** 'wide' = auto-fill columns for many tiles (e.g. web dashboard) */
    gridVariant?: 'default' | 'wide';
};

type ProjectDocumentationCaptureSection = {
    title: string;
    description: string;
    resultNote: string;
    table: ProjectDocumentationTable;
    /** Optional thumbnails next to this block (e.g. realtime plot) */
    screenshots?: ProjectScreenshot[];
};

type ProjectDocumentationDistanceSection = {
    title: string;
    description: string;
    resultNote: string;
    table: ProjectDocumentationTable;
    /** Optional thumbnails next to this block (e.g. session digest / distance overlays) */
    screenshots?: ProjectScreenshot[];
};

type ProjectDocumentationInterfaceSection = {
    title: string;
    bullets: string[];
    screenshots?: ProjectScreenshot[];
};

type ProjectDocumentationGamesSection = {
    title: string;
    bullets: string[];
    summaryNote: string;
    benchmarkTables: ProjectDocumentationTable[];
    /** Arcade / web evidence thumbnails */
    screenshots?: ProjectScreenshot[];
};

type ProjectDocumentation = {
    title: string;
    figure?: {
        src?: string;
        alt: string;
    };
    keyFacts: string[];
    /** Session / gameplay thumbnails not tied to Interface & Workflow (e.g. arcade captures, analytics pipeline) */
    evidenceScreenshotGroup?: ProjectScreenshotGroup;
    /** Web dashboard: score logs, overview tables, motion analysis, raw traces, auth history */
    websiteAnalyticsGroup?: ProjectScreenshotGroup;
    continuousCapture: ProjectDocumentationCaptureSection;
    distanceValidation: ProjectDocumentationDistanceSection;
    interfaceWorkflow: ProjectDocumentationInterfaceSection;
    motionGames: ProjectDocumentationGamesSection;
};

type ProjectPaper = {
    title: string;
    venue: string;
    authors: string;
    pageRange: string;
    startPage: number;
    totalPages: number;
    fileUrl: string;
    previewUrl: string;
    note: string;
    ctaLabel?: string;
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
    documentation?: ProjectDocumentation;
    paper?: ProjectPaper;
    /** Optional hero CTA (e.g. Google Drive folder for prototype download). */
    downloadUrl?: string;
    downloadLabel?: string;
    downloadHint?: string;
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
        overview: 'A motion-controlled rehabilitation platform that converts wheelchair movement into game interactions, while logging performance data for analysis and progress tracking.',
        problem: 'Rehabilitation can be repetitive, and it is difficult to quantify wheelchair movement performance consistently across sessions.',
        solution: 'We map wheelchair motion into game controls and capture session telemetry for realtime plotting and post-session analysis.',
        technology: ['Motion Tracking', 'Unity Engine', 'WebSocket', 'Bluetooth HID', 'Custom Controller'],
        impact: 'System validation showed stable 10 Hz capture (0.0014–0.04% error) and low distance error (0.007–0.048%) across 10–50 m trials.',
        videoEmbed: 'https://www.youtube.com/embed/DeMcUm_TiKc',
        goals: [
            'Increase rehabilitation adherence with playful interaction loops.',
            'Capture physical movement performance during each session.',
            'Provide immediate feedback for both users and coaches.',
        ],
        workflow: [
            'Read wheelchair motion events through a custom tracking layer.',
            'Translate motion vectors into game commands with low latency.',
            'Log session performance (distance, wheel rotations, heart rate) and compute analysis summaries.',
        ],
        deliverables: [
            'Wheelchair-driven exergaming prototype with motion-to-input mapping.',
            'Authentication + registration + password reset user flows.',
            'Bluetooth scanning and device reconnection support.',
            'Realtime graph capture and post-session analysis views.',
            'Game ranking and score history pages backed by persistent storage.',
        ],
        metrics: [
            { label: 'Continuous Capture (10 Hz)', value: '0.0014–0.04% error (1–5 min)' },
            { label: 'Distance Validation', value: '0.007–0.048% error (10–50 m)' },
            { label: 'Games Tested', value: 'Alien Invasion, Bouncing Ball, Lucky Bird' },
            { label: 'Tracked Signals', value: 'Wheel rotations, distance, heart rate' },
        ],
        downloadUrl:
            'https://drive.google.com/drive/folders/1HOcf0TTHFIXgkqvoQrKlwbhs7fnDdabH?usp=sharing',
        downloadLabel: 'Download ALL Wheelchair',
        downloadHint: 'Google Drive folder · ALL Wheelchair.rar (~336 MB)',
        documentation: {
            title: 'Documentation',
            figure: {
                src: '/assets/projects/all-wheelchair/fig-4-9-realtime-graph.png',
                alt: 'Realtime telemetry overview',
            },
            keyFacts: [
                'Streams 3 concurrent signals: 2× XIAO nRF52840 Sense (IMU) + 1× Polar Verity Sense (heart rate).',
                'Continuous sampling at 10 Hz for validation runs.',
                'Realtime plotting plus saved sessions support distance/speed summaries, energy, heart rate, session duration.',
                'Wheel motion mapped using gyroscope Z-axis angular rate aligned with the wheel axes; supplementary accel cues when rotational rate is low.',
                'IMU-derived motion maps to HID keyboard semantics for gameplay and desktop control interoperability.',
            ],
            evidenceScreenshotGroup: {
                title: 'Gameplay and ranking captures',
                screenshots: [
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-14.png',
                        alt: 'Alien Invasion gameplay',
                        caption:
                            'Alien Invasion: wheelchair motion mapped to lateral dodge and auto-fire cadence.',
                    },
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-15.png',
                        alt: 'Bouncing Ball gameplay',
                        caption:
                            'Bouncing Ball: paddle steering from wheel gyro thresholds with progressive brick difficulty.',
                    },
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-16.png',
                        alt: 'Lucky Bird gameplay',
                        caption:
                            'Lucky Bird: dual-wheel flaps drive lift through obstacle corridors.',
                    },
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-17.png',
                        alt: 'Arcade ranking overlay',
                        caption:
                            'Post-session ranking surfaces personal score plus top-five leaderboard rows.',
                    },
                ],
            },
            websiteAnalyticsGroup: {
                title: 'Web dashboard: scores, motion data, and usage history',
                gridVariant: 'wide',
                screenshots: [
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-20.png',
                        alt: 'Recent score records',
                        caption:
                            'Per-game score history with timestamps, session span, and accuracy labels plus running average.',
                    },
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-21.png',
                        alt: 'Overview data table',
                        caption:
                            'Overview Data tab: per-session time usage, wheel rotations, distances, velocities, and power columns.',
                    },
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-22.png',
                        alt: 'Motion analysis table view',
                        caption:
                            'Motion analysis in table form: dual IMU accelerometer samples and wheel degree traces per timestep.',
                    },
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-23.png',
                        alt: 'Motion analysis graph view',
                        caption:
                            'Graph view overlaying Accel X1 and Accel X2 pairs for the selected capture.',
                    },
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-24.png',
                        alt: 'Raw distance traces',
                        caption:
                            'Raw distance channels for both wheels to audit speed and drift against sessions.',
                    },
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-25.png',
                        alt: 'Sign-in history',
                        caption:
                            'Login and logout audit trail to review account usage over time.',
                    },
                ],
            },
            continuousCapture: {
                title: 'Continuous data capture (2 sensors, 10 Hz)',
                description:
                    'Continuous streaming was tested using two sensors at 10 Hz for 1–5 minutes (five trials per duration). Error rates remained very low.',
                table: {
                    title: 'Continuous capture (10 Hz)',
                    columns: ['Duration (min)', 'Data sets', 'Error (%)'],
                    rows: [
                        ['1', '577', '0.04'],
                        ['2', '1,197', '0.0025'],
                        ['3', '1,785', '0.0083'],
                        ['4', '2,396', '0.0014'],
                        ['5', '2,989', '0.0035'],
                    ],
                },
                resultNote:
                    'Result: stable continuous capture with 0.0014–0.04% error across the tested durations.',
                screenshots: [
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-9-realtime-graph.png',
                        alt: 'Realtime accel/gyro canvases',
                        caption:
                            'Realtime canvases multiplex accelerometer / gyroscopic plots with Bluetooth status indicators.',
                    },
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-13.png',
                        alt: 'Gyro Z response while wheels spin',
                        caption:
                            'Gyro Z shows clear deflection when wheels spin; below the gyro threshold, control can fall back to accelerometer cues on X/Y.',
                    },
                ],
            },
            distanceValidation: {
                title: 'Distance estimation (flat ground)',
                description:
                    'Distance estimation was tested at 10, 20, 30, 40, and 50 meters (five trials per distance) on flat walkways.',
                table: {
                    title: 'Distance validation (flat ground)',
                    columns: ['Target distance (m)', 'Measured distance (m)', 'Error (%)'],
                    rows: [
                        ['10', '9.52', '0.048'],
                        ['20', '20.18', '0.009'],
                        ['30', '29.77', '0.007'],
                        ['40', '39.53', '0.011'],
                        ['50', '49.60', '0.008'],
                    ],
                },
                resultNote:
                    'Result: distance error within 0.007–0.048% for 10–50 m.',
                screenshots: [
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-10-analysis-results.png',
                        alt: 'Session digest overlays',
                        caption:
                            'Session digest overlays stitched distance and velocity timelines with rollup statistics.',
                    },
                ],
            },
            interfaceWorkflow: {
                title: 'Interface & Workflow Testing',
                bullets: [
                    'Login: credential checks against stored users; empty fields cannot be submitted; invalid inputs show alert messaging.',
                    'Registration: required wheelchair profile fields for evaluation; duplicate username checks; completeness validation with alerts.',
                    'Password reset: requires a known username and matching password confirmation before saving a new password.',
                    'Main dashboard: hub for sign-out, Bluetooth scan, launching games, Controller mode, Street View, and Admin plotting tools.',
                    'Bluetooth scan: shows device name + address; saves address for reconnect; supports swapping devices or editing the stored address.',
                    'Realtime capture + analysis: maintains Bluetooth connection; plots realtime graphs; then computes session summaries (distance/speed, averages/maxima, duration, energy, heart rate) from 3 concurrent streams (2× IMU + 1× HR).',
                    'Web dashboard: selectable game views with ranking and score history; supports sharing score information to LINE.',
                ],
                screenshots: [
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-1-login.png',
                        alt: 'Login screen',
                        caption:
                            'Login: credential checks; empty submissions blocked; alerts on invalid attempts.',
                    },
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-2-login-invalid.png',
                        alt: 'Login validation warning',
                        caption:
                            'Invalid credentials show a warning before login can succeed.',
                    },
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-3-registration.png',
                        alt: 'Registration screen',
                        caption:
                            'Registration: wheelchair profile inputs for clinician review; duplicate-user checks plus completeness alerts.',
                    },
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-4-registration-invalid.png',
                        alt: 'Registration validation',
                        caption:
                            'Duplicate username and other validation failures raise blocking warnings before submit.',
                    },
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-5-password-reset.png',
                        alt: 'Password reset flow',
                        caption:
                            'Password reset: enter username, new password, and confirmation before submit.',
                    },
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-6-password-reset-invalid.png',
                        alt: 'Password confirmation mismatch',
                        caption:
                            'Mismatched confirmation password blocks submit with a clear message.',
                    },
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-7-main-hub.png',
                        alt: 'Main dashboard',
                        caption:
                            'Main hub: game shortcuts, Scanner, Controller, Street View, Admin, and sign-out.',
                    },
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-8-bluetooth-scan.png',
                        alt: 'Bluetooth device scan',
                        caption:
                            'Scan surfaces paired device names with MAC-style addresses for reconnect.',
                    },
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-11-controller-mode.png',
                        alt: 'Controller mapping console',
                        caption:
                            'Controller mapping: wheel-triggered keys with configurable directional palettes.',
                    },
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-12-street-view.png',
                        alt: 'Street View mode',
                        caption:
                            'Street View AR: Google Maps panoramas in-app for seated exploration.',
                    },
                ],
            },
            motionGames: {
                title: 'Motion-Controlled Games (Functional Testing)',
                summaryNote:
                    'Sessions (1–5 minutes) relate gameplay performance to distance traveled, wheel rotations, and heart rate.',
                bullets: [
                    'Motion-to-input uses IMU-to-keyboard translation.',
                    'Tested games: Alien Invasion, Bouncing Ball, and Lucky Bird.',
                    'Primary control signal: gyroscope angular velocity on the Z axis, aligned with wheel rotation.',
                    'Alien Invasion uses per-wheel rotation detection above ~80 °/s to map sideways movement plus auto-fire pacing.',
                    'Bouncing Ball uses similar >80 °/s gating with progressive difficulty ramps as bricks break.',
                    'Lucky Bird uses simultaneous dual-wheel input above ~40 °/s to trigger lift/flap interactions with tuned obstacle spacing.',
                ],
                benchmarkTables: [
                    {
                        title: 'Bench — Alien Invasion',
                        columns: ['Duration (min)', 'Wheel rotations', 'Distance (m)', 'Avg HR'],
                        rows: [
                            ['1', '33.59', '63.32', '77.63'],
                            ['2', '39.66', '74.76', '78.49'],
                            ['3', '45.97', '86.65', '80.31'],
                            ['4', '52.40', '98.78', '83.51'],
                            ['5', '77.60', '146.28', '86.26'],
                        ],
                    },
                    {
                        title: 'Bench — Bouncing Ball',
                        columns: ['Duration (min)', 'Wheel rotations', 'Distance (m)', 'Avg HR'],
                        rows: [
                            ['1', '2.8', '5.36', '71.56'],
                            ['2', '8.11', '15.29', '73.48'],
                            ['3', '18.17', '34.25', '73.94'],
                            ['4', '28.76', '54.20', '75.30'],
                            ['5', '39.95', '75.31', '78.61'],
                        ],
                    },
                    {
                        title: 'Bench — Lucky Bird',
                        columns: ['Duration (min)', 'Wheel rotations', 'Distance (m)', 'Avg HR'],
                        rows: [
                            ['1', '10.85', '20.45', '77.85'],
                            ['2', '18.29', '34.36', '79.54'],
                            ['3', '27.70', '52.21', '80.80'],
                            ['4', '36.23', '68.28', '82.56'],
                            ['5', '46.50', '87.66', '84.87'],
                        ],
                    },
                ],
                screenshots: [
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-18.png',
                        alt: 'Web dashboard overview',
                        caption:
                            'Web hub: game picker, ranking tabs, motion summaries, and share-to-LINE affordances.',
                    },
                    {
                        src: '/assets/projects/all-wheelchair/fig-4-19-website-ranking.png',
                        alt: 'Web leaderboard kiosk',
                        caption:
                            'Web leaderboard: selectable game views; Top scores; supports sharing scores to LINE.',
                    },
                ],
            },
        },
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
        paper: {
            title: 'Comparative Performance Evaluation of BLE-Based Indoor Motion Tracking Using Machine Learning and Large Language Models',
            venue: 'ECTI-CON 2026 Proceedings',
            authors: 'Worapon Sangsasri, Suppawit Ausawalaithong, Darawadee Panich, Sairag Saadprai, and Supachai Vorapojpisut',
            pageRange: 'Full proceedings - starts at page 805',
            startPage: 805,
            totalPages: 1143,
            fileUrl: '/assets/projects/wheelsense/ecti-con2026-proceedings-full.pdf',
            previewUrl: '/assets/projects/wheelsense/ecti-con2026-proceedings-full.pdf#page=805&zoom=page-width',
            note: 'The full ECTI-CON 2026 proceedings are embedded here so readers start at the WheelSense paper and can still scroll through the other papers and titles.',
            ctaLabel: 'Preview Proceedings',
        },
        metrics: [
            { label: 'System Focus', value: 'AI Assistive Intelligence' },
            { label: 'Core Modality', value: 'Vision + Voice + Automation' },
            { label: 'Environment', value: 'Smart Home Integration' },
            { label: 'Generation', value: 'Intelligent Companion' },
        ],
    },
    easeai: {
        era: 'Era 05 - Integration',
        color: '#F472B6',
        title: 'EASE AI',
        overview: 'An AI-driven HealthTech system that integrates sensing, localization, and smart home automation for continuous, preventive care.',
        problem: 'Most assistive tech targets clinical settings or lacks continuous monitoring and context-aware integration for home use.',
        solution: 'Developed an AI caregiver ecosystem with a contract-driven control pipeline to safely orchestrate smart environments and alert caregivers to verified anomalies.',
        technology: ['Arduino Connect', 'Polar Verity', 'Pico W', 'MCP Pipeline', 'Home Assistant'],
        impact: 'Provided independent living support, improved detection accuracy, and reduced caregiver burden via a secure workflow.',
        videoEmbed: '',
        goals: [
            'Enable continuous behavioral analysis for wheelchair users.',
            'Trigger intelligent smart home automation deterministically.',
            'Alleviate caregiver burden through verified real-time alerts.',
        ],
        workflow: [
            'Collect IMU, HR, and RSSI location data centrally.',
            'Process context using constrained LLM and knowledge RAG.',
            'Validate actions explicitly before smart-home execution.',
        ],
        deliverables: [
            'Wearable sensor and Bluetooth anchor network.',
            'Secure multi-layer execution AI pipeline.',
            'Web platform and caregiver mobile dashboard.',
        ],
        metrics: [
            { label: 'System Focus', value: 'Proactive HealthTech' },
            { label: 'Core Modality', value: 'Continuous Health AI' },
            { label: 'Environment', value: 'Smart Care Facilities' },
            { label: 'Generation', value: 'Unified Platform' },
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

    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

function initVideoPreview(card: Element): void {
    const projectId = (card as HTMLElement).dataset.project || '';
    const data = projectData[projectId];
    if (!data) return;

    const visual = card.querySelector('.project-card__visual') as HTMLElement | null;
    if (!visual) return;

    const shade = document.createElement('div');
    shade.className = 'project-card__preview-shade';
    visual.prepend(shade);

    if (data.videoEmbed) {
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
        visual.prepend(preview);
    } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'project-card__video-preview';
        placeholder.style.background = '#050812';
        placeholder.style.display = 'flex';
        placeholder.style.alignItems = 'center';
        placeholder.style.justifyContent = 'center';
        placeholder.style.color = 'var(--color-text-tertiary)';
        placeholder.style.fontSize = '0.7rem';
        placeholder.style.letterSpacing = 'var(--tracking-wider)';
        placeholder.style.textTransform = 'uppercase';
        placeholder.style.zIndex = '0';
        placeholder.innerHTML = '<span>Coming Soon</span>';
        visual.prepend(placeholder);
    }
}

function renderList(items: string[]): string {
    return `<ul class="project-panel__list">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
}

function renderScreenshotCard(screenshot: ProjectScreenshot): string {
    const hasImage = Boolean(screenshot.src);
    const mediaMarkup = hasImage
        ? `<img src="${screenshot.src}" alt="${screenshot.alt}" loading="lazy" />`
        : `<div class="doc-figure__placeholder">Screenshot pending</div>`;

    return `
      <figure class="doc-figure">
        <div class="doc-figure__media">
          ${mediaMarkup}
        </div>
        <figcaption class="doc-figure__caption">${screenshot.caption}</figcaption>
      </figure>
    `;
}

function renderDocumentationTable(table: ProjectDocumentationTable): string {
    return `
      <div class="doc-table-wrap">
        <div class="doc-table__title">${table.title}</div>
        <div class="doc-table-scroll">
          <table class="doc-table">
            <thead>
              <tr>
                ${table.columns.map((col) => `<th>${col}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${table.rows
                  .map(
                      (row) => `
              <tr>
                ${row.map((cell) => `<td>${cell}</td>`).join('')}
              </tr>
            `,
                  )
                  .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
}

function renderScreenshotGroup(group: ProjectScreenshotGroup): string {
    const gridClass =
        group.gridVariant === 'wide'
            ? 'doc-screenshot-grid doc-screenshot-grid--wide'
            : 'doc-screenshot-grid';

    return `
      <div class="doc-group-wrap">
        <div class="doc-group-title">${group.title}</div>
        <div class="${gridClass}">
          ${group.screenshots.map((shot) => renderScreenshotCard(shot)).join('')}
        </div>
      </div>
    `;
}

function renderPaperPreview(paper: ProjectPaper, accentColor: string): string {
    return `
        <section class="project-panel project-paper-preview" style="--paper-accent: ${accentColor}">
          <div class="project-paper-preview__header">
            <div class="project-paper-preview__copy">
              <p class="project-section__label">Paper Preview</p>
              <h2 class="project-paper-preview__title">${paper.title}</h2>
              <p class="project-paper-preview__meta">${paper.venue} - ${paper.pageRange}</p>
              <p class="project-paper-preview__authors">${paper.authors}</p>
              <p class="project-paper-preview__note">${paper.note}</p>
            </div>
            <a
              class="project-detail__download-btn project-detail__download-btn--paper"
              href="${paper.previewUrl}"
              target="_blank"
              rel="noopener noreferrer"
              style="--download-accent: ${accentColor};"
              aria-label="${paper.ctaLabel || 'Preview Paper'} - opens the PDF in a new tab"
            >
              <svg class="project-detail__download-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
              <span>${paper.ctaLabel || 'Preview Paper'}</span>
            </a>
          </div>
          <div class="project-paper-preview__frame-wrap">
            <div
              class="project-paper-viewer"
              data-pdf-viewer
              data-pdf-url="${paper.fileUrl}"
              data-pdf-start-page="${paper.startPage}"
              data-pdf-total-pages="${paper.totalPages}"
            >
              <div class="project-paper-viewer__toolbar" aria-label="PDF preview controls">
                <button class="project-paper-viewer__button" type="button" data-pdf-prev aria-label="Previous page">Prev</button>
                <label class="project-paper-viewer__page-control">
                  <span>Page</span>
                  <input type="number" min="1" max="${paper.totalPages}" value="${paper.startPage}" data-pdf-page-input />
                  <span data-pdf-page-count>/ ${paper.totalPages}</span>
                </label>
                <button class="project-paper-viewer__button" type="button" data-pdf-next aria-label="Next page">Next</button>
                <a class="project-paper-viewer__open" href="${paper.previewUrl}" target="_blank" rel="noopener noreferrer">Open full PDF</a>
              </div>
              <div class="project-paper-viewer__status" data-pdf-status>Loading full proceedings at page ${paper.startPage}...</div>
              <div class="project-paper-viewer__canvas-wrap">
                <canvas class="project-paper-viewer__canvas" data-pdf-canvas></canvas>
              </div>
            </div>
          </div>
        </section>
    `;
}

function clampPage(value: number, totalPages: number): number {
    if (!Number.isFinite(value)) return 1;
    return Math.min(Math.max(Math.round(value), 1), Math.max(totalPages, 1));
}

function initPaperPreview(root: ParentNode): void {
    const viewers = root.querySelectorAll<HTMLElement>('[data-pdf-viewer]');

    viewers.forEach((viewer) => {
        if (viewer.dataset.pdfInitialized === 'true') return;
        viewer.dataset.pdfInitialized = 'true';

        const pdfUrl = viewer.dataset.pdfUrl || '';
        const configuredStartPage = Number(viewer.dataset.pdfStartPage || '1');
        const configuredTotalPages = Number(viewer.dataset.pdfTotalPages || '1');
        const canvas = viewer.querySelector<HTMLCanvasElement>('[data-pdf-canvas]');
        const canvasWrap = viewer.querySelector<HTMLElement>('.project-paper-viewer__canvas-wrap');
        const status = viewer.querySelector<HTMLElement>('[data-pdf-status]');
        const pageInput = viewer.querySelector<HTMLInputElement>('[data-pdf-page-input]');
        const pageCount = viewer.querySelector<HTMLElement>('[data-pdf-page-count]');
        const prevButton = viewer.querySelector<HTMLButtonElement>('[data-pdf-prev]');
        const nextButton = viewer.querySelector<HTMLButtonElement>('[data-pdf-next]');

        if (!pdfUrl || !canvas || !canvasWrap || !status || !pageInput || !pageCount) {
            return;
        }

        const context = canvas.getContext('2d');
        if (!context) {
            status.textContent = 'PDF preview is unavailable in this browser.';
            return;
        }

        let totalPages = Math.max(configuredTotalPages, 1);
        let currentPage = clampPage(configuredStartPage, totalPages);
        let renderToken = 0;
        let pdfDocument: any = null;

        const setControlsDisabled = (isDisabled: boolean): void => {
            pageInput.disabled = isDisabled;
            if (prevButton) prevButton.disabled = isDisabled || currentPage <= 1;
            if (nextButton) nextButton.disabled = isDisabled || currentPage >= totalPages;
        };

        const syncControls = (): void => {
            pageInput.value = String(currentPage);
            pageInput.max = String(totalPages);
            pageCount.textContent = `/ ${totalPages}`;
            if (prevButton) prevButton.disabled = currentPage <= 1;
            if (nextButton) nextButton.disabled = currentPage >= totalPages;
        };

        const renderPage = async (pageNumber: number): Promise<void> => {
            if (!pdfDocument) return;

            const token = ++renderToken;
            currentPage = clampPage(pageNumber, totalPages);
            syncControls();
            setControlsDisabled(true);
            status.textContent = `Loading page ${currentPage} of ${totalPages}...`;

            try {
                const page = await pdfDocument.getPage(currentPage);
                if (token !== renderToken) return;

                const viewport = page.getViewport({ scale: 1 });
                const availableWidth = Math.max(canvasWrap.clientWidth - 24, 320);
                const scale = Math.min(Math.max(availableWidth / viewport.width, 0.35), 2.2);
                const scaledViewport = page.getViewport({ scale });
                const pixelRatio = window.devicePixelRatio || 1;

                canvas.width = Math.floor(scaledViewport.width * pixelRatio);
                canvas.height = Math.floor(scaledViewport.height * pixelRatio);
                canvas.style.width = `${Math.floor(scaledViewport.width)}px`;
                canvas.style.height = `${Math.floor(scaledViewport.height)}px`;

                await page.render({
                    canvasContext: context,
                    viewport: scaledViewport,
                    transform: pixelRatio !== 1 ? [pixelRatio, 0, 0, pixelRatio, 0, 0] : undefined,
                }).promise;

                if (token !== renderToken) return;
                status.textContent = `Showing page ${currentPage} of ${totalPages}.`;
            } catch (error) {
                status.textContent = 'Failed to render this PDF page. Use Open full PDF to view the source file.';
                console.error('PDF preview render failed', error);
            } finally {
                if (token === renderToken) {
                    setControlsDisabled(false);
                    syncControls();
                }
            }
        };

        const loadingTask = pdfjsLib.getDocument({
            url: pdfUrl,
            rangeChunkSize: 1024 * 1024,
            disableAutoFetch: false,
        });

        setControlsDisabled(true);
        loadingTask.promise
            .then((loadedDocument: any) => {
                pdfDocument = loadedDocument;
                totalPages = loadedDocument.numPages || totalPages;
                currentPage = clampPage(configuredStartPage, totalPages);
                syncControls();
                return renderPage(currentPage);
            })
            .catch((error: unknown) => {
                status.textContent = 'Failed to load PDF preview. Use Open full PDF to view the source file.';
                console.error('PDF preview load failed', error);
            });

        prevButton?.addEventListener('click', () => {
            void renderPage(currentPage - 1);
        });

        nextButton?.addEventListener('click', () => {
            void renderPage(currentPage + 1);
        });

        pageInput.addEventListener('change', () => {
            void renderPage(Number(pageInput.value));
        });
    });
}

function renderProjectDetail(data: ProjectData): string {
    const documentationMarkup = data.documentation
        ? `
        <section class="project-panel project-panel--documentation" style="--doc-accent: ${data.color}">
          <p class="project-section__label">${data.documentation.title}</p>

          <div class="doc-stack">
            <nav class="doc-toc" aria-label="Documentation sections">
              <span class="doc-toc__label">On this page</span>
              <a href="#doc-overview">Overview</a>
              <a href="#doc-system-validation">System validation</a>
              <a href="#doc-ui">Client UI</a>
              <a href="#doc-games">Games</a>
              <a href="#doc-arcade">Arcade captures</a>
              <a href="#doc-web">Web dashboard</a>
            </nav>

            <div class="doc-section" id="doc-overview">
              <div class="doc-intro">
                <figure class="doc-hero-figure">
                  ${
                      data.documentation.figure?.src
                          ? `<img src="${data.documentation.figure.src}" alt="${data.documentation.figure.alt}" loading="lazy" />`
                          : `<div class="doc-figure__media"><span class="doc-figure__placeholder">Featured visual pending</span></div>`
                  }
                </figure>
                <div class="doc-keyfacts doc-card">
                  <p class="project-section__label">Key Facts</p>
                  ${renderList(data.documentation.keyFacts)}
                </div>
              </div>
            </div>

            <div class="doc-section doc-section-grid" id="doc-system-validation">
              <div class="doc-card doc-validation-grid">
                <div>
                  <p class="project-section__label">${data.documentation.continuousCapture.title}</p>
                  <p class="project-panel__text" style="margin-bottom: 0.65rem;">${data.documentation.continuousCapture.description}</p>
                  ${renderDocumentationTable(data.documentation.continuousCapture.table)}
                  <p class="project-panel__text" style="margin-top: 0.65rem; margin-bottom: 0; color: var(--color-text-secondary); font-size: var(--text-small);">
                    ${data.documentation.continuousCapture.resultNote}
                  </p>
                </div>
                ${
                    data.documentation.continuousCapture.screenshots?.length
                        ? `
                <div class="doc-validation-grid__media doc-validation-grid__media--pair">
                  ${data.documentation.continuousCapture.screenshots.map((shot) => renderScreenshotCard(shot)).join('')}
                </div>
                `
                        : ''
                }
              </div>

              <div class="doc-card doc-validation-grid">
                <div>
                  <p class="project-section__label">${data.documentation.distanceValidation.title}</p>
                  <p class="project-panel__text" style="margin-bottom: 0.65rem;">${data.documentation.distanceValidation.description}</p>
                  ${renderDocumentationTable(data.documentation.distanceValidation.table)}
                  <p class="project-panel__text" style="margin-top: 0.65rem; margin-bottom: 0; color: var(--color-text-secondary); font-size: var(--text-small);">
                    ${data.documentation.distanceValidation.resultNote}
                  </p>
                </div>
                ${
                    data.documentation.distanceValidation.screenshots?.length
                        ? `
                <div class="doc-validation-grid__media doc-validation-grid__media--single">
                  ${data.documentation.distanceValidation.screenshots.map((shot) => renderScreenshotCard(shot)).join('')}
                </div>
                `
                        : ''
                }
              </div>
            </div>

            <div class="doc-section" id="doc-ui">
              <div class="doc-interface">
                <div class="doc-card">
                  <p class="project-section__label">${data.documentation.interfaceWorkflow.title}</p>
                  ${renderList(data.documentation.interfaceWorkflow.bullets)}
                </div>
                ${
                    data.documentation.interfaceWorkflow.screenshots?.length
                        ? `
                <div class="doc-card">
                  <p class="project-section__label">Screenshots</p>
                  <div class="doc-gallery doc-gallery--scroll">
                    ${data.documentation.interfaceWorkflow.screenshots.map((shot) => renderScreenshotCard(shot)).join('')}
                  </div>
                </div>
                `
                        : ''
                }
              </div>
            </div>

            <div class="doc-section" id="doc-games">
              <div class="doc-card">
                <p class="project-section__label">${data.documentation.motionGames.title}</p>
                ${data.documentation.motionGames.summaryNote ? `<p class="project-panel__text" style="margin-bottom: 0.65rem;">${data.documentation.motionGames.summaryNote}</p>` : ''}
                ${renderList(data.documentation.motionGames.bullets)}
                <div class="doc-benchmark-stack">
                  ${data.documentation.motionGames.benchmarkTables.map((tbl) => renderDocumentationTable(tbl)).join('')}
                </div>
                ${
                    data.documentation.motionGames.screenshots?.length
                        ? `
                <div class="doc-motion-web-grid">
                  ${data.documentation.motionGames.screenshots.map((shot) => renderScreenshotCard(shot)).join('')}
                </div>
                `
                        : ''
                }
              </div>
            </div>

            ${
                data.documentation.evidenceScreenshotGroup
                    ? `
            <div class="doc-section" id="doc-arcade">
              <div class="project-panel__divider"></div>
              ${renderScreenshotGroup(data.documentation.evidenceScreenshotGroup)}
            </div>
            `
                    : ''
            }

            ${
                data.documentation.websiteAnalyticsGroup
                    ? `
            <div class="doc-section" id="doc-web">
              <div class="project-panel__divider"></div>
              ${renderScreenshotGroup(data.documentation.websiteAnalyticsGroup)}
            </div>
            `
                    : ''
            }

          </div>
        </section>
      `
        : '';

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
          ${
              data.downloadUrl || data.paper
                  ? `
          <div class="project-detail__hero-actions">
            ${
                data.paper
                    ? `
            <a
              class="project-detail__download-btn project-detail__download-btn--paper"
              href="${data.paper.previewUrl}"
              target="_blank"
              rel="noopener noreferrer"
              style="--download-accent: ${data.color};"
              aria-label="${data.paper.ctaLabel || 'Preview Paper'} - opens the PDF in a new tab"
            >
              <svg class="project-detail__download-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
              <span>${data.paper.ctaLabel || 'Preview Paper'}</span>
            </a>
            <p class="project-detail__download-hint">${data.paper.venue} - starts at proceedings page 805</p>
            `
                    : ''
            }
            ${
                data.downloadUrl
                    ? `
            <a
              class="project-detail__download-btn"
              href="${data.downloadUrl}"
              target="_blank"
              rel="noopener noreferrer"
              style="--download-accent: ${data.color};"
              aria-label="${data.downloadLabel || 'Download'} — opens in a new tab"
            >
              <svg class="project-detail__download-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>${data.downloadLabel || 'Download'}</span>
            </a>
            ${
                data.downloadHint
                    ? `<p class="project-detail__download-hint">${data.downloadHint}</p>`
                    : ''
            }
            `
                    : ''
            }
          </div>
          `
                  : ''
          }
        </div>
      </div>
    </div>

    <div class="project-detail__sections">
      <div class="container container-wide">
        ${data.paper ? renderPaperPreview(data.paper, data.color) : ''}
        <section class="project-detail-layout">
          <article class="project-panel project-panel--video">
            <p class="project-section__label">Project Video</p>
            <div class="project-video">
              ${data.videoEmbed ? `
              <iframe
                src="${buildYoutubeEmbedUrl(data.videoEmbed, { autoplay: true, controls: true })}"
                title="${data.title} video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
              ` : `
              <div class="project-video__placeholder" style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; min-height: 400px; background: #050812; color: var(--color-text-secondary); flex-direction: column; gap: 1rem;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.5"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
                <p style="font-size: var(--text-small); letter-spacing: var(--tracking-wide); text-transform: uppercase;">Video Coming Soon</p>
              </div>
              `}
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

        ${documentationMarkup}
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
        initPaperPreview(detailContent);
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
