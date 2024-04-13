import mongoose, { InferSchemaType } from "mongoose";

const bookingRoomSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  numOfRooms: {
    type: Number,
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

export const BookingRoom = mongoose.model("BookingRoom", bookingRoomSchema);

export type TBookingRoom = InferSchemaType<typeof bookingRoomSchema>;
