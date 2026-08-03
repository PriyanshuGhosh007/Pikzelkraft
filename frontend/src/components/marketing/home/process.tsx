import { SectionHeader } from "@/components/ui/section-header";
import { Reveal, SectionAlt, StaggerGroup, StaggerItem } from "@/components/marketing/reveal";

const steps = [
  {
    title: "Discover & Audit",
    description:
      "We dig into your business, audience, competitors and current digital footprint to define measurable goals.",
  },
  {
    title: "Strategy & Roadmap",
    description:
      "A tailored roadmap with clear scope, budget and success metrics — agreed before any work begins.",
  },
  {
    title: "Design & Build",
    description:
      "Our specialists design and build with quality gates, transparent updates and tight project management.",
  },
  {
    title: "Launch & Refine",
    description:
      "We ship, measure and iterate on what works — documenting results so you own the insights.",
  },
];

export function OurProcess() {
  return (
    <SectionAlt>
      <div className="container-shell">
        <SectionHeader
          eyebrow="Our process"
          title="A proven path from idea to impact"
          lede="No black boxes. Four clear phases with checkpoints and transparent reporting at every step."
        />
        <StaggerGroup className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[22px] hidden h-px bg-gradient-to-r from-primary-600/0 via-primary-600/40 to-primary-600/0 lg:block"
          />
          {steps.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className="relative flex h-full flex-col rounded-lg border border-border bg-surface p-6 shadow-soft">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-primary font-display text-lg font-bold text-white shadow-soft">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-h6 font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 flex-1 text-body-sm text-ink-muted">{step.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </SectionAlt>
  );
}
