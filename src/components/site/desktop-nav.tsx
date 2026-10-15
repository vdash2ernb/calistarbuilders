"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/content/company";

const linkClass =
  "py-2 text-sm font-medium text-white/80 transition-colors duration-300 hover:text-white aria-[current=page]:text-brand group-data-[solid=true]:text-ink/70 group-data-[solid=true]:hover:text-ink group-data-[solid=true]:aria-[current=page]:text-primary";

export function DesktopNav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  return (
    <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={isActive(link.href) ? "page" : undefined}
          className={linkClass}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
