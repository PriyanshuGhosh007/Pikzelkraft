import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  lede,
  align = "center",
  children,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "center" | "left";
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "relative overflow-hidden border-b border-border bg-background-alt",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-60 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-primary-600/10 blur-3xl"
      />
      <div className="container-shell relative py-16 lg:py-24">
        <div
          className={cn(
            "flex flex-col gap-4",
            align === "center" ? "items-center text-center" : "items-start text-left"
          )}
        >
          {eyebrow ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-label font-semibold uppercase tracking-[0.08em] text-primary-700">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="max-w-3xl text-h1 text-ink">{title}</h1>
          {lede ? <p className="max-w-[60ch] text-body-lg text-ink-muted">{lede}</p> : null}
          {children}
        </div>
      </div>
    </header>
  );
}
