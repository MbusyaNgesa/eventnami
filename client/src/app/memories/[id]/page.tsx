import Image from "next/image";
import { notFound } from "next/navigation";
import { mockMemories } from "@/lib/mockData";
import { use } from "react";

interface MemoryDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default function MemoryDetails({ params }: MemoryDetailsProps) {
  const { id } = use(params);
  const memory = mockMemories.find((m) => m.id === id);

  if (!memory) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{memory.eventName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {memory.images.map((image, index) => (
          <div key={index} className="aspect-square">
            <Image
              src={image}
              alt={`${memory.eventName} memory ${index + 1}`}
              width={400}
              height={400}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
