import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { FounderStory } from "@/components/home/FounderStory";
import { TransformStory } from "@/components/home/TransformStory";
import { SeoSection } from "@/components/home/SeoSection";
import { RankingSection } from "@/components/home/RankingDashboard";
import { Process } from "@/components/home/Process";
import { Guarantee, WhyFlowsites, Pricing, IndustriesGrid, Faq, faqSchema, TradesMarquee } from "@/components/sections";
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
      <TradesMarquee />
      <FeaturedWork />
      <FounderStory />
      <TransformStory />
      <SeoSection />
      <RankingSection />
      <Process />
      <Guarantee />
      <WhyFlowsites />
      <Pricing />
      <IndustriesGrid />
      <Faq />
      <ContactBlock />
    </>
  );
}
