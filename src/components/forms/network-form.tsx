"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitNetworkApplication } from "@/app/actions";
import { initialFormState } from "@/lib/forms";
import { Field, FileField, fieldProps } from "./fields";
import { FormShell } from "./form-shell";

export function NetworkForm() {
  const [state, action, pending] = useActionState(submitNetworkApplication, initialFormState);
  const insuredError = state.fieldErrors?.insured?.[0];

  return (
    <FormShell
      state={state}
      action={action}
      pending={pending}
      submitLabel="Submit Application"
      successTitle="Application received"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="companyName" label="Company name" required state={state}>
          <Input {...fieldProps("companyName", state)} autoComplete="organization" required />
        </Field>
        <Field name="contactName" label="Contact name" required state={state}>
          <Input {...fieldProps("contactName", state)} autoComplete="name" required />
        </Field>
        <Field name="email" label="Email" required state={state}>
          <Input {...fieldProps("email", state)} type="email" autoComplete="email" required />
        </Field>
        <Field name="phone" label="Phone" required state={state}>
          <Input {...fieldProps("phone", state)} type="tel" autoComplete="tel" required />
        </Field>
        <Field name="trades" label="Trade(s)" required hint="e.g. Framing, concrete, pavers" state={state}>
          <Input {...fieldProps("trades", state)} required />
        </Field>
        <Field name="licenseNumber" label="CSLB license #" required state={state}>
          <Input {...fieldProps("licenseNumber", state)} required />
        </Field>
        <Field name="serviceArea" label="Service area" required hint="Cities or counties you cover" state={state}>
          <Input {...fieldProps("serviceArea", state)} required />
        </Field>
        <Field name="yearsInBusiness" label="Years in business" state={state}>
          <Input {...fieldProps("yearsInBusiness", state)} inputMode="numeric" />
        </Field>
      </div>
      <Field name="message" label="Anything else we should know?" state={state}>
        <Textarea {...fieldProps("message", state)} rows={4} placeholder="Manufacturer certifications, crew size, typical project size…" />
      </Field>
      <FileField state={state} hint="Certificates of insurance, license or certifications. Up to 4 MB total." />
      <div className="flex flex-col gap-2">
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="insured"
            value="yes"
            defaultChecked={state.values?.insured === "yes"}
            aria-invalid={Boolean(insuredError) || undefined}
            aria-describedby={insuredError ? "insured-error" : undefined}
            className="mt-0.5 size-4 accent-primary"
          />
          <span>
            I confirm my company carries current general liability and workers&apos; compensation insurance.
            <span className="text-destructive"> *</span>
          </span>
        </label>
        {insuredError && (
          <p id="insured-error" className="text-sm text-destructive">
            {insuredError}
          </p>
        )}
      </div>
    </FormShell>
  );
}
