"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarDays, Eye, Mail, MapPin, Pencil, Phone, Plus, Trash2, User, Wallet } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Avatar } from "@/components/dashboard/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { createClient, deleteClient, getClients, updateClient } from "@/lib/admin-api";
import type { Client, ClientStatus } from "@/data/admin";
import { formatCurrency, formatDate } from "@/lib/time";

const clientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  location: z.string().min(1, "Location is required"),
  status: z.enum(["active", "inactive", "lead"]),
  notes: z.string().optional(),
});
type ClientValues = z.infer<typeof clientSchema>;

const statusVariant: Record<ClientStatus, "success" | "neutral" | "primary"> = {
  active: "success",
  inactive: "neutral",
  lead: "primary",
};

const emptyClient: ClientValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  location: "",
  status: "lead",
  notes: "",
};

function ClientFormModal({
  open,
  onClose,
  initial,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  initial: Client | null;
  onSubmit: (values: ClientValues) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientValues>({
    resolver: zodResolver(clientSchema),
    mode: "onBlur",
    defaultValues: emptyClient,
  });

  useEffect(() => {
    if (!open) return;
    reset(
      initial
        ? {
            name: initial.name,
            company: initial.company,
            email: initial.email,
            phone: initial.phone,
            location: initial.location,
            status: initial.status,
            notes: initial.notes,
          }
        : emptyClient
    );
  }, [open, initial, reset]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? "Edit client" : "Add client"}
      description={initial ? "Update the details for this client account." : "Create a new client account."}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            id="client-name"
            label="Full name"
            placeholder="Aarav Kapoor"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            id="client-company"
            label="Company"
            placeholder="Nova Café"
            error={errors.company?.message}
            {...register("company")}
          />
          <Input
            id="client-email"
            label="Email"
            type="email"
            placeholder="aarav@novacafe.in"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            id="client-phone"
            label="Phone"
            placeholder="+91 98111 22233"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <Input
            id="client-location"
            label="Location"
            placeholder="Bengaluru"
            error={errors.location?.message}
            {...register("location")}
          />
          <Select id="client-status" label="Status" error={errors.status?.message} {...register("status")}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="lead">Lead</option>
          </Select>
        </div>
        <Textarea
          id="client-notes"
          label="Internal notes"
          placeholder="Preferences, contacts, next steps…"
          error={errors.notes?.message}
          {...register("notes")}
        />
        <div className="flex justify-end gap-3 border-t border-border pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="gradient">
            {initial ? "Save changes" : "Add client"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [ready, setReady] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [deleting, setDeleting] = useState<Client | null>(null);
  const [profile, setProfile] = useState<Client | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    void getClients().then((data) => {
      if (!active) return;
      setClients(data);
      setReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  async function handleCreate(values: ClientValues) {
    setBusy(true);
    const client = await createClient({
      ...values,
      notes: values.notes ?? "",
      joinedDate: new Date().toISOString().slice(0, 10),
      totalSpent: 0,
      activeProjects: 0,
    });
    setClients((current) => [client, ...current]);
    setBusy(false);
    setCreating(false);
  }

  async function handleUpdate(values: ClientValues) {
    if (!editing) return;
    setBusy(true);
    const updated = await updateClient(editing.id, values);
    setClients((current) => current.map((client) => (client.id === updated.id ? updated : client)));
    setProfile((current) => (current?.id === updated.id ? updated : current));
    setBusy(false);
    setEditing(null);
  }

  async function handleDelete() {
    if (!deleting) return;
    setBusy(true);
    await deleteClient(deleting.id);
    setClients((current) => current.filter((client) => client.id !== deleting.id));
    setProfile((current) => (current?.id === deleting.id ? null : current));
    setBusy(false);
    setDeleting(null);
  }

  const columns: DataTableColumn<Client>[] = [
    {
      key: "name",
      header: "Client",
      sortable: true,
      sortValue: (client) => client.name,
      render: (client) => (
        <div className="flex items-center gap-3">
          <Avatar name={client.name} size="sm" />
          <div className="min-w-0">
            <p className="font-semibold text-ink">{client.name}</p>
            <p className="text-caption text-ink-faint">{client.id.toUpperCase()}</p>
          </div>
        </div>
      ),
    },
    { key: "company", header: "Company", sortable: true, sortValue: (client) => client.company, render: (client) => <span className="text-ink-muted">{client.company}</span> },
    { key: "email", header: "Email", sortable: true, sortValue: (client) => client.email, render: (client) => <span className="text-ink-muted">{client.email}</span> },
    { key: "phone", header: "Phone", render: (client) => <span className="text-ink-muted">{client.phone}</span> },
    {
      key: "joinedDate",
      header: "Joined",
      sortable: true,
      sortValue: (client) => client.joinedDate,
      render: (client) => <span className="text-ink-muted">{formatDate(client.joinedDate)}</span>,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      sortValue: (client) => client.status,
      render: (client) => <Badge variant={statusVariant[client.status]}>{client.status}</Badge>,
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (client) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="sm" aria-label={`View ${client.name}`} onClick={() => setProfile(client)}>
            <Eye size={16} aria-hidden />
          </Button>
          <Button variant="ghost" size="sm" aria-label={`Edit ${client.name}`} onClick={() => setEditing(client)}>
            <Pencil size={16} aria-hidden />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label={`Delete ${client.name}`}
            className="text-error-text hover:bg-error-soft"
            onClick={() => setDeleting(client)}
          >
            <Trash2 size={16} aria-hidden />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Clients"
        subtitle="Manage client accounts, contact details and account status."
        actions={
          <Button variant="gradient" onClick={() => setCreating(true)}>
            <Plus size={18} aria-hidden />
            Add client
          </Button>
        }
      />

      <DataTable
        data={clients}
        columns={columns}
        rowKey={(client) => client.id}
        searchKeys={(client) => `${client.name} ${client.company} ${client.email} ${client.phone} ${client.location}`}
        searchPlaceholder="Search clients…"
        defaultSort={{ key: "name", direction: "asc" }}
      />

      {ready && (
        <Card className="border-dashed bg-surface-muted/40">
          <div className="grid gap-4 text-center text-body-sm text-ink-muted sm:grid-cols-3">
            <p>
              <span className="font-semibold text-ink">{clients.filter((c) => c.status === "active").length}</span>{" "}
              active clients
            </p>
            <p>
              <span className="font-semibold text-ink">{clients.filter((c) => c.status === "lead").length}</span>{" "}
              prospective clients
            </p>
            <p>
              <span className="font-semibold text-ink">
                {formatCurrency(clients.reduce((sum, client) => sum + client.totalSpent, 0))}
              </span>{" "}
              lifetime value
            </p>
          </div>
        </Card>
      )}

      <ClientFormModal open={creating} onClose={() => setCreating(false)} initial={null} onSubmit={(values) => void handleCreate(values)} />
      <ClientFormModal open={Boolean(editing)} onClose={() => setEditing(null)} initial={editing} onSubmit={(values) => void handleUpdate(values)} />

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        title="Delete client?"
        description={
          <>
            This will permanently remove <span className="font-semibold text-ink">{deleting?.name}</span> (
            {deleting?.company}) from the client list. This action cannot be undone.
          </>
        }
        loading={busy}
        onConfirm={() => void handleDelete()}
      />

      <Modal
        open={Boolean(profile)}
        onClose={() => setProfile(null)}
        title={profile ? `${profile.name} — ${profile.company}` : "Client profile"}
        size="lg"
      >
        {profile ? (
          <div className="space-y-6">
            <div className="flex items-start gap-5">
              <Avatar name={profile.name} size="lg" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-h5 font-semibold text-ink">{profile.name}</h4>
                  <Badge variant={statusVariant[profile.status]}>{profile.status}</Badge>
                </div>
                <p className="mt-0.5 text-body-md text-ink-muted">{profile.company}</p>
                <div className="mt-3 grid gap-2 text-body-sm text-ink-muted sm:grid-cols-2">
                  <span className="flex items-center gap-2">
                    <Mail size={15} aria-hidden className="text-ink-faint" /> {profile.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <Phone size={15} aria-hidden className="text-ink-faint" /> {profile.phone}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={15} aria-hidden className="text-ink-faint" /> {profile.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <CalendarDays size={15} aria-hidden className="text-ink-faint" /> Joined {formatDate(profile.joinedDate)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Wallet size={15} aria-hidden className="text-ink-faint" /> {formatCurrency(profile.totalSpent)} lifetime
                  </span>
                  <span className="flex items-center gap-2">
                    <User size={15} aria-hidden className="text-ink-faint" /> {profile.activeProjects} active project
                    {profile.activeProjects === 1 ? "" : "s"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-surface-muted/60 p-4">
              <p className="text-label font-semibold uppercase tracking-[0.08em] text-ink-muted">Internal notes</p>
              <p className="mt-2 text-body-sm text-ink-muted">{profile.notes || "No notes added yet."}</p>
            </div>

            <div className="flex justify-end gap-3 border-t border-border pt-4">
              <Button
                variant="secondary"
                onClick={() => {
                  setEditing(profile);
                  setProfile(null);
                }}
              >
                <Pencil size={16} aria-hidden />
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setDeleting(profile);
                  setProfile(null);
                }}
              >
                <Trash2 size={16} aria-hidden />
                Delete
              </Button>
              <Button variant="primary" onClick={() => setProfile(null)}>
                Close
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
