"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { PreviewWizard } from "../PreviewWizard";

/** Closing moment: the section opens up as it scrolls in, the headline settles, and the first step is right there. */
export function FinalExperience({ placement = "final-cta" }: { placement?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const inset = useTransform(scrollYProgress, [0, 1], [5, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const clip = useTransform([inset, radius], ([i, r]) => `inset(0 ${i}% round ${r}px ${r}px 0 0)`);
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <motion.section
      ref={ref}
      id="start"
      data-section={placement}
      className="on-dark relative overflow-hidden bg-ink py-24 text-paper md:py-36 grain"
      style={reduce ? undefined : { clipPath: clip }}
      aria-labelledby="final-title"
    >
      <motion.div
        aria-hidden="true"
        style={{ opacity: reduce ? 1 : glow }}
        className="pointer-events-none absolute left-1/2 top-0 h-[60rem] w-[90rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--p-accent)_22%,transparent),transparent)]"
      />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12">
        <motion.div className="origin-left lg:col-span-6" style={reduce ? undefined : { scale }}>
          <p className="label text-volt">Free website preview · websites from $995 CAD</p>
          <h2 id="final-title" className="display mt-6 text-[clamp(2.8rem,6.6vw,6.4rem)]">
            Your next customer is <span className="serif text-volt">searching.</span>
          </h2>
          <p className="lede mt-6 max-w-lg text-paper/75">Let&apos;s make sure your business makes the right first impression. See your new homepage before you pay a cent.</p>
          <p className="mt-8 inline-flex items-center gap-2 text-sm text-paper/70">
            <ShieldCheck className="h-4 w-4 text-volt" aria-hidden="true" />
            Love the design before you pay. If it isn&apos;t right, you owe nothing.
          </p>
        </motion.div>
        <div className="lg:col-span-6">
          <div className="rounded-[28px] border border-paper/10 bg-ink-2 p-6 sm:p-8 md:p-10">
            <PreviewWizard dark placement={placement} />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
