// Team Page
import { createNavbar } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';
import { initSmoothScroll } from '../components/smooth-scroll.js';
import { initScrollAnimations } from '../components/scroll-animations.js';

const teamMembers = [
    {
        id: 'darawadee-panich',
        nameEn: 'Miss. Darawadee Panich',
        nameTh: 'นางสาวดาราวดี พานิช',
        role: 'Student Researcher (Medical Engineering)',
        gradient: 'linear-gradient(135deg, #1a1b3e, #0E1018)',
        bio: 'Contributes to assistive technology development by combining medical-engineering knowledge with practical wheelchair innovation workflow.',
        details: [
            { label: 'Student ID', value: '6610300318' },
            { label: 'Program', value: 'Medical Engineering' },
            { label: 'Faculty', value: 'Faculty of Engineering' },
            { label: 'Phone', value: '093-5989235' },
            { label: 'Email', value: 'darawadeemookpanich@gmail.com' },
        ],
        focus: ['Assistive Technology', 'Medical Engineering', 'Prototype Validation'],
        projects: ['YES Wheelchair', 'ALL Wheelchair', 'WheelSense'],
    },
    {
        id: 'teerapat-thongtae',
        nameEn: 'Mr. Teerapat Thongtae',
        nameTh: 'นายธีรภัทร ทองแท้',
        role: 'Student Researcher (Sport and Exercise Science)',
        gradient: 'linear-gradient(135deg, #1a3e1b, #0E1018)',
        bio: 'Supports sport and exercise-science integration in wheelchair physical activity systems and user engagement experiments.',
        details: [
            { label: 'Student ID', value: '6612614146' },
            { label: 'Program', value: 'Sport and Exercise Science (SS)' },
            { label: 'Faculty', value: 'Faculty of Allied Health Sciences' },
            { label: 'Phone', value: '0630827936' },
            { label: 'Email', value: 'chokun07teerapat2547@gmail.com' },
        ],
        focus: ['Exercise Innovation', 'User Testing', 'Rehabilitation Activity'],
        projects: ['ALL Wheelchair', 'WheelSense'],
    },
    {
        id: 'suppawit-ausawalaithong',
        nameEn: 'Mr. Suppawit Ausawalaithong',
        nameTh: 'นายศุภวิชญ์ อัศวลายทอง',
        role: 'Student Researcher (Electrical Engineering)',
        gradient: 'linear-gradient(135deg, #3e1a1b, #0E1018)',
        bio: 'Works on electrical engineering implementation for sensing, control, and device-level integration in wheelchair systems.',
        details: [
            { label: 'Student ID', value: '6510610147' },
            { label: 'Program', value: 'Electrical Engineering' },
            { label: 'Faculty', value: 'Faculty of Engineering' },
            { label: 'Phone', value: '092-8808015' },
        ],
        focus: ['Embedded Systems', 'Electrical Design', 'Hardware Integration'],
        projects: ['YES Wheelchair', 'ALL Wheelchair'],
    },
    {
        id: 'worapon-sangsasri',
        nameEn: 'Mr. Worapon Sangsasri',
        nameTh: 'นายวรพล แสงสระศรี',
        role: 'Student Researcher (Electrical Engineering)',
        gradient: 'linear-gradient(135deg, #1a2e3e, #0E1018)',
        bio: 'Contributes to electronics and system architecture for wearable sensing, communication modules, and integrated assistive platforms.',
        details: [
            { label: 'Student ID', value: '6510680371' },
            { label: 'Program', value: 'Electrical Engineering' },
            { label: 'Faculty', value: 'Faculty of Engineering' },
            { label: 'Phone', value: '097-2546749' },
            { label: 'Email', value: 'worapon.sangs@gmail.com' },
        ],
        focus: ['System Integration', 'Sensor Platforms', 'IoT Engineering'],
        projects: ['YES Wheelchair', 'ALL Wheelchair', 'WheelSense'],
    },
    {
        id: 'sairag-saadprai',
        nameEn: 'Associate Professor Sairag Saadprai, Ph.D.',
        nameTh: 'รองศาสตราจารย์ ดร.สายรัก สอาดไพร',
        role: 'Research Advisor',
        gradient: 'linear-gradient(135deg, #1a1b3e, #141726)',
        bio: 'Leads research direction in sport and exercise innovation, guiding interdisciplinary translation from concept to validated assistive systems.',
        details: [
            { label: 'Expertise', value: 'Sport and Exercise Innovation' },
            { label: 'Research Interests', value: 'Sport and Exercise Innovation' },
            { label: 'Email', value: 'sairag.saa@allied.tu.ac.th' },
        ],
        focus: ['Research Strategy', 'Exercise Innovation', 'Interdisciplinary Supervision'],
        projects: ['ALL Wheelchair', 'WheelSense'],
    },
    {
        id: 'supachai-vorapojpisut',
        nameEn: 'Asst. Prof. Dr. Supachai Vorapojpisut',
        nameTh: 'ผศ.ดร.ศุภชัย วรพจน์พิศุทธิ์',
        role: 'Head of Department and Control Engineering Advisor',
        gradient: 'linear-gradient(135deg, #222d52, #101524)',
        bio: 'Provides control-engineering and systems expertise for robust assistive technology deployment and academic research quality.',
        details: [
            { label: 'Position', value: 'Head of Department' },
            { label: 'Office', value: 'อาคารปฏิบัติการและวิจัย ชั้น 4 ห้อง 412-1' },
            { label: 'Email', value: 'vsupacha@engr.tu.ac.th' },
            { label: 'Phone', value: '0-2564-3001-9 ต่อ 3061' },
            { label: 'Research Area', value: 'Control Engineering' },
        ],
        focus: ['Control Engineering', 'Systems Engineering', 'Academic Leadership'],
        education: [
            'D.Eng. (Control Engineering), Tokyo Institute of Technology, Japan',
            'M.Eng. (Electrical Engineering), Chulalongkorn University',
            'B.Eng. (Electrical Engineering), Chulalongkorn University',
        ],
        projects: ['YES Wheelchair', 'ALL Wheelchair', 'WheelSense'],
    },
];

function renderDetailSection(member) {
    const detailsMarkup = member.details
        .map((entry) => `
      <div class="profile-meta-item">
        <p class="profile-meta-item__label">${entry.label}</p>
        <p class="profile-meta-item__value">${entry.value}</p>
      </div>
    `)
        .join('');

    const focusMarkup = member.focus
        .map((item) => `<span class="skill-tag">${item}</span>`)
        .join('');

    const projectsMarkup = (member.projects || [])
        .map((item) => `<span class="skill-tag">${item}</span>`)
        .join('');

    const educationSection = member.education
        ? `
      <div class="profile-detail__section">
        <p class="profile-detail__section-label">Education</p>
        <div class="profile-education-list">
          ${member.education.map((item) => `<p class="profile-education-list__item">${item}</p>`).join('')}
        </div>
      </div>
    `
        : '';

    return `
    <div class="container">
      <div class="profile-detail__hero">
        <div class="profile-detail__portrait" style="background: ${member.gradient};"></div>
        <div class="profile-detail__header">
          <h1>${member.nameEn}</h1>
          <p>${member.role}</p>
          <p class="profile-detail__thai-name">${member.nameTh}</p>
        </div>
      </div>

      <div class="profile-detail__section">
        <p class="profile-detail__section-label">Profile</p>
        <p class="text-body-lg text-secondary" style="line-height: var(--leading-relaxed); max-width: 760px; margin-bottom: var(--space-md);">${member.bio}</p>
        <div class="profile-meta-grid">${detailsMarkup}</div>
      </div>

      <div class="profile-detail__section">
        <p class="profile-detail__section-label">Focus Areas</p>
        <div class="skill-tags">${focusMarkup}</div>
      </div>

      <div class="profile-detail__section">
        <p class="profile-detail__section-label">Project Involvement</p>
        <div class="skill-tags">${projectsMarkup}</div>
      </div>

      ${educationSection}
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('is-hidden');
        setTimeout(() => loader.remove(), 600);
    }, 800);

    createNavbar('team');
    createFooter();
    initSmoothScroll();

    const grid = document.getElementById('teamPageGrid');
    teamMembers.forEach((member) => {
        const card = document.createElement('article');
        card.className = 'team-profile';
        card.dataset.memberId = member.id;
        card.innerHTML = `
      <div class="team-profile__image">
        <div class="team-profile__image-gradient" style="background: ${member.gradient};"></div>
      </div>
      <div class="team-profile__info">
        <h3 class="team-profile__name">${member.nameEn}</h3>
        <p class="team-profile__role">${member.role}</p>
        <p class="team-profile__subtitle">${member.nameTh}</p>
      </div>
    `;
        grid.appendChild(card);
    });

    initScrollAnimations();

    const detail = document.getElementById('profileDetail');
    const detailContent = document.getElementById('profileDetailContent');
    const detailClose = document.getElementById('profileDetailClose');

    grid.addEventListener('click', (event) => {
        const card = event.target.closest('.team-profile');
        if (!card) return;

        const member = teamMembers.find((entry) => entry.id === card.dataset.memberId);
        if (!member) return;

        detailContent.innerHTML = renderDetailSection(member);
        detail.classList.add('is-open');
        document.body.style.overflow = 'hidden';
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
});
