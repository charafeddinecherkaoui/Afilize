import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Afilize",
};

export default function PrivacyPage() {
  return (
    <main className="wrap flex-1 py-16">
      <div className="mx-auto max-w-[720px]">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-2">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Privacy Policy
        </h1>
        <div className="mt-6 space-y-4 text-text-muted">
          <p>
            Afilize is a service provided and operated by{" "}
            <strong className="text-text">Optivads</strong>, the operating
            entity and data controller responsible for the Afilize service.
          </p>
          <p>
            This is a placeholder page. The full Privacy Policy will be
            published here before launch.
          </p>
        </div>
      </div>
    </main>
  );
}
