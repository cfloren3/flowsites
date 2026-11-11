"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { industryOptions, interestOptions, validateInquiry, type FieldErrors } from "@/lib/inquiry";
import { site } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error";
const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function InquiryForm({
  interest = "preview",
  submitLabel = "Get my free website preview",
  dark = false,
}: {
  interest?: keyof typeof interestOptions;
  submitLabel?: string;
  dark?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [delivery, setDelivery] = useState("");
  const [chosenInterest, setChosenInterest] = useState<string>(interest);
  const started = useRef<number>(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    started.current = Date.now();
    const q = new URLSearchParams(window.location.search).get("interest");
    if (q && q in interestOptions) setChosenInterest(q);
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries()) as Record<string, string>;
    const { errors: errs } = validateInquiry(payload);
    if (Object.keys(errs).length) {
      setErrors(errs);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, started: started.current, turnstile: payload["cf-turnstile-response"] }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setDelivery(json.delivery ?? "");
        setStatus("success");
      } else {
        if (json.errors) setErrors(json.errors);
        setServerError(json.error ?? "Please check the highlighted fields.");
        setStatus("error");
      }
    } catch {
      setServerError("Network error. Please try again, or email us directly.");
      setStatus("error");
    }
  }

  const fieldCls = clsx(
    "peer w-full rounded-xl border bg-transparent px-4 pb-2.5 pt-6 text-[1rem] outline-none transition-colors placeholder-transparent",
    dark ? "border-paper/15 text-paper focus:border-volt" : "border-ink/15 text-ink focus:border-ink",
  );
  const labelCls = clsx(
    "pointer-events-none absolute left-4 top-2 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[0.98rem] peer-focus:top-2 peer-focus:text-xs",
    dark ? "text-paper/50" : "text-stone",
  );
  const err = (k: keyof FieldErrors) =>
    errors[k] ? (
      <p id={`${k}-err`} className={clsx("mt-1.5 text-sm", dark ? "text-[#ffb59e]" : "text-[#b42318]")}>
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof FieldErrors) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="ok"
            ref={successRef}
            tabIndex={-1}
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={clsx("rounded-3xl p-8 outline-none md:p-12", dark ? "bg-paper/5" : "bg-paper-2")}
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}>
              <CheckCircle2 className="h-14 w-14 fill-volt text-ink" aria-hidden="true" />
            </motion.div>
            <h3 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">Thanks, we&apos;ve got it.</h3>
            <p className={clsx("mt-3 max-w-md leading-relaxed", dark ? "text-paper/70" : "text-stone")}>
              We&apos;ll review your business and reply {site.responseTime} with next steps. If you don&apos;t see our reply, check your spam folder or email{" "}
              <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                {site.email}
              </a>
              .
            </p>
            {delivery === "local-dev" ? (
              <p className="label mt-6 rounded-lg bg-ink/5 p-3 !normal-case !tracking-normal text-stone">
                Development mode: saved to .data/inquiries.jsonl. Configure RESEND_API_KEY and INQUIRY_TO_EMAIL to deliver by email.
              </p>
            ) : null}
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0, y: -10 }} className="space-y-4" aria-describedby="form-note">
            {Object.keys(errors).length > 0 || serverError ? (
              <div
                ref={summaryRef}
                tabIndex={-1}
                role="alert"
                className={clsx("rounded-xl border p-4 text-sm outline-none", dark ? "border-[#ffb59e]/40 text-[#ffb59e]" : "border-[#b42318]/30 bg-[#b42318]/5 text-[#b42318]")}
              >
                {serverError || `Please fix ${Object.keys(errors).length} field${Object.keys(errors).length > 1 ? "s" : ""} below.`}
              </div>
            ) : null}

            <fieldset>
              <legend className={clsx("label mb-3", dark ? "text-paper/50" : "text-stone")}>I&apos;m interested in</legend>
              <div className="flex flex-wrap gap-2">
                {(["preview", "review", "local-seo", "website-care", "general"] as const).map((k) => (
                  <label
                    key={k}
                    className={clsx(
                      "cursor-pointer rounded-full border px-3.5 py-2 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2",
                      chosenInterest === k
                        ? dark
                          ? "border-volt bg-volt text-ink"
                          : "border-ink bg-ink text-paper"
                        : dark
                          ? "border-paper/15 text-paper/70 hover:border-paper/40"
                          : "border-ink/15 text-ink/70 hover:border-ink/40",
                    )}
                  >
                    <input type="radio" name="interest" value={k} checked={chosenInterest === k} onChange={() => setChosenInterest(k)} className="sr-only" />
                    {interestOptions[k]}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative">
                <input id="f-name" name="name" autoComplete="name" required placeholder="Your name" className={fieldCls} {...a11y("name")} />
                <label htmlFor="f-name" className={labelCls}>Your name</label>
                {err("name")}
              </div>
              <div className="relative">
                <input id="f-business" name="business" autoComplete="organization" required placeholder="Business name" className={fieldCls} {...a11y("business")} />
                <label htmlFor="f-business" className={labelCls}>Business name</label>
                {err("business")}
              </div>
              <div className="relative">
                <input id="f-email" name="email" type="email" autoComplete="email" required placeholder="Email" className={fieldCls} {...a11y("email")} />
                <label htmlFor="f-email" className={labelCls}>Email</label>
                {err("email")}
              </div>
              <div className="relative">
                <input id="f-phone" name="phone" type="tel" autoComplete="tel" placeholder="Phone (optional)" className={fieldCls} {...a11y("phone")} />
                <label htmlFor="f-phone" className={labelCls}>Phone (optional)</label>
                {err("phone")}
              </div>
              <div className="relative">
                <input id="f-website" name="website" inputMode="url" autoComplete="url" placeholder="Current website (optional)" className={fieldCls} {...a11y("website")} />
                <label htmlFor="f-website" className={labelCls}>Current website (optional)</label>
                {err("website")}
              </div>
              <div className="relative">
                <select id="f-industry" name="industry" required defaultValue="" className={clsx(fieldCls, "appearance-none pr-10 [&:invalid]:text-transparent")} {...a11y("industry")}>
                  <option value="" disabled>
                    Choose…
                  </option>
                  {industryOptions.map((o) => (
                    <option key={o} value={o} className="text-ink">
                      {o}
                    </option>
                  ))}
                </select>
                <label htmlFor="f-industry" className={clsx(labelCls, "!top-2 !text-xs")}>Industry</label>
                <span aria-hidden="true" className="pointer-events-none absolute right-4 top-5 text-sm opacity-50">▾</span>
                {err("industry")}
              </div>
              <div className="relative sm:col-span-2">
                <input id="f-location" name="location" autoComplete="address-level2" required placeholder="Service location" className={fieldCls} {...a11y("location")} />
                <label htmlFor="f-location" className={labelCls}>Where do you work? (e.g. Guelph &amp; Wellington County)</label>
                {err("location")}
              </div>
              <div className="relative sm:col-span-2">
                <textarea id="f-improve" name="improve" rows={4} required placeholder="What would you like to improve?" className={clsx(fieldCls, "resize-y")} {...a11y("improve")} />
                <label htmlFor="f-improve" className={labelCls}>What would you like to improve?</label>
                {err("improve")}
              </div>
            </div>

            {/* Honeypot */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="f-company-url">Leave this field empty</label>
              <input id="f-company-url" name="company_url" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            {TURNSTILE_KEY ? (
              <>
                <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
                <div className="cf-turnstile" data-sitekey={TURNSTILE_KEY} data-theme={dark ? "dark" : "light"} />
              </>
            ) : null}

            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "submitting"}
                className={clsx(
                  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-4 font-medium transition-colors disabled:opacity-70",
                  dark ? "bg-volt text-ink hover:bg-[#d6f78a]" : "bg-ink text-paper hover:bg-ink-3",
                )}
              >
                {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                {status === "submitting" ? "Sending…" : submitLabel}
                {status !== "submitting" ? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /> : null}
              </button>
              <p id="form-note" className={clsx("text-sm", dark ? "text-paper/50" : "text-stone")}>
                No obligation. We reply {site.responseTime}.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
