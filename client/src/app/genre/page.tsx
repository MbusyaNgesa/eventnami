"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { mockEvents } from "@/lib/mockData";
import UpcomingEvents from "@/components/UpcomingEvents";
import { Button } from "@/components/ui/button";

const genres = ["All", "Jazz", "Pop", "Rock", "Reggae", "Hip Hop"];

export default function GenrePage() {
  const searchParams = useSearchParams();
  const initialGenre = searchParams.get("selected") || "all";
  const [selectedGenre, setSelectedGenre] = useState(
    initialGenre.toLowerCase()
  );

  useEffect(() => {
    const selected = searchParams.get("selected");
    if (selected) {
      setSelectedGenre(selected.toLowerCase());
    }
  }, [searchParams]);

  const filteredEvents =
    selectedGenre === "all"
      ? mockEvents
      : mockEvents.filter(
          (event) => event.genre.toLowerCase() === selectedGenre
        );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap gap-4 mb-8">
        {genres.map((genre) => (
          <Button
            key={genre}
            variant={
              selectedGenre === genre.toLowerCase() ? "default" : "outline"
            }
            onClick={() => setSelectedGenre(genre.toLowerCase())}
          >
            {genre}
          </Button>
        ))}
      </div>
      <UpcomingEvents events={filteredEvents} isLoading={false} />
    </div>
  );
}
