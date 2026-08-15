"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Send, LifeBuoy, Tag } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Avatar } from "@/components/dashboard/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { getTickets } from "@/lib/dashboard-api";
import type { Ticket, TicketPriority, TicketReply } from "@/data/dashboard";
import { formatDateTime, timeAgo } from "@/lib/time";
import { cn } from "@/lib/utils";

const categories = ["Account", "Reporting", "Billing", "Access", "Feature Request", "Other"];
const priorities: TicketPriority[] = ["low", "medium", "high", "urgent"];

const categoryVariant: Record<string, "neutral" | "primary" | "success" | "warning" | "error" | "info"> = {
  Account: "info",
  Reporting: "primary",
  Billing: "warning",
  Access: "error",
  "Feature Request": "success",
  Other: "neutral",
};

const priorityVariant: Record<TicketPriority, "neutral" | "primary" | "warning" | "error"> = {
  low: "neutral",
  medium: "primary",
  high: "warning",
  urgent: "error",
};

const newTicketSchema = z.object({
  subject: z.string().min(4, "Give your ticket a short subject"),
  category: z.string().min(1, "Please select a category"),
  priority: z.string().min(1, "Please select a priority"),
  description: z.string().min(10, "Describe the issue in a little more detail (min 10 characters)"),
});
type NewTicketValues = z.infer<typeof newTicketSchema>;

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewTicketValues>({
    resolver: zodResolver(newTicketSchema),
    mode: "onBlur",
    defaultValues: { subject: "", category: "", priority: "", description: "" },
  });

  useEffect(() => {
    let active = true;
    void getTickets().then((data) => {
      if (!active) return;
      setTickets(data);
      setSelectedId((current) => current ?? data[0]?.id ?? null);
    });
    return () => {
      active = false;
    };
  }, []);

  const selected = tickets.find((ticket) => ticket.id === selectedId) ?? null;

  function onCreateTicket(values: NewTicketValues) {
    const ticket: Ticket = {
      id: `tkt-${Date.now()}`,
      subject: values.subject,
      category: values.category,
      priority: values.priority as TicketPriority,
      status: "open",
      lastUpdated: new Date().toISOString(),
      description: values.description,
      replies: [{ id: `r-${Date.now()}`, author: "You", body: values.description, createdAt: new Date().toISOString() }],
    };
    setTickets((current) => [ticket, ...current]);
    setSelectedId(ticket.id);
    reset();
    setModalOpen(false);
  }

  function sendReply() {
    const body = draft.trim();
    if (!body || !selected) return;
    setSending(true);
    const reply: TicketReply = {
      id: `r-${Date.now()}`,
      author: "You",
      body,
      createdAt: new Date().toISOString(),
    };
    window.setTimeout(() => {
      setTickets((current) =>
        current.map((ticket) =>
          ticket.id === selected.id
            ? { ...ticket, replies: [...ticket.replies, reply], lastUpdated: reply.createdAt }
            : ticket
        )
      );
      setDraft("");
      setSending(false);
    }, 450);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Support"
        subtitle="Open a ticket or continue a conversation with our team."
        actions={
          <Button variant="gradient" onClick={() => setModalOpen(true)}>
            <Plus size={18} aria-hidden />
            New Ticket
          </Button>
        }
      />

      {tickets.length === 0 ? (
        <div className="space-y-4">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          <Card className="h-fit p-0">
            <ul className="divide-y divide-border">
              {tickets.map((ticket) => {
                const active = ticket.id === selectedId;
                return (
                  <li key={ticket.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(ticket.id)}
                      className={cn(
                        "flex w-full flex-col gap-2 px-5 py-4 text-left transition-colors",
                        active ? "bg-primary-50/60" : "hover:bg-surface-muted"
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className={cn("truncate text-button font-medium", active ? "text-primary-700" : "text-ink")}>
                          {ticket.subject}
                        </span>
                        <StatusBadge status={ticket.status} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={categoryVariant[ticket.category] ?? "neutral"}>
                          <Tag size={12} aria-hidden />
                          {ticket.category}
                        </Badge>
                        <Badge variant={priorityVariant[ticket.priority]}>
                          {ticket.priority}
                        </Badge>
                      </div>
                      <span className="text-caption text-ink-faint">
                        {ticket.replies.length} reply{ticket.replies.length === 1 ? "" : "s"} · Updated{" "}
                        {timeAgo(ticket.lastUpdated)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card className="lg:col-span-2">
            {selected ? (
              <div>
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-5">
                  <div>
                    <h2 className="text-h6 font-semibold text-ink">{selected.subject}</h2>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge variant={categoryVariant[selected.category] ?? "neutral"}>
                        <Tag size={12} aria-hidden />
                        {selected.category}
                      </Badge>
                      <Badge variant={priorityVariant[selected.priority]}>{selected.priority}</Badge>
                      <StatusBadge status={selected.status} />
                    </div>
                  </div>
                  <span className="text-caption text-ink-faint">Updated {formatDateTime(selected.lastUpdated)}</span>
                </div>

                <ul className="mt-5 space-y-5">
                  {selected.replies.map((reply) => (
                    <li key={reply.id} className="flex gap-3">
                      <Avatar name={reply.author} size="sm" />
                      <div className="min-w-0 flex-1 rounded-lg border border-border bg-surface-muted/60 px-4 py-3">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="text-button font-semibold text-ink">{reply.author}</span>
                          {reply.authorRole ? (
                            <span className="text-caption font-medium text-primary-700">{reply.authorRole}</span>
                          ) : null}
                          <span className="text-caption text-ink-faint">{formatDateTime(reply.createdAt)}</span>
                        </div>
                        <p className="mt-1.5 text-body-sm text-ink-muted">{reply.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-border pt-5">
                  <Textarea
                    id="ticket-reply"
                    label="Reply"
                    placeholder="Type your reply…"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="gradient"
                    className="mt-3"
                    disabled={!draft.trim() || sending}
                    onClick={sendReply}
                  >
                    <Send size={16} aria-hidden />
                    {sending ? "Sending…" : "Send reply"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                  <LifeBuoy size={26} aria-hidden />
                </span>
                <p className="mt-4 text-button font-medium text-ink">Select a ticket to view its thread</p>
              </div>
            )}
          </Card>
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="New Ticket"
        description="Describe your issue and our team will follow up."
      >
        <form onSubmit={handleSubmit(onCreateTicket)} className="grid gap-5" noValidate>
          <Input
            id="ticket-subject"
            label="Subject"
            placeholder="Short summary of the issue"
            error={errors.subject?.message}
            {...register("subject")}
          />
          <Select
            id="ticket-category"
            label="Category"
            error={errors.category?.message}
            defaultValue=""
            {...register("category")}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <Select
            id="ticket-priority"
            label="Priority"
            error={errors.priority?.message}
            defaultValue=""
            {...register("priority")}
          >
            <option value="" disabled>
              Select a priority
            </option>
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </Select>
          <Textarea
            id="ticket-description"
            label="Description"
            placeholder="What's going on? Include steps if applicable…"
            error={errors.description?.message}
            {...register("description")}
          />
          <div className="flex justify-end gap-3 border-t border-border pt-4">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient">
              Create ticket
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
