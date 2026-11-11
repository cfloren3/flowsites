"use client";

import { useEffect, useState, type CSSProperties } from "react";
import clsx from "clsx";

/** Rolling-digit number: each digit spins into place when scrolled into view. Non-digits render as-is. */
export function RollingNumber({ value, className, delay = 0 }: { value: string; className?: string; delay?: number }) {
  let di = 0;
  return (
    <span className={clsx("roll inline-flex items-baseline", className)} style={{ "--d": `${delay}ms` } as CSSProperties}>
      <span className="sr-only">{value}</span>
      {value.split("").map((ch, i) => {
        if (!/\d/.test(ch))
          return (
            <span key={i} aria-hidden="true" className="whitespace-pre">
              {ch}
            </span>
          );
        const n = Number(ch);
        const idx = di++;
        return (
          <span key={i} className="digit" aria-hidden="true">
            <span style={{ "--n": n, "--i": idx } as CSSProperties}>
              {Array.from({ length: 10 }, (_, k) => (
                <span key={k}>{k}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

/** Terminal-style typewriter cycling through phrases, like a typed role line. */
export function Typewriter({
  prefix,
  words,
  className,
}: {
  prefix?: string;
  words: readonly string[];
  className?: string;
}) {
  const [wi, setWi] = useState(0);
  const [text, setText] = useState(words[0]);
  const [phase, setPhase] = useState<"hold" | "delete" | "type">("hold");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const word = words[wi];
    let t: number;
    if (phase === "hold") t = window.setTimeout(() => setPhase("delete"), 1900);
    else if (phase === "delete") {
      if (text.length === 0) {
        setWi((w) => (w + 1) % words.length);
        setPhase("type");
        return;
      }
      t = window.setTimeout(() => setText((s) => s.slice(0, -1)), 32);
    } else {
      const next = words[wi];
      if (text === next) {
        setPhase("hold");
        return;
      }
      t = window.setTimeout(() => setText(next.slice(0, text.length + 1)), 70);
    }
    void word;
    return () => window.clearTimeout(t);
  }, [phase, text, wi, words]);

  return (
    <p className={clsx("font-mono", className)}>
      <span aria-hidden="true" className="mr-2 opacity-50">
        ›
      </span>
      {prefix ? <span>{prefix} </span> : null}
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">{text}</span>
      <span className="type-caret" aria-hidden="true" />
    </p>
  );
}
