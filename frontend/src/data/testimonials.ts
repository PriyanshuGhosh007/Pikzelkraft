export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Pikzelkraft rebuilt our entire digital presence in eight weeks. Conversion rate jumped 40% within a month of launch — the ROI paid for the project three times over in the first quarter.",
    name: "Ananya Sharma",
    role: "Co-founder & CEO",
    company: "Finlytics",
    initials: "AS",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "The most disciplined agency we've worked with. Weekly reports, honest advice and work that's genuinely pixel-perfect. Our ads finally make sense as a P&L line item.",
    name: "Rahul Mehta",
    role: "VP Growth",
    company: "UrbanNest Properties",
    initials: "RM",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "They didn't just build our app — they challenged our assumptions and made it better. 4.8 stars on both stores and a roadmap we're still executing.",
    name: "Priya Nair",
    role: "Founder",
    company: "PulseFit",
    initials: "PN",
    rating: 5,
  },
  {
    id: "t4",
    quote:
      "From brand strategy to the new identity, every deliverable felt premium. Clients literally comment on our rebrand in sales meetings. Worth every rupee.",
    name: "Daniel Fernandes",
    role: "Managing Director",
    company: "NimbusCloud",
    initials: "DF",
    rating: 5,
  },
  {
    id: "t5",
    quote:
      "Course completion tripled after the redesign. The team understood our learners better than we did and translated that into a product people love.",
    name: "Sneha Kulkarni",
    role: "Head of Product",
    company: "SkillBridge",
    initials: "SK",
    rating: 5,
  },
  {
    id: "t6",
    quote:
      "We've burned money with two agencies before. Pikzelkraft is different — they tie every rupee to outcomes and show you the receipts. Retained for a third year now.",
    name: "Vikram Singh",
    role: "CMO",
    company: "GreenCart Organics",
    initials: "VS",
    rating: 5,
  },
];
