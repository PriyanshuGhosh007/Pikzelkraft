"use client";

import { useRef, useState } from "react";
import { Camera, Loader2, Trash2, UploadCloud } from "lucide-react";
import { Avatar } from "@/components/dashboard/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "";
const cloudinaryConfigured = Boolean(CLOUD_NAME && UPLOAD_PRESET);

export function AvatarUpload({
  name,
  value,
  onChange,
  className,
}: {
  name?: string | null;
  value: string | null;
  onChange: (url: string | null) => void;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");

  async function handleFile(file: File | undefined) {
    if (!file) return;

    if (!cloudinaryConfigured) {
      onChange(URL.createObjectURL(file));
      return;
    }

    setStatus("uploading");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const body = (await res.json()) as { secure_url: string };
      onChange(body.secure_url);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative">
        <Avatar name={name} imageUrl={value} size="lg" className="h-24 w-24 rounded-full" />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-label="Upload profile picture"
          className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-surface bg-primary-600 text-white shadow-soft transition-colors hover:bg-primary-700"
        >
          <Camera size={16} aria-hidden />
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        aria-hidden
        onChange={(e) => {
          void handleFile(e.target.files?.[0]);
          e.currentTarget.value = "";
        }}
      />

      <div className="flex flex-col items-center gap-1.5">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={status === "uploading"}
        >
          {status === "uploading" ? (
            <Loader2 size={16} className="animate-spin" aria-hidden />
          ) : (
            <UploadCloud size={16} aria-hidden />
          )}
          {status === "uploading" ? "Uploading…" : value ? "Change photo" : "Upload photo"}
        </Button>
        {value ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-error-text hover:bg-error-soft"
            onClick={() => onChange(null)}
          >
            <Trash2 size={15} aria-hidden />
            Remove photo
          </Button>
        ) : null}
      </div>

      {cloudinaryConfigured ? null : (
        <p className="text-caption text-ink-faint">Cloudinary not configured — preview only.</p>
      )}
      {status === "error" ? (
        <p className="text-caption text-error-text">Upload failed. Please try again.</p>
      ) : null}
    </div>
  );
}
