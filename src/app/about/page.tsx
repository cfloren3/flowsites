import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { getProject } from "@/content/projects";
import { BrowserFrame } from "@/components/Frames";
import { Eyebrow, PageHero, Reveal, SplitText } from "@/components/ui";
import { ContactBlock } from "@/components/ContactBlock";
import { FounderStory } from "@/components/home/FounderStory";
import { WhyFlowsites } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "About Flowsites: Founder-Led Web Design from Guelph",
  description:
    "Flowsites is a founder-led web design and SEO studio from Guelph, Ontario, started by Carter Florence, who founded and runs Yardex Guelph and built TraitCRM.",
  alternates: { canonical: "/about" },
};

const timeline = [
  { y: "Teens", t: "Started Yardex Guelph", b: "A lawn care company launched in his own neighbourhood. GuelphToday covered it in 2023.", src: "GuelphToday (2023), Jim Carroll (Apr 2023)" },
  { y: "Growth", t: "Taught himself SEO", b: "Built and optimised the Yardex website and Google Business Profile, growing to about 50 recurring properties.", src: "Founder-reported" },
  { y: "2026", t: "Built TraitCRM", b: "Designed and built a CRM for trade crews with AI-assisted development. Yardex runs on it daily.", src: "traitcrm.com, carterflorence.com" },
  { y: "Now", t: "Flowsites", b: "Bringing the same design, SEO and systems thinking to other Ontario trades and service businesses.", src: "" },
];

export default function AboutPage() {
  const cf = getProject("carter-florence")!;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          about: { "@id": `${site.url}/#business` },
          mainEntity: { "@type": "Person", name: site.founder.name, url: site.founder.url, worksFor: { "@id": `${site.url}/#business` } },
        }}
      />
      <PageHero
        eyebrow="About"
        title={"Built by someone who's\n*run* *the* *business.*"}
        lede="Flowsites is a founder-led studio from Guelph, Ontario. It exists because building a trades business taught us what a website actually has to do."
      />

      <section className="container-x pb-20 md:pb-28" aria-labelledby="founder-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>The founder</Eyebrow>
            <SplitText id="founder-title" text={"Hi, I'm Carter."} className="h-section mt-6" />
            <Reveal className="prose-flow mt-8 max-w-2xl">
              <p>
                I started a lawn care company in Guelph as a teenager, with a rake, a yard-waste bag and a lot of door-knocking. Yardex grew mostly through Google and word of mouth. I taught myself SEO, rebuilt the website more times than I&apos;d like to admit, and learned which details actually make the phone ring.
              </p>
              <p>
                Running a crew taught me the rest: quoting fast, keeping routes full, collecting reviews, and spending far too many late nights on admin. That last part is why I built <Link href="/case-studies/traitcrm">TraitCRM</Link>, the software Yardex runs on today.
              </p>
              <p>
                I also design personal-brand and product sites, and I study International Relations at Western University with Ivey AEO. Flowsites brings all of it together: modern design, real SEO and an owner&apos;s understanding of what happens after someone clicks &ldquo;Get a quote&rdquo;.
              </p>
              <p>
                <strong>I won&apos;t promise you #1 on Google, and I won&apos;t invent numbers.</strong> I will show you your design before you pay, explain every decision in plain language, and tell you honestly what&apos;s working.
              </p>
            </Reveal>
            <Reveal className="mt-8">
              <a href={site.founder.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 font-medium underline underline-offset-4">
                carterflorence.com <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-5" variant="scale">
            <div className="lg:sticky lg:top-32">
              <BrowserFrame src={cf.images.desktop} alt="carterflorence.com homepage" url={cf.displayUrl} sizes="(min-width:1024px) 38vw, 90vw" />
              <p className="label mt-4 text-stone">carterflorence.com · founder&apos;s personal site, designed and built in-house</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="on-dark bg-ink py-20 text-paper md:py-28" aria-labelledby="tl-title">
        <div className="container-x">
          <Eyebrow dark>The path here</Eyebrow>
          <h2 id="tl-title" className="h-section mt-6">From one lawn to Flowsites.</h2>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-paper/10 bg-paper/10 md:grid-cols-4">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.t} delay={i * 70} className="flex flex-col bg-ink p-6">
                <span className="label text-volt">{t.y}</span>
                <p className="mt-6 text-lg font-semibold leading-snug tracking-[-0.02em]">{t.t}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-paper/60">{t.b}</p>
                {t.src ? <p className="label mt-6 !text-[0.62rem] text-paper/45">Source: {t.src}</p> : null}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28" aria-labelledby="values-title">
        <div className="container-x">
          <Eyebrow>How we work</Eyebrow>
          <h2 id="values-title" className="h-section mt-6 max-w-[16ch]">Small studio. High standards.</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Honest by default", "No fake reviews, invented stats or ranking guarantees. If we can't verify it, we label it."],
              ["You see it first", "Every website starts with a free design preview. You decide with the real thing in front of you."],
              ["Owner-level thinking", "We think about your leads, your crew's time and your margins, not just your colours."],
              ["AI-assisted, human-led", "Modern tools speed up research and development. Judgement, design and strategy stay human."],
            ].map(([t, b], i) => (
              <Reveal key={t} delay={i * 70} className="bg-paper p-7">
                <span className="label text-stone">0{i + 1}</span>
                <p className="mt-8 text-xl font-semibold tracking-[-0.03em]">{t}</p>
                <p className="mt-3 text-stone leading-relaxed">{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <FounderStory />
      <WhyFlowsites />
      <ContactBlock title={"Let's talk about\n*your* *business.*"} interest="general" />
    </>
  );
}
