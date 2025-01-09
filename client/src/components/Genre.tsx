"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { Genre } from "@/types";

interface GenreProps {
  genres: Genre[];
}

export default function Genre({ genres }: GenreProps) {
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
      {genres.map((genre) => (
        <Link
          key={genre.id}
          href={`/genre/${genre.id}`}
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
  );
}