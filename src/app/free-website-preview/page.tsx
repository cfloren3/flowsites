import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { projects } from "@/content/projects";
import { previewTerms } from "@/content/site";
import { InquiryForm } from "@/components/InquiryForm";
import { PhoneFrame } from "@/components/Frames";
import { Eyebrow, Reveal, SplitText } from "@/components/ui";
import { Faq } from "@/components/sections";
import { faqs } from "@/content/faq";

export const metadata: Metadata = {
  title: "Free Website Preview: See Your New Website Before You Pay",
  description:
    "Get a free, custom homepage design for your Ontario trades business. If you don't love it, you don't pay. Websites starting at $995 CAD.",
  alternates: { canonical: "/free-website-preview" },
};

export default function PreviewPage() {
  return (
    <>
      <section className="on-dark relative overflow-hidden bg-ink pt-32 pb-20 text-paper md:pt-40 md:pb-28 grain" aria-labelledby="preview-title">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--p-accent)_12%,transparent),transparent)]" />
        <div className="container-x relative grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="label flex items-center gap-2 text-paper/55">
              <span className="h-1.5 w-1.5 rounded-full bg-volt pulse-dot" aria-hidden="true" /> Free website preview
            </p>
            <SplitText immediate as="h1" id="preview-title" text={"See your new website\n*before* *you* *pay.*"} accentClassName="text-volt" className="display mt-6 text-[clamp(2.8rem,6vw,5.6rem)]" />
            <p className="lede mt-8 text-paper/70">
              Tell us about your business. We&apos;ll design your homepage and send you a private link to explore on your phone. Love it, and we&apos;ll quote the full build from <strong className="text-paper">$995 CAD</strong>. Don&apos;t, and you owe nothing.
            </p>
            <ul className="mt-10 space-y-3">
              {["No deposit. No obligation.", "Built with your services, photos and reviews", "Planned for local search from day one", "Full scope and price in writing before any work you pay for"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-paper/85">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-volt" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-12 hidden items-end gap-4 lg:flex" aria-hidden="true">
              {projects.filter((p) => p.images).slice(0, 3).map((p, i) => (
                <PhoneFrame key={p.slug} src={p.images!.mobile} alt="" className={`w-[30%] ${i === 1 ? "-translate-y-6" : ""}`} sizes="150px" />
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <Reveal className="rounded-[28px] border border-paper/10 bg-ink-2 p-6 sm:p-8 md:p-10">
              <p className="text-2xl font-semibold tracking-[-0.03em]">Request your free preview</p>
              <p className="mt-2 mb-8 text-sm text-paper/55">Takes about two minutes.</p>
              <InquiryForm dark interest="preview" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28" aria-labelledby="terms-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>The fine print, in plain English</Eyebrow>
            <h2 id="terms-title" className="h-section mt-6 !text-[clamp(2.2rem,4vw,3.6rem)]">
              How the guarantee works.
            </h2>
          </div>
          <ol className="space-y-4 lg:col-span-8">
            {previewTerms.map((t, i) => (
              <Reveal as="li" key={t} delay={i * 50} className="flex gap-5 border-b border-ink/10 pb-4">
                <span className="label pt-1 text-stone">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[1.05rem] leading-relaxed">{t}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <Faq items={faqs.slice(0, 5)} />
    </>
  );
}
