import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}

const base =
  "inline-flex items-center gap-2 rounded px-3.5 py-3.5 font-display text-xs font-semibold uppercase tracking-label transition-all duration-150";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-surface-raised hover:shadow-glow",
  ghost: "border border-accent/35 text-accent hover:border-accent hover:shadow-glow-sm",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external,
}: ButtonLinkProps) {
  const cls = cn(base, variants[variant], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
