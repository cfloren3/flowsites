# Flowsites website

Premium web design & local SEO agency site for Ontario trades. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Motion, Lenis and Lucide.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Strategy, research, brand system and keyword plan: [`docs/STRATEGY.md`](docs/STRATEGY.md).

## Where content lives

All business facts are in typed data files, so copy changes never require touching components.

| File | What it controls |
|---|---|
| `src/content/site.ts` | Business name, domain, email, phone, starting price, preview-guarantee terms, nav |
| `src/content/projects.ts` | Portfolio + case studies (copy, screenshots, metrics, evidence) |
| `src/content/evidence.ts` | Evidence labels: Verified / Client-reported / Historical / Not yet verified |
| `src/content/rankings.ts` | Keyword ranking records (Yardex) + **demonstration** dashboard data |
| `src/content/services.ts` | The three services, inclusions, exclusions, SEO titles |
| `src/content/industries.ts` | Industry landing pages (each written for its trade) |
| `src/content/articles.ts` | Resources / blog articles |
| `src/content/faq.ts` | FAQ (also emitted as FAQPage schema) |

### Adding a metric
Every metric needs an `evidence` object. Never add a number without one:
```ts
{ value: "Top 3", label: "…", evidence: { status: "verified", source: "ThreeBest Rated", sourceUrl: "https://…", checked: "2026-11-11" } }
```

### Recording a verified ranking
Edit `yardexRankings` in `src/content/rankings.ts`. Fill **all** fields (engine, location, device, type: Organic / Map pack / Search Console avg. position, position, checked date, method) and set `status: "verified"`. Organic, map-pack and Search Console figures must be separate records.

### Adding an industry page
Add an entry to `industries.ts`. It's automatically routed, linked, and added to the sitemap. Only add pages with genuinely distinct content and search intent. No doorway pages.

### Updating screenshots
Screenshots in `public/work/<slug>/` (including `yardex-guelph/before.webp`, Yardex's original site) were captured from the live sites with Playwright on 2026-11-11 (desktop 1440×900, mobile 390×844), converted to WebP. Re-capture and update `capturedOn` in `projects.ts` when a site changes.

## Lead form

`POST /api/inquiry`, with validation shared by client and server (`src/lib/inquiry.ts`).

Delivery, configured with environment variables (see `.env.example`):
1. **Resend**: set `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, and `INQUIRY_FROM_EMAIL` (a verified sender domain).
2. **Development fallback**: with no keys and `NODE_ENV !== production`, submissions are appended to `.data/inquiries.jsonl`.
3. **Production without keys**: the API returns 503 and the visitor is told to email instead. Leads are never silently dropped.

Spam protection: honeypot field, minimum fill time, per-IP rate limit (in-memory; use a shared store such as Upstash when running on multiple instances), and optional Cloudflare Turnstile (`NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`).

## SEO

- Static generation for every page; per-page titles, descriptions, canonicals
- `sitemap.xml` and `robots.txt` generated from content files
- JSON-LD: ProfessionalService (service-area business, no street address), WebSite, Service, BreadcrumbList, FAQPage, Article, CreativeWork
- Dynamic Open Graph image (`src/app/opengraph-image.tsx`)
- Set `NEXT_PUBLIC_SITE_URL` to the production domain before deploying

## Analytics & testing

Set `NEXT_PUBLIC_GA_ID` to load GA4. CTA clicks, guided-form steps and completed preview requests are tracked automatically; see [`docs/CRO-PLAN.md`](docs/CRO-PLAN.md) for the event list, funnel and A/B test plan.

## Colour palettes

Colours are CSS variables in `src/app/globals.css`:
- **Navy, white & coral** (default): `:root`
- **Cream, black & burnt orange**: `:root[data-palette="ember"]`

Visitors can switch with the swatches in the nav, mobile menu and footer; the choice is saved in their browser. Components use semantic tokens (`ink`, `paper`, `stone`, `volt` = accent, `volt-ink` = accent text on light backgrounds). To make ember the default, swap the two blocks.

## Motion & accessibility

- Scroll reveals are CSS-driven and gated on a `js` class, so content is visible without JavaScript and to crawlers
- Above-the-fold entrances use pure CSS keyframes (no hydration wait)
- `prefers-reduced-motion`: Lenis, parallax, marquee, scroll-pinned sections and reveals are disabled; pinned sections render static alternatives
- Skip link, visible focus rings, labelled controls, accessible form errors, keyboard-reachable chart values
