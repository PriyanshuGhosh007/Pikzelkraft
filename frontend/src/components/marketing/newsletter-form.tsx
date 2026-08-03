"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    setTimeout(() => setStatus("success"), 900);
  }

  if (status === "success") {
    return (
      <p className="flex items-center gap-2 text-body-sm text-success-text">
        <CheckCircle2 size={16} aria-hidden />
        You're subscribed. Welcome aboard!
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm gap-2" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setStatus("idle");
        }}
        placeholder="you@company.com"
        className="h-11 w-full rounded-md border border-border bg-surface px-4 text-body-md text-ink placeholder:text-ink-faint focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring-focus))]"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        aria-label="Subscribe to newsletter"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary-600 text-white transition-colors hover:bg-primary-700 disabled:pointer-events-none disabled:opacity-50"
      >
        {status === "loading" ? (
          <Loader2 size={18} className="animate-spin" aria-hidden />
        ) : (
          <Send size={18} aria-hidden />
        )}
      </button>
    </form>
  );
}
