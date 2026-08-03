export type ProcessStep = {
  title: string;
  description: string;
};

export type Service = {
  slug: string;
  name: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
  features: string[];
  deliverables: string[];
  priceStarting: number;
  currency: string;
  estimatedTimeline: string;
  process: ProcessStep[];
  seo: { title: string; description: string };
};

const baseProcess: Omit<ProcessStep, "title">[] = [
  { description: "We dig into your business, audience, competitors and current digital footprint to define measurable goals." },
  { description: "We craft a tailored roadmap, scope, budget and success metrics — agreed before any work begins." },
  { description: "Our specialists build and launch the solution with quality gates, transparent updates and tight project management." },
  { description: "We measure performance, iterate on what works and document results so you own the insights." },
];

function processFor(name: string): ProcessStep[] {
  return [
    { title: `Discover & Audit`, description: baseProcess[0].description },
    { title: "Strategy & Roadmap", description: baseProcess[1].description },
    { title: `Design & Build`, description: baseProcess[2].description },
    { title: `Launch & Refine`, description: baseProcess[3].description },
  ];
}

export const services: Service[] = [
  {
    slug: "web-development",
    name: "Web Development",
    icon: "web-development",
    shortDescription:
      "Fast, secure, conversion-focused websites built with modern frameworks and pixel-perfect craft.",
    longDescription:
      "Your website is your hardest-working salesperson. We design and engineer lightning-fast, SEO-ready websites and web applications that turn visitors into customers. Every project is mobile-first, accessible and built to scale with your business — from marketing sites to complex SaaS platforms.",
    benefits: [
      "Blazing-fast load times that boost conversions",
      "Mobile-first, accessible, SEO-ready structure",
      "Scalable architecture that grows with you",
      "CMS integration so your team stays in control",
    ],
    features: [
      "Custom website design & development",
      "Next.js / React frontend architecture",
      "Content management system integration",
      "Speed, Core Web Vitals & SEO optimization",
      "Analytics, tracking & conversion setup",
    ],
    deliverables: [
      "Production-ready website",
      "Source code & documentation",
      "Admin/CMS training session",
      "30-day post-launch support",
    ],
    priceStarting: 49999,
    currency: "INR",
    estimatedTimeline: "4–8 weeks",
    process: processFor("Web Development"),
    seo: {
      title: "Web Development Services",
      description:
        "Fast, secure, conversion-focused web development by Pikzelkraft. Custom websites and web apps built with Next.js and modern best practices.",
    },
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    icon: "mobile-app-development",
    shortDescription:
      "Native-quality iOS and Android apps delivered faster with cross-platform technology.",
    longDescription:
      "From idea to app store, we design, develop and ship beautiful mobile applications. Using React Native and native tooling we deliver a single codebase that feels native on both platforms — with offline support, push notifications and analytics baked in.",
    benefits: [
      "One codebase for iOS and Android — lower cost",
      "Buttery-smooth, native-feeling UX",
      "App Store & Play Store launch support",
      "Analytics, push & crash reporting included",
    ],
    features: [
      "Cross-platform iOS/Android development",
      "Native modules when performance demands",
      "Offline-first data & sync architecture",
      "Push notifications & deep linking",
      "App store submission & compliance",
    ],
    deliverables: [
      "Published app on iOS & Android",
      "Admin / API documentation",
      "Backend & analytics setup",
      "30-day post-launch support",
    ],
    priceStarting: 149999,
    currency: "INR",
    estimatedTimeline: "8–14 weeks",
    process: processFor("Mobile App Development"),
    seo: {
      title: "Mobile App Development Services",
      description:
        "Native-quality iOS and Android apps by Pikzelkraft. Cross-platform development, app store launch and ongoing support.",
    },
  },
  {
    slug: "seo",
    name: "Search Engine Optimization",
    icon: "seo",
    shortDescription:
      "Rank higher, earn qualified traffic and compound organic growth with technical + content SEO.",
    longDescription:
      "We build organic growth engines, not shortcuts. Our SEO team audits your technical foundation, optimizes on-page signals and creates content that answers real buyer questions. The result is compounding visibility that keeps paying long after the campaign.",
    benefits: [
      "Sustainable organic traffic that compounds",
      "Technical fixes that unlock crawl budget",
      "Keyword strategy mapped to buying intent",
      "Transparent reporting on rankings & revenue",
    ],
    features: [
      "Technical SEO audit & implementation",
      "On-page & keyword optimization",
      "Content strategy & optimization",
      "Authority building & digital PR",
      "Monthly ranking & traffic reporting",
    ],
    deliverables: [
      "SEO audit report",
      "Keyword & content roadmap",
      "Technical fixes implemented",
      "Monthly performance reports",
    ],
    priceStarting: 19999,
    currency: "INR",
    estimatedTimeline: "3–6 months",
    process: processFor("SEO"),
    seo: {
      title: "SEO Services — Rank Higher on Google",
      description:
        "Technical, on-page and content SEO that compounds. Pikzelkraft helps brands rank higher and earn qualified organic traffic.",
    },
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    icon: "social-media-marketing",
    shortDescription:
      "Scroll-stopping content and community management that turns followers into customers.",
    longDescription:
      "Social media is where attention lives. We build your brand's presence across Instagram, LinkedIn, Facebook and YouTube with a content engine, community management and paid amplification that convert engagement into pipeline.",
    benefits: [
      "Consistent, on-brand content calendar",
      "Community that actually engages",
      "Paid + organic synergy for reach",
      "Monthly creative & KPI reporting",
    ],
    features: [
      "Content calendars & creative design",
      "Reels, shorts & short-form video",
      "Community management & responses",
      "Influencer & creator collaborations",
      "Paid social campaign management",
    ],
    deliverables: [
      "Monthly content calendar",
      "Designed posts & short-form video",
      "Community & inbox management",
      "Performance & KPI reports",
    ],
    priceStarting: 14999,
    currency: "INR",
    estimatedTimeline: "Monthly engagement",
    process: processFor("Social Media Marketing"),
    seo: {
      title: "Social Media Marketing Services",
      description:
        "Scroll-stopping content, community management and paid social by Pikzelkraft. Turn followers into customers.",
    },
  },
  {
    slug: "content-marketing",
    name: "Content Marketing",
    icon: "content-marketing",
    shortDescription:
      "Blogs, ebooks and thought leadership that build authority and generate leads on autopilot.",
    longDescription:
      "Content is the bridge between attention and trust. We research what your audience searches for, then produce and distribute high-quality content that ranks, educates and converts — building authority that sales teams can lean on.",
    benefits: [
      "Authority that shortens sales cycles",
      "SEO-optimized content that ranks",
      "Evergreen assets with long ROI",
      "Consistent pipeline from inbound",
    ],
    features: [
      "Content strategy & editorial calendar",
      "SEO blog writing & publishing",
      "Ebooks, whitepapers & case studies",
      "Content distribution & repurposing",
      "Conversion copywriting (CTAs, landing pages)",
    ],
    deliverables: [
      "Editorial calendar & strategy",
      "Published, SEO-optimized articles",
      "Lead magnets & landing copy",
      "Quarterly performance reviews",
    ],
    priceStarting: 12999,
    currency: "INR",
    estimatedTimeline: "Monthly engagement",
    process: processFor("Content Marketing"),
    seo: {
      title: "Content Marketing Services",
      description:
        "Blogs, ebooks and thought leadership that build authority and generate leads. Content marketing by Pikzelkraft.",
    },
  },
  {
    slug: "email-marketing",
    name: "Email Marketing",
    icon: "email-marketing",
    shortDescription:
      "Automated email journeys that nurture leads and recover revenue — with deliverability you can trust.",
    longDescription:
      "Email still returns the highest ROI of any channel. We build subscriber growth systems, lifecycle automations and campaigns that land in the inbox — not spam — and turn your list into a predictable revenue channel.",
    benefits: [
      "High ROI with predictable revenue",
      "Automated journeys that save time",
      "Inbox-friendly deliverability",
      "Segmented, personal messaging",
    ],
    features: [
      "Email strategy & audience segmentation",
      "Lifecycle & drip automations",
      "Campaign design & copywriting",
      "Deliverability & spam-score optimization",
      "A/B testing & performance analytics",
    ],
    deliverables: [
      "Campaign & automation setup",
      "Designed email templates",
      "Segment & flow architecture",
      "Monthly deliverability reports",
    ],
    priceStarting: 9999,
    currency: "INR",
    estimatedTimeline: "Monthly engagement",
    process: processFor("Email Marketing"),
    seo: {
      title: "Email Marketing Services",
      description:
        "Automated email journeys, campaigns and deliverability that turn subscribers into revenue. Email marketing by Pikzelkraft.",
    },
  },
  {
    slug: "ppc-advertising",
    name: "PPC Advertising",
    icon: "ppc-advertising",
    shortDescription:
      "Google Ads and Meta campaigns engineered for measurable ROI from day one.",
    longDescription:
      "We turn ad spend into revenue. Our PPC specialists build structured campaigns across Google, Meta and LinkedIn — with airtight tracking, relentless testing and weekly optimization that keeps cost-per-acquisition falling.",
    benefits: [
      "Measurable ROI from the first month",
      "Full-funnel campaign architecture",
      "Precise tracking & attribution",
      "Weekly optimization & transparent spend",
    ],
    features: [
      "Google Ads (Search, Shopping, Display)",
      "Meta & LinkedIn paid campaigns",
      "Keyword & audience research",
      "Landing page conversion optimization",
      "A/B testing & bid management",
    ],
    deliverables: [
      "Campaign structure & ad copy",
      "Conversion tracking installed",
      "Weekly optimization log",
      "Monthly ROI dashboard",
    ],
    priceStarting: 19999,
    currency: "INR",
    estimatedTimeline: "Monthly engagement",
    process: processFor("PPC Advertising"),
    seo: {
      title: "PPC Advertising Services",
      description:
        "Google, Meta and LinkedIn ad campaigns engineered for measurable ROI. PPC management by Pikzelkraft.",
    },
  },
  {
    slug: "branding-design",
    name: "Branding & Design",
    icon: "branding-design",
    shortDescription:
      "Identity systems, logos and brand guidelines that make you unforgettable.",
    longDescription:
      "Your brand is a promise. We craft identity systems — logo, color, typography, voice and guidelines — that communicate your value at a glance and stay consistent across every touchpoint, from your website to your packaging.",
    benefits: [
      "A distinctive, ownable identity",
      "Complete brand guidelines for your team",
      "Consistency across all touchpoints",
      "Premium perception that justifies pricing",
    ],
    features: [
      "Logo & brand mark design",
      "Color, typography & brand voice",
      "Brand guidelines document",
      "Stationery & collateral design",
      "Brand refresh & repositioning",
    ],
    deliverables: [
      "Logo suite & source files",
      "Brand identity system",
      "Brand guidelines PDF",
      "Marketing collateral templates",
    ],
    priceStarting: 39999,
    currency: "INR",
    estimatedTimeline: "3–5 weeks",
    process: processFor("Branding & Design"),
    seo: {
      title: "Branding & Design Services",
      description:
        "Logos, identity systems and brand guidelines that make your business unforgettable. Branding by Pikzelkraft.",
    },
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    icon: "ui-ux-design",
    shortDescription:
      "Research-driven product design that feels effortless and converts.",
    longDescription:
      "Great products feel obvious. We combine user research, information architecture and interface design to build experiences users love — validated with prototypes and tests before a single line of code.",
    benefits: [
      "Design validated before development",
      "Higher engagement & conversion",
      "Consistent, scalable design systems",
      "Faster handoff with dev-ready files",
    ],
    features: [
      "User research & persona development",
      "Wireframes & user flows",
      "High-fidelity UI design",
      "Interactive prototyping & testing",
      "Design systems & component libraries",
    ],
    deliverables: [
      "User flows & wireframes",
      "High-fidelity UI screens",
      "Interactive prototype",
      "Handoff-ready design system",
    ],
    priceStarting: 49999,
    currency: "INR",
    estimatedTimeline: "4–6 weeks",
    process: processFor("UI/UX Design"),
    seo: {
      title: "UI/UX Design Services",
      description:
        "Research-driven, conversion-focused product design by Pikzelkraft. Wireframes, UI, prototypes and design systems.",
    },
  },
  {
    slug: "video-production",
    name: "Video Production",
    icon: "video-production",
    shortDescription:
      "Promos, product demos and motion graphics that stop the scroll.",
    longDescription:
      "Video is the most persuasive medium on the internet. From concept to final cut, we produce brand films, product demos, explainers and motion graphics engineered for the platforms your audience actually watches.",
    benefits: [
      "Story-first scripts that sell",
      "Platform-native formats (reels, shorts)",
      "Motion graphics & animation in-house",
      "Performance tracking of every asset",
    ],
    features: [
      "Scriptwriting & storyboarding",
      "Promo, product & explainer videos",
      "Motion graphics & 2D animation",
      "Social-first editing & captions",
      "Studio & on-location production",
    ],
    deliverables: [
      "Finished videos (multiple formats)",
      "Raw footage & assets",
      "Thumbnails & social cuts",
      "Usage & performance guide",
    ],
    priceStarting: 29999,
    currency: "INR",
    estimatedTimeline: "2–4 weeks",
    process: processFor("Video Production"),
    seo: {
      title: "Video Production Services",
      description:
        "Promos, product demos, explainers and motion graphics that stop the scroll. Video production by Pikzelkraft.",
    },
  },
  {
    slug: "digital-strategy",
    name: "Digital Strategy",
    icon: "digital-strategy",
    shortDescription:
      "A data-driven roadmap that aligns every channel with your business goals.",
    longDescription:
      "Marketing without strategy is noise. We build a single source of truth — audience, positioning, channel mix, budget and KPIs — that aligns your whole team and ensures every rupee is spent where it returns.",
    benefits: [
      "One roadmap across all channels",
      "Budget allocated by ROI potential",
      "Clear KPIs everyone owns",
      "Quarterly reviews that keep you on track",
    ],
    features: [
      "Market & competitor analysis",
      "Audience & positioning strategy",
      "Channel mix & budget planning",
      "KPI framework & dashboards",
      "Quarterly strategy reviews",
    ],
    deliverables: [
      "Digital strategy document",
      "Channel & budget plan",
      "KPI dashboard",
      "Quarterly roadmap updates",
    ],
    priceStarting: 24999,
    currency: "INR",
    estimatedTimeline: "One-time + reviews",
    process: processFor("Digital Strategy"),
    seo: {
      title: "Digital Strategy Services",
      description:
        "A data-driven roadmap that aligns every channel with your business goals. Digital strategy by Pikzelkraft.",
    },
  },
  {
    slug: "ecommerce-development",
    name: "E-commerce Development",
    icon: "ecommerce-development",
    shortDescription:
      "Online stores built for conversion — with payments, inventory and analytics wired up.",
    longDescription:
      "We build online stores that sell while you sleep. From Shopify to custom storefronts, we handle design, development, payment gateways, inventory and analytics — engineered around one goal: turning visits into orders.",
    benefits: [
      "Conversion-optimized storefronts",
      "Indian & global payment gateways",
      "Inventory, shipping & tax automation",
      "Scale-ready architecture",
    ],
    features: [
      "Shopify / custom storefront builds",
      "Payment gateway integration (Razorpay & more)",
      "Product, inventory & order management",
      "Speed & Core Web Vitals optimization",
      "Analytics, abandoned-cart & email flows",
    ],
    deliverables: [
      "Live, production-ready store",
      "Payment & shipping configured",
      "Admin training & documentation",
      "30-day post-launch support",
    ],
    priceStarting: 59999,
    currency: "INR",
    estimatedTimeline: "5–8 weeks",
    process: processFor("E-commerce Development"),
    seo: {
      title: "E-commerce Development Services",
      description:
        "Online stores built for conversion with payments, inventory and analytics wired up. E-commerce by Pikzelkraft.",
    },
  },
  {
    slug: "cloud-devops",
    name: "Cloud & DevOps",
    icon: "cloud-devops",
    shortDescription:
      "Reliable infrastructure, CI/CD pipelines and cloud cost optimization.",
    longDescription:
      "We ship your software on infrastructure that never sleeps. From AWS, GCP and Azure architecture to automated CI/CD pipelines, monitoring and cost optimization — we make your releases faster and your platform more reliable.",
    benefits: [
      "Deployments in minutes, not days",
      "99.9%+ uptime with monitoring",
      "Cloud spend reduced up to 40%",
      "Security-hardened by default",
    ],
    features: [
      "Cloud architecture & migration",
      "CI/CD pipeline setup",
      "Containerization (Docker, Kubernetes)",
      "Monitoring, logging & alerting",
      "Cost optimization & FinOps",
    ],
    deliverables: [
      "Cloud infrastructure as code",
      "Automated pipelines",
      "Monitoring & alerting setup",
      "Architecture documentation",
    ],
    priceStarting: 74999,
    currency: "INR",
    estimatedTimeline: "4–8 weeks",
    process: processFor("Cloud & DevOps"),
    seo: {
      title: "Cloud & DevOps Services",
      description:
        "Reliable infrastructure, CI/CD pipelines and cloud cost optimization. Cloud and DevOps by Pikzelkraft.",
    },
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    icon: "cybersecurity",
    shortDescription:
      "Hardened applications, audits and compliance that protect your reputation.",
    longDescription:
      "A breach is the fastest way to lose customer trust. We audit, harden and monitor your applications and infrastructure — implementing security best practices, vulnerability management and compliance readiness so you can focus on growth.",
    benefits: [
      "Proactive risk reduction",
      "Compliance-ready posture",
      "24/7 monitoring & response",
      "Peace of mind for clients & investors",
    ],
    features: [
      "Security audits & penetration testing",
      "Application hardening & patching",
      "Access control & identity management",
      "Compliance support (ISO, SOC 2, GDPR)",
      "Incident response planning",
    ],
    deliverables: [
      "Security audit report",
      "Remediation roadmap",
      "Hardened infrastructure",
      "Policies & incident runbooks",
    ],
    priceStarting: 84999,
    currency: "INR",
    estimatedTimeline: "3–6 weeks",
    process: processFor("Cybersecurity"),
    seo: {
      title: "Cybersecurity Services",
      description:
        "Hardened applications, audits and compliance that protect your reputation. Cybersecurity by Pikzelkraft.",
    },
  },
  {
    slug: "ai-automation",
    name: "AI & Automation",
    icon: "ai-automation",
    shortDescription:
      "Custom AI assistants, chatbots and workflow automation that cut costs.",
    longDescription:
      "Stop doing the work machines can do. We design and deploy AI solutions — chatbots, document processing, predictive analytics and workflow automation — that remove repetitive work and unlock insights from your data.",
    benefits: [
      "Hours saved every single week",
      "Faster, data-informed decisions",
      "Always-on customer support",
      "Scalable without adding headcount",
    ],
    features: [
      "Custom AI chatbots & assistants",
      "Workflow automation (Zapier, n8n, custom)",
      "Document processing & extraction",
      "Predictive analytics & dashboards",
      "LLM integration & fine-tuning",
    ],
    deliverables: [
      "Deployed AI solution",
      "Automation workflows & documentation",
      "Admin / usage training",
      "30-day optimization window",
    ],
    priceStarting: 99999,
    currency: "INR",
    estimatedTimeline: "4–8 weeks",
    process: processFor("AI & Automation"),
    seo: {
      title: "AI & Automation Services",
      description:
        "Custom AI assistants, chatbots and workflow automation that cut costs. AI and automation by Pikzelkraft.",
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
