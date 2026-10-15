import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { company, navLinks } from "@/content/company";
import { services } from "@/content/services";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="grain relative isolate overflow-hidden bg-ink text-ink-foreground">
      <div className="page-container grid gap-12 pt-20 pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="space-y-5">
          <Logo tone="light" />
          <p className="max-w-xs leading-relaxed text-white/65">{company.tagline}</p>
          {company.license && (
            <p className="text-sm text-white/65">
              CSLB Lic. #{company.license.number} ({company.license.classifications})
            </p>
          )}
        </div>

        <FooterColumn title="Services">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="transition-colors hover:text-brand">
                {s.title}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Company">
          {navLinks
            .filter((l) => l.href !== "/services")
            .map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          <li>
            <Link href="/privacy" className="transition-colors hover:text-brand">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/terms" className="transition-colors hover:text-brand">
              Terms of Use
            </Link>
          </li>
        </FooterColumn>

        <FooterColumn title="Contact">
          <li>
            <a href={company.phoneHref} className="flex items-center gap-3 transition-colors hover:text-brand">
              <PhoneIcon className="size-4 text-brand" aria-hidden /> {company.phone}
            </a>
          </li>
          <li>
            <a href={`mailto:${company.email}`} className="flex items-center gap-3 transition-colors hover:text-brand">
              <MailIcon className="size-4 text-brand" aria-hidden /> {company.email}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <MapPinIcon className="size-4 text-brand" aria-hidden /> {company.serviceArea}
          </li>
          {company.social.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brand">
                {s.label}
              </a>
            </li>
          ))}
        </FooterColumn>
      </div>

      <p
        aria-hidden
        className="pointer-events-none -mb-[0.18em] text-center font-heading text-[19vw] leading-none font-bold tracking-tight text-white/[0.04] select-none"
      >
        CALISTAR
      </p>

      <div className="bg-black/25">
        <div className="page-container py-6 text-xs text-white/50">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-5 text-xs font-semibold tracking-[0.25em] text-brand uppercase">{title}</h2>
      <ul className="space-y-3 text-sm text-white/75">{children}</ul>
    </div>
  );
}
