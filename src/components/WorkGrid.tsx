"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";

const filters = [
  { k: "all", label: "All work" },
  { k: "trades", label: "Trades & local", match: ["yardex-guelph"] },
  { k: "seo", label: "SEO results", match: ["yardex-guelph", "ontario-deca"] },
  { k: "brand", label: "Brand & editorial", match: ["carter-florence"] },
  { k: "product", label: "Software & product", match: ["traitcrm"] },
];

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [f, setF] = useState("all");
  const active = filters.find((x) => x.k === f)!;
  const list = projects.filter((p) => f === "all" || active.match?.includes(p.slug));
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {filters.map((x) => (
          <button
            key={x.k}
            type="button"
            onClick={() => setF(x.k)}
            aria-pressed={f === x.k}
            className={clsx(
              "min-h-10 rounded-full border px-4 py-2 text-sm transition-colors",
              f === x.k ? "border-ink bg-ink text-paper" : "border-ink/15 text-ink/70 hover:border-ink/40",
            )}
          >
            {x.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {list.length} project{list.length === 1 ? "" : "s"}
      </p>
      <motion.ul layout className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.li
              layout
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              className={clsx(i === 0 && f === "all" && "md:col-span-2")}
            >
              <Link href={`/case-studies/${p.slug}`} className="group block">
                <div
                  className={clsx(
                    "relative overflow-hidden rounded-[24px] border border-ink/10 bg-paper-2",
                    i === 0 && f === "all" ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[16/11]",
                  )}
                >
                  <div className="absolute inset-[6%] bottom-0 overflow-hidden rounded-t-xl shadow-[0_30px_60px_-20px_rgba(13,14,12,.4)] transition-transform duration-[900ms] ease-[var(--ease-flow)] group-hover:-translate-y-2 group-hover:scale-[1.015]">
                    <Image src={p.images.desktop} alt={`${p.name} homepage`} fill sizes={i === 0 ? "90vw" : "(min-width:768px) 45vw, 90vw"} className="object-cover object-top" />
                  </div>
                  <div className="absolute bottom-[6%] right-[5%] w-[18%] min-w-[70px] max-w-[160px] translate-y-6 opacity-0 transition-all duration-700 ease-[var(--ease-flow)] group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="rounded-[1.2rem] bg-black p-1 shadow-2xl">
                      <div className="relative aspect-[390/844] overflow-hidden rounded-[1rem]">
                        <Image src={p.images.mobile} alt="" fill sizes="160px" className="object-cover object-top" />
                      </div>
                    </div>
                  </div>
                  <span className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-paper text-ink opacity-0 shadow-lg transition-all duration-500 group-hover:opacity-100">
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="text-[clamp(1.6rem,2.6vw,2.4rem)] font-semibold tracking-[-0.045em]">{p.name}</h2>
                  <p className="label text-stone">{p.category}</p>
                </div>
                <p className="mt-2 max-w-xl text-stone">{p.summary}</p>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
