import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { evidenceMeta, type EvidenceStatus } from "@/content/evidence";
import { WorkGrid } from "@/components/WorkGrid";
import { EvidenceBadge, Eyebrow, PageHero, Reveal } from "@/components/ui";
import { FinalCta } from "@/components/sections";

export const metadata: Metadata = {
  title: "Our Work: Websites, SEO & Digital Products",
  description:
    "Real websites and digital products by Flowsites: Yardex Guelph, Carter Florence, Ontario DECA and TraitCRM. Captured live, with honest, evidence-labelled results.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title={"Proof, not *promises.*"}
        lede="Trades websites, personal brands, organisational sites and software. Every project is captured from the live site and labelled with exactly what we did."
      />
      <section className="container-x pb-24 md:pb-32" aria-label="Projects">
        <WorkGrid projects={projects} />
      </section>

      <section id="evidence" className="bg-paper-2 py-20 md:py-28" aria-labelledby="evidence-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>How we report results</Eyebrow>
            <h2 id="evidence-title" className="h-section mt-6 !text-[clamp(2.2rem,4.4vw,4rem)]">
              Every number carries its evidence.
            </h2>
            <p className="mt-6 max-w-md text-stone leading-relaxed">
              Agencies love round numbers. We&apos;d rather you trust ours. Every metric on this site is tagged with where it came from and when it was checked. Rankings are only published with the keyword, engine, location, device, result type, date and method.
            </p>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:col-span-7">
            {(Object.keys(evidenceMeta) as EvidenceStatus[]).map((k, i) => (
              <Reveal as="li" key={k} delay={i * 70} className="bg-paper p-7">
                <EvidenceBadge evidence={{ status: k }} />
                <p className="mt-5 text-xl font-semibold tracking-[-0.03em]">{evidenceMeta[k].label}</p>
                <p className="mt-2 text-stone leading-relaxed">{evidenceMeta[k].description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta title={"Your business could be\n*our* *next* *case* *study.*"} />
    </>
  );
}
