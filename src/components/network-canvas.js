/**
 * ScaleNova Systems — 3D Ambient Constellation Canvas Engine (Retina & Motion-Calibrated)
 * Demo 01: Nexora Advisory (src/components/network-canvas.js)
 * Clean, 60fps geometric mesh with interactive cursor gravity and depth parallax.
 */

(function () {
  'use strict';

  function initNetworkCanvas() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;

    // Strict reduced motion check
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }

    const ctx = canvas.getContext('2d');
    let width = 0, height = 0, dpr = 1;
    let points = [];
    const isMobile = window.innerWidth < 768;
    const POINT_COUNT = isMobile ? 24 : 48;
    const MAX_DIST = isMobile ? 110 : 160;

    let mouseX = -9999;
    let mouseY = -9999;
    let animId = null;
    let isVisible = true;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
      createPoints();
    }

    function createPoints() {
      points = [];
      for (let i = 0; i < POINT_COUNT; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 0.8 + 0.2, // 3D depth layer
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.8 + 1
        });
      }
    }

    // Interactive mouse gravity with passive event listener
    window.addEventListener('mousemove', function (e) {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }, { passive: true });

    window.addEventListener('mouseleave', function () {
      mouseX = -9999;
      mouseY = -9999;
    });

    // Pause canvas if tab is hidden to conserve battery & CPU
    document.addEventListener('visibilitychange', function () {
      isVisible = !document.hidden;
      if (isVisible && !animId) {
        animate();
      }
    });

    function animate() {
      if (!isVisible) {
        animId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw subtle connecting constellation lines
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.18 * points[i].z;
            ctx.strokeStyle = `rgba(11, 27, 61, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update glowing nodes
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Cursor attraction
        const mdx = mouseX - p.x;
        const mdy = mouseY - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          const force = (1 - mdist / 140) * 0.35;
          p.x += (mdx / mdist) * force;
          p.y += (mdy / mdist) * force;
        }

        p.x += p.vx * p.z;
        p.y += p.vy * p.z;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Node fill
        ctx.fillStyle = `rgba(11, 27, 61, ${0.40 * p.z})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.z, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();
    animate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNetworkCanvas);
  } else {
    initNetworkCanvas();
  }
})();
