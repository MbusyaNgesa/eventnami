"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TicketCounter } from "@/components/TicketCounter";
import { VendorCarousel } from "@/components/VendorCarousel";
import UpcomingEvents from "@/components/UpcomingEvents";
import { mockVendors } from "@/lib/mockData";
import { TicketSelection, TicketType } from "@/types";
import { useParams } from "next/navigation";
import axios from "axios";

interface Event {
  name: string;
  date: string;
  location: string;
  genre: string;
  image?: string;
  price: number;
}

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function EventDetails() {
  // const { id } = use(params);
  const { id } = useParams();
  // const event = mockEvents.find((e) => e._id === id);
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ticketSelections, setTicketSelections] = useState<TicketSelection[]>(
    []
  );

  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/event/${id}`);
        console.log("Fetched event:", response.data);
        setEvent(response.data.data); // Adjust based on your backend response structure...Do not forget
      } catch (error) {
        console.error("Error fetching event:", error);
        setEvent(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    // console.log("Event details:", event);
  }, [event]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  const ticketTypes: TicketType[] = [
    { type: "Advance", price: event.price * 0.8 },
    { type: "Regular", price: event.price },
    { type: "VIP", price: event.price * 1.5 },
  ];

  const totalTickets = ticketSelections.reduce(
    (sum, selection) => sum + selection.quantity,
    0
  );
  const totalAmount = ticketSelections.reduce(
    (sum, selection) => sum + selection.quantity * selection.totalPrice,
    0
  );

  // const payHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   console.log("Sending phone number:", phone);

  //   try {
  //     const response = await axios.post(`${url}/api/v1/mpesa`, {
  //       phone,
  //     });
  //     console.log("Payment successful:", response.data);
  //   } catch (error) {
  //     console.error("Payment failed:", error);
  //   }
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <Image
          src={event.image ? `${url}${event.image}` : "/summer2.jpg"}
          alt={event.name || "No Event Pic"}
          width={800}
          height={400}
          className="w-full h-[400px] object-cover rounded-t-lg"
        />

        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
          <p className="text-lg mb-2">{event.date}</p>
          <div className="flex items-center mb-4">
            <MapPin className="mr-2" />
            <span>{event.location}</span>
          </div>
          <p className="text-lg">
            Genre: <span className="font-semibold">{event.genre}</span>
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <TicketCounter
          ticketTypes={ticketTypes}
          onSelectionChange={setTicketSelections}
        />
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between mb-4">
              <span>Service Fee</span>
              <span>0</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Number of Tickets</span>
              <span>{totalTickets}</span>
            </div>
            <div className="flex justify-between mb-6">
              <span className="font-bold">Total Amount</span>
              <span className="font-bold">KES {totalAmount}</span>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={() => setShowModal(true)}
            >
              Book Now
            </Button>
          </CardContent>
        </Card>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Vendors</h2>
        <VendorCarousel vendors={mockVendors} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Events You May Like</h2>
        {/* <UpcomingEvents isLoading={false} /> */}
        <UpcomingEvents />
      </section>

      {/* Modal for Booking Input */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Enter Your Details</h2>
            <input
              type="text"
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="Enter your name"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setShowModal(false)}>Cancel</Button>
              {/* <Button onClick={payHandler}>Confirm</Button> */}
              <Button onClick={() => alert(`Booking confirmed for: ${phone}`)}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
