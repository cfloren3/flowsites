import { PhoneFrame } from "../Frames";
import { RollingNumber } from "../Type";
import { getProject } from "@/content/projects";
import { EvidenceBadge, Eyebrow, Reveal, SplitText, TextLink } from "../ui";

const lessons = [
  ["Customers need to find you.", "If you're not in the first few results for “[service] [city]”, you're competing for scraps."],
  ["Credibility is decided in seconds.", "Proof belongs above the fold: reviews, insurance, real photos."],
  ["A quote should take under a minute.", "Every extra field or tap loses someone in a hurry."],
  ["Systems give you time back.", "What happens after the form matters as much as the form."],
];

export function FounderStory() {
  const y = getProject("yardex-guelph")!;
  return (
    <section className="on-dark relative overflow-hidden bg-ink py-24 text-paper md:py-36" aria-labelledby="founder-title">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow dark>Why we&apos;re different</Eyebrow>
            </Reveal>
            <SplitText
              id="founder-title"
              text={"We didn't just build websites for trades.\nWe built a *trades* *business.*"}
              accentClassName="text-volt"
              className="h-section mt-6"
            />
            <Reveal delay={150}>
              <p className="lede mt-8 max-w-2xl text-paper/65">
                Flowsites grew out of Yardex Guelph, the lawn care company our founder started as a teenager and still runs: crew, quotes, insurance, routes,
                reviews and the website. Every recommendation we make has been tested on a real business with real customers.
              </p>
            </Reveal>
            <Reveal delay={250} className="mt-8">
              <TextLink href="/case-studies/yardex-guelph" className="text-paper">
                Read the Yardex story
              </TextLink>
            </Reveal>
          </div>
          <Reveal className="relative lg:col-span-5" variant="scale" delay={100}>
            <div className="relative mx-auto flex max-w-md items-end justify-center gap-4 pt-6">
              <PhoneFrame src={y.images!.mobile} alt="Yardex Guelph homepage on mobile" className="w-[46%] -rotate-3" />
              <PhoneFrame src={y.images!.mobile2!} alt="Yardex Guelph trust section on mobile" className="w-[46%] translate-y-10 rotate-2" />
            </div>
            <p className="label mt-16 text-center text-paper/55">yardexguelph.ca on mobile · captured {y.capturedOn}</p>
          </Reveal>
        </div>

        <dl className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
          {y.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 80} className="flex flex-col bg-ink p-6 md:p-8">
              <dt className="order-2 mt-3 text-sm leading-snug text-paper/60">{m.label}</dt>
              <dd className="order-1 text-[clamp(2.6rem,4.5vw,4rem)] font-semibold leading-none tracking-[-0.05em]">
                <RollingNumber value={m.value} delay={i * 120} />
              </dd>
              <dd className="order-3 mt-5">
                <EvidenceBadge evidence={m.evidence} />
                {m.evidence.sourceUrl ? (
                  <a href={m.evidence.sourceUrl} target="_blank" rel="noopener noreferrer" className="ml-2 text-xs text-paper/55 underline underline-offset-2 hover:text-paper">
                    Source<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </dd>
            </Reveal>
          ))}
        </dl>

        <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {lessons.map(([t, b], i) => (
            <Reveal key={t} delay={i * 80} className="border-t border-paper/15 pt-6">
              <p className="label text-paper/55">Lesson 0{i + 1}</p>
              <p className="mt-4 text-xl font-semibold tracking-[-0.03em]">{t}</p>
              <p className="mt-3 text-paper/60 leading-relaxed">{b}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
