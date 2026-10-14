import { cacheLife } from "next/cache";
import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { company, navLinks } from "@/content/company";
import { services } from "@/content/services";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="page-container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo inverted />
          <p className="max-w-xs text-sm text-white/70">{company.tagline}</p>
          {company.license && (
            <p className="text-sm text-white/70">
              CSLB Lic. #{company.license.number} ({company.license.classifications})
            </p>
          )}
        </div>

        <FooterColumn title="Services">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="hover:text-white">
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
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
        </FooterColumn>

        <FooterColumn title="Contact">
          <li>
            <a href={company.phoneHref} className="flex items-center gap-2 hover:text-white">
              <PhoneIcon className="size-4 text-brand" aria-hidden /> {company.phone}
            </a>
          </li>
          <li>
            <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-white">
              <MailIcon className="size-4 text-brand" aria-hidden /> {company.email}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <MapPinIcon className="size-4 text-brand" aria-hidden /> {company.serviceArea}
          </li>
          {company.social.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {s.label}
              </a>
            </li>
          ))}
        </FooterColumn>
      </div>
      <div className="border-t border-white/10">
        <div className="page-container flex flex-col gap-2 py-6 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>
            © <CopyrightYear /> {company.name}. All rights reserved.
          </p>
          <Link href="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-base text-white">{title}</h2>
      <ul className="space-y-2.5 text-sm text-white/75">{children}</ul>
    </div>
  );
}
