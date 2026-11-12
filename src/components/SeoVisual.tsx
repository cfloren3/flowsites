import clsx from "clsx";
import { Search, TrendingUp } from "lucide-react";
import type { SeoSearch } from "@/content/projects";

/**
 * Designed ranking visual for SEO case studies (used instead of site screenshots).
 * Only the client's own result is shown; other results are neutral placeholder bars.
 */
export function SeoVisual({ searches, className, compact = false }: { searches: SeoSearch[]; className?: string; compact?: boolean }) {
  const [main, second] = searches;
  return (
    <div className={clsx("relative", className)}>
      <ResultsCard search={main} compact={compact} />
      {second && !compact ? (
        <div className="absolute -bottom-8 right-0 w-[58%] max-w-[340px] md:-right-4">
          <ResultsCard search={second} compact rows={3} />
        </div>
      ) : null}
      {!compact ? (
        <p className="label mt-12 max-w-[38%] !text-[0.62rem] leading-relaxed text-current opacity-60">Illustration of client-reported Google rankings</p>
      ) : null}
    </div>
  );
}

function ResultsCard({ search, compact, rows = 5 }: { search: SeoSearch; compact?: boolean; rows?: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-paper text-ink shadow-[0_40px_80px_-30px_rgba(11,27,51,.45)]">
      <div className={clsx("border-b border-ink/10", compact ? "p-2.5" : "p-3.5")}>
        <div className="flex items-center gap-2 rounded-full border border-ink/10 px-3.5 py-2 text-sm">
          <Search className="h-4 w-4 shrink-0 text-ink/60" aria-hidden="true" />
          <span className="truncate font-medium">{search.query}</span>
        </div>
      </div>
      <ol className={clsx(compact ? "space-y-1.5 p-2.5" : "space-y-2 p-3.5")} aria-label={`Google results for ${search.query}`}>
        {Array.from({ length: rows }, (_, i) => i + 1).map((pos) =>
          pos === search.rank ? (
            <li key={pos} className="flex items-center gap-3 rounded-xl bg-volt/15 p-2.5 ring-1 ring-volt">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-volt text-sm font-semibold text-ink">{pos}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-stone">{search.url}</p>
                <p className="truncate text-sm font-semibold text-[#1a0dab] sm:text-[0.95rem]">{search.title}</p>
              </div>
              {!compact ? (
                <span className="hidden shrink-0 items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-xs font-medium text-paper sm:inline-flex">
                  <TrendingUp className="h-3.5 w-3.5 text-volt" aria-hidden="true" /> #{pos}
                </span>
              ) : null}
            </li>
          ) : (
            <li key={pos} className="flex items-center gap-3 p-2.5" aria-hidden="true">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink/5 text-sm text-ink/40">{pos}</span>
              <div className="flex-1 space-y-1.5">
                <span className="block h-2 w-1/3 rounded bg-ink/[0.07]" />
                <span className="block h-2.5 w-2/3 rounded bg-ink/10" />
              </div>
            </li>
          ),
        )}
      </ol>
    </div>
  );
}
