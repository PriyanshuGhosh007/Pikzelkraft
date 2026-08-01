import { Schema, model, type InferSchemaType } from "mongoose";

export const ProjectStatus = {
  INQUIRY: "inquiry",
  PLANNING: "planning",
  IN_PROGRESS: "in-progress",
  REVIEW: "review",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export const PaymentStatus = {
  UNPAID: "unpaid",
  PARTIAL: "partial",
  PAID: "paid",
  OVERDUE: "overdue",
} as const;

const milestoneSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    dueDate: { type: Date },
    paymentAmount: { type: Number, min: 0 },
    paymentStatus: { type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.UNPAID },
    deliverables: [{ type: String }],
  },
  { timestamps: true }
);

const commentSchema = new Schema(
  {
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, enum: ["user", "admin"], required: true },
    body: { type: String, required: true, trim: true, maxlength: 2000 },
  },
  { timestamps: true }
);

const projectSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, maxlength: 5000 },
    serviceSlug: { type: String },
    packageId: { type: Schema.Types.ObjectId, ref: "Service" },
    status: {
      type: String,
      enum: Object.values(ProjectStatus),
      default: ProjectStatus.INQUIRY,
      index: true,
    },
    startDate: { type: Date },
    dueDate: { type: Date },
    budget: { type: Number, min: 0 },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    milestones: [milestoneSchema],
    comments: [commentSchema],
    files: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        publicId: { type: String },
        size: { type: Number },
        mimeType: { type: String },
      },
    ],
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.UNPAID,
    },
  },
  { timestamps: true }
);

projectSchema.index({ userId: 1, status: 1 });
projectSchema.index({ dueDate: 1 });

export type Project = InferSchemaType<typeof projectSchema>;

export const ProjectModel = model("Project", projectSchema);
