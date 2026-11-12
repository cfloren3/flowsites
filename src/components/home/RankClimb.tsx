"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import clsx from "clsx";
import { Search, Star, TrendingUp } from "lucide-react";
import type Lenis from "lenis";
import { Eyebrow } from "../ui";

const QUERY = "landscaping company guelph";

/**
 * Illustrative impact model (clearly labelled on the page):
 * 500 searches/month × typical click-through rate for the position × 5% of visitors requesting a quote.
 * CTRs approximate widely published organic click-through studies; real results vary.
 */
const SEARCHES = 500;
const CONVERSION = 0.05;
const stages = [
  { rank: 24, ctr: 0.002, k: "Where most start", t: "Buried on page 3", b: "Most local businesses we meet sit on page 2 or 3 for their main search, where almost nobody looks." },
  { rank: 9, ctr: 0.025, k: "Step 01", t: "Rebuild & service pages", b: "A fast, search-ready site with a page for every service people actually search for." },
  { rank: 3, ctr: 0.11, k: "Step 02", t: "Google profile & reviews", b: "An optimised Business Profile and a steady stream of reviews build local trust." },
  { rank: 1, ctr: 0.28, k: "Step 03", t: "Monitor & improve", b: "We track positions and enquiries, then keep refining what's working." },
].map((s) => ({ ...s, clicks: Math.round(SEARCHES * s.ctr), leads: Math.round(SEARCHES * s.ctr * CONVERSION * 10) / 10 }));

const competitors = [
  { n: "GreenScape Pros", u: "greenscapepros.ca", r: "4.6" },
  { n: "Royal City Lawn & Garden", u: "royalcitylawn.ca", r: "4.7" },
  { n: "10 Best Landscapers in Guelph", u: "example-directory.ca", r: null },
  { n: "Speed River Landscaping", u: "speedriverland.ca", r: "4.5" },
  { n: "Eramosa Outdoor Co.", u: "eramosaoutdoor.ca", r: "4.8" },
  { n: "TrueEdge Yard Services", u: "trueedgeyards.ca", r: "4.4" },
  { n: "Maple Leaf Property Care", u: "mapleleafcare.ca", r: "4.3" },
  { n: "Clearview Lawn Co.", u: "clearviewlawn.ca", r: "4.2" },
];
const SLOTS = 8;
const VH_PER_STAGE = 55;

function useCount(target: number, reduce: boolean | null, decimals = 0) {
  const mv = useMotionValue(target);
  const [v, setV] = useState(target);
  useEffect(() => {
    if (reduce) {
      setV(target);
      return;
    }
    const c = animate(mv, target, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [target, mv, reduce]);
  useMotionValueEvent(mv, "change", (x) => setV(decimals ? Math.round(x * 10 ** decimals) / 10 ** decimals : Math.round(x)));
  return v;
}

export function RankClimb() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    setStage(Math.min(stages.length - 1, Math.max(0, Math.floor(v * stages.length * 0.999))));
  });
  const s = stages[reduce ? stages.length - 1 : stage];
  const rank = useCount(s.rank, reduce);
  const clicks = useCount(s.clicks, reduce);
  const leads = useCount(s.leads, reduce, 1);
  const page = s.rank <= 10 ? 1 : s.rank <= 20 ? 2 : 3;
  const youIndex = s.rank <= SLOTS ? s.rank - 1 : SLOTS + 1;
  const maxClicks = stages[stages.length - 1].clicks;

  /** Jump to a stage: scroll to the middle of that stage's slice of the pinned section. */
  const goTo = (i: number) => {
    if (reduce || !ref.current) {
      setStage(i);
      return;
    }
    const el = ref.current;
    const range = el.offsetHeight - window.innerHeight;
    const y = el.offsetTop + range * ((i + 0.5) / stages.length);
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="on-dark relative bg-ink text-paper"
      style={{ height: reduce ? "auto" : `${stages.length * VH_PER_STAGE + 100}vh` }}
      aria-labelledby="climb-title"
    >
      <div className={clsx("flex flex-col justify-center overflow-hidden pt-20 pb-8 md:pt-24", !reduce && "sticky top-0 h-[100svh]")}>
        <div className="container-x grid items-center gap-5 lg:grid-cols-12 lg:gap-12">
          {/* Narrative + impact */}
          <div className="lg:col-span-5">
            <Eyebrow dark>How we get you found</Eyebrow>
            <h2 id="climb-title" className="mt-3 text-[clamp(1.7rem,4vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] md:mt-5">
              From page 3 to the <span className="serif text-volt">top of Google.</span>
            </h2>

            {/* Stage stepper: click to jump */}
            <ol className="mt-4 grid grid-cols-4 gap-1.5 md:mt-8" aria-label="Stages">
              {stages.map((st, i) => (
                <li key={st.t}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === stage ? "step" : undefined}
                    aria-label={`${st.k}: ${st.t}, position ${st.rank}`}
                    className="group block min-h-10 w-full text-left"
                  >
                    <span className={clsx("block h-1 rounded-full transition-colors duration-500", i <= stage ? "bg-volt" : "bg-paper/15 group-hover:bg-paper/30")} />
                    <span className={clsx("label mt-2 block !text-[0.62rem] transition-colors", i === stage ? "text-volt" : "text-paper/60 group-hover:text-paper/80")}>#{st.rank}</span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="mt-2 min-h-[4.5rem] md:mt-4 md:min-h-[6.5rem]" aria-live="polite">
              <p className="label text-volt">{s.k}</p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.02em] md:text-2xl">{s.t}</p>
              <p className="mt-1 hidden text-sm leading-relaxed text-paper/70 sm:block md:text-base">{s.b}</p>
            </div>

            {/* Impact */}
            <dl className="mt-3 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-paper/10 bg-paper/10 md:mt-5">
              {[
                { k: "Position", v: `#${rank}`, sub: `Page ${page}` },
                { k: "Clicks / mo", v: String(clicks), sub: `of ${SEARCHES} searches` },
                { k: "Quote requests", v: String(leads), sub: "per month" },
              ].map((m, i) => (
                <div key={m.k} className="bg-ink p-3 md:p-4">
                  <dt className="label !text-[0.6rem] text-paper/60 md:!text-[0.68rem]">{m.k}</dt>
                  <dd className={clsx("mt-1 text-[clamp(1.5rem,3.2vw,2.6rem)] font-semibold leading-none tracking-[-0.05em] tabular-nums", i > 0 && "text-volt")}>{m.v}</dd>
                  <dd className="mt-1 text-[0.7rem] text-paper/60 md:text-xs">{m.sub}</dd>
                </div>
              ))}
            </dl>

            {/* Clicks by stage */}
            <div className="mt-4 hidden items-end gap-2 sm:flex md:mt-5" aria-hidden="true">
              {stages.map((st, i) => (
                <div key={st.t} className="flex flex-1 flex-col items-center gap-1.5">
                  <div className="flex h-14 w-full items-end overflow-hidden rounded-md bg-paper/[0.06]">
                    <motion.div
                      className={clsx("w-full rounded-md", i <= stage ? "bg-volt" : "bg-paper/10")}
                      initial={false}
                      animate={{ height: `${Math.max(4, (st.clicks / maxClicks) * 100)}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  <span className="label !text-[0.6rem] text-paper/60">
                    #{st.rank} · {st.clicks}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SERP */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-[20px] border border-paper/10 bg-paper text-ink shadow-[0_50px_100px_-30px_rgba(0,0,0,.6)]">
              <div className="border-b border-ink/10 p-2.5 sm:p-3.5">
                <div className="flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-sm">
                  <Search className="h-4 w-4 text-ink/60" aria-hidden="true" />
                  <span className="font-medium">{QUERY}</span>
                </div>
              </div>
              <div className="relative p-2 [--row:1.9rem] sm:p-3 sm:[--row:2.8rem] lg:[--row:3.1rem]" style={{ height: `calc(${SLOTS + 2} * var(--row) + 1rem)` }}>
                {competitors.map((c, i) => {
                  const idx = i + (s.rank <= SLOTS && i >= s.rank - 1 ? 1 : 0);
                  return (
                    <motion.div
                      key={c.n}
                      className="absolute inset-x-2 top-2 sm:inset-x-3 sm:top-3"
                      style={{ height: "var(--row)" }}
                      initial={false}
                      animate={{ y: `${idx * 100}%`, opacity: idx >= SLOTS ? 0 : 1 }}
                      transition={{ type: "spring", stiffness: 140, damping: 22 }}
                    >
                      <Row pos={idx + 1} name={c.n} url={c.u} rating={c.r} />
                    </motion.div>
                  );
                })}
                <div
                  className="absolute inset-x-3 top-2 flex items-center gap-3 px-3 sm:top-3"
                  style={{ height: "var(--row)", transform: `translateY(${SLOTS * 100}%)` }}
                  aria-hidden="true"
                >
                  <span className="h-px flex-1 bg-ink/15" />
                  <span className="label !text-[0.6rem] text-stone">Page 2 · Page 3 · almost no clicks</span>
                  <span className="h-px flex-1 bg-ink/15" />
                </div>
                <motion.div
                  className="absolute inset-x-2 top-2 z-10 sm:inset-x-3 sm:top-3"
                  style={{ height: "var(--row)" }}
                  initial={false}
                  animate={{ y: `${youIndex * 100}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                >
                  <div className="flex h-full items-center gap-2.5 rounded-lg bg-volt px-2.5 text-ink shadow-[0_12px_30px_-10px_var(--p-accent)]">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-[0.7rem] font-semibold text-paper tabular-nums sm:h-7 sm:w-7">{s.rank}</span>
                    <p className="min-w-0 flex-1 truncate text-xs font-semibold sm:text-sm">Your business · Landscaping in Guelph</p>
                    {s.rank <= 3 ? (
                      <span className="hidden items-center gap-1 rounded-full bg-ink/10 px-2 py-0.5 text-xs font-medium sm:inline-flex">
                        <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" /> {s.rank === 1 ? "Top spot" : "Top 3"}
                      </span>
                    ) : null}
                  </div>
                </motion.div>
              </div>
            </div>
            <p className="label mt-3 !text-[0.6rem] leading-relaxed text-paper/60 md:!text-[0.68rem]">
              Illustrative example with fictional businesses. Impact assumes {SEARCHES} searches/month, typical click-through rates by position and a {CONVERSION * 100}% enquiry rate. Rankings are never guaranteed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ pos, name, url, rating }: { pos: number; name: string; url: string; rating: string | null }) {
  return (
    <div className="flex h-full items-center gap-2.5 border-b border-ink/[0.06] px-2.5">
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink/5 text-[0.7rem] text-stone tabular-nums sm:h-7 sm:w-7">{pos}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-[#1a0dab] sm:text-sm">{name}</p>
        <p className="hidden truncate text-xs text-stone sm:block">{url}</p>
      </div>
      {rating ? (
        <span className="hidden items-center gap-1 text-xs text-stone md:inline-flex">
          {rating} <Star className="h-3 w-3 fill-[#fbbc04] text-[#fbbc04]" aria-hidden="true" />
        </span>
      ) : null}
    </div>
  );
}
