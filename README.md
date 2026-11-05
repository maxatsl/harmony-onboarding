# Harmony — onboarding prototype

**Keep strong and harmonize your life.**
A strength and protein plan for women in menopause, on GLP-1 or not.

A clickable prototype of Harmony's first session, from the ad click to the 2-week report.
Built for the Zimran IT School Capstone (Zero to One). No backend, no build step: one HTML file
with inline CSS and vanilla ES5. Fonts: Newsreader and Inter from Google Fonts.

## Running it

Open `index.html` in a browser. Nothing to install.

Review shortcut: `index.html#s=<screen>` opens one screen with sample answers
(`hook`, `quiz`, `teaser`, `result`, `lead`, `paywall`, `test`, `chair`, `score`, `report`).

## The flow

| Stage | Screens | What it proves |
|---|---|---|
| Hook | Menopause-first headline, photo, slogan | The ad promise, kept on the first screen |
| Quiz | 7–9 questions, branching on GLP-1 status | No GLP-1: 7 questions. On GLP-1: + medication and two evidence teasers. Stopping or stopped: + date of the last dose |
| Plan | Build animation → result | Protein target in grams, lean-mass risk band, 14-day calendar — all computed from the answers, before the paywall |
| Paywall | Email → plans | $129.99 / year or $14.99 for the first 4 weeks, then $29.99 / 4 weeks. One-tap cancel |
| Aha (after payment) | 3-part home strength test → Strength Score | The baseline she re-tests every week |
| Report | Sample day-14 report | The tangible 2-week result, shareable with her doctor. Days 7 and 14 are illustrative |

Two overlays in the top bar expose the thinking behind the screens:

- **Events** — the analytics log. The optimisation target is `QuizComplete`, not Purchase,
  because Meta restricts lower-funnel events for health-classified data sources.
- **Drives** — the Octalysis core drive each screen leans on. Loss aversion is deliberately withheld.

## Design

Style "Olive field", built on the Oura design-system analysis (warm paper, thin serif display,
earth fields) with forest green as the single action colour. Photos in `assets/` are AI-generated
(Gemini, Nano Banana 2) from the prompts in `assets/PROMPTS.md`.

## Sources behind the teasers

| Teaser | Claim | Source |
|---|---|---|
| After Q1 (GLP-1 users) | 22% of US adults aged 50–64 currently take a GLP-1 | KFF Health Tracking Poll, 27 Oct – 2 Nov 2025 |
| After menopause (GLP-1 users) | Body weight −15.0%, lean body mass −9.7% at 68 weeks | Wilding et al., NEJM 2021, STEP-1 DXA substudy, n=140 |
| After breakfast | 24-hour muscle protein synthesis 25% higher with even protein distribution | Mamerow et al., J Nutr 2014, crossover, n=8 |

Not medical advice. Payments, email, photo logging and the PDF report are mocked.
