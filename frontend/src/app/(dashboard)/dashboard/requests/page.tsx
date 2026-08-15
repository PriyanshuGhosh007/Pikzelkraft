"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { CheckCircle2, FilePlus2, Loader2, Send, X } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/time";

const services = [
  "Web Development",
  "Digital Marketing",
  "UI/UX Design",
  "SEO",
  "Social Media",
  "IT Support",
  "Custom Software",
  "Other",
];

const budgetRanges = [
  { value: "under-50k", label: "Under ₹50,000" },
  { value: "50k-1l", label: "₹50,000 – ₹1,00,000" },
  { value: "1l-2l", label: "₹1,00,000 – ₹2,00,000" },
  { value: "2l-5l", label: "₹2,00,000 – ₹5,00,000" },
  { value: "above-5l", label: "Above ₹5,00,000" },
];

const contactMethods = ["Email", "Phone", "WhatsApp"];

const requestSchema = z.object({
  companyName: z.string().min(2, "Please enter your company name"),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  description: z.string().min(20, "Tell us a little more about your project (min 20 characters)"),
  preferredContact: z.string().min(1, "Please select a preferred contact method"),
});
type RequestValues = z.infer<typeof requestSchema>;

interface Attachment {
  id: string;
  name: string;
  size: string;
}

export default function RequestsPage() {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [lastSummary, setLastSummary] = useState<RequestValues | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RequestValues>({
    resolver: zodResolver(requestSchema),
    mode: "onBlur",
    defaultValues: {
      companyName: "",
      service: "",
      budget: "",
      description: "",
      preferredContact: "",
    },
  });

  function addFiles(files: FileList | null) {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const size =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.max(1, Math.round(file.size / 1024))} KB`;
      setAttachments((current) => [
        ...current,
        { id: `${file.name}-${Date.now()}`, name: file.name, size },
      ]);
    });
  }

  function removeAttachment(id: string) {
    setAttachments((current) => current.filter((attachment) => attachment.id !== id));
  }

  async function onSubmit(values: RequestValues) {
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setLastSummary(values);
    setStatus("success");
  }

  if (status === "success" && lastSummary) {
    const budgetLabel = budgetRanges.find((b) => b.value === lastSummary.budget)?.label;
    return (
      <div className="mx-auto max-w-xl">
        <Card className="flex flex-col items-center p-10 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success-text">
            <CheckCircle2 size={32} aria-hidden />
          </span>
          <h1 className="mt-6 text-h3 text-ink">Request submitted!</h1>
          <p className="mt-3 max-w-sm text-body-md text-ink-muted">
            We&apos;ve received your project request and will reach out via {lastSummary.preferredContact} within
            one business day.
          </p>
          <dl className="mt-8 w-full space-y-3 rounded-lg border border-border bg-surface-muted p-5 text-left">
            <SummaryRow label="Company" value={lastSummary.companyName} />
            <SummaryRow label="Service" value={lastSummary.service} />
            <SummaryRow label="Budget" value={budgetLabel ?? lastSummary.budget} />
            <SummaryRow label="Preferred contact" value={lastSummary.preferredContact} />
            <SummaryRow label="Attachments" value={attachments.length > 0 ? `${attachments.length} file(s)` : "None"} />
          </dl>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="gradient"
              onClick={() => {
                reset();
                setAttachments([]);
                setStatus("idle");
              }}
            >
              Submit another request
            </Button>
            <Button href="/dashboard" variant="secondary">
              Back to dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <PageHeader
        title="New Project Request"
        subtitle="Tell us what you need — our team will prepare a tailored proposal."
      />

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
          <Input
            id="request-company"
            label="Company name"
            placeholder="Acme Corp"
            autoComplete="organization"
            error={errors.companyName?.message}
            {...register("companyName")}
          />
          <Select
            id="request-service"
            label="Service"
            error={errors.service?.message}
            defaultValue=""
            {...register("service")}
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </Select>
          <Select
            id="request-budget"
            label="Budget range"
            error={errors.budget?.message}
            defaultValue=""
            {...register("budget")}
          >
            <option value="" disabled>
              Select a budget range
            </option>
            {budgetRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </Select>
          <Textarea
            id="request-description"
            label="Project description"
            placeholder="Describe your goals, timeline, and anything else we should know…"
            error={errors.description?.message}
            {...register("description")}
          />
          <Select
            id="request-contact"
            label="Preferred contact method"
            error={errors.preferredContact?.message}
            defaultValue=""
            {...register("preferredContact")}
          >
            <option value="" disabled>
              Select a contact method
            </option>
            {contactMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </Select>

          <div>
            <span className="text-label font-semibold uppercase tracking-[0.08em] text-ink-muted">
              Attachments
            </span>
            <label
              htmlFor="request-files"
              className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border bg-surface-muted/50 px-4 py-8 text-center transition-colors hover:border-primary-300 hover:bg-primary-50/40"
            >
              <FilePlus2 size={22} className="text-ink-muted" aria-hidden />
              <span className="text-button font-medium text-ink">Click to upload files</span>
              <span className="text-caption text-ink-faint">Reference documents, designs or briefs (optional)</span>
              <input
                id="request-files"
                type="file"
                multiple
                className="sr-only"
                onChange={(e) => {
                  addFiles(e.target.files);
                  e.currentTarget.value = "";
                }}
              />
            </label>
            {attachments.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {attachments.map((attachment) => (
                  <li
                    key={attachment.id}
                    className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface px-3 py-2.5"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="text-button font-medium text-ink">{attachment.name}</span>
                      <span className="text-caption text-ink-faint">{attachment.size}</span>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${attachment.name}`}
                      onClick={() => removeAttachment(attachment.id)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-error-soft hover:text-error-text"
                    >
                      <X size={16} aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="border-t border-border pt-5">
            <Button type="submit" variant="gradient" size="lg" disabled={status === "submitting"}>
              {status === "submitting" ? (
                <Loader2 size={18} className="animate-spin" aria-hidden />
              ) : (
                <Send size={18} aria-hidden />
              )}
              {status === "submitting" ? "Submitting…" : "Submit request"}
            </Button>
            <p className="mt-3 text-caption text-ink-faint">
              Typical budgets range between {formatCurrency(50000)} and {formatCurrency(500000)}.
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-label font-semibold uppercase tracking-[0.08em] text-ink-faint">{label}</dt>
      <dd className="text-right text-button font-medium text-ink">{value}</dd>
    </div>
  );
}
