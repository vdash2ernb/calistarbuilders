import type { Metadata } from "next";
import Link from "next/link";
import { LegalContact, LegalPage } from "@/components/site/legal";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${company.name} collects, uses, shares and protects information submitted through calistar.builders, including SMS communications.`,
  alternates: { canonical: "/privacy" },
};

// Written to cover A2P 10DLC (Dialpad) SMS registration requirements.
// TODO(client): have counsel review before launch, and add the business address in company.ts.
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Your privacy matters to us. This policy explains how we handle the information you share with CALISTAR."
      updated="October 15, 2026"
    >
      <p>
        This Privacy Policy describes how {company.name} (&ldquo;CALISTAR,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;) collects, uses, shares and safeguards personal information submitted through calistar.builders,
        our quote request and subcontractor application forms, and related communications.
      </p>

      <h2 id="collect">Information we collect</h2>
      <p>
        We collect information you give us directly, such as your name, company, email address, phone number, project
        address or location, project details, trade and license information for subcontractor applications, and any
        files you choose to attach. We may also collect limited technical information automatically, such as browser
        type, device type and pages visited, to keep the website working properly and securely.
      </p>

      <h2 id="how-collect">How we collect information</h2>
      <p>
        We collect information when you fill out a form on our website, request a quote, apply to join our
        subcontractor network, call or email us, or otherwise use parts of the website that ask for information.
      </p>

      <h2 id="use">How we use information</h2>
      <ul>
        <li>To review and respond to quote requests, inquiries and subcontractor applications.</li>
        <li>To communicate with you about your project, estimate, schedule or requested services.</li>
        <li>To operate, maintain and improve our website and services.</li>
        <li>To comply with legal, regulatory, security and administrative obligations.</li>
      </ul>

      <h2 id="sms">Text messaging (SMS)</h2>
      <p>
        If you provide your mobile number and opt in to receive text messages from {company.name}, we use that number
        only to contact you about your inquiry, estimates, appointment scheduling and project updates. Message frequency
        varies. Message and data rates may apply.
      </p>
      <p>
        You can opt out at any time by replying <strong>STOP</strong> to any message. Reply <strong>HELP</strong> for
        help, or contact us at {company.phone} or {company.email}. See &ldquo;How we share information&rdquo; below for how
        we handle mobile information, and our{" "}
        <Link href="/terms#sms" className="font-semibold text-primary underline">
          SMS Terms &amp; Conditions
        </Link>{" "}
        for full messaging terms.
      </p>

      <h2 id="share">How we share information</h2>
      <p>
        We do not sell, rent or trade your personal information. We share it only with service providers that help us
        operate our website and run our business, such as website hosting, our customer relationship management
        platform and our messaging provider, and only when they agree to keep it confidential. We may also disclose
        information when required by law.
      </p>
      <p>
        <strong>
          No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.
          Text messaging originator opt-in data and consent are excluded from all of the sharing described above and
          will not be shared with any third parties.
        </strong>
      </p>

      <h2 id="security">Data security</h2>
      <p>
        We use reasonable administrative, technical and physical safeguards to protect personal information against
        unauthorized access, loss, misuse or alteration. No method of transmission or storage is completely secure, so
        we cannot guarantee absolute security.
      </p>

      <h2 id="cookies">Cookies and similar technologies</h2>
      <p>
        Our website may use cookies or similar technologies needed for core functionality, security, performance and
        understanding how the site is used. Most browsers let you block or delete cookies in their settings.
      </p>

      <h2 id="rights">Your choices and rights</h2>
      <p>
        Depending on where you live, including California, you may have the right to request access to, correction of
        or deletion of the personal information we hold about you, and to know how it is used. To make a request,
        contact us using the details below. We will not discriminate against you for exercising these rights.
      </p>

      <h2 id="children">Children&apos;s privacy</h2>
      <p>
        Our website and services are intended for adults and are not directed to children under 13. We do not knowingly
        collect personal information from children. If you believe a child has given us information, contact us and we
        will delete it.
      </p>

      <h2 id="changes">Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date on this page shows when it
        was most recently revised.
      </p>

      <h2 id="contact">Contact us</h2>
      <p>If you have questions about this Privacy Policy or how we handle your information, contact us:</p>
      <LegalContact />
    </LegalPage>
  );
}
