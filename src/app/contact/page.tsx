import type { Metadata } from "next";
import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { QuoteForm } from "@/components/forms/quote-form";
import { PageHero } from "@/components/site/sections";
import { company } from "@/content/company";

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
        eyebrow="Get in touch"
        title="Start your next project"
        intro="Tell us about your project and we'll follow up within one business day. Attach plans or specs if you have them."
      />
      <section className="py-16 sm:py-20">
        <div className="page-container grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-8">
            <ul className="space-y-6">
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">{label}</p>
                    {href ? (
                      <a href={href} className="text-lg font-semibold text-ink hover:text-primary hover:underline">
                        {value}
                      </a>
                    ) : (
                      <p className="text-lg font-semibold text-ink">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {company.social.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Follow us</p>
                <ul className="mt-2 flex flex-wrap gap-4">
                  {company.social.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary hover:underline"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="rounded-lg bg-ink p-6 text-white">
              <h2 className="text-xl text-white">Are you a subcontractor?</h2>
              <p className="mt-2 text-sm text-white/75">
                Apply to join our network of vetted trades instead.
              </p>
              <Link href="/join-our-network" className="mt-4 inline-block text-sm font-semibold text-brand hover:underline">
                Apply to join →
              </Link>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
