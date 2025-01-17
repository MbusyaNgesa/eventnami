"use client";

import { use, useState } from "react";
import UpcomingEvents from "@/components/UpcomingEvents";
import { Button } from "@/components/ui/button";

const genres = ["All", "Jazz", "Pop", "Rock", "Reggae", "Hip Hop"];

interface GenrePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function GenrePage({ params }: GenrePageProps) {
  const { id } = use(params);
  const [selectedGenre, setSelectedGenre] = useState(id);

  // const filteredEvents =
  //   selectedGenre === "All"
  //     ? mockEvents
  //     : mockEvents.filter(
  //         (event) => event.genre.toLowerCase() === selectedGenre.toLowerCase()
  //       );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap gap-4 mb-8">
        {genres.map((genre) => (
          <Button
            key={genre}
            variant={selectedGenre === genre ? "default" : "outline"}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </Button>
        ))}
      </div>
      <UpcomingEvents isLoading={false} />
    </div>
  );
}
