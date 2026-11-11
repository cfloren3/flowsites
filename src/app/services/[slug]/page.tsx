import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, X } from "lucide-react";
import { getService, services } from "@/content/services";
import { industries } from "@/content/industries";
import { site } from "@/content/site";
import { Button, Eyebrow, PageHero, Reveal, TextLink } from "@/components/ui";
import { FinalCta, Guarantee } from "@/components/sections";
import { RankingSection } from "@/components/home/RankingDashboard";
import { SeoSection } from "@/components/home/SeoSection";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return { title: s.seoTitle, description: s.seoDescription, alternates: { canonical: `/services/${s.slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.name,
          description: s.seoDescription,
          provider: { "@id": `${site.url}/#business` },
          areaServed: { "@type": "AdministrativeArea", name: "Ontario, Canada" },
          url: `${site.url}/services/${s.slug}`,
          ...(s.slug === "web-design" ? { offers: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", minPrice: 750, priceCurrency: "CAD" } } } : {}),
        }}
      />
      <JsonLd data={breadcrumbSchema(site.url, [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.name, path: `/services/${s.slug}` }])} />
      <PageHero eyebrow={`Service ${s.number} · ${s.price}`} title={s.name} lede={s.intro}>
        <Reveal delay={300} className="mt-10 flex flex-wrap items-center gap-4">
          <Button href={s.slug === "web-design" ? "/free-website-preview" : `/contact?interest=${s.slug}`} size="lg">
            {s.slug === "web-design" ? "Get my free website preview" : "Discuss your project"}
          </Button>
          <p className="text-sm text-stone">{s.promise}</p>
        </Reveal>
      </PageHero>

      <section className="container-x pb-20 md:pb-28" aria-label="What's covered">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-2 lg:grid-cols-4">
          {s.groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 70} className="bg-paper p-7">
              <p className="label text-stone">0{i + 1}</p>
              <h2 className="h-card mt-5 text-2xl">{g.title}</h2>
              <ul className="mt-5 space-y-2.5">
                {g.items.map((it) => (
                  <li key={it} className="flex gap-2.5 text-ink/75">
                    <Check className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {s.included.length ? (
        <section className="bg-paper-2 py-20 md:py-28" aria-labelledby="incl-title">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Pricing clarity</Eyebrow>
              <h2 id="incl-title" className="h-section mt-6 !text-[clamp(2.2rem,4vw,3.6rem)]">
                What&apos;s in, what&apos;s not.
              </h2>
              <p className="mt-6 text-stone">{s.priceNote}</p>
              <TextLink href="/pricing" className="mt-6">Full pricing details</TextLink>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:col-span-8">
              <div className="rounded-3xl bg-paper p-7">
                <p className="font-semibold">Included in the website fee</p>
                <ul className="mt-5 space-y-3">
                  {s.included.map((it) => (
                    <li key={it} className="flex gap-2.5 text-ink/80">
                      <Check className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-ink/10 p-7">
                <p className="font-semibold">Separate costs</p>
                <ul className="mt-5 space-y-3">
                  {s.notIncluded?.map((it) => (
                    <li key={it} className="flex gap-2.5 text-stone">
                      <X className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {s.slug === "local-seo" ? <SeoSection /> : null}
      {s.slug !== "web-design" ? <RankingSection /> : null}
      {s.slug === "web-design" ? <Guarantee /> : null}

      <section className="bg-paper py-20" aria-label="Related">
        <div className="container-x grid gap-10 md:grid-cols-2">
          <div>
            <p className="label text-stone">Other services</p>
            <ul className="mt-4 space-y-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <TextLink href={`/services/${o.slug}`} className="text-xl">{o.name}</TextLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label text-stone">By industry</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link href={`/industries/${i.slug}`} className="inline-flex min-h-10 items-center rounded-full border border-ink/15 px-4 py-2 text-sm hover:border-ink">
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
