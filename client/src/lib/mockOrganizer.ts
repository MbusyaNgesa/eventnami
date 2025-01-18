import {
  OrganizerProfile,
  EventDraft,
  TicketSales,
  RevenueData,
} from "@/types/organizer";

export const mockOrganizerProfile: OrganizerProfile = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "/placeholder.svg?height=40&width=40",
};

export const mockEventDrafts: EventDraft[] = [
  {
    _id: "1",
    name: "Jazz Night Extravaganza",
    date: "2024-02-15",
    price: 2000,
    location: "Nairobi, Kenya",
    image: "/placeholder.svg?height=400&width=800",
    genre: "Jazz",
    //description: 'An evening of smooth jazz and fine dining.',
    isDraft: false,
    status: "approved",
  },
  {
    _id: "2",
    name: "Rock Festival",
    date: "2024-03-01",
    price: 3000,
    location: "Mombasa, Kenya",
    image: "/placeholder.svg?height=400&width=800",
    genre: "Rock",
    //description: 'A night of classic rock hits.',
    isDraft: true,
    status: "pending",
  },
];

export const mockTicketSales: TicketSales[] = [
  {
    eventId: "1",
    eventName: "Jazz Night Extravaganza",
    ticketsSold: [
      { type: "Regular", quantity: 100, revenue: 200000 },
      { type: "VIP", quantity: 50, revenue: 150000 },
    ],
    totalRevenue: 350000,
  },
];

export const mockRevenueData: RevenueData[] = [
  { eventId: "1", eventName: "Jazz Night", revenue: 350000, month: "Jan" },
  { eventId: "2", eventName: "Rock Festival", revenue: 250000, month: "Feb" },
  { eventId: "3", eventName: "Pop Concert", revenue: 400000, month: "Mar" },
];
