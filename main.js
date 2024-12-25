/**
 * main.js
 * Gère la navbar sticky, l'effet scroll reveal, le slider de témoignages,
 * la FAQ, le cookie banner, le changement de langue (FR/EN), le dark/light mode.
 */

function handleStickyNav() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });
}

function handleScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}

function handleTestimonialsSlider() {
  const track = document.getElementById('sliderTrack');
  const dotsContainer = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (!track || !dotsContainer || !prevBtn || !nextBtn) return;

  const slides = Array.from(track.children);
  let currentIndex = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }

  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  let autoSlide = setInterval(nextSlide, 5000);
  [nextBtn, prevBtn, dotsContainer].forEach(el => {
    el.addEventListener('click', () => {
      clearInterval(autoSlide);
    });
  });
}

function handleFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

function handleCookieBanner() {
  const cookieBanner = document.getElementById('cookieBanner');
  if (!cookieBanner) return;

  const acceptBtn = cookieBanner.querySelector('.accept');
  const declineBtn = cookieBanner.querySelector('.decline');

  if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
      cookieBanner.classList.add('visible');
    }, 1000);
  }

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieBanner.classList.remove('visible');
  });
  
  declineBtn.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    cookieBanner.classList.remove('visible');
  });
}

let currentLanguage = 'fr';
function handleLanguageToggle() {
  const langToggle = document.getElementById('langToggle');
  if (!langToggle) return;

  langToggle.addEventListener('click', () => {
    currentLanguage = (currentLanguage === 'fr') ? 'en' : 'fr';
    updateLanguage();
  });
}

function updateLanguage() {
  const langText = document.querySelector('.lang-text');
  if (langText) {
    langText.textContent = (currentLanguage === 'fr') ? 'FR' : 'EN';
  }

  const translatable = document.querySelectorAll('[data-fr],[data-en]');
  translatable.forEach(el => {
    if (el.dataset[currentLanguage]) {
      el.textContent = el.dataset[currentLanguage];
    }
  });

  document.documentElement.setAttribute('lang', currentLanguage);
}

function handleThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = (currentTheme === 'dark') ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

function loadInitialTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  handleStickyNav();
  handleScrollReveal();
  handleTestimonialsSlider();
  handleFAQ();
  handleCookieBanner();
  handleLanguageToggle();
  loadInitialTheme();
  handleThemeToggle();
  updateLanguage();
});
