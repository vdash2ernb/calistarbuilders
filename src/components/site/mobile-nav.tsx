"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MenuIcon, PhoneIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { company, navLinks } from "@/content/company";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pendingHref = useRef<string | null>(null);
  const router = useRouter();

  // Navigating while the drawer's scroll lock is active leaves the new page scrolled
  // part-way down, so close the drawer first and navigate once it has fully closed.
  function navigate(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    pendingHref.current = href;
    setOpen(false);
  }

  function onOpenChangeComplete(isOpen: boolean) {
    if (isOpen || !pendingHref.current) return;
    router.push(pendingHref.current);
    pendingHref.current = null;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen} onOpenChangeComplete={onOpenChangeComplete}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon-lg" className="text-white hover:bg-white/10 hover:text-white group-data-[solid=true]:text-ink group-data-[solid=true]:hover:bg-muted lg:hidden" aria-label="Open menu" />}
      >
        <MenuIcon className="size-6" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[88%] gap-0 border-l-0 bg-ink p-0 text-white [&_[data-slot=sheet-close]]:text-white [&_[data-slot=sheet-close]]:hover:bg-white/10"
      >
        <SheetTitle className="px-6 pt-6 pb-2 text-xs font-semibold tracking-[0.25em] text-brand uppercase">
          Menu
        </SheetTitle>
        <nav className="flex flex-col px-6 py-6" aria-label="Mobile">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => navigate(e, link.href)}
              className="flex items-baseline gap-4 py-3 font-heading text-3xl font-semibold text-white/90 transition-colors hover:text-brand"
            >
              <span className="text-xs font-sans text-white/40 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3 p-6">
          <Link
            href="/contact"
            onClick={(e) => navigate(e, "/contact")}
            className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full bg-brand text-base font-semibold text-brand-foreground hover:bg-brand-hover")}
          >
            Request a Quote
          </Link>
          <a
            href={company.phoneHref}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 rounded-full border-white/25 bg-transparent text-base text-white hover:bg-white/10 hover:text-white")}
          >
            <PhoneIcon /> {company.phone}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
