"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Memory } from "@/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MemoriesProps {
  memories: Memory[];
}

export default function Memories({ memories }: MemoriesProps) {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const selectedMemory = memories.find(
    (memory) => memory.eventName === selectedMonth
  );

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <ScrollArea className="h-[300px] w-full md:w-1/3 rounded-md border p-4">
        {memories.map((memory) => (
          <Button
            key={memory.id}
            variant="ghost"
            className="w-full justify-start mb-2"
            onClick={() => setSelectedMonth(memory.eventName)}
          >
            {memory.eventName}
          </Button>
        ))}
      </ScrollArea>
      <div className="w-full md:w-2/3">
        {selectedMemory ? (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {selectedMemory.eventName} Memories
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {selectedMemory.images.slice(0, 2).map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Memory ${index + 1}`}
                  width={300}
                  height={200}
                  className="rounded-md"
                />
              ))}
            </div>
            <Link href="/memories" className="block mt-4">
              <Button>See More Memories</Button>
            </Link>
          </div>
        ) : (
          <p className="text-center text-lg">Select a month to view memories</p>
        )}
      </div>
    </div>
  );
}
