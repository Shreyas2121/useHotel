import mongoose, { InferSchemaType } from "mongoose";

const roomSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  occupancy: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  images: {
    type: Map,
    of: String,
  },
  total_rooms: {
    type: Number,
    required: true,
  },
  area_sq_ft: {
    type: Number,
    required: true,
  },
});

export const Room = mongoose.model("Room", roomSchema);

export type TRoom = InferSchemaType<typeof roomSchema>;
