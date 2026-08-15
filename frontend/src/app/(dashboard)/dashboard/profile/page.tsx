"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { CheckCircle2, Loader2, Save } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { AvatarUpload } from "@/components/dashboard/avatar-upload";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const profileSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  companyName: z.string().min(1, "Please enter your company name"),
  phone: z
    .string()
    .regex(/^[+\d][\d\s-]{7,15}$/, "Enter a valid phone number, e.g. +91 98765 43210")
    .or(z.literal("")),
  email: z.string().email("Enter a valid email address"),
});
type ProfileValues = z.infer<typeof profileSchema>;

const passwordSchema = z
  .object({
    current: z.string().min(1, "Enter your current password"),
    new: z.string().min(8, "Use at least 8 characters"),
    confirm: z.string().min(1, "Confirm your new password"),
  })
  .refine((data) => data.new === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });
type PasswordValues = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
  const { data: session } = useSession();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  const sessionEmail = session?.user?.email ?? "client@pikzelkraft.com";
  const sessionName = session?.user?.name ?? "";

  const profileForm = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: sessionName,
      companyName: "",
      phone: "",
      email: sessionEmail,
    },
  });
  const {
    register: registerProfile,
    handleSubmit: submitProfile,
    formState: { errors: profileErrors, isSubmitting: profileSubmitting },
  } = profileForm;

  useEffect(() => {
    profileForm.reset({
      fullName: sessionName,
      companyName: profileForm.getValues("companyName"),
      phone: profileForm.getValues("phone"),
      email: sessionEmail,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionName, sessionEmail]);

  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    mode: "onBlur",
    defaultValues: { current: "", new: "", confirm: "" },
  });
  const {
    register: registerPassword,
    handleSubmit: submitPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: passwordSubmitting },
  } = passwordForm;

  async function onSaveProfile(values: ProfileValues) {
    await new Promise((resolve) => setTimeout(resolve, 700));
    void values;
    setProfileSaved(true);
    window.setTimeout(() => setProfileSaved(false), 3200);
  }

  async function onSavePassword(values: PasswordValues) {
    await new Promise((resolve) => setTimeout(resolve, 900));
    void values;
    resetPassword();
    setPasswordSaved(true);
    window.setTimeout(() => setPasswordSaved(false), 3200);
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Profile" subtitle="Manage your personal information, password and profile picture." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <div className="space-y-4 lg:col-span-2 lg:space-y-6">
          <Card>
            <h2 className="text-h6 font-semibold text-ink">Personal Information</h2>
            <p className="mt-1 text-body-sm text-ink-muted">
              Update your details so we can reach you about projects and invoices.
            </p>
            <form onSubmit={submitProfile(onSaveProfile)} className="mt-6 grid gap-5 sm:grid-cols-2" noValidate>
              <Input
                id="profile-fullName"
                label="Full name"
                placeholder="Aarav Kapoor"
                autoComplete="name"
                error={profileErrors.fullName?.message}
                {...registerProfile("fullName")}
              />
              <Input
                id="profile-companyName"
                label="Company name"
                placeholder="Acme Corp"
                autoComplete="organization"
                error={profileErrors.companyName?.message}
                {...registerProfile("companyName")}
              />
              <Input
                id="profile-phone"
                label="Phone"
                type="tel"
                placeholder="+91 98765 43210"
                autoComplete="tel"
                error={profileErrors.phone?.message}
                {...registerProfile("phone")}
              />
              <Input
                id="profile-email"
                label="Email"
                type="email"
                autoComplete="email"
                readOnly
                disabled
                helper="Email is managed by your account and cannot be changed here."
                error={profileErrors.email?.message}
                {...registerProfile("email")}
              />
              <div className="flex items-center gap-3 sm:col-span-2">
                <Button type="submit" variant="gradient" disabled={profileSubmitting}>
                  {profileSubmitting ? (
                    <Loader2 size={16} className="animate-spin" aria-hidden />
                  ) : (
                    <Save size={16} aria-hidden />
                  )}
                  {profileSubmitting ? "Saving…" : "Save changes"}
                </Button>
                {profileSaved ? (
                  <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-success-text">
                    <CheckCircle2 size={16} aria-hidden />
                    Saved
                  </span>
                ) : null}
              </div>
            </form>
          </Card>

          <Card>
            <h2 className="text-h6 font-semibold text-ink">Change Password</h2>
            <p className="mt-1 text-body-sm text-ink-muted">
              Use at least 8 characters with a mix of letters and numbers.
            </p>
            <form onSubmit={submitPassword(onSavePassword)} className="mt-6 grid gap-5 sm:grid-cols-2" noValidate>
              <Input
                id="password-current"
                label="Current password"
                type="password"
                autoComplete="current-password"
                error={passwordErrors.current?.message}
                {...registerPassword("current")}
              />
              <div className="hidden sm:block" />
              <Input
                id="password-new"
                label="New password"
                type="password"
                autoComplete="new-password"
                error={passwordErrors.new?.message}
                {...registerPassword("new")}
              />
              <Input
                id="password-confirm"
                label="Confirm new password"
                type="password"
                autoComplete="new-password"
                error={passwordErrors.confirm?.message}
                {...registerPassword("confirm")}
              />
              <div className="flex items-center gap-3 sm:col-span-2">
                <Button type="submit" variant="primary" disabled={passwordSubmitting}>
                  {passwordSubmitting ? (
                    <Loader2 size={16} className="animate-spin" aria-hidden />
                  ) : null}
                  {passwordSubmitting ? "Updating…" : "Update password"}
                </Button>
                {passwordSaved ? (
                  <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-success-text">
                    <CheckCircle2 size={16} aria-hidden />
                    Password updated
                  </span>
                ) : null}
              </div>
            </form>
          </Card>
        </div>

        <div>
          <Card>
            <h2 className="text-h6 font-semibold text-ink">Profile Picture</h2>
            <p className="mt-1 text-body-sm text-ink-muted">
              This picture will appear across your dashboard.
            </p>
            <AvatarUpload
              name={profileForm.watch("fullName") || "Pikzelkraft Client"}
              value={avatar}
              onChange={setAvatar}
              className="mt-6"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
