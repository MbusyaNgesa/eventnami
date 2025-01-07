import mongoose from "mongoose";

import { Memory } from "../models/memoryModel.js";
import { Event } from "../models/eventModel.js";

export const createMemory = async (req, res) => {
  const { eventId, image } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      res.status(401).json({ message: "Event Not Found: Memories" });
    }

    const memory = new Memory({
      eventId,
      image,
    });
    await memory.save();

    res.status(200).json({ success: true, data: memory });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Memory Upload Failed" });
  }
};

export const getAllMemories = async (req, res) => {
  try {
    const memory = await Memory.find();
    res.status(200).json({ success: true, data: memory });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error Retrieving Memories" });
  }
};

export const getOneMemory = async (req, res) => {
  const { id } = req.params;

  try {
    const memory = await Memory.findById(id);
    if (!memory) {
      res.status(404).json({ success: false, message: "Memory not found" });
    }

    res.status(201).json({ success: true, data: memory });
  } catch (error) {
    console.error("Memory error", error.message);

    res.status(500).json({ message: "Error retrieving memory" });
  }
};

export const updateMemory = async (req, res) => {
  const { id } = req.params;
  const memory = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    //if id is not valid
    return res.status(404).send("Invalid memory ID");

  try {
    const memoryUpdate = await Memory.findByIdAndUpdate(id, memory, {
      new: true,
    });
    res.status(201).json({
      success: true,
      message: "Memory updated successfully",
      data: memoryUpdate,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error updating memory" });
  }
};
