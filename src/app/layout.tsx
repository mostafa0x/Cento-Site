import type { Metadata, Viewport } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const siteUrl = "https://visit.centoscent.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "cento scent",
  description: "Your Story Your Scent",
  applicationName: "cento scent",
  authors: [{ name: "cento scent" }],
  creator: "cento scent",
  publisher: "cento scent",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "cento scent",
    title: "cento scent",
    description: "Your Story Your Scent",
    images: [
      {
        url: "/Link-Image.jpg",
        width: 1280,
        height: 1280,
        alt: "cento scent - Your Story Your Scent",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "cento scent",
    description: "Your Story Your Scent",
    images: [
      {
        url: "/Link-Image.jpg",
        width: 1280,
        height: 1280,
        alt: "cento scent - Your Story Your Scent",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#946549",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfairDisplay.variable} antialiased`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/background.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className="font-sans antialiased text-[#111111] select-none bg-[#946549]">
        {/* Fixed background: exact size of the current screen, completely static */}
        <div id="cento-fixed-bg" aria-hidden="true" />

        {children}
      </body>
    </html>
  );
}
