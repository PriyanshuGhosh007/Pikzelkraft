"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock,
  Download,
  FileText,
  FolderX,
  Send,
} from "lucide-react";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { ProgressBar } from "@/components/dashboard/progress-bar";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Avatar } from "@/components/dashboard/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { getProject } from "@/lib/dashboard-api";
import type { Comment, Milestone, Project } from "@/data/dashboard";
import { formatDate, formatDateTime, firstName } from "@/lib/time";
import { cn } from "@/lib/utils";

function MilestoneIcon({ status }: { status: Milestone["status"] }) {
  if (status === "completed") {
    return <CheckCircle2 size={18} className="text-success-text" aria-hidden />;
  }
  if (status === "active") {
    return <Clock size={18} className="text-primary-700" aria-hidden />;
  }
  return <Circle size={18} className="text-ink-faint" aria-hidden />;
}

const milestoneTone: Record<Milestone["status"], string> = {
  completed: "border-success-border bg-success-soft text-success-text",
  active: "border-primary-200 bg-primary-50 text-primary-700",
  upcoming: "border-border bg-surface-muted text-ink-faint",
};

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const [project, setProject] = useState<Project | null | undefined>(undefined);
  const [comments, setComments] = useState<Comment[]>([]);
  const [draft, setDraft] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    let active = true;
    void getProject(params.id).then((data) => {
      if (!active) return;
      setProject(data ?? null);
      setComments(data?.comments ?? []);
    });
    return () => {
      active = false;
    };
  }, [params.id]);

  const addComment = useCallback(() => {
    const body = draft.trim();
    if (!body || !project) return;
    setCommentLoading(true);
    const comment: Comment = {
      id: `local-${Date.now()}`,
      author: firstName(session?.user?.name),
      authorRole: "Client",
      body,
      createdAt: new Date().toISOString(),
    };
    window.setTimeout(() => {
      setComments((current) => [...current, comment]);
      setDraft("");
      setCommentLoading(false);
    }, 400);
  }, [draft, project, session]);

  if (project === undefined) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-24" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          <Skeleton className="h-64 lg:col-span-2" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <EmptyState
        icon={FolderX}
        title="Project not found"
        description="This project may have been removed or the link is incorrect."
        action={
          <Button href="/dashboard/projects" variant="primary">
            Back to projects
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-2 text-body-sm font-medium text-primary-700 hover:underline"
        >
          <ArrowLeft size={16} aria-hidden />
          Back to projects
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-body-sm text-ink-faint">
            <Briefcase size={16} aria-hidden />
            {project.company}
          </div>
          <h1 className="mt-1 text-h3 text-ink">{project.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-body-sm text-ink-muted">
            <span>Client: {project.client}</span>
            <span className="flex items-center gap-1.5">
              <CalendarDays size={15} aria-hidden />
              Due {formatDate(project.dueDate)}
            </span>
          </div>
        </div>
        <StatusBadge status={project.status} className="self-start" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <div className="space-y-4 lg:col-span-2 lg:space-y-6">
          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-h6 font-semibold text-ink">Overall progress</h2>
              <span className="text-button font-semibold tabular text-primary-700">{project.progress}%</span>
            </div>
            <ProgressBar
              percent={project.progress}
              tone={project.progress === 100 ? "success" : "primary"}
              className="mt-4"
            />
            <div className="mt-4 flex items-center justify-between text-caption text-ink-faint">
              <span>Started {formatDate(project.startedAt)}</span>
              <span>Budget {project.budget}</span>
            </div>
          </Card>

          <Card>
            <h2 className="text-h6 font-semibold text-ink">Milestones</h2>
            <ol className="mt-5 space-y-0">
              {project.milestones.map((milestone, index) => (
                <li key={milestone.id} className="relative flex gap-4 pb-5 last:pb-0">
                  {index < project.milestones.length - 1 ? (
                    <span aria-hidden className="absolute left-[17px] top-9 h-full w-px bg-border" />
                  ) : null}
                  <span
                    className={cn(
                      "z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ring-4 ring-background",
                      milestoneTone[milestone.status]
                    )}
                  >
                    <MilestoneIcon status={milestone.status} />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-button font-medium text-ink">{milestone.name}</p>
                    <p className="mt-1 text-caption text-ink-faint">Due {formatDate(milestone.dueDate)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-h6 font-semibold text-ink">Files</h2>
              <span className="text-caption text-ink-faint">{project.files.length} files</span>
            </div>
            {project.files.length > 0 ? (
              <ul className="mt-5 divide-y divide-border">
                {project.files.map((file) => (
                  <li key={file.id} className="flex items-center gap-4 py-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-50 text-primary-700">
                      <FileText size={18} aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-button font-medium text-ink">{file.name}</p>
                      <p className="text-caption text-ink-faint">
                        {file.size} · Uploaded {formatDate(file.uploadedAt)}
                      </p>
                    </div>
                    <Button variant="secondary" size="sm" href="#" aria-label={`Download ${file.name}`}>
                      <Download size={16} aria-hidden />
                      Download
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-body-sm text-ink-muted">No files have been uploaded yet.</p>
            )}
          </Card>
        </div>

        <div className="space-y-4 lg:space-y-6">
          <Card>
            <h2 className="text-h6 font-semibold text-ink">About this project</h2>
            <p className="mt-3 text-body-sm text-ink-muted">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
              <span className="rounded-md bg-surface-muted px-2.5 py-1 text-caption font-medium text-ink-muted">
                {project.service}
              </span>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <h2 className="text-h6 font-semibold text-ink">Discussion</h2>
              <span className="text-caption text-ink-faint">{comments.length} comments</span>
            </div>
            <ul className="mt-5 space-y-5">
              {comments.map((comment) => (
                <li key={comment.id} className="flex gap-3">
                  <Avatar name={comment.author} imageUrl={comment.avatarUrl} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-button font-semibold text-ink">{comment.author}</span>
                      {comment.authorRole ? (
                        <span className="text-caption text-ink-faint">{comment.authorRole}</span>
                      ) : null}
                      <span className="text-caption text-ink-faint">{formatDateTime(comment.createdAt)}</span>
                    </div>
                    <p className="mt-1.5 text-body-sm text-ink-muted">{comment.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-border pt-5">
              <Textarea
                id="project-comment"
                label="Add a comment"
                placeholder="Share an update or ask a question…"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <Button
                type="button"
                variant="gradient"
                className="mt-3"
                disabled={!draft.trim() || commentLoading}
                onClick={addComment}
              >
                <Send size={16} aria-hidden />
                {commentLoading ? "Posting…" : "Post comment"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
