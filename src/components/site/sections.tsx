import Link from "next/link";
import { ArrowRightIcon, ClipboardCheckIcon, NetworkIcon, RulerIcon, WrenchIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { company } from "@/content/company";
import type { Service } from "@/content/services";

export const serviceIcons = {
  network: NetworkIcon,
  clipboard: ClipboardCheckIcon,
  blueprint: RulerIcon,
  wrench: WrenchIcon,
} satisfies Record<Service["icon"], unknown>;

export function Eyebrow({ children, inverted = false }: { children: React.ReactNode; inverted?: boolean }) {
  return (
    <p
      className={cn(
        "mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]",
        inverted ? "text-brand" : "text-steel",
      )}
    >
      <span className="h-0.5 w-6 bg-brand" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  inverted = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  inverted?: boolean;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <Eyebrow inverted={inverted}>{eyebrow}</Eyebrow>}
      <h2 className={cn("text-3xl sm:text-4xl", inverted ? "text-white" : "text-ink")}>{title}</h2>
      {intro && (
        <p className={cn("mt-4 text-lg", inverted ? "text-white/75" : "text-muted-foreground")}>{intro}</p>
      )}
    </div>
  );
}

/** Dark title band at the top of inner pages. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="blueprint-grid bg-ink text-ink-foreground">
      <div className="page-container py-16 sm:py-20">
        <Eyebrow inverted>{eyebrow}</Eyebrow>
        <h1 className="max-w-3xl text-4xl text-white sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-white/75">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function BrandButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ size: "lg" }),
        "h-12 bg-brand px-6 text-base font-semibold text-brand-foreground hover:bg-brand-hover",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function CtaBand({
  title = "Ready to start your next project?",
  body = "Tell us about your scope and timeline. We'll follow up within one business day.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-brand">
      <div className="page-container flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl text-brand-foreground">{title}</h2>
          <p className="mt-2 text-brand-foreground/80">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "h-12 bg-ink px-6 text-base text-white hover:bg-ink/90")}
          >
            Request a Quote <ArrowRightIcon />
          </Link>
          <a
            href={company.phoneHref}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 border-ink/30 bg-transparent px-6 text-base text-ink hover:bg-ink/10",
            )}
          >
            Call {company.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
