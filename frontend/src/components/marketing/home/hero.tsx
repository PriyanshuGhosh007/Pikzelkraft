"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Rocket, TrendingUp } from "lucide-react";
import { EASE } from "@/lib/motion";

function WordReveal({
  text,
  delay = 0,
  gradient = false,
}: {
  text: string;
  delay?: number;
  gradient?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span className={gradient ? "text-gradient" : undefined}>
      {words.map((word, i) => (
        <span key={i} className="mr-[0.22em] inline-block overflow-hidden align-bottom">
          <m.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: delay + i * 0.1 }}
          >
            {word}
          </m.span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const orbsY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const orbsOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="section-hero relative flex flex-col items-center overflow-hidden"
    >
      <m.div
        aria-hidden
        style={{ y: orbsY, opacity: orbsOpacity }}
        className="pointer-events-none absolute inset-0 will-change-transform"
      >
        <div className="absolute -top-32 left-1/2 h-[28rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary-500/25 blur-3xl" />
        <div className="absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-grid-pattern opacity-50 [mask-image:radial-gradient(60%_60%_at_50%_30%,black,transparent)]" />
      </m.div>

      <div
        aria-hidden
        className="pointer-events-none absolute left-[6%] top-32 hidden xl:block"
      >
        <div className="glass flex animate-float items-center gap-3 rounded-xl px-5 py-4 shadow-soft">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-soft text-success-text">
            <Rocket size={20} aria-hidden />
          </span>
          <div>
            <p className="text-h6 font-semibold text-ink tabular">340+</p>
            <p className="text-caption text-ink-muted">Projects Delivered</p>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-40 hidden xl:block"
      >
        <div className="glass flex animate-float items-center gap-3 rounded-xl px-5 py-4 shadow-soft [animation-delay:1.2s]">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
            <TrendingUp size={20} aria-hidden />
          </span>
          <div>
            <p className="text-h6 font-semibold text-ink tabular">98%</p>
            <p className="text-caption text-ink-muted">Client Satisfaction</p>
          </div>
        </div>
      </div>

      <div className="container-shell relative flex max-w-4xl flex-col items-center text-center">
        <m.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1.5 text-label font-semibold uppercase tracking-[0.08em] text-primary-700"
        >
          Digital Marketing & IT Solutions
        </m.span>

        <h1 className="mt-7 text-display-xl font-display tracking-tight text-ink">
          <WordReveal text="Transform Your" />
          <WordReveal text="Digital Presence" delay={0.35} gradient />
        </h1>

        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
          className="mt-6 max-w-[560px] text-body-lg text-ink-muted"
        >
          We craft pixel-perfect websites, apps, brands and marketing engines that turn attention
          into revenue — engineered with precision, designed to perform.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="/pricing"
            className="inline-flex h-[3.25rem] items-center justify-center gap-2.5 rounded-md bg-gradient-primary px-7 text-button font-medium text-white shadow-soft transition-all duration-200 ease-out hover:brightness-110 hover:shadow-glow active:scale-[0.98]"
          >
            Get Started
            <ArrowRight size={18} aria-hidden />
          </a>
          <a
            href="/portfolio"
            className="inline-flex h-[3.25rem] items-center justify-center gap-2.5 rounded-md border-2 border-primary-600 px-7 text-button font-medium text-primary-700 transition-colors duration-200 ease-out hover:bg-primary-50 active:scale-[0.98]"
          >
            View Work
            <ArrowUpRight size={18} aria-hidden />
          </a>
        </m.div>

        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-9 text-body-sm text-ink-faint"
        >
          Trusted by 120+ brands across India, the Middle East and the UK
        </m.p>
      </div>

      <m.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute bottom-8 hidden md:block"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-ink-muted/40 p-1.5">
          <span className="h-2 w-1 animate-scroll-dot rounded-full bg-primary-600" />
        </div>
      </m.div>
    </section>
  );
}
