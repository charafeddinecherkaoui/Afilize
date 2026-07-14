import type { Metadata } from "next";
import PricingPage from "@/components/pages/PricingPage";

export const metadata: Metadata = {
  title: "Pricing — Afilize",
  description:
    "Pricing built for the new advertising era. Every plan tracks clicks, impressions, and conversions in real time — AI, automation, and invoicing included as you scale.",
};

export default function Page() {
  return <PricingPage />;
}
