import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";
import { Section } from "@/components/marketing/reveal";
import { PortfolioGallery } from "@/components/marketing/portfolio-gallery";
import { ContactCta } from "@/components/marketing/home/cta-banner";
import { portfolioItems } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore Pikzelkraft's portfolio — websites, apps, brands and marketing campaigns that deliver measurable results.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Projects that move the needle"
        lede="A selection of recent engagements across web, mobile, brand and marketing — each with measurable outcomes."
      />
      <Section className="section-sm">
        <div className="container-shell">
          <PortfolioGallery items={portfolioItems} />
        </div>
      </Section>
      <ContactCta />
    </>
  );
}
