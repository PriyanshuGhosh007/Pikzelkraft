import { SectionHeader } from "@/components/ui/section-header";
import { Section, StaggerGroup, StaggerItem } from "@/components/marketing/reveal";
import { teamMembers } from "@/data/team";

export function Team() {
  return (
    <Section>
      <div className="container-shell">
        <SectionHeader
          eyebrow="Our team"
          title="The specialists behind your growth"
          lede="A senior-only team — no hand-offs to juniors, no account-manager middlemen. You work with the people who do the work."
        />
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <StaggerItem key={member.id}>
              <div className="group flex h-full flex-col items-center rounded-xl border border-border bg-surface p-7 text-center shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary font-display text-2xl font-bold text-white shadow-soft">
                  {member.initials}
                </span>
                <h3 className="mt-5 text-h5 font-semibold text-ink">{member.name}</h3>
                <p className="mt-1 text-body-sm font-medium text-primary-700">{member.role}</p>
                <p className="mt-3 flex-1 text-body-sm text-ink-muted">{member.bio}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
