import { logger } from "./logger";

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  issuedAt: Date;
  dueAt: Date;
  currency: string;
  items: InvoiceItem[];
  gstRate: number;
  subtotal: number;
  gstAmount: number;
  total: number;
}

export function generateInvoiceNumber(counter: number): string {
  const year = new Date().getFullYear();
  return `PKZ-${year}-${String(counter).padStart(4, "0")}`;
}

export function buildInvoiceData(params: {
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  currency?: string;
  items: InvoiceItem[];
  gstRate?: number;
  daysUntilDue?: number;
}): InvoiceData {
  const gstRate = params.gstRate ?? 18;
  const subtotal = params.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const gstAmount = Math.round(subtotal * (gstRate / 100) * 100) / 100;

  return {
    invoiceNumber: params.invoiceNumber,
    customerName: params.customerName,
    customerEmail: params.customerEmail,
    issuedAt: new Date(),
    dueAt: new Date(Date.now() + (params.daysUntilDue ?? 7) * 24 * 60 * 60 * 1000),
    currency: params.currency ?? "INR",
    items: params.items,
    gstRate,
    subtotal,
    gstAmount,
    total: subtotal + gstAmount,
  };
}

/**
 * Renders a simple text-based invoice (placeholder).
 * A real PDF (via pdfkit/puppeteer) is attached in Phase C.
 */
export function renderInvoiceText(invoice: InvoiceData): string {
  const lines = [
    "PIKZELKRAFT — INVOICE",
    `Invoice: ${invoice.invoiceNumber}`,
    `Issued: ${invoice.issuedAt.toISOString().slice(0, 10)}`,
    `Due: ${invoice.dueAt.toISOString().slice(0, 10)}`,
    `Customer: ${invoice.customerName} <${invoice.customerEmail}>`,
    "",
    "Items:",
    ...invoice.items.map(
      (item) => `  - ${item.description} x ${item.quantity} @ ${invoice.currency} ${item.unitPrice}`
    ),
    "",
    `Subtotal: ${invoice.currency} ${invoice.subtotal}`,
    `GST (${invoice.gstRate}%): ${invoice.currency} ${invoice.gstAmount}`,
    `Total: ${invoice.currency} ${invoice.total}`,
  ];
  return lines.join("\n");
}

export function logInvoiceGenerated(invoice: InvoiceData): void {
  logger.info(`Invoice generated: ${invoice.invoiceNumber} total=${invoice.currency} ${invoice.total}`);
}
