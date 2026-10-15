import type { MetadataRoute } from "next";
import { company } from "@/content/company";
import { services } from "@/content/services";

// Generated once at build time (required for the static export).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/services/", "/projects/", "/about/", "/join-our-network/", "/contact/", "/privacy/"];
  return [
    ...pages.map((path) => ({
      url: `${company.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...services.map((s) => ({
      url: `${company.url}/services/${s.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
