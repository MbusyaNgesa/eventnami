"use client";

import Image from "next/image";
import { notFound } from "next/navigation";

import { use, useEffect, useState } from "react";
import { ImageViewer } from "@/components/ImageViewer";
import axios from "axios";

interface MemoryDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

interface Memory {
  _id: string;
  eventId: string;
  // eventName: string;
  images: string[];
}

const url = `http://localhost:5002`;

export default function MemoryDetails({ params }: MemoryDetailsProps) {
  const { id } = use(params);
  // const memory = mockMemories.find((m) => m.id === id);
  // const { id } = use(params as Promise<{ id: string }>);

  const [memory, setMemory] = useState<Memory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);

  useEffect(() => {
    const fetchMemoryDetails = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/memories/${id}`);
        // setMemory(response.data.data);

        const memoryData = response.data.data;
        setMemory({
          _id: memoryData._id,
          eventId: memoryData.eventId,
          // images: memoryData.image,
          images: memoryData.image.map((img: string) => `${url}${img}`),
        });
      } catch (error) {
        console.error("Error fetching memory details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemoryDetails();
  }, [id]);

  if (isLoading) {
    return <p>Loading memory details...</p>;
  }

  if (!memory) {
    notFound();
  }

  const isViewerOpen = selectedImageIndex !== -1;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{memory.eventId}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {memory?.images?.length > 0 ? (
            memory.images.map((image, index) => (
              <div
                key={index}
                className="relative break-inside-avoid group cursor-pointer"
                onClick={() => setSelectedImageIndex(index)}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    // src={`http://localhost:5002${image}`}
                    src={image}
                    alt={`${memory.eventId} memory ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </div>
            ))
          ) : (
            <p>No images available for this memory.</p>
          )}
        </div>
      </div>

      <ImageViewer
        images={memory.images}
        initialIndex={selectedImageIndex}
        isOpen={isViewerOpen}
        onClose={() => setSelectedImageIndex(-1)}
      />
    </>
  );
}
