// "use client";

// import { useState, useEffect,Suspense } from "react";
// import { useSearchParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import axios from "axios";

// // interface Genre {
// //   genreName: string;
// // }

// export default function GenrePage() {
//   const [genres, setGenres] = useState<string[]>([]);
//   const [events, setEvents] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchGenre = async () => {
//       try {
//         const response = await axios.get<{
//           success: boolean;
//           data: { genreName: string }[];
//         }>(`http://localhost:5002/api/v1/genre/all`);
//         setEvents(events);
//         setGenres((response.data.data || []).map((genre) => genre.genreName));
//       } catch (error) {
//         console.error("Error fetching genres:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchGenre();
//   }, []);

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
//       ? events
//       : events.filter(
//           (event) => event.genre && event.genre.toLowerCase() === selectedGenre
//         );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {isLoading ? (
//         <Skeleton>
//           <div>Loading...</div>
//         </Skeleton>
//       ) : (
//         <>
//           <div className="flex flex-wrap gap-4 mb-8">
//             <Button
//               key="all"
//               variant={selectedGenre === "all" ? "default" : "outline"}
//               onClick={() => setSelectedGenre("all")}
//               // onClick={() => router.push("/genre")} // Use router.push
//             >
//               All
//             </Button>
//             {genres.map((genre, index) => (
//               <Button
//                 key={index}
//                 variant={
//                   selectedGenre === genre.toLowerCase() ? "default" : "outline"
//                 }
//                 onClick={() => setSelectedGenre(genre.toLowerCase())}
//                 // onClick={() => router.push(`/genre/${genre.toLowerCase()}`)} // Use router.push
//               >
//                 {genre}
//               </Button>
//             ))}
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {filteredEvents.length > 0 ? (
//               filteredEvents.map((event) => (
//                 <div key={event._id} className="card">
//                   <img
//                     src={event.image}
//                     alt={event.name}
//                     className="card-image"
//                   />
//                   <div className="card-body">
//                     <h3 className="card-title">{event.name}</h3>
//                     <p className="card-text">Genre: {event.genre}</p>
//                     <p className="card-text">Location: {event.location}</p>
//                     <p className="card-text">Price: ${event.price}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div>No events found for this genre.</div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

export const dynamic = "force-dynamic";

interface Genre {
  genreName: string;
}

export default function GenrePage() {
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
          }>("https://eventnami.onrender.com/api/v1/genre/all"),
          axios.get<{
            success: boolean;
            data: any[];
          }>("https://eventnami.onrender.com/api/v1/event"),
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
