# calistar.builders: website revamp

New website for **CALISTAR Management Company**, replacing the old one-page Manus site. The audit and plan behind it are in [`../SITE-AUDIT-AND-REVAMP-PLAN.md`](../SITE-AUDIT-AND-REVAMP-PLAN.md). That file and the old-site backup live next to this repo, not inside it.

## Stack

- **Next.js 16** (App Router, Cache Components, Turbopack). Every page is prerendered as static HTML.
- **Tailwind CSS 4** + **shadcn/ui** (Base UI primitives), with Lucide icons
- **Fonts:** Rajdhani (headings) and Work Sans (body) through `next/font`. These are the original site's fonts.
- **Forms:** Server Actions + zod validation, delivered by email over SMTP (nodemailer)

> Next.js 16 has breaking changes from earlier versions. Check `node_modules/next/dist/docs/` before changing framework-level code (see `AGENTS.md`).

## Getting started

```bash
npm install
cp .env.example .env.local   # optional: add SMTP settings to actually send form emails
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Pages

| Route | Purpose |
|---|---|
| `/` | Home: hero, services, how it works, builders and subcontractors calls to action, why CALISTAR |
| `/services`, `/services/[slug]` | Service overview plus one page per service (4) |
| `/projects` | Portfolio. Shows an empty state until projects are added. |
| `/about` | Story, vetting process, licensing |
| `/join-our-network` | Subcontractor application form |
| `/contact` | Quote request form plus contact details |
| `/privacy` | Draft privacy policy |
| `sitemap.xml`, `robots.txt`, `opengraph-image`, `icon.png` | Generated SEO and brand assets |

Unknown URLs return a branded 404 page with a real 404 status.

## Editing content

All copy and company facts live in `src/content/`. Pages read from these files, so most text changes don't touch components.

- `company.ts`: name, phone, email, service area, license, address, social links, stats, value props, process steps
- `services.ts`: the four service pages (summary, intro, included items, FAQs)
- `proof.ts`: projects and testimonials. **Both are empty on purpose. Add only real, approved content.**

Search for `TODO(client)` to find everything still waiting on the client. Some of these are hidden from the site until filled in: license number, address, project case studies, testimonials, and FAQ answers that start with "TODO".

## Forms & email

Both forms post to Server Actions in `src/app/actions.ts`. Each action validates input with the zod schemas in `src/lib/forms.ts`, then emails the submission to `FORM_TO_EMAIL` through `src/lib/email.ts`.

- **SMTP settings** are in `.env.example`. The domain's mail is on Zoho, so `smtp.zoho.com` with an app password works without signing up for anything new. Any SMTP provider works.
- **Without SMTP:** in development, submissions are printed to the terminal. In production, users see an error with the phone and email instead, so leads are never silently lost.
- **Attachments:** up to 4 MB total, sent as email attachments. This stays under Vercel's 4.5 MB request limit (`serverActions.bodySizeLimit` in `next.config.ts`).
- **Spam:** a hidden honeypot field. Add Cloudflare Turnstile if spam gets through.

## Brand assets

- `public/brand/calistar-logo.png`: the original logo with its white background removed, 640px (95 KB). The original was a 4.8 MB, 2048px PNG.
- `src/app/icon.png`, `src/app/apple-icon.png`: favicon and home-screen icon, generated from the logo
- Colors are defined in `src/app/globals.css`: slate `#34495E`, ink `#1C2833`, amber `#F39C12` (amber is used as a background with dark text, never as text on white)

A vector (SVG) logo from the client would be better than the PNG. It's on the client question list.

## Deploying

The repo is set up for **Vercel**: import the GitHub repo, add the env vars from `.env.example`, and deploy. Before pointing the domain at it, follow the DNS cutover checklist in the revamp plan. In particular, **keep the Zoho MX records**, or company email stops working.
