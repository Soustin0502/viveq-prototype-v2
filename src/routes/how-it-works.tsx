import { createFileRoute } from "@tanstack/react-router";
import { Body, Footer, Screen, TopBar } from "@/components/viveq/Shell";
import { Btn, Card, Label } from "@/components/viveq/ui";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — VIVEQ" },
      {
        name: "description",
        content:
          "Audio, screen and behaviour signals feed a multimodal risk engine that produces an explainable score.",
      },
      { property: "og:title", content: "How It Works — VIVEQ" },
      {
        property: "og:description",
        content: "AI identifies signals. Rules interpret combinations. VIVEQ explains the risk.",
      },
    ],
  }),
  component: HowItWorks,
});

const inputs = [
  ["Audio", "Speech / NLP"],
  ["Screen", "OCR / Visual analysis"],
  ["Behaviour", "Event detection"],
];

function Arrow() {
  return <div className="mx-auto h-6 w-px bg-border-strong" />;
}

function Stage({ title, accent }: { title: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-[12px] border px-4 py-3.5 text-center text-[14px] font-medium ${
        accent ? "border-border-strong bg-surface" : "border-border bg-card"
      }`}
    >
      {title}
    </div>
  );
}

function HowItWorks() {
  return (
    <Screen>
      <TopBar title="HOW IT WORKS" back="/" />
      <Body className="space-y-7">
        <h1 className="font-display text-[30px] font-medium leading-[1.15] tracking-[-0.02em]">
          How VIVEQ works.
        </h1>

        <div>
          <Label className="mb-2">Signals</Label>
          <div className="space-y-2">
            {inputs.map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between rounded-[12px] border border-border bg-card px-4 py-3"
              >
                <span className="text-[14px] font-medium">{k}</span>
                <span className="text-[13px] text-muted-foreground">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Arrow />
          <Stage title="Multimodal Risk Engine" accent />
          <Arrow />
          <Stage title="Explainable Risk Score" />
          <Arrow />
          <Stage title="User Warning" />
        </div>

        <Card className="bg-surface/40">
          <p className="text-[13px] leading-[1.6] text-muted-foreground">
            AI identifies signals. Rules interpret combinations. VIVEQ explains the risk.
          </p>
        </Card>
      </Body>
      <Footer>
        <Btn variant="primary" to="/simulation">
          Start Simulation
        </Btn>
      </Footer>
    </Screen>
  );
}
