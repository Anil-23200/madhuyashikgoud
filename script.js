(() => {
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('siteNav');
  const navLinks = [...document.querySelectorAll('#siteNav a')];

  const closeMenu = () => {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open navigation');
  };

  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });

  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 820) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  if ('IntersectionObserver' in window) {
    const sections = [...document.querySelectorAll('main .section-anchor')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
      });
    }, { rootMargin: '-28% 0px -58% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
  }

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const preview = document.getElementById('messagePreview');
  const prepared = document.getElementById('preparedMessage');
  const copyButton = document.getElementById('copyMessage');

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = [
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      `Location: ${data.get('location') || 'Not provided'}`,
      `Enquiry type: ${data.get('topic')}`,
      '',
      'Message:',
      `${data.get('message')}`
    ].join('\n');
    prepared.value = message;
    preview.hidden = false;
    status.textContent = 'Your message is prepared below. This demo does not send or store it.';
    preview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(prepared.value);
      status.textContent = 'Prepared message copied.';
    } catch {
      prepared.focus();
      prepared.select();
      status.textContent = 'Select the prepared message and copy it manually.';
    }
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();