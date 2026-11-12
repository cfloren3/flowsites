import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { FinalCta, IndustriesGrid } from "@/components/sections";

export const metadata: Metadata = {
  title: "Web Design by Industry: Trades, Restaurants & Local Businesses",
  description:
    "Website design and local SEO tailored to Ontario trades, restaurants, cafés, retail shops, salons, clinics and professional services.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={"Every business sells\n*differently.*"}
        lede="A roofer's emergency call, a restaurant's Friday-night rush and a salon's booking calendar need different websites. Here's how we design for each."
        className="!pb-0"
      />
      <IndustriesGrid />
      <FinalCta />
    </>
  );
}
