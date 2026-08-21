"use client";

import { useEffect, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminShellInner>{children}</AdminShellInner>
    </SessionProvider>
  );
}

function AdminShellInner({ children }: { children: React.ReactNode }) {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-alt">
        <div className="w-full max-w-md space-y-4 px-4">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  const isAdmin = session?.user?.role === "admin";

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-alt px-4">
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center shadow-soft">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-error-soft text-error-text">
            <ShieldAlert size={30} aria-hidden />
          </span>
          <h1 className="mt-5 text-h3 text-ink">Access restricted</h1>
          <p className="mt-2 text-body-md text-ink-muted">
            This area is reserved for Pikzelkraft administrators. Your account doesn&apos;t have the admin role.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="mt-6"
            href="/dashboard"
          >
            <ArrowLeft size={18} aria-hidden />
            Back to client dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background-alt">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sessionName={session?.user?.name}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar onMenuOpen={() => setSidebarOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
