import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon, HardHatIcon, UsersIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BrandButton,
  CtaBand,
  Eyebrow,
  SectionHeading,
  serviceIcons,
} from "@/components/site/sections";
import { processSteps, stats, valueProps } from "@/content/company";
import { testimonials } from "@/content/proof";
import { services } from "@/content/services";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const heroPoints = [
  "Licensed, bonded & insured network",
  "5+ vetted vendors per trade",
  "Manufacturer-certified installers",
];

export default function HomePage() {
  return (
    <>
      <section className="blueprint-grid relative overflow-hidden bg-ink text-ink-foreground">
        <div className="page-container grid gap-12 py-20 sm:py-24 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:py-28">
          <div>
            <Eyebrow inverted>Construction project management</Eyebrow>
            <h1 className="text-4xl leading-[1.05] text-white sm:text-6xl">
              Building Excellence Through Precision Management
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              Vetted subcontractors, competitive pricing and expert project management for custom
              home builders and commercial projects.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BrandButton href="/contact">
                Request a Quote <ArrowRightIcon />
              </BrandButton>
              <Link
                href="/services"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 border-white/40 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white",
                )}
              >
                View Services
              </Link>
            </div>
            <ul className="mt-10 grid gap-3 text-sm text-white/85 sm:grid-cols-3">
              {heroPoints.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 bg-ink/95 p-6 sm:p-8">
                <dt className="text-sm text-white/70">{s.label}</dt>
                <dd className="order-first font-heading text-4xl font-bold text-brand sm:text-5xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-container">
          <SectionHeading
            eyebrow="Our services"
            title="Comprehensive construction management solutions"
            intro="From vetted subcontractors to full design-build services, we provide everything you need for successful project execution."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((s) => {
              const Icon = serviceIcons[s.icon];
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex flex-col rounded-lg border bg-card p-7 transition hover:border-primary/40 hover:shadow-lg"
                >
                  <span className="mb-5 flex size-12 items-center justify-center rounded-md bg-secondary text-primary">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="text-2xl text-ink">{s.title}</h3>
                  <p className="mt-3 flex-1 text-muted-foreground">{s.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Learn more
                    <ArrowRightIcon className="size-4 transition group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 sm:py-24">
        <div className="page-container">
          <SectionHeading
            eyebrow="How it works"
            title="One partner from first bid to final walkthrough"
            align="center"
          />
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <li key={step.title} className="rounded-lg border bg-card p-6">
                <span className="font-heading text-4xl font-bold text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="page-container grid gap-6 lg:grid-cols-2">
          <AudienceCard
            icon={<HardHatIcon className="size-6" aria-hidden />}
            eyebrow="For builders & owners"
            title="Get competitive bids from trades you can trust"
            body="Send us your plans and timeline. We'll source vetted subcontractors, level the bids and manage the job so you can focus on your clients."
            href="/contact"
            cta="Request a Quote"
            dark
          />
          <AudienceCard
            icon={<UsersIcon className="size-6" aria-hidden />}
            eyebrow="For subcontractors"
            title="Join the CALISTAR network"
            body="Licensed, bonded and insured trades: apply to join our network and get access to steady work with builders across California."
            href="/join-our-network"
            cta="Apply to Join"
          />
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground sm:py-24">
        <div className="page-container">
          <SectionHeading
            eyebrow="Why CALISTAR"
            title="Precision management for modern construction"
            intro="We bridge the gap between custom home builders and quality subcontractors, so every project is executed with precision and professionalism."
            inverted
          />
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            {valueProps.map((v) => (
              <div key={v.title} className="flex gap-4">
                <CheckIcon className="mt-1 size-5 shrink-0 text-brand" aria-hidden />
                <div>
                  <h3 className="text-xl text-white">{v.title}</h3>
                  <p className="mt-1 text-white/75">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="py-20 sm:py-24">
          <div className="page-container">
            <SectionHeading eyebrow="Testimonials" title="What builders say" align="center" />
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <figure key={t.name} className="rounded-lg border bg-card p-6">
                  <blockquote className="text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-4 text-sm text-muted-foreground">
                    <span className="font-semibold text-ink">{t.name}</span>, {t.role}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}

function AudienceCard({
  icon,
  eyebrow,
  title,
  body,
  href,
  cta,
  dark = false,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg p-8 sm:p-10",
        dark ? "blueprint-grid bg-ink text-white" : "border bg-secondary",
      )}
    >
      <span
        className={cn(
          "mb-6 flex size-12 items-center justify-center rounded-md",
          dark ? "bg-brand text-brand-foreground" : "bg-primary text-primary-foreground",
        )}
      >
        {icon}
      </span>
      <Eyebrow inverted={dark}>{eyebrow}</Eyebrow>
      <h2 className={cn("text-3xl", dark ? "text-white" : "text-ink")}>{title}</h2>
      <p className={cn("mt-3 flex-1", dark ? "text-white/75" : "text-muted-foreground")}>{body}</p>
      <div className="mt-8">
        {dark ? (
          <BrandButton href={href}>
            {cta} <ArrowRightIcon />
          </BrandButton>
        ) : (
          <Link
            href={href}
            className={cn(buttonVariants({ size: "lg" }), "h-12 px-6 text-base font-semibold")}
          >
            {cta} <ArrowRightIcon />
          </Link>
        )}
      </div>
    </div>
  );
}
