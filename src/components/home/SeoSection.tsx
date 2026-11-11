"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import clsx from "clsx";
import { MapPin, MousePointer2, Search, Star, CheckCircle2, RotateCcw } from "lucide-react";
import { Eyebrow, Reveal, SplitText, TextLink } from "../ui";

const QUERY = "landscaping company guelph";
const ease = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    t: "Technical SEO",
    items: ["Server-rendered, static HTML", "Clean semantic markup", "XML sitemap & robots.txt", "Canonical URLs", "Structured data", "Optimised images", "Fast, mobile-first", "Indexation monitoring"],
  },
  {
    t: "Local SEO",
    items: ["Geographic keyword research", "A page per core service", "Genuine service-area pages only", "Google Business Profile optimisation", "Consistent business info", "Review strategy", "Competitor analysis"],
  },
  {
    t: "Content",
    items: ["Written for search intent", "Clear service descriptions", "Helpful FAQs", "Project showcases", "Real customer questions", "Local relevance"],
  },
  {
    t: "Continuous",
    items: ["Ranking monitoring", "Search Console analysis", "Technical checks", "Competitor tracking", "Content improvements", "Conversion analysis"],
  },
];

export function SeoSection() {
  return (
    <section className="relative bg-paper-2 py-24 md:py-36" aria-labelledby="seo-title">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>SEO is part of the foundation</Eyebrow>
            </Reveal>
            <SplitText id="seo-title" text={"Looking good is only *half* *the* *job.*"} className="h-section mt-6" />
            <Reveal delay={150}>
              <p className="lede mt-8 text-stone">
                A beautiful website means little if your customers can&apos;t find it. We plan for search from the first wireframe, then measure what happens after launch.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-8 rounded-2xl border border-ink/10 bg-paper p-5 text-sm leading-relaxed text-ink/70">
                <strong className="text-ink">No ranking guarantees.</strong> Positions vary by location, device, competition, search intent and time. We promise sound work and honest reporting, not a number.
              </div>
            </Reveal>
            <Reveal delay={280} className="mt-8">
              <TextLink href="/services/local-seo">How our SEO works</TextLink>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <SerpDemo />
          </div>
        </div>

        <div className="mt-24 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.t} delay={i * 80} className="bg-paper-2 p-7">
              <p className="label text-stone">0{i + 1}</p>
              <h3 className="h-card mt-4 text-2xl">{p.t}</h3>
              <ul className="mt-5 space-y-2 text-[0.95rem] text-ink/70">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-2.5">
                    <span className="mt-[0.6em] h-[2px] w-2.5 shrink-0 bg-ink" aria-hidden="true" />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SerpDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(reduce ? 5 : 0);
  const [typed, setTyped] = useState(reduce ? QUERY.length : 0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce) {
      setPhase(5);
      setTyped(QUERY.length);
      return;
    }
    if (!inView) return;
    setPhase(0);
    setTyped(0);
    const timers: number[] = [];
    for (let i = 1; i <= QUERY.length; i++) timers.push(window.setTimeout(() => setTyped(i), 300 + i * 55));
    const t0 = 300 + QUERY.length * 55;
    timers.push(window.setTimeout(() => setPhase(1), t0 + 300));
    timers.push(window.setTimeout(() => setPhase(2), t0 + 1700));
    timers.push(window.setTimeout(() => setPhase(3), t0 + 2700));
    timers.push(window.setTimeout(() => setPhase(4), t0 + 4300));
    timers.push(window.setTimeout(() => setPhase(5), t0 + 5600));
    return () => timers.forEach(clearTimeout);
  }, [inView, run, reduce]);

  const funnel = [
    { k: "Found", on: phase >= 1 },
    { k: "Clicked", on: phase >= 3 },
    { k: "Quote request", on: phase >= 5 },
  ];

  return (
    <div ref={ref} className="relative">
      <div className="relative overflow-hidden rounded-[22px] border border-ink/10 bg-white shadow-[0_50px_100px_-40px_rgba(13,14,12,.35)]">
        {/* search bar */}
        <div className="flex items-center gap-3 border-b border-ink/[0.07] p-4">
          <span className="text-lg font-semibold tracking-[-0.04em] text-ink/80" aria-hidden="true">
            Search
          </span>
          <div className="flex flex-1 items-center gap-2 rounded-full border border-ink/10 px-4 py-2.5 text-sm">
            <Search className="h-4 w-4 text-ink/60" aria-hidden="true" />
            <span className="font-medium text-ink">{QUERY.slice(0, typed)}</span>
            {typed < QUERY.length ? <span className="caret -ml-1 h-4 w-[1.5px] bg-ink" aria-hidden="true" /> : null}
          </div>
        </div>

        <div className="relative min-h-[420px] p-4 sm:p-5">
          {phase < 1 ? (
            <div className="space-y-4" aria-hidden="true">
              <div className="h-24 rounded-xl bg-ink/[0.04]" />
              {[0, 1, 2].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-2.5 w-1/3 rounded bg-ink/[0.05]" />
                  <div className="h-3.5 w-2/3 rounded bg-ink/[0.07]" />
                  <div className="h-2.5 w-5/6 rounded bg-ink/[0.04]" />
                </div>
              ))}
            </div>
          ) : null}
          <AnimatePresence>
            {phase >= 1 ? (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }}>
                {/* map pack */}
                <div className="overflow-hidden rounded-xl border border-ink/10">
                  <div className="relative h-24 bg-[#e9efe4]">
                    <svg className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 400 100">
                      <path d="M0 70 C80 60 120 90 200 70 S330 40 400 55" stroke="#fff" strokeWidth="6" fill="none" />
                      <path d="M120 0 L150 100 M280 0 L250 100" stroke="#fff" strokeWidth="4" />
                      <path d="M0 30 H400" stroke="#d7e3cf" strokeWidth="10" />
                    </svg>
                    {[
                      [22, 40],
                      [52, 62],
                      [75, 30],
                    ].map(([l, t], i) => (
                      <MapPin
                        key={i}
                        className={clsx("absolute h-6 w-6 -translate-x-1/2 -translate-y-full transition-colors", i === 0 && phase >= 2 ? "text-ink fill-volt" : "text-[#c5221f] fill-[#ea4335]")}
                        style={{ left: `${l}%`, top: `${t + 20}%` }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  {[
                    { n: "Northfield Landscapes", r: "4.9", c: "Landscaper · Guelph" },
                    { n: "Greenline Outdoor Co.", r: "4.7", c: "Landscaper · Guelph" },
                    { n: "Speed River Lawn & Garden", r: "4.6", c: "Lawn care · Guelph" },
                  ].map((b, i) => (
                    <motion.div
                      key={b.n}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease }}
                      className={clsx(
                        "flex items-center justify-between border-t border-ink/[0.07] px-4 py-3 transition-colors duration-500",
                        i === 0 && phase >= 2 && "bg-volt/30",
                      )}
                    >
                      <div>
                        <p className="text-sm font-medium text-[#1a0dab]">{b.n}</p>
                        <p className="flex items-center gap-1 text-xs text-ink/55">
                          {b.r} <Star className="h-3 w-3 fill-[#fbbc04] text-[#fbbc04]" aria-hidden="true" /> · {b.c}
                        </p>
                      </div>
                      <span className="rounded-full border border-ink/10 px-2.5 py-1 text-xs text-ink/60">Website</span>
                    </motion.div>
                  ))}
                </div>
                {/* organic */}
                <div className="mt-4 space-y-4 px-1">
                  {[
                    { u: "northfieldlandscapes.ca › landscaping-guelph", t: "Landscaping Company in Guelph | Patios, Gardens & Sod", d: "Design-build landscaping across Guelph. See recent projects, read reviews and request a quote in under a minute." },
                    { u: "example-directory.ca › guelph › landscapers", t: "10 Best Landscapers in Guelph, ON (2026)", d: "Compare local landscaping companies, ratings and reviews…" },
                  ].map((o, i) => (
                    <motion.div key={o.t} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.1 }}>
                      <p className="text-xs text-ink/50">{o.u}</p>
                      <p className={clsx("text-[0.98rem] text-[#1a0dab]", i === 0 && phase >= 2 && "underline")}>{o.t}</p>
                      <p className="text-xs leading-relaxed text-ink/60">{o.d}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* cursor */}
          {!reduce && phase >= 1 && phase < 4 ? (
            <motion.div
              aria-hidden="true"
              className="absolute z-20"
              initial={{ left: "80%", top: "90%" }}
              animate={phase >= 2 ? { left: "30%", top: "38%", scale: phase >= 3 ? [1, 0.8, 1] : 1 } : { left: "80%", top: "90%" }}
              transition={{ duration: 1, ease }}
            >
              <MousePointer2 className="h-6 w-6 fill-ink text-white drop-shadow" />
            </motion.div>
          ) : null}

          {/* website visit */}
          <AnimatePresence>
            {phase >= 3 ? (
              <motion.div
                initial={reduce ? { opacity: 0 } : { y: "100%" }}
                animate={reduce ? { opacity: 1 } : { y: "0%" }}
                transition={{ duration: 0.9, ease }}
                className="absolute inset-0 z-10 flex flex-col bg-[#14201a] p-5 text-[#f3f1ea] sm:p-7"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold">Northfield Landscapes</span>
                  <span className="rounded-full bg-[#c9f26b] px-3 py-1 font-medium text-ink">Call</span>
                </div>
                <p className="mt-6 max-w-[16ch] text-[clamp(1.4rem,3vw,2.2rem)] font-semibold leading-[0.95] tracking-[-0.045em]">Landscaping that makes the street look twice.</p>
                <div className="mt-auto rounded-2xl bg-[#f3f1ea] p-4 text-ink">
                  <p className="text-sm font-semibold">Get a free quote</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <Field label="Name" value="Jordan" show={phase >= 4} />
                    <Field label="Service" value="New patio" show={phase >= 4} delay={0.15} />
                    <Field label="Address" value="Kortright Rd W" show={phase >= 4} delay={0.3} wide />
                  </div>
                  <div className="mt-3 rounded-full bg-ink py-2 text-center text-xs font-medium text-paper">Request quote</div>
                </div>
                <AnimatePresence>
                  {phase >= 5 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.6, ease }}
                      className="absolute inset-x-5 top-1/3 mx-auto flex max-w-xs items-center gap-3 rounded-2xl bg-white p-4 text-ink shadow-2xl"
                    >
                      <CheckCircle2 className="h-8 w-8 shrink-0 fill-volt text-ink" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold">New quote request</p>
                        <p className="text-xs text-ink/60">Sent to the owner&apos;s phone · just now</p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* funnel + controls */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <ol className="flex items-center gap-2" aria-label="Search to customer funnel">
          {funnel.map((f, i) => (
            <li key={f.k} className="flex items-center gap-2">
              <span className={clsx("rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-500", f.on ? "bg-ink text-paper" : "bg-ink/5 text-ink/60")}>
                {i + 1}. {f.k}
              </span>
              {i < funnel.length - 1 ? <span className="h-px w-4 bg-ink/20" aria-hidden="true" /> : null}
            </li>
          ))}
        </ol>
        {!reduce ? (
          <button type="button" onClick={() => setRun((r) => r + 1)} className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-ink/15 px-3.5 py-2 text-xs hover:border-ink/40">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Replay
          </button>
        ) : null}
      </div>
      <p className="label mt-4 text-stone">Illustrative example · not a live Google result · fictional businesses</p>
    </div>
  );
}

function Field({ label, value, show, delay = 0, wide }: { label: string; value: string; show: boolean; delay?: number; wide?: boolean }) {
  return (
    <div className={clsx("rounded-lg border border-ink/10 bg-white px-2.5 py-1.5", wide && "col-span-2")}>
      <p className="text-[10px] text-ink/60">{label}</p>
      <motion.p initial={false} animate={{ opacity: show ? 1 : 0 }} transition={{ delay, duration: 0.3 }} className="h-4 text-xs">
        {value}
      </motion.p>
    </div>
  );
}
