import Link from "next/link";
import { PhoneIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { company } from "@/content/company";
import { DesktopNav } from "./desktop-nav";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/85">
      <div className="page-container flex h-18 items-center justify-between gap-6">
        <Logo priority />
        <DesktopNav />
        <div className="flex items-center gap-2">
          <a
            href={company.phoneHref}
            className="hidden items-center gap-2 text-sm font-semibold text-ink xl:flex"
          >
            <PhoneIcon className="size-4 text-brand" aria-hidden />
            {company.phone}
          </a>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "hidden h-10 bg-brand px-4 font-semibold text-brand-foreground hover:bg-brand-hover sm:inline-flex xl:ml-4",
            )}
          >
            Request a Quote
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
