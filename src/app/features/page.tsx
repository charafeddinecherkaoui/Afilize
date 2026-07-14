import type { Metadata } from "next";
import FeaturesPage from "@/components/pages/FeaturesPage";

export const metadata: Metadata = {
  title: "Features — Afilize",
  description:
    "Seven deeply integrated pillars — tracking, AI, fraud, reporting, partners, automation, and API — built to work together from day one.",
};

export default function Page() {
  return <FeaturesPage />;
}
