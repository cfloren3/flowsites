import { Mail, ShieldCheck, Clock } from "lucide-react";
import { site } from "@/content/site";
import { InquiryForm } from "./InquiryForm";
import { Reveal, SplitText } from "./ui";

export function ContactBlock({
  title = "Your next customer is searching.\n*Make* *sure* *they* *find* *you.*",
  interest = "preview",
  id = "start",
}: {
  title?: string;
  interest?: "preview" | "review" | "general";
  id?: string;
}) {
  return (
    <section id={id} className="on-dark relative overflow-hidden bg-ink py-24 text-paper md:py-36 grain" aria-labelledby={`${id}-title`}>
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(201,242,107,.10),transparent)]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="label text-paper/50">Start here · From $750 CAD</p>
          <SplitText id={`${id}-title`} text={title} accentClassName="text-paper/45" className="display mt-6 text-[clamp(2.5rem,5.4vw,5rem)]" />
          <ul className="mt-12 space-y-5">
            {[
              { i: ShieldCheck, t: "Love the design or don't pay", b: "Free homepage preview. No deposit." },
              { i: Clock, t: `Reply ${site.responseTime}`, b: "A real person, not an auto-sequence." },
              { i: Mail, t: site.email, b: "Prefer email? Write to us directly.", href: `mailto:${site.email}` },
            ].map(({ i: Icon, t, b, href }) => (
              <Reveal as="li" key={t} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-paper/15">
                  <Icon className="h-4 w-4 text-volt" aria-hidden="true" />
                </span>
                <div>
                  {href ? (
                    <a href={href} className="font-medium underline decoration-paper/30 underline-offset-4 hover:decoration-volt">
                      {t}
                    </a>
                  ) : (
                    <p className="font-medium">{t}</p>
                  )}
                  <p className="text-sm text-paper/55">{b}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal className="lg:col-span-7" delay={120}>
          <div className="rounded-[28px] border border-paper/10 bg-ink-2 p-6 sm:p-8 md:p-10">
            <InquiryForm dark interest={interest} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
