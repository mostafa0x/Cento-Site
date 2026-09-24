"use client";

interface ActionButtonsSectionProps {
  onShopNow: () => void;
  onTakeOffer: () => void;
}

export default function ActionButtonsSection({
  onShopNow,
  onTakeOffer,
}: ActionButtonsSectionProps) {
  return (
    <section className="w-full px-[16px] mt-[16px]">
      <div className="flex flex-col gap-[16px]">
        {/* Shop Now Button */}
        <button
          type="button"
          onClick={onShopNow}
          className="w-full h-[50px] bg-white text-black font-bold text-[17px] rounded-full flex items-center justify-center shadow-md hover:bg-neutral-50 active:scale-[0.98] transition-all duration-200 cursor-pointer animate-fade-in"
          style={{ animationDelay: "1550ms" }}
        >
          Shop Now
        </button>

        {/* Take an Offer Button */}
        <button
          type="button"
          onClick={onTakeOffer}
          className="w-full h-[50px] bg-white text-black font-bold text-[17px] rounded-full flex items-center justify-center shadow-md hover:bg-neutral-50 active:scale-[0.98] transition-all duration-200 cursor-pointer animate-fade-in"
          style={{ animationDelay: "1800ms" }}
        >
          Take an Offer
        </button>
      </div>
    </section>
  );
}
