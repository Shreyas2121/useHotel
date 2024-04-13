import mongoose, { InferSchemaType } from "mongoose";

const addonModeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Addon = mongoose.model("Addon", addonModeSchema);

export type Addon = InferSchemaType<typeof addonModeSchema>;
