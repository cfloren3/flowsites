export type Block = { type: "p"; text: string } | { type: "h2"; text: string } | { type: "h3"; text: string } | { type: "ul"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  published: string;
  body: Block[];
  related: { label: string; href: string }[];
};

export const articles: Article[] = [
  {
    slug: "contractor-website-checklist",
    title: "The contractor website checklist: 12 things that turn visitors into quote requests",
    description:
      "A practical checklist for Ontario trades businesses: what your website needs on the first screen, on every service page, and behind the scenes.",
    category: "Conversion",
    readingTime: "6 min read",
    published: "2026-11-11",
    body: [
      { type: "p", text: "Most trades websites don't fail because they're ugly. They fail because a busy homeowner on a phone can't answer three questions in five seconds: Do you do what I need? Do you work where I live? How do I get a price?" },
      { type: "p", text: "Here's the checklist we use on every Flowsites project, and on our own lawn care company's site." },
      { type: "h2", text: "On the first screen" },
      { type: "ul", items: [
        "A headline that names your trade and your city. “Roofing in Kitchener-Waterloo” beats “Quality you can trust.”",
        "One primary call to action (“Get a free quote”) and a visible phone number. On mobile, make it tap-to-call.",
        "Proof directly under the headline: Google rating and review count, years in business, insurance/WSIB, licences.",
        "A real photo of your work or crew. Stock photos tell visitors you're hiding something.",
      ] },
      { type: "h2", text: "On every service page" },
      { type: "ul", items: [
        "One page per service you want to be found for. “Drain cleaning” and “water heater replacement” are different searches.",
        "What's included, who it's for, and a price anchor if you're comfortable (“from $X”). Price anchors filter out bad-fit leads.",
        "Photos of that specific service, plus the questions customers actually ask you on site.",
        "A quote form or call button at the bottom, so nobody has to scroll back up.",
      ] },
      { type: "h2", text: "Behind the scenes" },
      { type: "ul", items: [
        "Fast loading on a mid-range phone. Compress images and avoid heavy page builders where possible.",
        "Unique title tags and meta descriptions for every page, written for people as well as Google.",
        "LocalBusiness structured data that matches your Google Business Profile exactly: name, phone, service area.",
        "Form submissions that land somewhere you'll actually see them, with an automatic confirmation to the customer.",
      ] },
      { type: "h2", text: "The test" },
      { type: "p", text: "Hand your phone to someone who has never heard of your business. Ask them to find out whether you serve their area and request a quote. Time it. If it takes more than a minute, your website is costing you work." },
    ],
    related: [
      { label: "Website design for contractors", href: "/services/web-design" },
      { label: "Get a free website preview", href: "/free-website-preview" },
    ],
  },
  {
    slug: "how-local-search-works-for-trades",
    title: "How local search works for trades: map pack, organic results and your website",
    description:
      "Why your business can appear in Google Maps but not the regular results (or the other way round), and what actually influences each.",
    category: "Local SEO",
    readingTime: "7 min read",
    published: "2026-11-11",
    body: [
      { type: "p", text: "When someone searches “plumber Guelph”, Google usually shows two different kinds of results: the map pack (three businesses with a map) and the organic results below it. They're ranked by related but different signals, which is why a business can do well in one and be invisible in the other." },
      { type: "h2", text: "The map pack" },
      { type: "p", text: "The map pack is driven mostly by your Google Business Profile. Google describes the main factors as relevance (how well your profile matches the search), distance (how far you are from the searcher or the location in the query) and prominence (how well-known your business is, including reviews and links)." },
      { type: "ul", items: [
        "Choose the most accurate primary category, then add secondary categories that genuinely apply.",
        "Keep your name, address/service area and phone consistent everywhere they appear.",
        "Ask every happy customer for a review, and reply to all of them, especially the bad ones.",
        "Add real photos regularly and list your services with descriptions.",
      ] },
      { type: "h2", text: "Organic results" },
      { type: "p", text: "Organic rankings depend much more on your website: whether there's a page that clearly matches the search, whether Google can crawl and understand it, and whether other sites reference you." },
      { type: "ul", items: [
        "A dedicated page for each core service, with the service and city in the title and heading.",
        "Helpful, specific content: what's included, pricing guidance, process, FAQs.",
        "Technical health: fast loading, mobile-friendly, indexed, with a sitemap and structured data.",
        "Local links and mentions: suppliers, associations, sponsorships, local news.",
      ] },
      { type: "h2", text: "Why rankings look different for everyone" },
      { type: "p", text: "Results vary by the searcher's exact location, device, search history and the day. When you check your own ranking from your office, you're seeing one version. That's why we report Search Console data (average positions across real searches) and record the location, device and date of every manual check." },
      { type: "h2", text: "About city pages" },
      { type: "p", text: "Creating dozens of near-identical “[service] in [town]” pages to rank in places you don't really serve is called a doorway-page tactic. It goes against Google's spam policies, and it rarely works for long. Build a location page only when you have something genuine to say about that area: projects there, specific regulations, real service details." },
    ],
    related: [
      { label: "SEO & local visibility", href: "/services/local-seo" },
      { label: "Yardex Guelph case study", href: "/case-studies/yardex-guelph" },
    ],
  },
  {
    slug: "what-a-website-should-cost",
    title: "What should a small business website cost in Ontario?",
    description:
      "An honest breakdown of website pricing for trades and service businesses: what drives the price, what's usually extra, and the questions to ask any quote.",
    category: "Pricing",
    readingTime: "5 min read",
    published: "2026-11-11",
    body: [
      { type: "p", text: "Ontario web design pricing ranges from a few hundred dollars for a template to tens of thousands for a large custom build. For most trades businesses, the right answer sits in between, and the price matters less than what's included." },
      { type: "h2", text: "What drives the price" },
      { type: "ul", items: [
        "Number of pages. Each service and location page takes design, writing and SEO work.",
        "Content. Who writes the copy and who supplies the photos?",
        "Features: quote forms, booking, galleries, integrations with your CRM or scheduling software.",
        "SEO depth: basic technical foundations vs. keyword research, content strategy and ongoing work.",
      ] },
      { type: "h2", text: "What's usually extra" },
      { type: "ul", items: [
        "Domain registration and renewal (usually paid yearly to a registrar).",
        "Hosting, sometimes bundled into a monthly plan.",
        "Business email accounts.",
        "Premium plugins, fonts or stock photography.",
        "Ongoing SEO, content or maintenance.",
      ] },
      { type: "h2", text: "Questions to ask any quote" },
      { type: "ul", items: [
        "Do I own the website and domain when it's paid off?",
        "Is the design custom, or a template with my logo on it?",
        "What does it cost per month after launch, and what happens if I cancel?",
        "Will Google Analytics and Search Console be set up on my own accounts?",
        "Can I see the design before I commit?",
      ] },
      { type: "h2", text: "How we price" },
      { type: "p", text: "Flowsites websites start at $995 CAD for a focused, custom-designed site. We design your homepage first and show it to you. If you don't like it, you don't pay. If you do, we confirm the full scope and price in writing before development starts." },
    ],
    related: [
      { label: "Pricing", href: "/pricing" },
      { label: "Free website preview", href: "/free-website-preview" },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
