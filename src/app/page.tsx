import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { TransformStory } from "@/components/home/TransformStory";
import { RankClimb } from "@/components/home/RankClimb";
import { Guarantee, Pricing, IndustriesGrid, Faq, faqSchema } from "@/components/sections";
import { ContactBlock } from "@/components/ContactBlock";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <Hero />
      <Pricing />
      <FeaturedWork />
      <TransformStory />
      <RankClimb />
      <Guarantee />
      <IndustriesGrid />
      <Faq />
      <ContactBlock />
    </>
  );
}
