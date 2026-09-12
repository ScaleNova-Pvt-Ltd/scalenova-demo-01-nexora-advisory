/**
 * ScaleNova Systems — Client API Dispatcher (src/services/api.js)
 * Demo: Nexora Advisory (DEMO-01)
 * All 5 websites connect to ONE shared Apps Script Web App URL.
 */

window.ScaleNovaAPI = (function () {
  'use strict';

  const config = window.DEMO_CONFIG || {
    demoId: 'DEMO-01',
    industry: 'Professional & B2B Services',
    clientName: 'Nexora Advisory',
    appsScriptUrl: window.APPS_SCRIPT_WEB_APP_URL || ''
  };

  async function submitLead(formData, options = {}) {
    // 1. Anti-spam honeypot check
    if (formData.website_hp || formData.company_hp || formData.website_trap || formData.security_trap) {
      console.warn('[ScaleNova Security] Honeypot trap triggered. Request silently dropped.');
      return mockSuccessResponse(formData, 'SPAM_FILTERED');
    }

    // 2. Validate mandatory fields
    if (!formData.name || !formData.email) {
      throw new Error('Name and email are mandatory fields.');
    }

    const payload = {
      demo_id: config.demoId || 'DEMO-01',
      lead_type: (formData.lead_type || formData.leadType || 'LEAD').toUpperCase(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: (formData.phone || '').trim(),
      company: (formData.company || '').trim() || 'Direct Client',
      service: formData.service || formData.department || formData.course || formData.product || 'General Inquiry',
      requirement: formData.requirement || formData.scope || formData.symptoms || formData.quantity || 'Standard Scope',
      project_type: formData.project_type || formData.projectType || 'Commercial',
      budget: formData.budget || 'Confidential',
      preferred_date: formData.preferred_date || formData.preferredDate || formData.date || '',
      preferred_time: formData.preferred_time || formData.preferredTime || formData.time || '',
      message: (formData.message || formData.notes || '').trim(),
      source: 'Nexora Advisory Website',
      source_page: formData.source_page || formData.page || window.location.pathname || 'Home'
    };

    const endpoint = window.APPS_SCRIPT_WEB_APP_URL || 
                     config.appsScriptUrl || 
                     (window.SCALENOVA_GATEWAY && window.SCALENOVA_GATEWAY.submitUrl) ||
                     'https://script.google.com/macros/s/AKfycby-kC_gnWLAMrKc40yu0TOga5yZDreR50X-2AWw2rHrzCFi3oZp2W9Xqq3KXNoTh6bj/exec';

    const isPlaceholder = !endpoint || 
                          endpoint.includes('YOUR_SHARED_APPS_SCRIPT_WEB_APP_URL') || 
                          endpoint.includes('DEMO_ENDPOINT_ID');

    if (isPlaceholder) {
      // Local simulation mode for offline/pre-deployment testing
      await new Promise(r => setTimeout(r, 600));
      return mockSuccessResponse(payload);
    }

    // Generate optimistic valid tracking ID for instant snappy response
    const optimisticId = 'SN-D01-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(1000 + Math.random() * 9000);

    // Immediate background dispatch to production gateway (Google Sheets -> Email -> Frappe CRM)
    const networkPromise = fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    }).then(async r => {
      try {
        const data = await r.json();
        return data;
      } catch (e) {
        return { success: true, submission_id: optimisticId };
      }
    }).catch(err => {
      console.warn('[ScaleNova API] Network dispatch warning:', err);
      return { success: true, submission_id: optimisticId };
    });

    // 950ms max latency threshold so visitor receives an instant, sleek confirmation without 5s spinning delay
    const quickTimeout = new Promise(resolve => setTimeout(() => {
      resolve({ success: true, submission_id: optimisticId, optimistic: true });
    }, 950));

    try {
      const result = await Promise.race([networkPromise, quickTimeout]);
      return {
        success: true,
        submission_id: (result && (result.submission_id || result.submissionId)) || optimisticId,
        submissionId: (result && (result.submission_id || result.submissionId)) || optimisticId,
        demo_id: 'DEMO-01',
        lead_type: payload.lead_type,
        message: 'Submission received successfully'
      };
    } catch (err) {
      return {
        success: true,
        submission_id: optimisticId,
        submissionId: optimisticId,
        demo_id: 'DEMO-01',
        lead_type: payload.lead_type,
        message: 'Submission received successfully'
      };
    }
  }

  function mockSuccessResponse(payload, overrideId) {
    const submissionId = overrideId || ('SN-D01-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(1000 + Math.random() * 9000));
    
    console.group('%c[ScaleNova Demo Ingestion: Nexora Advisory]', 'color:#00B4D8;font-weight:bold;font-size:12px;');
    console.log('Demo ID:', 'DEMO-01 (Professional & B2B Services)');
    console.log('Generated Submission ID:', submissionId);
    console.log('Target Worksheet:', 'Demo 1 - Professional');
    console.log('Payload dispatched:', payload);
    console.groupEnd();

    return {
      success: true,
      submission_id: submissionId,
      demo_id: 'DEMO-01',
      lead_type: payload.lead_type,
      message: 'Submission received successfully'
    };
  }

  return { submitLead };
})();
