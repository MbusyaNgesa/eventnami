import { Event, Memory, Genre, Vendor } from "@/types";

export const mockEvents: Event[] = [
  {
    _id: "1",
    name: "AfroFusion Night",
    date: "2024-07-15",
    price: 2000,
    location: "Nairobi, Kenya",
    image: "/images/afro.jpg",
    genre: "Afro",
  },
  {
    _id: "2",
    name: "Reggae Bash",
    date: "2024-07-22",
    price: 1500,
    location: "Mombasa, Kenya",
    image: "/placeholder.svg?height=200&width=300",
    genre: "Reggae",
  },
  {
    _id: "3",
    name: "Reggae Evening",
    date: "2024-07-29",
    price: 2500,
    location: "Kisumu, Kenya",
    image: "/placeholder.svg?height=200&width=300",
    genre: "Reggae",
  },
  {
    _id: "4",
    name: "Rock Concert",
    date: "2024-08-05",
    price: 3000,
    location: "Nakuru, Kenya",
    image: "/placeholder.svg?height=200&width=300",
    genre: "Rock",
  },
  {
    _id: "5",
    name: "Hip Hop Showcase",
    date: "2024-08-12",
    price: 1800,
    location: "Eldoret, Kenya",
    image: "/placeholder.svg?height=200&width=300",
    genre: "Trap",
  },
];

export const mockMemories: Memory[] = [
  {
    id: "1",
    eventName: "January",
    images: [
      "/images/afro.jpg",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  {
    id: "2",
    eventName: "February",
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  {
    id: "3",
    eventName: "March",
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  {
    id: "4",
    eventName: "April",
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
];

export const mockGenres: Genre[] = [
  {
    id: "1",
    name: "Afro",
    image: "/images/afro.jpg",
  },
  {
    id: "2",
    name: "Pop",
    image: "/images/afro.jpg",
  },
  {
    id: "3",
    name: "Rock",
    image: "/images/afro.jpg",
  },
  {
    id: "4",
    name: "Reggae",
    image: "/images/afro.jpg",
  },
  {
    id: "5",
    name: "Hip Hop",
    image: "/images/afro.jpg",
  },
];

export const mockVendors: Vendor[] = [
  {
    id: "1",
    name: "Tasty Bites Catering",
    image: "/placeholder.svg?height=200&width=300",
    description: "Premium catering services for all your event needs.",
    services: ["Food & Beverages", "Setup", "Staff"],
  },
  {
    id: "2",
    name: "Sound Masters",
    image: "/placeholder.svg?height=200&width=300",
    description: "Professional sound and lighting equipment.",
    services: ["Sound System", "Lighting", "DJ Services"],
  },
  {
    id: "3",
    name: "Decor Dreams",
    image: "/placeholder.svg?height=200&width=300",
    description: "Transform your venue with our elegant decorations.",
    services: ["Event Styling", "Floral Arrangements", "Props"],
  },
  {
    id: "4",
    name: "Photo Perfect",
    image: "/placeholder.svg?height=200&width=300",
    description: "Capture your memories with our professional photography.",
    services: ["Photography", "Videography", "Photo Booth"],
  },
];
