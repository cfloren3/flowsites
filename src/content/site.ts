/**
 * Single source of truth for Flowsites business information.
 * Everything marked TODO must be confirmed before production launch.
 */
export const site = {
  name: "Flowsites",
  legalName: "Flowsites", // TODO: confirm registered business name
  // TODO: confirm production domain. Set NEXT_PUBLIC_SITE_URL in the environment.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://flowsites.ca").replace(/\/$/, ""),
  // TODO: confirm the public inbox. Set NEXT_PUBLIC_CONTACT_EMAIL.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@flowsites.ca",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "", // left empty until a business line exists
  tagline: "Built to stand out. Engineered to get found.",
  description:
    "Flowsites designs premium, fast, search-ready websites for Ontario trades, restaurants and local businesses. Custom websites starting at $995 CAD, local SEO, and ongoing growth. See your design before you pay.",
  startingPrice: 995,
  currency: "CAD",
  // Service-area business: no storefront or office is claimed.
  base: "Guelph, Ontario",
  region: "Ontario, Canada",
  founder: {
    name: "Carter Florence",
    url: "https://carterflorence.com/",
  },
  responseTime: "within one business day", // TODO: confirm you can honour this
} as const;

export const formatCAD = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
] as const;

export const previewTerms = [
  "The free preview is a custom homepage design for your business, built from your services, photos and reviews, shared as a private link you can open on any device.",
  "If you don't want to go ahead after seeing it, you owe nothing. No deposit is taken before the preview.",
  "If you approve the design, we confirm the full scope (pages, features, timeline) and price in writing before development starts.",
  "The guarantee covers the design preview stage. Once you approve the design and development begins, the agreed project fee applies.",
  "Revisions included in a project are listed in your written quote. Unlimited revisions are not included unless agreed in writing.",
  "Third-party costs are separate and paid by you: domain registration, hosting, premium plugins or fonts, stock photography, email accounts and paid tools.",
  "We may decline a preview where the project scope doesn't suit us. We'll tell you why.",
] as const;
