import HomeClient from "./HomeClient";

// ✅ SEO metadata here (server component)
export const metadata = {
  title: "Best Villa in Udaipur | Motiparadise",
  description:
    "Escape to a luxurious villa in Udaipur featuring serene views, elegant rooms, bonfire nights, a pure veg restaurant, and modern amenities for perfect gateways.",
  keywords: [
    "best villa in udaipur",
    "villa with private pool in udaipur",
    "private pool villa in udaipur",
    "udaipur resorts with private pool",
    "private villa in udaipur",
    "homestay in udaipur",
    "luxury villa in udaipur",
    "pool villa in udaipur",
    "villa stay in udaipur",
    "room with private pool in udaipur",
    "udaipur villas",
  ],
  verification: {
    google: "zPt2nTmr8iWro24pHfgzd9WZp4Yjdd18UVCdpdJ7MMk",
  },
};

export default function Home() {
  return <HomeClient />; // render client component
}
