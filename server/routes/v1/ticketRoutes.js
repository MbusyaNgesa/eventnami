import express from "express";
import {
  bookTicket,
  getAllTickets,
  getBookedTicket,
} from "../../controllers/ticket.controller.js";

const router = express.Router();

router.post("/ticket", bookTicket);
router.get("/ticket/:id", getBookedTicket);
router.get("/ticket", getAllTickets);

export default router;
