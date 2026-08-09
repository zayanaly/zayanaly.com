const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const progress = document.querySelector('.scroll-progress span');
const updateProgress = () => {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  const value = distance > 0 ? window.scrollY / distance : 0;
  if (progress) progress.style.transform = `scaleX(${value})`;
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  reveals.forEach((item) => revealObserver.observe(item));
}

const navLinks = [...document.querySelectorAll('.site-nav a')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => sectionObserver.observe(section));
}

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();
