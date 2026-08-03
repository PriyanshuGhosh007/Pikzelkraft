import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/marketing/logo";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="relative flex flex-col items-center">
        <Logo className="mb-10" />
        <p className="text-gradient font-display text-[7rem] font-bold leading-none sm:text-[9rem]">
          404
        </p>
        <h1 className="mt-4 text-h3 text-ink">This page wandered off the grid</h1>
        <p className="mt-3 max-w-md text-body-lg text-ink-muted">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back
          on track.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2.5 rounded-md bg-gradient-primary px-8 text-button font-medium text-white shadow-soft transition-all duration-200 ease-out hover:brightness-110 hover:shadow-glow active:scale-[0.98]"
        >
          <ArrowLeft size={18} aria-hidden />
          Back to home
        </a>
      </div>
    </div>
  );
}
