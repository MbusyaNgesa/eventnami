"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Genre } from "@/types";

interface GenreProps {
  genres: Genre[];
}

export default function Genre({ genres }: GenreProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const content = contentRef.current;
    if (!carousel || !content) return;

    // Clone items for infinite scroll
    const items = Array.from(content.children);
    items.forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement;
      content.appendChild(clone);
    });

    let scrollInterval: NodeJS.Timeout;
    let resetTimeout: NodeJS.Timeout | null = null;

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (carousel.scrollLeft >= content.scrollWidth / 2) {
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
      if (resetTimeout) {
        clearTimeout(resetTimeout); // Check if resetTimeout is not null
      }
      carousel.removeEventListener("mouseenter", stopScroll);
      carousel.removeEventListener("mouseleave", startScroll);
    };
  }, []);

  return (
    <div ref={carouselRef} className="flex overflow-x-hidden">
      <div ref={contentRef} className="flex">
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/genre?selected=${genre.name.toLowerCase()}`}
            className="flex-shrink-0 mr-4"
          >
            <div
              className="w-64 h-40 rounded-lg flex items-center justify-center text-white font-bold text-xl"
              style={{
                backgroundImage: `url(${genre.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span className="bg-black bg-opacity-50 px-4 py-2 rounded">
                {genre.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
