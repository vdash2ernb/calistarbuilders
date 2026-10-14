import nodemailer from "nodemailer";

// Sends form submissions over SMTP. Configure with the env vars in .env.example.
// Works with the client's existing Zoho Mail account (smtp.zoho.com) or any SMTP provider.

type Mail = {
  subject: string;
  replyTo: string;
  fields: [label: string, value: string][];
  attachments?: File[];
};

export type SendResult = { ok: true; delivered: boolean } | { ok: false };

function config() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FORM_TO_EMAIL, FORM_FROM_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !FORM_TO_EMAIL) return null;
  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 465),
    user: SMTP_USER,
    pass: SMTP_PASS,
    to: FORM_TO_EMAIL,
    from: FORM_FROM_EMAIL || SMTP_USER,
  };
}

export async function sendFormEmail(mail: Mail): Promise<SendResult> {
  const text = mail.fields
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}:\n${value}`)
    .join("\n\n");

  const cfg = config();
  if (!cfg) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without SMTP: print the submission instead of sending it.
      console.info(`[form] SMTP not configured, not sending.\nSubject: ${mail.subject}\n\n${text}`);
      return { ok: true, delivered: false };
    }
    console.error("[form] SMTP is not configured; submission was not delivered.");
    return { ok: false };
  }

  const transport = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.port === 465,
    auth: { user: cfg.user, pass: cfg.pass },
  });

  try {
    await transport.sendMail({
      from: `"CALISTAR Website" <${cfg.from}>`,
      to: cfg.to,
      replyTo: mail.replyTo,
      subject: mail.subject,
      text,
      attachments: await Promise.all(
        (mail.attachments ?? []).map(async (f) => ({
          filename: f.name,
          content: Buffer.from(await f.arrayBuffer()),
          contentType: f.type || undefined,
        })),
      ),
    });
    return { ok: true, delivered: true };
  } catch (err) {
    console.error("[form] SMTP send failed", err);
    return { ok: false };
  }
}
