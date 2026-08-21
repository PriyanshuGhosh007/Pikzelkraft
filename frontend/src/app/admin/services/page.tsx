"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Clock3, Pencil, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { ServiceIcon, serviceIcons } from "@/components/marketing/service-icon";
import { Button } from "@/components/ui/button";
import { CardHover } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { createService, deleteService, getServices, updateService } from "@/lib/admin-api";
import type { Service } from "@/data/admin";
import { formatINR } from "@/data/pricing";

const serviceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  icon: z.string().min(1, "Pick an icon"),
  shortDescription: z.string().min(10, "Give a short description (min 10 characters)"),
  longDescription: z.string().min(10, "Write a longer description"),
  benefits: z.string().min(1, "Add at least one benefit per line"),
  features: z.string().min(1, "Add at least one feature per line"),
  deliverables: z.string().min(1, "Add at least one deliverable per line"),
  priceStarting: z.coerce.number().min(0, "Price can't be negative"),
  estimatedTimeline: z.string().min(1, "Timeline is required"),
});
type ServiceValues = z.infer<typeof serviceSchema>;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function fromLines(lines: string[]): string {
  return lines.join("\n");
}

const iconOptions = Object.keys(serviceIcons).sort();

function defaultProcess(name: string): { title: string; description: string }[] {
  return [
    { title: "Discover & Audit", description: `We dig into your business, audience and competitors to define measurable goals for ${name}.` },
    { title: "Strategy & Roadmap", description: "We craft a tailored roadmap, scope, budget and success metrics — agreed before work begins." },
    { title: "Design & Build", description: "Our specialists build and launch the solution with quality gates and transparent updates." },
    { title: "Launch & Refine", description: "We measure performance, iterate and document results so you own the insights." },
  ];
}

const emptyService: ServiceValues = {
  name: "",
  icon: "web-development",
  shortDescription: "",
  longDescription: "",
  benefits: "",
  features: "",
  deliverables: "",
  priceStarting: 0,
  estimatedTimeline: "",
};

function ServiceFormModal({
  open,
  onClose,
  initial,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  initial: Service | null;
  onSubmit: (values: ServiceValues) => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ServiceValues>({
    resolver: zodResolver(serviceSchema),
    mode: "onBlur",
    defaultValues: emptyService,
  });

  useEffect(() => {
    if (!open) return;
    reset(
      initial
        ? {
            name: initial.name,
            icon: initial.icon,
            shortDescription: initial.shortDescription,
            longDescription: initial.longDescription,
            benefits: fromLines(initial.benefits),
            features: fromLines(initial.features),
            deliverables: fromLines(initial.deliverables),
            priceStarting: initial.priceStarting,
            estimatedTimeline: initial.estimatedTimeline,
          }
        : emptyService
    );
  }, [open, initial, reset]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? "Edit service" : "Add service"}
      description="Services appear on the pricing and services pages of the marketing site."
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            id="service-name"
            label="Service name"
            placeholder="Web Development"
            error={errors.name?.message}
            {...register("name")}
          />
          <Select id="service-icon" label="Icon" error={errors.icon?.message} {...register("icon")}>
            {iconOptions.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </Select>
          <Input
            id="service-price"
            label="Starting price (₹)"
            type="number"
            min={0}
            placeholder="49999"
            error={errors.priceStarting?.message}
            {...register("priceStarting")}
          />
          <Input
            id="service-timeline"
            label="Estimated timeline"
            placeholder="4–8 weeks"
            error={errors.estimatedTimeline?.message}
            {...register("estimatedTimeline")}
          />
        </div>

        <Textarea
          id="service-short"
          label="Short description"
          placeholder="One or two sentences shown on cards."
          error={errors.shortDescription?.message}
          {...register("shortDescription")}
        />

        <Controller
          name="longDescription"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              id="service-long"
              label="Long description"
              value={field.value}
              onChange={field.onChange}
              error={errors.longDescription?.message}
              placeholder="Full description used on the service detail page…"
              minHeight={180}
            />
          )}
        />

        <div className="grid gap-5 lg:grid-cols-3">
          <Textarea
            id="service-benefits"
            label="Benefits (one per line)"
            className="min-h-[120px]"
            error={errors.benefits?.message}
            {...register("benefits")}
          />
          <Textarea
            id="service-features"
            label="Features (one per line)"
            className="min-h-[120px]"
            error={errors.features?.message}
            {...register("features")}
          />
          <Textarea
            id="service-deliverables"
            label="Deliverables (one per line)"
            className="min-h-[120px]"
            error={errors.deliverables?.message}
            {...register("deliverables")}
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-border pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="gradient">
            {initial ? "Save changes" : "Add service"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [deleting, setDeleting] = useState<Service | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    void getServices().then((data) => {
      if (active) setServices(data);
    });
    return () => {
      active = false;
    };
  }, []);

  async function handleCreate(values: ServiceValues) {
    setBusy(true);
    const service: Service = {
      slug: slugify(values.name),
      name: values.name,
      icon: values.icon,
      shortDescription: values.shortDescription,
      longDescription: values.longDescription,
      benefits: toLines(values.benefits),
      features: toLines(values.features),
      deliverables: toLines(values.deliverables),
      priceStarting: values.priceStarting,
      currency: "INR",
      estimatedTimeline: values.estimatedTimeline,
      process: defaultProcess(values.name),
      seo: {
        title: `${values.name} Services`,
        description: values.shortDescription,
      },
    };
    const created = await createService(service);
    setServices((current) => [...current, created]);
    setBusy(false);
    setCreating(false);
  }

  async function handleUpdate(values: ServiceValues) {
    if (!editing) return;
    setBusy(true);
    const updated = await updateService(editing.slug, {
      name: values.name,
      icon: values.icon,
      shortDescription: values.shortDescription,
      longDescription: values.longDescription,
      benefits: toLines(values.benefits),
      features: toLines(values.features),
      deliverables: toLines(values.deliverables),
      priceStarting: values.priceStarting,
      estimatedTimeline: values.estimatedTimeline,
    });
    setServices((current) => current.map((service) => (service.slug === updated.slug ? updated : service)));
    setBusy(false);
    setEditing(null);
  }

  async function handleDelete() {
    if (!deleting) return;
    setBusy(true);
    await deleteService(deleting.slug);
    setServices((current) => current.filter((service) => service.slug !== deleting.slug));
    setBusy(false);
    setDeleting(null);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Services"
        subtitle="Manage the service offerings shown on the marketing site."
        actions={
          <Button variant="gradient" onClick={() => setCreating(true)}>
            <Plus size={18} aria-hidden />
            Add service
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {services.length === 0
          ? Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-44" />)
          : services.map((service) => (
              <CardHover key={service.slug} className="flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary-50 text-primary-700">
                    <ServiceIcon icon={service.icon} className="h-5 w-5" />
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label={`Edit ${service.name}`}
                      onClick={() => setEditing(service)}
                    >
                      <Pencil size={16} aria-hidden />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label={`Delete ${service.name}`}
                      className="text-error-text hover:bg-error-soft"
                      onClick={() => setDeleting(service)}
                    >
                      <Trash2 size={16} aria-hidden />
                    </Button>
                  </div>
                </div>
                <h3 className="mt-4 text-h6 font-semibold text-ink">{service.name}</h3>
                <p className="mt-1.5 line-clamp-2 flex-1 text-body-sm text-ink-muted">
                  {service.shortDescription}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-body-sm">
                  <span className="font-semibold tabular text-primary-700">
                    From {formatINR(service.priceStarting)}
                  </span>
                  <span className="flex items-center gap-1.5 text-ink-faint">
                    <Clock3 size={14} aria-hidden />
                    {service.estimatedTimeline}
                  </span>
                </div>
              </CardHover>
            ))}
      </div>

      <ServiceFormModal
        open={creating}
        onClose={() => setCreating(false)}
        initial={null}
        onSubmit={(values) => void handleCreate(values)}
      />
      <ServiceFormModal
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        initial={editing}
        onSubmit={(values) => void handleUpdate(values)}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        title="Delete service?"
        description={
          <>
            This will remove <span className="font-semibold text-ink">{deleting?.name}</span> from the services and
            pricing pages. This action cannot be undone.
          </>
        }
        loading={busy}
        onConfirm={() => void handleDelete()}
      />
    </div>
  );
}
