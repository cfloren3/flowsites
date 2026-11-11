import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { PageHero, Reveal } from "@/components/ui";
import { FinalCta, Guarantee } from "@/components/sections";

export const metadata: Metadata = {
  title: "Services: Web Design, Local SEO & Website Care",
  description:
    "Website design starting at $750 CAD, local SEO and ongoing website growth for Ontario contractors and service businesses. Three services that work together.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={"Three services.\n*One* *goal:* *more* *work.*"}
        lede="Design gets you trusted. SEO gets you found. Ongoing care keeps you ahead. Start with one, add the others when you're ready."
      />
      <section className="container-x pb-24" aria-label="Service list">
        <ol className="space-y-4">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 80}>
              <Link
                href={`/services/${s.slug}`}
                className={`group grid gap-8 rounded-[28px] border p-8 transition-colors md:grid-cols-12 md:p-12 ${i === 0 ? "on-dark border-transparent bg-ink text-paper" : "border-ink/10 bg-paper-2 hover:bg-paper-3/60"}`}
              >
                <span
                  aria-hidden="true"
                  data-num={s.number}
                  className={`text-[5rem] font-semibold leading-none tracking-[-0.06em] before:content-[attr(data-num)] md:col-span-2 ${i === 0 ? "text-volt" : "text-ink/15"}`}
                />
                <div className="md:col-span-6">
                  <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-[1] tracking-[-0.045em]">{s.name}</h2>
                  <p className={`mt-4 max-w-lg leading-relaxed ${i === 0 ? "text-paper/65" : "text-stone"}`}>{s.intro}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.groups.flatMap((g) => g.items).slice(0, 6).map((it) => (
                      <li key={it} className={`rounded-full border px-3 py-1 text-xs ${i === 0 ? "border-paper/15 text-paper/70" : "border-ink/10 text-ink/60"}`}>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col justify-between gap-6 md:col-span-4 md:items-end md:text-right">
                  <p className="text-3xl font-semibold tracking-[-0.04em]">{s.price}</p>
                  <span className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium ${i === 0 ? "bg-volt text-ink" : "bg-ink text-paper"}`}>
                    Explore {s.name.split(" ")[0].toLowerCase() === "seo" ? "SEO" : "service"}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>
      <Guarantee />
      <FinalCta />
    </>
  );
}
