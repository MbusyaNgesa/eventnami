"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { mockMemories } from "@/lib/mockData";
import { use, useState } from "react";
import { ImageViewer } from "@/components/ImageViewer";

interface MemoryDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default function MemoryDetails({ params }: MemoryDetailsProps) {
  const { id } = use(params);
  const memory = mockMemories.find((m) => m.id === id);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);

  if (!memory) {
    notFound();
  }

  const isViewerOpen = selectedImageIndex !== -1;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{memory.eventName}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {memory.images.map((image, index) => (
            <div
              key={index}
              className="relative break-inside-avoid group cursor-pointer"
              onClick={() => setSelectedImageIndex(index)}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={image}
                  alt={`${memory.eventName} memory ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            </div>
          ))}
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
