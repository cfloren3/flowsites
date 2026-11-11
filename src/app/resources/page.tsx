import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/content/articles";
import { PageHero, Reveal } from "@/components/ui";
import { FinalCta } from "@/components/sections";

export const metadata: Metadata = {
  title: "SEO & Website Resources for Ontario Trades",
  description: "Practical guides on websites, local SEO and lead generation for Ontario contractors and service businesses. No fluff.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero eyebrow="Resources" title={"Practical guides.\n*No* *fluff.*"} lede="What we've learned running a trades business and building websites for others, written for owners who don't have time to waste." />
      <section className="container-x pb-24" aria-label="Articles">
        <ul className="grid gap-4 md:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 80}>
              <Link href={`/resources/${a.slug}`} className="group flex h-full flex-col rounded-[24px] border border-ink/10 bg-paper-2 p-7 transition-colors hover:bg-ink hover:text-paper">
                <div className="flex items-center justify-between">
                  <span className="label rounded-full border border-current/20 px-2.5 py-1 !text-[0.64rem]">{a.category}</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                </div>
                <h2 className="mt-14 text-[1.55rem] font-semibold leading-[1.1] tracking-[-0.035em]">{a.title}</h2>
                <p className="mt-4 flex-1 text-sm leading-relaxed opacity-70">{a.description}</p>
                <p className="label mt-8 opacity-60">{a.readingTime}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
      <FinalCta />
    </>
  );
}
