import { CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal, Section } from "@/components/marketing/reveal";

const reasons = [
  {
    title: "Outcomes, not outputs",
    description: "We measure success in leads, revenue and retention — never just deliverables.",
  },
  {
    title: "One team, every channel",
    description: "Strategy, design, engineering and marketing under one roof keeps your brand consistent.",
  },
  {
    title: "Pixel-perfect craft",
    description: "Our benchmark is world-class. Every detail is intentional, every interaction considered.",
  },
  {
    title: "Radical transparency",
    description: "Shared dashboards, weekly updates and honest reporting — you always know where you stand.",
  },
  {
    title: "Fast, without shortcuts",
    description: "Agile delivery with quality gates means we ship quickly without cutting corners.",
  },
  {
    title: "Built to scale",
    description: "From launch pad to enterprise, our solutions grow with you — no rebuilds required.",
  },
];

export function WhyUs() {
  return (
    <Section>
      <div className="container-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader
            align="left"
            eyebrow="Why Pikzelkraft"
            title="A partner obsessed with your growth"
            lede="Agencies sell hours. We build growth engines. Here's what working with us actually feels like."
            className="mb-8"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {reasons.map((reason, i) => (
              <Reveal key={reason.title} delay={i * 0.05}>
                <div className="flex gap-3">
                  <CheckCircle2
                    size={22}
                    className="mt-0.5 shrink-0 text-primary-600"
                    aria-hidden
                  />
                  <div>
                    <h3 className="text-h6 font-semibold text-ink">{reason.title}</h3>
                    <p className="mt-1 text-body-sm text-ink-muted">{reason.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15}>
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-2xl bg-gradient-primary opacity-10 blur-2xl"
            />
            <div className="glass relative rounded-2xl p-8 shadow-floating">
              <p className="font-display text-5xl text-gradient font-bold">
                12<span className="text-3xl">+</span>
              </p>
              <p className="mt-1 text-body-md font-semibold text-ink">
                Years crafting digital experiences
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6">
                <div>
                  <p className="font-display text-3xl font-bold text-ink tabular">340+</p>
                  <p className="text-caption text-ink-muted">Projects shipped</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-ink tabular">45+</p>
                  <p className="text-caption text-ink-muted">Specialists in-house</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-ink tabular">98%</p>
                  <p className="text-caption text-ink-muted">Client retention</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-ink tabular">4.9/5</p>
                  <p className="text-caption text-ink-muted">Average rating</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
