"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { CheckCircle2Icon, LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { FormState } from "@/lib/forms";
import { Honeypot } from "./fields";

/** Wraps a form with the honeypot, submit button, status toasts and success panel. */
export function FormShell({
  state,
  action,
  pending,
  submitLabel,
  successTitle,
  children,
}: {
  state: FormState;
  action: (formData: FormData) => void;
  pending: boolean;
  submitLabel: string;
  successTitle: string;
  children: React.ReactNode;
}) {
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "error" && state.message) toast.error(state.message);
    if (state.status === "success") successRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-center rounded-lg border bg-card p-10 text-center outline-none"
      >
        <CheckCircle2Icon className="size-12 text-green-600" aria-hidden />
        <h2 className="mt-4 text-2xl text-ink">{successTitle}</h2>
        <p className="mt-2 text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="relative space-y-5 rounded-lg border bg-card p-6 shadow-sm sm:p-8">
      <Honeypot />
      {children}
      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="h-12 w-full bg-brand text-base font-semibold text-brand-foreground hover:bg-brand-hover"
      >
        {pending && <LoaderCircleIcon className="animate-spin" aria-hidden />}
        {pending ? "Sending…" : submitLabel}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        By submitting, you agree to our{" "}
        <Link href="/privacy" className="underline">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
