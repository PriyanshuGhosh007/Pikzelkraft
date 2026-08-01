import { Schema, model, type InferSchemaType } from "mongoose";

export const NotificationType = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
  PROJECT: "project",
  PAYMENT: "payment",
  TICKET: "ticket",
} as const;

const notificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    type: { type: String, enum: Object.values(NotificationType), default: NotificationType.INFO },
    title: { type: String, required: true, trim: true },
    message: { type: String },
    link: { type: String },
    read: { type: Boolean, default: false },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

notificationSchema.index({ userId: 1, read: 1, createdAt: -1 });

export type Notification = InferSchemaType<typeof notificationSchema>;

export const NotificationModel = model("Notification", notificationSchema);
