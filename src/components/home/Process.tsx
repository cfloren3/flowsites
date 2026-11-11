"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Eyebrow } from "../ui";

export const processSteps = [
  { n: "01", t: "We learn your business", b: "Your services, ideal customers, service area, competitors, current website and goals. A short call or form, no homework.", tags: ["Services", "Service area", "Competitors", "Goals"] },
  { n: "02", t: "We design your website", b: "A custom design that reflects your business and makes the value obvious, planned for speed, search and conversion from the start.", tags: ["Custom design", "SEO structure", "Conversion paths"] },
  { n: "03", t: "You see it before you pay", b: "We send a private, interactive preview. Click through it on your phone. If you don't like the design, you don't pay.", tags: ["Private link", "No deposit", "No obligation"] },
  { n: "04", t: "We launch & optimise", b: "Once approved and quoted, we build the full site, connect your domain, forms, analytics and Search Console, and launch.", tags: ["Domain", "Forms", "Analytics", "Search Console"] },
  { n: "05", t: "We monitor & improve", b: "With an optional growth plan, we track visibility and enquiries, report clearly and keep improving what's working.", tags: ["Rankings", "Reporting", "Improvements"] },
];

export function Process() {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  if (!wide || reduce) return <ProcessVertical />;
  return <ProcessHorizontal />;
}

function Intro() {
  return (
    <div className="max-w-xl">
      <Eyebrow>How it works</Eyebrow>
      <h2 id="process-title" className="h-section mt-6">
        Five steps.
        <br />
        <span className="text-stone">Zero guesswork.</span>
      </h2>
      <p className="mt-6 max-w-md text-stone leading-relaxed">Clear at every stage, with no commitment until you&apos;ve seen and approved your design.</p>
    </div>
  );
}

function StepCard({ s, i }: { s: (typeof processSteps)[number]; i: number }) {
  const featured = i === 2;
  return (
    <article
      className={`flex h-full flex-col rounded-[24px] border p-7 md:p-9 ${featured ? "on-dark border-transparent bg-ink text-paper" : "border-ink/10 bg-paper"}`}
    >
      <div className="flex items-center justify-between">
        <span className={`text-[4.5rem] font-semibold leading-none tracking-[-0.06em] ${featured ? "text-volt" : "text-ink/15"}`}>{s.n}</span>
        {featured ? <span className="label rounded-full bg-volt px-2.5 py-1 !text-[0.64rem] text-ink">The guarantee</span> : null}
      </div>
      <h3 className="h-card mt-auto pt-12 text-[1.9rem]">{s.t}</h3>
      <p className={`mt-4 leading-relaxed ${featured ? "text-paper/70" : "text-stone"}`}>{s.b}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {s.tags.map((t) => (
          <li key={t} className={`rounded-full border px-3 py-1 text-xs ${featured ? "border-paper/15 text-paper/70" : "border-ink/10 text-ink/60"}`}>
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}

function ProcessHorizontal() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const calc = () => {
      if (trackRef.current) setDist(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 64));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);
  return (
    <section ref={ref} className="relative bg-paper-2" style={{ height: `calc(100vh + ${dist}px)` }} aria-labelledby="process-title">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-x">
          <Intro />
        </div>
        <motion.ol ref={trackRef} style={{ x }} className="mt-14 flex w-max gap-5 pl-[var(--gutter)] pr-[var(--gutter)]">
          {processSteps.map((s, i) => (
            <li key={s.n} className="h-[400px] w-[min(400px,32vw)] shrink-0">
              <StepCard s={s} i={i} />
            </li>
          ))}
        </motion.ol>
        <div className="container-x mt-10">
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-ink/10" aria-hidden="true">
            <motion.div className="h-full bg-ink" style={{ width: bar }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessVertical() {
  return (
    <section className="bg-paper-2 py-24" aria-labelledby="process-title">
      <div className="container-x">
        <Intro />
        <ol className="mt-12 grid gap-4 md:grid-cols-2">
          {processSteps.map((s, i) => (
            <li key={s.n} data-reveal="" style={{ ["--d" as string]: `${i * 60}ms` }} className={i === 2 ? "md:col-span-2" : ""}>
              <StepCard s={s} i={i} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
