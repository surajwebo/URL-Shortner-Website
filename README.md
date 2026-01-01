# url_shortner_webpage

This repository contains a simple URL shortener frontend and a minimal Express backend (for local development).

Contents:
- `index.html`, `style.css`, `script.js` – Frontend UI
- `server.js` – Minimal Express backend for shortening and redirecting
- `package.json` – Node scripts and dependencies

Quick local run:

```bash
npm install
npm start
# open http://localhost:3000
```

Deploy notes:
- The frontend can be hosted on GitHub Pages (static files).
- The backend must be hosted separately (Render, Railway, Fly, or serverless functions). If you host the frontend on GitHub Pages, set `window.API_BASE` in `index.html` to point to your backend URL.

See `DEPLOY.md` for step-by-step deployment instructions (coming soon).
