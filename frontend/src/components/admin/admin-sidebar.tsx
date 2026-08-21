"use client";

import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Banknote,
  FileText,
  FolderKanban,
  Globe,
  HelpCircle,
  Image,
  Inbox,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Settings2,
  ShoppingBag,
  Tags,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

const manageItems: NavItem[] = [
  { href: "/admin", label: "Analytics", icon: LayoutDashboard, exact: true },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/payments", label: "Payments", icon: Banknote },
  { href: "/admin/support", label: "Support", icon: LifeBuoy },
];

const contentItems: NavItem[] = [
  { href: "/admin/services", label: "Services", icon: Settings2 },
  { href: "/admin/portfolio", label: "Portfolio", icon: Image },
  { href: "/admin/pricing", label: "Pricing", icon: Tags },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/content", label: "Content", icon: FileText },
];

export function AdminSidebar({
  open,
  onClose,
  sessionName,
}: {
  open: boolean;
  onClose: () => void;
  sessionName?: string | null;
}) {
  const pathname = usePathname();

  function isActive(item: NavItem) {
    if (item.exact) return pathname === item.href;
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  }

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col bg-[rgb(var(--neutral-950))] text-white transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0 shadow-md" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Link href="/admin" onClick={onClose} className="flex items-center gap-2.5" aria-label="Pikzelkraft admin home">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-primary">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
                {[0, 1, 2].map((col) =>
                  [0, 1, 2, 3].map((row) => (
                    <rect
                      key={`${col}-${row}`}
                      x={col * 8}
                      y={row * 8}
                      width="7"
                      height="7"
                      fill="white"
                      opacity={
                        (col === 0 && row < 3) || (col === 1 && row === 1) || (col === 2 && row < 3) ? 1 : 0
                      }
                    />
                  ))
                )}
              </svg>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg font-bold tracking-tight">Pikzelkraft</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                Admin
              </span>
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close admin navigation"
            className="flex h-10 w-10 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-5" aria-label="Admin navigation">
          <NavGroup label="Manage" items={manageItems} onNavigate={onClose} isActive={isActive} />
          <NavGroup label="Website" items={contentItems} onNavigate={onClose} isActive={isActive} />
        </nav>

        <div className="border-t border-white/10 p-4">
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-nav font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Globe size={20} aria-hidden />
            View website
          </Link>
          <button
            type="button"
            onClick={() => void signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-nav font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut size={20} aria-hidden />
            Log out
          </button>
          <p className="mt-3 truncate px-3 text-caption text-white/40">
            Signed in as {sessionName ?? "Admin"}
          </p>
        </div>
      </aside>
    </>
  );
}

function NavGroup({
  label,
  items,
  onNavigate,
  isActive,
}: {
  label: string;
  items: NavItem[];
  onNavigate: () => void;
  isActive: (item: NavItem) => boolean;
}) {
  return (
    <div>
      <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
        {label}
      </p>
      <div className="space-y-1">
        {items.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-nav font-medium transition-colors",
                active
                  ? "bg-gradient-primary text-white shadow-soft"
                  : "text-white/65 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon size={20} aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
