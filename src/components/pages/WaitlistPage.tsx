"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { E_OUT, usePRM, Eyebrow, CheckIcon } from "@/components/shared";

// ─── Contact details ──────────────────────────────────────────────────────────
const CONTACTS = [
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 6.5l7.5 5 7.5-5" /><rect x="2.5" y="4" width="15" height="12" rx="2" />
      </svg>
    ),
    label: "Email us",
    value: "hello@afilize.io",
    href: "mailto:hello@afilize.io",
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" /><circle cx="10" cy="8" r="2" />
      </svg>
    ),
    label: "Headquarters",
    value: "Optivads — Paris, France",
    href: undefined,
  },
  {
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 12.5a1.5 1.5 0 01-1.5 1.5h-10A1.5 1.5 0 014 12.5v-7A1.5 1.5 0 015.5 4h10A1.5 1.5 0 0117 5.5v7z" />
        <path d="M4 7h12M8 4v3M12 4v3" />
      </svg>
    ),
    label: "Live chat",
    value: "Available Mon–Fri, 9 am–6 pm CET",
    href: undefined,
  },
];

const WHAT_HAPPENS = [
  "We review your details within one business day",
  "You're added to our priority early-access list",
  "We email you as soon as onboarding opens",
  "Founding members get priority support and launch pricing",
];

// ─── Form ─────────────────────────────────────────────────────────────────────
type FormState = {
  name: string;
  email: string;
  company: string;
  role: string;
  size: string;
  message: string;
};

const ROLES = ["Advertiser", "Publisher", "Agency", "Network", "Other"];
const SIZES = ["1–10", "11–50", "51–200", "201–1 000", "1 000+"];

function Input({
  label, id, type = "text", value, onChange, required, placeholder,
}: {
  label: string; id: string; type?: string;
  value: string; onChange: (v: string) => void;
  required?: boolean; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium" style={{ color: "#eaeef8" }}>
        {label}{required && <span className="ml-0.5" style={{ color: "#7c82ff" }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl px-4 py-3 text-sm transition-colors"
        style={{
          background: "#0b1020",
          border: "1px solid #27314c",
          color: "#eaeef8",
          outline: "none",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "#7c82ff"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "#27314c"; }}
      />
    </div>
  );
}

function Select({
  label, id, value, onChange, options, required,
}: {
  label: string; id: string; value: string;
  onChange: (v: string) => void; options: string[]; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium" style={{ color: "#eaeef8" }}>
        {label}{required && <span className="ml-0.5" style={{ color: "#7c82ff" }}>*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl px-4 py-3 text-sm transition-colors appearance-none"
        style={{
          background: "#0b1020",
          border: "1px solid #27314c",
          color: value ? "#eaeef8" : "#646c8a",
          outline: "none",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "#7c82ff"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "#27314c"; }}
      >
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function WaitlistForm() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", company: "", role: "", size: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reduced = usePRM();

  function set(field: keyof FormState) {
    return (v: string) => setForm((f) => ({ ...f, [field]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="rounded-[20px] p-8"
      style={{ background: "#121a2e", border: "1px solid #27314c" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <motion.div
            key="success"
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduced ? { duration: 0 } : { duration: 0.4, ease: E_OUT }}
            className="flex flex-col items-center gap-5 py-12 text-center"
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: "rgba(61,220,145,0.15)" }}
            >
              <CheckIcon className="h-8 w-8" style={{ color: "#3ddc91" }} />
            </div>
            <h3
              className="text-2xl font-bold tracking-[-0.02em]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#eaeef8" }}
            >
              You&apos;re on the list!
            </h3>
            <p className="max-w-[360px] text-sm" style={{ color: "#9097b2" }}>
              We&apos;ll reach out within one business day with your place in line and what early access looks like.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setError(null);
                setForm({ name: "", email: "", company: "", role: "", size: "", message: "" });
              }}
              className="mt-2 text-sm transition-colors"
              style={{ color: "#646c8a" }}
              onMouseOver={(e) => { e.currentTarget.style.color = "#9097b2"; }}
              onMouseOut={(e) => { e.currentTarget.style.color = "#646c8a"; }}
            >
              Submit another signup
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={false}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <h3
              className="text-xl font-bold tracking-[-0.01em]"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#eaeef8" }}
            >
              Join the waitlist
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Full name" id="name" value={form.name} onChange={set("name")} required placeholder="Jane Smith" />
              <Input label="Work email" id="email" type="email" value={form.email} onChange={set("email")} required placeholder="jane@company.com" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Company" id="company" value={form.company} onChange={set("company")} required placeholder="Acme Corp" />
              <Select label="Your role" id="role" value={form.role} onChange={set("role")} options={ROLES} required />
            </div>

            <Select label="Team size" id="size" value={form.size} onChange={set("size")} options={SIZES} />

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-medium" style={{ color: "#eaeef8" }}>
                What are you looking to solve? <span style={{ color: "#646c8a" }}>(optional)</span>
              </label>
              <textarea
                id="message"
                value={form.message}
                onChange={(e) => set("message")(e.target.value)}
                rows={4}
                placeholder="Tell us about your current setup, team size, key challenges…"
                className="w-full resize-none rounded-xl px-4 py-3 text-sm transition-colors"
                style={{ background: "#0b1020", border: "1px solid #27314c", color: "#eaeef8", outline: "none" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#7c82ff"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "#27314c"; }}
              />
            </div>

            {error && (
              <p className="rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(212,24,61,0.12)", color: "#f87171", border: "1px solid rgba(212,24,61,0.25)" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="cta-primary mt-1 flex items-center justify-center gap-2 rounded-xl py-3 text-base"
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" strokeLinecap="round" />
                  </svg>
                  Sending…
                </>
              ) : (
                "Join the waitlist →"
              )}
            </button>

            <p className="text-center text-xs" style={{ color: "#646c8a" }}>
              No spam. We only email when access opens or your spot moves up.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WaitlistPage() {
  const reduced = usePRM();

  return (
    <>
      <section className="wrap py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_480px] lg:gap-16 xl:gap-24">
          {/* Left — copy */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.55, ease: E_OUT }}
          >
            <Eyebrow>Early access</Eyebrow>

            <h1
              className="mt-5 font-bold leading-tight tracking-[-0.03em]"
              style={{ fontSize: "clamp(28px,4vw,48px)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Join the Afilize{" "}
              <span className="flow-text">waitlist</span>
            </h1>

            <p className="mt-4 text-lg" style={{ color: "#9097b2" }}>
              Afilize isn&apos;t live yet — get on the list now for early access,
              founding pricing, and priority onboarding when we launch.
            </p>

            {/* What happens */}
            <div className="mt-10">
              <p className="mb-5 text-sm font-semibold uppercase tracking-widest" style={{ color: "#646c8a", fontFamily: "'JetBrains Mono', monospace" }}>
                What happens next
              </p>
              <ul className="flex flex-col gap-4">
                {WHAT_HAPPENS.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={reduced ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={reduced ? { duration: 0 } : { duration: 0.4, delay: 0.3 + i * 0.09, ease: E_OUT }}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: "#9097b2" }}
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold"
                      style={{ background: "rgba(124,130,255,0.15)", color: "#7c82ff" }}
                    >
                      {i + 1}
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Contact details */}
            <div
              className="mt-10 rounded-2xl p-6"
              style={{ background: "#0b1020", border: "1px solid #1b2338" }}
            >
              <p className="mb-5 text-sm font-semibold" style={{ color: "#eaeef8" }}>
                Prefer to reach out directly?
              </p>
              <div className="flex flex-col gap-4">
                {CONTACTS.map((c) => (
                  <div key={c.label} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0" style={{ color: "#7c82ff" }}>{c.icon}</span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "#646c8a" }}>
                        {c.label}
                      </p>
                      {c.href ? (
                        <a
                          href={c.href}
                          className="mt-0.5 text-sm transition-colors"
                          style={{ color: "#eaeef8" }}
                          onMouseOver={(e) => { e.currentTarget.style.color = "#7c82ff"; }}
                          onMouseOut={(e) => { e.currentTarget.style.color = "#eaeef8"; }}
                        >
                          {c.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm" style={{ color: "#eaeef8" }}>{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.6, delay: 0.12, ease: E_OUT }}
          >
            <WaitlistForm />
          </motion.div>
        </div>
      </section>
    </>
  );
}
