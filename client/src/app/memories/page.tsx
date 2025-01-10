import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { mockMemories } from "@/lib/mockData";

export default function MemoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Event Memories</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockMemories.map((memory) => (
          <Link href={`/memories/${memory.id}`} key={memory.id}>
            <Card className="hover:shadow-lg transition-shadow">
              <Image
                src={memory.images[0]}
                alt={memory.eventName}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{memory.eventName}</h3>
                {/* <p className="text-sm text-gray-500">{memory.date}</p> */}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
