import {
  services as seedServices,
  type Service,
} from "./services";
import {
  portfolioItems as seedPortfolio,
  type PortfolioItem,
} from "./portfolio";
import {
  pricingPackages as seedPackages,
  individualPricing as seedIndividualPricing,
  type PricingPackage,
  type IndividualPricing,
} from "./pricing";
import { faqItems, faqCategories as seedFaqCategories } from "./faqs";

/* ============================================================
   Admin entity types
   ============================================================ */

export type ClientStatus = "active" | "inactive" | "lead";

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  joinedDate: string;
  status: ClientStatus;
  location: string;
  totalSpent: number;
  activeProjects: number;
  notes: string;
}

export type LeadStatus = "new" | "read" | "replied" | "accepted" | "rejected";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  service: string;
  message: string;
  status: LeadStatus;
  notes: string;
  createdAt: string;
}

export type AdminProjectStatus = "planning" | "in-progress" | "review" | "completed" | "on-hold";
export type AdminMilestoneStatus = "pending" | "in-progress" | "completed";

export interface AdminMilestone {
  id: string;
  name: string;
  dueDate: string;
  status: AdminMilestoneStatus;
}

export interface AdminProjectFile {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
}

export interface AdminProject {
  id: string;
  title: string;
  clientId: string;
  service: string;
  status: AdminProjectStatus;
  progress: number;
  budget: number;
  startDate: string;
  dueDate: string;
  description: string;
  milestones: AdminMilestone[];
  files: AdminProjectFile[];
}

export type AdminPaymentStatus = "paid" | "pending" | "partial" | "overdue";

export interface AdminPayment {
  id: string;
  invoiceNo: string;
  clientId: string;
  description: string;
  date: string;
  amount: number;
  status: AdminPaymentStatus;
  method: string;
  dueDate?: string;
}

export type AdminTicketStatus = "open" | "in-progress" | "resolved" | "closed";
export type AdminTicketPriority = "low" | "medium" | "high" | "urgent";

export interface AdminTicketReply {
  id: string;
  author: string;
  authorRole?: string;
  body: string;
  createdAt: string;
}

export interface AdminTicket {
  id: string;
  subject: string;
  clientId: string;
  category: string;
  status: AdminTicketStatus;
  priority: AdminTicketPriority;
  createdAt: string;
  lastUpdated: string;
  description: string;
  replies: AdminTicketReply[];
}

export interface FaqAdminItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  order: number;
}

export interface SiteContent {
  hero: {
    eyebrow: string;
    title: string;
    gradientTitle: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    trustLine: string;
  };
  stats: { label: string; value: number; suffix: string }[];
  about: {
    title: string;
    intro: string;
    story: string[];
    mission: string;
    vision: string;
    values: string[];
  };
}

export interface RevenuePoint {
  month: string;
  revenue: number;
}

export interface AcquisitionPoint {
  month: string;
  clients: number;
}

export interface Analytics {
  revenueSeries: RevenuePoint[];
  acquisitionSeries: AcquisitionPoint[];
}

export interface AdminNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  tone: "info" | "success" | "warning" | "error";
}

/* ============================================================
   Seed data
   ============================================================ */

export const seedClients: Client[] = [
  { id: "clt-01", name: "Aarav Kapoor", company: "Nova Café", email: "aarav@novacafe.in", phone: "+91 98111 22233", joinedDate: "2026-06-02", status: "active", location: "Bengaluru", totalSpent: 230000, activeProjects: 1, notes: "Prefers weekly sync on Monday mornings." },
  { id: "clt-02", name: "Meera Nair", company: "Orbit Fitness", email: "meera@orbitfitness.in", phone: "+91 98222 33445", joinedDate: "2026-07-01", status: "active", location: "Bengaluru", totalSpent: 200000, activeProjects: 1, notes: "Interested in adding a mobile app." },
  { id: "clt-03", name: "Rohan Mehta", company: "Luxe Interiors", email: "rohan@luxeinteriors.in", phone: "+91 98333 44556", joinedDate: "2026-05-20", status: "inactive", location: "Mumbai", totalSpent: 160000, activeProjects: 0, notes: "Project paused pending showroom launch." },
  { id: "clt-04", name: "Priya Sharma", company: "TechNest Solutions", email: "priya@technest.io", phone: "+91 98444 55667", joinedDate: "2026-03-15", status: "active", location: "Pune", totalSpent: 450000, activeProjects: 1, notes: "Decision maker; fast approvals." },
  { id: "clt-05", name: "Sana Khan", company: "Bloom Boutique", email: "sana@bloomboutique.in", phone: "+91 98555 66778", joinedDate: "2026-02-10", status: "active", location: "Delhi", totalSpent: 320000, activeProjects: 0, notes: "Store live; discussing SEO retainer." },
  { id: "clt-06", name: "Vikram Iyer", company: "Summit Realty", email: "vikram@summitrealty.in", phone: "+91 98666 77889", joinedDate: "2026-08-01", status: "active", location: "Hyderabad", totalSpent: 195000, activeProjects: 1, notes: "New logo + lead gen campaign." },
  { id: "clt-07", name: "Ananya Rao", company: "FreshRoot Organics", email: "ananya@freshroot.in", phone: "+91 98777 88990", joinedDate: "2026-04-18", status: "active", location: "Chennai", totalSpent: 140000, activeProjects: 1, notes: "Expanding to 2 more cities." },
  { id: "clt-08", name: "Kabir Malhotra", company: "Skyline Hotels", email: "kabir@skylinehotels.in", phone: "+91 98888 99001", joinedDate: "2026-06-25", status: "lead", location: "Goa", totalSpent: 0, activeProjects: 0, notes: "Scoping a full-stack booking portal." },
  { id: "clt-09", name: "Divya Pillai", company: "NimbusCloud", email: "divya@nimbuscloud.dev", phone: "+91 98999 00112", joinedDate: "2026-01-12", status: "active", location: "Bengaluru", totalSpent: 210000, activeProjects: 1, notes: "Branding + enterprise site." },
  { id: "clt-10", name: "Arjun Singh", company: "UrbanNest Properties", email: "arjun@urbannest.in", phone: "+91 99000 11223", joinedDate: "2025-11-05", status: "active", location: "Noida", totalSpent: 340000, activeProjects: 1, notes: "Annual digital marketing engagement." },
  { id: "clt-11", name: "Tara Krishnan", company: "Mediwave Health", email: "tara@mediwave.health", phone: "+91 99111 22334", joinedDate: "2026-07-20", status: "lead", location: "Kochi", totalSpent: 0, activeProjects: 0, notes: "Awaiting compliance review for ads." },
  { id: "clt-12", name: "Nikhil Verma", company: "SkillBridge Academy", email: "nikhil@skillbridge.ai", phone: "+91 99222 33445", joinedDate: "2025-09-30", status: "inactive", location: "Jaipur", totalSpent: 120000, activeProjects: 0, notes: "Re-engaged during admission season." },
];

export const seedLeads: Lead[] = [
  { id: "ld-01", name: "Rahul Deshmukh", email: "rahul.d@gmail.com", phone: "+91 90000 11111", company: "Deshmukh Jewels", source: "Contact form", service: "E-commerce Development", message: "We need an online jewellery store with virtual try-on and COD support for our 3 showrooms.", status: "new", notes: "", createdAt: "2026-08-18T10:24:00Z" },
  { id: "ld-02", name: "Isha Bhatia", email: "isha@bluemount.in", phone: "+91 90001 22222", company: "BlueMount Travels", source: "Newsletter", service: "Web Development", message: "Looking for a fast travel booking site with itineraries and WhatsApp booking integration.", status: "new", notes: "", createdAt: "2026-08-17T16:40:00Z" },
  { id: "ld-03", name: "Farhan Ali", email: "farhan@qasrim.com", phone: "+91 90002 33333", company: "Qasrim Fashions", source: "Contact form", service: "Social Media Marketing", message: "We want a 6-month Instagram + Facebook campaign for our ethnic wear brand.", status: "read", notes: "Shared portfolio of prior fashion clients.", createdAt: "2026-08-16T09:10:00Z" },
  { id: "ld-04", name: "Sneha Kulkarni", email: "sneha@petpal.in", phone: "+91 90003 44444", company: "PetPal India", source: "Contact form", service: "Branding & Design", message: "Complete rebrand including logo, packaging and social kit for our pet food startup.", status: "replied", notes: "Sent proposal on 17 Aug; waiting on budget confirmation.", createdAt: "2026-08-14T13:05:00Z" },
  { id: "ld-05", name: "Manoj Reddy", email: "manoj@agrilink.in", phone: "+91 90004 55555", company: "AgriLink", source: "Contact form", service: "AI & Automation", message: "We'd like a WhatsApp chatbot to handle farmer onboarding and order tracking.", status: "accepted", notes: "Converted — project kickoff scheduled for 1 Sep.", createdAt: "2026-08-12T11:30:00Z" },
  { id: "ld-06", name: "Kavya Menon", email: "kavya@athena.edu", phone: "+91 90005 66666", company: "Athena Academy", source: "Contact form", service: "UI/UX Design", message: "Redesigning our LMS. Need research, wireframes and a design system.", status: "read", notes: "", createdAt: "2026-08-11T08:45:00Z" },
  { id: "ld-07", name: "Sameer Jain", email: "sameer@finfirst.co", phone: "+91 90006 77777", company: "FinFirst", source: "Referral", service: "Digital Strategy", message: "Building a new fintech product; need full digital strategy and positioning.", status: "replied", notes: "Discovery call done 15 Aug. Next: strategy workshop.", createdAt: "2026-08-10T14:20:00Z" },
  { id: "ld-08", name: "Pooja Nambiar", email: "pooja@greenleaf.in", phone: "+91 90007 88888", company: "GreenLeaf Organics", source: "Newsletter", service: "Email Marketing", message: "We have a 40k subscriber list that needs lifecycle automations.", status: "rejected", notes: "Out of budget this quarter; revisit in Q4.", createdAt: "2026-08-09T10:00:00Z" },
  { id: "ld-09", name: "Harsh Agarwal", email: "harsh@logiwiz.io", phone: "+91 90008 99999", company: "LogiWiz", source: "Contact form", service: "Cloud & DevOps", message: "We need CI/CD and cost optimisation for our AWS workloads (~$8k/mo).", status: "new", notes: "", createdAt: "2026-08-19T09:15:00Z" },
  { id: "ld-10", name: "Naina Kapoor", email: "naina@studiovega.in", phone: "+91 90009 00000", company: "Studio Vega", source: "Contact form", service: "Video Production", message: "Need a launch film and 12 social cuts for our furniture studio.", status: "read", notes: "", createdAt: "2026-08-16T17:30:00Z" },
  { id: "ld-11", name: "Aditya Pawar", email: "aditya@retailhub.in", phone: "+91 90010 11111", company: "RetailHub", source: "Contact form", service: "SEO", message: "We rank on page 3 for our main keywords. Want a technical + content SEO programme.", status: "accepted", notes: "SEO audit paid — converted to client.", createdAt: "2026-08-08T12:00:00Z" },
  { id: "ld-12", name: "Ritika Sharma", email: "ritika@evolvecareers.in", phone: "+91 90011 22222", company: "Evolve Careers", source: "Newsletter", service: "Content Marketing", message: "We need a blog engine to drive sign-ups for our placement training platform.", status: "replied", notes: "Sent content calendar sample on 13 Aug.", createdAt: "2026-08-13T10:35:00Z" },
];

export const seedProjects: AdminProject[] = [
  { id: "prj-01", title: "Nova Café Website Revamp", clientId: "clt-01", service: "Web Development", status: "in-progress", progress: 72, budget: 185000, startDate: "2026-06-02", dueDate: "2026-09-18", description: "Complete redesign with online ordering, reservations and a gallery-driven menu.", milestones: [
    { id: "m1", name: "Discovery & brand direction", dueDate: "2026-06-12", status: "completed" },
    { id: "m2", name: "Design system & mockups", dueDate: "2026-07-05", status: "completed" },
    { id: "m3", name: "Frontend development", dueDate: "2026-08-20", status: "in-progress" },
    { id: "m4", name: "CMS integration & content", dueDate: "2026-09-05", status: "pending" },
    { id: "m5", name: "Launch & QA", dueDate: "2026-09-18", status: "pending" },
  ], files: [
    { id: "pf1", name: "nova-brand-guidelines.pdf", size: "4.2 MB", uploadedAt: "2026-06-14" },
    { id: "pf2", name: "homepage-mockup-v3.png", size: "2.8 MB", uploadedAt: "2026-07-02" },
  ] },
  { id: "prj-02", title: "Orbit Fitness Brand Campaign", clientId: "clt-02", service: "Digital Marketing", status: "in-progress", progress: 45, budget: 240000, startDate: "2026-07-01", dueDate: "2026-10-10", description: "90-day performance marketing and social campaign for membership sign-ups.", milestones: [
    { id: "m1", name: "Audience research & positioning", dueDate: "2026-07-15", status: "completed" },
    { id: "m2", name: "Creative assets", dueDate: "2026-08-10", status: "completed" },
    { id: "m3", name: "Campaign launch", dueDate: "2026-08-25", status: "in-progress" },
    { id: "m4", name: "Optimisation & reporting", dueDate: "2026-10-10", status: "pending" },
  ], files: [
    { id: "pf1", name: "audience-research.pdf", size: "3.5 MB", uploadedAt: "2026-07-16" },
    { id: "pf2", name: "social-creative-pack.zip", size: "18.4 MB", uploadedAt: "2026-08-11" },
  ] },
  { id: "prj-03", title: "Luxe Interiors SEO & Content", clientId: "clt-03", service: "SEO", status: "on-hold", progress: 60, budget: 160000, startDate: "2026-05-20", dueDate: "2026-11-30", description: "Technical SEO audit and ongoing content programme for interior design keywords.", milestones: [
    { id: "m1", name: "Technical audit & fixes", dueDate: "2026-06-20", status: "completed" },
    { id: "m2", name: "Keyword strategy", dueDate: "2026-07-15", status: "completed" },
    { id: "m3", name: "Content production", dueDate: "2026-09-10", status: "in-progress" },
  ], files: [{ id: "pf1", name: "seo-audit-report.pdf", size: "5.6 MB", uploadedAt: "2026-06-21" }] },
  { id: "prj-04", title: "TechNest Mobile App", clientId: "clt-04", service: "Custom Software", status: "in-progress", progress: 88, budget: 450000, startDate: "2026-03-15", dueDate: "2026-08-28", description: "Cross-platform app for field technicians with offline mode and job scheduling.", milestones: [
    { id: "m1", name: "Requirements & architecture", dueDate: "2026-04-10", status: "completed" },
    { id: "m2", name: "UI build", dueDate: "2026-05-25", status: "completed" },
    { id: "m3", name: "Core modules", dueDate: "2026-07-10", status: "completed" },
    { id: "m4", name: "Integration & offline sync", dueDate: "2026-08-15", status: "in-progress" },
  ], files: [
    { id: "pf1", name: "app-architecture.pdf", size: "2.1 MB", uploadedAt: "2026-04-11" },
    { id: "pf2", name: "test-plan-v2.pdf", size: "1.4 MB", uploadedAt: "2026-07-22" },
  ] },
  { id: "prj-05", title: "Bloom Boutique E-commerce", clientId: "clt-05", service: "Web Development", status: "completed", progress: 100, budget: 320000, startDate: "2026-02-10", dueDate: "2026-07-25", description: "Custom storefront with WhatsApp ordering, COD validation and low-code dashboard.", milestones: [
    { id: "m1", name: "Design & prototyping", dueDate: "2026-03-15", status: "completed" },
    { id: "m2", name: "Storefront build", dueDate: "2026-05-10", status: "completed" },
    { id: "m3", name: "Payments & WhatsApp integration", dueDate: "2026-06-20", status: "completed" },
  ], files: [{ id: "pf1", name: "store-launch-checklist.pdf", size: "820 KB", uploadedAt: "2026-07-20" }] },
  { id: "prj-06", title: "Summit Realty Marketing", clientId: "clt-06", service: "Social Media", status: "in-progress", progress: 30, budget: 195000, startDate: "2026-08-01", dueDate: "2026-12-15", description: "Always-on social media management for a premium residential project.", milestones: [
    { id: "m1", name: "Brand & content calendar", dueDate: "2026-08-20", status: "in-progress" },
    { id: "m2", name: "Launch campaign", dueDate: "2026-09-30", status: "pending" },
  ], files: [] },
  { id: "prj-07", title: "FreshRoot E-commerce Expansion", clientId: "clt-07", service: "E-commerce Development", status: "review", progress: 80, budget: 140000, startDate: "2026-05-03", dueDate: "2026-09-12", description: "Expanding the organic grocery storefront to two new cities with local pricing.", milestones: [
    { id: "m1", name: "Storefront extensions", dueDate: "2026-06-20", status: "completed" },
    { id: "m2", name: "Delivery zone setup", dueDate: "2026-07-25", status: "completed" },
    { id: "m3", name: "Beta in Chennai", dueDate: "2026-08-20", status: "in-progress" },
  ], files: [{ id: "pf1", name: "city-pricing-model.xlsx", size: "610 KB", uploadedAt: "2026-07-28" }] },
  { id: "prj-08", title: "NimbusCloud Brand Refresh", clientId: "clt-09", service: "Branding & Design", status: "planning", progress: 10, budget: 210000, startDate: "2026-08-10", dueDate: "2026-11-20", description: "Full identity refresh — logo, typography, motion language and brand guidelines.", milestones: [
    { id: "m1", name: "Brand discovery workshop", dueDate: "2026-08-28", status: "in-progress" },
    { id: "m2", name: "Logo exploration", dueDate: "2026-09-25", status: "pending" },
  ], files: [] },
  { id: "prj-09", title: "UrbanNest Annual Marketing", clientId: "clt-10", service: "Digital Marketing", status: "in-progress", progress: 55, budget: 340000, startDate: "2026-01-05", dueDate: "2026-12-20", description: "Annual full-funnel digital marketing engagement for lead generation.", milestones: [
    { id: "m1", name: "Q1 lead engine", dueDate: "2026-03-31", status: "completed" },
    { id: "m2", name: "Q2 campaign suite", dueDate: "2026-06-30", status: "completed" },
    { id: "m3", name: "Q3 optimisation", dueDate: "2026-09-30", status: "in-progress" },
  ], files: [{ id: "pf1", name: "q2-report.pdf", size: "2.3 MB", uploadedAt: "2026-07-05" }] },
];

export const seedPayments: AdminPayment[] = [
  { id: "pay-01", invoiceNo: "INV-2026-0141", clientId: "clt-01", description: "Nova Café — milestone 2 (Design system)", date: "2026-07-05", amount: 55000, status: "paid", method: "Razorpay" },
  { id: "pay-02", invoiceNo: "INV-2026-0158", clientId: "clt-02", description: "Orbit Fitness — campaign retainer (Aug)", date: "2026-08-05", amount: 80000, status: "pending", method: "UPI", dueDate: "2026-08-20" },
  { id: "pay-03", invoiceNo: "INV-2026-0122", clientId: "clt-03", description: "Luxe Interiors — SEO retainers (Jun)", date: "2026-06-30", amount: 40000, status: "paid", method: "Bank Transfer" },
  { id: "pay-04", invoiceNo: "INV-2026-0133", clientId: "clt-04", description: "TechNest — milestone 3 (Core modules)", date: "2026-07-15", amount: 150000, status: "paid", method: "Razorpay" },
  { id: "pay-05", invoiceNo: "INV-2026-0159", clientId: "clt-05", description: "Bloom Boutique — final settlement", date: "2026-07-25", amount: 96000, status: "paid", method: "Bank Transfer" },
  { id: "pay-06", invoiceNo: "INV-2026-0147", clientId: "clt-01", description: "Nova Café — milestone 1 (Discovery)", date: "2026-06-12", amount: 45000, status: "paid", method: "Razorpay" },
  { id: "pay-07", invoiceNo: "INV-2026-0116", clientId: "clt-06", description: "Summit Realty — project onboarding", date: "2026-05-10", amount: 60000, status: "overdue", method: "UPI", dueDate: "2026-05-25" },
  { id: "pay-08", invoiceNo: "INV-2026-0160", clientId: "clt-04", description: "TechNest — milestone 4 (Integration)", date: "2026-08-15", amount: 120000, status: "pending", method: "Razorpay", dueDate: "2026-08-30" },
  { id: "pay-09", invoiceNo: "INV-2026-0149", clientId: "clt-02", description: "Orbit Fitness — creative assets", date: "2026-07-20", amount: 60000, status: "paid", method: "Razorpay" },
  { id: "pay-10", invoiceNo: "INV-2026-0161", clientId: "clt-03", description: "Luxe Interiors — SEO retainers (Aug)", date: "2026-08-01", amount: 40000, status: "overdue", method: "Bank Transfer", dueDate: "2026-08-10" },
  { id: "pay-11", invoiceNo: "INV-2026-0162", clientId: "clt-06", description: "Summit Realty — retainer (Aug)", date: "2026-08-01", amount: 75000, status: "paid", method: "UPI" },
  { id: "pay-12", invoiceNo: "INV-2026-0143", clientId: "clt-07", description: "FreshRoot — milestone 1 (Storefront)", date: "2026-06-20", amount: 40000, status: "paid", method: "Razorpay" },
  { id: "pay-13", invoiceNo: "INV-2026-0163", clientId: "clt-07", description: "FreshRoot — milestone 2 (Delivery zones)", date: "2026-07-28", amount: 50000, status: "partial", method: "UPI", dueDate: "2026-08-15" },
  { id: "pay-14", invoiceNo: "INV-2026-0130", clientId: "clt-09", description: "NimbusCloud — brand kickoff", date: "2026-08-10", amount: 63000, status: "pending", method: "Bank Transfer", dueDate: "2026-08-25" },
  { id: "pay-15", invoiceNo: "INV-2026-0112", clientId: "clt-10", description: "UrbanNest — Q2 campaign suite", date: "2026-06-30", amount: 85000, status: "paid", method: "Razorpay" },
  { id: "pay-16", invoiceNo: "INV-2026-0150", clientId: "clt-10", description: "UrbanNest — Q3 optimisation", date: "2026-08-03", amount: 85000, status: "pending", method: "UPI", dueDate: "2026-08-22" },
];

export const seedTickets: AdminTicket[] = [
  { id: "tkt-01", subject: "Can't receive OTP on new number", clientId: "clt-01", category: "Account", status: "in-progress", priority: "high", createdAt: "2026-08-13T18:40:00Z", lastUpdated: "2026-08-14T09:20:00Z", description: "I updated my phone number but the OTP doesn't arrive when logging in.", replies: [
    { id: "r1", author: "Aarav Kapoor", body: "I updated my phone number but the OTP doesn't arrive when logging in.", createdAt: "2026-08-13T18:40:00Z" },
    { id: "r2", author: "Support", authorRole: "Support", body: "Hi! This is a known issue with a few carriers. Could you try requesting the OTP again while on Wi-Fi?", createdAt: "2026-08-14T09:20:00Z" },
  ] },
  { id: "tkt-02", subject: "Need help exporting campaign reports", clientId: "clt-02", category: "Reporting", status: "open", priority: "medium", createdAt: "2026-08-13T11:05:00Z", lastUpdated: "2026-08-13T11:05:00Z", description: "The CSV export button in campaign reporting is greyed out.", replies: [
    { id: "r1", author: "Meera Nair", body: "The CSV export button in campaign reporting is greyed out for me.", createdAt: "2026-08-13T11:05:00Z" },
  ] },
  { id: "tkt-03", subject: "Request: add GST details to invoices", clientId: "clt-05", category: "Billing", status: "resolved", priority: "low", createdAt: "2026-08-09T08:00:00Z", lastUpdated: "2026-08-10T13:45:00Z", description: "Please add GSTIN to future invoices so our finance team can reconcile.", replies: [
    { id: "r1", author: "Sana Khan", body: "Please add GSTIN to future invoices so our finance team can reconcile.", createdAt: "2026-08-09T08:00:00Z" },
    { id: "r2", author: "Support", authorRole: "Support", body: "Done! GST details now appear on all invoices generated from today.", createdAt: "2026-08-10T13:45:00Z" },
  ] },
  { id: "tkt-04", subject: "Access to staging environment", clientId: "clt-04", category: "Access", status: "in-progress", priority: "urgent", createdAt: "2026-08-15T07:30:00Z", lastUpdated: "2026-08-15T07:30:00Z", description: "Our dev team needs read access to the staging environment to verify the latest build.", replies: [
    { id: "r1", author: "Priya Sharma", body: "Our dev team needs read access to the staging environment to verify the latest build.", createdAt: "2026-08-15T07:30:00Z" },
  ] },
  { id: "tkt-05", subject: "Suggest a feature: dark mode", clientId: "clt-06", category: "Feature Request", status: "open", priority: "low", createdAt: "2026-08-12T16:20:00Z", lastUpdated: "2026-08-12T16:20:00Z", description: "Would love a dark mode option for the client dashboard.", replies: [
    { id: "r1", author: "Vikram Iyer", body: "Would love a dark mode option for the client dashboard.", createdAt: "2026-08-12T16:20:00Z" },
  ] },
  { id: "tkt-06", subject: "Invoice amount mismatch on retainer", clientId: "clt-10", category: "Billing", status: "resolved", priority: "high", createdAt: "2026-08-08T10:00:00Z", lastUpdated: "2026-08-09T12:15:00Z", description: "INV-2026-0150 shows a different amount than the contract for Q3.", replies: [
    { id: "r1", author: "Arjun Singh", body: "INV-2026-0150 shows a different amount than the contract for Q3.", createdAt: "2026-08-08T10:00:00Z" },
    { id: "r2", author: "Support", authorRole: "Support", body: "Our billing team verified the retainer includes the new platform fee added in Q3. Confirmed with your AM.", createdAt: "2026-08-09T12:15:00Z" },
  ] },
  { id: "tkt-07", subject: "Add another admin user to the dashboard", clientId: "clt-02", category: "Account", status: "open", priority: "medium", createdAt: "2026-08-17T08:00:00Z", lastUpdated: "2026-08-17T08:00:00Z", description: "Please add our marketing manager's email so she can view campaign reports.", replies: [
    { id: "r1", author: "Meera Nair", body: "Please add our marketing manager's email so she can view campaign reports.", createdAt: "2026-08-17T08:00:00Z" },
  ] },
];

export const seedFaqs: FaqAdminItem[] = faqItems.map((item, index) => ({
  id: item.id,
  category: item.category,
  question: item.question,
  answer: item.answer,
  order: index + 1,
}));

export const seedContent: SiteContent = {
  hero: {
    eyebrow: "Digital Marketing & IT Solutions",
    title: "Transform Your",
    gradientTitle: "Digital Presence",
    description:
      "We craft pixel-perfect websites, apps, brands and marketing engines that turn attention into revenue — engineered with precision, designed to perform.",
    primaryCta: "Get Started",
    secondaryCta: "View Work",
    trustLine: "Trusted by 120+ brands across India, the Middle East and the UK",
  },
  stats: [
    { label: "Happy Clients", value: 120, suffix: "+" },
    { label: "Projects Delivered", value: 340, suffix: "+" },
    { label: "Years of Experience", value: 12, suffix: "+" },
    { label: "Client Satisfaction", value: 98, suffix: "%" },
  ],
  about: {
    title: "Born from a simple belief: every pixel should earn its place.",
    intro:
      "Pikzelkraft is a digital marketing and IT solutions company that helps ambitious brands grow with pixel-perfect, business-driven craft.",
    story: [
      "Pikzelkraft started in 2013 as two designers and an engineer frustrated by agencies that sold pretty work with no measurable results. We set out to build something different — a studio where craft and commerce live together.",
      "Today we're a 45-person team of strategists, designers, engineers and marketers serving 120+ brands across India, the Middle East, the US and the UK. Our work has grown from websites to full digital ecosystems — but the standard hasn't moved: pixel-perfect, business-driven, every time.",
    ],
    mission:
      "To help ambitious brands grow with digital experiences that are as beautiful as they are effective — measuring our success by our clients' outcomes.",
    vision:
      "A world where great digital craft is accessible to every business — and where \"pixel-perfect\" is the standard, not the exception.",
    values: ["Craft over shortcuts", "Results that matter", "Radical transparency", "Clients as partners"],
  },
};

export const seedAnalytics: Analytics = {
  revenueSeries: [
    { month: "Sep 25", revenue: 320000 },
    { month: "Oct 25", revenue: 410000 },
    { month: "Nov 25", revenue: 385000 },
    { month: "Dec 25", revenue: 520000 },
    { month: "Jan 26", revenue: 468000 },
    { month: "Feb 26", revenue: 540000 },
    { month: "Mar 26", revenue: 615000 },
    { month: "Apr 26", revenue: 582000 },
    { month: "May 26", revenue: 690000 },
    { month: "Jun 26", revenue: 728000 },
    { month: "Jul 26", revenue: 795000 },
    { month: "Aug 26", revenue: 846000 },
  ],
  acquisitionSeries: [
    { month: "Sep 25", clients: 6 },
    { month: "Oct 25", clients: 8 },
    { month: "Nov 25", clients: 7 },
    { month: "Dec 25", clients: 10 },
    { month: "Jan 26", clients: 9 },
    { month: "Feb 26", clients: 11 },
    { month: "Mar 26", clients: 13 },
    { month: "Apr 26", clients: 12 },
    { month: "May 26", clients: 15 },
    { month: "Jun 26", clients: 14 },
    { month: "Jul 26", clients: 17 },
    { month: "Aug 26", clients: 16 },
  ],
};

export const seedAdminNotifications: AdminNotification[] = [
  { id: "an-01", title: "New lead submitted", body: "Rahul Deshmukh (Deshmukh Jewels) requested an e-commerce project.", time: "2026-08-18T10:24:00Z", read: false, tone: "info" },
  { id: "an-02", title: "Payment overdue", body: "INV-2026-0116 from Summit Realty is now overdue.", time: "2026-08-15T09:00:00Z", read: false, tone: "warning" },
  { id: "an-03", title: "Milestone completed", body: "TechNest 'Core modules' milestone was completed.", time: "2026-08-10T18:00:00Z", read: false, tone: "success" },
  { id: "an-04", title: "New support ticket", body: "Orbit Fitness needs help exporting campaign reports.", time: "2026-08-13T11:05:00Z", read: true, tone: "info" },
];

/* ============================================================
   In-memory store (singleton across the admin session)
   ============================================================ */

const store = {
  clients: [...seedClients],
  leads: [...seedLeads],
  projects: [...seedProjects],
  payments: [...seedPayments],
  tickets: [...seedTickets],
  services: [...seedServices],
  portfolio: [...seedPortfolio],
  packages: [...seedPackages],
  individualPricing: [...seedIndividualPricing],
  faqs: [...seedFaqs],
  faqCategories: [...seedFaqCategories],
  content: structuredClone(seedContent),
  analytics: structuredClone(seedAnalytics),
  notifications: [...seedAdminNotifications],
};

export const adminStore = store;
export const initialServices = seedServices;
export const initialPortfolio = seedPortfolio;
export const initialPackages = seedPackages;
export const initialIndividualPricing = seedIndividualPricing;
export const faqCategories = seedFaqCategories;
export { Service };
export type { PricingPackage, IndividualPricing, PortfolioItem };

export function getClientName(id: string): string {
  return store.clients.find((client) => client.id === id)?.name ?? "Unknown client";
}

export function getClientCompany(id: string): string {
  return store.clients.find((client) => client.id === id)?.company ?? "";
}

export function getProjectService(id: string): string {
  return store.projects.find((project) => project.id === id)?.service ?? "";
}
