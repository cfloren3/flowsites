import Link from "next/link";
import { Logo } from "./Logo";
import { PaletteSwitcher } from "./PaletteSwitcher";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-ink text-paper">
      <div className="container-x pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo inverted />
            <p className="mt-6 max-w-sm text-paper/60 leading-relaxed">
              Premium websites, local SEO and ongoing growth for Ontario&apos;s trades, restaurants and local businesses. Based in Guelph, working across Ontario.
            </p>
            <p className="label mt-6 text-paper/55">Websites starting at $750 CAD · See it before you pay</p>
            <a href={`mailto:${site.email}`} className="mt-6 inline-block text-lg underline decoration-paper/30 underline-offset-4 hover:decoration-volt">
              {site.email}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <FooterCol title="Services" links={services.map((s) => ({ label: s.name.split(" &")[0].replace("Ongoing ", ""), href: `/services/${s.slug}` }))} />
            <FooterCol title="Industries" links={industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` }))} />
            <FooterCol title="Work" links={projects.map((p) => ({ label: p.name, href: `/case-studies/${p.slug}` }))} />
            <FooterCol
              title="Company"
              links={[
                { label: "About", href: "/about" },
                { label: "Case studies", href: "/case-studies" },
                { label: "Pricing", href: "/pricing" },
                { label: "Free preview", href: "/free-website-preview" },
                { label: "Resources", href: "/resources" },
                { label: "Contact", href: "/contact" },
              ]}
            />
          </div>
        </div>
        <div aria-hidden="true" className="mt-20 select-none overflow-hidden">
          <svg viewBox="0 0 1000 190" className="w-full" focusable="false">
            <text x="0" y="160" fill="color-mix(in_oklab,var(--p-paper)_6%,transparent)" fontFamily="var(--font-geist-sans)" fontWeight="600" fontSize="226" letterSpacing="-15">
              flowsites
            </text>
          </svg>
        </div>
        <div className="mt-6 flex flex-col gap-3 border-t border-paper/10 pt-6 text-sm text-paper/55 md:flex-row md:justify-between">
          <p>© {year} {site.legalName}. All prices in Canadian dollars (CAD), plus applicable HST.</p>
          <div className="flex items-center gap-3">
            <span>Palette</span>
            <PaletteSwitcher dark />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="label text-paper/55">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[0.93rem] text-paper/75 hover:text-paper transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
