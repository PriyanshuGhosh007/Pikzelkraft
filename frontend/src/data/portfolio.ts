export type PortfolioItem = {
  slug: string;
  title: string;
  category: string;
  clientName: string;
  year: number;
  coverImage: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  tags: string[];
  projectUrl?: string;
};

export const portfolioCategories = [
  "All",
  "Web Development",
  "Mobile App",
  "Branding",
  "Digital Marketing",
  "E-commerce",
  "UI/UX",
] as const;

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "finlytics",
    title: "Finlytics",
    category: "UI/UX",
    clientName: "Finlytics Technologies",
    year: 2025,
    coverImage: "/placeholders/portfolio-1.svg",
    description:
      "An analytics dashboard that turns raw fintech data into clear, actionable decisions for finance teams.",
    challenge:
      "Finance teams were drowning in spreadsheets. The existing tool was cluttered, slow and required training just to read a simple report.",
    solution:
      "We redesigned the entire analytics experience — a role-based dashboard with progressive disclosure, a cohesive design system and charts that tell a story at a glance.",
    results: [
      "Task completion time cut by 64%",
      "User engagement up 3.2x",
      "Support tickets down 45%",
    ],
    tags: ["Design System", "Data Viz", "Dashboard"],
    projectUrl: "https://example.com/finlytics",
  },
  {
    slug: "greencart",
    title: "GreenCart",
    category: "E-commerce",
    clientName: "GreenCart Organics",
    year: 2025,
    coverImage: "/placeholders/portfolio-2.svg",
    description:
      "A fresh, fast online grocery store delivering organic produce across three cities.",
    challenge:
      "GreenCart's old store loaded slowly, crashed on flash sales and lost 70% of carts at checkout.",
    solution:
      "We rebuilt the storefront on a modern stack with one-page checkout, Razorpay integration and performance budgets that keep every page under a second.",
    results: [
      "Checkout conversion +38%",
      "Cart abandonment -52%",
      "Peak load 10k concurrent users",
    ],
    tags: ["Shopify Plus", "Razorpay", "CRO"],
  },
  {
    slug: "pulsefit",
    title: "PulseFit",
    category: "Mobile App",
    clientName: "PulseFit Wellness",
    year: 2024,
    coverImage: "/placeholders/portfolio-3.svg",
    description:
      "A fitness and wellness app that blends workouts, nutrition and habit tracking in one addictive experience.",
    challenge:
      "Launching on a tight timeline across iOS and Android with native-feeling animations and offline support.",
    solution:
      "A single React Native codebase with native modules for health APIs, offline-first sync and personalized program delivery.",
    results: [
      "Shipped in 12 weeks",
      "4.8★ average app store rating",
      "120k downloads in year one",
    ],
    tags: ["React Native", "Offline-first", "Health"],
    projectUrl: "https://example.com/pulsefit",
  },
  {
    slug: "nimbuscloud",
    title: "NimbusCloud",
    category: "Branding",
    clientName: "NimbusCloud",
    year: 2024,
    coverImage: "/placeholders/portfolio-4.svg",
    description:
      "A full brand refresh for a B2B SaaS company moving from functional to premium.",
    challenge:
      "The brand looked dated next to modern competitors and failed to justify enterprise pricing.",
    solution:
      "A complete identity system — new logo, typography, motion language and guidelines — rolled out across web, product and sales collateral.",
    results: [
      "Brand recall +57% in 6 months",
      "Enterprise deal size +22%",
      "Sales deck close rate +18%",
    ],
    tags: ["Identity", "Guidelines", "B2B SaaS"],
  },
  {
    slug: "urbannest",
    title: "UrbanNest",
    category: "Digital Marketing",
    clientName: "UrbanNest Properties",
    year: 2025,
    coverImage: "/placeholders/portfolio-5.svg",
    description:
      "A lead generation engine that filled a real estate firm's pipeline with high-intent buyers.",
    challenge:
      "UrbanNest was spending heavily on ads with no tracking, a 2% lead-to-site-visit rate and zero visibility into ROI.",
    solution:
      "Full-funnel campaigns with pixel-perfect tracking, landing pages built for conversion and a lead scoring system for the sales team.",
    results: [
      "Lead cost reduced 61%",
      "4x qualified site visits",
      "₹3.4 Cr revenue attributed in 9 months",
    ],
    tags: ["Google Ads", "Landing Pages", "CRO"],
    projectUrl: "https://example.com/urbannest",
  },
  {
    slug: "travelnow",
    title: "TravelNow",
    category: "Web Development",
    clientName: "TravelNow Group",
    year: 2024,
    coverImage: "/placeholders/portfolio-6.svg",
    description:
      "A high-performance travel booking platform handling search, payments and multi-currency pricing.",
    challenge:
      "Legacy booking flow took 11 steps and 40% of visitors abandoned during the search-to-book journey.",
    solution:
      "A rebuilt booking experience with instant search, 3-step checkout and real-time inventory that feels effortless on every device.",
    results: [
      "Booking flow reduced to 3 steps",
      "Conversion +47%",
      "Lighthouse Performance 98",
    ],
    tags: ["Next.js", "Booking Engine", "Performance"],
  },
  {
    slug: "brewhaus",
    title: "BrewHaus",
    category: "Branding",
    clientName: "BrewHaus Coffee",
    year: 2023,
    coverImage: "/placeholders/portfolio-7.svg",
    description:
      "A warm, craft-forward identity for a specialty coffee chain expanding from 3 to 15 locations.",
    challenge:
      "Inconsistent branding across stores and packaging made the chain feel less premium than independent cafés.",
    solution:
      "A flexible identity system — logo, packaging, store signage and merch — designed to scale across every location.",
    results: [
      "15 locations unified in 1 year",
      "Retail merchandise +70%",
      "Named 'Best Café Brand' 2024",
    ],
    tags: ["Identity", "Packaging", "Retail"],
  },
  {
    slug: "mediwave",
    title: "Mediwave",
    category: "Digital Marketing",
    clientName: "Mediwave Health",
    year: 2024,
    coverImage: "/placeholders/portfolio-8.svg",
    description:
      "A compliance-safe PPC program that grew a health tech platform's patient sign-ups profitably.",
    challenge:
      "Health advertising restrictions made it hard to scale, and cost-per-acquisition was climbing every month.",
    solution:
      "A fully compliant campaign structure with evergreen audience research, constant A/B testing and a strict bid-by-margin model.",
    results: [
      "CPA reduced 47%",
      "2.4x return on ad spend",
      "35k qualified sign-ups",
    ],
    tags: ["PPC", "Compliance", "Healthcare"],
  },
  {
    slug: "skillbridge",
    title: "SkillBridge",
    category: "UI/UX",
    clientName: "SkillBridge Academy",
    year: 2025,
    coverImage: "/placeholders/portfolio-9.svg",
    description:
      "An LMS experience that made online courses feel as engaging as a live classroom.",
    challenge:
      "Course completion was under 18% — learners dropped out because the platform felt like a document viewer.",
    solution:
      "A gamified learning experience with progress-driven layout, community loops and a mobile-first design system.",
    results: [
      "Course completion +3.6x",
      "Daily active learners +220%",
      "Net Promoter Score 71",
    ],
    tags: ["EdTech", "Gamification", "Design System"],
    projectUrl: "https://example.com/skillbridge",
  },
];
