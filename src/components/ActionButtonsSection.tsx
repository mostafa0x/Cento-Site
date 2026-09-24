"use client";

import { ACTION_BUTTONS } from "@/data/linktreeData";

export default function ActionButtonsSection() {
  return (
    <section className="w-full px-4 mt-4">
      <div className="flex flex-col gap-4">
        {/* Shop Now Link */}
        <a
          href={ACTION_BUTTONS.shopNowUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-12.5 bg-white text-black font-medium text-[17px] rounded-full flex items-center justify-center shadow-md hover:bg-neutral-50 active:scale-[0.98] transition-all duration-200 cursor-pointer animate-fade-in"
          style={{ animationDelay: "1550ms" }}
        >
          Shop Now
        </a>

        {/* Take an Offer Link */}
        <a
          href={ACTION_BUTTONS.takeOfferUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-12.5 bg-white text-black font-medium text-[17px] rounded-full flex items-center justify-center shadow-md hover:bg-neutral-50 active:scale-[0.98] transition-all duration-200 cursor-pointer animate-fade-in"
          style={{ animationDelay: "1800ms" }}
        >
          Take an Offer
        </a>
      </div>
    </section>
  );
}
