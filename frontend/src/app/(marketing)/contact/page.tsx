import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/marketing/page-header";
import { Section, Reveal } from "@/components/marketing/reveal";
import { ContactForm } from "@/components/marketing/contact-form";
import { MapSection } from "@/components/marketing/map-section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Pikzelkraft — request a free quote, ask a question or start a project. We reply within 48 hours.",
  alternates: { canonical: "/contact" },
};

const details = [
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
  { icon: MapPin, label: "Office", value: siteConfig.address, href: undefined },
  { icon: Clock, label: "Hours", value: siteConfig.hours, href: undefined },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title="Let's build something great"
        lede="Tell us what you're trying to achieve and we'll get back to you with honest advice and a tailored plan — free, within 48 hours."
      />

      <Section className="section-sm">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <Reveal>
            <ContactForm />
          </Reveal>

          <div className="flex flex-col gap-5">
            <Reveal delay={0.1}>
              <div className="rounded-xl border border-border bg-surface p-6 shadow-soft">
                <h2 className="text-h5 font-semibold text-ink">Business details</h2>
                <ul className="mt-5 flex flex-col gap-5">
                  {details.map(({ icon: Icon, label, value, href }) => (
                    <li key={label} className="flex items-start gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                        <Icon size={19} aria-hidden />
                      </span>
                      <div>
                        <p className="text-caption font-medium uppercase tracking-wide text-ink-faint">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="mt-0.5 block text-body-md font-medium text-ink transition-colors hover:text-primary-700"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="mt-0.5 text-body-md font-medium text-ink">{value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-xl bg-gradient-primary p-6 text-white shadow-soft">
                <h2 className="text-h5 font-semibold">Prefer a quick call?</h2>
                <p className="mt-2 text-body-sm text-white/85">
                  Book a free 20-minute discovery call and we&apos;ll map your next steps — no
                  obligation.
                </p>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-md bg-white px-6 text-button font-semibold text-primary-700 transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
                >
                  Call {siteConfig.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <MapSection />
    </>
  );
}
