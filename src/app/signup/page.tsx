import type { Metadata } from "next";
import Link from "next/link";
import { CheckRow, Eyebrow } from "@/components/blocks";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Start Your Free Trial — Afilize",
  description:
    "Create your Afilize workspace and start your 14-day free trial. Full S2S tracking, automation, and AI — no card required.",
};

export default function SignupPage() {
  return (
    <main className="signup-page flex-1">
      <section className="wrap pb-16 pt-16">
        <div className="split-screen-layout grid items-start gap-10 min-[881px]:grid-cols-[1.1fr_1fr]">
          {/* Left — pitch */}
          <div className="split-left-branding">
            <Eyebrow>Free Trial</Eyebrow>
            <h1 className="mt-6 text-[clamp(34px,6vw,58px)] font-bold leading-[1.03] tracking-[-0.03em]">
              Create your <span className="flow-text">workspace</span>
            </h1>
            <p className="mt-5 max-w-[480px] text-lg text-text-muted">
              Spin up a workspace, point a test offer at it, and watch the
              tracking, rules, and AI work in real time — free for 14 days.
            </p>

            <ul className="mt-10 space-y-3">
              <CheckRow>Full S2S tracking &amp; attribution from day one</CheckRow>
              <CheckRow>No credit card required</CheckRow>
              <CheckRow>Upgrade, downgrade, or cancel anytime</CheckRow>
              <CheckRow>Guided migration on Growth and above</CheckRow>
            </ul>

            <p className="mt-10 text-sm text-text-dim">
              Running serious volume?{" "}
              <Link
                href="/request-demo"
                className="text-accent-2 transition-colors hover:text-text"
              >
                Talk to sales
              </Link>{" "}
              about Enterprise instead.
            </p>
          </div>

          {/* Right — form */}
          <div className="split-right-form">
            <SignupForm />
          </div>
        </div>
      </section>
    </main>
  );
}
