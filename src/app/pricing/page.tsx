import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { FinalCta, Faq, Guarantee, Pricing, faqSchema } from "@/components/sections";
import { faqs } from "@/content/faq";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Pricing: Websites starting at $995 CAD",
  description:
    "Transparent website pricing for Ontario trades: custom websites starting at $995 CAD with a free design preview. SEO and website care on custom plans. Third-party costs explained.",
  alternates: { canonical: "/pricing" },
};

const pricingFaqs = faqs.filter((f) => /\$995|pay|costs|own/i.test(f.q));

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqSchema(pricingFaqs)} />
      <PageHero
        eyebrow="Pricing · CAD"
        title={"Websites starting at $995.\n*No-risk* *design* *preview.*"}
        lede="Simple starting prices, clear separation between one-time and ongoing costs, and nothing to pay until you've seen and approved your design."
        className="!pb-0"
      />
      <Pricing detailed showHeader={false} />
      <Guarantee showTerms />
      <Faq items={pricingFaqs} title="Pricing questions." />
      <FinalCta />
    </>
  );
}
