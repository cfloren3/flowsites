export const industryOptions = [
  "Landscaping / lawn care",
  "General contracting / renovation",
  "Roofing",
  "Plumbing",
  "Electrical",
  "HVAC",
  "Painting",
  "Cleaning / pressure washing / windows",
  "Property maintenance",
  "Concrete / paving",
  "Restaurant / café / bakery",
  "Retail / local shop",
  "Salon / spa / health & wellness",
  "Professional services",
  "Other local business",
] as const;

export const interestOptions = {
  preview: "Free website preview",
  review: "Free website review",
  "web-design": "Website design",
  "local-seo": "SEO & local visibility",
  "website-care": "Ongoing website care",
  general: "General enquiry",
} as const;

export type InquiryInput = {
  name: string;
  business: string;
  email: string;
  phone?: string;
  website?: string;
  industry: string;
  location: string;
  improve: string;
  interest: keyof typeof interestOptions;
};

export type FieldErrors = Partial<Record<keyof InquiryInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiry(raw: Record<string, unknown>): { data?: InquiryInput; errors: FieldErrors } {
  const s = (k: string, max = 200) => (typeof raw[k] === "string" ? (raw[k] as string).trim().slice(0, max) : "");
  const data: InquiryInput = {
    name: s("name", 100),
    business: s("business", 140),
    email: s("email", 160),
    phone: s("phone", 40),
    website: s("website", 200),
    industry: s("industry", 80),
    location: s("location", 120),
    improve: s("improve", 3000),
    interest: (Object.keys(interestOptions).includes(s("interest")) ? s("interest") : "general") as InquiryInput["interest"],
  };
  const errors: FieldErrors = {};
  // Quick messages (floating contact panel) only need name, email and a message.
  const quick = raw.quick === true || raw.quick === "1";
  if (quick) {
    data.business ||= "Not provided (quick message)";
    data.industry ||= "Not provided";
    data.location ||= "Not provided";
  }
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (data.business.length < 2) errors.business = "Please enter your business name.";
  if (!EMAIL.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.phone && !/^[+()\d\s.-]{7,20}$/.test(data.phone)) errors.phone = "Please enter a valid phone number, or leave it blank.";
  if (data.website && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(data.website)) errors.website = "Please enter a valid web address, or leave it blank.";
  if (!data.industry) errors.industry = "Please choose your industry.";
  if (data.location.length < 2) errors.location = "Where do you work? A town or region is fine.";
  if (data.improve.length < (quick ? 5 : 10))
    errors.improve = quick ? "Please add a short message." : "Tell us a little about what you'd like to improve (at least 10 characters).";
  return Object.keys(errors).length ? { errors } : { data, errors };
}
