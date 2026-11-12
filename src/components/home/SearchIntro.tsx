"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import clsx from "clsx";
import { ArrowDown, Mic, Search } from "lucide-react";
import { Eyebrow } from "../ui";

const QUERY = "how to get #1 on google";
const SUGGESTIONS = ["how to get #1 on google", "how to rank higher on google maps", "how to get more customers from google"];

/** The question every owner types, shown being typed on a phone. Leads straight into the ranking climb below. */
export function SearchIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(reduce ? QUERY.length : 0);
  const done = typed >= QUERY.length;

  useEffect(() => {
    if (reduce || !inView) return;
    setTyped(0);
    const timers: number[] = [];
    let t = 500;
    for (let i = 1; i <= QUERY.length; i++) {
      t += 60 + (QUERY[i - 1] === " " ? 90 : 0) + ((i * 37) % 50); // slightly uneven, like real typing
      timers.push(window.setTimeout(() => setTyped(i), t));
    }
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce]);

  return (
    <section data-section="search-intro" className="on-dark relative overflow-hidden bg-ink pt-24 text-paper md:pt-32" aria-labelledby="search-intro-title">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow dark>The question every owner asks</Eyebrow>
          <h2 id="search-intro-title" className="mt-5 text-[clamp(2.3rem,5.4vw,5rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
            &ldquo;How do I get to <span className="serif text-volt">#1 on Google?</span>&rdquo;
          </h2>
          <p className="lede mt-6 max-w-md text-paper/70">There&apos;s no trick and no shortcut. There is a clear, repeatable process, and we&apos;ll show you every step.</p>
          <p className={clsx("mt-10 inline-flex items-center gap-3 font-medium transition-opacity duration-700", done ? "opacity-100" : "opacity-0")}>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-volt text-ink motion-safe:animate-bounce">
              <ArrowDown className="h-5 w-5" aria-hidden="true" />
            </span>
            Scroll for the answer
          </p>
        </div>

        {/* Phone */}
        <div ref={ref} className="flex justify-center lg:col-span-6" role="img" aria-label={`A phone showing someone typing “${QUERY}” into a search engine`}>
          <div className="relative w-[min(340px,86vw)] translate-y-10 rounded-[2.8rem] bg-[#0b0b0b] p-2.5 shadow-[0_60px_120px_-30px_rgba(0,0,0,.7)] ring-1 ring-white/15" aria-hidden="true">
            <div className="relative overflow-hidden rounded-[2.2rem] bg-white pb-10 text-[#1f1f1f]">
              <span className="absolute left-1/2 top-2.5 h-6 w-[32%] -translate-x-1/2 rounded-full bg-black" />
              <div className="flex items-center justify-between px-7 pt-3 text-[11px] font-semibold">
                <span>9:41</span>
                <span className="flex items-center gap-1">
                  <span className="h-2.5 w-4 rounded-sm border border-current" />
                </span>
              </div>

              <p className="mt-14 text-center text-[2rem] font-semibold tracking-[-0.05em] text-[#1f1f1f]/80">Search</p>

              <div className={clsx("mx-4 mt-6 overflow-hidden border border-black/10 shadow-[0_2px_10px_rgba(0,0,0,.08)] transition-[border-radius] duration-300", done ? "rounded-3xl" : "rounded-[1.6rem]")}>
                <div className="flex items-center gap-2.5 px-4 py-3.5">
                  <Search className="h-4 w-4 shrink-0 text-black/50" />
                  <span className="min-w-0 flex-1 truncate text-[0.98rem]">
                    {QUERY.slice(0, typed)}
                    {!reduce ? <span className="caret ml-px inline-block h-[1.1em] w-[1.5px] translate-y-[3px] bg-[#1a73e8]" /> : null}
                  </span>
                  <Mic className="h-4 w-4 shrink-0 text-black/40" />
                </div>
                <motion.ul initial={false} animate={{ height: done ? "auto" : 0, opacity: done ? 1 : 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden border-t border-black/[0.06]">
                  {SUGGESTIONS.map((s, i) => (
                    <li key={s} className={clsx("flex items-center gap-2.5 px-4 py-2.5 text-[0.88rem]", i === 0 && "bg-black/[0.04] font-medium")}>
                      <Search className="h-3.5 w-3.5 shrink-0 text-black/40" />
                      <span className="truncate">{s}</span>
                    </li>
                  ))}
                </motion.ul>
              </div>

              {/* keyboard hint */}
              <div className="mx-3 mt-8 grid grid-cols-10 gap-1 opacity-60">
                {"qwertyuiopasdfghjklzxcvbnm".split("").map((k, i) => {
                  const active = !done && QUERY[typed] === k;
                  return (
                    <span key={i} className={clsx("grid h-8 place-items-center rounded-md text-[11px] font-medium transition-colors duration-100", active ? "bg-[#1f1f1f] text-white" : "bg-black/[0.07]")}>
                      {k}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
