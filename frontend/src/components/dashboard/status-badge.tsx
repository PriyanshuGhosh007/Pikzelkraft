import { Badge } from "@/components/ui/badge";
import type { PaymentStatus, ProjectStatus, TicketStatus } from "@/data/dashboard";

type StatusValue = ProjectStatus | PaymentStatus | TicketStatus;
type BadgeVariant = "neutral" | "primary" | "success" | "warning" | "error" | "info" | "gradient";

const statusConfig: Record<StatusValue, { label: string; variant: BadgeVariant }> = {
  active: { label: "Active", variant: "success" },
  completed: { label: "Completed", variant: "info" },
  on_hold: { label: "On hold", variant: "warning" },
  paid: { label: "Paid", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
  overdue: { label: "Overdue", variant: "error" },
  open: { label: "Open", variant: "info" },
  in_progress: { label: "In progress", variant: "primary" },
  resolved: { label: "Resolved", variant: "success" },
};

export function StatusBadge({ status, className }: { status: StatusValue; className?: string }) {
  const config = statusConfig[status];
  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
