import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/marketing/logo";

export function AuthPageHeader() {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <Logo />
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-body-sm font-medium text-ink-muted transition-colors hover:text-ink"
      >
        <ArrowLeft size={16} aria-hidden />
        Back to home
      </Link>
    </div>
  );
}
