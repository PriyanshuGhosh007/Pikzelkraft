"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";
import { companyStats } from "@/lib/site";

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular">
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function StatsCounter() {
  return (
    <section className="container-shell section-sm">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-primary px-6 py-12 shadow-lg sm:px-12 lg:py-16">
        <div
          aria-hidden
          className="absolute inset-0 bg-grid-pattern opacity-[0.15] [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]"
        />
        <div className="relative grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
          {companyStats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-5xl font-bold text-white">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-body-sm font-medium uppercase tracking-[0.08em] text-white/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
