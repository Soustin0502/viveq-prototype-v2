# VIVEQ mobile app (Android + iOS)

VIVEQ now ships a native shell built with [Capacitor](https://capacitorjs.com).
The native app renders the same VIVEQ screens inside a full-screen native
WebView, with status-bar / home-indicator safe areas handled by the UI.

## One-time setup (on your own machine)

Android needs Android Studio + JDK 17; iOS needs a Mac with Xcode.

```bash
git clone <your repo> && cd <your repo>
npm install

# point the shell at your deployed app
# (edit server.url in capacitor.config.ts — published URL for release builds)

npx cap add android
npx cap add ios
npx cap sync
```

## Run on a device / emulator

```bash
npx cap run android
npx cap run ios
```

## After changing capacitor.config.ts or plugins

```bash
npx cap sync
```

## Store builds

- Android: `npx cap open android` → Build > Generate Signed Bundle (AAB) → Play Console.
- iOS: `npx cap open ios` → set signing team → Product > Archive → App Store Connect.

Before submitting, set `server.url` in `capacitor.config.ts` to your published
`*.lovable.app` (or custom) domain and add app icons / splash screens in the
generated `android/` and `ios/` projects.
