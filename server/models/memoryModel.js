import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
});

export const Memory = mongoose.model("Memory", memorySchema);
