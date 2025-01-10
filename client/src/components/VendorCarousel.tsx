"use client";

import { useRef, useEffect } from "react";
import { Vendor } from "@/types";
import { VendorCard } from "./VendorCard";

interface VendorCarouselProps {
  vendors: Vendor[];
}

export function VendorCarousel({ vendors }: VendorCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollInterval: NodeJS.Timeout;

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (
          carousel.scrollLeft + carousel.clientWidth >=
          carousel.scrollWidth
        ) {
          carousel.scrollLeft = 0;
        } else {
          carousel.scrollLeft += 1;
        }
      }, 20);
    };

    const stopScroll = () => {
      clearInterval(scrollInterval);
    };

    carousel.addEventListener("mouseenter", stopScroll);
    carousel.addEventListener("mouseleave", startScroll);

    startScroll();

    return () => {
      stopScroll();
      carousel.removeEventListener("mouseenter", stopScroll);
      carousel.removeEventListener("mouseleave", startScroll);
    };
  }, []);

  return (
    <div ref={carouselRef} className="flex overflow-x-hidden">
      {vendors.map((vendor) => (
        <div key={vendor.id} className="flex-shrink-0 mr-4">
          <VendorCard vendor={vendor} />
        </div>
      ))}
    </div>
  );
}
