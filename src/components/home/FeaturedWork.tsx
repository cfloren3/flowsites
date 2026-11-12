"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { projects, type Project } from "@/content/projects";
import { BrowserFrame, PhoneFrame } from "../Frames";
import { RollingNumber } from "../Type";
import { SeoVisual } from "../SeoVisual";
import { EvidenceBadge, Eyebrow, SplitText, Reveal, TextLink } from "../ui";

export function FeaturedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative bg-paper py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal>
              <Eyebrow>Selected work · {String(projects.length).padStart(2, "0")} projects</Eyebrow>
            </Reveal>
            <SplitText id="work-title" text={"Our strongest evidence\nis *our* *work.*"} className="h-section mt-5" />
          </div>
          <Reveal className="md:col-span-4" delay={150}>
            <p className="text-stone leading-relaxed">
              Real sites, captured live. Every project is labelled with what we did and how we know the results. Some are founder portfolio work, and we say so.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="container-x mt-14 md:mt-20">
        <ol className="relative">
          {projects.map((p, i) => (
            <li key={p.slug} className="md:sticky" style={{ top: `calc(5.5rem + ${i * 1.25}rem)` }}>
              <ProjectPanel project={p} index={i} />
            </li>
          ))}
        </ol>
        <div className="mt-12 flex justify-center">
          <TextLink href="/work" className="text-lg">
            See all work &amp; case studies
          </TextLink>
        </div>
      </div>
    </section>
  );
}

function ProjectPanel({ project: p, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const areaRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });
  const flagship = index === 0;
  const tone = index % 2 === 0 ? "dark" : "light";

  return (
    <article
      className={clsx(
        "mb-6 overflow-hidden rounded-[28px] border md:mb-10",
        tone === "dark" ? "on-dark border-paper/10 bg-ink text-paper" : "border-ink/10 bg-paper-2 text-ink",
      )}
      aria-labelledby={`p-${p.slug}`}
    >
      <div className="grid lg:grid-cols-12">
        <div className="flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className={clsx("label", tone === "dark" ? "text-paper/55" : "text-stone")}>0{index + 1}</span>
            {flagship ? <span className="label rounded-full bg-volt px-2.5 py-1 !text-[0.64rem] text-ink">Flagship case study</span> : null}
          </div>
          <h3 id={`p-${p.slug}`} className="mt-6 text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
            {p.name}
          </h3>
          <p className={clsx("label mt-3", tone === "dark" ? "text-paper/50" : "text-stone")}>{p.industry}</p>
          <p className={clsx("mt-6 max-w-md leading-relaxed", tone === "dark" ? "text-paper/70" : "text-ink/70")}>{p.summary}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Services provided">
            {p.services.slice(0, 4).map((s) => (
              <li key={s} className={clsx("rounded-full border px-3 py-1 text-xs", tone === "dark" ? "border-paper/15 text-paper/70" : "border-ink/15 text-ink/70")}>
                {s}
              </li>
            ))}
          </ul>

          {p.metrics.length ? (
            <dl className={clsx("mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border", tone === "dark" ? "border-paper/10 bg-paper/10" : "border-ink/10 bg-ink/10")}>
              {p.metrics.slice(0, 2).map((m) => (
                <div key={m.label} className={clsx("p-4", tone === "dark" ? "bg-ink" : "bg-paper-2")}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="text-3xl font-semibold tracking-[-0.04em]">
                    <RollingNumber value={m.value} />
                  </dd>
                  <dd className={clsx("mt-1 text-xs leading-snug", tone === "dark" ? "text-paper/55" : "text-stone")}>{m.label}</dd>
                  <dd className="mt-3">
                    <EvidenceBadge evidence={m.evidence} />
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className={clsx("mt-8 border-l-2 pl-4 text-sm leading-relaxed", tone === "dark" ? "border-volt text-paper/70" : "border-ink text-ink/75")}>
              {p.relationship}
            </p>
          )}

          <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3 pt-10">
            <Link
              href={`/case-studies/${p.slug}`}
              className={clsx(
                "group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors min-h-11",
                tone === "dark" ? "bg-paper text-ink hover:bg-white" : "bg-ink text-paper hover:bg-ink-3",
              )}
            >
              Read case study
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm underline decoration-1 underline-offset-4 opacity-70 hover:opacity-100 min-h-11">
              Visit {p.displayUrl}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div
          ref={areaRef}
          className={clsx("relative min-h-[300px] overflow-hidden lg:col-span-7", tone === "dark" ? "bg-ink-2" : "bg-paper-3/60")}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
          onPointerLeave={() => setHover(false)}
          onPointerMove={(e) => {
            const r = areaRef.current?.getBoundingClientRect();
            if (!r) return;
            x.set(e.clientX - r.left);
            y.set(e.clientY - r.top);
          }}
        >
          <Link href={`/case-studies/${p.slug}`} className="absolute inset-0 z-20" aria-label={`Open the ${p.name} case study`} tabIndex={-1} />
          <div className="relative px-6 pb-10 pt-10 sm:px-10 lg:absolute lg:inset-0 lg:p-12">
            {p.images ? (
              <div className="relative h-full">
                <div className="transition-transform duration-700 ease-[var(--ease-flow)] group-hover:scale-[1.01] lg:absolute lg:left-0 lg:top-0 lg:w-[88%]">
                  <BrowserFrame src={p.images.desktop} alt={`${p.name} desktop homepage`} url={p.displayUrl} dark={tone === "dark"} sizes="(min-width:1024px) 50vw, 90vw" />
                </div>
                <div className="absolute -bottom-4 right-0 w-[30%] max-w-[190px] lg:bottom-auto lg:top-[36%] lg:right-0">
                  <PhoneFrame src={p.images.mobile} alt={`${p.name} mobile homepage`} sizes="190px" />
                </div>
              </div>
            ) : p.seo ? (
              <div className="flex h-full items-center">
                <SeoVisual searches={p.seo} className="w-full max-w-[560px]" />
              </div>
            ) : null}
          </div>
          {!reduce ? (
            <motion.div
              aria-hidden="true"
              style={{ x: sx, y: sy }}
              className="pointer-events-none absolute left-0 top-0 z-30 -ml-12 -mt-12"
              animate={{ scale: hover ? 1 : 0, opacity: hover ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid h-24 w-24 place-items-center rounded-full bg-volt text-center text-[0.8rem] font-medium leading-tight text-ink shadow-xl">
                View
                <br />
                case study
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
