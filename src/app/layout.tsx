import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { RevealObserver, SmoothScroll } from "@/components/Motion";
import { JsonLd } from "@/components/JsonLd";
import { ContactDock } from "@/components/ContactDock";
import { PreviewPopup } from "@/components/PreviewPopup";
import { site } from "@/content/site";
import { services } from "@/content/services";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Flowsites | Web Design & Local SEO for Ontario Trades & Local Businesses",
    template: "%s | Flowsites",
  },
  description: site.description,
  applicationName: "Flowsites",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Flowsites",
    url: site.url,
    title: "Flowsites | Built to stand out. Engineered to get found.",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#business`,
      name: site.name,
      url: site.url,
      email: site.email,
      description: site.description,
      logo: `${site.url}/icon.svg`,
      image: `${site.url}/opengraph-image`,
      priceRange: "Starting at $995 CAD",
      currenciesAccepted: "CAD",
      // Service-area business: no street address is published.
      areaServed: { "@type": "AdministrativeArea", name: "Ontario, Canada" },
      founder: { "@type": "Person", name: site.founder.name, url: site.founder.url },
      knowsAbout: ["Web design", "Local SEO", "Technical SEO", "Conversion rate optimisation", "Google Business Profile"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Flowsites services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, url: `${site.url}/services/${s.slug}` },
          ...(s.slug === "web-design"
            ? { priceSpecification: { "@type": "PriceSpecification", minPrice: 995, priceCurrency: "CAD" } }
            : {}),
        })),
      },
    },
    { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, inLanguage: "en-CA", publisher: { "@id": `${site.url}/#business` } },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');try{var p=localStorage.getItem('fs-palette');if(p&&p!=='navy')document.documentElement.dataset.palette=p}catch(e){}",
          }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <JsonLd data={orgSchema} />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <ContactDock />
        <PreviewPopup />
        <RevealObserver />
        <SmoothScroll />
      </body>
    </html>
  );
}
