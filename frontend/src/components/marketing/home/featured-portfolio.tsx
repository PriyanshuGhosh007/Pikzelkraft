import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionAlt } from "@/components/marketing/reveal";
import { PortfolioGallery } from "@/components/marketing/portfolio-gallery";
import { portfolioItems } from "@/data/portfolio";

export function FeaturedPortfolio() {
  const featured = portfolioItems.slice(0, 6);

  return (
    <SectionAlt>
      <div className="container-shell">
        <SectionHeader
          eyebrow="Featured work"
          title="Work that speaks for itself"
          lede="A selection of projects we're proud of — from brand refreshes to revenue engines."
        />
        <PortfolioGallery items={featured} />
        <div className="mt-12 text-center">
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 text-button font-semibold text-primary-700 underline-offset-4 hover:underline"
          >
            View all projects
            <ArrowRight size={16} aria-hidden />
          </a>
        </div>
      </div>
    </SectionAlt>
  );
}
