"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

/**
 * Reveals elements marked with `data-reveal` as they scroll into view by adding
 * `is-revealed` (styles in globals.css). Mounted once in the root layout and
 * re-scans after every navigation.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    window.__revealReady = true;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]:not(.is-revealed)").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

/**
 * Runs before first paint: hides reveal targets only when JavaScript is running,
 * and un-hides everything if the observer hasn't started within 3 seconds.
 */
export const revealBootScript = `document.documentElement.classList.add('reveal-ready');setTimeout(function(){if(!window.__revealReady)document.documentElement.classList.remove('reveal-ready')},3000);`;
