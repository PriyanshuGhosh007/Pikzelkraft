import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";
import { Story } from "@/components/marketing/about/story";
import { Values } from "@/components/marketing/about/values";
import { Team } from "@/components/marketing/about/team";
import { Expertise } from "@/components/marketing/about/expertise";
import { Timeline } from "@/components/marketing/about/timeline";
import { ContactCta } from "@/components/marketing/home/cta-banner";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Pikzelkraft is a 45-person team of strategists, designers, engineers and marketers helping 120+ brands grow with pixel-perfect digital craft.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Pikzelkraft"
        title="We craft digital growth, one pixel at a time"
        lede="A senior team of strategists, designers, engineers and marketers building growth engines for ambitious brands since 2013."
      />
      <Story />
      <Values />
      <Expertise />
      <Timeline />
      <Team />
      <ContactCta />
    </>
  );
}
