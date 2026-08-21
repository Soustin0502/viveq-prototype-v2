import { createFileRoute, Link } from "@tanstack/react-router";
import { Body, Screen } from "@/components/viveq/Shell";
import { Btn, Card, Dot, Label } from "@/components/viveq/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VIVEQ — See through deception." },
      {
        name: "description",
        content:
          "VIVEQ identifies suspicious patterns across conversations, screens and behaviour. Privacy-first AI fraud protection prototype.",
      },
      { property: "og:title", content: "VIVEQ — See through deception." },
      {
        property: "og:description",
        content: "Privacy-first AI protection against digital fraud.",
      },
    ],
  }),
  component: Home,
});

const capabilities = [
  { name: "Audio", detail: "Speech analysis" },
  { name: "Screen", detail: "OCR + visual analysis" },
  { name: "Behaviour", detail: "Pattern detection" },
];

function Home() {
  return (
    <Screen>
      <header className="flex items-center justify-between border-b border-border px-5 py-4">
        <span className="font-display text-[15px] font-medium tracking-[0.28em]">VIVEQ</span>
        <span className="inline-flex items-center gap-2 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
          <Dot className="bg-low" />
          Protection Active
        </span>
      </header>

      <Body className="flex flex-col gap-8">
        <div className="space-y-3 pt-6">
          <h1 className="font-display text-[40px] font-medium leading-[1.05] tracking-[-0.02em]">
            You&rsquo;re protected.
          </h1>
          <p className="max-w-[34ch] text-[15px] leading-[1.55] text-muted-foreground">
            VIVEQ is designed to identify suspicious patterns across conversations, screens and
            behaviour — and to explain what it finds, as it happens.
          </p>
        </div>

        <div className="space-y-2">
          <Btn variant="primary" to="/simulation">
            Start Simulation
          </Btn>
          <Btn variant="outline" to="/how-it-works">
            How It Works
          </Btn>
        </div>

        <div>
          <Label className="mb-3">Signals</Label>
          <div className="divide-y divide-border overflow-hidden rounded-[12px] border border-border bg-card">
            {capabilities.map((c) => (
              <div key={c.name} className="flex items-center justify-between px-4 py-3.5">
                <span className="text-[14px] font-medium">{c.name}</span>
                <span className="text-[13px] text-muted-foreground">{c.detail}</span>
              </div>
            ))}
          </div>
        </div>

        <Card className="bg-surface/40">
          <p className="text-[13px] font-medium">Designed around privacy</p>
          <p className="mt-1 text-[12px] leading-[1.6] text-subtle-foreground">
            On-device analysis · Minimal retention · User-controlled sharing
          </p>
          <Link
            to="/privacy"
            className="mt-3 inline-block text-[12px] text-[--color-accent] underline-offset-4 hover:underline"
          >
            Privacy Center →
          </Link>
        </Card>

        <p className="pb-2 text-center text-[11px] text-subtle-foreground">
          Interactive prototype · All analysis is simulated
        </p>
      </Body>
    </Screen>
  );
}
