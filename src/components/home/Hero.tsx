"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { projects } from "@/content/projects";
import { Button, SplitText } from "../ui";
import { Typewriter } from "../Type";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const p = projects[active];
  const back = projects[(active + 1) % projects.length];

  // Auto-advance through real projects
  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % projects.length), 5200);
    return () => window.clearInterval(t);
  }, [reduce, paused]);

  // Pointer parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const l1x = useTransform(sx, (v) => v * -14);
  const l1y = useTransform(sy, (v) => v * -10);
  const l2x = useTransform(sx, (v) => v * 22);
  const l2y = useTransform(sy, (v) => v * 16);
  const l3x = useTransform(sx, (v) => v * -30);
  const l3y = useTransform(sy, (v) => v * -20);
  const rotY = useTransform(sx, (v) => v * 3);

  // Scroll: tilted stage flattens into place
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "start 0.25"] });
  const rotX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.9, 1]);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section className="on-dark relative overflow-hidden bg-ink text-paper grain" aria-labelledby="hero-title">
      {/* soft light field */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[46rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--p-accent)_10%,transparent),transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-b from-transparent to-ink" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden="true">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M80 0H0V80" fill="none" stroke="var(--p-paper)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container-x relative pt-32 md:pt-40">
        <p
          className="rise-in label flex flex-wrap items-center gap-x-3 gap-y-2 text-paper/55"
        >
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-volt pulse-dot" aria-hidden="true" />
            Web design &amp; local SEO
          </span>
          <span aria-hidden="true">/</span>
          <span>For Ontario&apos;s trades &amp; local businesses</span>
        </p>

        <SplitText
          as="h1"
          id="hero-title"
          immediate
          text={"Built to stand out.\nEngineered to get *found.*"}
          accentClassName="text-volt"
          className="display mt-6 text-[clamp(3.1rem,8.6vw,8.8rem)]"
          delay={120}
        />
        <div className="rise-in mt-6" style={{ "--d": "700ms" } as React.CSSProperties}>
          <Typewriter
            prefix="Websites for"
            words={["landscapers", "restaurants", "roofers", "cafés", "plumbers", "salons", "contractors", "local shops", "HVAC companies"]}
            className="text-[clamp(0.95rem,1.6vw,1.2rem)] text-paper/80"
          />
        </div>

        <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-12 md:items-end">
          <p className="rise-in lede max-w-xl text-paper/70 md:col-span-6" style={{ "--d": "450ms" } as React.CSSProperties}>
            Beautifully designed websites, local SEO and ongoing growth for Ontario trades, restaurants and local businesses.{" "}
            <span className="text-paper">Websites starting at $995&nbsp;CAD.</span>
          </p>
          <div className="rise-in md:col-span-6 md:justify-self-end" style={{ "--d": "600ms" } as React.CSSProperties}>
            <div className="flex flex-wrap gap-3">
              <Button href="/free-website-preview" variant="accent" size="lg">
                Get my free website preview
              </Button>
              <Button href="/work" variant="outline-light" size="lg">
                Explore our work
              </Button>
            </div>
            <Link href="/pricing#guarantee" className="mt-4 inline-flex items-center gap-2 text-sm text-paper/60 hover:text-paper">
              <ShieldCheck className="h-4 w-4 text-volt" aria-hidden="true" />
              Love the design or don&apos;t pay. <span className="underline underline-offset-4">See the terms</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Showcase stage */}
      <div className="container-x relative mt-14 pb-20 md:mt-16 md:pb-28" style={{ perspective: "1800px" }}>
        <motion.div
          ref={stageRef}
          onPointerMove={onMove}
          onPointerLeave={() => {
            mx.set(0);
            my.set(0);
          }}
          style={{ rotateX: rotX, rotateY: rotY, scale, transformOrigin: "50% 0%" }}
          className="relative mx-auto max-w-[1240px]"
        >
          {/* back layer */}
          <motion.div style={{ x: l1x, y: l1y }} className="absolute -left-[4%] -top-[7%] hidden w-[46%] md:block" aria-hidden="true">
            <div className="overflow-hidden rounded-xl border border-paper/10 opacity-50 shadow-2xl">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={back.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease }}
                  className="relative aspect-[16/10]"
                >
                  <Image src={back.images.desktop} alt="" fill sizes="40vw" className="object-cover object-top" />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* main desktop */}
          <motion.div style={{ x: l2x, y: l2y }} className="relative z-10 md:ml-[8%] md:w-[84%]">
            <div className="overflow-hidden rounded-[14px] border border-paper/15 bg-ink-2 shadow-[0_60px_120px_-30px_rgba(0,0,0,.8)]">
              <div className="flex items-center gap-3 border-b border-paper/10 px-3.5 py-2.5">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
                </div>
                <div className="mx-auto flex min-w-0 max-w-[60%] flex-1 justify-center rounded-md bg-paper/5 px-3 py-1 font-mono text-[11px] text-paper/50">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={p.slug} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="truncate">
                      {p.displayUrl}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="w-[42px]" aria-hidden="true" />
              </div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={p.slug}
                    initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 0 100%)" }}
                    animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0 0%)" }}
                    exit={{ opacity: 0.6 }}
                    transition={{ duration: 1.1, ease }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={p.images.desktop}
                      alt={`${p.name} website homepage, captured ${p.capturedOn}`}
                      fill
                      priority={active === 0}
                      sizes="(min-width: 1280px) 1040px, 90vw"
                      className="object-cover object-top"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* phone */}
          <motion.div style={{ x: l3x, y: l3y }} className="absolute -bottom-[10%] right-[1%] z-20 w-[26%] max-w-[230px] sm:w-[22%] md:right-[3%]">
            <div className="rounded-[2rem] bg-[#0b0b0b] p-[6px] shadow-[0_50px_90px_-20px_rgba(0,0,0,.85)] ring-1 ring-white/15">
              <div className="relative aspect-[390/844] overflow-hidden rounded-[1.6rem]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={p.slug}
                    initial={reduce ? { opacity: 0 } : { y: "100%" }}
                    animate={reduce ? { opacity: 1 } : { y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease, delay: 0.1 }}
                    className="absolute inset-0"
                  >
                    <Image src={p.images.mobile} alt={`${p.name} on mobile`} fill sizes="230px" className="object-cover object-top" />
                  </motion.div>
                </AnimatePresence>
                <span aria-hidden="true" className="absolute left-1/2 top-1.5 z-10 h-4 w-[32%] -translate-x-1/2 rounded-full bg-black" />
              </div>
            </div>
          </motion.div>

          {/* caption card */}
          <div className="absolute -bottom-[7%] left-0 z-30 hidden w-[min(360px,40%)] md:block">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.6, ease }}
                className="rounded-2xl border border-paper/10 bg-ink/80 p-5 backdrop-blur-xl"
              >
                <p className="label text-paper/55">{p.category}</p>
                <p className="mt-2 text-xl font-semibold tracking-[-0.03em]">{p.name}</p>
                {p.metrics[0]?.value.startsWith("#") ? (
                  <p className="mt-2 text-sm text-paper/75">
                    <span className="serif text-2xl text-volt">{p.metrics[0].value}</span>{" "}
                    {p.metrics[0].label.charAt(0).toLowerCase() + p.metrics[0].label.slice(1)}
                  </p>
                ) : null}
                <Link href={`/case-studies/${p.slug}`} className="mt-3 inline-flex items-center gap-1.5 text-sm text-volt hover:underline underline-offset-4">
                  Read the case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* project switcher */}
        <div className="relative z-30 mt-24 flex flex-wrap items-center justify-between gap-4 md:mt-28">
          <p className="label text-paper/55">Real work · Captured live {p.capturedOn}</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a project to preview">
            {projects.map((proj, i) => (
              <button
                key={proj.slug}
                type="button"
                onClick={() => {
                  setActive(i);
                  setPaused(true);
                }}
                aria-pressed={i === active}
                className={`relative overflow-hidden rounded-full border px-3.5 py-2 text-sm transition-colors min-h-10 ${
                  i === active ? "border-paper/40 text-paper" : "border-paper/10 text-paper/50 hover:text-paper"
                }`}
              >
                {i === active && !paused && !reduce ? (
                  <motion.span
                    key={`bar-${active}`}
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 bg-paper/10"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5.2, ease: "linear" }}
                  />
                ) : null}
                <span className="relative">{proj.shortName}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
