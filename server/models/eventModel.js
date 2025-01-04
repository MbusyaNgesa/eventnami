import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    totalTickets: { type: Number },
    availableTickets: { type: Number },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
