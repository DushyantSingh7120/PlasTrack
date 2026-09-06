# Project References Directory

This directory categorizes all external UI/UX inspirations, design system tokens, code references, and graphic assets for **PlastiTrack**.

---

## Directory Structure

```text
references/
├── assets/          # Visual assets, reference screenshots & palettes
├── code/            # Extracted component code & tech audits
└── design/          # Extracted CSS design tokens & Tailwind themes
```

---

## 1. `references/design/` (Design Tokens & Color Systems)
Contains CSS tokens and Tailwind v4 themes extracted for this project:
- **`globals.css`**: MiroMiro-extracted design tokens featuring dark charcoal (`#080F11`), soft cream (`#F1F0E4`), and neon eco-mint (`#1CE783`), with typography tokens for Inter, Geist Mono, and Mona Sans.
- **`color-palette-1788689520623.css`**: Full CSS variable palette providing high-contrast environmental green variants (`#00CE7C`, `#2BE68B`, `#1CE783`).
- **`application-performance-monitoring-error-tracking-software-sentry.tailwind-v4.Woblo.css`**: Sentry-extracted Tailwind v4 `@theme` configuration using OKLCH color spaces.

---

## 2. `references/code/` (Functional Component & Tech References)
Contains live code samples for reference during implementation:
- **`uupm.cc-react.jsx`**: A 1,300+ line extracted React component ("EcoTrack") demonstrating sustainability calculators, dynamic metrics display, certification badges, and responsive layouts.
- **`uupm.cc-html-css.html`**: The full standalone HTML/CSS export of the EcoTrack web app.
- **`wappalyzer_uupm-cc.csv`**: Technology stack audit of the reference application (Next.js, Radix UI, shadcn/ui, Tailwind CSS, Lucide icons).

---

## 3. `references/assets/` (Visual & Graphic Assets)
- **`background-bottom.png`**: Gradient/mesh backdrop asset.
- **`pricing-menu.png`**: UI reference for card and navigation menus.
- **`application-performance-monitoring-error-tracking-software-sentry.palette.Woblo.png`**: Visual color palette swatch card.
