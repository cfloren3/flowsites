"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { site } from "@/content/site";
import { validateInquiry, type FieldErrors } from "@/lib/inquiry";
import { track } from "@/lib/track";

const steps = [
  {
    key: "industry",
    q: "What kind of business do you run?",
    options: ["Landscaping / lawn care", "Roofing", "Plumbing", "Electrical", "HVAC", "Contracting / renovation", "Cleaning", "Restaurant / café", "Something else"],
  },
  { key: "hasSite", q: "Do you currently have a website?", options: ["Yes", "No", "It needs improvement"] },
  { key: "goal", q: "What would you most like to improve?", options: ["Website appearance", "Google visibility", "More inquiries", "Online credibility", "Everything"] },
] as const;

type Answers = { industry?: string; hasSite?: string; goal?: string };

/** Short, guided free-preview request: three taps, then contact details. */
export function PreviewWizard({ dark = false, placement = "page" }: { dark?: boolean; placement?: string }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const started = useRef(0);
  const wrap = useRef<HTMLDivElement>(null);
  const total = steps.length + 1;

  useEffect(() => {
    started.current = Date.now();
  }, []);

  const go = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
    // Move focus to the new step for keyboard and screen-reader users.
    window.setTimeout(() => wrap.current?.querySelector<HTMLElement>("[data-step-focus]")?.focus({ preventScroll: true }), 380);
  };

  const choose = (key: keyof Answers, value: string) => {
    if (step === 0 && !answers.industry) track("preview_form_start", { placement });
    setAnswers((a) => ({ ...a, [key]: value }));
    track("preview_form_step", { step: step + 1, placement });
    go(step + 1);
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");
    const fd = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const payload = {
      ...fd,
      quick: "1",
      interest: "preview",
      industry: answers.industry ?? "",
      improve: `Wants to improve: ${answers.goal ?? "not specified"}. Has a website: ${answers.hasSite ?? "not specified"}.`,
    };
    const { errors: errs } = validateInquiry(payload);
    if (!fd.business || fd.business.trim().length < 2) errs.business = "Please enter your business name.";
    if (Object.keys(errs).length) {
      setErrors(errs);
      wrap.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
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
      if (res.ok && json.ok) {
        setStatus("sent");
        track("preview_request_submitted", { placement, industry: answers.industry, goal: answers.goal });
      } else {
        if (json.errors) setErrors(json.errors);
        setServerError(json.error ?? "Please check the fields above.");
        setStatus("error");
      }
    } catch {
      setServerError("Network error. Please try again, or email us directly.");
      setStatus("error");
    }
  }

  const chip = (selected: boolean) =>
    clsx(
      "min-h-12 rounded-2xl border px-4 py-3 text-left text-[0.98rem] font-medium transition-[background,border-color,transform] duration-200 active:scale-[0.98]",
      selected
        ? dark
          ? "border-volt bg-volt text-ink"
          : "border-ink bg-ink text-paper"
        : dark
          ? "border-paper/15 text-paper hover:border-paper/50 hover:bg-paper/[0.04]"
          : "border-ink/15 text-ink hover:border-ink/50 hover:bg-ink/[0.03]",
    );
  const field = clsx(
    "w-full rounded-xl border bg-transparent px-4 py-3 text-[1rem] outline-none transition-colors",
    dark ? "border-paper/15 text-paper placeholder:text-paper/45 focus:border-volt" : "border-ink/15 text-ink placeholder:text-ink/45 focus:border-ink",
  );
  const errText = dark ? "text-[#ffb59e]" : "text-[#b42318]";
  const err = (k: keyof FieldErrors) =>
    errors[k] ? (
      <p id={`wz-${k}-err`} className={clsx("mt-1 text-sm", errText)}>
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof FieldErrors) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `wz-${k}-err` : undefined });
  const muted = dark ? "text-paper/60" : "text-stone";

  if (status === "sent") {
    return (
      <div role="status" className="py-6">
        <motion.div initial={reduce ? false : { scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
          <CheckCircle2 className={clsx("h-14 w-14", dark ? "text-volt" : "text-volt-ink")} aria-hidden="true" />
        </motion.div>
        <p className="mt-5 text-3xl font-semibold tracking-[-0.04em]">You&apos;re in. We&apos;ll take it from here.</p>
        <p className={clsx("mt-3 max-w-md leading-relaxed", muted)}>
          We&apos;ll reply {site.responseTime} to gather what we need, then design your homepage preview. No payment, no obligation.
        </p>
      </div>
    );
  }

  return (
    <div ref={wrap}>
      {/* progress */}
      <div className="flex items-center gap-3">
        <div className="flex flex-1 gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={step + 1} aria-label={`Step ${step + 1} of ${total}`}>
          {Array.from({ length: total }, (_, i) => (
            <span key={i} className={clsx("h-1 flex-1 rounded-full transition-colors duration-500", i <= step ? "bg-volt" : dark ? "bg-paper/15" : "bg-ink/10")} />
          ))}
        </div>
        <span className={clsx("label shrink-0", muted)}>
          {step + 1} / {total}
        </span>
      </div>

      <div className="relative mt-6 min-h-[21rem]">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 28 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -28 * dir }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {step < steps.length ? (
              <fieldset>
                <legend tabIndex={-1} data-step-focus className="text-[clamp(1.4rem,2.6vw,1.9rem)] font-semibold leading-tight tracking-[-0.03em] outline-none">
                  {steps[step].q}
                </legend>
                <div className={clsx("mt-5 grid gap-2", steps[step].options.length > 5 ? "grid-cols-2 sm:grid-cols-3" : "sm:grid-cols-2")}>
                  {steps[step].options.map((o) => (
                    <button key={o} type="button" onClick={() => choose(steps[step].key, o)} aria-pressed={answers[steps[step].key] === o} className={chip(answers[steps[step].key] === o)}>
                      {o}
                    </button>
                  ))}
                </div>
              </fieldset>
            ) : (
              <form onSubmit={submit} noValidate>
                <p tabIndex={-1} data-step-focus className="text-[clamp(1.4rem,2.6vw,1.9rem)] font-semibold leading-tight tracking-[-0.03em] outline-none">
                  Where should we send your preview?
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="wz-name" className="sr-only">Your name</label>
                    <input id="wz-name" name="name" autoComplete="name" placeholder="Your name" className={field} {...a11y("name")} />
                    {err("name")}
                  </div>
                  <div>
                    <label htmlFor="wz-business" className="sr-only">Business name</label>
                    <input id="wz-business" name="business" autoComplete="organization" placeholder="Business name" className={field} {...a11y("business")} />
                    {err("business")}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="wz-email" className="sr-only">Email</label>
                    <input id="wz-email" name="email" type="email" autoComplete="email" placeholder="Email" className={field} {...a11y("email")} />
                    {err("email")}
                  </div>
                  <div>
                    <label htmlFor="wz-phone" className="sr-only">Phone (optional)</label>
                    <input id="wz-phone" name="phone" type="tel" autoComplete="tel" placeholder="Phone (optional)" className={field} {...a11y("phone")} />
                    {err("phone")}
                  </div>
                  <div>
                    <label htmlFor="wz-website" className="sr-only">Current website (optional)</label>
                    <input id="wz-website" name="website" inputMode="url" autoComplete="url" placeholder="Website (optional)" className={field} {...a11y("website")} />
                    {err("website")}
                  </div>
                </div>
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <input name="company_url" tabIndex={-1} autoComplete="off" />
                </div>
                {serverError ? (
                  <p role="alert" className={clsx("mt-3 text-sm", errText)}>
                    {serverError}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-volt px-6 py-4 font-medium text-ink transition-colors hover:bg-volt-soft disabled:opacity-70"
                >
                  {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                  {status === "sending" ? "Sending…" : "Get my free website preview"}
                  {status !== "sending" ? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /> : null}
                </button>
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={clsx("mt-4 flex items-center justify-between text-sm", muted)}>
        {step > 0 ? (
          <button type="button" onClick={() => go(step - 1)} className="inline-flex min-h-10 items-center gap-1.5 hover:underline underline-offset-4">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
          </button>
        ) : (
          <span>Takes under a minute</span>
        )}
        <span>No payment. No obligation.</span>
      </div>
    </div>
  );
}
