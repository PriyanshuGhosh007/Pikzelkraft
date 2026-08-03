import { SectionHeader } from "@/components/ui/section-header";
import { Section, Reveal } from "@/components/marketing/reveal";

const milestones = [
  {
    year: "2013",
    title: "Founded in Bengaluru",
    description: "Two designers and an engineer start Pikzelkraft with a single laptop and a big standard.",
  },
  {
    year: "2016",
    title: "50 brands onboard",
    description: "Our first milestone — half of our clients came from referrals. Word of mouth was the only ad budget.",
  },
  {
    year: "2019",
    title: "Engineering division",
    description: "We added product engineering, cloud and DevOps — becoming a full-stack digital partner.",
  },
  {
    year: "2022",
    title: "Going international",
    description: "Expanded across the Middle East, US and UK with remote-first delivery and 24/5 coverage.",
  },
  {
    year: "2024",
    title: "AI & automation practice",
    description: "Launched a dedicated AI practice — chatbots, automation and data products for clients.",
  },
  {
    year: "Today",
    title: "120+ brands, 45 specialists",
    description: "A senior team shipping growth engines across every digital channel — and still counting.",
  },
];

export function Timeline() {
  return (
    <Section>
      <div className="container-shell">
        <SectionHeader
          eyebrow="Our journey"
          title="A decade of crafted growth"
          lede="The milestones that shaped who we are today."
        />
        <div className="relative mx-auto max-w-3xl">
          <div
            aria-hidden
            className="absolute bottom-0 left-[19px] top-0 w-px bg-gradient-to-b from-primary-600/60 via-border to-transparent"
          />
          <div className="flex flex-col gap-10">
            {milestones.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.06} className="relative pl-14">
                <span className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-600 bg-surface font-display text-sm font-bold text-primary-700">
                  {i + 1}
                </span>
                <p className="text-label font-semibold uppercase tracking-[0.08em] text-primary-700">
                  {item.year}
                </p>
                <h3 className="mt-1 text-h5 font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-body-md text-ink-muted">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
