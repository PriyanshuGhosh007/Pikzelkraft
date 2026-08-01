import { Schema, model, type InferSchemaType } from "mongoose";

const serviceSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    shortDescription: { type: String, required: true, maxlength: 300 },
    longDescription: { type: String },
    icon: { type: String },
    features: [{ type: String }],
    deliverables: [{ type: String }],
    priceStarting: { type: Number, min: 0 },
    currency: { type: String, default: "INR" },
    estimatedTimeline: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    seo: {
      title: { type: String },
      description: { type: String },
    },
    packages: [
      {
        name: { type: String, required: true },
        slug: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        period: { type: String, enum: ["one-time", "monthly", "quarterly", "yearly"], default: "one-time" },
        description: { type: String },
        features: [{ type: String }],
        highlighted: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true }
);

export type Service = InferSchemaType<typeof serviceSchema>;

export const ServiceModel = model("Service", serviceSchema);
