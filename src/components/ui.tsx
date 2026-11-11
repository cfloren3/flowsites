import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode, CSSProperties } from "react";
import { evidenceMeta, type Evidence } from "@/content/evidence";

/** Headline whose words rise from a mask. Wrap accent words in *asterisks*. Use \n for line breaks. */
export function SplitText({
  text,
  as: Tag = "h2",
  className,
  accentClassName = "text-stone",
  delay = 0,
  id,
  immediate = false,
}: {
  immediate?: boolean;
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  accentClassName?: string;
  delay?: number;
  id?: string;
}) {
  let i = 0;
  const lines = text.split("\n");
  return (
    <Tag id={id} className={clsx(immediate ? "split-now" : "split", className)} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((raw, wi) => {
            const accent = raw.startsWith("*") && raw.replace(/[.,!?]$/, "").endsWith("*");
            const word = raw.replace(/\*/g, "");
            const idx = i++;
            return (
              <span key={wi}>
                <span className="w">
                  <span style={{ "--i": idx } as CSSProperties} className={accent ? accentClassName : undefined}>
                    {word}
                  </span>
                </span>
                {wi < line.split(" ").length - 1 ? " " : null}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  variant,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade" | "scale";
  as?: "div" | "section" | "li" | "article" | "p" | "span";
}) {
  return (
    <Tag data-reveal={variant ?? ""} className={className} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, className, dark }: { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <p className={clsx("label flex items-center gap-2", dark ? "text-paper/60" : "text-stone", className)}>
      <span className={clsx("h-1.5 w-1.5 rounded-full", dark ? "bg-volt" : "bg-ink")} aria-hidden="true" />
      {children}
    </p>
  );
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "accent" | "ghost" | "light" | "outline-light";
  className?: string;
  external?: boolean;
  icon?: boolean;
  size?: "md" | "lg";
};

export function Button({ href, children, variant = "primary", className, external, icon = true, size = "md" }: BtnProps) {
  const cls = clsx(
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-[background,color,transform,box-shadow] duration-300 ease-[var(--ease-flow)] active:scale-[0.98] min-h-11",
    size === "lg" ? "px-7 py-4 text-[1.02rem]" : "px-5 py-3 text-[0.95rem]",
    variant === "primary" && "bg-ink text-paper hover:bg-ink-3",
    variant === "accent" && "bg-volt text-ink hover:bg-[#d6f78a] shadow-[0_0_0_0_rgba(201,242,107,0)] hover:shadow-[0_10px_40px_-10px_rgba(201,242,107,.6)]",
    variant === "ghost" && "text-ink border border-ink/15 hover:border-ink/40 bg-transparent",
    variant === "light" && "bg-paper text-ink hover:bg-white",
    variant === "outline-light" && "text-paper border border-paper/20 hover:border-paper/50",
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      {icon ? (
        <span className="relative inline-flex h-4 w-4 overflow-hidden" aria-hidden="true">
          <ArrowUpRight className="absolute h-4 w-4 transition-transform duration-500 ease-[var(--ease-flow)] group-hover:translate-x-4 group-hover:-translate-y-4" />
          <ArrowUpRight className="absolute h-4 w-4 -translate-x-4 translate-y-4 transition-transform duration-500 ease-[var(--ease-flow)] group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      ) : null}
    </>
  );
  if (external)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function TextLink({ href, children, className, external }: { href: string; children: ReactNode; className?: string; external?: boolean }) {
  const cls = clsx(
    "group inline-flex items-center gap-1.5 font-medium underline decoration-1 underline-offset-[6px] decoration-current/0 hover:decoration-current transition-colors",
    className,
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}

const statusStyles: Record<Evidence["status"], string> = {
  verified: "bg-volt text-ink border-transparent",
  "client-reported": "bg-transparent text-inherit border-current/30",
  historical: "bg-transparent text-inherit border-current/30 border-dashed",
  unverified: "bg-transparent text-inherit border-current/30 border-dotted opacity-80",
};

export function EvidenceBadge({ evidence, className }: { evidence: Evidence; className?: string }) {
  const meta = evidenceMeta[evidence.status];
  const detail = [meta.description, evidence.source && `Source: ${evidence.source}`, evidence.checked && `Checked: ${evidence.checked}`, evidence.note]
    .filter(Boolean)
    .join(" · ");
  return (
    <span
      title={detail}
      className={clsx("label inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 !text-[0.64rem] whitespace-nowrap", statusStyles[evidence.status], className)}
    >
      <span
        aria-hidden="true"
        className={clsx("h-1.5 w-1.5 rounded-full", evidence.status === "verified" ? "bg-ink" : "bg-current opacity-60")}
      />
      {meta.label}
      <span className="sr-only">: {detail}</span>
    </span>
  );
}

export function Section({
  children,
  className,
  dark,
  id,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
  ariaLabel?: string;
}) {
  return (
    <section id={id} aria-label={ariaLabel} className={clsx("relative", dark && "on-dark bg-ink text-paper", className)}>
      {children}
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  lede,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={clsx("container-x pt-36 pb-14 md:pt-48 md:pb-20", className)}>
      <div className="rise-in">
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <SplitText
        immediate
        as="h1"
        text={title}
        className={clsx(
          "display mt-6",
          title.replace(/\*/g, "").length > 38 ? "max-w-[20ch] text-[clamp(2.5rem,5.6vw,5.4rem)]" : "max-w-[16ch] text-[clamp(2.9rem,8vw,7.5rem)]",
        )}
      />
      {lede ? (
        <p className="lede rise-in mt-8 max-w-2xl text-stone" style={{ "--d": "250ms" } as CSSProperties}>
          {lede}
        </p>
      ) : null}
      {children}
    </header>
  );
}
