document.addEventListener('DOMContentLoaded', () => {

  // ---------- Footer year ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Mobile nav toggle ----------
  const navToggle = document.getElementById('navToggle');
  const siteHeader = document.querySelector('.site-header');

  if (navToggle && siteHeader) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteHeader.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the mobile menu after clicking a nav link
    document.querySelectorAll('.nav a').forEach((link) => {
      link.addEventListener('click', () => {
        siteHeader.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- FAQ accordion ----------
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const alreadyOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach((el) => el.classList.remove('open'));

      if (!alreadyOpen) item.classList.add('open');
    });
  });

  // ---------- Animated stat counters ----------
  const stats = document.querySelectorAll('.stat-number');

  const animateStat = (el) => {
    const target = Number(el.dataset.target);
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(step);
  };

  if (stats.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStat(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach((stat) => observer.observe(stat));
  }

  // ---------- Toast helper ----------
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  // ---------- Email form handling ----------
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function handleSignup(form, options = {}) {
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input.value.trim();

      if (!isValidEmail(email)) {
        showToast('Please enter a valid email address.');
        input.focus();
        return;
      }

      // Placeholder for a real signup request (e.g. fetch to an API).
      showToast(options.message || "Thanks! We'll be in touch soon.");
      form.reset();
    });
  }

  handleSignup(document.getElementById('signupForm'));
  handleSignup(document.getElementById('ctaForm'), { message: 'Welcome to AquaShield! Check your inbox.' });

});
