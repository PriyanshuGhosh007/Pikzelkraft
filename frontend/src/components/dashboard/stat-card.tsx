import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatTone = "primary" | "success" | "warning" | "error" | "info" | "neutral";

const toneClasses: Record<StatTone, string> = {
  primary: "bg-primary-50 text-primary-700",
  success: "bg-success-soft text-success-text",
  warning: "bg-warning-soft text-warning-text",
  error: "bg-error-soft text-error-text",
  info: "bg-info-soft text-info-text",
  neutral: "bg-surface-muted text-ink-muted",
};

export function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  tone = "neutral",
  hint,
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: { value: string; positive?: boolean };
  tone?: StatTone;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-border bg-surface p-5 shadow-soft", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-label font-semibold uppercase tracking-[0.08em] text-ink-muted">{label}</p>
          <p className="mt-2 text-3xl font-semibold tabular text-ink">{value}</p>
          {hint ? <p className="mt-1.5 truncate text-body-sm text-ink-faint">{hint}</p> : null}
        </div>
        <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-md", toneClasses[tone])}>
          <Icon size={22} aria-hidden />
        </span>
      </div>
      {delta ? (
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className={cn(
              "inline-flex items-center gap-1 text-caption font-semibold",
              delta.positive ? "text-success-text" : "text-error-text"
            )}
          >
            {delta.positive ? <TrendingUp size={14} aria-hidden /> : <TrendingDown size={14} aria-hidden />}
            {delta.value}
          </span>
          <span className="text-caption text-ink-faint">vs last month</span>
        </div>
      ) : null}
    </div>
  );
}
