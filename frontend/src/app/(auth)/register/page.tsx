"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PasswordInput } from "@/components/auth/password-input";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import {
  AuthApiError,
  registerUser,
  setAuthTokens,
} from "@/lib/auth-client";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Enter your full name"),
    companyName: z.string().optional(),
    phone: z.string().min(7, "Enter a valid phone number"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    acceptedTerms: z
      .boolean()
      .refine((value) => value === true, {
        message: "You must accept the Terms & Conditions to continue",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      companyName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: false,
    },
  });

  async function onSubmit(values: RegisterValues) {
    setServerError("");

    try {
      const result = await registerUser({
        fullName: values.fullName,
        companyName: values.companyName ?? "",
        phone: values.phone,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      setAuthTokens({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });

      await signIn("credentials", {
        identifier: values.email,
        password: values.password,
        redirect: false,
      }).catch(() => undefined);

      router.push("/dashboard");
      router.refresh();
      reset();
    } catch (error) {
      if (error instanceof AuthApiError && error.code === "EMAIL_ALREADY_REGISTERED") {
        setServerError("This email is already registered. Try signing in instead.");
        return;
      }
      if (error instanceof AuthApiError && error.code === "PHONE_ALREADY_REGISTERED") {
        setServerError("This phone number is already registered. Try signing in instead.");
        return;
      }
      setServerError(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <Card className="w-full p-7 sm:p-8">
      <div className="mb-6">
        <h2 className="text-h3 font-semibold text-ink">Create your account</h2>
        <p className="mt-1.5 text-body-sm text-ink-muted">
          Join Pikzelkraft and start managing your projects in minutes.
        </p>
      </div>

      {serverError ? (
        <div
          role="alert"
          className="mb-6 flex items-start gap-2.5 rounded-lg border border-error-border bg-error-soft px-4 py-3 text-body-sm text-error-text"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden />
          {serverError}
        </div>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <Input
          id="register-full-name"
          label="Full name"
          placeholder="Aarav Kapoor"
          autoComplete="name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <Input
          id="register-company"
          label="Company"
          placeholder="Acme Corp (optional)"
          autoComplete="organization"
          error={errors.companyName?.message}
          {...register("companyName")}
        />
        <Input
          id="register-phone"
          label="Phone"
          type="tel"
          placeholder="+91 98765 43210"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          id="register-email"
          label="Email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <PasswordInput
          id="register-password"
          label="Password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <PasswordInput
          id="register-confirm-password"
          label="Confirm password"
          placeholder="Repeat your password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <div className="flex flex-col gap-1.5">
          <label className="flex cursor-pointer items-start gap-3">
            <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
              <input
                type="checkbox"
                className="peer sr-only"
                aria-describedby="register-terms-error"
                {...register("acceptedTerms")}
              />
              <span className="flex h-5 w-5 items-center justify-center rounded-sm border border-border bg-surface transition-colors peer-checked:border-primary-600 peer-checked:bg-primary-600 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-600" />
              <Check size={14} aria-hidden className="pointer-events-none absolute text-white opacity-0 transition-opacity peer-checked:opacity-100" />
            </span>
            <span className="text-body-sm text-ink-muted">
              I agree to Pikzelkraft&apos;s{" "}
              <Link href="/terms" className="font-medium text-primary-700 underline-offset-4 hover:underline">
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="font-medium text-primary-700 underline-offset-4 hover:underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.acceptedTerms?.message ? (
            <p id="register-terms-error" className="flex items-center gap-1.5 text-body-sm text-error-text">
              {errors.acceptedTerms.message}
            </p>
          ) : null}
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
              Creating account...
            </>
          ) : (
            "Create account"
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
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary-700 underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
