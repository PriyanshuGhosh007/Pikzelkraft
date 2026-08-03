import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  error?: string;
  helper?: string;
  hint?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, helper, hint, className, id, "aria-describedby": ariaDescribedby, ...props },
  ref
) {
  const describedBy = [error ? `${id}-error` : null, helper ? `${id}-helper` : null]
    .filter(Boolean)
    .join(" ") || ariaDescribedby;

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={id} className="text-label font-semibold uppercase tracking-[0.08em] text-ink-muted">
          {label}
        </label>
      ) : null}
      <input
        ref={ref}
        id={id}
        className={cn("input", className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        {...props}
      />
      {hint && !error ? <p className="text-body-sm text-ink-faint">{hint}</p> : null}
      {helper && !error ? (
        <p id={`${id}-helper`} className="text-body-sm text-ink-muted">
          {helper}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-body-sm text-error-text">
          {error}
        </p>
      ) : null}
    </div>
  );
});
