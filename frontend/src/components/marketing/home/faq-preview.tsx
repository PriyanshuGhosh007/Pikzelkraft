import { ArrowRight } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal, Section } from "@/components/marketing/reveal";
import { faqItems } from "@/data/faqs";

const topFaqs = faqItems.slice(0, 5).map((f) => ({ id: f.id, question: f.question, answer: f.answer }));

export function FaqPreview() {
  return (
    <Section>
      <div className="container-shell grid items-start gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <Reveal>
          <SectionHeader
            align="left"
            eyebrow="FAQ"
            title="Questions? We've got answers"
            lede="The things clients ask us most before we start working together."
            className="mb-8"
          />
          <a
            href="/faq"
            className="inline-flex items-center gap-2 text-button font-semibold text-primary-700 underline-offset-4 hover:underline"
          >
            Browse all FAQs
            <ArrowRight size={16} aria-hidden />
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion items={topFaqs} defaultOpen={topFaqs[0].id} />
        </Reveal>
      </div>
    </Section>
  );
}
