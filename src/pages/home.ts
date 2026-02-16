// Home page main entry
import { createNavbar } from '../components/navbar.ts';
import { createFooter } from '../components/footer.ts';
import { initSmoothScroll } from '../components/smooth-scroll.ts';
import { initScrollAnimations } from '../components/scroll-animations.ts';
import { WebGLWheel } from '../components/webgl-wheel.ts';
import { applyPageOverrides, fetchPageOverrides } from '../components/page-content.ts';
import { cloneTeamMembers } from '../content/team-data.ts';

type TeamPreviewMember = {
    id: string;
    name: string;
    level: string;
    role: string;
    subtitle: string;
    gradient: string;
    photo: string;
};

function normalizeHomeSectionText(): void {
    const heroSubtitle = document.querySelector('.hero__subtitle');
    if (heroSubtitle) {
        const normalized = (heroSubtitle.textContent || '').trim();
        if (!normalized || /engineering motion beyond limits/i.test(normalized)) {
            heroSubtitle.textContent = 'The wheels will have no sense without Wheelsense';
        }
    }

    const targets = [
        { selector: '#overviewDeck .overview-shell__label', fallback: 'At a Glance' },
        { selector: '#overviewDeck .overview-shell__header h2', fallback: 'Everything You Need on One Page' },
        { selector: '#storyPreview .reveal p', fallback: 'Our Journey' },
        { selector: '#storyPreview .reveal h2', fallback: 'Four Eras of Innovation' },
        { selector: '#projectPreview .reveal p', fallback: 'Project Highlights' },
        { selector: '#projectPreview .reveal h2', fallback: 'YES to WheelSense in 4 Live Previews' },
        { selector: '#teamPreview .reveal p', fallback: 'The Collective' },
        { selector: '#teamPreview .reveal h2', fallback: 'Our Team' },
    ];

    targets.forEach((target) => {
        const element = document.querySelector(target.selector);
        if (!element) return;

        const current = (element.textContent || '').replace(/\.shfud;jkouh/gi, '').trim();
        element.textContent = current || target.fallback;
    });
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

function normalizeMember(member: any, index: number): TeamPreviewMember {
    return {
        id: member?.id || `member-${index + 1}`,
        name: member?.name || 'Unnamed Member',
        level: member?.level || 'Team Member',
        role: member?.role || 'Research Team',
        subtitle: member?.subtitle || 'WheelSense Team',
        gradient: member?.gradient || 'linear-gradient(135deg, #1a1b2e, #0e1018)',
        photo: typeof member?.photo === 'string' ? member.photo : '',
    };
}

function initTeamSlider(members: TeamPreviewMember[]): void {
    const track = document.getElementById('teamTrack');
    const dotsRoot = document.getElementById('teamDots');
    const prevButton = document.getElementById('teamPrev');
    const nextButton = document.getElementById('teamNext');
    const viewport = document.getElementById('teamViewport');
    const template = document.getElementById('teamSlideTemplate') as HTMLTemplateElement | null;

    if (!track || !dotsRoot || !prevButton || !nextButton || !viewport || !template || !members.length) {
        return;
    }

    const fragment = document.createDocumentFragment();

    members.forEach((member) => {
        const clone = template.content.cloneNode(true) as DocumentFragment;
        const slide = clone.querySelector('.team-slide') as HTMLElement | null;
        const link = clone.querySelector('.team-slide__link') as HTMLAnchorElement | null;
        const photoWrap = clone.querySelector('.team-slide__photo-wrap') as HTMLElement | null;
        const photo = clone.querySelector('.team-slide__photo') as HTMLImageElement | null;
        const level = clone.querySelector('.team-slide__level') as HTMLElement | null;
        const name = clone.querySelector('.team-slide__name') as HTMLElement | null;
        const role = clone.querySelector('.team-slide__role') as HTMLElement | null;
        const subtitle = clone.querySelector('.team-slide__subtitle') as HTMLElement | null;

        if (slide) {
            slide.dataset.memberId = member.id;
        }

        if (link) {
            link.href = `/member.html?id=${encodeURIComponent(member.id)}`;
        }

        if (photoWrap) {
            photoWrap.style.background = member.gradient;
        }

        if (photo) {
            if (member.photo) {
                photo.src = member.photo;
                photo.alt = member.name;
            } else {
                photo.removeAttribute('src');
                photo.alt = `${member.name} profile`;
                photo.classList.add('is-hidden');
            }
        }

        if (level) level.textContent = member.level;
        if (name) name.textContent = member.name;
        if (role) role.textContent = member.role;
        if (subtitle) subtitle.textContent = member.subtitle;

        fragment.appendChild(clone);
    });

    track.innerHTML = '';
    dotsRoot.innerHTML = '';
    track.appendChild(fragment);

    const dots = members.map((member, index) => {
        const button = document.createElement('button');
        button.className = `team-slider__dot ${index === 0 ? 'is-active' : ''}`;
        button.type = 'button';
        button.ariaLabel = `Go to ${member.name}`;
        button.dataset.slide = String(index);
        dotsRoot.appendChild(button);
        return button;
    });

    let activeIndex = 0;
    let autoTimer: number | null = null;
    let touchStartX = 0;

    const setActive = (nextIndex: number): void => {
        const total = members.length;
        activeIndex = (nextIndex + total) % total;
        track.style.transform = `translateX(${activeIndex * -100}%)`;

        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('is-active', dotIndex === activeIndex);
        });
    };

    const startAutoSlide = (): void => {
        if (autoTimer !== null || members.length < 2) {
            return;
        }

        autoTimer = window.setInterval(() => {
            setActive(activeIndex + 1);
        }, 5000);
    };

    const stopAutoSlide = (): void => {
        if (autoTimer === null) return;
        window.clearInterval(autoTimer);
        autoTimer = null;
    };

    prevButton.addEventListener('click', () => {
        setActive(activeIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        setActive(activeIndex + 1);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            setActive(index);
        });
    });

    viewport.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0]?.clientX ?? 0;
    }, { passive: true });

    viewport.addEventListener('touchend', (event) => {
        const touchEndX = event.changedTouches[0]?.clientX ?? 0;
        const delta = touchEndX - touchStartX;
        if (Math.abs(delta) < 40) return;
        setActive(delta > 0 ? activeIndex - 1 : activeIndex + 1);
    }, { passive: true });

    viewport.addEventListener('mouseenter', stopAutoSlide);
    viewport.addEventListener('mouseleave', startAutoSlide);
    viewport.addEventListener('focusin', stopAutoSlide);
    viewport.addEventListener('focusout', startAutoSlide);

    setActive(0);
    startAutoSlide();
}

async function loadTeamMembers(): Promise<TeamPreviewMember[]> {
    try {
        const teamOverrides = await fetchPageOverrides('team');
        return parseMembersOverride(teamOverrides['data.members']).map((member, index) => normalizeMember(member, index));
    } catch {
        return cloneTeamMembers().map((member, index) => normalizeMember(member, index));
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('is-hidden');
        setTimeout(() => loader.remove(), 600);
    }, 800);

    createNavbar('home');
    createFooter();
    initSmoothScroll();

    const heroCanvas = document.getElementById('heroCanvas');
    if (heroCanvas) {
        const wheel = new WebGLWheel(heroCanvas, {
            particleCount: 2500,
            color: 0xffffff,
            radius: 3,
            rotationSpeed: 0.001,
        });

        const heroContent = document.querySelector('.hero__content');
        const scrollIndicator = document.querySelector('.scroll-indicator');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const fadeStart = 100;
            const fadeEnd = 500;
            const progress = Math.min(1, Math.max(0, (scrollY - fadeStart) / (fadeEnd - fadeStart)));

            if (heroContent) {
                heroContent.style.opacity = 1 - progress;
                heroContent.style.transform = `translateY(${progress * -50}px)`;
            }

            if (scrollIndicator) {
                scrollIndicator.style.opacity = Math.max(0, 0.4 - progress);
            }
        }, { passive: true });

        // Keep reference in case future interactions need it.
        void wheel;
    }

    const eraGrid = document.getElementById('eraGrid');
    if (eraGrid && window.innerWidth < 768) {
        eraGrid.style.gridTemplateColumns = '1fr';
    }

    await applyPageOverrides('home');
    normalizeHomeSectionText();
    initTeamSlider(await loadTeamMembers());
    initScrollAnimations();
});


