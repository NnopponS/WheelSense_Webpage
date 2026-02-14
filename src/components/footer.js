// Footer Component
export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  footer.innerHTML = `
    <div class="container">
      <div class="footer__inner">
        <div class="footer__logo">Omniwheel</div>
        <div class="footer__links">
          <a href="/" class="footer__link">Home</a>
          <a href="/story.html" class="footer__link">Our Story</a>
          <a href="/projects.html" class="footer__link">Projects</a>
          <a href="/team.html" class="footer__link">Team</a>
          <a href="/awards.html" class="footer__link">Awards</a>
          <a href="/contact.html" class="footer__link">Contact</a>
        </div>
        <div class="footer__copyright">
          © ${new Date().getFullYear()} Omniwheel. All rights reserved.
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(footer);
}
