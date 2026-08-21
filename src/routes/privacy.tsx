import { createFileRoute } from "@tanstack/react-router";
import { Body, Footer, Screen, TopBar } from "@/components/viveq/Shell";
import { Btn, Label } from "@/components/viveq/ui";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Center — VIVEQ" },
      {
        name: "description",
        content:
          "Proposed privacy architecture: local analysis, minimal retention and user-controlled sharing.",
      },
      { property: "og:title", content: "Privacy Center — VIVEQ" },
      { property: "og:description", content: "Your data stays under your control." },
    ],
  }),
  component: Privacy,
});

const rows = [
  ["Audio", "Designed for local analysis"],
  ["Screen", "Temporary analysis"],
  ["Raw recordings", "Not retained by default"],
  ["Cloud sharing", "Off by default"],
  ["Evidence", "User controlled"],
];

function Privacy() {
  return (
    <Screen>
      <TopBar
        title="PRIVACY"
        back="/"
        right={
          <span className="rounded-full border border-border px-2.5 py-1 text-[10px] tracking-[0.14em] text-subtle-foreground">
            PROPOSED ARCHITECTURE
          </span>
        }
      />
      <Body className="space-y-7">
        <h1 className="font-display text-[30px] font-medium leading-[1.15] tracking-[-0.02em]">
          Your data stays under your control.
        </h1>

        <div className="divide-y divide-border overflow-hidden rounded-[12px] border border-border bg-card">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-4 px-4 py-3.5">
              <span className="text-[14px] font-medium">{k}</span>
              <span className="text-right text-[13px] text-muted-foreground">{v}</span>
            </div>
          ))}
        </div>

        <div>
          <Label className="mb-2">Note</Label>
          <p className="text-[13px] leading-[1.6] text-muted-foreground">
            This describes a proposed architecture for VIVEQ. These capabilities are not currently
            implemented — this prototype simulates all analysis locally in the browser.
          </p>
        </div>
      </Body>
      <Footer>
        <Btn variant="outline" to="/">
          Back to Home
        </Btn>
      </Footer>
    </Screen>
  );
}
