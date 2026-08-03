import { Check, ChevronRight, Clock } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ServiceIcon } from "@/components/marketing/service-icon";
import { Reveal } from "@/components/marketing/reveal";
import { ServiceCard } from "@/components/marketing/service-card";
import { formatINR } from "@/data/pricing";
import { faqItems } from "@/data/faqs";
import { services, type Service } from "@/data/services";

export function ServiceHero({ service }: { service: Service }) {
  return (
    <header className="relative overflow-hidden border-b border-border bg-background-alt">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-60 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-primary-600/10 blur-3xl"
      />
      <div className="container-shell relative py-14 lg:py-20">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-body-sm text-ink-muted">
            <li>
              <a href="/services" className="hover:text-primary-700">
                Services
              </a>
            </li>
            <li aria-hidden>
              <ChevronRight size={14} className="text-ink-faint" />
            </li>
            <li aria-current="page" className="font-medium text-ink">
              {service.name}
            </li>
          </ol>
        </nav>

        <div className="max-w-3xl">
          <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-soft">
            <ServiceIcon icon={service.icon} className="h-7 w-7" />
          </span>
          <h1 className="mt-6 text-h1 font-display text-ink">{service.name}</h1>
          <p className="mt-4 max-w-2xl text-body-lg text-ink-muted">{service.shortDescription}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge variant="primary">
              From {formatINR(service.priceStarting)} · {service.currency}
            </Badge>
            <Badge variant="neutral">
              <Clock size={13} aria-hidden />
              {service.estimatedTimeline}
            </Badge>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`/contact?service=${service.slug}`}
              className="inline-flex h-11 items-center justify-center rounded-md bg-gradient-primary px-6 text-button font-medium text-white shadow-soft transition-all duration-200 ease-out hover:brightness-110 hover:shadow-glow active:scale-[0.98]"
            >
              Enquire Now
            </a>
            <a
              href={`/contact?service=${service.slug}&intent=buy`}
              className="inline-flex h-11 items-center justify-center rounded-md border-2 border-primary-600 px-6 text-button font-medium text-primary-700 transition-colors duration-200 ease-out hover:bg-primary-50 active:scale-[0.98]"
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export function ServiceOverview({ service }: { service: Service }) {
  return (
    <section className="section-md">
      <div className="container-shell grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <Reveal>
          <div>
            <span className="text-label font-semibold uppercase tracking-[0.08em] text-primary-700">
              Overview
            </span>
            <h2 className="mt-3 text-h2 text-ink">Why {service.name} matters</h2>
            <p className="mt-5 text-body-lg text-ink-muted">{service.longDescription}</p>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="rounded-xl border border-border bg-surface p-7 shadow-soft">
            <h3 className="text-h5 font-semibold text-ink">Key benefits</h3>
            <ul className="mt-5 flex flex-col gap-3.5">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-body-md text-ink-muted">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-soft text-success-text">
                    <Check size={13} aria-hidden />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ServiceFeatures({ service }: { service: Service }) {
  return (
    <section className="section-md bg-background-alt">
      <div className="container-shell grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="rounded-xl border border-border bg-surface p-7 shadow-soft">
            <h3 className="text-h5 font-semibold text-ink">What&apos;s included</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-lg border border-border bg-surface-muted px-4 py-3 text-body-md text-ink"
                >
                  <Check size={17} className="mt-0.5 shrink-0 text-primary-600" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="rounded-xl border border-border bg-surface p-7 shadow-soft">
            <h3 className="text-h5 font-semibold text-ink">Deliverables</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {service.deliverables.map((deliverable) => (
                <li
                  key={deliverable}
                  className="flex items-start gap-3 rounded-lg border border-border bg-surface-muted px-4 py-3 text-body-md text-ink"
                >
                  <Check size={17} className="mt-0.5 shrink-0 text-primary-600" aria-hidden />
                  {deliverable}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ServiceProcess({ service }: { service: Service }) {
  return (
    <section className="section-md">
      <div className="container-shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-label font-semibold uppercase tracking-[0.08em] text-primary-700">
            Our process
          </span>
          <h2 className="mt-3 text-h2 text-ink">How we deliver {service.name}</h2>
        </Reveal>
        <div className="relative mx-auto mt-12 max-w-3xl">
          <div
            aria-hidden
            className="absolute bottom-4 left-[19px] top-4 w-px bg-gradient-to-b from-primary-600/60 via-border to-transparent"
          />
          <div className="flex flex-col gap-8">
            {service.process.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06} className="relative pl-14">
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary font-display text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="text-h5 font-semibold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-body-md text-ink-muted">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicePricing({ service }: { service: Service }) {
  return (
    <section className="section-md bg-background-alt">
      <div className="container-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <span className="text-label font-semibold uppercase tracking-[0.08em] text-primary-700">
            Pricing
          </span>
          <h2 className="mt-3 text-h2 text-ink">Transparent pricing, zero surprises</h2>
          <p className="mt-4 text-body-lg text-ink-muted">
            Every engagement starts with a fixed, agreed scope — so you know exactly what you pay
            for. Need something custom? Tell us about your goals and we&apos;ll scope a tailored
            proposal within 48 hours.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`/contact?service=${service.slug}`}
              className="inline-flex h-11 items-center justify-center rounded-md bg-gradient-primary px-6 text-button font-medium text-white shadow-soft transition-all duration-200 ease-out hover:brightness-110 hover:shadow-glow active:scale-[0.98]"
            >
              Enquire Now
            </a>
            <a
              href="/pricing"
              className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-surface px-6 text-button font-medium text-ink transition-colors duration-200 hover:border-strong hover:bg-surface-muted"
            >
              View packages
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="relative rounded-xl border-2 border-primary-600 bg-surface p-8 shadow-floating">
            <span className="absolute -top-3 left-8 rounded-full bg-gradient-primary px-3 py-1 text-caption font-semibold uppercase tracking-wide text-white">
              Starting price
            </span>
            <p className="font-display text-5xl font-bold text-ink tabular">
              {formatINR(service.priceStarting)}
            </p>
            <p className="mt-1 text-body-sm text-ink-muted">
              {service.currency} · {service.estimatedTimeline}
            </p>
            <ul className="mt-6 flex flex-col gap-2.5 border-t border-border pt-6">
              {service.features.slice(0, 4).map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-body-sm text-ink-muted">
                  <Check size={15} className="mt-0.5 shrink-0 text-primary-600" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={`/contact?service=${service.slug}&intent=buy`}
              className="mt-7 inline-flex h-11 w-full items-center justify-center rounded-md bg-gradient-primary text-button font-medium text-white shadow-soft transition-all duration-200 ease-out hover:brightness-110 hover:shadow-glow active:scale-[0.98]"
            >
              Buy {service.name}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const serviceFaqIds = ["s1", "s2", "s3", "su1", "p1"];

export function ServiceFaq() {
  const items = faqItems
    .filter((f) => serviceFaqIds.includes(f.id))
    .map((f) => ({ id: f.id, question: f.question, answer: f.answer }));

  return (
    <section className="section-md">
      <div className="container-shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-label font-semibold uppercase tracking-[0.08em] text-primary-700">
            FAQ
          </span>
          <h2 className="mt-3 text-h2 text-ink">Common questions</h2>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto mt-10 max-w-3xl">
          <Accordion items={items} defaultOpen={items[0].id} />
        </Reveal>
      </div>
    </section>
  );
}

export function RelatedServices({ current }: { current: Service }) {
  const related = services.filter((s) => s.slug !== current.slug).slice(0, 3);
  return (
    <section className="section-md bg-background-alt">
      <div className="container-shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-label font-semibold uppercase tracking-[0.08em] text-primary-700">
            Explore more
          </span>
          <h2 className="mt-3 text-h2 text-ink">Services that pair well</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {related.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.08}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
