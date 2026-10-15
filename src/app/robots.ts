import type { MetadataRoute } from "next";
import { company } from "@/content/company";

// Generated once at build time (required for the static export).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${company.url}/sitemap.xml`,
  };
}
