import { CheckCircle2, CreditCard, FileText, FolderKanban, LifeBuoy, type LucideIcon } from "lucide-react";
import type { ActivityItem, ActivityType } from "@/data/dashboard";
import { timeAgo } from "@/lib/time";
import { cn } from "@/lib/utils";

const typeConfig: Record<ActivityType, { icon: LucideIcon; className: string }> = {
  project: { icon: FolderKanban, className: "bg-primary-50 text-primary-700" },
  payment: { icon: CreditCard, className: "bg-success-soft text-success-text" },
  ticket: { icon: LifeBuoy, className: "bg-info-soft text-info-text" },
  file: { icon: FileText, className: "bg-warning-soft text-warning-text" },
  milestone: { icon: CheckCircle2, className: "bg-warning-soft text-warning-text" },
};

export function ActivityFeed({ items, className }: { items: ActivityItem[]; className?: string }) {
  return (
    <ol className={cn("space-y-0", className)}>
      {items.map((item, index) => {
        const config = typeConfig[item.type];
        const Icon = config.icon;
        return (
          <li key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
            {index < items.length - 1 ? (
              <span aria-hidden className="absolute left-[19px] top-11 h-full w-px bg-border" />
            ) : null}
            <span
              className={cn(
                "z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-4 ring-background",
                config.className
              )}
            >
              <Icon size={18} aria-hidden />
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="text-button font-medium text-ink">{item.title}</p>
              <p className="mt-1 text-body-sm text-ink-muted">{item.description}</p>
              <p className="mt-1 text-caption text-ink-faint">{timeAgo(item.time)}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
