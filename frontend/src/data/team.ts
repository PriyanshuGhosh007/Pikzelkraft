export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "m1",
    name: "Aarav Kapoor",
    role: "Founder & CEO",
    bio: "12+ years in digital strategy. Ex-agency lead who believes craft and ROI can — and must — coexist.",
    initials: "AK",
  },
  {
    id: "m2",
    name: "Meera Iyer",
    role: "Head of Design",
    bio: "Award-winning designer obsessed with systems, whitespace and interfaces that feel inevitable.",
    initials: "MI",
  },
  {
    id: "m3",
    name: "Rohan Verma",
    role: "Head of Engineering",
    bio: "Full-stack architect who has shipped products for millions of users across web and mobile.",
    initials: "RV",
  },
  {
    id: "m4",
    name: "Sanya Gupta",
    role: "Growth Marketing Lead",
    bio: "Performance marketer turning ad spend into measurable pipeline across every channel.",
    initials: "SG",
  },
  {
    id: "m5",
    name: "Karan Joshi",
    role: "Content & SEO Director",
    bio: "Editorial strategist building content engines that rank, convert and compound.",
    initials: "KJ",
  },
  {
    id: "m6",
    name: "Ishita Rao",
    role: "Client Success Manager",
    bio: "The bridge between our teams and yours — communication, reporting and keeping projects on track.",
    initials: "IR",
  },
];

export const expertiseBars = [
  { label: "Web & App Development", value: 95 },
  { label: "Digital Marketing & SEO", value: 92 },
  { label: "Branding & Design", value: 90 },
  { label: "Cloud, DevOps & Security", value: 88 },
  { label: "AI & Automation", value: 85 },
] as const;
