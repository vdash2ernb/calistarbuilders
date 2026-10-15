import type { Metadata } from "next";
import Link from "next/link";
import { LegalContact, LegalPage } from "@/components/site/legal";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for calistar.builders, including SMS/text messaging terms and conditions for ${company.name}.`,
  alternates: { canonical: "/terms" },
};

const toc = [
  { id: "website", label: "Using our website" },
  { id: "ip", label: "Intellectual property" },
  { id: "communications", label: "Inquiries & communications" },
  { id: "sms", label: "SMS terms & conditions" },
  { id: "email", label: "Email communications" },
  { id: "links", label: "Third-party links" },
  { id: "disclaimer", label: "Disclaimer" },
  { id: "liability", label: "Limitation of liability" },
  { id: "changes", label: "Changes to these terms" },
  { id: "law", label: "Governing law" },
  { id: "contact", label: "Contact information" },
];

// Written to cover A2P 10DLC (Dialpad) SMS registration requirements.
// TODO(client): have counsel review before launch, and add the business address in company.ts.
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro="Please read these terms before using our website or communicating with CALISTAR."
      updated="October 15, 2026"
      toc={toc}
    >
      <p>
        These Terms of Use (&ldquo;Terms&rdquo;) govern your use of calistar.builders and your communications with{" "}
        {company.name} (&ldquo;CALISTAR,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), including text
        messages. By using the website or submitting information through our forms, you agree to these Terms. If you do
        not agree, please do not use the website.
      </p>

      <h2 id="website">1. Using our website</h2>
      <p>
        You may use this website for lawful purposes and to learn about CALISTAR&apos;s construction project management,
        subcontractor network, design-build and manufacturer-certified installation services. You agree not to:
      </p>
      <ul>
        <li>Disrupt or interfere with the website or its security.</li>
        <li>Try to access non-public areas of the website or our systems.</li>
        <li>Use the website for unauthorized commercial purposes.</li>
        <li>Submit false, misleading or inaccurate information.</li>
      </ul>
      <p>We may change or remove features of the website at any time.</p>

      <h2 id="ip">2. Intellectual property</h2>
      <p>
        Website content, including text, logos, graphics, designs and photographs, belongs to CALISTAR or its licensors
        and is protected by copyright, trademark and other laws. Some photographs are licensed stock images. You may not
        copy, reproduce, distribute, modify or create derivative works from website content without our written
        permission.
      </p>

      <h2 id="communications">3. Inquiries &amp; communications</h2>
      <p>When you submit an inquiry, quote request or subcontractor application, you agree that:</p>
      <ul>
        <li>The information you provide is accurate and truthful.</li>
        <li>CALISTAR may contact you using the information you provided.</li>
        <li>We may contact you by phone, email or text message as described in these Terms.</li>
      </ul>
      <p>
        Submitting a request does not create a contract for construction or management services. Any project requires a
        separate written agreement signed by both parties before work begins.
      </p>

      <h2 id="sms">4. SMS/text messaging terms &amp; conditions</h2>
      <p>
        By providing your mobile number and checking the SMS consent box on one of our forms, you agree to receive text
        messages from {company.name} as described in this section.
      </p>
      <h3>4.1 Messages you may receive</h3>
      <ul>
        <li>Replies to inquiries submitted through our website</li>
        <li>Follow-up about your request or application</li>
        <li>Estimate and consultation updates</li>
        <li>Appointment reminders and scheduling</li>
        <li>Project updates and coordination</li>
        <li>Service-related notices</li>
        <li>Answers to your questions</li>
      </ul>
      <p>
        <strong>
          Message frequency varies. Message and data rates may apply. Reply STOP to opt out. Reply HELP for help.
        </strong>
      </p>
      <h3>4.2 How to opt out</h3>
      <p>
        Reply <strong>STOP</strong> to any message at any time. You will receive one final message confirming that you
        have been unsubscribed, and we will not send further text messages unless you opt in again. You can also opt out
        by contacting us using the information in Section 11.
      </p>
      <h3>4.3 Getting help</h3>
      <p>
        Reply <strong>HELP</strong> to any message, call {company.phone} or email {company.email}.
      </p>
      <h3>4.4 Consent is not a condition of purchase</h3>
      <p>
        You do not have to agree to receive text messages to request a quote, work with us or purchase our services. You
        can opt out at any time.
      </p>
      <h3>4.5 Your mobile number</h3>
      <p>By providing a mobile number, you confirm that:</p>
      <ul>
        <li>You are the account holder or an authorized user of that number.</li>
        <li>The information you provide is accurate.</li>
        <li>You will tell us if the number changes or is reassigned.</li>
      </ul>
      <h3>4.6 Carriers and messaging platform</h3>
      <p>
        Text messages are sent through third-party providers, including Dialpad. Mobile carriers are not liable for
        delayed or undelivered messages, and CALISTAR is not responsible for delays or failures caused by carriers,
        networks or messaging platforms.
      </p>
      <h3>4.7 Privacy</h3>
      <p>
        Your mobile number and SMS opt-in consent are never shared with third parties or affiliates for marketing or
        promotional purposes. See our{" "}
        <Link href="/privacy" className="font-semibold text-primary underline">
          Privacy Policy
        </Link>{" "}
        for details.
      </p>

      <h2 id="email">5. Email communications</h2>
      <p>
        If you share your email address with us, you agree to receive emails related to your inquiry, project or our
        services, including replies, estimate follow-ups, scheduling and project coordination, service updates, company
        announcements and administrative notices. Email frequency varies with project activity.
      </p>
      <p>
        You can unsubscribe from marketing or informational emails at any time using the unsubscribe link in those
        emails or by contacting us. You may still receive service-related emails about an active inquiry or project.
        Agreeing to marketing emails is not required to request a quote or purchase our services.
      </p>
      <p>
        By providing an email address, you confirm that you own or are authorized to use it and will tell us if it
        changes. We may use third-party platforms to send email and are not responsible for delays, filtering or delivery
        failures caused by email providers, spam filters or those platforms.
      </p>

      <h2 id="links">6. Third-party links</h2>
      <p>
        Our website may link to third-party websites, such as social media pages. We are not responsible for their
        content, privacy practices, availability or security, and you use them at your own risk.
      </p>

      <h2 id="disclaimer">7. Disclaimer</h2>
      <p>
        The website and its content are provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; To the fullest extent
        permitted by law, CALISTAR makes no warranties, express or implied, about the website&apos;s operation, the
        accuracy or completeness of its content, or the availability or suitability of any service for a particular
        purpose. We do not promise that the website will be uninterrupted or error-free.
      </p>

      <h2 id="liability">8. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, CALISTAR is not liable for damages arising from your use of or inability
        to use the website, errors or omissions in its content, text message or email delivery issues, or failures of
        third-party services. If you are dissatisfied with the website, your sole remedy is to stop using it.
      </p>

      <h2 id="changes">9. Changes to these terms</h2>
      <p>
        We may update these Terms at any time by posting a revised version on this page with a new &ldquo;Last
        updated&rdquo; date. Continuing to use the website after an update means you accept the revised Terms.
      </p>

      <h2 id="law">10. Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of California, without regard to its conflict-of-law rules.
      </p>

      <h2 id="contact">11. Contact information</h2>
      <p>
        For questions, concerns or requests about these Terms, text messages or your personal information, contact us:
      </p>
      <LegalContact />
    </LegalPage>
  );
}
