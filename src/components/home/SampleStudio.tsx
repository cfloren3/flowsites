"use client";

import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import { Phone, Star } from "lucide-react";
import { track } from "@/lib/track";
import { Button, Eyebrow, Reveal } from "../ui";
import { Magnetic } from "../Magnetic";

type Trade = {
  id: string;
  label: string;
  fallbackName: string;
  kicker: string;
  headline: [string, string];
  cta: string;
  nav: string[];
  chips: string[];
  bg: string;
  fg: string;
  accent: string;
  onAccent: string;
};

const trades: Trade[] = [
  { id: "landscaping", label: "Landscaping", fallbackName: "Your Landscaping Co.", kicker: "Landscaping · Your town", headline: ["Outdoor spaces", "worth coming home to."], cta: "Get a free quote", nav: ["Services", "Projects", "Reviews"], chips: ["Design & build", "Fully insured", "Free quotes"], bg: "#12241a", fg: "#f4f1e6", accent: "#d9b45a", onAccent: "#12241a" },
  { id: "roofing", label: "Roofing", fallbackName: "Your Roofing Co.", kicker: "Roofing · Your town", headline: ["Roofs done right.", "Quoted in 24 hours."], cta: "Book a free inspection", nav: ["Repairs", "Replacement", "Projects"], chips: ["Licensed & insured", "Workmanship warranty", "Emergency repairs"], bg: "#17181b", fg: "#f3f1ec", accent: "#f0a33a", onAccent: "#17181b" },
  { id: "plumbing", label: "Plumbing", fallbackName: "Your Plumbing Co.", kicker: "Plumbing · Your town", headline: ["Fast, tidy plumbing.", "Day or night."], cta: "Call a plumber now", nav: ["Emergency", "Drains", "Water heaters"], chips: ["24/7 call-outs", "Upfront pricing", "Licensed plumbers"], bg: "#0c2340", fg: "#f2f7fb", accent: "#5cc8f2", onAccent: "#0c2340" },
  { id: "electrical", label: "Electrical", fallbackName: "Your Electric Co.", kicker: "Electrical · Your town", headline: ["Licensed. Safe.", "On time."], cta: "Request a quote", nav: ["Residential", "Commercial", "EV chargers"], chips: ["ECRA/ESA licensed", "Panel upgrades", "EV chargers"], bg: "#111111", fg: "#f6f5f0", accent: "#f5d547", onAccent: "#111111" },
  { id: "hvac", label: "HVAC", fallbackName: "Your Heating & Cooling", kicker: "Heating & cooling · Your town", headline: ["Comfort,", "all year round."], cta: "Book a service call", nav: ["Furnaces", "Air conditioning", "Plans"], chips: ["Same-day service", "Maintenance plans", "Financing info"], bg: "#1b2630", fg: "#f2f5f6", accent: "#ff8a5c", onAccent: "#1b2630" },
  { id: "restaurant", label: "Restaurant", fallbackName: "Your Restaurant", kicker: "Kitchen & bar · Your town", headline: ["Fresh, local,", "worth the trip."], cta: "Book a table", nav: ["Menu", "Hours", "Private events"], chips: ["Open tonight", "Online menu", "Reservations"], bg: "#2a1215", fg: "#f7efe4", accent: "#e8c27a", onAccent: "#2a1215" },
];

/** "Picture your business here": a live, clearly-labelled sample that re-themes per trade and shows the visitor's own name. */
export function SampleStudio() {
  const reduce = useReducedMotion();
  const [tradeId, setTradeId] = useState(trades[0].id);
  const [name, setName] = useState("");
  const [touched, setTouched] = useState(false);
  const t = trades.find((x) => x.id === tradeId)!;
  const shown = name.trim() || t.fallbackName;
  const interact = (what: string) => {
    if (!touched) {
      setTouched(true);
      track("sample_studio_start", { via: what });
    }
  };

  return (
    <section id="sample" data-section="sample-studio" className="relative overflow-hidden bg-paper-2 py-24 md:py-32" aria-labelledby="studio-title">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="contents lg:col-span-5 lg:block">
          <div className="order-1">
          <Reveal>
            <Eyebrow>Try it</Eyebrow>
          </Reveal>
          <h2 id="studio-title" className="h-section mt-6 !text-[clamp(2.3rem,4.8vw,4.4rem)]">
            Picture your <span className="serif text-volt-ink">business</span> here.
          </h2>
          <p className="lede mt-6 max-w-md text-stone">Type your business name and pick your trade. This is the kind of first impression we build.</p>
          </div>

          <div className="order-3 lg:mt-8">
          <div>
            <label htmlFor="studio-name" className="label text-stone">
              Your business name
            </label>
            <input
              id="studio-name"
              value={name}
              maxLength={34}
              onChange={(e) => {
                setName(e.target.value);
                interact("name");
              }}
              placeholder="e.g. Northfield Roofing"
              autoComplete="organization"
              className="mt-2 w-full rounded-2xl border border-ink/15 bg-paper px-5 py-4 text-lg font-medium tracking-[-0.01em] outline-none transition-colors focus:border-ink"
            />
          </div>

          <fieldset className="mt-6">
            <legend className="label text-stone">Your trade</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {trades.map((x) => (
                <label
                  key={x.id}
                  className={clsx(
                    "cursor-pointer rounded-full border px-4 py-2.5 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2",
                    tradeId === x.id ? "border-ink bg-ink text-paper" : "border-ink/15 text-ink/75 hover:border-ink/40",
                  )}
                >
                  <input
                    type="radio"
                    name="studio-trade"
                    value={x.id}
                    checked={tradeId === x.id}
                    onChange={() => {
                      setTradeId(x.id);
                      interact("trade");
                    }}
                    className="sr-only"
                  />
                  {x.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button href="/free-website-preview" size="lg">
                Get my real preview, free
              </Button>
            </Magnetic>
            <p className="max-w-[16rem] text-sm text-stone">Your real preview is designed from scratch around your business.</p>
          </div>
          </div>
        </div>

        {/* Live sample */}
        <div className="order-2 lg:col-span-7" aria-live="polite" aria-label={`Sample website concept for ${shown}`}>
          <div className="relative">
            <div className="overflow-hidden rounded-[18px] border border-ink/10 shadow-[0_50px_100px_-40px_rgba(11,27,51,.5)]">
              <div className="flex items-center gap-3 border-b border-ink/10 bg-paper px-3.5 py-2.5">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </span>
                <span className="mx-auto max-w-[60%] truncate rounded-md bg-ink/5 px-3 py-1 font-mono text-[11px] text-ink/75">
                  {shown.toLowerCase().replace(/[^a-z0-9]+/g, "") || "yourbusiness"}.ca
                </span>
                <span className="w-[42px]" aria-hidden="true" />
              </div>
              <motion.div
                className="relative aspect-[16/11] overflow-hidden sm:aspect-[16/10]"
                animate={{ backgroundColor: t.bg, color: t.fg }}
                transition={{ duration: reduce ? 0 : 0.6 }}
                style={{ "--a": t.accent, "--oa": t.onAccent } as CSSProperties}
              >
                {/* abstract light + contour lines, no stock photography */}
                <div aria-hidden="true" className="absolute -right-[10%] -top-[30%] h-[120%] w-[70%] rounded-full opacity-25 blur-3xl transition-colors duration-700" style={{ background: t.accent }} />
                <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-[0.12]" viewBox="0 0 400 250" preserveAspectRatio="none">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <path key={i} d={`M-20 ${150 + i * 22} C 90 ${90 + i * 20}, 210 ${210 + i * 12}, 420 ${110 + i * 24}`} fill="none" stroke="currentColor" strokeWidth="1" />
                  ))}
                </svg>

                <div className="relative flex h-full flex-col p-[4.5%]">
                  <div className="flex items-center justify-between gap-3 text-[clamp(.55rem,1.15vw,.85rem)]">
                    <span className="min-w-0 truncate font-semibold tracking-[-0.02em]">{shown}</span>
                    <span className="hidden shrink-0 gap-[1.3em] opacity-75 sm:flex">
                      {t.nav.map((n) => (
                        <span key={n}>{n}</span>
                      ))}
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full px-[1em] py-[.45em] font-medium" style={{ background: "var(--a)", color: "var(--oa)" }}>
                      <Phone className="h-[1em] w-[1em]" aria-hidden="true" /> Call now
                    </span>
                  </div>

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={t.id}
                      initial={reduce ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -12 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="my-auto"
                    >
                      <p className="text-[clamp(.5rem,.95vw,.72rem)] uppercase tracking-[.14em] opacity-70">{t.kicker}</p>
                      <p className="mt-[2%] text-[clamp(1.5rem,4.6vw,3.9rem)] font-semibold leading-[.95] tracking-[-0.045em]">
                        {t.headline[0]}
                        <br />
                        <span className="serif" style={{ color: "var(--a)" }}>
                          {t.headline[1]}
                        </span>
                      </p>
                      <div className="mt-[4%] flex flex-wrap items-center gap-[2.5%] text-[clamp(.55rem,1.1vw,.85rem)]">
                        <span className="rounded-full px-[1.3em] py-[.7em] font-medium" style={{ background: "var(--a)", color: "var(--oa)" }}>
                          {t.cta} →
                        </span>
                        <span className="inline-flex items-center gap-1 opacity-85">
                          <span className="flex" style={{ color: "var(--a)" }}>
                            {[0, 1, 2, 3, 4].map((i) => (
                              <Star key={i} className="h-[1em] w-[1em] fill-current" aria-hidden="true" />
                            ))}
                          </span>
                          Your Google reviews
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="grid grid-cols-3 gap-[1.5%]">
                    {t.chips.map((c) => (
                      <div key={c} className="truncate rounded-[.6em] border border-current/15 bg-current/[0.06] px-[5%] py-[5%] text-[clamp(.5rem,.95vw,.74rem)]">
                        <span style={{ color: "var(--a)" }}>✓</span> {c}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* phone */}
            <motion.div
              className="absolute -bottom-8 -right-2 hidden w-[19%] rounded-[1.6rem] bg-[#0b0b0b] p-[5px] shadow-2xl ring-1 ring-white/10 sm:block md:-right-6"
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <motion.div className="flex aspect-[9/19] flex-col overflow-hidden rounded-[1.3rem] p-[9%]" animate={{ backgroundColor: t.bg, color: t.fg }} transition={{ duration: reduce ? 0 : 0.6 }}>
                <p className="truncate text-[clamp(.4rem,.8vw,.62rem)] font-semibold">{shown}</p>
                <p className="my-auto text-[clamp(.6rem,1.5vw,1.15rem)] font-semibold leading-[1] tracking-[-0.04em]">
                  {t.headline[0]} <span className="serif" style={{ color: t.accent }}>{t.headline[1]}</span>
                </p>
                <span className="rounded-full py-[7%] text-center text-[clamp(.38rem,.75vw,.6rem)] font-medium" style={{ background: t.accent, color: t.onAccent }}>
                  {t.cta}
                </span>
              </motion.div>
            </motion.div>
          </div>
          <p className="label mt-12 text-stone sm:mt-14">Sample concept for illustration · not a client website · sample text is placeholder</p>
        </div>
      </div>
    </section>
  );
}
