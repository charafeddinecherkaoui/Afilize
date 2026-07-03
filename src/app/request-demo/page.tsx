import type { Metadata } from "next";
import { Eyebrow } from "@/components/blocks";
import DemoForm from "@/components/DemoForm";

export const metadata: Metadata = {
  title: "Request a Demo — Afilize",
  description:
    "Tell us what you're trying to grow. We'll map Afilize to your traffic and show you the tracking, rules, and AI working on your own offers.",
};

const contacts = [
  {
    label: "Email",
    value: "support@afilize.ai",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5">
        <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
        <path d="M3 6l7 5 7-5" />
      </svg>
    ),
  },
  {
    label: "Live chat",
    value: "Available 9AM–6PM GMT",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 10a7 7 0 1 1-3.2-5.9L17 3l-.6 3.4A6.9 6.9 0 0 1 17 10z" />
      </svg>
    ),
  },
  {
    label: "HQ",
    value: "London, United Kingdom",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 17.5s5.5-4.6 5.5-9a5.5 5.5 0 1 0-11 0c0 4.4 5.5 9 5.5 9z" />
        <circle cx="10" cy="8.5" r="2" />
      </svg>
    ),
  },
];

export default function RequestDemoPage() {
  return (
    <main className="flex-1">
      <section className="wrap pb-16 pt-16">
        <div className="grid items-start gap-10 min-[881px]:grid-cols-[1fr_1.1fr]">
          {/* Left — intro + contact details */}
          <div>
            <Eyebrow>Request a Demo</Eyebrow>
            <h1 className="mt-6 text-[clamp(34px,6vw,58px)] font-bold leading-[1.03] tracking-[-0.03em]">
              Let&apos;s <span className="flow-text">connect</span>
            </h1>
            <p className="mt-5 max-w-[480px] text-lg text-text-muted">
              Whether you&apos;re an agency, advertiser, publisher, or network
              — we&apos;ll map Afilize to your traffic and show you the
              tracking, rules, and AI working end to end.
            </p>

            <ul className="mt-10 space-y-6">
              {contacts.map((contact) => (
                <li key={contact.label} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-ink-2 text-accent-2">
                    {contact.icon}
                  </span>
                  <span>
                    <span className="block text-sm text-text-dim">
                      {contact.label}
                    </span>
                    <span className="block font-medium text-text">
                      {contact.value}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div>
            <div className="mb-6">
              <h2 className="font-display text-[22px] font-semibold tracking-[-0.01em]">
                Send us a message
              </h2>
              <p className="mt-1.5 text-text-muted">
                Choose the reason for contact so we can connect you to the
                right expert.
              </p>
            </div>
            <DemoForm />
          </div>
        </div>
      </section>
    </main>
  );
}
