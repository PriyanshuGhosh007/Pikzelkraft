import { SectionHeader } from "@/components/ui/section-header";
import { Reveal, Section } from "@/components/marketing/reveal";
import { PricingCard } from "@/components/marketing/pricing-card";
import { pricingPackages } from "@/data/pricing";

const featured = pricingPackages.filter((p) => p.featured).slice(0, 3);

export function PricingPreview() {
  return (
    <Section>
      <div className="container-shell">
        <SectionHeader
          eyebrow="Pricing"
          title="Simple packages, serious results"
          lede="Transparent pricing with no hidden fees. Pick a plan, or mix individual services to fit your exact needs."
        />
        <div className="grid items-start gap-6 lg:grid-cols-3">
          {featured.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 0.08}>
              <PricingCard pkg={pkg} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
