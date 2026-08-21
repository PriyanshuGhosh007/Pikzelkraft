"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, Check, ChevronDown, LogOut, Menu, Shield, User as UserIcon } from "lucide-react";
import { Avatar } from "@/components/dashboard/avatar";
import { getAdminNotifications, markNotificationsRead } from "@/lib/admin-api";
import type { AdminNotification } from "@/data/admin";
import { timeAgo } from "@/lib/time";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, string> = {
  "/admin": "Analytics",
  "/admin/clients": "Clients",
  "/admin/leads": "Leads",
  "/admin/projects": "Projects",
  "/admin/services": "Services",
  "/admin/portfolio": "Portfolio",
  "/admin/pricing": "Pricing",
  "/admin/faqs": "FAQs",
  "/admin/content": "Content",
  "/admin/payments": "Payments",
  "/admin/support": "Support",
};

const toneDot: Record<AdminNotification["tone"], string> = {
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};

export function AdminTopbar({ onMenuOpen }: { onMenuOpen: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let active = true;
    void getAdminNotifications().then((items) => {
      if (active) setNotifications(items);
    });
    return () => {
      active = false;
    };
  }, []);

  const unread = notifications.filter((item) => !item.read).length;
  const title = pageTitles[pathname] ?? "Admin";
  const name = session?.user?.name ?? "Admin";

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-surface/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuOpen}
          aria-label="Open admin navigation"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-[rgb(var(--hover-subtle))] hover:text-ink lg:hidden"
        >
          <Menu size={20} aria-hidden />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-h6 font-semibold text-ink">{title}</h1>
          <p className="hidden text-caption text-ink-faint sm:block">Pikzelkraft Admin Console</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotifOpen((v) => !v);
              setMenuOpen(false);
            }}
            aria-haspopup="menu"
            aria-expanded={notifOpen}
            aria-label="Admin notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-[rgb(var(--hover-subtle))] hover:text-ink"
          >
            <Bell size={20} aria-hidden />
            {unread > 0 ? (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[10px] font-bold text-white">
                {unread > 9 ? "9+" : unread}
              </span>
            ) : null}
          </button>

          {notifOpen ? (
            <>
              <div aria-hidden onClick={() => setNotifOpen(false)} className="fixed inset-0 z-40" />
              <div
                role="menu"
                className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-md border border-border bg-surface p-1.5 shadow-lg"
              >
                <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
                  <p className="text-button font-semibold text-ink">Notifications</p>
                  {unread > 0 ? (
                    <button
                      type="button"
                      className="flex items-center gap-1.5 text-caption font-medium text-primary-700"
                      onClick={() => {
                        void markNotificationsRead();
                        setNotifications((items) => items.map((item) => ({ ...item, read: true })));
                      }}
                    >
                      <Check size={14} aria-hidden />
                      Mark all read
                    </button>
                  ) : null}
                </div>
                <ul className="max-h-80 divide-y divide-border overflow-y-auto">
                  {notifications.length === 0 ? (
                    <li className="px-3 py-6 text-center text-body-sm text-ink-muted">You&apos;re all caught up.</li>
                  ) : (
                    notifications.slice(0, 8).map((item) => (
                      <li
                        key={item.id}
                        className={cn("flex items-start gap-3 px-3 py-3", !item.read && "bg-primary-50/50")}
                      >
                        <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", toneDot[item.tone])} />
                        <div className="min-w-0 flex-1">
                          <p className="text-button font-medium text-ink">{item.title}</p>
                          <p className="mt-0.5 line-clamp-2 text-body-sm text-ink-muted">{item.body}</p>
                          <p className="mt-1 text-caption text-ink-faint">{timeAgo(item.time)}</p>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </>
          ) : null}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setMenuOpen((v) => !v);
              setNotifOpen(false);
            }}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="flex items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-[rgb(var(--hover-subtle))]"
          >
            <Avatar name={name} size="sm" />
            <span className="hidden text-button font-medium text-ink sm:block">{name}</span>
            <span className="hidden items-center gap-1 rounded-full border border-primary-200 bg-primary-50 px-2 py-0.5 text-caption font-semibold text-primary-700 sm:inline-flex">
              <Shield size={12} aria-hidden />
              Admin
            </span>
            <ChevronDown size={16} className="text-ink-faint" aria-hidden />
          </button>

          {menuOpen ? (
            <>
              <div aria-hidden onClick={() => setMenuOpen(false)} className="fixed inset-0 z-40" />
              <div
                role="menu"
                className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-md border border-border bg-surface p-1.5 shadow-lg"
              >
                <div className="border-b border-border px-3 py-2.5">
                  <p className="truncate text-button font-semibold text-ink">{name}</p>
                  <p className="truncate text-caption text-ink-faint">{session?.user?.email ?? "Administrator"}</p>
                </div>
                <Link
                  href="/dashboard"
                  role="menuitem"
                  className="flex items-center gap-2.5 rounded-md px-3 py-2 text-button font-medium text-ink-muted transition-colors hover:bg-[rgb(var(--hover-subtle))] hover:text-ink"
                >
                  <UserIcon size={17} aria-hidden /> Client dashboard
                </Link>
                <button
                  type="button"
                  role="menuitem"
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-button font-medium text-ink-muted transition-colors hover:bg-error-soft hover:text-error-text"
                  )}
                  onClick={() => {
                    setMenuOpen(false);
                    void signOut({ callbackUrl: "/login" });
                  }}
                >
                  <LogOut size={17} aria-hidden /> Log out
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
