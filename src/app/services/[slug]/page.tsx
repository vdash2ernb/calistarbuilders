import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BrandButton, CtaBand, PageHero, serviceIcons } from "@/components/site/sections";
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
      <PageHero eyebrow="Services" title={service.title} intro={service.intro}>
        <div className="mt-8">
          <BrandButton href="/contact">
            Request a Quote <ArrowRightIcon />
          </BrandButton>
        </div>
      </PageHero>

      <section className="py-20">
        <div className="page-container grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="flex items-center gap-3 text-3xl text-ink">
              <Icon className="size-7 text-primary" aria-hidden /> What&apos;s included
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.included.map((item) => (
                <li key={item} className="flex gap-3 rounded-md border bg-card p-4">
                  <CheckIcon className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            {faqs.length > 0 && (
              <>
                <h2 className="mt-14 text-3xl text-ink">Frequently asked questions</h2>
                <Accordion className="mt-4">
                  {faqs.map((f) => (
                    <AccordionItem key={f.q} value={f.q}>
                      <AccordionTrigger className="text-base">{f.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-lg bg-secondary p-6">
              <h2 className="text-xl text-ink">Ideal for</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {service.idealFor.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border p-6">
              <h2 className="text-xl text-ink">Other services</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {others.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="font-medium text-primary hover:underline">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand title={`Talk to us about ${service.title.toLowerCase()}`} />
    </>
  );
}
