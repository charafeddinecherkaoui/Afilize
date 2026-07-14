"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  E_OUT, usePRM,
  CheckRow, Eyebrow, SectionHead, FlowStrip, FinalCta, AiStarIcon,
} from "@/components/shared";

// ─── Page-level CSS ───────────────────────────────────────────────────────────
const PAGE_CSS = `
  @media (prefers-reduced-motion: no-preference) {
    @keyframes orb-drift-a {
      0%,100% { transform: translate(0,0) scale(1); }
      33%      { transform: translate(40px,-30px) scale(1.08); }
      66%      { transform: translate(-20px,20px) scale(0.95); }
    }
    @keyframes orb-drift-b {
      0%,100% { transform: translate(0,0) scale(1); }
      40%      { transform: translate(-50px,30px) scale(1.1); }
      70%      { transform: translate(30px,-40px) scale(0.92); }
    }
    @keyframes orb-drift-c {
      0%,100% { transform: translate(0,0) scale(1); }
      50%      { transform: translate(25px,35px) scale(1.06); }
    }
    @keyframes ring-expand {
      0%   { transform: scale(0.6); opacity: 0.7; }
      100% { transform: scale(2.4); opacity: 0; }
    }
    @keyframes particle-float {
      0%   { transform: translateY(0) translateX(0); opacity: 0; }
      15%  { opacity: 1; }
      85%  { opacity: 0.6; }
      100% { transform: translateY(-120px) translateX(var(--px-drift,0px)); opacity: 0; }
    }
    @keyframes scan-h {
      0%   { transform: translateX(-100%); opacity: 0; }
      5%   { opacity: 1; }
      95%  { opacity: 1; }
      100% { transform: translateX(100%); opacity: 0; }
    }
    @keyframes scan-v {
      0%   { transform: translateY(-100%); opacity: 0; }
      5%   { opacity: 1; }
      95%  { opacity: 1; }
      100% { transform: translateY(100%); opacity: 0; }
    }
    @keyframes node-pulse {
      0%,100% { transform: scale(1); opacity: 0.5; }
      50%     { transform: scale(1.8); opacity: 1; }
    }
    @keyframes data-flow {
      0%   { stroke-dashoffset: 400; opacity: 0; }
      10%  { opacity: 1; }
      90%  { opacity: 0.5; }
      100% { stroke-dashoffset: 0; opacity: 0; }
    }
    @keyframes card-shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    .feat-orb-a { animation: orb-drift-a 18s ease-in-out infinite; }
    .feat-orb-b { animation: orb-drift-b 22s ease-in-out infinite; }
    .feat-orb-c { animation: orb-drift-c 14s ease-in-out infinite; }
    .ring-pulse  { animation: ring-expand 3.2s ease-out infinite; }
    .ring-pulse-2{ animation: ring-expand 3.2s ease-out 1.06s infinite; }
    .ring-pulse-3{ animation: ring-expand 3.2s ease-out 2.13s infinite; }
    .scan-h      { animation: scan-h 6s linear infinite; }
    .scan-v      { animation: scan-v 8s linear infinite; }
    .data-flow-1 { animation: data-flow 4s ease-in-out 0s infinite; }
    .data-flow-2 { animation: data-flow 4s ease-in-out 1.4s infinite; }
    .data-flow-3 { animation: data-flow 4s ease-in-out 2.8s infinite; }
  }

  .pillar-card {
    transition: transform 0.28s cubic-bezier(0.16,1,0.3,1),
                box-shadow 0.28s cubic-bezier(0.16,1,0.3,1),
                border-color 0.28s ease;
  }
  .pillar-card:hover {
    transform: translateY(-6px) scale(1.015);
    border-color: rgba(124,130,255,0.5) !important;
    box-shadow: 0 0 0 1px rgba(124,130,255,0.18),
                0 20px 60px rgba(124,130,255,0.15),
                0 4px 20px rgba(0,0,0,0.4);
  }
  .pillar-card.ai-card:hover {
    border-color: rgba(39,211,238,0.5) !important;
    box-shadow: 0 0 0 1px rgba(39,211,238,0.18),
                0 20px 60px rgba(39,211,238,0.12),
                0 4px 20px rgba(0,0,0,0.4);
  }
  .card-icon-ring {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .pillar-card:hover .card-icon-ring {
    transform: scale(1.12);
    box-shadow: 0 0 28px rgba(124,130,255,0.5);
  }
  .pillar-card.ai-card:hover .card-icon-ring {
    box-shadow: 0 0 28px rgba(39,211,238,0.5);
  }

  .diff-card {
    transition: transform 0.24s cubic-bezier(0.16,1,0.3,1), border-color 0.24s ease, box-shadow 0.24s ease;
  }
  .diff-card:hover {
    transform: translateY(-4px);
    border-color: rgba(124,130,255,0.4) !important;
    box-shadow: 0 8px 32px rgba(124,130,255,0.12);
  }
`;

// ─── Pillar icons (SVG per pillar) ────────────────────────────────────────────
const ICONS = [
  // 01 Tracking
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>
  </svg>,
  // 02 AI
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"/>
  </svg>,
  // 03 Fraud
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l8 4v5c0 4.4-3.4 8.5-8 9.5C7.4 20.5 4 16.4 4 12V7l8-4z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>,
  // 04 Reporting
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M8 17V13M12 17V9M16 17V11"/>
  </svg>,
  // 05 Partner
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="3"/><circle cx="16" cy="16" r="3"/>
    <path d="M10.5 10.5l3 3M8 11v4a1 1 0 001 1h4"/>
  </svg>,
  // 06 Automation
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>,
  // 07 API
  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 9l-4 4 4 4M16 9l4 4-4 4M14 5l-4 14"/>
  </svg>,
];

const ICON_COLORS = [
  { bg: "rgba(124,130,255,0.14)", color: "#7c82ff" },  // 01 purple
  { bg: "rgba(39,211,238,0.14)",  color: "#27d3ee" },   // 02 cyan
  { bg: "rgba(240,169,59,0.14)",  color: "#f0a93b" },   // 03 amber
  { bg: "rgba(61,220,145,0.14)",  color: "#3ddc91" },   // 04 green
  { bg: "rgba(124,130,255,0.14)", color: "#7c82ff" },   // 05 purple
  { bg: "rgba(39,211,238,0.14)",  color: "#27d3ee" },   // 06 cyan
  { bg: "rgba(61,220,145,0.14)",  color: "#3ddc91" },   // 07 green
];

// ─── Data ─────────────────────────────────────────────────────────────────────
const PILLARS = [
  {
    num: "01", title: "Real-time tracking",
    sub: "Every click, conversion, and revenue event captured — no sampling, no gaps.",
    ai: false, chip: "Tracking SDK",
    rows: [
      "Sub-second event ingestion with global edge nodes",
      "Multi-touch attribution across 12+ models",
      "Cross-device and cross-channel stitching",
      "First-party pixel + server-side fallback",
    ],
  },
  {
    num: "02", title: "AI-powered optimisation",
    sub: "The platform moves budgets, bids, and traffic so your team can move strategy.",
    ai: true, chip: "AI Core",
    rows: [
      "Predictive revenue scoring on every partner",
      "Auto-traffic routing to top-performing offers",
      "Dynamic bid adjustment by time, geo, and device",
      "Anomaly alerts before they cost you money",
    ],
  },
  {
    num: "03", title: "Fraud protection",
    sub: "Suspicious traffic is flagged before a payout ever leaves your account.",
    ai: true, chip: "FraudShield",
    rows: [
      "Click-flood and bot fingerprinting",
      "IP reputation and data-centre detection",
      "Post-back replay & duplicate suppression",
      "Compliance hold before payout processing",
    ],
  },
  {
    num: "04", title: "Smart reporting",
    sub: "Every dimension, every metric — built for the questions you haven't asked yet.",
    ai: false, chip: "Analytics",
    rows: [
      "Live dashboards with 100+ pre-built reports",
      "Drag-and-drop custom report builder",
      "Scheduled exports to email, S3, or BigQuery",
      "Role-based data visibility per team member",
    ],
  },
  {
    num: "05", title: "Partner management",
    sub: "One portal for every advertiser, publisher, agency, and network you work with.",
    ai: false, chip: "Partner Hub",
    rows: [
      "Self-serve partner onboarding in minutes",
      "Customisable commission structures and tiers",
      "White-label portal with your domain and brand",
      "Automated contract and cap enforcement",
    ],
  },
  {
    num: "06", title: "Automation rules",
    sub: "Write the rule once. Afilize enforces it 24/7 without human intervention.",
    ai: true, chip: "AutoRules",
    rows: [
      "Visual rule builder — no code required",
      "200+ trigger events and condition combinations",
      "Pause, boost, or reallocate on any metric",
      "Full audit trail for every automated action",
    ],
  },
  {
    num: "07", title: "Integrations & API",
    sub: "Plug into your existing stack without rebuilding anything.",
    ai: false, chip: "Open API",
    rows: [
      "REST + GraphQL API with full documentation",
      "Native connectors: Shopify, Stripe, GA4, HubSpot",
      "Webhook delivery with retry and signature auth",
      "MMP integrations: AppsFlyer, Adjust, Branch",
    ],
  },
];

const DIFFS = [
  {
    label: "Real-time AI decisions", sub: "not overnight batches",
    color: "#7c82ff", bg: "rgba(124,130,255,0.12)", border: "rgba(124,130,255,0.22)",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2l1.8 5.5H18l-4.9 3.6 1.8 5.5L10 13l-4.9 3.6 1.8-5.5L2 7.5h6.2L10 2z"/>
      </svg>
    ),
  },
  {
    label: "Built-in fraud protection", sub: "not an expensive add-on",
    color: "#f0a93b", bg: "rgba(240,169,59,0.12)", border: "rgba(240,169,59,0.22)",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2l7 3.5v4C17 13.5 14 17 10 18 6 17 3 13.5 3 9.5v-4L10 2z"/>
        <path d="M7.5 10l2 2 3.5-3.5"/>
      </svg>
    ),
  },
  {
    label: "Partner + advertiser in one tool", sub: "not two disconnected platforms",
    color: "#27d3ee", bg: "rgba(39,211,238,0.12)", border: "rgba(39,211,238,0.22)",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6.5" cy="7" r="2.5"/>
        <circle cx="13.5" cy="13" r="2.5"/>
        <path d="M8.8 8.8l2.4 2.4"/>
      </svg>
    ),
  },
  {
    label: "Open API from day one", sub: "not locked to our workflows",
    color: "#3ddc91", bg: "rgba(61,220,145,0.12)", border: "rgba(61,220,145,0.22)",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 7l-4 4 4 4M13 7l4 4-4 4M12 4l-4 12"/>
      </svg>
    ),
  },
];

// ─── Animated hero background ─────────────────────────────────────────────────
function HeroBackground({ reduced }: { reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener("resize", resize, { passive: true });

    // Nodes
    const nodes = Array.from({ length: 28 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    function frame() {
      ctx!.clearRect(0, 0, W, H);
      t += 0.008;

      // Update nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.025;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.18;
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(124,130,255,${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();

            // Data packet flowing along the line
            const phase = ((t * 0.7 + i * 0.3) % 1);
            if (dist < 100 && phase < 0.6) {
              const px = nodes[i].x + dx * phase;
              const py = nodes[i].y + dy * phase;
              ctx!.beginPath();
              ctx!.arc(px, py, 2, 0, Math.PI * 2);
              ctx!.fillStyle = `rgba(39,211,238,${0.7 * (1 - dist / 100)})`;
              ctx!.fill();
            }
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const pulse = (Math.sin(n.pulse) + 1) / 2;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r + pulse * 1.5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(124,130,255,${0.3 + pulse * 0.4})`;
        ctx!.fill();
      }

      animRef.current = requestAnimationFrame(frame);
    }
    frame();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity: 0.55 }}
    />
  );
}

// ─── Floating orbs ────────────────────────────────────────────────────────────
function HeroOrbs({ reduced }: { reduced: boolean }) {
  if (reduced) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large purple orb */}
      <div
        className="feat-orb-a absolute rounded-full"
        style={{
          width: 520, height: 520,
          top: "-160px", left: "10%",
          background: "radial-gradient(circle, rgba(124,130,255,0.28) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Cyan orb right */}
      <div
        className="feat-orb-b absolute rounded-full"
        style={{
          width: 440, height: 440,
          top: "5%", right: "-80px",
          background: "radial-gradient(circle, rgba(39,211,238,0.22) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />
      {/* Small warm orb bottom */}
      <div
        className="feat-orb-c absolute rounded-full"
        style={{
          width: 280, height: 280,
          bottom: "0px", left: "40%",
          background: "radial-gradient(circle, rgba(240,169,59,0.14) 0%, transparent 70%)",
          filter: "blur(36px)",
        }}
      />
      {/* Radar rings */}
      <div
        className="absolute"
        style={{ width: 400, height: 400, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={i === 0 ? "ring-pulse" : i === 1 ? "ring-pulse-2" : "ring-pulse-3"}
            style={{
              position: "absolute", inset: 0,
              border: "1px solid rgba(124,130,255,0.3)",
              borderRadius: "50%",
            }}
          />
        ))}
      </div>
      {/* Scan lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="scan-h absolute h-px w-full"
          style={{ top: "38%", background: "linear-gradient(90deg, transparent 0%, rgba(39,211,238,0.4) 40%, rgba(124,130,255,0.6) 60%, transparent 100%)" }}
        />
        <div
          className="scan-v absolute h-full w-px"
          style={{ left: "55%", background: "linear-gradient(180deg, transparent 0%, rgba(124,130,255,0.4) 40%, rgba(39,211,238,0.6) 60%, transparent 100%)" }}
        />
      </div>
    </div>
  );
}

// ─── Pillar card ──────────────────────────────────────────────────────────────
function PillarCard({
  pillar, index, reduced,
}: {
  pillar: typeof PILLARS[0];
  index: number;
  reduced: boolean;
}) {
  const ic = ICON_COLORS[index];
  const staggerDelay = [0, 0.07, 0.14, 0.05, 0.12, 0.19][index] ?? (index * 0.07);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 32, scale: 0.95 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.55, delay: staggerDelay, ease: E_OUT }}
      className={`pillar-card${pillar.ai ? " ai-card" : ""} relative flex flex-col gap-6 overflow-hidden rounded-[20px] p-7`}
      style={{
        background: "linear-gradient(145deg, #141d32 0%, #0f1628 100%)",
        border: "1px solid #27314c",
      }}
    >
      {/* Top row: icon + chip */}
      <div className="flex items-center justify-between gap-3">
        <div
          className="card-icon-ring flex h-11 w-11 items-center justify-center rounded-2xl shrink-0"
          style={{ background: ic.bg, color: ic.color, border: `1px solid ${ic.color}33` }}
        >
          {ICONS[index]}
        </div>

        <span
          className="rounded-full px-3 py-1 font-mono text-[11.5px] font-semibold uppercase tracking-wider"
          style={{
            background: pillar.ai ? "rgba(39,211,238,0.1)" : "rgba(124,130,255,0.1)",
            color: pillar.ai ? "#27d3ee" : "#7c82ff",
            border: `1px solid ${pillar.ai ? "rgba(39,211,238,0.2)" : "rgba(124,130,255,0.2)"}`,
          }}
        >
          {pillar.chip}
        </span>
      </div>

      {/* Title + sub */}
      <div>
        <h3
          className="text-[19px] font-bold tracking-[-0.02em] leading-snug"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#eaeef8" }}
        >
          {pillar.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "#8a91ab" }}>{pillar.sub}</p>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, #27314c 0%, transparent 100%)" }} />

      {/* Feature rows */}
      <ul className="flex flex-col gap-3">
        {pillar.rows.map((r) => (
          <CheckRow key={r} ai={pillar.ai}>{r}</CheckRow>
        ))}
      </ul>

      {/* AI badge */}
      {pillar.ai && (
        <div className="mt-auto pt-1">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold"
            style={{ background: "rgba(39,211,238,0.1)", color: "#27d3ee", border: "1px solid rgba(39,211,238,0.2)" }}
          >
            <AiStarIcon className="h-3 w-3" />
            AI-powered
          </span>
        </div>
      )}

      {/* Bottom accent line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${ic.color}55, transparent)` }}
      />
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FeaturesPage() {
  const reduced = usePRM();
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setHeroLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pb-16 pt-20">
        {/* Background layers */}
        <HeroOrbs reduced={reduced} />
        {heroLoaded && <HeroBackground reduced={reduced} />}

        {/* Content */}
        <div className="wrap relative z-10 text-center">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.5, ease: E_OUT }}
          >
            <Eyebrow>Platform features</Eyebrow>
          </motion.div>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.65, delay: 0.1, ease: E_OUT }}
            className="mx-auto mt-5 max-w-[760px] font-bold leading-[1.12] tracking-[-0.03em]"
            style={{ fontSize: "clamp(34px,5.5vw,62px)", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Every tool your affiliate{" "}
            <span className="flow-text">programme needs</span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.55, delay: 0.22, ease: E_OUT }}
            className="mx-auto mt-5 max-w-[580px] text-lg leading-relaxed"
            style={{ color: "#9097b2" }}
          >
            Seven deeply integrated pillars — tracking, AI, fraud, reporting, partners,
            automation, and API — built to work together from day one.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 0.35, ease: E_OUT }}
            className="mx-auto mt-10 flex flex-wrap justify-center gap-6"
          >
            {[
              { val: "7", label: "Core pillars" },
              { val: "200+", label: "Automation triggers" },
              { val: "99.99%", label: "Uptime SLA" },
              { val: "<1s", label: "Event ingestion" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1 rounded-2xl px-6 py-4"
                style={{
                  background: "rgba(18,26,46,0.8)",
                  border: "1px solid #27314c",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span
                  className="font-bold tracking-[-0.02em]"
                  style={{ fontSize: "22px", fontFamily: "'Space Grotesk', sans-serif", color: "#eaeef8" }}
                >
                  <span className="flow-text">{s.val}</span>
                </span>
                <span className="text-xs" style={{ color: "#646c8a" }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
          style={{ background: "linear-gradient(to bottom, transparent, #080b16)" }}
        />
      </section>

      {/* ── Pillars grid ── */}
      <section className="wrap pb-24 pt-4">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.slice(0, 6).map((p, i) => (
            <PillarCard key={p.num} pillar={p} index={i} reduced={reduced} />
          ))}
        </div>

      </section>

      {/* ── Why Afilize ── */}
      <section className="wrap pb-24">
        <div
          className="relative overflow-hidden rounded-[24px] p-10"
          style={{ background: "linear-gradient(145deg, #121a2e 0%, #0e1627 100%)", border: "1px solid #27314c" }}
        >
          {/* Glow blobs */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 right-10 h-64 w-64 rounded-full"
            style={{ background: "rgba(124,130,255,0.2)", filter: "blur(80px)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 left-16 h-48 w-48 rounded-full"
            style={{ background: "rgba(39,211,238,0.12)", filter: "blur(60px)" }}
          />
          <div className="relative">
            <SectionHead
              label="Why Afilize"
              title={<>What makes us <span className="flow-text">different</span></>}
              sub="We didn't bolt features together. We built the whole stack for affiliate, from scratch."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DIFFS.map((d, i) => (
                <motion.div
                  key={d.label}
                  initial={reduced ? false : { opacity: 0, y: 20, scale: 0.96 }}
                  whileInView={reduced ? {} : { opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={reduced ? { duration: 0 } : { duration: 0.45, delay: i * 0.08, ease: E_OUT }}
                  className="diff-card group relative overflow-hidden rounded-2xl p-5"
                  style={{ background: "#0b1020", border: `1px solid #1d2740` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = d.border;
                    e.currentTarget.style.boxShadow = `0 0 0 1px ${d.border}, 0 16px 48px ${d.bg}, 0 4px 16px rgba(0,0,0,0.4)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#1d2740";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Icon box */}
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: d.bg, color: d.color, border: `1px solid ${d.border}` }}
                  >
                    {d.icon}
                  </div>
                  <p className="font-semibold leading-snug" style={{ color: "#eaeef8" }}>{d.label}</p>
                  <p className="mt-1.5 text-sm" style={{ color: "#646c8a" }}>{d.sub}</p>
                  {/* accent bottom line in card's own color */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${d.color}55, transparent)` }}
                  />
                  {/* Top-left corner glow on hover */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-4 -top-4 h-20 w-20 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: d.bg, filter: "blur(20px)" }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Flow strip ── */}
      <section className="wrap pb-24">
        <SectionHead
          label="How it works"
          title={<>Five steps from click to <span className="flow-text">payout</span></>}
          sub="Afilize sits in the middle of your affiliate stack and handles every stage automatically."
        />
        <div className="mt-10">
          <FlowStrip />
        </div>
      </section>

      <FinalCta
        title="See every feature in a live account"
        line="Book a 30-minute demo and we'll walk through the exact pillars that matter most to your business."
        primary={{ to: "/request-demo", label: "Request a demo" }}
        secondary={{ to: "/pricing", label: "View pricing" }}
      />
    </>
  );
}
