import type { Metadata } from "next";
import { CheckIcon } from "lucide-react";
import { ConsentNotice } from "@/components/site/consent-notice";
import { CrmForm } from "@/components/site/crm-form";
import { PageHero, revealDelay } from "@/components/site/sections";
import { crmForms } from "@/content/crm";

export const metadata: Metadata = {
  title: "Join Our Subcontractor Network",
  description:
    "Licensed, bonded and insured subcontractors: apply to join the CALISTAR network and get access to steady work with builders across California.",
  alternates: { canonical: "/join-our-network" },
};

const benefits = [
  "Steady bid opportunities from custom home builders and commercial projects",
  "Organized jobs with clear scopes, schedules and a single point of contact",
  "Manufacturer installation work for certified crews",
];

const requirements = [
  "Active California contractor license for your trade",
  "Current general liability and workers' compensation insurance",
  "Bonding where required",
  "References from recent projects",
];

export default function JoinPage() {
  return (
    <>
      <PageHero
        photo="sparks"
        eyebrow="For subcontractors"
        title="Join the CALISTAR network."
        intro="We connect vetted trades with builders who need reliable crews. Tell us about your company and we'll be in touch."
      />
      <section className="py-24 sm:py-32">
        <div className="page-container grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div className="space-y-6">
            <List title="Why join" items={benefits} />
            <List title="What we look for" items={requirements} dark delay={1} />
          </div>
          <div data-reveal style={revealDelay(1)}>
            <CrmForm form={crmForms.network} />
            <ConsentNotice />
          </div>
        </div>
      </section>
    </>
  );
}

function List({ title, items, dark = false, delay = 0 }: { title: string; items: string[]; dark?: boolean; delay?: number }) {
  return (
    <div
      data-reveal
      style={revealDelay(delay)}
      className={dark ? "grain relative isolate overflow-hidden rounded-3xl bg-ink p-8 text-white" : "rounded-3xl bg-muted p-8"}
    >
      <h2 className={dark ? "text-3xl text-white" : "text-3xl text-ink"}>{title}</h2>
      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item} className={dark ? "flex gap-3 text-white/85" : "flex gap-3 text-ink"}>
            <CheckIcon className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
