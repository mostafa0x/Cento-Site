"use client";

import { useState, useEffect } from "react";
import HeaderSection from "@/components/HeaderSection";
import BestSellersSection from "@/components/BestSellersSection";
import ActionButtonsSection from "@/components/ActionButtonsSection";
import ShowcaseSection from "@/components/ShowcaseSection";

export default function Home() {
  const [isInitialEntrance, setIsInitialEntrance] = useState<boolean>(true);

  // Complete initial waterfall entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialEntrance(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen w-full max-w-full flex justify-center items-start overflow-x-hidden bg-transparent select-none">
      {/* Centered Mobile Container (max-w-[420px]) */}
      <div className="relative z-10 w-full max-w-105 flex flex-col justify-start pb-4 overflow-x-hidden">
        {/* Part 1: Logo & Social Icons */}
        <HeaderSection />

        {/* Part 2: Best Sellers 2-card Carousel */}
        <BestSellersSection isInitialEntrance={isInitialEntrance} />

        {/* Part 3: Action Buttons (Shop Now & Take an Offer) */}
        <ActionButtonsSection />

        {/* Part 4: Split Showcase (Product 22.87° tilt + Reviews & Locations) */}
        <ShowcaseSection />
      </div>
    </main>
  );
}
