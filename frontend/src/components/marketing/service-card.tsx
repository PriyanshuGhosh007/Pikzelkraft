import { ArrowRight } from "lucide-react";
import { ServiceIcon } from "./service-icon";
import { formatINR } from "@/data/pricing";
import type { Service } from "@/data/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <a
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-lg border border-border bg-surface p-6 shadow-soft transition-all duration-200 ease-out hover:-translate-y-1 hover:border-primary-200 hover:shadow-md"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-700 transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110">
        <ServiceIcon icon={service.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-5 text-h5 font-semibold text-ink">{service.name}</h3>
      <p className="mt-2 flex-1 text-body-sm text-ink-muted">{service.shortDescription}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-body-sm font-medium text-ink-muted tabular">
          From {formatINR(service.priceStarting)}
        </span>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-button font-medium text-primary-700">
          Learn more
          <ArrowRight
            size={16}
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </div>
    </a>
  );
}
