// ===== CV viewer modal =====
const cvModal = document.getElementById('cvModal');
const cvIframe = document.getElementById('cvIframe');
const CV_PATH = 'assets/Domiya_Mayilalakan_CV.pdf';

function openCvModal(){
  cvIframe.src = CV_PATH;
  cvModal.classList.add('open');
  document.body.classList.add('modal-open');
}
function closeCvModal(){
  cvModal.classList.remove('open');
  document.body.classList.remove('modal-open');
  cvIframe.src = '';
}

document.getElementById('viewCvBtn')?.addEventListener('click', openCvModal);
document.getElementById('viewCvBtnNav')?.addEventListener('click', openCvModal);
document.getElementById('cvModalClose')?.addEventListener('click', closeCvModal);
document.getElementById('cvModalBackdrop')?.addEventListener('click', closeCvModal);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCvModal(); });

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

// ===== Contact form — sends via EmailJS =====
const EMAILJS_PUBLIC_KEY = "Zti3xKo_P-Vih-ftm";
const EMAILJS_SERVICE_ID = "service_5ladhlq";
const EMAILJS_TEMPLATE_ID = "template_rcex6x8";

if (window.emailjs) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!window.emailjs) {
    formNote.textContent = "Couldn't load the email service — please email me directly at domidomiya6@gmail.com.";
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  formNote.textContent = "Sending…";

  emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
    .then(() => {
      formNote.textContent = "Thanks — your message has been sent!";
      form.reset();
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
      formNote.textContent = "Something went wrong sending that — please email me directly at domidomiya6@gmail.com.";
    })
    .finally(() => {
      submitBtn.disabled = false;
    });
});
