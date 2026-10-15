import Link from "next/link";
import { PhoneIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { company } from "@/content/company";
import { DesktopNav } from "./desktop-nav";
import { HeaderFrame } from "./header-frame";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <HeaderFrame>
      <div className="page-container flex h-20 items-center justify-between gap-6 transition-[height] duration-500 group-data-[solid=true]:h-[4.5rem]">
        <Logo tone="auto" priority />
        <DesktopNav />
        <div className="flex items-center gap-3">
          <a
            href={company.phoneHref}
            className="hidden items-center gap-2 text-sm font-semibold text-white transition-colors duration-500 group-data-[solid=true]:text-ink xl:flex"
          >
            <PhoneIcon className="size-4 text-brand" aria-hidden />
            {company.phone}
          </a>
          <Link
            href="/contact"
            className={cn(
              "hidden h-11 items-center rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground shadow-[0_8px_24px_-8px_rgb(243_156_18/0.7)] transition hover:bg-brand-hover sm:inline-flex xl:ml-3",
            )}
          >
            Request a Quote
          </Link>
          <MobileNav />
        </div>
      </div>
    </HeaderFrame>
  );
}
