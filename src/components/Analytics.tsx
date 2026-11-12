"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/track";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** Nearest labelled section, so we know where on the page a CTA was clicked. */
function placement(el: Element) {
  const s = el.closest("[data-section], section[id], header, footer, nav, [role=dialog]");
  if (!s) return "page";
  return s.getAttribute("data-section") || s.id || s.getAttribute("aria-labelledby") || s.tagName.toLowerCase();
}

/**
 * GA4 loader (only when NEXT_PUBLIC_GA_ID is set) plus delegated click tracking:
 *  preview_cta_click, case_study_click, work_click, pricing_click, outbound_click, contact_click.
 * Form events (preview_form_start / step / submit) are sent by the forms themselves.
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const where = placement(a);
      const page = window.location.pathname;
      if (href.startsWith("/free-website-preview")) track("preview_cta_click", { placement: where, page });
      else if (href.startsWith("/case-studies/")) track("case_study_click", { project: href.split("/")[2], placement: where, page });
      else if (href === "/work") track("work_click", { placement: where, page });
      else if (href.startsWith("/pricing")) track("pricing_click", { placement: where, page });
      else if (href.startsWith("mailto:") || href.startsWith("tel:")) track("contact_click", { method: href.split(":")[0], placement: where, page });
      else if (/^https?:\/\//.test(href) && !href.includes(window.location.host)) track("outbound_click", { url: href, placement: where, page });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/case-studies/")) track("case_study_view", { project: pathname.split("/")[2] });
  }, [pathname]);

  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
