import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { Logo } from "./logo";
import { NewsletterForm } from "./newsletter-form";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site";

const footerServices = services.slice(0, 8);

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const socials = [
  { label: "Facebook", href: siteConfig.social.facebook, icon: Facebook },
  { label: "Instagram", href: siteConfig.social.instagram, icon: Instagram },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: Linkedin },
  { label: "Twitter / X", href: siteConfig.social.twitter, icon: Twitter },
  { label: "YouTube", href: siteConfig.social.youtube, icon: Youtube },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-alt">
      <div className="container-shell grid gap-10 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-8">
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="max-w-xs text-body-sm text-ink-muted">
            Pixel-perfect digital marketing and IT solutions for ambitious brands. Every pixel
            intentional, every pixel engineered to perform.
          </p>
          <div className="flex items-center gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-md text-ink-muted transition-all duration-200 hover:bg-primary-50 hover:text-primary-700"
              >
                <Icon size={18} aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-label font-semibold uppercase tracking-[0.08em] text-ink">Services</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {footerServices.map((service) => (
              <li key={service.slug}>
                <a
                  href={`/services/${service.slug}`}
                  className="text-body-sm text-ink-muted transition-colors hover:text-primary-700"
                >
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-label font-semibold uppercase tracking-[0.08em] text-ink">Company</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-body-sm text-ink-muted transition-colors hover:text-primary-700"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-label font-semibold uppercase tracking-[0.08em] text-ink">
            Get in touch
          </h3>
          <ul className="flex flex-col gap-3 text-body-sm text-ink-muted">
            <li className="flex items-start gap-2.5">
              <MapPin size={18} className="mt-0.5 shrink-0 text-primary-600" aria-hidden />
              <span>{siteConfig.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={18} className="shrink-0 text-primary-600" aria-hidden />
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-primary-700">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={18} className="shrink-0 text-primary-600" aria-hidden />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-primary-700">
                {siteConfig.email}
              </a>
            </li>
          </ul>
          <div className="flex flex-col gap-3">
            <h4 className="text-label font-semibold uppercase tracking-[0.08em] text-ink">
              Newsletter
            </h4>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-shell flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-body-sm text-ink-faint">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex items-center gap-5">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-body-sm text-ink-faint transition-colors hover:text-primary-700"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
