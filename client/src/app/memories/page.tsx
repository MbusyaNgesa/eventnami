"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface Memory {
  _id: string;
  eventId: string;
  image: string[];
  memoryName: string;
}

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await axios.get<{ success: boolean; data: Memory[] }>(
          `${url}/api/v1/memories`
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
            <Link href={`/memories/${memory._id}`} key={memory._id}>
              <Card className="hover:shadow-lg transition-shadow">
                <Image
                  src={`${url}${memory.image[0]}`} // Use the first image
                  alt={`Memory for event ${memory.memoryName}`}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover "
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{memory.memoryName}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
