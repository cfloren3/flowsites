"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

export const palettes = [
  { id: "navy", label: "Navy, white & coral", swatch: ["#0b1b33", "#ffffff", "#ff6b57"] },
  { id: "ember", label: "Cream, black & burnt orange", swatch: ["#f4ede1", "#141210", "#d66a2c"] },
] as const;

type PaletteId = (typeof palettes)[number]["id"];

/** Small swatch toggle between the brand palettes. Choice persists per visitor. */
export function PaletteSwitcher({ className, dark }: { className?: string; dark?: boolean }) {
  const [active, setActive] = useState<PaletteId>("navy");
  useEffect(() => {
    setActive((document.documentElement.dataset.palette as PaletteId) || "navy");
  }, []);
  const choose = (id: PaletteId) => {
    setActive(id);
    if (id === "navy") delete document.documentElement.dataset.palette;
    else document.documentElement.dataset.palette = id;
    try {
      localStorage.setItem("fs-palette", id);
    } catch {}
  };
  return (
    <div role="radiogroup" aria-label="Colour palette" className={clsx("flex items-center gap-1.5", className)}>
      {palettes.map((p) => (
        <button
          key={p.id}
          type="button"
          role="radio"
          aria-checked={active === p.id}
          aria-label={p.label}
          title={p.label}
          onClick={() => choose(p.id)}
          className={clsx(
            "relative grid h-8 w-8 place-items-center rounded-full border transition-colors",
            active === p.id ? (dark ? "border-paper/60" : "border-ink/50") : "border-transparent hover:border-current/30",
          )}
        >
          <span className="flex h-5 w-5 overflow-hidden rounded-full ring-1 ring-black/10" aria-hidden="true">
            {p.swatch.map((c) => (
              <span key={c} className="h-full flex-1" style={{ background: c }} />
            ))}
          </span>
        </button>
      ))}
    </div>
  );
}
