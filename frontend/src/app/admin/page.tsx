"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowRight, Banknote, Clock3, FolderKanban, Inbox, Users } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  getAnalytics,
  getClients,
  getLeads,
  getPayments,
  getProjects,
} from "@/lib/admin-api";
import type { AdminPayment, Lead } from "@/data/admin";
import { formatCurrency } from "@/lib/time";

const leadStatusVariant: Record<Lead["status"], "neutral" | "primary" | "success" | "warning" | "error"> = {
  new: "primary",
  read: "warning",
  replied: "primary",
  accepted: "success",
  rejected: "error",
};

const periodOptions = [
  { label: "6M", months: 6 },
  { label: "12M", months: 12 },
] as const;

const axisColor = "#9ca8ba";

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<{ revenueSeries: { month: string; revenue: number }[]; acquisitionSeries: { month: string; clients: number }[] } | null>(null);
  const [clients, setClients] = useState<number>(0);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [payments, setPayments] = useState<AdminPayment[]>([]);
  const [projects, setProjects] = useState<{ total: number; active: number }>({ total: 0, active: 0 });
  const [period, setPeriod] = useState<(typeof periodOptions)[number]["months"]>(12);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    void Promise.all([getAnalytics(), getClients(), getLeads(), getPayments(), getProjects()]).then(
      ([analyticsData, clientsData, leadsData, paymentsData, projectsData]) => {
        if (!active) return;
        setAnalytics(analyticsData);
        setClients(clientsData.length);
        setLeads(leadsData);
        setPayments(paymentsData);
        setProjects({
          total: projectsData.length,
          active: projectsData.filter((p) => p.status === "in-progress" || p.status === "review" || p.status === "planning").length,
        });
        setReady(true);
      }
    );
    return () => {
      active = false;
    };
  }, []);

  const pendingPayments = payments.filter(
    (payment) => payment.status === "pending" || payment.status === "overdue" || payment.status === "partial"
  );
  const outstanding = pendingPayments.reduce((sum, payment) => sum + payment.amount, 0);

  const revenueDelta = useMemo(() => {
    if (!analytics) return { label: "+0%", positive: true };
    const series = analytics.revenueSeries;
    const last = series[series.length - 1].revenue;
    const previous = series[series.length - 2]?.revenue ?? last;
    const delta = previous ? ((last - previous) / previous) * 100 : 0;
    return {
      label: `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}%`,
      positive: delta >= 0,
    };
  }, [analytics]);

  const revenueData = useMemo(() => {
    if (!analytics) return [];
    return analytics.revenueSeries.slice(-period);
  }, [analytics, period]);

  const acquisitionData = useMemo(() => {
    if (!analytics) return [];
    return analytics.acquisitionSeries.slice(-period);
  }, [analytics, period]);

  const recentLeads = leads.slice(0, 6);

  const leadColumns: DataTableColumn<Lead>[] = [
    { key: "name", header: "Lead", sortable: true, sortValue: (lead) => lead.name },
    { key: "company", header: "Company", sortable: true, sortValue: (lead) => lead.company },
    { key: "service", header: "Service", sortable: true, sortValue: (lead) => lead.service },
    {
      key: "status",
      header: "Status",
      sortable: true,
      sortValue: (lead) => lead.status,
      render: (lead) => (
        <Badge variant={leadStatusVariant[lead.status]}>{lead.status}</Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Received",
      sortable: true,
      sortValue: (lead) => lead.createdAt,
      render: (lead) => (
        <span className="text-ink-muted">{new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Analytics"
        subtitle="A live pulse of clients, revenue, leads and project activity across Pikzelkraft."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-5">
        {ready ? (
          <>
            <StatCard
              icon={Users}
              label="Total Clients"
              value={String(clients)}
              tone="primary"
              delta={{ value: "+8.3%", positive: true }}
              hint={`${clients} accounts onboarded`}
            />
            <StatCard
              icon={Banknote}
              label="Total Revenue"
              value={formatCurrency(
                analytics?.revenueSeries[analytics.revenueSeries.length - 1]?.revenue ?? 0
              )}
              tone="success"
              delta={{ value: revenueDelta.label, positive: revenueDelta.positive }}
              hint="Collected this month"
            />
            <StatCard
              icon={Inbox}
              label="Total Leads"
              value={String(leads.length)}
              tone="info"
              delta={{ value: `+${leads.filter((lead) => lead.status === "new").length}`, positive: true }}
              hint={`${leads.filter((lead) => lead.status === "new").length} awaiting review`}
            />
            <StatCard
              icon={FolderKanban}
              label="Total Projects"
              value={String(projects.total)}
              tone="warning"
              delta={{ value: `+${projects.active}`, positive: true }}
              hint={`${projects.active} currently active`}
            />
            <StatCard
              icon={Clock3}
              label="Pending Payments"
              value={String(pendingPayments.length)}
              tone="error"
              hint={outstanding > 0 ? `${formatCurrency(outstanding)} outstanding` : "All settled"}
            />
          </>
        ) : (
          <>
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
            <Skeleton className="h-36" />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-h6 font-semibold text-ink">Revenue growth</h2>
              <p className="mt-0.5 text-body-sm text-ink-muted">Monthly revenue collected by Pikzelkraft.</p>
            </div>
            <div className="flex rounded-md border border-border p-0.5">
              {periodOptions.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setPeriod(option.months)}
                  className={cn(
                    "rounded px-2.5 py-1 text-caption font-medium transition-colors",
                    period === option.months
                      ? "bg-primary-600 text-white"
                      : "text-ink-muted hover:text-ink"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 h-72">
            {ready ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke={axisColor} strokeOpacity={0.35} vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fill: axisColor, fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `₹${(Number(value) / 100000).toFixed(1)}L`}
                    width={56}
                  />
                  <Tooltip
                    formatter={(value) => [formatCurrency(Number(value)), "Revenue"]}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid rgb(var(--border))",
                      boxShadow: "0 8px 24px rgb(12 15 20 / 0.08)",
                      fontSize: 13,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0066ff"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-h6 font-semibold text-ink">Client acquisition</h2>
          <p className="mt-0.5 text-body-sm text-ink-muted">New clients onboarded each month.</p>
          <div className="mt-6 h-72">
            {ready ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={acquisitionData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke={axisColor} strokeOpacity={0.35} vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} width={32} allowDecimals={false} />
                  <Tooltip
                    formatter={(value) => [Number(value), "New clients"]}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid rgb(var(--border))",
                      boxShadow: "0 8px 24px rgb(12 15 20 / 0.08)",
                      fontSize: 13,
                    }}
                    cursor={{ fill: "rgb(var(--primary-50))" }}
                  />
                  <Bar dataKey="clients" fill="#00c2ff" radius={[6, 6, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </div>
        </Card>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-h6 font-semibold text-ink">Recent leads</h2>
            <p className="mt-0.5 text-body-sm text-ink-muted">Latest contact form submissions.</p>
          </div>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 text-button font-medium text-primary-700 transition-colors hover:text-primary-800"
          >
            View all leads
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <DataTable
          data={recentLeads}
          columns={leadColumns}
          rowKey={(lead) => lead.id}
          searchKeys={(lead) => `${lead.name} ${lead.company} ${lead.service}`}
          searchPlaceholder="Search recent leads…"
          pageSize={6}
          pageSizeOptions={[6]}
        />
      </div>
    </div>
  );
}
