export type PricingPackage = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  period: "monthly" | "one-time" | "custom";
  duration: string;
  description: string;
  features: string[];
  popular?: boolean;
  featured?: boolean;
  cta: string;
  /** Optional external Razorpay Payment Link for instant checkout. */
  paymentLink?: string;
};

export const pricingPackages: PricingPackage[] = [
  {
    id: "launch-pad",
    name: "Launch Pad",
    tagline: "For startups getting off the ground",
    price: 24999,
    period: "monthly",
    duration: "Monthly retainer",
    description:
      "A focused starter kit to establish your digital presence and start generating leads.",
    features: [
      "Website design & development",
      "Basic on-page SEO setup",
      "Social media management (2 platforms)",
      "Monthly performance report",
      "Email support",
    ],
    cta: "Get Started",
  },
  {
    id: "growth-sprint",
    name: "Growth Sprint",
    tagline: "For businesses ready to scale",
    price: 49999,
    period: "monthly",
    duration: "Monthly retainer",
    popular: true,
    featured: true,
    description:
      "Our most popular bundle — full-stack marketing with content, ads and optimization.",
    features: [
      "Everything in Launch Pad",
      "Content marketing (4 blogs/month)",
      "Google & Meta ad management",
      "Email marketing automations",
      "Monthly strategy call",
      "Priority support",
    ],
    cta: "Get Started",
  },
  {
    id: "scale-master",
    name: "Scale Master",
    tagline: "For aggressive growth targets",
    price: 99999,
    period: "monthly",
    duration: "Monthly retainer",
    featured: true,
    description:
      "An aggressive, full-funnel engine for companies chasing serious market share.",
    features: [
      "Everything in Growth Sprint",
      "Unlimited content production",
      "Full paid media (4 channels)",
      "Advanced SEO & authority building",
      "Conversion rate optimization",
      "Dedicated account manager",
    ],
    cta: "Get Started",
  },
  {
    id: "corporate-pro",
    name: "Corporate Pro",
    tagline: "For enterprises & multi-brand teams",
    price: 199999,
    period: "monthly",
    duration: "Monthly retainer",
    description:
      "Enterprise-grade delivery with multi-channel orchestration and executive reporting.",
    features: [
      "Everything in Scale Master",
      "Multi-brand campaign management",
      "Marketing automation & CRM",
      "Quarterly executive reviews",
      "24/7 priority support",
      "Dedicated team of specialists",
    ],
    cta: "Get Started",
  },
  {
    id: "brand-builder",
    name: "Brand Builder",
    tagline: "One-time brand identity system",
    price: 89999,
    period: "one-time",
    duration: "3–5 weeks",
    description:
      "A complete identity — logo, guidelines and collateral — to position you as a leader.",
    features: [
      "Logo & brand mark suite",
      "Brand guidelines document",
      "Color, typography & voice",
      "Business card & letterhead design",
      "Social media brand kit",
    ],
    cta: "Get Started",
  },
  {
    id: "website-pro",
    name: "Website Pro",
    tagline: "One-time conversion-ready website",
    price: 69999,
    period: "one-time",
    duration: "4–8 weeks",
    featured: true,
    description:
      "A pixel-perfect, SEO-ready website designed to turn visitors into customers.",
    features: [
      "Custom design & development",
      "CMS integration",
      "Speed & Core Web Vitals optimization",
      "Analytics & conversion tracking",
      "30-day post-launch support",
    ],
    cta: "Get Started",
  },
  {
    id: "seo-authority",
    name: "SEO Authority",
    tagline: "Dedicated organic growth engine",
    price: 34999,
    period: "monthly",
    duration: "3–6 months",
    description:
      "A stand-alone SEO program for teams that want organic growth without the full bundle.",
    features: [
      "Technical SEO audit & fixes",
      "On-page optimization",
      "Content & keyword roadmap",
      "Authority building",
      "Monthly ranking reports",
    ],
    cta: "Get Started",
  },
  {
    id: "enterprise-cloud",
    name: "Enterprise Cloud",
    tagline: "Custom IT & infrastructure solutions",
    price: 0,
    period: "custom",
    duration: "Scoped per project",
    description:
      "Tailored engineering — cloud, DevOps, security and AI — scoped to your architecture.",
    features: [
      "Cloud architecture & migration",
      "CI/CD & DevOps automation",
      "Security hardening & audits",
      "AI & workflow automation",
      "Dedicated engineering pod",
    ],
    cta: "Enquire Now",
  },
];

export type IndividualPricing = {
  slug: string;
  name: string;
  icon: string;
  priceStarting: number;
  unit: string;
  duration: string;
  description: string;
  /** Optional external Razorpay Payment Link for instant checkout. */
  paymentLink?: string;
};

export const individualPricing: IndividualPricing[] = [
  { slug: "web-development", name: "Web Development", icon: "web-development", priceStarting: 49999, unit: "per project", duration: "4–8 weeks", description: "Custom, conversion-focused websites and web apps." },
  { slug: "seo", name: "Search Engine Optimization", icon: "seo", priceStarting: 19999, unit: "per month", duration: "3–6 months", description: "Technical, on-page and content SEO that compounds." },
  { slug: "social-media-marketing", name: "Social Media Marketing", icon: "social-media-marketing", priceStarting: 14999, unit: "per month", duration: "Monthly", description: "Content, community and paid social management." },
  { slug: "content-marketing", name: "Content Marketing", icon: "content-marketing", priceStarting: 12999, unit: "per month", duration: "Monthly", description: "Blogs, ebooks and thought leadership that convert." },
  { slug: "email-marketing", name: "Email Marketing", icon: "email-marketing", priceStarting: 9999, unit: "per month", duration: "Monthly", description: "Lifecycle automations and campaigns with high deliverability." },
  { slug: "ppc-advertising", name: "PPC Advertising", icon: "ppc-advertising", priceStarting: 19999, unit: "per month", duration: "Monthly", description: "Google, Meta and LinkedIn ads engineered for ROI." },
  { slug: "branding-design", name: "Branding & Design", icon: "branding-design", priceStarting: 39999, unit: "per project", duration: "3–5 weeks", description: "Identity systems, logos and brand guidelines." },
  { slug: "ui-ux-design", name: "UI/UX Design", icon: "ui-ux-design", priceStarting: 49999, unit: "per project", duration: "4–6 weeks", description: "Research-driven product design that converts." },
  { slug: "video-production", name: "Video Production", icon: "video-production", priceStarting: 29999, unit: "per project", duration: "2–4 weeks", description: "Promos, demos and motion graphics that stop the scroll." },
  { slug: "ecommerce-development", name: "E-commerce Development", icon: "ecommerce-development", priceStarting: 59999, unit: "per project", duration: "5–8 weeks", description: "Online stores built for conversion with payments wired up." },
  { slug: "digital-strategy", name: "Digital Strategy", icon: "digital-strategy", priceStarting: 24999, unit: "per engagement", duration: "One-time + reviews", description: "Data-driven roadmaps aligned to business goals." },
  { slug: "ai-automation", name: "AI & Automation", icon: "ai-automation", priceStarting: 99999, unit: "per project", duration: "4–8 weeks", description: "Custom AI assistants and workflow automation." },
];

export function formatINR(amount: number): string {
  if (amount === 0) return "Custom";
  return `₹${amount.toLocaleString("en-IN")}`;
}
