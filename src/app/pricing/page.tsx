import type { Metadata } from "next";
import { Fragment } from "react";
import {
  AiStarIcon,
  CheckIcon,
  Eyebrow,
  FinalCta,
  SectionHead,
} from "@/components/blocks";
import PricingPlans from "@/components/PricingPlans";

export const metadata: Metadata = {
  title: "Pricing — Afilize",
  description:
    "Pricing built for the new advertising era. Every plan tracks clicks, impressions, and conversions in real time — AI, automation, and invoicing included as you scale.",
};

type Cell = string | boolean;

type TableGroup = {
  group: string;
  rows: { label: string; values: [Cell, Cell, Cell, Cell]; ai?: boolean }[];
};

const table: TableGroup[] = [
  {
    group: "Tracking & Attribution",
    rows: [
      {
        label: "Conversions",
        values: ["10K", "50K", "200K", "Custom"],
      },
      { label: "Installs, events, purchases", values: [true, true, true, true] },
      {
        label: "Subid1, app names, bundle IDs, OS",
        values: [true, true, true, true],
      },
      { label: "CTIT · eCPI · ROAS · ROI", values: [true, true, true, true] },
      { label: "Custom domains", values: ["1", "3", "10", "Unlimited"] },
    ],
  },
  {
    group: "Reporting & Sharing",
    rows: [
      { label: "Global dashboard", values: [true, true, true, true] },
      { label: "Breakdown views", values: [true, true, true, true] },
      { label: "Import & export", values: [true, true, true, true] },
      {
        label: "Reports as links, publisher-filtered",
        values: ["Basic", true, true, true],
      },
      { label: "PDF + scheduled", values: ["—", true, true, true] },
      {
        label: "Slack digest + data-period check",
        values: ["—", true, true, true],
      },
    ],
  },
  {
    group: "AI & Automation",
    rows: [
      { label: "AI Chatbot", values: ["—", true, true, true], ai: true },
      {
        label: "AI Optimization & auto-decisioning",
        values: ["—", "—", true, true],
        ai: true,
      },
      {
        label: "Performance & fraud automation rules",
        values: ["—", "Standard", "Custom", "Custom"],
      },
      { label: "Offer-testing integrations", values: ["—", true, true, true] },
      { label: "Change logs", values: ["30 days", "1 year", "Full", "Full"] },
    ],
  },
  {
    group: "Invoicing & Finance",
    rows: [
      {
        label: "Invoice requests + stats validation",
        values: ["—", true, true, true],
      },
      { label: "Auto invoice generation", values: ["—", "—", true, true] },
      {
        label: "Revenue & payout reconciliation",
        values: ["—", "—", true, true],
      },
    ],
  },
  {
    group: "API, Platform & Support",
    rows: [
      {
        label: "In-house API access",
        values: ["Read-only", "Standard", "Unlimited", "Unlimited"],
      },
      { label: "MMP integrations", values: ["—", true, true, true] },
      { label: "White-label portal", values: ["—", "—", true, true] },
      { label: "SSO & advanced roles", values: ["—", "—", "—", true] },
      {
        label: "Dedicated infrastructure + SLA",
        values: ["—", "—", "Shared+", true],
      },
      {
        label: "Support",
        values: ["Email", "Chat + email", "Priority + CSM", "Dedicated"],
      },
    ],
  },
];

const planHeaders = [
  { name: "Launch", price: "$299/mo" },
  { name: "Growth", price: "$699/mo", highlight: true },
  { name: "Scale", price: "$1,499/mo" },
  { name: "Enterprise", price: "Custom" },
];

const market = [
  {
    provider: "Afilize",
    entry: "$299",
    note: "/mo entry. AI chatbot at $699. Full AI + invoicing at $1,499. Transparent · automation from tier 2 · no long lock-in.",
    highlight: true,
  },
  {
    provider: "Affise",
    entry: "$625",
    note: "/mo (7K conversions). Automations locked to the $2,499 Custom tier. No native AI.",
  },
  {
    provider: "Swaarm",
    entry: "$850",
    note: "/mo entry. Automation & fraud only on custom Scale plan. No native AI.",
  },
  {
    provider: "Everflow",
    entry: "Quote",
    note: "No public pricing. Metered by payout volume, 6-month commitment. No native AI.",
  },
];

const faq = [
  {
    q: "What counts as a conversion?",
    a: "An install or a tracked post-install event. Clicks and impressions metered separately; clicks always unlimited.",
  },
  {
    q: "What happens past my cap?",
    a: "Tracking never stops. Extra conversions bill at $9 / $7 / $5 per 1,000.",
  },
  {
    q: "Annual vs monthly?",
    a: "Annual = 2 months free. Toggle at top. Upgrade/downgrade anytime.",
  },
  {
    q: "Is there a free trial?",
    a: "14 days on Launch, Growth, Scale. No card.",
  },
  {
    q: "Can I change plans later?",
    a: "Anytime; gated features pause on downgrade, data kept.",
  },
  {
    q: "Do you migrate my data?",
    a: "Guided migration on Growth+; white-glove on Enterprise.",
  },
];

function CellValue({
  value,
  ai,
  gold,
}: {
  value: Cell;
  ai?: boolean;
  gold?: boolean;
}) {
  if (value === true) {
    return ai ? (
      <AiStarIcon className="mx-auto h-4 w-4 text-accent-2" />
    ) : (
      <CheckIcon className="mx-auto h-4 w-4 text-good" />
    );
  }
  if (value === "—") {
    return <span className={gold ? "text-warn" : "text-text-dim"}>—</span>;
  }
  return (
    <span
      className={`font-mono text-[12.5px] ${
        gold ? "text-warn" : "text-text-muted"
      }`}
    >
      {value}
    </span>
  );
}

export default function PricingPage() {
  return (
    <main className="flex-1">
      {/* 5.1 Hero + billing toggle, 5.2 plan cards */}
      <section className="wrap pb-16 pt-16">
        <div className="text-center">
          <Eyebrow>Plans &amp; Pricing</Eyebrow>
          <h1 className="mx-auto mt-6 max-w-[820px] text-[clamp(34px,6vw,58px)] font-bold leading-[1.03] tracking-[-0.03em]">
            Pricing built for the{" "}
            <span className="flow-text">new advertising era</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-lg text-text-muted">
            Every plan tracks clicks, impressions, and conversions in real
            time. The higher you go, the more Afilize runs itself — AI,
            automation, and invoicing included.
          </p>
        </div>
        <div className="mt-10">
          <PricingPlans />
        </div>
      </section>

      {/* 5.3 Feature comparison table */}
      <section className="wrap pb-16">
        <SectionHead
          label="Full Breakdown"
          title="What's in every plan"
          sub="The upgrade ladder is simple: tracking is universal, AI and finance unlock as you scale."
        />
        <div className="mt-11 overflow-x-auto rounded-[18px] border border-line">
          <table className="w-full min-w-[680px] border-collapse text-sm">
            <thead>
              <tr className="bg-surface-2">
                <th className="bg-surface-2 p-4 text-left align-middle font-display text-[15px] font-semibold">
                  Feature
                </th>
                {planHeaders.map((plan) => (
                  <th
                    key={plan.name}
                    className={`p-4 text-center align-middle ${
                      plan.highlight
                        ? "bg-[#1c2440] text-accent-2"
                        : plan.name === "Enterprise"
                          ? "bg-surface-2 text-warn"
                          : "bg-surface-2"
                    }`}
                    style={
                      plan.name === "Enterprise"
                        ? {
                            backgroundImage:
                              "linear-gradient(rgba(240,169,59,0.08), rgba(240,169,59,0.08))",
                          }
                        : undefined
                    }
                  >
                    <span className="font-display text-[15px] font-semibold">
                      {plan.name}
                    </span>
                    <span
                      className={`block font-mono text-xs font-normal ${
                        plan.highlight
                          ? "text-accent-2"
                          : plan.name === "Enterprise"
                            ? "text-warn"
                            : "text-text-dim"
                      }`}
                    >
                      {plan.price}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-surface">
              {table.map((group) => (
                <Fragment key={group.group}>
                  <tr>
                    <td
                      colSpan={5}
                      className="border-t border-line-soft px-4 pb-2 pt-5 align-middle font-mono text-xs uppercase tracking-[0.18em] text-accent"
                    >
                      {group.group}
                    </td>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.label} className="border-t border-line-soft">
                      <td className="p-4 align-middle text-text-muted">
                        {row.label}
                      </td>
                      {row.values.map((value, i) => (
                        <td
                          key={i}
                          className={`p-4 text-center align-middle ${
                            i === 1
                              ? "bg-[rgba(124,130,255,0.05)]"
                              : i === 3
                                ? "bg-[rgba(240,169,59,0.05)]"
                                : ""
                          }`}
                        >
                          <CellValue value={value} ai={row.ai} gold={i === 3} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5.4 Market comparison */}
      <section className="wrap pb-16">
        <SectionHead
          label="Where We Land"
          title="Priced below the legacy trackers"
          sub="Same conversion-based model the market already understands — but AI, automation, and invoicing start two tiers earlier."
        />
        <div className="mt-11 grid gap-4 min-[461px]:grid-cols-2 min-[881px]:grid-cols-4">
          {market.map((item) =>
            item.highlight ? (
              <div key={item.provider} className="rounded-[18px] p-px flow-bg">
                <div className="flex h-full flex-col rounded-[17px] bg-surface p-[30px]">
                  <h3 className="font-display text-lg font-semibold">
                    {item.provider}
                  </h3>
                  <p className="mt-3 font-mono text-[28px] font-bold leading-none">
                    {item.entry}
                  </p>
                  <p className="mt-3 text-sm text-text-muted">{item.note}</p>
                </div>
              </div>
            ) : (
              <div
                key={item.provider}
                className="flex flex-col rounded-[18px] border border-line bg-surface p-[30px]"
              >
                <h3 className="font-display text-lg font-semibold">
                  {item.provider}
                </h3>
                <p className="mt-3 font-mono text-[28px] font-bold leading-none text-text-muted">
                  {item.entry}
                </p>
                <p className="mt-3 text-sm text-text-muted">{item.note}</p>
              </div>
            ),
          )}
        </div>
      </section>

      {/* 5.5 Billing FAQ */}
      <section className="wrap pb-16">
        <div className="grid gap-4 min-[641px]:grid-cols-2 min-[881px]:grid-cols-3">
          {faq.map((item) => (
            <div
              key={item.q}
              className="rounded-[18px] border border-line bg-surface p-6"
            >
              <h3 className="font-display text-[16px] font-semibold">
                {item.q}
              </h3>
              <p className="mt-2 text-sm text-text-muted">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5.7 Final CTA */}
      <FinalCta
        title="See it running on your own traffic"
        line="Spin up a workspace, point a test offer at it, and watch the rules and AI work in real time."
        primary={{ href: "/signup", label: "Start 14-day trial" }}
        secondary={{ href: "/solutions", label: "What you'll achieve" }}
      />
    </main>
  );
}
