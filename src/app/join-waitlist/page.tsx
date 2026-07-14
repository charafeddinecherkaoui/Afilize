import type { Metadata } from "next";
import WaitlistPage from "@/components/pages/WaitlistPage";

export const metadata: Metadata = {
  title: "Join the Waitlist — Afilize",
  description:
    "Afilize is launching soon. Join the waitlist for early access, founding pricing, and priority onboarding when we open.",
};

export default function Page() {
  return <WaitlistPage />;
}
