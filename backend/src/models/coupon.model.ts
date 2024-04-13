import mongoose, { InferSchemaType } from "mongoose";

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  discount_percentage: {
    type: Number,
    required: true,
  },
});

export const Coupon = mongoose.model("Coupon", couponSchema);

export type ICoupon = InferSchemaType<typeof couponSchema>;
