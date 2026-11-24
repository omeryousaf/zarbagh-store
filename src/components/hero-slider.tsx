"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { HERO_SLIDES } from "@/lib/artwork";
import { cn } from "@/lib/utils";

const SLIDE_MS = 5000;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      return;
    }

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, SLIDE_MS);

    return () => window.clearInterval(id);
  }, [index, paused]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured banners"
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <h1 className="sr-only">From our orchards to your table</h1>
      <div className="relative aspect-[2/1] w-full">
        {HERO_SLIDES.map((slide, slideIndex) => {
          const active = slideIndex === index;

          return (
            <div
              key={slide.src}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-out",
                active
                  ? "z-10 opacity-100"
                  : "pointer-events-none z-0 opacity-0",
              )}
              aria-hidden={!active}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                decoding={slideIndex === 0 ? "sync" : "async"}
                fetchPriority={slideIndex === 0 ? "high" : "auto"}
                draggable={false}
                className="pointer-events-none h-full w-full object-cover object-left select-none"
              />
              <Link
                href="/shop"
                tabIndex={active ? 0 : -1}
                className="absolute z-10 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-orchard px-4 py-2 text-[clamp(0.6875rem,1.8vw,0.9375rem)] font-semibold tracking-[0.12em] text-white uppercase before:absolute before:-inset-4 before:content-[''] hover:bg-orchard/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-5 sm:py-2.5"
                style={{
                  left: slide.cta.left,
                  top: slide.cta.top,
                  minWidth: slide.cta.minWidth,
                  minHeight: slide.cta.minHeight,
                }}
              >
                Shop Now
              </Link>
            </div>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center gap-2">
        {HERO_SLIDES.map((slide, slideIndex) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show slide ${slideIndex + 1} of ${HERO_SLIDES.length}`}
            aria-current={slideIndex === index}
            className={cn(
              "pointer-events-auto size-2.5 rounded-full border border-white/80 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchard",
              slideIndex === index ? "bg-white" : "bg-white/40",
            )}
            onClick={() => setIndex(slideIndex)}
          />
        ))}
      </div>
    </section>
  );
}
