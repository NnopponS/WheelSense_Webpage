// Team page (TypeScript)
import { createNavbar } from '../components/navbar.ts';
import { createFooter } from '../components/footer.ts';
import { initSmoothScroll } from '../components/smooth-scroll.ts';
import { initScrollAnimations } from '../components/scroll-animations.ts';
import { applyPageContent, fetchPageOverrides } from '../components/page-content.ts';
import { cloneTeamMembers } from '../content/team-data.ts';

type TeamMember = {
    id: string;
    name: string;
    thaiName: string;
    level: string;
    role: string;
    subtitle: string;
    gradient: string;
    photo: string;
    bio: string;
    details: Array<{ label: string; value: string }>;
    focus: string[];
    projects: string[];
    education: string[];
    cv: Record<string, unknown> | null;
};

function parseMembersOverride(rawValue: unknown): unknown[] {
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

function sanitizeThaiName(value: unknown, fallback: string): string {
    const text = String(value ?? '').trim();
    if (!text) return '';

    const compact = text.replace(/\s+/g, '');
    if (/^\?+$/.test(compact)) {
        return fallback;
    }

    return text;
}

function formatThaiPhone(value: string): string {
    const text = String(value || '').trim();
    if (!text || text.includes('(+66)')) return text;

    const digits = text.replace(/[^\d]/g, '');
    if (!/^0\d{8,9}$/.test(digits)) {
        return text;
    }

    const local = digits.slice(1);
    if (local.length === 9) {
        return `(+66) ${local.slice(0, 2)}-${local.slice(2, 5)}-${local.slice(5)}`;
    }

    if (local.length === 8) {
        return `(+66) ${local.slice(0, 1)}-${local.slice(1, 4)}-${local.slice(4)}`;
    }

    return text;
}

function normalizeMember(member: any, index: number): TeamMember {
    const id = member?.id || `member-${index + 1}`;
    const normalizedName = String(member?.name || 'Unnamed Member').trim();
    const details = Array.isArray(member?.details)
        ? member.details.map((entry: any) => {
            const label = String(entry?.label ?? '').trim();
            const value = String(entry?.value ?? '').trim();

            return {
                label,
                value: /phone/i.test(label) ? formatThaiPhone(value) : value,
            };
        })
        : [];

    return {
        id,
        name: normalizedName,
        thaiName: sanitizeThaiName(member?.thaiName, normalizedName),
        level: member?.level || 'Team Member',
        role: member?.role || 'Research Team',
        subtitle: member?.subtitle || 'WheelSense Team',
        gradient: member?.gradient || 'linear-gradient(135deg, #1a1b2e, #0e1018)',
        photo: typeof member?.photo === 'string' ? member.photo : '',
        bio: member?.bio || 'Profile details are being updated.',
        details,
        focus: Array.isArray(member?.focus) ? member.focus : [],
        projects: Array.isArray(member?.projects) ? member.projects : [],
        education: Array.isArray(member?.education) ? member.education : [],
        cv: member?.cv && typeof member.cv === 'object' ? member.cv : null,
    };
}

function sortTeamMembers(list: TeamMember[]): TeamMember[] {
    const priority = new Map([
        ['worapon-sangsasri', 0],
        ['suppawit-ausawalaithong', 1],
    ]);

    return [...list].sort((a, b) => {
        const rankA = priority.has(a.id) ? Number(priority.get(a.id)) : 100 + list.indexOf(a);
        const rankB = priority.has(b.id) ? Number(priority.get(b.id)) : 100 + list.indexOf(b);
        return rankA - rankB;
    });
}

function renderDetailSection(member: TeamMember): string {
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

    const educationSection = member.education.length
        ? `
      <div class="profile-detail__section">
        <p class="profile-detail__section-label">Education</p>
        <div class="profile-education-list">
          ${member.education.map((item) => `<p class="profile-education-list__item">${item}</p>`).join('')}
        </div>
      </div>
    `
        : '';

    const portraitMarkup = member.photo
        ? `<img class="profile-detail__portrait-image" src="${member.photo}" alt="${member.name}" loading="lazy" />`
        : '';

    const thaiNameMarkup = member.thaiName && member.thaiName.trim() && member.thaiName.trim() !== member.name.trim()
        ? `<p class="profile-detail__secondary-name">${member.thaiName}</p>`
        : '';

    return `
    <div class="container">
      <div class="profile-detail__hero">
        <div class="profile-detail__portrait" style="background: ${member.gradient};">${portraitMarkup}</div>
        <div class="profile-detail__header">
          <h1>${member.name}</h1>
          ${thaiNameMarkup}
          <p>${member.role}</p>
          <p class="profile-detail__secondary-name">${member.subtitle}</p>
          <div class="profile-detail__actions">
            <a class="btn btn-primary" href="/member.html?id=${encodeURIComponent(member.id)}">View More</a>
          </div>
        </div>
      </div>

      <div class="profile-detail__section">
        <p class="profile-detail__section-label">Profile</p>
        <p class="text-body-lg text-secondary" style="line-height: var(--leading-relaxed); max-width: 760px; margin-bottom: var(--space-md);">${member.bio}</p>
        <div class="profile-meta-grid">${detailsMarkup}</div>
      </div>

      <div class="profile-detail__section">
        <p class="profile-detail__section-label">Focus Areas</p>
        <div class="skill-tags">${focusMarkup || '<span class="skill-tag">-</span>'}</div>
      </div>

      <div class="profile-detail__section">
        <p class="profile-detail__section-label">Project Involvement</p>
        <div class="skill-tags">${projectsMarkup || '<span class="skill-tag">-</span>'}</div>
      </div>

      ${educationSection}
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

    createNavbar('team');
    createFooter();
    initSmoothScroll();

    let overrides: Record<string, any> = {};
    try {
        overrides = await fetchPageOverrides('team');
    } catch {
        overrides = {};
    }

    const teamMembers = sortTeamMembers(
        parseMembersOverride(overrides['data.members']).map((member, index) => normalizeMember(member, index)),
    );

    const grid = document.getElementById('teamPageGrid');
    if (!grid) {
        return;
    }

    teamMembers.forEach((member) => {
        const card = document.createElement('article');
        card.className = 'team-profile';
        card.dataset.memberId = member.id;

        const photoMarkup = member.photo
            ? `<img class="team-profile__image-photo" src="${member.photo}" alt="${member.name}" loading="lazy" />`
            : '';

        card.innerHTML = `
      <div class="team-profile__image">
        ${photoMarkup}
        <div class="team-profile__image-gradient" style="background: ${member.gradient};"></div>
      </div>
      <div class="team-profile__info">
        <span class="team-profile__level">${member.level}</span>
        <h3 class="team-profile__name">${member.name}</h3>
        <p class="team-profile__role">${member.role}</p>
        <p class="team-profile__subtitle">${member.subtitle}</p>
        <div class="team-profile__actions">
          <a class="team-profile__more" href="/member.html?id=${encodeURIComponent(member.id)}">View More</a>
        </div>
      </div>
    `;
        grid.appendChild(card);
    });

    applyPageContent('team', overrides);
    initScrollAnimations();

    const detail = document.getElementById('profileDetail');
    const detailContent = document.getElementById('profileDetailContent');
    const detailClose = document.getElementById('profileDetailClose');

    grid.addEventListener('click', (event) => {
        const target = event.target as HTMLElement | null;
        if (!target) return;

        const isViewMoreLink = target.closest('.team-profile__more');
        if (isViewMoreLink) {
            return;
        }

        const card = target.closest('.team-profile') as HTMLElement | null;
        if (!card) return;

        const member = teamMembers.find((entry) => entry.id === card.dataset.memberId);
        if (!member || !detailContent || !detail) return;

        const cardName = card.querySelector('.team-profile__name')?.textContent?.trim() || member.name;
        const cardRole = card.querySelector('.team-profile__role')?.textContent?.trim() || member.role;
        const cardSubtitle = card.querySelector('.team-profile__subtitle')?.textContent?.trim() || member.subtitle;

        detailContent.innerHTML = renderDetailSection({
            ...member,
            name: cardName,
            role: cardRole,
            subtitle: cardSubtitle,
        });

        detail.classList.add('is-open');
        document.body.style.overflow = 'hidden';
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
});


