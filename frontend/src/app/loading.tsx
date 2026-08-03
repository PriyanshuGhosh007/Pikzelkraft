import { Logo } from "@/components/marketing/logo";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
      <Logo />
      <div role="status" aria-label="Loading" className="flex flex-col items-center gap-3">
        <div className="h-2 w-24 overflow-hidden rounded-full bg-surface-muted">
          <div className="h-full w-1/2 animate-shimmer rounded-full bg-primary-600" />
        </div>
        <span className="text-caption text-ink-muted">Loading…</span>
      </div>
    </div>
  );
}
