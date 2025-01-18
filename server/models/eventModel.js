import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    location: { type: String },
    totalTickets: { type: Number },
    availableTickets: { type: Number },
    genre: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      ref: "Genre",
      required: true,
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
