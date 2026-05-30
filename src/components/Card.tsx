import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={`rounded-[1.75rem] border border-white/80 bg-surface p-5 shadow-soft backdrop-blur-xl sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}
