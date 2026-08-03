export type FaqCategory = {
  id: string;
  label: string;
};

export type FaqItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

export const faqCategories: FaqCategory[] = [
  { id: "general", label: "General" },
  { id: "services", label: "Services" },
  { id: "pricing", label: "Pricing & Payment" },
  { id: "support", label: "Support & Delivery" },
];

export const faqItems: FaqItem[] = [
  {
    id: "g1",
    category: "general",
    question: "Who is Pikzelkraft?",
    answer:
      "Pikzelkraft is a digital marketing and IT solutions company. We design and engineer websites, apps, brands and marketing engines that help ambitious businesses grow — with a premium, pixel-perfect standard of craft.",
  },
  {
    id: "g2",
    category: "general",
    question: "Do you work with small businesses or only enterprises?",
    answer:
      "Both. Our packages range from a focused Launch Pad for startups to enterprise-grade engagements. We scope every project to your stage, goals and budget — not your company size.",
  },
  {
    id: "g3",
    category: "general",
    question: "Where is your team located and do you work remotely?",
    answer:
      "We're headquartered in Bengaluru, India, and work with clients across India, the Middle East, the US and the UK. Everything runs through scheduled calls, shared project boards and transparent progress reports — time zones rarely get in the way.",
  },
  {
    id: "g4",
    category: "general",
    question: "How quickly can we expect a proposal?",
    answer:
      "After an initial discovery call, you'll receive a tailored proposal within 2–3 business days, including scope, timeline, deliverables and a fixed or estimated budget.",
  },
  {
    id: "s1",
    category: "services",
    question: "What services does Pikzelkraft offer?",
    answer:
      "We cover the full digital spectrum: web and mobile app development, e-commerce, UI/UX design, branding, SEO, content marketing, social media, PPC, email marketing, video production, digital strategy, cloud & DevOps, cybersecurity and AI automation.",
  },
  {
    id: "s2",
    category: "services",
    question: "Do you provide website hosting and domain setup?",
    answer:
      "Yes. With every development package we help you configure hosting, domain and email. We recommend reliable, cost-efficient providers and can manage everything on your behalf.",
  },
  {
    id: "s3",
    category: "services",
    question: "Can you take over an existing website or campaign?",
    answer:
      "Absolutely. We start with a full audit of your current website, ads or social presence, then take over with a clear plan to improve performance from day one.",
  },
  {
    id: "s4",
    category: "services",
    question: "Do you offer ongoing maintenance after launch?",
    answer:
      "Yes — every project ships with a post-launch support window, and most clients continue with a monthly care plan for updates, backups, security patches and performance monitoring.",
  },
  {
    id: "p1",
    category: "pricing",
    question: "How much does a website cost?",
    answer:
      "A custom marketing website starts around ₹49,999, e-commerce stores around ₹59,999 and web applications are scoped individually. Final pricing depends on complexity, features and timeline — you'll get an exact quote in your proposal.",
  },
  {
    id: "p2",
    category: "pricing",
    question: "What do your monthly marketing packages include?",
    answer:
      "Packages bundle strategy, execution and reporting — for example Growth Sprint includes content, ads, email and social management plus a monthly strategy call. Every package includes transparent reporting so you see exactly where your budget goes.",
  },
  {
    id: "p3",
    category: "pricing",
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfer, UPI, Razorpay and major credit/debit cards. For larger projects we typically take an advance and milestone payments, so you only pay for completed, approved work.",
  },
  {
    id: "p4",
    category: "pricing",
    question: "Do you require a long-term contract?",
    answer:
      "No. Monthly engagements run on a rolling basis with a simple 15-day notice period, and project work is scoped with clear milestones. We keep clients because we deliver results, not because we lock them in.",
  },
  {
    id: "p5",
    category: "pricing",
    question: "Can I cancel a monthly package anytime?",
    answer:
      "Yes. Rolling packages can be cancelled with 15 days' notice. We'll hand over all work produced during your engagement, including content and analytics access.",
  },
  {
    id: "su1",
    category: "support",
    question: "How do you keep me updated during a project?",
    answer:
      "You'll get a dedicated project dashboard with milestones, a shared Slack/WhatsApp channel for quick updates, and a weekly or bi-weekly progress call depending on the package.",
  },
  {
    id: "su2",
    category: "support",
    question: "What happens if I'm not happy with the work?",
    answer:
      "We build in revision rounds at every milestone so you approve work before we move forward. If something isn't right, we fix it within the agreed revision scope — no drama, no friction.",
  },
  {
    id: "su3",
    category: "support",
    question: "Who owns the final files and source code?",
    answer:
      "You do. Once final payment is cleared, you own everything — source code, designs, content and accounts. We can also provide training so your team can manage things independently.",
  },
  {
    id: "su4",
    category: "support",
    question: "What is your typical response time for support?",
    answer:
      "For active engagements, critical issues are acknowledged within 4 business hours. Standard requests are handled within 1 business day, and our support SLA details are included with every care plan.",
  },
  {
    id: "su5",
    category: "support",
    question: "Do you provide training for my team?",
    answer:
      "Yes. Every build includes an admin training session, and we provide documentation and Loom walkthroughs so your team can publish content and manage the platform confidently.",
  },
];
