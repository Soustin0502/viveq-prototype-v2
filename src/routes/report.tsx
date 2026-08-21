import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Body, Footer, Screen, TopBar } from "@/components/viveq/Shell";
import { Btn, Card, Label } from "@/components/viveq/ui";

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

function Report() {
  const [shared, setShared] = useState(false);

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

        <Card className="bg-surface/40">
          <p className="text-[13px] leading-[1.6] text-muted-foreground">
            Evidence sharing requires your consent. Nothing leaves this device unless you choose to
            share it.
          </p>
        </Card>

        {shared ? (
          <p className="text-[13px] text-low">
            ✓ Incident shared (simulated). You remain in control of this evidence.
          </p>
        ) : null}
      </Body>
      <Footer>
        <Btn variant="primary" onClick={() => setShared(true)} disabled={shared}>
          {shared ? "Shared" : "Share Incident"}
        </Btn>
        <Btn variant="outline" to="/warning">
          Not Now
        </Btn>
      </Footer>
    </Screen>
  );
}
