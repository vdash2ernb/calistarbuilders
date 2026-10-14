import { z } from "zod";

// Shared by the client forms and the server actions.

// Vercel Functions accept request bodies up to 4.5 MB; keep files under that with room for fields.
export const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;
export const ATTACHMENT_ACCEPT = ".pdf,.jpg,.jpeg,.png,.webp,.heic,.doc,.docx,.xls,.xlsx";
const ATTACHMENT_EXTENSIONS = ATTACHMENT_ACCEPT.split(",");

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  values?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle" };

export const projectTypes = [
  "Custom home",
  "Commercial",
  "Addition or remodel",
  "Hardscape / manufacturer installation",
  "Subcontractor sourcing only",
  "Other",
] as const;

export const timelines = ["As soon as possible", "1–3 months", "3–6 months", "6+ months", "Just planning"] as const;

const required = (label: string) => z.string().trim().min(1, { error: `${label} is required.` });
const optional = z.string().trim().max(500).optional().default("");
const email = z.email({ error: "Enter a valid email address." });
const phone = z
  .string()
  .trim()
  .regex(/^[\d\s()+.-]{7,20}$/, { error: "Enter a valid phone number." });

export const quoteSchema = z.object({
  name: required("Name").max(120),
  company: optional,
  email,
  phone: phone.or(z.literal("")).optional().default(""),
  projectType: z.enum(projectTypes, { error: "Choose a project type." }),
  location: optional,
  timeline: z.enum(timelines).or(z.literal("")).optional().default(""),
  message: required("Project details").max(5000),
});

export const networkSchema = z.object({
  companyName: required("Company name").max(160),
  contactName: required("Contact name").max(120),
  email,
  phone,
  trades: required("Trade(s)").max(300),
  licenseNumber: required("License number").max(40),
  serviceArea: required("Service area").max(300),
  yearsInBusiness: optional,
  insured: z.literal("yes", { error: "Confirm that you carry the required insurance." }),
  message: z.string().trim().max(5000).optional().default(""),
});

/** Validates the optional file uploads; returns an error message or the files. */
export function readAttachments(formData: FormData): { files: File[] } | { error: string } {
  const files = formData
    .getAll("attachments")
    .filter((f): f is File => f instanceof File && f.size > 0);
  const total = files.reduce((sum, f) => sum + f.size, 0);
  if (total > MAX_ATTACHMENT_BYTES) {
    return { error: "Attachments must be 4 MB or less in total. Email larger files to us instead." };
  }
  const bad = files.find((f) => !ATTACHMENT_EXTENSIONS.some((ext) => f.name.toLowerCase().endsWith(ext)));
  if (bad) return { error: `"${bad.name}" isn't an accepted file type.` };
  return { files };
}
