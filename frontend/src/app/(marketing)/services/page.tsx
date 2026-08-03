import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";
import { Section, StaggerGroup, StaggerItem } from "@/components/marketing/reveal";
import { ServiceCard } from "@/components/marketing/service-card";
import { ContactCta } from "@/components/marketing/home/cta-banner";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Pikzelkraft's full range of digital services — web & app development, SEO, social media, branding, UI/UX, PPC, e-commerce, cloud, security and AI automation.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our services"
        title="Everything you need to win online"
        lede="Fifteen specialized disciplines under one roof — engineered to work together as a single growth engine."
      />
      <Section className="section-sm">
        <div className="container-shell">
          <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <StaggerItem key={service.slug}>
                <ServiceCard service={service} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Section>
      <ContactCta />
    </>
  );
}
