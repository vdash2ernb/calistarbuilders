# calistar.builders: website revamp

New website for **CALISTAR Management Company**, replacing the old one-page Manus site. The audit and plan behind it are in [`../SITE-AUDIT-AND-REVAMP-PLAN.md`](../SITE-AUDIT-AND-REVAMP-PLAN.md). That file and the old-site backup live next to this repo, not inside it.

## Stack

- **Next.js 16** (App Router, Turbopack) as a **static export**: `npm run build` writes plain HTML, CSS and JS to `out/`. No server is needed.
- **Tailwind CSS 4** + **shadcn/ui** (Base UI primitives), with Lucide icons
- **Fonts:** Rajdhani (headings) and Work Sans (body), self-hosted through `next/font`. These are the original site's fonts.
- **Forms:** embedded from the CRM (see below)

> Next.js 16 has breaking changes from earlier versions. Check `node_modules/next/dist/docs/` before changing framework-level code (see `AGENTS.md`).

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
npm run lint
```

To preview the built site exactly as a static host would serve it, serve `out/` with any static file server, for example `python -m http.server 8080 --directory out`.

## Pages

| URL | Purpose |
|---|---|
| `/` | Home: hero, services, how it works, builders and subcontractors calls to action, why CALISTAR |
| `/services/`, `/services/<slug>/` | Service overview plus one page per service (4) |
| `/projects/` | Portfolio. Shows an empty state until projects are added. |
| `/about/` | Story, vetting process, licensing |
| `/join-our-network/` | Subcontractor application (CRM form) |
| `/contact/` | Quote request (CRM form) plus contact details |
| `/privacy/` | Privacy policy (covers SMS requirements) |
| `/terms/` | Terms of use, including SMS terms & conditions at `/terms/#sms` |
| `404.html` | Branded "page not found" page |
| `sitemap.xml`, `robots.txt`, `opengraph-image.png`, `icon.png`, `apple-icon.png` | SEO and brand assets |

URLs end in `/` (`trailingSlash: true`), so each page is a `folder/index.html`. That works on any host without rewrite rules.

## Editing content

All copy and company facts live in `src/content/`. Pages read from these files, so most text changes don't touch components.

- `company.ts`: name, phone, email, service area, license, address, social links, stats, value props, process steps
- `services.ts`: the four service pages (summary, intro, included items, FAQs)
- `proof.ts`: projects and testimonials. **Both are empty on purpose. Add only real, approved content.**
- `crm.ts`: the CRM form embed URLs and the SMS consent wording
- `photos.ts`: alt text, crop position and credit for each photo

Search for `TODO(client)` to find everything still waiting on the client. Some of these are hidden from the site until filled in: license number, address, project case studies, testimonials, and FAQ answers that start with "TODO".

## Forms (CRM)

The quote request and subcontractor application are CRM-hosted forms embedded in an iframe, so submissions go straight into the CRM. The site itself stores nothing.

1. Build the two forms in the CRM.
2. Paste each form's embed (iframe) URL into `src/content/crm.ts` (`crmForms.quote.embedUrl` and `crmForms.network.embedUrl`). Adjust `height` to fit the form.
3. If the CRM provides a helper script for its embeds, such as an auto-resize script, set `embedScript`.

Until an embed URL is set, the page shows a "call or email us" card instead of a form.

### SMS consent (Dialpad / A2P 10DLC)

Carriers reviewing the Dialpad SMS registration check the opt-in wording, the privacy policy and the SMS terms. To pass:

- In **both** CRM forms, add an **optional checkbox that is unchecked by default**. Use `smsConsent.checkbox` from `src/content/crm.ts` as its label, word for word, with links to `/privacy/` and `/terms/#sms`.
- The site already shows the matching "Privacy & Communications Consent" notice under each form (`components/site/consent-notice.tsx`).
- The Privacy Policy states that mobile numbers and opt-in consent are never shared with third parties for marketing. Keep that wording if the policy is edited.
- Add the business address to `company.address` in `src/content/company.ts`. It then appears on both legal pages, and registrations usually ask for it.

## Photos

Photos live in `public/photos/` as WebP files at 640/1024/1600/2400px, with a blurred preview recorded in `src/content/photos.generated.json`. The `Photo` component (`components/site/photo.tsx`) serves the right size through `srcset`, since there's no image server on a static host.

The current photos are **placeholders from Unsplash** (free for commercial use; credits in `src/content/photos.ts`). They're used as atmosphere only and never presented as CALISTAR projects. To replace one, put a JPG named after its key (for example `home-hero.jpg`) in any folder and run:

```bash
npm run photos -- path/to/folder
```

## Motion

- Scroll reveals: add `data-reveal` (or `="fade"`, `="zoom"`) to an element. `RevealObserver` in the root layout animates it in when it scrolls into view. Stagger with `style={revealDelay(i)}`.
- Hero photos slowly zoom (`animate-ken-burns`), background photos drift with `parallax` where the browser supports scroll-driven animations, stats count up (`CountUp`), and page changes crossfade through React's `<ViewTransition>`.
- Everything respects the visitor's "reduce motion" setting: content shows immediately and animations are turned off.

## Brand assets

- `public/brand/calistar-logo.png`: the original logo with its white background removed, 640px (95 KB). The original was a 4.8 MB, 2048px PNG.
- `public/brand/calistar-logo-128.png`: small version for the header and footer (8 KB)
- `src/app/icon.png`, `src/app/apple-icon.png`, `src/app/opengraph-image.png`: favicon, home-screen icon and social share image
- Colors are defined in `src/app/globals.css`: slate `#34495E`, ink `#1C2833`, amber `#F39C12` (amber is used as a background with dark text, never as text on white)

A vector (SVG) logo from the client would be better than the PNG. It's on the client question list.

## Preview (GitHub Pages)

Every push to `main` publishes a preview to **https://vdash2ernb.github.io/calistarbuilders/** through `.github/workflows/pages.yml`. The workflow builds with `PAGES_BASE_PATH=/calistarbuilders` so links and assets resolve under the sub-folder. The preview is marked `noindex`, and its canonical URLs point at calistar.builders.

## Deploying

Upload the contents of `out/` to any static host: Cloudflare Pages, Netlify, GitHub Pages, or regular web hosting (cPanel, a VPS with Nginx or Apache). Hosts that build from Git need two settings: build command `npm run build` and output directory `out`.

- **404 page:** most static hosts serve `404.html` automatically. On Nginx, add `error_page 404 /404.html;`. On Apache, add `ErrorDocument 404 /404.html`.
- **Domain:** before pointing the domain at the new host, follow the DNS cutover checklist in the revamp plan. In particular, **keep the Zoho MX records**, or company email stops working.
