// Navbar Component
export function createNavbar(activePage = '') {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.id = 'navbar';

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Our Story', href: '/story.html' },
    { label: 'Projects', href: '/projects.html' },
    { label: 'Team', href: '/team.html' },
    { label: 'Awards', href: '/awards.html' },
    { label: 'Contact', href: '/contact.html' },
  ];

  nav.innerHTML = `
    <div class="navbar__inner">
      <a href="/" class="navbar__logo">WheelSense</a>
      <div class="navbar__links">
        ${links.map(l => `
          <a href="${l.href}" class="navbar__link ${activePage === l.label.toLowerCase() ? 'is-active' : ''}">${l.label}</a>
        `).join('')}
      </div>
      <button class="navbar__hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  `;

  // Mobile menu
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'navbar__mobile-menu';
  mobileMenu.id = 'mobileMenu';
  mobileMenu.innerHTML = links.map(l => `
    <a href="${l.href}">${l.label}</a>
  `).join('');

  document.body.prepend(mobileMenu);
  document.body.prepend(nav);

  // Scroll behavior
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    nav.classList.toggle('is-scrolled', currentScroll > 50);
    lastScroll = currentScroll;
  }, { passive: true });

  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-open');
    mobileMenu.classList.toggle('is-open');
    document.body.style.overflow = mobileMenu.classList.contains('is-open') ? 'hidden' : '';
  });
}
