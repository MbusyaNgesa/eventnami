import { Event } from "../models/eventModel.js";
import { Ticket } from "../models/ticketModel.js";

export const bookTicket = async (req, res) => {
  const { eventId, quantity } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.availableTickets < quantity) {
      return res.status(400).json({ message: "Not enough tickets available" });
    }

    //Calculate total price
    const totalPrice = event.price * quantity;
    console.log("Calculated totalPrice:", totalPrice);

    //Ticket is created here
    const ticket = new Ticket({
      eventId,
      quantity,
      totalPrice,
    });
    await ticket.save();

    //Updating available tickets
    event.availableTickets -= quantity;
    await event.save();

    res.status(201).json({ message: "Successful booking", data: ticket });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Booking Failed" });
  }
};

export const getBookedTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(201).json({ success: true, data: ticket });
  } catch (error) {
    console.error("Error retrieving ticket", error.message);

    res.status(500).json({ message: "Error retrieving ticket" });
  }
};

//Admin
//They can retrieve all tickets that have been purchased
export const getAllTickets = async (req, res) => {
  try {
    const ticket = await Ticket.find();
    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving all tickets" });
  }
};
