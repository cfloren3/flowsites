"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import clsx from "clsx";
import { Check, X } from "lucide-react";

const BEFORE = "/work/yardex-guelph/before.webp";
const AFTER = "/work/yardex-guelph/desktop.webp";

const steps = [
  {
    k: "01",
    t: "Before",
    b: "A one-word headline, no price, no proof and no service pages. Nothing told a Guelph homeowner why to choose Yardex.",
    tags: ["No clear offer", "No reviews up front", "No service pages"],
    good: false,
  },
  {
    k: "02",
    t: "The rebuild",
    b: "Positioning, price anchor and proof above the fold, real lawn photography, and a page for every service people search for.",
    tags: ["Clear offer", "From $27.50 price anchor", "Real photos"],
    good: true,
  },
  {
    k: "03",
    t: "Found & chosen",
    b: "Search-ready structure and local SEO put Yardex near the top for “lawn care Guelph”, and the site turns those visits into quote requests.",
    tags: ["#2 for lawn care Guelph*", "9 service pages", "Quote in under a minute"],
    good: true,
  },
];

export function TransformStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const clip = useTransform(scrollYProgress, [0.2, 0.58], [100, 0]);
  const clipPath = useTransform(clip, (v) => `inset(0 0 0 ${v}%)`);
  const lineX = useTransform(clip, (v) => `${v}%`);
  const tilt = useTransform(scrollYProgress, [0, 0.2], [6, 0]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setStep(v < 0.32 ? 0 : v < 0.66 ? 1 : 2));

  if (reduce) {
    return (
      <section className="bg-paper py-24" aria-labelledby="transform-title">
        <div className="container-x">
          <Header />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Shot src={BEFORE} label="Before · Yardex's original website" alt="Yardex's original website: a single 'YARDEX' heading over a lawn mowing photo, with Home, About, Book Now, Contact Us and Blog navigation" />
            <Shot src={AFTER} label="After · yardexguelph.ca today" alt="Yardex Guelph's current homepage" />
          </div>
          <Footnote />
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative bg-paper" style={{ height: "320vh" }} aria-labelledby="transform-title">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden py-20">
        <div className="container-x">
          <Header />
          <div className="mt-8 grid items-center gap-8 lg:mt-12 lg:grid-cols-12">
            <ol className="order-2 grid grid-cols-3 gap-3 lg:order-1 lg:col-span-4 lg:grid-cols-1 lg:gap-6">
              {steps.map((s, i) => (
                <li key={s.k} aria-current={i === step ? "step" : undefined} className={clsx("border-t pt-3 transition-colors duration-500 lg:pt-5", i === step ? "border-ink text-ink" : "border-ink/15 text-ink/60")}>
                  <p className="label text-stone">{s.k}</p>
                  <p className="mt-1 text-lg font-semibold tracking-[-0.03em] sm:text-2xl lg:text-3xl">{s.t}</p>
                  <p className={clsx("mt-2 hidden max-w-sm leading-relaxed lg:block", i === step ? "text-stone" : "text-ink/60")}>{s.b}</p>
                </li>
              ))}
            </ol>
            <div className="order-1 lg:order-2 lg:col-span-8" style={{ perspective: 1400 }}>
              <motion.div style={{ rotateX: tilt }} className="relative">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-ink/10 bg-ink shadow-[0_40px_80px_-30px_rgba(11,27,51,.45)]">
                  <Image src={BEFORE} alt="Yardex's original website: a single 'YARDEX' heading over a lawn mowing photo, with Home, About, Book Now, Contact Us and Blog navigation" fill sizes="(min-width:1024px) 60vw, 92vw" className="object-cover object-top" />
                  <span className="label absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 !text-[0.64rem] text-paper backdrop-blur">Before</span>
                  <motion.div className="absolute inset-0" style={{ clipPath }}>
                    <Image src={AFTER} alt="Yardex Guelph's current homepage" fill sizes="(min-width:1024px) 60vw, 92vw" className="object-cover object-top" />
                    <span className="label absolute right-3 top-3 rounded-full bg-volt px-2.5 py-1 !text-[0.64rem] text-ink">After · today</span>
                  </motion.div>
                  <motion.div aria-hidden="true" className="absolute inset-y-0 w-[3px] bg-volt shadow-[0_0_24px_var(--p-accent)]" style={{ left: lineX }} />
                </div>
                <ul className="absolute -bottom-5 left-4 right-4 flex flex-wrap justify-center gap-2" aria-label={`${steps[step].t} highlights`}>
                  {steps[step].tags.map((c) => (
                    <motion.li
                      key={`${step}-${c}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs text-paper shadow-lg"
                    >
                      {steps[step].good ? <Check className="h-3 w-3 text-volt" aria-hidden="true" /> : <X className="h-3 w-3 text-volt" aria-hidden="true" />}
                      {c}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <Footnote />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <h2 id="transform-title" className="h-section max-w-[15ch] !text-[clamp(2.1rem,4.6vw,4.4rem)]">
        Same lawn company. <span className="serif text-volt-ink">Completely different</span> first impression.
      </h2>
      <p className="max-w-sm text-stone">Keep scrolling: Yardex Guelph&apos;s original website, rebuilt into the one that ranks today.</p>
    </div>
  );
}

function Footnote() {
  return (
    <p className="label mt-10 text-center text-stone">
      Real Yardex websites · *ranking owner-reported, varies by location &amp; device
    </p>
  );
}

function Shot({ src, label, alt }: { src: string; label: string; alt: string }) {
  return (
    <figure>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-ink/10">
        <Image src={src} alt={alt} fill sizes="(min-width:768px) 45vw, 92vw" className="object-cover object-top" />
      </div>
      <figcaption className="label mt-3 text-stone">{label}</figcaption>
    </figure>
  );
}
