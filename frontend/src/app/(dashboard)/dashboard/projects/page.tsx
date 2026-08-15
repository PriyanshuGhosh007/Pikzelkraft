"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Briefcase, CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { ProgressBar } from "@/components/dashboard/progress-bar";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { CardHover } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getProjects } from "@/lib/dashboard-api";
import type { Project } from "@/data/dashboard";
import { formatDate } from "@/lib/time";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let active = true;
    void getProjects().then((data) => {
      if (active) setProjects(data);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Projects"
        subtitle="Track the progress of every engagement with Pikzelkraft."
      />

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/dashboard/projects/${project.id}`} className="group">
              <CardHover className="h-full p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-caption font-medium text-ink-faint">
                      <Briefcase size={14} aria-hidden />
                      {project.company}
                    </div>
                    <h3 className="mt-2 flex items-center gap-2 text-h6 font-semibold text-ink">
                      {project.title}
                      <ArrowUpRight
                        size={18}
                        aria-hidden
                        className="shrink-0 text-ink-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-700"
                      />
                    </h3>
                  </div>
                  <StatusBadge status={project.status} />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-surface-muted px-2.5 py-1 text-caption font-medium text-ink-muted">
                    {project.service}
                  </span>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between text-body-sm">
                    <span className="font-medium text-ink-muted">Progress</span>
                    <span className="tabular font-semibold text-ink">{project.progress}%</span>
                  </div>
                  <ProgressBar
                    percent={project.progress}
                    tone={project.progress === 100 ? "success" : "primary"}
                    className="mt-2"
                  />
                </div>

                <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-body-sm text-ink-muted">
                  <CalendarDays size={16} aria-hidden />
                  Due {formatDate(project.dueDate)}
                </div>
              </CardHover>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-56" />
          ))}
        </div>
      )}
    </div>
  );
}
