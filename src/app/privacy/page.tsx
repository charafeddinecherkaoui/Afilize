import type { Metadata } from "next";
import {
  LegalList,
  LegalPageLayout,
  LegalSection,
  LegalSubheading,
} from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Afilize",
  description:
    "How Optivads Limited collects, uses, and protects personal data through the Afilize platform and website.",
};

const toc = [
  { id: "controller", label: "1) Who we are (Controller)" },
  { id: "collect", label: "2) What data we collect" },
  { id: "sources", label: "3) Sources" },
  { id: "legal-bases", label: "4) Why we use your data & our legal bases" },
  { id: "sharing", label: "5) Who we share data with (recipients)" },
  { id: "transfers", label: "6) International transfers" },
  { id: "retention", label: "7) How long we keep your data (retention)" },
  { id: "cookies", label: "8) Cookies & consent" },
  { id: "security", label: "9) Security" },
  { id: "rights", label: "10) Your rights" },
  { id: "children", label: "11) Children" },
  { id: "complaints", label: "12) Complaints" },
  { id: "changes", label: "13) Changes to this policy" },
  { id: "contact", label: "14) Contact" },
];

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy of Afilize"
      lastUpdated="September 21, 2025"
      relatedHref="/terms"
      relatedLabel="Terms of Use"
      intro={
        <>
          <p>
            Welcome to the privacy policy of{" "}
            <strong className="text-text">Optivads Limited</strong> (&quot;Optivads&quot;,
            &quot;we&quot;, &quot;us&quot;) for the Afilize platform and website. This policy
            explains what data we collect, why we collect it, how we use/share it,
            how long we keep it, and your rights.
          </p>
          <p>Afilize is a product of Optivads.</p>
        </>
      }
      toc={toc}
    >
      <LegalSection id="controller" title="1) Who we are (Controller)">
        <LegalSubheading>Optivads Limited</LegalSubheading>
        <p>
          71–75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom
          <br />
          Email:{" "}
          <a
            href="mailto:hello@afilize.io"
            className="text-text transition-colors hover:text-accent-2"
          >
            hello@afilize.io
          </a>
          <br />
          Phone: +44 204 542 7701
        </p>
        <p>
          We are the data controller for personal data collected via the Afilize
          website, waitlist and contact forms, emails, analytics and marketing
          tools, and CRM. Where we process end-user data for clients&apos; campaigns
          through the Afilize platform, we typically act as processor to the
          advertiser; publishers may act as sub-processors (see our DPA, available
          on request).
        </p>
      </LegalSection>

      <LegalSection id="collect" title="2) What data we collect">
        <LegalSubheading>a) Data you provide</LegalSubheading>
        <p>
          <strong className="text-text">Identity &amp; contact:</strong> first/last
          name, company, job title, work email, phone, message content.
        </p>
        <p>
          <strong className="text-text">Commercial:</strong> project details,
          budgets, contracts, billing data (if you become a client/partner).
        </p>
        <LegalSubheading>b) Data collected automatically (when you visit our site)</LegalSubheading>
        <p>
          <strong className="text-text">Usage data:</strong> pages viewed, clicks,
          session duration, referring URLs.
        </p>
        <p>
          <strong className="text-text">Device &amp; network:</strong> IP address,
          user agent, device type, OS, browser.
        </p>
        <p>
          <strong className="text-text">Cookies/Trackers:</strong> identifiers set
          by our consent tool and analytics/marketing tools.
        </p>
        <p>We do not intentionally collect special category data through the website.</p>
      </LegalSection>

      <LegalSection id="sources" title="3) Sources">
        <LegalList
          items={[
            "Directly from you (forms, email, phone).",
            "Automatically from your device/browser (if you consent to non-essential cookies).",
            "From service providers we use (analytics, hosting, email, CRM).",
          ]}
        />
      </LegalSection>

      <LegalSection id="legal-bases" title="4) Why we use your data & our legal bases">
        <div className="overflow-x-auto rounded-[18px] border border-line">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-surface text-text">
              <tr>
                <th className="px-4 py-3 font-semibold">Purpose</th>
                <th className="px-4 py-3 font-semibold">Examples</th>
                <th className="px-4 py-3 font-semibold">Legal basis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {[
                [
                  "Provide & operate our website",
                  "load pages, security, availability",
                  "Legitimate interests (run a secure, functional site); Strictly necessary cookies",
                ],
                [
                  "Handle enquiries & waitlist",
                  "reply to contact requests; manage early access",
                  "Legitimate interests (respond to B2B requests) or pre-contract",
                ],
                [
                  "Client onboarding & delivery",
                  "proposals, SOWs, contracts, billing, support",
                  "Contract; Legal obligation (tax, accounting)",
                ],
                [
                  "Analytics & improvement",
                  "traffic stats, funnel analysis",
                  "Consent (for analytics cookies in the EEA/UK)",
                ],
                [
                  "Marketing communications",
                  "newsletters/updates to subscribers",
                  "Consent (opt-in; you can withdraw anytime)",
                ],
                [
                  "Security & fraud prevention",
                  "detect abuse, debug",
                  "Legitimate interests; may process basic logs without consent",
                ],
                [
                  "Legal & compliance",
                  "record-keeping, dispute handling",
                  "Legal obligation; Legitimate interests",
                ],
              ].map(([purpose, examples, basis]) => (
                <tr key={purpose}>
                  <td className="px-4 py-3 align-top text-text">{purpose}</td>
                  <td className="px-4 py-3 align-top">{examples}</td>
                  <td className="px-4 py-3 align-top">{basis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          We only set non-essential cookies/trackers (e.g., analytics or marketing
          tools) after you opt in via our cookie banner, where applicable.
        </p>
      </LegalSection>

      <LegalSection id="sharing" title="5) Who we share data with (recipients)">
        <p>We share only what&apos;s necessary with trusted providers under data processing agreements:</p>
        <LegalList
          items={[
            "Hosting & infrastructure: cloud hosting and CDN providers.",
            "Analytics/ads: Google Analytics, Meta Platforms, Inc., LinkedIn Corporation (only if you consent).",
            "Productivity & CRM: Google Workspace (email/docs), Monday.com (CRM and waitlist management).",
            "Payments & accounting (if you become a client): payment and accounting providers.",
            "Professional advisors: legal, tax, auditors (when needed).",
          ]}
        />
        <p>We do not sell your personal data.</p>
      </LegalSection>

      <LegalSection id="transfers" title="6) International transfers">
        <p>Some providers are outside the UK/EEA (e.g., US). When we transfer data internationally, we use approved safeguards:</p>
        <LegalList
          items={[
            "EU Standard Contractual Clauses (SCCs) and/or UK IDTA, plus risk assessments and supplementary measures; or",
            "An adequacy decision where applicable.",
          ]}
        />
        <p>
          You can request copies of the relevant safeguards at{" "}
          <a
            href="mailto:hello@afilize.io"
            className="text-text transition-colors hover:text-accent-2"
          >
            hello@afilize.io
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="retention" title="7) How long we keep your data (retention)">
        <p>We keep data only as long as needed for the stated purposes or as required by law:</p>
        <div className="overflow-x-auto rounded-[18px] border border-line">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-surface text-text">
              <tr>
                <th className="px-4 py-3 font-semibold">Data category</th>
                <th className="px-4 py-3 font-semibold">Typical retention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {[
                ["Contact/enquiry records (non-clients)", "24 months from last interaction"],
                ["Waitlist registrations", "24 months from last interaction or until onboarding"],
                ["Marketing subscriptions", "Until you unsubscribe or 24 months inactivity"],
                ["Website analytics (event logs)", "12 months"],
                ["Contracts, invoices, tax records (clients)", "6–7 years (legal obligation)"],
                ["Security logs", "90–180 days (site protection)"],
              ].map(([category, retention]) => (
                <tr key={category}>
                  <td className="px-4 py-3 align-top text-text">{category}</td>
                  <td className="px-4 py-3 align-top">{retention}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          When a retention period ends, we delete or anonymize data per our Retention
          &amp; Erasure Policy.
        </p>
      </LegalSection>

      <LegalSection id="cookies" title="8) Cookies & consent">
        <p>We use a Consent Management Platform (CMP) to collect and record your choices, where applicable.</p>
        <LegalList
          items={[
            "Essential cookies run to make the site work (security, load balancing).",
            "Analytics/marketing cookies run only if you opt in.",
            "You can change your choices any time via the cookie banner link, where available.",
          ]}
        />
      </LegalSection>

      <LegalSection id="security" title="9) Security">
        <p>
          We apply appropriate technical and organizational measures, including
          encryption in transit, access controls, least-privilege, MFA, vendor due
          diligence, and incident response aligned to our Data Security and Data
          Breach policies.
        </p>
        <p>
          If a breach risks your rights and freedoms, we will notify you and the
          relevant authority as required.
        </p>
      </LegalSection>

      <LegalSection id="rights" title="10) Your rights">
        <p>Where GDPR/UK-GDPR applies, you have the right to:</p>
        <LegalList
          items={[
            "Access your data and get a copy.",
            "Rectify inaccurate or incomplete data.",
            "Erase your data (in certain cases).",
            "Restrict or object to processing (in certain cases).",
            "Portability of data you provided to us.",
            "Withdraw consent at any time (doesn't affect past lawful processing).",
          ]}
        />
        <LegalSubheading>How to exercise your rights</LegalSubheading>
        <p>
          Email{" "}
          <a
            href="mailto:hello@afilize.io"
            className="text-text transition-colors hover:text-accent-2"
          >
            hello@afilize.io
          </a>{" "}
          with your request.
        </p>
        <p>
          We reply within 1 month (extendable by 2 months for complex requests). We
          may ask for ID verification. Requests are free unless excessive or
          unfounded.
        </p>
        <LegalSubheading>You can also:</LegalSubheading>
        <LegalList
          items={[
            "Unsubscribe from emails using the unsubscribe link in our messages.",
            "Change cookie choices via the cookie banner, where available.",
          ]}
        />
      </LegalSection>

      <LegalSection id="children" title="11) Children">
        <p>
          Our site and services are for business users. We do not knowingly collect
          data from children under 16. If you believe a child has provided data,
          contact{" "}
          <a
            href="mailto:hello@afilize.io"
            className="text-text transition-colors hover:text-accent-2"
          >
            hello@afilize.io
          </a>{" "}
          and we will delete it.
        </p>
      </LegalSection>

      <LegalSection id="complaints" title="12) Complaints">
        <p>
          If you&apos;re unhappy with how we handle your data, please contact us first at{" "}
          <a
            href="mailto:hello@afilize.io"
            className="text-text transition-colors hover:text-accent-2"
          >
            hello@afilize.io
          </a>
          . You also have the right to complain to your local authority. In the UK:
        </p>
        <LegalSubheading>Information Commissioner&apos;s Office (ICO)</LegalSubheading>
        <p>
          Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF, UK
          <br />
          ico.org.uk | +44 303 123 1113
        </p>
        <p>
          If you are in the EEA, you can complain to your local Data Protection
          Authority.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="13) Changes to this policy">
        <p>
          We may update this policy from time to time. We&apos;ll change the &quot;Last
          updated&quot; date and, if changes are material, we&apos;ll notify you via the
          website and/or email where appropriate.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="14) Contact">
        <p>
          <strong className="text-text">Controller/DPO: Optivads Limited</strong>
          <br />
          Email:{" "}
          <a
            href="mailto:hello@afilize.io"
            className="text-text transition-colors hover:text-accent-2"
          >
            hello@afilize.io
          </a>
          <br />
          Address: 71–75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom
          <br />
          Phone: +44 204 542 7701
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
