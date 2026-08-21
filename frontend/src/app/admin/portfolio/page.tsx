"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ImagePlus, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardHover } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { createPortfolioItem, deletePortfolioItem, getPortfolio, updatePortfolioItem } from "@/lib/admin-api";
import { uploadToCloudinary } from "@/lib/cloudinary-upload";
import { portfolioCategories } from "@/data/portfolio";
import type { PortfolioItem } from "@/data/admin";

const portfolioSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(1, "Select a category"),
  clientName: z.string().min(2, "Client name is required"),
  year: z.coerce.number().int().min(2000, "Year must be 2000 or later").max(2100, "Enter a valid year"),
  coverImage: z.string().min(1, "Upload a cover image"),
  description: z.string().min(10, "Write a short description (min 10 characters)"),
  challenge: z.string().min(10, "Describe the challenge (min 10 characters)"),
  solution: z.string().min(10, "Describe the solution (min 10 characters)"),
  results: z.string().min(1, "Add at least one result per line"),
  tags: z.string().min(1, "Add at least one tag per line"),
  projectUrl: z.string().url("Enter a valid URL").or(z.literal("")).optional(),
});
type PortfolioValues = z.infer<typeof portfolioSchema>;

const emptyPortfolio: PortfolioValues = {
  title: "",
  category: "Web Development",
  clientName: "",
  year: new Date().getFullYear(),
  coverImage: "",
  description: "",
  challenge: "",
  solution: "",
  results: "",
  tags: "",
  projectUrl: "",
};

function CoverImageField({
  value,
  uploading,
  onUpload,
  onClear,
  error,
}: {
  value: string;
  uploading: boolean;
  onUpload: (file: File) => void;
  onClear: () => void;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-label font-semibold uppercase tracking-[0.08em] text-ink-muted">
        Cover image
      </label>
      {value ? (
        <div className="relative overflow-hidden rounded-md border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Portfolio cover preview" className="h-44 w-full object-cover" />
          <button
            type="button"
            onClick={onClear}
            aria-label="Remove cover image"
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-md bg-black/60 text-white transition-colors hover:bg-black/80"
          >
            <X size={16} aria-hidden />
          </button>
        </div>
      ) : (
        <label className="flex h-44 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-border bg-surface-muted/50 text-ink-muted transition-colors hover:border-primary-400 hover:text-primary-700">
          {uploading ? <Loader2 size={22} className="animate-spin" aria-hidden /> : <ImagePlus size={22} aria-hidden />}
          <span className="text-button font-medium">
            {uploading ? "Uploading to Cloudinary…" : "Click to upload image"}
          </span>
          <span className="text-caption">PNG or JPG, recommended 1200 × 800</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onUpload(file);
              event.target.value = "";
            }}
          />
        </label>
      )}
      {error ? <p className="text-body-sm text-error-text">{error}</p> : null}
    </div>
  );
}

function PortfolioFormModal({
  open,
  onClose,
  initial,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  initial: PortfolioItem | null;
  onSubmit: (values: PortfolioValues) => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<PortfolioValues>({
    resolver: zodResolver(portfolioSchema),
    mode: "onBlur",
    defaultValues: emptyPortfolio,
  });
  const [uploading, setUploading] = useState(false);
  const coverImage = watch("coverImage");

  useEffect(() => {
    if (!open) return;
    setUploading(false);
    reset(
      initial
        ? {
            title: initial.title,
            category: initial.category,
            clientName: initial.clientName,
            year: initial.year,
            coverImage: initial.coverImage,
            description: initial.description,
            challenge: initial.challenge,
            solution: initial.solution,
            results: initial.results.join("\n"),
            tags: initial.tags.join(", "),
            projectUrl: initial.projectUrl ?? "",
          }
        : emptyPortfolio
    );
  }, [open, initial, reset]);

  async function handleUpload(file: File) {
    setUploading(true);
    try {
      const result = await uploadToCloudinary(file);
      setValue("coverImage", result.previewUrl, { shouldValidate: true });
    } finally {
      setUploading(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? "Edit portfolio item" : "Add portfolio item"}
      description="Portfolio items appear on the marketing portfolio page."
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            id="portfolio-title"
            label="Title"
            placeholder="Finlytics"
            error={errors.title?.message}
            {...register("title")}
          />
          <Input
            id="portfolio-client"
            label="Client name"
            placeholder="Finlytics Technologies"
            error={errors.clientName?.message}
            {...register("clientName")}
          />
          <Select id="portfolio-category" label="Category" error={errors.category?.message} {...register("category")}>
            {portfolioCategories
              .filter((category) => category !== "All")
              .map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </Select>
          <Input
            id="portfolio-year"
            label="Year"
            type="number"
            error={errors.year?.message}
            {...register("year")}
          />
        </div>

        <Controller
          name="coverImage"
          control={control}
          render={({ field }) => (
            <CoverImageField
              value={field.value}
              uploading={uploading}
              error={errors.coverImage?.message}
              onUpload={(file) => void handleUpload(file)}
              onClear={() => field.onChange("")}
            />
          )}
        />

        <Textarea
          id="portfolio-description"
          label="Description"
          placeholder="One or two sentences summarising the project."
          error={errors.description?.message}
          {...register("description")}
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <Textarea
            id="portfolio-challenge"
            label="Challenge"
            placeholder="What problem did the client face?"
            error={errors.challenge?.message}
            {...register("challenge")}
          />
          <Textarea
            id="portfolio-solution"
            label="Solution"
            placeholder="How did Pikzelkraft solve it?"
            error={errors.solution?.message}
            {...register("solution")}
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Textarea
            id="portfolio-results"
            label="Results (one per line)"
            placeholder={"Checkout conversion +38%\nCart abandonment -52%"}
            error={errors.results?.message}
            {...register("results")}
          />
          <Textarea
            id="portfolio-tags"
            label="Tags (comma separated)"
            placeholder="Next.js, Booking Engine, Performance"
            error={errors.tags?.message}
            {...register("tags")}
          />
        </div>

        <Input
          id="portfolio-url"
          label="Project URL (optional)"
          placeholder="https://example.com/finlytics"
          error={errors.projectUrl?.message}
          {...register("projectUrl")}
        />

        <div className="flex justify-end gap-3 border-t border-border pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="gradient">
            {initial ? "Save changes" : "Add item"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [deleting, setDeleting] = useState<PortfolioItem | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    void getPortfolio().then((data) => {
      if (active) setItems(data);
    });
    return () => {
      active = false;
    };
  }, []);

  async function handleCreate(values: PortfolioValues) {
    setBusy(true);
    const item: PortfolioItem = {
      slug: values.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      title: values.title,
      category: values.category,
      clientName: values.clientName,
      year: values.year,
      coverImage: values.coverImage,
      description: values.description,
      challenge: values.challenge,
      solution: values.solution,
      results: values.results.split("\n").map((line) => line.trim()).filter(Boolean),
      tags: values.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      projectUrl: values.projectUrl || undefined,
    };
    const created = await createPortfolioItem(item);
    setItems((current) => [created, ...current]);
    setBusy(false);
    setCreating(false);
  }

  async function handleUpdate(values: PortfolioValues) {
    if (!editing) return;
    setBusy(true);
    const updated = await updatePortfolioItem(editing.slug, {
      title: values.title,
      category: values.category,
      clientName: values.clientName,
      year: values.year,
      coverImage: values.coverImage,
      description: values.description,
      challenge: values.challenge,
      solution: values.solution,
      results: values.results.split("\n").map((line) => line.trim()).filter(Boolean),
      tags: values.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      projectUrl: values.projectUrl || undefined,
    });
    setItems((current) => current.map((item) => (item.slug === updated.slug ? updated : item)));
    setBusy(false);
    setEditing(null);
  }

  async function handleDelete() {
    if (!deleting) return;
    setBusy(true);
    await deletePortfolioItem(deleting.slug);
    setItems((current) => current.filter((item) => item.slug !== deleting.slug));
    setBusy(false);
    setDeleting(null);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Portfolio"
        subtitle="Showcase completed work with cover images, case study content and results."
        actions={
          <Button variant="gradient" onClick={() => setCreating(true)}>
            <Plus size={18} aria-hidden />
            Add item
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {items.length === 0
          ? Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-64" />)
          : items.map((item) => (
              <CardHover key={item.slug} className="group flex h-full flex-col overflow-hidden p-0">
                <div className="relative aspect-[3/2] overflow-hidden bg-surface-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.coverImage}
                    alt={`${item.title} — ${item.category}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge className="absolute left-3 top-3 bg-black/55 text-white backdrop-blur-sm">
                    {item.category}
                  </Badge>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-h6 font-semibold text-ink">{item.title}</h3>
                      <p className="mt-0.5 text-caption text-ink-muted">
                        {item.clientName} · {item.year}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={`Edit ${item.title}`}
                        onClick={() => setEditing(item)}
                      >
                        <Pencil size={16} aria-hidden />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={`Delete ${item.title}`}
                        className="text-error-text hover:bg-error-soft"
                        onClick={() => setDeleting(item)}
                      >
                        <Trash2 size={16} aria-hidden />
                      </Button>
                    </div>
                  </div>
                  <p className="mt-2 line-clamp-2 flex-1 text-body-sm text-ink-muted">{item.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-md bg-surface-muted px-2 py-0.5 text-caption font-medium text-ink-muted">
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 ? (
                      <span className="text-caption text-ink-faint">+{item.tags.length - 3}</span>
                    ) : null}
                  </div>
                </div>
              </CardHover>
            ))}
      </div>

      <PortfolioFormModal
        open={creating}
        onClose={() => setCreating(false)}
        initial={null}
        onSubmit={(values) => void handleCreate(values)}
      />
      <PortfolioFormModal
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        initial={editing}
        onSubmit={(values) => void handleUpdate(values)}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        title="Delete portfolio item?"
        description={
          <>
            This will remove <span className="font-semibold text-ink">{deleting?.title}</span> from the portfolio page.
            This action cannot be undone.
          </>
        }
        loading={busy}
        onConfirm={() => void handleDelete()}
      />
    </div>
  );
}
