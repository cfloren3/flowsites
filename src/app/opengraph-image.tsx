import { ImageResponse } from "next/og";

export const alt = "Flowsites: Built to stand out. Engineered to get found. Websites from $750 CAD.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0D0E0C", color: "#F3F1EA", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="9" fill="#C9F26B" />
            <path d="M7.5 22.5c3.2 0 4.6-2.2 6-5.1 1.5-3.1 3-5.9 7.2-5.9h3.8" fill="none" stroke="#0D0E0C" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M21.3 8.2l3.6 3.3-3.6 3.3" fill="none" stroke="#0D0E0C" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -2 }}>flowsites</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -5, lineHeight: 0.95 }}>Built to stand out.</div>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -5, lineHeight: 0.95, color: "rgba(243,241,234,.4)" }}>Engineered to get found.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "rgba(243,241,234,.7)" }}>
          <div>Web design &amp; local SEO for Ontario trades</div>
          <div style={{ display: "flex", background: "#C9F26B", color: "#0D0E0C", padding: "8px 20px", borderRadius: 999 }}>From $750 CAD</div>
        </div>
      </div>
    ),
    size,
  );
}
