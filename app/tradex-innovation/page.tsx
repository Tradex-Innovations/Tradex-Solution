import type { Metadata } from "next";
import TradexInnovationPage from "@/components/innovation/TradexInnovationPage";

export const metadata: Metadata = {
  title: "Custom Software Development | Tradex Innovation",
  description:
    "Custom web and mobile applications, business systems, AI, data and IoT solutions. Explore software projects and discuss your next build with Tradex Innovation in Sri Lanka.",
};

export default function Page() {
  return <TradexInnovationPage />;
}
