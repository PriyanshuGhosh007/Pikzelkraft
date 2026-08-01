export const UserRole = {
  USER: "user",
  ADMIN: "admin",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const ProjectStatus = {
  INQUIRY: "inquiry",
  PLANNING: "planning",
  IN_PROGRESS: "in-progress",
  REVIEW: "review",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export type ProjectStatus = (typeof ProjectStatus)[keyof typeof ProjectStatus];

export const PaymentStatus = {
  UNPAID: "unpaid",
  PARTIAL: "partial",
  PAID: "paid",
  OVERDUE: "overdue",
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const PaymentState = {
  CREATED: "created",
  AUTHORIZED: "authorized",
  CAPTURED: "captured",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const;

export type PaymentState = (typeof PaymentState)[keyof typeof PaymentState];

export const LeadStatus = {
  NEW: "new",
  CONTACTED: "contacted",
  QUALIFIED: "qualified",
  CONVERTED: "converted",
  CLOSED: "closed",
} as const;

export type LeadStatus = (typeof LeadStatus)[keyof typeof LeadStatus];

export const TicketStatus = {
  OPEN: "open",
  IN_PROGRESS: "in-progress",
  RESOLVED: "resolved",
  CLOSED: "closed",
} as const;

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];

export const TicketPriority = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
} as const;

export type TicketPriority = (typeof TicketPriority)[keyof typeof TicketPriority];

export const NotificationType = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
  PROJECT: "project",
  PAYMENT: "payment",
  TICKET: "ticket",
} as const;

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
