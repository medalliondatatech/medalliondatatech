// ===== NAVBAR HAMBURGER =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ===== HERO SLIDER =====
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.hero-dot');
let current = 0;
let sliderInterval;

function goTo(n) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function startSlider() {
  sliderInterval = setInterval(() => goTo(current + 1), 5000);
}

if (slides.length) {
  document.querySelectorAll('.hero-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => { clearInterval(sliderInterval); goTo(i); startSlider(); });
  });
  const prev = document.querySelector('.hero-prev');
  const next = document.querySelector('.hero-next');
  if (prev) prev.addEventListener('click', () => { clearInterval(sliderInterval); goTo(current - 1); startSlider(); });
  if (next) next.addEventListener('click', () => { clearInterval(sliderInterval); goTo(current + 1); startSlider(); });
  startSlider();
}

// ===== SCROLL ANIMATIONS =====
const style = document.createElement('style');
style.textContent = '.anim { opacity:0; transform:translateY(24px); transition:opacity 0.5s ease, transform 0.5s ease; } .anim.visible { opacity:1 !important; transform:translateY(0) !important; }';
document.head.appendChild(style);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .why-card, .testimonial-card, .process-step, .team-card').forEach(el => {
  el.classList.add('anim');
  observer.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateCount(el, target) {
  let start = 0;
  const step = (ts) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / 2000, 1);
    el.textContent = Math.floor(progress * target) + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => animateCount(el, parseInt(el.dataset.target)));
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) statObserver.observe(statsBar);

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#16a34a';
      contactForm.reset();
      setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; btn.disabled = false; }, 3000);
    }, 1500);
  });
}
