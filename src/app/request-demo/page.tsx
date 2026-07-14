import type { Metadata } from "next";
import RequestDemoPage from "@/components/pages/RequestDemoPage";

export const metadata: Metadata = {
  title: "Request a Demo — Afilize",
  description:
    "Tell us what you're trying to grow. We'll map Afilize to your traffic and show you the tracking, rules, and AI working on your own offers.",
};

export default function Page() {
  return <RequestDemoPage />;
}
