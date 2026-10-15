"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/content/company";

const linkClass =
  "text-sm font-medium text-foreground/80 transition-colors hover:text-foreground aria-[current=page]:text-foreground aria-[current=page]:underline aria-[current=page]:decoration-brand aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8";

export function DesktopNav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  return (
    <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
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
