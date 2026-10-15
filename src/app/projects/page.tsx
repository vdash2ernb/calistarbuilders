import type { Metadata } from "next";
import Image from "next/image";
import { CameraIcon } from "lucide-react";
import { CtaBand, PageHero } from "@/components/site/sections";
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
        eyebrow="Our work"
        title="Projects"
        intro="A look at custom homes, commercial builds and hardscape installations we've managed."
      />

      <section className="py-20">
        <div className="page-container">
          {projects.length === 0 ? (
            <div className="mx-auto flex max-w-xl flex-col items-center rounded-lg border border-dashed p-12 text-center">
              <CameraIcon className="size-10 text-muted-foreground" aria-hidden />
              <h2 className="mt-4 text-2xl text-ink">Project case studies are on the way</h2>
              <p className="mt-2 text-muted-foreground">
                We&apos;re putting together photos and details from recent jobs. In the meantime, ask us
                for references from builders we work with.
              </p>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <li key={p.slug} className="overflow-hidden rounded-lg border bg-card">
                  {p.images[0] && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH}${p.images[0].src}`}
                      alt={p.images[0].alt}
                      width={800}
                      height={600}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  )}
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-steel">
                      {p.type} · {p.location}
                    </p>
                    <h2 className="mt-1 text-xl text-ink">{p.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
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
