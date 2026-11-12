import type { Evidence } from "./evidence";

export type Metric = { value: string; label: string; evidence: Evidence };

export type CaseSection = {
  id: string;
  kicker: string;
  title: string;
  body: string[];
  bullets?: string[];
  image?: { src: string; alt: string; caption: string; kind?: "desktop" | "mobile" };
};

export type Project = {
  slug: string;
  name: string;
  shortName: string;
  url: string;
  displayUrl: string;
  industry: string;
  category: string;
  /** Honest description of the relationship and authorship. */
  relationship: string;
  year: string;
  services: string[];
  headline: string;
  summary: string;
  features: string[];
  accent: string;
  images: {
    desktop: string;
    mobile: string;
    mobile2?: string;
    sections: { src: string; alt: string; caption: string }[];
  };
  capturedOn: string;
  metrics: Metric[];
  sections: CaseSection[];
  lessons?: string[];
  notice?: string;
  relatedIndustry?: string;
};

const CAPTURED = "2026-11-11";

export const projects: Project[] = [
  {
    slug: "yardex-guelph",
    name: "Yardex Guelph",
    shortName: "Yardex",
    url: "https://www.yardexguelph.ca/",
    displayUrl: "yardexguelph.ca",
    industry: "Lawn care & property maintenance",
    category: "Trades website · Local SEO · Operations",
    relationship:
      "Founder portfolio work. Yardex is the lawn care company founded and run by Flowsites founder Carter Florence. The website, SEO and operating software were built in-house.",
    year: "2022 – present",
    services: ["Website design & development", "Local SEO", "Google Business Profile", "Conversion design", "Operations software"],
    headline: "We didn't just build websites for trades. We built a trades business.",
    summary:
      "A Guelph lawn care company that grew through Google, reviews and referrals, on a website built to rank for local searches and turn visitors into quote requests.",
    features: [
      "Price anchor in the hero (“from $27.50 per cut”)",
      "Phone number and quote button always in view",
      "Trust bar: insurance, WSIB, award and rating directly under the hero",
      "Nine dedicated service pages targeting “[service] Guelph” searches",
      "Real before/after project photography",
      "LocalBusiness structured data covering 14 Guelph neighbourhoods",
    ],
    accent: "#1f3d2b",
    images: {
      desktop: "/work/yardex-guelph/desktop.webp",
      mobile: "/work/yardex-guelph/mobile.webp",
      mobile2: "/work/yardex-guelph/m2.webp",
      sections: [
        { src: "/work/yardex-guelph/s1.webp", alt: "Yardex services section with real lawn photography", caption: "Services: each card links to a dedicated, search-targeted page." },
        { src: "/work/yardex-guelph/s2.webp", alt: "Yardex before and after cleanup gallery", caption: "Proof over promises: real before/after cleanups." },
        { src: "/work/yardex-guelph/s3.webp", alt: "Yardex Lawn Process scroll story", caption: "“The Lawn Process”: a scroll-driven explainer of every visit. Yardex labels this imagery as an AI-generated visualization." },
        { src: "/work/yardex-guelph/s4.webp", alt: "Yardex Google reviews carousel", caption: "Reviews surfaced with names and source." },
      ],
    },
    capturedOn: CAPTURED,
    metrics: [
      {
        value: "#2",
        label: "On Google for “lawn care Guelph”",
        evidence: {
          status: "client-reported",
          source: "Owner-reported on carterflorence.com",
          sourceUrl: "https://carterflorence.com/",
          checked: CAPTURED,
          note: "Dated Search Console export pending. Rankings vary by location, device and day.",
        },
      },
      {
        value: "Top 3",
        label: "Lawn care services in Guelph: ThreeBest Rated (4.9 score)",
        evidence: { status: "verified", source: "ThreeBest Rated", sourceUrl: "https://threebestrated.ca/lawn-care-services-in-guelph-on", checked: CAPTURED },
      },
      {
        value: "75+",
        label: "Five-star Google reviews",
        evidence: { status: "client-reported", source: "Published on yardexguelph.ca", sourceUrl: "https://www.yardexguelph.ca/", checked: CAPTURED },
      },
      {
        value: "50",
        label: "Recurring properties serviced every week",
        evidence: { status: "client-reported", source: "Published on yardexguelph.ca", checked: CAPTURED },
      },
    ],
    sections: [
      {
        id: "background",
        kicker: "01 · Background",
        title: "A lawn care company started with a rake and a yard-waste bag.",
        body: [
          "Carter Florence started Yardex in Guelph as a teenager. GuelphToday covered the launch in 2023, and futurist Jim Carroll wrote about “10 leadership lessons from a 14-year-old CEO” the same year. Since then it has grown into a small crew servicing about 50 recurring residential properties.",
          "Running it meant doing every job in a service business: quoting, scheduling, hiring, insurance, billing and marketing. That's the experience Flowsites is built on.",
        ],
      },
      {
        id: "challenge",
        kicker: "02 · The challenge",
        title: "Guelph has no shortage of lawn care companies.",
        body: [
          "National franchises, established landscapers and a long tail of local operators all compete for the same searches. Homeowners compare a handful of results, look at reviews, and usually contact whoever looks most credible and easiest to book.",
        ],
        bullets: [
          "Be found for the services people actually search for, in Guelph specifically",
          "Look more established than the business's size and age",
          "Make getting a quote take under a minute",
          "Answer price and contract questions before they become objections",
        ],
      },
      {
        id: "strategy",
        kicker: "03 · Digital strategy",
        title: "Design for trust, structure for search, remove every step to a quote.",
        body: [
          "The homepage leads with the two things homeowners care about most, quality and no lock-in contracts, then shows proof straight away: rating, insurance, WSIB coverage and the award. Pricing starts in the hero, so there's no guessing.",
          "Every service gets its own page. The quote form and phone number stay in view the whole way down.",
        ],
        image: { src: "/work/yardex-guelph/desktop.webp", alt: "Yardex Guelph homepage hero", caption: "Hero: positioning, price anchor and proof above the fold.", kind: "desktop" },
      },
      {
        id: "seo",
        kicker: "04 · SEO foundations",
        title: "A site architecture Google can understand.",
        body: [
          "We inspected the live site directly on 11 November 2026. This is what's there today:",
        ],
        bullets: [
          "Title tag led by the primary keyword: “Lawn Care Guelph | No Contracts | Yardex”",
          "Dedicated service URLs, e.g. /lawn-mowing-guelph/, /lawn-fertilizer-guelph/, /yard-cleanup-guelph/",
          "A transparent pricing page (/lawn-mowing-prices-guelph/) aimed at high-intent price searches",
          "11 genuinely local guides, e.g. the Guelph watering bylaw, when to start mowing in Guelph",
          "LocalBusiness JSON-LD with 14 service neighbourhoods, award and sameAs profiles",
          "Clean robots.txt with sitemap reference; 30 URLs in the XML sitemap",
        ],
        image: { src: "/work/yardex-guelph/s1.webp", alt: "Yardex services grid", caption: "Each service card leads to its own search-targeted page.", kind: "desktop" },
      },
      {
        id: "technology",
        kicker: "05 · Technology & operations",
        title: "Then we built the software to run it.",
        body: [
          "Big CRMs are designed for sales teams at desks. Yardex needed something a crew could use on a phone in the sun. So Carter designed and built TraitCRM, using AI-assisted development (Claude Code). It now runs the business day to day: scheduling, clients, billing, routing, job timing, expenses and standard operating procedures.",
          "The lesson for our clients is that the right systems give an owner time back. We bring that operating mindset to every website: what happens after the form is submitted matters as much as the form.",
        ],
        image: { src: "/work/traitcrm/s2.webp", alt: "TraitCRM crew job timer", caption: "TraitCRM's crew job timer (demo data, from traitcrm.com).", kind: "desktop" },
      },
      {
        id: "outcomes",
        kicker: "06 · Outcomes",
        title: "What we can show, and how we know it.",
        body: [
          "Today Yardex shows up near the top of Google for the search that matters most to a Guelph lawn care company, and the site turns those visits into quote requests. Each figure below carries its evidence status, and a ranking is a snapshot: it varies by location, device and day.",
        ],
      },
    ],
    lessons: [
      "Customers need to find you. Rank for the service + city phrases people actually type.",
      "You need to look credible within five seconds. Proof belongs above the fold.",
      "Requesting a quote should take under a minute, from any screen.",
      "Reviews are a ranking factor and a sales tool. Ask for them every time.",
      "Publish prices or price anchors. It filters out bad-fit leads and builds trust.",
      "Systems give owners time back. Plan what happens after the form.",
    ],
    notice:
      "The #2 ranking for “lawn care Guelph” is owner-reported. We're adding a dated Google Search Console export and location-specific checks so every ranking on this page carries a date and method.",
    relatedIndustry: "landscaping-web-design",
  },
  {
    slug: "ontario-deca",
    name: "Ontario DECA",
    shortName: "Ontario DECA",
    url: "https://deca.ca/",
    displayUrl: "deca.ca",
    industry: "Education non-profit",
    category: "SEO case study · Organisational website",
    relationship:
      "SEO project. Carter Florence led the search work while serving as an Ontario DECA Provincial Executive Officer (Chapter Engagement), May 2025 – June 2026. The deca.ca website itself is managed by Ontario DECA; Flowsites does not claim to have designed or built the full site.",
    year: "2025 – 2026",
    services: ["SEO strategy", "Keyword research", "On-page SEO", "Resource Hub & content structure"],
    headline: "#1 on Google for “high school case competitions Canada”.",
    summary:
      "SEO for one of Ontario's largest student organisations, putting Ontario DECA at the top of Google for the searches students, parents and teachers actually make.",
    features: [
      "Rankings for the organisation's own name against a large US parent brand",
      "Top position for a high-intent category search: “high school case competitions Canada”",
      "Task-first homepage pathways: judge registration, events calendar, chapter resources",
      "A central Chapter Resources hub that gives search engines and members one clear destination",
    ],
    accent: "#1c1f2b",
    images: {
      desktop: "/work/ontario-deca/desktop.webp",
      mobile: "/work/ontario-deca/mobile.webp",
      mobile2: "/work/ontario-deca/m2.webp",
      sections: [
        { src: "/work/ontario-deca/s2.webp", alt: "Ontario DECA resources section", caption: "Task-based pathways: resources, chapter visits, officers." },
        { src: "/work/ontario-deca/s3.webp", alt: "Ontario DECA resources cards", caption: "DECA Resources: one clear destination for chapter material." },
      ],
    },
    capturedOn: CAPTURED,
    metrics: [
      {
        value: "#1",
        label: "On Google for “high school case competitions Canada”",
        evidence: { status: "client-reported", source: "Reported by Flowsites founder", checked: CAPTURED, note: "Dated screenshot / Search Console export pending." },
      },
      {
        value: "#2",
        label: "On Google for “DECA” in Canada, behind the international DECA Inc. site",
        evidence: { status: "client-reported", source: "Reported by Flowsites founder", checked: CAPTURED, note: "Dated screenshot / Search Console export pending." },
      },
      {
        value: "18,050",
        label: "Members listed on deca.ca, the audience this search work reaches",
        evidence: { status: "verified", source: "deca.ca homepage", sourceUrl: "https://deca.ca/", checked: CAPTURED },
      },
    ],
    sections: [
      {
        id: "challenge",
        kicker: "01 · The challenge",
        title: "A Canadian chapter competing with a global brand.",
        body: [
          "Search “DECA” and you're competing with DECA Inc., the international organisation in the United States, plus every school chapter, news story and social account that uses the name. For Ontario students, parents and teachers, the provincial organisation needed to be the obvious result.",
          "Beyond the brand name, the bigger opportunity was category searches: people who don't know DECA yet but are looking for business case competitions for high school students in Canada.",
        ],
      },
      {
        id: "approach",
        kicker: "02 · The SEO approach",
        title: "Own the brand. Then own the category.",
        body: [
          "The same playbook we use for local businesses: understand what people actually search for, make sure one clear page answers each search, and make that page easy for Google to understand.",
        ],
        bullets: [
          "Keyword research across brand searches (“DECA”, “Ontario DECA”) and category searches (“high school case competitions Canada”)",
          "On-page SEO: page titles, headings and copy aligned to those searches",
          "A central Resource Hub so chapter material lives in one crawlable place instead of scattered files",
          "Clear internal pathways from the homepage to events, resources and registration",
        ],
        image: { src: "/work/ontario-deca/desktop.webp", alt: "Ontario DECA homepage", caption: "deca.ca homepage as captured 11 Nov 2026.", kind: "desktop" },
      },
      {
        id: "outcomes",
        kicker: "03 · Results",
        title: "Found first by the people it's for.",
        body: [
          "Ontario DECA ranks #1 for “high school case competitions Canada” and #2 for “DECA”, sitting directly under the international organisation's own site. Rankings vary by location, device and day; each figure below carries its evidence status.",
        ],
      },
      {
        id: "lesson",
        kicker: "04 · Why it matters to you",
        title: "Category searches are where new customers come from.",
        body: [
          "Most of your future customers don't know your name yet. They search for what you do: “landscaping Guelph”, “brunch near me”, “roof repair Kitchener”. Winning those category searches is exactly what we did for Ontario DECA, and exactly what we'll plan for your business.",
        ],
      },
    ],
    lessons: [
      "Rank for your own name first. If customers can't find you by name, nothing else matters.",
      "Then target the category: what people search before they know you exist.",
      "One clear page per search beats one page that tries to rank for everything.",
      "Organise your content so both people and Google can find it.",
    ],
    notice:
      "Rankings are client-reported. We're adding dated screenshots and Search Console data so every position on this page carries a date, location and method.",
    relatedIndustry: "professional-services-web-design",
  },
  {
    slug: "carter-florence",
    name: "Carter Florence",
    shortName: "Carter Florence",
    url: "https://carterflorence.com/",
    displayUrl: "carterflorence.com",
    industry: "Personal brand",
    category: "Personal brand · Editorial design · Motion",
    relationship: "Founder portfolio work. The personal website of Flowsites founder Carter Florence.",
    year: "2026",
    services: ["Brand & art direction", "Design & development", "Motion design", "Structured data"],
    headline: "An editorial, chaptered story told through type, numbers and motion.",
    summary:
      "A personal brand site that reads like a well-designed magazine profile, with animated figures, Q&A storytelling and chapter navigation across business, leadership and education.",
    features: [
      "Editorial type system: Instrument Serif, Inter Tight and Geist Mono",
      "Animated numeric storytelling with per-figure context labels",
      "Q&A interview format that keeps long-form content scannable",
      "Interactive biography timeline with chapter navigation",
      "Person + WebSite JSON-LD graph for entity SEO",
      "Responsive, reduced-motion-aware animation",
    ],
    accent: "#e9dfd6",
    images: {
      desktop: "/work/carter-florence/desktop.webp",
      mobile: "/work/carter-florence/mobile.webp",
      mobile2: "/work/carter-florence/m2.webp",
      sections: [
        { src: "/work/carter-florence/s2.webp", alt: "Carter Florence 'Learn more' editorial section", caption: "Chapter openers set in large editorial serif." },
        { src: "/work/carter-florence/s1.webp", alt: "Carter Florence Q&A introduction", caption: "Q&A storytelling keeps biography human and scannable." },
        { src: "/work/carter-florence/s3.webp", alt: "Carter Florence biography timeline", caption: "An interactive timeline navigates the story so far." },
      ],
    },
    capturedOn: CAPTURED,
    metrics: [],
    sections: [
      {
        id: "brief",
        kicker: "01 · The brief",
        title: "A personal site that doesn't feel like a résumé.",
        body: [
          "A personal brand site has to do two jobs: help someone grasp a story fast, and reward the people who want the detail. We treated it like an editorial feature, with a clear thesis at the top and chapters underneath.",
        ],
      },
      {
        id: "design",
        kicker: "02 · Design",
        title: "Typography does the heavy lifting.",
        body: [
          "A high-contrast serif carries the voice, a neutral grotesk carries the reading, and a monospace carries metadata: dates, roles, figure captions. A warm paper background and restrained blush accent keep it personal without being casual.",
        ],
        image: { src: "/work/carter-florence/desktop.webp", alt: "Carter Florence homepage", caption: "“FIG. 01”: editorial captions frame the portrait like a printed profile.", kind: "desktop" },
      },
      {
        id: "motion",
        kicker: "03 · Interaction",
        title: "Motion that explains, not decorates.",
        body: [
          "Numbers roll into place, chapters reveal as you read, and a typed role line adds personality to the hero. Everything degrades gracefully when reduced motion is requested.",
        ],
        image: { src: "/work/carter-florence/s3.webp", alt: "Timeline section", caption: "Chaptered timeline with click-to-navigate years.", kind: "desktop" },
      },
      {
        id: "why",
        kicker: "04 · Why it matters to you",
        title: "The same craft, applied to your business.",
        body: [
          "Most trades sites don't need a typed hero or an editorial serif. They do benefit from the same discipline: clear hierarchy, fast loading, purposeful motion and structured data that helps Google understand who you are.",
        ],
      },
    ],
  },
  {
    slug: "traitcrm",
    name: "TraitCRM",
    shortName: "TraitCRM",
    url: "https://traitcrm.com/",
    displayUrl: "traitcrm.com",
    industry: "Software for trade businesses",
    category: "Product design · Web app · Marketing site",
    relationship:
      "Founder-built product. TraitCRM was designed and built by Carter Florence for Yardex, and is offered to other trade businesses by invitation.",
    year: "2026",
    services: ["Product strategy", "UI/UX design", "Full-stack development (AI-assisted)", "Marketing site"],
    headline: "Beyond websites. Thoughtful digital experiences.",
    summary:
      "A CRM built for crews, not sales teams. Admins run it from a laptop; the crew signs in on their phones with a 6-digit code. No app to download, no passwords.",
    features: [
      "Dashboard: revenue, net profit, top clients and expenses at a glance",
      "Drag-and-drop weekly schedule with live ICS calendar feed",
      "Per-service, monthly and pre-paid billing with automatic balance deduction",
      "Crew job timer with live $/minute efficiency",
      "Passwordless crew sign-in with personal 6-digit codes",
      "Branded, private portal per business",
    ],
    accent: "#123524",
    images: {
      desktop: "/work/traitcrm/desktop.webp",
      mobile: "/work/traitcrm/mobile.webp",
      mobile2: "/work/traitcrm/m2.webp",
      sections: [
        { src: "/work/traitcrm/s1.webp", alt: "TraitCRM weekly schedule", caption: "Weekly schedule with drag-and-drop." },
        { src: "/work/traitcrm/s2.webp", alt: "TraitCRM job timer", caption: "Crew job timer with live efficiency." },
        { src: "/work/traitcrm/s3.webp", alt: "TraitCRM crew codes", caption: "Passwordless crew sign-in." },
        { src: "/work/traitcrm/s4.webp", alt: "TraitCRM interactive schedule builder", caption: "Interactive “try it yourself” schedule builder." },
      ],
    },
    capturedOn: CAPTURED,
    metrics: [],
    sections: [
      {
        id: "problem",
        kicker: "01 · The problem",
        title: "Nothing fit a small crew.",
        body: [
          "Scheduling and billing were happening in spreadsheets late at night. Mainstream CRMs assume desk-based sales teams, long onboarding and per-seat pricing, and none of that works for a small lawn crew working from their phones.",
        ],
      },
      {
        id: "architecture",
        kicker: "02 · Product architecture",
        title: "Two roles, one system.",
        body: [
          "The product splits cleanly by role. Owners get the full picture on desktop: clients, schedule, revenue, expenses, settings. Crew get only what a job needs, on a phone: today's route, a timer and photo capture. Each business gets its own branded portal at its own path.",
        ],
        bullets: [
          "Clients → services → schedule → timer → service record: one data flow, no double entry",
          "Billing models built in: per-service, monthly, pre-paid balances",
          "Calendar sync via ICS so Apple/Google/Outlook always match the route",
        ],
        image: { src: "/work/traitcrm/desktop.webp", alt: "TraitCRM marketing site hero with dashboard preview", caption: "Marketing site hero with the dashboard preview (demo data).", kind: "desktop" },
      },
      {
        id: "ux",
        kicker: "03 · Interface design",
        title: "Designed for a phone in the sun.",
        body: [
          "Large tap targets, high contrast and a numeric keypad for sign-in. Stopping a timer turns the session into a service record automatically. Every feature started as a real problem on a real job; if the crew wouldn't use it, it didn't ship.",
        ],
        image: { src: "/work/traitcrm/s3.webp", alt: "Crew code login", caption: "Crew sign-in: tap a 6-digit code, no password.", kind: "desktop" },
      },
      {
        id: "why",
        kicker: "04 · Why it matters to you",
        title: "We understand what happens after the lead.",
        body: [
          "Building business software means we design websites with your operations in mind: where enquiries go, what details you need to quote, and how to cut the admin between “new lead” and “job booked”.",
        ],
      },
    ],
    notice:
      "All screens shown are public marketing-site imagery from traitcrm.com, displayed with demo data. No authenticated or client data is shown.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
