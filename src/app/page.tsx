"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import HeaderSection from "@/components/HeaderSection";
import BestSellersSection from "@/components/BestSellersSection";
import ActionButtonsSection from "@/components/ActionButtonsSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import ModalToast from "@/components/ModalToast";
import { BestSellerProduct } from "@/data/linktreeData";

export default function Home() {
  const [isInitialEntrance, setIsInitialEntrance] = useState<boolean>(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Complete initial waterfall entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialEntrance(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden bg-black select-none">
      {/* Background Image: Desert Sand Texture Spanning Full Screen */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src="/Background.webp"
          alt="Cento Scent Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Centered Mobile Container (max-w-[420px]) */}
      <div className="relative z-10 w-full max-w-[420px] flex flex-col justify-start pb-4">
        
        {/* Part 1: Logo & Social Icons */}
        <HeaderSection
          onLogoClick={() =>
            setActiveModal("Cento Scent - Exclusive Luxury Fragrance House")
          }
        />

        {/* Part 2: Best Sellers 2-card Carousel */}
        <BestSellersSection
          isInitialEntrance={isInitialEntrance}
          onGetProduct={(product: BestSellerProduct) =>
            setActiveModal(`Selected product: ${product.name}. Ready to order!`)
          }
        />

        {/* Part 3: Action Buttons (Shop Now & Take an Offer) */}
        <ActionButtonsSection
          onShopNow={() =>
            setActiveModal("Opening Cento Scent Official Shop...")
          }
          onTakeOffer={() =>
            setActiveModal("Special Offer: Buy 2 Fragrances & Get Free Shipping!")
          }
        />

        {/* Part 4: Split Showcase (Product 22.87° tilt + Reviews & Locations) */}
        <ShowcaseSection
          onProductClick={() =>
            setActiveModal("Discover our signature perfume blend - crafted with rare essences.")
          }
        />

      </div>

      {/* Interactive Modal Toast */}
      <ModalToast
        message={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </main>
  );
}
