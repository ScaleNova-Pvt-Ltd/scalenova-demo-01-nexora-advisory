# Nexora Advisory — ScaleNova Integration Manual
## Demo 01: Professional & B2B Services

This document defines the integration specifics connecting **Nexora Advisory** into the ScaleNova Operating Ecosystem.

---

## 1. Submission Schema
- **Demo ID**: `DEMO-01`
- **Industry**: `Professional & B2B Services`
- **Target Sheet Tab**: `Demo1_Professional`
- **Submission ID Pattern**: `SN-NEX-YYYYMM-XXXX`
- **Supported Lead Types**:
  - `CONSULTATION`: Executive partner briefing
  - `QUOTE_REQUEST`: Formal advisory RFP / project scoping
  - `CONTACT`: General corporate desk inquiry

---

## 2. Testing Submission with cURL
```bash
curl -X POST "YOUR_APPS_SCRIPT_URL" \
  -H "Content-Type: text/plain;charset=utf-8" \
  -d '{
    "demoId": "DEMO-01",
    "industry": "Professional & B2B Services",
    "sourceWebsite": "Nexora Advisory Website",
    "leadType": "CONSULTATION",
    "page": "Book Consultation",
    "name": "Rajesh Singhania",
    "email": "rajesh@singhania-logistics.com",
    "phone": "+91 98200 12345",
    "company": "Singhania Logistics Ltd",
    "service": "Technology Advisory",
    "requirement": "Cloud ERP Modernization",
    "budget": "₹25,00,000 - ₹50,00,000",
    "preferredDate": "2026-09-22",
    "preferredTime": "11:30 AM IST",
    "message": "Planning infrastructure migration for national distribution hubs."
  }'
```
