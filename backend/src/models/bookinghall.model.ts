import mongoose, { InferSchemaType } from "mongoose";

const bookingHallSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  bookedDate: {
    type: Date,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  selectedAddons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Addon",
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coupon",
  },
  specialRequest: {
    type: String,
    default: "",
  },
  reviewGiven: {
    type: Boolean,
    default: false,
  },
});

export const BookingHall = mongoose.model("BookingHall", bookingHallSchema);

export type TBookingHall = InferSchemaType<typeof bookingHallSchema>;
