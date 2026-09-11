/**
 * ScaleNova Systems — Client API Dispatcher (src/services/api.js)
 * Demo 01: Nexora Advisory
 */

window.ScaleNovaAPI = (function () {
  'use strict';

  const config = window.NEXORA_CONFIG || {
    demoId: 'DEMO-01',
    industry: 'Professional & B2B Services',
    clientName: 'Nexora Advisory',
    endpoints: { submitUrl: '', allowSimulationMode: true }
  };

  async function submitLead(formData, options = {}) {
    // 1. Honeypot check
    if (formData.website_hp || formData.company_hp) {
      console.warn('[ScaleNova Security] Honeypot triggered. Silently dropping payload.');
      return mockSuccessResponse(formData, 'SPAM_FILTERED');
    }

    // 2. Validate mandatory fields
    if (!formData.name || !formData.email) {
      throw new Error('Name and email are mandatory fields.');
    }

    const payload = {
      demoId: config.demoId,
      industry: config.industry,
      sourceWebsite: config.clientName + ' Website',
      leadType: formData.leadType || 'LEAD',
      page: formData.page || window.location.pathname || 'Home',
      timestamp: new Date().toISOString(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: (formData.phone || '').trim(),
      company: (formData.company || '').trim() || 'Enterprise Client',
      service: formData.service || 'Management Consulting',
      requirement: formData.requirement || 'Strategic Advisory',
      budget: formData.budget || 'Confidential',
      preferredDate: formData.preferredDate || '',
      preferredTime: formData.preferredTime || '',
      message: (formData.message || '').trim()
    };

    const endpoint = config.endpoints.submitUrl;
    const isMock = !endpoint || endpoint.includes('DEMO_ENDPOINT_ID');

    if (isMock) {
      await new Promise(r => setTimeout(r, 700));
      return mockSuccessResponse(payload);
    }

    try {
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) {
        throw new Error(`HTTP Error ${resp.status}`);
      }

      const result = await resp.json();
      if (result.status === 'error') {
        throw new Error(result.message || 'Submission failed');
      }
      return result;
    } catch (err) {
      console.warn('[ScaleNova API] Network error, falling back to local simulation:', err);
      if (config.endpoints.allowSimulationMode) {
        return mockSuccessResponse(payload);
      }
      throw err;
    }
  }

  function mockSuccessResponse(payload, overrideId) {
    const submissionId = overrideId || ('SN-NEX-' + new Date().toISOString().slice(0, 7).replace('-', '') + '-' + Math.floor(1000 + Math.random() * 9000));
    
    console.group('%c[ScaleNova Demo 01 Ingestion Gateway: Nexora Advisory]', 'color:#00B4D8;font-weight:bold;font-size:12px;');
    console.log('Demo ID: DEMO-01 (Professional & B2B Services)');
    console.log('Generated Submission ID:', submissionId);
    console.log('Target Google Sheet: "ScaleNova — Five Industry Demo CRM" -> Tab: "Demo1_Professional"');
    console.log('Frappe CRM Lead (POST /api/resource/Lead):', {
      doctype: 'Lead',
      lead_name: payload.name,
      email_id: payload.email,
      mobile_no: payload.phone,
      company_name: payload.company,
      source: 'ScaleNova Demo — Professional & B2B Services',
      status: 'Lead',
      notes: `Submission ID: ${submissionId} | Practice: ${payload.service} | Action: ${payload.leadType}`
    });
    console.log('Owner Email Notification: Dispatched with subject: [New ' + payload.leadType + ' — DEMO-01 — Nexora Advisory — #' + submissionId + ']');
    console.log('Client Confirmation Email: Dispatched to ' + payload.email);
    console.groupEnd();

    return {
      status: 'success',
      submissionId: submissionId,
      demoId: config.demoId,
      leadType: payload.leadType,
      sheetLogged: true,
      frappeStatus: 'SYNCED',
      message: 'Inquiry successfully processed by ScaleNova Operating Gateway.'
    };
  }

  return { submitLead };
})();
