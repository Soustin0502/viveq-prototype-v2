import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Screen } from "@/components/viveq/Shell";

export const Route = createFileRoute("/call")({
  head: () => ({
    meta: [
      { title: "Incoming Call — VIVEQ" },
      {
        name: "description",
        content: "Simulated incoming call from a claimed government authority.",
      },
      { property: "og:title", content: "Incoming Call — VIVEQ" },
      { property: "og:description", content: "Simulated incoming call in the VIVEQ prototype." },
    ],
  }),
  component: IncomingCall,
});

function IncomingCall() {
  const navigate = useNavigate();

  return (
    <Screen>
      <div className="flex flex-1 flex-col justify-between px-5 py-10 animate-in-up">
        <div className="flex items-center justify-between">
          <span className="font-display text-[13px] tracking-[0.28em]">VIVEQ</span>
          <span className="rounded-full border border-caution/40 px-2.5 py-1 text-[10px] tracking-[0.14em] text-caution">
            CONTROLLED SIMULATION
          </span>
        </div>

        <div className="flex flex-col items-center gap-6 text-center">
          <div className="relative flex size-24 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-border-strong animate-ring" />
            <div className="flex size-24 items-center justify-center rounded-full border border-border bg-card font-display text-[22px] text-muted-foreground">
              GA
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] tracking-[0.2em] text-subtle-foreground">INCOMING CALL</p>
            <h1 className="font-display text-[28px] font-medium tracking-[-0.01em]">
              Government Authority
            </h1>
            <p className="font-mono text-[13px] text-muted-foreground">Unknown number</p>
          </div>
        </div>

        <div className="flex items-end justify-between px-4">
          <button
            type="button"
            onClick={() => navigate({ to: "/simulation" })}
            className="flex flex-col items-center gap-2"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-critical text-[oklch(0.15_0.006_260)] transition-transform active:scale-95">
              ✕
            </span>
            <span className="text-[12px] text-muted-foreground">Decline</span>
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/analysis" })}
            className="flex flex-col items-center gap-2"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-low text-[oklch(0.15_0.006_260)] transition-transform active:scale-95">
              ✓
            </span>
            <span className="text-[12px] text-muted-foreground">Accept</span>
          </button>
        </div>
      </div>
    </Screen>
  );
}
