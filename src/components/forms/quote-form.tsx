"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitQuote } from "@/app/actions";
import { initialFormState, projectTypes, timelines } from "@/lib/forms";
import { Field, FileField, SelectField, fieldProps } from "./fields";
import { FormShell } from "./form-shell";

export function QuoteForm() {
  const [state, action, pending] = useActionState(submitQuote, initialFormState);

  return (
    <FormShell
      state={state}
      action={action}
      pending={pending}
      submitLabel="Send Request"
      successTitle="Request received"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="Name" required state={state}>
          <Input {...fieldProps("name", state)} autoComplete="name" required />
        </Field>
        <Field name="company" label="Company" state={state}>
          <Input {...fieldProps("company", state)} autoComplete="organization" />
        </Field>
        <Field name="email" label="Email" required state={state}>
          <Input {...fieldProps("email", state)} type="email" autoComplete="email" required />
        </Field>
        <Field name="phone" label="Phone" state={state}>
          <Input {...fieldProps("phone", state)} type="tel" autoComplete="tel" />
        </Field>
        <Field name="projectType" label="Project type" required state={state}>
          <SelectField name="projectType" options={projectTypes} state={state} placeholder="Select a type" required />
        </Field>
        <Field name="timeline" label="Timeline" state={state}>
          <SelectField name="timeline" options={timelines} state={state} placeholder="Select a timeline" />
        </Field>
      </div>
      <Field name="location" label="Project location" hint="City or county" state={state}>
        <Input {...fieldProps("location", state)} autoComplete="address-level2" />
      </Field>
      <Field name="message" label="Project details" required state={state}>
        <Textarea {...fieldProps("message", state)} rows={5} required placeholder="Scope, trades needed, size, budget range…" />
      </Field>
      <FileField state={state} hint="Plans, specs or photos. PDF, images, Word or Excel, up to 4 MB total." />
    </FormShell>
  );
}
