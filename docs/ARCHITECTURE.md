# Nexora Advisory — EliteOS Architecture Specification
## Demo 01: Professional & B2B Services (ScaleNova Systems)

---

## 1. Overview
Nexora Advisory represents ScaleNova's **EliteOS Tier** for the Professional & B2B Services industry. It demonstrates how a corporate management and technology advisory firm captures high-value executive inquiries and seamlessly automates their ingestion into Google Sheets and Frappe CRM.

```
[Nexora Advisory Frontend]
├── 10 Industry Pages (Strategy, Tech, M&A, Case Studies, Booking, RFP)
├── Network Canvas Geometric Visualizer
└── ScaleNovaAPI Service Worker
             │
             │ HTTPS JSON POST (type: CONSULTATION | QUOTE_REQUEST)
             ▼
[ScaleNova Integration Broker (Code.gs)]
             │
             ├── LockService Guard & Honeypot Filter
             ├── Route: demoId = DEMO-01 -> Sheet: Demo1_Professional
             ├── ID Generator: SN-NEX-YYYYMM-XXXX
             │
             ├──▶ [Google Sheet] ("ScaleNova — Five Industry Demo CRM")
             │     └── Tab: Demo1_Professional (22 Standardized Columns)
             │
             ├──▶ [Transactional Emails]
             │     ├── Owner Alert: operations@scalenovasys.com
             │     └── Client Confirmation: rajesh@singhania-logistics.com
             │
             └──▶ [Frappe CRM REST API] (demo.scalenovasys.com)
                   └── POST /api/resource/Lead
```

---

## 2. Key Components
1. **Frontend**: Zero-dependency, ultra-fast static architecture ready for Cloudflare Pages / edge distribution.
2. **Security Posture**: Zero private tokens or Sheet IDs client-side. The frontend only communicates with the public Google Apps Script endpoint.
3. **Fail-Closed Fallback**: If Frappe CRM is unreachable, the lead is preserved in Google Sheets with `Frappe Status = FAILED` for later synchronization.
