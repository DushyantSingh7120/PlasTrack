PlastiTrack — Product Requirements Document (PRD)
Course: CHE110 – Environmental Studies (CA1 Group Project)
Assigned Topic: Topic 13 — Plastic Usage Tracker
Section: K4P26CG
Team Members:

Ranbir Sinha (Reg: 12618592 | Roll: RK4P26CGB38) — Content, QA & Social Media Lead
Ansh Garg (Reg: 12618762 | Roll: RK4P26CGB39) — UI/UX & Stitch Design Lead
Dushyant Singh Bhati (Reg: 12619023 | Roll: RK4P26CGB40) — Technical Lead & System Architecture
1. Executive Summary & Problem Definition
1.1 The Invisibility Problem
Plastic overuse is not caused by a lack of general knowledge; the public already understands that plastic causes pollution. Instead, the issue stems from consumption invisibility:

A typical college student or household member uses 3 to 7 single-use plastic items daily (PET bottles, snack wrappers, polyethylene carry bags, straws, delivery containers).
Because these items are small, cheap, and discarded immediately, the brain does not register the cumulative personal total.
The consequence: Only ~9% of plastic ever produced is recycled; single-use bottles require ~450 years to degrade; microplastics have been found in human blood and lung tissue.
1.2 The Solution: PlastiTrack
PlastiTrack is a high-performance, mobile-first web application designed to turn invisible daily habits into quantifiable, visible data through:

Zero-friction 1-tap logging (no manual typing).
Dynamic impact quantification (weight in grams, estimated money spent in ₹, decomposition time).
Interactive Eco-Alternatives Catalog (tangible swaps for daily habits).
Research-backed daily awareness (daily rotating environmental fact database).
2. Target Audience & User Personas
Hostel & University Students: Frequently purchase packaged snacks, bottled water, and takeout food; need rapid 2-second logging without typing.
Environmentally Conscious Consumers: Desire actionable metrics on how much plastic they prevented and how much money they saved.
Evaluators / Academic Faculty: Look for strong application of Computer Science (React, NoSQL, modern UI, state management) applied meaningfully to Environmental Science (CO1, CO3, CO4).
3. Core Feature Requirements
PlastiTrack is architected around 4 dedicated, high-impact screens:


┌────────────────────────────────────────────────────────────────────────┐
│                              PLASTITRACK                               │
├─────────────────┬──────────────────┬─────────────────┬─────────────────┤
│ 1. DASHBOARD    │ 2. QUICK LOG     │ 3. ECO-CATALOG  │ 4. INSIGHTS     │
│ • Daily Fact    │ • 1-Tap Buttons  │ • 3D Flip Cards │ • 7-Day Chart   │
│ • Today's Grams │ • Custom Qty     │ • Green Swaps   │ • Worst Item    │
│ • Cost Spent (₹)│ • Instant Sync   │ • Cost Savings  │ • Action Plan   │
└─────────────────┴──────────────────┴─────────────────┴─────────────────┘
Screen 1: Home / Dashboard
Fact-of-the-Day Card: Displays a verified environmental fact rotated daily based on calendar date (sourced from our 50-fact research dossier).
Live Footprint Metrics: Today's item count, total plastic weight (grams), and estimated money spent on disposable items.
Decomposition Clock: Dynamic visual showing the centuries required for today's logged items to break down.
Quick Navigation Hero: One-click prominent button to open the Quick Log screen.
Screen 2: Quick Log Entry (Frictionless Logger)
Pre-Set Category Grid: 7 standardized single-use plastic categories:
PET Water/Soda Bottle (Average weight: 25g | Estimated cost: ₹20)
Polyethylene Carry Bag (Average weight: 5g | Estimated cost: ₹5)
Food/Snack Wrapper (Average weight: 3g | Estimated cost: ₹10)
Plastic Straw / Stirrer (Average weight: 2g | Estimated cost: ₹2)
Delivery / E-Commerce Packaging (Average weight: 15g | Estimated cost: ₹15)
Plastic Cutlery / Plate (Average weight: 6g | Estimated cost: ₹5)
Other Disposable Plastic (Average weight: 10g | Estimated cost: ₹10)
1-Tap Save: Tapping any card increments the quantity and records the entry immediately with zero text input.
Custom Adjustment: Quick + and - stepper to log multiple items simultaneously.
Screen 3: Interactive Eco-Alternatives Catalog (The Hero UI)
Replaces the unreliable/expensive AI camera with a visually stunning 3D Flip-Card Catalog powered by Framer Motion.
Front of Card: The single-use plastic item, its environmental hazard score, and decomposition lifespan.
Back of Card (on tap/flip): The sustainable alternative (e.g., Stainless Steel Bottle, Jute Tote Bag, Bamboo Cutlery, Beeswax Wrap), annual plastic savings in kg, and financial savings per year.
Screen 4: Weekly Insights & Analytics
7-Day Interactive Bar Chart: Visual breakdown of plastic consumption across Monday through Sunday.
"Worst Category" Alert: Identifies which single category contributed the highest plastic mass this week.
Tailored Action Recommendation: Generates a single, achievable weekly challenge based specifically on the user's worst category.
Impact Badge: Visual status indicator (e.g., Eco-Guardian, Conscious Reducer, Heavy Consumer).
4. Explicit Non-Goals (Deliberate Scope Boundaries)
To ensure exceptional quality, reliability, and zero runtime failures during grading, the following are deliberate non-goals:

No AI Image Classification: Avoids high API latency, rate-limit crashes during evaluation, and respects course topic boundaries (Topic 3 is AI Waste Classification; our topic is Topic 13 Usage Tracking).
No Email/Password Barriers: Eliminates friction. Uses Firebase Anonymous Authentication so users get instant per-device data persistence without sign-up forms.
No Competitive Leaderboards: Leaderboards incentivize under-reporting and falsification in sustainability apps.
5. Course Learning Outcome (CO) Alignment
CO1 (Define environmental issues): Addressed via the 50-fact research database and decomposition timeline.
CO3 (Policies, practices, reduction techniques): Addressed via the Eco-Alternatives catalog and tailored reduction challenges.
CO4 (Analyze phenomena & human relationship): Addressed via weekly consumption analytics and spending trackers.