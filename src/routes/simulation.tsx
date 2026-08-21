import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Body, Footer, Screen, TopBar } from "@/components/viveq/Shell";
import { Btn, Card, Label } from "@/components/viveq/ui";
import { resetSimulation } from "@/lib/call-state";


export const Route = createFileRoute("/simulation")({
  head: () => ({
    meta: [
      { title: "Simulation — VIVEQ" },
      {
        name: "description",
        content:
          "A controlled demonstration of how multiple scam indicators combine into a single risk assessment.",
      },
      { property: "og:title", content: "Simulation — VIVEQ" },
      {
        property: "og:description",
        content: "Controlled demonstration of a digital arrest scam detection flow.",
      },
    ],
  }),
  component: Simulation,
});

function Simulation() {
  return (
    <Screen>
      <TopBar
        back="/"
        right={
          <span className="rounded-full border border-caution/40 px-2.5 py-1 text-[10px] tracking-[0.14em] text-caution">
            CONTROLLED SIMULATION
          </span>
        }
      />
      <Body className="flex flex-col gap-7">
        <div className="space-y-3 pt-4">
          <h1 className="font-display text-[34px] font-medium leading-[1.1] tracking-[-0.02em]">
            See VIVEQ in action.
          </h1>
          <p className="text-[15px] leading-[1.55] text-muted-foreground">
            This is a controlled demonstration. It shows how several independent scam indicators
            appear over the course of a conversation, and how VIVEQ combines them into a single,
            explainable risk assessment.
          </p>
        </div>

        <Card>
          <Label className="mb-2">Scenario</Label>
          <p className="font-display text-[20px] font-medium">Digital Arrest Scam</p>
          <p className="mt-2 text-[13px] leading-[1.6] text-muted-foreground">
            A caller claims to represent a government investigation department, alleges criminal
            involvement, isolates the victim, then demands an urgent transfer.
          </p>
        </Card>

        <div className="space-y-2">
          <Label>What happens next</Label>
          {["Incoming call", "Live analysis", "Risk escalation", "Critical warning"].map(
            (s, i) => (
              <div key={s} className="flex items-center gap-3 py-1.5">
                <span className="font-mono text-[11px] text-subtle-foreground">
                  0{i + 1}
                </span>
                <span className="text-[14px] text-muted-foreground">{s}</span>
              </div>
            ),
          )}
        </div>
      </Body>
      <Footer>
        <Btn variant="primary" to="/call">
          Start Simulation
        </Btn>
        <p className="pt-1 text-center text-[11px] text-subtle-foreground">
          No real call is placed. All content is fictional.
        </p>
      </Footer>
    </Screen>
  );
}
