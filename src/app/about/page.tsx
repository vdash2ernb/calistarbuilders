import type { Metadata } from "next";
import Image from "next/image";
import { CheckIcon, ShieldCheckIcon } from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { Photo } from "@/components/site/photo";
import { CtaBand, PageHero, SectionHeading, revealDelay } from "@/components/site/sections";
import { company, stats } from "@/content/company";
import logo from "../../../public/brand/calistar-logo.png";

export const metadata: Metadata = {
  title: "About",
  description:
    "CALISTAR Management Company specializes in construction project management and contract management, connecting builders with vetted subcontractors.",
  alternates: { canonical: "/about" },
};

const commitments = [
  "Licensed, bonded and insured contractors",
  "Transparent pricing and competitive rates",
  "Dedicated project management support",
  "Manufacturer-certified installations",
];

const vettingSteps = [
  { title: "License check", body: "Active state license verified for the right classification." },
  { title: "Insurance & bonding", body: "Current liability, workers' comp and bonding on file." },
  { title: "Past performance", body: "References and completed work reviewed before onboarding." },
  { title: "Ongoing review", body: "Quality, schedule and communication tracked on every job." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        photo="framing"
        eyebrow="About CALISTAR"
        title="Precision management for modern construction."
        intro="We bridge the gap between custom home builders and quality subcontractors, so every project is executed with precision and professionalism."
      />

      <section className="overflow-hidden py-28 sm:py-36">
        <div className="page-container grid items-center gap-20 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our story" title="Reliable trades, fair pricing and someone accountable." className="mb-8" />
            <div data-reveal style={revealDelay(1)} className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                {company.name} specializes in construction project management and contract management
                services. Builders come to us for reliable trades, competitive pricing and someone to keep
                the job on schedule.
              </p>
              <p>
                Our network of vetted, licensed, bonded and insured subcontractors means you always have
                access to reliable professionals. With five or more vendors per trade, we deliver
                competitive pricing without compromising quality.
              </p>
            </div>
            <ul data-reveal style={revealDelay(2)} className="mt-8 space-y-3">
              {commitments.map((c) => (
                <li key={c} className="flex gap-3 font-medium text-ink">
                  <CheckIcon className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative pb-20 lg:pl-12">
            <div data-reveal="zoom" className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
              <Photo name="plans-hands" fill sizes="(min-width: 1024px) 40vw, 90vw" />
            </div>
            <div
              data-reveal
              style={revealDelay(3)}
              className="grain absolute bottom-0 left-0 isolate flex w-[58%] items-center justify-center overflow-hidden rounded-3xl bg-ink p-8 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.5)]"
            >
              <Image src={logo} alt={`${company.name} logo`} className="w-full max-w-56" sizes="224px" />
            </div>
          </div>
        </div>
      </section>

      <section className="grain relative isolate overflow-hidden bg-ink py-28 text-white sm:py-36">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Photo name="site-workers" fill alt="" className="parallax" />
          <div className="absolute inset-0 bg-ink/85" />
        </div>
        <div className="page-container">
          <SectionHeading
            eyebrow="Quality you can trust"
            title="How we vet every contractor."
            intro="Every contractor in our network goes through the same checks before they're put on your job."
            inverted
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {vettingSteps.map((v, i) => (
              <li
                key={v.title}
                data-reveal
                style={revealDelay(i)}
                className="rounded-3xl bg-white/[0.07] p-8 backdrop-blur-sm"
              >
                <span className="font-heading text-5xl leading-none font-bold text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-2xl text-white">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-white/65">{v.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-28 sm:py-36">
        <div className="page-container grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="By the numbers" title="Built on a deep bench of trades." className="mb-10" />
            <dl className="grid grid-cols-2 gap-x-8 gap-y-10">
              {stats.map((s, i) => (
                <div key={s.label} data-reveal style={revealDelay(i)} className="flex flex-col gap-2">
                  <dt className="order-last text-sm font-semibold tracking-[0.15em] text-muted-foreground uppercase">
                    {s.label}
                  </dt>
                  <dd className="font-heading text-6xl leading-none font-bold text-ink">
                    <CountUp value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div data-reveal style={revealDelay(2)} className="rounded-3xl bg-muted p-10">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-ink text-brand">
              <ShieldCheckIcon className="size-7" aria-hidden />
            </span>
            <h2 className="mt-6 text-3xl text-ink">Licensing & insurance</h2>
            {company.license ? (
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                CSLB License #{company.license.number} ({company.license.classifications}). Proof of
                insurance and bonding available on request.
              </p>
            ) : (
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                Proof of licensing, insurance and bonding is available on request.
              </p>
            )}
          </div>
        </div>
      </section>

      <CtaBand photo="modern-home" />
    </>
  );
}
