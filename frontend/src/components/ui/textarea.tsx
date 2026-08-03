import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = ComponentPropsWithoutRef<"textarea"> & {
  label?: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, className, id, ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={id} className="text-label font-semibold uppercase tracking-[0.08em] text-ink-muted">
          {label}
        </label>
      ) : null}
      <textarea
        ref={ref}
        id={id}
        className={cn("input min-h-[140px] py-3", className)}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-body-sm text-error-text">
          {error}
        </p>
      ) : null}
    </div>
  );
});
