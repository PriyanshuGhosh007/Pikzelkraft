import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";
import { Section } from "@/components/marketing/reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Pikzelkraft collects, uses and protects your personal information when you use our website and services.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "Information we collect",
    body: "We collect information you provide directly, such as your name, email address, phone number and company details when you submit an enquiry form, request a quote or contact us. We also collect limited technical information automatically — such as browser type, device type and pages visited — to understand how the site is used.",
  },
  {
    title: "How we use your information",
    body: "We use the information we collect to respond to your enquiries, prepare proposals and quotes, deliver and improve our services, send you information you have requested, and comply with legal obligations. We do not sell your personal information to third parties.",
  },
  {
    title: "Cookies and analytics",
    body: "Our website may use cookies and similar technologies to remember preferences and understand aggregate usage patterns. Where analytics tools are used, data is collected in a privacy-friendly, aggregate form. You can control cookies through your browser settings at any time.",
  },
  {
    title: "How we share information",
    body: "We only share your information with trusted service providers who help us operate our business — for example email delivery, analytics and payment processing — and only to the extent necessary to provide our services. We may also disclose information where required by law.",
  },
  {
    title: "Data security",
    body: "We take reasonable technical and organisational measures to protect your information against unauthorised access, alteration, disclosure or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
  },
  {
    title: "Your rights",
    body: "Depending on your location, you may have the right to access, correct, update or delete the personal information we hold about you, and to object to or restrict certain processing. To exercise any of these rights, contact us using the details below.",
  },
  {
    title: "Retention",
    body: "We retain personal information only for as long as necessary to fulfil the purposes described in this policy, comply with legal obligations, resolve disputes and enforce our agreements.",
  },
  {
    title: "Third-party links",
    body: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites and encourage you to review their privacy policies.",
  },
  {
    title: "Changes to this policy",
    body: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date. Your continued use of the site after changes are posted constitutes acceptance of the updated policy.",
  },
  {
    title: "Contact us",
    body: `If you have any questions about this Privacy Policy or how we handle your information, please contact us at ${siteConfig.email} or ${siteConfig.phone}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        lede="How Pikzelkraft collects, uses and protects your personal information."
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
