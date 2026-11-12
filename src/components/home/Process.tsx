"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import clsx from "clsx";
import { Eyebrow } from "../ui";

export const processSteps = [
  { n: "01", t: "Discover", b: "A short call or form about your services, service area and goals. No homework." },
  { n: "02", t: "Design", b: "We design your homepage around your business, planned for Google from the start." },
  { n: "03", t: "Preview", b: "You get a private link to click through on your phone. Don't love it? You don't pay.", featured: true },
  { n: "04", t: "Launch", b: "Once you approve and we agree the scope in writing, we build it out and put it live on your domain." },
  { n: "05", t: "Grow", b: "With an optional growth plan, we track visibility and enquiries and keep improving." },
];

/** Five connected stages. The connecting line draws itself as the section scrolls through view. */
export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(reduce ? processSteps.length - 1 : -1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  useMotionValueEvent(p, "change", (v) => {
    if (!reduce) setActive(Math.floor(v * processSteps.length * 1.02) - (v < 0.04 ? 1 : 0));
  });

  return (
    <section id="process" data-section="process" className="bg-paper py-24 md:py-32" aria-labelledby="process-title">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow>How it works</Eyebrow>
            <h2 id="process-title" className="h-section mt-6">
              Five steps. <span className="serif text-volt-ink">Zero guesswork.</span>
            </h2>
          </div>
          <p className="max-w-sm text-stone leading-relaxed lg:col-span-4 lg:justify-self-end lg:pb-3">
            You run the business. We handle the website. Most of your time is one short conversation and one look at the preview.
          </p>
        </div>

        <ol ref={ref} className="relative mt-14 grid gap-8 lg:mt-20 lg:grid-cols-5 lg:gap-6">
          {/* track + animated fill: vertical on mobile, horizontal on desktop */}
          <span aria-hidden="true" className="absolute left-[19px] top-2 bottom-2 w-px bg-ink/10 lg:left-0 lg:right-0 lg:top-[19px] lg:bottom-auto lg:h-px lg:w-auto" />
          <motion.span
            aria-hidden="true"
            className="absolute left-[18px] top-2 bottom-2 w-[3px] origin-top rounded-full bg-volt lg:hidden"
            style={{ scaleY: reduce ? 1 : p }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute left-0 right-0 top-[18px] hidden h-[3px] origin-left rounded-full bg-volt lg:block"
            style={{ scaleX: reduce ? 1 : p }}
          />
          {processSteps.map((s, i) => {
            const on = i <= active;
            return (
              <li key={s.n} className="relative pl-14 lg:pl-0 lg:pt-16">
                <span
                  className={clsx(
                    "absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border text-xs font-semibold transition-all duration-500",
                    on ? "scale-100 border-volt bg-volt text-ink" : "scale-90 border-ink/15 bg-paper text-ink/60",
                  )}
                >
                  {s.n}
                </span>
                <div className={clsx("transition-transform duration-500 ease-[var(--ease-flow)]", on ? "translate-y-0" : "translate-y-1.5")}>
                  <h3 className="flex flex-wrap items-center gap-2 text-2xl font-semibold tracking-[-0.03em]">
                    {s.t}
                    {s.featured ? <span className="label rounded-full bg-ink px-2 py-1 !text-[0.6rem] text-paper">No-risk step</span> : null}
                  </h3>
                  <p className="mt-2 text-stone leading-relaxed">{s.b}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
