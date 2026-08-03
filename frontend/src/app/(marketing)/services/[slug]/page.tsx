import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/marketing/json-ld";
import {
  RelatedServices,
  ServiceFeatures,
  ServiceFaq,
  ServiceHero,
  ServiceOverview,
  ServicePricing,
  ServiceProcess,
} from "@/components/marketing/service-detail";
import { services, getService } from "@/data/services";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = getService(params.slug);
  if (!service) {
    return { title: "Service not found" };
  }
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | Pikzelkraft`,
      description: service.seo.description,
      url: `/services/${service.slug}`,
      type: "website",
    },
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.longDescription,
    provider: { "@type": "Organization", name: "Pikzelkraft", url: siteConfig.url },
    serviceType: service.name,
    areaServed: "IN",
    offers: {
      "@type": "Offer",
      price: service.priceStarting,
      priceCurrency: service.currency,
    },
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <ServiceHero service={service} />
      <ServiceOverview service={service} />
      <ServiceFeatures service={service} />
      <ServiceProcess service={service} />
      <ServicePricing service={service} />
      <ServiceFaq />
      <RelatedServices current={service} />
    </>
  );
}
