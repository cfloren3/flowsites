import { Eye, MousePointerClick, Search } from "lucide-react";
import { Eyebrow, Reveal, SplitText } from "../ui";

const checks = [
  { i: Search, t: "They find a few options", b: "On Google or from a neighbour, then they look up each one." },
  { i: Eye, t: "They judge in seconds", b: "Does this business look established? Is there proof: photos, reviews, real work?" },
  { i: MousePointerClick, t: "They pick the easy one", b: "Whoever makes it simplest to get a price or book gets the call." },
];

/** Problem recognition: how customers actually choose, and what a weak site costs in that moment. */
export function Problem() {
  return (
    <section id="why-it-matters" data-section="problem" className="bg-paper py-24 md:py-32" aria-labelledby="problem-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow>Why it matters</Eyebrow>
            </Reveal>
            <SplitText id="problem-title" text={"Your next customer is\nalready *searching.*"} accentClassName="text-volt-ink" className="h-section mt-6" />
          </div>
          <Reveal delay={150} className="lg:col-span-4 lg:pb-3">
            <p className="lede text-stone">
              You can be the best at what you do. But first they have to find you, and what they see has to make them choose you instead of scrolling on.
            </p>
          </Reveal>
        </div>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 md:grid-cols-3">
          {checks.map(({ i: Icon, t, b }, idx) => (
            <Reveal as="li" key={t} delay={idx * 90} className="bg-paper p-7 md:p-9">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-paper">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="label text-stone">0{idx + 1}</span>
              </div>
              <h3 className="mt-8 text-[1.5rem] font-semibold leading-tight tracking-[-0.03em]">{t}</h3>
              <p className="mt-3 text-stone leading-relaxed">{b}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-8 text-center text-lg font-medium tracking-[-0.01em]">
          Does your website make them choose you, <span className="serif text-volt-ink text-[1.2em]">or keep looking?</span>
        </Reveal>
      </div>
    </section>
  );
}
