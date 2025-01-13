import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTicketSales } from "@/lib/mockOrganizer";

export default function TicketsSold() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tickets Sold</h1>

      {mockTicketSales.map((event) => (
        <Card key={event.eventId}>
          <CardHeader>
            <CardTitle>{event.eventName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {event.ticketsSold.map((ticket) => (
                <div
                  key={ticket.type}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{ticket.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {ticket.quantity} tickets
                    </p>
                  </div>
                  <p className="font-medium">KES {ticket.revenue}</p>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between font-bold">
                  <p>Total Revenue</p>
                  <p>KES {event.totalRevenue}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
