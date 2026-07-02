import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  AiStarIcon,
  CheckRow,
  Chip,
  Eyebrow,
  FinalCta,
  FlowStrip,
  SectionHead,
} from "@/components/blocks";

export const metadata: Metadata = {
  title: "Features — Afilize",
  description:
    "One system to track, automate, and get paid. Seven capability layers: tracking, AI, automation, anti-fraud, analytics, invoicing, and an in-house API.",
};

function AiBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full flow-bg px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
      <AiStarIcon className="h-2.5 w-2.5" />
      AI
    </span>
  );
}

function Pillar({
  num,
  title,
  badge,
  full = false,
  children,
}: {
  num: string;
  title: string;
  badge?: boolean;
  full?: boolean;
  children: ReactNode;
}) {
  return (
    <article
      className={`relative overflow-hidden rounded-[18px] border border-line bg-surface p-[30px] ${
        full ? "min-[821px]:col-span-2" : ""
      }`}
    >
      <span className="absolute inset-x-0 top-0 h-[2px] flow-bg" aria-hidden="true" />
      <p className="font-mono text-xs text-text-dim">{num}</p>
      <h3 className="mt-2 flex items-center gap-2.5 font-display text-[22px] font-semibold tracking-[-0.01em]">
        {title}
        {badge && <AiBadge />}
      </h3>
      <div className="mt-3 space-y-4">{children}</div>
    </article>
  );
}

export default function FeaturesPage() {
  return (
    <main className="flex-1">
      {/* 3.1 Hero */}
      <section className="wrap pb-14 pt-16 text-center">
        <Eyebrow>The Platform</Eyebrow>
        <h1 className="mx-auto mt-6 max-w-[820px] text-[clamp(34px,6vw,58px)] font-bold leading-[1.03] tracking-[-0.03em]">
          One system to track, automate, and{" "}
          <span className="flow-text">get paid</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[640px] text-lg text-text-muted">
          Afilize captures every click and conversion with server-to-server
          precision, then puts AI, an automation engine, and built-in invoicing
          on top — so the platform runs the work you used to do by hand.
        </p>
        <p className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[12.5px] text-text-muted">
          <span>Real-time S2S tracking</span>
          <span className="text-text-dim">·</span>
          <span>100% conversions validated</span>
          <span className="text-text-dim">·</span>
          <span>Nightly automated decisions</span>
        </p>
      </section>

      {/* 3.2 Differentiator banner */}
      <section className="wrap pb-14">
        <div className="rounded-[18px] p-px flow-bg">
          <div className="flex flex-wrap items-center justify-center gap-2.5 rounded-[17px] bg-ink-2 px-6 py-5">
            <span className="mr-1 font-mono text-xs uppercase tracking-[0.18em] text-accent-2">
              Only on Afilize
            </span>
            <Chip>Native AI chatbot</Chip>
            <Chip>AI optimization</Chip>
            <Chip>Built-in invoicing</Chip>
            <Chip>In-house API</Chip>
            <Chip>Shareable report links</Chip>
          </div>
        </div>
      </section>

      {/* 3.3 Section head + 3.4 Seven pillars */}
      <section className="wrap pb-16">
        <SectionHead
          label="The Core"
          title="Seven layers, one platform"
          sub="Each layer feeds the next — tracking data drives the AI, the AI drives the rules, the rules feed your invoices."
        />
        <div className="mt-11 grid gap-4 min-[821px]:grid-cols-2">
          <Pillar num="01" title="Tracking & Attribution">
            <p className="text-text-muted">
              Capture and attribute every click and conversion in real time,
              across every mobile channel, with server-to-server precision.
              From first impression to final purchase, each touchpoint is
              matched to the right source automatically — no manual
              reconciliation, no gaps.
            </p>
          </Pillar>

          <Pillar num="02" title="AI Performance Engine" badge>
            <p className="text-text-muted">
              Ask your data anything in plain language, let machine learning
              move bids, budgets, and traffic toward what&apos;s working, and
              start each day with a summary waiting for your team.
            </p>
            <ul className="space-y-2.5">
              <CheckRow ai>
                AI chatbot answers questions over your live performance data
              </CheckRow>
              <CheckRow ai>
                Machine-learning optimization auto-adjusts bids, budgets &
                traffic
              </CheckRow>
              <CheckRow ai>
                A morning Slack message recaps yesterday&apos;s performance for
                your team
              </CheckRow>
            </ul>
          </Pillar>

          <Pillar num="03" title="Automation & Rules Engine" full>
            <p className="text-text-muted">
              Build the rules your operation needs, and Afilize enforces them
              24/7 — pausing, blacklisting, blocking, and redirecting without
              anyone watching the dashboard.
            </p>
            <ul className="space-y-2.5">
              <CheckRow>
                Create your own rules from any metric, threshold, or time
                window
              </CheckRow>
              <CheckRow>
                Pair conditions with actions — pause, blacklist, block,
                redirect, hold
              </CheckRow>
              <CheckRow>
                Automations run continuously so decisions never wait on a
                person
              </CheckRow>
            </ul>
          </Pillar>

          <Pillar num="04" title="Anti-Fraud & Security">
            <p className="text-text-muted">
              Every conversion is scored and validated before it ever reaches a
              payout. Suspicious traffic is caught, held, or blocked
              automatically, so you only ever pay for clean results.
            </p>
          </Pillar>

          <Pillar num="05" title="Analytics & Reporting">
            <p className="text-text-muted">
              A live picture of revenue, cost, profit, and ROI — sliced any
              way, shared any way.
            </p>
            <ul className="space-y-2.5">
              <CheckRow>Global dashboard: Revenue · Cost · Profit · ROI</CheckRow>
              <CheckRow>
                Breakdown views — tables and charts on any dimension
              </CheckRow>
              <CheckRow>
                Shareable report links, filtered to each publisher
              </CheckRow>
              <CheckRow>
                CSV / PDF exports · scheduled daily, weekly, monthly
              </CheckRow>
              <CheckRow>
                Slack digest of yesterday&apos;s activity, delivered at a time
                you choose
              </CheckRow>
            </ul>
          </Pillar>

          <Pillar num="06" title="Invoicing & Finance">
            <p className="text-text-muted">
              The only tracker in its class that bills for you — from validated
              stats straight to a sent invoice.
            </p>
            <ul className="space-y-2.5">
              <CheckRow>Publisher invoice requests in-platform</CheckRow>
              <CheckRow>Stats validation & locking period</CheckRow>
              <CheckRow>
                Auto invoice generation, advertiser & publisher
              </CheckRow>
              <CheckRow>
                Draft / approved / paid statuses + reconciliation
              </CheckRow>
            </ul>
          </Pillar>

          <Pillar num="07" title="Integrations & In-house API" full>
            <p className="text-text-muted">
              Plug into the tools you already run, and build anything on top
              with a first-party API.
            </p>
            <div className="flex flex-wrap gap-2">
              <Chip>MMP integrations</Chip>
              <Chip>Offer-testing integrations</Chip>
              <Chip>S2S postbacks</Chip>
              <Chip>Webhooks</Chip>
              <Chip>In-house REST API</Chip>
              <Chip>Changelog system</Chip>
            </div>
          </Pillar>
        </div>
      </section>

      {/* 3.5 Flow section */}
      <section className="wrap pb-16">
        <SectionHead
          label="The Loop"
          title="One system, infinite flow"
          sub="Every feature lives inside a single feedback loop, from raw event to optimized payout."
        />
        <div className="mt-11">
          <FlowStrip />
        </div>
      </section>

      {/* 3.6 Final CTA */}
      <FinalCta
        title="See every feature on your own traffic"
        line="Point a test offer at Afilize and watch the tracking, rules, and AI work end to end."
        primary={{ href: "/pricing", label: "View pricing" }}
        secondary={{ href: "#", label: "Request a demo" }}
      />
    </main>
  );
}
