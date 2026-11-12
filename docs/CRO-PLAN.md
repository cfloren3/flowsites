# Flowsites: measurement & testing plan

## What is tracked (no personal data)

Events go to `window.dataLayer` always, and to GA4 when `NEXT_PUBLIC_GA_ID` is set (`src/lib/track.ts`, `src/components/Analytics.tsx`).

| Event | When | Key parameters |
|---|---|---|
| `preview_cta_click` | Any link to the free preview | `placement` (section), `page` |
| `preview_form_start` | First answer in the guided form | `placement` |
| `preview_form_step` | Each step completed | `step`, `placement` |
| `preview_request_submitted` | Guided form sent successfully (**primary conversion**) | `placement`, `industry`, `goal` |
| `sample_studio_start` | Visitor types a name or picks a trade in the sample | `via` |
| `case_study_click` / `case_study_view` | Portfolio engagement | `project` |
| `work_click`, `pricing_click`, `contact_click`, `outbound_click` | Navigation intent | `placement` |

**Funnel:** landing → `preview_cta_click` or `preview_form_start` → step 2 → step 3 → step 4 → `preview_request_submitted`.
Judge every change by **qualified preview requests**, not clicks or time on page.

## Before launch
1. Create a GA4 property; set `NEXT_PUBLIC_GA_ID`. Mark `preview_request_submitted` as a key event.
2. Verify the domain in Google Search Console and submit `/sitemap.xml`.
3. Privacy: add a short privacy notice. If you later add advertising tags or serve visitors outside Canada, add a consent banner before loading them.

## Tests to run (one at a time, most valuable first)

| # | Test | Variant A (current) | Variant B | Measure |
|---|---|---|---|---|
| 1 | Guided vs. short form | 4-step guided form | Single short form (name, business, email) | Completed requests per visitor |
| 2 | Hero headline | "Your work is exceptional. Your website should be too." | "Built to stand out. Designed to bring business in." | Preview starts |
| 3 | Price visibility | Price in hero line | Price as a badge next to the button | Preview starts, bounce |
| 4 | CTA wording | "Get my free website preview" | "See what my website could look like" | CTA click-through |
| 5 | Portfolio order | Yardex → DECA → Carter Florence → TraitCRM | Yardex → Carter Florence first | Case-study views, requests |
| 6 | Guarantee placement | After pricing | Directly under the hero | Requests |
| 7 | 15-second popup | On | Off, or exit-intent only | Requests vs. bounce |
| 8 | Mobile contact button | Appears after scroll | Always visible | Mobile requests |

With low traffic, run each test for at least 2–4 weeks or 200+ visitors per variant, and prefer big, clear changes over small tweaks.
