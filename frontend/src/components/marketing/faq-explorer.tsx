"use client";

import { useMemo, useState } from "react";
import { Search, SearchX } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { faqCategories, faqItems } from "@/data/faqs";
import { cn } from "@/lib/utils";

export function FaqExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const q = query.trim().toLowerCase();

  const groups = useMemo(() => {
    return faqCategories
      .map((cat) => ({
        ...cat,
        items: faqItems.filter((f) => {
          const inCategory = category === "all" || f.category === category;
          const inQuery =
            q.length === 0 ||
            f.question.toLowerCase().includes(q) ||
            f.answer.toLowerCase().includes(q);
          return inCategory && inQuery;
        }),
      }))
      .filter((g) => g.items.length > 0);
  }, [q, category]);

  const totalMatches = groups.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <div>
      <div className="mx-auto max-w-xl">
        <div className="relative">
          <Search
            size={18}
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
          />
          <label htmlFor="faq-search" className="sr-only">
            Search frequently asked questions
          </label>
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions… e.g. pricing, hosting, cancellation"
            className="h-12 w-full rounded-full border border-border bg-surface pl-11 pr-5 text-body-md text-ink shadow-soft placeholder:text-ink-faint focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring-focus))]"
          />
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Filter FAQs by category"
        className="mt-8 flex flex-wrap justify-center gap-2"
      >
        <button
          role="tab"
          aria-selected={category === "all"}
          onClick={() => setCategory("all")}
          className={cn(
            "rounded-full border px-4 py-2 text-button font-medium transition-colors duration-200",
            category === "all"
              ? "border-transparent bg-primary-600 text-white"
              : "border-border bg-surface text-ink-muted hover:border-strong hover:text-ink"
          )}
        >
          All
        </button>
        {faqCategories.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={category === cat.id}
            onClick={() => setCategory(cat.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-button font-medium transition-colors duration-200",
              category === cat.id
                ? "border-transparent bg-primary-600 text-white"
                : "border-border bg-surface text-ink-muted hover:border-strong hover:text-ink"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-12">
        {groups.map((group) => (
          <section key={group.id} aria-labelledby={`faq-group-${group.id}`}>
            <h2
              id={`faq-group-${group.id}`}
              className="mb-5 flex items-center gap-3 text-h5 font-semibold text-ink"
            >
              {group.label}
              <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-caption font-medium text-primary-700 tabular">
                {group.items.length}
              </span>
            </h2>
            <Accordion
              items={group.items.map((f) => ({
                id: f.id,
                question: f.question,
                answer: f.answer,
              }))}
              defaultOpen={group.items[0]?.id}
            />
          </section>
        ))}

        {totalMatches === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-ink-muted">
              <SearchX size={22} aria-hidden />
            </span>
            <h3 className="mt-4 text-h5 font-semibold text-ink">No results found</h3>
            <p className="mt-2 max-w-sm text-body-md text-ink-muted">
              We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Try a different keyword
              or{" "}
              <a href="/contact" className="font-semibold text-primary-700 underline-offset-4 hover:underline">
                ask us directly
              </a>
              .
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
