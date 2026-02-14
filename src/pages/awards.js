// Awards and Achievements Page
import { createNavbar } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';
import { initSmoothScroll } from '../components/smooth-scroll.js';
import { initScrollAnimations } from '../components/scroll-animations.js';
import { applyPageOverrides } from '../components/page-content.js';

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
        title: 'International Participation Milestone',
        event: 'Kaohsiung International Invention and Design EXPO',
        year: '2023',
        image: '/assets/awards/pdf/award-recognition-03.jpg',
        description: 'Participated in KIDE 2023, an international event with 445 entries from 30 countries.',
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
        description: 'Recognized at the international inventor ceremony associated with KIDE 2023.',
        sourceLabel: 'Award Recognition - Figure 4',
        sourceFile: '/assets/docs/award-recognition.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'Outstanding Proposal Award',
        event: 'National Research Council of Thailand (NRCT)',
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
        description: 'Received Excellent Innovation Award at Thailand Research Expo 2023.',
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
        description: 'Won second runner-up in the national sport science innovation competition.',
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
        description: 'Presented ALL Wheelchair with Prof. Muhammad Yunus in the international conference program.',
        sourceLabel: 'Award Recognition - Figure 9',
        sourceFile: '/assets/docs/award-recognition.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'Platinum Award',
        event: 'Thailand GEAR TALENT',
        year: '2024',
        image: '/assets/awards/pdf/award-recognition-10.jpg',
        description: 'Received Platinum Award in Thailand GEAR TALENT competition.',
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
        description: 'Awarded Silver at GSIC 2024 as a Thailand representative team.',
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
        description: 'Received Merit Award at SIC Thailand and was selected to represent Thailand at GSIC 2024.',
        sourceLabel: 'Award Recognition - Figure 12',
        sourceFile: '/assets/docs/award-recognition.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: '2nd Runner-up',
        event: 'Medical Hackathon 2024',
        year: '2024',
        image: '/assets/awards/pdf/all-team-awards-11.jpg',
        description: 'Awarded 2nd runner-up in Medical Hackathon 2024.',
        sourceLabel: 'All Team Awards - Figure 13',
        sourceFile: '/assets/docs/all-team-awards-and-activities-th.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'Compliment Award',
        event: '26th National Software Contest (NSC 2024)',
        year: '2024',
        image: '/assets/awards/pdf/all-team-awards-12.jpg',
        description: 'Received Compliment Award in NSC 2024.',
        sourceLabel: 'All Team Awards - Figure 14',
        sourceFile: '/assets/docs/all-team-awards-and-activities-th.pdf',
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
        sourceLabel: 'All Team Awards - Figure 15',
        sourceFile: '/assets/docs/all-team-awards-and-activities-th.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'Gold Medal Award',
        event: 'Thailand Research EXPO 2024',
        year: '2024',
        image: '/assets/awards/pdf/all-team-awards-13.jpg',
        description: 'Received Gold Medal Award at Thailand Research EXPO 2024.',
        sourceLabel: 'All Team Awards - Figure 16',
        sourceFile: '/assets/docs/all-team-awards-and-activities-th.pdf',
    },
    {
        era: 'yes-wheelchair',
        eraLabel: 'YES Wheelchair',
        eraColor: 'era1',
        title: 'YouTube Feature: The Convergence EP.94',
        event: 'Innovation Media Dissemination',
        year: '2024',
        image: '/assets/awards/pdf/all-team-awards-14.jpg',
        description: 'Featured YES Wheelchair innovation content on The Convergence EP.94.',
        sourceLabel: 'All Team Awards - Figure 17',
        sourceFile: '/assets/docs/all-team-awards-and-activities-th.pdf',
    },
    {
        era: 'yes-wheelchair',
        eraLabel: 'YES Wheelchair',
        eraColor: 'era1',
        title: 'YouTube Feature: TSE Research and Innovation EP.04',
        event: 'Innovation Media Dissemination',
        year: '2024',
        image: '/assets/awards/pdf/all-team-awards-15.jpg',
        description: 'Presented YES Wheelchair as a case of interdisciplinary innovation.',
        sourceLabel: 'All Team Awards - Figure 18',
        sourceFile: '/assets/docs/all-team-awards-and-activities-th.pdf',
    },
    {
        era: 'yes-wheelchair',
        eraLabel: 'YES Wheelchair',
        eraColor: 'era1',
        title: 'Thai PBS Publication',
        event: 'National Media Coverage',
        year: '2024',
        image: '/assets/awards/pdf/all-team-awards-16.jpg',
        description: 'Published on Thai PBS for wheelchair movement monitoring innovation.',
        sourceLabel: 'All Team Awards - Figure 19',
        sourceFile: '/assets/docs/all-team-awards-and-activities-th.pdf',
    },
    {
        era: 'yes-wheelchair',
        eraLabel: 'YES Wheelchair',
        eraColor: 'era1',
        title: 'Thammasat University Publication',
        event: 'University News and Outreach',
        year: '2024',
        image: '/assets/awards/pdf/all-team-awards-17.jpg',
        description: 'Published as university innovation news highlighting international recognition.',
        sourceLabel: 'All Team Awards - Figure 20',
        sourceFile: '/assets/docs/all-team-awards-and-activities-th.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'Selected Presenter: Innovation for Aged Society',
        event: 'Innovation for Aged Society, Year 4',
        year: '2024',
        image: '/assets/awards/pdf/all-team-awards-18.jpg',
        description: 'Selected to present in the innovation-for-aging society entrepreneur development program.',
        sourceLabel: 'All Team Awards - Figure 21',
        sourceFile: '/assets/docs/all-team-awards-and-activities-th.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'National Invention Exhibition Participation',
        event: 'Thailand National Research Office Program (Fiscal Year 2025)',
        year: '2024',
        image: '/assets/awards/pdf/all-team-awards-19.jpg',
        description: 'Presented in the annual national invention exhibition program (held on 4-5 September 2024).',
        sourceLabel: 'All Team Awards - Figure 22',
        sourceFile: '/assets/docs/all-team-awards-and-activities-th.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'Presentation to Director General',
        event: 'Department of Empowerment of Persons with Disabilities',
        year: '2024',
        image: '/assets/awards/pdf/all-team-awards-20.jpg',
        description: 'Presented project outcomes to the Director General for disability quality-of-life development.',
        sourceLabel: 'All Team Awards - Figure 23',
        sourceFile: '/assets/docs/all-team-awards-and-activities-th.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'International Conference Presentation',
        event: '2024 International Conference for Peace Sports, Kuala Lumpur',
        year: '2024',
        image: '/assets/awards/pdf/all-team-awards-21.jpg',
        description: 'Presented ALL Wheelchair at International Youth Center (IYC), Kuala Lumpur, on 27 July 2024.',
        sourceLabel: 'All Team Awards - Figure 24',
        sourceFile: '/assets/docs/all-team-awards-and-activities-th.pdf',
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
        sourceLabel: 'All Team Awards - Figure 25',
        sourceFile: '/assets/docs/all-team-awards-and-activities-th.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'IMU Motion Analysis Certificate Evidence',
        event: 'IMU Kinematic Validation Documentation',
        year: '2025',
        image: '/assets/awards/pdf/all-team-awards-24.jpg',
        description: 'Certificate evidence for IMU sensor motion analysis validation against 2D motion analysis.',
        sourceLabel: 'All Team Awards - Figure 26',
        sourceFile: '/assets/docs/all-team-awards-and-activities-th.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'Official Video Presentation Evidence',
        event: 'ALL Wheelchair Research Dissemination',
        year: '2025',
        image: '/assets/awards/pdf/all-team-awards-25.jpg',
        description: 'Official video presentation evidence for ALL Wheelchair innovation dissemination.',
        sourceLabel: 'All Team Awards - Figure 27',
        sourceFile: '/assets/docs/all-team-awards-and-activities-th.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'Petty Patent Evidence (No. 21587)',
        event: 'Thailand Intellectual Property Registration',
        year: '2025',
        image: '/assets/awards/pdf/all-team-awards-26.jpg',
        description: 'Evidence page for Thailand petty patent number 21587.',
        sourceLabel: 'All Team Awards - Figure 28',
        sourceFile: '/assets/docs/all-team-awards-and-activities-th.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'First Place Award Certificate (InnoServe 2024)',
        event: 'International ICT Innovative Services Awards 2024, Taipei',
        year: '2024',
        image: '/assets/awards/pdf/doc-innoserve-award-copy-th.jpg',
        description: 'Official first-place certificate copy for the ALL Wheelchair project at InnoServe 2024.',
        sourceLabel: 'InnoServe Award Certificate',
        sourceFile: '/assets/docs/innoserve-award-copy-th.pdf',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'ALL Wheelchair',
        eraColor: 'era2',
        title: 'IP Portfolio Milestone',
        event: 'Patent and Software Rights Records',
        year: '2025',
        image: '/assets/awards/pdf/doc-all-wheelchair-information.jpg',
        description: 'Documented petty patents (No. 21587 and No. 25548), patent applications, and software copyright records.',
        sourceLabel: 'ALL Wheelchair Information Form',
        sourceFile: '/assets/docs/all-wheelchair-information.pdf',
    },
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense Era',
        eraColor: 'era4',
        title: 'PLOS ONE Publication',
        event: 'The Validity and Reliability of MASSWU',
        year: '2025',
        image: '/assets/awards/pdf/doc-plos-one-masswu-paper.jpg',
        description: 'Peer-reviewed publication in PLOS ONE (DOI: 10.1371/journal.pone.0333391).',
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
        sourceLabel: 'IPITEx Certificate of Appreciation',
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
        description: 'Additional appreciation document maintained in the WheelSense Team records.',
        sourceLabel: 'IPITEx Appreciation',
        sourceFile: '/assets/docs/ipitex-appreciation.pdf',
    },
];

const documents = [
    {
        title: 'Award Recognition (Figure Collection)',
        image: '/assets/awards/pdf/doc-award-recognition.jpg',
        file: '/assets/docs/award-recognition.pdf',
        pages: 12,
        description: 'Compiled award record with figure-based references for YES and ALL Wheelchair.',
    },
    {
        title: 'Awards and Activities Appendix',
        image: '/assets/awards/pdf/doc-awards-and-activities-appendix-th.jpg',
        file: '/assets/docs/awards-and-activities-appendix-th.pdf',
        pages: 14,
        description: 'Appendix document containing awards, activities, and participation records.',
    },
    {
        title: 'All Team Awards and Activities (Extended)',
        image: '/assets/awards/pdf/doc-all-team-awards-and-activities-th.jpg',
        file: '/assets/docs/all-team-awards-and-activities-th.pdf',
        pages: 26,
        description: 'Extended archive with figures 1-28, dissemination evidence, and IP records.',
    },
    {
        title: 'InnoServe Award Certificate Copy',
        image: '/assets/awards/pdf/doc-innoserve-award-copy-th.jpg',
        file: '/assets/docs/innoserve-award-copy-th.pdf',
        pages: 1,
        description: 'Official first-place certificate copy for International ICT Innovative Services Awards 2024.',
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
        description: 'MOU between the Thammasat innovation center and Matsunaga Manufactory.',
    },
    {
        title: 'ALL Wheelchair Information Form',
        image: '/assets/awards/pdf/doc-all-wheelchair-information.jpg',
        file: '/assets/docs/all-wheelchair-information.pdf',
        pages: 21,
        description: 'Comprehensive information system document with implementation and IP milestones.',
    },
    {
        title: 'ALL Wheelchair IC1 Description Form',
        image: '/assets/awards/pdf/doc-all-wheelchair-ic1-description-form.jpg',
        file: '/assets/docs/all-wheelchair-ic1-description-form.pdf',
        pages: 5,
        description: 'IC1 system description for competition submission.',
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
        description: 'Supporting paper file in the project archive.',
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
        description: 'Implementation details with patent, petty patent, and software rights milestones.',
        icon: 'Dossier',
        link: '/assets/docs/all-wheelchair-information.pdf',
    },
    {
        title: 'IC1 Description of Information System',
        journal: 'Contest Technical Form',
        description: 'Structured technical write-up for the ALL Wheelchair AI motion tracking system.',
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
        title: `WheelSense Team Image #${padded}`,
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

document.addEventListener('DOMContentLoaded', async () => {
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
    publicationsGrid.innerHTML = publications.map((item) => renderPublicationCard(item)).join('');
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

    await applyPageOverrides('awards');
    initScrollAnimations();
});
