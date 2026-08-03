import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "neutral" | "primary" | "success" | "warning" | "error" | "info" | "gradient";

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "bg-surface-muted text-ink-muted border border-border",
  primary: "bg-primary-50 text-primary-700 border border-primary-200",
  success: "bg-success-soft text-success-text border border-success-border",
  warning: "bg-warning-soft text-warning-text border border-warning-border",
  error: "bg-error-soft text-error-text border border-error-border",
  info: "bg-info-soft text-info-text border border-info-border",
  gradient: "bg-gradient-primary text-white border-transparent",
};

export function Badge({
  variant = "neutral",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-caption font-medium",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
