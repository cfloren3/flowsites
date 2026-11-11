import clsx from "clsx";

/** The Flowsites mark: one continuous line rising into momentum. */
export function LogoMark({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={clsx("shrink-0", className)}>
      <rect width="32" height="32" rx="9" fill={inverted ? "var(--p-accent)" : "var(--p-ink)"} />
      <path
        d="M7.5 22.5c3.2 0 4.6-2.2 6-5.1 1.5-3.1 3-5.9 7.2-5.9h3.8"
        fill="none"
        stroke={inverted ? "var(--p-ink)" : "var(--p-accent)"}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path d="M21.3 8.2l3.6 3.3-3.6 3.3" fill="none" stroke={inverted ? "var(--p-ink)" : "var(--p-accent)"} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={clsx("inline-flex items-center gap-2", className)}>
      <LogoMark className="h-7 w-7" inverted={inverted} />
      <span className="text-[1.3rem] font-semibold tracking-[-0.06em] leading-none">flowsites</span>
    </span>
  );
}
