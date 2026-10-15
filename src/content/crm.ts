// CRM-hosted forms. The site is static, so form submissions go straight to the CRM.
//
// To connect a form, paste the CRM's embed/iframe URL into `embedUrl`. Until then the
// page shows a call/email card instead. Set `embedScript` if the CRM needs a helper
// script for its embeds (e.g. GoHighLevel's auto-resize script:
// https://link.msgsndr.com/js/form_embed.js).
//
// TODO(client): create the two forms in the CRM and paste their embed URLs here.

export type CrmForm = {
  title: string;
  embedUrl: string | null;
  // Initial iframe height in px; CRM resize scripts may adjust it.
  height: number;
};

export const crmForms = {
  quote: { title: "Request a quote", embedUrl: null, height: 900 },
  network: { title: "Subcontractor network application", embedUrl: null, height: 1100 },
} satisfies Record<string, CrmForm>;

export const embedScript: string | null = null;

// SMS opt-in wording for A2P 10DLC (Dialpad) registration. Paste `smsConsent.checkbox`
// as the label of an OPTIONAL, UNCHECKED checkbox in both CRM forms, with links to
// /privacy/ and /terms/#sms. The site shows the same text beside each form.
export const smsConsent = {
  notice:
    "CALISTAR Management Company respects your privacy. We use the information you share to respond to your inquiry, keep you informed about your project and provide the services you request. To learn how we collect, use and protect your information, read our Privacy Policy and Terms of Use.",
  checkbox:
    "I agree to receive text messages from CALISTAR Management Company about my inquiry, estimates, scheduling, project updates and related services. Message frequency varies. Message and data rates may apply. Reply STOP to opt out at any time or HELP for help. Consent to receive text messages is not a condition of purchase. See our Privacy Policy and SMS Terms & Conditions for details.",
};
