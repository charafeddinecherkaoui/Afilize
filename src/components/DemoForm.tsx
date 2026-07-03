"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/blocks";

const inputCls =
  "w-full rounded-xl border border-line bg-ink-2 px-4 py-3 text-[15px] text-text placeholder:text-text-dim focus:border-accent focus:outline-none";

const labelCls = "mb-1.5 block text-sm font-semibold text-text";

export default function DemoForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-[18px] border border-line bg-surface p-[30px] text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-good/40 bg-good/10">
          <CheckIcon className="h-5 w-5 text-good" />
        </span>
        <h3 className="mt-5 font-display text-[22px] font-semibold">
          Message sent
        </h3>
        <p className="mt-2 max-w-[380px] text-text-muted">
          Thanks for reaching out — our team will get back to you within 24
          hours.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 rounded-xl border border-line px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-accent"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="rounded-[18px] border border-line bg-surface p-[30px]"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-5 min-[561px]:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelCls}>
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            placeholder="Your full name"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="company" className={labelCls}>
            Company name
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            placeholder="Agency, advertiser, or network name"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Business email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="We'll reach you here"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="role" className={labelCls}>
            Role
          </label>
          <select id="role" name="role" required defaultValue="" className={inputCls}>
            <option value="" disabled>
              Select your role
            </option>
            <option>Advertiser</option>
            <option>Publisher</option>
            <option>Agency</option>
            <option>Network</option>
            <option>Other</option>
          </select>
        </div>
        <div className="min-[561px]:col-span-2">
          <label htmlFor="subject" className={labelCls}>
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            required
            defaultValue=""
            className={inputCls}
          >
            <option value="" disabled>
              What can we help you with?
            </option>
            <option>Request a demo</option>
            <option>Pricing question</option>
            <option>Partnership</option>
            <option>Support</option>
            <option>Other</option>
          </select>
        </div>
        <div className="min-[561px]:col-span-2">
          <label htmlFor="message" className={labelCls}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us a bit about what you're looking for"
            className={inputCls}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-xl flow-bg py-3.5 text-sm font-semibold text-ink transition-shadow hover:shadow-[0_0_28px_rgba(124,130,255,0.45)]"
      >
        Send message
      </button>
      <p className="mt-3 text-center text-xs text-text-dim">
        Our team will get back to you within 24 hours.
      </p>
    </form>
  );
}
