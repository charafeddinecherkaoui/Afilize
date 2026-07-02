import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line-soft py-[30px] text-center text-[13px] text-text-dim">
      <div className="wrap flex flex-col gap-1.5">
        <p>© 2026 Afilize — Track. Automate. Optimize. Protect.</p>
        <p>Afilize is a product of Optivads.</p>
        <p>
          <Link href="/terms" className="transition-colors hover:text-text-muted">
            Terms of Service
          </Link>
          {" — "}
          <Link href="/privacy" className="transition-colors hover:text-text-muted">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}
