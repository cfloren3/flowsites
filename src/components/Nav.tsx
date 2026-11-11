"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import { Logo } from "./Logo";
import { nav, site } from "@/content/site";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 400 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/") || (href === "/work" && pathname.startsWith("/case-studies"));

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[var(--ease-flow)]",
          hidden && !open ? "-translate-y-[120%]" : "translate-y-0",
        )}
      >
        <div className="container-x pt-3 md:pt-4">
          <nav
            aria-label="Primary"
            className={clsx(
              "flex items-center justify-between rounded-full border pl-4 pr-2 py-2 transition-[background,border-color,box-shadow] duration-500",
              scrolled || open
                ? "bg-paper/85 backdrop-blur-xl border-ink/10 shadow-[0_8px_30px_-12px_rgba(13,14,12,.18)]"
                : "bg-paper/70 backdrop-blur-md border-ink/5",
            )}
          >
            <Link href="/" aria-label="Flowsites home" className="rounded-full">
              <Logo />
            </Link>
            <ul className="hidden lg:flex items-center gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={clsx(
                      "relative rounded-full px-3.5 py-2 text-[0.92rem] transition-colors",
                      isActive(n.href) ? "text-ink" : "text-ink/60 hover:text-ink",
                    )}
                  >
                    {n.label}
                    {isActive(n.href) ? <span className="absolute left-1/2 bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-ink" /> : null}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="hidden md:inline-flex rounded-full px-4 py-2.5 text-[0.92rem] text-ink/70 hover:text-ink"
              >
                Contact
              </Link>
              <Link
                href="/free-website-preview"
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[0.92rem] font-medium text-paper hover:bg-ink-3 transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-volt pulse-dot" aria-hidden="true" />
                Free preview
              </Link>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="lg:hidden relative h-11 w-11 rounded-full bg-ink text-paper grid place-items-center"
              >
                <span className="relative block h-3 w-5" aria-hidden="true">
                  <span className={clsx("absolute left-0 h-[2px] w-5 bg-paper transition-all duration-300", open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0")} />
                  <span className={clsx("absolute left-0 h-[2px] w-5 bg-paper transition-all duration-300", open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0")} />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 bg-ink text-paper lg:hidden on-dark"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container-x flex h-full flex-col pt-28 pb-10">
              <ul className="flex flex-col gap-1">
                {[{ label: "Home", href: "/" }, ...nav, { label: "Contact", href: "/contact" }].map((n, i) => (
                  <motion.li
                    key={n.href}
                    initial={reduce ? false : { y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={n.href}
                      className="flex items-baseline justify-between border-b border-paper/10 py-3 text-[2.1rem] font-semibold tracking-[-0.045em]"
                    >
                      {n.label}
                      <span className="label text-paper/55">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto space-y-4">
                <Link href="/free-website-preview" className="flex items-center justify-center gap-2 rounded-full bg-volt py-4 font-medium text-ink">
                  Get my free website preview
                </Link>
                <p className="label text-center text-paper/50">From $750 CAD · Love the design or don&apos;t pay</p>
                <p className="text-center text-sm text-paper/50">
                  <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                    {site.email}
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
