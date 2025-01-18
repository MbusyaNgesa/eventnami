"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import UpcomingEvents from "@/components/UpcomingEvents";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
// import axios from "axios";

// const genres = ["All", "Jazzp", "Pop", "Rock", "Reggae", "Hip Hop"];

export default function GenrePage() {
  const [genres, setGenre] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        // const response = await axios.get(`http://localhost:5002/api/v1/genre`);
        // setGenre(response.data.data || []);

        const response = await axios.get<{
          success: boolean;
          data: { genreName: string }[];
        }>(`http://localhost:5002/api/v1/genre`);
        setGenre(
          Array.isArray(response.data.data)
            ? response.data.data.map((g) => g.genreName || "")
            : []
        );
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGenre();
  }, []);

  if (isLoading) {
    return (
      <Skeleton>
        <div>Loading...</div>;
      </Skeleton>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading genres...</div>}>
        <GenreContent genres={genres} />
      </Suspense>
    </div>
  );
}

function GenreContent({ genres }: { genres: string[] }) {
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

  // const filteredEvents =
  //   selectedGenre === "all"
  //     ? mockEvents
  //     : mockEvents.filter(
  //         (event) => event.genre.toLowerCase() === selectedGenre
  //       );

  return (
    <>
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
      <UpcomingEvents isLoading={false} />
    </>
  );
}

// export default function GenrePage() {
//   const searchParams = useSearchParams();
//   const initialGenre = searchParams.get("selected") || "all";
//   const [selectedGenre, setSelectedGenre] = useState(
//     initialGenre.toLowerCase()
//   );

//   useEffect(() => {
//     const selected = searchParams.get("selected");
//     if (selected) {
//       setSelectedGenre(selected.toLowerCase());
//     }
//   }, [searchParams]);

//   const filteredEvents =
//     selectedGenre === "all"
//       ? mockEvents
//       : mockEvents.filter(
//           (event) => event.genre.toLowerCase() === selectedGenre
//         );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-wrap gap-4 mb-8">
//         {genres.map((genre) => (
//           <Button
//             key={genre}
//             variant={
//               selectedGenre === genre.toLowerCase() ? "default" : "outline"
//             }
//             onClick={() => setSelectedGenre(genre.toLowerCase())}
//           >
//             {genre}
//           </Button>
//         ))}
//       </div>
//       <UpcomingEvents events={filteredEvents} isLoading={false} />
//     </div>
//   );
// }
