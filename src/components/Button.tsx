import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

const styles = {
  primary:
    "bg-primary text-white shadow-lift hover:-translate-y-0.5 hover:bg-[#5C9E93] focus-visible:outline-primary disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-accent/70 disabled:shadow-none",
  secondary:
    "border border-white/80 bg-white/70 text-ink hover:bg-white focus-visible:outline-primary",
};

export function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  href,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <Link
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${styles[variant]} ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
}
