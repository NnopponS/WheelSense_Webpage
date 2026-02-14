// Awards & Achievements Page
import { createNavbar } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';
import { initSmoothScroll } from '../components/smooth-scroll.js';
import { initScrollAnimations } from '../components/scroll-animations.js';

// === Awards Data ===
const awards = [
    // --- Yes WheelChair ---
    {
        era: 'yes-wheelchair',
        eraLabel: 'Yes WheelChair',
        eraColor: 'era1',
        title: 'National Software Contest (NSC)',
        event: 'NSC 2024 — Software Competition',
        year: '2024',
        image: '/WheelSenseTEAM/Image/LINE_ALBUM_NSC 3172024_240911_1_0.jpg',
        description: 'Competed in the National Software Contest with IoT-enabled wheelchair health monitoring system.',
    },
    {
        era: 'yes-wheelchair',
        eraLabel: 'Yes WheelChair',
        eraColor: 'era1',
        title: 'Gear Talent Competition',
        event: 'Gear Talent — Engineering Innovation',
        year: '2024',
        image: '/WheelSenseTEAM/Image/LINE_ALBUM_Gear Talent_240714_1.jpg',
        description: 'Showcased wheelchair digitization technology with IoT sensors for health metrics and fall detection.',
    },
    {
        era: 'yes-wheelchair',
        eraLabel: 'Yes WheelChair',
        eraColor: 'era1',
        title: 'Early Prototype Testing',
        event: 'University Research Lab',
        year: '2023',
        image: '/WheelSenseTEAM/Image/ทดสอบ_0.jpg',
        description: 'Initial prototype testing of embedded sensors for distance tracking, calorie measurement, and safety monitoring.',
    },
    {
        era: 'yes-wheelchair',
        eraLabel: 'Yes WheelChair',
        eraColor: 'era1',
        title: 'System Architecture Design',
        event: 'Development Phase',
        year: '2023',
        image: '/WheelSenseTEAM/Image/ภาพที่ 1_0.jpg',
        description: 'Designed the foundational architecture for IoT sensor integration with wheelchair mobility tracking.',
    },
    {
        era: 'yes-wheelchair',
        eraLabel: 'Yes WheelChair',
        eraColor: 'era1',
        title: 'Hardware Integration',
        event: 'Development Phase',
        year: '2023',
        image: '/WheelSenseTEAM/Image/ภาพที่ 2_0.jpg',
        description: 'Successfully integrated accelerometer and gyroscope sensors for real-time motion analysis.',
    },

    // --- All WheelChair ---
    {
        era: 'all-wheelchair',
        eraLabel: 'All WheelChair',
        eraColor: 'era2',
        title: 'TU Hackathon Winner',
        event: 'Thammasat University Hackathon',
        year: '2024',
        image: '/WheelSenseTEAM/Image/LINE_ALBUM_TU Hackathon_240714_3.jpg',
        description: 'Won the Thammasat University Hackathon with motion-controlled gaming for wheelchair rehabilitation.',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'All WheelChair',
        eraColor: 'era2',
        title: 'HackMED 2024',
        event: 'Medical Innovation Hackathon',
        year: '2024',
        image: '/WheelSenseTEAM/Image/LINE_ALBUM_HackMED_240911_1_0.jpg',
        description: 'Presented exergaming platform at HackMED, bridging rehabilitation and interactive gaming technology.',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'All WheelChair',
        eraColor: 'era2',
        title: 'HackMED Awards Ceremony',
        event: 'Medical Innovation Recognition',
        year: '2024',
        image: '/WheelSenseTEAM/Image/LINE_ALBUM_Hack MED 2024_240923_1.jpg',
        description: 'Recognized for innovative approach to wheelchair rehabilitation through gamification.',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'All WheelChair',
        eraColor: 'era2',
        title: 'SIC 2024 Finalist',
        event: 'Seoul International Competition',
        year: '2024',
        image: '/WheelSenseTEAM/Image/LINE_ALBUM_gSIC_240911_1_0.jpg',
        description: 'Selected as finalist at the Seoul International Invention Competition for All WheelChair innovation.',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'All WheelChair',
        eraColor: 'era2',
        title: 'Wrist Motion Controller',
        event: 'All WheelChair — Motion Tracking',
        year: '2024',
        image: '/WheelSenseTEAM/Image/ALL Wrist_0.jpg',
        description: 'Developed wrist-based motion controller for wheelchair-integrated gaming and rehabilitation exercises.',
    },
    {
        era: 'all-wheelchair',
        eraLabel: 'All WheelChair',
        eraColor: 'era2',
        title: 'Thammasat SIC Entry',
        event: 'Seoul International Competition Entry',
        year: '2024',
        image: '/WheelSenseTEAM/Image/LINE_ALBUM_23367_๒๔๐๓๓๑_1_0.jpg',
        description: 'Official entry to the Seoul International Competition representing Thammasat University.',
    },

    // --- WheelSense ---
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense',
        eraColor: 'era4',
        title: 'IPITEx Gold Medal',
        event: 'IP Innovation & Technology Expo',
        year: '2024',
        image: '/WheelSenseTEAM/Image/481264955_986298036928629_2841765739333523606_n_0.jpg',
        description: 'Awarded Gold Medal at IPITEx for AI-powered smart environment system for wheelchair users.',
    },
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense',
        eraColor: 'era4',
        title: 'IPITEx Exhibition',
        event: 'IP Innovation & Technology Expo',
        year: '2024',
        image: '/WheelSenseTEAM/Image/481069527_986297336928699_5808516755845027330_n_0.jpg',
        description: 'Live demonstration of WheelSense AI system at the IPITEx international exhibition.',
    },
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense',
        eraColor: 'era4',
        title: 'IPITEx Team Showcase',
        event: 'IP Innovation & Technology Expo',
        year: '2024',
        image: '/WheelSenseTEAM/Image/481184435_986297960261970_6383145817019712110_n_0.jpg',
        description: 'Full team presentation of the WheelSense ecosystem including computer vision and smart home integration.',
    },
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense',
        eraColor: 'era4',
        title: 'IPITEx Demo Booth',
        event: 'IP Innovation & Technology Expo',
        year: '2024',
        image: '/WheelSenseTEAM/Image/481255871_986297083595391_1454981848760133248_n_0.jpg',
        description: 'Interactive booth demonstrating real-time AI assistance for wheelchair users.',
    },
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense',
        eraColor: 'era4',
        title: 'Thailand Research Expo',
        event: 'National Research Council of Thailand',
        year: '2024',
        image: '/WheelSenseTEAM/Image/LINE_ALBUM_260867 research expo_240911_1_0.jpg',
        description: 'Featured at Thailand Research Expo showcasing AI and computer vision for assistive technology.',
    },
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense',
        eraColor: 'era4',
        title: 'InnoServe Award',
        event: 'International Innovation in Services Award',
        year: '2024',
        image: '/WheelSenseTEAM/Image/LINE_ALBUM_261067_251106_1_0.jpg',
        description: 'Received the InnoServe Award for innovation in assistive technology services.',
    },
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense',
        eraColor: 'era4',
        title: 'International Exhibition',
        event: 'International Innovation Showcase',
        year: '2024',
        image: '/WheelSenseTEAM/Image/LINE_ALBUM_191067_251106_1_0.jpg',
        description: 'Showcased WheelSense at an international innovation exhibition, demonstrating smart home integration.',
    },
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense',
        eraColor: 'era4',
        title: 'November Innovation Fair',
        event: 'Innovation Exhibition',
        year: '2024',
        image: '/WheelSenseTEAM/Image/LINE_ALBUM_2 พย_251106_1_0.jpg',
        description: 'Presented latest WheelSense v2.0 features at the November Innovation Fair.',
    },
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense',
        eraColor: 'era4',
        title: 'NSTDA Showcase',
        event: 'National Science and Technology Development Agency',
        year: '2024',
        image: '/WheelSenseTEAM/Image/LINE_ALBUM_201067_251106_1_0.jpg',
        description: 'Demonstrated AI-driven wheelchair safety and smart environment at the NSTDA national showcase.',
    },
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense',
        eraColor: 'era4',
        title: 'MOU Signing with Matsunaga',
        event: 'Matsunaga International Partnership',
        year: '2024',
        image: '/WheelSenseTEAM/Image/LINE_ALBUM_201067_251106_2_0.jpg',
        description: 'Signed a Memorandum of Understanding with Matsunaga for international collaboration on assistive technology.',
    },
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense',
        eraColor: 'era4',
        title: 'Award Ceremony',
        event: 'National Innovation Awards',
        year: '2024',
        image: '/WheelSenseTEAM/Image/S__13148169_0_0.jpg',
        description: 'Received national recognition for contributions to wheelchair innovation and AI-driven assistive technology.',
    },
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense',
        eraColor: 'era4',
        title: 'Team Recognition',
        event: 'National Innovation Awards',
        year: '2024',
        image: '/WheelSenseTEAM/Image/S__13148171_0_0.jpg',
        description: 'Full team recognized at the National Innovation Awards ceremony for WheelSense project.',
    },
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense',
        eraColor: 'era4',
        title: 'Innovation Display',
        event: 'National Technology Exhibition',
        year: '2024',
        image: '/WheelSenseTEAM/Image/pic-20243110-1730361463-143-810_0.jpg',
        description: 'WheelSense featured at a national technology exhibition highlighting AI and IoT integration.',
    },
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense',
        eraColor: 'era4',
        title: 'Demonstration & Media',
        event: 'National Technology Exhibition',
        year: '2024',
        image: '/WheelSenseTEAM/Image/pic-20243110-1730361463-143-871_0.jpg',
        description: 'Media coverage and live demonstrations of the WheelSense AI-powered wheelchair system.',
    },
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense',
        eraColor: 'era4',
        title: 'Nice One Achievement',
        event: 'Team Celebration',
        year: '2025',
        image: '/WheelSenseTEAM/Image/LINE_ALBUM_Nice one ☝️_250325_1_0.jpg',
        description: 'Celebrating continued achievements and milestones in the WheelSense journey.',
    },
    {
        era: 'wheelsense',
        eraLabel: 'WheelSense',
        eraColor: 'era4',
        title: 'WheelSense Exhibition',
        event: 'Innovation Display',
        year: '2025',
        image: '/WheelSenseTEAM/Image/LINE_ALBUM_02112024_250325_1.jpg',
        description: 'Latest WheelSense system exhibited at innovation showcase with full smart home integration demo.',
    },
];

// === Certificates Data ===
const certificates = [
    {
        title: 'IPITEx Certificate of Appreciation',
        image: '/WheelSenseTEAM/Image/ใบประกา.jpg',
        description: 'Official certificate from IP Innovation & Technology Expo',
    },
    {
        title: 'Award Recognition Certificate',
        image: '/WheelSenseTEAM/Image/S__98131980.jpg',
        description: 'Official award recognition certificate',
    },
    {
        title: 'Innovation Award Certificate',
        image: '/WheelSenseTEAM/Image/S__98131981_0.jpg',
        description: 'Innovation achievement certificate',
    },
    {
        title: 'Excellence Award',
        image: '/WheelSenseTEAM/Image/S__98131983_0_0.jpg',
        description: 'Certificate of excellence in assistive technology',
    },
    {
        title: 'Research Recognition',
        image: '/WheelSenseTEAM/Image/S__98131985_0_0.jpg',
        description: 'Research recognition and academic achievement',
    },
    {
        title: 'Special Contribution Award',
        image: '/WheelSenseTEAM/Image/S__98131986_0_0.jpg',
        description: 'Special contribution to assistive technology innovation',
    },
    {
        title: 'Outstanding Project Award',
        image: '/WheelSenseTEAM/Image/S__98131987_0_0.jpg',
        description: 'Outstanding project recognition certificate',
    },
    {
        title: 'International Competition',
        image: '/WheelSenseTEAM/Image/S__20496512.jpg',
        description: 'International competition participation certificate',
    },
];

// === Publications Data ===
const publications = [
    {
        title: 'PLOS ONE — Motion Tracking for Wheelchair Users',
        journal: 'PLOS ONE (Peer-Reviewed)',
        year: '2024',
        description: 'Published research on wheelchair motion tracking systems with novel motion-controlled gaming for encouraging physical activity among wheelchair users.',
        icon: '📄',
        link: '#',
    },
    {
        title: 'ALL Wheelchair Motion Tracking System',
        journal: 'Conference Paper',
        year: '2024',
        description: 'Presented a novel motion-controlled gaming system for encouraging physical activity among wheelchair users.',
        icon: '📑',
        link: '#',
    },
    {
        title: 'IC1 — Information System Description',
        journal: 'Technical Documentation',
        year: '2024',
        description: 'Comprehensive technical documentation of the ALL Wheelchair information system architecture and implementation.',
        icon: '📋',
        link: '#',
    },
];

// === Render Functions ===

function renderAwardCard(award, index) {
    return `
    <div class="award-card" data-era="${award.era}" style="--delay: ${index * 0.05}s">
      <div class="award-card__image-wrap">
        <img class="award-card__image" src="${award.image}" alt="${award.title}" loading="lazy" />
        <div class="award-card__overlay">
          <span class="award-card__zoom">🔍 View</span>
        </div>
      </div>
      <div class="award-card__content">
        <div class="award-card__badge award-card__badge--${award.eraColor}">
          ${award.eraLabel}
        </div>
        <h3 class="award-card__title">${award.title}</h3>
        <p class="award-card__event">${award.event}</p>
        <p class="award-card__desc">${award.description}</p>
        <div class="award-card__year">${award.year}</div>
      </div>
    </div>
  `;
}

function renderCertCard(cert, index) {
    return `
    <div class="cert-card" style="--delay: ${index * 0.08}s">
      <div class="cert-card__image-wrap" data-lightbox="${cert.image}">
        <img class="cert-card__image" src="${cert.image}" alt="${cert.title}" loading="lazy" />
        <div class="cert-card__overlay">
          <span class="cert-card__zoom">🔍 View Full Size</span>
        </div>
      </div>
      <div class="cert-card__info">
        <h4 class="cert-card__title">${cert.title}</h4>
        <p class="cert-card__desc">${cert.description}</p>
      </div>
    </div>
  `;
}

function renderPubCard(pub) {
    return `
    <div class="pub-card glass-card">
      <div class="pub-card__icon">${pub.icon}</div>
      <div class="pub-card__content">
        <h3 class="pub-card__title">${pub.title}</h3>
        <p class="pub-card__journal">${pub.journal} · ${pub.year}</p>
        <p class="pub-card__desc">${pub.description}</p>
      </div>
    </div>
  `;
}

// === Initialize ===
document.addEventListener('DOMContentLoaded', () => {
    // Hide loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('is-hidden');
        setTimeout(() => loader.remove(), 600);
    }, 800);

    // Navbar & Footer
    createNavbar('awards');
    createFooter();

    // Smooth scroll
    initSmoothScroll();

    // Render awards
    const awardsGrid = document.getElementById('awardsGrid');
    awardsGrid.innerHTML = awards.map((a, i) => renderAwardCard(a, i)).join('');

    // Render certificates
    const certGallery = document.getElementById('certGallery');
    certGallery.innerHTML = certificates.map((c, i) => renderCertCard(c, i)).join('');

    // Render publications
    const pubsGrid = document.getElementById('publicationsGrid');
    pubsGrid.innerHTML = publications.map(p => renderPubCard(p)).join('');

    // === Filter Logic ===
    const filterBtns = document.querySelectorAll('.awards-filter__tab');
    const allCards = () => document.querySelectorAll('.award-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');

            const filter = btn.dataset.filter;
            const cards = allCards();

            cards.forEach((card, i) => {
                const era = card.dataset.era;
                const show = filter === 'all' || era === filter;

                if (show) {
                    card.style.display = '';
                    card.style.animation = `fadeSlideIn 0.5s ${i * 0.03}s both`;
                } else {
                    card.style.animation = 'fadeSlideOut 0.3s both';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        });
    });

    // === Lightbox ===
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    // Award card image click
    document.addEventListener('click', (e) => {
        const overlay = e.target.closest('.award-card__overlay') || e.target.closest('.cert-card__overlay');
        if (overlay) {
            const wrap = overlay.closest('.award-card__image-wrap') || overlay.closest('.cert-card__image-wrap');
            const img = wrap.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightbox.classList.add('is-active');
                document.body.style.overflow = 'hidden';
            }
        }
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('is-active');
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('is-active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
            lightbox.classList.remove('is-active');
            document.body.style.overflow = '';
        }
    });

    // Hero fade on scroll
    const heroContent = document.querySelector('.awards-hero__content');
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

    // Scroll animations
    initScrollAnimations();
});
