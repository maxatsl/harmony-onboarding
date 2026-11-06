# Harmony — quiz and product prototype

**Keep strong and harmonize your life.**
A strength and protein plan for women in menopause, on GLP-1 or not.

Built for the Zimran IT School Capstone (Zero to One). No backend, no build step: static HTML
with inline CSS and vanilla ES5. Fonts: Newsreader and Inter from Google Fonts.

## Two links

| Link | What it is |
|---|---|
| **`/`** — https://harmony-onboarding.vercel.app | **The quiz** (where the Meta ad lands): goal → pain → body numbers → projected date → plan → paywall |
| **App** — https://harmony-plan-app.vercel.app | **The product** (what she gets after paying): day-1 strength test, daily plan, weekly re-test, 2-week report |
| `/landing` | Brand landing page; its CTAs go to the quiz |

The app is the `app/` folder, deployed as its own Vercel project (`harmony-plan-app`). The old `/app` path on the quiz
domain redirects there. The app is on another domain, so the quiz passes her answers in the link (`#p=<base64 JSON>`);
the app stores them and clears the link. Opened on its own, the app runs on a demo profile.

## The quiz (`index.html`)

Rebuilt after the 06.11 mentor sync on the pattern of Noom's weight-loss quiz (noom.com/lp/weightLossGoal):
the biggest pain comes first, and a projected goal date is the engine that keeps her answering.

| # | Screen | Why |
|---|---|---|
| 1 | How much weight do you want to lose? (or "I want to get stronger") | The pain she came with. Matches the "Tap your goal weight" ads |
| 2 | Since your 40s, what has changed the most? (multi-select) | Second pain: belly, stalled scale, strength, fatigue, sleep, mood |
| ↳ | "It's not your willpower" (SWAN study) | Reframes the problem as muscle, not food |
| 3–6 | Age, height, current weight, goal weight (healthy-BMI floor) | Noom's order. A goal below BMI 18.5 is blocked |
| ↳ | **First estimate:** "You could reach X lb by [date]" + chart | Noom's projection. Pace held at 0.5–1 lb a week |
| 7–8 | Menopause stage, GLP-1 (+ medication, + last dose if stopping) | Branching. GLP users see the STEP-1 lean-mass teaser |
| 9–10 | Strength training now, typical breakfast | Feed the protein target; breakfast teaser on spreading protein |
| ↳ | Build loader with per-section bars and one pop-up question (joint pain) | Noom-style "your plan is being computed" |
| ↳ | Email gate → **final date, N weeks sooner** → protein target, 14-day calendar | Payoff before the paywall |
| ↳ | Paywall → **Apple Pay sheet (mock, Face ID)** → "Payment successful" with fireworks | The purchase moment |
| ↳ | One-time $39.99 upsell picked by quiz branch (GLP / last shot / menopause) → create account → Open the Harmony app | Upsell from `harmony-upsells.md`; hand-off to the app |

Review shortcut: `/#s=<screen>` opens one screen with sample answers
(`quiz`, `why`, `projection`, `build`, `lead`, `result`, `paywall`, `success`, `upsell`, `account`, `done`). Add `?dev` to show the analytics events log.

## The product (`app/index.html`)

- **First open:** a 5-minute home strength test (chair stands, stairs, carry) → Strength Score baseline.
- **Today:** day N of 14, the day's 20-minute session (joint-friendly version if she said so in the quiz), protein ring with
  one-tap foods, a 1-tap check-in (energy, hot flashes, sleep), and for GLP-1 users an "injection day" switch that turns
  the day light without breaking the streak. Re-test cards on day 7 and 14.
- **Progress:** Strength Score by week, protein days hit, sessions, symptom trend; on day 14, the report for her doctor (print/PDF).
- **Plan:** what the quiz set up, and what happens after day 14.
- Demo controls: **Next day ›** moves through the 14 days; **Progress → Demo: fill 14 days** loads sample data.

## Sources behind the teasers

| Teaser | Claim | Source |
|---|---|---|
| After Q2 | During the menopause transition the rate of fat gain doubles and lean mass declines | Greendale et al., JCI Insight 2019, SWAN, n=1,246 |
| After GLP-1 (users only) | Body weight −15.0%, lean body mass −9.7% at 68 weeks | Wilding et al., NEJM 2021, STEP-1 DXA substudy, n=140 |
| After breakfast | 24-hour muscle protein synthesis 25% higher with even protein distribution | Mamerow et al., J Nutr 2014, crossover, n=8 |

Projected dates are estimates at 0.5–1 lb a week and are labelled as such. Not medical advice.
Payments, email and the PDF report are mocked.
