import { Event, Memory, Genre } from "@/types";

export const mockEvents: Event[] = [
  {
    id: "1",
    name: "AfroFusion Night",
    date: "2024-07-15",
    price: 2000,
    location: "Nairobi, Kenya",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    name: "Reggae Bash",
    date: "2024-07-22",
    price: 1500,
    location: "Mombasa, Kenya",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    name: "Jazz Evening",
    date: "2024-07-29",
    price: 2500,
    location: "Kisumu, Kenya",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    name: "Rock Concert",
    date: "2024-08-05",
    price: 3000,
    location: "Nakuru, Kenya",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "5",
    name: "Hip Hop Showcase",
    date: "2024-08-12",
    price: 1800,
    location: "Eldoret, Kenya",
    image: "/placeholder.svg?height=200&width=300",
  },
];

export const mockMemories: Memory[] = [
  {
    id: "1",
    month: "January",
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  {
    id: "2",
    month: "February",
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  {
    id: "3",
    month: "March",
    images: [
      "/placeholder.svg?height=200&width=300",
      "/placeholder.svg?height=200&width=300",
    ],
  },
  {
    id: "4",
    month: "April",
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
    image: "/placeholder.svg?height=160&width=256",
  },
  {
    id: "2",
    name: "Pop",
    image: "/placeholder.svg?height=160&width=256",
  },
  {
    id: "3",
    name: "Rock",
    image: "/placeholder.svg?height=160&width=256",
  },
  {
    id: "4",
    name: "Jazz",
    image: "/placeholder.svg?height=160&width=256",
  },
  {
    id: "5",
    name: "Hip Hop",
    image: "/placeholder.svg?height=160&width=256",
  },
];
