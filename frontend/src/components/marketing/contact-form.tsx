"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mail, MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { services } from "@/data/services";
import { pricingPackages } from "@/data/pricing";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "";

function buildWhatsAppHref(values: {
  name: string;
  phone: string;
  service: string;
  message: string;
}): string {
  const serviceLabel = values.service ? ` (${values.service})` : "";
  const text = [
    `Hi Pikzelkraft! I'm ${values.name || "interested in your services"}.`,
    values.phone ? `Phone: ${values.phone}` : "",
    values.service ? `I'm enquiring about: ${values.service}.` : "",
    values.message ? `Details: ${values.message}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}

const optionGroups = [
  ...services.map((s) => ({ value: s.slug, label: s.name })),
  ...pricingPackages.map((p) => ({ value: p.id, label: `${p.name} (Combined Package)` })),
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [whatsappHref, setWhatsappHref] = useState("");

  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    service: "",
    message: "",
    website: "",
  });

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const preselect =
      query.get("service") ??
      query.get("plan") ??
      (query.get("subject") ?? "");
    if (preselect && optionGroups.some((o) => o.value === preselect)) {
      setForm((prev) => ({ ...prev, service: preselect }));
    }
  }, []);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.website) return;
    setStatus("submitting");
    setServerError("");

    const payload = {
      name: form.name,
      company: form.company,
      phone: form.phone,
      email: form.email,
      service: form.service,
      message: form.message,
      source: "website",
    };

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          setServerError(
            "We couldn't send your message right now. Please use WhatsApp or email below instead."
          );
          setStatus("error");
          return;
        }
        setStatus("success");
      } else {
        setWhatsappHref(buildWhatsAppHref(form));
        setStatus("success");
      }
    } catch {
      setServerError(
        "We couldn't send your message right now. Please use WhatsApp or email below instead."
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
          {endpoint
            ? "Thanks for reaching out. Our team will get back to you within one business day."
            : "Almost done — send your enquiry through your preferred channel below and we'll reply within one business day."}
        </p>

        {!endpoint ? (
          <div className="mt-7 flex w-full max-w-sm flex-col gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-md bg-[#25D366] text-button font-medium text-white shadow-soft transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            >
              <MessageCircle size={18} aria-hidden />
              Send via WhatsApp
            </a>
            <a
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
                `Website enquiry${form.service ? ` — ${form.service}` : ""}`
              )}&body=${encodeURIComponent(
                `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\n${form.message}`
              )}`}
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-md border-2 border-primary-600 text-button font-medium text-primary-700 transition-colors hover:bg-primary-50"
            >
              <Mail size={18} aria-hidden />
              Email {siteConfig.email}
            </a>
          </div>
        ) : null}

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
      onSubmit={onSubmit}
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
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
        <Input
          id="contact-company"
          label="Company"
          placeholder="Acme Corp (optional)"
          autoComplete="organization"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
        />
        <Input
          id="contact-phone"
          label="Phone"
          type="tel"
          placeholder="+91 98765 43210"
          autoComplete="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
        <Input
          id="contact-email"
          label="Work email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
        <div className="sm:col-span-2">
          <Select
            id="contact-service"
            label="Service or package you're interested in"
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
          >
            <option value="">Select a service</option>
            {optionGroups.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
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
            required
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
          />
        </div>
      </div>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        value={form.website}
        onChange={(e) => update("website", e.target.value)}
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
        Prefer to talk now?{" "}
        <a
          href={`https://wa.me/${siteConfig.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-primary-700 hover:underline"
        >
          Chat on WhatsApp
        </a>{" "}
        or write to{" "}
        <a href={`mailto:${siteConfig.email}`} className="font-medium text-primary-700 hover:underline">
          {siteConfig.email}
        </a>
        .
      </p>
    </form>
  );
}
