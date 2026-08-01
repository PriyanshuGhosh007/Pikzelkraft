import { Schema, model, type InferSchemaType } from "mongoose";

export const LeadStatus = {
  NEW: "new",
  CONTACTED: "contacted",
  QUALIFIED: "qualified",
  CONVERTED: "converted",
  CLOSED: "closed",
} as const;

const leadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    serviceSlug: { type: String },
    budget: { type: String },
    message: { type: String, maxlength: 5000 },
    source: { type: String, default: "website" },
    status: {
      type: String,
      enum: Object.values(LeadStatus),
      default: LeadStatus.NEW,
      index: true,
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    notes: { type: String },
  },
  { timestamps: true }
);

leadSchema.index({ status: 1, createdAt: -1 });

export type Lead = InferSchemaType<typeof leadSchema>;

export const LeadModel = model("Lead", leadSchema);
