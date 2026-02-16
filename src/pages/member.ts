import { createNavbar } from '../components/navbar.ts';
import { createFooter } from '../components/footer.ts';
import { initSmoothScroll } from '../components/smooth-scroll.ts';
import { initScrollAnimations } from '../components/scroll-animations.ts';
import { fetchPageOverrides } from '../components/page-content.ts';
import { cloneTeamMembers } from '../content/team-data.ts';

type MemberEntry = {
    label?: string;
    value?: string;
};

type CvRecord = {
    title?: string;
    role?: string;
    organization?: string;
    school?: string;
    detail?: string;
    period?: string;
    extra?: string;
    highlights?: string[];
};

type CvSkills = {
    core?: string;
    languages?: string;
    frameworks?: string;
    tools?: string;
    soft?: string;
    languageSkills?: string;
};

type MemberCv = {
    headline?: string;
    institution?: string;
    contact?: string;
    education?: CvRecord[];
    workExperience?: CvRecord[];
    projects?: CvRecord[];
    honors?: string[];
    skills?: CvSkills;
    certifications?: string[];
    researchPublications?: string[];
    books?: string[];
    patents?: string[];
};

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
    details: MemberEntry[];
    focus: string[];
    projects: string[];
    education: string[];
    cv: MemberCv | null;
};

const PRIORITY_ORDER = new Map([
    ['worapon-sangsasri', 0],
    ['suppawit-ausawalaithong', 1],
]);

function escapeHtml(value: unknown): string {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

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

function cleanTextList(items: unknown): string[] {
    if (!Array.isArray(items)) return [];
    return items
        .map((item) => String(item ?? '').trim())
        .filter(Boolean);
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

function formatPhoneInText(value: unknown): string {
    const text = String(value ?? '').trim();
    if (!text) return '';

    return text.replace(/\b0\d{1,2}-\d{3}-\d{4}\b/g, (match) => formatThaiPhone(match));
}

function normalizeMember(member: any, index: number): TeamMember {
    const normalizedName = String(member?.name || 'Unnamed Member').trim();
    const details = Array.isArray(member?.details)
        ? member.details
            .map((entry: any) => ({
                label: String(entry?.label ?? '').trim(),
                value: /phone/i.test(String(entry?.label ?? '').trim())
                    ? formatThaiPhone(String(entry?.value ?? '').trim())
                    : String(entry?.value ?? '').trim(),
            }))
            .filter((entry: MemberEntry) => entry.label || entry.value)
        : [];

    const normalizedCv = member?.cv && typeof member.cv === 'object'
        ? {
            ...member.cv,
            contact: formatPhoneInText(member.cv.contact),
        }
        : null;

    return {
        id: member?.id || `member-${index + 1}`,
        name: normalizedName,
        thaiName: sanitizeThaiName(member?.thaiName, normalizedName),
        level: member?.level || 'Team Member',
        role: member?.role || 'Research Team',
        subtitle: member?.subtitle || 'WheelSense Team',
        gradient: member?.gradient || 'linear-gradient(135deg, #1a1b2e, #0e1018)',
        photo: typeof member?.photo === 'string' ? member.photo : '',
        bio: member?.bio || 'Profile details are being updated.',
        details,
        focus: cleanTextList(member?.focus),
        projects: cleanTextList(member?.projects),
        education: cleanTextList(member?.education),
        cv: normalizedCv,
    };
}

function sortMembers(members: TeamMember[]): TeamMember[] {
    return [...members].sort((a, b) => {
        const rankA = PRIORITY_ORDER.has(a.id) ? PRIORITY_ORDER.get(a.id) ?? 1000 : 1000;
        const rankB = PRIORITY_ORDER.has(b.id) ? PRIORITY_ORDER.get(b.id) ?? 1000 : 1000;

        if (rankA !== rankB) {
            return rankA - rankB;
        }

        return a.name.localeCompare(b.name);
    });
}

function renderTagList(items: string[]): string {
    if (!items.length) {
        return '<p class="member-accordion__text">-</p>';
    }

    return `<div class="skill-tags">${items.map((item) => `<span class="skill-tag">${escapeHtml(item)}</span>`).join('')}</div>`;
}

function renderSimpleList(items: string[]): string {
    if (!items.length) {
        return '<p class="member-accordion__text">-</p>';
    }

    return `<ul class="compact-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function renderDetailsGrid(entries: MemberEntry[]): string {
    if (!entries.length) {
        return '<p class="member-accordion__text">-</p>';
    }

    return `
    <div class="member-grid">
      ${entries.map((entry) => `
        <div class="profile-meta-item">
          <p class="profile-meta-item__label">${escapeHtml(entry.label || '-')}</p>
          <p class="profile-meta-item__value">${escapeHtml(entry.value || '-')}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function normalizeRecordEntries(raw: unknown): CvRecord[] {
    if (!Array.isArray(raw)) return [];

    return raw
        .map((entry: any) => ({
            title: typeof entry?.title === 'string' ? entry.title.trim() : '',
            role: typeof entry?.role === 'string' ? entry.role.trim() : '',
            organization: typeof entry?.organization === 'string' ? entry.organization.trim() : '',
            school: typeof entry?.school === 'string' ? entry.school.trim() : '',
            detail: typeof entry?.detail === 'string' ? entry.detail.trim() : '',
            period: typeof entry?.period === 'string' ? entry.period.trim() : '',
            extra: typeof entry?.extra === 'string' ? entry.extra.trim() : '',
            highlights: cleanTextList(entry?.highlights),
        }))
        .filter((entry: CvRecord) => {
            return Boolean(
                entry.title || entry.role || entry.organization || entry.school || entry.detail || entry.period || entry.extra || (entry.highlights && entry.highlights.length),
            );
        });
}

function renderRecordEntries(entries: CvRecord[]): string {
    if (!entries.length) {
        return '<p class="member-accordion__text">-</p>';
    }

    return `
    <div class="cv-entry-grid">
      ${entries.map((entry) => {
            const primaryTitle = entry.role || entry.title || entry.detail || '-';
            const secondary = entry.organization || entry.school || '';
            const meta = [entry.period, entry.extra].filter(Boolean).join(' | ');

            return `
          <article class="cv-entry">
            <h3 class="cv-entry__title">${escapeHtml(primaryTitle)}</h3>
            ${secondary ? `<p class="cv-entry__meta">${escapeHtml(secondary)}</p>` : ''}
            ${meta ? `<p class="cv-entry__meta">${escapeHtml(meta)}</p>` : ''}
            ${entry.highlights && entry.highlights.length ? renderSimpleList(entry.highlights) : ''}
          </article>
        `;
        }).join('')}
    </div>
  `;
}

function renderSkillsGrid(skills: CvSkills | null | undefined): string {
    if (!skills || typeof skills !== 'object') {
        return '<p class="member-accordion__text">-</p>';
    }

    const rows = [
        { label: 'Core', value: skills.core || '-' },
        { label: 'Languages', value: skills.languages || '-' },
        { label: 'Frameworks', value: skills.frameworks || '-' },
        { label: 'Tools', value: skills.tools || '-' },
        { label: 'Soft Skills', value: skills.soft || '-' },
        { label: 'Language Skills', value: skills.languageSkills || '-' },
    ];

    return `
    <div class="skills-grid">
      ${rows.map((row) => `
        <div class="skills-grid__item">
          <p class="skills-grid__label">${escapeHtml(row.label)}</p>
          <p class="skills-grid__value">${escapeHtml(row.value)}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function renderAccordionSection(title: string, content: string, open = false): string {
    return `
    <details class="member-accordion__item reveal" ${open ? 'open' : ''}>
      <summary>${escapeHtml(title)}</summary>
      <div class="member-accordion__body">
        ${content}
      </div>
    </details>
  `;
}

function renderSummaryMetaRows(member: TeamMember): string {
    const summaryRows: MemberEntry[] = [];

    if (member.thaiName && member.thaiName.trim()) {
        summaryRows.push({ label: 'Name (TH)', value: member.thaiName });
    }

    member.details.forEach((entry) => {
        if (entry.label || entry.value) {
            summaryRows.push(entry);
        }
    });

    if (!summaryRows.length) {
        return `
      <div class="member-summary__meta-row">
        <p class="member-summary__meta-label">Profile</p>
        <p class="member-summary__meta-value">Detail records are being updated.</p>
      </div>
    `;
    }

    return summaryRows.map((entry) => `
    <div class="member-summary__meta-row">
      <p class="member-summary__meta-label">${escapeHtml(entry.label || '-')}</p>
      <p class="member-summary__meta-value">${escapeHtml(entry.value || '-')}</p>
    </div>
  `).join('');
}

function renderMemberProfile(member: TeamMember): string {
    const cv = member.cv && typeof member.cv === 'object' ? member.cv : null;
    const cvEducation = normalizeRecordEntries(cv?.education);
    const cvWork = normalizeRecordEntries(cv?.workExperience);
    const cvProjects = normalizeRecordEntries(cv?.projects);
    const cvHonors = cleanTextList(cv?.honors);
    const cvCertifications = cleanTextList(cv?.certifications);
    const cvPublications = cleanTextList(cv?.researchPublications);
    const cvBooks = cleanTextList(cv?.books);
    const cvPatents = cleanTextList(cv?.patents);

    const initials = member.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((token) => token[0]?.toUpperCase() || '')
        .join('');

    const summaryPhoto = member.photo
        ? `<img src="${escapeHtml(member.photo)}" alt="${escapeHtml(member.name)}" loading="lazy" />`
        : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--color-text-primary);font-family:var(--font-display);font-size:2rem;">${escapeHtml(initials || 'WS')}</div>`;

    const sections: string[] = [];

    const overviewSection = `
    <p class="member-accordion__text">${escapeHtml(member.bio || '-')}</p>
    <p class="member-accordion__text"><strong>Contact and Profile Details</strong></p>
    ${renderDetailsGrid(member.details)}
    <p class="member-accordion__text"><strong>Focus Areas</strong></p>
    ${renderTagList(member.focus)}
    <p class="member-accordion__text"><strong>Project Involvement</strong></p>
    ${renderTagList(member.projects)}
    ${member.education.length ? `
      <p class="member-accordion__text"><strong>Academic Background</strong></p>
      ${renderSimpleList(member.education)}
    ` : ''}
  `;

    sections.push(renderAccordionSection('Profile Overview', overviewSection, true));

    if (cv) {
        const cvHeadlineRows = [cv.headline, cv.institution, cv.contact]
            .map((value) => String(value ?? '').trim())
            .filter(Boolean);

        if (cvHeadlineRows.length) {
            sections.push(renderAccordionSection('CV Headline and Contact', renderSimpleList(cvHeadlineRows), true));
        }
        if (cvEducation.length) {
            sections.push(renderAccordionSection('CV Education', renderRecordEntries(cvEducation)));
        }
        if (cvWork.length) {
            sections.push(renderAccordionSection('Work Experience', renderRecordEntries(cvWork)));
        }
        if (cvProjects.length) {
            sections.push(renderAccordionSection('Project Portfolio', renderRecordEntries(cvProjects)));
        }
        if (cvPublications.length) {
            sections.push(renderAccordionSection('Research Publications', renderSimpleList(cvPublications)));
        }
        if (cvHonors.length) {
            sections.push(renderAccordionSection('Honors and Awards', renderSimpleList(cvHonors)));
        }
        if (cvBooks.length) {
            sections.push(renderAccordionSection('Books', renderSimpleList(cvBooks)));
        }
        if (cvPatents.length) {
            sections.push(renderAccordionSection('Patents and Copyrights', renderSimpleList(cvPatents)));
        }
        sections.push(renderAccordionSection('Skills Matrix', renderSkillsGrid(cv.skills)));
        if (cvCertifications.length) {
            sections.push(renderAccordionSection('Certifications', renderSimpleList(cvCertifications)));
        }
    }

    const profileSectionsCount = [
        cvEducation.length,
        cvWork.length,
        cvProjects.length,
        cvPublications.length,
        cvHonors.length,
        cvBooks.length,
        cvPatents.length,
        cvCertifications.length,
    ].filter((count) => count > 0).length;

    const thaiNameMarkup = member.thaiName && member.thaiName.trim() && member.thaiName.trim() !== member.name.trim()
        ? `<p class="member-summary__thai-name">${escapeHtml(member.thaiName)}</p>`
        : '';

    return `
    <div class="member-shell">
      <aside class="member-summary reveal">
        <div class="member-summary__photo" style="background: ${escapeHtml(member.gradient)};">
          ${summaryPhoto}
        </div>
        <h2 class="member-summary__name">${escapeHtml(member.name)}</h2>
        ${thaiNameMarkup}
        <p class="member-summary__role">${escapeHtml(member.level)} | ${escapeHtml(member.role)}</p>
        <div class="member-summary__chips">
          <span class="member-summary__chip">${escapeHtml(member.level || 'Member')}</span>
          <span class="member-summary__chip">${member.projects.length} projects</span>
          <span class="member-summary__chip">${member.focus.length} focus areas</span>
          <span class="member-summary__chip">${profileSectionsCount} CV sections</span>
        </div>
        <div class="member-summary__meta">
          ${renderSummaryMetaRows(member)}
        </div>
        <div class="member-summary__actions">
          <a class="member-summary__button" href="/team.html">Back to Team</a>
          <a class="member-summary__button" href="/projects.html">View Projects</a>
        </div>
      </aside>

      <div class="member-accordion">
        ${sections.join('')}
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader?.classList.add('is-hidden');
        setTimeout(() => loader?.remove(), 600);
    }, 800);

    createNavbar('team');
    createFooter();
    initSmoothScroll();

    let overrides: Record<string, any> = {};
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
    subtitleEl.textContent = [member.subtitle, member.thaiName && member.thaiName !== member.name ? member.thaiName : '']
        .map((value) => String(value || '').trim())
        .filter(Boolean)
        .join(' | ');

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

    profileEl.innerHTML = renderMemberProfile(member);
    initScrollAnimations();
});
