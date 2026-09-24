"use client";

import Image from "next/image";
import { SOCIAL_LINKS } from "@/data/linktreeData";

interface HeaderSectionProps {
  onLogoClick?: () => void;
}

export default function HeaderSection({ onLogoClick }: HeaderSectionProps) {
  return (
    <section className="w-full flex flex-col items-center">
      {/* Logo Container - Figma: pt:31, pb:19, px:145 */}
      <div className="pt-[31px] pb-[19px] px-[145px] w-full flex justify-center">
        <div
          className="w-[100px] h-[100px] rounded-full bg-black flex items-center justify-center text-center shadow-2xl animate-fade-in cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300"
          style={{ animationDelay: "300ms" }}
          onClick={onLogoClick}
        >
          <span className="font-serif text-[17px] text-white tracking-normal font-normal leading-tight px-2">
            cento scent
          </span>
        </div>
      </div>

      {/* Social Media Buttons (Facebook, Instagram, WhatsApp) - Figma: pb:9 */}
      <div
        className="flex items-center justify-center gap-6 pb-[9px] animate-fade-in"
        style={{ animationDelay: "600ms" }}
      >
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-200 hover:scale-115 active:scale-90"
            aria-label={social.name}
          >
            <Image
              src={social.icon}
              alt={social.name}
              width={35}
              height={35}
              className="w-[35px] h-[35px] drop-shadow-sm opacity-90 hover:opacity-100 transition-opacity"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
