
import { Eyebrow, Reveal, SplitText, TextLink } from "../ui";


const pillars = [
  {
    t: "Technical SEO",
    items: ["Server-rendered, static HTML", "Clean semantic markup", "XML sitemap & robots.txt", "Canonical URLs", "Structured data", "Optimised images", "Fast, mobile-first", "Indexation monitoring"],
  },
  {
    t: "Local SEO",
    items: ["Geographic keyword research", "A page per core service", "Genuine service-area pages only", "Google Business Profile optimisation", "Consistent business info", "Review strategy", "Competitor analysis"],
  },
  {
    t: "Content",
    items: ["Written for search intent", "Clear service descriptions", "Helpful FAQs", "Project showcases", "Real customer questions", "Local relevance"],
  },
  {
    t: "Continuous",
    items: ["Ranking monitoring", "Search Console analysis", "Technical checks", "Competitor tracking", "Content improvements", "Conversion analysis"],
  },
];

export function SeoSection() {
  return (
    <section className="relative bg-paper-2 py-24 md:py-36" aria-labelledby="seo-title">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>SEO is part of the foundation</Eyebrow>
            </Reveal>
            <SplitText id="seo-title" text={"Looking good is only *half* *the* *job.*"} className="h-section mt-6" />
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={150}>
              <p className="lede text-stone">
                A beautiful website means little if your customers can&apos;t find it. Here&apos;s everything we put in place to move you up.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-6 rounded-2xl border border-ink/10 bg-paper p-5 text-sm leading-relaxed text-ink/75">
                <strong className="text-ink">No ranking guarantees.</strong> Positions vary by location, device, competition, search intent and time. We promise sound work and honest reporting, not a number.
              </div>
            </Reveal>
            <Reveal delay={280} className="mt-6">
              <TextLink href="/services/local-seo">How our SEO works</TextLink>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.t} delay={i * 80} className="bg-paper-2 p-7">
              <p className="label text-stone">0{i + 1}</p>
              <h3 className="h-card mt-4 text-2xl">{p.t}</h3>
              <ul className="mt-5 space-y-2 text-[0.95rem] text-ink/70">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-2.5">
                    <span className="mt-[0.6em] h-[2px] w-2.5 shrink-0 bg-ink" aria-hidden="true" />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
