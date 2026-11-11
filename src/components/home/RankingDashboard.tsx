"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { ArrowDownRight, ArrowUpRight, Info } from "lucide-react";
import { demoDashboard as d } from "@/content/rankings";
import { Eyebrow, Reveal, SplitText } from "../ui";

export function RankingSection() {
  return (
    <section className="on-dark relative bg-ink py-24 text-paper md:py-36" aria-labelledby="dash-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow dark>Measurement</Eyebrow>
            </Reveal>
            <SplitText id="dash-title" text={"See what's *working.*\nThen do more of it."} accentClassName="text-volt" className="h-section mt-6" />
          </div>
          <Reveal className="lg:col-span-5" delay={150}>
            <p className="text-paper/65 leading-relaxed">
              Clients on a growth plan get clear reporting: where you appear for the searches that matter, how many people visit, and how many become enquiries. Data comes from your own Google Search Console and Analytics.
            </p>
          </Reveal>
        </div>
        <Reveal className="mt-14" variant="scale">
          <RankingDashboard />
        </Reveal>
      </div>
    </section>
  );
}

export function RankingDashboard() {
  const [sel, setSel] = useState(0);
  const kw = d.keywords[sel];
  const current = kw.history[kw.history.length - 1];
  const start = kw.history[0];
  return (
    <div className="overflow-hidden rounded-[24px] border border-paper/10 bg-ink-2">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper/10 bg-[#c9f26b]/[0.08] px-5 py-3">
        <p className="flex items-center gap-2 text-sm text-paper/80">
          <Info className="h-4 w-4 text-volt" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-paper">Demonstration data.</strong> A fictional business, not connected to live search data. It shows what client reporting looks like.
          </span>
        </p>
        <p className="label text-paper/55">
          {d.business} · {d.period}
        </p>
      </div>

      <div className="grid lg:grid-cols-12">
        {/* table view: keywords */}
        <div className="border-b border-paper/10 lg:col-span-7 lg:border-b-0 lg:border-r">
          <div className="overflow-x-auto" data-lenis-prevent>
            <table className="w-full min-w-[520px] text-left text-sm">
              <caption className="sr-only">Keyword positions, impressions and clicks for a fictional business (demonstration data)</caption>
              <thead>
                <tr className="label text-paper/55">
                  <th scope="col" className="px-5 py-4 font-normal">Keyword · Guelph, ON · Google organic</th>
                  <th scope="col" className="px-3 py-4 font-normal">Trend</th>
                  <th scope="col" className="px-3 py-4 text-right font-normal">Position</th>
                  <th scope="col" className="px-3 py-4 text-right font-normal">Impr.</th>
                  <th scope="col" className="px-5 py-4 text-right font-normal">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {d.keywords.map((k, i) => {
                  const now = k.history[k.history.length - 1];
                  const delta = k.history[0] - now;
                  return (
                    <tr key={k.keyword} className={clsx("border-t border-paper/[0.07] transition-colors", i === sel ? "bg-paper/[0.06]" : "hover:bg-paper/[0.03]")}>
                      <th scope="row" className="px-5 py-3.5 font-normal">
                        <button
                          type="button"
                          onClick={() => setSel(i)}
                          aria-pressed={i === sel}
                          className="min-h-10 text-left text-paper/85 hover:text-paper"
                        >
                          {i === sel ? <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-volt align-middle" aria-hidden="true" /> : null}
                          {k.keyword}
                        </button>
                      </th>
                      <td className="px-3 py-3.5">
                        <Spark data={k.history} />
                      </td>
                      <td className="px-3 py-3.5 text-right tabular-nums">
                        <span className="font-semibold">{now}</span>
                        <span className="ml-2 inline-flex items-center text-xs text-paper/55">
                          {delta >= 0 ? <ArrowUpRight className="h-3 w-3 text-volt" aria-hidden="true" /> : <ArrowDownRight className="h-3 w-3" aria-hidden="true" />}
                          {Math.abs(delta)}
                          <span className="sr-only">{delta >= 0 ? " places up" : " places down"} since {d.months[0]}</span>
                        </span>
                      </td>
                      <td className="px-3 py-3.5 text-right tabular-nums text-paper/70">{k.impressions.toLocaleString("en-CA")}</td>
                      <td className="px-5 py-3.5 text-right tabular-nums text-paper/70">{k.clicks}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* selected keyword detail */}
        <div className="p-5 sm:p-6 lg:col-span-5">
          <p className="label text-paper/55">Average position · selected keyword</p>
          <p className="mt-2 text-lg font-medium">“{kw.keyword}”</p>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-5xl font-semibold tracking-[-0.05em] tabular-nums">{current}</span>
            <span className="text-sm text-paper/55">from {start} in {d.months[0]}</span>
          </div>
          <PositionChart key={kw.keyword} data={kw.history} labels={d.months} />
        </div>
      </div>

      <div className="grid border-t border-paper/10 sm:grid-cols-3">
        <MiniBars title="Organic visits / month" data={d.traffic} labels={d.months} />
        <MiniBars title="Quote requests / month" data={d.leads} labels={d.months} className="sm:border-l sm:border-paper/10" />
        <div className="border-t border-paper/10 p-5 sm:border-l sm:border-t-0 sm:p-6">
          <p className="label text-paper/55">Core Web Vitals (sample)</p>
          <dl className="mt-4 grid grid-cols-3 gap-3">
            {[
              ["LCP", d.vitals.lcp],
              ["CLS", d.vitals.cls],
              ["INP", d.vitals.inp],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs text-paper/50">{k}</dt>
                <dd className="mt-1 text-xl font-semibold tabular-nums">{v}</dd>
                <dd className="mt-1 inline-flex items-center gap-1 text-xs text-paper/55">
                  <span className="h-1.5 w-1.5 rounded-full bg-volt" aria-hidden="true" /> Good
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

function Spark({ data }: { data: number[] }) {
  const w = 72,
    h = 24,
    max = Math.max(...data),
    min = Math.min(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, 3 + ((v - min) / (max - min || 1)) * (h - 6)]);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <polyline points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke="#C9F26B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.5" fill="#C9F26B" />
    </svg>
  );
}

/** Position over time. Lower is better, so position 1 sits at the top. */
function PositionChart({ data, labels }: { data: number[]; labels: string[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const id = useId();
  const W = 420,
    H = 180,
    pl = 28,
    pr = 12,
    pt = 12,
    pb = 26;
  const maxPos = Math.ceil(Math.max(...data, 10) / 10) * 10;
  const x = (i: number) => pl + (i / (data.length - 1)) * (W - pl - pr);
  const y = (v: number) => pt + ((v - 1) / (maxPos - 1)) * (H - pt - pb);
  const path = data.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  const ticks = [1, Math.round(maxPos / 2), maxPos];
  return (
    <div className="relative mt-6">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-labelledby={`${id}-t`}>
        <title id={`${id}-t`}>{`Average position by month: ${data.map((v, i) => `${labels[i]} ${v}`).join(", ")}`}</title>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pl} x2={W - pr} y1={y(t)} y2={y(t)} stroke="rgba(243,241,234,.08)" />
            <text x={pl - 8} y={y(t) + 4} textAnchor="end" fontSize="10" fill="rgba(243,241,234,.45)" fontFamily="var(--font-mono)">
              {t}
            </text>
          </g>
        ))}
        {labels.map((l, i) => (
          <text key={l} x={x(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="rgba(243,241,234,.45)" fontFamily="var(--font-mono)">
            {l}
          </text>
        ))}
        <path d={`${path} L${x(data.length - 1)},${H - pb} L${x(0)},${H - pb} Z`} fill="url(#fade)" opacity="0.5" />
        <defs>
          <linearGradient id="fade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#C9F26B" stopOpacity="0.25" />
            <stop offset="1" stopColor="#C9F26B" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={path} fill="none" stroke="#C9F26B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {hover !== null ? <line x1={x(hover)} x2={x(hover)} y1={pt} y2={H - pb} stroke="rgba(243,241,234,.3)" /> : null}
        {data.map((v, i) => (
          <g key={i}>
            <circle cx={x(i)} cy={y(v)} r={hover === i || i === data.length - 1 ? 5 : 3.5} fill="#C9F26B" stroke="#17191A" strokeWidth="2" />
            <rect
              x={x(i) - 24}
              y={pt}
              width="48"
              height={H - pt - pb}
              fill="transparent"
              tabIndex={0}
              role="img"
              aria-label={`${labels[i]}: position ${v}`}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              style={{ outline: "none" }}
            />
          </g>
        ))}
      </svg>
      {hover !== null ? (
        <div
          className="pointer-events-none absolute -translate-x-1/2 rounded-lg border border-paper/10 bg-ink px-3 py-2 text-xs shadow-xl"
          style={{ left: `${(x(hover) / W) * 100}%`, top: `${(y(data[hover]) / H) * 100 - 30}%` }}
        >
          <p className="font-semibold text-paper tabular-nums">#{data[hover]}</p>
          <p className="text-paper/55">{labels[hover]}</p>
        </div>
      ) : null}
    </div>
  );
}

function MiniBars({ title, data, labels, className }: { title: string; data: number[]; labels: string[]; className?: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...data);
  const last = data[data.length - 1];
  return (
    <div className={clsx("border-t border-paper/10 p-5 sm:border-t-0 sm:p-6", className)}>
      <p className="label text-paper/55">{title}</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums tracking-[-0.04em]">{hover !== null ? data[hover] : last}</p>
      <p className="text-xs text-paper/50">{hover !== null ? labels[hover] : `${labels[labels.length - 1]} (latest)`}</p>
      <div className="mt-4 flex h-20 items-end gap-[2px]" role="list" aria-label={title}>
        {data.map((v, i) => (
          <div
            key={i}
            role="listitem"
            tabIndex={0}
            aria-label={`${labels[i]}: ${v}`}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
            className="flex h-full flex-1 items-end"
          >
            <div
              className={clsx("w-full rounded-t-[4px] transition-colors", hover === i || (hover === null && i === data.length - 1) ? "bg-volt" : "bg-volt/40")}
              style={{ height: `${(v / max) * 100}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
