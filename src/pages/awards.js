// Awards and Achievements Page
import { createNavbar } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';
import { initSmoothScroll } from '../components/smooth-scroll.js';
import { initScrollAnimations } from '../components/scroll-animations.js';

const awards = [
    {
        era: 'yes-wheelchair',
        eraLabel: 'YES Wheelchair',
        eraColor: 'era1',
        title: 'Grand Prize (Platinum Award)',
        event: 'Kaohsiung International Invention and Design EXPO, Taiwan',
        year: '2023',
        image: '/assets/awards/pdf/award-recognition-01.jpg',
        description: 'Received Grand Prize (Platinum Award) for YES Wheelchair at KIDE 2023.',
        sourceLabel: 'Award Recognition - Figure 1',
        sourceFile: '/assets/docs/award-recognition.pdf',
    },
    {
        era: 'yes-wheelchair',
        eraLabel: 'YES Wheelchair',
        eraColor: 'era1',
        title: 'Gold Medal',
        event: 'Kaohsiung International Invention and Design EXPO, Taiwan',
        year: '2023',
        image: '/assets/awards/pdf/award-recognition-02.jpg',
        description: 'Awarded Gold Medal for YES Wheelchair at KIDE 2023.',
        sourceLabel: 'Award Recognition - Figure 2',
        sourceFile: '/assets/docs/award-recognition.pdf',
    },
    {
        era: 'yes-wheelchair',
        eraLabel: 'YES Wheelchair',
        eraColor: 'era1',
        title: 'International Participation',
        event: 'Kaohsiung International Invention and Design EXPO',
        year: '2023',
        image: '/assets/awards/pdf/award-recognition-03.jpg',
        description: 'YES Wheelchair participated in the event featuring 445 entries from 30 countries.',
        sourceLabel: 'Award Recognition - Figure 3',
        sourceFile: '/assets/docs/award-recognition.pdf',
    },
    {
        era: 'yes-wheelchair',
        eraLabel: 'YES Wheelchair',
        eraColor: 'era1',
        title: 'Internationally Outstanding Inventor Ceremony',
        event: 'KIDE Awards Ceremony',
        year: '2023',
        image: '/assets/awards/pdf/award-recognition-04.jpg',
        description: 'Recognized at the international inventor awards ceremony associated with KIDE 2023.',
        sourceLabel: 'Award Recognition - Figure 4',
        sourceFile: '/assets/docs/award-recognition.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'Outstanding Proposal Award',
        event: 'National Research Council of Thailand',
        year: '2023',
        image: '/assets/awards/pdf/award-recognition-05.jpg',
        description: 'ALL Wheelchair received Outstanding Proposal Award from NRCT.',
        sourceLabel: 'Award Recognition - Figure 5',
        sourceFile: '/assets/docs/award-recognition.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'Excellent Innovation Award',
        event: 'Thailand Research Expo',
        year: '2023',
        image: '/assets/awards/pdf/award-recognition-06.jpg',
        description: 'Received Excellent Innovation Award from Thailand Research Expo 2023.',
        sourceLabel: 'Award Recognition - Figure 6',
        sourceFile: '/assets/docs/award-recognition.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'Second Runner-up',
        event: 'Sport Science Innovation Contest 2023',
        year: '2023',
        image: '/assets/awards/pdf/award-recognition-07.jpg',
        description: 'Won second runner-up in national sport science innovation competition.',
        sourceLabel: 'Award Recognition - Figure 7',
        sourceFile: '/assets/docs/award-recognition.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'The Most Innovation Award',
        event: 'Thammasat Hackathon 2024',
        year: '2024',
        image: '/assets/awards/pdf/award-recognition-08.jpg',
        description: 'Won The Most Innovation Award at Thammasat Hackathon 2024.',
        sourceLabel: 'Award Recognition - Figure 8',
        sourceFile: '/assets/docs/award-recognition.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'International Academic Presentation',
        event: '11th Social Business Academia Conference',
        year: '2024',
        image: '/assets/awards/pdf/award-recognition-09.jpg',
        description: 'Presented ALL Wheelchair innovation in the international conference led by Prof. Muhammad Yunus.',
        sourceLabel: 'Award Recognition - Figure 9',
        sourceFile: '/assets/docs/award-recognition.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'Platinum Award',
        event: 'Thailand GEAR TALENT 2024',
        year: '2024',
        image: '/assets/awards/pdf/award-recognition-10.jpg',
        description: 'Received Platinum Award at Thailand GEAR TALENT competition.',
        sourceLabel: 'Award Recognition - Figure 10',
        sourceFile: '/assets/docs/award-recognition.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'Silver Award',
        event: 'Global Student Innovation Challenge 2024, China',
        year: '2024',
        image: '/assets/awards/pdf/award-recognition-11.jpg',
        description: 'Awarded Silver at GSIC 2024 representing Thailand.',
        sourceLabel: 'Award Recognition - Figure 11',
        sourceFile: '/assets/docs/award-recognition.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'Merit Award and Thailand Representative',
        event: 'Student Innovation Challenge Thailand 2024',
        year: '2024',
        image: '/assets/awards/pdf/appendix-th-08.jpg',
        description: 'Received Merit Award at SIC Thailand and was selected to represent Thailand in GSIC 2024.',
        sourceLabel: 'Appendix - SIC Thailand 2024',
        sourceFile: '/assets/docs/awards-and-activities-appendix-th.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: '2nd Runner-up',
        event: 'Medical Hackathon 2024',
        year: '2024',
        image: '/assets/awards/pdf/award-recognition-12.jpg',
        description: 'Awarded 2nd runner-up in Medical Hackathon 2024.',
        sourceLabel: 'Award Recognition - Figure 13',
        sourceFile: '/assets/docs/award-recognition.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'Compliment Award',
        event: '26th National Software Contest (NSC 2024)',
        year: '2024',
        image: '/assets/awards/pdf/appendix-th-10.jpg',
        description: 'Received Compliment Award in NSC 2024.',
        sourceLabel: 'Appendix - NSC 2024',
        sourceFile: '/assets/docs/awards-and-activities-appendix-th.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'Special Prize Award',
        event: 'KMUTNB Innovation Awards 2024',
        year: '2024',
        image: '/assets/awards/pdf/appendix-th-11.jpg',
        description: 'Received Special Prize Award at KMUTNB Innovation Awards 2024.',
        sourceLabel: 'Appendix - KMUTNB Innovation Awards',
        sourceFile: '/assets/docs/awards-and-activities-appendix-th.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'Gold Award',
        event: 'Thailand Research EXPO 2024',
        year: '2024',
        image: '/assets/awards/pdf/award-recognition-12.jpg',
        description: 'Received Gold Award at Thailand Research EXPO 2024.',
        sourceLabel: 'Award Recognition - Figure 16',
        sourceFile: '/assets/docs/award-recognition.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'First Place Award',
        event: 'International ICT Innovative Services Awards (InnoServe 2024)',
        year: '2024',
        image: '/assets/awards/pdf/appendix-th-12.jpg',
        description: 'Won First Place at InnoServe 2024 in Taipei.',
        sourceLabel: 'Appendix and InnoServe Certificate',
        sourceFile: '/assets/docs/innoserve-award-copy-th.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'Outstanding Level Award',
        event: 'Higher Education Innovation Awards 2024',
        year: '2024',
        image: '/assets/awards/pdf/appendix-th-13.jpg',
        description: 'Received outstanding-level recognition in Higher Education Innovation Awards 2024.',
        sourceLabel: 'Appendix - Higher Education Innovation Awards',
        sourceFile: '/assets/docs/awards-and-activities-appendix-th.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'International Conference Presentation',
        event: '2024 International Conference for Peace Sports, Kuala Lumpur',
        year: '2024',
        image: '/assets/awards/pdf/appendix-th-14.jpg',
        description: 'Presented ALL Wheelchair research in an international conference for peace sports.',
        sourceLabel: 'Appendix - International Conference for Peace Sports',
        sourceFile: '/assets/docs/awards-and-activities-appendix-th.pdf',
    },
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense Era',
        eraColor: 'era4',
        title: 'Memorandum of Understanding with Matsunaga',
        event: 'Center of Excellence (Thammasat) and Matsunaga Manufactory',
        year: '2025',
        image: '/assets/awards/pdf/doc-mou-matsunaga.jpg',
        description: 'Partnership established with one of Japan\'s major wheelchair manufacturers.',
        sourceLabel: 'MOU Matsunaga Document',
        sourceFile: '/assets/docs/mou-matsunaga.pdf',
    },
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense Era',
        eraColor: 'era4',
        title: 'PLOS ONE Publication',
        event: 'The validity and reliability of MASSWU',
        year: '2025',
        image: '/assets/awards/pdf/doc-plos-one-masswu-paper.jpg',
        description: 'Peer-reviewed publication in PLOS ONE with DOI: 10.1371/journal.pone.0333391.',
        sourceLabel: 'Paper PLOS ONE',
        sourceFile: '/assets/docs/plos-one-masswu-paper.pdf',
    },
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense Era',
        eraColor: 'era4',
        title: 'IPITEx Certificate of Appreciation',
        event: 'Official IPITEx Recognition Document',
        year: 'Certificate file provided',
        image: '/assets/awards/pdf/doc-ipitex-certificate-of-appreciation.jpg',
        description: 'Official certificate file from IPITEx included in the project archive.',
        sourceLabel: 'Certificate of appreciation IPITEx',
        sourceFile: '/assets/docs/ipitex-certificate-of-appreciation.pdf',
    },
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense Era',
        eraColor: 'era4',
        title: 'IPITEx Appreciation Document',
        event: 'Additional IPITEx Recognition',
        year: 'Certificate file provided',
        image: '/assets/awards/pdf/doc-ipitex-appreciation.jpg',
        description: 'Additional appreciation document maintained in the WheelSenseTEAM records.',
        sourceLabel: 'IPITEx Appreciation',
        sourceFile: '/assets/docs/ipitex-appreciation.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'Patent and Software Rights Milestone',
        event: 'Petty Patent No. 21587 and software copyright records',
        year: '2024-2025',
        image: '/assets/awards/pdf/appendix-th-14.jpg',
        description: 'Documented IP progress including patent, petty patent applications, and software rights records.',
        sourceLabel: 'Appendix and ALL Wheelchair Documentation',
        sourceFile: '/assets/docs/all-wheelchair-information.pdf',
    },
];

const documents = [
    {
        title: 'Award Recognition (Figure Collection)',
        image: '/assets/awards/pdf/doc-award-recognition.jpg',
        file: '/assets/docs/award-recognition.pdf',
        pages: 12,
        description: 'Compiled award record with figure-based references (YES and ALL Wheelchair).',
    },
    {
        title: 'Awards and Activities Appendix (Thai)',
        image: '/assets/awards/pdf/doc-awards-and-activities-appendix-th.jpg',
        file: '/assets/docs/awards-and-activities-appendix-th.pdf',
        pages: 14,
        description: 'Thai summary of awards, activities, and event participation timeline.',
    },
    {
        title: 'ALL Team Awards and Activities (Extended)',
        image: '/assets/awards/pdf/doc-all-team-awards-and-activities-th.jpg',
        file: '/assets/docs/all-team-awards-and-activities-th.pdf',
        pages: 26,
        description: 'Extended archive containing additional figures, dissemination, and IP milestones.',
    },
    {
        title: 'InnoServe Award Certificate Copy',
        image: '/assets/awards/pdf/doc-innoserve-award-copy-th.jpg',
        file: '/assets/docs/innoserve-award-copy-th.pdf',
        pages: 1,
        description: 'Official certificate copy for International ICT Innovative Services Awards 2024.',
    },
    {
        title: 'GEAR TALENT Platinum Certificate',
        image: '/assets/awards/pdf/doc-gear-talent-platinum-certificate.jpg',
        file: '/assets/docs/gear-talent-platinum-certificate.pdf',
        pages: 4,
        description: 'Certificate file for Platinum Award recognition in Thailand GEAR TALENT.',
    },
    {
        title: 'MOU Matsunaga',
        image: '/assets/awards/pdf/doc-mou-matsunaga.jpg',
        file: '/assets/docs/mou-matsunaga.pdf',
        pages: 1,
        description: 'MOU between Thammasat innovation center and Matsunaga Manufactory.',
    },
    {
        title: 'ALL Wheelchair Information Form',
        image: '/assets/awards/pdf/doc-all-wheelchair-information.jpg',
        file: '/assets/docs/all-wheelchair-information.pdf',
        pages: 21,
        description: 'Comprehensive information system document and implementation records.',
    },
    {
        title: 'ALL Wheelchair IC1 Description Form',
        image: '/assets/awards/pdf/doc-all-wheelchair-ic1-description-form.jpg',
        file: '/assets/docs/all-wheelchair-ic1-description-form.pdf',
        pages: 5,
        description: 'IC1 system description for contest submission.',
    },
    {
        title: 'SIC Thailand 2024 Entry Form',
        image: '/assets/awards/pdf/doc-all-wheelchair-sic-2024-entry-form.jpg',
        file: '/assets/docs/all-wheelchair-sic-2024-entry-form.pdf',
        pages: 40,
        description: 'Official entry document for SIC Thailand 2024.',
    },
    {
        title: 'ALL Wheelchair Motion Tracking Paper File',
        image: '/assets/awards/pdf/doc-all-wheelchair-motion-tracking-paper.jpg',
        file: '/assets/docs/all-wheelchair-motion-tracking-paper.pdf',
        pages: 1,
        description: 'Supporting paper file in project archive.',
    },
    {
        title: 'PLOS ONE MASSWU Paper',
        image: '/assets/awards/pdf/doc-plos-one-masswu-paper.jpg',
        file: '/assets/docs/plos-one-masswu-paper.pdf',
        pages: 15,
        description: 'Peer-reviewed publication on the validity and reliability of MASSWU.',
    },
    {
        title: 'IPITEx Certificate of Appreciation',
        image: '/assets/awards/pdf/doc-ipitex-certificate-of-appreciation.jpg',
        file: '/assets/docs/ipitex-certificate-of-appreciation.pdf',
        pages: 1,
        description: 'Official certificate file from IPITEx.',
    },
    {
        title: 'IPITEx Appreciation',
        image: '/assets/awards/pdf/doc-ipitex-appreciation.jpg',
        file: '/assets/docs/ipitex-appreciation.pdf',
        pages: 1,
        description: 'Additional IPITEx appreciation document.',
    },
];

const publications = [
    {
        title: 'PLOS ONE: MASSWU Validation and Reliability Study',
        journal: 'PLOS ONE, 2025',
        description: 'The validity and reliability of motion analysis sensor system for wheelchair users (MASSWU). DOI: 10.1371/journal.pone.0333391.',
        icon: 'Research',
        link: 'https://doi.org/10.1371/journal.pone.0333391',
    },
    {
        title: 'ALL Wheelchair Information System Document',
        journal: 'Technical Innovation Dossier',
        description: 'Details implementation, patents, software rights, and real-world deployments for wheelchair monitoring and exergaming.',
        icon: 'Dossier',
        link: '/assets/docs/all-wheelchair-information.pdf',
    },
    {
        title: 'IC1 Description of Information System',
        journal: 'Contest Technical Form',
        description: 'Structured technical write-up for ALL Wheelchair AI motion tracking system submission.',
        icon: 'IC1',
        link: '/assets/docs/all-wheelchair-ic1-description-form.pdf',
    },
    {
        title: 'SIC Thailand 2024 Entry Form',
        journal: 'Competition Submission',
        description: 'Official competition entry record including advisor and project information.',
        icon: 'SIC',
        link: '/assets/docs/all-wheelchair-sic-2024-entry-form.pdf',
    },
];

const pngPhotoIndexes = new Set([35, 52]);
const mediaItems = Array.from({ length: 57 }, (_, i) => {
    const index = i + 1;
    const ext = pngPhotoIndexes.has(index) ? 'png' : 'jpg';
    const padded = String(index).padStart(3, '0');

    return {
        title: `WheelSenseTEAM Image #${padded}`,
        image: `/assets/awards/photos/team-photo-${padded}.${ext}`,
    };
});

function renderAwardCard(award, index) {
    return `
    <article class="award-card" data-era="${award.era}" style="--delay: ${index * 0.04}s">
      <div class="award-card__image-wrap" data-lightbox-src="${award.image}">
        <img class="award-card__image" src="${award.image}" alt="${award.title}" loading="lazy" />
        <div class="award-card__overlay">
          <span class="award-card__zoom">View</span>
        </div>
      </div>
      <div class="award-card__content">
        <div class="award-card__badge award-card__badge--${award.eraColor}">${award.eraLabel}</div>
        <h3 class="award-card__title">${award.title}</h3>
        <p class="award-card__event">${award.event}</p>
        <p class="award-card__desc">${award.description}</p>
        <div class="award-card__meta">
          <span class="award-card__year">${award.year}</span>
          <a class="award-card__source" href="${award.sourceFile}" target="_blank" rel="noopener noreferrer">${award.sourceLabel}</a>
        </div>
      </div>
    </article>
  `;
}

function renderDocumentCard(doc, index) {
    return `
    <article class="cert-card" style="--delay: ${index * 0.05}s">
      <div class="cert-card__image-wrap" data-lightbox-src="${doc.image}">
        <img class="cert-card__image" src="${doc.image}" alt="${doc.title}" loading="lazy" />
        <div class="cert-card__overlay">
          <span class="cert-card__zoom">Preview</span>
        </div>
      </div>
      <div class="cert-card__info">
        <h4 class="cert-card__title">${doc.title}</h4>
        <p class="cert-card__desc">${doc.description}</p>
        <div class="cert-card__actions">
          <span class="cert-card__pages">${doc.pages} page${doc.pages > 1 ? 's' : ''}</span>
          <a class="cert-card__link" href="${doc.file}" target="_blank" rel="noopener noreferrer">Open PDF</a>
        </div>
      </div>
    </article>
  `;
}

function renderPublicationCard(pub) {
    return `
    <article class="pub-card glass-card">
      <div class="pub-card__icon">${pub.icon}</div>
      <div class="pub-card__content">
        <h3 class="pub-card__title">${pub.title}</h3>
        <p class="pub-card__journal">${pub.journal}</p>
        <p class="pub-card__desc">${pub.description}</p>
        <a class="pub-card__link" href="${pub.link}" target="_blank" rel="noopener noreferrer">Open Source</a>
      </div>
    </article>
  `;
}

function renderMediaCard(item, index) {
    return `
    <article class="media-card" style="--delay: ${index * 0.01}s">
      <div class="media-card__image-wrap" data-lightbox-src="${item.image}">
        <img class="media-card__image" src="${item.image}" alt="${item.title}" loading="lazy" />
        <div class="media-card__overlay"><span class="media-card__zoom">View</span></div>
      </div>
      <p class="media-card__caption">${item.title}</p>
    </article>
  `;
}

function updateStats() {
    const statAwards = document.getElementById('statAwards');
    const statDocs = document.getElementById('statDocs');
    const statMedia = document.getElementById('statMedia');

    if (statAwards) statAwards.dataset.counter = String(awards.length);
    if (statDocs) statDocs.dataset.counter = String(documents.length);
    if (statMedia) statMedia.dataset.counter = String(mediaItems.length);
}

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('is-hidden');
        setTimeout(() => loader.remove(), 600);
    }, 800);

    createNavbar('awards');
    createFooter();
    initSmoothScroll();

    const awardsGrid = document.getElementById('awardsGrid');
    const documentsGrid = document.getElementById('documentsGrid');
    const publicationsGrid = document.getElementById('publicationsGrid');
    const mediaGrid = document.getElementById('mediaGrid');

    awardsGrid.innerHTML = awards.map((item, index) => renderAwardCard(item, index)).join('');
    documentsGrid.innerHTML = documents.map((item, index) => renderDocumentCard(item, index)).join('');
    publicationsGrid.innerHTML = publications.map(item => renderPublicationCard(item)).join('');
    mediaGrid.innerHTML = mediaItems.map((item, index) => renderMediaCard(item, index)).join('');

    updateStats();

    const filterButtons = document.querySelectorAll('.awards-filter__tab');
    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            filterButtons.forEach((entry) => entry.classList.remove('is-active'));
            button.classList.add('is-active');

            const filter = button.dataset.filter;
            const cards = document.querySelectorAll('.award-card');

            cards.forEach((card, index) => {
                const shouldShow = filter === 'all' || card.dataset.era === filter;

                if (shouldShow) {
                    card.style.display = '';
                    card.style.animation = `fadeSlideIn 0.45s ${index * 0.025}s both`;
                } else {
                    card.style.animation = 'fadeSlideOut 0.25s both';
                    window.setTimeout(() => {
                        card.style.display = 'none';
                    }, 220);
                }
            });
        });
    });

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    document.addEventListener('click', (event) => {
        const lightboxTarget = event.target.closest('[data-lightbox-src]');
        if (!lightboxTarget) return;

        const source = lightboxTarget.dataset.lightboxSrc;
        if (!source || !lightbox || !lightboxImage) return;

        lightboxImage.src = source;
        lightbox.classList.add('is-active');
        document.body.style.overflow = 'hidden';
    });

    lightboxClose?.addEventListener('click', () => {
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

    const heroContent = document.querySelector('.awards-hero__content');
    const scrollIndicator = document.querySelector('.scroll-indicator');

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
