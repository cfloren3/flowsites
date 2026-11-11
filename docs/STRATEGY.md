# Flowsites — Research, Positioning & Creative Direction

_Prepared 11 November 2026. Every claim about third parties below was observed directly (browser capture on that date) or is marked as unverified._

---

## 1. Reference analysis

| Reference | What was observed (live capture) | Principle we take | What we avoid |
|---|---|---|---|
| **Studio 812** (eight12.com) | Single confident promise ("Your design partner for real results"), a one-line value strip, four services each with "+"-prefixed deliverable lists, a short recent-projects grid, Opensauce One type. | Outcome-led headline; deliverables listed plainly; very little body copy. | Unsourced performance claims in testimonials ("page 100+ to the top spot"). |
| **Found First Digital** (foundfirstdigital.com) — **UK agency (Berkshire/Surrey/Hampshire), not Ontario** | Hero simulates a Google search → "Found → Clicked → Booked"; auto-scrolling portfolio marquee; discloses that some portfolio items are demo mock-ups. Inter + Manrope. | Teach the SEO→customer funnel visually; disclose what's a concept. | The marquee shows each project at thumbnail size, so none of them gets a proper look. |
| **FoundFirst.ca** (Guelph) | First-person founder voice (Connor Laskowski), "See your site, free", preview-before-pay, "From $1,000", owner also runs a Guelph lawn care company, five live Ontario trade sites with specific outcome lines. Archivo throughout. | Plain-spoken honesty; outcome line per project; FAQ that answers "can you guarantee #1?" directly. | — (see competitor section; this is the closest competitor) |
| **CarterFlorence.com** | Instrument Serif + Inter Tight + Geist Mono; warm paper background; editorial "FIG. 01" captions; animated numerals; Q&A storytelling; chapter navigation. | Editorial captions, mono metadata, number-led storytelling, chaptered scroll. | Re-using the same serif/paper look — Flowsites needs its own identity. |
| **Publicis** (publicis.com) | **Returned HTTP 502 during capture — not analysed from a live visit.** | General principle only: bold scale typography, confident restraint. | — |
| **Yardex Guelph** | Fraunces + Archivo, green/gold palette, sticky "Contact Us", phone in nav, trust bar (insured, WSIB, award, rating), price anchor ("from $27.50"), 4-step process, LocalBusiness JSON-LD listing 14 Guelph neighbourhoods. | Conversion mechanics for trades: price anchor, phone always visible, proof right under the hero. | — |

**Synthesis → Flowsites direction:** editorial agency typography and restraint (812, Publicis), the SEO-funnel teaching device (Found First Digital), the honesty and founder voice of FoundFirst.ca, the chaptered storytelling of carterflorence.com, and the hard-working conversion mechanics of Yardex.

## 2. Ontario competitor review

| Competitor | Pricing (published) | Positioning | Portfolio | Guarantee | Status of our evidence |
|---|---|---|---|---|---|
| **FoundFirst.ca** (Guelph) | Website "From $1,000"; monthly custom; cancel on 30 days' notice | Custom-coded sites + local SEO for Guelph & Ontario service businesses; founder-built | 5 live trade sites (landscaping, electrical, plumbing, lawn care) with one-line outcomes | Free preview before paying | **Observed live 2026-11-11** |
| **Found First Digital** | Not published on homepage | UK local businesses | 11 sites incl. disclosed demos | Free mock-up | Observed live — **UK, not an Ontario competitor** |
| **WebFoundry** | — | — | — | — | **Not found** in search; need exact URL |
| **Formory Marketing Group** | — | A "Formory" Toronto/GTA agency page mentions branding, ads and social; no contractor focus or portfolio found | — | — | **Unverified** |
| **Locally Visible** | — | — | — | — | **Not found**; need exact URL |
| **Overt Design** | — | — | — | — | **Not found**; need exact URL |

Market price signals (third-party, self-published — benchmarks only): a $995 "Website Digital Foundation" package (actuallywecreate.com), WordPress builds "from $500" (ambrite.ca), Hamilton packages "from $1,500" (lifewebanddesign.com), typical Canadian small-business sites $3,000–$8,000 (impeka.com), and one Mississauga firm stating Ontario local-SEO retainers of $800–$2,500/month (self-reported).

### Where Flowsites can win (verifiable strengths only)
1. **Range of evidence.** FoundFirst.ca shows trade marketing sites. Flowsites can show a trade site *and* a software product (TraitCRM, which Yardex runs on) and a personal-brand experience.
2. **Operating depth.** Yardex is a working recurring business with about 50 weekly properties (owner-reported) and an owner-reported #2 Google ranking for "lawn care Guelph". Its tooling was built in-house. "We built a trades business, then the software to run it" is a claim FoundFirst can't make.
3. **Entry price.** $750 vs a published $1,000, with the same preview-first promise.
4. **Evidence discipline.** Every metric on our site carries a Verified / Client-reported / Historical / Not-yet-verified label, with method and date. No competitor reviewed does this. It turns honesty into a differentiator.
5. **Visual sophistication.** Motion, editorial typography and layered real-work previews raise perceived value above the $750 price point.

**Risk:** FoundFirst.ca's offer and story are very close to ours, and it is in the same city. We must not echo its phrasing ("found first", "see your site, free") and should lead with the strengths above.

## 3. Positioning

> **Flowsites is the digital growth partner for Ontario's trades: premium websites, practical pricing, measurable results. Built by people who've run a trades business.**

- Primary line: **"Built to stand out. Engineered to get found."**
- Offer line: **"Custom websites from $750 CAD. See the design before you pay."**
- Proof line: **"We didn't just build websites for trades. We built a trades business."**
- AI stance: "Modern tools. Smarter processes. Better websites." AI is how we work, not what we sell.

## 4. Brand system

**Name/wordmark:** lowercase `flowsites` in Geist Sans Semibold with tight tracking. The mark is a rounded square holding one continuous stroke that rises from lower-left into an up-right arrow. It reads as flow (one line), progress (rising) and momentum (arrow), and it stays legible at 16px for the favicon.

**Palette (restrained). Updated: navy, white & coral is the default; cream, black & burnt orange is the switchable alternate (see `src/app/globals.css`).**

_Original exploration below, superseded:_
| Token | Hex | Use |
|---|---|---|
| Ink | `#0D0E0C` | Primary text, dark sections |
| Ink 2 | `#17191A` | Cards on dark |
| Paper | `#F3F1EA` | Primary background (warm off-white) |
| Paper 2 | `#E9E6DC` | Secondary surfaces |
| Stone | `#77766F` | Secondary text (AA on paper) |
| Line | `rgba(13,14,12,.12)` | Hairlines |
| **Current** (accent) | `#C9F26B` | Accent fills, highlights, focus. **Never as text on light backgrounds.** |

Lime was chosen over blue because it reads as *growth* (lawns, trades, "go") without the crypto connotations of neon. It is used at about 3% of any screen.

**Type:** Geist Sans (display + UI) and Geist Mono (labels, metadata, data). Display sizes clamp up to ~9rem with −0.05em tracking. Mono labels are uppercase at 11–12px with +0.08em tracking.

**Motion principles**
1. *One easing:* `cubic-bezier(.22,1,.36,1)` ("flow"). Reveals take 0.7–0.9s; stagger is 60–80ms.
2. *Motion explains.* Every animation either reveals hierarchy, shows cause→effect (search → visit → quote), or responds to the user.
3. *Never gate reading.* Content is in the HTML at render time, animation only enhances it, and nothing waits on a long timeline.
4. *Reduced motion = static.* Lenis smooth scroll, parallax, the marquee and scroll-linked transforms are disabled.

## 5. Keyword strategy (Flowsites' own SEO)

Prioritised by commercial intent × relevance × attainability (difficulty is our estimate — **validate with a keyword tool before content investment**):

| Priority | Cluster | Target page |
|---|---|---|
| 1 | contractor website design Ontario, web design for trades, website design for contractors | `/` and `/industries/contractor-web-design` |
| 1 | landscaping website design, lawn care website design | `/industries/landscaping-web-design` (strongest proof: Yardex) |
| 1 | website design Guelph, web designer Guelph | `/` (Guelph-based service-area business; no fake office) |
| 2 | roofing / plumbing / HVAC / electrician / cleaning company website design | the matching `/industries/*` pages |
| 2 | SEO for contractors Ontario, local SEO Ontario | `/services/local-seo` |
| 3 | affordable web design Ontario, small business web design Ontario | `/pricing` |
| 3 | website designer Kitchener / Waterloo / Cambridge | **Not built.** Add only with real local clients/projects, to avoid doorway pages. |

Internal linking: home → services, industries, case studies; each industry page → relevant case study + service + preview CTA; each case study → related industry + preview CTA; resources → service pages.
