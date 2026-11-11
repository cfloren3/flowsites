import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Info } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { getIndustry } from "@/content/industries";
import { yardexRankings } from "@/content/rankings";
import { evidenceMeta } from "@/content/evidence";
import { site } from "@/content/site";
import { BrowserFrame, PhoneFrame } from "@/components/Frames";
import { Button, EvidenceBadge, Eyebrow, Reveal, SplitText, TextLink } from "@/components/ui";
import { FinalCta } from "@/components/sections";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { RollingNumber } from "@/components/Type";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.name} Case Study: ${p.category.split(" · ")[0]}`,
    description: p.summary,
    alternates: { canonical: `/case-studies/${p.slug}` },
    openGraph: { title: `${p.name} | Flowsites case study`, description: p.summary, images: [{ url: p.images.desktop }] },
  };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const industry = p.relatedIndustry ? getIndustry(p.relatedIndustry) : undefined;
  const isYardex = p.slug === "yardex-guelph";

  return (
    <article>
      <JsonLd
        data={breadcrumbSchema(site.url, [
          { name: "Home", path: "/" },
          { name: "Case studies", path: "/case-studies" },
          { name: p.name, path: `/case-studies/${p.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: `${p.name} case study`,
          about: { "@type": "WebSite", name: p.name, url: p.url },
          creator: { "@id": `${site.url}/#business` },
          description: p.summary,
          image: `${site.url}${p.images.desktop}`,
        }}
      />

      {/* Hero */}
      <header className="on-dark relative overflow-hidden bg-ink pt-32 text-paper md:pt-44 grain">
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="label text-paper/55">
            <Link href="/work" className="hover:text-paper">Work</Link> <span aria-hidden="true">/</span> <span aria-current="page">{p.name}</span>
          </nav>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {isYardex ? <span className="label rounded-full bg-volt px-2.5 py-1 !text-[0.64rem] text-ink">Flagship case study</span> : null}
            <span className="label text-paper/55">{p.category}</span>
          </div>
          <SplitText immediate as="h1" text={p.name} className="display mt-6 text-[clamp(3.2rem,11vw,11rem)]" />
          <Reveal delay={200}>
            <p className="mt-6 max-w-3xl text-[clamp(1.4rem,2.6vw,2.3rem)] font-medium leading-[1.15] tracking-[-0.03em] text-paper/70">{p.headline}</p>
          </Reveal>

          <Reveal delay={260}>
            <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Industry", p.industry],
                ["Services", p.services.join(", ")],
                ["Timeline", p.year],
                ["Live site", null],
              ].map(([k, v]) => (
                <div key={k} className="bg-ink p-5">
                  <dt className="label text-paper/55">{k}</dt>
                  <dd className="mt-2 text-[0.95rem] leading-snug text-paper/85">
                    {v ?? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-volt">
                        {p.displayUrl} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="container-x relative mt-16 md:mt-24">
          <div className="rise-in relative mx-auto max-w-[1240px] pb-16 md:pb-24" style={{ "--d": "300ms" } as React.CSSProperties}>
            <div className="md:w-[86%]">
              <BrowserFrame src={p.images.desktop} alt={`${p.name} desktop homepage, captured ${p.capturedOn}`} url={p.displayUrl} dark priority sizes="(min-width:1280px) 1060px, 90vw" />
            </div>
            <div className="absolute bottom-6 right-0 w-[28%] max-w-[260px] md:bottom-10">
              <PhoneFrame src={p.images.mobile} alt={`${p.name} mobile homepage`} sizes="260px" />
            </div>
          </div>
        </div>
      </header>

      {/* Relationship / scope */}
      <section className="bg-paper py-16 md:py-24" aria-label="Project scope">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Scope &amp; authorship</Eyebrow>
            <p className="mt-5 text-xl leading-relaxed tracking-[-0.01em] md:text-2xl">{p.relationship}</p>
            {p.notice ? (
              <div className="mt-8 flex gap-3 rounded-2xl border border-ink/10 bg-paper-2 p-5 text-sm leading-relaxed text-ink/75">
                <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <p>{p.notice}</p>
              </div>
            ) : null}
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>Key design features</Eyebrow>
            <ul className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
              {p.features.map((f, i) => (
                <Reveal as="li" key={f} delay={i * 50} className="flex gap-5 py-4">
                  <span className="label pt-1 text-stone">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[1.02rem]">{f}</span>
                </Reveal>
              ))}
            </ul>
            <p className="label mt-4 text-stone">Observed on the live site · {p.capturedOn}</p>
          </div>
        </div>
      </section>

      {/* Narrative */}
      {p.sections.map((s, i) => (
        <section key={s.id} id={s.id} className={i % 2 === 0 ? "bg-paper py-16 md:py-28" : "bg-paper-2 py-16 md:py-28"} aria-labelledby={`${s.id}-title`}>
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <p className="label text-stone">{s.kicker}</p>
                <SplitText id={`${s.id}-title`} text={s.title} className="mt-5 text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-[1] tracking-[-0.045em]" />
              </div>
            </div>
            <div className="lg:col-span-7">
              <Reveal className="prose-flow max-w-2xl">
                {s.body.map((b) => (
                  <p key={b}>{b}</p>
                ))}
                {s.bullets ? (
                  <ul>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
              {s.image ? (
                <Reveal variant="scale" className="mt-10">
                  <figure>
                    <BrowserFrame src={s.image.src} alt={s.image.alt} url={s.image.src.includes("traitcrm") ? "traitcrm.com" : p.displayUrl} sizes="(min-width:1024px) 55vw, 90vw" />
                    <figcaption className="label mt-4 text-stone">{s.image.caption}</figcaption>
                  </figure>
                </Reveal>
              ) : null}

              {s.id === "outcomes" ? <Outcomes slug={p.slug} /> : null}
            </div>
          </div>
        </section>
      ))}

      {p.metrics.length && !p.sections.some((s) => s.id === "outcomes") ? (
        <section className="bg-paper py-16 md:py-24" aria-label="Results">
          <div className="container-x">
            <Eyebrow>Results &amp; evidence</Eyebrow>
            <div className="mt-8">
              <Outcomes slug={p.slug} />
            </div>
          </div>
        </section>
      ) : null}

      {/* Gallery */}
      <section className="on-dark bg-ink py-20 text-paper md:py-28" aria-labelledby="gallery-title">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="gallery-title" className="text-[clamp(2rem,4vw,3.4rem)] font-semibold tracking-[-0.045em]">
              Inside the build
            </h2>
            <p className="label text-paper/55">Real screens · captured {p.capturedOn}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {p.images.sections.map((img, i) => (
              <Reveal key={img.src} delay={(i % 2) * 100} className={i === 0 && p.images.sections.length % 2 === 1 ? "md:col-span-2" : ""}>
                <figure>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-paper/10">
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width:768px) 45vw, 90vw" className="object-cover object-top transition-transform duration-[1.2s] ease-[var(--ease-flow)] hover:scale-[1.03]" />
                  </div>
                  <figcaption className="mt-3 text-sm text-paper/60">{img.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
            {p.images.mobile2 ? (
              <Reveal className="flex items-center justify-center gap-6 rounded-2xl border border-paper/10 bg-ink-2 p-8 md:col-span-2">
                <PhoneFrame src={p.images.mobile} alt={`${p.name} on mobile, top of page`} className="w-[40%] max-w-[220px]" />
                <PhoneFrame src={p.images.mobile2} alt={`${p.name} on mobile, scrolled`} className="w-[40%] max-w-[220px] translate-y-6" />
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      {p.lessons ? (
        <section className="bg-paper py-20 md:py-28" aria-labelledby="lessons-title">
          <div className="container-x">
            <Eyebrow>For your business</Eyebrow>
            <h2 id="lessons-title" className="h-section mt-6 max-w-[18ch]">
              Lessons any trades business can use.
            </h2>
            <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-2 lg:grid-cols-3">
              {p.lessons.map((l, i) => (
                <Reveal as="li" key={l} delay={(i % 3) * 70} className="bg-paper p-7">
                  <span className="label text-stone">0{i + 1}</span>
                  <p className="mt-6 text-lg font-medium leading-snug tracking-[-0.02em]">{l}</p>
                </Reveal>
              ))}
            </ol>
            <div className="mt-12 flex flex-wrap gap-3">
              <Button href="/free-website-preview" size="lg">
                Get my free website preview
              </Button>
              {industry ? (
                <Button href={`/industries/${industry.slug}`} variant="ghost" size="lg">
                  Websites for {industry.name.toLowerCase()}
                </Button>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* Next */}
      <section className="border-t border-ink/10 bg-paper" aria-label="Next case study">
        <Link href={`/case-studies/${next.slug}`} className="group container-x flex items-center justify-between gap-6 py-14 md:py-20">
          <div>
            <p className="label text-stone">Next case study</p>
            <p className="mt-3 text-[clamp(2.4rem,7vw,6rem)] font-semibold leading-none tracking-[-0.055em] transition-transform duration-500 group-hover:translate-x-3">{next.name}</p>
          </div>
          <ArrowUpRight className="h-12 w-12 shrink-0 transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2 md:h-20 md:w-20" aria-hidden="true" />
        </Link>
      </section>

      <FinalCta title={isYardex ? "Want results like this\n*for* *your* *business?*" : undefined} />
    </article>
  );
}

function Outcomes({ slug }: { slug: string }) {
  const p = getProject(slug)!;
  return (
    <div className="mt-10 space-y-10">
      {p.metrics.length ? (
        <dl className="grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
          {p.metrics.map((m) => (
            <div key={m.label} className="flex flex-col bg-paper p-6">
              <dt className="order-2 mt-2 text-sm leading-snug text-stone">{m.label}</dt>
              <dd className="order-1 text-[clamp(2.4rem,4vw,3.4rem)] font-semibold leading-none tracking-[-0.05em]">
                <RollingNumber value={m.value} />
              </dd>
              <dd className="order-3 mt-5 flex flex-wrap items-center gap-2 text-xs text-stone">
                <EvidenceBadge evidence={m.evidence} />
                <span>
                  {m.evidence.sourceUrl ? (
                    <a href={m.evidence.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">
                      {m.evidence.source}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    m.evidence.source
                  )}
                  {m.evidence.checked ? ` · checked ${m.evidence.checked}` : ""}
                </span>
              </dd>
              {m.evidence.note ? <dd className="order-4 mt-2 text-xs text-stone">{m.evidence.note}</dd> : null}
            </div>
          ))}
        </dl>
      ) : null}

      {slug === "yardex-guelph" ? (
        <div id="rankings" className="overflow-hidden rounded-3xl border border-ink/10 bg-paper">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 p-5">
            <p className="font-semibold tracking-[-0.02em]">Keyword ranking records</p>
            <EvidenceBadge evidence={{ status: "unverified" }} />
          </div>
          <div className="overflow-x-auto" data-lenis-prevent>
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Yardex Guelph keyword ranking records and verification status</caption>
              <thead>
                <tr className="label text-stone">
                  {["Keyword", "Engine", "Location", "Device", "Type", "Position", "Checked", "Status"].map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {yardexRankings.map((r) => (
                  <tr key={r.keyword} className="border-t border-ink/10">
                    <th scope="row" className="px-4 py-3 font-medium">{r.keyword}</th>
                    <td className="px-4 py-3 text-stone">{r.engine}</td>
                    <td className="px-4 py-3 text-stone">{r.location}</td>
                    <td className="px-4 py-3 text-stone">{r.device}</td>
                    <td className="px-4 py-3 text-stone">{r.type}</td>
                    <td className="px-4 py-3">{r.position ?? "—"}</td>
                    <td className="px-4 py-3 text-stone">{r.checked ?? "—"}</td>
                    <td className="px-4 py-3">{evidenceMeta[r.status].label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-ink/10 p-5 text-sm leading-relaxed text-stone">
            Ranking positions are not shown until they can be verified with Google Search Console or a dated, location-specific check. Organic results, map-pack results and Search Console average positions are recorded separately because they measure different things.
          </p>
        </div>
      ) : null}
      <TextLink href="/work#evidence">How we label evidence</TextLink>
    </div>
  );
}
