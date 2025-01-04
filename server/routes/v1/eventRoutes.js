import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getOneEvent,
  updateEvent,
} from "../../controllers/event.contoller.js";

const router = express.Router();

router.post("/event", createEvent); //create event
router.get("/event", getAllEvents); //get all events
router.get("/event/:id", getOneEvent); //get one event by id
router.put("/event/:id", updateEvent); //update event by id
router.delete("/event/:id", deleteEvent); //delete event

export default router;
