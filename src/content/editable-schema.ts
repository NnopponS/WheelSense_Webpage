import { defaultTeamMembers } from './team-data.ts';
import {
  defaultAwardPublications,
  defaultCertificates,
  defaultVerifiedMilestones,
} from './awards-data.ts';

const defaultTeamMembersJson = JSON.stringify(defaultTeamMembers, null, 2);
const defaultVerifiedMilestonesJson = JSON.stringify(defaultVerifiedMilestones, null, 2);
const defaultCertificatesJson = JSON.stringify(defaultCertificates, null, 2);
const defaultPublicationsJson = JSON.stringify(defaultAwardPublications, null, 2);

export const editablePages = [
  {
    key: 'home',
    title: 'Home',
    path: '/',
    fields: [
      { id: 'meta.title', label: 'Meta Title', selector: 'head > title', type: 'text' },
      { id: 'meta.description', label: 'Meta Description', selector: 'meta[name="description"]', type: 'attr', attr: 'content', multiline: true },
      { id: 'hero.title', label: 'Hero Title', selector: '.hero__title', type: 'text' },
      { id: 'hero.subtitle', label: 'Hero Subtitle', selector: '.hero__subtitle', type: 'text' },
      { id: 'hero.description', label: 'Hero Description', selector: '.hero__description', type: 'text', multiline: true },
      { id: 'hero.cta.primary', label: 'Hero Primary Button', selector: '.hero__cta-group a:nth-child(1)', type: 'text' },
      { id: 'hero.cta.secondary', label: 'Hero Secondary Button', selector: '.hero__cta-group a:nth-child(2)', type: 'text' },
      { id: 'intro.heading', label: 'Intro Heading', selector: '#introduction .h2', type: 'text' },
      { id: 'intro.paragraph.1', label: 'Intro Paragraph 1', selector: '#introduction .reveal:nth-of-type(2) p', type: 'text', multiline: true },
      { id: 'intro.paragraph.2', label: 'Intro Paragraph 2', selector: '#introduction .reveal:nth-of-type(3) p', type: 'text', multiline: true },
      { id: 'story.label', label: 'Story Section Label', selector: '#storyPreview .reveal p', type: 'text' },
      { id: 'story.heading', label: 'Story Section Heading', selector: '#storyPreview .reveal h2', type: 'text' },
      { id: 'story.era1.title', label: 'Era 1 Title', selector: '#eraGrid .era-card:nth-child(1) .era-card__title', type: 'text' },
      { id: 'story.era1.description', label: 'Era 1 Description', selector: '#eraGrid .era-card:nth-child(1) .era-card__description', type: 'text', multiline: true },
      { id: 'story.era2.title', label: 'Era 2 Title', selector: '#eraGrid .era-card:nth-child(2) .era-card__title', type: 'text' },
      { id: 'story.era2.description', label: 'Era 2 Description', selector: '#eraGrid .era-card:nth-child(2) .era-card__description', type: 'text', multiline: true },
      { id: 'story.era3.title', label: 'Era 3 Title', selector: '#eraGrid .era-card:nth-child(3) .era-card__title', type: 'text' },
      { id: 'story.era3.description', label: 'Era 3 Description', selector: '#eraGrid .era-card:nth-child(3) .era-card__description', type: 'text', multiline: true },
      { id: 'story.era4.title', label: 'Era 4 Title', selector: '#eraGrid .era-card:nth-child(4) .era-card__title', type: 'text' },
      { id: 'story.era4.description', label: 'Era 4 Description', selector: '#eraGrid .era-card:nth-child(4) .era-card__description', type: 'text', multiline: true },
      { id: 'portfolio.label', label: 'Portfolio Label', selector: '#portfolio .reveal p', type: 'text' },
      { id: 'portfolio.heading', label: 'Portfolio Heading', selector: '#portfolio .reveal h2', type: 'text' },
      { id: 'portfolio.featured.title', label: 'Featured Card Title', selector: '#bentoGrid .bento-grid__item:nth-child(1) .h3', type: 'text' },
      { id: 'portfolio.featured.description', label: 'Featured Card Description', selector: '#bentoGrid .bento-grid__item:nth-child(1) .text-secondary', type: 'text', multiline: true },
      { id: 'awards.label', label: 'Awards Section Label', selector: '#awards .reveal p', type: 'text' },
      { id: 'awards.heading', label: 'Awards Section Heading', selector: '#awards .reveal h2', type: 'text' },
      { id: 'team.label', label: 'Team Section Label', selector: '#teamPreview .reveal p', type: 'text' },
      { id: 'team.heading', label: 'Team Section Heading', selector: '#teamPreview .reveal h2', type: 'text' },
      { id: 'cta.title', label: 'Final CTA Title', selector: '#finalCta .cta-section__title', type: 'text' },
      { id: 'cta.button', label: 'Final CTA Button', selector: '#finalCta .btn', type: 'text' }
    ]
  },
  {
    key: 'story',
    title: 'Story',
    path: '/story.html',
    fields: [
      { id: 'meta.title', label: 'Meta Title', selector: 'head > title', type: 'text' },
      { id: 'meta.description', label: 'Meta Description', selector: 'meta[name="description"]', type: 'attr', attr: 'content', multiline: true },
      { id: 'hero.label', label: 'Hero Label', selector: 'main > section.hero .text-small', type: 'text' },
      { id: 'hero.title', label: 'Hero Title', selector: 'main > section.hero .h1', type: 'text' },
      { id: 'hero.description', label: 'Hero Description', selector: 'main > section.hero .hero__description', type: 'text', multiline: true },
      { id: 'phase.0.title', label: 'Phase 0 Title', selector: '.story-phase[data-phase="0"] .story-phase__title', type: 'text' },
      { id: 'phase.0.subtitle', label: 'Phase 0 Subtitle', selector: '.story-phase[data-phase="0"] .story-phase__subtitle', type: 'text' },
      { id: 'phase.0.text.1', label: 'Phase 0 Paragraph 1', selector: '.story-phase[data-phase="0"] .story-phase__text:nth-of-type(3)', type: 'text', multiline: true },
      { id: 'phase.0.text.2', label: 'Phase 0 Paragraph 2', selector: '.story-phase[data-phase="0"] .story-phase__text:nth-of-type(4)', type: 'text', multiline: true },
      { id: 'phase.1.title', label: 'Phase 1 Title', selector: '.story-phase[data-phase="1"] .story-phase__title', type: 'text' },
      { id: 'phase.1.subtitle', label: 'Phase 1 Subtitle', selector: '.story-phase[data-phase="1"] .story-phase__subtitle', type: 'text' },
      { id: 'phase.1.text.1', label: 'Phase 1 Paragraph 1', selector: '.story-phase[data-phase="1"] .story-phase__text:nth-of-type(3)', type: 'text', multiline: true },
      { id: 'phase.1.text.2', label: 'Phase 1 Paragraph 2', selector: '.story-phase[data-phase="1"] .story-phase__text:nth-of-type(4)', type: 'text', multiline: true },
      { id: 'phase.2.title', label: 'Phase 2 Title', selector: '.story-phase[data-phase="2"] .story-phase__title', type: 'text' },
      { id: 'phase.2.subtitle', label: 'Phase 2 Subtitle', selector: '.story-phase[data-phase="2"] .story-phase__subtitle', type: 'text' },
      { id: 'phase.2.text.1', label: 'Phase 2 Paragraph 1', selector: '.story-phase[data-phase="2"] .story-phase__text:nth-of-type(3)', type: 'text', multiline: true },
      { id: 'phase.2.text.2', label: 'Phase 2 Paragraph 2', selector: '.story-phase[data-phase="2"] .story-phase__text:nth-of-type(4)', type: 'text', multiline: true },
      { id: 'phase.3.title', label: 'Phase 3 Title', selector: '.story-phase[data-phase="3"] .story-phase__title', type: 'text' },
      { id: 'phase.3.subtitle', label: 'Phase 3 Subtitle', selector: '.story-phase[data-phase="3"] .story-phase__subtitle', type: 'text' },
      { id: 'phase.3.text.1', label: 'Phase 3 Paragraph 1', selector: '.story-phase[data-phase="3"] .story-phase__text:nth-of-type(3)', type: 'text', multiline: true },
      { id: 'phase.3.text.2', label: 'Phase 3 Paragraph 2', selector: '.story-phase[data-phase="3"] .story-phase__text:nth-of-type(4)', type: 'text', multiline: true },
      { id: 'phase.4.title', label: 'Phase 4 Title', selector: '.story-phase[data-phase="4"] .story-phase__title', type: 'text' },
      { id: 'phase.4.subtitle', label: 'Phase 4 Subtitle', selector: '.story-phase[data-phase="4"] .story-phase__subtitle', type: 'text' },
      { id: 'phase.4.text.1', label: 'Phase 4 Paragraph 1', selector: '.story-phase[data-phase="4"] .story-phase__text:nth-of-type(3)', type: 'text', multiline: true },
      { id: 'phase.4.text.2', label: 'Phase 4 Paragraph 2', selector: '.story-phase[data-phase="4"] .story-phase__text:nth-of-type(4)', type: 'text', multiline: true },
      { id: 'ending.title', label: 'Ending Title', selector: '#storyEnding .story-ending__title', type: 'text' },
      { id: 'ending.cta.primary', label: 'Ending Primary Button', selector: '#storyEnding .story-ending__cta-group .btn:nth-child(1)', type: 'text' },
      { id: 'ending.cta.secondary', label: 'Ending Secondary Button', selector: '#storyEnding .story-ending__cta-group .btn:nth-child(2)', type: 'text' }
    ]
  },
  {
    key: 'projects',
    title: 'Projects',
    path: '/projects.html',
    fields: [
      { id: 'meta.title', label: 'Meta Title', selector: 'head > title', type: 'text' },
      { id: 'meta.description', label: 'Meta Description', selector: 'meta[name="description"]', type: 'attr', attr: 'content', multiline: true },
      { id: 'hero.label', label: 'Hero Label', selector: '.projects-hero .text-small', type: 'text' },
      { id: 'hero.title', label: 'Hero Title', selector: '.projects-hero .h1', type: 'text' },
      { id: 'hero.description', label: 'Hero Description', selector: '.projects-hero .text-body-lg', type: 'text', multiline: true },
      { id: 'card.yes.title', label: 'YES Card Title', selector: '.project-card[data-project="yes-wheelchair"] .project-card__title', type: 'text' },
      { id: 'card.yes.subtitle', label: 'YES Card Subtitle', selector: '.project-card[data-project="yes-wheelchair"] .project-card__subtitle', type: 'text', multiline: true },
      { id: 'card.all.title', label: 'ALL Card Title', selector: '.project-card[data-project="all-wheelchair"] .project-card__title', type: 'text' },
      { id: 'card.all.subtitle', label: 'ALL Card Subtitle', selector: '.project-card[data-project="all-wheelchair"] .project-card__subtitle', type: 'text', multiline: true },
      { id: 'card.race.title', label: 'smartVibe Card Title', selector: '.project-card[data-project="marathon-racing"] .project-card__title', type: 'text' },
      { id: 'card.race.subtitle', label: 'smartVibe Card Subtitle', selector: '.project-card[data-project="marathon-racing"] .project-card__subtitle', type: 'text', multiline: true },
      { id: 'card.wheelsense.title', label: 'WheelSense Card Title', selector: '.project-card[data-project="wheelsense"] .project-card__title', type: 'text' },
      { id: 'card.wheelsense.subtitle', label: 'WheelSense Card Subtitle', selector: '.project-card[data-project="wheelsense"] .project-card__subtitle', type: 'text', multiline: true }
    ]
  },
  {
    key: 'team',
    title: 'Team',
    path: '/team.html',
    fields: [
      { id: 'meta.title', label: 'Meta Title', selector: 'head > title', type: 'text' },
      { id: 'meta.description', label: 'Meta Description', selector: 'meta[name="description"]', type: 'attr', attr: 'content', multiline: true },
      { id: 'hero.label', label: 'Hero Label', selector: '.team-hero .text-small', type: 'text' },
      { id: 'hero.title', label: 'Hero Title', selector: '.team-hero .h1', type: 'text' },
      { id: 'hero.description', label: 'Hero Description', selector: '.team-hero .text-body-lg', type: 'text', multiline: true },
      { id: 'member.1.name', label: 'Member 1 Name', selector: '#teamPageGrid .team-profile:nth-child(1) .team-profile__name', type: 'text' },
      { id: 'member.1.role', label: 'Member 1 Role', selector: '#teamPageGrid .team-profile:nth-child(1) .team-profile__role', type: 'text' },
      { id: 'member.2.name', label: 'Member 2 Name', selector: '#teamPageGrid .team-profile:nth-child(2) .team-profile__name', type: 'text' },
      { id: 'member.2.role', label: 'Member 2 Role', selector: '#teamPageGrid .team-profile:nth-child(2) .team-profile__role', type: 'text' },
      { id: 'member.3.name', label: 'Member 3 Name', selector: '#teamPageGrid .team-profile:nth-child(3) .team-profile__name', type: 'text' },
      { id: 'member.3.role', label: 'Member 3 Role', selector: '#teamPageGrid .team-profile:nth-child(3) .team-profile__role', type: 'text' },
      { id: 'member.4.name', label: 'Member 4 Name', selector: '#teamPageGrid .team-profile:nth-child(4) .team-profile__name', type: 'text' },
      { id: 'member.4.role', label: 'Member 4 Role', selector: '#teamPageGrid .team-profile:nth-child(4) .team-profile__role', type: 'text' },
      { id: 'member.5.name', label: 'Member 5 Name', selector: '#teamPageGrid .team-profile:nth-child(5) .team-profile__name', type: 'text' },
      { id: 'member.5.role', label: 'Member 5 Role', selector: '#teamPageGrid .team-profile:nth-child(5) .team-profile__role', type: 'text' },
      { id: 'member.6.name', label: 'Member 6 Name', selector: '#teamPageGrid .team-profile:nth-child(6) .team-profile__name', type: 'text' },
      { id: 'member.6.role', label: 'Member 6 Role', selector: '#teamPageGrid .team-profile:nth-child(6) .team-profile__role', type: 'text' },
      { id: 'member.7.name', label: 'Member 7 Name', selector: '#teamPageGrid .team-profile:nth-child(7) .team-profile__name', type: 'text' },
      { id: 'member.7.role', label: 'Member 7 Role', selector: '#teamPageGrid .team-profile:nth-child(7) .team-profile__role', type: 'text' },
      {
        id: 'data.members',
        label: 'Team Members JSON (add/remove/edit profiles)',
        type: 'virtual',
        multiline: true,
        defaultValue: defaultTeamMembersJson,
      }
    ]
  },
  {
    key: 'awards',
    title: 'Awards',
    path: '/awards.html',
    fields: [
      { id: 'meta.title', label: 'Meta Title', selector: 'head > title', type: 'text' },
      { id: 'meta.description', label: 'Meta Description', selector: 'meta[name="description"]', type: 'attr', attr: 'content', multiline: true },
      { id: 'hero.label', label: 'Hero Label', selector: '#awardsHero .awards-hero__label', type: 'text' },
      { id: 'hero.title', label: 'Hero Title', selector: '#awardsHero .awards-hero__title', type: 'text', multiline: true },
      { id: 'hero.subtitle', label: 'Hero Subtitle', selector: '#awardsHero .awards-hero__subtitle', type: 'text', multiline: true },
      { id: 'timeline.label', label: 'Timeline Label', selector: '#awardsSection .reveal p', type: 'text' },
      { id: 'timeline.title', label: 'Timeline Title', selector: '#awardsSection .reveal h2', type: 'text' },
      { id: 'documents.label', label: 'Documents Label', selector: '#certificatesSection .reveal p', type: 'text' },
      { id: 'documents.title', label: 'Documents Title', selector: '#certificatesSection .reveal h2', type: 'text' },
      { id: 'publications.label', label: 'Publications Label', selector: '#publicationsSection .reveal p', type: 'text' },
      { id: 'publications.title', label: 'Publications Title', selector: '#publicationsSection .reveal h2', type: 'text' },
      { id: 'cta.title', label: 'Final CTA Title', selector: '#finalCta .cta-section__title', type: 'text' },
      { id: 'cta.primary', label: 'Final CTA Primary Button', selector: '#finalCta .hero__cta-group .btn:nth-child(1)', type: 'text' },
      { id: 'cta.secondary', label: 'Final CTA Secondary Button', selector: '#finalCta .hero__cta-group .btn:nth-child(2)', type: 'text' },
      {
        id: 'data.verifiedMilestones',
        label: 'Verified Milestones JSON (images and details)',
        type: 'virtual',
        multiline: true,
        defaultValue: defaultVerifiedMilestonesJson,
      },
      {
        id: 'data.certificates',
        label: 'Certificates JSON (newest to oldest)',
        type: 'virtual',
        multiline: true,
        defaultValue: defaultCertificatesJson,
      },
      {
        id: 'data.publications',
        label: 'Publications JSON',
        type: 'virtual',
        multiline: true,
        defaultValue: defaultPublicationsJson,
      }
    ]
  },
  {
    key: 'contact',
    title: 'Contact',
    path: '/contact.html',
    fields: [
      { id: 'meta.title', label: 'Meta Title', selector: 'head > title', type: 'text' },
      { id: 'meta.description', label: 'Meta Description', selector: 'meta[name="description"]', type: 'attr', attr: 'content', multiline: true },
      { id: 'hero.title', label: 'Contact Title', selector: '.contact-info__title', type: 'text' },
      { id: 'hero.description', label: 'Contact Description', selector: '.contact-info__text', type: 'text', multiline: true },
      { id: 'info.email.label', label: 'Email Label', selector: '.contact-info__item:nth-child(1) .contact-info__item-label', type: 'text' },
      { id: 'info.email.value', label: 'Email Value', selector: '.contact-info__item:nth-child(1) .contact-info__item-text', type: 'text' },
      { id: 'info.location.label', label: 'Location Label', selector: '.contact-info__item:nth-child(2) .contact-info__item-label', type: 'text' },
      { id: 'info.location.value', label: 'Location Value', selector: '.contact-info__item:nth-child(2) .contact-info__item-text', type: 'text' },
      { id: 'info.lab.label', label: 'Lab Label', selector: '.contact-info__item:nth-child(3) .contact-info__item-label', type: 'text' },
      { id: 'info.lab.value', label: 'Lab Value', selector: '.contact-info__item:nth-child(3) .contact-info__item-text', type: 'text' },
      { id: 'info.phone.label', label: 'Phone Label', selector: '.contact-info__item:nth-child(4) .contact-info__item-label', type: 'text' },
      { id: 'info.phone.value', label: 'Phone Value', selector: '.contact-info__item:nth-child(4) .contact-info__item-text', type: 'text' },
      { id: 'form.title', label: 'Form Title', selector: '.contact-form-card h3', type: 'text' },
      { id: 'form.submit', label: 'Submit Button', selector: '#contactForm button[type="submit"]', type: 'text' },
      { id: 'form.success.title', label: 'Success Title', selector: '#formSuccess h3', type: 'text' },
      { id: 'form.success.message', label: 'Success Message', selector: '#formSuccess .text-secondary', type: 'text' }
    ]
  }
];

export function getEditablePage(pageKey) {
  return editablePages.find((page) => page.key === pageKey) || null;
}



