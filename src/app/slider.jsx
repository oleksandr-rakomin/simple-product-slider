"use client";

import { useRef, useState } from "react";

import { SmallSliderItem } from "@/app/small-slider-item";

import Image from "next/image";

export function Slider({ sliderItemsList = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const startX = useRef(null);

  const goToSlide = (idx) => {
    setCurrentSlide(idx);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => Math.max(0, prevSlide - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      Math.min(sliderItemsList.length - 1, prevSlide + 1)
    );
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (startX.current === null) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;

    const threshold = 50;

    startX.current = null;

    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-y-5 bg-fuchsia-300">
      <div
        id="product-slider"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative overflow-hidden h-150 touch-pan-x"
      >
        {sliderItemsList.map((item, idx) => (
          <Image
            key={item.id}
            src={item.src}
            alt={item.alt}
            fill
            sizes="800px"
            preload={idx === 0}
            aria-hidden={idx !== currentSlide}
            draggable={false}
            className={[
              "absolute inset-0 object-contain",
              idx === currentSlide
                ? "opacity-100"
                : "opacity-0 pointer-events-none",
            ].join(" ")}
          />
        ))}

        <div className="absolute bottom-0 flex gap-x-5">
          <button
            type="button"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            aria-label="Previous slide"
            aria-controls="product-slider"
            className="bg-fuchsia-500 p-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {"<"}
          </button>
          <button
            type="button"
            onClick={nextSlide}
            disabled={currentSlide === sliderItemsList.length - 1}
            aria-label="Next slide"
            aria-controls="product-slider"
            className="bg-fuchsia-500 p-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {">"}
          </button>
        </div>
      </div>

      <ul className="flex gap-5 flex-wrap">
        {sliderItemsList.map((item, idx) => {
          return (
            <SmallSliderItem
              key={item.id}
              item={item}
              goToSlide={goToSlide}
              idx={idx}
              currentSlide={currentSlide}
            />
          );
        })}
      </ul>
    </div>
  );
}
