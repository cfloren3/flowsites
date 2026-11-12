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
      "Website design and local SEO for Ontario landscaping and lawn care companies, built by people who run a lawn care business. Starting at $995 CAD. See your design first.",
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
      "Websites for Ontario general contractors and renovation companies: project portfolios, qualified-lead forms and local SEO. Starting at $995 CAD with a free design preview.",
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
      "Roofing websites for Ontario contractors: emergency-ready layouts, inspection booking, insurance-claim guidance and local SEO. Starting at $995 CAD with a free design preview.",
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
      "Plumbing websites built for emergency calls and local search across Ontario: tap-to-call, service pages and fast mobile performance. Starting at $995 CAD.",
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
      "Websites for Ontario electricians: ECRA/ESA licensing front and centre, residential and commercial service pages, EV charger and panel upgrade content. Starting at $995 CAD.",
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
      "HVAC websites for Ontario heating and cooling companies: seasonal campaigns, maintenance plans, rebate information and local SEO. Starting at $995 CAD.",
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
      "Websites for Ontario cleaning, pressure-washing and window-cleaning businesses: instant-quote flows, recurring bookings and visual proof. Starting at $995 CAD.",
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
  {
    slug: "restaurant-web-design",
    name: "Restaurants & Cafés",
    trade: "restaurant",
    title: "Websites for restaurants, cafés & bakeries",
    metaTitle: "Restaurant & Café Website Design in Ontario",
    metaDescription:
      "Restaurant and café websites for Ontario: fast mobile menus, hours, reservations and online ordering links, plus local SEO for “near me” searches. Starting at $995 CAD.",
    hero: "Hungry people decide in seconds. Make yours the easy choice.",
    intro:
      "Restaurant searches are fast, mobile and local. People want the menu, the hours and a way to book or order, ideally without pinching to zoom on a PDF.",
    challenges: [
      { title: "“Near me” and “open now” searches", body: "Diners search on their phones minutes before they eat. Your Google profile and website need accurate hours, location and menu to win that moment." },
      { title: "PDF menus and stale info", body: "Out-of-date menus, prices and holiday hours frustrate guests and cost covers. A menu you can update yourself fixes that." },
      { title: "Third-party platform fees", body: "Delivery apps take a large cut. Your own site can steer regulars toward direct ordering or reservations." },
    ],
    design: ["Food photography that loads fast on mobile", "Readable, searchable HTML menus (no PDFs)", "Hours, location and parking info on the first screen", "Private events and catering pages"],
    leadFeatures: ["Reservation booking or link to your booking tool", "Direct online ordering link", "Catering and event enquiry form", "Tap-to-call and directions buttons"],
    searches: ["restaurants near me", "best brunch [city]", "[cuisine] restaurant [city]", "catering [city]", "cafe open now [city]"],
    seoNotes: "Menu items written as real HTML text help you appear for dish-level searches (“best ramen Guelph”), and Restaurant schema can surface hours, price range and cuisine in Google.",
    trust: ["Google rating and recent reviews", "Real dining-room and dish photos", "Press mentions or local awards", "Clear allergy and dietary information"],
    exampleNote: "No restaurant case study published yet. Your free preview will be built around your menu and space.",
  },
  {
    slug: "retail-web-design",
    name: "Retail & Local Shops",
    trade: "retail",
    title: "Websites for independent retailers & local shops",
    metaTitle: "Retail & Local Shop Website Design in Ontario",
    metaDescription:
      "Websites for Ontario independent shops and boutiques: product highlights, store hours, local SEO and optional online store links. Starting at $995 CAD.",
    hero: "Bring the shop-window feeling online.",
    intro:
      "Independent shops win on character and service. Your website should show what makes the store worth the trip, and make it easy to visit, call or buy.",
    challenges: [
      { title: "Competing with big-box and online giants", body: "You can't out-discount Amazon, but you can out-personality it. Your site should show the curation, expertise and local feel." },
      { title: "Is it in stock?", body: "Shoppers want to know before they drive over. Featured products and an easy “ask us” option reduce wasted trips." },
      { title: "Foot traffic from search", body: "“[product] store near me” searches are high intent. Accurate location, hours and categories turn them into visits." },
    ],
    design: ["Featured collections and new arrivals", "Store story and staff picks", "Hours, directions and parking up front", "Seasonal and event promotions"],
    leadFeatures: ["“Check availability” enquiry form", "Optional online store or click-and-collect link", "Newsletter sign-up", "Gift card and special-order requests"],
    searches: ["[product] store near me", "boutique [city]", "gift shop [city]", "[brand] retailer Ontario"],
    seoNotes: "Category pages for what you actually stock, plus an accurate Google Business Profile with photos and products, help you appear for local product searches.",
    trust: ["Google reviews", "Years serving the community", "Brands you carry (with permission)", "Return and service policies"],
    exampleNote: "No retail case study published yet. A free preview is the best way to see what we'd build for your shop.",
  },
  {
    slug: "salon-wellness-web-design",
    name: "Salons, Health & Wellness",
    trade: "wellness",
    title: "Websites for salons, spas, clinics & fitness studios",
    metaTitle: "Salon, Spa & Wellness Website Design in Ontario",
    metaDescription:
      "Websites for Ontario salons, spas, clinics and fitness studios: online booking, service menus, practitioner profiles and local SEO. Starting at $995 CAD.",
    hero: "Fill your calendar, not your inbox.",
    intro:
      "Appointment businesses live and die by bookings. Your site should answer “what do you offer, what does it cost, and when can I come in?” without a phone call.",
    challenges: [
      { title: "Booking friction", body: "If clients have to call during business hours to book, many won't. Clear online booking captures evening and weekend demand." },
      { title: "Trust in personal services", body: "People are choosing who touches their hair, skin or body. Practitioner profiles, credentials and real results matter." },
      { title: "Service menu clarity", body: "Long, confusing price lists slow decisions. Grouped services with durations and starting prices convert better." },
    ],
    design: ["Clean service menus with durations and prices", "Practitioner and team profiles", "Before/after galleries (with client consent)", "Calm, on-brand visual identity"],
    leadFeatures: ["Online booking or link to your booking system", "New-client offer or consultation request", "Gift certificates", "Membership and package sign-ups"],
    searches: ["hair salon [city]", "massage therapy near me", "spa [city]", "physiotherapy [city]", "yoga studio [city]"],
    seoNotes: "A page per core service (e.g. balayage, registered massage therapy) captures specific searches; reviews mentioning those services strengthen local rankings.",
    trust: ["Credentials and registrations (only those held)", "Google reviews", "Hygiene and safety practices", "Clear cancellation policy"],
    exampleNote: "No salon or wellness case study published yet. Your free preview will be built around your services and team.",
  },
  {
    slug: "professional-services-web-design",
    name: "Professional & Local Services",
    trade: "professional services",
    title: "Websites for accountants, consultants, studios & local service firms",
    metaTitle: "Professional Services Website Design in Ontario",
    metaDescription:
      "Websites for Ontario accountants, bookkeepers, consultants, photographers, real estate teams and other local service firms. Credibility-first design and local SEO. Starting at $995 CAD.",
    hero: "Look as established as the expertise you bring.",
    intro:
      "Clients choosing an accountant, consultant or photographer are buying trust. Your website should explain exactly what you do, who it's for and how to start.",
    challenges: [
      { title: "Explaining intangible services", body: "Clear packages, process steps and outcomes make a service easy to understand and easy to buy." },
      { title: "Standing out from look-alike firms", body: "Generic stock photos and vague copy make firms interchangeable. Real people and specific expertise set you apart." },
      { title: "Long consideration", body: "Prospects compare several firms. Useful guides and FAQs keep you in the running and build authority." },
    ],
    design: ["Service packages with clear scope", "Team bios with real photos", "Case examples (with permission)", "Process pages that remove uncertainty"],
    leadFeatures: ["Consultation booking", "Qualified enquiry form", "Downloadable guides or checklists", "Testimonials near every call to action"],
    searches: ["accountant [city]", "bookkeeper near me", "wedding photographer [city]", "small business consultant Ontario"],
    seoNotes: "Helpful, specific articles (e.g. year-end tax checklist for Ontario contractors) attract the right clients and support service-page rankings.",
    trust: ["Designations and memberships (only those held)", "Years in practice", "Client reviews", "Clear pricing or starting rates"],
    exampleNote: "No professional-services case study published yet. Ask for a free preview to see your firm online.",
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
