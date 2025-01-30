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
    eventName: "Art Frenzy",
    images: ["/images/memory1.png"],
  },
  {
    id: "2",
    eventName: "Summer Tides",
    images: ["/images/memory9.png", "/images/memory7.png"],
  },
  {
    id: "3",
    eventName: "Beneath The Baobabs",
    images: ["/images/memory2.png", "/images/memory3.png"],
  },
  {
    id: "4",
    eventName: "X NYE",
    images: ["/images/memory4.png", "/images/memory5.png"],
  },
];

export const mockGenres: Genre[] = [
  {
    id: "1",
    name: "Afro",
    image: "/images/afro2.jpg",
  },
  {
    id: "2",
    name: "Pop",
    image: "/images/pop1.jpg",
  },
  {
    id: "3",
    name: "Rock",
    image: "/images/rock.jpg",
  },
  {
    id: "4",
    name: "Reggae",
    image: "/images/reggae1.jpg",
  },
  {
    id: "5",
    name: "EDM",
    image: "/images/house.jpg",
  },
];

export const mockVendors: Vendor[] = [
  {
    id: "1",
    name: "Akito Jewelery",
    image: "/images/akito.png",
    description: "Style with a smile",
    services: ["Rings", "Necklace", "Bangles"],
  },
  {
    id: "2",
    name: "Tasty Bites Catering",
    image: "/images/tasty2.jpg",
    description: "Premium catering services for all your event needs.",
    services: ["Food & Beverages", "Setup", "Staff"],
  },
  {
    id: "3",
    name: "Maria Paints",
    image: "/images/maria.jpg",
    description: "Skilled face and body painter",
    services: ["Face Paint", "Body Paint", "MUA"],
  },
  {
    id: "4",
    name: "PhotoMoto",
    image: "/images/photomoto.jpg",
    description: "Capture your memories with our professional photography.",
    services: ["Photography", "Videography", "Photo Booth"],
  },
  {
    id: "5",
    name: "Js Bar",
    image: "/images/tasty.jpg",
    description: "Finest cocktails and mocktails in the city.",
    services: ["Cocktails", "Mocktails", "Shots"],
  },
  {
    id: "6",
    name: "Kukito",
    image: "/images/kukito.jpg",
    description: "Fresh grilled chicken on the go.",
    services: ["Fried Chicken", "Barbeque", "Fries"],
  },
];
