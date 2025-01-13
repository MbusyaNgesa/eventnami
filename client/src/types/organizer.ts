import { Event } from "./index";

export interface OrganizerProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface EventDraft extends Event {
  isDraft: boolean;
  status: "approved" | "pending" | "declined";
}

export interface TicketSales {
  eventId: string;
  eventName: string;
  ticketsSold: {
    type: string;
    quantity: number;
    revenue: number;
  }[];
  totalRevenue: number;
}

export interface RevenueData {
  eventId: string;
  eventName: string;
  revenue: number;
  month: string;
}
