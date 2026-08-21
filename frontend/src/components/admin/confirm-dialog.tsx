"use client";

import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export function ConfirmDialog({
  open,
  onClose,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  loading = false,
  onConfirm,
  tone = "danger",
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  tone?: "danger" | "primary";
  children?: ReactNode;
}) {
  return (
    <Modal open={open} onClose={loading ? () => undefined : onClose} title={title} size="sm">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-error-soft text-error-text">
          <AlertTriangle size={22} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          {description ? (
            <div className="text-body-sm text-ink-muted">{description}</div>
          ) : null}
          {children ? <div className="mt-4">{children}</div> : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
        <Button type="button" variant="secondary" onClick={onClose} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button
          type="button"
          variant={tone === "danger" ? "danger" : "primary"}
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Please wait…" : confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
