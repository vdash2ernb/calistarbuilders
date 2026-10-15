import { company } from "@/content/company";
import { PageHero } from "./sections";

/** Shared layout for the Privacy Policy and Terms of Use pages. */
export function LegalPage({
  title,
  intro,
  updated,
  toc,
  children,
}: {
  title: string;
  intro: string;
  updated: string;
  toc?: { id: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero photo="plans-hands" eyebrow="Legal" title={title} intro={intro} />
      <section className="py-20 sm:py-28">
        <div className="page-container grid gap-14 lg:grid-cols-[16rem_1fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Last updated</p>
            <p className="mt-1 font-heading text-xl font-bold text-ink">{updated}</p>
            {toc && (
              <nav aria-label="On this page" className="mt-8 hidden rounded-3xl bg-muted p-6 lg:block">
                <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">On this page</p>
                <ol className="mt-4 space-y-2 text-sm">
                  {toc.map((item, i) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="text-ink/75 transition-colors hover:text-primary">
                        {i + 1}. {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </aside>
          <article className="max-w-3xl text-lg leading-relaxed text-muted-foreground [&_h2]:mt-14 [&_h2]:scroll-mt-28 [&_h2]:text-3xl [&_h2]:text-ink [&_h2:first-child]:mt-0 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:text-ink [&_li]:mt-2 [&_p]:mt-4 [&_strong]:text-ink [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:marker:text-brand">
            {children}
          </article>
        </div>
      </section>
    </>
  );
}

export function LegalContact() {
  return (
    <div className="mt-6 rounded-3xl bg-muted p-8 text-base text-ink">
      <p className="font-heading text-xl font-bold">{company.name}</p>
      <p className="mt-3">
        Email:{" "}
        <a href={`mailto:${company.email}`} className="font-semibold text-primary underline">
          {company.email}
        </a>
      </p>
      <p className="mt-1">
        Phone:{" "}
        <a href={company.phoneHref} className="font-semibold text-primary underline">
          {company.phone}
        </a>
      </p>
      {company.address && (
        <p className="mt-1">
          Address: {company.address.street}, {company.address.city}, {company.address.region}{" "}
          {company.address.postalCode}
        </p>
      )}
    </div>
  );
}
