import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  CheckIcon,
  CheckRow,
  Eyebrow,
  FinalCta,
  FlowStrip,
  SectionHead,
} from "@/components/blocks";

export const metadata: Metadata = {
  title: "What You Achieve — Afilize",
  description:
    "Spend less, catch fraud, scale what works. Afilize lowers acquisition cost, hands your team back hours every week, and makes sure you only ever pay for clean traffic.",
};

const stats = [
  {
    number: "-20%",
    caption: "Lower customer acquisition cost through AI optimization",
  },
  {
    number: "+10h",
    caption: "Saved per week with automation and instant decisioning",
  },
  {
    number: "100%",
    caption: "Of conversions validated before any payout goes out",
  },
  {
    number: "+ROI",
    caption: "Winners surfaced and scaled before the budget burns",
  },
];

const audiences: {
  role: string;
  title: string;
  desc: string;
  points: { lead: string; rest: string }[];
}[] = [
  {
    role: "Advertisers",
    title: "Grow spend without growing risk",
    desc: "Push budget into channels you can actually trust, with attribution and fraud checks running underneath every dollar.",
    points: [
      {
        lead: "Cut wasted spend",
        rest: "rules pause dead campaigns before they drain budget.",
      },
      {
        lead: "Trust every install",
        rest: "CTIT and IP checks filter fraud pre-payout.",
      },
      {
        lead: "Scale the winners",
        rest: "AI optimization shifts budget toward real ROAS.",
      },
    ],
  },
  {
    role: "Publishers",
    title: "Get paid faster, prove your quality",
    desc: "Show advertisers clean numbers, and turn validated stats into invoices without chasing anyone.",
    points: [
      {
        lead: "Self-serve reporting",
        rest: "a filtered report link, by date and source, on demand.",
      },
      {
        lead: "Faster payouts",
        rest: "invoice requests and stats validation built in.",
      },
      {
        lead: "Cleaner traffic",
        rest: "surface and fix weak subids before they get blocked.",
      },
    ],
  },
  {
    role: "Agencies",
    title: "Run more clients with the same team",
    desc: "Automation and AI absorb the repetitive work, so account managers spend time on strategy, not babysitting offers.",
    points: [
      {
        lead: "Hours back weekly",
        rest: "offer testing and rule enforcement run themselves.",
      },
      {
        lead: "Client-ready reports",
        rest: "shareable links, scheduled PDFs, white-label.",
      },
      {
        lead: "Ask, don't dig",
        rest: "the AI chatbot answers client questions instantly.",
      },
    ],
  },
  {
    role: "Networks",
    title: "Match traffic to offers at scale",
    desc: "Connect advertisers and publishers in one system, with finance and protection handled end to end.",
    points: [
      {
        lead: "One source of truth",
        rest: "every click, conversion, and payout in one place.",
      },
      {
        lead: "Finance on autopilot",
        rest: "auto-generate advertiser and publisher invoices.",
      },
      {
        lead: "Build on the API",
        rest: "wire Afilize into your own stack first-party.",
      },
    ],
  },
];

const shift: { without: string; with: string }[] = [
  {
    without: "Refreshing dashboards to catch dead campaigns",
    with: "Rules pause and cap campaigns the moment they slip",
  },
  {
    without: "Pausing subids and blocking IPs by hand",
    with: "Fraud gets blocked and held automatically",
  },
  {
    without: "Testing offer links one by one",
    with: "Offer-testing integrations check redirects for you",
  },
  {
    without: "Reconciling payouts in spreadsheets",
    with: "Validated stats become invoices on their own",
  },
  {
    without: "Building reports for each publisher manually",
    with: "Each publisher gets a live, filtered report link",
  },
];

function CrossIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShiftCard({
  heading,
  items,
  positive,
}: {
  heading: string;
  items: string[];
  positive?: boolean;
}) {
  return (
    <div className="rounded-[18px] border border-line bg-surface p-[30px]">
      <h3 className="font-display text-lg font-semibold tracking-[-0.01em]">
        {heading}
      </h3>
      <ul className="mt-4 divide-y divide-line-soft">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 py-3 text-[15px] text-text-muted"
          >
            {positive ? (
              <CheckIcon className="mt-[3px] h-4 w-4 shrink-0 text-good" />
            ) : (
              <CrossIcon className="mt-[3px] h-4 w-4 shrink-0 text-text-dim" />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SolutionsPage() {
  return (
    <main className="flex-1">
      {/* 4.1 Hero */}
      <section className="wrap pb-14 pt-16 text-center">
        <Eyebrow>Outcomes</Eyebrow>
        <h1 className="mx-auto mt-6 max-w-[820px] text-[clamp(34px,6vw,58px)] font-bold leading-[1.03] tracking-[-0.03em]">
          Spend less, catch fraud,{" "}
          <span className="flow-text">scale what works</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[640px] text-lg text-text-muted">
          Afilize isn&apos;t another dashboard to babysit. It lowers
          acquisition cost, hands your team back hours every week, and makes
          sure you only ever pay for clean traffic.
        </p>
      </section>

      {/* 4.2 Outcomes band */}
      <section className="wrap pb-16">
        <div className="grid grid-cols-1 gap-4 min-[461px]:grid-cols-2 min-[881px]:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.number}
              className="rounded-[18px] border border-line bg-surface p-[30px] text-center"
            >
              <p className="flow-text font-mono text-[42px] font-bold leading-none">
                {stat.number}
              </p>
              <p className="mt-3 text-sm text-text-muted">{stat.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4.3 By role */}
      <section className="wrap pb-16">
        <SectionHead
          label="By Role"
          title="What you'll achieve with Afilize"
          sub="The same platform, pointed at whatever you're trying to grow."
        />
        <div className="mt-11 grid gap-4 min-[821px]:grid-cols-2">
          {audiences.map((audience) => (
            <article
              key={audience.role}
              className="relative overflow-hidden rounded-[18px] border border-line bg-surface p-[30px]"
            >
              <span
                className="absolute inset-x-0 top-0 h-[2px] flow-bg"
                aria-hidden="true"
              />
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-2">
                {audience.role}
              </p>
              <h3 className="mt-2 font-display text-[22px] font-semibold tracking-[-0.01em]">
                {audience.title}
              </h3>
              <p className="mt-3 text-text-muted">{audience.desc}</p>
              <ul className="mt-4 space-y-2.5">
                {audience.points.map((point) => (
                  <CheckRow key={point.lead}>
                    <strong className="font-semibold text-text">
                      {point.lead}
                    </strong>{" "}
                    — {point.rest}
                  </CheckRow>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* 4.4 Before / after */}
      <section className="wrap pb-16">
        <SectionHead
          label="The Shift"
          title="From manual to autonomous"
          sub="What a day on Afilize replaces."
        />
        <div className="mt-11 grid items-center gap-4 min-[721px]:grid-cols-[1fr_auto_1fr]">
          <ShiftCard
            heading="Without Afilize"
            items={shift.map((s) => s.without)}
          />
          <div className="flex items-center justify-center" aria-hidden="true">
            <span className="flex h-11 w-11 rotate-90 items-center justify-center rounded-full border border-line bg-ink-2 text-accent-2 min-[721px]:rotate-0">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="h-4 w-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 8h12M9 3l5 5-5 5" />
              </svg>
            </span>
          </div>
          <ShiftCard
            heading="With Afilize"
            items={shift.map((s) => s.with)}
            positive
          />
        </div>
      </section>

      {/* 4.5 The loop */}
      <section className="wrap pb-16">
        <SectionHead
          label="How We Get You There"
          title="One continuous loop"
          sub="Every outcome above comes from the same five-step engine running around the clock."
        />
        <div className="mt-11">
          <FlowStrip />
        </div>
      </section>

      {/* 4.6 Final CTA */}
      <FinalCta
        title="Tell us what you're trying to grow"
        line="We'll map Afilize to your traffic and show you the numbers before you commit."
        primary={{ href: "#", label: "Request a demo" }}
        secondary={{ href: "/pricing", label: "See pricing" }}
      />
    </main>
  );
}
