import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";
import { Section, SectionAlt, StaggerGroup, StaggerItem, Reveal } from "@/components/marketing/reveal";
import { PricingCard } from "@/components/marketing/pricing-card";
import { IndividualPricingCard } from "@/components/marketing/individual-pricing-card";
import { ContactCta } from "@/components/marketing/home/cta-banner";
import { individualPricing, pricingPackages } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing from Pikzelkraft — bundled packages and individual services with no hidden fees. Find the right plan for your business.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Pricing built for every stage"
        lede="Pick a bundled package for predictable growth, or buy individual services a la carte. No hidden fees, no lock-in."
      />

      <Section className="section-sm">
        <div className="container-shell">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-label font-semibold uppercase tracking-[0.08em] text-primary-700">
              Bundled packages
            </span>
            <h2 className="mt-3 text-h2 text-ink">Complete growth engines</h2>
            <p className="mt-3 text-body-lg text-ink-muted">
              Everything bundled and coordinated — ideal when you want one partner running the show.
            </p>
          </Reveal>
          <StaggerGroup className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pricingPackages.map((pkg) => (
              <StaggerItem key={pkg.id} className="h-full">
                <PricingCard pkg={pkg} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Section>

      <SectionAlt>
        <div className="container-shell">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-label font-semibold uppercase tracking-[0.08em] text-primary-700">
              Individual services
            </span>
            <h2 className="mt-3 text-h2 text-ink">Buy exactly what you need</h2>
            <p className="mt-3 text-body-lg text-ink-muted">
              Already have the rest covered? Purchase a single service and plug it into your stack.
            </p>
          </Reveal>
          <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {individualPricing.map((item) => (
              <StaggerItem key={item.slug}>
                <IndividualPricingCard item={item} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal className="mt-12 text-center">
            <p className="text-body-md text-ink-muted">
              Not sure what you need?{" "}
              <a href="/contact" className="font-semibold text-primary-700 underline-offset-4 hover:underline">
                Talk to us
              </a>{" "}
              and we&apos;ll recommend the right mix for your budget.
            </p>
          </Reveal>
        </div>
      </SectionAlt>

      <ContactCta />
    </>
  );
}
