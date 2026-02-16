import { createNavbar } from '../components/navbar.ts';
import { createFooter } from '../components/footer.ts';
import { initSmoothScroll } from '../components/smooth-scroll.ts';
import { initScrollAnimations } from '../components/scroll-animations.ts';
import { fetchPageOverrides } from '../components/page-content.ts';
import { cloneTeamMembers } from '../content/team-data.ts';

const PRIORITY_ORDER = new Map([
    ['worapon-sangsasri', 0],
    ['suppawit-ausawalaithong', 1],
]);

function parseMembersOverride(rawValue) {
    if (typeof rawValue !== 'string' || !rawValue.trim()) {
        return cloneTeamMembers();
    }

    try {
        const parsed = JSON.parse(rawValue);
        if (Array.isArray(parsed)) {
            return parsed;
        }
    } catch {
        // Ignore invalid JSON and fallback to defaults.
    }

    return cloneTeamMembers();
}

function normalizeMember(member, index) {
    const id = member.id || `member-${index + 1}`;

    return {
        id,
        name: member.name || 'Unnamed Member',
        thaiName: member.thaiName || '',
        level: member.level || 'Team Member',
        role: member.role || 'Research Team',
        subtitle: member.subtitle || 'WheelSense Team',
        gradient: member.gradient || 'linear-gradient(135deg, #1a1b2e, #0e1018)',
        photo: typeof member.photo === 'string' ? member.photo : '',
        bio: member.bio || 'Profile details are being updated.',
        details: Array.isArray(member.details) ? member.details : [],
        focus: Array.isArray(member.focus) ? member.focus : [],
        projects: Array.isArray(member.projects) ? member.projects : [],
        education: Array.isArray(member.education) ? member.education : [],
        cv: member.cv && typeof member.cv === 'object' ? member.cv : null,
    };
}

function sortMembers(members) {
    return [...members].sort((a, b) => {
        const rankA = PRIORITY_ORDER.has(a.id) ? PRIORITY_ORDER.get(a.id) : 1000;
        const rankB = PRIORITY_ORDER.has(b.id) ? PRIORITY_ORDER.get(b.id) : 1000;

        if (rankA !== rankB) {
            return rankA - rankB;
        }

        return a.name.localeCompare(b.name);
    });
}

function renderTagList(items = []) {
    if (!items.length) return '<p class="member-section__content">-</p>';

    return `<div class="skill-tags">${items.map((item) => `<span class="skill-tag">${item}</span>`).join('')}</div>`;
}

function renderSimpleList(items = []) {
    if (!items.length) return '<p class="member-section__content">-</p>';

    return `<div class="member-list">${items.map((item) => `<p class="member-list__item">${item}</p>`).join('')}</div>`;
}

function renderExperienceEntries(entries = []) {
    if (!entries.length) return '<p class="member-section__content">-</p>';

    return `
    <div class="member-list">
      ${entries.map((entry) => `
        <article class="member-entry">
          <h3 class="member-entry__title">${entry.role || entry.title || '-'}</h3>
          <p class="member-entry__meta">${entry.organization || entry.school || ''}</p>
          <p class="member-entry__meta">${entry.period || ''}${entry.extra ? ` | ${entry.extra}` : ''}</p>
          ${Array.isArray(entry.highlights) && entry.highlights.length
        ? `<ul class="member-entry__highlights">${entry.highlights.map((item) => `<li>${item}</li>`).join('')}</ul>`
        : ''}
        </article>
      `).join('')}
    </div>
  `;
}

function renderCvSections(cv) {
    if (!cv || typeof cv !== 'object') {
        return '';
    }

    return `
    <article class="member-section reveal">
      <p class="member-section__title">CV Headline</p>
      <p class="member-section__content">${cv.headline || ''}</p>
      <p class="member-section__content">${cv.institution || ''}</p>
      <p class="member-section__content">${cv.contact || ''}</p>
    </article>

    <article class="member-section reveal">
      <p class="member-section__title">Education</p>
      ${renderExperienceEntries(cv.education || [])}
    </article>

    <article class="member-section reveal">
      <p class="member-section__title">Work Experience</p>
      ${renderExperienceEntries(cv.workExperience || [])}
    </article>

    <article class="member-section reveal">
      <p class="member-section__title">Projects</p>
      ${renderExperienceEntries(cv.projects || [])}
    </article>

    <article class="member-section reveal">
      <p class="member-section__title">Honors and Awards</p>
      ${renderSimpleList(cv.honors || [])}
    </article>

    <article class="member-section reveal">
      <p class="member-section__title">Skills</p>
      <div class="member-list">
        <p class="member-list__item"><strong>Core:</strong> ${cv.skills?.core || '-'}</p>
        <p class="member-list__item"><strong>Languages:</strong> ${cv.skills?.languages || '-'}</p>
        <p class="member-list__item"><strong>Frameworks:</strong> ${cv.skills?.frameworks || '-'}</p>
        <p class="member-list__item"><strong>Tools:</strong> ${cv.skills?.tools || '-'}</p>
        <p class="member-list__item"><strong>Soft Skills:</strong> ${cv.skills?.soft || '-'}</p>
        <p class="member-list__item"><strong>Language Skills:</strong> ${cv.skills?.languageSkills || '-'}</p>
      </div>
    </article>

    <article class="member-section reveal">
      <p class="member-section__title">Certifications</p>
      ${renderSimpleList(cv.certifications || [])}
    </article>
  `;
}

function renderStandardProfile(member) {
    const details = Array.isArray(member.details) ? member.details : [];
    const detailsMarkup = details.length
        ? `<div class="member-grid">${details.map((entry) => `
        <div class="profile-meta-item">
          <p class="profile-meta-item__label">${entry.label}</p>
          <p class="profile-meta-item__value">${entry.value}</p>
        </div>
      `).join('')}</div>`
        : '<p class="member-section__content">-</p>';

    const cv = member.cv && typeof member.cv === 'object' ? member.cv : null;
    const educationItems = Array.isArray(member.education) ? member.education : [];

    return `
    <article class="member-section reveal">
      <p class="member-section__title">Biography</p>
      <p class="member-section__content">${member.bio || '-'}</p>
    </article>

    <article class="member-section reveal">
      <p class="member-section__title">Details</p>
      ${detailsMarkup}
    </article>

    <article class="member-section reveal">
      <p class="member-section__title">Focus Areas</p>
      ${renderTagList(member.focus || [])}
    </article>

    <article class="member-section reveal">
      <p class="member-section__title">Project Involvement</p>
      ${renderTagList(member.projects || [])}
    </article>

    ${educationItems.length ? `
      <article class="member-section reveal">
        <p class="member-section__title">Academic Background</p>
        ${renderSimpleList(educationItems)}
      </article>
    ` : ''}

    ${renderCvSections(cv)}
  `;
}

function cleanList(items = []) {
    return items.filter((item) => typeof item === 'string' && item.trim());
}

function findEntryByKeyword(entries = [], keyword = '') {
    const key = keyword.toLowerCase();
    return entries.find((entry) => {
        const title = `${entry.role || entry.title || ''} ${entry.organization || ''}`.toLowerCase();
        return title.includes(key);
    }) || null;
}

function renderStoryBullets(items = []) {
    const filtered = cleanList(items);
    if (!filtered.length) {
        return '<p class="member-story__description">Additional details are being prepared.</p>';
    }

    return `<ul class="member-story__bullets">${filtered.map((item) => `<li>${item}</li>`).join('')}</ul>`;
}

function createWoraponStory(member) {
    const cv = member.cv && typeof member.cv === 'object' ? member.cv : {};
    const education = Array.isArray(cv.education) ? cv.education : [];
    const workExperience = Array.isArray(cv.workExperience) ? cv.workExperience : [];
    const projectList = Array.isArray(cv.projects) ? cv.projects : [];
    const honors = Array.isArray(cv.honors) ? cv.honors : [];
    const certifications = Array.isArray(cv.certifications) ? cv.certifications : [];

    const primaryEducation = education[0] || {};
    const internship = findEntryByKeyword(workExperience, 'intern') || workExperience[0] || {};
    const leadership = findEntryByKeyword(workExperience, 'association') || workExperience[1] || {};
    const wheelsenseProject = findEntryByKeyword(projectList, 'wheelsense') || projectList[0] || {};
    const fatuProject = findEntryByKeyword(projectList, 'fatu') || projectList[1] || {};

    const chapters = [
        {
            eyebrow: 'Act 01',
            navLabel: 'Foundation',
            accent: 'foundation',
            title: 'Engineering foundation built for real systems',
            description: 'Started with strong electrical engineering fundamentals and consistent academic performance.',
            bullets: cleanList([
                primaryEducation.detail && `${primaryEducation.detail} (${primaryEducation.period || 'Current'})`,
                primaryEducation.extra || '',
                'Focused on embedded systems, control logic, and data-driven engineering decisions.',
            ]),
        },
        {
            eyebrow: 'Act 02',
            navLabel: 'Global Internship',
            accent: 'internship',
            title: 'International automation internship in industrial operations',
            description: 'Applied engineering theory to a high-scale production environment in China.',
            bullets: cleanList([
                internship.organization || '',
                internship.period || '',
                ...(Array.isArray(internship.highlights) ? internship.highlights.slice(0, 3) : []),
            ]),
        },
        {
            eyebrow: 'Act 03',
            navLabel: 'Leadership',
            accent: 'leadership',
            title: 'Operational leadership across student engineering programs',
            description: 'Balanced technical output with collaboration, event operations, and communication infrastructure.',
            bullets: cleanList([
                leadership.role || '',
                leadership.period || '',
                ...(Array.isArray(leadership.highlights) ? leadership.highlights.slice(0, 3) : []),
            ]),
        },
        {
            eyebrow: 'Act 04',
            navLabel: 'WheelSense',
            accent: 'wheelsense',
            title: 'Core architect for WheelSense AI mobility intelligence',
            description: 'Developed the indoor localization and AI integration layer that powers WheelSense workflows.',
            bullets: cleanList([
                wheelsenseProject.period || '',
                ...(Array.isArray(wheelsenseProject.highlights) ? wheelsenseProject.highlights.slice(0, 4) : []),
            ]),
        },
        {
            eyebrow: 'Act 05',
            navLabel: 'Full Stack Build',
            accent: 'builder',
            title: 'Expanded into product-grade full-stack and AI experiences',
            description: 'Translated research prototypes into deployable interfaces and live interactive systems.',
            bullets: cleanList([
                fatuProject.organization || '',
                fatuProject.period || '',
                ...(Array.isArray(fatuProject.highlights) ? fatuProject.highlights.slice(0, 3) : []),
            ]),
        },
        {
            eyebrow: 'Act 06',
            navLabel: 'Impact',
            accent: 'impact',
            title: 'Award-backed momentum and continuous technical growth',
            description: 'Progress validated by national-level awards and specialized technical certifications.',
            bullets: cleanList([
                ...honors.slice(0, 4),
                ...certifications.slice(0, 2),
            ]),
        },
    ];

    const stats = [
        { label: 'Current Program', value: 'B.Eng. Electrical Engineering' },
        { label: 'Primary Domain', value: 'AI Mobility + Smart Home Integration' },
        { label: 'Projects in CV', value: String(projectList.length || 0) },
        { label: 'Recognitions', value: String(honors.length || 0) },
    ];

    return { chapters, stats };
}

function renderWoraponProfile(member) {
    const cv = member.cv && typeof member.cv === 'object' ? member.cv : null;
    const details = Array.isArray(member.details) ? member.details : [];
    const detailsMarkup = details.length
        ? `<div class="member-grid">${details.map((entry) => `
        <div class="profile-meta-item">
          <p class="profile-meta-item__label">${entry.label}</p>
          <p class="profile-meta-item__value">${entry.value}</p>
        </div>
      `).join('')}</div>`
        : '<p class="member-section__content">-</p>';

    const { chapters, stats } = createWoraponStory(member);

    return `
    <section class="member-story member-story--grand" data-story="worapon">
      <aside class="member-story__rail">
        <div class="member-story__rail-card">
          <p class="member-story__rail-kicker">Story Scroll</p>
          <h2 class="member-story__rail-title">Worapon's Engineering Journey</h2>
          <p class="member-story__rail-text">Scroll chapter by chapter to follow the path from student foundation to national-level innovation delivery.</p>

          <div class="member-story__stats">
            ${stats.map((item) => `
              <div class="member-story__stat">
                <p class="member-story__stat-label">${item.label}</p>
                <p class="member-story__stat-value">${item.value}</p>
              </div>
            `).join('')}
          </div>

          <div class="member-story__progress">
            ${chapters.map((chapter, index) => `
              <button class="member-story__progress-item ${index === 0 ? 'is-active' : ''}" data-story-target="${index}" type="button">
                <span class="member-story__progress-index">${String(index + 1).padStart(2, '0')}</span>
                <span class="member-story__progress-label">${chapter.navLabel}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </aside>

      <div class="member-story__panels">
        ${chapters.map((chapter, index) => `
          <article class="member-story__panel member-story__panel--${chapter.accent} ${index === 0 ? 'is-active' : ''}" data-story-index="${index}">
            <p class="member-story__eyebrow">${chapter.eyebrow}</p>
            <h3 class="member-story__title">${chapter.title}</h3>
            <p class="member-story__description">${chapter.description}</p>
            ${renderStoryBullets(chapter.bullets)}
          </article>
        `).join('')}
      </div>
    </section>

    <article class="member-section reveal">
      <p class="member-section__title">Profile Overview</p>
      <p class="member-section__content">${member.bio || '-'}</p>
    </article>

    <article class="member-section reveal">
      <p class="member-section__title">Contact and Academic Details</p>
      ${detailsMarkup}
    </article>

    <article class="member-section reveal">
      <p class="member-section__title">Focus Areas</p>
      ${renderTagList(member.focus || [])}
    </article>

    <article class="member-section reveal">
      <p class="member-section__title">Project Involvement</p>
      ${renderTagList(member.projects || [])}
    </article>

    ${renderCvSections(cv)}
  `;
}

function initStoryScrollNavigation() {
    const storyRoot = document.querySelector('.member-story[data-story="worapon"]');
    if (!storyRoot) {
        return;
    }

    const panels = Array.from(storyRoot.querySelectorAll('.member-story__panel[data-story-index]'));
    const progressItems = Array.from(storyRoot.querySelectorAll('.member-story__progress-item[data-story-target]'));

    if (!panels.length || !progressItems.length) {
        return;
    }

    const setActive = (activeIndex) => {
        panels.forEach((panel) => {
            panel.classList.toggle('is-active', Number(panel.dataset.storyIndex) === activeIndex);
        });

        progressItems.forEach((item) => {
            item.classList.toggle('is-active', Number(item.dataset.storyTarget) === activeIndex);
        });
    };

    setActive(0);

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const panelIndex = Number(entry.target.dataset.storyIndex);
                setActive(panelIndex);
            });
        },
        {
            threshold: 0.55,
        },
    );

    panels.forEach((panel) => observer.observe(panel));

    progressItems.forEach((item) => {
        item.addEventListener('click', () => {
            const targetIndex = Number(item.dataset.storyTarget);
            const targetPanel = panels[targetIndex];
            if (!targetPanel) {
                return;
            }

            targetPanel.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('is-hidden');
        setTimeout(() => loader.remove(), 600);
    }, 800);

    createNavbar('team');
    createFooter();
    initSmoothScroll();

    let overrides = {};
    try {
        overrides = await fetchPageOverrides('team');
    } catch {
        overrides = {};
    }

    const members = sortMembers(
        parseMembersOverride(overrides['data.members']).map((member, index) => normalizeMember(member, index)),
    );
    const params = new URLSearchParams(window.location.search);
    const memberId = params.get('id') || '';

    const member = members.find((item) => item.id === memberId) || members[0];

    const nameEl = document.getElementById('memberName');
    const roleEl = document.getElementById('memberRole');
    const subtitleEl = document.getElementById('memberSubtitle');
    const heroPhotoEl = document.getElementById('memberHeroPhoto');
    const profileEl = document.getElementById('memberProfile');

    if (!member || !profileEl || !nameEl || !roleEl || !subtitleEl) {
        return;
    }

    nameEl.textContent = member.name || 'Member Profile';
    roleEl.textContent = `${member.level || ''} | ${member.role || ''}`;
    subtitleEl.textContent = member.subtitle || '';

    if (heroPhotoEl instanceof HTMLImageElement) {
        if (member.photo) {
            heroPhotoEl.src = member.photo;
            heroPhotoEl.alt = member.name || 'Member portrait';
            heroPhotoEl.classList.remove('is-hidden');
        } else {
            heroPhotoEl.removeAttribute('src');
            heroPhotoEl.classList.add('is-hidden');
        }
    }

    profileEl.innerHTML = member.id === 'worapon-sangsasri'
        ? renderWoraponProfile(member)
        : renderStandardProfile(member);

    initScrollAnimations();
    initStoryScrollNavigation();
});


