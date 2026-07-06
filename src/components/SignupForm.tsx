"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/blocks";

const inputCls =
  "w-full rounded-xl border border-line bg-ink-2 px-4 py-3 text-[15px] text-text placeholder:text-text-dim focus:border-accent focus:outline-none";

const labelCls = "mb-1.5 block text-sm font-semibold text-text";

export default function SignupForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="signup-form-success-message flex min-h-[380px] flex-col items-center justify-center rounded-[18px] border border-line bg-surface p-[30px] text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-good/40 bg-good/10">
          <CheckIcon className="h-5 w-5 text-good" />
        </span>
        <h3 className="mt-5 font-display text-[22px] font-semibold">
          You&apos;re in
        </h3>
        <p className="mt-2 max-w-[380px] text-text-muted">
          We&apos;re setting up your workspace — check your inbox for the
          activation link to start your 14-day trial.
        </p>
      </div>
    );
  }

  return (
    <form
      className="signup-form-container rounded-[18px] border border-line bg-surface p-[30px]"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="form-fields-grid grid gap-5">
        <div className="form-field">
          <label htmlFor="signupName" className={labelCls}>
            Full name
          </label>
          <input
            id="signupName"
            name="fullName"
            type="text"
            required
            placeholder="Your full name"
            className={`form-input-fullname ${inputCls}`}
          />
        </div>
        <div className="form-field">
          <label htmlFor="signupEmail" className={labelCls}>
            Work email
          </label>
          <input
            id="signupEmail"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className={`form-input-email ${inputCls}`}
          />
        </div>
        <div className="form-field">
          <label htmlFor="signupCompany" className={labelCls}>
            Company name
          </label>
          <input
            id="signupCompany"
            name="company"
            type="text"
            required
            placeholder="Agency, advertiser, or network name"
            className={`form-input-company ${inputCls}`}
          />
        </div>
        <div className="form-field">
          <label htmlFor="signupPlan" className={labelCls}>
            Plan
          </label>
          <select
            id="signupPlan"
            name="plan"
            required
            defaultValue=""
            className={`form-input-plan ${inputCls}`}
          >
            <option value="" disabled>
              Choose your plan
            </option>
            <option>Launch — $299/mo</option>
            <option>Growth — $699/mo</option>
            <option>Scale — $1,499/mo</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="form-submit-button mt-6 w-full rounded-xl flow-bg py-3.5 text-sm font-semibold text-ink transition-shadow hover:shadow-[0_0_28px_rgba(124,130,255,0.45)]"
      >
        Start 14-day trial
      </button>
      <p className="mt-3 text-center text-xs text-text-dim">
        14 days free on Launch, Growth, and Scale. No card required.
      </p>
    </form>
  );
}
