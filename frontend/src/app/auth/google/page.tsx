"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SessionProvider, getProviders, signIn, useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

function GoogleRedirect() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated") {
      router.push("/dashboard");
      return;
    }

    async function startGoogleSignIn() {
      const providers = await getProviders().catch(() => null);
      if (providers && providers.google) {
        await signIn("google", { callbackUrl: "/dashboard" });
      } else {
        router.push("/login?error=google_not_configured");
      }
    }

    if (status === "unauthenticated") {
      void startGoogleSignIn();
    }
  }, [status, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-background px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
        <Loader2 size={28} className="animate-spin text-primary-600" aria-hidden />
      </div>
      <p className="text-body-md text-ink-muted">Redirecting to Google...</p>
    </div>
  );
}

export default function GoogleAuthPage() {
  return (
    <SessionProvider>
      <GoogleRedirect />
    </SessionProvider>
  );
}
