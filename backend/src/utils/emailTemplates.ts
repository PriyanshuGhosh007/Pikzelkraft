import { env } from "../config/env";

/* ============================================================
   Pikzelkraft transactional email templates
   ------------------------------------------------------------
   - Fully inline CSS (no <style> blocks) for Gmail / Outlook /
     Apple Mail compatibility.
   - Table-based, max-width 600px, responsive down to 320px.
   - All user-generated content is HTML-escaped.
   ============================================================ */

const BRAND_PRIMARY = "#0066FF";
const BRAND_PRIMARY_DARK = "#0052CC";
const BRAND_BG = "#F4F7FB";
const BRAND_TEXT = "#181D25";
const BRAND_MUTED = "#6E7A8E";
const BRAND_FAINT = "#9AA6B8";
const BRAND_BORDER = "#E5EAF2";
const BRAND_SUCCESS = "#16A34A";
const BRAND_ERROR = "#DC2626";

const CLIENT_URL = env.CLIENT_URL || "http://localhost:3000";
const DASHBOARD_URL = `${CLIENT_URL}/dashboard`;
const SUPPORT_URL = `${CLIENT_URL}/dashboard/support`;
const REQUESTS_URL = `${CLIENT_URL}/dashboard/requests`;
const PAYMENTS_URL = `${CLIENT_URL}/dashboard/payments`;
const CONTACT_EMAIL = "hello@pikzelkraft.com";
const CONTACT_PHONE = "+91 98765 43210";

/* ============================================================
   Public parameter types
   ============================================================ */

export interface EmailUser {
  fullName: string;
  email: string;
  companyName?: string;
  phone?: string;
}

export interface EmailService {
  name: string;
  slug?: string;
}

export interface EmailTransaction {
  _id?: unknown;
  id?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  amount: number;
  currency?: string;
  method?: string;
  description?: string;
  status?: string;
  createdAt?: Date | string;
}

export interface EmailMilestone {
  title?: string;
  status?: string;
  dueDate?: Date | string;
}

export interface EmailProject {
  _id?: unknown;
  id?: string;
  title: string;
  description?: string;
  status?: string;
  startDate?: Date | string;
  dueDate?: Date | string;
  budget?: number;
  progress?: number;
  serviceSlug?: string;
  assignedTo?: string;
  milestones?: EmailMilestone[];
}

export interface EmailTicket {
  _id?: unknown;
  id?: string;
  subject: string;
  description?: string;
  category?: string;
  status?: string;
  priority?: string;
  createdAt?: Date | string;
}

export interface EmailLead {
  name: string;
  email: string;
  phone?: string;
  serviceSlug?: string;
  budget?: string;
  message?: string;
  source?: string;
}

export interface EmailContact {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  source?: string;
}

export interface EmailTemplate {
  subject: string;
  html: string;
}

/* ============================================================
   Formatting helpers
   ============================================================ */

function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function firstName(fullName?: string): string {
  const parts = (fullName ?? "").trim().split(/\s+/);
  return parts[0] || "there";
}

function money(amount?: number, currency = "INR"): string {
  const value = Number(amount ?? 0);
  if (currency === "USD") {
    return `$${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  }
  return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

function formatDate(value?: Date | string, includeTime = false): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  const options: Intl.DateTimeFormatOptions = includeTime
    ? { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }
    : { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-IN", options);
}

function shortId(value: unknown, prefix: string): string {
  const raw = String(value ?? "").replace(/\W/g, "");
  if (!raw) return prefix;
  return `${prefix}-${raw.slice(-6).toUpperCase()}`;
}

function friendlyStatus(value?: string): string {
  switch (value) {
    case "captured":
    case "paid":
      return "Paid";
    case "created":
      return "Initiated";
    case "authorized":
      return "Authorized";
    case "failed":
      return "Failed";
    case "refunded":
      return "Refunded";
    case "in-progress":
      return "In progress";
    case "planning":
      return "Planning";
    case "review":
      return "In review";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
    case "inquiry":
      return "Inquiry";
    case "open":
      return "Open";
    case "resolved":
      return "Resolved";
    case "closed":
      return "Closed";
    default:
      return value ? value.charAt(0).toUpperCase() + value.slice(1) : "—";
  }
}

/* ============================================================
   Reusable HTML building blocks
   ============================================================ */

function pixelLogo(): string {
  const px = (color: string): string =>
    `<td width="7" height="7" bgcolor="${color}" style="width:7px;height:7px;line-height:7px;font-size:0;mso-line-height-rule:exactly;"></td>`;
  const row = (cells: string[]): string => `<tr>${cells.join("")}</tr>`;
  const white = "#ffffff";
  const transparent = "#0066FF";
  return `
    <table role="presentation" cellpadding="0" cellspacing="1" style="border-collapse:separate;">
      ${row([px(white), px(white), px(white)])}
      ${row([px(white), px(transparent), px(transparent)])}
      ${row([px(white), px(transparent), px(white)])}
      ${row([px(white), px(transparent), px(transparent)])}
    </table>`;
}

function greeting(name?: string): string {
  return `<p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:${BRAND_TEXT};">Hi ${esc(firstName(name))},</p>`;
}

function adminGreeting(): string {
  return `<p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:${BRAND_TEXT};">Hi Pikzelkraft team,</p>`;
}

function lead(html: string): string {
  return `<p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:${BRAND_TEXT};">${html}</p>`;
}

function sectionTitle(text: string): string {
  return `<p style="margin:28px 0 4px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:${BRAND_MUTED};">${esc(text)}</p>`;
}

function details(rows: Array<[string, string]>): string {
  const inner = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 20px 0 0;font-size:13px;color:${BRAND_MUTED};width:150px;vertical-align:top;">${esc(label)}</td>
        <td style="padding:8px 0 0;font-size:14px;color:${BRAND_TEXT};font-weight:600;vertical-align:top;">${value}</td>
      </tr>`
    )
    .join("");
  return `
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:22px 0;border:1px solid ${BRAND_BORDER};border-radius:8px;">
      <tr>
        <td style="padding:6px 20px 18px;background-color:#F9FAFC;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">${inner}</table>
        </td>
      </tr>
    </table>`;
}

function button(
  link: string,
  label: string,
  options: { align?: "left" | "center"; bgcolor?: string; block?: boolean } = {}
): string {
  const align = options.align ?? "left";
  const bgcolor = options.bgcolor ?? BRAND_PRIMARY;
  const blockStyle = options.block
    ? "display:block;text-align:center;"
    : "";
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" align="${align}" style="margin:${align === "center" ? "28px auto 4px" : "28px 0 4px"};">
      <tr>
        <td bgcolor="${bgcolor}" style="background-color:${bgcolor};border-radius:8px;mso-padding-alt:14px 32px;">
          <a href="${esc(link)}" style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;line-height:1.2;${blockStyle}">${esc(label)}</a>
        </td>
      </tr>
    </table>`;
}

function bulletList(items: string[]): string {
  const rows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:5px 0;font-size:15px;line-height:1.6;color:${BRAND_TEXT};">
          <span style="color:${BRAND_PRIMARY};font-weight:700;padding-right:8px;">&#8226;</span>${item}
        </td>
      </tr>`
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 24px;">${rows}</table>`;
}

function numberedSteps(steps: Array<{ title: string; body: string }>): string {
  const rows = steps
    .map(
      (step, index) => `
      <tr>
        <td valign="top" style="padding:0 12px 16px 0;font-size:14px;font-weight:700;color:${BRAND_PRIMARY};vertical-align:top;">${index + 1}</td>
        <td style="padding:0 0 16px;font-size:14px;line-height:1.6;color:${BRAND_TEXT};vertical-align:top;">
          <strong style="color:${BRAND_TEXT};">${esc(step.title)}</strong> — ${step.body}
        </td>
      </tr>`
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;">${rows}</table>`;
}

function progressBar(percent: number): string {
  const p = Math.max(0, Math.min(100, Math.round(percent)));
  return `
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:14px 0 6px;">
      <tr>
        <td height="10" bgcolor="${BRAND_BORDER}" style="background-color:${BRAND_BORDER};border-radius:5px;font-size:0;line-height:10px;">
          <table width="${p}%" cellpadding="0" cellspacing="0" role="presentation">
            <tr><td height="10" bgcolor="${BRAND_PRIMARY}" style="background-color:${BRAND_PRIMARY};border-radius:5px;font-size:0;line-height:10px;"></td></tr>
          </table>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 4px;font-size:13px;color:${BRAND_MUTED};">${p}% complete</p>`;
}

function signOff(): string {
  return `<p style="margin:28px 0 0;font-size:15px;line-height:1.7;color:${BRAND_TEXT};">Warm regards,<br/><strong style="color:${BRAND_TEXT};">The Pikzelkraft Team</strong></p>`;
}

function supportLine(): string {
  return `<p style="margin:24px 0 0;font-size:13px;line-height:1.7;color:${BRAND_MUTED};">Need help? Contact our support team at <a href="mailto:${CONTACT_EMAIL}" style="color:${BRAND_PRIMARY};text-decoration:underline;">${CONTACT_EMAIL}</a> or call <a href="tel:${CONTACT_PHONE.replace(/\s/g, "")}" style="color:${BRAND_PRIMARY};text-decoration:underline;">${CONTACT_PHONE}</a>.</p>`;
}

function footerBlock(): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td valign="top" style="width:50%;padding:0 20px 0 0;vertical-align:top;">
          <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:${BRAND_TEXT};">Pikzelkraft</p>
          <p style="margin:0 0 4px;font-size:12px;line-height:1.6;color:${BRAND_MUTED};">Level 4, Pinnacle Tech Park,<br/>HSR Layout, Bengaluru,<br/>Karnataka 560102, India</p>
        </td>
        <td valign="top" style="width:50%;vertical-align:top;">
          <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:${BRAND_TEXT};">Contact</p>
          <p style="margin:0 0 4px;font-size:12px;line-height:1.6;color:${BRAND_MUTED};">
            <a href="mailto:${CONTACT_EMAIL}" style="color:${BRAND_MUTED};text-decoration:none;">${CONTACT_EMAIL}</a>
          </p>
          <p style="margin:0 0 4px;font-size:12px;line-height:1.6;color:${BRAND_MUTED};">
            <a href="tel:${CONTACT_PHONE.replace(/\s/g, "")}" style="color:${BRAND_MUTED};text-decoration:none;">${CONTACT_PHONE}</a>
          </p>
          <p style="margin:0;font-size:12px;line-height:1.6;color:${BRAND_MUTED};">Mon–Sat, 9:00 AM – 7:00 PM IST</p>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding:18px 0 0;font-size:11px;line-height:1.6;color:${BRAND_FAINT};">
          This is an automated message from Pikzelkraft. Please do not reply to this email.
        </td>
      </tr>
    </table>`;
}

/* ============================================================
   Layout
   ============================================================ */

export function renderLayout(title: string, bodyHtml: string, preheader = ""): string {
  const preheaderHtml = preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:transparent;">${esc(preheader)}</div>`
    : "";
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>${esc(title)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:${BRAND_BG};font-family:'Segoe UI',Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
    ${preheaderHtml}
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;background-color:${BRAND_BG};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <!--[if mso]>
          <table role="presentation" width="600" cellpadding="0" cellspacing="0"><tr><td>
          <![endif]-->
          <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid ${BRAND_BORDER};">
            <tr>
              <td bgcolor="${BRAND_PRIMARY}" style="background-color:${BRAND_PRIMARY};padding:26px 40px;">
                <table cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="padding-right:14px;vertical-align:middle;">${pixelLogo()}</td>
                    <td style="vertical-align:middle;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">Pikzelkraft</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:40px;">${bodyHtml}</td>
            </tr>
            <tr>
              <td bgcolor="${BRAND_BG}" style="background-color:${BRAND_BG};padding:28px 40px;border-top:1px solid ${BRAND_BORDER};">${footerBlock()}</td>
            </tr>
          </table>
          <!--[if mso]>
          </td></tr></table>
          <![endif]-->
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/* ============================================================
   Authentication emails (kept for existing callers)
   ============================================================ */

export function verificationEmail(name: string, link: string): EmailTemplate {
  return {
    subject: "Verify your Pikzelkraft account",
    html: renderLayout(
      "Verify your email",
      `${greeting(name)}
      ${lead(`Welcome to Pikzelkraft. Please verify your email address to activate your account.`)}
      ${button(link, "Verify Email", { align: "left" })}
      ${lead(`This link expires in 24 hours. If you did not create an account, you can safely ignore this email.`)}`,
      "Verify your Pikzelkraft account"
    ),
  };
}

export function otpEmail(name: string, otp: string, expiresInMinutes = 10): EmailTemplate {
  return {
    subject: "Your Pikzelkraft verification code",
    html: renderLayout(
      "Verification code",
      `${greeting(name)}
      ${lead(`Use the following code to complete your password reset. It expires in <strong>${expiresInMinutes} minutes</strong>.`)}
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;">
        <tr>
          <td bgcolor="#F9FAFC" style="background-color:#F9FAFC;border:1px solid ${BRAND_BORDER};border-radius:8px;padding:20px 28px;font-size:30px;font-weight:700;letter-spacing:10px;color:${BRAND_PRIMARY};mso-text-raise:6px;">${esc(otp)}</td>
        </tr>
      </table>
      ${lead(`Never share this code with anyone. Pikzelkraft will never ask for it by phone or email.`)}`,
      `Your Pikzelkraft verification code is ${otp}`
    ),
  };
}

/* ============================================================
   1. Registration success
   ============================================================ */

export function registrationSuccess(user: EmailUser): EmailTemplate {
  return {
    subject: "Welcome to Pikzelkraft",
    html: renderLayout(
      "Welcome to Pikzelkraft",
      `${greeting(user.fullName)}
      ${lead(`Congratulations! Your <strong>Pikzelkraft</strong> account has been created successfully.`)}
      ${details([
        ["Name", `<span style="color:${BRAND_TEXT};">${esc(user.fullName)}</span>`],
        ["Email", `<a href="mailto:${esc(user.email)}" style="color:${BRAND_PRIMARY};text-decoration:none;">${esc(user.email)}</a>`],
        ...(user.companyName ? [["Company", esc(user.companyName)] as [string, string]] : []),
      ])}
      ${sectionTitle("What you can do now")}
      ${bulletList([
        "Track your projects and milestones in real time",
        "View invoices and manage payments",
        "Raise support tickets and chat with your team",
        "Download deliverables from your project workspace",
      ])}
      ${button(`${CLIENT_URL}/login`, "Sign in to your dashboard", { align: "left" })}
      ${supportLine()}`,
      "Your Pikzelkraft account is ready"
    ),
  };
}

/* ============================================================
   2. Service request received
   ============================================================ */

export function serviceRequest(user: EmailUser, service: EmailService): EmailTemplate {
  return {
    subject: `We received your enquiry — ${service.name}`,
    html: renderLayout(
      "We received your enquiry",
      `${greeting(user.fullName)}
      ${lead(`Thanks for getting in touch with Pikzelkraft. We&rsquo;ve received your enquiry for <strong>${esc(service.name)}</strong>.`)}
      ${details([
        ["Service", `<span style="color:${BRAND_TEXT};">${esc(service.name)}</span>`],
        ["Submitted", formatDate(new Date(), true)],
        ["Status", `<span style="color:${BRAND_SUCCESS};">Received</span>`],
      ])}
      ${sectionTitle("What happens next")}
      ${numberedSteps([
        { title: "We review your enquiry", body: "A specialist reviews your requirements within one business day." },
        { title: "We get in touch", body: `You&rsquo;ll hear from us on <strong>${esc(user.email)}</strong> to discuss the details.` },
        { title: "Tailored proposal", body: "You receive a clear scope, timeline and quote." },
        { title: "Project kick-off", body: "Once approved, we start work and keep you updated at every step." },
      ])}
      ${button(REQUESTS_URL, "View request status", { align: "left" })}
      ${lead(`Questions in the meantime? Reply to this email or contact us at <a href="mailto:${CONTACT_EMAIL}" style="color:${BRAND_PRIMARY};text-decoration:underline;">${CONTACT_EMAIL}</a>.`)}
      ${signOff()}`,
      `We received your enquiry for ${service.name}`
    ),
  };
}

/* ============================================================
   3. Payment success
   ============================================================ */

export function paymentSuccess(user: EmailUser, transaction: EmailTransaction, invoiceUrl: string): EmailTemplate {
  const orderId = transaction.razorpayOrderId ?? shortId(transaction._id ?? transaction.id, "ORD");
  return {
    subject: `Payment confirmed — ${shortId(orderId, "ORD")}`,
    html: renderLayout(
      "Payment confirmed",
      `${greeting(user.fullName)}
      ${lead(`Great news — your payment to <strong>Pikzelkraft</strong> was successful. Thank you for your business!`)}
      ${details([
        ["Order ID", `<span style="color:${BRAND_TEXT};">${esc(orderId)}</span>`],
        ["Service", esc(transaction.description ?? "Digital services")],
        ["Amount", `<span style="color:${BRAND_PRIMARY};font-weight:700;">${money(transaction.amount, transaction.currency)}</span>`],
        ["Payment method", transaction.method ? esc(friendlyStatus(transaction.method)) : "Online"],
        ["Date", formatDate(transaction.createdAt, true)],
        ["Status", `<span style="color:${BRAND_SUCCESS};">Confirmed</span>`],
      ])}
      ${button(invoiceUrl, "Download invoice", { align: "left" })}
      ${button(PAYMENTS_URL, "Go to dashboard", { align: "left" })}
      ${lead(`Your invoice is also available anytime from the <a href="${PAYMENTS_URL}" style="color:${BRAND_PRIMARY};text-decoration:underline;">Payments</a> section of your dashboard.`)}
      ${signOff()}`,
      `Your payment of ${money(transaction.amount, transaction.currency)} was successful`
    ),
  };
}

/* ============================================================
   4. Payment failed
   ============================================================ */

export function paymentFailed(user: EmailUser, transaction: EmailTransaction): EmailTemplate {
  const orderId = transaction.razorpayOrderId ?? shortId(transaction._id ?? transaction.id, "ORD");
  return {
    subject: `Payment unsuccessful — ${shortId(orderId, "ORD")}`,
    html: renderLayout(
      "Payment unsuccessful",
      `${greeting(user.fullName)}
      ${lead(`We couldn&rsquo;t process your payment of <strong>${money(transaction.amount, transaction.currency)}</strong> for <strong>${esc(transaction.description ?? "your Pikzelkraft order")}</strong>. No amount has been charged.`)}
      ${details([
        ["Order ID", `<span style="color:${BRAND_TEXT};">${esc(orderId)}</span>`],
        ["Service", esc(transaction.description ?? "Digital services")],
        ["Amount", `<span style="color:${BRAND_TEXT};">${money(transaction.amount, transaction.currency)}</span>`],
        ["Date", formatDate(transaction.createdAt, true)],
        ["Status", `<span style="color:${BRAND_ERROR};">Failed</span>`],
      ])}
      ${sectionTitle("What you can do")}
      ${numberedSteps([
        { title: "Retry the payment", body: "Use a different card or payment method. Your order details are still saved." },
        { title: "Check your payment provider", body: "Some banks block large online transactions — check with your bank if the issue persists." },
        { title: "Contact support", body: `We&rsquo;re here to help at <a href="mailto:${CONTACT_EMAIL}" style="color:${BRAND_PRIMARY};text-decoration:underline;">${CONTACT_EMAIL}</a>.` },
      ])}
      ${button(PAYMENTS_URL, "Retry payment", { align: "left" })}
      ${supportLine()}`,
      `Your payment of ${money(transaction.amount, transaction.currency)} could not be processed`
    ),
  };
}

/* ============================================================
   5. Project started
   ============================================================ */

export function projectStarted(user: EmailUser, project: EmailProject): EmailTemplate {
  const projectId = project._id ?? project.id;
  const projectUrl = projectId ? `${DASHBOARD_URL}/projects/${String(projectId)}` : DASHBOARD_URL;
  const upcoming = (project.milestones ?? [])
    .filter((milestone) => milestone.status !== "completed" && milestone.dueDate)
    .sort((a, b) => new Date(a.dueDate ?? 0).getTime() - new Date(b.dueDate ?? 0).getTime())
    .slice(0, 3);
  return {
    subject: `Your project has started — ${project.title}`,
    html: renderLayout(
      "Your project has started",
      `${greeting(user.fullName)}
      ${lead(`Great news — your project <strong style="color:${BRAND_TEXT};">${esc(project.title)}</strong> is officially underway!`)}
      ${details([
        ["Project", `<span style="color:${BRAND_TEXT};">${esc(project.title)}</span>`],
        ["Service", project.serviceSlug ? esc(friendlyStatus(project.serviceSlug)) : "—"],
        ["Start date", formatDate(project.startDate)],
        ["Target completion", formatDate(project.dueDate)],
        ...(project.budget ? [["Budget", money(project.budget)] as [string, string]] : []),
        ["Status", `<span style="color:${BRAND_PRIMARY};">In progress</span>`],
      ])}
      ${sectionTitle("Your team")}
      ${lead(`A dedicated Pikzelkraft squad has been briefed on your goals: a <strong>project manager</strong> who owns the timeline, plus <strong>designers, engineers and marketers</strong> matched to your service. Your account lead is your single point of contact throughout.`)}
      ${upcoming.length > 0 ? sectionTitle("Key milestones ahead") : ""}
      ${upcoming.length > 0 ? bulletList(upcoming.map((milestone) => `${esc(milestone.title ?? "Milestone")} — due ${formatDate(milestone.dueDate)}`)) : ""}
      ${button(projectUrl, "View project", { align: "left" })}
      ${lead(`You&rsquo;ll receive updates as each milestone is completed. We&rsquo;re excited to build this with you!`)}
      ${signOff()}`,
      `Your project ${project.title} has started`
    ),
  };
}

/* ============================================================
   6. Project progress / milestone completed
   ============================================================ */

export function projectProgress(user: EmailUser, project: EmailProject, milestone: EmailMilestone): EmailTemplate {
  const projectId = project._id ?? project.id;
  const projectUrl = projectId ? `${DASHBOARD_URL}/projects/${String(projectId)}` : DASHBOARD_URL;
  const nextMilestone = (project.milestones ?? [])
    .filter((item) => item.status !== "completed" && item.title !== milestone.title)
    .sort((a, b) => new Date(a.dueDate ?? 0).getTime() - new Date(b.dueDate ?? 0).getTime())[0];
  const progress = project.progress ?? 0;
  return {
    subject: `Milestone completed — ${milestone.title ?? "Progress update"}`,
    html: renderLayout(
      "Milestone completed",
      `${greeting(user.fullName)}
      ${lead(`Great progress on <strong style="color:${BRAND_TEXT};">${esc(project.title)}</strong>! Your team has completed a milestone.`)}
      ${details([
        ["Milestone", `<span style="color:${BRAND_TEXT};">${esc(milestone.title ?? "Milestone completed")}</span>`],
        ["Project", `<span style="color:${BRAND_TEXT};">${esc(project.title)}</span>`],
        ["Completed", formatDate(new Date(), true)],
      ])}
      ${sectionTitle("Overall progress")}
      ${progressBar(progress)}
      ${nextMilestone ? sectionTitle("Next up") : ""}
      ${nextMilestone ? lead(`<strong style="color:${BRAND_TEXT};">${esc(nextMilestone.title ?? "Next milestone")}</strong> — due ${formatDate(nextMilestone.dueDate)}. We&rsquo;ll keep you posted as it moves forward.`) : lead(`The final review is on the horizon. Keep an eye on your dashboard for the handover.`)}
      ${button(projectUrl, "View project", { align: "left" })}
      ${signOff()}`,
      `A milestone was completed on ${project.title}`
    ),
  };
}

/* ============================================================
   7. Project completed
   ============================================================ */

export function projectCompleted(user: EmailUser, project: EmailProject): EmailTemplate {
  const projectId = project._id ?? project.id;
  const projectUrl = projectId ? `${DASHBOARD_URL}/projects/${String(projectId)}` : DASHBOARD_URL;
  return {
    subject: `Your project is delivered — ${project.title}`,
    html: renderLayout(
      "Project delivered",
      `${greeting(user.fullName)}
      ${lead(`It&rsquo;s a wrap! Your project <strong style="color:${BRAND_TEXT};">${esc(project.title)}</strong> has been delivered successfully.`)}
      ${details([
        ["Project", `<span style="color:${BRAND_TEXT};">${esc(project.title)}</span>`],
        ["Delivered on", formatDate(new Date())],
        ["Status", `<span style="color:${BRAND_SUCCESS};font-weight:700;">Completed</span>`],
        ...(project.description ? [["Summary", esc(project.description)] as [string, string]] : []),
      ])}
      ${sectionTitle("Final summary")}
      ${bulletList([
        "All milestones completed and approved",
        "Deliverables available in your project workspace",
        "Final invoice generated — view it in the Payments section",
        "Your project data and files stay with you",
      ])}
      ${button(projectUrl, "View project", { align: "left" })}
      ${button(PAYMENTS_URL, "View invoice", { align: "left" })}
      ${sectionTitle("Tell us what you think")}
      ${lead(`We&rsquo;d love your feedback — it helps us improve. Reply to this email or rate your experience from your dashboard.`)}
      ${signOff()}`,
      `Your project ${project.title} has been delivered`
    ),
  };
}

/* ============================================================
   8. Support ticket received
   ============================================================ */

export function supportTicket(user: EmailUser, ticket: EmailTicket): EmailTemplate {
  const ticketId = shortId(ticket._id ?? ticket.id, "TKT");
  const expectedResponse: Record<string, string> = {
    urgent: "within 4 business hours",
    high: "within 12 business hours",
    medium: "within 24 business hours",
    low: "within 48 business hours",
  };
  const eta = expectedResponse[ticket.priority ?? "medium"] ?? "within 24 business hours";
  return {
    subject: `We received your support ticket — ${ticketId}`,
    html: renderLayout(
      "Support ticket received",
      `${greeting(user.fullName)}
      ${lead(`We&rsquo;ve received your support request and it&rsquo;s now in our queue.`)}
      ${details([
        ["Ticket ID", `<span style="color:${BRAND_PRIMARY};font-weight:700;">${esc(ticketId)}</span>`],
        ["Subject", `<span style="color:${BRAND_TEXT};">${esc(ticket.subject)}</span>`],
        ...(ticket.category ? [["Category", esc(friendlyStatus(ticket.category))] as [string, string]] : []),
        ["Priority", esc(friendlyStatus(ticket.priority))],
        ["Status", `<span style="color:${BRAND_SUCCESS};">Open</span>`],
        ["Submitted", formatDate(ticket.createdAt, true)],
      ])}
      ${sectionTitle("What happens next")}
      ${numberedSteps([
        { title: "Triage", body: `A support engineer reviews your ticket. Expected first response <strong>${eta}</strong>.` },
        { title: "Investigation", body: "We investigate and work on a fix or an answer for you." },
        { title: "Resolution", body: "You get a clear resolution and can reply anytime to continue the thread." },
      ])}
      ${button(`${SUPPORT_URL}?ticket=${encodeURIComponent(ticketId)}`, "View ticket", { align: "left" })}
      ${supportLine()}`,
      `Your support ticket ${ticketId} has been created`
    ),
  };
}

/* ============================================================
   Admin: new registration
   ============================================================ */

export function adminNewRegistration(user: EmailUser): EmailTemplate {
  return {
    subject: `New user registration — ${user.fullName}`,
    html: renderLayout(
      "New user registration",
      `${adminGreeting()}
      ${lead(`A new user has just created a Pikzelkraft account.`)}
      ${details([
        ["Name", `<span style="color:${BRAND_TEXT};">${esc(user.fullName)}</span>`],
        ["Email", `<a href="mailto:${esc(user.email)}" style="color:${BRAND_PRIMARY};text-decoration:none;">${esc(user.email)}</a>`],
        ...(user.companyName ? [["Company", esc(user.companyName)] as [string, string]] : []),
        ...(user.phone ? [["Phone", esc(user.phone)] as [string, string]] : []),
        ["Joined", formatDate(new Date(), true)],
      ])}
      ${button(`${CLIENT_URL}/admin/clients`, "Open admin panel", { align: "left" })}`,
      `New registration: ${user.fullName}`
    ),
  };
}

/* ============================================================
   Admin: new contact message
   ============================================================ */

export function adminNewContact(contact: EmailContact): EmailTemplate {
  return {
    subject: `New contact message — ${contact.name}`,
    html: renderLayout(
      "New contact message",
      `${adminGreeting()}
      ${lead(`A new message arrived through the website contact form.`)}
      ${details([
        ["Name", `<span style="color:${BRAND_TEXT};">${esc(contact.name)}</span>`],
        ["Email", `<a href="mailto:${esc(contact.email)}" style="color:${BRAND_PRIMARY};text-decoration:none;">${esc(contact.email)}</a>`],
        ...(contact.phone ? [["Phone", esc(contact.phone)] as [string, string]] : []),
        ...(contact.subject ? [["Subject", esc(contact.subject)] as [string, string]] : []),
        ["Source", esc(contact.source ?? "website")],
        ["Received", formatDate(new Date(), true)],
      ])}
      ${sectionTitle("Message")}
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:8px 0 24px;border:1px solid ${BRAND_BORDER};border-radius:8px;">
        <tr><td style="padding:16px 20px;background-color:#F9FAFC;font-size:14px;line-height:1.7;color:${BRAND_TEXT};">${esc(contact.message)}</td></tr>
      </table>
      ${button(`${CLIENT_URL}/admin`, "Open admin panel", { align: "left" })}`,
      `New contact message from ${contact.name}`
    ),
  };
}

/* ============================================================
   Admin: new payment
   ============================================================ */

export function adminNewPayment(transaction: EmailTransaction): EmailTemplate {
  const orderId = transaction.razorpayOrderId ?? shortId(transaction._id ?? transaction.id, "ORD");
  return {
    subject: `New payment — ${money(transaction.amount, transaction.currency)}`,
    html: renderLayout(
      "New payment",
      `${adminGreeting()}
      ${lead(`A payment has been received for a Pikzelkraft order.`)}
      ${details([
        ["Order ID", `<span style="color:${BRAND_TEXT};">${esc(orderId)}</span>`],
        ["Amount", `<span style="color:${BRAND_PRIMARY};font-weight:700;">${money(transaction.amount, transaction.currency)}</span>`],
        ["Payment method", transaction.method ? esc(friendlyStatus(transaction.method)) : "Online"],
        ["Status", `<span style="color:${BRAND_SUCCESS};">Confirmed</span>`],
        ["Received", formatDate(transaction.createdAt, true)],
      ])}
      ${transaction.description ? sectionTitle("Order summary") : ""}
      ${transaction.description ? lead(esc(transaction.description)) : ""}
      ${button(`${CLIENT_URL}/admin`, "Open admin panel", { align: "left" })}`,
      `New payment received: ${money(transaction.amount, transaction.currency)}`
    ),
  };
}

/* ============================================================
   Admin: new lead
   ============================================================ */

export function adminNewLead(leadData: EmailLead): EmailTemplate {
  return {
    subject: `New lead — ${leadData.name}`,
    html: renderLayout(
      "New lead",
      `${adminGreeting()}
      ${lead(`A new lead has arrived on the Pikzelkraft website.`)}
      ${details([
        ["Name", `<span style="color:${BRAND_TEXT};">${esc(leadData.name)}</span>`],
        ["Email", `<a href="mailto:${esc(leadData.email)}" style="color:${BRAND_PRIMARY};text-decoration:none;">${esc(leadData.email)}</a>`],
        ...(leadData.phone ? [["Phone", esc(leadData.phone)] as [string, string]] : []),
        ...(leadData.serviceSlug ? [["Service", esc(friendlyStatus(leadData.serviceSlug))] as [string, string]] : []),
        ...(leadData.budget ? [["Budget", esc(leadData.budget)] as [string, string]] : []),
        ["Source", esc(leadData.source ?? "website")],
        ["Received", formatDate(new Date(), true)],
      ])}
      ${leadData.message ? sectionTitle("Message") : ""}
      ${leadData.message
        ? `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:8px 0 24px;border:1px solid ${BRAND_BORDER};border-radius:8px;">
             <tr><td style="padding:16px 20px;background-color:#F9FAFC;font-size:14px;line-height:1.7;color:${BRAND_TEXT};">${esc(leadData.message)}</td></tr>
           </table>`
        : ""}
      ${button(`${CLIENT_URL}/admin/leads`, "Review lead", { align: "left" })}`,
      `New lead: ${leadData.name}`
    ),
  };
}

/* ============================================================
   Backward-compatible aliases
   ============================================================ */

/** @deprecated Use registrationSuccess(user) instead. */
export function registrationSuccessEmail(name: string): EmailTemplate {
  return registrationSuccess({ fullName: name, email: "" });
}

/** @deprecated Use adminNewLead(lead) instead. */
export function leadNotificationEmail(leadData: EmailLead): EmailTemplate {
  return adminNewLead(leadData);
}
