"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CreditCard, FolderKanban, LifeBuoy, Plus, Sparkles } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getActivity, getDashboardStats } from "@/lib/dashboard-api";
import type { ActivityItem, DashboardStats } from "@/data/dashboard";
import { firstName, formatCurrency } from "@/lib/time";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    let active = true;
    void Promise.all([getDashboardStats(), getActivity()]).then(([statsData, activityData]) => {
      if (!active) return;
      setStats(statsData);
      setActivity(activityData);
    });
    return () => {
      active = false;
    };
  }, []);

  const name = firstName(session?.user?.name);

  return (
    <div className="space-y-8">
      <Card className="relative overflow-hidden border-0 bg-gradient-primary p-6 shadow-soft sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20 [mask-image:radial-gradient(70%_80%_at_80%_10%,black,transparent)]"
        />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-label font-semibold uppercase tracking-[0.08em] text-white">
            <Sparkles size={14} aria-hidden />
            Client dashboard
          </span>
          <h1 className="mt-4 text-h3 text-white">Welcome back, {name}</h1>
          <p className="mt-2 max-w-xl text-body-md text-white/85">
            Here&apos;s what&apos;s happening with your projects, payments and requests at Pikzelkraft.
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
        {stats ? (
          <>
            <StatCard
              icon={FolderKanban}
              label="Active Projects"
              value={String(stats.activeProjects)}
              tone="primary"
              hint={`${stats.completedProjects} completed so far`}
            />
            <StatCard
              icon={CreditCard}
              label="Pending Payments"
              value={String(stats.pendingPayments)}
              tone="warning"
              hint={stats.outstanding > 0 ? `Outstanding ${formatCurrency(stats.outstanding)}` : "All caught up"}
            />
            <StatCard
              icon={LifeBuoy}
              label="Open Tickets"
              value={String(stats.openTickets)}
              tone="info"
              hint="Support replies within 24h"
            />
          </>
        ) : (
          <>
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-h6 font-semibold text-ink">Recent activity</h2>
              <p className="mt-0.5 text-body-sm text-ink-muted">The latest updates across your workspace.</p>
            </div>
          </div>
          <div className="mt-6">
            {activity.length > 0 ? (
              <ActivityFeed items={activity} />
            ) : (
              <>
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
              </>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-h6 font-semibold text-ink">Quick actions</h2>
          <p className="mt-0.5 text-body-sm text-ink-muted">Jump straight into a task.</p>
          <div className="mt-6 flex flex-col gap-3">
            <Button href="/dashboard/requests" variant="gradient" size="lg" className="w-full">
              <Plus size={18} aria-hidden />
              New Request
            </Button>
            <Button href="/dashboard/projects" variant="secondary" size="lg" className="w-full">
              <FolderKanban size={18} aria-hidden />
              View Projects
            </Button>
            <Button href="/dashboard/support" variant="secondary" size="lg" className="w-full">
              <LifeBuoy size={18} aria-hidden />
              Contact Support
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
