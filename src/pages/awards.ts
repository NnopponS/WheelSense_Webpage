// Awards and Achievements page (TypeScript)
import { createNavbar } from '../components/navbar.ts';
import { createFooter } from '../components/footer.ts';
import { initSmoothScroll } from '../components/smooth-scroll.ts';
import { initScrollAnimations } from '../components/scroll-animations.ts';
import { applyPageContent, fetchPageOverrides } from '../components/page-content.ts';
import {
    defaultAwardPublications,
    defaultCertificates,
    defaultVerifiedMilestones,
} from '../content/awards-data.ts';

type MilestoneItem = {
    era: string;
    eraLabel: string;
    eraColor: string;
    sortDate?: string;
    title: string;
    event: string;
    year: string;
    images: string[];
    description: string;
    sourceLabel: string;
    sourceFile: string;
};

type CertificateItem = {
    title: string;
    image: string;
    file: string;
    pages: number;
    year: string;
    description: string;
};

type PublicationItem = {
    title: string;
    journal: string;
    description: string;
    icon: string;
    link: string;
};

const ERA_META: Record<string, { label: string; color: string }> = {
    'yes-wheelchair': { label: 'YES Wheelchair', color: 'era1' },
    'all-wheelchair': { label: 'ALL Wheelchair', color: 'era2' },
    wheelsense: { label: 'WheelSense', color: 'era4' },
};

const ALLOWED_AWARD_ERAS = new Set(Object.keys(ERA_META));

function parseListOverride<T>(rawValue: unknown, fallback: T[]): T[] {
    if (typeof rawValue !== 'string' || !rawValue.trim()) {
        return JSON.parse(JSON.stringify(fallback));
    }

    try {
        const parsed = JSON.parse(rawValue);
        if (Array.isArray(parsed)) {
            return parsed;
        }
    } catch {
        // Ignore invalid admin JSON and use fallback.
    }

    return JSON.parse(JSON.stringify(fallback));
}

function normalizeImages(item: any): string[] {
    if (Array.isArray(item?.images)) {
        const parsed = item.images
            .map((entry: unknown) => (typeof entry === 'string' ? entry.trim() : ''))
            .filter(Boolean);
        if (parsed.length) {
            return parsed;
        }
    }

    if (typeof item?.image === 'string' && item.image.trim()) {
        return [item.image.trim()];
    }

    return ['/assets/awards/pdf/doc-award-recognition.jpg'];
}

function normalizeEraKey(value: unknown): string {
    if (typeof value !== 'string') {
        return '';
    }

    const normalized = value.trim().toLowerCase().replace(/\s+/g, '-');
    if (normalized === 'yes-wheelchair') return 'yes-wheelchair';
    if (normalized === 'all-wheelchair') return 'all-wheelchair';
    if (normalized === 'wheelsense') return 'wheelsense';
    return '';
}

function normalizeMilestone(item: any, index: number): MilestoneItem {
    const images = normalizeImages(item);
    const era = normalizeEraKey(item?.era) || 'all-wheelchair';
    const eraMeta = ERA_META[era] || ERA_META['all-wheelchair'];

    return {
        era,
        eraLabel: item?.eraLabel || eraMeta.label,
        eraColor: item?.eraColor || eraMeta.color,
        sortDate: item?.sortDate || '',
        title: item?.title || `Milestone ${index + 1}`,
        event: item?.event || 'Unspecified event',
        year: item?.year || '-',
        images,
        description: item?.description || '',
        sourceLabel: item?.sourceLabel || 'Open Source',
        sourceFile: item?.sourceFile || '/assets/docs/award-recognition.pdf',
    };
}

function normalizeCertificate(item: any, index: number): CertificateItem {
    return {
        title: item?.title || `Certificate ${index + 1}`,
        image: item?.image || '/assets/awards/pdf/doc-award-recognition.jpg',
        file: item?.file || '/assets/docs/award-recognition.pdf',
        pages: Number(item?.pages) > 0 ? Number(item.pages) : 1,
        year: item?.year || '-',
        description: item?.description || '',
    };
}

function normalizePublication(item: any, index: number): PublicationItem {
    return {
        title: item?.title || `Publication ${index + 1}`,
        journal: item?.journal || 'Journal / Source',
        description: item?.description || '',
        icon: item?.icon || 'Source',
        link: item?.link || '#',
    };
}

function extractPrimaryYear(value: string): number {
    const text = String(value || '');
    const match = text.match(/(20\d{2})/);
    return match ? Number(match[1]) : 0;
}

function parseSortIndex(sortDate: string, year: string): number {
    const dateText = String(sortDate || '').trim();
    const dateMatch = dateText.match(/(20\d{2})(?:[-/](\d{1,2}))?/);
    if (dateMatch) {
        const yearValue = Number(dateMatch[1]);
        const monthValue = Number(dateMatch[2] || '1');
        return yearValue * 100 + monthValue;
    }

    const fallbackYear = extractPrimaryYear(year);
    return fallbackYear ? fallbackYear * 100 + 1 : 0;
}

function rankMilestone(item: MilestoneItem): number {
    const content = `${item.title} ${item.event} ${item.description}`.toLowerCase();
    const dateScore = parseSortIndex(item.sortDate || '', item.year) * 1000;

    const internationalScore =
        /(international|global|taiwan|china|malaysia|kide|ipitex|innoserve)/.test(content) ? 400 : 0;

    let impactScore = 0;
    if (/(grand prize|winner|first place|platinum|gold medal|gold award)/.test(content)) {
        impactScore += 220;
    } else if (/(silver|second runner-up|runner-up)/.test(content)) {
        impactScore += 140;
    } else if (/(merit|outstanding|special prize|compliment)/.test(content)) {
        impactScore += 90;
    } else if (/(presentation|conference|pipeline)/.test(content)) {
        impactScore += 40;
    }

    return dateScore + internationalScore + impactScore;
}

function rankCertificate(item: CertificateItem): number {
    const content = `${item.title} ${item.description}`.toLowerCase();
    const dateScore = parseSortIndex('', item.year) * 1000;
    const internationalScore =
        /(international|taiwan|china|japan|ipitex|innoserve|kide|global)/.test(content) ? 350 : 0;
    const impactScore =
        /(grand prize|winner|first place|platinum|gold|silver|merit|special)/.test(content) ? 120 : 30;

    return dateScore + internationalScore + impactScore;
}

function renderMilestoneCard(item: MilestoneItem, index: number): string {
    const slidesMarkup = item.images
        .map((image, imageIndex) => `
          <img class="award-card__slide ${imageIndex === 0 ? 'is-active' : ''}" src="${image}" alt="${item.title}" loading="lazy" />
        `)
        .join('');

    const dotsMarkup = item.images.length > 1
        ? `
        <div class="award-card__dots" aria-hidden="true">
          ${item.images.map((_, dotIndex) => `<span class="award-card__dot ${dotIndex === 0 ? 'is-active' : ''}" data-dot-index="${dotIndex}"></span>`).join('')}
        </div>
      `
        : '';

    return `
    <article class="award-card" data-era="${item.era}" style="--delay: ${index * 0.04}s">
      <div class="award-card__image-wrap" data-carousel="true" data-lightbox-src="${item.images[0]}">
        <div class="award-card__slides">${slidesMarkup}</div>
        ${dotsMarkup}
        <div class="award-card__overlay">
          <span class="award-card__zoom">View</span>
        </div>
      </div>
      <div class="award-card__content">
        <div class="award-card__badge award-card__badge--${item.eraColor}">${item.eraLabel}</div>
        <h3 class="award-card__title">${item.title}</h3>
        <p class="award-card__event">${item.event}</p>
        <p class="award-card__desc">${item.description}</p>
        <div class="award-card__meta">
          <span class="award-card__year">${item.year}</span>
          <a class="award-card__source" href="${item.sourceFile}" target="_blank" rel="noopener noreferrer">${item.sourceLabel}</a>
        </div>
      </div>
    </article>
  `;
}

function renderCertificateCard(item: CertificateItem, index: number): string {
    return `
    <article class="cert-card" style="--delay: ${index * 0.05}s">
      <div class="cert-card__image-wrap" data-lightbox-src="${item.image}">
        <img class="cert-card__image" src="${item.image}" alt="${item.title}" loading="lazy" />
        <div class="cert-card__overlay">
          <span class="cert-card__zoom">Preview</span>
        </div>
      </div>
      <div class="cert-card__info">
        <h4 class="cert-card__title">${item.title}</h4>
        <p class="cert-card__desc">${item.description}</p>
        <div class="cert-card__actions">
          <span class="cert-card__pages">${item.year} | ${item.pages} page${item.pages > 1 ? 's' : ''}</span>
          <a class="cert-card__link" href="${item.file}" target="_blank" rel="noopener noreferrer">Open PDF</a>
        </div>
      </div>
    </article>
  `;
}

function renderPublicationCard(item: PublicationItem): string {
    return `
    <article class="pub-card glass-card">
      <div class="pub-card__icon">${item.icon}</div>
      <div class="pub-card__content">
        <h3 class="pub-card__title">${item.title}</h3>
        <p class="pub-card__journal">${item.journal}</p>
        <p class="pub-card__desc">${item.description}</p>
        <a class="pub-card__link" href="${item.link}" target="_blank" rel="noopener noreferrer">Open Source</a>
      </div>
    </article>
  `;
}

function updateStats(milestones: MilestoneItem[], certificates: CertificateItem[], publications: PublicationItem[]): void {
    const statAwards = document.getElementById('statAwards');
    const statDocs = document.getElementById('statDocs');
    const statMedia = document.getElementById('statMedia');

    if (statAwards) statAwards.dataset.counter = String(milestones.length);
    if (statDocs) statDocs.dataset.counter = String(certificates.length);
    if (statMedia) statMedia.dataset.counter = String(publications.length);
}

function initMilestoneCarousels(): void {
    const wraps = Array.from(document.querySelectorAll<HTMLElement>('.award-card__image-wrap[data-carousel="true"]'));

    wraps.forEach((wrap) => {
        const slides = Array.from(wrap.querySelectorAll<HTMLImageElement>('.award-card__slide'));
        const dots = Array.from(wrap.querySelectorAll<HTMLElement>('.award-card__dot'));

        if (!slides.length) return;

        let activeIndex = 0;
        let timer: number | null = null;

        const setActive = (nextIndex: number) => {
            activeIndex = (nextIndex + slides.length) % slides.length;

            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle('is-active', slideIndex === activeIndex);
            });

            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle('is-active', dotIndex === activeIndex);
            });

            wrap.dataset.lightboxSrc = slides[activeIndex].src;
        };

        const stop = () => {
            if (timer !== null) {
                window.clearInterval(timer);
                timer = null;
            }
        };

        const start = () => {
            stop();
            if (slides.length < 2) return;
            timer = window.setInterval(() => {
                setActive(activeIndex + 1);
            }, 3200);
        };

        dots.forEach((dot) => {
            dot.addEventListener('click', (event) => {
                event.stopPropagation();
                const index = Number(dot.dataset.dotIndex || '0');
                setActive(index);
                start();
            });
        });

        wrap.addEventListener('mouseenter', stop);
        wrap.addEventListener('mouseleave', start);

        setActive(0);
        start();
    });
}

function initMilestoneFilter(): void {
    const filter = document.getElementById('awardsFilter');
    if (!filter) return;

    const tabs = Array.from(filter.querySelectorAll<HTMLButtonElement>('.awards-filter__tab[data-era]'));
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.award-card[data-era]'));

    if (!tabs.length || !cards.length) return;

    const applyFilter = (selectedEra: string) => {
        cards.forEach((card) => {
            const cardEra = (card.dataset.era || '').trim().toLowerCase();
            const shouldShow = selectedEra === 'all' || cardEra === selectedEra;
            card.classList.toggle('is-hidden', !shouldShow);
        });

        tabs.forEach((tab) => {
            const isActive = (tab.dataset.era || '') === selectedEra;
            tab.classList.toggle('is-active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
    };

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const selectedEra = (tab.dataset.era || '').trim().toLowerCase();
            applyFilter(selectedEra || 'all');
        });
    });

    const activeTab = tabs.find((tab) => tab.classList.contains('is-active'));
    const initialEra = (activeTab?.dataset.era || 'all').trim().toLowerCase();
    applyFilter(initialEra || 'all');
}

document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('is-hidden');
            setTimeout(() => loader.remove(), 600);
        }, 800);
    }

    createNavbar('awards');
    createFooter();
    initSmoothScroll();

    let overrides: Record<string, any> = {};
    try {
        overrides = await fetchPageOverrides('awards');
    } catch {
        overrides = {};
    }

    const milestones = parseListOverride(overrides['data.verifiedMilestones'], defaultVerifiedMilestones)
        .map((item, index) => normalizeMilestone(item, index))
        .filter((item) => ALLOWED_AWARD_ERAS.has(item.era))
        .sort((a, b) => rankMilestone(b) - rankMilestone(a));

    const certificates = parseListOverride(overrides['data.certificates'], defaultCertificates)
        .map((item, index) => normalizeCertificate(item, index))
        .sort((a, b) => rankCertificate(b) - rankCertificate(a));

    const publications = parseListOverride(overrides['data.publications'], defaultAwardPublications)
        .map((item, index) => normalizePublication(item, index));

    const awardsGrid = document.getElementById('awardsGrid');
    const certificatesGrid = document.getElementById('certificatesGrid');
    const publicationsGrid = document.getElementById('publicationsGrid');

    if (!awardsGrid || !certificatesGrid || !publicationsGrid) {
        return;
    }

    awardsGrid.innerHTML = milestones.map((item, index) => renderMilestoneCard(item, index)).join('');
    certificatesGrid.innerHTML = certificates.map((item, index) => renderCertificateCard(item, index)).join('');
    publicationsGrid.innerHTML = publications.map((item) => renderPublicationCard(item)).join('');

    applyPageContent('awards', overrides);
    updateStats(milestones, certificates, publications);
    initMilestoneCarousels();
    initMilestoneFilter();

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImg') as HTMLImageElement | null;
    const lightboxClose = document.getElementById('lightboxClose');

    document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement | null;
        const lightboxTarget = target?.closest<HTMLElement>('[data-lightbox-src]');
        if (!lightboxTarget) return;

        const source = lightboxTarget.dataset.lightboxSrc;
        if (!source || !lightbox || !lightboxImage) return;

        lightboxImage.src = source;
        lightbox.classList.add('is-active');
        document.body.style.overflow = 'hidden';
    });

    lightboxClose?.addEventListener('click', () => {
        if (!lightbox) return;
        lightbox.classList.remove('is-active');
        document.body.style.overflow = '';
    });

    lightbox?.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            lightbox.classList.remove('is-active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightbox?.classList.contains('is-active')) {
            lightbox.classList.remove('is-active');
            document.body.style.overflow = '';
        }
    });

    const heroContent = document.querySelector<HTMLElement>('.awards-hero__content');
    const scrollIndicator = document.querySelector<HTMLElement>('.scroll-indicator');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const fadeStart = 100;
        const fadeEnd = 500;
        const progress = Math.min(1, Math.max(0, (scrollY - fadeStart) / (fadeEnd - fadeStart)));

        if (heroContent) {
            heroContent.style.opacity = String(1 - progress);
            heroContent.style.transform = `translateY(${progress * -50}px)`;
        }

        if (scrollIndicator) {
            scrollIndicator.style.opacity = String(Math.max(0, 0.4 - progress));
        }
    }, { passive: true });

    initScrollAnimations();
});


