"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff, CheckCheck, CreditCard, FolderKanban, LifeBuoy, CheckCircle2, type LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getNotifications } from "@/lib/dashboard-api";
import type { Notification, NotificationType } from "@/data/dashboard";
import { timeAgo } from "@/lib/time";
import { cn } from "@/lib/utils";

const typeConfig: Record<NotificationType, { icon: LucideIcon; className: string }> = {
  project: { icon: FolderKanban, className: "bg-primary-50 text-primary-700" },
  payment: { icon: CreditCard, className: "bg-success-soft text-success-text" },
  ticket: { icon: LifeBuoy, className: "bg-info-soft text-info-text" },
  system: { icon: Bell, className: "bg-warning-soft text-warning-text" },
  milestone: { icon: CheckCircle2, className: "bg-warning-soft text-warning-text" },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    let active = true;
    void getNotifications().then((data) => {
      if (active) setNotifications(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  function markRead(id: string) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }

  function markAllRead() {
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Notifications"
        subtitle="Updates about your projects, payments and support tickets."
        actions={
          unreadCount > 0 ? (
            <Button variant="secondary" onClick={markAllRead}>
              <CheckCheck size={16} aria-hidden />
              Mark all read
            </Button>
          ) : null
        }
      />

      {notifications.length > 0 ? (
        <Card className="p-0">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <p className="text-body-sm text-ink-muted">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}` : "You're all caught up"}
            </p>
          </div>
          <ul className="divide-y divide-border">
            {notifications.map((notification) => {
              const config = typeConfig[notification.type];
              const Icon = config.icon;
              return (
                <li
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-4 px-5 py-4 transition-colors",
                    !notification.read && "bg-primary-50/40"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                      config.className
                    )}
                  >
                    <Icon size={18} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {!notification.read ? (
                        <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-primary-600" />
                      ) : null}
                      <p className={cn("truncate text-button font-medium", notification.read ? "text-ink" : "text-ink font-semibold")}>
                        {notification.title}
                      </p>
                    </div>
                    <p className="mt-1 text-body-sm text-ink-muted">{notification.body}</p>
                    <p className="mt-1 text-caption text-ink-faint">{timeAgo(notification.time)}</p>
                  </div>
                  {!notification.read ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0 text-primary-700"
                      onClick={() => markRead(notification.id)}
                    >
                      <CheckCheck size={15} aria-hidden />
                      Mark as read
                    </Button>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </Card>
      ) : (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-16" />
          ))}
        </div>
      )}

      {notifications.length > 0 && unreadCount === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface-muted/50 py-12 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success-soft text-success-text">
            <BellOff size={24} aria-hidden />
          </span>
          <p className="mt-4 text-button font-medium text-ink">No unread notifications</p>
        </div>
      ) : null}
    </div>
  );
}
