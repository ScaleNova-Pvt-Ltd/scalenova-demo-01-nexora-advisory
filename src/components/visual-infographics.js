/**
 * ScaleNova Systems — Interactive Infographics & 3D Tilt Engine
 * Demo 01: Nexora Advisory (src/components/visual-infographics.js)
 */

(function () {
  'use strict';

  function initKPIAnimations() {
    const kpiElements = document.querySelectorAll('[data-kpi-target]');
    if (!kpiElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-kpi-target'));
          const prefix = el.getAttribute('data-kpi-prefix') || '';
          const suffix = el.getAttribute('data-kpi-suffix') || '';
          const duration = 1600;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = (target * easeOut).toFixed(target % 1 === 0 ? 0 : 1);
            
            el.textContent = `${prefix}${currentVal}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = `${prefix}${target}${suffix}`;
            }
          }

          requestAnimationFrame(updateCounter);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.25 });

    kpiElements.forEach(el => observer.observe(el));
  }

  function initProcessStepRoadmaps() {
    const roadmapContainers = document.querySelectorAll('.process-roadmap-wrapper');
    roadmapContainers.forEach(container => {
      const tabs = container.querySelectorAll('.roadmap-step-pill');
      const panels = container.querySelectorAll('.roadmap-panel');

      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          panels.forEach(p => p.classList.remove('active'));

          tab.classList.add('active');
          if (panels[index]) panels[index].classList.add('active');
        });
      });
    });
  }

  function init3DCardTilt() {
    // Only enable on fine pointer (desktop mouse), skip on touch devices for performance
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cards = document.querySelectorAll('.card-3d-tilt');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  function initAll() {
    initKPIAnimations();
    initProcessStepRoadmaps();
    init3DCardTilt();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
