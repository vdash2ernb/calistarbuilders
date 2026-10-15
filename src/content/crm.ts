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
