import { Check } from "lucide-react";
import { formatINR, type PricingPackage } from "@/data/pricing";
import { cn } from "@/lib/utils";

export function PricingCard({ pkg }: { pkg: PricingPackage }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-xl border bg-surface p-7 shadow-soft transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md",
        pkg.popular ? "border-primary-600 shadow-floating lg:scale-[1.03]" : "border-border"
      )}
    >
      {pkg.popular ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-1 text-caption font-semibold uppercase tracking-wide text-white">
          Most popular
        </span>
      ) : null}
      <h3 className="text-h5 font-semibold text-ink">{pkg.name}</h3>
      <p className="mt-1 text-body-sm text-ink-muted">{pkg.tagline}</p>
      <p className="mt-5 font-display text-4xl font-bold text-ink tabular">
        {formatINR(pkg.price)}
        <span className="ml-1.5 text-body-sm font-medium text-ink-faint">
          {pkg.period === "monthly" ? "/month" : pkg.period === "custom" ? "pricing" : "one-time"}
        </span>
      </p>
      <p className="mt-3 text-body-sm text-ink-muted">{pkg.description}</p>
      <ul className="mt-6 flex flex-1 flex-col gap-2.5">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-body-sm text-ink-muted">
            <Check size={15} className="mt-0.5 shrink-0 text-primary-600" aria-hidden />
            {feature}
          </li>
        ))}
      </ul>
      <a
        href={`/contact?plan=${pkg.id}`}
        className={cn(
          "mt-7 inline-flex h-11 items-center justify-center rounded-md text-button font-medium transition-all duration-200 active:scale-[0.98]",
          pkg.popular
            ? "bg-gradient-primary text-white shadow-soft hover:brightness-110 hover:shadow-glow"
            : "border border-border bg-surface text-ink hover:border-strong hover:bg-surface-muted"
        )}
      >
        {pkg.cta}
      </a>
    </div>
  );
}
