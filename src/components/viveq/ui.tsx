import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type RiskLevel = "LOW" | "CAUTION" | "SUSPICIOUS" | "CRITICAL";

export function riskFromScore(score: number): RiskLevel {
  if (score >= 85) return "CRITICAL";
  if (score >= 60) return "SUSPICIOUS";
  if (score >= 30) return "CAUTION";
  return "LOW";
}

const riskText: Record<RiskLevel, string> = {
  LOW: "text-low",
  CAUTION: "text-caution",
  SUSPICIOUS: "text-suspicious",
  CRITICAL: "text-critical",
};
const riskBg: Record<RiskLevel, string> = {
  LOW: "bg-low",
  CAUTION: "bg-caution",
  SUSPICIOUS: "bg-suspicious",
  CRITICAL: "bg-critical",
};

export function riskColor(level: RiskLevel) {
  return { text: riskText[level], bg: riskBg[level] };
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-[12px] border border-border bg-card p-4", className)}>
      {children}
    </div>
  );
}

export function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[12px] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Dot({ className }: { className?: string }) {
  return <span className={cn("size-1.5 rounded-full animate-dot", className)} />;
}

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("label-micro", className)}>{children}</p>;
}

type BtnProps = {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "danger";
  to?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const variants = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  outline: "border border-border-strong bg-transparent text-foreground hover:bg-surface",
  ghost: "text-muted-foreground hover:text-foreground",
  danger: "bg-critical text-[oklch(0.15_0.006_260)] hover:opacity-90",
} as const;

export function Btn({ children, variant = "outline", to, onClick, className, disabled }: BtnProps) {
  const cls = cn(
    "inline-flex w-full items-center justify-center gap-2 rounded-[8px] px-4 py-3 text-[14px] font-medium transition-all duration-200 active:scale-[0.985] disabled:opacity-40",
    variants[variant],
    className,
  );
  if (to && !disabled)
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  return (
    <button type="button" className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export function RiskBar({ score, level }: { score: number; level: RiskLevel }) {
  return (
    <div className="h-[3px] w-full overflow-hidden rounded-full bg-muted">
      <div
        className={cn("h-full rounded-full transition-all duration-700 ease-out", riskBg[level])}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

export function RiskReadout({
  score,
  level,
  className,
}: {
  score: number;
  level: RiskLevel;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline gap-1.5">
          <span
            className={cn(
              "font-mono text-[36px] leading-none tabular-nums transition-colors duration-500",
              riskText[level],
            )}
          >
            {score}
          </span>
          <span className="font-mono text-[13px] text-subtle-foreground">/ 100</span>
        </div>
        <span className={cn("text-[11px] font-medium tracking-[0.14em]", riskText[level])}>
          {level}
        </span>
      </div>
      <RiskBar score={score} level={level} />
    </div>
  );
}

export function IndicatorRow({
  name,
  confidence,
  level = "CRITICAL",
}: {
  name: string;
  confidence: number;
  level?: RiskLevel;
}) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <span className={cn("size-1 rounded-full", riskBg[level])} />
      <span className="flex-1 text-[14px] text-foreground">{name}</span>
      <span className="font-mono text-[12px] text-muted-foreground tabular-nums">
        {confidence}%
      </span>
    </div>
  );
}
