import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-4 lg:mb-16",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-label font-semibold uppercase tracking-[0.08em] text-primary-700">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="max-w-2xl text-h2 text-ink">{title}</h2>
      {lede ? <p className="max-w-[56ch] text-body-lg text-ink-muted">{lede}</p> : null}
    </div>
  );
}
