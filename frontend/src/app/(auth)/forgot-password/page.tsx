"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2, MailCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { OtpInput } from "@/components/auth/otp-input";
import { PasswordInput } from "@/components/auth/password-input";
import {
  requestPasswordReset,
  resetPassword,
  verifyOtp,
} from "@/lib/auth-client";

const OTP_TTL_SECONDS = 10 * 60;

const emailSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type EmailValues = z.infer<typeof emailSchema>;

const resetSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetValues = z.infer<typeof resetSchema>;

type WizardStep = "email" | "otp" | "reset" | "success";

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<WizardStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(OTP_TTL_SECONDS);
  const [serverError, setServerError] = useState("");

  const emailForm = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  const resetForm = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    mode: "onBlur",
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (step !== "otp") return;
    setSecondsLeft(OTP_TTL_SECONDS);
    const timer = window.setInterval(() => {
      setSecondsLeft((value) => (value > 0 ? value - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [step]);

  async function handleSendEmail(values: EmailValues) {
    setServerError("");
    try {
      await requestPasswordReset(values.email);
      setEmail(values.email);
      setOtp("");
      setSecondsLeft(OTP_TTL_SECONDS);
      setStep("otp");
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Failed to send the code. Please try again."
      );
    }
  }

  async function handleResendCode() {
    setServerError("");
    setOtp("");
    try {
      await requestPasswordReset(email);
      setSecondsLeft(OTP_TTL_SECONDS);
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Failed to resend the code. Please try again."
      );
    }
  }

  async function handleVerifyOtp(code: string) {
    setServerError("");
    try {
      const result = await verifyOtp(email, code);
      setResetToken(result.resetToken);
      setStep("reset");
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Invalid code. Please try again."
      );
      setOtp("");
    }
  }

  async function handleResetPassword(values: ResetValues) {
    setServerError("");
    try {
      await resetPassword(resetToken, values.newPassword);
      setStep("success");
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Failed to reset your password. Please try again."
      );
    }
  }

  const errorBanner =
    serverError && step !== "otp" ? (
      <div
        role="alert"
        className="mb-6 flex items-start gap-2.5 rounded-lg border border-error-border bg-error-soft px-4 py-3 text-body-sm text-error-text"
      >
        <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden />
        {serverError}
      </div>
    ) : null;

  return (
    <Card className="w-full p-7 sm:p-8">
      {step === "success" ? (
        <div className="flex flex-col items-center py-6 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success-text">
            <CheckCircle2 size={32} aria-hidden />
          </span>
          <h2 className="mt-6 text-h3 font-semibold text-ink">Password updated</h2>
          <p className="mt-2 max-w-sm text-body-md text-ink-muted">
            Your password has been reset successfully. You can now sign in with your new password.
          </p>
          <Button href="/login" variant="gradient" size="lg" className="mt-8 w-full">
            Back to Login
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-h3 font-semibold text-ink">Reset your password</h2>
            <p className="mt-1.5 text-body-sm text-ink-muted">
              {step === "email"
                ? "Enter the email linked to your account and we'll send you a 6-digit code."
                : step === "otp"
                  ? `We sent a 6-digit code to ${email}. Enter it below within 10 minutes.`
                  : "Choose a strong new password for your account."}
            </p>
          </div>

          {errorBanner}

          {step === "email" ? (
            <form
              onSubmit={emailForm.handleSubmit(handleSendEmail)}
              noValidate
              className="flex flex-col gap-5"
            >
              <Input
                id="forgot-email"
                label="Email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                error={emailForm.formState.errors.email?.message}
                {...emailForm.register("email")}
              />
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                disabled={emailForm.formState.isSubmitting}
                className="w-full"
              >
                {emailForm.formState.isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" aria-hidden />
                    Sending code...
                  </>
                ) : (
                  "Send reset code"
                )}
              </Button>
            </form>
          ) : null}

          {step === "otp" ? (
            <div className="flex flex-col gap-5">
              <OtpInput
                value={otp}
                onChange={(value) => {
                  setOtp(value);
                  if (serverError) setServerError("");
                }}
                onComplete={(code) => {
                  void handleVerifyOtp(code);
                }}
                disabled={secondsLeft <= 0}
                error={Boolean(serverError)}
                errorMessage={serverError || undefined}
                autoFocus
              />

              <div className="flex items-center justify-between">
                <span
                  className={`tabular text-body-sm ${
                    secondsLeft <= 0 ? "font-medium text-error-text" : "text-ink-muted"
                  }`}
                >
                  {secondsLeft <= 0 ? "Code expired" : `Code expires in ${formatTime(secondsLeft)}`}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    void handleResendCode();
                  }}
                  disabled={secondsLeft > 0}
                  className="inline-flex items-center gap-1.5 text-body-sm font-medium text-primary-700 underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:text-ink-faint"
                >
                  <RefreshCw size={14} aria-hidden />
                  Resend code
                </button>
              </div>
            </div>
          ) : null}

          {step === "reset" ? (
            <form
              onSubmit={resetForm.handleSubmit(handleResetPassword)}
              noValidate
              className="flex flex-col gap-5"
            >
              <PasswordInput
                id="reset-password"
                label="New password"
                placeholder="At least 8 characters"
                autoComplete="new-password"
                error={resetForm.formState.errors.newPassword?.message}
                {...resetForm.register("newPassword")}
              />
              <PasswordInput
                id="reset-confirm-password"
                label="Confirm new password"
                placeholder="Repeat your new password"
                autoComplete="new-password"
                error={resetForm.formState.errors.confirmPassword?.message}
                {...resetForm.register("confirmPassword")}
              />
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                disabled={resetForm.formState.isSubmitting}
                className="w-full"
              >
                {resetForm.formState.isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" aria-hidden />
                    Updating password...
                  </>
                ) : (
                  "Update password"
                )}
              </Button>
            </form>
          ) : null}

          <Link
            href="/login"
            className="mt-6 inline-flex items-center justify-center gap-1.5 text-body-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} aria-hidden />
            Back to login
          </Link>
        </>
      )}

      {step === "email" ? (
        <div className="mt-6 flex items-start gap-2.5 rounded-lg border border-border bg-surface-muted px-4 py-3 text-body-sm text-ink-muted">
          <MailCheck size={18} className="mt-0.5 shrink-0 text-primary-600" aria-hidden />
          The code is valid for 10 minutes. Check your spam folder if it doesn&apos;t arrive.
        </div>
      ) : null}
    </Card>
  );
}
