export interface Event {
  id: string;
  name: string;
  date: string;
  price: number;
  location: string;
  image: string;
  genre: string;
}

export interface Memory {
  id: string;
  month: string;
  images: string[];
}

export interface Genre {
  id: string;
  name: string;
  image: string;
}

export interface Vendor {
  id: string;
  name: string;
  image: string;
  description: string;
  services: string[];
}

export interface TicketType {
  type: "Advance" | "Regular" | "VIP";
  price: number;
}

export interface TicketSelection {
  type: string;
  quantity: number;
  totalPrice: number;
}
