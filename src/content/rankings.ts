import type { EvidenceStatus } from "./evidence";

/**
 * Ranking records. Every record must state engine, location, device, result type,
 * date checked and method. Status stays "unverified" until a real check is recorded.
 *
 * To verify: export from Google Search Console (Performance → Queries, filter by query,
 * note average position + date range) or run a manual check in a clean browser profile
 * with location set to the city, and record the date, device and organic vs. map position.
 */
export type RankingRecord = {
  keyword: string;
  engine: "Google";
  location: string;
  device: "Desktop" | "Mobile" | "—";
  type: "Organic" | "Map pack" | "Search Console avg. position" | "—";
  position: number | null;
  checked: string | null;
  method: string;
  status: EvidenceStatus;
};

const pending = (keyword: string): RankingRecord => ({
  keyword,
  engine: "Google",
  location: "Guelph, ON",
  device: "—",
  type: "—",
  position: null,
  checked: null,
  method: "Pending: Search Console export or dated location-specific check",
  status: "unverified",
});

export const yardexRankings: RankingRecord[] = [
  {
    keyword: "lawn care Guelph",
    engine: "Google",
    location: "Guelph, ON",
    device: "—",
    type: "Organic",
    position: 2,
    checked: null,
    method: "Owner-reported (carterflorence.com). Dated Search Console export pending.",
    status: "client-reported",
  },
  pending("lawn mowing Guelph"),
  pending("lawn maintenance Guelph"),
  pending("lawn care services Guelph"),
  pending("spring cleanup Guelph"),
  pending("fall cleanup Guelph"),
  pending("landscaping Guelph"),
];

/**
 * DEMONSTRATION DATA ONLY. Used by the ranking dashboard component to show what
 * client reporting looks like. Not real rankings for any business.
 */
export const demoDashboard = {
  business: "Northfield Landscapes (fictional)",
  period: "Last 6 months",
  keywords: [
    { keyword: "landscaping company guelph", history: [24, 19, 14, 11, 8, 6], impressions: 2140, clicks: 96 },
    { keyword: "interlock patio guelph", history: [31, 22, 15, 9, 7, 4], impressions: 860, clicks: 51 },
    { keyword: "garden design guelph", history: [18, 16, 12, 10, 9, 7], impressions: 610, clicks: 22 },
    { keyword: "retaining wall contractor guelph", history: [40, 33, 21, 17, 12, 9], impressions: 430, clicks: 18 },
    { keyword: "sod installation guelph", history: [15, 13, 11, 8, 6, 5], impressions: 980, clicks: 64 },
  ],
  months: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
  traffic: [210, 260, 340, 420, 470, 560],
  leads: [3, 5, 7, 9, 11, 14],
  vitals: { lcp: "1.6s", cls: "0.01", inp: "120ms" },
};
