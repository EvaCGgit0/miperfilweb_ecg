/**
 * Eva Cataño García — Academic Profile
 * Minimal JS for navigation & scroll effects
 */

(function () {
  'use strict';

  // ---- Mobile Navigation Toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('nav__links--open');
      navToggle.setAttribute('aria-expanded', isOpen);
      // Animate hamburger to X
      const spans = navToggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('nav__links--open');
        navToggle.setAttribute('aria-expanded', 'false');
        var spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  // ---- Scroll: nav shadow + active section highlight ----
  const nav = document.getElementById('nav');
  const sections = document.querySelectorAll('.section, .hero');
  const navAnchors = document.querySelectorAll('.nav__links a');

  function onScroll() {
    // Nav shadow
    if (window.scrollY > 20) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }

    // Active section highlight
    var scrollPos = window.scrollY + 100;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height && id) {
        navAnchors.forEach(function (a) {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + id) {
            a.style.color = 'var(--c-gold)';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Intersection Observer for fade-in (progressive enhancement) ----
  if ('IntersectionObserver' in window && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.research-card, .project-item, .link-card, .contact-card').forEach(function (el) {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
  }
})();
