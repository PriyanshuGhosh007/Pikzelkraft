import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Logo } from "@/components/marketing/logo";
import { AuthPageHeader } from "@/components/auth/auth-page-header";
import { AuthSessionProvider } from "@/components/auth/session-provider";

export const metadata: Metadata = {
  title: "Account",
  description: "Sign in to your Pikzelkraft account.",
};

const HIGHLIGHTS = [
  {
    title: "Project tracking",
    body: "Follow every milestone of your campaign or build in one place.",
  },
  {
    title: "Payments & invoices",
    body: "Review quotes, payments and invoices without leaving the dashboard.",
  },
  {
    title: "Priority support",
    body: "Raise tickets and talk to our team directly from your workspace.",
  },
];

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthSessionProvider>
      <div className="relative flex min-h-screen flex-col overflow-hidden bg-background-alt">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="pointer-events-none absolute -top-48 right-[-10rem] h-[30rem] w-[30rem] rounded-full bg-primary-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-info/10 blur-3xl" />

        <div className="container-shell relative z-10 flex flex-1 flex-col justify-center py-8 lg:py-12">
          <div className="mb-8 self-start lg:hidden">
            <AuthPageHeader />
          </div>

          <div className="grid w-full flex-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <aside className="hidden lg:block">
              <Logo />
              <h1 className="mt-12 max-w-md text-h1 font-semibold tracking-tight text-ink">
                Run your brand on <span className="text-gradient">pixel-perfect</span> rails.
              </h1>
              <p className="mt-5 max-w-md text-body-lg text-ink-muted">
                Sign in to Pikzelkraft to manage your projects, track progress, and unlock tools
                that keep your digital growth moving.
              </p>
              <div className="mt-12 grid max-w-lg gap-4">
                {HIGHLIGHTS.map((highlight) => (
                  <div key={highlight.title} className="glass rounded-md p-5">
                    <h3 className="text-label font-semibold uppercase tracking-[0.08em] text-primary-700">
                      {highlight.title}
                    </h3>
                    <p className="mt-1.5 text-body-sm text-ink-muted">{highlight.body}</p>
                  </div>
                ))}
              </div>
            </aside>

            <div className="mx-auto w-full max-w-md">{children}</div>
          </div>
        </div>
      </div>
    </AuthSessionProvider>
  );
}
