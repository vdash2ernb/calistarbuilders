import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Photo } from "@/components/site/photo";
import {
  BrandButton,
  CtaBand,
  PageHero,
  SectionHeading,
  revealDelay,
  serviceIcons,
} from "@/components/site/sections";
import { getService, services } from "@/content/services";

// Only the known services exist; anything else is a 404 (required for static export).
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.icon];
  // Hide FAQ answers that are still waiting on the client.
  const faqs = service.faqs.filter((f) => !f.a.startsWith("TODO"));
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero photo={service.image} eyebrow="Services" title={service.title} intro={service.intro}>
        <div className="mt-10">
          <BrandButton href="/contact">Request a Quote</BrandButton>
        </div>
      </PageHero>

      <section className="py-28 sm:py-32">
        <div className="page-container grid gap-16 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <div>
            <div data-reveal className="flex items-center gap-4">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-brand text-brand-foreground">
                <Icon className="size-7" aria-hidden />
              </span>
              <h2 className="text-4xl text-ink sm:text-5xl">What&apos;s included</h2>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {service.included.map((item, i) => (
                <li
                  key={item}
                  data-reveal
                  style={revealDelay(i, 70)}
                  className="flex gap-4 rounded-2xl bg-muted p-6 text-lg text-ink"
                >
                  <CheckIcon className="mt-1 size-5 shrink-0 text-brand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            {faqs.length > 0 && (
              <div data-reveal className="mt-20">
                <h2 className="text-4xl text-ink">Frequently asked questions</h2>
                <Accordion className="mt-6">
                  {faqs.map((f) => (
                    <AccordionItem key={f.q} value={f.q}>
                      <AccordionTrigger className="py-5 text-lg">{f.q}</AccordionTrigger>
                      <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div data-reveal className="grain relative isolate overflow-hidden rounded-3xl bg-ink p-8 text-white">
              <h2 className="text-xs font-semibold tracking-[0.25em] text-brand uppercase">Ideal for</h2>
              <ul className="mt-5 space-y-4">
                {service.idealFor.map((item) => (
                  <li key={item} className="flex gap-3 text-lg">
                    <CheckIcon className="mt-1 size-5 shrink-0 text-brand" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <BrandButton href="/contact" className="w-full justify-center">
                  Talk to Us
                </BrandButton>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-muted py-28 sm:py-32">
        <div className="page-container">
          <SectionHeading eyebrow="More services" title="Explore what else we handle." />
          <div className="grid gap-5 md:grid-cols-3">
            {others.map((s, i) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                data-reveal
                style={revealDelay(i)}
                className="group relative isolate flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-7 text-white"
              >
                <Photo
                  name={s.image}
                  fill
                  alt=""
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="-z-10 transition-transform duration-[1.4s] ease-[var(--ease-premium)] group-hover:scale-110"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <h3 className="text-2xl text-white">{s.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={`Let's talk about ${service.title.toLowerCase()}.`} />
    </>
  );
}
