import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { articles } from "@/content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    u("/", 1, "weekly"),
    u("/free-website-preview", 0.9),
    u("/work", 0.8),
    u("/case-studies", 0.7),
    ...projects.map((p) => u(`/case-studies/${p.slug}`, p.slug === "yardex-guelph" ? 0.8 : 0.6)),
    u("/services", 0.8),
    ...services.map((s) => u(`/services/${s.slug}`, 0.8)),
    u("/industries", 0.7),
    ...industries.map((i) => u(`/industries/${i.slug}`, 0.7)),
    u("/pricing", 0.8),
    u("/how-it-works", 0.7),
    u("/about", 0.6),
    u("/contact", 0.6),
    u("/resources", 0.5, "weekly"),
    ...articles.map((a) => ({ ...u(`/resources/${a.slug}`, 0.5), lastModified: new Date(a.published) })),
  ];
}
