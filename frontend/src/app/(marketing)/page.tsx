import type { Metadata } from "next";
import { Hero } from "@/components/marketing/home/hero";
import { ServicesOverview } from "@/components/marketing/home/services-overview";
import { WhyUs } from "@/components/marketing/home/why-us";
import { OurProcess } from "@/components/marketing/home/process";
import { FeaturedPortfolio } from "@/components/marketing/home/featured-portfolio";
import { StatsCounter } from "@/components/marketing/home/stats";
import { PricingPreview } from "@/components/marketing/home/pricing-preview";
import { Testimonials } from "@/components/marketing/home/testimonials";
import { FaqPreview } from "@/components/marketing/home/faq-preview";
import { ContactCta } from "@/components/marketing/home/cta-banner";
import { MapSection } from "@/components/marketing/map-section";

export const metadata: Metadata = {
  title: "Digital Marketing & IT Solutions",
  description:
    "Pikzelkraft crafts pixel-perfect websites, apps, brands and marketing engines that turn attention into revenue for ambitious brands.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyUs />
      <OurProcess />
      <FeaturedPortfolio />
      <StatsCounter />
      <PricingPreview />
      <Testimonials />
      <FaqPreview />
      <MapSection />
      <ContactCta />
    </>
  );
}
