/* ================================================================
   script.js — Joe's IT Support & Networking Portfolio
   Vanilla JavaScript only — no dependencies.
   ================================================================ */

'use strict';

/* ----------------------------------------------------------------
   1. FOOTER YEAR
   Automatically keeps the copyright year up to date.
   ---------------------------------------------------------------- */
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


/* ----------------------------------------------------------------
   2. STICKY NAV — add border once user scrolls
   ---------------------------------------------------------------- */
const header = document.getElementById('site-header');

function onScroll() {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', onScroll, { passive: true });


/* ----------------------------------------------------------------
   3. MOBILE HAMBURGER MENU
   Toggles the .open class on the nav list and hamburger button.
   ---------------------------------------------------------------- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

if (hamburger && navLinks) {

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close nav when any link is clicked (smooth UX on mobile)
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
    });
  });

  // Close nav when clicking outside of the nav area
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

}


/* ----------------------------------------------------------------
   4. SCROLL ANIMATIONS (Intersection Observer)
   Elements with class .fade-in will animate in when they
   enter the viewport. The .visible class triggers the CSS
   transition defined in style.css.
   ---------------------------------------------------------------- */
const fadeElements = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window && fadeElements.length) {

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stop watching once animated — no need to re-trigger
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,    // Trigger when 12% of element is visible
      rootMargin: '0px 0px -40px 0px'  // Slight offset from bottom
    }
  );

  fadeElements.forEach(el => observer.observe(el));

} else {
  // Fallback: if IntersectionObserver isn't supported, just show everything
  fadeElements.forEach(el => el.classList.add('visible'));
}


/* ----------------------------------------------------------------
   5. ACTIVE NAV LINK HIGHLIGHTING
   Highlights the nav link corresponding to the section
   currently in view as the user scrolls.
   ---------------------------------------------------------------- */
const sections  = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-link');

function highlightNav() {
  let currentId = '';
  const scrollY = window.scrollY + 80; // offset for fixed header

  sections.forEach(section => {
    if (scrollY >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentId}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNav, { passive: true });
highlightNav(); // Run once on load


/* ----------------------------------------------------------------
   6. SMOOTH SCROLL — polyfill for older browsers
   Most modern browsers handle scroll-behavior: smooth via CSS,
   but this provides a JS fallback for anchor links.
   ---------------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId  = anchor.getAttribute('href');
    const targetEl  = document.querySelector(targetId);

    if (targetEl) {
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const top = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
