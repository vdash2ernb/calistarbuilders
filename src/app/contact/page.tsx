import type { Metadata } from "next";
import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { ConsentNotice } from "@/components/site/consent-notice";
import { CrmForm } from "@/components/site/crm-form";
import { PageHero, revealDelay } from "@/components/site/sections";
import { company } from "@/content/company";
import { crmForms } from "@/content/crm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: `Contact ${company.name} about your construction project. Call ${company.phone} or send your plans for a quote.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const details = [
    { icon: PhoneIcon, label: "Phone", value: company.phone, href: company.phoneHref },
    { icon: MailIcon, label: "Email", value: company.email, href: `mailto:${company.email}` },
    { icon: MapPinIcon, label: "Service area", value: company.serviceAreaDetail ?? company.serviceArea },
  ];

  return (
    <>
      <PageHero
        photo="blueprints"
        eyebrow="Get in touch"
        title="Start your next project."
        intro="Tell us about your project and we'll follow up within one business day. Attach plans or specs if you have them."
      />
      <section className="py-24 sm:py-32">
        <div className="page-container grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <div className="space-y-10">
            <ul className="space-y-4">
              {details.map(({ icon: Icon, label, value, href }, i) => (
                <li key={label} data-reveal style={revealDelay(i)} className="flex items-center gap-5 rounded-3xl bg-muted p-6">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-ink text-brand">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">{label}</p>
                    {href ? (
                      <a href={href} className="block truncate text-xl font-semibold text-ink transition-colors hover:text-primary">
                        {value}
                      </a>
                    ) : (
                      <p className="text-xl font-semibold text-ink">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {company.social.length > 0 && (
              <div data-reveal style={revealDelay(3)}>
                <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Follow us</p>
                <ul className="mt-3 flex flex-wrap gap-3">
                  {company.social.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center rounded-full bg-muted px-5 font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div data-reveal style={revealDelay(4)} className="grain relative isolate overflow-hidden rounded-3xl bg-ink p-8 text-white">
              <h2 className="text-2xl text-white">Are you a subcontractor?</h2>
              <p className="mt-2 text-white/70">Apply to join our network of vetted trades instead.</p>
              <Link
                href="/join-our-network"
                className="mt-6 inline-flex h-11 items-center rounded-full bg-brand px-6 font-semibold text-brand-foreground transition hover:bg-brand-hover"
              >
                Apply to Join
              </Link>
            </div>
          </div>
          <div data-reveal style={revealDelay(1)}>
            <CrmForm form={crmForms.quote} />
            <ConsentNotice />
          </div>
        </div>
      </section>
    </>
  );
}
