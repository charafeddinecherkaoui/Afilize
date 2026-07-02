import Link from "next/link";
import type { ReactNode } from "react";

/* ---------- Icons (spec §2) ---------- */

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 8.5l3 3 7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AiStarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 0l1.8 6.2L16 8l-6.2 1.8L8 16l-1.8-6.2L0 8l6.2-1.8L8 0z" />
    </svg>
  );
}

/* ---------- Eyebrow — pulsing cyan dot + mono label ---------- */

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-2 px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-accent-2">
      <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent-2" />
      {children}
    </span>
  );
}

/* ---------- Section head — centered mono label + h2 + muted line ---------- */

export function SectionHead({
  label,
  title,
  sub,
}: {
  label: string;
  title: ReactNode;
  sub: string;
}) {
  return (
    <div className="mx-auto max-w-[720px] text-center">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
        {label}
      </p>
      <h2 className="mt-3 text-[clamp(26px,4vw,38px)] font-bold leading-tight tracking-[-0.02em]">
        {title}
      </h2>
      <p className="mt-3 text-text-muted">{sub}</p>
    </div>
  );
}

/* ---------- Check row — green check (or cyan AI star) + text ---------- */

export function CheckRow({
  children,
  ai = false,
}: {
  children: ReactNode;
  ai?: boolean;
}) {
  return (
    <li className="flex items-start gap-2.5 text-[15px] text-text-muted">
      {ai ? (
        <AiStarIcon className="mt-[3px] h-4 w-4 shrink-0 text-accent-2" />
      ) : (
        <CheckIcon className="mt-[3px] h-4 w-4 shrink-0 text-good" />
      )}
      <span>{children}</span>
    </li>
  );
}

/* ---------- Chip — small mono pill ---------- */

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-ink-2 px-3 py-1.5 font-mono text-[12.5px] text-text-muted">
      {children}
    </span>
  );
}

/* ---------- CTA buttons ---------- */

export function Cta({
  href,
  children,
  variant = "ghost",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  const external = href.startsWith("#") || href.startsWith("http");
  const cls =
    variant === "primary"
      ? "inline-block rounded-xl flow-bg px-5 py-3 text-sm font-semibold text-ink transition-shadow hover:shadow-[0_0_28px_rgba(124,130,255,0.45)]"
      : "inline-block rounded-xl border border-line px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-accent";
  if (external) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/* ---------- 5-step flow strip (spec §2) ---------- */

const flowSteps = [
  {
    num: "01",
    title: "Track",
    desc: "Every click and conversion captured in real time.",
  },
  {
    num: "02",
    title: "Analyze",
    desc: "Revenue, cost, profit, and ROI, live on any dimension.",
  },
  {
    num: "03",
    title: "Optimize",
    desc: "AI moves bids, budgets, and traffic toward what works.",
  },
  {
    num: "04",
    title: "Automate",
    desc: "Rules enforce your decisions around the clock.",
  },
  {
    num: "05",
    title: "Protect",
    desc: "Fraud is caught and held before any payout goes out.",
  },
];

export function FlowStrip() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[18px] border border-line bg-line-soft min-[781px]:grid-cols-5">
      {flowSteps.map((step) => (
        <div key={step.title} className="bg-surface p-6 last:max-[780px]:col-span-2">
          <p className="font-mono text-xs text-accent-2">{step.num}</p>
          <h3 className="mt-2 font-display text-lg font-semibold tracking-[-0.01em]">
            {step.title}
          </h3>
          <p className="mt-1.5 text-sm text-text-muted">{step.desc}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- Final CTA block (spec §2) ---------- */

export function FinalCta({
  title,
  line,
  primary,
  secondary,
}: {
  title: string;
  line: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
}) {
  return (
    <section className="wrap pb-16 pt-4">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 text-center">
        <div className="pointer-events-none absolute -top-28 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full bg-[rgba(124,130,255,0.25)] blur-[80px]" />
        <div className="relative">
          <h2 className="text-[clamp(26px,4vw,38px)] font-bold leading-tight tracking-[-0.02em]">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-text-muted">{line}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Cta href={primary.href} variant="primary">
              {primary.label}
            </Cta>
            <Cta href={secondary.href}>{secondary.label}</Cta>
          </div>
        </div>
      </div>
    </section>
  );
}
