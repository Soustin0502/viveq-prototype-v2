# VIVEQ Prototype Demo

Create a high-fidelity, clickable mobile-first UI/UX prototype for VIVEQ, an early-stage privacy-first AI fraud-protection startup.

IMPORTANT: UI/UX PROTOTYPE ONLY. Do not build backend logic, AI models, APIs, databases, authentication, OCR, speech recognition, Android integrations, or real call interception. All analysis shown in the prototype is simulated.

BRAND

VIVEQ

Derived from Sanskrit Viveka (विवेक) — discernment: the ability to distinguish what is genuine from what is deceptive.

Tagline: See through deception.

Positioning: Privacy-first AI protection against digital fraud.

VISUAL STYLE

Create a premium, minimal cybersecurity/AI product aesthetic.

Dark near-black background

Off-white typography

Subtle borders and surfaces

Restrained accent colour

Green = Low

Yellow = Caution

Orange = Suspicious

Red = Critical

Modern geometric sans-serif

Excellent spacing and typography

Minimal, sophisticated, trustworthy

No cyberpunk, hacker imagery, excessive neon, cartoon shields, government-portal styling, or excessive glassmorphism

The UI should feel like a serious consumer security startup.

CORE USER FLOW

Build this clickable flow:

Home → Start Simulation → Incoming Call → Live Analysis → Risk Escalation → Critical Warning → Verify / Disconnect / Report

SCREENS

1. HOME

VIVEQ
● Protection Active

Headline:

You're protected.

Supporting text explaining that VIVEQ is designed to identify suspicious patterns across conversations, screens and behaviour.

Primary CTA:

Start Simulation

Secondary:

How It Works

Show three capabilities:

Audio — Speech analysis
Screen — OCR + visual analysis
Behaviour — Pattern detection

Small privacy message:

Designed around privacy
On-device analysis · Minimal retention · User-controlled sharing

2. SIMULATION

Title:

See VIVEQ in action.

Explain that this is a controlled demonstration of how multiple scam indicators combine into a risk assessment.

Scenario:

Digital Arrest Scam

CTA:

Start Simulation

Clearly label:

CONTROLLED SIMULATION

3. INCOMING CALL

Show a fictional incoming call:

Government Authority
Unknown number

Buttons:

Decline / Accept

After Accept, continue automatically.

4. LIVE ANALYSIS

Show a simulated conversation with a live analysis panel.

Progressively reveal these statements:

1. “I am calling regarding an investigation involving your identity.”

→ Criminal allegation detected
→ Risk: 18 / 100 — LOW

2. “I am calling from a government investigation department.”

→ Government impersonation detected
→ Risk: 37 / 100 — CAUTION

3. “Do not disconnect this call or contact anyone.”

→ Digital confinement + social isolation detected
→ Risk: 68 / 100 — SUSPICIOUS

4. “Transfer ₹5,00,000 for verification.”

→ Financial demand detected
→ Risk: 94 / 100 — CRITICAL

Animate the risk score through:

18 → 37 → 68 → 94

5. DETECTION DETAILS

Title:

Why is VIVEQ concerned?

Show three sections:

AUDIO

Government impersonation — 93%

Criminal allegation — 86%

Financial demand — 99%

BEHAVIOUR

Do not disconnect — 97%

Social isolation — 91%

SCREEN

Suspicious financial instruction — 95%

Then show:

MULTIMODAL RISK ENGINE
94 / 100 — CRITICAL

Explanation:

Multiple independent scam indicators occurring together increase the assessed risk.

6. CRITICAL WARNING

Make this the strongest screen.

● CRITICAL RISK

POSSIBLE DIGITAL ARREST SCAM

94 / 100

VIVEQ detected multiple high-risk indicators associated with government impersonation and financial fraud.

Detected:

✓ Government impersonation
✓ Criminal allegation
✓ Digital confinement
✓ Social isolation
✓ Financial demand

Safety guidance:

Do not transfer money.
Do not share OTPs, passwords or banking credentials.
Verify the caller independently.

Actions:

DISCONNECT
VERIFY
REPORT

7. VERIFY

Title:

Verify Interaction

Claimed authority:

Government Investigation Department

Status:

⚠ Not Independently Verified

Show detected indicators and:

Verification Result — HIGH RISK

Guidance:

Never verify an authority using contact information supplied by the caller.

CTA:

Return to Warning

8. REPORT

Title:

Report Incident

Show:

Digital-arrest scam
Risk: 94 / 100
Detected indicators
Simulated timestamp

Privacy statement:

Evidence sharing requires your consent.

Buttons:

Share Incident
Not Now

9. PRIVACY CENTER

Title:

Your data stays under your control.

Show:

Audio — Designed for local analysis
Screen — Temporary analysis
Raw recordings — Not retained by default
Cloud sharing — Off by default
Evidence — User controlled

Label this:

PROPOSED ARCHITECTURE

Do not imply these capabilities are currently implemented.

10. HOW IT WORKS

Create one simple architecture diagram:

Audio → Speech/NLP
Screen → OCR/Visual Analysis
Behaviour → Event Detection

↓

Multimodal Risk Engine

↓

Explainable Risk Score

↓

User Warning

Caption:

AI identifies signals. Rules interpret combinations. VIVEQ explains the risk.

PROTOTYPE REQUIREMENTS

Make the prototype genuinely clickable.

Implement only the essential interactions:

Home → Simulation
Simulation → Incoming Call
Accept → Live Analysis
Live Analysis → escalating risk
Critical → Warning
Warning → Verify / Report / Disconnect
Home → Privacy / How It Works

Use subtle transitions and risk-score animation.

Create reusable components and four risk states:

LOW / CAUTION / SUSPICIOUS / CRITICAL

Keep the number of screens and components focused. Prioritize polish, consistency, usability and the main demonstration flow over adding extra features.

The finished result should communicate VIVEQ within 30 seconds:

Something suspicious happens → VIVEQ notices → risk increases → VIVEQ explains why → the user remains in control.

Use this DESIGN.md for designing the UI Theme.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://viveq-discernment-tool.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0cb82ab6-0e59-4ff3-9439-4d0b902665ce).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
