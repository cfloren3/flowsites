export type Service = {
  slug: string;
  number: string;
  name: string;
  short: string;
  price: string;
  priceNote: string;
  intro: string;
  promise: string;
  groups: { title: string; items: string[] }[];
  included: string[];
  notIncluded?: string[];
  seoTitle: string;
  seoDescription: string;
};

export const services: Service[] = [
  {
    slug: "web-design",
    number: "01",
    name: "Website Design & Development",
    short: "Custom, mobile-first websites built to turn visitors into quote requests.",
    price: "Starting at $995 CAD",
    priceNote: "Final price depends on pages, features and content, confirmed in a written quote before work begins.",
    intro:
      "Every site is designed for one business. We start from your services, service area, customers and competitors, then design a site that looks established and makes contacting you effortless.",
    promise: "See your homepage design before you pay. If it isn't right, you owe nothing.",
    groups: [
      { title: "Design", items: ["Custom design (no recycled templates)", "Mobile-first layouts", "Project galleries & before/after", "Review & trust sections"] },
      { title: "Conversion", items: ["Quote request forms", "Click-to-call buttons", "Clear calls to action on every page", "Service & service-area pages"] },
      { title: "Foundations", items: ["Fast loading & image optimisation", "Technical SEO foundations", "Structured data", "Analytics integration"] },
    ],
    included: [
      "Custom homepage design preview (free)",
      "Responsive build for phone, tablet and desktop",
      "Contact / quote form connected to your email",
      "Core technical SEO: titles, descriptions, sitemap, robots.txt, canonical URLs, schema",
      "Google Analytics 4 and Search Console setup (on your accounts)",
      "Launch on your domain",
    ],
    notIncluded: ["Domain registration", "Hosting fees", "Business email accounts", "Paid stock photography, fonts or plugins", "Copywriting beyond the agreed pages (quoted separately)"],
    seoTitle: "Website Design for Contractors & Trades in Ontario | Starting at $995",
    seoDescription:
      "Custom, mobile-first websites for Ontario contractors and service businesses. Built for speed, local search and quote requests. Starting at $995 CAD, and you see the design before you pay.",
  },
  {
    slug: "local-seo",
    number: "02",
    name: "SEO & Local Visibility",
    short: "Compete for the searches that bring customers: “roofer Kitchener”, “lawn care Guelph”.",
    price: "Custom pricing",
    priceNote: "Scoped to your market, competition and goals. Rankings vary by location, competition, search intent and time, so we never promise a specific position.",
    intro:
      "Local search is how most homeowners find a trade. We research what your customers type, see who currently wins those searches, and build the pages, signals and content that make you a stronger candidate.",
    promise: "Clear monthly reporting on what we did, what moved and what we recommend next.",
    groups: [
      { title: "Research", items: ["Keyword & search-intent research", "Competitor analysis", "Service-area opportunity mapping"] },
      { title: "On-site", items: ["On-page & technical SEO", "Structured data", "Internal linking", "Service & area content"] },
      { title: "Local", items: ["Google Business Profile guidance & optimisation", "Review strategy", "Consistent business information (NAP)"] },
      { title: "Measurement", items: ["Search Console monitoring", "Google Analytics 4", "Performance reporting"] },
    ],
    included: [],
    seoTitle: "Local SEO for Contractors & Trades in Ontario",
    seoDescription:
      "Local SEO for Ontario trades: keyword research, Google Business Profile optimisation, technical SEO, service-area content and honest reporting. No ranking guarantees, just measurable work.",
  },
  {
    slug: "website-care",
    number: "03",
    name: "Ongoing Website Growth & Care",
    short: "We don't disappear at launch. Monitoring, maintenance and steady improvement.",
    price: "Custom monthly plans",
    priceNote: "Optional and recurring. Plans are built around what you actually need; nothing is bundled you won't use.",
    intro:
      "A website is never really finished. Services change, competitors move and Google updates. A care plan keeps your site secure, current and improving month after month.",
    promise: "A growth partner, not a subscription you forget about.",
    groups: [
      { title: "Care", items: ["Hosting support", "Security updates", "Uptime & technical monitoring", "Content changes"] },
      { title: "Growth", items: ["Ranking monitoring", "New service pages", "Local SEO improvements", "Conversion optimisation"] },
      { title: "Insight", items: ["Analytics & search visibility reporting", "Performance tracking", "Continuous recommendations"] },
    ],
    included: [],
    seoTitle: "Website Maintenance & Growth Plans for Ontario Businesses",
    seoDescription:
      "Optional monthly website care for Ontario service businesses: security, updates, ranking monitoring, new pages and conversion improvements. Custom plans.",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
