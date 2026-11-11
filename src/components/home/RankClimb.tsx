"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import clsx from "clsx";
import { Search, Star, TrendingUp } from "lucide-react";
import { Eyebrow } from "../ui";

const QUERY = "landscaping company guelph";

const stages = [
  { rank: 24, k: "Where most start", t: "Buried on page 3", b: "Most local businesses we meet are on page 2 or 3 for their main search, where hardly anyone looks." },
  { rank: 15, k: "Step 01", t: "Audit & rebuild", b: "A fast, mobile-first site with clean technical SEO: titles, structure, schema, speed." },
  { rank: 7, k: "Step 02", t: "Service & area pages", b: "A page for every service people actually search for, written for your town." },
  { rank: 3, k: "Step 03", t: "Google profile & reviews", b: "An optimised Business Profile and a steady stream of reviews build local trust." },
  { rank: 1, k: "Step 04", t: "Monitor & improve", b: "We track positions and enquiries, then keep refining what's working." },
];

const competitors = [
  { n: "GreenScape Pros", u: "greenscapepros.ca", r: "4.6" },
  { n: "Royal City Lawn & Garden", u: "royalcitylawn.ca", r: "4.7" },
  { n: "10 Best Landscapers in Guelph", u: "example-directory.ca", r: null },
  { n: "Speed River Landscaping", u: "speedriverland.ca", r: "4.5" },
  { n: "Eramosa Outdoor Co.", u: "eramosaoutdoor.ca", r: "4.8" },
  { n: "TrueEdge Yard Services", u: "trueedgeyards.ca", r: "4.4" },
  { n: "Maple Leaf Property Care", u: "mapleleafcare.ca", r: "4.3" },
];

const SLOTS = 7; // results shown on "page 1"

export function RankClimb() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(reduce ? stages.length - 1 : 0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    setStage(Math.min(stages.length - 1, Math.max(0, Math.floor(v * stages.length * 0.999 + 0.0001))));
  });
  const bar = useTransform(scrollYProgress, [0, 1], ["4%", "100%"]);
  const rank = stages[stage].rank;

  // Rolling rank counter
  const mv = useMotionValue(stages[0].rank);
  const [shown, setShown] = useState(reduce ? 1 : stages[0].rank);
  useEffect(() => {
    if (reduce) return;
    const c = animate(mv, rank, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [rank, mv, reduce]);
  useMotionValueEvent(mv, "change", (v) => setShown(Math.round(v)));

  const youIndex = rank <= SLOTS ? rank - 1 : SLOTS + 1; // SLOTS index = divider row
  const page = rank <= 10 ? 1 : rank <= 20 ? 2 : 3;

  return (
    <section ref={ref} className="on-dark relative bg-ink text-paper" style={{ height: reduce ? "auto" : `${stages.length * 85 + 100}vh` }} aria-labelledby="climb-title">
      <div className={clsx("flex flex-col justify-center overflow-hidden py-12 md:py-20", !reduce && "sticky top-0 h-[100svh]")}>
        <div className="container-x grid items-center gap-5 lg:grid-cols-12 lg:gap-12">
          {/* Narrative */}
          <div className="lg:col-span-5">
            <Eyebrow dark>How we get you found</Eyebrow>
            <h2 id="climb-title" className="mt-5 text-[clamp(1.7rem,4.6vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
              From page 3 to the <span className="serif text-volt">top of Google.</span>
            </h2>

            <div className="mt-4 flex items-end gap-5 lg:mt-10">
              <div aria-live="polite">
                <p className="label text-paper/60">Your position</p>
                <p className="text-[clamp(2.4rem,8vw,7rem)] font-semibold leading-none tracking-[-0.06em] tabular-nums">
                  <span className="serif text-volt">#</span>
                  {shown}
                </p>
              </div>
              <div className="mb-3 flex-1">
                <p className="label text-paper/60">Visibility</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-paper/10">
                  <motion.div className="h-full rounded-full bg-volt" style={{ width: reduce ? "100%" : bar }} />
                </div>
                <p className="mt-2 text-xs text-paper/60">Page {page} of Google</p>
              </div>
            </div>

            <ol className="mt-4 space-y-1 lg:mt-10">
              {stages.map((s, i) => (
                <li
                  key={s.t}
                  aria-current={i === stage ? "step" : undefined}
                  className={clsx("rounded-xl border px-4 transition-all duration-500", i === stage ? "border-paper/15 bg-paper/[0.06] py-3" : "hidden border-transparent py-1.5 lg:block")}
                >
                  <div className="flex items-baseline gap-3">
                    <span className={clsx("label shrink-0", i === stage ? "text-volt" : "text-paper/55")}>{s.k}</span>
                    <span className={clsx("font-semibold tracking-[-0.02em]", i === stage ? "text-paper" : "text-paper/60")}>{s.t}</span>
                  </div>
                  <p className={clsx("overflow-hidden text-sm leading-relaxed text-paper/70 transition-all duration-500", i === stage ? "mt-1 max-h-24 opacity-100" : "max-h-0 opacity-0")}>{s.b}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* SERP */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-[22px] border border-paper/10 bg-paper text-ink shadow-[0_50px_100px_-30px_rgba(0,0,0,.6)]">
              <div className="flex items-center gap-3 border-b border-ink/10 p-3 sm:p-4">
                <div className="flex flex-1 items-center gap-2 rounded-full border border-ink/10 px-4 py-2.5 text-sm">
                  <Search className="h-4 w-4 text-ink/60" aria-hidden="true" />
                  <span className="font-medium">{QUERY}</span>
                </div>
              </div>
              <div className="relative p-3 [--row:2.2rem] sm:[--row:3.1rem] lg:[--row:3.6rem]" style={{ height: `calc(${SLOTS + 2} * var(--row) + 1.5rem)` }}>
                {competitors.map((c, i) => {
                  const idx = i + (rank <= SLOTS && i >= rank - 1 ? 1 : 0);
                  const off = idx >= SLOTS;
                  return (
                    <motion.div
                      key={c.n}
                      className="absolute inset-x-3 top-3"
                      style={{ height: "var(--row)" }}
                      initial={false}
                      animate={{ y: `${idx * 100}%`, opacity: off ? 0 : 1 }}
                      transition={{ type: "spring", stiffness: 140, damping: 22 }}
                    >
                      <Row pos={idx + 1} name={c.n} url={c.u} rating={c.r} />
                    </motion.div>
                  );
                })}
                {/* divider row */}
                <div className="absolute inset-x-3 top-3 flex items-center gap-3 px-3" style={{ height: "var(--row)", transform: `translateY(${SLOTS * 100}%)` }} aria-hidden="true">
                  <span className="h-px flex-1 bg-ink/15" />
                  <span className="label text-stone">Page 2 · Page 3 · fewer clicks</span>
                  <span className="h-px flex-1 bg-ink/15" />
                </div>
                {/* You */}
                <motion.div
                  className="absolute inset-x-3 top-3 z-10"
                  style={{ height: "var(--row)" }}
                  initial={false}
                  animate={{ y: `${youIndex * 100}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                >
                  <div className="flex h-full items-center gap-3 rounded-xl bg-volt px-3 text-ink shadow-[0_12px_30px_-10px_var(--p-accent)]">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-xs font-semibold text-paper tabular-nums">{rank}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">Your business · Landscaping in Guelph</p>
                      <p className="truncate text-xs opacity-90">yourbusiness.ca › landscaping-guelph</p>
                    </div>
                    {rank <= 3 ? (
                      <span className="hidden items-center gap-1 rounded-full bg-ink/10 px-2.5 py-1 text-xs font-medium md:inline-flex">
                        <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" /> Top {rank === 1 ? "spot" : "3"}
                      </span>
                    ) : null}
                  </div>
                </motion.div>
              </div>
            </div>
            <p className="label mt-4 hidden text-paper/60 sm:block">Illustrative example · fictional businesses · rankings depend on competition, location &amp; time, and are never guaranteed</p>
          </div>
        </div>
        <div className="container-x mt-6 sm:hidden">
          <p className="label text-paper/60">Illustrative example · rankings are never guaranteed</p>
        </div>
      </div>
    </section>
  );
}

function Row({ pos, name, url, rating }: { pos: number; name: string; url: string; rating: string | null }) {
  return (
    <div className="flex h-full items-center gap-3 border-b border-ink/[0.06] px-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink/5 text-xs text-stone tabular-nums">{pos}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-[#1a0dab]">{name}</p>
        <p className="truncate text-xs text-stone">{url}</p>
      </div>
      {rating ? (
        <span className="hidden items-center gap-1 text-xs text-stone md:inline-flex">
          {rating} <Star className="h-3 w-3 fill-[#fbbc04] text-[#fbbc04]" aria-hidden="true" />
        </span>
      ) : null}
    </div>
  );
}
