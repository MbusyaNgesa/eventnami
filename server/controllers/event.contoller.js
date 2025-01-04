import mongoose from "mongoose";
import { Event } from "../models/eventModel.js";

export const createEvent = async (req, res) => {
  const event = req.body;
  if (!event.name || !event.price) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newEvent = new Event(event);
  try {
    await newEvent.save();
    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const event = await Event.find({});
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    console.error("Error retrieving events:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getOneEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    res.status(404).json({ success: false, message: "Event does not exist" });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const event = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    //if id is not valid
    return res.status(404).send("Invalid event ID");

  try {
    const eventUpdate = await Event.findByIdAndUpdate(id, event, { new: true });
    res.status(201).json({
      success: true,
      message: "Event updated successfully",
      data: eventUpdate,
    });
  } catch (error) {
    console.error("Error updating event", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params; //How you calledd id in route

  try {
    const event = await Event.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Event not found" });
  }
};
