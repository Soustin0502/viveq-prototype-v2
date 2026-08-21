import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Screen({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex min-h-screen justify-center bg-[oklch(0.11_0.005_260)] px-0 py-0 sm:px-6 sm:py-10">
      <div
        className={cn(
          "flex w-full max-w-[420px] flex-col bg-background sm:rounded-[24px] sm:border sm:border-border sm:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function TopBar({
  title,
  back,
  right,
}: {
  title?: string;
  back?: string;
  right?: ReactNode;
}) {
  return (
    <header className="flex items-center justify-between border-b border-border px-5 py-4 pt-[max(1rem,env(safe-area-inset-top))] sm:pt-4">
      <div className="flex items-center gap-3">
        {back ? (
          <Link
            to={back}
            aria-label="Back"
            className="text-[16px] leading-none text-muted-foreground transition-colors hover:text-foreground"
          >
            ←
          </Link>
        ) : null}
        <span className="text-[13px] font-medium tracking-[0.22em] text-foreground">
          {title ?? "VIVEQ"}
        </span>
      </div>
      {right}
    </header>
  );
}

export function Body({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <main className={cn("flex-1 px-5 py-6 animate-in-up", className)}>{children}</main>
  );
}

export function Footer({ children }: { children: ReactNode }) {
  return (
    <footer className="sticky bottom-0 space-y-2 border-t border-border bg-background/95 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur sm:pb-4">
      {children}
    </footer>
  );
}
