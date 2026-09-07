import TradexHomepage from "@/components/home/TradexHomepage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tradex — From material to intelligence",
  description:
    "Explore Tradex Solution for apparel technology and Tradex Innovation for custom web, mobile, AI, data, planning, inventory, and IoT software development.",
};

export default function Home() {
  return <TradexHomepage />;
}
