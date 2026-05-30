import Link from "next/link";
import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
  showNav?: boolean;
};

export function AppShell({ children, showNav = true }: AppShellProps) {
  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 sm:py-7">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-4xl flex-col">
        {showNav ? (
          <nav className="mb-7 flex items-center justify-between rounded-[1.6rem] border border-white/80 bg-surface px-4 py-3 shadow-soft backdrop-blur-xl">
            <Link className="text-sm font-semibold tracking-wide text-ink" href="/">
              Reflective Patterns
            </Link>
            <Link
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted transition hover:bg-secondary"
              href="/history"
            >
              History
            </Link>
          </nav>
        ) : null}
        {children}
      </div>
    </main>
  );
}
