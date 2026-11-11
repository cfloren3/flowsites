export type Industry = {
  slug: string;
  name: string;
  trade: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  intro: string;
  challenges: { title: string; body: string }[];
  design: string[];
  leadFeatures: string[];
  searches: string[];
  seoNotes: string;
  trust: string[];
  exampleSlug?: string;
  exampleNote: string;
};

export const industries: Industry[] = [
  {
    slug: "landscaping-web-design",
    name: "Landscaping & Lawn Care",
    trade: "landscaping",
    title: "Websites for landscaping & lawn care companies",
    metaTitle: "Landscaping & Lawn Care Website Design in Ontario",
    metaDescription:
      "Website design and local SEO for Ontario landscaping and lawn care companies, built by people who run a lawn care business. Starting at $750 CAD. See your design first.",
    hero: "Your lawns look sharp. Your website should too.",
    intro:
      "We run a lawn care company, so we know the season: a spring rush of quote requests, recurring routes to protect, and fall cleanups to fill. Your site should capture all of it.",
    challenges: [
      { title: "Seasonal demand spikes", body: "Searches for cleanups and mowing surge in April and October. If your site isn't ranking before the rush, you miss the window." },
      { title: "Price-sensitive comparisons", body: "Homeowners compare three or four companies at once. Without a price anchor, many will call whoever answers the question first." },
      { title: "Recurring vs. one-off work", body: "Weekly mowing customers are worth far more over a season than a single cleanup. Your site should steer people toward the work you want most." },
    ],
    design: [
      "Before/after galleries of real properties (no stock lawns)",
      "Seasonal service blocks that can be promoted as the year turns",
      "Price anchors (“from $X per cut”) where you're comfortable publishing them",
      "Neighbourhood coverage so people know you service their street",
    ],
    leadFeatures: ["Address-first quote form", "Click-to-call and text buttons", "Service bundles (mowing + fertilizer)", "Spring and fall cleanup booking prompts"],
    searches: ["lawn care [city]", "lawn mowing service near me", "spring cleanup [city]", "fall leaf cleanup [city]", "landscaping company [city]"],
    seoNotes: "Dedicated pages per service (mowing, fertilizing, aeration, cleanups) consistently outperform a single “services” page, and seasonal guides earn links and repeat visits.",
    trust: ["Google review rating and count", "Insurance and WSIB coverage", "Real crew and equipment photos", "Local awards or press"],
    exampleSlug: "yardex-guelph",
    exampleNote: "Yardex Guelph is our own lawn care company. Every recommendation on this page is tested there first.",
  },
  {
    slug: "contractor-web-design",
    name: "General Contractors & Renovation",
    trade: "contracting",
    title: "Websites for general contractors & renovation companies",
    metaTitle: "Contractor & Renovation Company Website Design in Ontario",
    metaDescription:
      "Websites for Ontario general contractors and renovation companies: project portfolios, qualified-lead forms and local SEO. Starting at $750 CAD with a free design preview.",
    hero: "Big projects start with a credible first impression.",
    intro:
      "Renovation clients are about to spend tens of thousands of dollars. Before they call, they judge your portfolio, your process and how established you look.",
    challenges: [
      { title: "High-value, high-scrutiny buyers", body: "A kitchen or basement client will look through your portfolio carefully. Weak photos or an outdated site can cost you the job before the first conversation." },
      { title: "Unqualified enquiries", body: "Tire-kickers and out-of-scope requests take up estimating time. The right form questions filter them before you drive out." },
      { title: "Long decision cycles", body: "Clients research for weeks. Your site has to keep earning trust on the third and fourth visit." },
    ],
    design: [
      "Project case studies with scope, timeline and before/after",
      "Process pages that explain how a renovation runs",
      "Filterable portfolio by project type",
      "Clear service-area boundaries",
    ],
    leadFeatures: ["Project-type and budget-range qualifiers", "Photo upload on the enquiry form", "Consultation booking", "Financing information (if offered)"],
    searches: ["general contractor [city]", "basement renovation [city]", "kitchen renovation contractor [city]", "home addition builder [city]"],
    seoNotes: "Project pages that name the project type and neighbourhood (with client permission) build genuine local relevance without thin location pages.",
    trust: ["Licensing, insurance and WSIB", "Warranty terms", "Detailed project galleries", "Reviews from completed projects"],
    exampleNote: "We don't have a published general contractor case study yet. Your free preview is the best example we can show you.",
  },
  {
    slug: "roofing-web-design",
    name: "Roofing",
    trade: "roofing",
    title: "Websites for roofing contractors",
    metaTitle: "Roofing Contractor Website Design in Ontario",
    metaDescription:
      "Roofing websites for Ontario contractors: emergency-ready layouts, inspection booking, insurance-claim guidance and local SEO. Starting at $750 CAD with a free design preview.",
    hero: "When the roof leaks, they call whoever looks most trustworthy.",
    intro:
      "Roofing searches split into two moments: a leak or storm right now, or a planned replacement. Your site needs to serve both on the first screen.",
    challenges: [
      { title: "Urgent vs. planned demand", body: "Someone with water coming through the ceiling needs a phone number now, not a slideshow." },
      { title: "Trust in a high-fraud category", body: "Storm chasers make homeowners cautious. Local credentials and real job photos set you apart." },
      { title: "Material and warranty questions", body: "Shingle vs. metal, manufacturer warranties, insurance claims. Clear answers cut down on calls that never turn into jobs." },
    ],
    design: ["Emergency strip with tap-to-call on mobile", "Material comparison sections", "Manufacturer certification display (where held)", "Drone and job-site photography"],
    leadFeatures: ["Free inspection booking", "Emergency call button", "Photo upload for damage", "Insurance-claim FAQ"],
    searches: ["roofer [city]", "roof repair near me", "roof replacement cost Ontario", "emergency roof leak repair [city]"],
    seoNotes: "Separate repair, replacement and material pages capture different intents; cost guides answer the most-searched question honestly.",
    trust: ["Manufacturer certifications (only those actually held)", "Workmanship warranty", "Insurance and WSIB", "Local project photos"],
    exampleNote: "No roofing case study published yet. We'll show you a preview built for your business instead.",
  },
  {
    slug: "plumbing-web-design",
    name: "Plumbing",
    trade: "plumbing",
    title: "Websites for plumbing companies",
    metaTitle: "Plumbing Company Website Design in Ontario",
    metaDescription:
      "Plumbing websites built for emergency calls and local search across Ontario: tap-to-call, service pages and fast mobile performance. Starting at $750 CAD.",
    hero: "Burst pipe at 11pm? You need to be the first number they tap.",
    intro:
      "Plumbing is one of the most mobile, most urgent local searches there is. Speed, clarity and a phone number that's always visible win the call.",
    challenges: [
      { title: "Mobile, urgent, impatient", body: "Most emergency searches happen on a phone. If your site loads slowly or hides the number, they go back to Google." },
      { title: "Service breadth", body: "Drains, water heaters, sump pumps, renovations. A single services page can't rank for all of them." },
      { title: "After-hours expectations", body: "Be clear about emergency availability and call-out fees so you don't waste anyone's time." },
    ],
    design: ["Persistent mobile call bar", "Service pages per job type", "Clear hours and emergency policy", "Lightweight pages for fast loading"],
    leadFeatures: ["Tap-to-call", "Short “describe the problem” form", "Water heater replacement quote form", "Service-area checker"],
    searches: ["plumber [city]", "emergency plumber near me", "water heater replacement [city]", "drain cleaning [city]"],
    seoNotes: "Google Business Profile carries a lot of weight in plumbing. We align your site's services and categories with your profile.",
    trust: ["Licensed plumber credentials", "Upfront call-out pricing", "Response-time commitments you can keep", "Reviews mentioning specific jobs"],
    exampleNote: "No plumbing case study published yet. Ask for a free preview to see what yours could look like.",
  },
  {
    slug: "electrician-web-design",
    name: "Electricians",
    trade: "electrical",
    title: "Websites for electricians & electrical contractors",
    metaTitle: "Electrician Website Design in Ontario",
    metaDescription:
      "Websites for Ontario electricians: ECRA/ESA licensing front and centre, residential and commercial service pages, EV charger and panel upgrade content. Starting at $750 CAD.",
    hero: "Licensed, safe, local. Make it obvious in five seconds.",
    intro:
      "Homeowners know electrical work is dangerous and regulated. Your site should prove you're licensed and capable before they've scrolled.",
    challenges: [
      { title: "Licensing is the first question", body: "In Ontario, customers increasingly check for an ECRA/ESA licence. Display yours prominently (and only if it's current)." },
      { title: "Residential vs. commercial", body: "Homeowners and property managers need different messages, so we separate the paths." },
      { title: "New demand categories", body: "EV chargers, panel upgrades and generators are growing searches that deserve dedicated pages." },
    ],
    design: ["Licence number displayed near the top", "Split residential/commercial paths", "Project galleries with clean, safe workmanship", "Upgrade-focused content blocks"],
    leadFeatures: ["Job-type selector on the form", "Photo upload for panels/wiring", "Commercial quote request", "Click-to-call"],
    searches: ["electrician [city]", "EV charger installation [city]", "panel upgrade cost Ontario", "commercial electrician [city]"],
    seoNotes: "EV charger and panel upgrade pages often face less competition than “electrician [city]” and attract higher-value jobs.",
    trust: ["ECRA/ESA licence number", "Insurance and WSIB", "Manufacturer-certified installs (if applicable)", "Reviews"],
    exampleNote: "No electrical case study published yet. Your free preview will be built around your licence and services.",
  },
  {
    slug: "hvac-web-design",
    name: "HVAC",
    trade: "HVAC",
    title: "Websites for HVAC companies",
    metaTitle: "HVAC Company Website Design in Ontario",
    metaDescription:
      "HVAC websites for Ontario heating and cooling companies: seasonal campaigns, maintenance plans, rebate information and local SEO. Starting at $750 CAD.",
    hero: "Be the obvious call when the furnace quits in January.",
    intro:
      "HVAC demand is seasonal and high-stakes. Your site should handle emergency calls in winter and summer, and sell maintenance plans in between.",
    challenges: [
      { title: "Seasonal swings", body: "Furnace emergencies in winter, AC in summer. Your homepage should adapt as the season turns." },
      { title: "Big-ticket replacements", body: "System replacements are major purchases. Clear options, financing information and rebate guidance help people decide." },
      { title: "Maintenance plan revenue", body: "Recurring maintenance customers smooth out the year. Make plans easy to understand and sign up for." },
    ],
    design: ["Season-aware hero messaging", "Good/better/best replacement options", "Maintenance plan pages", "Brand and equipment pages (dealers only)"],
    leadFeatures: ["Emergency service CTA", "Replacement quote form", "Maintenance plan sign-up", "Financing enquiry (if offered)"],
    searches: ["furnace repair [city]", "AC installation [city]", "HVAC company near me", "furnace replacement cost Ontario"],
    seoNotes: "Rebate and cost guides answer high-volume research questions and bring in buyers early. Keep them current, since programs change.",
    trust: ["TSSA certification", "Manufacturer dealer status (if held)", "Maintenance plan guarantees you can honour", "Reviews"],
    exampleNote: "No HVAC case study published yet. We'll show you with a free preview.",
  },
  {
    slug: "cleaning-company-web-design",
    name: "Cleaning & Exterior Services",
    trade: "cleaning",
    title: "Websites for cleaning, pressure-washing & window-cleaning companies",
    metaTitle: "Cleaning Company Website Design in Ontario",
    metaDescription:
      "Websites for Ontario cleaning, pressure-washing and window-cleaning businesses: instant-quote flows, recurring bookings and visual proof. Starting at $750 CAD.",
    hero: "Spotless work deserves a spotless first impression.",
    intro:
      "Cleaning and exterior services sell on visual proof and convenience. Before/after imagery and an easy quote flow do most of the selling.",
    challenges: [
      { title: "Commodity perception", body: "Customers often assume all cleaners are the same. Your process, guarantees and visuals have to show otherwise." },
      { title: "Quote friction", body: "Square footage, number of windows and frequency all affect price. A guided form gets you a usable quote request in under a minute." },
      { title: "Recurring retention", body: "Recurring clients are the business. Highlight scheduled plans over one-off cleans." },
    ],
    design: ["Before/after sliders", "Recurring plan comparisons", "Residential vs. commercial paths", "Seasonal services (gutters, windows, decks)"],
    leadFeatures: ["Guided quote form (size, frequency)", "Online booking requests", "Text-to-quote", "Commercial walkthrough request"],
    searches: ["house cleaning [city]", "pressure washing [city]", "window cleaning near me", "commercial cleaning [city]"],
    seoNotes: "Separate pages for each exterior service (pressure washing, windows, gutters) help capture demand that changes with the season.",
    trust: ["Bonded and insured", "Satisfaction guarantee terms", "Background-checked staff (only if true)", "Reviews with photos"],
    exampleNote: "No cleaning case study published yet. A free preview is the best way to see what we'd build.",
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
