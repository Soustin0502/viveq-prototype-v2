import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Native shell for VIVEQ (Android + iOS) via Capacitor.
 *
 * The app is a server-rendered TanStack Start app, so the native shell loads
 * the deployed web app instead of a bundled static folder. Point `server.url`
 * at your published Lovable URL (or the preview URL while developing).
 */
const config: CapacitorConfig = {
  appId: "app.lovable.viveq",
  appName: "VIVEQ",
  webDir: "public",
  server: {
    url: "https://id-preview--defb761d-6492-49b5-aee1-7ff904181182.lovable.app",
    cleartext: false,
  },
  backgroundColor: "#1c1c20",
  ios: {
    contentInset: "always",
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;
