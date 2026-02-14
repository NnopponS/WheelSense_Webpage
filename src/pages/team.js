// Team Page
import { createNavbar } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';
import { initSmoothScroll } from '../components/smooth-scroll.js';
import { initScrollAnimations } from '../components/scroll-animations.js';

const teamMembers = [
    {
        id: 'member-1',
        name: 'Team Lead',
        role: 'Project Director & Researcher',
        quote: 'Technology should serve those who need it most, with precision and compassion.',
        gradient: 'linear-gradient(135deg, #1a1b3e, #0E1018)',
        about: 'Leading the Omniwheel collective from concept to reality. Overseeing research direction, team coordination, and strategic partnerships across all four eras of innovation.',
        skills: ['Project Management', 'Research Methodology', 'IoT Architecture', 'Team Leadership', 'Academic Publishing'],
        projects: ['Yes WheelChair', 'All Wheelchair', 'Marathon & Racing', 'WheelSense'],
    },
    {
        id: 'member-2',
        name: 'Hardware Lead',
        role: 'IoT & Embedded Systems Engineer',
        quote: 'Every sensor we embed is a conversation starter between human and machine.',
        gradient: 'linear-gradient(135deg, #1a3e1b, #0E1018)',
        about: 'Designing and building the hardware foundation of every Omniwheel product. From sensor arrays to communication modules, ensuring reliability and precision in every circuit.',
        skills: ['ESP32 Development', 'PCB Design', 'Sensor Integration', 'Firmware Programming', 'PlatformIO'],
        projects: ['Yes WheelChair', 'Marathon & Racing', 'WheelSense'],
    },
    {
        id: 'member-3',
        name: 'Software Lead',
        role: 'Full-Stack Developer',
        quote: 'Great software disappears — you only notice the experience it enables.',
        gradient: 'linear-gradient(135deg, #3e1a1b, #0E1018)',
        about: 'Building the digital experiences that connect users to their wheelchairs. From mobile apps to web dashboards, creating interfaces that are as intuitive as they are powerful.',
        skills: ['React / Next.js', 'Node.js', 'Python', 'Flutter', 'Firebase', 'Docker'],
        projects: ['All Wheelchair', 'WheelSense v2.0'],
    },
    {
        id: 'member-4',
        name: 'AI Engineer',
        role: 'Computer Vision & ML Specialist',
        quote: 'Intelligence is not about seeing — it is about understanding what you see.',
        gradient: 'linear-gradient(135deg, #1a1b3e, #0E1018)',
        about: 'Developing the AI brain behind WheelSense. Object detection, activity recognition, and predictive analytics that transform a wheelchair into an aware, responsive companion.',
        skills: ['YOLOv8', 'TensorFlow', 'TinyML', 'Computer Vision', 'NLP', 'Edge AI'],
        projects: ['WheelSense', 'WheelSense v2.0'],
    },
    {
        id: 'member-5',
        name: 'UX Designer',
        role: 'User Experience & Interaction Design',
        quote: 'Accessibility is not an afterthought — it is the starting point.',
        gradient: 'linear-gradient(135deg, #3e1a3e, #0E1018)',
        about: 'Ensuring every Omniwheel product is not just functional, but delightful. Conducting user research with wheelchair users and therapists to create truly inclusive experiences.',
        skills: ['UI/UX Design', 'User Research', 'Prototyping', 'Figma', 'Accessibility Standards'],
        projects: ['All Wheelchair', 'WheelSense v2.0'],
    },
    {
        id: 'member-6',
        name: 'Systems Architect',
        role: 'Infrastructure & DevOps',
        quote: 'The best infrastructure is the one nobody has to think about.',
        gradient: 'linear-gradient(135deg, #1a2e3e, #0E1018)',
        about: 'Building the invisible backbone that keeps everything running. Cloud services, deployment pipelines, and the communication protocols that tie hardware to software.',
        skills: ['Docker', 'MQTT', 'Node-RED', 'Home Assistant', 'Linux', 'Networking'],
        projects: ['Marathon & Racing', 'WheelSense v2.0'],
    },
];

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('is-hidden');
        setTimeout(() => loader.remove(), 600);
    }, 800);

    createNavbar('team');
    createFooter();
    initSmoothScroll();

    // Render team grid
    const grid = document.getElementById('teamPageGrid');
    teamMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'team-profile';
        card.dataset.memberId = member.id;
        card.innerHTML = `
      <div class="team-profile__image">
        <div class="team-profile__image-gradient" style="background: ${member.gradient};"></div>
      </div>
      <div class="team-profile__info">
        <h3 class="team-profile__name">${member.name}</h3>
        <p class="team-profile__role">${member.role}</p>
        <p class="team-profile__quote">"${member.quote}"</p>
      </div>
    `;
        grid.appendChild(card);
    });

    initScrollAnimations();

    // Profile detail
    const detail = document.getElementById('profileDetail');
    const detailContent = document.getElementById('profileDetailContent');
    const detailClose = document.getElementById('profileDetailClose');

    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.team-profile');
        if (!card) return;

        const member = teamMembers.find(m => m.id === card.dataset.memberId);
        if (!member) return;

        detailContent.innerHTML = `
      <div class="container">
        <div class="profile-detail__hero">
          <div class="profile-detail__portrait" style="background: ${member.gradient};"></div>
          <div class="profile-detail__header">
            <h1>${member.name}</h1>
            <p>${member.role}</p>
            <p style="font-style: italic; color: var(--color-text-tertiary);">"${member.quote}"</p>
          </div>
        </div>

        <div class="profile-detail__section">
          <p class="profile-detail__section-label">About</p>
          <p class="text-body-lg text-secondary" style="line-height: var(--leading-relaxed); max-width: 700px;">${member.about}</p>
        </div>

        <div class="profile-detail__section">
          <p class="profile-detail__section-label">Core Skills</p>
          <div class="skill-tags">
            ${member.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
          </div>
        </div>

        <div class="profile-detail__section">
          <p class="profile-detail__section-label">Projects</p>
          <div class="skill-tags">
            ${member.projects.map(p => `<span class="skill-tag">${p}</span>`).join('')}
          </div>
        </div>
      </div>
    `;

        detail.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    });

    detailClose.addEventListener('click', () => {
        detail.classList.remove('is-open');
        document.body.style.overflow = '';
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            detail.classList.remove('is-open');
            document.body.style.overflow = '';
        }
    });
});
