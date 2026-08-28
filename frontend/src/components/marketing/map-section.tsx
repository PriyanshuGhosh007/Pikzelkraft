import { ExternalLink, MapPin } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { siteConfig } from "@/lib/site";

export function MapSection({ heading = "Find us in Kolkata" }: { heading?: string }) {
  return (
    <section className="section-sm">
      <div className="container-shell">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-label font-semibold uppercase tracking-[0.08em] text-primary-700">
            Visit us
          </span>
          <h2 className="mt-3 text-h2 text-ink">{heading}</h2>
          <p className="mx-auto mt-3 max-w-xl text-body-md text-ink-muted">
            Drop by our studio in Sodepur — flat no 1, Baikuntha Ganguly Rd, Amarabati, Khardaha,
            Kolkata. We&apos;re easy to find and happy to meet you.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-xl border border-border shadow-soft">
            <iframe
              title="Pikzelkraft office location"
              src={siteConfig.mapEmbed}
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-start gap-2.5 text-body-sm text-ink-muted">
              <MapPin size={18} className="mt-0.5 shrink-0 text-primary-700" aria-hidden />
              <span>{siteConfig.address}</span>
            </p>
            <a
              href={siteConfig.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary-50 px-5 py-2.5 text-button font-semibold text-primary-700 transition-all duration-200 hover:bg-primary-100 active:scale-[0.98]"
            >
              Open in Google Maps
              <ExternalLink size={16} aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
