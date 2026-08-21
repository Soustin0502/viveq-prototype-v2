import { createFileRoute } from "@tanstack/react-router";
import { Body, Footer, Screen, TopBar } from "@/components/viveq/Shell";
import { Btn, Card, Label } from "@/components/viveq/ui";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: "Verify Interaction — VIVEQ" },
      {
        name: "description",
        content:
          "The claimed authority could not be independently verified — verification result: high risk.",
      },
      { property: "og:title", content: "Verify Interaction — VIVEQ" },
      { property: "og:description", content: "Independent verification of a claimed authority." },
    ],
  }),
  component: Verify,
});

function Verify() {
  return (
    <Screen>
      <TopBar title="VERIFY" back="/warning" />
      <Body className="space-y-7">
        <h1 className="font-display text-[30px] font-medium leading-[1.15] tracking-[-0.02em]">
          Verify Interaction
        </h1>

        <Card className="space-y-3">
          <div>
            <Label>Claimed authority</Label>
            <p className="mt-1 text-[16px] font-medium">Government Investigation Department</p>
          </div>
          <div className="border-t border-border pt-3">
            <Label>Status</Label>
            <p className="mt-1 text-[14px] font-medium text-suspicious">
              ⚠ Not Independently Verified
            </p>
          </div>
        </Card>

        <div>
          <Label className="mb-2">Detected indicators</Label>
          <div className="divide-y divide-border">
            {[
              "Government impersonation",
              "Criminal allegation",
              "Digital confinement",
              "Financial demand",
            ].map((d) => (
              <p key={d} className="py-2.5 text-[14px]">
                {d}
              </p>
            ))}
          </div>
        </div>

        <Card className="border-critical/30 bg-critical/5">
          <Label>Verification result</Label>
          <p className="mt-1 font-display text-[22px] font-medium text-critical">HIGH RISK</p>
        </Card>

        <p className="text-[13px] leading-[1.6] text-muted-foreground">
          Never verify an authority using contact information supplied by the caller. Use a number
          published on an official source you found yourself.
        </p>
      </Body>
      <Footer>
        <Btn variant="primary" to="/warning">
          Return to Warning
        </Btn>
      </Footer>
    </Screen>
  );
}
