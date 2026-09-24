export interface BestSellerProduct {
  id: number;
  name: string;
  image: string;
}

export interface ShowcaseProduct {
  id: number;
  image: string;
  alt: string;
}

export interface ReviewItem {
  id: number;
  text: string;
  rating: number;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface LocationItem {
  name: string;
  mapUrl: string;
}

export const BEST_SELLERS: BestSellerProduct[] = [
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

export const SHOWCASE_PRODUCTS: ShowcaseProduct[] = [
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

export const REVIEWS: ReviewItem[] = [
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

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Facebook",
    url: "https://facebook.com",
    icon: "/icons/facebookIcon.svg",
  },
  {
    name: "Instagram",
    url: "https://instagram.com",
    icon: "/icons/InstaIcon.svg",
  },
  {
    name: "WhatsApp",
    url: "https://wa.me",
    icon: "/icons/WhatsIcon.svg",
  },
];

export const LOCATIONS: LocationItem[] = [
  {
    name: "Mokattam",
    mapUrl: "https://maps.google.com/?q=Cento+Scent+Mokattam",
  },
  {
    name: "Sayeda Zeinab",
    mapUrl: "https://maps.google.com/?q=Cento+Scent+Sayeda+Zeinab",
  },
];
