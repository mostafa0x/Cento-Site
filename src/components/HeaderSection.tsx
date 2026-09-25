"use client";

import Image from "next/image";
import { SOCIAL_LINKS } from "@/data/linktreeData";

interface HeaderSectionProps {
  onLogoClick?: () => void;
}

export default function HeaderSection({ onLogoClick }: HeaderSectionProps) {
  return (
    <section className="w-full max-w-full flex flex-col items-center overflow-hidden">
      {/* Logo Container - Figma: pt:31, pb:19, perfectly centered */}
      <div className="pt-7.75 pb-4.75 w-full flex justify-center items-center">
        <div
          className="w-28 h-28 min-w-28 min-h-28 max-w-28 max-h-28 aspect-square shrink-0 rounded-full overflow-hidden shadow-2xl animate-fade-in cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300"
          style={{ animationDelay: "300ms" }}
          onClick={onLogoClick}
        >
          <Image
            src="/Logo.svg"
            alt="Cento Scent Logo"
            width={100}
            height={100}
            priority
            loading="eager"
            className="w-full h-full object-contain"
          />
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
              width={37}
              height={37}
              className="w-9 h-9 drop-shadow-sm opacity-90 hover:opacity-100 transition-opacity"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
