import type { Metadata } from "next";
import { CheckIcon } from "lucide-react";
import { Photo } from "@/components/site/photo";
import {
  CtaBand,
  GhostButton,
  PageHero,
  SectionHeading,
  revealDelay,
  serviceIcons,
} from "@/components/site/sections";
import { cn } from "@/lib/utils";
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
        photo="cranes-day"
        eyebrow="Our services"
        title="Construction management, end to end."
        intro="From vetted subcontractors to full design-build services, we provide everything you need for successful project execution."
      />

      <section className="py-28 sm:py-36">
        <div className="page-container space-y-28 sm:space-y-36">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.icon];
            const flip = i % 2 === 1;
            return (
              <article key={s.slug} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div
                  data-reveal="zoom"
                  className={cn("relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl", flip && "lg:order-last")}
                >
                  <Photo name={s.image} fill sizes="(min-width: 1024px) 45vw, 100vw" />
                  <span className="absolute top-6 left-6 rounded-full bg-white/90 px-4 py-1.5 font-heading text-sm font-semibold text-ink backdrop-blur">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div data-reveal style={revealDelay(1)}>
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-brand text-brand-foreground">
                    <Icon className="size-7" aria-hidden />
                  </span>
                  <h2 className="mt-8 text-4xl leading-[1.02] text-ink sm:text-5xl">{s.title}</h2>
                  <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{s.intro}</p>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {s.included.map((item) => (
                      <li key={item} className="flex gap-3 text-ink">
                        <CheckIcon className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10">
                    <GhostButton href={`/services/${s.slug}`} inverted={false}>
                      View {s.title}
                    </GhostButton>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-muted py-28 sm:py-36">
        <div className="page-container">
          <SectionHeading eyebrow="Every project" title="What you get with CALISTAR." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((v, i) => (
              <div key={v.title} data-reveal style={revealDelay(i)} className="rounded-3xl bg-white p-8 shadow-sm">
                <h3 className="text-2xl text-ink">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand photo="dusk-home" />
    </>
  );
}
