import Link from "next/link";
import type { ReactNode } from "react";

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-display text-xl font-semibold tracking-tight text-text">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-text-muted">
        {children}
      </div>
    </section>
  );
}

export function LegalSubheading({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display text-base font-semibold text-text">{children}</h3>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="text-accent-2">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LegalPageLayout({
  title,
  lastUpdated,
  intro,
  toc,
  children,
  relatedHref,
  relatedLabel,
}: {
  title: string;
  lastUpdated: string;
  intro: ReactNode;
  toc: { id: string; label: string }[];
  children: ReactNode;
  relatedHref: string;
  relatedLabel: string;
}) {
  return (
    <main className="wrap flex-1 py-16">
      <div className="mx-auto max-w-[820px]">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-2">
          Legal
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-text">
          {title}
        </h1>
        <p className="mt-3 text-sm text-text-dim">Last updated: {lastUpdated}</p>
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-text-muted">
          {intro}
        </div>

        <nav
          aria-label="Table of contents"
          className="mt-10 rounded-[18px] border border-line bg-surface p-6"
        >
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-2">
            Table of Contents
          </p>
          <ol className="mt-4 space-y-2 text-sm text-text-muted">
            {toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="transition-colors hover:text-text">
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-12 space-y-12">{children}</div>

        <p className="mt-12 text-sm text-text-dim">
          See also{" "}
          <Link href={relatedHref} className="text-text-muted transition-colors hover:text-text">
            {relatedLabel}
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
