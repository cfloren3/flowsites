"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, CheckCircle2, Loader2, X } from "lucide-react";
import { site } from "@/content/site";
import { validateInquiry, type FieldErrors } from "@/lib/inquiry";

const DELAY_MS = 15_000;
const SNOOZE_DAYS = 7;
const KEY_DISMISSED = "fs-preview-popup-dismissed";
const KEY_SESSION = "fs-preview-popup-shown";
const HIDDEN_ON = ["/free-website-preview", "/contact"];

function canShow() {
  try {
    if (sessionStorage.getItem(KEY_SESSION)) return false;
    const d = Number(localStorage.getItem(KEY_DISMISSED) || 0);
    if (d && Date.now() - d < SNOOZE_DAYS * 864e5) return false;
  } catch {}
  return true;
}

/** Free-preview offer shown once per visit, 15 seconds after arrival. */
export function PreviewPopup() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const openedAt = useRef(0);
  const hidden = HIDDEN_ON.includes(pathname);

  // Timer: 15s after first arrival (not reset by page navigation).
  useEffect(() => {
    if (!canShow()) return;
    let t: number;
    const tryOpen = () => {
      if (!canShow() || HIDDEN_ON.includes(window.location.pathname)) return;
      const active = document.activeElement;
      if (active && ["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName)) {
        t = window.setTimeout(tryOpen, 5000); // visitor is typing elsewhere; wait
        return;
      }
      lastFocus.current = active as HTMLElement | null;
      openedAt.current = Date.now();
      setOpen(true);
      try {
        sessionStorage.setItem(KEY_SESSION, "1");
      } catch {}
    };
    t = window.setTimeout(tryOpen, DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  const close = useCallback(
    (remember = true) => {
      setOpen(false);
      if (remember && status !== "sent") {
        try {
          localStorage.setItem(KEY_DISMISSED, String(Date.now()));
        } catch {}
      }
      window.setTimeout(() => lastFocus.current?.focus?.(), 50);
    },
    [status],
  );

  // Focus management, Escape to close, simple focus trap.
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => dialogRef.current?.querySelector<HTMLElement>("input")?.focus(), 80);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && dialogRef.current) {
        const f = [...dialogRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([tabindex="-1"])')];
        if (!f.length) return;
        const first = f[0],
          last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");
    const fd = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const payload = {
      ...fd,
      quick: "1",
      interest: "preview",
      improve: `Free website preview request (popup)${fd.website ? ` · current site: ${fd.website}` : ""}`,
    };
    const { errors: errs } = validateInquiry(payload);
    if (!fd.business || fd.business.trim().length < 2) errs.business = "Please enter your business name.";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, started: openedAt.current }),
      });
      const json = await res.json();
      if (res.ok && json.ok) setStatus("sent");
      else {
        if (json.errors) setErrors(json.errors);
        setServerError(json.error ?? "Please check the fields above.");
        setStatus("error");
      }
    } catch {
      setServerError("Network error. Please try the full form instead.");
      setStatus("error");
    }
  }

  const field = "w-full rounded-xl border border-ink/15 bg-paper px-3.5 py-3 text-[0.95rem] outline-none focus:border-ink";
  const err = (k: keyof FieldErrors) =>
    errors[k] ? (
      <p id={`pp-${k}-err`} className="mt-1 text-xs text-[#b42318]">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof FieldErrors) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `pp-${k}-err` : undefined });

  return (
    <AnimatePresence>
      {open && !hidden ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center p-3 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button type="button" aria-label="Close" tabIndex={-1} onClick={() => close()} className="absolute inset-0 cursor-default bg-ink/60 backdrop-blur-sm" />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pp-title"
            aria-describedby="pp-desc"
            data-lenis-prevent
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid max-h-[92svh] w-full max-w-[860px] overflow-y-auto rounded-[28px] bg-paper text-ink shadow-[0_40px_120px_-20px_rgba(0,0,0,.6)] md:grid-cols-[1fr_1.1fr]"
          >
            <button
              type="button"
              onClick={() => close()}
              aria-label="Close free preview offer"
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-paper/90 text-ink shadow hover:bg-paper md:bg-paper-2"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Offer */}
            <div className="on-dark relative overflow-hidden bg-ink p-7 text-paper md:p-9">
              <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--p-accent)_35%,transparent),transparent)]" />
              <p className="label relative text-volt">Free website preview</p>
              <h2 id="pp-title" className="relative mt-4 text-[clamp(1.9rem,4vw,2.8rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
                See your new website <span className="serif text-volt">before you pay.</span>
              </h2>
              <p id="pp-desc" className="relative mt-4 text-paper/75 leading-relaxed">
                We&apos;ll design your homepage and send a private link. Love it, and websites start at $995 CAD. Don&apos;t, and you owe nothing.
              </p>
              <ul className="relative mt-6 space-y-2.5 text-sm">
                {["No deposit, no obligation", "Built with your services & reviews", "Planned for Google from day one"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5 text-paper/85">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-volt text-ink">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Form */}
            <div className="p-7 md:p-9">
              {status === "sent" ? (
                <div role="status" className="flex h-full flex-col justify-center">
                  <CheckCircle2 className="h-12 w-12 text-volt-ink" aria-hidden="true" />
                  <p className="mt-4 text-2xl font-semibold tracking-[-0.03em]">You&apos;re on the list.</p>
                  <p className="mt-2 text-stone">We&apos;ll be in touch {site.responseTime} to get what we need for your preview.</p>
                  <button type="button" onClick={() => close(false)} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper">
                    Keep browsing
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-3">
                  <p className="text-lg font-semibold tracking-[-0.02em]">Claim your free preview</p>
                  <p className="text-sm text-stone">Takes 30 seconds.</p>
                  <div className="pt-1">
                    <label htmlFor="pp-name" className="sr-only">Your name</label>
                    <input id="pp-name" name="name" autoComplete="name" placeholder="Your name" className={field} {...a11y("name")} />
                    {err("name")}
                  </div>
                  <div>
                    <label htmlFor="pp-business" className="sr-only">Business name</label>
                    <input id="pp-business" name="business" autoComplete="organization" placeholder="Business name" className={field} {...a11y("business")} />
                    {err("business")}
                  </div>
                  <div>
                    <label htmlFor="pp-email" className="sr-only">Email</label>
                    <input id="pp-email" name="email" type="email" autoComplete="email" placeholder="Email" className={field} {...a11y("email")} />
                    {err("email")}
                  </div>
                  <div>
                    <label htmlFor="pp-website" className="sr-only">Current website (optional)</label>
                    <input id="pp-website" name="website" inputMode="url" autoComplete="url" placeholder="Current website (optional)" className={field} {...a11y("website")} />
                    {err("website")}
                  </div>
                  <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <input name="company_url" tabIndex={-1} autoComplete="off" />
                  </div>
                  {serverError ? (
                    <p role="alert" className="text-sm text-[#b42318]">
                      {serverError}
                    </p>
                  ) : null}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-volt px-6 py-3.5 font-medium text-ink transition-colors hover:bg-volt-soft disabled:opacity-70"
                  >
                    {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                    {status === "sending" ? "Sending…" : "Get my free preview"}
                    {status !== "sending" ? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /> : null}
                  </button>
                  <div className="flex items-center justify-between gap-3 pt-1 text-sm">
                    <Link href="/free-website-preview" onClick={() => close(false)} className="underline underline-offset-4 text-stone hover:text-ink">
                      Tell us more instead
                    </Link>
                    <button type="button" onClick={() => close()} className="text-stone hover:text-ink">
                      No thanks
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
