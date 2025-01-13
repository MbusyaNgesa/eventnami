import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RevenueChart } from "@/components/organizer/RevenueChart";
import Link from "next/link";
import { mockEventDrafts, mockRevenueData } from "@/lib/mockOrganizer";

export default function OrganizerDashboard() {
  const currentDate = new Date();
  const currentEvents = mockEventDrafts.filter(
    (event) => new Date(event.date) >= currentDate && !event.isDraft
  );
  const pastEvents = mockEventDrafts.filter(
    (event) => new Date(event.date) < currentDate && !event.isDraft
  );

  return (
    <div className="p-6 space-y-6">
      {/* Action Buttons */}
      <div className="flex gap-4">
        <Link href="/organizer/addevent">
          <Button size="lg">Add Event</Button>
        </Link>
        <Link href="/organizer/ticketssold">
          <Button size="lg">Tickets Sold</Button>
        </Link>
        <Link href="/organizer/eventstatus">
          <Button size="lg">Event Status</Button>
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Revenue Graph */}
        <Card className="col-span-3 p-6">
          <h2 className="text-xl font-semibold mb-4">Revenue Graph</h2>
          <div className="h-[300px]">
            <RevenueChart data={mockRevenueData} />
          </div>
        </Card>

        {/* Current/Past Events */}
        <Card className="col-span-2 p-6">
          <Tabs defaultValue="current" className="h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">Current</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            <TabsContent value="current" className="mt-4">
              <div className="space-y-4">
                {currentEvents.map((event) => (
                  <Card key={event.id} className="p-4">
                    <h3 className="font-semibold">{event.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.date}
                    </p>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="past" className="mt-4">
              <div className="space-y-4">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="p-4">
                    <h3 className="font-semibold">{event.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.date}
                    </p>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
