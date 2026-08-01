import { Schema, model, type InferSchemaType } from "mongoose";

const portfolioSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    category: { type: String, required: true, trim: true },
    clientName: { type: String },
    coverImage: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String, maxlength: 5000 },
    challenge: { type: String },
    solution: { type: String },
    results: [{ type: String }],
    tags: [{ type: String }],
    projectUrl: { type: String },
    year: { type: Number },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

portfolioSchema.index({ category: 1, featured: 1 });

export type Portfolio = InferSchemaType<typeof portfolioSchema>;

export const PortfolioModel = model("Portfolio", portfolioSchema);
