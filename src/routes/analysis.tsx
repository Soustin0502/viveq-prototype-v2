import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Footer, Screen } from "@/components/viveq/Shell";
import { Btn, Dot, RiskBar, riskColor, type RiskLevel } from "@/components/viveq/ui";
import { useReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/analysis")({
  head: () => ({
    meta: [
      { title: "Live Call Analysis — VIVEQ" },
      {
        name: "description",
        content:
          "A controlled, simulated conversation escalating from low risk to critical as VIVEQ detects each indicator in real time.",
      },
      { property: "og:title", content: "Live Call Analysis — VIVEQ" },
      {
        property: "og:description",
        content: "Simulated two-sided call with live risk escalation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Analysis,
});

type Event =
  | { kind: "caller"; text: string; delay: number }
  | { kind: "user"; text: string; delay: number }
  | {
      kind: "analysis";
      source: "AUDIO · SPEECH ANALYSIS" | "BEHAVIOUR · PATTERN DETECTION";
      channel: "AUDIO" | "BEHAVIOUR";
      finding: string;
      confidence: number;
      score: number;
      level: RiskLevel;
      delay: number;
    };

const timeline: Event[] = [
  { kind: "caller", text: "I am calling regarding an investigation involving your identity.", delay: 900 },
  { kind: "user", text: "What is this regarding?", delay: 1600 },
  { kind: "caller", text: "Your identity has been linked to an ongoing criminal investigation.", delay: 1700 },
  {
    kind: "analysis",
    source: "AUDIO · SPEECH ANALYSIS",
    channel: "AUDIO",
    finding: "Criminal allegation detected",
    confidence: 86,
    score: 18,
    level: "LOW",
    delay: 1300,
  },
  { kind: "caller", text: "I am calling from a government investigation department.", delay: 2000 },
  { kind: "user", text: "Can you tell me which department?", delay: 1600 },
  { kind: "caller", text: "This matter is being handled by the government investigation department.", delay: 1700 },
  {
    kind: "analysis",
    source: "AUDIO · SPEECH ANALYSIS",
    channel: "AUDIO",
    finding: "Government impersonation detected",
    confidence: 93,
    score: 37,
    level: "CAUTION",
    delay: 1300,
  },
  {
    kind: "caller",
    text: "You are required to remain on this call while the investigation is conducted.",
    delay: 2000,
  },
  { kind: "user", text: "Can I speak to someone from my family first?", delay: 1600 },
  { kind: "caller", text: "No. Do not disconnect this call or contact anyone.", delay: 1700 },
  {
    kind: "analysis",
    source: "BEHAVIOUR · PATTERN DETECTION",
    channel: "BEHAVIOUR",
    finding: "Digital confinement + social isolation detected",
    confidence: 97,
    score: 68,
    level: "SUSPICIOUS",
    delay: 1300,
  },
  {
    kind: "caller",
    text: "To complete the verification process, you need to transfer ₹5,00,000.",
    delay: 2000,
  },
  { kind: "user", text: "Why do I need to transfer money?", delay: 1600 },
  {
    kind: "caller",
    text: "The transfer is required for account verification. You need to do it immediately.",
    delay: 1700,
  },
  {
    kind: "analysis",
    source: "AUDIO · SPEECH ANALYSIS",
    channel: "AUDIO",
    finding: "Financial demand detected",
    confidence: 99,
    score: 94,
    level: "CRITICAL",
    delay: 1300,
  },
];

function useCountUp(target: number, instant = false) {
  const [value, setValue] = useState(0);
  const ref = useRef(0);
  useEffect(() => {
    const from = ref.current;
    if (instant) {
      ref.current = target;
      setValue(target);
      return;
    }
    if (from === target) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 900);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(from + (target - from) * eased);
      ref.current = v;
      setValue(v);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, instant]);
  return value;
}

function useElapsed() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setS((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

const legend: { level: RiskLevel; dot: string }[] = [
  { level: "LOW", dot: "bg-low" },
  { level: "CAUTION", dot: "bg-caution" },
  { level: "SUSPICIOUS", dot: "bg-suspicious" },
  { level: "CRITICAL", dot: "bg-critical" },
];

function RiskLegend({ active }: { active: RiskLevel | null }) {
  return (
    <div className="flex items-center gap-2.5 pt-1">
      <span className="label-micro">Risk</span>
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        {legend.map((l) => {
          const on = l.level === active;
          return (
            <span
              key={l.level}
              className={cn(
                "inline-flex items-center gap-1.5 text-[10px] tracking-[0.12em] transition-colors duration-300",
                on ? riskColor(l.level).text : "text-subtle-foreground",
              )}
            >
              <span
                className={cn(
                  "size-1 rounded-full",
                  l.dot,
                  on ? "opacity-100" : "opacity-30",
                )}
              />
              {l.level}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function Analysis() {
  const [count, setCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const elapsed = useElapsed();
  const done = count >= timeline.length;

  useEffect(() => {
    if (done) return;
    const next = timeline[count]!;
    const t = setTimeout(() => setCount((c) => c + 1), next.delay);
    return () => clearTimeout(t);
  }, [count, done]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [count]);

  const visible = timeline.slice(0, count);
  const lastAnalysis = [...visible].reverse().find((e) => e.kind === "analysis");
  const target = lastAnalysis && lastAnalysis.kind === "analysis" ? lastAnalysis.score : 0;
  const level: RiskLevel =
    lastAnalysis && lastAnalysis.kind === "analysis" ? lastAnalysis.level : "LOW";
  const reducedMotion = useReducedMotion();
  const score = useCountUp(target, reducedMotion);
  const c = riskColor(level);

  const nextIsUser = !done && timeline[count]?.kind === "user";

  return (
    <Screen>
      <header className="border-b border-border px-5 pb-4 pt-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-display text-[12px] tracking-[0.28em]">VIVEQ</span>
          <span className="rounded-full border border-caution/40 px-2.5 py-1 text-[10px] tracking-[0.14em] text-caution">
            CONTROLLED SIMULATION
          </span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[15px] font-medium leading-tight">Government Authority</p>
            <p className="font-mono text-[12px] text-subtle-foreground">Unknown number</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.16em] text-critical">
              <Dot className="bg-critical" />
              LIVE
            </span>
            <span className="font-mono text-[12px] text-muted-foreground tabular-nums">
              {elapsed}
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span
                className={cn(
                  "font-mono text-[32px] leading-none tabular-nums transition-colors duration-500",
                  c.text,
                )}
              >
                {score}
              </span>
              <span className="font-mono text-[12px] text-subtle-foreground">/ 100</span>
            </div>
            <span className={cn("text-[11px] font-medium tracking-[0.14em]", c.text)}>
              {target === 0 ? "MONITORING" : level}
            </span>
          </div>
          <RiskBar score={score} level={level} />
          <RiskLegend active={target === 0 ? null : level} />
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
        {visible.map((e, i) => {
          if (e.kind === "caller")
            return (
              <div key={i} className="flex animate-in-up">
                <div className="max-w-[85%] rounded-[12px] rounded-tl-[4px] border border-border bg-card px-4 py-3">
                  <p className="text-[14px] leading-[1.5] text-foreground">{e.text}</p>
                </div>
              </div>
            );
          if (e.kind === "user")
            return (
              <div key={i} className="flex justify-end animate-in-up">
                <div className="max-w-[80%] rounded-[12px] rounded-tr-[4px] border border-border-strong bg-surface px-4 py-3">
                  <p className="text-[14px] leading-[1.5] text-muted-foreground">{e.text}</p>
                </div>
              </div>
            );
          const ec = riskColor(e.level);
          return (
            <div
              key={i}
              className="ml-3 space-y-1 border-l border-border pl-4 py-1 animate-in-up"
            >
              <p className="label-micro">VIVEQ · {e.channel}</p>
              <p className={cn("text-[13px] font-medium", ec.text)}>{e.finding}</p>
              <p className="font-mono text-[11px] text-subtle-foreground">
                {e.confidence}% confidence · {e.source}
              </p>
              <p className="font-mono text-[11px] text-subtle-foreground">
                Risk {e.score} / 100 — {e.level}
              </p>
            </div>
          );
        })}

        {!done ? (
          <p className="flex items-center gap-2 pl-1 pt-1 text-[12px] text-subtle-foreground">
            <Dot className="bg-subtle-foreground" />
            {nextIsUser ? "Listening for additional signals…" : "Analysing"}
          </p>
        ) : null}
      </div>

      <Footer>
        {done ? (
          <>
            <Btn variant="danger" to="/warning">
              View Critical Warning →
            </Btn>
            <Btn variant="ghost" to="/details">
              Why is VIVEQ concerned?
            </Btn>
          </>
        ) : (
          <p className="flex items-center justify-center gap-2 py-2 text-[12px] text-subtle-foreground">
            <Dot className="bg-subtle-foreground" />
            VIVEQ is observing this call · all analysis is simulated
          </p>
        )}
      </Footer>
    </Screen>
  );
}
