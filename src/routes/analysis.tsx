import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Body, Footer, Screen, TopBar } from "@/components/viveq/Shell";
import { Btn, Dot, RiskReadout, riskColor, type RiskLevel } from "@/components/viveq/ui";

export const Route = createFileRoute("/analysis")({
  head: () => ({
    meta: [
      { title: "Live Analysis — VIVEQ" },
      {
        name: "description",
        content:
          "Watch a simulated conversation escalate from low risk to critical as VIVEQ detects each indicator.",
      },
      { property: "og:title", content: "Live Analysis — VIVEQ" },
      {
        property: "og:description",
        content: "Simulated live conversation analysis and risk escalation.",
      },
    ],
  }),
  component: Analysis,
});

type Step = {
  quote: string;
  finding: string;
  score: number;
  level: RiskLevel;
  channel: string;
};

const steps: Step[] = [
  {
    quote: "I am calling regarding an investigation involving your identity.",
    finding: "Criminal allegation detected",
    score: 18,
    level: "LOW",
    channel: "AUDIO",
  },
  {
    quote: "I am calling from a government investigation department.",
    finding: "Government impersonation detected",
    score: 37,
    level: "CAUTION",
    channel: "AUDIO",
  },
  {
    quote: "Do not disconnect this call or contact anyone.",
    finding: "Digital confinement + social isolation detected",
    score: 68,
    level: "SUSPICIOUS",
    channel: "BEHAVIOUR",
  },
  {
    quote: "Transfer ₹5,00,000 for verification.",
    finding: "Financial demand detected",
    score: 94,
    level: "CRITICAL",
    channel: "SCREEN",
  },
];

function useCountUp(target: number) {
  const [value, setValue] = useState(target);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    const from = value;
    if (from === target) return;
    const start = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return value;
}

function Analysis() {
  const [index, setIndex] = useState(0);
  const done = index >= steps.length - 1;
  const current = steps[Math.min(index, steps.length - 1)];
  const score = useCountUp(current.score);
  const level = current.level;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => setIndex((i) => i + 1), index === 0 ? 2200 : 2800);
    return () => clearTimeout(t);
  }, [index, done]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [index]);

  return (
    <Screen>
      <TopBar
        title="LIVE ANALYSIS"
        right={
          <span className="inline-flex items-center gap-2 text-[11px] text-muted-foreground">
            <Dot className="bg-critical" />
            00:{String(24 + index * 13).padStart(2, "0")}
          </span>
        }
      />

      <div className="border-b border-border px-5 py-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[13px] font-medium">Government Authority</span>
          <span className="font-mono text-[11px] text-subtle-foreground">Unknown number</span>
        </div>
        <RiskReadout score={score} level={level} />
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {steps.slice(0, index + 1).map((s, i) => {
          const c = riskColor(s.level);
          return (
            <div key={s.quote} className="space-y-2 animate-in-up">
              <div className="max-w-[85%] rounded-[12px] rounded-tl-[4px] border border-border bg-card px-4 py-3">
                <p className="text-[14px] leading-[1.5] text-foreground">&ldquo;{s.quote}&rdquo;</p>
              </div>
              <div className="ml-3 space-y-1.5 border-l border-border pl-4">
                <p className="label-micro">{s.channel} · VIVEQ</p>
                <p className={`text-[13px] font-medium ${c.text}`}>{s.finding}</p>
                <p className="font-mono text-[11px] text-subtle-foreground">
                  Risk {s.score} / 100 — {s.level}
                </p>
              </div>
              {i === index && !done ? (
                <p className="pl-4 text-[12px] text-subtle-foreground">Listening…</p>
              ) : null}
            </div>
          );
        })}
      </div>

      <Footer>
        <Btn variant="danger" to="/warning" disabled={!done}>
          {done ? "View Critical Warning" : "Analysing…"}
        </Btn>
        <Btn variant="ghost" to="/details" disabled={!done}>
          Why is VIVEQ concerned?
        </Btn>
      </Footer>
    </Screen>
  );
}
