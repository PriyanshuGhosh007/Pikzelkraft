import { Schema, model, type InferSchemaType } from "mongoose";

export const TicketStatus = {
  OPEN: "open",
  IN_PROGRESS: "in-progress",
  RESOLVED: "resolved",
  CLOSED: "closed",
} as const;

export const TicketPriority = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
} as const;

const replySchema = new Schema(
  {
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, enum: ["user", "admin"], required: true },
    body: { type: String, required: true, trim: true, maxlength: 5000 },
  },
  { timestamps: true }
);

const ticketSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    subject: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, required: true, maxlength: 5000 },
    category: { type: String, default: "general" },
    status: {
      type: String,
      enum: Object.values(TicketStatus),
      default: TicketStatus.OPEN,
      index: true,
    },
    priority: {
      type: String,
      enum: Object.values(TicketPriority),
      default: TicketPriority.MEDIUM,
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    replies: [replySchema],
  },
  { timestamps: true }
);

ticketSchema.index({ userId: 1, status: 1 });

export type Ticket = InferSchemaType<typeof ticketSchema>;

export const TicketModel = model("Ticket", ticketSchema);
