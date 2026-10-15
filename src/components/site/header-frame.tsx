"use client";

import { useEffect, useState } from "react";

/**
 * Fixed header shell: transparent over each page's dark hero, then a solid bar
 * once the page scrolls. Children style themselves with `group-data-[solid=true]:`.
 */
export function HeaderFrame({ children }: { children: React.ReactNode }) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const update = () => setSolid(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      data-solid={solid}
      className="group fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-500 [view-transition-name:site-header] data-[solid=true]:bg-white/90 data-[solid=true]:shadow-[0_1px_0_rgb(0_0_0/0.06),0_8px_30px_-12px_rgb(0_0_0/0.25)] data-[solid=true]:backdrop-blur-xl"
    >
      {children}
    </header>
  );
}
