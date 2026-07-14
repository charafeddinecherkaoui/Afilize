"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ─── Motion tokens (exported for page use) ───────────────────────────────────
export const E_OUT = [0.16, 1, 0.3, 1] as const;

// ─── Hooks ────────────────────────────────────────────────────────────────────
export function usePRM() {
  const [r, setR] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const h = () => setR(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return r;
}

export function useIsMobile() {
  const [m, setM] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768);
    window.addEventListener("resize", h, { passive: true });
    return () => window.removeEventListener("resize", h);
  }, []);
  return m;
}

// ─── Global animation + utility CSS ──────────────────────────────────────────
export const MOTION_CSS = `
  @property --s-ang {
    syntax: "<angle>";
    inherits: false;
    initial-value: 0deg;
  }

  .flow-bg   { background: linear-gradient(100deg, #7c82ff 0%, #27d3ee 100%); }
  .flow-gold { background: linear-gradient(100deg, #f0a93b 0%, #ffd98a 100%); }
  .flow-text {
    background: linear-gradient(100deg, #7c82ff 0%, #27d3ee 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .wrap { max-width: 1200px; margin-inline: auto; padding-inline: 24px; }

  body { background: #080b16; color: #eaeef8; font-family: 'Inter', sans-serif; }

  .bg-field {
    position: fixed; inset: 0; z-index: 0;
    pointer-events: none; opacity: 0.55;
  }
  .bg-field::before, .bg-field::after {
    content: ""; position: absolute; border-radius: 50%; filter: blur(90px);
  }
  .bg-field::before {
    width: 560px; height: 560px; top: -140px; left: -120px;
    background: rgba(124,130,255,0.32);
  }
  .bg-field::after {
    width: 620px; height: 620px; top: 38%; right: -180px;
    background: rgba(39,211,238,0.2);
  }
  .bg-grid {
    position: fixed; inset: 0; z-index: 0;
    pointer-events: none; opacity: 0.22;
    background-image:
      linear-gradient(#1b2338 1px, transparent 1px),
      linear-gradient(90deg, #1b2338 1px, transparent 1px);
    background-size: 64px 64px;
    -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, #000 35%, transparent 100%);
    mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, #000 35%, transparent 100%);
  }
  .stage { position: relative; z-index: 1; }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.45; transform: scale(0.75); }
  }
  .pulse-dot { animation: pulse-dot 2.4s ease-in-out infinite; }

  .nav-bar {
    position: sticky; top: 0; z-index: 50;
    border-bottom: 1px solid #1b2338;
    background: rgba(8,11,22,0.72);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }

  :focus-visible { outline: 2px solid #27d3ee; outline-offset: 3px; }

  .cta-ghost {
    border: 1px solid #27314c; border-radius: 12px;
    padding: 10px 18px; font-size: 0.875rem; font-weight: 600;
    color: #eaeef8; transition: border-color 0.18s ease; display: inline-block;
    text-decoration: none;
  }
  .cta-ghost:hover { border-color: #7c82ff; }
  .cta-primary {
    border-radius: 12px; padding: 10px 18px;
    font-size: 0.875rem; font-weight: 600; color: #080b16;
    background: linear-gradient(100deg, #7c82ff 0%, #27d3ee 100%);
    transition: box-shadow 0.18s ease; display: inline-block; text-decoration: none;
  }
  .cta-primary:hover { box-shadow: 0 0 28px rgba(124,130,255,0.45); }

  .tr-hidden { opacity: 0; transform: translateY(10px); }

  @media (prefers-reduced-motion: reduce) {
    .pulse-dot { animation: none; }
    .tr-hidden { opacity: 1; transform: none; }
    .growth-col-pulse { animation: none !important; }
    .growth-sweep { display: none !important; }
    .growth-glow  { display: none !important; }
  }

  @media (prefers-reduced-motion: no-preference) {
    @keyframes tr-in {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .tr-revealed { animation: tr-in 0.32s cubic-bezier(0.16,1,0.3,1) both; }

    @keyframes col-pulse {
      0%, 100% { background-color: rgba(124,130,255,0.05); }
      50%       { background-color: rgba(124,130,255,0.13); }
    }
    .growth-col-pulse { animation: col-pulse 3.5s ease-in-out infinite; }

    @keyframes sweep-once {
      0%   { --s-ang: 0deg;   opacity: 1; }
      78%  { --s-ang: 360deg; opacity: 0.65; }
      100% { --s-ang: 360deg; opacity: 0; }
    }
    .growth-sweep {
      position: absolute; inset: 0; border-radius: 18px;
      background: conic-gradient(
        from var(--s-ang),
        transparent 0deg 290deg,
        rgba(124,130,255,0.9) 310deg,
        rgba(255,255,255,0.7) 330deg,
        rgba(39,211,238,0.9) 350deg,
        transparent 20deg
      );
      animation: sweep-once 2s cubic-bezier(0.4,0,0.2,1) forwards;
      pointer-events: none; z-index: 1;
    }

    @keyframes glow-breathe {
      0%, 100% { opacity: 0.2; }
      50%       { opacity: 0.48; }
    }
    .growth-glow {
      position: absolute; inset: -20px; border-radius: 28px;
      background: linear-gradient(100deg, #7c82ff 0%, #27d3ee 100%);
      filter: blur(52px);
      animation: glow-breathe 4s ease-in-out infinite;
      pointer-events: none; will-change: opacity;
    }
  }
`;

// ─── Icons ────────────────────────────────────────────────────────────────────
export function CheckIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function AiStarIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path d="M8 0l1.8 6.2L16 8l-6.2 1.8L8 16l-1.8-6.2L0 8l6.2-1.8L8 0z" />
    </svg>
  );
}
export function CrossIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Atom components ──────────────────────────────────────────────────────────
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.18em]"
      style={{ border: "1px solid #27314c", background: "#0b1020", color: "#27d3ee" }}
    >
      <span className="pulse-dot h-1.5 w-1.5 rounded-full" style={{ background: "#27d3ee" }} />
      {children}
    </span>
  );
}

export function SectionHead({ label, title, sub }: { label: string; title: React.ReactNode; sub: string }) {
  return (
    <div className="mx-auto max-w-[720px] text-center">
      <p className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: "#27d3ee" }}>{label}</p>
      <h2
        className="mt-3 font-bold leading-tight tracking-[-0.02em]"
        style={{ fontSize: "clamp(26px,4vw,38px)", fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {title}
      </h2>
      <p className="mt-3" style={{ color: "#9097b2" }}>{sub}</p>
    </div>
  );
}

export function CheckRow({ children, ai }: { children: React.ReactNode; ai?: boolean }) {
  return (
    <li className="flex items-start gap-2.5 text-[15px]" style={{ color: "#9097b2" }}>
      {ai
        ? <AiStarIcon className="mt-[3px] h-4 w-4 shrink-0" style={{ color: "#27d3ee" }} />
        : <CheckIcon className="mt-[3px] h-4 w-4 shrink-0" style={{ color: "#3ddc91" }} />
      }
      <span>{children}</span>
    </li>
  );
}

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-full px-3 py-1.5 font-mono text-[12.5px]"
      style={{ border: "1px solid #27314c", background: "#0b1020", color: "#9097b2" }}
    >
      {children}
    </span>
  );
}

export function Cta({ to, children, variant = "ghost" }: { to: string; children: React.ReactNode; variant?: "primary" | "ghost" }) {
  const cls = variant === "primary" ? "cta-primary" : "cta-ghost";
  const isExternal = to.startsWith("http") || to.startsWith("mailto:");
  if (isExternal) return <a href={to} className={cls}>{children}</a>;
  return <Link href={to} className={cls}>{children}</Link>;
}

// ─── FlowStrip ────────────────────────────────────────────────────────────────
const flowSteps = [
  { num: "01", title: "Track",    desc: "Every click and conversion captured in real time." },
  { num: "02", title: "Analyze",  desc: "Revenue, cost, profit, and ROI, live on any dimension." },
  { num: "03", title: "Optimize", desc: "AI moves bids, budgets, and traffic toward what works." },
  { num: "04", title: "Automate", desc: "Rules enforce your decisions around the clock." },
  { num: "05", title: "Protect",  desc: "Fraud is caught and held before any payout goes out." },
];

export function FlowStrip() {
  return (
    <div
      className="grid grid-cols-2 gap-px overflow-hidden rounded-[18px] min-[781px]:grid-cols-5"
      style={{ background: "#1b2338", border: "1px solid #1b2338" }}
    >
      {flowSteps.map((s) => (
        <div key={s.title} className="p-6 last:max-[780px]:col-span-2" style={{ background: "#121a2e" }}>
          <p className="font-mono text-xs" style={{ color: "#27d3ee" }}>{s.num}</p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.01em]"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#eaeef8" }}>{s.title}</h3>
          <p className="mt-1.5 text-sm" style={{ color: "#9097b2" }}>{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

// ─── FinalCta ─────────────────────────────────────────────────────────────────
export function FinalCta({
  title, line,
  primary, secondary,
}: {
  title: string; line: string;
  primary: { to: string; label: string };
  secondary: { to: string; label: string };
}) {
  return (
    <section className="wrap pb-16 pt-4">
      <div
        className="relative overflow-hidden rounded-3xl px-6 py-14 text-center"
        style={{ border: "1px solid #27314c", background: "#121a2e" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full"
          style={{ background: "rgba(124,130,255,0.25)", filter: "blur(80px)" }}
        />
        <div className="relative">
          <h2
            className="font-bold leading-tight tracking-[-0.02em]"
            style={{ fontSize: "clamp(26px,4vw,38px)", fontFamily: "'Space Grotesk', sans-serif", color: "#eaeef8" }}
          >
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-[560px]" style={{ color: "#9097b2" }}>{line}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Cta to={primary.to} variant="primary">{primary.label}</Cta>
            <Cta to={secondary.to}>{secondary.label}</Cta>
          </div>
        </div>
      </div>
    </section>
  );
}
