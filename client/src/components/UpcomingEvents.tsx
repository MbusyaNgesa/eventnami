"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { MapPin } from "lucide-react";
import { Event } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface UpcomingEventsProps {
  events: Event[];
  isLoading: boolean;
}

export default function UpcomingEvents({
  events: propEvents = [],
  isLoading: propIsLoading = false,
}: UpcomingEventsProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  //fetching from server
  useEffect(() => {
    if (!propEvents.length) {
      const fetchEvents = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            "http://localhost:5002/api/v1/event"
          );
          console.log("Fetched Events:", response.data);
          setEvents(response.data.data || []);
        } catch (error) {
          console.error("Error fetching events:", error);
          setEvents([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchEvents();
    } else {
      setEvents(propEvents);
      setIsLoading(propIsLoading);
    }
  }, [propEvents, propIsLoading]);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);
    updateIsMobile(); // Run initially
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  // const displayEvents = showAll ? events : events.slice(0, isMobile ? 2 : 4);
  const displayEvents = showAll
    ? events
    : (events || []).slice(0, isMobile ? 2 : 4);
  console.log("Events state:", events);
  console.log("Display events:", displayEvents);

  if (!Array.isArray(events)) {
    return <p className="text-center text-lg">No events available</p>;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="w-full">
            <Skeleton className="h-48 w-full" />
            <CardContent className="mt-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return <p className="text-center text-lg">No events available</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayEvents.map((event) => (
          <Link href={`/event/${event._id}`} key={event._id}>
            <Card className="w-full">
              <Image
                src={
                  event.image
                    ? `http://localhost:5002${event.image}`
                    : "/placeholder.jpg"
                }
                alt={event.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
              <CardContent className="mt-4">
                <h3 className="text-lg font-semibold">{event.name}</h3>
                {/* <p className="text-sm text-gray-500">{event.date}</p> */}
                <p className="text-sm font-bold">KES {event.price}</p>
                <div className="flex items-center mt-2">
                  <MapPin size={16} className="mr-1" />
                  {/* <p className="text-sm">{event.location}</p> */}
                </div>
                <p className="text-sm">{event.genre}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {events.length > (isMobile ? 2 : 4) && (
        <CardFooter className="flex justify-center mt-4">
          {isMobile ? (
            <Link href="/events">
              <Button>Show More</Button>
            </Link>
          ) : (
            <Button onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show More"}
            </Button>
          )}
        </CardFooter>
      )}
    </div>
  );
}

// useEffect(() => {
//   if (!propEvents.length) {
//   }
//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get("http://localhost:5002/api/v1/event");
//       console.log("Fetched Events:", response.data);
//       // setEvents(response.data || []);
//       setEvents(response.data.data || []); // Use response.data.data for the array
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       setEvents([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   fetchEvents();
// }, []);
