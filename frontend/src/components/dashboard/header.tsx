"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, LogOut, User as UserIcon, ChevronDown } from "lucide-react";
import { Avatar } from "@/components/dashboard/avatar";
import { getNotifications } from "@/lib/dashboard-api";
import { cn } from "@/lib/utils";

function humanizeSegment(segment: string): string {
  if (segment === "[id]") return "Details";
  return segment
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function pageTitleFromPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean).filter((segment) => segment !== "dashboard");
  if (segments.length === 0) return "Dashboard";
  return humanizeSegment(segments[segments.length - 1]);
}

export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [unread, setUnread] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let active = true;
    void getNotifications().then((items) => {
      if (active) setUnread(items.filter((item) => !item.read).length);
    });
    return () => {
      active = false;
    };
  }, []);

  const name = session?.user?.name;
  const title = pageTitleFromPath(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-surface/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <h1 className="text-h6 font-semibold text-ink">{title}</h1>

      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/notifications"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-[rgb(var(--hover-subtle))] hover:text-ink"
        >
          <Bell size={20} aria-hidden />
          {unread > 0 ? (
            <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[10px] font-bold text-white">
              {unread > 9 ? "9+" : unread}
            </span>
          ) : null}
        </Link>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="flex items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-[rgb(var(--hover-subtle))]"
          >
            <Avatar name={name} size="sm" />
            <span className="hidden text-button font-medium text-ink sm:block">{name ?? "Guest"}</span>
            <ChevronDown size={16} className="text-ink-faint" aria-hidden />
          </button>

          {menuOpen ? (
            <>
              <div aria-hidden onClick={() => setMenuOpen(false)} className="fixed inset-0 z-40" />
              <div
                role="menu"
                className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-md border border-border bg-surface p-1.5 shadow-md"
              >
                <div className="border-b border-border px-3 py-2.5">
                  <p className="truncate text-button font-semibold text-ink">{name ?? "Guest"}</p>
                  <p className="truncate text-caption text-ink-faint">{session?.user?.email ?? "Not signed in"}</p>
                </div>
                <MenuItem href="/dashboard/profile" onClick={() => setMenuOpen(false)}>
                  <UserIcon size={17} aria-hidden /> Profile
                </MenuItem>
                <MenuItem href="/dashboard/notifications" onClick={() => setMenuOpen(false)}>
                  <Bell size={17} aria-hidden /> Notifications
                </MenuItem>
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

function MenuItem({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onClick}
      className="flex items-center gap-2.5 rounded-md px-3 py-2 text-button font-medium text-ink-muted transition-colors hover:bg-[rgb(var(--hover-subtle))] hover:text-ink"
    >
      {children}
    </Link>
  );
}
