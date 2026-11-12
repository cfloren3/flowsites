import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight, Check, Minus, Plus } from "lucide-react";
import { previewTerms, site } from "@/content/site";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { faqs } from "@/content/faq";
import { Button, Eyebrow, Reveal, SplitText } from "./ui";

/* ---------------- Guarantee ---------------- */
export function Guarantee({ showTerms = false }: { showTerms?: boolean }) {
  return (
    <section id="guarantee" className="relative bg-paper py-24 md:py-36" aria-labelledby="guarantee-title">
      <div className="container-x">
        <div className="relative overflow-hidden on-dark rounded-[32px] border border-paper/10 bg-ink px-6 text-paper py-14 sm:px-12 md:py-20 lg:px-20">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full border-[1.5px] border-volt/30" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 h-[18rem] w-[18rem] rounded-full border-[1.5px] border-volt/30" />
          <div className="relative grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="label text-volt">The no-risk design guarantee</p>
              <SplitText id="guarantee-title" text={"See it first.\nLove it *before* *you* *pay.*"} className="display mt-6 text-[clamp(2.8rem,7vw,6.4rem)]" accentClassName="text-volt" />
              <p className="lede mt-8 max-w-xl text-paper/75">
                Our work should speak for itself. We design your homepage and show you what your business could look like online before asking for a commitment. If the design isn&apos;t right for you, you don&apos;t pay.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/free-website-preview" variant="accent" size="lg">
                  Get my free website preview
                </Button>
                {!showTerms ? (
                  <Link href="/pricing#guarantee" className="inline-flex min-h-11 items-center gap-1.5 px-3 font-medium underline underline-offset-4">
                    Read the full terms
                  </Link>
                ) : null}
              </div>
            </div>
            <div className="lg:col-span-5">
              <ol className="space-y-3">
                {[
                  ["Tell us about your business", "Two minutes, no obligation."],
                  ["We design your homepage", "Your services, your photos, your reviews."],
                  ["You review a private, live preview", "On your phone, like a customer would."],
                  ["Love it? We quote the full build.", "Not for you? You owe nothing."],
                ].map(([t, b], i) => (
                  <Reveal as="li" key={t} delay={i * 90} className="flex gap-4 rounded-2xl border border-paper/10 bg-paper/[0.05] p-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-volt text-sm font-medium text-ink">{i + 1}</span>
                    <div>
                      <p className="font-semibold tracking-[-0.02em]">{t}</p>
                      <p className="text-sm text-paper/65">{b}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
          {showTerms ? (
            <div className="relative mt-14 rounded-2xl bg-paper p-6 text-ink md:p-8">
              <h3 className="text-xl font-semibold tracking-[-0.02em]">Preview guarantee terms</h3>
              <ul className="mt-5 grid gap-3 md:grid-cols-2">
                {previewTerms.map((t) => (
                  <li key={t} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink/75">
                    <Check className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="label mt-6 text-stone">Draft terms: to be reviewed before publication.</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why Flowsites ---------------- */
const reasons = [
  { t: "We've been in your shoes", b: "We run a local service business. Quoting, crews, reviews and slow seasons aren't abstract to us.", proof: "Yardex Guelph", href: "/case-studies/yardex-guelph" },
  { t: "Design that creates confidence", b: "A professional site can decide whether a homeowner calls you or the next result down.", proof: "Carter Florence", href: "/case-studies/carter-florence" },
  { t: "SEO from the first wireframe", b: "Page structure, service pages and schema are planned before we pick colours, not bolted on later.", proof: "30-URL Yardex sitemap", href: "/case-studies/yardex-guelph#seo" },
  { t: "Technology without the complexity", b: "Modern tools and AI-assisted workflows make us faster. Every decision is still made by a person.", proof: "TraitCRM", href: "/case-studies/traitcrm" },
  { t: "We measure what matters", b: "Where data is available, we track rankings, visibility, engagement and enquiries, and say what's verified.", proof: "Evidence labels", href: "/work#evidence" },
  { t: "Built for long-term growth", b: "A foundation that can add service pages, areas and features as the business grows.", proof: "Growth plans", href: "/services/website-care" },
];

export function WhyFlowsites() {
  return (
    <section className="relative bg-paper py-24 md:py-36" aria-labelledby="why-title">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Eyebrow>Why Flowsites</Eyebrow>
              </Reveal>
              <SplitText id="why-title" text={"Built by people who understand *business.*"} className="h-section mt-6" />
              <Reveal delay={150} className="mt-10 rounded-3xl bg-ink p-7 text-paper on-dark">
                <p className="label text-paper/50">How we use AI</p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">Modern tools. Smarter processes. Better websites.</p>
                <p className="mt-3 text-sm leading-relaxed text-paper/65">
                  We use AI-assisted workflows for research, competitor analysis, development and quality checks. That&apos;s part of how a $995 starting price is possible. Design, strategy and every final call stay human.
                </p>
              </Reveal>
            </div>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:col-span-7">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.t} delay={(i % 2) * 80} className="group flex flex-col bg-paper p-7">
                <span className="label text-stone">0{i + 1}</span>
                <h3 className="h-card mt-8 text-[1.45rem]">{r.t}</h3>
                <p className="mt-3 flex-1 text-stone leading-relaxed">{r.b}</p>
                <Link href={r.href} className="mt-6 inline-flex min-h-10 items-center gap-1.5 self-start rounded-full border border-ink/10 px-3 py-1.5 text-xs text-ink/70 transition-colors hover:border-ink hover:text-ink">
                  Proof: {r.proof} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
            <Reveal as="li" className="flex flex-col justify-between bg-ink p-7 text-paper on-dark sm:col-span-2 md:flex-row md:items-center md:gap-6">
              <div>
                <span className="label text-paper/50">07 · No-risk design</span>
                <p className="mt-3 text-xl font-semibold tracking-[-0.03em]">See the design before you make any financial commitment.</p>
              </div>
              <Button href="/pricing#guarantee" variant="accent" className="mt-6 shrink-0 md:mt-0">
                Preview terms
              </Button>
            </Reveal>
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */
export function Pricing({ detailed = false, showHeader = true }: { detailed?: boolean; showHeader?: boolean }) {
  return (
    <section id="pricing" className="relative bg-paper-2 py-24 md:py-36" aria-labelledby="pricing-title">
      <div className="container-x">
        <div className={clsx("grid gap-8 lg:grid-cols-12 lg:items-end", !showHeader && "sr-only")}>
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Pricing · CAD</Eyebrow>
            </Reveal>
            <SplitText id="pricing-title" text={"Premium websites.\n*Practical* *pricing.*"} className="h-section mt-6" />
          </div>
          <Reveal delay={150} className="lg:col-span-5">
            <p className="text-stone leading-relaxed">
              Professional websites starting at <strong className="text-ink">$995 CAD</strong>, with a no-risk design preview. Final scope and price are confirmed in a written quote before any work you pay for begins.
            </p>
          </Reveal>
        </div>

        <div className={clsx("grid gap-4 lg:grid-cols-3", showHeader ? "mt-14" : "mt-0")}>
          {services.map((s, i) => {
            const hero = i === 0;
            return (
              <Reveal
                key={s.slug}
                delay={i * 90}
                className={clsx("flex flex-col rounded-[28px] border p-7 md:p-9", hero ? "on-dark border-transparent bg-ink text-paper lg:-my-4 lg:py-12" : "border-ink/10 bg-paper")}
              >
                <div className="flex items-center justify-between">
                  <p className={clsx("label", hero ? "text-paper/50" : "text-stone")}>{s.number}</p>
                  {hero ? <span className="label rounded-full bg-volt px-2.5 py-1 !text-[0.64rem] text-ink">Most businesses start here</span> : null}
                </div>
                <h3 className="h-card mt-8 text-[1.6rem]">{s.name}</h3>
                <p className={clsx("mt-3 leading-relaxed", hero ? "text-paper/65" : "text-stone")}>{s.short}</p>
                <p className="mt-8">
                  {hero ? <span className={clsx("label block", "text-paper/50")}>Starting at</span> : null}
                  <span className="text-[2.6rem] font-semibold leading-none tracking-[-0.05em]">{hero ? "$995" : s.price}</span>
                  {hero ? <span className="ml-2 text-paper/55">CAD</span> : null}
                </p>
                <p className={clsx("mt-3 text-sm leading-relaxed", hero ? "text-paper/55" : "text-stone")}>{s.priceNote}</p>
                <ul className={clsx("mt-8 space-y-2.5 border-t pt-6 text-[0.95rem]", hero ? "border-paper/10" : "border-ink/10")}>
                  {(s.included.length ? s.included : s.groups.flatMap((g) => g.items).slice(0, 6)).map((it) => (
                    <li key={it} className="flex gap-2.5">
                      <Check className={clsx("mt-1 h-4 w-4 shrink-0", hero ? "text-volt" : "text-ink")} aria-hidden="true" />
                      <span className={hero ? "text-paper/80" : "text-ink/75"}>{it}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-10">
                  <Button href={hero ? "/free-website-preview" : `/contact?interest=${s.slug}`} variant={hero ? "accent" : "primary"} className="w-full">
                    {hero ? "Get my free preview" : i === 1 ? "Discuss SEO" : "Ask about care plans"}
                  </Button>
                  <Link href={`/services/${s.slug}`} className={clsx("mt-4 block text-center text-sm underline underline-offset-4", hero ? "text-paper/60 hover:text-paper" : "text-stone hover:text-ink")}>
                    What&apos;s included
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>

        {detailed ? <CostBreakdown /> : (
          <Reveal className="mt-10 text-center text-sm text-stone">
            Domain, hosting, email and third-party tools are separate. Ongoing services are optional.{" "}
            <Link href="/pricing" className="underline underline-offset-4 hover:text-ink">
              Full pricing details
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function CostBreakdown() {
  const rows: [string, string, string][] = [
    ["Website design & development", "One-time project fee", "Starting at $995 CAD, confirmed in writing"],
    ["Design preview", "Before you commit", "Free. No deposit, no obligation"],
    ["Domain name", "Third party, usually yearly", "Paid by you, directly to the registrar"],
    ["Hosting", "Third party or care plan", "Paid by you, or included in a care plan if agreed"],
    ["Business email", "Third party", "Paid by you (e.g. Google Workspace)"],
    ["Paid fonts, photos, plugins", "Only if needed", "Passed through at cost, agreed in advance"],
    ["SEO & growth", "Optional, recurring", "Custom pricing"],
    ["Website care", "Optional, recurring", "Custom monthly plans"],
  ];
  return (
    <Reveal className="mt-16 overflow-hidden rounded-3xl border border-ink/10 bg-paper">
      <div className="overflow-x-auto" data-lenis-prevent>
        <table className="w-full min-w-[560px] text-left">
          <caption className="p-6 text-left text-xl font-semibold tracking-[-0.02em] md:p-8">What you pay for, and when</caption>
          <thead>
            <tr className="label border-t border-ink/10 text-stone">
              <th scope="col" className="px-6 py-4 font-normal md:px-8">Item</th>
              <th scope="col" className="px-4 py-4 font-normal">Type</th>
              <th scope="col" className="px-6 py-4 font-normal md:px-8">Cost</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([a, b, c]) => (
              <tr key={a} className="border-t border-ink/10">
                <th scope="row" className="px-6 py-4 font-medium md:px-8">{a}</th>
                <td className="px-4 py-4 text-stone">{b}</td>
                <td className="px-6 py-4 md:px-8">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-ink/10 px-6 py-4 text-sm text-stone md:px-8">All prices are in Canadian dollars (CAD) and exclude applicable HST.</p>
    </Reveal>
  );
}

/* ---------------- Industries ---------------- */
export function IndustriesGrid() {
  return (
    <section className="relative bg-paper py-24 md:py-32" aria-labelledby="ind-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <Eyebrow>Industries</Eyebrow>
            </Reveal>
            <SplitText id="ind-title" text={"Made for trades &\n*local* *businesses.*"} className="h-section mt-6" />
          </div>
          <Reveal delay={100}>
            <p className="max-w-sm text-stone">A roofer, a café and a salon all win customers differently. We design for how your customers search and decide.</p>
          </Reveal>
        </div>
        <ul className="mt-12 grid border-t border-ink/10 md:grid-cols-2 md:gap-x-10">
          {industries.map((ind, i) => (
            <Reveal as="li" key={ind.slug} delay={i * 40}>
              <Link
                href={`/industries/${ind.slug}`}
                className="group relative flex items-center justify-between gap-6 overflow-hidden border-b border-ink/10 py-6 md:py-7"
              >
                <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[var(--ease-flow)] group-hover:scale-y-100" />
                <span className="relative flex items-baseline gap-5 transition-[color,transform] duration-500 group-hover:translate-x-4 group-hover:text-paper">
                  <span className="label text-stone group-hover:text-paper/60">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[clamp(1.4rem,2.6vw,2.2rem)] font-semibold tracking-[-0.045em]">{ind.name}</span>
                </span>
                <span className="sr-only">: {ind.hero}</span>
                <ArrowUpRight className="relative h-6 w-6 shrink-0 transition-[color,transform] duration-500 group-hover:-translate-x-4 group-hover:text-volt" aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
export function Faq({ items = faqs, title = "Questions, answered." }: { items?: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="relative bg-paper py-24 md:py-32" aria-labelledby="faq-title">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
          </Reveal>
          <h2 id="faq-title" className="h-section mt-6 !text-[clamp(2.2rem,4vw,3.6rem)]">
            {title}
          </h2>
          <p className="mt-6 text-stone">
            Something else? Email{" "}
            <a className="underline underline-offset-4" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </div>
        <div className="lg:col-span-8">
          {items.map((f) => (
            <details key={f.q} className="group border-b border-ink/10 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium tracking-[-0.02em] md:text-xl">
                {f.q}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 transition-colors group-open:bg-ink group-open:text-paper">
                  <Plus className="h-4 w-4 group-open:hidden" aria-hidden="true" />
                  <Minus className="hidden h-4 w-4 group-open:block" aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 leading-relaxed text-stone">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function faqSchema(items: { q: string; a: string }[] = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

/* ---------------- Final CTA ---------------- */
export function FinalCta({ title = "Your next customer is searching.\n*Make* *sure* *they* *find* *you.*" }: { title?: string }) {
  return (
    <section className="on-dark relative overflow-hidden bg-ink py-28 text-paper md:py-40 grain" aria-labelledby="cta-title">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-full h-[50rem] w-[80rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--p-accent)_16%,transparent),transparent)]" />
      <div className="container-x relative text-center">
        <Reveal>
          <p className="label text-paper/50">Starting at $995 CAD · Love the design or don&apos;t pay</p>
        </Reveal>
        <SplitText id="cta-title" text={title} accentClassName="text-paper/45" className="display mx-auto mt-8 max-w-[18ch] text-[clamp(2.6rem,7vw,6.8rem)]" />
        <Reveal delay={200} className="mt-12 flex flex-wrap justify-center gap-3">
          <Button href="/free-website-preview" variant="accent" size="lg">
            Get my free website preview
          </Button>
          <Button href="/contact?interest=review" variant="outline-light" size="lg">
            Get a free website review
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Marquee ---------------- */
export function TradesMarquee() {
  const items = ["Landscaping", "Restaurants", "Lawn care", "Retail", "Roofing", "Salons", "Plumbing", "Electrical", "HVAC", "Renovation", "Painting", "Cleaning", "Pressure washing", "Window cleaning", "Property maintenance", "Concrete & paving"];
  return (
    <div className="on-dark overflow-hidden border-y border-paper/10 bg-ink py-5 text-paper" aria-label="Industries we work with">
      <ul className="flex w-max animate-marquee gap-10" aria-hidden="false">
        {[...items, ...items].map((t, i) => (
          <li key={i} aria-hidden={i >= items.length} className="flex items-center gap-10 text-[clamp(1.1rem,2vw,1.6rem)] font-medium tracking-[-0.03em] text-paper/70">
            {t}
            <span className="h-1.5 w-1.5 rounded-full bg-volt" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </div>
  );
}
