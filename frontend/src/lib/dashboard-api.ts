import {
  projects,
  payments,
  tickets,
  notifications,
  activity,
  type DashboardStats,
  type Notification,
  type Project,
  type Payment,
  type Ticket,
  type ActivityItem,
} from "@/data/dashboard";

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function randomDelay() {
  return 300 + Math.floor(Math.random() * 300);
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await wait(randomDelay());
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const completedProjects = projects.filter((p) => p.status === "completed").length;
  const pendingPayments = payments.filter((p) => p.status === "pending" || p.status === "overdue").length;
  const openTickets = tickets.filter((t) => t.status !== "resolved").length;
  const totalPaid = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const outstanding = payments
    .filter((p) => p.status === "pending" || p.status === "overdue")
    .reduce((sum, p) => sum + p.amount, 0);
  const unsettled = payments
    .filter((p) => p.status === "pending" || p.status === "overdue")
    .sort((a, b) => (a.dueDate ?? "9999").localeCompare(b.dueDate ?? "9999"));
  return {
    activeProjects,
    completedProjects,
    pendingPayments,
    openTickets,
    totalPaid,
    outstanding,
    nextDue: unsettled[0],
  };
}

export async function getProjects(): Promise<Project[]> {
  await wait(randomDelay());
  return projects;
}

export async function getProject(id: string): Promise<Project | undefined> {
  await wait(randomDelay());
  return projects.find((project) => project.id === id);
}

export async function getPayments(): Promise<Payment[]> {
  await wait(randomDelay());
  return payments;
}

export async function getTickets(): Promise<Ticket[]> {
  await wait(randomDelay());
  return tickets;
}

export async function getNotifications(): Promise<Notification[]> {
  await wait(randomDelay());
  return notifications;
}

export async function getActivity(): Promise<ActivityItem[]> {
  await wait(randomDelay());
  return activity;
}
