"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  E_OUT, usePRM,
  CheckRow, Eyebrow, SectionHead, FlowStrip, FinalCta, CrossIcon, CheckIcon,
} from "@/components/shared";

// ─── Page-level CSS ───────────────────────────────────────────────────────────
const PAGE_CSS = `
  @media (prefers-reduced-motion: no-preference) {
    @keyframes sol-orb-a {
      0%,100% { transform: translate(0,0) scale(1); }
      40%      { transform: translate(-45px,30px) scale(1.1); }
      70%      { transform: translate(30px,-20px) scale(0.94); }
    }
    @keyframes sol-orb-b {
      0%,100% { transform: translate(0,0) scale(1); }
      33%      { transform: translate(35px,-40px) scale(1.07); }
      66%      { transform: translate(-25px,25px) scale(0.96); }
    }
    @keyframes sol-orb-c {
      0%,100% { transform: translate(0,0) scale(1); }
      50%      { transform: translate(-20px,-30px) scale(1.05); }
    }
    @keyframes sol-scan-h {
      0%   { transform: translateX(-100%); opacity: 0; }
      8%   { opacity: 1; }
      92%  { opacity: 1; }
      100% { transform: translateX(100%); opacity: 0; }
    }
    @keyframes sol-scan-v {
      0%   { transform: translateY(-100%); opacity: 0; }
      8%   { opacity: 1; }
      92%  { opacity: 1; }
      100% { transform: translateY(100%); opacity: 0; }
    }
    @keyframes sol-ring {
      0%   { transform: scale(0.5); opacity: 0.6; }
      100% { transform: scale(2.6); opacity: 0; }
    }
    .sol-orb-a { animation: sol-orb-a 20s ease-in-out infinite; }
    .sol-orb-b { animation: sol-orb-b 16s ease-in-out infinite; }
    .sol-orb-c { animation: sol-orb-c 24s ease-in-out infinite; }
    .sol-scan-h { animation: sol-scan-h 7s linear infinite; }
    .sol-scan-v { animation: sol-scan-v 9s linear 2s infinite; }
    .sol-ring-1 { animation: sol-ring 3.6s ease-out infinite; }
    .sol-ring-2 { animation: sol-ring 3.6s ease-out 1.2s infinite; }
    .sol-ring-3 { animation: sol-ring 3.6s ease-out 2.4s infinite; }
  }

  .sol-stat-card {
    transition: transform 0.28s cubic-bezier(0.16,1,0.3,1),
                border-color 0.28s ease,
                box-shadow 0.28s ease;
  }
  .sol-stat-card:hover {
    transform: translateY(-5px);
  }

  .sol-audience-card {
    transition: transform 0.28s cubic-bezier(0.16,1,0.3,1),
                border-color 0.28s ease,
                box-shadow 0.28s ease;
  }
  .sol-audience-card:hover {
    transform: translateY(-6px) scale(1.012);
  }
  .sol-audience-card .aud-icon {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .sol-audience-card:hover .aud-icon {
    transform: scale(1.1);
  }
`;

// ─── Audience config ──────────────────────────────────────────────────────────
const AUD_META = [
  {
    color: "#7c82ff", bg: "rgba(124,130,255,0.13)", border: "rgba(124,130,255,0.25)",
    glow: "rgba(124,130,255,0.15)",
    icon: (
      <svg viewBox="0 0 22 22" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17c0-3 2-5 5-5h6c3 0 5 2 5 5"/>
        <circle cx="11" cy="7" r="3.5"/>
      </svg>
    ),
  },
  {
    color: "#27d3ee", bg: "rgba(39,211,238,0.13)", border: "rgba(39,211,238,0.25)",
    glow: "rgba(39,211,238,0.12)",
    icon: (
      <svg viewBox="0 0 22 22" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h6v6H4zM12 4h6v6h-6zM4 12h6v6H4zM12 12h6v6h-6z"/>
      </svg>
    ),
  },
  {
    color: "#3ddc91", bg: "rgba(61,220,145,0.13)", border: "rgba(61,220,145,0.25)",
    glow: "rgba(61,220,145,0.12)",
    icon: (
      <svg viewBox="0 0 22 22" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5"/>
        <rect x="12" y="3" width="7" height="7" rx="1.5"/>
        <rect x="3" y="12" width="7" height="7" rx="1.5"/>
        <path d="M15.5 12v7M12 15.5h7"/>
      </svg>
    ),
  },
  {
    color: "#f0a93b", bg: "rgba(240,169,59,0.13)", border: "rgba(240,169,59,0.25)",
    glow: "rgba(240,169,59,0.12)",
    icon: (
      <svg viewBox="0 0 22 22" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11h16M3 11l5-5M3 11l5 5M19 11l-5-5M19 11l-5 5"/>
      </svg>
    ),
  },
];

const STAT_META = [
  { color: "#7c82ff", bg: "rgba(124,130,255,0.1)", border: "rgba(124,130,255,0.22)" },
  { color: "#27d3ee", bg: "rgba(39,211,238,0.1)",  border: "rgba(39,211,238,0.22)"  },
  { color: "#3ddc91", bg: "rgba(61,220,145,0.1)",  border: "rgba(61,220,145,0.22)"  },
  { color: "#f0a93b", bg: "rgba(240,169,59,0.1)",  border: "rgba(240,169,59,0.22)"  },
];

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "-20%", label: "Average CAC reduction",  sub: "Cutting wasted spend on low-quality traffic" },
  { value: "+10h", label: "Saved per week",          sub: "Automation rules replacing manual checks" },
  { value: "100%", label: "Fraud validation",        sub: "Before any payout leaves your account" },
  { value: "+ROI", label: "Measurable return",       sub: "Tracked to every partner, offer, and channel" },
];

const AUDIENCES = [
  {
    tag: "Advertisers",
    title: "Run programmes that pay for results",
    sub: "Set your terms, automate payouts, and see exactly which partners drive revenue — not just traffic.",
    points: [
      "Pay per verified sale, lead, or install — not per click",
      "Automated fraud hold before any commission is released",
      "Real-time ROAS by partner, geo, device, and offer",
      "White-label portal your affiliates log into directly",
    ],
  },
  {
    tag: "Publishers",
    title: "Maximise what every link earns",
    sub: "Get paid accurately, on time, and with full transparency into every conversion attributed to you.",
    points: [
      "Live reporting — no delayed dashboards",
      "Multi-offer rotation to your highest-converting campaigns",
      "Automated payout on your preferred schedule",
      "Deep-link builder with UTM and sub-ID pass-through",
    ],
  },
  {
    tag: "Agencies",
    title: "Manage every client from one seat",
    sub: "Multi-account workspace with role-based access — onboard new clients in minutes, not weeks.",
    points: [
      "Isolated client accounts under one agency login",
      "Branded client reports with your logo",
      "Bulk rule management across all accounts",
      "API access to pipe data into your own dashboards",
    ],
  },
  {
    tag: "Networks",
    title: "Scale without scaling your ops team",
    sub: "Thousands of advertisers and publishers, one platform that handles reconciliation automatically.",
    points: [
      "Unlimited partner seats with tiered commissions",
      "Automated contract, cap, and payout management",
      "Cross-advertiser deduplication engine",
      "99.99% uptime SLA with dedicated infrastructure",
    ],
  },
];

const BEFORE = [
  "Spreadsheets for partner tracking",
  "Manual fraud review before every payout",
  "Separate tools for reporting and attribution",
  "Delayed data — yesterday's numbers only",
  "Hours of ops work per week",
];

const AFTER = [
  "Unified dashboard — one source of truth",
  "Automated FraudShield holds bad traffic instantly",
  "Attribution, reporting, and payouts in one platform",
  "Real-time data — decisions made now, not tomorrow",
  "Automation rules run 24/7 without your team",
];

// ─── Canvas background ────────────────────────────────────────────────────────
function HeroBackground({ reduced }: { reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;
    const resize = () => { W = canvas.offsetWidth; H = canvas.offsetHeight; canvas.width = W; canvas.height = H; };
    window.addEventListener("resize", resize, { passive: true });

    // Grid of dots
    const cols = Math.ceil(W / 60) + 1;
    const rows = Math.ceil(H / 60) + 1;
    const dots = Array.from({ length: cols * rows }, (_, k) => ({
      x: (k % cols) * 60,
      y: Math.floor(k / cols) * 60,
      phase: Math.random() * Math.PI * 2,
    }));

    // Moving particles
    const particles = Array.from({ length: 18 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.5 + 0.5,
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    function frame() {
      ctx!.clearRect(0, 0, W, H);
      t += 0.006;

      // Grid dots
      for (const d of dots) {
        d.phase += 0.012;
        const pulse = (Math.sin(d.phase) + 1) / 2;
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, 1 + pulse * 1, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(39,211,238,${0.08 + pulse * 0.12})`;
        ctx!.fill();
      }

      // Flowing connection lines between nearby particles
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.phase += 0.018;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particles[i].x;
          const dy = particles[j].y - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const a = (1 - dist / 160) * 0.14;
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(124,130,255,${a})`;
            ctx!.lineWidth = 1;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
            // packet
            const ph = ((t * 0.8 + i * 0.4) % 1);
            if (dist < 110 && ph < 0.55) {
              ctx!.beginPath();
              ctx!.arc(particles[i].x + dx * ph, particles[i].y + dy * ph, 1.8, 0, Math.PI * 2);
              ctx!.fillStyle = `rgba(124,130,255,${0.8 * (1 - dist / 110)})`;
              ctx!.fill();
            }
          }
        }
      }
      // Particle nodes
      for (const p of particles) {
        const pulse = (Math.sin(p.phase) + 1) / 2;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r + pulse, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(39,211,238,${0.25 + pulse * 0.35})`;
        ctx!.fill();
      }

      animRef.current = requestAnimationFrame(frame);
    }
    frame();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, [reduced]);

  if (reduced) return null;
  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" style={{ opacity: 0.45 }} />;
}

function HeroOrbs({ reduced }: { reduced: boolean }) {
  if (reduced) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="sol-orb-a absolute rounded-full" style={{ width: 500, height: 500, top: "-120px", right: "5%", background: "radial-gradient(circle, rgba(39,211,238,0.22) 0%, transparent 70%)", filter: "blur(44px)" }} />
      <div className="sol-orb-b absolute rounded-full" style={{ width: 420, height: 420, top: "10%", left: "-60px", background: "radial-gradient(circle, rgba(124,130,255,0.26) 0%, transparent 70%)", filter: "blur(48px)" }} />
      <div className="sol-orb-c absolute rounded-full" style={{ width: 300, height: 300, bottom: "-40px", right: "30%", background: "radial-gradient(circle, rgba(61,220,145,0.14) 0%, transparent 70%)", filter: "blur(40px)" }} />
      {/* Radar rings */}
      <div className="absolute" style={{ width: 380, height: 380, top: "45%", left: "60%", transform: "translate(-50%,-50%)" }}>
        {["sol-ring-1","sol-ring-2","sol-ring-3"].map((cls) => (
          <div key={cls} className={`${cls} absolute inset-0 rounded-full`} style={{ border: "1px solid rgba(39,211,238,0.25)" }} />
        ))}
      </div>
      {/* Scan lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="sol-scan-h absolute h-px w-full" style={{ top: "42%", background: "linear-gradient(90deg, transparent 0%, rgba(124,130,255,0.45) 50%, transparent 100%)" }} />
        <div className="sol-scan-v absolute h-full w-px" style={{ left: "35%", background: "linear-gradient(180deg, transparent 0%, rgba(39,211,238,0.4) 50%, transparent 100%)" }} />
      </div>
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ stat, meta, index, reduced }: { stat: typeof STATS[0]; meta: typeof STAT_META[0]; index: number; reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24, scale: 0.95 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.5, delay: index * 0.09, ease: E_OUT }}
      className="sol-stat-card relative overflow-hidden rounded-[20px] p-7 text-center"
      style={{ background: "linear-gradient(145deg, #141d32, #0f1628)", border: "1px solid #27314c" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = meta.border;
        e.currentTarget.style.boxShadow = `0 0 0 1px ${meta.border}, 0 20px 50px ${meta.bg}, 0 4px 16px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#27314c";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top glow */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-8 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full" style={{ background: meta.bg, filter: "blur(28px)" }} />
      <div className="relative">
        <p className="font-bold tracking-[-0.03em]" style={{ fontSize: "clamp(38px,5vw,54px)", fontFamily: "'Space Grotesk', sans-serif", color: meta.color }}>
          {stat.value}
        </p>
        <p className="mt-2 font-semibold" style={{ color: "#eaeef8" }}>{stat.label}</p>
        <p className="mt-1 text-sm leading-relaxed" style={{ color: "#646c8a" }}>{stat.sub}</p>
      </div>
      {/* Bottom accent */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${meta.color}55, transparent)` }} />
    </motion.div>
  );
}

// ─── Audience card ────────────────────────────────────────────────────────────
function AudienceCard({ a, meta, index, reduced }: { a: typeof AUDIENCES[0]; meta: typeof AUD_META[0]; index: number; reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 28, scale: 0.96 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.54, delay: index * 0.1, ease: E_OUT }}
      className="sol-audience-card relative flex flex-col gap-6 overflow-hidden rounded-[20px] p-7"
      style={{ background: "linear-gradient(145deg, #141d32, #0f1628)", border: "1px solid #27314c" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = meta.border;
        e.currentTarget.style.boxShadow = `0 0 0 1px ${meta.border}, 0 24px 60px ${meta.glow}, 0 4px 20px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#27314c";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Corner glow */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-6 -top-6 h-28 w-28 rounded-full" style={{ background: meta.bg, filter: "blur(24px)", opacity: 0.7 }} />

      {/* Icon + tag */}
      <div className="relative flex items-center gap-3">
        <div
          className="aud-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
          style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}
        >
          {meta.icon}
        </div>
        <span
          className="rounded-full px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider"
          style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}
        >
          {a.tag}
        </span>
      </div>

      {/* Title + sub */}
      <div>
        <h3 className="text-[19px] font-bold tracking-[-0.02em] leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#eaeef8" }}>
          {a.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "#8a91ab" }}>{a.sub}</p>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: `linear-gradient(90deg, ${meta.color}33, transparent)` }} />

      {/* Feature list */}
      <ul className="flex flex-col gap-3">
        {a.points.map((pt) => <CheckRow key={pt}>{pt}</CheckRow>)}
      </ul>

      {/* Bottom accent */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${meta.color}55, transparent)` }} />
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SolutionsPage() {
  const reduced = usePRM();
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
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.5, ease: E_OUT }}
          >
            <Eyebrow>What you achieve</Eyebrow>
          </motion.div>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.65, delay: 0.1, ease: E_OUT }}
            className="mx-auto mt-5 max-w-[760px] font-bold leading-[1.12] tracking-[-0.03em]"
            style={{ fontSize: "clamp(34px,5.5vw,62px)", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Real outcomes for every{" "}
            <span className="flow-text">affiliate role</span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.55, delay: 0.22, ease: E_OUT }}
            className="mx-auto mt-5 max-w-[580px] text-lg leading-relaxed"
            style={{ color: "#9097b2" }}
          >
            Whether you run a network, manage a programme, represent publishers, or lead an agency —
            Afilize is built for the results your role is measured on.
          </motion.p>

          {/* Role pills */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 0.32, ease: E_OUT }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {AUDIENCES.map((a, i) => (
              <span
                key={a.tag}
                className="rounded-full px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider"
                style={{
                  background: AUD_META[i].bg,
                  color: AUD_META[i].color,
                  border: `1px solid ${AUD_META[i].border}`,
                  backdropFilter: "blur(10px)",
                }}
              >
                {a.tag}
              </span>
            ))}
          </motion.div>
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-24" style={{ background: "linear-gradient(to bottom, transparent, #080b16)" }} />
      </section>

      {/* ── Stats band ── */}
      <section className="wrap pb-24 pt-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} meta={STAT_META[i]} index={i} reduced={reduced} />
          ))}
        </div>
      </section>

      {/* ── Audience cards ── */}
      <section className="wrap pb-24">
        <SectionHead
          label="Built for your role"
          title={<>Solutions for <span className="flow-text">every stakeholder</span></>}
          sub="One platform, purpose-built workflows for advertisers, publishers, agencies, and networks."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {AUDIENCES.map((a, i) => (
            <AudienceCard key={a.tag} a={a} meta={AUD_META[i]} index={i} reduced={reduced} />
          ))}
        </div>
      </section>

      {/* ── Before / After ── */}
      <section className="wrap pb-24">
        <SectionHead
          label="The shift"
          title={<>From reactive to <span className="flow-text">proactive</span></>}
          sub="Teams that switch to Afilize stop firefighting and start optimising."
        />
        <div
          className="relative mt-10 grid overflow-hidden rounded-[22px] sm:grid-cols-2"
          style={{ border: "1px solid #27314c" }}
        >
          {/* Before */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -20 }}
            whileInView={reduced ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.5, ease: E_OUT }}
            className="relative overflow-hidden p-8"
            style={{ background: "#0b1020" }}
          >
            {/* Subtle red tint overlay */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 10% 10%, rgba(240,100,59,0.06) 0%, transparent 100%)" }} />
            <p className="mb-6 font-semibold uppercase tracking-widest" style={{ fontSize: "11px", color: "#646c8a", fontFamily: "'JetBrains Mono', monospace" }}>
              Before Afilize
            </p>
            <ul className="flex flex-col gap-4">
              {BEFORE.map((b, i) => (
                <motion.li
                  key={b}
                  initial={reduced ? false : { opacity: 0, x: -14 }}
                  whileInView={reduced ? {} : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={reduced ? { duration: 0 } : { duration: 0.38, delay: i * 0.07, ease: E_OUT }}
                  className="flex items-start gap-3 text-sm"
                  style={{ color: "#8a91ab" }}
                >
                  <CrossIcon className="mt-[3px] h-4 w-4 shrink-0" style={{ color: "#f0a93b" }} />
                  {b}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Arrow badge */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 z-10 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:flex"
            style={{ background: "#080b16", border: "1px solid #27314c", boxShadow: "0 0 24px rgba(124,130,255,0.2)" }}
          >
            <span className="flow-text text-xl font-bold">→</span>
          </div>

          {/* After */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 20 }}
            whileInView={reduced ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 0.1, ease: E_OUT }}
            className="relative overflow-hidden border-t p-8 sm:border-l sm:border-t-0"
            style={{ borderColor: "#27314c", background: "#0f1628" }}
          >
            {/* Subtle green tint overlay */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 90% 10%, rgba(39,211,238,0.07) 0%, transparent 100%)" }} />
            <p className="mb-6 font-semibold uppercase tracking-widest" style={{ fontSize: "11px", color: "#27d3ee", fontFamily: "'JetBrains Mono', monospace" }}>
              With Afilize
            </p>
            <ul className="flex flex-col gap-4">
              {AFTER.map((a, i) => (
                <motion.li
                  key={a}
                  initial={reduced ? false : { opacity: 0, x: 14 }}
                  whileInView={reduced ? {} : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={reduced ? { duration: 0 } : { duration: 0.38, delay: i * 0.07 + 0.14, ease: E_OUT }}
                  className="flex items-start gap-3 text-sm"
                  style={{ color: "#eaeef8" }}
                >
                  <CheckIcon className="mt-[3px] h-4 w-4 shrink-0" style={{ color: "#3ddc91" }} />
                  {a}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── Flow strip ── */}
      <section className="wrap pb-24">
        <SectionHead
          label="The platform loop"
          title={<>Track, optimize, <span className="flow-text">repeat</span></>}
          sub="Five integrated stages that compound your results over time."
        />
        <div className="mt-10">
          <FlowStrip />
        </div>
      </section>

      <FinalCta
        title="Ready to see the difference?"
        line="Book a 30-minute demo tailored to your role — advertiser, publisher, agency, or network."
        primary={{ to: "/request-demo", label: "Request a demo" }}
        secondary={{ to: "/pricing", label: "See pricing" }}
      />
    </>
  );
}
