"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, fadeUp, stagger, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  delay?: number;
  amount?: number;
  className?: string;
  id?: string;
  children?: ReactNode;
};

export function Reveal({ delay = 0, amount = 0.2, className, id, children }: RevealProps) {
  return (
    <m.div
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function StaggerGroup({
  className,
  amount = 0.2,
  children,
}: {
  className?: string;
  amount?: number;
  children?: ReactNode;
}) {
  return (
    <m.div
      variants={stagger()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <m.div variants={fadeUp} className={className}>
      {children}
    </m.div>
  );
}

export function Section({ className, ...props }: { className?: string; children?: ReactNode }) {
  return <section className={cn("section-md", className)} {...props} />;
}

export function SectionAlt({ className, ...props }: { className?: string; children?: ReactNode }) {
  return <section className={cn("section-md bg-background-alt", className)} {...props} />;
}

export type { ReactNode };
