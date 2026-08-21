"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowDown, ArrowUp, HelpCircle, Pencil, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { createFaq, deleteFaq, getFaqCategories, getFaqs, reorderFaqs, updateFaq } from "@/lib/admin-api";
import type { FaqAdminItem } from "@/data/admin";
import { cn } from "@/lib/utils";

const faqSchema = z.object({
  category: z.string().min(1, "Select a category"),
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().min(10, "Answer must be at least 10 characters"),
  order: z.coerce.number().int().min(1, "Order must be 1 or higher"),
});
type FaqValues = z.infer<typeof faqSchema>;

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FaqAdminItem[]>([]);
  const [categories, setCategories] = useState<{ id: string; label: string }[]>([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<FaqAdminItem | null>(null);
  const [deleting, setDeleting] = useState<FaqAdminItem | null>(null);
  const [busy, setBusy] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FaqValues>({
    resolver: zodResolver(faqSchema),
    mode: "onBlur",
    defaultValues: { category: "general", question: "", answer: "", order: 1 },
  });

  useEffect(() => {
    let active = true;
    void Promise.all([getFaqs(), getFaqCategories()]).then(([faqData, categoryData]) => {
      if (!active) return;
      setFaqs(faqData);
      setCategories(categoryData);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!creating && !editing) return;
    reset(
      editing
        ? {
            category: editing.category,
            question: editing.question,
            answer: editing.answer,
            order: editing.order,
          }
        : {
            category: "general",
            question: "",
            answer: "",
            order: faqs.length > 0 ? Math.max(...faqs.map((item) => item.order)) + 1 : 1,
          }
    );
  }, [creating, editing, faqs, reset]);

  const grouped = useMemo(() => {
    const map = new Map<string, FaqAdminItem[]>();
    for (const faq of faqs) {
      const list = map.get(faq.category) ?? [];
      list.push(faq);
      map.set(faq.category, list);
    }
    return Array.from(map.entries())
      .map(([category, items]) => ({ category, items: [...items].sort((a, b) => a.order - b.order) }))
      .sort((a, b) => a.items[0].order - b.items[0].order);
  }, [faqs]);

  async function handleSubmitForm(values: FaqValues) {
    setBusy(true);
    if (editing) {
      const updated = await updateFaq(editing.id, values);
      setFaqs((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    } else {
      const created = await createFaq(values);
      setFaqs((current) => [...current, created]);
    }
    setBusy(false);
    setCreating(false);
    setEditing(null);
  }

  async function handleDelete() {
    if (!deleting) return;
    setBusy(true);
    await deleteFaq(deleting.id);
    setFaqs((current) => current.filter((item) => item.id !== deleting.id));
    setBusy(false);
    setDeleting(null);
  }

  async function moveFaq(id: string, direction: -1 | 1) {
    const index = faqs.findIndex((item) => item.id === id);
    const target = index + direction;
    if (index === -1 || target < 0 || target >= faqs.length) return;
    const next = [...faqs];
    [next[index], next[target]] = [next[target], next[index]];
    setFaqs(next.map((item, index_) => ({ ...item, order: index_ + 1 })));
    await reorderFaqs(next.map((item) => item.id));
  }

  const categoryLabel = (id: string) => categories.find((category) => category.id === id)?.label ?? id;

  return (
    <div className="space-y-8">
      <PageHeader
        title="FAQs"
        subtitle="Curate the frequently asked questions shown on the FAQ page."
        actions={
          <Button variant="gradient" onClick={() => setCreating(true)}>
            <Plus size={18} aria-hidden />
            Add FAQ
          </Button>
        }
      />

      {grouped.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-700">
            <HelpCircle size={26} aria-hidden />
          </span>
          <p className="mt-4 text-button font-medium text-ink">No FAQs yet</p>
          <p className="mt-1 text-body-sm text-ink-muted">Add your first question to get started.</p>
        </Card>
      ) : (
        <div className="space-y-8">
          {grouped.map((group) => (
            <section key={group.category}>
              <div className="mb-3 flex items-center gap-2">
                <h2 className="text-h6 font-semibold text-ink">{categoryLabel(group.category)}</h2>
                <Badge variant="neutral">{group.items.length}</Badge>
              </div>
              <Card className="p-0">
                <ul className="divide-y divide-border">
                  {group.items.map((faq) => (
                    <li key={faq.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-w-0 flex-1 items-start gap-4">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-surface-muted text-caption font-semibold tabular text-ink-muted">
                          {faq.order}
                        </span>
                        <div className="min-w-0">
                          <p className="font-medium text-ink">{faq.question}</p>
                          <p className="mt-1 line-clamp-2 text-body-sm text-ink-muted">{faq.answer}</p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          aria-label="Move up"
                          disabled={faqs.indexOf(faq) === 0}
                          onClick={() => void moveFaq(faq.id, -1)}
                        >
                          <ArrowUp size={16} aria-hidden />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          aria-label="Move down"
                          disabled={faqs.indexOf(faq) === faqs.length - 1}
                          onClick={() => void moveFaq(faq.id, 1)}
                        >
                          <ArrowDown size={16} aria-hidden />
                        </Button>
                        <Button variant="ghost" size="sm" aria-label={`Edit ${faq.question}`} onClick={() => setEditing(faq)}>
                          <Pencil size={16} aria-hidden />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          aria-label={`Delete ${faq.question}`}
                          className="text-error-text hover:bg-error-soft"
                          onClick={() => setDeleting(faq)}
                        >
                          <Trash2 size={16} aria-hidden />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </section>
          ))}
        </div>
      )}

      <Modal
        open={creating || Boolean(editing)}
        onClose={() => {
          setCreating(false);
          setEditing(null);
        }}
        title={editing ? "Edit FAQ" : "Add FAQ"}
        description="Questions are grouped by category and ordered by the number shown."
      >
        <form onSubmit={handleSubmit((values) => void handleSubmitForm(values))} className="grid gap-5" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <Select id="faq-category" label="Category" error={errors.category?.message} {...register("category")}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </Select>
            <Input
              id="faq-order"
              label="Order"
              type="number"
              min={1}
              error={errors.order?.message}
              {...register("order")}
            />
          </div>
          <Input
            id="faq-question"
            label="Question"
            placeholder="How much does a website cost?"
            error={errors.question?.message}
            {...register("question")}
          />
          <Textarea
            id="faq-answer"
            label="Answer"
            placeholder="Write a clear, helpful answer…"
            error={errors.answer?.message}
            {...register("answer")}
          />
          <div className="flex justify-end gap-3 border-t border-border pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setCreating(false);
                setEditing(null);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="gradient">
              {editing ? "Save changes" : "Add FAQ"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        title="Delete FAQ?"
        description={
          <>
            This will permanently remove <span className="font-semibold text-ink">{deleting?.question}</span> from the
            FAQ page. This action cannot be undone.
          </>
        }
        loading={busy}
        onConfirm={() => void handleDelete()}
      />
    </div>
  );
}
