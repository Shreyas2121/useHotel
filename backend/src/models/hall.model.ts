import mongoose, { InferSchemaType } from "mongoose";

const hallSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  max_guests: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  total_halls: {
    type: Number,
    required: true,
  },
  amenities: [
    {
      type: String,
    },
  ],
});

export const Hall = mongoose.model("Hall", hallSchema);

export type THall = InferSchemaType<typeof hallSchema>;
