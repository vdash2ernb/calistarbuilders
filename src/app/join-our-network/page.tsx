import type { Metadata } from "next";
import { CheckIcon } from "lucide-react";
import { NetworkForm } from "@/components/forms/network-form";
import { PageHero } from "@/components/site/sections";

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
        eyebrow="For subcontractors"
        title="Join the CALISTAR network"
        intro="We connect vetted trades with builders who need reliable crews. Tell us about your company and we'll be in touch."
      />
      <section className="py-16 sm:py-20">
        <div className="page-container grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-10">
            <List title="Why join" items={benefits} />
            <List title="What we look for" items={requirements} />
          </div>
          <NetworkForm />
        </div>
      </section>
    </>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="text-2xl text-ink">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <CheckIcon className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
