"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { portfolioCategories, portfolioItems, type PortfolioItem } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function PortfolioGallery({
  items = portfolioItems,
  showFilter = true,
  showModal = true,
  className,
}: {
  items?: PortfolioItem[];
  showFilter?: boolean;
  showModal?: boolean;
  className?: string;
}) {
  const categories = useMemo(() => {
    const present = new Set(items.map((i) => i.category));
    return portfolioCategories.filter((c) => c === "All" || present.has(c));
  }, [items]);

  const [active, setActive] = useState<string>("All");
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <div className={className}>
      {showFilter ? (
        <div role="tablist" aria-label="Filter projects" className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => {
            const activeTab = active === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={activeTab}
                onClick={() => setActive(category)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-button font-medium transition-colors duration-200",
                  activeTab ? "text-white" : "text-ink-muted hover:bg-surface-muted hover:text-ink"
                )}
              >
                {activeTab ? (
                  <m.span
                    layoutId="portfolio-filter"
                    className="absolute inset-0 rounded-full bg-primary-600"
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : null}
                <span className="relative">{category}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      <m.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <m.article
              layout
              key={item.slug}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-xl border border-border bg-surface shadow-soft"
            >
              <button
                type="button"
                onClick={() => showModal && setSelected(item)}
                className="block w-full text-left"
                aria-label={`View case study: ${item.title}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
                  <Image
                    src={item.coverImage}
                    alt={`${item.title} — ${item.category} project`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-600 ease-out group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 text-button font-semibold text-white">
                      View case study
                      <ArrowUpRight size={16} aria-hidden />
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="primary">{item.category}</Badge>
                    <span className="text-caption text-ink-faint tabular">{item.year}</span>
                  </div>
                  <h3 className="mt-3 text-h6 font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1.5 text-body-sm text-ink-muted">{item.description}</p>
                </div>
              </button>
            </m.article>
          ))}
        </AnimatePresence>
      </m.div>

      <AnimatePresence>
        {selected ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-[rgb(var(--overlay))] backdrop-blur-sm"
            />
            <m.div
              role="dialog"
              aria-modal="true"
              aria-label={`${selected.title} case study`}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-surface shadow-modal"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl bg-surface-muted">
                <Image
                  src={selected.coverImage}
                  alt={selected.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close case study"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-md bg-neutral-950/60 text-white backdrop-blur transition-colors hover:bg-neutral-950/80"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="primary">{selected.category}</Badge>
                  <span className="text-caption text-ink-faint">
                    {selected.clientName} · {selected.year}
                  </span>
                </div>
                <h3 className="mt-3 text-h3 font-display text-ink">{selected.title}</h3>
                <p className="mt-3 text-body-md text-ink-muted">{selected.description}</p>

                <div className="mt-6 space-y-5">
                  <div>
                    <h4 className="text-label font-semibold uppercase tracking-[0.08em] text-ink">
                      The Challenge
                    </h4>
                    <p className="mt-2 text-body-md text-ink-muted">{selected.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-label font-semibold uppercase tracking-[0.08em] text-ink">
                      The Solution
                    </h4>
                    <p className="mt-2 text-body-md text-ink-muted">{selected.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-label font-semibold uppercase tracking-[0.08em] text-ink">
                      The Results
                    </h4>
                    <ul className="mt-2 grid gap-2 sm:grid-cols-3">
                      {selected.results.map((result) => (
                        <li
                          key={result}
                          className="rounded-lg border border-border bg-surface-muted p-3 text-center text-body-sm font-semibold text-ink"
                        >
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-surface-muted px-3 py-1 text-body-sm text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {selected.projectUrl ? (
                  <a
                    href={selected.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-2 text-button font-semibold text-primary-700 underline-offset-4 hover:underline"
                  >
                    Visit project
                    <ExternalLink size={16} aria-hidden />
                  </a>
                ) : null}
              </div>
            </m.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
