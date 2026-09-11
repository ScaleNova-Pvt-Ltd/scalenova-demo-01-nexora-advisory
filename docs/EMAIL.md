# Transactional Email Notification Specification — Nexora Advisory

## 1. Sender Identity
- **Configured Sender**: `demo@scalenovasys.com`
- **Authorized Transport**: Google Apps Script MailApp / GmailApp via authorized account

## 2. Dual Notification Paths
### A. Internal Hot Lead Alert (ScaleNova Team)
- **Subject**: `NEW LEAD ALERT: [Nexora Advisory] {Service} — Ref #{SubmissionID}`
- **Latency**: Dispatched within 60 seconds
- **Features**: Full 23-column data breakdown, direct WhatsApp click-to-chat link.

### B. Branded Customer Confirmation (Nexora Advisory)
- **Subject**: `Thank You for Contacting Nexora Advisory — Ref #{SubmissionID}`
- **Features**: Branded header in `#0B132B`, professional greeting, next steps, link to `https://demo1.scalenovasys.com`.
