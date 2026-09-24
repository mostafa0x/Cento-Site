"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { BEST_SELLERS, BestSellerProduct } from "@/data/linktreeData";

interface BestSellersSectionProps {
  isInitialEntrance: boolean;
  onGetProduct: (product: BestSellerProduct) => void;
}

export default function BestSellersSection({
  isInitialEntrance,
  onGetProduct,
}: BestSellersSectionProps) {
  const [carouselPage, setCarouselPage] = useState<number>(0);
  const [carouselDirection, setCarouselDirection] = useState<"next" | "prev">("next");
  const [isCarouselAnimating, setIsCarouselAnimating] = useState<boolean>(false);

  // Touch Swipe Refs
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handlePrev = () => {
    if (isCarouselAnimating) return;
    setCarouselDirection("prev");
    setIsCarouselAnimating(true);
    setCarouselPage((prev) => (prev === 0 ? 1 : 0));
    setTimeout(() => {
      setIsCarouselAnimating(false);
    }, 600);
  };

  const handleNext = () => {
    if (isCarouselAnimating) return;
    setCarouselDirection("next");
    setIsCarouselAnimating(true);
    setCarouselPage((prev) => (prev === 0 ? 1 : 0));
    setTimeout(() => {
      setIsCarouselAnimating(false);
    }, 600);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) {
      handleNext();
    } else if (distance < -40) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // 2 products per page
  const visibleProducts =
    carouselPage === 0
      ? [BEST_SELLERS[0], BEST_SELLERS[1]]
      : [BEST_SELLERS[2], BEST_SELLERS[3]];

  return (
    <section className="w-full px-[16px] mt-1">
      {/* Header Row: Title & Arrow Controls (gap: 6px) */}
      <div
        className="w-full flex items-center justify-between animate-fade-in"
        style={{ animationDelay: "950ms" }}
      >
        <h2 className="text-[17px] font-bold text-black tracking-tight">
          Best Sellers
        </h2>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-[6px]">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Products"
            className="w-[25px] h-[25px] rounded-full flex items-center justify-center cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-90 shadow-sm"
          >
            <Image
              src="/icons/ArrowLeftIcon.svg"
              alt="Previous"
              width={25}
              height={25}
              className="w-[25px] h-[25px]"
            />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Products"
            className="w-[25px] h-[25px] rounded-full flex items-center justify-center cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-90 shadow-sm"
          >
            <Image
              src="/icons/ArrowRightIcon.svg"
              alt="Next"
              width={25}
              height={25}
              className="w-[25px] h-[25px]"
            />
          </button>
        </div>
      </div>

      {/* Products Carousel - Figma: pt:12 */}
      <div
        className="w-full pt-[12px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="grid grid-cols-2 gap-3 w-full">
          {visibleProducts.map((product, idx) => {
            let animClass = "";
            let animStyle: React.CSSProperties | undefined = undefined;

            if (isInitialEntrance) {
              animClass =
                idx === 0
                  ? "animate-slide-in-left"
                  : "animate-slide-in-right";
              animStyle = { animationDelay: "1250ms" };
            } else if (isCarouselAnimating) {
              animClass =
                carouselDirection === "next"
                  ? "animate-slide-in-right"
                  : "animate-slide-in-left-loop";
            }

            return (
              <div
                key={`${carouselPage}-${product.id}`}
                style={animStyle}
                className={`relative w-full aspect-[16/11] rounded-[16px] overflow-hidden border-[1.55px] border-[#998A78] shadow-md group transform-gpu will-change-transform ${animClass}`}
              >
                {/* Background Product Image covering the card */}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 420px) 50vw, 200px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Get Button: 45x34 px, radius 20, centered text, bottom-right */}
                <button
                  type="button"
                  onClick={() => onGetProduct(product)}
                  className="absolute bottom-2 right-2 w-[45px] h-[34px] rounded-[20px] bg-white text-black font-semibold text-[13px] flex items-center justify-center shadow-md cursor-pointer hover:bg-neutral-100 active:scale-90 transition-all duration-150 z-10"
                >
                  Get
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
