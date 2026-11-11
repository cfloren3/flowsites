"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ArrowUpRight, MousePointer2 } from "lucide-react";
import { projects, type Project } from "@/content/projects";

/**
 * Portfolio carousel: real full-page captures of each site inside browser frames.
 * Desktop: slow marquee that pauses on hover/focus; scroll inside a frame to explore the page.
 * Touch / reduced motion: swipeable snap carousel.
 */
export function SiteMarquee({ dark = true, title = true }: { dark?: boolean; title?: boolean }) {
  const [mode, setMode] = useState<"marquee" | "swipe">("marquee");
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduce) setMode("swipe");
  }, []);
  // Two identical halves: the keyframe shifts by exactly -50% for a seamless loop.
  const loop = [...projects, ...projects];

  return (
    <section className={clsx("relative overflow-hidden py-20 md:py-28", dark ? "on-dark bg-ink text-paper" : "bg-paper-2")} aria-labelledby={title ? "sites-title" : undefined} aria-label={title ? undefined : "Website previews"}>
      {title ? (
        <div className="container-x mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
          <div>
            <p className={clsx("label", dark ? "text-paper/60" : "text-stone")}>Live sites · captured {projects[0].capturedOn}</p>
            <h2 id="sites-title" className="mt-4 text-[clamp(2.2rem,5vw,4.4rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
              Scroll through <span className="serif text-volt">our sites.</span>
            </h2>
          </div>
          <p className={clsx("flex max-w-sm items-center gap-2 text-sm", dark ? "text-paper/65" : "text-stone")}>
            <MousePointer2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            {mode === "marquee" ? "Hover to pause, then scroll inside any site to explore the full page." : "Swipe across, then scroll inside any site to explore the full page."}
          </p>
        </div>
      ) : null}

      {mode === "marquee" ? (
        <div className="group/marquee relative">
          <ul className="flex w-max animate-[marquee_60s_linear_infinite] group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]">
            {loop.map((p, i) => (
              <li key={`${p.slug}-${i}`} aria-hidden={i >= projects.length} className="mr-6 w-[min(560px,80vw)] shrink-0">
                <SiteCard p={p} dark={dark} tabbable={i < projects.length} />
              </li>
            ))}
          </ul>
          <div aria-hidden="true" className={clsx("pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r to-transparent md:w-32", dark ? "from-ink" : "from-paper-2")} />
          <div aria-hidden="true" className={clsx("pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l to-transparent md:w-32", dark ? "from-ink" : "from-paper-2")} />
        </div>
      ) : (
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none]">
          {projects.map((p) => (
            <li key={p.slug} className="w-[86vw] max-w-[520px] shrink-0 snap-center">
              <SiteCard p={p} dark={dark} tabbable />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function SiteCard({ p, dark, tabbable }: { p: Project; dark: boolean; tabbable: boolean }) {
  const rank = p.metrics.find((m) => m.value.startsWith("#"));
  return (
    <article className={clsx("overflow-hidden rounded-2xl border shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)]", dark ? "border-paper/10 bg-ink-2" : "border-ink/10 bg-paper")}>
      <div className={clsx("flex items-center gap-3 border-b px-3.5 py-2.5", dark ? "border-paper/10" : "border-ink/10")}>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className={clsx("mx-auto truncate rounded-md px-3 py-1 font-mono text-[11px]", dark ? "bg-paper/5 text-paper/70" : "bg-ink/5 text-ink/75")}>{p.displayUrl}</span>
        <span className="w-[42px]" aria-hidden="true" />
      </div>
      {/* Scrollable full-page preview */}
      <div
        className="relative h-[clamp(260px,34vw,360px)] overflow-y-auto overscroll-contain [scrollbar-width:thin]"
        data-lenis-prevent
        tabIndex={tabbable ? 0 : -1}
        aria-label={`Scrollable preview of ${p.displayUrl}`}
        role="region"
      >
        <Image src={`/work/${p.slug}/full.webp`} alt={`Full-page capture of ${p.displayUrl}`} width={900} height={5063} sizes="560px" className="block h-auto w-full" />
      </div>
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold tracking-[-0.03em]">{p.name}</p>
          <p className={clsx("label mt-1 truncate", dark ? "text-paper/60" : "text-stone")}>
            {rank ? `${rank.value} on Google · lawn care Guelph` : p.industry}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={`/case-studies/${p.slug}`}
            tabIndex={tabbable ? 0 : -1}
            className={clsx("rounded-full px-3.5 py-2 text-xs font-medium min-h-9 inline-flex items-center", dark ? "bg-paper text-ink" : "bg-ink text-paper")}
          >
            Case study
          </Link>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={tabbable ? 0 : -1}
            aria-label={`Visit ${p.displayUrl} (opens in a new tab)`}
            className={clsx("grid h-9 w-9 place-items-center rounded-full border", dark ? "border-paper/20" : "border-ink/15")}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
