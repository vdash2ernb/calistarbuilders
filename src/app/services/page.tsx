import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { CtaBand, PageHero, SectionHeading, serviceIcons } from "@/components/site/sections";
import { valueProps } from "@/content/company";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Vetted subcontractor network, project management, design-build and manufacturer-certified installations for builders in California.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Comprehensive construction management solutions"
        intro="From vetted subcontractors to full design-build services, we provide everything you need for successful project execution."
      />

      <section className="py-20">
        <div className="page-container space-y-6">
          {services.map((s) => {
            const Icon = serviceIcons[s.icon];
            return (
              <article
                key={s.slug}
                className="grid gap-6 rounded-lg border bg-card p-7 sm:p-9 lg:grid-cols-[auto_1fr_1fr] lg:gap-10"
              >
                <span className="flex size-14 items-center justify-center rounded-md bg-secondary text-primary">
                  <Icon className="size-7" aria-hidden />
                </span>
                <div>
                  <h2 className="text-3xl text-ink">{s.title}</h2>
                  <p className="mt-3 text-muted-foreground">{s.intro}</p>
                  <Link
                    href={`/services/${s.slug}`}
                    className="mt-5 inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                  >
                    Learn more about {s.title.toLowerCase()} <ArrowRightIcon className="size-4" aria-hidden />
                  </Link>
                </div>
                <ul className="space-y-2.5 text-sm">
                  {s.included.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="page-container">
          <SectionHeading eyebrow="Every project" title="What you get with CALISTAR" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((v) => (
              <div key={v.title} className="rounded-lg border bg-card p-6">
                <h3 className="text-xl text-ink">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
