import { Schema, model, type InferSchemaType } from "mongoose";

const contactSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    subject: { type: String, trim: true },
    message: { type: String, required: true, maxlength: 5000 },
    source: { type: String, default: "website" },
    isRead: { type: Boolean, default: false },
    isSpam: { type: Boolean, default: false },
  },
  { timestamps: true }
);

contactSchema.index({ isRead: 1, createdAt: -1 });

export type Contact = InferSchemaType<typeof contactSchema>;

export const ContactModel = model("Contact", contactSchema);
