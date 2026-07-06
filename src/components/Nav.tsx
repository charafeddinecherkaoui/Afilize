"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/features", label: "Features" },
  { href: "/solutions", label: "What you achieve" },
  { href: "/pricing", label: "Pricing" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-line-soft bg-[rgba(8,11,22,0.72)] backdrop-blur-[14px]">
      <nav className="navbar wrap flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="navbar-brand flex items-center gap-2.5"
          aria-label="Afilize home"
        >
          <span
            className="relative h-[26px] w-[26px] rounded-lg flow-bg"
            style={{
              background: "linear-gradient(100deg, #7C82FF 0%, #27D3EE 100%)",
            }}
          >
            <span className="absolute left-1/2 top-[5px] h-[3px] w-2.5 -translate-x-1/2 rounded-full bg-ink" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            Afilize
          </span>
        </Link>

        <ul className="navbar-menu hidden items-center gap-8 min-[761px]:flex">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href} className="nav-item">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "text-sm font-semibold text-text"
                      : "text-sm text-text-muted transition-colors hover:text-text"
                  }
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="navbar-actions flex items-center gap-3">
          <Link
            href="/signup"
            className="signup-button hidden rounded-full border border-line bg-transparent px-4 py-2 text-sm font-semibold text-text transition-colors hover:border-accent min-[761px]:inline-block"
          >
            Sign up
          </Link>
          <Link
            href="/request-demo"
            className="request-demo-button hidden rounded-full flow-bg px-4 py-2 text-sm font-semibold text-ink transition-shadow hover:shadow-[0_0_24px_rgba(124,130,255,0.45)] min-[761px]:inline-block"
          >
            Request demo
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className="mobile-menu-button flex h-10 w-10 items-center justify-center rounded-lg border border-line min-[761px]:hidden"
          >
            <svg
              viewBox="0 0 20 20"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="mobile-menu-panel border-t border-line-soft bg-ink-2 min-[761px]:hidden"
        >
          <ul className="wrap flex flex-col gap-1 py-4">
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href} className="nav-item">
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-lg px-3 py-2.5 text-[15px] ${
                      active
                        ? "bg-surface font-semibold text-text"
                        : "text-text-muted"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2">
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="signup-button block rounded-full border border-line px-4 py-2.5 text-center text-sm font-semibold text-text"
              >
                Sign up
              </Link>
            </li>
            <li className="mt-2">
              <Link
                href="/request-demo"
                onClick={() => setOpen(false)}
                className="request-demo-button block rounded-full flow-bg px-4 py-2.5 text-center text-sm font-semibold text-ink"
              >
                Request demo
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
