"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import Link from "next/link";
import {
  E_OUT, usePRM, useIsMobile,
  CheckIcon, AiStarIcon, Eyebrow, SectionHead, FinalCta,
} from "@/components/shared";

// ─── Page CSS ─────────────────────────────────────────────────────────────────
const PAGE_CSS = `
  @media (prefers-reduced-motion: no-preference) {
    @keyframes pri-orb-a {
      0%,100% { transform: translate(0,0) scale(1); }
      35%      { transform: translate(-40px,30px) scale(1.09); }
      68%      { transform: translate(28px,-22px) scale(0.94); }
    }
    @keyframes pri-orb-b {
      0%,100% { transform: translate(0,0) scale(1); }
      42%      { transform: translate(50px,-35px) scale(1.08); }
      74%      { transform: translate(-30px,28px) scale(0.96); }
    }
    @keyframes pri-orb-c {
      0%,100% { transform: translate(0,0) scale(1); }
      50%      { transform: translate(22px,38px) scale(1.06); }
    }
    @keyframes pri-scan-h {
      0%   { transform: translateX(-100%); opacity: 0; }
      8%   { opacity: 1; } 92% { opacity: 0.8; }
      100% { transform: translateX(100%); opacity: 0; }
    }
    @keyframes pri-ring {
      0%   { transform: scale(0.55); opacity: 0.65; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    .pri-orb-a { animation: pri-orb-a 19s ease-in-out infinite; }
    .pri-orb-b { animation: pri-orb-b 24s ease-in-out infinite; }
    .pri-orb-c { animation: pri-orb-c 15s ease-in-out infinite; }
    .pri-scan-h { animation: pri-scan-h 8s linear infinite; }
    .pri-ring-1 { animation: pri-ring 3.4s ease-out infinite; }
    .pri-ring-2 { animation: pri-ring 3.4s ease-out 1.13s infinite; }
    .pri-ring-3 { animation: pri-ring 3.4s ease-out 2.27s infinite; }
  }
  .plan-card-wrap {
    transition: transform 0.28s cubic-bezier(0.16,1,0.3,1), box-shadow 0.28s ease;
  }
  .plan-card-wrap:hover { transform: translateY(-6px); }
  .faq-card {
    transition: transform 0.24s cubic-bezier(0.16,1,0.3,1),
                border-color 0.24s ease, box-shadow 0.24s ease;
  }
  .faq-card:hover {
    transform: translateY(-4px);
    border-color: rgba(124,130,255,0.4) !important;
    box-shadow: 0 0 0 1px rgba(124,130,255,0.18), 0 16px 44px rgba(124,130,255,0.1);
  }
`;

const SPR = { type: "spring" as const, stiffness: 440, damping: 34 };
type BillingMode = "monthly" | "annual";
type Cell = string | boolean;
type Feature = { text: string; ai?: boolean };

// Accent palette per plan index (0=Launch 1=Growth 2=Scale 3=Enterprise)
const PLAN_ACCENT = [
  { color: "#7c82ff", bg: "rgba(124,130,255,0.1)",  border: "rgba(124,130,255,0.25)", label: "Starter"  },
  { color: "#27d3ee", bg: "rgba(39,211,238,0.1)",   border: "rgba(39,211,238,0.25)",  label: "Popular"  },
  { color: "#3ddc91", bg: "rgba(61,220,145,0.1)",   border: "rgba(61,220,145,0.25)",  label: "Advanced" },
  { color: "#f0a93b", bg: "rgba(240,169,59,0.1)",   border: "rgba(240,169,59,0.25)",  label: "VIP"      },
];

// ─── Data ─────────────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: "Launch", monthly: "$299", annual: "$249",
    billedMonthly: "Billed monthly", billedYearly: "Billed yearly $2,988",
    limits: [
      { label: "Conversions/mo", value: "10,000" },
      { label: "Impressions/mo", value: "5M" },
      { label: "Clicks",         value: "Unlimited" },
      { label: "Seats",          value: "2" },
    ],
    features: [
      { text: "Full S2S tracking & attribution" },
      { text: "Advertisers, Publishers, Offers" },
      { text: "Global dashboard (Revenue, Cost, Profit, ROI)" },
      { text: "CSV export" },
      { text: "Shareable report links (basic)" },
      { text: "1 custom domain" },
      { text: "Email support" },
    ] as Feature[],
    cta: "Start free trial", popular: false, custom: false, animDelay: 0,
  },
  {
    name: "Growth", monthly: "$699", annual: "$579",
    billedMonthly: "Billed monthly", billedYearly: "Billed yearly $6,948",
    limits: [
      { label: "Conversions/mo", value: "50,000" },
      { label: "Impressions/mo", value: "25M" },
      { label: "Clicks",         value: "Unlimited" },
      { label: "Seats",          value: "10" },
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
    ] as Feature[],
    cta: "Start free trial", popular: true, custom: false, animDelay: 0.3,
  },
  {
    name: "Scale", monthly: "$1,499", annual: "$1,249",
    billedMonthly: "Billed monthly", billedYearly: "Billed yearly $14,988",
    limits: [
      { label: "Conversions/mo", value: "200,000" },
      { label: "Impressions/mo", value: "100M" },
      { label: "Clicks",         value: "Unlimited" },
      { label: "Seats",          value: "Unlimited" },
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
    ] as Feature[],
    cta: "Start free trial", popular: false, custom: false, animDelay: 0.08,
  },
  {
    name: "Enterprise", monthly: "Custom", annual: "Custom",
    billedMonthly: "Tailored pricing", billedYearly: "Tailored pricing",
    limits: [
      { label: "Conversions/mo", value: "Custom" },
      { label: "Impressions/mo", value: "Unlimited" },
      { label: "Clicks",         value: "Unlimited" },
      { label: "Seats",          value: "Unlimited" },
    ],
    lead: "Everything in Scale, plus:",
    features: [
      { text: "Dedicated infrastructure + 99.9% SLA" },
      { text: "SSO & advanced roles" },
      { text: "Custom integrations & development" },
      { text: "Unlimited custom domains" },
      { text: "White-glove onboarding & migration" },
    ] as Feature[],
    cta: "Talk to sales", popular: false, custom: true, animDelay: 0.16,
  },
];

const TABLE_GROUPS: {
  group: string;
  rows: { label: string; values: [Cell, Cell, Cell, Cell]; ai?: boolean }[];
}[] = [
  {
    group: "Tracking & Attribution",
    rows: [
      { label: "Conversions",                     values: ["10K", "50K", "200K", "Custom"] },
      { label: "Installs, events, purchases",     values: [true, true, true, true] },
      { label: "Subid1, app names, bundle IDs",   values: [true, true, true, true] },
      { label: "CTIT · eCPI · ROAS · ROI",        values: [true, true, true, true] },
      { label: "Custom domains",                  values: ["1", "3", "10", "Unlimited"] },
    ],
  },
  {
    group: "Reporting & Sharing",
    rows: [
      { label: "Global dashboard",                       values: [true, true, true, true] },
      { label: "Breakdown views",                        values: [true, true, true, true] },
      { label: "Import & export",                        values: [true, true, true, true] },
      { label: "Reports as links, publisher-filtered",   values: ["Basic", true, true, true] },
      { label: "PDF + scheduled",                        values: ["—", true, true, true] },
      { label: "Slack digest + data-period check",       values: ["—", true, true, true] },
    ],
  },
  {
    group: "AI & Automation",
    rows: [
      { label: "AI Chatbot",                              values: ["—", true, true, true], ai: true },
      { label: "AI Optimization & auto-decisioning",      values: ["—", "—", true, true], ai: true },
      { label: "Performance & fraud automation rules",    values: ["—", "Standard", "Custom", "Custom"] },
      { label: "Offer-testing integrations",              values: ["—", true, true, true] },
      { label: "Change logs",                             values: ["30 days", "1 year", "Full", "Full"] },
    ],
  },
  {
    group: "Invoicing & Finance",
    rows: [
      { label: "Invoice requests + stats validation", values: ["—", true, true, true] },
      { label: "Auto invoice generation",             values: ["—", "—", true, true] },
      { label: "Revenue & payout reconciliation",     values: ["—", "—", true, true] },
    ],
  },
  {
    group: "API, Platform & Support",
    rows: [
      { label: "In-house API access",           values: ["Read-only", "Standard", "Unlimited", "Unlimited"] },
      { label: "MMP integrations",              values: ["—", true, true, true] },
      { label: "SSO & advanced roles",          values: ["—", "—", "—", true] },
      { label: "Dedicated infrastructure + SLA",values: ["—", "—", "Shared+", true] },
      { label: "Support",                       values: ["Email", "Chat + email", "Priority + CSM", "Dedicated"] },
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "What counts as a conversion?",
    a: "An install or a tracked post-install event. Clicks and impressions are metered separately; clicks are always unlimited.",
    icon: <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="10" cy="10" r="7.5"/><path d="M10 9v5M10 7h.01"/></svg>,
  },
  {
    q: "What happens past my cap?",
    a: "Tracking never stops. Extra conversions bill at $9 / $7 / $5 per 1,000 depending on your plan.",
    icon: <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M3 17l4-5 3 3 4-6 3 4"/><path d="M3 3v14h14"/></svg>,
  },
  {
    q: "Annual vs monthly?",
    a: "Annual saves you 2 months. Use the toggle at the top to switch. You can upgrade or downgrade anytime.",
    icon: <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><rect x="3" y="4" width="14" height="13" rx="2"/><path d="M3 8h14M7 3v2M13 3v2"/></svg>,
  },
  {
    q: "Is there a free trial?",
    a: "14 days on Launch, Growth, and Scale. No credit card required.",
    icon: <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="10" cy="10" r="7.5"/><path d="M10 6v4l2.5 2.5"/></svg>,
  },
  {
    q: "Can I change plans later?",
    a: "Anytime. Gated features pause on downgrade; your data is always kept.",
    icon: <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 10h12M12 6l4 4-4 4M8 14l-4-4 4-4"/></svg>,
  },
  {
    q: "Do you migrate my data?",
    a: "Guided migration on Growth+; white-glove onboarding on Enterprise.",
    icon: <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M5 10h10M10 5l5 5-5 5"/><circle cx="5" cy="10" r="1.5" fill="currentColor" stroke="none"/></svg>,
  },
];

// ─── Canvas hero background ───────────────────────────────────────────────────
function HeroBackground({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (reduced) return;
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;
    const onResize = () => { W = canvas.offsetWidth; H = canvas.offsetHeight; canvas.width = W; canvas.height = H; };
    window.addEventListener("resize", onResize, { passive: true });

    const BAR_COUNT = 28;
    const bars = Array.from({ length: BAR_COUNT }, () => ({
      h: 20 + Math.random() * 110, phase: Math.random() * Math.PI * 2, spd: 0.007 + Math.random() * 0.013,
    }));
    const nodes = Array.from({ length: 22 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.38, vy: (Math.random() - 0.5) * 0.38,
      r: Math.random() * 1.8 + 0.5, phase: Math.random() * Math.PI * 2,
    }));
    let t = 0;
    function frame() {
      ctx!.clearRect(0, 0, W, H);
      t += 0.006;
      // Animated bar chart along the bottom
      const bw = W / BAR_COUNT;
      bars.forEach((b, i) => {
        b.phase += b.spd;
        const h = b.h * ((Math.sin(b.phase) + 1) / 2 * 0.55 + 0.45);
        ctx!.fillStyle = `rgba(124,130,255,${0.05 + (h / 180) * 0.05})`;
        ctx!.fillRect(i * bw, H - h, bw - 2, h);
      });
      // Node network
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy; n.phase += 0.018;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x, dy = nodes[j].y - nodes[i].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 155) {
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(39,211,238,${(1 - d / 155) * 0.11})`;
            ctx!.lineWidth = 1;
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
            const ph = ((t * 0.85 + i * 0.38) % 1);
            if (d < 105 && ph < 0.52) {
              ctx!.beginPath();
              ctx!.arc(nodes[i].x + dx * ph, nodes[i].y + dy * ph, 1.5, 0, Math.PI * 2);
              ctx!.fillStyle = `rgba(124,130,255,${0.65 * (1 - d / 105)})`;
              ctx!.fill();
            }
          }
        }
      }
      for (const n of nodes) {
        const p = (Math.sin(n.phase) + 1) / 2;
        ctx!.beginPath(); ctx!.arc(n.x, n.y, n.r + p * 1.2, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(124,130,255,${0.26 + p * 0.36})`; ctx!.fill();
      }
      raf.current = requestAnimationFrame(frame);
    }
    frame();
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener("resize", onResize); };
  }, [reduced]);
  if (reduced) return null;
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" style={{ opacity: 0.48 }} />;
}

function HeroOrbs({ reduced }: { reduced: boolean }) {
  if (reduced) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="pri-orb-a absolute rounded-full" style={{ width: 540, height: 540, top: "-160px", left: "4%", background: "radial-gradient(circle, rgba(124,130,255,0.26) 0%, transparent 70%)", filter: "blur(44px)" }} />
      <div className="pri-orb-b absolute rounded-full" style={{ width: 460, height: 460, top: "0%", right: "-70px", background: "radial-gradient(circle, rgba(39,211,238,0.2) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <div className="pri-orb-c absolute rounded-full" style={{ width: 300, height: 300, bottom: "0", left: "44%", background: "radial-gradient(circle, rgba(240,169,59,0.12) 0%, transparent 70%)", filter: "blur(38px)" }} />
      <div className="absolute" style={{ width: 420, height: 420, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
        {["pri-ring-1","pri-ring-2","pri-ring-3"].map((cls) => (
          <div key={cls} className={`${cls} absolute inset-0 rounded-full`} style={{ border: "1px solid rgba(124,130,255,0.2)" }} />
        ))}
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="pri-scan-h absolute h-px w-full" style={{ top: "44%", background: "linear-gradient(90deg, transparent 0%, rgba(39,211,238,0.5) 40%, rgba(124,130,255,0.7) 60%, transparent 100%)" }} />
      </div>
    </div>
  );
}

// ─── Rolling price ────────────────────────────────────────────────────────────
function RollingPrice({ price, reduced }: { price: string; reduced: boolean }) {
  return (
    <span className="relative inline-block overflow-hidden" style={{ height: "46px", verticalAlign: "top" }}>
      <AnimatePresence initial={false} mode="wait">
        <motion.span key={price} className="block"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "42px", fontWeight: 700, lineHeight: "46px" }}
          initial={reduced ? false : { y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={reduced ? {} : { y: "-100%", opacity: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 0.28, ease: [0.4, 0, 0.2, 1] }}>
          {price}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ─── Billing toggle ───────────────────────────────────────────────────────────
function BillingToggle({ mode, onChange, reduced }: { mode: BillingMode; onChange: (m: BillingMode) => void; reduced: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div role="tablist" aria-label="Billing period"
        className="relative grid w-[240px] grid-cols-2 rounded-full p-1"
        style={{ background: "#1b2338", border: "1px solid #27314c" }}>
        <motion.span aria-hidden="true"
          className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full flow-bg"
          animate={{ x: mode === "annual" ? "100%" : "0%" }}
          transition={reduced ? { duration: 0 } : SPR} />
        {(["monthly", "annual"] as BillingMode[]).map((m) => (
          <button key={m} type="button" role="tab" aria-selected={mode === m}
            onClick={() => onChange(m)}
            className="relative z-10 rounded-full py-2 text-sm font-semibold transition-colors"
            style={{ color: mode === m ? "#080b16" : "#9097b2" }}>
            {m === "monthly" ? "Monthly" : "Annual"}
          </button>
        ))}
      </div>
      <span className="rounded-full px-3 py-1.5 font-mono text-xs font-semibold"
        style={{ border: "1px solid rgba(61,220,145,0.4)", background: "rgba(61,220,145,0.1)", color: "#3ddc91" }}>
        2 months free
      </span>
    </div>
  );
}

// ─── Plan card ────────────────────────────────────────────────────────────────
function PlanCard({ plan, planIdx, mode, reduced, isMobile }: {
  plan: typeof PLANS[number]; planIdx: number; mode: BillingMode; reduced: boolean; isMobile: boolean;
}) {
  const acc = PLAN_ACCENT[planIdx];
  const price = mode === "monthly" ? plan.monthly : plan.annual;
  const billedLine = mode === "monthly" ? plan.billedMonthly : plan.billedYearly;
  const mul = isMobile ? 0.8 : 1;
  const [sweepActive, setSweepActive] = useState(false);
  const [glowActive, setGlowActive] = useState(false);

  const handleComplete = () => {
    if (plan.popular && !reduced) {
      setSweepActive(true);
      setTimeout(() => { setSweepActive(false); setGlowActive(true); }, 2000 * mul);
    }
  };

  const viewport = { once: true, amount: 0 } as const;
  const cardInitial = reduced ? false : { opacity: 0, y: 28, scale: 0.97 } as const;
  const cardWhileInView = reduced ? {} : plan.popular
    ? { opacity: [0, 1, 1, 1], y: [28, 0, -5, 0], scale: [0.97, 1.0, 1.025, 1] }
    : { opacity: 1, y: 0, scale: 1 };
  const cardTransition: Transition = reduced ? { duration: 0 } : plan.popular
    ? { duration: 0.68 * mul, delay: plan.animDelay * mul, times: [0, 0.5, 0.72, 1], ease: "easeOut" }
    : { duration: 0.55 * mul, delay: plan.animDelay * mul, ease: E_OUT };

  const inner = (
    <div className="flex h-full flex-col rounded-[17px] p-7"
      style={{ background: "linear-gradient(155deg, #141d32 0%, #0f1628 100%)", border: plan.popular || plan.custom ? "none" : "1px solid #27314c" }}>

      {/* Name + tier chip */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-bold tracking-[-0.01em]"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#eaeef8" }}>{plan.name}</h3>
        {!plan.popular && !plan.custom && (
          <span className="rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider"
            style={{ background: acc.bg, color: acc.color, border: `1px solid ${acc.border}` }}>
            {acc.label}
          </span>
        )}
      </div>

      {/* Price */}
      <div className="mt-5 flex items-baseline">
        <RollingPrice price={price} reduced={reduced} />
        {!plan.custom && <span className="ml-1.5 font-mono text-sm" style={{ color: "#646c8a" }}>/mo</span>}
      </div>
      <div className="relative mt-1.5" style={{ minHeight: "18px" }}>
        <AnimatePresence mode="wait">
          <motion.p key={billedLine} className="absolute inset-x-0 font-mono text-xs"
            style={{ color: "#646c8a" }}
            initial={reduced ? {} : { opacity: 0 }} animate={{ opacity: 1 }}
            exit={reduced ? {} : { opacity: 0 }} transition={{ duration: 0.2 }}>
            {billedLine}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Limits */}
      <ul className="mt-5 space-y-1.5 border-y py-4" style={{ borderColor: "#1b2338" }}>
        {plan.limits.map((l) => (
          <li key={l.label} className="flex items-center justify-between font-mono text-[12.5px]">
            <span style={{ color: "#646c8a" }}>{l.label}</span>
            <span style={{ color: acc.color }}>{l.value}</span>
          </li>
        ))}
      </ul>

      {/* Features */}
      <ul className="mt-4 flex-1 space-y-2.5">
        {"lead" in plan && plan.lead && (
          <li className="text-[13px] font-semibold" style={{ color: "#eaeef8" }}>{plan.lead}</li>
        )}
        {plan.features.map((f) => (
          <li key={f.text} className="flex items-start gap-2.5 text-sm" style={{ color: "#9097b2" }}>
            {f.ai
              ? <AiStarIcon className="mt-[3px] h-3.5 w-3.5 shrink-0" style={{ color: "#27d3ee" }} />
              : <CheckIcon  className="mt-[3px] h-3.5 w-3.5 shrink-0" style={{ color: "#3ddc91" }} />}
            {f.text}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link href="/request-demo"
        className={`mt-6 block rounded-xl py-3 text-center text-sm font-semibold transition-all ${
          plan.popular ? "flow-bg hover:shadow-[0_0_28px_rgba(124,130,255,0.5)]"
          : plan.custom ? "flow-gold hover:shadow-[0_0_28px_rgba(240,169,59,0.5)]"
          : "border hover:border-[#7c82ff] hover:shadow-[0_0_18px_rgba(124,130,255,0.15)]"
        }`}
        style={plan.popular || plan.custom ? { color: "#080b16" } : { color: "#eaeef8", borderColor: "#27314c" }}>
        {plan.cta}
      </Link>

      {/* Bottom accent */}
      <div aria-hidden="true" className="pointer-events-none mt-4 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${acc.color}44, transparent)` }} />
    </div>
  );

  if (!plan.popular) {
    return (
      <motion.div
        initial={cardInitial} whileInView={cardWhileInView} viewport={viewport} transition={cardTransition}
        className={`plan-card-wrap${plan.custom ? " relative rounded-[18px] p-px" : ""}`}
        style={plan.custom ? { background: "linear-gradient(100deg, #f0a93b 0%, #ffd98a 100%)", boxShadow: "0 0 40px rgba(240,169,59,0.2)" } : {}}
        onMouseEnter={(e) => {
          if (!plan.custom) {
            e.currentTarget.style.boxShadow = `0 0 0 1px ${acc.border}, 0 20px 52px ${acc.bg}, 0 4px 18px rgba(0,0,0,0.4)`;
          }
        }}
        onMouseLeave={(e) => { if (!plan.custom) e.currentTarget.style.boxShadow = "none"; }}
      >
        {plan.custom && (
          <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full flow-gold px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider"
            style={{ color: "#080b16" }}>VIP</span>
        )}
        {inner}
      </motion.div>
    );
  }

  return (
    <motion.div className="plan-card-wrap relative isolate"
      initial={cardInitial} whileInView={cardWhileInView} viewport={viewport}
      transition={cardTransition} onAnimationComplete={handleComplete}>
      {glowActive && !reduced && <div aria-hidden="true" className="growth-glow" />}
      <div className="relative rounded-[18px] p-px"
        style={{ background: "linear-gradient(100deg, #7c82ff 0%, #27d3ee 100%)", boxShadow: "0 0 48px rgba(124,130,255,0.28)" }}>
        {sweepActive && !reduced && <div aria-hidden="true" className="growth-sweep" />}
        <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full flow-bg px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider"
          style={{ color: "#080b16" }}>Most popular</span>
        <div style={{ position: "relative", zIndex: 2 }}>{inner}</div>
      </div>
    </motion.div>
  );
}

// ─── Comparison table ─────────────────────────────────────────────────────────
function CellValue({ value, ai, gold }: { value: Cell; ai?: boolean; gold?: boolean }) {
  if (value === true) return ai
    ? <AiStarIcon className="mx-auto h-4 w-4" style={{ color: "#27d3ee" }} />
    : <CheckIcon  className="mx-auto h-4 w-4" style={{ color: "#3ddc91" }} />;
  if (value === "—") return <span style={{ color: gold ? "#f0a93b" : "#646c8a" }}>—</span>;
  return <span className="font-mono text-[12.5px]" style={{ color: gold ? "#f0a93b" : "#9097b2" }}>{value}</span>;
}

const TABLE_HEADERS = [
  { name: "Launch",     price: "$299/mo",   highlight: false, gold: false },
  { name: "Growth",     price: "$699/mo",   highlight: true,  gold: false },
  { name: "Scale",      price: "$1,499/mo", highlight: false, gold: false },
  { name: "Enterprise", price: "Custom",    highlight: false, gold: true  },
];

function ComparisonTable({ reduced }: { reduced: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const tbodyRef   = useRef<HTMLTableSectionElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current; if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { io.disconnect(); doReveal(); } },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function doReveal() {
    if (revealed || reduced) return;
    const rows = Array.from(tbodyRef.current?.querySelectorAll<HTMLTableRowElement>("tr.tr-hidden") ?? []);
    rows.forEach((r, i) => {
      r.style.animationDelay = `${i * 40}ms`;
      r.classList.replace("tr-hidden", "tr-revealed");
    });
    setRevealed(true);
  }

  return (
    <section className="wrap pb-20" ref={sectionRef as React.RefObject<HTMLElement>}>
      <SectionHead
        label="Full Breakdown"
        title="What's in every plan"
        sub="Tracking is universal. AI, finance, and white-label unlock as you scale."
      />
      <div className="mt-10 overflow-x-auto rounded-[20px]" style={{ border: "1px solid #27314c" }}>
        <table className="w-full min-w-[680px] border-collapse text-sm">
          <thead>
            <tr style={{ background: "#141d32" }}>
              <th className="p-4 text-left align-middle"
                style={{ position: "sticky", top: 0, zIndex: 20, background: "#141d32",
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", fontWeight: 600, color: "#eaeef8" }}>
                Feature
              </th>
              {TABLE_HEADERS.map((h) => (
                <th key={h.name} className="p-4 text-center align-middle"
                  style={{ position: "sticky", top: 0, zIndex: 20,
                    background: h.highlight ? "#1c2440" : h.gold ? "rgba(240,169,59,0.06)" : "#141d32",
                    color: h.highlight ? "#7c82ff" : h.gold ? "#f0a93b" : "#eaeef8" }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", fontWeight: 700, display: "block" }}>
                    {h.name}
                  </span>
                  <span className="font-mono text-xs font-normal"
                    style={{ color: h.highlight ? "#27d3ee" : h.gold ? "#f0a93b" : "#646c8a" }}>
                    {h.price}
                  </span>
                  {h.highlight && (
                    <div className="mt-1 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg, #7c82ff, #27d3ee)" }} />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody ref={tbodyRef} style={{ background: "#0f1628" }}>
            {TABLE_GROUPS.map((grp) => (
              <Fragment key={grp.group}>
                <tr>
                  <td colSpan={5} className="px-4 pb-2 pt-5 font-mono text-xs uppercase tracking-[0.18em]"
                    style={{ borderTop: "1px solid #1b2338", color: "#7c82ff" }}>
                    {grp.group}
                  </td>
                </tr>
                {grp.rows.map((row) => (
                  <tr key={row.label} className={reduced ? "" : "tr-hidden"}>
                    <td className="p-4 align-middle" style={{ borderTop: "1px solid #1b2338", color: "#9097b2" }}>
                      {row.label}
                    </td>
                    {row.values.map((val, ci) => (
                      <td key={ci}
                        className={`p-4 text-center align-middle${ci === 1 ? " growth-col-pulse" : ""}`}
                        style={{ borderTop: "1px solid #1b2338", backgroundColor: ci === 3 ? "rgba(240,169,59,0.04)" : "transparent" }}>
                        <CellValue value={val} ai={row.ai} gold={ci === 3} />
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
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [mode, setMode] = useState<BillingMode>("monthly");
  const reduced  = usePRM();
  const isMobile = useIsMobile();
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { const id = requestAnimationFrame(() => setHeroLoaded(true)); return () => cancelAnimationFrame(id); }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pb-16 pt-20">
        <HeroOrbs reduced={reduced} />
        {heroLoaded && <HeroBackground reduced={reduced} />}

        <div className="wrap relative z-10 text-center">
          <motion.div initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.5, ease: E_OUT }}>
            <Eyebrow>Plans &amp; Pricing</Eyebrow>
          </motion.div>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.65, delay: 0.1, ease: E_OUT }}
            className="mx-auto mt-5 max-w-[820px] font-bold leading-[1.1] tracking-[-0.03em]"
            style={{ fontSize: "clamp(34px,5.5vw,60px)", fontFamily: "'Space Grotesk', sans-serif" }}>
            Pricing built for the{" "}
            <span className="flow-text">new advertising era</span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.55, delay: 0.22, ease: E_OUT }}
            className="mx-auto mt-5 max-w-[640px] text-lg leading-relaxed" style={{ color: "#9097b2" }}>
            Every plan tracks clicks, impressions, and conversions in real time.
            The higher you go, the more Afilize runs itself — AI, automation, and invoicing included.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 0.33, ease: E_OUT }}
            className="mt-8 flex flex-wrap justify-center gap-4">
            {[
              { label: "14-day free trial",      color: "#3ddc91", bg: "rgba(61,220,145,0.1)",   border: "rgba(61,220,145,0.25)"   },
              { label: "No credit card required", color: "#7c82ff", bg: "rgba(124,130,255,0.1)", border: "rgba(124,130,255,0.22)"  },
              { label: "Cancel anytime",          color: "#27d3ee", bg: "rgba(39,211,238,0.1)",  border: "rgba(39,211,238,0.22)"   },
            ].map((b) => (
              <span key={b.label} className="rounded-full px-4 py-2 font-mono text-xs font-semibold"
                style={{ background: b.bg, color: b.color, border: `1px solid ${b.border}`, backdropFilter: "blur(10px)" }}>
                {b.label}
              </span>
            ))}
          </motion.div>
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
          style={{ background: "linear-gradient(to bottom, transparent, #080b16)" }} />
      </section>

      {/* ── Toggle + cards ── */}
      <section className="wrap pb-20 pt-2">
        <BillingToggle mode={mode} onChange={setMode} reduced={reduced} />
        <div className="mt-10">
          <div className="grid gap-4 min-[561px]:grid-cols-2 min-[1025px]:grid-cols-4">
            {PLANS.map((plan, i) => (
              <PlanCard key={plan.name} plan={plan} planIdx={i} mode={mode} reduced={reduced} isMobile={isMobile} />
            ))}
          </div>
          <p className="mt-6 text-center font-mono text-[12.5px]" style={{ color: "#646c8a" }}>
            Overage billed per 1,000 extra conversions — Launch $9 · Growth $7 · Scale $5. Tracking never stops.
          </p>
        </div>
      </section>

      {/* ── Comparison table ── */}
      <ComparisonTable reduced={reduced} />

      {/* ── FAQ ── */}
      <section className="wrap pb-20">
        <SectionHead
          label="FAQ"
          title={<>Common <span className="flow-text">questions</span></>}
          sub="Everything you need to know before picking a plan."
        />
        <div className="mt-10 grid gap-4 min-[641px]:grid-cols-2 min-[881px]:grid-cols-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div key={item.q}
              className="faq-card relative overflow-hidden rounded-[18px] p-6"
              style={{ border: "1px solid #27314c", background: "linear-gradient(145deg, #141d32, #0f1628)" }}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={reduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.45, delay: i * 0.06, ease: E_OUT }}>
              {/* Icon box */}
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: "rgba(124,130,255,0.12)", color: "#7c82ff", border: "1px solid rgba(124,130,255,0.2)" }}>
                {item.icon}
              </div>
              <h3 className="text-[15.5px] font-semibold leading-snug"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#eaeef8" }}>{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "#9097b2" }}>{item.a}</p>
              <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(124,130,255,0.35), transparent)" }} />
            </motion.div>
          ))}
        </div>
      </section>

      <FinalCta
        title="See it running on your own traffic"
        line="Spin up a workspace, point a test offer at it, and watch the rules and AI work in real time."
        primary={{ to: "/request-demo", label: "Start 14-day trial" }}
        secondary={{ to: "/solutions", label: "What you will achieve" }}
      />
    </>
  );
}
