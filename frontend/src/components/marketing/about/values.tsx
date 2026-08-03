import { Gem, HeartHandshake, Lightbulb, ShieldCheck, Zap } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionAlt, StaggerGroup, StaggerItem } from "@/components/marketing/reveal";

const values = [
  {
    icon: Gem,
    title: "Craft",
    description: "Every deliverable is built to a standard we'd stake our name on. No shortcuts, no 'good enough'.",
  },
  {
    icon: Zap,
    title: "Impact",
    description: "We judge work by results — leads, revenue, retention — not by how it looks on a moodboard.",
  },
  {
    icon: HeartHandshake,
    title: "Partnership",
    description: "We win when you win. Long-term relationships beat short-term transactions, always.",
  },
  {
    icon: Lightbulb,
    title: "Curiosity",
    description: "We chase the best tools and techniques so our clients stay ahead of their markets.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "Honest estimates, transparent reporting and straight answers — even when they're inconvenient.",
  },
];

export function Values() {
  return (
    <SectionAlt>
      <div className="container-shell">
        <SectionHeader
          eyebrow="Core values"
          title="The principles behind every project"
          lede="Five values that shape how we hire, how we work and how we treat our clients."
        />
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(({ icon: Icon, title, description }) => (
            <StaggerItem key={title}>
              <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-7 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                  <Icon size={24} aria-hidden />
                </span>
                <h3 className="mt-5 text-h5 font-semibold text-ink">{title}</h3>
                <p className="mt-2 flex-1 text-body-md text-ink-muted">{description}</p>
              </div>
            </StaggerItem>
          ))}
          <StaggerItem>
            <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-primary-200 bg-primary-50/50 p-7 text-center">
              <p className="text-h5 font-semibold text-ink">Want to see these in action?</p>
              <a
                href="/portfolio"
                className="mt-3 text-button font-semibold text-primary-700 underline-offset-4 hover:underline"
              >
                Browse our work
              </a>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </SectionAlt>
  );
}
