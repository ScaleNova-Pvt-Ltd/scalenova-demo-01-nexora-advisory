# Nexora Advisory — Verification & Testing Protocol

---

## 1. Local Verification Commands

```bash
# 1. Run Node.js integrity validator
node test/validate-system.js

# 2. Start local preview
npm run dev
```

## 2. Test Checklist
- [x] All 10 HTML pages load without 404s
- [x] Network canvas initializes smoothly at 60fps in the Hero section
- [x] Honeypot field absorbs bot submissions silently
- [x] Consultation form validates required fields
- [x] RFP Proposal form transmits valid payload to Google Apps Script
- [x] Receipt view renders unique Reference ID (`SN-NEX-...`)
- [x] Zero console warnings or errors
