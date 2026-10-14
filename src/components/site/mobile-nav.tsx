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
        render={<Button variant="ghost" size="icon-lg" className="lg:hidden" aria-label="Open menu" />}
      >
        <MenuIcon className="size-6" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[85%] gap-0 p-0">
        <SheetTitle className="border-b px-6 py-5 font-heading text-xl">Menu</SheetTitle>
        <nav className="flex flex-col px-3 py-4" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => navigate(e, link.href)}
              className="rounded-md px-3 py-3 text-base font-medium hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3 border-t p-6">
          <Link
            href="/contact"
            onClick={(e) => navigate(e, "/contact")}
            className={cn(buttonVariants({ size: "lg" }), "h-11 bg-brand text-brand-foreground hover:bg-brand-hover")}
          >
            Request a Quote
          </Link>
          <a
            href={company.phoneHref}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11")}
          >
            <PhoneIcon /> {company.phone}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
