/**
 * Lightweight analytics events. Sends to GA4 (gtag) when it is loaded and always
 * pushes to window.dataLayer, so events are ready for GTM or GA4 once configured.
 * No personal data (names, emails, messages) is ever passed here.
 */
type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag === "function") window.gtag("event", event, params);
    else window.dataLayer.push({ event, ...params });
  } catch {}
}
