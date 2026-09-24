"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { SHOWCASE_PRODUCTS, REVIEWS, LOCATIONS } from "@/data/linktreeData";

export default function ShowcaseSection() {
  // Product Rotator State
  const [currentProductIndex, setCurrentProductIndex] = useState<number>(0);
  const [isProductTransitioning, setIsProductTransitioning] = useState<boolean>(false);

  // Review Rotator State
  const [currentReviewIndex, setCurrentReviewIndex] = useState<number>(0);
  const [isReviewTransitioning, setIsReviewTransitioning] = useState<boolean>(false);

  // Product Auto-Loop (Slides out to left, enters from left)
  useEffect(() => {
    const productInterval = setInterval(() => {
      setIsProductTransitioning(true);
      setTimeout(() => {
        setCurrentProductIndex((prev) => (prev + 1) % SHOWCASE_PRODUCTS.length);
        setIsProductTransitioning(false);
      }, 260);
    }, 4500);

    return () => clearInterval(productInterval);
  }, []);

  // Review Auto-Loop (Slides out to left, enters from left)
  useEffect(() => {
    const reviewInterval = setInterval(() => {
      setIsReviewTransitioning(true);
      setTimeout(() => {
        setCurrentReviewIndex((prev) => (prev + 1) % REVIEWS.length);
        setIsReviewTransitioning(false);
      }, 350);
    }, 5000);

    return () => clearInterval(reviewInterval);
  }, []);

  return (
    <section className="w-full px-4 pt-4">
      <div className="grid grid-cols-1 min-[375px]:grid-cols-[1fr_1.15fr] gap-4 min-[375px]:gap-3 items-stretch">

        {/* Left Column (or Top on < 375px): Product Showcase Bottle */}
        <div
          className="relative w-full h-62.5 min-[375px]:h-71.25 flex items-center justify-center overflow-visible animate-slide-in-left-fast"
          style={{ animationDelay: "2050ms" }}
          aria-label={SHOWCASE_PRODUCTS[currentProductIndex].alt}
        >
          <div
            className={`relative w-full h-full flex items-center justify-center transition-all ${
              isProductTransitioning
                ? "animate-slide-out-left-fast"
                : "animate-slide-in-left-loop-fast"
            }`}
          >
            {/* Perfume bottle with exact 22.87° tilt */}
            <div
              className="relative w-37.5 h-60 min-[375px]:w-41.25 min-[375px]:h-66.25 transition-transform duration-300 hover:scale-105"
              style={{ transform: "rotate(-22.87deg)" }}
            >
              <Image
                src={SHOWCASE_PRODUCTS[currentProductIndex].image}
                alt={SHOWCASE_PRODUCTS[currentProductIndex].alt}
                fill
                priority
                loading="eager"
                sizes="(max-width: 374px) 70vw, (max-width: 420px) 45vw, 190px"
                className="object-contain object-center drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Hidden preloader for secondary showcase image to ensure instant switch & zero LCP delay */}
        <div className="hidden" aria-hidden="true">
          {SHOWCASE_PRODUCTS.map((prod) => (
            <Image
              key={prod.id}
              src={prod.image}
              alt=""
              width={10}
              height={10}
              priority
              loading="eager"
            />
          ))}
        </div>

        {/* Right Column (or Bottom on < 375px): Reviews Card + Location Buttons */}
        <div
          className="flex flex-col justify-between animate-slide-right-fast h-auto min-[375px]:h-71.25 gap-4 min-[375px]:gap-0"
          style={{ animationDelay: "2250ms" }}
        >
          {/* Reviews Card */}
          <div className="bg-white rounded-[20px] p-3.5 shadow-md flex flex-col justify-between h-33.75 relative overflow-hidden">
            {/* Fixed "Reviews" Title - mid (Medium) */}
            <h3 className="font-medium text-[14px] text-black tracking-tight">
              Reviews
            </h3>

            {/* Dynamic Comment Body - Regular */}
            <div className="my-auto overflow-hidden">
              <div
                className={`transition-all duration-300 ${isReviewTransitioning
                    ? "animate-slide-out-left"
                    : "animate-slide-in-left-loop"
                  }`}
              >
                <p className="text-[11.5px] leading-tight text-[#333333] font-normal line-clamp-3">
                  {REVIEWS[currentReviewIndex].text}
                </p>
              </div>
            </div>

            {/* 5 Yellow Stars (aligned to the right) */}
            <div className="flex items-center justify-end gap-[1.5px] pt-1">
              {[...Array(REVIEWS[currentReviewIndex].rating)].map((_, i) => (
                <span
                  key={i}
                  className="text-[#EAB308] text-[13px] leading-none select-none transition-transform duration-300 hover:scale-125"
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Location Buttons: 16px between Reviews & Mokattam, 16px between Mokattam & Sayeda Zeinab */}
          <div className="flex flex-col gap-4 mt-4">
            {LOCATIONS.map((loc) => (
              <a
                key={loc.name}
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11.5 bg-white rounded-full flex items-center px-4 gap-3 shadow-md hover:bg-neutral-50 active:scale-95 transition-all duration-150 cursor-pointer"
              >
                <Image
                  src="/icons/LocIcon.svg"
                  alt="Location"
                  width={20}
                  height={20}
                  className="w-5 h-5 shrink-0"
                />
                <span className="font-semibold text-[14px] text-black tracking-tight truncate">
                  {loc.name}
                </span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
