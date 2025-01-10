import UpcomingEvents from "@/components/UpcomingEvents";
import Memories from "@/components/Memories";
import Genre from "@/components/Genre";
import { mockEvents, mockMemories, mockGenres } from "@/lib/mockData";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <section>
          <Hero />
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          <UpcomingEvents events={mockEvents} isLoading={false} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Memories</h2>
          <Memories memories={mockMemories} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Genres New</h2>
          <Genre genres={mockGenres} />
        </section>
      </main>
    </>
  );
}
