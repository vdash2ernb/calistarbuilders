import Link from "next/link";
import {
  ClipboardCheckIcon,
  NetworkIcon,
  PhoneIcon,
  RulerIcon,
  WrenchIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { company } from "@/content/company";
import type { PhotoName } from "@/content/photos";
import type { Service } from "@/content/services";
import { Photo } from "./photo";

export const serviceIcons = {
  network: NetworkIcon,
  clipboard: ClipboardCheckIcon,
  blueprint: RulerIcon,
  wrench: WrenchIcon,
} satisfies Record<Service["icon"], unknown>;

/** Stagger helper for `data-reveal` children. */
export const revealDelay = (index: number, step = 90) =>
  ({ "--reveal-delay": `${index * step}ms` }) as React.CSSProperties;

export function Eyebrow({
  children,
  inverted = false,
  className,
}: {
  children: React.ReactNode;
  inverted?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-5 text-xs font-semibold tracking-[0.28em] uppercase",
        inverted ? "text-brand" : "text-steel",
        className,
      )}
    >
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
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  inverted?: boolean;
  className?: string;
}) {
  return (
    <div data-reveal className={cn("mb-14 max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow inverted={inverted}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "text-4xl leading-[1.02] sm:text-5xl lg:text-6xl",
          inverted ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-6 text-lg leading-relaxed", inverted ? "text-white/70" : "text-muted-foreground")}>
          {intro}
        </p>
      )}
    </div>
  );
}

/** Full-bleed photo hero at the top of inner pages. */
export function PageHero({
  eyebrow,
  title,
  intro,
  photo,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  photo: PhotoName;
  children?: React.ReactNode;
}) {
  return (
    <section className="grain relative isolate flex min-h-[72svh] items-end overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-10">
        <Photo name={photo} fill priority alt="" className="animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      </div>
      <div className="page-container pt-40 pb-16 sm:pb-24">
        <div className="animate-fade-in [animation-delay:150ms]">
          <Eyebrow inverted>{eyebrow}</Eyebrow>
        </div>
        <h1 className="max-w-4xl animate-fade-in text-5xl leading-[0.98] text-white [animation-delay:300ms] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl animate-fade-in text-lg leading-relaxed text-white/75 [animation-delay:500ms] sm:text-xl">
            {intro}
          </p>
        )}
        {children && <div className="animate-fade-in [animation-delay:700ms]">{children}</div>}
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
        "inline-flex h-14 items-center rounded-full bg-brand px-8 text-base font-semibold text-brand-foreground shadow-[0_14px_40px_-12px_rgb(243_156_18/0.75)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-hover",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function GhostButton({
  href,
  children,
  inverted = true,
  className,
}: {
  href: string;
  children: React.ReactNode;
  inverted?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-14 items-center gap-2 rounded-full border px-7 text-base font-semibold transition duration-300 hover:-translate-y-0.5",
        inverted
          ? "border-white/30 text-white backdrop-blur-sm hover:border-white hover:bg-white hover:text-ink"
          : "border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white",
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** Infinite ticker of short labels. Duplicated once so the loop is seamless. */
export function Marquee({ items, className }: { items: readonly string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-heading text-2xl font-semibold tracking-wide uppercase sm:text-3xl">{item}</span>
          <span className="size-2 rotate-45 bg-brand" aria-hidden />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("group/marquee relative flex overflow-hidden py-7", className)}>
      <div className="flex animate-marquee group-hover/marquee:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}

export function CtaBand({
  title = "Ready to build something exceptional?",
  body = "Tell us about your scope and timeline. We'll follow up within one business day.",
  photo = "patio-sunset",
}: {
  title?: string;
  body?: string;
  photo?: PhotoName;
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-ink py-28 text-white sm:py-36">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Photo name={photo} fill alt="" sizes="100vw" className="parallax" />
        <div className="absolute inset-0 bg-ink/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      </div>
      <div data-reveal className="page-container flex flex-col items-center text-center">
        <Eyebrow inverted>Start your project</Eyebrow>
        <h2 className="max-w-4xl text-4xl leading-[1.02] text-white sm:text-6xl lg:text-7xl">{title}</h2>
        <p className="mt-6 max-w-xl text-lg text-white/75">{body}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <BrandButton href="/contact">Request a Quote</BrandButton>
          <a
            href={company.phoneHref}
            className="inline-flex h-14 items-center gap-2 rounded-full border border-white/30 px-7 text-base font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-ink"
          >
            <PhoneIcon className="size-4" aria-hidden /> {company.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
