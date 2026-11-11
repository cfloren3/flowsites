import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { FinalCta, IndustriesGrid } from "@/components/sections";

export const metadata: Metadata = {
  title: "Web Design by Industry: Contractors & Trades in Ontario",
  description:
    "Website design and local SEO tailored to Ontario landscaping, contracting, roofing, plumbing, electrical, HVAC and cleaning businesses.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={"Every trade sells\n*differently.*"}
        lede="A roofer's emergency call, a landscaper's spring rush and an HVAC company's maintenance plans need different websites. Here's how we design for each."
        className="!pb-0"
      />
      <IndustriesGrid />
      <FinalCta />
    </>
  );
}
