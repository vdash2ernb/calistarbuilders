import type { Metadata } from "next";
import Image from "next/image";
import { CheckIcon, ShieldCheckIcon } from "lucide-react";
import { CtaBand, PageHero, SectionHeading } from "@/components/site/sections";
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
        eyebrow="About CALISTAR"
        title="Precision management for modern construction"
        intro="We bridge the gap between custom home builders and quality subcontractors, so every project is executed with precision and professionalism."
      />

      <section className="py-20">
        <div className="page-container grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-5 text-lg text-muted-foreground">
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
            <ul className="space-y-3 pt-2 text-base text-foreground">
              {commitments.map((c) => (
                <li key={c} className="flex gap-3">
                  <CheckIcon className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="blueprint-grid flex items-center justify-center rounded-lg bg-ink p-12">
            <Image src={logo} alt={`${company.name} logo`} className="w-64 sm:w-80" sizes="320px" />
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="page-container">
          <SectionHeading
            eyebrow="Quality you can trust"
            title="How we vet every contractor"
            intro="Every contractor in our network goes through the same checks before they're put on your job."
          />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {vettingSteps.map((v, i) => (
              <li key={v.title} className="rounded-lg border bg-card p-6">
                <span className="font-heading text-3xl font-bold text-brand">{i + 1}</span>
                <h3 className="mt-2 text-xl text-ink">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20">
        <div className="page-container grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="By the numbers" title="Built on a deep bench of trades" />
            <dl className="grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1 border-l-2 border-brand pl-4">
                  <dt className="text-sm text-muted-foreground">{s.label}</dt>
                  <dd className="order-first font-heading text-4xl font-bold text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-lg border bg-secondary p-8">
            <ShieldCheckIcon className="size-10 text-primary" aria-hidden />
            <h2 className="mt-4 text-2xl text-ink">Licensing & insurance</h2>
            {company.license ? (
              <p className="mt-2 text-muted-foreground">
                CSLB License #{company.license.number} ({company.license.classifications}). Proof of
                insurance and bonding available on request.
              </p>
            ) : (
              <p className="mt-2 text-muted-foreground">
                Proof of licensing, insurance and bonding is available on request.
              </p>
            )}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
