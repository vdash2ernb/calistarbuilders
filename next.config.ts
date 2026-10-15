import type { NextConfig } from "next";

// Fully static site: `npm run build` writes plain HTML/CSS/JS to `out/`, which can be
// uploaded to any static host. Forms are embedded from the CRM (src/content/crm.ts).
const nextConfig: NextConfig = {
  output: "export",
  // Emit /about/index.html instead of /about.html so any host serves clean URLs.
  trailingSlash: true,
  // No image server on a static host; images are pre-sized in /public instead.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
