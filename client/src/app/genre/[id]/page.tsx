"use client";

import { use, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Event {
  _id: string;
  name: string;
  genre: string;
  location: string;
  price: number;
  image: string;
}
interface GenrePageProps {
  params: Promise<{
    id: string;
  }>;
}

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function GenrePage({ params }: GenrePageProps) {
  const router = useRouter();

  const { id } = use(params);
  const [events, setEvents] = useState<Event[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const genreResponse = await axios.get<{
          success: boolean;
          data: { genreName: string }[];
        }>(`${url}/api/v1/genre/all`);

        setGenres(
          (genreResponse.data.data || []).map((genre) => genre.genreName)
        );

        const eventResponse = await axios.get<{
          success: boolean;
          data: {
            _id: string;
            name: string;
            genre: string;
            location: string;
            price: number;
            image: string;
          }[];
        }>(`${url}/api/v1/event`);
        console.log(eventResponse.data);
        setEvents(eventResponse.data.data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents =
    id === "all"
      ? events
      : events.filter(
          (event) =>
            event.genre && event.genre.toLowerCase() === id.toLowerCase()
        );

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                key="all"
                variant={id === "all" ? "default" : "outline"}
                onClick={() => router.push("/genre/all")} // Use router.push
              >
                All
              </Button>
              {genres.map((genre, index) => (
                <Button
                  key={index}
                  variant={id === genre.toLowerCase() ? "default" : "outline"}
                  onClick={() => router.push(`/genre/${genre.toLowerCase()}`)} // Use router.push
                >
                  {genre}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div key={event._id}>
                    <Link href={`/event/${event._id}`}>
                      <Card className="hover:shadow-lg transition-shadow">
                        <Image
                          src={event.image}
                          alt={event.name}
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover"
                        />
                        <CardContent>
                          {/* <div className="card-body p-5 bg-orange-400"> */}
                          <h3 className="text-lg font-semibold">
                            {event.name}
                          </h3>
                          <p className="text-sm text-gray-700">
                            Genre: {event.genre}
                          </p>
                          <p className="text-sm text-gray-700">
                            Location: {event.location}
                          </p>
                          <p className="text-sm text-gray-700">
                            Price: KES {event.price}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                ))
              ) : (
                <div>No events found for this genre.</div>
              )}
            </div>
          </>
        </>
      )}
    </div>
  );
}
