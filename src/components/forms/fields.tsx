"use client";

import { useEffect, useRef, useState } from "react";
import { PaperclipIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ATTACHMENT_ACCEPT, MAX_ATTACHMENT_BYTES, type FormState } from "@/lib/forms";

export function Field({
  name,
  label,
  required = false,
  hint,
  state,
  className,
  children,
}: {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  state: FormState;
  className?: string;
  children: React.ReactNode;
}) {
  const error = state.fieldErrors?.[name]?.[0];
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={name} className="text-sm font-semibold">
        {label}
        {required ? <span className="text-destructive"> *</span> : <span className="font-normal text-muted-foreground"> (optional)</span>}
      </Label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p id={`${name}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

/** Props that wire an input to its Field's error message. */
export function fieldProps(name: string, state: FormState) {
  const invalid = Boolean(state.fieldErrors?.[name]);
  return {
    id: name,
    name,
    defaultValue: state.values?.[name] ?? "",
    "aria-invalid": invalid || undefined,
    "aria-describedby": invalid ? `${name}-error` : undefined,
  };
}

export const selectClass =
  "h-10 w-full rounded-lg border border-input bg-transparent px-3 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive md:text-sm";

export function SelectField({
  name,
  options,
  state,
  placeholder,
  required = false,
}: {
  name: string;
  options: readonly string[];
  state: FormState;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <select {...fieldProps(name, state)} required={required} className={selectClass}>
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/** Hidden from people; bots that fill every field get silently dropped. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function FileField({ state, hint }: { state: FormState; hint: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const serverError = state.fieldErrors?.attachments?.[0];
  const inputRef = useRef<HTMLInputElement>(null);

  // React resets the form after each submission; keep the file summary in sync.
  useEffect(() => {
    const form = inputRef.current?.form;
    const clear = () => setFiles([]);
    form?.addEventListener("reset", clear);
    return () => form?.removeEventListener("reset", clear);
  }, []);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    const total = picked.reduce((sum, f) => sum + f.size, 0);
    if (total > MAX_ATTACHMENT_BYTES) {
      setError("Attachments must be 4 MB or less in total. Email larger files to us instead.");
      e.target.value = "";
      setFiles([]);
      return;
    }
    setError(null);
    setFiles(picked);
  }

  const shown = error ?? serverError;
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="attachments" className="text-sm font-semibold">
        Attachments <span className="font-normal text-muted-foreground">(optional)</span>
      </Label>
      <label
        htmlFor="attachments"
        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-input px-4 py-5 text-sm text-muted-foreground transition hover:border-primary hover:text-foreground has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
      >
        <PaperclipIcon className="size-4" aria-hidden />
        {files.length ? `${files.length} file${files.length > 1 ? "s" : ""} selected` : "Choose files"}
        <input
          ref={inputRef}
          id="attachments"
          name="attachments"
          type="file"
          multiple
          accept={ATTACHMENT_ACCEPT}
          onChange={onChange}
          className="sr-only"
          aria-describedby="attachments-hint"
        />
      </label>
      {files.length > 0 && (
        <ul className="space-y-1 text-xs text-muted-foreground">
          {files.map((f) => (
            <li key={f.name}>
              {f.name} ({Math.max(1, Math.round(f.size / 1024))} KB)
            </li>
          ))}
        </ul>
      )}
      <p id="attachments-hint" className={cn("text-xs", shown ? "text-destructive" : "text-muted-foreground")}>
        {shown ?? hint}
      </p>
    </div>
  );
}
