import { SectionHeader } from "@/components/ui/section-header";
import { SectionAlt, StaggerGroup, StaggerItem } from "@/components/marketing/reveal";
import { ServiceCard } from "@/components/marketing/service-card";
import { services } from "@/data/services";

const featured = services.slice(0, 6);

export function ServicesOverview() {
  return (
    <SectionAlt>
      <div className="container-shell">
        <SectionHeader
          eyebrow="What we do"
          title="Services engineered for growth"
          lede="From strategy to execution, we cover the full digital spectrum under one roof — so every channel works as one engine."
        />
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </SectionAlt>
  );
}
