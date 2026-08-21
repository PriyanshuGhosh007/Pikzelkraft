"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Download, MessageSquareText, Trash2, X } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Avatar } from "@/components/dashboard/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { acceptLead, deleteLead, getLeads, rejectLead, updateLead } from "@/lib/admin-api";
import type { Lead, LeadStatus } from "@/data/admin";
import { exportCsv } from "@/lib/csv";
import { formatDateTime } from "@/lib/time";
import { cn } from "@/lib/utils";

const filterOptions: { value: "all" | LeadStatus; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "replied", label: "Replied" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
];

const statusVariant: Record<LeadStatus, "primary" | "warning" | "info" | "success" | "error"> = {
  new: "primary",
  read: "warning",
  replied: "info",
  accepted: "success",
  rejected: "error",
};

const notesSchema = z.object({ notes: z.string().max(2000, "Keep notes under 2000 characters") });
type NotesValues = z.infer<typeof notesSchema>;

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<"all" | LeadStatus>("all");
  const [detail, setDetail] = useState<Lead | null>(null);
  const [deleting, setDeleting] = useState<Lead | null>(null);
  const [busy, setBusy] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NotesValues>({
    resolver: zodResolver(notesSchema),
    mode: "onBlur",
    defaultValues: { notes: "" },
  });

  useEffect(() => {
    let active = true;
    void getLeads().then((data) => {
      if (!active) return;
      setLeads(data);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (detail) reset({ notes: detail.notes });
  }, [detail, reset]);

  const filtered = useMemo(() => {
    if (filter === "all") return leads;
    return leads.filter((lead) => lead.status === filter);
  }, [leads, filter]);

  function updateLeadInState(updated: Lead) {
    setLeads((current) => current.map((lead) => (lead.id === updated.id ? updated : lead)));
    setDetail((current) => (current?.id === updated.id ? updated : current));
  }

  async function handleSaveNotes(values: NotesValues) {
    if (!detail) return;
    setBusy(true);
    const updated = await updateLead(detail.id, { notes: values.notes });
    updateLeadInState(updated);
    setBusy(false);
  }

  async function handleAccept() {
    if (!detail) return;
    setBusy(true);
    const updated = await acceptLead(detail.id);
    updateLeadInState(updated);
    setBusy(false);
  }

  async function handleReject() {
    if (!detail) return;
    setBusy(true);
    const updated = await rejectLead(detail.id);
    updateLeadInState(updated);
    setBusy(false);
  }

  async function handleDelete() {
    if (!deleting) return;
    setBusy(true);
    await deleteLead(deleting.id);
    setLeads((current) => current.filter((lead) => lead.id !== deleting.id));
    setDetail((current) => (current?.id === deleting.id ? null : current));
    setBusy(false);
    setDeleting(null);
  }

  function handleExport() {
    exportCsv(
      "pikzelkraft-leads.csv",
      filtered.map((lead) => ({
        ID: lead.id,
        Name: lead.name,
        Company: lead.company,
        Email: lead.email,
        Phone: lead.phone,
        Service: lead.service,
        Source: lead.source,
        Status: lead.status,
        Message: lead.message,
        Notes: lead.notes,
        Received: lead.createdAt,
      }))
    );
  }

  const columns: DataTableColumn<Lead>[] = [
    {
      key: "name",
      header: "Lead",
      sortable: true,
      sortValue: (lead) => lead.name,
      render: (lead) => (
        <div className="flex items-center gap-3">
          <Avatar name={lead.name} size="sm" />
          <div className="min-w-0">
            <p className="font-semibold text-ink">{lead.name}</p>
            <p className="text-caption text-ink-faint">{lead.company || "—"}</p>
          </div>
        </div>
      ),
    },
    { key: "service", header: "Service", sortable: true, sortValue: (lead) => lead.service, render: (lead) => <span className="text-ink-muted">{lead.service}</span> },
    {
      key: "message",
      header: "Message",
      render: (lead) => (
        <span className="block max-w-[24rem] truncate text-ink-muted">{lead.message}</span>
      ),
    },
    { key: "source", header: "Source", sortable: true, sortValue: (lead) => lead.source, render: (lead) => <span className="rounded-md bg-surface-muted px-2 py-1 text-caption font-medium text-ink-muted">{lead.source}</span> },
    {
      key: "status",
      header: "Status",
      sortable: true,
      sortValue: (lead) => lead.status,
      render: (lead) => <Badge variant={statusVariant[lead.status]}>{lead.status}</Badge>,
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
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (lead) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="sm" aria-label={`Review ${lead.name}`} onClick={() => setDetail(lead)}>
            <MessageSquareText size={16} aria-hidden />
          </Button>
          {lead.status === "new" || lead.status === "read" ? (
            <Button
              variant="ghost"
              size="sm"
              aria-label={`Accept ${lead.name}`}
              className="text-success-text hover:bg-success-soft"
              onClick={() => {
                setDetail(lead);
                void acceptLead(lead.id).then(updateLeadInState);
              }}
            >
              <Check size={16} aria-hidden />
            </Button>
          ) : null}
          {lead.status === "new" || lead.status === "read" ? (
            <Button
              variant="ghost"
              size="sm"
              aria-label={`Reject ${lead.name}`}
              className="text-error-text hover:bg-error-soft"
              onClick={() => {
                setDetail(lead);
                void rejectLead(lead.id).then(updateLeadInState);
              }}
            >
              <X size={16} aria-hidden />
            </Button>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Leads"
        subtitle="Review contact form submissions, assign notes and convert qualified leads into clients."
        actions={
          <Button variant="secondary" onClick={handleExport}>
            <Download size={18} aria-hidden />
            Export CSV
          </Button>
        }
      />

      <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
          <MiniStat label="Total" value={leads.length} />
          <MiniStat label="New" value={leads.filter((lead) => lead.status === "new").length} tone="text-primary-700" />
          <MiniStat label="Accepted" value={leads.filter((lead) => lead.status === "accepted").length} tone="text-success-text" />
          <MiniStat label="Rejected" value={leads.filter((lead) => lead.status === "rejected").length} tone="text-error-text" />
        </div>
        <div className="w-full sm:w-52">
          <Select id="lead-filter" aria-label="Filter by status" value={filter} onChange={(event) => setFilter(event.target.value as "all" | LeadStatus)}>
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </Card>

      <DataTable
        data={filtered}
        columns={columns}
        rowKey={(lead) => lead.id}
        searchKeys={(lead) => `${lead.name} ${lead.company} ${lead.email} ${lead.service} ${lead.message}`}
        searchPlaceholder="Search leads…"
        defaultSort={{ key: "createdAt", direction: "desc" }}
      />

      <Modal
        open={Boolean(detail)}
        onClose={() => setDetail(null)}
        title="Lead details"
        description="Review the enquiry, add internal notes and accept or reject the lead."
        size="lg"
      >
        {detail ? (
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Avatar name={detail.name} size="lg" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-h5 font-semibold text-ink">{detail.name}</h4>
                  <Badge variant={statusVariant[detail.status]}>{detail.status}</Badge>
                </div>
                <p className="text-body-sm text-ink-muted">
                  {detail.company || "No company"} · {detail.email} · {detail.phone}
                </p>
                <p className="mt-1 text-caption text-ink-faint">
                  Via {detail.source} · Received {formatDateTime(detail.createdAt)}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-surface-muted/60 p-5">
              <p className="text-label font-semibold uppercase tracking-[0.08em] text-ink-muted">
                Enquiry · {detail.service}
              </p>
              <p className="mt-2 text-body-md text-ink">{detail.message}</p>
            </div>

            <form onSubmit={handleSubmit((values) => void handleSaveNotes(values))} className="space-y-4" noValidate>
              <Textarea
                id="lead-notes"
                label="Internal notes"
                placeholder="Add context, next steps, budget notes…"
                error={errors.notes?.message}
                {...register("notes")}
              />
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-error-text hover:bg-error-soft"
                  onClick={() => setDeleting(detail)}
                >
                  <Trash2 size={16} aria-hidden />
                  Delete
                </Button>
                <div className="flex flex-wrap gap-3">
                  {detail.status === "new" || detail.status === "read" ? (
                    <>
                      <Button type="button" variant="danger" onClick={() => void handleReject()} disabled={busy}>
                        <X size={16} aria-hidden />
                        Reject
                      </Button>
                      <Button type="button" variant="success" onClick={() => void handleAccept()} disabled={busy}>
                        <Check size={16} aria-hidden />
                        Accept
                      </Button>
                    </>
                  ) : null}
                  <Button type="submit" variant="gradient" disabled={busy}>
                    Save notes
                  </Button>
                </div>
              </div>
            </form>
          </div>
        ) : null}
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        title="Delete lead?"
        description={
          <>
            This will permanently remove the enquiry from <span className="font-semibold text-ink">{deleting?.name}</span>.
            This action cannot be undone.
          </>
        }
        loading={busy}
        onConfirm={() => void handleDelete()}
      />
    </div>
  );
}

function MiniStat({ label, value, tone }: { label: string; value: number; tone?: string }) {
  return (
    <div>
      <p className="text-label font-semibold uppercase tracking-[0.08em] text-ink-muted">{label}</p>
      <p className={cn("mt-1 text-2xl font-semibold tabular text-ink", tone)}>{value}</p>
    </div>
  );
}
