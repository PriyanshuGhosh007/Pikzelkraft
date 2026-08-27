# Pikzelkraft

Pixel-perfect digital marketing & IT solutions website.

```
pikzelkraft/
├── frontend/   ← CURRENT PRODUCTION WEBSITE (static Next.js site)
├── backend/    ← KEEP SEPARATE FOR FUTURE (Node.js + Express + MongoDB API)
├── shared/     ← KEEP SEPARATE FOR FUTURE (shared TypeScript types)
└── README.md
```

## Frontend — Production Website

A production-ready **static** Next.js 14 marketing website. It builds to a pure
static export (`frontend/out/`) with **no Node.js server, no backend API, no
database and no secrets** — deployable directly to any static host such as
Hostinger shared hosting.

### Stack

- Next.js 14 (App Router) with `output: 'export'`
- React 18 + TypeScript
- Tailwind CSS 3 + Framer Motion
- Fully static: SEO, sitemap, robots.txt, structured data (JSON-LD) included

### Pages

Home, About, Services (+ 15 individual service pages), Portfolio, Pricing
(Top Combined Packages + Individual Service Packages), FAQ, Contact, Privacy
Policy, Terms of Service, and a styled 404 page.

### Build

```bash
# from the frontend/ directory
npm install
npm run build
```

The static site is written to `frontend/out/`.

### Deploy to Hostinger (shared hosting)

1. Build the site (`npm run build`).
2. Open the cPanel **File Manager** and go to `public_html/`.
3. Upload **the entire contents** of `frontend/out/` into `public_html/`
   (so `index.html` sits directly in `public_html/`, not inside a subfolder).
4. Done — no Node process, no VPS, no configuration needed.

For HTTPS, enable the free Let's Encrypt certificate in hPanel/cPanel after
pointing your domain to Hostinger.

### Contact form

The form is fully static and credential-free:

- If `NEXT_PUBLIC_CONTACT_ENDPOINT` is set (e.g. a FormSubmit.co or Web3Forms
  URL), enquiries are POSTed there as JSON.
- Otherwise the form opens a prefilled **WhatsApp** message and an **email**
  fallback to `hello@pikzelkraft.com`. Update the number/email in
  `frontend/src/lib/site.ts`.

### Optional environment variables

Copy `frontend/.env.example` to `frontend/.env.local` only if you need to
override the defaults. No environment variables are required to build or deploy.

## Backend & Shared — kept for future use

The `backend/` (Express + MongoDB API) and `shared/` (shared types) packages
are intentionally **not** part of the production website. They are retained as
a separate future application and are not built or required by the frontend.
