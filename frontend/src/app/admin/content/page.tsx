"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { getContent, updateContent } from "@/lib/admin-api";
import type { SiteContent } from "@/data/admin";

const statSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.coerce.number().min(0, "Value can't be negative"),
  suffix: z.string(),
});

const contentSchema = z.object({
  hero: z.object({
    eyebrow: z.string().min(1, "Eyebrow is required"),
    title: z.string().min(1, "Title is required"),
    gradientTitle: z.string().min(1, "Gradient title is required"),
    description: z.string().min(10, "Description is too short"),
    primaryCta: z.string().min(1, "Primary CTA is required"),
    secondaryCta: z.string().min(1, "Secondary CTA is required"),
    trustLine: z.string().min(1, "Trust line is required"),
  }),
  stats: z.array(statSchema).length(4, "Exactly 4 stats are required"),
  about: z.object({
    title: z.string().min(1, "Title is required"),
    intro: z.string().min(1, "Intro is required"),
    story: z.array(z.string().min(1, "Paragraphs can't be empty")),
    mission: z.string().min(1, "Mission is required"),
    vision: z.string().min(1, "Vision is required"),
    values: z.array(z.string().min(1, "Values can't be empty")),
  }),
});
type ContentValues = z.infer<typeof contentSchema>;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-label font-semibold uppercase tracking-[0.08em] text-primary-700">{children}</p>
  );
}

export default function AdminContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContentValues>({
    resolver: zodResolver(contentSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    let active = true;
    void getContent().then((content) => {
      if (!active) return;
      reset(content);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [reset]);

  async function onSubmit(values: ContentValues) {
    setSaving(true);
    setSaved(false);
    const updated = await updateContent(values);
    reset(updated);
    setSaving(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit((values) => void onSubmit(values))} noValidate>
      <div className="space-y-8">
        <PageHeader
          title="Content"
          subtitle="Edit the homepage hero, statistics and about page copy."
          actions={
            <Button type="submit" variant="gradient" disabled={saving}>
              {saving ? <Loader2 size={18} className="animate-spin" aria-hidden /> : <Save size={18} aria-hidden />}
              {saving ? "Saving…" : saved ? "Saved" : "Save changes"}
            </Button>
          }
        />

        <Card>
          <SectionLabel>Homepage hero</SectionLabel>
          <div className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input id="hero-eyebrow" label="Eyebrow badge" error={errors.hero?.eyebrow?.message} {...register("hero.eyebrow")} />
              <Input id="hero-gradient-title" label="Gradient headline" error={errors.hero?.gradientTitle?.message} {...register("hero.gradientTitle")} />
              <Input id="hero-title" label="Hero title" error={errors.hero?.title?.message} {...register("hero.title")} />
              <div className="grid grid-cols-2 gap-5">
                <Input id="hero-primary-cta" label="Primary CTA" error={errors.hero?.primaryCta?.message} {...register("hero.primaryCta")} />
                <Input id="hero-secondary-cta" label="Secondary CTA" error={errors.hero?.secondaryCta?.message} {...register("hero.secondaryCta")} />
              </div>
            </div>
            <Textarea
              id="hero-description"
              label="Description"
              className="min-h-[96px]"
              error={errors.hero?.description?.message}
              {...register("hero.description")}
            />
            <Input id="hero-trust-line" label="Trust line" error={errors.hero?.trustLine?.message} {...register("hero.trustLine")} />
          </div>
        </Card>

        <Card>
          <SectionLabel>Company statistics</SectionLabel>
          <p className="-mt-2 mb-4 text-body-sm text-ink-muted">
            The big numbers shown on the homepage banner.
          </p>
          <div className="space-y-4">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="grid items-end gap-4 sm:grid-cols-[1fr_auto_auto]">
                <Input
                  id={`stat-${index}-label`}
                  label={`Stat ${index + 1} — Label`}
                  error={errors.stats?.[index]?.label?.message}
                  {...register(`stats.${index}.label` as const)}
                />
                <div className="grid grid-cols-2 gap-3 sm:w-64">
                  <Input
                    id={`stat-${index}-value`}
                    label="Value"
                    type="number"
                    min={0}
                    error={errors.stats?.[index]?.value?.message}
                    {...register(`stats.${index}.value` as const)}
                  />
                  <Input
                    id={`stat-${index}-suffix`}
                    label="Suffix"
                    placeholder="+ / %"
                    {...register(`stats.${index}.suffix` as const)}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionLabel>About page</SectionLabel>
          <div className="grid gap-5">
            <Input id="about-title" label="Heading" error={errors.about?.title?.message} {...register("about.title")} />
            <Textarea
              id="about-intro"
              label="Intro"
              className="min-h-[80px]"
              error={errors.about?.intro?.message}
              {...register("about.intro")}
            />
            <div className="grid gap-5 lg:grid-cols-2">
              {[0, 1].map((index) => (
                <Textarea
                  key={index}
                  id={`about-story-${index}`}
                  label={`Story paragraph ${index + 1}`}
                  className="min-h-[140px]"
                  error={errors.about?.story?.[index]?.message}
                  {...register(`about.story.${index}` as const)}
                />
              ))}
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              <Textarea
                id="about-mission"
                label="Mission"
                className="min-h-[80px]"
                error={errors.about?.mission?.message}
                {...register("about.mission")}
              />
              <Textarea
                id="about-vision"
                label="Vision"
                className="min-h-[80px]"
                error={errors.about?.vision?.message}
                {...register("about.vision")}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[0, 1, 2, 3].map((index) => (
                <Input
                  key={index}
                  id={`about-value-${index}`}
                  label={`Value ${index + 1}`}
                  error={errors.about?.values?.[index]?.message}
                  {...register(`about.values.${index}` as const)}
                />
              ))}
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" variant="gradient" disabled={saving}>
            {saving ? <Loader2 size={18} className="animate-spin" aria-hidden /> : <Save size={18} aria-hidden />}
            {saving ? "Saving…" : saved ? "Saved" : "Save changes"}
          </Button>
        </div>
      </div>
    </form>
  );
}
