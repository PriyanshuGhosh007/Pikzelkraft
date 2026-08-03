"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { services } from "@/data/services";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  company: z.string().optional(),
  phone: z
    .string()
    .regex(/^[+\d][\d\s-]{7,15}$/, "Enter a valid phone number, e.g. +91 98765 43210")
    .optional()
    .or(z.literal("")),
  email: z.string().email("Enter a valid email address, e.g. name@company.com"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Tell us a little more about your project (min 10 characters)"),
  website: z.string().optional(),
});

type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      email: "",
      service: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(values: ContactValues) {
    if (values.website) return;
    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          company: values.company ?? "",
          phone: values.phone ?? "",
          email: values.email,
          service: values.service,
          message: values.message,
          source: "website",
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setServerError(
          body?.error?.message ??
            "Something went wrong on our end. Please email us directly at hello@pikzelkraft.com."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setServerError(
        "We couldn't reach our server right now. Please email us directly at hello@pikzelkraft.com."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-xl border border-border bg-surface p-10 text-center shadow-soft">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success-text">
          <CheckCircle2 size={32} aria-hidden />
        </span>
        <h3 className="mt-6 text-h3 text-ink">Message received!</h3>
        <p className="mt-3 max-w-sm text-body-md text-ink-muted">
          Thanks for reaching out. Our team will get back to you within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-button font-semibold text-primary-700 underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border border-border bg-surface p-6 shadow-soft sm:p-8"
      noValidate
    >
      <h2 className="text-h4 font-semibold text-ink">Tell us about your project</h2>
      <p className="mt-1.5 text-body-sm text-ink-muted">
        Fill in the form and we&apos;ll reply with a tailored quote within 48 hours.
      </p>

      {status === "error" ? (
        <div
          role="alert"
          className="mt-5 flex items-start gap-2.5 rounded-lg border border-error-border bg-error-soft px-4 py-3 text-body-sm text-error-text"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden />
          {serverError}
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Input
          id="contact-name"
          label="Full name"
          placeholder="Aarav Kapoor"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          id="contact-company"
          label="Company"
          placeholder="Acme Corp (optional)"
          autoComplete="organization"
          error={errors.company?.message}
          {...register("company")}
        />
        <Input
          id="contact-phone"
          label="Phone"
          type="tel"
          placeholder="+91 98765 43210"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          id="contact-email"
          label="Work email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <div className="sm:col-span-2">
          <Select
            id="contact-service"
            label="Service you're interested in"
            error={errors.service?.message}
            defaultValue=""
            {...register("service")}
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
            <option value="other">Something else</option>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Textarea
            id="contact-message"
            label="Project details"
            placeholder="Tell us about your goals, timeline and budget…"
            error={errors.message?.message}
            {...register("message")}
          />
        </div>
      </div>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        {...register("website")}
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-md bg-gradient-primary text-button font-medium text-white shadow-soft transition-all duration-200 ease-out hover:brightness-110 hover:shadow-glow active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 sm:w-auto sm:px-8"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send size={18} aria-hidden />
          </>
        )}
      </button>

      <p className="mt-4 text-body-sm text-ink-faint">
        Prefer email? Write to{" "}
        <a href="mailto:hello@pikzelkraft.com" className="font-medium text-primary-700 hover:underline">
          hello@pikzelkraft.com
        </a>
        .
      </p>
    </form>
  );
}
