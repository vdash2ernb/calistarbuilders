import type { Metadata } from "next";
import Link from "next/link";
import { BadgeDollarSignIcon, CheckIcon, ReceiptTextIcon, ShieldCheckIcon, UserRoundCheckIcon } from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { Photo } from "@/components/site/photo";
import {
  BrandButton,
  CtaBand,
  Eyebrow,
  GhostButton,
  Marquee,
  SectionHeading,
  revealDelay,
} from "@/components/site/sections";
import { company, processSteps, stats, trades, valueProps } from "@/content/company";
import type { PhotoName } from "@/content/photos";
import { testimonials } from "@/content/proof";
import { services } from "@/content/services";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const heroLines = [
  [{ text: "Building Excellence" }],
  [{ text: "Through " }, { text: "Precision", accent: true }],
  [{ text: "Management" }],
];

const heroPoints = [
  "Licensed, bonded & insured network",
  "5+ vetted vendors per trade",
  "Manufacturer-certified installers",
];

const valueIcons = [BadgeDollarSignIcon, ShieldCheckIcon, UserRoundCheckIcon, ReceiptTextIcon];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 -z-10">
          <Photo name="home-hero" fill priority alt="" className="animate-ken-burns" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/60 to-ink/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/40" />
        </div>

        <div className="page-container flex flex-1 flex-col justify-center pt-32 pb-12">
          <div className="animate-fade-in [animation-delay:100ms]">
            <Eyebrow inverted>
              Construction project management<span className="hidden sm:inline"> · California</span>
            </Eyebrow>
          </div>
          <h1 className="max-w-5xl text-[clamp(3rem,8.5vw,7.5rem)] leading-[0.92] font-bold text-white">
            {heroLines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
                <span
                  className="block animate-rise"
                  style={{ animationDelay: `${250 + i * 130}ms` }}
                >
                  {line.map((part) => (
                    <span key={part.text} className={part.accent ? "text-brand" : undefined}>
                      {part.text}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </h1>
          <p className="mt-8 max-w-xl animate-fade-in text-lg leading-relaxed text-white/80 [animation-delay:750ms] sm:text-xl">
            Vetted subcontractors, competitive pricing and expert project management for custom home
            builders and commercial projects.
          </p>
          <div className="mt-10 flex animate-fade-in flex-wrap gap-4 [animation-delay:900ms]">
            <BrandButton href="/contact">Request a Quote</BrandButton>
            <GhostButton href="/services">Explore Services</GhostButton>
          </div>
        </div>

        <div className="page-container animate-fade-in pb-10 [animation-delay:1100ms]">
          <ul className="grid gap-3 rounded-2xl bg-white/[0.08] p-3 backdrop-blur-xl sm:grid-cols-3">
            {heroPoints.map((point) => (
              <li key={point} className="flex items-center gap-3 rounded-xl bg-white/[0.06] px-5 py-4 text-sm font-medium text-white/90">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground">
                  <CheckIcon className="size-4" aria-hidden />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Trades ticker */}
      <section aria-label="Trades in our network" className="bg-ink text-white/90">
        <Marquee items={trades} />
      </section>

      {/* Intro */}
      <section className="overflow-hidden py-28 sm:py-36">
        <div className="page-container grid items-center gap-20 lg:grid-cols-2">
          <div className="relative pb-16 lg:pr-12 lg:pb-20">
            <div data-reveal="zoom" className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
              <Photo name="framing" fill sizes="(min-width: 1024px) 40vw, 90vw" />
            </div>
            <div
              data-reveal
              style={revealDelay(3)}
              className="absolute right-0 bottom-0 w-[55%] overflow-hidden rounded-3xl shadow-[0_30px_80px_-20px_rgb(0_0_0/0.45)]"
            >
              <div className="relative aspect-square">
                <Photo name="plans-hands" fill sizes="(min-width: 1024px) 22vw, 50vw" />
              </div>
            </div>
            <div
              data-reveal
              style={revealDelay(5)}
              className="absolute top-6 right-4 rounded-2xl bg-brand px-5 py-4 text-brand-foreground shadow-xl lg:top-10 lg:right-auto lg:-left-8 lg:px-6 lg:py-5"
            >
              <p className="font-heading text-4xl leading-none font-bold lg:text-5xl">5+</p>
              <p className="mt-1 text-sm font-semibold">vetted vendors per trade</p>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="We bridge the gap between builders and the trades they rely on."
              className="mb-8"
            />
            <div data-reveal style={revealDelay(1)} className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                {company.name} specializes in construction project management and contract management.
                We connect custom home builders with quality subcontractors and keep every project moving
                with precision and professionalism.
              </p>
              <p>
                With five or more licensed, bonded and insured vendors per trade, you get competitive
                pricing without compromising on quality.
              </p>
            </div>
            <ul data-reveal style={revealDelay(2)} className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Licensed, bonded & insured", "Transparent pricing", "Dedicated project support", "Certified installations"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3 font-medium text-ink">
                    <CheckIcon className="size-5 text-brand" aria-hidden /> {item}
                  </li>
                ),
              )}
            </ul>
            <div data-reveal style={revealDelay(3)} className="mt-10">
              <GhostButton href="/about" inverted={false}>
                About CALISTAR
              </GhostButton>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-muted py-28 sm:py-36">
        <div className="page-container">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Our services"
              title="Everything a build needs, managed in one place."
              intro="From vetted subcontractors to full design-build, we provide what you need for successful project execution."
              className="mb-0"
            />
            <div data-reveal className="shrink-0">
              <GhostButton href="/services" inverted={false}>
                All Services
              </GhostButton>
            </div>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                data-reveal
                style={revealDelay(i)}
                className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-7 text-white shadow-lg"
              >
                <Photo
                  name={s.image}
                  fill
                  alt=""
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="-z-10 transition-transform duration-[1.4s] ease-[var(--ease-premium)] group-hover:scale-110"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-ink/5 transition-opacity duration-700 group-hover:opacity-90" />
                <span className="font-heading text-lg font-semibold text-brand">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-2xl leading-tight text-white">{s.title}</h3>
                <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[var(--ease-premium)] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-visible:grid-rows-[1fr]">
                  <p className="overflow-hidden text-sm leading-relaxed text-white/75">
                    <span className="block pt-3">{s.summary}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grain relative isolate overflow-hidden bg-ink py-28 text-white sm:py-36">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Photo name="cranes-dusk" fill alt="" className="parallax" />
          <div className="absolute inset-0 bg-ink/80" />
        </div>
        <div className="page-container">
          <SectionHeading
            eyebrow="By the numbers"
            title="A deep bench of trades behind every project."
            align="center"
            inverted
          />
          <dl className="grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} data-reveal style={revealDelay(i, 120)} className="flex flex-col items-center text-center">
                <dt className="order-last mt-3 text-sm font-semibold tracking-[0.18em] text-white/60 uppercase">
                  {s.label}
                </dt>
                <dd className="font-heading text-6xl leading-none font-bold text-brand sm:text-7xl">
                  <CountUp value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Process */}
      <section className="py-28 sm:py-36">
        <div className="page-container grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div data-reveal="zoom" className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl lg:aspect-[4/5]">
              <Photo name="rebar-aerial" fill sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="How it works" title="One partner from first bid to final walkthrough." />
            <ol className="space-y-6">
              {processSteps.map((step, i) => (
                <li
                  key={step.title}
                  data-reveal
                  className="flex gap-6 rounded-3xl bg-muted p-8 transition-colors duration-500 hover:bg-secondary"
                >
                  <span className="font-heading text-5xl leading-none font-bold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-2xl text-ink">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="pb-28 sm:pb-36">
        <div className="page-container grid gap-6 lg:grid-cols-2">
          <AudiencePanel
            photo="dusk-home"
            eyebrow="For builders & owners"
            title="Get competitive bids from trades you can trust."
            body="Send us your plans and timeline. We source vetted subcontractors, level the bids and manage the job so you can focus on your clients."
            href="/contact"
            cta="Request a Quote"
          />
          <AudiencePanel
            photo="sparks"
            eyebrow="For subcontractors"
            title="Join the CALISTAR network."
            body="Licensed, bonded and insured trades: apply to join our network for steady work with builders across California."
            href="/join-our-network"
            cta="Apply to Join"
            delay={2}
          />
        </div>
      </section>

      {/* Why CALISTAR */}
      <section className="grain relative isolate overflow-hidden bg-ink py-28 text-white sm:py-36">
        <div className="page-container">
          <SectionHeading
            eyebrow="Why CALISTAR"
            title="Precision management for modern construction."
            intro="Every project gets the same standard: vetted trades, clear pricing and someone accountable for the details."
            inverted
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <div
                  key={v.title}
                  data-reveal
                  style={revealDelay(i)}
                  className="rounded-3xl bg-white/[0.06] p-8 transition-colors duration-500 hover:bg-white/[0.1]"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-brand text-brand-foreground">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-2xl text-white">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/65">{v.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="py-28 sm:py-36">
          <div className="page-container">
            <SectionHeading eyebrow="Testimonials" title="What builders say." align="center" />
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <figure key={t.name} data-reveal style={revealDelay(i)} className="rounded-3xl bg-muted p-8">
                  <blockquote className="text-lg leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-6 text-sm text-muted-foreground">
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

function AudiencePanel({
  photo,
  eyebrow,
  title,
  body,
  href,
  cta,
  delay = 0,
}: {
  photo: PhotoName;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  delay?: number;
}) {
  return (
    <div
      data-reveal
      style={revealDelay(delay)}
      className="group grain relative isolate flex min-h-[34rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-8 text-white sm:p-12"
    >
      <Photo
        name={photo}
        fill
        alt=""
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="-z-10 transition-transform duration-[1.6s] ease-[var(--ease-premium)] group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
      <Eyebrow inverted>{eyebrow}</Eyebrow>
      <h2 className="max-w-md text-4xl leading-[1.02] text-white sm:text-5xl">{title}</h2>
      <p className="mt-4 max-w-md leading-relaxed text-white/75">{body}</p>
      <div className="mt-8">
        <BrandButton href={href}>{cta}</BrandButton>
      </div>
    </div>
  );
}
