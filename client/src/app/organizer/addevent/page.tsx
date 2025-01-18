"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventDraft } from "@/types/organizer";
import { mockEventDrafts } from "@/lib/mockOrganizer";

export default function AddEvent() {
  const router = useRouter();
  const [isDraft, setIsDraft] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newEvent: EventDraft = {
      _id: (mockEventDrafts.length + 1).toString(),
      name: formData.get("name") as string,
      date: formData.get("date") as string,
      price: Number(formData.get("price")),
      location: formData.get("location") as string,
      image: "/placeholder.svg?height=400&width=800", // In real app, handle image upload
      genre: formData.get("genre") as string,
      // description: formData.get("description") as string,
      isDraft: isDraft,
      status: "pending",
    };

    // In a real app, this would be an API call
    mockEventDrafts.push(newEvent);

    if (!isDraft) {
      router.push("/organizer");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Add New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Event Name</Label>
            <Input id="name" name="name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" type="date" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Select name="genre">
              <SelectTrigger>
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jazz">Jazz</SelectItem>
                <SelectItem value="rock">Rock</SelectItem>
                <SelectItem value="pop">Pop</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (KES)</Label>
            <Input id="price" name="price" type="number" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Event Image</Label>
            <Input id="image" name="image" type="file" accept="image/*" />
          </div>

          <div className="flex gap-4">
            <Button type="submit" onClick={() => setIsDraft(false)}>
              Create Event
            </Button>
            <Button
              type="submit"
              variant="outline"
              onClick={() => setIsDraft(true)}
            >
              Save as Draft
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
