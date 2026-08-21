"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Pencil, Plus, Star, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardHover } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import {
  createIndividualPricing,
  createPackage,
  deleteIndividualPricing,
  deletePackage,
  getIndividualPricing,
  getPackages,
  getServices,
  updateIndividualPricing,
  updatePackage,
} from "@/lib/admin-api";
import type { IndividualPricing, PricingPackage, Service } from "@/data/admin";
import { formatINR } from "@/data/pricing";
import { cn } from "@/lib/utils";

const packageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  tagline: z.string().min(2, "Tagline is required"),
  price: z.coerce.number().min(0, "Price can't be negative"),
  period: z.enum(["monthly", "one-time", "custom"]),
  description: z.string().min(5, "Description is too short"),
  features: z.string().min(1, "Add at least one feature per line"),
  popular: z.boolean(),
  featured: z.boolean(),
  cta: z.string().min(2, "CTA label is required"),
});
type PackageValues = z.infer<typeof packageSchema>;

const individualSchema = z.object({
  slug: z.string().min(1, "Select a service"),
  priceStarting: z.coerce.number().min(0, "Price can't be negative"),
  unit: z.string().min(1, "Unit is required (e.g. per month)"),
  description: z.string().min(5, "Description is too short"),
});
type IndividualValues = z.infer<typeof individualSchema>;

const periodLabel: Record<PricingPackage["period"], string> = {
  monthly: "per month",
  "one-time": "one-time",
  custom: "custom",
};

const emptyPackage: PackageValues = {
  name: "",
  tagline: "",
  price: 0,
  period: "monthly",
  description: "",
  features: "",
  popular: false,
  featured: false,
  cta: "Get started",
};

const emptyIndividual: IndividualValues = {
  slug: "",
  priceStarting: 0,
  unit: "per project",
  description: "",
};

function PackageFormModal({
  open,
  onClose,
  initial,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  initial: PricingPackage | null;
  onSubmit: (values: PackageValues) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PackageValues>({
    resolver: zodResolver(packageSchema),
    mode: "onBlur",
    defaultValues: emptyPackage,
  });

  useEffect(() => {
    if (!open) return;
    reset(
      initial
        ? {
            name: initial.name,
            tagline: initial.tagline,
            price: initial.price,
            period: initial.period,
            description: initial.description,
            features: initial.features.join("\n"),
            popular: Boolean(initial.popular),
            featured: Boolean(initial.featured),
            cta: initial.cta,
          }
        : emptyPackage
    );
  }, [open, initial, reset]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? "Edit package" : "Add package"}
      description="Packages power the pricing page bundles."
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input id="package-name" label="Package name" placeholder="Growth Sprint" error={errors.name?.message} {...register("name")} />
          <Input id="package-tagline" label="Tagline" placeholder="For businesses ready to scale" error={errors.tagline?.message} {...register("tagline")} />
          <Input id="package-price" label="Price (₹)" type="number" min={0} placeholder="49999" error={errors.price?.message} {...register("price")} />
          <Select id="package-period" label="Period" error={errors.period?.message} {...register("period")}>
            <option value="monthly">Monthly</option>
            <option value="one-time">One-time</option>
            <option value="custom">Custom</option>
          </Select>
        </div>
        <Textarea
          id="package-description"
          label="Description"
          placeholder="A one-line summary of the package."
          error={errors.description?.message}
          {...register("description")}
        />
        <Textarea
          id="package-features"
          label="Features (one per line)"
          placeholder={"Everything in Launch Pad\nContent marketing (4 blogs/month)"}
          error={errors.features?.message}
          {...register("features")}
        />
        <Input id="package-cta" label="CTA label" placeholder="Grow with Pikzelkraft" error={errors.cta?.message} {...register("cta")} />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-md border border-border bg-surface-muted/50 px-4 py-3">
            <input type="checkbox" className="h-4 w-4 accent-[rgb(var(--primary-600))]" {...register("popular")} />
            <span className="text-body-sm font-medium text-ink">Highlight as popular</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 rounded-md border border-border bg-surface-muted/50 px-4 py-3">
            <input type="checkbox" className="h-4 w-4 accent-[rgb(var(--primary-600))]" {...register("featured")} />
            <span className="text-body-sm font-medium text-ink">Featured tier</span>
          </label>
        </div>
        <div className="flex justify-end gap-3 border-t border-border pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="gradient">
            {initial ? "Save changes" : "Add package"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function IndividualFormModal({
  open,
  onClose,
  initial,
  services,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  initial: IndividualPricing | null;
  services: Service[];
  onSubmit: (values: IndividualValues) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IndividualValues>({
    resolver: zodResolver(individualSchema),
    mode: "onBlur",
    defaultValues: emptyIndividual,
  });

  useEffect(() => {
    if (!open) return;
    reset(
      initial
        ? {
            slug: initial.slug,
            priceStarting: initial.priceStarting,
            unit: initial.unit,
            description: initial.description,
          }
        : emptyIndividual
    );
  }, [open, initial, reset]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? "Edit service pricing" : "Add service pricing"}
      description="Individual pricing cards shown on the pricing page."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
        <Select id="individual-slug" label="Service" error={errors.slug?.message} defaultValue="" {...register("slug")}>
          <option value="" disabled>
            Select a service
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.name}
            </option>
          ))}
        </Select>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input id="individual-price" label="Starting price (₹)" type="number" min={0} placeholder="49999" error={errors.priceStarting?.message} {...register("priceStarting")} />
          <Input id="individual-unit" label="Unit" placeholder="per project / per month" error={errors.unit?.message} {...register("unit")} />
        </div>
        <Textarea
          id="individual-description"
          label="Description"
          placeholder="One line about the service."
          error={errors.description?.message}
          {...register("description")}
        />
        <div className="flex justify-end gap-3 border-t border-border pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="gradient">
            {initial ? "Save changes" : "Add pricing"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default function AdminPricingPage() {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [individual, setIndividual] = useState<IndividualPricing[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [packageModal, setPackageModal] = useState<{ open: boolean; editing: PricingPackage | null }>({ open: false, editing: null });
  const [individualModal, setIndividualModal] = useState<{ open: boolean; editing: IndividualPricing | null }>({ open: false, editing: null });
  const [deletingPackage, setDeletingPackage] = useState<PricingPackage | null>(null);
  const [deletingIndividual, setDeletingIndividual] = useState<IndividualPricing | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    void Promise.all([getPackages(), getIndividualPricing(), getServices()]).then(([packageData, individualData, serviceData]) => {
      if (!active) return;
      setPackages(packageData);
      setIndividual(individualData);
      setServices(serviceData);
    });
    return () => {
      active = false;
    };
  }, []);

  async function handlePackageSubmit(values: PackageValues) {
    setBusy(true);
    const payload = {
      ...values,
      features: values.features.split("\n").map((line) => line.trim()).filter(Boolean),
    };
    if (packageModal.editing) {
      const updated = await updatePackage(packageModal.editing.id, payload);
      setPackages((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    } else {
      const created = await createPackage({
        ...payload,
        id: `pkg-${Date.now()}`,
      });
      setPackages((current) => [...current, created]);
    }
    setBusy(false);
    setPackageModal({ open: false, editing: null });
  }

  async function handleIndividualSubmit(values: IndividualValues) {
    setBusy(true);
    const service = services.find((item) => item.slug === values.slug);
    const payload: IndividualPricing = {
      slug: values.slug,
      name: service?.name ?? values.slug,
      icon: service?.icon ?? "web-development",
      priceStarting: values.priceStarting,
      unit: values.unit,
      description: values.description,
    };
    if (individualModal.editing) {
      const updated = await updateIndividualPricing(individualModal.editing.slug, payload);
      setIndividual((current) => current.map((item) => (item.slug === updated.slug ? updated : item)));
    } else {
      const created = await createIndividualPricing(payload);
      setIndividual((current) => [...current, created]);
    }
    setBusy(false);
    setIndividualModal({ open: false, editing: null });
  }

  async function handleDeletePackage() {
    if (!deletingPackage) return;
    setBusy(true);
    await deletePackage(deletingPackage.id);
    setPackages((current) => current.filter((item) => item.id !== deletingPackage.id));
    setBusy(false);
    setDeletingPackage(null);
  }

  async function handleDeleteIndividual() {
    if (!deletingIndividual) return;
    setBusy(true);
    await deleteIndividualPricing(deletingIndividual.slug);
    setIndividual((current) => current.filter((item) => item.slug !== deletingIndividual.slug));
    setBusy(false);
    setDeletingIndividual(null);
  }

  const individualColumns: DataTableColumn<IndividualPricing>[] = [
    {
      key: "name",
      header: "Service",
      sortable: true,
      sortValue: (item) => item.name,
      render: (item) => <span className="font-semibold text-ink">{item.name}</span>,
    },
    {
      key: "priceStarting",
      header: "Starting price",
      sortable: true,
      sortValue: (item) => item.priceStarting,
      render: (item) => (
        <span className="tabular font-semibold text-primary-700">{formatINR(item.priceStarting)}</span>
      ),
    },
    { key: "unit", header: "Unit", sortable: true, sortValue: (item) => item.unit, render: (item) => <span className="text-ink-muted">{item.unit}</span> },
    { key: "description", header: "Description", render: (item) => <span className="block max-w-xs truncate text-ink-muted">{item.description}</span> },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (item) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="sm" aria-label={`Edit ${item.name}`} onClick={() => setIndividualModal({ open: true, editing: item })}>
            <Pencil size={16} aria-hidden />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label={`Delete ${item.name}`}
            className="text-error-text hover:bg-error-soft"
            onClick={() => setDeletingIndividual(item)}
          >
            <Trash2 size={16} aria-hidden />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-10">
      <PageHeader
        title="Pricing"
        subtitle="Manage pricing packages and individual service pricing cards."
        actions={
          <Button variant="gradient" onClick={() => setPackageModal({ open: true, editing: null })}>
            <Plus size={18} aria-hidden />
            Add package
          </Button>
        }
      />

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-h6 font-semibold text-ink">Pricing packages</h2>
            <p className="mt-0.5 text-body-sm text-ink-muted">Bundled plans shown on the pricing page.</p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setPackageModal({ open: true, editing: null })}>
            <Plus size={16} aria-hidden />
            Add package
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 lg:gap-6">
          {packages.map((item) => (
            <CardHover
              key={item.id}
              className={cn(
                "relative flex h-full flex-col p-5",
                item.featured && "border-primary-300 shadow-glow"
              )}
            >
              {item.popular ? (
                <span className="absolute -top-2.5 left-5 inline-flex items-center gap-1 rounded-full bg-gradient-primary px-3 py-1 text-caption font-semibold text-white">
                  <Star size={12} aria-hidden />
                  Popular
                </span>
              ) : null}
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-h6 font-semibold text-ink">{item.name}</h3>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" aria-label={`Edit ${item.name}`} onClick={() => setPackageModal({ open: true, editing: item })}>
                    <Pencil size={15} aria-hidden />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label={`Delete ${item.name}`}
                    className="text-error-text hover:bg-error-soft"
                    onClick={() => setDeletingPackage(item)}
                  >
                    <Trash2 size={15} aria-hidden />
                  </Button>
                </div>
              </div>
              <p className="mt-0.5 text-caption text-ink-muted">{item.tagline}</p>
              <p className="mt-4 font-display text-3xl font-bold text-ink">
                {formatINR(item.price)}
                <span className="text-caption font-normal text-ink-faint"> {periodLabel[item.period]}</span>
              </p>
              <p className="mt-3 line-clamp-2 flex-1 text-body-sm text-ink-muted">{item.description}</p>
              <div className="mt-4 border-t border-border pt-3">
                <p className="text-caption text-ink-faint">{item.features.length} features</p>
              </div>
            </CardHover>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-h6 font-semibold text-ink">Individual service pricing</h2>
            <p className="mt-0.5 text-body-sm text-ink-muted">Pay-per-service pricing cards on the pricing page.</p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setIndividualModal({ open: true, editing: null })}>
            <Plus size={16} aria-hidden />
            Add pricing
          </Button>
        </div>

        <DataTable
          data={individual}
          columns={individualColumns}
          rowKey={(item) => item.slug}
          searchKeys={(item) => `${item.name} ${item.description} ${item.unit}`}
          searchPlaceholder="Search service pricing…"
        />
      </section>

      <PackageFormModal
        open={packageModal.open}
        onClose={() => setPackageModal({ open: false, editing: null })}
        initial={packageModal.editing}
        onSubmit={(values) => void handlePackageSubmit(values)}
      />
      <IndividualFormModal
        open={individualModal.open}
        onClose={() => setIndividualModal({ open: false, editing: null })}
        initial={individualModal.editing}
        services={services}
        onSubmit={(values) => void handleIndividualSubmit(values)}
      />

      <ConfirmDialog
        open={Boolean(deletingPackage)}
        onClose={() => setDeletingPackage(null)}
        title="Delete package?"
        description={
          <>
            This will remove <span className="font-semibold text-ink">{deletingPackage?.name}</span> from the pricing page.
            This action cannot be undone.
          </>
        }
        loading={busy}
        onConfirm={() => void handleDeletePackage()}
      />
      <ConfirmDialog
        open={Boolean(deletingIndividual)}
        onClose={() => setDeletingIndividual(null)}
        title="Delete service pricing?"
        description={
          <>
            This will remove pricing for <span className="font-semibold text-ink">{deletingIndividual?.name}</span>.
            This action cannot be undone.
          </>
        }
        loading={busy}
        onConfirm={() => void handleDeleteIndividual()}
      />
    </div>
  );
}
