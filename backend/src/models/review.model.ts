import mongoose, { InferSchemaType } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    reviewBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    roomBookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookingRoom",
      required: true,
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);

export type IReview = InferSchemaType<typeof reviewSchema>;
