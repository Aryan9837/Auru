"use client";

import { useRef, type ReactNode } from "react";

interface SectionCarouselProps {
  title: string;
  href?: string;
  children: ReactNode;
}

export function SectionCarousel({ title, href, children }: SectionCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = 400;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-2xl tracking-tight">
          {title}
        </h2>
        {href && (
          <a
            href={href}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            See all
          </a>
        )}
      </div>

      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 bg-surface border border-border rounded-full flex items-center justify-center text-muted hover:text-foreground hover:border-fg/20 transition-colors cursor-pointer shadow-md opacity-0 group-hover:opacity-100"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 3l-5 5 5 5" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {children}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-9 h-9 bg-surface border border-border rounded-full flex items-center justify-center text-muted hover:text-foreground hover:border-fg/20 transition-colors cursor-pointer shadow-md opacity-0 group-hover:opacity-100"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>
      </div>
    </section>
  );
}
