"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";

/** Sticky mobile call-to-action. Hidden near forms and on conversion pages. */
export function MobileCta() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const hiddenRoute = pathname === "/free-website-preview" || pathname === "/contact";

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setFormVisible(visible.size > 0);
    });
    const t = window.setTimeout(() => document.querySelectorAll("form, footer").forEach((f) => io.observe(f)), 300);
    return () => {
      window.removeEventListener("scroll", on);
      window.clearTimeout(t);
      io.disconnect();
    };
  }, [pathname]);

  if (hiddenRoute) return null;
  const show = scrolled && !formVisible;
  return (
    <div
      className={clsx(
        "fixed inset-x-3 bottom-3 z-40 transition-all duration-500 ease-[var(--ease-flow)] lg:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0",
      )}
      aria-hidden={!show}
    >
      <Link
        href="/free-website-preview"
        tabIndex={show ? 0 : -1}
        className="flex items-center justify-between gap-3 rounded-full bg-ink py-2 pl-5 pr-2 text-paper shadow-[0_20px_40px_-12px_rgba(13,14,12,.5)]"
      >
        <span className="text-sm">
          <span className="font-medium">Free website preview</span>
          <span className="text-paper/55"> · starting at $750</span>
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-volt text-ink">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </Link>
    </div>
  );
}
