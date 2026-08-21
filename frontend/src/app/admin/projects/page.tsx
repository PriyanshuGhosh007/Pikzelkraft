"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarDays, Check, Paperclip, Plus, Trash2, Upload } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import {
  createProject,
  deleteProject,
  getClients,
  getProjects,
  getServices,
  updateProject,
  uploadProjectFile,
} from "@/lib/admin-api";
import type { AdminMilestoneStatus, AdminProject, AdminProjectStatus, Client, Service } from "@/data/admin";
import { formatCurrency, formatDate } from "@/lib/time";
import { formatFileSize } from "@/lib/cloudinary-upload";
import { cn } from "@/lib/utils";

const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  clientId: z.string().min(1, "Select a client"),
  service: z.string().min(1, "Select a service"),
  status: z.enum(["planning", "in-progress", "review", "completed", "on-hold"]),
  budget: z.coerce.number().min(0, "Budget can't be negative"),
  startDate: z.string().min(1, "Start date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  description: z.string().min(10, "Describe the project (min 10 characters)"),
});
type ProjectValues = z.infer<typeof projectSchema>;

const projectStatusVariant: Record<AdminProjectStatus, "primary" | "info" | "success" | "warning" | "neutral"> = {
  planning: "info",
  "in-progress": "primary",
  review: "warning",
  completed: "success",
  "on-hold": "neutral",
};

const milestoneStatusVariant: Record<AdminMilestoneStatus, "success" | "primary" | "neutral"> = {
  completed: "success",
  "in-progress": "primary",
  pending: "neutral",
};

const emptyProject: ProjectValues = {
  title: "",
  clientId: "",
  service: "",
  status: "planning",
  budget: 0,
  startDate: "",
  dueDate: "",
  description: "",
};

function ProjectFormModal({
  open,
  onClose,
  clients,
  services,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  clients: Client[];
  services: Service[];
  onSubmit: (values: ProjectValues) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectValues>({
    resolver: zodResolver(projectSchema),
    mode: "onBlur",
    defaultValues: emptyProject,
  });

  useEffect(() => {
    if (open) reset(emptyProject);
  }, [open, reset]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create project"
      description="Assign a project to a client and choose the service."
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
        <Input
          id="project-title"
          label="Project title"
          placeholder="Nova Café Website Revamp"
          error={errors.title?.message}
          {...register("title")}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Select id="project-client" label="Client" error={errors.clientId?.message} defaultValue="" {...register("clientId")}>
            <option value="" disabled>
              Select a client
            </option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name} — {client.company}
              </option>
            ))}
          </Select>
          <Select id="project-service" label="Service" error={errors.service?.message} defaultValue="" {...register("service")}>
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.name}>
                {service.name}
              </option>
            ))}
          </Select>
          <Select id="project-status" label="Status" error={errors.status?.message} {...register("status")}>
            <option value="planning">Planning</option>
            <option value="in-progress">In progress</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On hold</option>
          </Select>
          <Input
            id="project-budget"
            label="Budget (₹)"
            type="number"
            min={0}
            placeholder="185000"
            error={errors.budget?.message}
            {...register("budget")}
          />
          <Input
            id="project-start"
            label="Start date"
            type="date"
            error={errors.startDate?.message}
            {...register("startDate")}
          />
          <Input
            id="project-due"
            label="Due date"
            type="date"
            error={errors.dueDate?.message}
            {...register("dueDate")}
          />
        </div>
        <Textarea
          id="project-description"
          label="Description"
          placeholder="What does this engagement involve?"
          error={errors.description?.message}
          {...register("description")}
        />
        <div className="flex justify-end gap-3 border-t border-border pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="gradient">
            <Plus size={16} aria-hidden />
            Create project
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [creating, setCreating] = useState(false);
  const [managing, setManaging] = useState<AdminProject | null>(null);
  const [deleting, setDeleting] = useState<AdminProject | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    void Promise.all([getProjects(), getClients(), getServices()]).then(([projectData, clientData, serviceData]) => {
      if (!active) return;
      setProjects(projectData);
      setClients(clientData);
      setServices(serviceData);
    });
    return () => {
      active = false;
    };
  }, []);

  const clientName = useMemo(
    () => (id: string) => clients.find((client) => client.id === id)?.name ?? "Unknown",
    [clients]
  );
  const clientCompany = useMemo(
    () => (id: string) => clients.find((client) => client.id === id)?.company ?? "",
    [clients]
  );

  async function handleCreate(values: ProjectValues) {
    setBusy(true);
    const project = await createProject({ ...values, progress: 0, milestones: [] });
    setProjects((current) => [project, ...current]);
    setBusy(false);
    setCreating(false);
  }

  async function handleSaveProgress(percent: number) {
    if (!managing) return;
    setBusy(true);
    const updated = await updateProject(managing.id, {
      progress: percent,
      status: percent === 100 ? "completed" : managing.status,
    });
    setProjects((current) => current.map((project) => (project.id === updated.id ? updated : project)));
    setManaging(updated);
    setBusy(false);
  }

  async function handleChangeStatus(status: AdminProjectStatus) {
    if (!managing) return;
    setBusy(true);
    const updated = await updateProject(managing.id, { status });
    setProjects((current) => current.map((project) => (project.id === updated.id ? updated : project)));
    setManaging(updated);
    setBusy(false);
  }

  async function handleMilestoneStatus(milestoneId: string, status: AdminMilestoneStatus) {
    if (!managing) return;
    const milestones = managing.milestones.map((milestone) =>
      milestone.id === milestoneId ? { ...milestone, status } : milestone
    );
    const updated = await updateProject(managing.id, { milestones });
    setProjects((current) => current.map((project) => (project.id === updated.id ? updated : project)));
    setManaging(updated);
  }

  async function handleUploadFiles(files: FileList | null) {
    if (!managing || !files || files.length === 0) return;
    setBusy(true);
    for (const file of Array.from(files)) {
      await uploadProjectFile(managing.id, file.name, formatFileSize(file.size));
    }
    const refreshed = await getProjects();
    setProjects(refreshed);
    setManaging(refreshed.find((project) => project.id === managing.id) ?? null);
    setBusy(false);
  }

  async function handleDelete() {
    if (!deleting) return;
    setBusy(true);
    await deleteProject(deleting.id);
    setProjects((current) => current.filter((project) => project.id !== deleting.id));
    setManaging((current) => (current?.id === deleting.id ? null : current));
    setBusy(false);
    setDeleting(null);
  }

  const columns: DataTableColumn<AdminProject>[] = [
    {
      key: "title",
      header: "Project",
      sortable: true,
      sortValue: (project) => project.title,
      render: (project) => (
        <div className="min-w-0">
          <p className="font-semibold text-ink">{project.title}</p>
          <p className="text-caption text-ink-faint">
            {clientName(project.clientId)} · {clientCompany(project.clientId)}
          </p>
        </div>
      ),
    },
    { key: "service", header: "Service", sortable: true, sortValue: (project) => project.service, render: (project) => <span className="text-ink-muted">{project.service}</span> },
    {
      key: "status",
      header: "Status",
      sortable: true,
      sortValue: (project) => project.status,
      render: (project) => <Badge variant={projectStatusVariant[project.status]}>{project.status}</Badge>,
    },
    {
      key: "progress",
      header: "Progress",
      sortable: true,
      sortValue: (project) => project.progress,
      render: (project) => (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-muted">
            <div
              className={cn("h-full rounded-full", project.progress === 100 ? "bg-success" : "bg-gradient-primary")}
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <span className="text-caption font-medium tabular text-ink-muted">{project.progress}%</span>
        </div>
      ),
    },
    {
      key: "budget",
      header: "Budget",
      sortable: true,
      sortValue: (project) => project.budget,
      render: (project) => <span className="tabular text-ink-muted">{formatCurrency(project.budget)}</span>,
    },
    {
      key: "dueDate",
      header: "Due date",
      sortable: true,
      sortValue: (project) => project.dueDate,
      render: (project) => (
        <span className="flex items-center gap-1.5 text-ink-muted">
          <CalendarDays size={14} aria-hidden className="text-ink-faint" />
          {formatDate(project.dueDate)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (project) => (
        <div className="flex items-center justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={() => setManaging(project)}>
            Manage
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Projects"
        subtitle="Create engagements, track progress and manage milestones and files."
        actions={
          <Button variant="gradient" onClick={() => setCreating(true)}>
            <Plus size={18} aria-hidden />
            New project
          </Button>
        }
      />

      <DataTable
        data={projects}
        columns={columns}
        rowKey={(project) => project.id}
        searchKeys={(project) => `${project.title} ${project.service} ${clientName(project.clientId)} ${clientCompany(project.clientId)}`}
        searchPlaceholder="Search projects…"
        defaultSort={{ key: "dueDate", direction: "asc" }}
      />

      <ProjectFormModal
        open={creating}
        onClose={() => setCreating(false)}
        clients={clients}
        services={services}
        onSubmit={(values) => void handleCreate(values)}
      />

      <Modal
        open={Boolean(managing)}
        onClose={() => setManaging(null)}
        title={managing?.title ?? "Manage project"}
        description={managing ? `${clientName(managing.clientId)} · ${clientCompany(managing.clientId)}` : undefined}
        size="lg"
      >
        {managing ? (
          <div className="space-y-8">
            <section>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-label font-semibold uppercase tracking-[0.08em] text-ink-muted">Progress</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-semibold tabular text-ink">{managing.progress}%</span>
                  <Button
                    size="sm"
                    variant={managing.progress === 100 ? "success" : "primary"}
                    disabled={busy}
                    onClick={() => void handleSaveProgress(managing.progress)}
                  >
                    <Check size={15} aria-hidden />
                    Save
                  </Button>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={managing.progress}
                aria-label="Project progress"
                onChange={(event) =>
                  setManaging({ ...managing, progress: Number(event.target.value) })
                }
                className="mt-4 w-full cursor-pointer accent-[rgb(var(--primary-600))]"
              />
            </section>

            <section className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-label font-semibold uppercase tracking-[0.08em] text-ink-muted">Status</p>
                <Select
                  id="manage-status"
                  aria-label="Project status"
                  value={managing.status}
                  className="mt-2"
                  onChange={(event) => void handleChangeStatus(event.target.value as AdminProjectStatus)}
                >
                  <option value="planning">Planning</option>
                  <option value="in-progress">In progress</option>
                  <option value="review">Review</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On hold</option>
                </Select>
              </div>
              <div>
                <p className="text-label font-semibold uppercase tracking-[0.08em] text-ink-muted">Budget</p>
                <p className="mt-2 text-h5 font-semibold tabular text-ink">{formatCurrency(managing.budget)}</p>
                <p className="mt-1 text-caption text-ink-faint">
                  {formatDate(managing.startDate)} → {formatDate(managing.dueDate)}
                </p>
              </div>
            </section>

            <section>
              <p className="text-label font-semibold uppercase tracking-[0.08em] text-ink-muted">Milestones</p>
              {managing.milestones.length > 0 ? (
                <ul className="mt-3 divide-y divide-border rounded-lg border border-border">
                  {managing.milestones.map((milestone) => (
                    <li key={milestone.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                      <div className="min-w-0">
                        <p className="font-medium text-ink">{milestone.name}</p>
                        <p className="text-caption text-ink-faint">Due {formatDate(milestone.dueDate)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={milestoneStatusVariant[milestone.status]}>{milestone.status}</Badge>
                        <select
                          aria-label={`Update milestone ${milestone.name}`}
                          value={milestone.status}
                          onChange={(event) =>
                            void handleMilestoneStatus(milestone.id, event.target.value as AdminMilestoneStatus)
                          }
                          className="input h-8 w-32 cursor-pointer rounded-md px-2 py-0 text-caption"
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 rounded-lg border border-dashed border-border bg-surface-muted/40 px-4 py-6 text-center text-body-sm text-ink-muted">
                  No milestones added yet.
                </p>
              )}
            </section>

            <section>
              <div className="flex items-center justify-between gap-3">
                <p className="text-label font-semibold uppercase tracking-[0.08em] text-ink-muted">Files</p>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-button font-medium text-ink transition-colors hover:border-strong hover:bg-surface-muted">
                  <Upload size={16} aria-hidden />
                  Upload files
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(event) => void handleUploadFiles(event.target.files)}
                  />
                </label>
              </div>
              {managing.files.length > 0 ? (
                <ul className="mt-3 divide-y divide-border rounded-lg border border-border">
                  {managing.files.map((file) => (
                    <li key={file.id} className="flex items-center gap-3 px-4 py-3">
                      <Paperclip size={16} aria-hidden className="shrink-0 text-ink-faint" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-ink">{file.name}</p>
                        <p className="text-caption text-ink-faint">{file.size} · uploaded {formatDate(file.uploadedAt)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 rounded-lg border border-dashed border-border bg-surface-muted/40 px-4 py-6 text-center text-body-sm text-ink-muted">
                  No files uploaded yet.
                </p>
              )}
            </section>

            <div className="flex justify-end border-t border-border pt-4">
              <Button
                variant="danger"
                onClick={() => setDeleting(managing)}
                disabled={busy}
              >
                <Trash2 size={16} aria-hidden />
                Delete project
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        title="Delete project?"
        description={
          <>
            This will permanently remove <span className="font-semibold text-ink">{deleting?.title}</span> and all of
            its milestones and files. This action cannot be undone.
          </>
        }
        loading={busy}
        onConfirm={() => void handleDelete()}
      />
    </div>
  );
}
