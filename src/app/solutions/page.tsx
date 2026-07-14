import type { Metadata } from "next";
import SolutionsPage from "@/components/pages/SolutionsPage";

export const metadata: Metadata = {
  title: "What You Achieve — Afilize",
  description:
    "Spend less, catch fraud, scale what works. Afilize lowers acquisition cost, hands your team back hours every week, and makes sure you only ever pay for clean traffic.",
};

export default function Page() {
  return <SolutionsPage />;
}
