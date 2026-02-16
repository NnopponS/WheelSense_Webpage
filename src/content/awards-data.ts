const profileImages = {
  worapon: '/assets/awards/Profile/Worapon_Profile.png',
  supawit: '/assets/awards/Profile/Supawit_Profile.png',
  surasak: '/assets/awards/Profile/Surasak_Profile.png',
  teerapat: '/assets/awards/Profile/Teerapat_Profile.png',
  darawadee: '/assets/awards/Profile/Darawadee_Profile.png',
  sairag: '/assets/awards/Profile/Sairag_Profile.jpg',
  supachai: '/assets/awards/Profile/Supachai_Profile.jpg',
};

export const defaultVerifiedMilestones = [
  {
    id: 'yes-kide-2023-dual-awards',
    era: 'yes-wheelchair',
    eraLabel: 'YES Wheelchair',
    eraColor: 'era1',
    title: 'Grand Prize and Gold Medal',
    event: 'Kaohsiung International Invention and Design EXPO (KIDE), Taiwan',
    year: '2023',
    description: 'YES Wheelchair received dual international recognition as both Grand Prize and Gold Medal winner.',
    images: [
      '/assets/awards/pdf/award-recognition-01.jpg',
      '/assets/awards/pdf/award-recognition-02.jpg',
      '/assets/awards/pdf/all-team-awards-14.jpg',
      '/assets/awards/photos/team-photo-014.jpg'
    ],
    sourceLabel: 'Award Recognition Collection',
    sourceFile: '/assets/docs/award-recognition.pdf',
    contributors: [
      { name: 'Worapon Sangsasri', profileImage: profileImages.worapon },
      { name: 'Suppawit Ausawalaithong', profileImage: profileImages.supawit },
      { name: 'Assoc. Prof. Sairag Saadprai', profileImage: profileImages.sairag }
    ]
  },
  {
    id: 'all-major-competition-2024',
    era: 'all-wheelchair',
    eraLabel: 'ALL Wheelchair',
    eraColor: 'era2',
    title: 'Major Competition Wins and Medals',
    event: 'Thammasat Hackathon, GEAR TALENT, and GSIC China',
    year: '2024',
    description: 'ALL Wheelchair achieved major awards across national and international innovation competitions.',
    images: [
      '/assets/awards/pdf/award-recognition-08.jpg',
      '/assets/awards/pdf/award-recognition-10.jpg',
      '/assets/awards/pdf/award-recognition-11.jpg',
      '/assets/awards/photos/team-photo-029.jpg'
    ],
    sourceLabel: 'Award Recognition Collection',
    sourceFile: '/assets/docs/award-recognition.pdf',
    contributors: [
      { name: 'Worapon Sangsasri', profileImage: profileImages.worapon },
      { name: 'Surasak Sangdao', profileImage: profileImages.surasak },
      { name: 'Teerapat Thongtae', profileImage: profileImages.teerapat }
    ]
  },
  {
    id: 'all-international-presentations-2024',
    era: 'all-wheelchair',
    eraLabel: 'ALL Wheelchair',
    eraColor: 'era2',
    title: 'International Presentations and Outreach',
    event: 'Social Business Academia and IYC Kuala Lumpur',
    year: '2024',
    description: 'The team represented ALL Wheelchair in international conferences and public innovation channels.',
    images: [
      '/assets/awards/pdf/award-recognition-09.jpg',
      '/assets/awards/pdf/all-team-awards-21.jpg',
      '/assets/awards/pdf/all-team-awards-15.jpg',
      '/assets/awards/photos/team-photo-033.jpg'
    ],
    sourceLabel: 'All Team Awards and Activities',
    sourceFile: '/assets/docs/all-team-awards-and-activities-th.pdf',
    contributors: [
      { name: 'Darawadee Panich', profileImage: profileImages.darawadee },
      { name: 'Assoc. Prof. Sairag Saadprai', profileImage: profileImages.sairag },
      { name: 'Asst. Prof. Supachai Vorapojpisut', profileImage: profileImages.supachai }
    ]
  },
  {
    id: 'all-public-sector-showcase-2024',
    era: 'all-wheelchair',
    eraLabel: 'ALL Wheelchair',
    eraColor: 'era2',
    title: 'Public-Sector and National Program Showcase',
    event: 'Innovation for Aged Society and National Invention Programs',
    year: '2024',
    description: 'ALL Wheelchair was selected and presented in key public-sector innovation and disability-focused programs.',
    images: [
      '/assets/awards/pdf/all-team-awards-18.jpg',
      '/assets/awards/pdf/all-team-awards-19.jpg',
      '/assets/awards/pdf/all-team-awards-20.jpg',
      '/assets/awards/photos/team-photo-041.jpg'
    ],
    sourceLabel: 'All Team Awards and Activities',
    sourceFile: '/assets/docs/all-team-awards-and-activities-th.pdf',
    contributors: [
      { name: 'Surasak Sangdao', profileImage: profileImages.surasak },
      { name: 'Teerapat Thongtae', profileImage: profileImages.teerapat },
      { name: 'Darawadee Panich', profileImage: profileImages.darawadee }
    ]
  },
  {
    id: 'wheelsense-mou-and-ipitex',
    era: 'wheelsense',
    eraLabel: 'WheelSense Era',
    eraColor: 'era4',
    title: 'MOU and International Appreciation Milestones',
    event: 'Matsunaga Partnership and IPITEx Recognition',
    year: '2025',
    description: 'WheelSense entered strategic collaboration and received international recognition documents through IPITEx.',
    images: [
      '/assets/awards/pdf/doc-mou-matsunaga.jpg',
      '/assets/awards/pdf/doc-ipitex-certificate-of-appreciation.jpg',
      '/assets/awards/pdf/doc-ipitex-appreciation.jpg',
      '/assets/awards/photos/team-photo-052.png'
    ],
    sourceLabel: 'Official Supporting Documents',
    sourceFile: '/assets/docs/mou-matsunaga.pdf',
    contributors: [
      { name: 'Worapon Sangsasri', profileImage: profileImages.worapon },
      { name: 'Asst. Prof. Supachai Vorapojpisut', profileImage: profileImages.supachai }
    ]
  },
  {
    id: 'wheelsense-plos-one-publication',
    era: 'wheelsense',
    eraLabel: 'WheelSense Era',
    eraColor: 'era4',
    title: 'PLOS ONE Research Publication',
    event: 'MASSWU Validation and Reliability Study',
    year: '2025',
    description: 'The MASSWU study was published in PLOS ONE, validating reliability and clinical relevance for wheelchair motion analysis.',
    images: [
      '/assets/awards/pdf/doc-plos-one-masswu-paper.jpg',
      '/assets/awards/pdf/doc-all-wheelchair-information.jpg',
      '/assets/awards/photos/team-photo-057.jpg'
    ],
    sourceLabel: 'PLOS ONE Paper',
    sourceFile: '/assets/docs/plos-one-masswu-paper.pdf',
    contributors: [
      { name: 'Darawadee Panich', profileImage: profileImages.darawadee },
      { name: 'Worapon Sangsasri', profileImage: profileImages.worapon },
      { name: 'Assoc. Prof. Sairag Saadprai', profileImage: profileImages.sairag }
    ]
  }
];

export const defaultCertificates = [
  {
    id: 'plos-one-masswu-paper',
    title: 'PLOS ONE MASSWU Full Paper',
    image: '/assets/awards/pdf/doc-plos-one-masswu-paper.jpg',
    file: '/assets/docs/plos-one-masswu-paper.pdf',
    pages: 15,
    year: '2025',
    description: 'Peer-reviewed publication source file for MASSWU validation and reliability study.'
  },
  {
    id: 'mou-matsunaga',
    title: 'MOU with Matsunaga Manufactory',
    image: '/assets/awards/pdf/doc-mou-matsunaga.jpg',
    file: '/assets/docs/mou-matsunaga.pdf',
    pages: 1,
    year: '2025',
    description: 'Official collaboration document referenced in WheelSense milestones.'
  },
  {
    id: 'ipitex-certificate',
    title: 'IPITEx Certificate of Appreciation',
    image: '/assets/awards/pdf/doc-ipitex-certificate-of-appreciation.jpg',
    file: '/assets/docs/ipitex-certificate-of-appreciation.pdf',
    pages: 1,
    year: '2025',
    description: 'Official international appreciation certificate for the team.'
  },
  {
    id: 'ipitex-appreciation',
    title: 'IPITEx Appreciation Document',
    image: '/assets/awards/pdf/doc-ipitex-appreciation.jpg',
    file: '/assets/docs/ipitex-appreciation.pdf',
    pages: 1,
    year: '2025',
    description: 'Supporting appreciation document connected to the IPITEx milestone.'
  },
  {
    id: 'all-wheelchair-information',
    title: 'ALL Wheelchair Information Form',
    image: '/assets/awards/pdf/doc-all-wheelchair-information.jpg',
    file: '/assets/docs/all-wheelchair-information.pdf',
    pages: 21,
    year: '2025',
    description: 'Comprehensive technical dossier with patent and software-right information.'
  },
  {
    id: 'all-wheelchair-ic1',
    title: 'ALL Wheelchair IC1 Description Form',
    image: '/assets/awards/pdf/doc-all-wheelchair-ic1-description-form.jpg',
    file: '/assets/docs/all-wheelchair-ic1-description-form.pdf',
    pages: 5,
    year: '2025',
    description: 'Structured IC1 technical description for competition and review.'
  },
  {
    id: 'all-wheelchair-sic-entry',
    title: 'SIC Thailand 2024 Entry Form',
    image: '/assets/awards/pdf/doc-all-wheelchair-sic-2024-entry-form.jpg',
    file: '/assets/docs/all-wheelchair-sic-2024-entry-form.pdf',
    pages: 40,
    year: '2024',
    description: 'Official competition entry document connected to the ALL Wheelchair milestones.'
  },
  {
    id: 'award-recognition-collection',
    title: 'Award Recognition Figure Collection',
    image: '/assets/awards/pdf/doc-award-recognition.jpg',
    file: '/assets/docs/award-recognition.pdf',
    pages: 12,
    year: '2023-2024',
    description: 'Primary award evidence for YES Wheelchair and ALL Wheelchair international results.'
  },
  {
    id: 'all-team-awards-activities',
    title: 'All Team Awards and Activities',
    image: '/assets/awards/pdf/doc-all-team-awards-and-activities-th.jpg',
    file: '/assets/docs/all-team-awards-and-activities-th.pdf',
    pages: 26,
    year: '2024',
    description: 'Extended evidence file for outreach, participation, and supporting award references.'
  }
];

export const defaultAwardPublications = [
  {
    title: 'PLOS ONE: MASSWU Validation and Reliability Study',
    journal: 'PLOS ONE, 2025',
    description: 'The validity and reliability of the Motion Analysis Sensor System for Wheelchair Users (MASSWU). DOI: 10.1371/journal.pone.0333391.',
    icon: 'Research',
    link: 'https://doi.org/10.1371/journal.pone.0333391'
  },
  {
    title: 'ALL Wheelchair Information System Document',
    journal: 'Technical Innovation Dossier',
    description: 'Implementation details including patent, petty patent, and software rights milestones.',
    icon: 'IP',
    link: '/assets/docs/all-wheelchair-information.pdf'
  },
  {
    title: 'IC1 Description of Information System',
    journal: 'Competition Technical Form',
    description: 'Formal technical write-up for the ALL Wheelchair motion tracking system architecture.',
    icon: 'Document',
    link: '/assets/docs/all-wheelchair-ic1-description-form.pdf'
  }
];

export function cloneAwardsData() {
  return {
    verifiedMilestones: JSON.parse(JSON.stringify(defaultVerifiedMilestones)),
    certificates: JSON.parse(JSON.stringify(defaultCertificates)),
    publications: JSON.parse(JSON.stringify(defaultAwardPublications))
  };
}
