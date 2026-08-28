import { ArrowRight, PhoneCall } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { siteConfig } from "@/lib/site";

export function ContactCta() {
  return (
    <section className="container-shell section-md">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-brand px-6 py-14 text-center shadow-floating sm:px-12 lg:py-20">
          <div
            aria-hidden
            className="absolute inset-0 bg-grid-pattern opacity-[0.12] [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-primary-950/40 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-h1 font-display text-white">
              Ready to transform your digital presence?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-body-lg text-white/85">
              Tell us about your goals and get a tailored strategy and quote — free, within 48
              hours.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex h-[3.25rem] items-center justify-center gap-2.5 rounded-md bg-white px-8 text-button font-semibold text-primary-700 shadow-soft transition-all duration-200 ease-out hover:shadow-lg active:scale-[0.98]"
              >
                Get a free quote
                <ArrowRight size={18} aria-hidden />
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="inline-flex h-[3.25rem] items-center justify-center gap-2.5 rounded-md border-2 border-white/70 px-8 text-button font-semibold text-white transition-colors duration-200 ease-out hover:bg-white/10"
              >
                <PhoneCall size={18} aria-hidden />
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
