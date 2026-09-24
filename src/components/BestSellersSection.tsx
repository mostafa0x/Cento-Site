"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { BEST_SELLERS } from "@/data/linktreeData";

interface BestSellersSectionProps {
  isInitialEntrance?: boolean;
}

export default function BestSellersSection({
  isInitialEntrance = false,
}: BestSellersSectionProps) {
  // 2 products per page
  const page0 = [BEST_SELLERS[0], BEST_SELLERS[1]];
  const page1 = [BEST_SELLERS[2], BEST_SELLERS[3]];

  // 4 slides for seamless infinite looping in both directions:
  // [0]: page1 clone (for backward swipe)
  // [1]: page0 (initial view)
  // [2]: page1 (forward view)
  // [3]: page0 clone (for forward loop)
  const slides = [page1, page0, page1, page0];

  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Touch Swipe Refs
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isSwiping = useRef<boolean>(false);

  // Advance to next pair
  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev >= 3 ? prev : prev + 1));
  }, []);

  // Return to previous pair
  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev <= 0 ? prev : prev - 1));
  }, []);

  // Handle transition end for infinite looping
  const handleTransitionEnd = () => {
    if (currentIndex === 3) {
      // Reached forward clone (page0) -> snap back to index 1 (page0) without transition
      setIsTransitioning(false);
      setCurrentIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    } else if (currentIndex === 0) {
      // Reached backward clone (page1) -> snap to index 2 (page1) without transition
      setIsTransitioning(false);
      setCurrentIndex(2);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  };

  // Safety fallback if onTransitionEnd does not fire (e.g. tab minimized)
  useEffect(() => {
    if (currentIndex === 3) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true);
          });
        });
      }, 550);
      return () => clearTimeout(timer);
    } else if (currentIndex === 0) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(2);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true);
          });
        });
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  // Start auto-scroll after initial waterfall entrance finishes
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll every 1.5 seconds (1500ms)
  useEffect(() => {
    if (!hasStarted || isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 1500);

    return () => clearInterval(interval);
  }, [hasStarted, isPaused, handleNext]);

  // Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    isSwiping.current = false;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    if (
      touchStartX.current !== null &&
      Math.abs(touchStartX.current - touchEndX.current) > 10
    ) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 40) {
        handleNext();
      } else if (distance < -40) {
        handlePrev();
      }
    }
    setTimeout(() => {
      isSwiping.current = false;
    }, 50);
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="w-full px-4 mt-1">
      {/* Header Row: Title */}
      <div
        className="w-full flex items-center justify-between animate-fade-in"
        style={{ animationDelay: "950ms" }}
      >
        <h2 className="text-[17px] font-semibold text-white tracking-tight">
          Best Sellers
        </h2>
      </div>

      {/* Carousel Track Wrapper */}
      <div
        className="w-full pt-3 pb-1 overflow-hidden animate-fade-in select-none"
        style={{ animationDelay: "1250ms" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex w-full ${
            isTransitioning
              ? "transition-transform duration-500 ease-in-out"
              : ""
          }`}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((page, pageIdx) => (
            <div
              key={pageIdx}
              className="w-full shrink-0 grid grid-cols-2 gap-3"
            >
              {page.map((product) => (
                <a
                  key={`${pageIdx}-${product.id}`}
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (isSwiping.current) {
                      e.preventDefault();
                    }
                  }}
                  className="relative block w-full aspect-16/11 rounded-2xl overflow-hidden border-[1.55px] border-[#998A78] shadow-md group transform-gpu will-change-transform cursor-pointer active:scale-[0.98] transition-transform"
                  aria-label={`Get ${product.name}`}
                >
                  {/* Background Product Image covering the card */}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority
                    loading="eager"
                    sizes="(max-width: 420px) 50vw, 200px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Get Button: 45x34 px, radius 20, centered text, bottom-right */}
                  <span className="absolute bottom-2 right-2 w-11.25 h-8.5 rounded-[20px] bg-white text-black font-medium text-[13px] flex items-center justify-center shadow-md group-hover:bg-neutral-100 group-active:scale-90 transition-all duration-150 z-10">
                    Get
                  </span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
