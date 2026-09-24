"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// Best Sellers Data
const BEST_SELLERS = [
  {
    id: 1,
    name: "Luxury Explosion",
    image: "/best sellers/Black Ice.webp",
  },
  {
    id: 2,
    name: "Fragrance Splash",
    image: "/best sellers/Cento Car.webp",
  },
  {
    id: 3,
    name: "Home Diffuser",
    image: "/best sellers/Cento Home Diffuser.webp",
  },
  {
    id: 4,
    name: "Stronger With You",
    image: "/best sellers/Stronger With You.webp",
  },
];

// Product Showcase Images (Rotator)
const SHOWCASE_PRODUCTS = [
  {
    id: 1,
    image: "/Products/product1.webp",
    alt: "Cento Scent Explosive Fragrance Bottle",
  },
  {
    id: 2,
    image: "/Products/product2.webp",
    alt: "Cento Scent Luxury Perfume Edition",
  },
];

// Customer Reviews Data
const REVIEWS = [
  {
    id: 1,
    text: "fatastic experience i will buy another one for my wife",
    rating: 5,
  },
  {
    id: 2,
    text: "Incredible fragrance longevity! Elegant, deep, and luxurious scent.",
    rating: 5,
  },
  {
    id: 3,
    text: "Best perfume I've purchased this year. Everyone asks about it!",
    rating: 5,
  },
  {
    id: 4,
    text: "Pure perfection in every spray. Packaging and bottle look stunning.",
    rating: 5,
  },
];

export default function Home() {
  // Best Sellers Carousel Page (0 = items [0, 1], 1 = items [2, 3])
  const [carouselPage, setCarouselPage] = useState<number>(0);
  const [isInitialEntrance, setIsInitialEntrance] = useState<boolean>(true);
  const [carouselDirection, setCarouselDirection] = useState<"next" | "prev">("next");

  // Touch Swipe for Best Sellers
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Section 4 Product Showcase Rotator
  const [currentProductIndex, setCurrentProductIndex] = useState<number>(0);
  const [isProductTransitioning, setIsProductTransitioning] = useState<boolean>(false);

  // Section 4 Review Rotator
  const [currentReviewIndex, setCurrentReviewIndex] = useState<number>(0);
  const [isReviewTransitioning, setIsReviewTransitioning] = useState<boolean>(false);

  // Modal / Toast feedback for interactions
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Initial Entrance Animation completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialEntrance(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Section 4: Product Image Auto-Loop
  // "وكل ما الصوره تتغير تخرج الصوره الحاليه من الشمال وتدخل واحده تانيه من الشمال وهكذا في لوب"
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

  // Section 4: Reviews Auto-Loop
  // "الانميشن : خلي الحالي يخرج من الشمال و يدخل الجديد من الشمال برضو"
  useEffect(() => {
    const reviewInterval = setInterval(() => {
      setIsReviewTransitioning(true);
      setTimeout(() => {
        setCurrentReviewIndex((prev) => (prev + 1) % REVIEWS.length);
        setIsReviewTransitioning(false);
      }, 400);
    }, 5000);

    return () => clearInterval(reviewInterval);
  }, []);

  // Best Sellers Carousel Controls
  const handlePrev = () => {
    setCarouselDirection("prev");
    setCarouselPage((prev) => (prev === 0 ? 1 : 0));
  };

  const handleNext = () => {
    setCarouselDirection("next");
    setCarouselPage((prev) => (prev === 0 ? 1 : 0));
  };

  // Touch handlers for carousel swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 40;
    const isRightSwipe = distance < -40;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Active products in the 2-item carousel
  const visibleProducts =
    carouselPage === 0
      ? [BEST_SELLERS[0], BEST_SELLERS[1]]
      : [BEST_SELLERS[2], BEST_SELLERS[3]];

  return (
    <main className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden bg-black select-none">
      {/* Background Image: Desert Sand Texture, Spanning Full Screen */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <Image
          src="/Background.webp"
          alt="Cento Scent Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft vignette overlay for refined luxury depth */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Centered Mobile Container */}
      <div className="relative z-10 w-full max-w-[420px] min-h-screen flex flex-col justify-start pb-8">
        
        {/* ========================================================
            PART 1: LOGO & SOCIAL ICONS
            - Logo centered with pt:31, pb:19, px:145
            - 3 social icons (Facebook, Instagram, WhatsApp) with pb:9
            - Fade animations: takes a short moment (hidden initially) then smoothly fades in
           ======================================================== */}
        <section className="w-full flex flex-col items-center">
          {/* Logo Container */}
          <div className="pt-[31px] pb-[19px] px-[145px] w-full flex justify-center">
            <div
              className="w-[100px] h-[100px] rounded-full bg-black flex items-center justify-center text-center shadow-2xl animate-fade-in cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300"
              style={{ animationDelay: "400ms", animationDuration: "1s" }}
              onClick={() => setActiveModal("Cento Scent - Exclusive Luxury Fragrance House")}
            >
              <span className="font-serif text-[17px] text-white tracking-normal font-normal leading-tight px-2">
                cento scent
              </span>
            </div>
          </div>

          {/* Social Media Buttons (Facebook, Instagram, WhatsApp) */}
          <div
            className="flex items-center justify-center gap-6 pb-[9px] animate-fade-in"
            style={{ animationDelay: "700ms", animationDuration: "0.9s" }}
          >
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-200 hover:scale-115 active:scale-90"
              aria-label="Facebook"
            >
              <Image
                src="/icons/facebookIcon.svg"
                alt="Facebook"
                width={35}
                height={35}
                className="w-[35px] h-[35px] drop-shadow-sm opacity-90 hover:opacity-100 transition-opacity"
              />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-200 hover:scale-115 active:scale-90"
              aria-label="Instagram"
            >
              <Image
                src="/icons/InstaIcon.svg"
                alt="Instagram"
                width={35}
                height={35}
                className="w-[35px] h-[35px] drop-shadow-sm opacity-90 hover:opacity-100 transition-opacity"
              />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-200 hover:scale-115 active:scale-90"
              aria-label="WhatsApp"
            >
              <Image
                src="/icons/WhatsIcon.svg"
                alt="WhatsApp"
                width={35}
                height={35}
                className="w-[35px] h-[35px] drop-shadow-sm opacity-90 hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
        </section>


        {/* ========================================================
            PART 2: BEST SELLERS CAROUSEL
            - px:16 for all remaining sections
            - Left: "Best Sellers" title
            - Right: 2 arrow buttons (gap:6)
            - Pt:12 between title and products
            - 2 products visible at a time
            - Smooth touch swipe + arrow button paging
            - Image covers the card, border 1.55px #998A78, bottom right Get button 45x34 radius 20
            - Animation: Title/arrows fade in. First load: Card 1 from left, Card 2 from right.
           ======================================================== */}
        <section className="w-full px-[16px] mt-1">
          {/* Header Row: Title & Arrow Controls */}
          <div
            className="w-full flex items-center justify-between animate-fade-in"
            style={{ animationDelay: "900ms" }}
          >
            <h2 className="text-[17px] font-bold text-black tracking-tight">
              Best Sellers
            </h2>

            {/* Carousel Arrow Controls (gap: 6px) */}
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

          {/* Products Container: pt-12 (12px top spacing) */}
          <div
            className="w-full pt-[12px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="grid grid-cols-2 gap-3 w-full">
              {visibleProducts.map((product, idx) => {
                // Determine entrance animation:
                // First load: Card 0 from left, Card 1 from right.
                // Subsequent updates: smooth transition from right or direction.
                let animClass = "";
                if (isInitialEntrance) {
                  animClass =
                    idx === 0
                      ? "animate-slide-in-left"
                      : "animate-slide-in-right";
                } else {
                  animClass =
                    carouselDirection === "next"
                      ? "animate-slide-in-right"
                      : "animate-slide-in-left-loop";
                }

                return (
                  <div
                    key={`${carouselPage}-${product.id}`}
                    style={isInitialEntrance ? { animationDelay: "1050ms" } : undefined}
                    className={`relative w-full aspect-[16/11] rounded-[16px] overflow-hidden border-[1.55px] border-[#998A78] shadow-md group ${animClass}`}
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
                      onClick={() =>
                        setActiveModal(`Selected product: ${product.name}. Ready to order!`)
                      }
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


        {/* ========================================================
            PART 3: ACTION BUTTONS (Shop Now & Take an Offer)
            - Distance between them: 16px
            - Distance from top: 16px
            - Fade animation
            - Full width within px:16
           ======================================================== */}
        <section className="w-full px-[16px] mt-[16px]">
          <div className="flex flex-col gap-[16px]">
            {/* Shop Now Button */}
            <button
              type="button"
              onClick={() => setActiveModal("Opening Cento Scent Official Shop...")}
              className="w-full h-[50px] bg-white text-black font-bold text-[17px] rounded-full flex items-center justify-center shadow-md hover:bg-neutral-50 active:scale-[0.98] transition-all duration-200 cursor-pointer animate-fade-in"
              style={{ animationDelay: "1200ms" }}
            >
              Shop Now
            </button>

            {/* Take an Offer Button */}
            <button
              type="button"
              onClick={() => setActiveModal("Special Offer: Buy 2 Fragrances & Get Free Shipping!")}
              className="w-full h-[50px] bg-white text-black font-bold text-[17px] rounded-full flex items-center justify-center shadow-md hover:bg-neutral-50 active:scale-[0.98] transition-all duration-200 cursor-pointer animate-fade-in"
              style={{ animationDelay: "1350ms" }}
            >
              Take an Offer
            </button>
          </div>
        </section>


        {/* ========================================================
            PART 4: SPLIT SHOWCASE (Product Rotator + Reviews & Locations)
            - pt:16
            - Left Column: Product bottle changing in a loop
              * Enters from left on first load
              * In loop: current exits to left, new enters from left
            - Right Column: Reviews Card + 2 Location buttons
              * Enters from right on first load
              * Reviews card: fixed "Reviews" title, customer comment, 5 yellow stars at bottom-right
              * Review changes in loop: current exits to left, new enters from left
              * Spacing: 16px between Reviews and Location 1, 16px between Location 1 & 2
           ======================================================== */}
        <section className="w-full px-[16px] pt-[16px]">
          <div className="grid grid-cols-[1fr_1.15fr] gap-3 items-stretch">
            
            {/* Left Column: Product Showcase Bottle */}
            <div
              className="relative w-full h-[285px] flex items-center justify-center overflow-visible animate-slide-in-left-fast cursor-pointer"
              style={{ animationDelay: "500ms" }}
              onClick={() =>
                setActiveModal("Discover our signature perfume blend - crafted with rare essences.")
              }
            >
              <div
                className={`relative w-full h-full flex items-center justify-center transition-all ${
                  isProductTransitioning
                    ? "animate-slide-out-left-fast"
                    : "animate-slide-in-left-loop-fast"
                }`}
              >
                {/* Perfume bottle rotated by exact 22.87 degrees */}
                <div
                  className="relative w-[165px] h-[265px] transition-transform duration-300 hover:scale-105"
                  style={{ transform: "rotate(-22.87deg)" }}
                >
                  <Image
                    src={SHOWCASE_PRODUCTS[currentProductIndex].image}
                    alt={SHOWCASE_PRODUCTS[currentProductIndex].alt}
                    fill
                    sizes="(max-width: 420px) 45vw, 190px"
                    className="object-contain object-center drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Reviews Card + Location Buttons */}
            <div
              className="flex flex-col justify-between animate-slide-right-fast h-[285px]"
              style={{ animationDelay: "550ms" }}
            >
              {/* Reviews Card */}
              <div className="bg-white rounded-[20px] p-3.5 shadow-md flex flex-col justify-between h-[135px] relative overflow-hidden">
                {/* Fixed "Reviews" Title */}
                <h3 className="font-bold text-[14px] text-black tracking-tight">
                  Reviews
                </h3>

                {/* Dynamic Comment Body with Slide-Out-Left and Slide-In-Left */}
                <div className="my-auto overflow-hidden">
                  <div
                    className={`transition-all duration-300 ${
                      isReviewTransitioning
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
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="text-[#EAB308] text-[13px] leading-none select-none transition-transform duration-300 hover:scale-125"
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Location Buttons: 16px spacing between Reviews & Mokattam, and 16px between Mokattam & Sayeda Zeinab */}
              <div className="flex flex-col gap-[16px] mt-[16px]">
                {/* Mokattam Button */}
                <a
                  href="https://maps.google.com/?q=Cento+Scent+Mokattam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-[46px] bg-white rounded-full flex items-center px-4 gap-3 shadow-md hover:bg-neutral-50 active:scale-95 transition-all duration-150 cursor-pointer"
                >
                  <Image
                    src="/icons/LocIcon.svg"
                    alt="Location"
                    width={20}
                    height={20}
                    className="w-[20px] h-[20px] shrink-0"
                  />
                  <span className="font-bold text-[14px] text-black tracking-tight truncate">
                    Mokattam
                  </span>
                </a>

                {/* Sayeda Zeinab Button */}
                <a
                  href="https://maps.google.com/?q=Cento+Scent+Sayeda+Zeinab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-[46px] bg-white rounded-full flex items-center px-3.5 gap-2.5 shadow-md hover:bg-neutral-50 active:scale-95 transition-all duration-150 cursor-pointer"
                >
                  <Image
                    src="/icons/LocIcon.svg"
                    alt="Location"
                    width={20}
                    height={20}
                    className="w-[20px] h-[20px] shrink-0"
                  />
                  <span className="font-bold text-[13.5px] text-black tracking-tight truncate">
                    Sayeda Zeinab
                  </span>
                </a>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* Interactive Modal Toast */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white text-black p-6 rounded-[24px] max-w-sm w-full shadow-2xl text-center flex flex-col items-center gap-4 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-serif text-sm">
              cento
            </div>
            <p className="font-semibold text-base text-neutral-800 leading-relaxed">
              {activeModal}
            </p>
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="mt-2 px-6 py-2 rounded-full bg-black text-white text-sm font-semibold hover:bg-neutral-800 active:scale-95 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
