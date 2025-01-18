"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

export default function GenrePage() {
  const [genres, setGenres] = useState<string[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await axios.get<{
          success: boolean;
          data: { genreName: string }[];
        }>(`http://localhost:5002/api/v1/genre/all`);
        setEvents(events);
        setGenres((response.data.data || []).map((genre) => genre.genreName));
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGenre();
  }, []);

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
      ? events
      : events.filter(
          (event) => event.genre && event.genre.toLowerCase() === selectedGenre
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
              onClick={() => setSelectedGenre("all")}
              // onClick={() => router.push("/genre")} // Use router.push
            >
              All
            </Button>
            {genres.map((genre, index) => (
              <Button
                key={index}
                variant={
                  selectedGenre === genre.toLowerCase() ? "default" : "outline"
                }
                onClick={() => setSelectedGenre(genre.toLowerCase())}
                // onClick={() => router.push(`/genre/${genre.toLowerCase()}`)} // Use router.push
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
      )}
    </div>
  );
}

// // const genres = ["All" "Jazzp", "Pop", "Rock", "Reggae", "Hip Hop"];

// export default function GenrePage() {
//   const [genres, setGenre] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchGenre = async () => {
//       try {
//         // const response = await axios.get(`http://localhost:5002/api/v1/genre`);
//         // setGenre(response.data.data || []);

//         const response = await axios.get<{
//           success: boolean;
//           data: { genreName: string }[];
//         }>(`http://localhost:5002/api/v1/genre`);
//         setGenre(
//           Array.isArray(response.data.data)
//             ? response.data.data.map((g) => g.genreName || "")
//             : []
//         );
//       } catch (error) {
//         console.error("Error fetching genres:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchGenre();
//   }, []);

//   if (isLoading) {
//     return (
//       <Skeleton>
//         <div>Loading...</div>;
//       </Skeleton>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Suspense fallback={<div>Loading genres...</div>}>
//         <GenreContent genres={genres} />
//       </Suspense>
//     </div>
//   );
// }

// function GenreContent({
//   genres,
// }: {
//   genres: { _id: string; genreName: string }[] | string[];
// }) {
//   const [events, setEvents] = useState<
//     {
//       _id: string;
//       name: string;
//       genre: string;
//       location: string;
//       price: number;
//       image: string;
//     }[]
//   >([]);

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

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5002/api/v1/genre`);
//         setEvents(response.data.data || []);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };
//     fetchEvents();
//   }, []);

//   const normalizedGenres =
//     typeof genres[0] === "string"
//       ? (genres as string[]).map((g, index) => ({
//           _id: index.toString(),
//           genreName: g,
//         }))
//       : (genres as { _id: string; genreName: string }[]);

//   const filteredEvents =
//     selectedGenre === "all"
//       ? events
//       : events.filter((event) => event.genre.toLowerCase() === selectedGenre);

//   return (
//     <>
//       <div className="flex flex-wrap gap-4 mb-8">
//         <Button
//           key="all"
//           variant={selectedGenre === "all" ? "default" : "outline"}
//           onClick={() => setSelectedGenre("all")}
//         >
//           All
//         </Button>
//         {normalizedGenres.map((g) => (
//           <Button
//             key={g._id}
//             variant={
//               selectedGenre === g.genreName.toLowerCase()
//                 ? "default"
//                 : "outline"
//             }
//             onClick={() => setSelectedGenre(g.genreName.toLowerCase())}
//           >
//             {g.genreName}
//           </Button>
//         ))}
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filteredEvents.map((event) => (
//           <div key={event._id} className="card">
//             <img src={event.image} alt={event.name} className="card-image" />
//             <div className="card-body">
//               <h3 className="card-title">{event.name}</h3>
//               <p className="card-text">Genre: {event.genre}</p>
//               <p className="card-text">Location: {event.location}</p>
//               <p className="card-text">Price: ${event.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* <div className="flex flex-wrap gap-4 mb-8">
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
//       </div> */}
//       <UpcomingEvents isLoading={false} />
//     </>
//   );
// }
