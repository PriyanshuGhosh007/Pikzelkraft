import {
  adminStore,
  type AdminPayment,
  type AdminProject,
  type AdminProjectFile,
  type AdminTicket,
  type AdminTicketReply,
  type Analytics,
  type Client,
  type FaqAdminItem,
  type Lead,
  type LeadStatus,
  type SiteContent,
} from "@/data/admin";
import type { IndividualPricing, PortfolioItem, PricingPackage, Service } from "@/data/admin";
import { getClientName } from "@/data/admin";

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function randomDelay() {
  return 250 + Math.floor(Math.random() * 250);
}

function nextId(prefix: string, existing: { id: string }[]): string {
  const max = existing.reduce((highest, item) => {
    const numeric = Number(item.id.split("-").pop() ?? "0");
    return Number.isNaN(numeric) ? highest : Math.max(highest, numeric);
  }, 0);
  return `${prefix}-${String(max + 1).padStart(2, "0")}`;
}

/* ------------------------------------------------------------
   Clients
   ------------------------------------------------------------ */

export async function getClients(): Promise<Client[]> {
  await wait(randomDelay());
  return [...adminStore.clients];
}

export async function createClient(input: Omit<Client, "id">): Promise<Client> {
  await wait(randomDelay());
  const client: Client = { ...input, id: nextId("clt", adminStore.clients) };
  adminStore.clients.unshift(client);
  return client;
}

export async function updateClient(id: string, input: Partial<Client>): Promise<Client> {
  await wait(randomDelay());
  const index = adminStore.clients.findIndex((client) => client.id === id);
  if (index === -1) throw new Error("Client not found");
  adminStore.clients[index] = { ...adminStore.clients[index], ...input, id };
  return adminStore.clients[index];
}

export async function deleteClient(id: string): Promise<void> {
  await wait(randomDelay());
  adminStore.clients = adminStore.clients.filter((client) => client.id !== id);
}

/* ------------------------------------------------------------
   Leads
   ------------------------------------------------------------ */

export async function getLeads(): Promise<Lead[]> {
  await wait(randomDelay());
  return [...adminStore.leads];
}

export async function updateLead(id: string, input: Partial<Lead>): Promise<Lead> {
  await wait(randomDelay());
  const index = adminStore.leads.findIndex((lead) => lead.id === id);
  if (index === -1) throw new Error("Lead not found");
  adminStore.leads[index] = { ...adminStore.leads[index], ...input, id };
  return adminStore.leads[index];
}

export async function setLeadStatus(id: string, status: LeadStatus): Promise<Lead> {
  await wait(randomDelay());
  return updateLead(id, { status });
}

export async function acceptLead(id: string): Promise<Lead> {
  const lead = await updateLead(id, { status: "accepted" });
  const clientExists = adminStore.clients.some((client) => client.email === lead.email);
  if (!clientExists) {
    const client: Client = {
      id: nextId("clt", adminStore.clients),
      name: lead.name,
      company: lead.company || lead.name,
      email: lead.email,
      phone: lead.phone,
      joinedDate: new Date().toISOString().slice(0, 10),
      status: "active",
      location: "—",
      totalSpent: 0,
      activeProjects: 0,
      notes: `Converted from lead ${lead.id}`,
    };
    adminStore.clients.unshift(client);
  }
  return lead;
}

export async function rejectLead(id: string): Promise<Lead> {
  return updateLead(id, { status: "rejected" });
}

export async function deleteLead(id: string): Promise<void> {
  await wait(randomDelay());
  adminStore.leads = adminStore.leads.filter((lead) => lead.id !== id);
}

/* ------------------------------------------------------------
   Projects
   ------------------------------------------------------------ */

export async function getProjects(): Promise<AdminProject[]> {
  await wait(randomDelay());
  return [...adminStore.projects];
}

export async function createProject(input: Omit<AdminProject, "id" | "files">): Promise<AdminProject> {
  await wait(randomDelay());
  const project: AdminProject = {
    ...input,
    id: nextId("prj", adminStore.projects),
    files: [],
  };
  adminStore.projects.unshift(project);
  const client = adminStore.clients.find((c) => c.id === project.clientId);
  if (client) {
    client.activeProjects += 1;
    client.status = "active";
  }
  return project;
}

export async function updateProject(id: string, input: Partial<AdminProject>): Promise<AdminProject> {
  await wait(randomDelay());
  const index = adminStore.projects.findIndex((project) => project.id === id);
  if (index === -1) throw new Error("Project not found");
  adminStore.projects[index] = { ...adminStore.projects[index], ...input, id };
  return adminStore.projects[index];
}

export async function deleteProject(id: string): Promise<void> {
  await wait(randomDelay());
  adminStore.projects = adminStore.projects.filter((project) => project.id !== id);
}

export async function uploadProjectFile(projectId: string, name: string, size: string): Promise<AdminProjectFile> {
  await wait(randomDelay());
  const file: AdminProjectFile = {
    id: `pf-${Date.now()}`,
    name,
    size,
    uploadedAt: new Date().toISOString().slice(0, 10),
  };
  adminStore.projects = adminStore.projects.map((project) =>
    project.id === projectId ? { ...project, files: [...project.files, file] } : project
  );
  return file;
}

/* ------------------------------------------------------------
   Services
   ------------------------------------------------------------ */

export async function getServices(): Promise<Service[]> {
  await wait(randomDelay());
  return [...adminStore.services];
}

export async function createService(input: Service): Promise<Service> {
  await wait(randomDelay());
  adminStore.services = [...adminStore.services, input];
  return input;
}

export async function updateService(slug: string, input: Partial<Service>): Promise<Service> {
  await wait(randomDelay());
  adminStore.services = adminStore.services.map((service) =>
    service.slug === slug ? { ...service, ...input, slug } : service
  );
  return adminStore.services.find((service) => service.slug === slug) as Service;
}

export async function deleteService(slug: string): Promise<void> {
  await wait(randomDelay());
  adminStore.services = adminStore.services.filter((service) => service.slug !== slug);
}

/* ------------------------------------------------------------
   Portfolio
   ------------------------------------------------------------ */

export async function getPortfolio(): Promise<PortfolioItem[]> {
  await wait(randomDelay());
  return [...adminStore.portfolio];
}

export async function createPortfolioItem(input: PortfolioItem): Promise<PortfolioItem> {
  await wait(randomDelay());
  adminStore.portfolio = [...adminStore.portfolio, input];
  return input;
}

export async function updatePortfolioItem(slug: string, input: Partial<PortfolioItem>): Promise<PortfolioItem> {
  await wait(randomDelay());
  adminStore.portfolio = adminStore.portfolio.map((item) =>
    item.slug === slug ? { ...item, ...input, slug } : item
  );
  return adminStore.portfolio.find((item) => item.slug === slug) as PortfolioItem;
}

export async function deletePortfolioItem(slug: string): Promise<void> {
  await wait(randomDelay());
  adminStore.portfolio = adminStore.portfolio.filter((item) => item.slug !== slug);
}

/* ------------------------------------------------------------
   Pricing
   ------------------------------------------------------------ */

export async function getPackages(): Promise<PricingPackage[]> {
  await wait(randomDelay());
  return [...adminStore.packages];
}

export async function createPackage(input: PricingPackage): Promise<PricingPackage> {
  await wait(randomDelay());
  adminStore.packages = [...adminStore.packages, input];
  return input;
}

export async function updatePackage(id: string, input: Partial<PricingPackage>): Promise<PricingPackage> {
  await wait(randomDelay());
  adminStore.packages = adminStore.packages.map((item) =>
    item.id === id ? { ...item, ...input, id } : item
  );
  return adminStore.packages.find((item) => item.id === id) as PricingPackage;
}

export async function deletePackage(id: string): Promise<void> {
  await wait(randomDelay());
  adminStore.packages = adminStore.packages.filter((item) => item.id !== id);
}

export async function getIndividualPricing(): Promise<IndividualPricing[]> {
  await wait(randomDelay());
  return [...adminStore.individualPricing];
}

export async function updateIndividualPricing(
  slug: string,
  input: Partial<IndividualPricing>
): Promise<IndividualPricing> {
  await wait(randomDelay());
  adminStore.individualPricing = adminStore.individualPricing.map((item) =>
    item.slug === slug ? { ...item, ...input, slug } : item
  );
  return adminStore.individualPricing.find((item) => item.slug === slug) as IndividualPricing;
}

export async function createIndividualPricing(input: IndividualPricing): Promise<IndividualPricing> {
  await wait(randomDelay());
  adminStore.individualPricing = [...adminStore.individualPricing, input];
  return input;
}

export async function deleteIndividualPricing(slug: string): Promise<void> {
  await wait(randomDelay());
  adminStore.individualPricing = adminStore.individualPricing.filter((item) => item.slug !== slug);
}

/* ------------------------------------------------------------
   FAQs
   ------------------------------------------------------------ */

export async function getFaqs(): Promise<FaqAdminItem[]> {
  await wait(randomDelay());
  return [...adminStore.faqs].sort((a, b) => a.order - b.order);
}

export async function createFaq(input: Omit<FaqAdminItem, "id">): Promise<FaqAdminItem> {
  await wait(randomDelay());
  const maxOrder = Math.max(0, ...adminStore.faqs.map((item) => item.order));
  const item: FaqAdminItem = { ...input, id: nextId("faq", adminStore.faqs), order: maxOrder + 1 };
  adminStore.faqs = [...adminStore.faqs, item];
  return item;
}

export async function updateFaq(id: string, input: Partial<FaqAdminItem>): Promise<FaqAdminItem> {
  await wait(randomDelay());
  adminStore.faqs = adminStore.faqs.map((item) => (item.id === id ? { ...item, ...input, id } : item));
  return adminStore.faqs.find((item) => item.id === id) as FaqAdminItem;
}

export async function deleteFaq(id: string): Promise<void> {
  await wait(randomDelay());
  adminStore.faqs = adminStore.faqs.filter((item) => item.id !== id);
}

export async function getFaqCategories(): Promise<{ id: string; label: string }[]> {
  await wait(randomDelay());
  return [...adminStore.faqCategories];
}

export async function reorderFaqs(orderedIds: string[]): Promise<void> {
  await wait(randomDelay());
  adminStore.faqs = adminStore.faqs
    .map((item) => ({ ...item, order: Math.max(1, orderedIds.indexOf(item.id) + 1) }))
    .sort((a, b) => a.order - b.order);
}

/* ------------------------------------------------------------
   Content
   ------------------------------------------------------------ */

export async function getContent(): Promise<SiteContent> {
  await wait(randomDelay());
  return structuredClone(adminStore.content);
}

export async function updateContent(input: Partial<SiteContent>): Promise<SiteContent> {
  await wait(randomDelay());
  adminStore.content = { ...adminStore.content, ...input };
  return structuredClone(adminStore.content);
}

/* ------------------------------------------------------------
   Payments
   ------------------------------------------------------------ */

export async function getPayments(): Promise<AdminPayment[]> {
  await wait(randomDelay());
  return [...adminStore.payments];
}

export async function updatePayment(id: string, input: Partial<AdminPayment>): Promise<AdminPayment> {
  await wait(randomDelay());
  adminStore.payments = adminStore.payments.map((payment) =>
    payment.id === id ? { ...payment, ...input, id } : payment
  );
  return adminStore.payments.find((payment) => payment.id === id) as AdminPayment;
}

/* ------------------------------------------------------------
   Support tickets
   ------------------------------------------------------------ */

export async function getTickets(): Promise<AdminTicket[]> {
  await wait(randomDelay());
  return [...adminStore.tickets];
}

export async function updateTicket(id: string, input: Partial<AdminTicket>): Promise<AdminTicket> {
  await wait(randomDelay());
  adminStore.tickets = adminStore.tickets.map((ticket) =>
    ticket.id === id ? { ...ticket, ...input, id } : ticket
  );
  return adminStore.tickets.find((ticket) => ticket.id === id) as AdminTicket;
}

export async function replyToTicket(id: string, body: string, author = "Admin"): Promise<AdminTicket> {
  await wait(randomDelay());
  const reply: AdminTicketReply = {
    id: `r-${Date.now()}`,
    author,
    authorRole: "Admin",
    body,
    createdAt: new Date().toISOString(),
  };
  adminStore.tickets = adminStore.tickets.map((ticket) =>
    ticket.id === id
      ? { ...ticket, replies: [...ticket.replies, reply], lastUpdated: reply.createdAt }
      : ticket
  );
  return adminStore.tickets.find((ticket) => ticket.id === id) as AdminTicket;
}

/* ------------------------------------------------------------
   Analytics & notifications
   ------------------------------------------------------------ */

export async function getAnalytics(): Promise<Analytics> {
  await wait(randomDelay());
  return structuredClone(adminStore.analytics);
}

export async function getAdminNotifications(): Promise<typeof adminStore.notifications> {
  await wait(randomDelay());
  return [...adminStore.notifications];
}

export async function markNotificationsRead(): Promise<void> {
  await wait(150);
  adminStore.notifications = adminStore.notifications.map((item) => ({ ...item, read: true }));
}

export { getClientName };
