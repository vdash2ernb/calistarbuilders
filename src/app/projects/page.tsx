import type { Metadata } from "next";
import Image from "next/image";
import { Photo } from "@/components/site/photo";
import { BrandButton, CtaBand, PageHero, revealDelay } from "@/components/site/sections";
import { projects } from "@/content/proof";

export const metadata: Metadata = {
  title: "Projects",
  description: "Custom homes, commercial builds and hardscape projects managed by CALISTAR.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        photo="villa-pool"
        eyebrow="Our work"
        title="Projects."
        intro="A look at custom homes, commercial builds and hardscape installations we've managed."
      />

      <section className="py-28 sm:py-36">
        <div className="page-container">
          {projects.length === 0 ? (
            <div
              data-reveal
              className="grain relative isolate overflow-hidden rounded-3xl bg-ink px-8 py-24 text-center text-white sm:px-16"
            >
              <Photo name="interior" fill alt="" className="-z-10 opacity-30" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
              <h2 className="mx-auto max-w-2xl text-4xl leading-[1.02] text-white sm:text-5xl">
                Project case studies are on the way.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
                We&apos;re putting together photos and details from recent jobs. In the meantime, ask us for
                references from builders we work with.
              </p>
              <div className="mt-10 flex justify-center">
                <BrandButton href="/contact">Ask for References</BrandButton>
              </div>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <li key={p.slug} data-reveal style={revealDelay(i)} className="group overflow-hidden rounded-3xl bg-muted">
                  {p.images[0] && (
                    <div className="overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH}${p.images[0].src}`}
                        alt={p.images[0].alt}
                        width={800}
                        height={600}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-7">
                    <p className="text-xs font-semibold tracking-[0.2em] text-steel uppercase">
                      {p.type} · {p.location}
                    </p>
                    <h2 className="mt-2 text-2xl text-ink">{p.title}</h2>
                    <p className="mt-2 text-muted-foreground">{p.summary}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
