import { cn } from "@/lib/utils";

export type ProgressTone = "primary" | "success" | "warning" | "error" | "info";

const toneClasses: Record<ProgressTone, string> = {
  primary: "bg-gradient-primary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  info: "bg-info",
};

export function ProgressBar({
  percent,
  tone = "primary",
  className,
  showLabel = false,
}: {
  percent: number;
  tone?: ProgressTone;
  className?: string;
  showLabel?: boolean;
}) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-muted">
        <div
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
          className={cn("h-full rounded-full transition-[width] duration-500 ease-out", toneClasses[tone])}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel ? (
        <span className="text-caption font-medium tabular text-ink-muted">{clamped}%</span>
      ) : null}
    </div>
  );
}
