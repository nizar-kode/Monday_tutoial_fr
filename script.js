document.addEventListener('DOMContentLoaded', () => {
  // ===== Scroll-based section tracking & nav highlight =====
  const navLinks = document.querySelectorAll('.nav a[data-section]');
  const sections = document.querySelectorAll('.section, .hero');
  const progressFill = document.querySelector('.nav-progress-fill');

  function updateNav() {
    const scrollY = window.scrollY + 200;
    let current = '';
    sections.forEach(s => {
      if (s.offsetTop <= scrollY) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.dataset.section === current);
    });
    // Progress
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.min((window.scrollY / docH) * 100, 100);
    if (progressFill) progressFill.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateNav);
  updateNav();

  // ===== Smooth scroll nav clicks =====
  navLinks.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById(a.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu on nav click
      const nl = document.getElementById('nav-links');
      if (nl) nl.classList.remove('open');
    });
  });

  // ===== Hamburger toggle (mobile) =====
  const navToggle = document.getElementById('nav-toggle');
  const navLinksEl = document.getElementById('nav-links');
  if (navToggle && navLinksEl) {
    navToggle.addEventListener('click', () => {
      navLinksEl.classList.toggle('open');
    });
  }

  // ===== Reveal on scroll =====
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => revealObserver.observe(el));

  // ===== Department tabs =====
  const deptTabs = document.querySelectorAll('.dept-tab');
  const deptContents = document.querySelectorAll('.dept-content');
  deptTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      deptTabs.forEach(t => t.classList.remove('active'));
      deptContents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.dept);
      if (target) target.classList.add('active');
    });
  });

  // ===== Print button =====
  const printBtn = document.getElementById('print-btn');
  if (printBtn) printBtn.addEventListener('click', () => window.print());
});
