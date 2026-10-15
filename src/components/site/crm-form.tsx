import Script from "next/script";
import { MailIcon, PhoneIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { company } from "@/content/company";
import { embedScript, type CrmForm as CrmFormConfig } from "@/content/crm";

/** Embeds a CRM-hosted form, or a call/email card until the embed URL is set. */
export function CrmForm({ form }: { form: CrmFormConfig }) {
  if (!form.embedUrl) {
    return (
      <div className="flex flex-col items-start self-start rounded-lg border bg-card p-8 shadow-sm">
        <h2 className="text-2xl text-ink">{form.title}</h2>
        <p className="mt-2 text-muted-foreground">
          Call or email us and we&apos;ll get back to you within one business day.
        </p>
        <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
          <a
            href={company.phoneHref}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 bg-brand px-6 text-base font-semibold text-brand-foreground hover:bg-brand-hover",
            )}
          >
            <PhoneIcon /> {company.phone}
          </a>
          <a
            href={`mailto:${company.email}`}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 px-6 text-base")}
          >
            <MailIcon /> {company.email}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
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
