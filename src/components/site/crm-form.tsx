import Script from "next/script";
import { MailIcon, PhoneIcon } from "lucide-react";
import { company } from "@/content/company";
import { embedScript, type CrmForm as CrmFormConfig } from "@/content/crm";

/** Embeds a CRM-hosted form, or a call/email card until the embed URL is set. */
export function CrmForm({ form }: { form: CrmFormConfig }) {
  if (!form.embedUrl) {
    return (
      <div className="grain relative isolate overflow-hidden rounded-3xl bg-ink p-10 text-white shadow-2xl sm:p-12">
        <h2 className="text-4xl leading-[1.02] text-white">{form.title}</h2>
        <p className="mt-4 text-lg text-white/70">
          Call or email us and we&apos;ll get back to you within one business day.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={company.phoneHref}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand px-7 text-base font-semibold text-brand-foreground shadow-[0_14px_40px_-12px_rgb(243_156_18/0.75)] transition hover:-translate-y-0.5 hover:bg-brand-hover"
          >
            <PhoneIcon className="size-4" aria-hidden /> {company.phone}
          </a>
          <a
            href={`mailto:${company.email}`}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white/10 px-7 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-ink"
          >
            <MailIcon className="size-4" aria-hidden /> {company.email}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
      <iframe
        src={form.embedUrl}
        title={form.title}
        loading="lazy"
        className="block w-full border-0"
        style={{ height: form.height }}
      />
      {embedScript && <Script src={embedScript} strategy="lazyOnload" />}
    </div>
  );
}
