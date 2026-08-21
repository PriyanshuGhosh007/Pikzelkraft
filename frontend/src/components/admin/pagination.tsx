"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function pageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  const pages: (number | "ellipsis")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("ellipsis");
  for (let index = start; index <= end; index += 1) pages.push(index);
  if (end < total - 1) pages.push("ellipsis");
  pages.push(total);
  return pages;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50],
  totalItems,
  className,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  totalItems?: number;
  className?: string;
}) {
  if (totalPages <= 0) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems ?? page * pageSize);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {typeof totalItems === "number" ? (
          <p className="text-body-sm text-ink-muted">
            Showing <span className="font-semibold text-ink">{from}–{to}</span> of{" "}
            <span className="font-semibold text-ink">{totalItems}</span>
          </p>
        ) : null}
        {onPageSizeChange ? (
          <label className="flex items-center gap-2 text-body-sm text-ink-muted">
            Rows
            <select
              value={pageSize}
              onChange={(event) => {
                onPageSizeChange(Number(event.target.value));
                onPageChange(1);
              }}
              className="input h-8 w-[4.5rem] cursor-pointer rounded-md px-2 py-0 text-body-sm"
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          aria-label="Previous page"
          className="flex h-9 w-9 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-[rgb(var(--hover-subtle))] hover:text-ink disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft size={18} aria-hidden />
        </button>

        {pageNumbers(page, totalPages).map((item, index) =>
          item === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className="px-1.5 text-body-sm text-ink-faint">
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              aria-current={item === page ? "page" : undefined}
              className={cn(
                "h-9 min-w-9 rounded-md px-2 text-button font-medium transition-colors",
                item === page
                  ? "bg-primary-600 text-white"
                  : "text-ink-muted hover:bg-[rgb(var(--hover-subtle))] hover:text-ink"
              )}
            >
              {item}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          aria-label="Next page"
          className="flex h-9 w-9 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-[rgb(var(--hover-subtle))] hover:text-ink disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronRight size={18} aria-hidden />
        </button>
      </div>
    </div>
  );
}
