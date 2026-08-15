export type ProjectStatus = "active" | "completed" | "on_hold";
export type MilestoneStatus = "completed" | "active" | "upcoming";
export type PaymentStatus = "paid" | "pending" | "overdue";
export type TicketStatus = "open" | "in_progress" | "resolved";
export type TicketPriority = "low" | "medium" | "high" | "urgent";
export type NotificationType = "project" | "payment" | "ticket" | "system" | "milestone";
export type ActivityType = "project" | "payment" | "ticket" | "file" | "milestone";

export interface Milestone {
  id: string;
  name: string;
  dueDate: string;
  status: MilestoneStatus;
}

export interface ProjectFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
}

export interface Comment {
  id: string;
  author: string;
  authorRole?: string;
  avatarUrl?: string;
  body: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  company: string;
  service: string;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
  startedAt: string;
  budget: string;
  description: string;
  milestones: Milestone[];
  files: ProjectFile[];
  comments: Comment[];
}

export interface Payment {
  id: string;
  invoiceNo: string;
  description: string;
  date: string;
  amount: number;
  status: PaymentStatus;
  dueDate?: string;
}

export interface TicketReply {
  id: string;
  author: string;
  authorRole?: string;
  body: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  subject: string;
  category: string;
  status: TicketStatus;
  priority: TicketPriority;
  lastUpdated: string;
  description: string;
  replies: TicketReply[];
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  time: string;
}

export interface DashboardStats {
  activeProjects: number;
  completedProjects: number;
  pendingPayments: number;
  openTickets: number;
  totalPaid: number;
  outstanding: number;
  nextDue?: Payment;
}

export const projects: Project[] = [
  {
    id: "prj-nova-cafe",
    title: "Nova Café Website Revamp",
    client: "Aarav Kapoor",
    company: "Nova Café",
    service: "Web Development",
    status: "active",
    progress: 72,
    dueDate: "2026-09-18",
    startedAt: "2026-06-02",
    budget: "₹1,85,000",
    description:
      "Complete redesign of the Nova Café website with online ordering, reservation system, and a gallery-driven menu experience.",
    milestones: [
      { id: "m1", name: "Discovery & brand direction", dueDate: "2026-06-12", status: "completed" },
      { id: "m2", name: "Design system & mockups", dueDate: "2026-07-05", status: "completed" },
      { id: "m3", name: "Frontend development", dueDate: "2026-08-20", status: "active" },
      { id: "m4", name: "CMS integration & content", dueDate: "2026-09-05", status: "upcoming" },
      { id: "m5", name: "Launch & QA", dueDate: "2026-09-18", status: "upcoming" },
    ],
    files: [
      { id: "f1", name: "nova-brand-guidelines.pdf", type: "application/pdf", size: "4.2 MB", uploadedAt: "2026-06-14" },
      { id: "f2", name: "homepage-mockup-v3.png", type: "image/png", size: "2.8 MB", uploadedAt: "2026-07-02" },
      { id: "f3", name: "menu-content.docx", type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", size: "1.1 MB", uploadedAt: "2026-07-18" },
    ],
    comments: [
      { id: "c1", author: "Pikzelkraft Team", authorRole: "Design", body: "Shared the latest homepage mockup. Love the warm palette you suggested!", createdAt: "2026-08-10T09:30:00Z" },
      { id: "c2", author: "Aarav Kapoor", authorRole: "Client", body: "The reservation flow looks great. Can we move the photo gallery higher?", createdAt: "2026-08-12T14:05:00Z" },
    ],
  },
  {
    id: "prj-orbit-fitness",
    title: "Orbit Fitness Brand Campaign",
    client: "Meera Nair",
    company: "Orbit Fitness",
    service: "Digital Marketing",
    status: "active",
    progress: 45,
    dueDate: "2026-10-10",
    startedAt: "2026-07-01",
    budget: "₹2,40,000",
    description:
      "A 90-day performance marketing and social campaign to drive membership sign-ups across Bengaluru locations.",
    milestones: [
      { id: "m1", name: "Audience research & positioning", dueDate: "2026-07-15", status: "completed" },
      { id: "m2", name: "Creative assets", dueDate: "2026-08-10", status: "completed" },
      { id: "m3", name: "Campaign launch", dueDate: "2026-08-25", status: "active" },
      { id: "m4", name: "Optimisation & reporting", dueDate: "2026-10-10", status: "upcoming" },
    ],
    files: [
      { id: "f1", name: "audience-research.pdf", type: "application/pdf", size: "3.5 MB", uploadedAt: "2026-07-16" },
      { id: "f2", name: "social-creative-pack.zip", type: "application/zip", size: "18.4 MB", uploadedAt: "2026-08-11" },
    ],
    comments: [
      { id: "c1", author: "Meera Nair", authorRole: "Client", body: "Weekly numbers are looking strong. Great momentum!", createdAt: "2026-08-14T08:15:00Z" },
    ],
  },
  {
    id: "prj-luxe-interiors",
    title: "Luxe Interiors SEO & Content",
    client: "Rohan Mehta",
    company: "Luxe Interiors",
    service: "SEO",
    status: "on_hold",
    progress: 60,
    dueDate: "2026-11-30",
    startedAt: "2026-05-20",
    budget: "₹1,60,000",
    description:
      "Technical SEO audit and an ongoing content programme to rank for high-intent interior design keywords.",
    milestones: [
      { id: "m1", name: "Technical audit & fixes", dueDate: "2026-06-20", status: "completed" },
      { id: "m2", name: "Keyword strategy", dueDate: "2026-07-15", status: "completed" },
      { id: "m3", name: "Content production", dueDate: "2026-09-10", status: "active" },
      { id: "m4", name: "Link building & reporting", dueDate: "2026-11-30", status: "upcoming" },
    ],
    files: [
      { id: "f1", name: "seo-audit-report.pdf", type: "application/pdf", size: "5.6 MB", uploadedAt: "2026-06-21" },
    ],
    comments: [
      { id: "c1", author: "Rohan Mehta", authorRole: "Client", body: "Pausing content reviews until we finalise the new showroom launch dates.", createdAt: "2026-08-02T11:00:00Z" },
    ],
  },
  {
    id: "prj-technest-app",
    title: "TechNest Mobile App",
    client: "Priya Sharma",
    company: "TechNest Solutions",
    service: "Custom Software",
    status: "active",
    progress: 88,
    dueDate: "2026-08-28",
    startedAt: "2026-03-15",
    budget: "₹4,50,000",
    description:
      "Cross-platform mobile app for field service technicians with offline mode, job scheduling, and invoicing.",
    milestones: [
      { id: "m1", name: "Requirements & architecture", dueDate: "2026-04-10", status: "completed" },
      { id: "m2", name: "UI build", dueDate: "2026-05-25", status: "completed" },
      { id: "m3", name: "Core modules", dueDate: "2026-07-10", status: "completed" },
      { id: "m4", name: "Integration & offline sync", dueDate: "2026-08-15", status: "active" },
      { id: "m5", name: "Store submission", dueDate: "2026-08-28", status: "upcoming" },
    ],
    files: [
      { id: "f1", name: "app-architecture.pdf", type: "application/pdf", size: "2.1 MB", uploadedAt: "2026-04-11" },
      { id: "f2", name: "test-plan-v2.pdf", type: "application/pdf", size: "1.4 MB", uploadedAt: "2026-07-22" },
    ],
    comments: [
      { id: "c1", author: "Pikzelkraft Team", authorRole: "Engineering", body: "Offline sync is in beta. We'll send a TestFlight build today.", createdAt: "2026-08-13T16:40:00Z" },
    ],
  },
  {
    id: "prj-bloom-boutique",
    title: "Bloom Boutique E-commerce",
    client: "Sana Khan",
    company: "Bloom Boutique",
    service: "Web Development",
    status: "completed",
    progress: 100,
    dueDate: "2026-07-25",
    startedAt: "2026-02-10",
    budget: "₹3,20,000",
    description:
      "Custom storefront with WhatsApp ordering, COD validation, and a low-code dashboard for the boutique team.",
    milestones: [
      { id: "m1", name: "Design & prototyping", dueDate: "2026-03-15", status: "completed" },
      { id: "m2", name: "Storefront build", dueDate: "2026-05-10", status: "completed" },
      { id: "m3", name: "Payments & WhatsApp integration", dueDate: "2026-06-20", status: "completed" },
      { id: "m4", name: "Training & launch", dueDate: "2026-07-25", status: "completed" },
    ],
    files: [
      { id: "f1", name: "store-launch-checklist.pdf", type: "application/pdf", size: "820 KB", uploadedAt: "2026-07-20" },
      { id: "f2", name: "product-csv-template.csv", type: "text/csv", size: "240 KB", uploadedAt: "2026-07-22" },
    ],
    comments: [
      { id: "c1", author: "Sana Khan", authorRole: "Client", body: "Store is live and orders are coming in. Thank you!", createdAt: "2026-07-26T10:00:00Z" },
    ],
  },
  {
    id: "prj-summit-realty",
    title: "Summit Realty Marketing",
    client: "Vikram Iyer",
    company: "Summit Realty",
    service: "Social Media",
    status: "active",
    progress: 30,
    dueDate: "2026-12-15",
    startedAt: "2026-08-01",
    budget: "₹1,95,000",
    description:
      "Always-on social media management for a new premium residential project, including video tours and lead generation.",
    milestones: [
      { id: "m1", name: "Brand & content calendar", dueDate: "2026-08-20", status: "active" },
      { id: "m2", name: "Launch campaign", dueDate: "2026-09-30", status: "upcoming" },
      { id: "m3", name: "Lead gen & retargeting", dueDate: "2026-12-15", status: "upcoming" },
    ],
    files: [],
    comments: [],
  },
];

export const payments: Payment[] = [
  {
    id: "pay-01",
    invoiceNo: "INV-2026-0141",
    description: "Nova Café — milestone 2 (Design system)",
    date: "2026-07-05",
    amount: 55000,
    status: "paid",
  },
  {
    id: "pay-02",
    invoiceNo: "INV-2026-0158",
    description: "Orbit Fitness — campaign retainer (Aug)",
    date: "2026-08-05",
    amount: 80000,
    status: "pending",
    dueDate: "2026-08-20",
  },
  {
    id: "pay-03",
    invoiceNo: "INV-2026-0122",
    description: "Luxe Interiors — SEO retainers (Jun)",
    date: "2026-06-30",
    amount: 40000,
    status: "paid",
  },
  {
    id: "pay-04",
    invoiceNo: "INV-2026-0133",
    description: "TechNest — milestone 3 (Core modules)",
    date: "2026-07-15",
    amount: 150000,
    status: "paid",
  },
  {
    id: "pay-05",
    invoiceNo: "INV-2026-0159",
    description: "Bloom Boutique — final settlement",
    date: "2026-07-25",
    amount: 96000,
    status: "paid",
  },
  {
    id: "pay-06",
    invoiceNo: "INV-2026-0147",
    description: "Nova Café — milestone 1 (Discovery)",
    date: "2026-06-12",
    amount: 45000,
    status: "paid",
  },
  {
    id: "pay-07",
    invoiceNo: "INV-2026-0116",
    description: "Summit Realty — project onboarding",
    date: "2026-05-10",
    amount: 60000,
    status: "overdue",
    dueDate: "2026-05-25",
  },
  {
    id: "pay-08",
    invoiceNo: "INV-2026-0160",
    description: "TechNest — milestone 4 (Integration)",
    date: "2026-08-15",
    amount: 120000,
    status: "pending",
    dueDate: "2026-08-30",
  },
  {
    id: "pay-09",
    invoiceNo: "INV-2026-0149",
    description: "Orbit Fitness — creative assets",
    date: "2026-07-20",
    amount: 60000,
    status: "paid",
  },
  {
    id: "pay-10",
    invoiceNo: "INV-2026-0161",
    description: "Luxe Interiors — SEO retainers (Aug)",
    date: "2026-08-01",
    amount: 40000,
    status: "overdue",
    dueDate: "2026-08-10",
  },
];

export const tickets: Ticket[] = [
  {
    id: "tkt-001",
    subject: "Can't receive OTP on new number",
    category: "Account",
    status: "in_progress",
    priority: "high",
    lastUpdated: "2026-08-14T09:20:00Z",
    description: "I updated my phone number but the OTP doesn't arrive when logging in.",
    replies: [
      { id: "r1", author: "You", body: "I updated my phone number but the OTP doesn't arrive when logging in.", createdAt: "2026-08-13T18:40:00Z" },
      { id: "r2", author: "Pikzelkraft Support", authorRole: "Support", body: "Hi! This is a known issue with a few carriers. Could you try requesting the OTP again while on Wi-Fi?", createdAt: "2026-08-14T09:20:00Z" },
    ],
  },
  {
    id: "tkt-002",
    subject: "Need help exporting campaign reports",
    category: "Reporting",
    status: "open",
    priority: "medium",
    lastUpdated: "2026-08-13T11:05:00Z",
    description: "The CSV export button in campaign reporting is greyed out.",
    replies: [
      { id: "r1", author: "You", body: "The CSV export button in campaign reporting is greyed out for me.", createdAt: "2026-08-13T11:05:00Z" },
    ],
  },
  {
    id: "tkt-003",
    subject: "Request: add GST details to invoices",
    category: "Billing",
    status: "resolved",
    priority: "low",
    lastUpdated: "2026-08-10T13:45:00Z",
    description: "Please add GSTIN to future invoices so our finance team can reconcile.",
    replies: [
      { id: "r1", author: "You", body: "Please add GSTIN to future invoices so our finance team can reconcile.", createdAt: "2026-08-09T08:00:00Z" },
      { id: "r2", author: "Pikzelkraft Support", authorRole: "Support", body: "Done! GST details now appear on all invoices generated from today.", createdAt: "2026-08-10T13:45:00Z" },
    ],
  },
  {
    id: "tkt-004",
    subject: "Access to staging environment",
    category: "Access",
    status: "in_progress",
    priority: "urgent",
    lastUpdated: "2026-08-15T07:30:00Z",
    description: "Our dev team needs read access to the staging environment to verify the latest build.",
    replies: [
      { id: "r1", author: "You", body: "Our dev team needs read access to the staging environment to verify the latest build.", createdAt: "2026-08-15T07:30:00Z" },
    ],
  },
  {
    id: "tkt-005",
    subject: "Suggest a new feature: dark mode",
    category: "Feature Request",
    status: "open",
    priority: "low",
    lastUpdated: "2026-08-12T16:20:00Z",
    description: "Would love a dark mode option for the client dashboard.",
    replies: [
      { id: "r1", author: "You", body: "Would love a dark mode option for the client dashboard.", createdAt: "2026-08-12T16:20:00Z" },
    ],
  },
];

export const notifications: Notification[] = [
  {
    id: "ntf-01",
    type: "milestone",
    title: "Milestone due soon",
    body: "Nova Café 'Frontend development' milestone is due on 20 Aug.",
    time: "2026-08-15T07:45:00Z",
    read: false,
  },
  {
    id: "ntf-02",
    type: "payment",
    title: "Invoice INV-2026-0158 is pending",
    body: "Your Orbit Fitness retainer invoice of ₹80,000 is awaiting payment.",
    time: "2026-08-14T10:00:00Z",
    read: false,
  },
  {
    id: "ntf-03",
    type: "ticket",
    title: "Support replied to your ticket",
    body: "Pikzelkraft Support responded on 'Can't receive OTP on new number'.",
    time: "2026-08-14T09:20:00Z",
    read: false,
  },
  {
    id: "ntf-04",
    type: "project",
    title: "New files uploaded",
    body: "Orbit Fitness shared 'social-creative-pack.zip' with you.",
    time: "2026-08-11T13:30:00Z",
    read: true,
  },
  {
    id: "ntf-05",
    type: "payment",
    title: "Payment received",
    body: "We received ₹96,000 for invoice INV-2026-0159 (Bloom Boutique).",
    time: "2026-08-05T15:15:00Z",
    read: true,
  },
  {
    id: "ntf-06",
    type: "project",
    title: "Project on hold",
    body: "Luxe Interiors was marked on hold until showroom launch details are finalised.",
    time: "2026-08-02T11:00:00Z",
    read: true,
  },
  {
    id: "ntf-07",
    type: "ticket",
    title: "Ticket resolved",
    body: "Your request 'Add GST details to invoices' has been marked resolved.",
    time: "2026-08-10T13:45:00Z",
    read: true,
  },
  {
    id: "ntf-08",
    type: "system",
    title: "New update available",
    body: "The client dashboard now includes a new project requests page.",
    time: "2026-08-09T09:00:00Z",
    read: true,
  },
  {
    id: "ntf-09",
    type: "milestone",
    title: "Milestone completed",
    body: "TechNest 'Core modules' milestone was completed on 10 Aug.",
    time: "2026-08-10T18:00:00Z",
    read: true,
  },
];

export const activity: ActivityItem[] = [
  {
    id: "act-01",
    type: "milestone",
    title: "Milestone completed",
    description: "TechNest 'Core modules' milestone marked as complete.",
    time: "2026-08-10T18:00:00Z",
  },
  {
    id: "act-02",
    type: "payment",
    title: "Payment received",
    description: "₹96,000 received for invoice INV-2026-0159.",
    time: "2026-08-05T15:15:00Z",
  },
  {
    id: "act-03",
    type: "file",
    title: "New files uploaded",
    description: "Orbit Fitness shared the social creative asset pack.",
    time: "2026-08-11T13:30:00Z",
  },
  {
    id: "act-04",
    type: "project",
    title: "Project status changed",
    description: "Luxe Interiors was placed on hold.",
    time: "2026-08-02T11:00:00Z",
  },
  {
    id: "act-05",
    type: "ticket",
    title: "Support ticket replied",
    description: "Support responded to 'Can't receive OTP on new number'.",
    time: "2026-08-14T09:20:00Z",
  },
  {
    id: "act-06",
    type: "project",
    title: "Project launched",
    description: "Bloom Boutique e-commerce store went live.",
    time: "2026-07-25T10:00:00Z",
  },
  {
    id: "act-07",
    type: "milestone",
    title: "Milestone started",
    description: "Summit Realty 'Brand & content calendar' is now in progress.",
    time: "2026-08-01T09:00:00Z",
  },
];
