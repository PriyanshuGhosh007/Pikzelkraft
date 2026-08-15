"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PasswordInput } from "@/components/auth/password-input";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";

const loginSchema = z.object({
  identifier: z.string().min(1, "Enter your email or phone number"),
  password: z.string().min(1, "Enter your password"),
});

type LoginValues = z.infer<typeof loginSchema>;

const ERROR_MESSAGES: Record<string, string> = {
  CredentialsSignin: "Invalid email/phone or password.",
  OAuthAccountNotLinked: "This account is already linked to another sign-in method.",
  AccessDenied: "You do not have access to sign in.",
  google_not_configured: "Google sign-in is not configured yet. Please use email and password.",
};

function mapError(error?: string): string | null {
  if (!error) return null;
  return ERROR_MESSAGES[error] ?? error;
}

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  const router = useRouter();
  const { status } = useSession();
  const [formError, setFormError] = useState<string | null>(() => mapError(searchParams.error));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: { identifier: "", password: "" },
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  async function onSubmit(values: LoginValues) {
    setFormError(null);

    const result = await signIn("credentials", {
      identifier: values.identifier,
      password: values.password,
      redirect: false,
    });

    if (result?.error) {
      setFormError(mapError(result.error) ?? "Unable to sign in. Please try again.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
    reset();
  }

  return (
    <Card className="w-full p-7 sm:p-8">
      <div className="mb-6">
        <h2 className="text-h3 font-semibold text-ink">Welcome back</h2>
        <p className="mt-1.5 text-body-sm text-ink-muted">
          Sign in to your Pikzelkraft account to continue.
        </p>
      </div>

      {formError ? (
        <div
          role="alert"
          className="mb-6 flex items-start gap-2.5 rounded-lg border border-error-border bg-error-soft px-4 py-3 text-body-sm text-error-text"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden />
          {formError}
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <Input
          id="login-identifier"
          label="Email or phone"
          type="text"
          placeholder="you@company.com or +91 98765 43210"
          autoComplete="username"
          error={errors.identifier?.message}
          {...register("identifier")}
        />
        <PasswordInput
          id="login-password"
          label="Password"
          placeholder="••••••••"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex items-center justify-end">
          <Link
            href="/forgot-password"
            className="text-body-sm font-medium text-primary-700 underline-offset-4 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="gradient"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-caption font-medium uppercase tracking-[0.08em] text-ink-faint">
          or continue with
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <GoogleSignInButton />

      <p className="mt-6 text-center text-body-sm text-ink-muted">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-primary-700 underline-offset-4 hover:underline">
          Register
        </Link>
      </p>
    </Card>
  );
}
