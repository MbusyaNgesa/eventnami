"use client";

import { useState } from "react";
import { EventDraft } from "@/types/organizer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EventListProps {
  events: EventDraft[];
}

export function EventList({ events }: EventListProps) {
  // const [activeTab, setActiveTab] = useState("current");

  const currentDate = new Date();
  const currentEvents = events.filter(
    (event) => new Date(event.date) >= currentDate && !event.isDraft
  );
  const pastEvents = events.filter(
    (event) => new Date(event.date) < currentDate && !event.isDraft
  );

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="current" className="space-y-4">
          <TabsList>
            <TabsTrigger value="current">Current Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          <TabsContent value="current">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {currentEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{event.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.date}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="past">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {pastEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{event.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.date}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
