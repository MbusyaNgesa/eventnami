"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface Memory {
  eventId: string;
  image: string[];
}

export default function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await axios.get<{ success: boolean; data: Memory[] }>(
          "http://localhost:5002/api/v1/memories"
        );
        setMemories(response.data.data);
      } catch (error) {
        console.error("Error fetching memories:", error);
      }
    };

    fetchMemories();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Event Memories</h1>
      {memories.length === 0 ? (
        <p>No memories found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {memories.map((memory) => (
            <Link href={`/memories/${memory.eventId}`} key={memory.eventId}>
              <Card className="hover:shadow-lg transition-shadow">
                <Image
                  src={`http://localhost:5002${memory.image[0]}`} // Use the first image
                  alt={`Memory for event ${memory.eventId}`}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">
                    Event ID: {memory.eventId}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// import Image from "next/image";
// import Link from "next/link";
// import { Card, CardContent } from "@/components/ui/card";
// // import { mockMemories } from "@/lib/mockData";
// import { useEffect, useState } from "react";
// import axios from "axios";

// interface Memory {
//   eventId: string;
//   image: string[];
// }

// export default function MemoriesPage() {
//   const [memories, setMemories] = useState<Memory[]>([]);

//   useEffect(() => {
//     const fetchMemories = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5002/api/v1/memories`
//         );
//         console.log("Fetched event:", response.data);
//         setMemories(response.data.data);
//       } catch (error) {
//         console.error("Error fetching event:", error);
//       }
//     };
//     fetchMemories();
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Event Memories</h1>
//       {memories.length === 0 ? (
//         <p>No memories found.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {memories.map((memory, index) => (
//             <Link href={`/memories/${memory.eventId}`} key={index}>
//               <Card className="hover:shadow-lg transition-shadow">
//                 <Image
//                   src={memory.image[0]} // Assuming the first image is displayed
//                   alt={`Memory for event ${memory.eventId}`}
//                   width={400}
//                   height={300}
//                   className="w-full h-48 object-cover rounded-t-lg"
//                 />
//                 <CardContent className="p-4">
//                   <h3 className="text-lg font-semibold">
//                     Event ID: {memory.eventId}
//                   </h3>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );

// return (
//   <div className="container mx-auto px-4 py-8">
//     <h1 className="text-3xl font-bold mb-8">Event Memories</h1>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       {memories.map((memory) => (
//         <Link href={`/memories/${memory.id}`} key={memory.id}>
//           <Card className="hover:shadow-lg transition-shadow">
//             <Image
//               src={memory.images[0]}
//               alt={memory.eventName}
//               width={400}
//               height={300}
//               className="w-full h-48 object-cover rounded-t-lg"
//             />
//             <CardContent className="p-4">
//               <h3 className="text-lg font-semibold">{memory.eventName}</h3>
//               {/* <p className="text-sm text-gray-500">{memory.date}</p> */}
//             </CardContent>
//           </Card>
//         </Link>
//       ))}
//     </div>
//   </div>
// );
//}
