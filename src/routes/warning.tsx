import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Body, Footer, Screen } from "@/components/viveq/Shell";
import { Btn, Card, Dot, Label, RiskBar } from "@/components/viveq/ui";
import { setCallStage, useCallStage } from "@/lib/call-state";


export const Route = createFileRoute("/warning")({
  head: () => ({
    meta: [
      { title: "Critical Risk — VIVEQ" },
      {
        name: "description",
        content:
          "Possible digital arrest scam: 94/100 critical risk with safety guidance and next actions.",
      },
      { property: "og:title", content: "Critical Risk — VIVEQ" },
      { property: "og:description", content: "Possible digital arrest scam detected — 94 / 100." },
    ],
  }),
  component: Warning,
});

const detected = [
  "Government impersonation",
  "Criminal allegation",
  "Digital confinement",
  "Social isolation",
  "Financial demand",
];

function Warning() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<"idle" | "confirm" | "ended">("idle");

  return (
    <Screen className="border-critical/40 sm:border-critical/40">
      <div className="border-b border-critical/30 bg-critical/10 px-5 py-3">
        <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] text-critical">
          <Dot className="bg-critical" />
          CRITICAL RISK
        </span>
      </div>

      <Body className="space-y-7">
        <div className="space-y-4">
          <h1 className="font-display text-[32px] font-medium leading-[1.1] tracking-[-0.02em] text-critical">
            Possible digital arrest scam
          </h1>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-[48px] leading-none text-critical tabular-nums">94</span>
            <span className="font-mono text-[14px] text-subtle-foreground">/ 100</span>
          </div>
          <RiskBar score={94} level="CRITICAL" />
          <p className="text-[14px] leading-[1.6] text-muted-foreground">
            VIVEQ detected multiple high-risk indicators associated with government impersonation
            and financial fraud.
          </p>
        </div>

        <div>
          <Label className="mb-2">Detected</Label>
          <div className="space-y-2">
            {detected.map((d) => (
              <div key={d} className="flex items-center gap-3">
                <span className="text-[12px] text-critical">✓</span>
                <span className="text-[14px]">{d}</span>
              </div>
            ))}
          </div>
        </div>

        <Card className="border-critical/30 bg-critical/5">
          <Label className="mb-2">Safety guidance</Label>
          <ul className="space-y-1.5 text-[14px] leading-[1.5]">
            <li>Do not transfer money.</li>
            <li>Do not share OTPs, passwords or banking credentials.</li>
            <li>Verify the caller independently.</li>
          </ul>
        </Card>

        <button
          type="button"
          onClick={() => navigate({ to: "/details" })}
          className="text-[13px] text-muted-foreground underline-offset-4 hover:underline"
        >
          Why is VIVEQ concerned? →
        </button>
      </Body>

      <Footer>
        {stage === "ended" ? (
          <>
            <div className="pb-1">
              <p className="text-[13px] font-medium text-low">Interaction ended</p>
              <p className="mt-1 text-[12px] leading-[1.5] text-subtle-foreground">
                The simulated call has been disconnected.
              </p>
            </div>
            <Btn variant="primary" to="/">
              Return Home
            </Btn>
            <Btn variant="outline" to="/report">
              View Incident
            </Btn>
          </>
        ) : stage === "confirm" ? (
          <>
            <div className="pb-1">
              <p className="text-[13px] font-medium">End interaction?</p>
              <p className="mt-1 text-[12px] leading-[1.5] text-subtle-foreground">
                This will end the simulated call.
              </p>
            </div>
            <div className="flex gap-2">
              <Btn variant="danger" onClick={() => setStage("ended")}>
                End Call
              </Btn>
              <Btn variant="outline" onClick={() => setStage("idle")}>
                Cancel
              </Btn>
            </div>
          </>
        ) : (
          <>
            <Btn variant="danger" onClick={() => setStage("confirm")}>
              Disconnect
            </Btn>
            <div className="flex gap-2">
              <Btn variant="outline" to="/verify">
                Verify
              </Btn>
              <Btn variant="outline" to="/report">
                Report
              </Btn>
            </div>
          </>
        )}
      </Footer>
    </Screen>
  );
}
