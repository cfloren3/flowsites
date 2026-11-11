/**
 * Evidence system. Every number or claim shown on the site must carry one of these statuses.
 *
 * verified         Supported by an independent, reliable source we checked (source + date recorded).
 * client-reported  Provided directly by the business owner; not independently audited.
 * historical       Accurate for a documented earlier period; may not reflect today.
 * unverified       Requires further evidence. Shown only as "awaiting verification", never as fact.
 */
export type EvidenceStatus = "verified" | "client-reported" | "historical" | "unverified";

export type Evidence = {
  status: EvidenceStatus;
  source?: string;
  sourceUrl?: string;
  checked?: string; // ISO date
  note?: string;
};

export const evidenceMeta: Record<EvidenceStatus, { label: string; short: string; description: string }> = {
  verified: {
    label: "Verified",
    short: "Verified",
    description: "Supported by an independent source we checked. Source and date are recorded.",
  },
  "client-reported": {
    label: "Client-reported",
    short: "Reported",
    description: "Provided by the business owner. Not independently audited.",
  },
  historical: {
    label: "Historical",
    short: "Historical",
    description: "Accurate for a documented earlier period.",
  },
  unverified: {
    label: "Not yet verified",
    short: "Pending",
    description: "Awaiting evidence. Not presented as fact.",
  },
};
