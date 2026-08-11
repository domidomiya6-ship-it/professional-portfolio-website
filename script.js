// ===== Year in footer =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Theme toggle (persisted for the session) =====
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme){
  root.setAttribute('data-theme', theme);
}
const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
let currentTheme = preferred;
applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
});

// ===== Mobile menu =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Scroll reveal + skill bar animation =====
const revealEls = document.querySelectorAll('.reveal');
const barEls = document.querySelectorAll('.bar');

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => io.observe(el));

const barIo = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in-view');
      barIo.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

barEls.forEach(el => barIo.observe(el));

// ===== Nav background on scroll + scroll-to-top button =====
const nav = document.getElementById('nav');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.style.boxShadow = y > 10 ? '0 4px 20px rgba(0,0,0,0.06)' : 'none';
  scrollTopBtn.classList.toggle('visible', y > 500);
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Project filtering =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const tags = card.dataset.tags.split(' ');
      const show = filter === 'all' || tags.includes(filter);
      card.classList.toggle('hidden', !show);
    });
  });
});

// ===== Contact form (frontend-only demo submit) =====
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = "Thanks — your message is ready to send. Connect a form service (e.g. Formspree) to deliver it to your inbox.";
  form.reset();
});
