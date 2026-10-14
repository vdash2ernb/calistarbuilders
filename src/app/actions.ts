"use server";

import { z } from "zod";
import { company } from "@/content/company";
import { sendFormEmail } from "@/lib/email";
import { networkSchema, quoteSchema, readAttachments, type FormState } from "@/lib/forms";

const deliveryFailed = `Sorry, your message couldn't be sent. Please call ${company.phone} or email ${company.email}.`;

function textValues(formData: FormData) {
  const values: Record<string, string> = {};
  for (const [key, value] of formData) {
    if (typeof value === "string" && !key.startsWith("$ACTION")) values[key] = value;
  }
  return values;
}

// Bots fill every field; people never see this one.
function isSpam(formData: FormData) {
  return Boolean(formData.get("website"));
}

export async function submitQuote(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = textValues(formData);
  if (isSpam(formData)) return { status: "success" };

  const parsed = quoteSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }
  const files = readAttachments(formData);
  if ("error" in files) return { status: "error", fieldErrors: { attachments: [files.error] }, values };

  const d = parsed.data;
  const result = await sendFormEmail({
    subject: `Quote request: ${d.projectType} from ${d.name}`,
    replyTo: d.email,
    fields: [
      ["Name", d.name],
      ["Company", d.company],
      ["Email", d.email],
      ["Phone", d.phone],
      ["Project type", d.projectType],
      ["Location", d.location],
      ["Timeline", d.timeline],
      ["Project details", d.message],
    ],
    attachments: files.files,
  });

  if (!result.ok) return { status: "error", message: deliveryFailed, values };
  return { status: "success", message: "Thanks! We received your request and will follow up within one business day." };
}

export async function submitNetworkApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = textValues(formData);
  if (isSpam(formData)) return { status: "success" };

  const parsed = networkSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }
  const files = readAttachments(formData);
  if ("error" in files) return { status: "error", fieldErrors: { attachments: [files.error] }, values };

  const d = parsed.data;
  const result = await sendFormEmail({
    subject: `Network application: ${d.companyName} (${d.trades})`,
    replyTo: d.email,
    fields: [
      ["Company", d.companyName],
      ["Contact", d.contactName],
      ["Email", d.email],
      ["Phone", d.phone],
      ["Trade(s)", d.trades],
      ["License #", d.licenseNumber],
      ["Service area", d.serviceArea],
      ["Years in business", d.yearsInBusiness],
      ["Confirmed insured", "Yes"],
      ["Notes", d.message],
    ],
    attachments: files.files,
  });

  if (!result.ok) return { status: "error", message: deliveryFailed, values };
  return { status: "success", message: "Thanks for applying! Our team will review your information and get in touch." };
}
