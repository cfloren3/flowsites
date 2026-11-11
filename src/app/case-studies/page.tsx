import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { PageHero, Reveal } from "@/components/ui";
import { FinalCta } from "@/components/sections";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "In-depth case studies from Flowsites: how we approached design, local SEO and product design for Yardex Guelph, Carter Florence and TraitCRM.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero eyebrow="Case studies" title={"The thinking\n*behind* *the* *work.*"} lede="The challenge, the strategy, the decisions, and what we can honestly say about the results." />
      <section className="container-x pb-24" aria-label="Case study list">
        <ol className="border-t border-ink/10">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 60}>
              <Link href={`/case-studies/${p.slug}`} className="group grid items-center gap-6 border-b border-ink/10 py-8 md:grid-cols-12 md:py-10">
                <span className="label text-stone md:col-span-1">0{i + 1}</span>
                <div className="md:col-span-5">
                  <h2 className="text-[clamp(2rem,4.4vw,4rem)] font-semibold leading-none tracking-[-0.05em] transition-transform duration-500 group-hover:translate-x-2">{p.name}</h2>
                  <p className="label mt-3 text-stone">{p.category}</p>
                </div>
                <p className="text-stone md:col-span-3">{p.headline}</p>
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-ink/10 md:col-span-3">
                  <Image src={p.images.desktop} alt="" fill sizes="(min-width:768px) 22vw, 90vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-paper opacity-0 transition-opacity group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>
      <FinalCta />
    </>
  );
}
