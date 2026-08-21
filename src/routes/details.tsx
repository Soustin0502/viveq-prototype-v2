import { createFileRoute } from "@tanstack/react-router";
import { Body, Footer, Screen, TopBar } from "@/components/viveq/Shell";
import { Btn, Card, IndicatorRow, Label, RiskReadout } from "@/components/viveq/ui";

export const Route = createFileRoute("/details")({
  head: () => ({
    meta: [
      { title: "Detection Details — VIVEQ" },
      {
        name: "description",
        content:
          "The audio, behaviour and screen indicators behind VIVEQ's 94/100 critical risk assessment.",
      },
      { property: "og:title", content: "Detection Details — VIVEQ" },
      { property: "og:description", content: "Explainable breakdown of detected scam indicators." },
    ],
  }),
  component: Details,
});

const groups = [
  {
    label: "Audio",
    items: [
      { name: "Government impersonation", confidence: 93 },
      { name: "Criminal allegation", confidence: 86 },
      { name: "Financial demand", confidence: 99 },
    ],
  },
  {
    label: "Behaviour",
    items: [
      { name: "Do not disconnect", confidence: 97 },
      { name: "Social isolation", confidence: 91 },
    ],
  },
  {
    label: "Screen (simulated)",
    items: [{ name: "Suspicious financial instruction", confidence: 95 }],
  },
];

function Details() {
  return (
    <Screen>
      <TopBar title="DETECTION" back="/analysis" />
      <Body className="space-y-7">
        <h1 className="font-display text-[30px] font-medium leading-[1.15] tracking-[-0.02em]">
          Why is VIVEQ concerned?
        </h1>

        {groups.map((g) => (
          <div key={g.label}>
            <Label className="mb-1">{g.label}</Label>
            <div className="divide-y divide-border">
              {g.items.map((i) => (
                <IndicatorRow key={i.name} name={i.name} confidence={i.confidence} />
              ))}
            </div>
          </div>
        ))}

        <Card className="space-y-4">
          <Label>Multimodal Risk Engine</Label>
          <RiskReadout score={94} level="CRITICAL" />
          <p className="text-[13px] leading-[1.6] text-muted-foreground">
            No single statement is proof of fraud. VIVEQ raises risk when multiple independent
            indicators — across speech, behaviour and on-screen instructions — occur together in the
            same interaction. Here, six indicators from three separate sources accumulated within a
            single call.
          </p>
          <p className="text-[12px] leading-[1.6] text-subtle-foreground">
            Screen signals are simulated in this prototype. Designed for privacy-preserving,
            on-device analysis where technically feasible.
          </p>
        </Card>
      </Body>
      <Footer>
        <Btn variant="danger" to="/warning">
          Return to Warning
        </Btn>
      </Footer>
    </Screen>
  );
}
