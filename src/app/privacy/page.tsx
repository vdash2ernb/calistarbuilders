import type { Metadata } from "next";
import { PageHero } from "@/components/site/sections";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${company.name} handles information submitted through this website.`,
  alternates: { canonical: "/privacy" },
};

// TODO(client): draft only. Have this reviewed before launch (California / CCPA).
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="py-16">
        <div className="page-container max-w-3xl space-y-6 text-muted-foreground [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:text-ink">
          <p>
            This policy explains what information {company.name} collects through calistar.builders and
            how we use it.
          </p>
          <h2>Information we collect</h2>
          <p>
            When you submit a quote request or a subcontractor application, we collect the details you
            provide, such as your name, company, email address, phone number, project information and any
            files you attach.
          </p>
          <h2>How we use it</h2>
          <p>
            We use this information only to respond to your inquiry, evaluate subcontractor applications
            and manage projects. We do not sell your personal information.
          </p>
          <h2>Sharing</h2>
          <p>
            We may share project details with subcontractors in our network when needed to prepare bids or
            perform work you have asked us to manage.
          </p>
          <h2>Your choices</h2>
          <p>
            To ask what information we hold about you, or to request that it be corrected or deleted,
            email <a className="font-medium text-primary underline" href={`mailto:${company.email}`}>{company.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
