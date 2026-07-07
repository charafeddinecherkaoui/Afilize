"use client";

import Link from "next/link";
import { useState } from "react";
import { AiStarIcon, CheckIcon } from "@/components/blocks";

type BillingMode = "monthly" | "annual";

type Feature = { text: string; ai?: boolean };

type Plan = {
  name: string;
  monthly: string;
  annual: string;
  billedYearly: string;
  limits: { label: string; value: string }[];
  lead?: string;
  features: Feature[];
  cta: string;
  popular?: boolean;
  custom?: boolean;
};

const plans: Plan[] = [
  {
    name: "Launch",
    monthly: "$299",
    annual: "$249",
    billedYearly: "Billed yearly $2,988",
    limits: [
      { label: "Conversions/mo", value: "10,000" },
      { label: "Impressions/mo", value: "5M" },
      { label: "Clicks", value: "Unlimited" },
      { label: "Seats", value: "2" },
    ],
    features: [
      { text: "Full S2S tracking & attribution" },
      { text: "Advertisers, Publishers, Offers" },
      { text: "Global dashboard (Revenue, Cost, Profit, ROI)" },
      { text: "CSV export" },
      { text: "Shareable report links (basic)" },
      { text: "1 custom domain" },
      { text: "Email support" },
    ],
    cta: "Start free trial",
  },
  {
    name: "Growth",
    monthly: "$699",
    annual: "$579",
    billedYearly: "Billed yearly $6,948",
    limits: [
      { label: "Conversions/mo", value: "50,000" },
      { label: "Impressions/mo", value: "25M" },
      { label: "Clicks", value: "Unlimited" },
      { label: "Seats", value: "10" },
    ],
    lead: "Everything in Launch, plus:",
    features: [
      { text: "AI Chatbot over your live data", ai: true },
      { text: "Automation rules (pause / blacklist / cap-redirect)" },
      { text: "Offer-testing integrations" },
      { text: "Report links with filters · PDF · scheduled" },
      { text: "Slack digest + data-period check" },
      { text: "Invoice requests + stats validation" },
      { text: "MMP integrations" },
      { text: "3 domains" },
      { text: "Chat support" },
    ],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Scale",
    monthly: "$1,499",
    annual: "$1,249",
    billedYearly: "Billed yearly $14,988",
    limits: [
      { label: "Conversions/mo", value: "200,000" },
      { label: "Impressions/mo", value: "100M" },
      { label: "Clicks", value: "Unlimited" },
      { label: "Seats", value: "Unlimited" },
    ],
    lead: "Everything in Growth, plus:",
    features: [
      { text: "AI Optimization & auto-decisioning", ai: true },
      { text: "Full invoicing: auto-generation + reconciliation" },
      { text: "Unlimited in-house API" },
      { text: "Custom automation rules + full change logs" },
      { text: "White-label portal" },
      { text: "10 domains" },
      { text: "Priority support + dedicated manager" },
    ],
    cta: "Start free trial",
  },
  {
    name: "Enterprise",
    monthly: "Custom",
    annual: "Custom",
    billedYearly: "Tailored pricing",
    limits: [
      { label: "Conversions/mo", value: "Custom" },
      { label: "Impressions/mo", value: "Unlimited" },
      { label: "Clicks", value: "Unlimited" },
      { label: "Seats", value: "Unlimited" },
    ],
    lead: "Everything in Scale, plus:",
    features: [
      { text: "Dedicated infrastructure + 99.9% SLA" },
      { text: "SSO & advanced roles" },
      { text: "Custom integrations & development" },
      { text: "Unlimited custom domains" },
      { text: "White-glove onboarding & migration" },
    ],
    cta: "Talk to sales",
    custom: true,
  },
];

function PlanCard({ plan, mode }: { plan: Plan; mode: BillingMode }) {
  const price = mode === "monthly" ? plan.monthly : plan.annual;
  const billed = plan.custom
    ? plan.billedYearly
    : mode === "monthly"
      ? "Billed monthly"
      : plan.billedYearly;

  const cardName = `pricing-card-${plan.name.toLowerCase()}`;

  const inner = (
    <div
      className={`${cardName} card-body flex h-full flex-col rounded-[17px] bg-surface p-[30px] ${
        plan.popular || plan.custom ? "" : "border border-line"
      }`}
    >
      <h3 className="font-display text-lg font-semibold tracking-[-0.01em]">
        {plan.name}
      </h3>
      <p className="mt-4">
        <span
          className="font-mono text-[42px] font-bold leading-none"
          data-monthly={plan.monthly}
          data-annual={plan.annual}
        >
          {price}
        </span>
        {!plan.custom && (
          <span className="ml-1 font-mono text-sm text-text-dim">/mo</span>
        )}
      </p>
      <p
        className="mt-1.5 font-mono text-xs text-text-dim"
        data-monthly={plan.custom ? plan.billedYearly : "Billed monthly"}
        data-annual={plan.billedYearly}
      >
        {billed}
      </p>

      <ul className="mt-5 space-y-1.5 border-y border-line-soft py-4">
        {plan.limits.map((limit) => (
          <li
            key={limit.label}
            className="flex items-center justify-between font-mono text-[12.5px]"
          >
            <span className="text-text-dim">{limit.label}</span>
            <span className="text-text-muted">{limit.value}</span>
          </li>
        ))}
      </ul>

      <ul className="card-feature-list mt-4 flex-1 space-y-2.5">
        {plan.lead && (
          <li className="text-[13px] font-semibold text-text">{plan.lead}</li>
        )}
        {plan.features.map((feature) => (
          <li
            key={feature.text}
            className="flex items-start gap-2.5 text-sm text-text-muted"
          >
            {feature.ai ? (
              <AiStarIcon className="mt-[3px] h-3.5 w-3.5 shrink-0 text-accent-2" />
            ) : (
              <CheckIcon className="mt-[3px] h-3.5 w-3.5 shrink-0 text-good" />
            )}
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/request-demo"
        className={`card-submit-button mt-6 block rounded-xl py-2.5 text-center text-sm font-semibold ${
          plan.popular
            ? "flow-bg text-ink transition-shadow hover:shadow-[0_0_24px_rgba(124,130,255,0.45)]"
            : plan.custom
              ? "flow-gold-bg text-ink transition-shadow hover:shadow-[0_0_24px_rgba(240,169,59,0.45)]"
              : "border border-line text-text transition-colors hover:border-accent"
        }`}
      >
        {plan.cta}
      </Link>
    </div>
  );

  if (plan.popular) {
    return (
      <div className="pricing-card-frame relative rounded-[18px] p-px flow-bg shadow-[0_0_40px_rgba(124,130,255,0.25)]">
        <span className="card-badge absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full flow-bg px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
          Most popular
        </span>
        {inner}
      </div>
    );
  }
  if (plan.custom) {
    return (
      <div className="pricing-card-frame relative rounded-[18px] p-px flow-gold-bg shadow-[0_0_40px_rgba(240,169,59,0.25)]">
        <span className="card-badge absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full flow-gold-bg px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
          VIP
        </span>
        {inner}
      </div>
    );
  }
  return inner;
}

export default function PricingPlans() {
  const [mode, setMode] = useState<BillingMode>("monthly");

  return (
    <div className="pricing-plans">
      {/* Billing toggle (spec §5.1 / §5.6) */}
      <div className="billing-toggle flex flex-wrap items-center justify-center gap-3">
        <div
          role="tablist"
          aria-label="Billing period"
          className="relative grid w-[240px] grid-cols-2 rounded-full bg-line-soft p-1"
        >
          <span
            aria-hidden="true"
            className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full flow-bg transition-transform duration-200 ${
              mode === "annual" ? "translate-x-full" : ""
            }`}
          />
          <button
            type="button"
            role="tab"
            aria-selected={mode === "monthly"}
            onClick={() => setMode("monthly")}
            className={`relative z-10 rounded-full py-2 text-sm font-semibold transition-colors ${
              mode === "monthly" ? "text-ink" : "text-text-muted"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "annual"}
            onClick={() => setMode("annual")}
            className={`relative z-10 rounded-full py-2 text-sm font-semibold transition-colors ${
              mode === "annual" ? "text-ink" : "text-text-muted"
            }`}
          >
            Annual
          </button>
        </div>
        <span className="rounded-full border border-good/40 bg-good/10 px-3 py-1 font-mono text-xs text-good">
          2 months free
        </span>
      </div>

      {/* Plan cards */}
      <div className="pricing-cards-grid mt-10 grid gap-4 min-[561px]:grid-cols-2 min-[1025px]:grid-cols-4">
        {plans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} mode={mode} />
        ))}
      </div>

      {/* Overage footnote */}
      <p className="mt-6 text-center font-mono text-[12.5px] text-text-dim">
        Overage billed per 1,000 extra conversions — Launch $9 · Growth $7 ·
        Scale $5. Tracking never stops when you hit a cap.
      </p>
    </div>
  );
}
