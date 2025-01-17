"use client";

import { use, useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TicketCounter } from "@/components/TicketCounter";
import { VendorCarousel } from "@/components/VendorCarousel";
import UpcomingEvents from "@/components/UpcomingEvents";
import { mockEvents, mockVendors } from "@/lib/mockData";
import { TicketSelection, TicketType } from "@/types";
interface EventDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EventDetails({ params }: EventDetailsProps) {
  const { id } = use(params);
  const event = mockEvents.find((e) => e._id === id);
  const [ticketSelections, setTicketSelections] = useState<TicketSelection[]>(
    []
  );

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

  const similarEvents = mockEvents.filter(
    (e) => e.genre === event.genre && e._id !== event._id
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <Image
          src={event.image}
          alt={event.name}
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
            <Button className="w-full" size="lg">
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
        <UpcomingEvents events={similarEvents} isLoading={false} />
      </section>
    </div>
  );
}
