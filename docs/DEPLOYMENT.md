# Nexora Advisory — Cloudflare Pages & Production Deployment Guide

This project is optimized for zero-configuration, lightning-fast deployment to **Cloudflare Pages**.

---

## 1. Cloudflare Pages Deployment Steps

1. In the Cloudflare Dashboard, go to **Workers & Pages > Pages > Connect to Git**.
2. Select repository: `ScaleNova-Pvt-Ltd/scalenova-demo-01-nexora-advisory`.
3. Configure build settings:
   - **Framework preset**: `None`
   - **Build command**: Leave blank
   - **Build output directory**: `/` (root directory)
4. Under **Environment variables**, set:
   - `PUBLIC_APPS_SCRIPT_ENDPOINT`: Your deployed Google Apps Script Web App URL.
5. Click **Save and Deploy**.
6. Cloudflare will provision a global edge URL (e.g. `https://scalenova-demo-01.pages.dev` or your custom domain `https://demo1.scalenovasys.com`).

---

## 2. Local Development & Preview

```bash
# Start local server via npm
npm run dev

# Or with python
python3 -m http.server 3001
```

Open `http://localhost:3001` in your browser.
