"use client";

import { use, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

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
        }>("https://eventnami.onrender.com/api/v1/genre/all");

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
        }>("https://eventnami.onrender.com/api/v1/event");

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
                  <div key={event._id} className="card">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="card-image"
                    />
                    <div className="card-body">
                      <h3 className="card-title">{event.name}</h3>
                      <p className="card-text">Genre: {event.genre}</p>
                      <p className="card-text">Location: {event.location}</p>
                      <p className="card-text">Price: ${event.price}</p>
                    </div>
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
