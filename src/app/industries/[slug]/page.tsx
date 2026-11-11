import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Search } from "lucide-react";
import { getIndustry, industries } from "@/content/industries";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";
import { BrowserFrame } from "@/components/Frames";
import { Button, Eyebrow, PageHero, Reveal, TextLink } from "@/components/ui";
import { FinalCta } from "@/components/sections";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) return {};
  return { title: i.metaTitle, description: i.metaDescription, alternates: { canonical: `/industries/${i.slug}` } };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const example = ind.exampleSlug ? getProject(ind.exampleSlug) : undefined;
  const others = industries.filter((x) => x.slug !== ind.slug);

  return (
    <>
      <JsonLd data={breadcrumbSchema(site.url, [{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }, { name: ind.name, path: `/industries/${ind.slug}` }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: ind.title,
          serviceType: "Website design and local SEO",
          audience: { "@type": "BusinessAudience", name: `${ind.name} businesses` },
          provider: { "@id": `${site.url}/#business` },
          areaServed: { "@type": "AdministrativeArea", name: "Ontario, Canada" },
        }}
      />
      <PageHero eyebrow={`Industries · ${ind.name}`} title={ind.hero} lede={ind.intro}>
        <Reveal delay={300} className="mt-10 flex flex-wrap gap-3">
          <Button href="/free-website-preview" size="lg">
            Get my free website preview
          </Button>
          <Button href="/pricing" variant="ghost" size="lg">
            Starting at $750 CAD
          </Button>
        </Reveal>
      </PageHero>

      <section className="bg-paper-2 py-20 md:py-28" aria-labelledby="ch-title">
        <div className="container-x">
          <Eyebrow>The challenge</Eyebrow>
          <h2 id="ch-title" className="h-section mt-6 max-w-[20ch] !text-[clamp(2.2rem,4.4vw,4rem)]">
            What makes {ind.trade} websites different.
          </h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {ind.challenges.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 80} className="rounded-3xl bg-paper p-7">
                <span className="label text-stone">0{i + 1}</span>
                <h3 className="h-card mt-8 text-[1.45rem]">{c.title}</h3>
                <p className="mt-3 text-stone leading-relaxed">{c.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28" aria-label="Design, conversion and trust">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          {[
            { t: "Design considerations", items: ind.design },
            { t: "Lead-generation features", items: ind.leadFeatures },
            { t: "Credibility signals", items: ind.trust },
          ].map((col, i) => (
            <Reveal key={col.t} delay={i * 80}>
              <h2 className="text-2xl font-semibold tracking-[-0.03em]">{col.t}</h2>
              <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
                {col.items.map((it) => (
                  <li key={it} className="py-3.5 text-ink/80">{it}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="on-dark bg-ink py-20 text-paper md:py-28" aria-labelledby="seo-op-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow dark>SEO opportunities</Eyebrow>
            <h2 id="seo-op-title" className="h-section mt-6 !text-[clamp(2.2rem,4vw,3.6rem)]">
              The searches your customers make.
            </h2>
            <p className="mt-6 text-paper/65 leading-relaxed">{ind.seoNotes}</p>
            <p className="mt-6 text-sm text-paper/55">Example search patterns, not ranking promises. We research real volumes and competition for your area before planning pages.</p>
          </div>
          <ul className="space-y-3 lg:col-span-6 lg:col-start-7">
            {ind.searches.map((q, i) => (
              <Reveal as="li" key={q} delay={i * 60} className="flex items-center gap-3 rounded-full border border-paper/10 bg-ink-2 px-5 py-4">
                <Search className="h-4 w-4 text-paper/55" aria-hidden="true" />
                <span className="text-lg tracking-[-0.01em]">{q}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28" aria-labelledby="ex-title">
        <div className="container-x">
          <Eyebrow>Relevant example</Eyebrow>
          {example ? (
            <Link href={`/case-studies/${example.slug}`} className="group mt-8 grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 id="ex-title" className="text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-none tracking-[-0.05em]">{example.name}</h2>
                <p className="mt-5 max-w-md text-stone leading-relaxed">{ind.exampleNote}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-medium underline underline-offset-4">
                  Read the case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <div className="transition-transform duration-700 group-hover:-translate-y-1 lg:col-span-7">
                <BrowserFrame src={example.images.desktop} alt={`${example.name} homepage`} url={example.displayUrl} />
              </div>
            </Link>
          ) : (
            <div className="mt-8 grid gap-8 rounded-3xl border border-dashed border-ink/20 p-8 md:grid-cols-12 md:p-12">
              <div className="md:col-span-7">
                <h2 id="ex-title" className="text-[clamp(1.8rem,3.4vw,3rem)] font-semibold leading-none tracking-[-0.045em]">Your business could be the first.</h2>
                <p className="mt-4 max-w-lg text-stone leading-relaxed">{ind.exampleNote} In the meantime, our lawn care work shows how we approach any local service business.</p>
              </div>
              <div className="flex flex-col items-start gap-3 md:col-span-5 md:items-end md:justify-center">
                <Button href="/free-website-preview">Get my free preview</Button>
                <TextLink href="/case-studies/yardex-guelph">See the Yardex case study</TextLink>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-ink/10 bg-paper py-14" aria-label="Other industries">
        <div className="container-x">
          <p className="label text-stone">Other industries</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/industries/${o.slug}`} className="inline-flex min-h-10 items-center rounded-full border border-ink/15 px-4 py-2 text-sm hover:border-ink">
                  {o.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services/local-seo" className="inline-flex min-h-10 items-center rounded-full bg-ink px-4 py-2 text-sm text-paper">
                Local SEO for trades
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
