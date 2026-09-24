"use client";

import Image from "next/image";
import { SOCIAL_LINKS } from "@/data/linktreeData";

interface HeaderSectionProps {
  onLogoClick?: () => void;
}

export default function HeaderSection({ onLogoClick }: HeaderSectionProps) {
  return (
    <section className="w-full flex flex-col items-center">
      {/* Logo Container - Figma: pt:31, pb:19, perfectly centered */}
      <div className="pt-7.75 pb-4.75 w-full flex justify-center items-center">
        <div
          className="w-25 h-25 min-w-25 min-h-25 max-w-25 max-h-25 aspect-square shrink-0 rounded-full bg-black flex items-center justify-center text-center shadow-2xl animate-fade-in cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300"
          style={{ animationDelay: "300ms" }}
          onClick={onLogoClick}
        >
          <span className="font-serif text-[17px] text-white tracking-normal font-normal leading-tight px-2 select-none">
            cento scent
          </span>
        </div>
      </div>

      {/* Social Media Buttons (Facebook, Instagram, WhatsApp) - Figma: pb:9 */}
      <div
        className="flex items-center justify-center gap-6 pb-2.25 animate-fade-in"
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
              className="w-8.75 h-8.75 drop-shadow-sm opacity-90 hover:opacity-100 transition-opacity"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
