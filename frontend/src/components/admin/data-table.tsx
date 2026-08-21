"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Search, Inbox } from "lucide-react";
import { Pagination } from "@/components/admin/pagination";
import { cn } from "@/lib/utils";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
  cellClassName?: string;
  headerClassName?: string;
  render?: (row: T) => ReactNode;
}

export type SortDirection = "asc" | "desc";

export interface SortState {
  key: string;
  direction: SortDirection;
}

export function DataTable<T>({
  data,
  columns,
  rowKey,
  searchKeys,
  searchPlaceholder = "Search…",
  defaultSort,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [10, 25, 50],
  emptyState,
  onRowClick,
  toolbar,
  searchClassName,
  tableClassName,
  stickyHeader = false,
  initialQuery = "",
}: {
  data: T[];
  columns: DataTableColumn<T>[];
  rowKey: (row: T) => string;
  searchKeys?: (row: T) => string;
  searchPlaceholder?: string;
  defaultSort?: SortState;
  pageSize?: number;
  pageSizeOptions?: number[];
  emptyState?: ReactNode;
  onRowClick?: (row: T) => void;
  toolbar?: ReactNode;
  searchClassName?: string;
  tableClassName?: string;
  stickyHeader?: boolean;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<SortState | null>(defaultSort ?? null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  useEffect(() => {
    setPage(1);
  }, [query, sort, pageSize]);

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    const queried = trimmed && searchKeys
      ? data.filter((row) => searchKeys(row).toLowerCase().includes(trimmed))
      : data;
    return queried;
  }, [data, query, searchKeys]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const column = columns.find((c) => c.key === sort.key);
    if (!column || !column.sortable) return filtered;
    const valueOf = column.sortValue ?? ((row: T) => String((row as Record<string, unknown>)[column.key] ?? ""));
    return [...filtered].sort((a, b) => {
      const av = valueOf(a);
      const bv = valueOf(b);
      const comparison =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sort.direction === "asc" ? comparison : -comparison;
    });
  }, [filtered, sort, columns]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const rows = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  function toggleSort(key: string) {
    setSort((current) =>
      current?.key === key
        ? { key, direction: current.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-soft">
      {(searchKeys || toolbar) ? (
        <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          {searchKeys ? (
            <div className={cn("relative w-full sm:max-w-xs", searchClassName)}>
              <Search
                size={18}
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="input pl-10"
              />
            </div>
          ) : (
            <div />
          )}
          {toolbar ? <div className="flex flex-wrap items-center gap-2">{toolbar}</div> : null}
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <table className={cn("w-full min-w-[640px] border-collapse text-left", tableClassName)}>
          <thead className={cn("bg-surface-muted/70", stickyHeader && "sticky top-0")}>
            <tr>
              {columns.map((column) => {
                const active = sort?.key === column.key;
                const canSort = Boolean(column.sortable);
                return (
                  <th
                    key={column.key}
                    scope="col"
                    className={cn(
                      "whitespace-nowrap px-5 py-3 text-label font-semibold uppercase tracking-[0.08em] text-ink-muted",
                      canSort && "cursor-pointer select-none",
                      column.headerClassName
                    )}
                    onClick={canSort ? () => toggleSort(column.key) : undefined}
                    aria-sort={
                      active
                        ? sort?.direction === "asc"
                          ? "ascending"
                          : "descending"
                        : undefined
                    }
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {column.header}
                      {canSort ? (
                        active ? (
                          sort?.direction === "asc" ? (
                            <ArrowUp size={14} aria-hidden className="text-primary-700" />
                          ) : (
                            <ArrowDown size={14} aria-hidden className="text-primary-700" />
                          )
                        ) : (
                          <ArrowUpDown size={14} aria-hidden className="text-ink-faint" />
                        )
                      ) : null}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr
                key={rowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(
                  "transition-colors",
                  onRowClick && "cursor-pointer hover:bg-surface-muted/60"
                )}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      "whitespace-nowrap px-5 py-3.5 text-body-sm text-ink",
                      column.cellClassName
                    )}
                  >
                    {column.render ? column.render(row) : String((row as Record<string, unknown>)[column.key] ?? "—")}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-16">
                  {emptyState ?? (
                    <div className="flex flex-col items-center justify-center text-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-ink-faint">
                        <Inbox size={22} aria-hidden />
                      </span>
                      <p className="mt-3 text-button font-medium text-ink">No results found</p>
                      <p className="mt-1 text-body-sm text-ink-muted">
                        Try adjusting your search or filters.
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <Pagination
        page={safePage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        pageSizeOptions={pageSizeOptions}
        onPageChange={setPage}
        totalItems={sorted.length}
      />
    </div>
  );
}
