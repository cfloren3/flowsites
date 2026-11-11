"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import clsx from "clsx";
import { Phone, Star, Check } from "lucide-react";

const steps = [
  { k: "01", t: "Invisible", b: "An outdated site with no service pages, no mobile layout and no proof. Searchers bounce back to Google within seconds." },
  { k: "02", t: "Credible", b: "Modern design, real photos, reviews and a clear offer. Visitors understand who you are and why to trust you, instantly." },
  { k: "03", t: "Chosen", b: "Search-ready structure, one-tap calling and a quote form that takes under a minute. Interest turns into enquiries." },
];

export function TransformStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const clip = useTransform(scrollYProgress, [0.18, 0.55], [100, 0]);
  const clipPath = useTransform(clip, (v) => `inset(0 0 0 ${v}%)`);
  const lineX = useTransform(clip, (v) => `${v}%`);
  const chips = useTransform(scrollYProgress, [0.66, 0.8], [0, 1]);
  const chipsY = useTransform(chips, (v) => (1 - v) * 20);
  useMotionValueEvent(scrollYProgress, "change", (v) => setStep(v < 0.33 ? 0 : v < 0.64 ? 1 : 2));

  if (reduce) {
    return (
      <section className="bg-paper py-24" aria-labelledby="transform-title">
        <div className="container-x">
          <Header />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-ink/10"><BeforeSite /></div>
            <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-ink/10"><AfterSite /></div>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.k}><p className="label text-stone">{s.k}</p><p className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{s.t}</p><p className="mt-2 text-stone">{s.b}</p></li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative bg-paper" style={{ height: "300vh" }} aria-labelledby="transform-title">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden py-20">
        <div className="container-x">
          <Header />
          <div className="mt-8 grid items-center gap-8 lg:mt-12 lg:grid-cols-12">
            <ol className="order-2 grid grid-cols-3 gap-3 lg:order-1 lg:col-span-4 lg:grid-cols-1 lg:gap-6">
              {steps.map((s, i) => (
                <li key={s.k} aria-current={i === step ? "step" : undefined} className={clsx("border-t pt-3 transition-colors duration-500 lg:pt-5", i === step ? "border-ink text-ink" : "border-ink/15 text-ink/60")}>
                  <p className="label text-stone">{s.k}</p>
                  <p className="mt-1 text-lg font-semibold tracking-[-0.03em] sm:text-2xl lg:text-3xl">{s.t}</p>
                  <p className={clsx("mt-2 hidden max-w-sm leading-relaxed transition-opacity duration-500 lg:block", i === step ? "text-stone" : "text-ink/60")}>{s.b}</p>
                </li>
              ))}
            </ol>
            <div className="order-1 lg:order-2 lg:col-span-8">
              <div className="relative">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-ink/10 shadow-[0_40px_80px_-30px_rgba(13,14,12,.35)]">
                  <BeforeSite />
                  <motion.div className="absolute inset-0" style={{ clipPath }}>
                    <AfterSite />
                  </motion.div>
                  <motion.div aria-hidden="true" className="absolute inset-y-0 w-[2px] bg-volt shadow-[0_0_20px_rgba(201,242,107,.9)]" style={{ left: lineX }} />
                </div>
                <motion.ul
                  style={{ opacity: chips, y: chipsY }}
                  className="absolute -bottom-5 left-4 right-4 flex flex-wrap justify-center gap-2"
                  aria-label="Features added"
                >
                  {["Service pages", "Click-to-call", "60-second quote form", "Structured data", "Reviews up front"].map((c) => (
                    <li key={c} className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs text-paper shadow-lg">
                      <Check className="h-3 w-3 text-volt" aria-hidden="true" />
                      {c}
                    </li>
                  ))}
                </motion.ul>
              </div>
              <p className="label mt-10 text-center text-stone">Illustrative concept · fictional businesses, not client work</p>
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
      <h2 id="transform-title" className="h-section max-w-[14ch] !text-[clamp(2.1rem,4.6vw,4.4rem)]">
        From overlooked to <span className="highlight">obvious choice.</span>
      </h2>
      <p className="max-w-sm text-stone">Keep scrolling. This is what a rebuild does to the first five seconds of a visit.</p>
    </div>
  );
}

/** Deliberately dated, fictional contractor site. */
function BeforeSite() {
  return (
    <div className="absolute inset-0 bg-[#e8e8e8] font-serif text-[#222]" aria-label="Illustration of an outdated contractor website" role="img">
      <div className="bg-gradient-to-b from-[#3a5fa8] to-[#1d3a78] px-[4%] py-[2.5%] text-center text-white">
        <p className="text-[clamp(.8rem,2.4vw,1.6rem)] font-bold italic [text-shadow:2px_2px_0_#000]">Smith &amp; Sons Roofing Ltd.</p>
        <p className="text-[clamp(.45rem,1vw,.7rem)]">~ Serving the area since 1998 ~</p>
      </div>
      <div className="flex gap-[1px] bg-[#999] text-[clamp(.4rem,1vw,.7rem)]">
        {["HOME", "ABOUT US", "SERVICES", "GALLERY", "LINKS", "CONTACT"].map((n) => (
          <span key={n} className="flex-1 bg-gradient-to-b from-[#f4f4f4] to-[#cfcfcf] py-1 text-center text-[#1d3a78] underline">{n}</span>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_2.2fr] gap-[3%] p-[3%]">
        <div className="space-y-2 bg-white p-[6%] text-[clamp(.4rem,.9vw,.65rem)] leading-tight">
          <p className="font-bold text-[#a00]">*** SPECIALS ***</p>
          <p>Call for pricing!!</p>
          <div className="aspect-square bg-[repeating-linear-gradient(45deg,#ccc,#ccc_6px,#ddd_6px,#ddd_12px)]" />
          <p className="text-[#555]">Visitor # 004213</p>
        </div>
        <div className="bg-white p-[4%] text-[clamp(.42rem,1vw,.75rem)] leading-snug">
          <p className="text-center text-[clamp(.6rem,1.6vw,1.1rem)] font-bold text-[#1d3a78]">Welcome to our Website!</p>
          <p className="mt-2">
            We are a family owned and operated roofing company. We do all types of roofing, repairs, shingles, flat roofs, eavestroughs and more. Quality workmanship at fair prices. No job too big or too small.
            Please call us for a free estimate. Thank you for visiting our website!
          </p>
          <div className="mt-2 grid grid-cols-3 gap-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[4/3] bg-[#bbb]" />
            ))}
          </div>
          <p className="mt-2 text-center text-[clamp(.4rem,.8vw,.6rem)] text-[#777]">Best viewed in Internet Explorer · Last updated 03/14/2011</p>
        </div>
      </div>
    </div>
  );
}

/** Modern, fictional concept for the same business type. */
function AfterSite() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#111312] text-[#f3f1ea]" aria-label="Illustration of a modern contractor website" role="img">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,#3b4a3a,transparent_55%)]" />
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(115deg,transparent_55%,#2b2f2c_55%,#2b2f2c_57%,transparent_57%,transparent_62%,#2b2f2c_62%,#2b2f2c_64%,transparent_64%)]" />
      <div className="relative flex items-center justify-between px-[4%] py-[2.5%] text-[clamp(.42rem,1vw,.75rem)]">
        <span className="font-semibold tracking-tight">Ridgeline Roofing</span>
        <span className="hidden gap-[1.2em] opacity-70 sm:flex">
          <span>Repairs</span>
          <span>Replacement</span>
          <span>Projects</span>
          <span>Reviews</span>
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#c9f26b] px-[.9em] py-[.4em] font-medium text-[#111]">
          <Phone className="h-[1em] w-[1em]" aria-hidden="true" /> Call now
        </span>
      </div>
      <div className="relative px-[4%] pt-[5%]">
        <p className="text-[clamp(.38rem,.8vw,.6rem)] uppercase tracking-[.12em] opacity-60">Roofing · Kitchener-Waterloo</p>
        <p className="mt-[1.5%] max-w-[70%] text-[clamp(1rem,3.6vw,2.8rem)] font-semibold leading-[.95] tracking-[-0.045em]">
          Roofs done right. <span className="opacity-50">Quoted in 24 hours.</span>
        </p>
        <div className="mt-[3%] flex flex-wrap items-center gap-[1.5%] text-[clamp(.42rem,.95vw,.72rem)]">
          <span className="rounded-full bg-[#f3f1ea] px-[1.2em] py-[.6em] font-medium text-[#111]">Get a free inspection →</span>
          <span className="inline-flex items-center gap-1 opacity-80">
            <span className="flex text-[#c9f26b]">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-[1em] w-[1em] fill-current" aria-hidden="true" />
              ))}
            </span>
            Reviews on Google
          </span>
        </div>
      </div>
      <div className="absolute bottom-[5%] left-[4%] right-[4%] grid grid-cols-3 gap-[1.5%]">
        {["Licensed & insured", "Workmanship warranty", "Local crew"].map((t) => (
          <div key={t} className="rounded-[.5em] border border-white/10 bg-white/5 p-[4%] text-[clamp(.38rem,.85vw,.65rem)] backdrop-blur">
            <span className="text-[#c9f26b]">✓</span> {t}
          </div>
        ))}
      </div>
    </div>
  );
}
