"use client";

import Image from "next/image";
import { useState } from "react";
import { Vendor } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VendorCardProps {
  vendor: Vendor;
}

export function VendorCard({ vendor }: VendorCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="w-64 h-40 rounded-lg cursor-pointer transition-transform hover:scale-105"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={vendor.image}
          alt={vendor.name}
          width={256}
          height={160}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold mb-4">
              {vendor.name}
            </DialogTitle>
            <DialogDescription>
              <Image
                src={vendor.image}
                alt={vendor.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="mb-4 text-gray-700">{vendor.description}</div>
              <h4 className="font-semibold mb-2">Services:</h4>
              <ul className="list-disc list-inside space-y-1">
                {vendor.services.map((service) => (
                  <li key={service} className="text-gray-700">
                    {service}
                  </li>
                ))}
              </ul>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
