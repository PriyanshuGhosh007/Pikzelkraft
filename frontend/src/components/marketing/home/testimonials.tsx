"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionAlt } from "@/components/marketing/reveal";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const current = testimonials[index];

  return (
    <SectionAlt>
      <div className="container-shell">
        <SectionHeader
          eyebrow="Client success"
          title="Results our clients love to talk about"
          lede="Real outcomes from real partnerships — measured in revenue, growth and long-term retention."
        />
        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote
            size={72}
            aria-hidden
            className="absolute -top-6 left-4 text-primary-100"
          />
          <div className="relative min-h-[260px] overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-soft sm:p-10">
            <AnimatePresence mode="wait">
              <m.figure
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full flex-col"
              >
                <div className="flex gap-1" aria-label={`${current.rating} out of 5 stars`}>
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} size={18} className="fill-warning text-warning" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-body-lg text-ink">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-primary text-button font-bold text-white">
                    {current.initials}
                  </span>
                  <div>
                    <p className="text-body-md font-semibold text-ink">{current.name}</p>
                    <p className="text-body-sm text-ink-muted">
                      {current.role}, {current.company}
                    </p>
                  </div>
                </figcaption>
              </m.figure>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-ink-muted transition-colors hover:border-strong hover:text-ink"
            >
              <ChevronLeft size={18} aria-hidden />
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-primary-600" : "w-2 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-ink-muted transition-colors hover:border-strong hover:text-ink"
            >
              <ChevronRight size={18} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </SectionAlt>
  );
}
