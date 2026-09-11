window.DEMO_CONFIG = {
  demoId: 'DEMO-01',
  industry: 'Professional & B2B Services',
  clientName: 'Nexora Advisory',
  appsScriptUrl: window.APPS_SCRIPT_WEB_APP_URL || 'YOUR_SHARED_APPS_SCRIPT_WEB_APP_URL'
};

/**
 * ScaleNova Client Demo 01 — Nexora Advisory
 * Frontend Configuration Module (src/config/index.js)
 * 
 * SECURITY:
 * Zero private credentials or sheet IDs in frontend.
 * Only points to the public Google Apps Script Web App endpoint.
 */

window.NEXORA_CONFIG = {
  demoId: 'DEMO-01',
  industry: 'Professional & B2B Services',
  clientName: 'Nexora Advisory',
  tagline: 'Strategic Clarity • Enterprise Technology • Capital Transformation',
  
  brand: {
    phone: '+91 (022) 6982 4400',
    email: 'advisory@nexora.example.com',
    hq: 'BKC Financial Centre, Bandra East, Mumbai 400051',
    offices: ['Mumbai BKC', 'Bengaluru Outer Ring', 'Singapore Marina Bay', 'London Mayfair']
  },

  endpoints: {
    // Configurable Google Apps Script Web App URL
    submitUrl: (window.SCALENOVA_GATEWAY && window.SCALENOVA_GATEWAY.submitUrl) || 
               'https://script.google.com/macros/s/AKfycbx_DEMO_ENDPOINT_ID/exec',
    allowSimulationMode: true
  },

  consultation: {
    durations: ['30 Min Strategic Briefing', '60 Min Enterprise Discovery'],
    timeSlots: [
      '10:00 AM – 11:00 AM IST',
      '11:30 AM – 12:30 PM IST',
      '02:30 PM – 03:30 PM IST',
      '04:00 PM – 05:00 PM IST',
      '05:30 PM – 06:30 PM IST'
    ]
  },

  practices: [
    { id: 'management-consulting', title: 'Management & Strategy Consulting' },
    { id: 'technology-advisory', title: 'Enterprise Cloud & Technology Architecture' },
    { id: 'finance-transformation', title: 'Corporate Finance & M&A Advisory' },
    { id: 'operational-scale', title: 'Operational Excellence & Supply Chain' }
  ],

  budgets: [
    '₹10,00,000 – ₹25,00,000',
    '₹25,00,000 – ₹50,00,000',
    '₹50,00,000 – ₹1,00,00,000',
    '₹1,00,00,000+'
  ]
};
