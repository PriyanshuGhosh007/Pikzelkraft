import { Schema, model, type InferSchemaType } from "mongoose";

export const PaymentProvider = {
  RAZORPAY: "razorpay",
  MANUAL: "manual",
} as const;

export const PaymentState = {
  CREATED: "created",
  AUTHORIZED: "authorized",
  CAPTURED: "captured",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const;

const paymentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", index: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR" },
    provider: { type: String, enum: Object.values(PaymentProvider), default: PaymentProvider.RAZORPAY },
    razorpayOrderId: { type: String, unique: true, sparse: true },
    razorpayPaymentId: { type: String, sparse: true },
    razorpaySignature: { type: String },
    status: {
      type: String,
      enum: Object.values(PaymentState),
      default: PaymentState.CREATED,
      index: true,
    },
    method: { type: String },
    description: { type: String },
    refundId: { type: String },
    refundReason: { type: String },
    webhookId: { type: String, sparse: true, unique: true },
  },
  { timestamps: true }
);

paymentSchema.index({ userId: 1, status: 1 });
paymentSchema.index({ projectId: 1 });

export type Payment = InferSchemaType<typeof paymentSchema>;

export const PaymentModel = model("Payment", paymentSchema);
