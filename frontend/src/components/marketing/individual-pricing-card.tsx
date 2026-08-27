import { ArrowRight, Clock } from "lucide-react";
import { ServiceIcon } from "@/components/marketing/service-icon";
import { formatINR, type IndividualPricing } from "@/data/pricing";

export function IndividualPricingCard({ item }: { item: IndividualPricing }) {
  const getStartedHref = item.paymentLink ?? `/contact?service=${item.slug}`;
  const getStartedExternal = Boolean(item.paymentLink);

  return (
    <div className="group flex h-full flex-col rounded-lg border border-border bg-surface p-6 shadow-soft transition-all duration-200 ease-out hover:-translate-y-1 hover:border-primary-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-700 transition-transform duration-200 group-hover:scale-110">
          <ServiceIcon icon={item.icon} className="h-5 w-5" />
        </span>
        <span className="text-body-sm font-semibold text-ink-muted tabular">
          From <span className="text-ink">{formatINR(item.priceStarting)}</span>
          <span className="block text-right text-caption text-ink-faint">{item.unit}</span>
        </span>
      </div>
      <h3 className="mt-4 text-h6 font-semibold text-ink">{item.name}</h3>
      <p className="mt-1.5 flex-1 text-body-sm text-ink-muted">{item.description}</p>
      <p className="mt-3 flex items-center gap-1.5 text-body-sm font-medium text-primary-700">
        <Clock size={14} aria-hidden />
        {item.duration}
      </p>
      <div className="mt-5 flex flex-col gap-2.5 border-t border-border pt-5">
        <a
          href={getStartedHref}
          target={getStartedExternal ? "_blank" : undefined}
          rel={getStartedExternal ? "noreferrer" : undefined}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-gradient-primary px-4 text-button font-medium text-white shadow-soft transition-all duration-200 hover:brightness-110 hover:shadow-glow active:scale-[0.98]"
        >
          Get Started
          <ArrowRight size={15} aria-hidden />
        </a>
        <a
          href={`/contact?service=${item.slug}`}
          className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-button font-medium text-ink transition-colors hover:border-strong hover:bg-surface-muted"
        >
          Enquire Now
        </a>
      </div>
    </div>
  );
}
