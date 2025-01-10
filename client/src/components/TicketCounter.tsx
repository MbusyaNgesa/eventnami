"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TicketType, TicketSelection } from "@/types";

interface TicketCounterProps {
  ticketTypes: TicketType[];
  onSelectionChange: (selection: TicketSelection[]) => void;
}

export function TicketCounter({
  ticketTypes,
  onSelectionChange,
}: TicketCounterProps) {
  const [selections, setSelections] = useState<TicketSelection[]>(
    ticketTypes.map((type) => ({
      type: type.type,
      quantity: 0,
      totalPrice: type.price,
    }))
  );

  const updateQuantity = (index: number, change: number) => {
    const newSelections = [...selections];
    const newQuantity = Math.max(0, newSelections[index].quantity + change);
    newSelections[index].quantity = newQuantity;
    setSelections(newSelections);
    onSelectionChange(newSelections);
  };

  return (
    <Card>
      <CardContent className="p-6">
        {selections.map((selection, index) => (
          <div
            key={selection.type}
            className="flex items-center justify-between mb-4"
          >
            <span className="font-medium">{selection.type}</span>
            <div className="flex items-center gap-4">
              <span>KES {selection.totalPrice}</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(index, -1)}
                  disabled={selection.quantity === 0}
                >
                  -
                </Button>
                <span className="w-8 text-center">{selection.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(index, 1)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
