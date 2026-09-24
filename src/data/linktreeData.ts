export interface BestSellerProduct {
  id: number;
  name: string;
  image: string;
  link: string;
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
    link: "https://wa.me/?text=Hello%20Cento%20Scent,%20I%20want%20to%20order%20Luxury%20Explosion",
  },
  {
    id: 2,
    name: "Fragrance Splash",
    image: "/best sellers/Cento Car.webp",
    link: "https://wa.me/?text=Hello%20Cento%20Scent,%20I%20want%20to%20order%20Fragrance%20Splash",
  },
  {
    id: 3,
    name: "Home Diffuser",
    image: "/best sellers/Cento Home Diffuser.webp",
    link: "https://wa.me/?text=Hello%20Cento%20Scent,%20I%20want%20to%20order%20Home%20Diffuser",
  },
  {
    id: 4,
    name: "Stronger With You",
    image: "/best sellers/Stronger With You.webp",
    link: "https://wa.me/?text=Hello%20Cento%20Scent,%20I%20want%20to%20order%20Stronger%20With%20You",
  },
];

export const ACTION_BUTTONS = {
  shopNowUrl: "https://wa.me/?text=Hello%20Cento%20Scent,%20I%20would%20like%20to%20shop%20your%20fragrances",
  takeOfferUrl: "https://wa.me/?text=Hello%20Cento%20Scent,%20I%20would%20like%20to%20claim%20the%20special%20offer",
};

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
    text: " اجمد اكتشاف في مصر بجد الواحد مبسوط انو عميل عندكو",
    rating: 5,
  },
  {
    id: 2,
    text: "من أريح الأماكن الإتعامَلت معاهم في العطور ، جربت منهم كم ريحة وكلهم طلعوا رهيبين وثباتهم ممتاز ، والأجمل إنو أي زول شم الريحه سألني جبتها من وين وفعلاً رسلت ليهم ناس كتار وكلهم شكروني",
    rating: 4,
  },
  {
    id: 3,
    text: "الاوردر وصلى وبجد تحفة تحفة دة تالت اوردر منكم ومش الاخير ودايماً ناجحين وكواليتي جميل جداً ",
    rating: 5,
  },
  {
    id: 4,
    text: "البرفان بيثبت جدا و سعره مناسب و وصل بسرعه",
    rating: 4,
  },
  {
    id: 5,
    text: "عن تجربة معاكم أكتر من مرة , حاجتكم حلوه جداااااا ومميزين بأنواع مش عند حد تانى",
    rating: 5,
  }, {
    id: 6,
    text: "حاجتكم جميله بجد ثبات وفوحاان رهييييب ❤️❤️❤️",
    rating: 4,
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
