"use client";

import Image from "next/image";
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
    <main className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden bg-[#946549] select-none">
      {/* Background Image: Desert Sand Texture Spanning Full Screen */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#946549]">
        <Image
          src="/Background.webp"
          alt="Cento Scent Background"
          fill
          priority
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADQAwCdASoQABUAPzmEuVOvKKWisAgB4CcJQBYdgxVkJNps55AljgAA+foAeHYqqoNILzjlVzlHXXiIwyDZQDGQeZd2Qpx2snb8WuQfoKmUAAAA"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Centered Mobile Container (max-w-[420px]) */}
      <div className="relative z-10 w-full max-w-105 flex flex-col justify-start pb-4">
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
