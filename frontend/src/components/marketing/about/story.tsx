import { Eye, Target } from "lucide-react";
import { Reveal, Section } from "@/components/marketing/reveal";

export function Story() {
  return (
    <Section className="section-sm">
      <div className="container-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div>
            <span className="text-label font-semibold uppercase tracking-[0.08em] text-primary-700">
              Our story
            </span>
            <h2 className="mt-4 text-h2 text-ink">
              Born from a simple belief: every pixel should earn its place.
            </h2>
            <div className="mt-6 space-y-4 text-body-lg text-ink-muted">
              <p>
                Pikzelkraft started in 2013 as two designers and an engineer frustrated by agencies
                that sold pretty work with no measurable results. We set out to build something
                different — a studio where craft and commerce live together.
              </p>
              <p>
                Today we're a 45-person team of strategists, designers, engineers and marketers
                serving 120+ brands across India, the Middle East, the US and the UK. Our work has
                grown from websites to full digital ecosystems — but the standard hasn't moved:
                pixel-perfect, business-driven, every time.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6">
          <Reveal delay={0.1}>
            <div className="flex gap-5 rounded-xl border border-border bg-surface p-7 shadow-soft">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                <Target size={24} aria-hidden />
              </span>
              <div>
                <h3 className="text-h5 font-semibold text-ink">Our Mission</h3>
                <p className="mt-2 text-body-md text-ink-muted">
                  To help ambitious brands grow with digital experiences that are as beautiful as
                  they are effective — measuring our success by our clients' outcomes.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex gap-5 rounded-xl border border-border bg-surface p-7 shadow-soft">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                <Eye size={24} aria-hidden />
              </span>
              <div>
                <h3 className="text-h5 font-semibold text-ink">Our Vision</h3>
                <p className="mt-2 text-body-md text-ink-muted">
                  A world where great digital craft is accessible to every business — and where
                  "pixel-perfect" is the standard, not the exception.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
