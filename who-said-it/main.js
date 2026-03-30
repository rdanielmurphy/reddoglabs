// Nav scroll effect
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scroll = window.scrollY;
  nav.classList.toggle('nav--scrolled', scroll > 40);
  lastScroll = scroll;
}, { passive: true });

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('nav__links--open');
  toggle.classList.toggle('nav__toggle--open', open);
  toggle.setAttribute('aria-expanded', open);
});

// Close mobile nav on link click
links.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    links.classList.remove('nav__links--open');
    toggle.classList.remove('nav__toggle--open');
    toggle.setAttribute('aria-expanded', false);
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = nav.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.step, .category-card, .feature-card, .section-header').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
