import { ArrowRight } from "lucide-react";
import { ServiceIcon } from "@/components/marketing/service-icon";
import { formatINR, type IndividualPricing } from "@/data/pricing";

export function IndividualPricingCard({ item }: { item: IndividualPricing }) {
  return (
    <a
      href={`/services/${item.slug}`}
      className="group flex h-full flex-col rounded-lg border border-border bg-surface p-6 shadow-soft transition-all duration-200 ease-out hover:-translate-y-1 hover:border-primary-200 hover:shadow-md"
    >
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
      <span className="mt-4 inline-flex items-center gap-1.5 text-button font-medium text-primary-700">
        Get started
        <ArrowRight
          size={15}
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </span>
    </a>
  );
}
