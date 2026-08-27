import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";
import { Section } from "@/components/marketing/reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions that govern the use of the Pikzelkraft website and services.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    title: "Agreement to terms",
    body: "By accessing the Pikzelkraft website or engaging our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the website or our services.",
  },
  {
    title: "Services",
    body: "Pikzelkraft provides digital marketing, design, development and IT solutions as described on our website. Specific deliverables, timelines and pricing for each engagement are agreed in a separate proposal or contract. Prices shown on the website are indicative starting prices and may vary based on scope and requirements.",
  },
  {
    title: "Quotes and proposals",
    body: "All quotes and proposals are valid for 15 days from the date of issue unless stated otherwise. A proposal becomes a binding agreement only when accepted in writing by both parties.",
  },
  {
    title: "Payments",
    body: "Payment terms are agreed per engagement. For project work, we typically invoice an advance followed by milestone payments. Monthly retainer services are billed in advance on a rolling basis. Where an external payment link is provided, payments are processed by the respective payment provider under their own terms.",
  },
  {
    title: "Client responsibilities",
    body: "Clients agree to provide accurate information, timely feedback and any content or access required for the delivery of services. Delays in providing these may affect agreed timelines.",
  },
  {
    title: "Intellectual property",
    body: "Upon full payment, ownership of the final deliverables created specifically for your engagement (such as designs, source code and content) transfers to you. Pikzelkraft retains ownership of any pre-existing tools, frameworks and internal processes used to deliver the work.",
  },
  {
    title: "Confidentiality",
    body: "Both parties agree to keep confidential any non-public information shared during an engagement and to use it solely for the purpose of the engagement.",
  },
  {
    title: "Limitation of liability",
    body: "To the maximum extent permitted by law, Pikzelkraft's total liability for any claim arising out of or relating to our services is limited to the amount paid for the services in the 12 months preceding the claim. We are not liable for any indirect, incidental or consequential damages, including loss of profits, data or goodwill.",
  },
  {
    title: "Termination",
    body: "Either party may terminate a rolling monthly engagement with 15 days' written notice. Project engagements may be terminated under the terms of the relevant proposal. On termination, you will own all work produced and paid for up to the termination date.",
  },
  {
    title: "Governing law",
    body: "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka.",
  },
  {
    title: "Contact us",
    body: `If you have any questions about these Terms of Service, please contact us at ${siteConfig.email} or ${siteConfig.phone}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        lede="The terms and conditions that govern the use of the Pikzelkraft website and services."
      />
      <Section className="section-sm">
        <div className="container-shell mx-auto max-w-3xl">
          <div className="flex flex-col gap-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-h4 font-semibold text-ink">{section.title}</h2>
                <p className="mt-3 text-body-md text-ink-muted">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
