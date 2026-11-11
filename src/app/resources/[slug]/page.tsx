import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/content/articles";
import { site } from "@/content/site";
import { Button, Reveal, SplitText, TextLink } from "@/components/ui";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/resources/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.description, publishedTime: a.published },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.description,
          datePublished: a.published,
          author: { "@type": "Person", name: site.founder.name, url: site.founder.url },
          publisher: { "@id": `${site.url}/#business` },
          mainEntityOfPage: `${site.url}/resources/${a.slug}`,
        }}
      />
      <JsonLd data={breadcrumbSchema(site.url, [{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }, { name: a.title, path: `/resources/${a.slug}` }])} />
      <header className="container-x max-w-4xl pt-36 pb-12 md:pt-44">
        <nav aria-label="Breadcrumb" className="label text-stone">
          <Link href="/resources" className="hover:text-ink">Resources</Link> <span aria-hidden="true">/</span> {a.category}
        </nav>
        <SplitText immediate as="h1" text={a.title} className="mt-6 text-[clamp(2.3rem,5vw,4.4rem)] font-semibold leading-[1] tracking-[-0.05em]" />
        <Reveal delay={200}>
          <p className="lede mt-6 text-stone">{a.description}</p>
          <p className="label mt-6 text-stone">
            By {site.founder.name} · {new Date(a.published).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })} · {a.readingTime}
          </p>
        </Reveal>
      </header>
      <div className="container-x max-w-4xl pb-20">
        <div className="prose-flow max-w-[68ch] border-t border-ink/10 pt-10">
          {a.body.map((b, i) => {
            if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
            if (b.type === "h3") return <h3 key={i}>{b.text}</h3>;
            if (b.type === "ul")
              return (
                <ul key={i}>
                  {b.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              );
            return <p key={i}>{b.text}</p>;
          })}
        </div>
        <aside className="mt-16 rounded-[28px] bg-ink p-8 text-paper on-dark md:p-12">
          <p className="label text-paper/50">Next step</p>
          <p className="mt-4 max-w-xl text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.04em]">Want us to apply this to your website?</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/free-website-preview" variant="accent">Get my free preview</Button>
            {a.related.map((r) => (
              <TextLink key={r.href} href={r.href} className="text-paper">{r.label}</TextLink>
            ))}
          </div>
        </aside>
      </div>
    </article>
  );
}
