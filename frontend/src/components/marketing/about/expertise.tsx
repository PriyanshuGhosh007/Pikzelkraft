"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionAlt, Reveal } from "@/components/marketing/reveal";
import { expertiseBars } from "@/data/team";

function Bar({ label, value, delay }: { label: string; value: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setWidth(value), delay);
    return () => clearTimeout(timer);
  }, [inView, value, delay]);

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between">
        <p className="text-body-md font-medium text-ink">{label}</p>
        <span className="text-body-sm font-semibold text-ink-muted tabular">{value}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="mt-2 h-2 overflow-hidden rounded-full bg-surface-muted"
      >
        <div
          className="h-full rounded-full bg-gradient-primary transition-[width] duration-700 ease-out"
          style={{ width: `${width}%`, transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

export function Expertise() {
  return (
    <SectionAlt>
      <div className="container-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeader
            align="left"
            eyebrow="Capabilities"
            title="Deep expertise, across the stack"
            lede="We're specialists in every discipline we offer — not a generalist agency that does a little of everything."
            className="mb-8"
          />
          <div className="flex flex-col gap-6">
            {expertiseBars.map((bar, i) => (
              <Bar key={bar.label} label={bar.label} value={bar.value} delay={i * 120} />
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="rounded-2xl bg-gradient-violet p-8 text-white shadow-floating sm:p-10">
            <p className="text-label font-semibold uppercase tracking-[0.08em] text-white/80">
              The Pikzelkraft difference
            </p>
            <h3 className="mt-4 text-h3 font-display">
              We don't take on projects we can't win for you.
            </h3>
            <p className="mt-4 text-body-lg text-white/85">
              Every engagement starts with an honest conversation about whether we're the right fit.
              If we can't move your metrics, we'll say so — and point you to someone who can.
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-md bg-white px-6 text-button font-semibold text-primary-700 transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
            >
              Talk to us
            </a>
          </div>
        </Reveal>
      </div>
    </SectionAlt>
  );
}
