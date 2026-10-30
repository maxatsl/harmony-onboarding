# HARMONY — onboarding prototype

A clickable prototype of the first session of HARMONY, a GLP-1 nutrition and strength
companion for women 40+ in menopause. It runs from the ad click through to the first
logged meal: 20 screens, no backend, no build step.

Coursework for a product-management course on digital B2C subscription products
(Homework 2, part 2 of 3).

## Running it

Open `index.html` in a browser. There is nothing to install and nothing to build —
the whole thing is one self-contained HTML file with inline CSS and vanilla ES5.
The only external dependency is the Manrope webfont from Google Fonts.

## What it does

The quiz result is computed, not canned. Seven answers plus a body weight feed a
protein-target heuristic, so running it twice with different answers gives different
numbers. Two overlays in the top bar expose the thinking behind the screens:

- **Drives** labels every screen with the Octalysis core drive it leans on.
- **Events** shows the analytics event log and which event is the optimization target.

## The flow

| # | Screen |
|---|---|
| 1 | Hook |
| 2–12 | Seven quiz questions with four teasers between them |
| 13 | Magic page — a ring counts to 100% while the plan is built |
| 14 | Result — the proof moment, before the paywall |
| 15 | Email capture |
| 16 | Paywall |
| 17 | Next injection date |
| 18 | First meal |
| 19 | Scored — the aha moment, after the paywall |
| 20 | Loop close |

The split between screen 14 and screen 19 is deliberate: the result justifies paying,
the scored meal proves she can do it. They move different metrics.

## Sources behind the teasers

| Teaser | Claim | Source |
|---|---|---|
| After Q1 | 22% of US adults aged 50–64 currently take a GLP-1 | KFF Health Tracking Poll, fielded 27 Oct – 2 Nov 2025 |
| After Q3 | Body weight −15.0%, lean body mass −9.7% at 68 weeks | Wilding et al., NEJM 2021, STEP-1 DXA substudy, n=140 |
| After Q5 | 24-hour muscle protein synthesis 25% higher on even protein distribution | Mamerow et al., J Nutr 2014, crossover, n=8 |
| After Q6 | — | Shows the product's own scoring card |

The Q5 teaser separates the study from the product decision: putting the target on the
morning rather than only spreading it evenly is HARMONY's choice, and the screen says so.

## What is mocked

Photo recognition, payment, accounts, email delivery and any backend. The protein
target is a transparent heuristic written for this prototype, **not a clinical
algorithm**, and it would need review by a qualified professional before anything real
ships. Nothing here is medical advice.

## Deploying

Any static host. For Vercel:

```bash
npx vercel@latest deploy --prod
```

`vercel.json` sets `X-Robots-Tag: noindex`, so the prototype stays out of search results.
