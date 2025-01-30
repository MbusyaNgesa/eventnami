"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

function GenrePageContent() {
  const [genres, setGenres] = useState<string[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const selectedGenre = searchParams.get("selected") || "all";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genreResponse, eventResponse] = await Promise.all([
          axios.get<{
            success: boolean;
            data: { genreName: string }[];
          }>(`${url}/api/v1/genre/all`),
          axios.get<{
            success: boolean;
            data: any[];
          }>(`${url}/api/v1/event`),
        ]);

        setGenres(
          (genreResponse.data.data || []).map((genre) => genre.genreName)
        );
        setEvents(eventResponse.data.data || []);
      } catch (error) {
        console.error("Error fetching genres or events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredEvents =
    selectedGenre.toLowerCase() === "all"
      ? events
      : events.filter(
          (event) =>
            event.genre &&
            event.genre.toLowerCase() === selectedGenre.toLowerCase()
        );

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <Skeleton>
          <div>Loading...</div>
        </Skeleton>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 mb-8">
            <Button
              key="all"
              variant={selectedGenre === "all" ? "default" : "outline"}
              onClick={() => {
                window.location.href = "/genre?selected=all";
              }}
            >
              All
            </Button>
            {genres.map((genre, index) => (
              <Button
                key={index}
                variant={
                  selectedGenre.toLowerCase() === genre.toLowerCase()
                    ? "default"
                    : "outline"
                }
                onClick={() => {
                  window.location.href = `/genre?selected=${genre.toLowerCase()}`;
                }}
              >
                {genre}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
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
                    <h3 className="text-lg font-semibold">{event.name}</h3>
                    <p className="text-sm text-gray-700">
                      Genre: {event.genre}
                    </p>
                    <p className="text-sm text-gray-700">
                      Location: {event.location}
                    </p>
                    <p className="text-sm text-gray-700">
                      Price: ${event.price}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div>No events found for this genre.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function GenrePage() {
  return (
    <Suspense fallback={<Skeleton>Loading...</Skeleton>}>
      <GenrePageContent />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
