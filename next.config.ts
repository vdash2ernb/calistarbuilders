import type { NextConfig } from "next";

// Set by the GitHub Pages workflow (e.g. "/calistarbuilders") so the preview works
// from a sub-folder. Empty for the real domain build.
const basePath = process.env.PAGES_BASE_PATH ?? "";

// Fully static site: `npm run build` writes plain HTML/CSS/JS to `out/`, which can be
// uploaded to any static host. Forms are embedded from the CRM (src/content/crm.ts).
const nextConfig: NextConfig = {
  output: "export",
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
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
