import { ViewTransition } from "react";
import type { Metadata, Viewport } from "next";
import { Rajdhani, Work_Sans } from "next/font/google";
import { RevealObserver, revealBootScript } from "@/components/motion/reveal-observer";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { company } from "@/content/company";
import { organizationJsonLd } from "@/lib/json-ld";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: `${company.name} | Construction Project Management`,
    template: `%s | ${company.shortName}`,
  },
  description:
    "Vetted subcontractors, competitive pricing and expert construction project management for custom home builders and commercial projects in California.",
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  // Keep preview builds (GitHub Pages) out of search results; canonicals point at the real domain.
  ...(process.env.NEXT_PUBLIC_BASE_PATH && { robots: { index: false, follow: false } }),
};

export const viewport: Viewport = {
  themeColor: "#1c2833",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${workSans.variable} ${rajdhani.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Adds a class to <html> before first paint; suppressHydrationWarning covers it. */}
        <script dangerouslySetInnerHTML={{ __html: revealBootScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:shadow"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          <ViewTransition default="page">{children}</ViewTransition>
        </main>
        <SiteFooter />
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLd() }}
        />
      </body>
    </html>
  );
}
