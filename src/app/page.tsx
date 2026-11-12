import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Problem } from "@/components/home/Problem";
import { TransformStory } from "@/components/home/TransformStory";
import { SampleStudio } from "@/components/home/SampleStudio";
import { FounderStory } from "@/components/home/FounderStory";
import { SearchIntro } from "@/components/home/SearchIntro";
import { RankClimb } from "@/components/home/RankClimb";
import { Process } from "@/components/home/Process";
import { FinalExperience } from "@/components/home/FinalExperience";
import { Guarantee, Pricing, Faq, faqSchema } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Conversion sequence: value → the #1-on-Google question and answer → proof → problem →
 * transformation → "picture yours" → credibility → process → pricing & guarantee → objections → first step.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <Hero />
      <SearchIntro />
      <RankClimb />
      <FeaturedWork />
      <Problem />
      <TransformStory />
      <SampleStudio />
      <FounderStory compact />
      <Process />
      <Pricing />
      <Guarantee />
      <Faq />
      <FinalExperience />
    </>
  );
}
