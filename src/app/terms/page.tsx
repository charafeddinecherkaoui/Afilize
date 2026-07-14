import type { Metadata } from "next";
import {
  LegalList,
  LegalPageLayout,
  LegalSection,
  LegalSubheading,
} from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Use — Afilize",
  description:
    "Terms governing your access to and use of the Afilize platform and website, operated by Optivads Limited.",
};

const toc = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "services", label: "2. Our Services" },
  { id: "eligibility", label: "3. Eligibility" },
  { id: "responsibilities", label: "4. User Responsibilities" },
  { id: "ip", label: "5. Intellectual Property" },
  { id: "privacy", label: "6. Privacy and Data Protection" },
  { id: "disclaimers", label: "7. Disclaimers" },
  { id: "liability", label: "8. Limitation of Liability" },
  { id: "termination", label: "9. Termination" },
  { id: "law", label: "10. Governing Law & Dispute Resolution" },
  { id: "changes", label: "11. Changes to Terms" },
  { id: "contact", label: "12. Contact" },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Use of Afilize"
      lastUpdated="September 21, 2025"
      relatedHref="/privacy"
      relatedLabel="Privacy Policy"
      intro={
        <>
          <p>
            These Terms of Use (&quot;Terms&quot;) govern your access to and use of
            the Afilize website, platform, and related services provided by{" "}
            <strong className="text-text">Optivads Limited</strong> (&quot;Optivads&quot;,
            &quot;Afilize&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;).
          </p>
          <p>
            Afilize is a product of Optivads. By using our website or services, you
            agree to these Terms. If you do not agree, you must not use our services.
          </p>
        </>
      }
      toc={toc}
    >
      <LegalSection id="acceptance" title="1. Acceptance of Terms">
        <p>
          By accessing or using the Afilize website and platform, you accept these
          Terms in full. These Terms apply to all visitors, users, clients, partners,
          and others who access or use our services.
        </p>
      </LegalSection>

      <LegalSection id="services" title="2. Our Services">
        <p>
          Afilize provides an affiliate marketing and performance tracking platform,
          including:
        </p>
        <LegalList
          items={[
            "Server-to-server (S2S) tracking and attribution",
            "Real-time analytics, reporting, and dashboards",
            "Automation rules and workflow engines",
            "AI-assisted optimization and performance insights",
            "Anti-fraud validation and traffic protection",
            "Invoicing, finance workflows, and partner management",
            "Integrations, postbacks, webhooks, and in-house API access",
          ]}
        />
        <p>
          We may modify, suspend, or discontinue any service at our discretion and
          without prior notice.
        </p>
      </LegalSection>

      <LegalSection id="eligibility" title="3. Eligibility">
        <p>To use our services, you must:</p>
        <LegalList
          items={[
            "Be at least 18 years of age;",
            "Have legal authority to enter into binding agreements;",
            "Use the services in compliance with applicable laws;",
            "Provide accurate and truthful information.",
          ]}
        />
        <p>
          If you create an account, you are responsible for maintaining the
          confidentiality of your login details and any activity under your account.
        </p>
      </LegalSection>

      <LegalSection id="responsibilities" title="4. User Responsibilities">
        <p>You agree to use our services only for lawful purposes. You must not:</p>
        <LegalList
          items={[
            "Use services for fraudulent, unlawful, or harmful purposes;",
            "Upload or transmit malicious code, bots, or viruses;",
            "Attempt to gain unauthorized access to our systems;",
            "Misuse tracking links, pixels, postbacks, or reporting tools;",
            "Engage in traffic manipulation, fraudulent conversions, or any prohibited advertising activity;",
            "Infringe intellectual property or data protection rights.",
          ]}
        />
        <p>
          Violation of these rules may result in suspension or termination of your
          access.
        </p>
      </LegalSection>

      <LegalSection id="ip" title="5. Intellectual Property">
        <LegalSubheading>Our Rights</LegalSubheading>
        <p>
          All content, technology, and trademarks on the Afilize site and platform
          are the property of Optivads or its licensors.
        </p>
        <LegalSubheading>Your Rights</LegalSubheading>
        <p>
          You retain ownership of any content you submit but grant Optivads a
          worldwide, non-exclusive, royalty-free license to use it for providing
          services.
        </p>
        <LegalSubheading>Trademarks</LegalSubheading>
        <p>
          &quot;Optivads&quot; and &quot;Afilize&quot; are protected trademarks. You may not use
          them without our written consent.
        </p>
      </LegalSection>

      <LegalSection id="privacy" title="6. Privacy and Data Protection">
        <p>
          Your privacy is governed by our{" "}
          <a href="/privacy" className="text-text transition-colors hover:text-accent-2">
            Privacy Policy
          </a>
          , which forms part of these Terms.
        </p>
        <LegalList
          items={[
            "We process your personal data in compliance with the UK GDPR and EU GDPR.",
            "By using our services, you acknowledge that you have read and understood our privacy documents.",
            "If you provide data on behalf of third parties (e.g., users, publishers, advertisers), you represent that you have a lawful basis (e.g., consent) and will comply with applicable laws.",
          ]}
        />
      </LegalSection>

      <LegalSection id="disclaimers" title="7. Disclaimers">
        <LegalSubheading>Availability</LegalSubheading>
        <p>
          We strive to ensure uninterrupted services but do not guarantee that the
          site or platform will always be available.
        </p>
        <LegalSubheading>Third-Party Services</LegalSubheading>
        <p>
          Our services may rely on third-party platforms, integrations, and
          infrastructure providers. We are not liable for their availability or
          compliance.
        </p>
        <LegalSubheading>No Warranty</LegalSubheading>
        <p>The services are provided &quot;AS IS&quot; without warranties of any kind.</p>
      </LegalSection>

      <LegalSection id="liability" title="8. Limitation of Liability">
        <p>To the maximum extent permitted by law:</p>
        <LegalList
          items={[
            "Optivads is not liable for indirect, incidental, special, or consequential damages, including loss of profit, data, or goodwill.",
            "Our total liability to you in any case is limited to the fees you paid to us in the 3 months prior to the claim.",
            "Nothing excludes liability for fraud, willful misconduct, or mandatory legal obligations.",
          ]}
        />
      </LegalSection>

      <LegalSection id="termination" title="9. Termination">
        <p>
          We may suspend or terminate your access without prior notice if you breach
          these Terms or applicable laws.
        </p>
        <p>
          Upon termination, your right to use the services ceases immediately.
          Provisions on confidentiality, intellectual property, disclaimers,
          limitations, and dispute resolution will survive termination.
        </p>
      </LegalSection>

      <LegalSection id="law" title="10. Governing Law & Dispute Resolution">
        <LegalSubheading>Governing Law</LegalSubheading>
        <p>These Terms are governed by the laws of England and Wales.</p>
        <LegalSubheading>Dispute Resolution</LegalSubheading>
        <p>
          Disputes will first be referred to good-faith negotiation or mediation.
          If unresolved, they will be finally settled by arbitration under the London
          Court of International Arbitration (LCIA) Rules.
        </p>
        <LegalSubheading>Jurisdiction</LegalSubheading>
        <p>
          Courts of England and Wales have exclusive jurisdiction for any permitted
          litigation.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="11. Changes to Terms">
        <p>
          We may update these Terms from time to time. If changes are material, we
          will provide notice (via website or email, if applicable). Your continued
          use of our services after changes take effect means you accept the new
          Terms.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="12. Contact">
        <p>
          <strong className="text-text">Optivads Limited</strong>
          <br />
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
      </LegalSection>
    </LegalPageLayout>
  );
}
