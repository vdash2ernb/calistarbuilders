import Link from "next/link";
import { company } from "@/content/company";

/**
 * Privacy & SMS consent disclosure shown beside every lead form. Carriers reviewing
 * A2P 10DLC registrations look for this next to the opt-in. The checkbox itself
 * lives in the CRM form and uses the same wording (smsConsent.checkbox in content/crm.ts).
 */
export function ConsentNotice() {
  return (
    <div className="mt-6 rounded-3xl bg-muted p-7 text-sm leading-relaxed text-muted-foreground">
      <h2 className="font-heading text-lg font-bold text-ink">{company.shortName} Privacy & Communications Consent</h2>
      <p className="mt-3">
        {company.name} respects your privacy. We use the information you share to respond to your inquiry, keep
        you informed about your project and provide the services you request. To learn how we collect, use and
        protect your information, read our <Link href="/privacy" className="font-semibold text-primary underline">Privacy Policy</Link>{" "}
        and <Link href="/terms" className="font-semibold text-primary underline">Terms of Use</Link>.
      </p>
      <p className="mt-3 font-medium text-ink">
        By checking the SMS consent box in the form, you agree to receive text messages from {company.name} about
        your inquiry, estimates, scheduling, project updates and related services. Message frequency varies.
        Message and data rates may apply. Reply STOP to opt out at any time or HELP for help. Consent to receive
        text messages is not a condition of purchase. See our{" "}
        <Link href="/privacy" className="font-semibold text-primary underline">Privacy Policy</Link> and{" "}
        <Link href="/terms#sms" className="font-semibold text-primary underline">SMS Terms & Conditions</Link> for
        details.
      </p>
    </div>
  );
}
