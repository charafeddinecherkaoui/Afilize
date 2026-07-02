import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Afilize",
};

export default function TermsPage() {
  return (
    <main className="wrap flex-1 py-16">
      <div className="mx-auto max-w-[720px]">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-2">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Terms of Service
        </h1>
        <div className="mt-6 space-y-4 text-text-muted">
          <p>
            Afilize is a service provided and operated by{" "}
            <strong className="text-text">Optivads</strong>, the operating
            entity that provides and runs the Afilize platform.
          </p>
          <p>
            This is a placeholder page. The full Terms of Service will be
            published here before launch.
          </p>
        </div>
      </div>
    </main>
  );
}
