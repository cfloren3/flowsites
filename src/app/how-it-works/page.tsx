import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { Process } from "@/components/home/Process";
import { FinalExperience } from "@/components/home/FinalExperience";
import { Faq, Guarantee } from "@/components/sections";

export const metadata: Metadata = {
  title: "How It Works: From First Chat to Launch",
  description:
    "How Flowsites works: we learn your business, design your homepage, and you see it before you pay. Then we launch and, if you want, keep improving. Websites from $995 CAD.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={"Simple for you.\n*Thorough* *for* *us.*"}
        lede="Most owners spend under an hour with us before launch: one short conversation and one look at the preview. Here is exactly what happens."
        className="!pb-0"
      />
      <Process />
      <Guarantee />
      <Faq />
      <FinalExperience placement="how-it-works-cta" />
    </>
  );
}
