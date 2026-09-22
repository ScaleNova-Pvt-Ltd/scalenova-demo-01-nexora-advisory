/**
 * ScaleNova Systems — Executive Modal & Visual Drawer Controller
 * Demo 01: Nexora Advisory (src/components/modal-controller.js)
 * High-performance, touch-friendly, accessible modal and drawer engine.
 */

window.NexoraModal = (function () {
  'use strict';

  function init() {
    // Attach trigger listeners
    document.addEventListener('click', function (e) {
      const trigger = e.target.closest('[data-modal-target]');
      if (trigger) {
        e.preventDefault();
        const targetId = trigger.getAttribute('data-modal-target');
        openModal(targetId);
      }

      const closeTrigger = e.target.closest('[data-modal-close]');
      if (closeTrigger) {
        e.preventDefault();
        closeActiveModal();
      }

      // Backdrop click
      if (e.target.classList.contains('nexora-modal-backdrop')) {
        closeActiveModal();
      }
    });

    // Keyboard ESC listener
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeActiveModal();
      }
    });
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add('active');
    document.body.classList.add('modal-open');

    // Focus trap inside modal
    const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
  }

  function closeActiveModal() {
    const activeModals = document.querySelectorAll('.nexora-modal-backdrop.active, .nexora-modal.active');
    activeModals.forEach(m => m.classList.remove('active'));
    document.body.classList.remove('modal-open');
  }

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    open: openModal,
    close: closeActiveModal
  };
})();
