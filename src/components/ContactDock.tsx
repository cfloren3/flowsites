"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import { ArrowUpRight, CheckCircle2, Loader2, Mail, MessageCircle, X } from "lucide-react";
import { site } from "@/content/site";
import { validateInquiry, type FieldErrors } from "@/lib/inquiry";

/** Floating contact button available on every page, opening a quick-message panel. */
export function ContactDock() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const started = useRef(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  // Stay out of the way of the hero's own call to action: appear once the visitor scrolls.
  useEffect(() => {
    const on = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    started.current = Date.now();
    const t = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("input,a,button")?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (pathname === "/contact") return null;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");
    const payload = { ...Object.fromEntries(new FormData(e.currentTarget).entries()), quick: "1", interest: "general" } as Record<string, string>;
    const { errors: errs } = validateInquiry(payload);
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
        body: JSON.stringify({ ...payload, started: started.current }),
      });
      const json = await res.json();
      if (res.ok && json.ok) setStatus("sent");
      else {
        if (json.errors) setErrors(json.errors);
        setServerError(json.error ?? "Please check the fields above.");
        setStatus("error");
      }
    } catch {
      setServerError("Network error. Please email us instead.");
      setStatus("error");
    }
  }

  const field = "w-full rounded-xl border border-ink/15 bg-paper px-3.5 py-2.5 text-[0.95rem] outline-none focus:border-ink";
  const err = (k: keyof FieldErrors) =>
    errors[k] ? (
      <p id={`dock-${k}-err`} className="mt-1 text-xs text-[#b42318]">
        {errors[k]}
      </p>
    ) : null;

  return (
    <div
      className={clsx(
        "fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 transition-[opacity,transform] duration-500 md:bottom-6 md:right-6",
        visible || open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            id="contact-dock"
            role="dialog"
            aria-modal="false"
            aria-labelledby="dock-title"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="w-[min(380px,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-ink/10 bg-paper text-ink shadow-[0_30px_80px_-20px_rgba(11,27,51,.45)]"
            data-lenis-prevent
          >
            <div className="on-dark bg-ink px-5 pb-5 pt-5 text-paper">
              <p className="label text-volt">We reply {site.responseTime}</p>
              <p id="dock-title" className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                Let&apos;s <span className="serif text-volt">talk.</span>
              </p>
              <p className="mt-1 text-sm text-paper/70">Ask a question, request a quote, or get your free website preview.</p>
            </div>

            {status === "sent" ? (
              <div className="p-5" role="status">
                <CheckCircle2 className="h-10 w-10 text-volt-ink" aria-hidden="true" />
                <p className="mt-3 text-lg font-semibold tracking-[-0.02em]">Thanks, message received.</p>
                <p className="mt-1 text-sm text-stone">We&apos;ll get back to you {site.responseTime}.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-3 p-5">
                <div>
                  <label htmlFor="dock-name" className="sr-only">
                    Your name
                  </label>
                  <input id="dock-name" name="name" autoComplete="name" placeholder="Your name" className={field} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? "dock-name-err" : undefined} />
                  {err("name")}
                </div>
                <div>
                  <label htmlFor="dock-email" className="sr-only">
                    Email
                  </label>
                  <input id="dock-email" name="email" type="email" autoComplete="email" placeholder="Email" className={field} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? "dock-email-err" : undefined} />
                  {err("email")}
                </div>
                <div>
                  <label htmlFor="dock-msg" className="sr-only">
                    Message
                  </label>
                  <textarea id="dock-msg" name="improve" rows={3} placeholder="How can we help? (Your business, your website…)" className={clsx(field, "resize-none")} aria-invalid={errors.improve ? true : undefined} aria-describedby={errors.improve ? "dock-improve-err" : undefined} />
                  {err("improve")}
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
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink-3 disabled:opacity-70"
                >
                  {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}

            <div className="grid grid-cols-2 gap-px border-t border-ink/10 bg-ink/10">
              <Link href="/free-website-preview" className="flex min-h-12 items-center justify-center gap-1.5 bg-paper px-3 text-sm font-medium hover:bg-paper-2">
                Free preview <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href={`mailto:${site.email}`} className="flex min-h-12 items-center justify-center gap-1.5 bg-paper px-3 text-sm font-medium hover:bg-paper-2">
                <Mail className="h-4 w-4" aria-hidden="true" /> Email us
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="contact-dock"
        aria-label={open ? "Close contact panel" : "Contact us"}
        tabIndex={visible || open ? 0 : -1}
        className={clsx(
          "group relative inline-flex h-14 items-center gap-2 rounded-full px-3 font-medium sm:pl-4 sm:pr-5 shadow-[0_18px_40px_-12px_rgba(11,27,51,.55)] transition-all duration-300",
          open ? "bg-ink text-paper" : "bg-volt text-ink hover:-translate-y-0.5",
        )}
      >
        {!open && !reduce ? <span aria-hidden="true" className="absolute inset-0 rounded-full bg-volt opacity-40 motion-safe:animate-ping [animation-duration:2.6s]" /> : null}
        <span className="relative grid h-8 w-8 place-items-center rounded-full bg-ink text-paper group-[.bg-ink]:bg-paper/10">
          {open ? <X className="h-4 w-4" aria-hidden="true" /> : <MessageCircle className="h-4 w-4" aria-hidden="true" />}
        </span>
        <span className={clsx("relative text-sm", !open && "max-sm:sr-only")}>{open ? "Close" : "Contact us"}</span>
      </button>
    </div>
  );
}
