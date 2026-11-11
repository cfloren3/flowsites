import type { Metadata } from "next";
import { site } from "@/content/site";
import { InquiryForm } from "@/components/InquiryForm";
import { Eyebrow, PageHero, Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact: Discuss Your Website or SEO Project",
  description: "Get in touch with Flowsites about a website, local SEO or a free website review. Based in Guelph, working across Ontario. We reply within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title={"Let's talk about\n*your* *business.*"} lede="Tell us a little about what you do and what you'd like to improve. A real person will reply." className="!pb-10" />
      <section className="container-x pb-28" aria-label="Contact form">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="rounded-[28px] border border-ink/10 bg-paper-2 p-6 sm:p-8 md:p-10 lg:col-span-8">
            <InquiryForm interest="general" submitLabel="Send message" />
          </Reveal>
          <aside className="space-y-8 lg:col-span-4">
            <div>
              <Eyebrow>Email</Eyebrow>
              <a href={`mailto:${site.email}`} className="mt-3 block text-2xl font-semibold tracking-[-0.03em] underline decoration-ink/20 underline-offset-4 hover:decoration-ink">
                {site.email}
              </a>
            </div>
            {site.phone ? (
              <div>
                <Eyebrow>Phone</Eyebrow>
                <a href={`tel:${site.phone}`} className="mt-3 block text-2xl font-semibold tracking-[-0.03em]">
                  {site.phone}
                </a>
              </div>
            ) : null}
            <div>
              <Eyebrow>Where we work</Eyebrow>
              <p className="mt-3 text-lg leading-relaxed">
                Based in Guelph, Ontario. Working with businesses across Ontario, remotely or in person where it makes sense.
              </p>
            </div>
            <div className="rounded-3xl bg-ink p-7 text-paper on-dark">
              <p className="label text-paper/50">Free website review</p>
              <p className="mt-3 text-xl font-semibold tracking-[-0.03em]">Already have a website?</p>
              <p className="mt-2 text-sm leading-relaxed text-paper/65">
                Choose &ldquo;Free website review&rdquo; in the form and include your URL. We&apos;ll send you specific, prioritised fixes for design, speed and local SEO.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
