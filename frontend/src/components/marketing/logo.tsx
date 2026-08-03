import Link from "next/link";
import { cn } from "@/lib/utils";

const PIXELS = [
  [1, 1, 1, 0],
  [1, 0, 0, 0],
  [1, 1, 1, 0],
  [1, 0, 0, 0],
];

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      aria-label="Pikzelkraft home"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-primary">
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden>
          {PIXELS.flatMap((row, y) =>
            row.map((on, x) =>
              on ? <rect key={`${x}-${y}`} x={x * 8} y={y * 8} width="7" height="7" fill="white" /> : null
            )
          )}
        </svg>
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-ink">Pikzelkraft</span>
    </Link>
  );
}
