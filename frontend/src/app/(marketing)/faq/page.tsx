import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";
import { JsonLd } from "@/components/marketing/json-ld";
import { Section } from "@/components/marketing/reveal";
import { FaqExplorer } from "@/components/marketing/faq-explorer";
import { ContactCta } from "@/components/marketing/home/cta-banner";
import { faqItems } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to the most common questions about Pikzelkraft — services, pricing, payments, delivery and support.",
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHeader
        eyebrow="Help center"
        title="Frequently asked questions"
        lede="Everything you need to know about working with us. Can't find your answer? We're one message away."
      />
      <Section className="section-sm">
        <div className="container-shell">
          <FaqExplorer />
        </div>
      </Section>
      <ContactCta />
    </>
  );
}
