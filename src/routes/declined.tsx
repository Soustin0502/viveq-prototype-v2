import { createFileRoute } from "@tanstack/react-router";
import { Body, Footer, Screen } from "@/components/viveq/Shell";
import { Btn, Card, Label, RiskBar } from "@/components/viveq/ui";

export const Route = createFileRoute("/declined")({
  head: () => ({
    meta: [
      { title: "Call Declined — VIVEQ" },
      {
        name: "description",
        content:
          "The simulated interaction ended before high-risk behaviour occurred — risk assessed as low.",
      },
      { property: "og:title", content: "Call Declined — VIVEQ" },
      {
        property: "og:description",
        content: "Simulated call declined — risk assessed LOW in the VIVEQ prototype.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Declined,
});

function Declined() {
  return (
    <Screen>
      <div className="border-b border-border px-5 py-3">
        <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] text-low">
          <span className="size-1.5 rounded-full bg-low" />
          NO ACTIVE INTERACTION
        </span>
      </div>

      <Body className="space-y-7">
        <div className="space-y-4">
          <h1 className="font-display text-[32px] font-medium leading-[1.1] tracking-[-0.02em]">
            Call declined
          </h1>
          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-[36px] leading-none text-low tabular-nums">0</span>
                <span className="font-mono text-[13px] text-subtle-foreground">/ 100</span>
              </div>
              <span className="text-[11px] font-medium tracking-[0.14em] text-low">LOW</span>
            </div>
            <RiskBar score={4} level="LOW" />
          </div>
          <p className="text-[14px] leading-[1.6] text-muted-foreground">
            Risk assessed: <span className="font-medium text-low">LOW</span>
          </p>
        </div>

        <Card className="bg-surface/40">
          <Label className="mb-2">Assessment</Label>
          <p className="text-[13px] leading-[1.6] text-muted-foreground">
            The simulated interaction ended before high-risk behaviour occurred.
          </p>
        </Card>
      </Body>

      <Footer>
        <Btn variant="primary" to="/">
          Return Home
        </Btn>
        <Btn variant="outline" to="/simulation">
          Run Simulation Again
        </Btn>
      </Footer>
    </Screen>
  );
}
