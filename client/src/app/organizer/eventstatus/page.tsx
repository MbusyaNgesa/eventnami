"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockEventDrafts } from "@/lib/mockOrganizer";

export default function EventStatus() {
  const approvedEvents = mockEventDrafts.filter(
    (event) => event.status === "approved"
  );
  const pendingEvents = mockEventDrafts.filter(
    (event) => event.status === "pending"
  );
  const declinedEvents = mockEventDrafts.filter(
    (event) => event.status === "declined"
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Event Status</h1>

      <Tabs defaultValue="approved" className="space-y-4">
        <TabsList>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="declined">Declined</TabsTrigger>
        </TabsList>

        <TabsContent value="approved">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {approvedEvents.map((event) => (
              <Card key={event._id}>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{event.name}</h3>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                  <p className="text-sm text-green-500">Approved</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pendingEvents.map((event) => (
              <Card key={event._id}>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{event.name}</h3>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                  <p className="text-sm text-yellow-500">Pending</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="declined">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {declinedEvents.map((event) => (
              <Card key={event._id}>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{event.name}</h3>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                  <p className="text-sm text-red-500">Declined</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
