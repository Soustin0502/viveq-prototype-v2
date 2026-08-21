import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Body, Footer, Screen, TopBar } from "@/components/viveq/Shell";
import { Btn, Card, Label } from "@/components/viveq/ui";
import { setIncidentShared, useIncidentShared } from "@/lib/call-state";


export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Report Incident — VIVEQ" },
      {
        name: "description",
        content: "Review the simulated incident summary and choose whether to share evidence.",
      },
      { property: "og:title", content: "Report Incident — VIVEQ" },
      { property: "og:description", content: "Consent-based incident reporting in VIVEQ." },
    ],
  }),
  component: Report,
});

const willShare = ["Incident type", "Risk score", "Detected indicators", "Timestamp"];
const willNotShare = ["Raw audio", "Raw video", "OTPs / passwords / banking credentials"];

function Report() {
  const [stage, setStage] = useState<"idle" | "consent" | "confirm" | "shared">("idle");
  const alreadyShared = useIncidentShared();
  const shared = stage === "shared";

  // A shared incident stays shared for the rest of the session.
  useEffect(() => {
    if (alreadyShared) setStage("shared");
  }, [alreadyShared]);

  const shareIncident = () => {
    setIncidentShared(true);
    setStage("shared");
  };


  return (
    <Screen>
      <TopBar title="REPORT" back="/warning" />
      <Body className="space-y-7">
        <h1 className="font-display text-[30px] font-medium leading-[1.15] tracking-[-0.02em]">
          Report Incident
        </h1>

        <Card className="space-y-3">
          {[
            ["Incident type", "Digital-arrest scam"],
            ["Risk", "94 / 100 — CRITICAL"],
            ["Timestamp", "2026-08-21 09:41 IST (simulated)"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-start justify-between gap-4 text-[14px]">
              <span className="text-subtle-foreground">{k}</span>
              <span className="text-right font-medium">{v}</span>
            </div>
          ))}
        </Card>

        <div>
          <Label className="mb-2">Detected indicators</Label>
          <div className="flex flex-wrap gap-2">
            {[
              "Government impersonation",
              "Criminal allegation",
              "Digital confinement",
              "Social isolation",
              "Financial demand",
            ].map((d) => (
              <span
                key={d}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-[12px] text-muted-foreground"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {stage === "consent" || stage === "confirm" ? (
          <div className="space-y-3 animate-in-up">
            <Card className="space-y-2">
              <Label>Will be shared</Label>
              {willShare.map((i) => (
                <div key={i} className="flex items-center gap-3 text-[14px]">
                  <span className="text-[12px] text-low">✓</span>
                  <span>{i}</span>
                </div>
              ))}
            </Card>
            <Card className="space-y-2 border-critical/25 bg-critical/5">
              <Label>Will not be shared</Label>
              {willNotShare.map((i) => (
                <div key={i} className="flex items-center gap-3 text-[14px]">
                  <span className="text-[12px] text-critical">✕</span>
                  <span>{i}</span>
                </div>
              ))}
            </Card>
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              Nothing is shared unless you explicitly choose to share it.
            </p>
          </div>
        ) : (
          <Card className="bg-surface/40">
            <p className="text-[13px] leading-[1.6] text-muted-foreground">
              Evidence sharing requires your consent. Nothing is shared unless you explicitly choose
              to share it. This is a simulated report — no data is transmitted.
            </p>
          </Card>
        )}

        {shared ? (
          <div className="space-y-1">
            <p className="text-[13px] text-low">✓ Incident shared (simulated).</p>
            <p className="text-[13px] text-muted-foreground">
              You remain in control of this evidence.
            </p>
          </div>
        ) : null}
      </Body>
      <Footer>
        {stage === "shared" ? (
          <Btn variant="outline" to="/warning">
            Back
          </Btn>
        ) : stage === "confirm" ? (
          <>
            <div className="pb-1">
              <p className="text-[13px] font-medium">Share incident?</p>
              <p className="mt-1 text-[12px] leading-[1.5] text-subtle-foreground">
                Only the listed fields are included. This is simulated — no data is transmitted.
              </p>
            </div>
            <div className="flex gap-2">
              <Btn variant="primary" onClick={shareIncident}>
                Share Incident
              </Btn>
              <Btn variant="outline" onClick={() => setStage("consent")}>
                Go Back
              </Btn>
            </div>
          </>
        ) : stage === "consent" ? (
          <>
            <Btn variant="primary" onClick={() => setStage("confirm")}>
              Review &amp; Share
            </Btn>
            <Btn variant="outline" onClick={() => setStage("idle")}>
              Not Now
            </Btn>
          </>
        ) : (
          <>
            <Btn variant="primary" onClick={() => setStage("consent")}>
              Share Incident
            </Btn>
            <Btn variant="outline" to="/warning">
              Not Now
            </Btn>
          </>
        )}
      </Footer>
    </Screen>
  );
}
