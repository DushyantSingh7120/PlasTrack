---
name: Observability Stone
colors:
  surface: '#fbfaed'
  surface-dim: '#dbdacf'
  surface-bright: '#fbfaed'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f4e8'
  surface-container: '#efeee2'
  surface-container-high: '#eae9dd'
  surface-container-highest: '#e4e3d7'
  on-surface: '#1b1c15'
  on-surface-variant: '#414844'
  inverse-surface: '#303129'
  inverse-on-surface: '#f2f1e5'
  outline: '#717973'
  outline-variant: '#c1c8c2'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#1b4332'
  on-primary-container: '#86af99'
  inverse-primary: '#a5d0b9'
  secondary: '#006c45'
  on-secondary: '#ffffff'
  secondary-container: '#8af8bc'
  on-secondary-container: '#007349'
  tertiary: '#401b1b'
  on-tertiary: '#ffffff'
  tertiary-container: '#5a302f'
  on-tertiary-container: '#d29895'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecd4'
  primary-fixed-dim: '#a5d0b9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#274e3d'
  secondary-fixed: '#8af8bc'
  secondary-fixed-dim: '#6ddba2'
  on-secondary-fixed: '#002112'
  on-secondary-fixed-variant: '#005233'
  tertiary-fixed: '#ffdad8'
  tertiary-fixed-dim: '#f5b7b4'
  on-tertiary-fixed: '#331111'
  on-tertiary-fixed-variant: '#673a39'
  background: '#fbfaed'
  on-background: '#1b1c15'
  surface-variant: '#e4e3d7'
  background-alt: '#dedcd0'
  background-dark: '#0e1e17'
  surface-card: '#ffffff'
  surface-card-muted: '#f2f1e8'
  border-primary: '#cfcdc1'
  border-subtle: '#dbd9ce'
  text-foreground: '#0e1e17'
  text-muted: '#4a5c53'
  text-subtle: '#718379'
  status-leaf: '#228b22'
  status-accent: '#ea580c'
  status-sky: '#87ceeb'
  status-sun: '#ffb300'
  status-destructive: '#dc2626'
typography:
  display-lg:
    fontFamily: Chivo
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Chivo
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Chivo
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Chivo
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Chivo
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  mono-metric-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  mono-metric-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  mono-label-sm:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-base: 1rem
  space-lg: 1.25rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 3rem
  gutter-desktop: 1.25rem
  gutter-mobile: 0.75rem
---

# 🎨 PlastiTrack Design System & Infrastructure Specification (Design.md)

> **PlastiTrack** is an enterprise-grade Environmental Observability & Telemetry Platform for real-time plastic lifecycle tracing, resin categorization, and automated ESG compliance auditing.
> Inspired by **New Relic's modern observability infrastructure**, **Grafana's gradient telemetry aesthetics**, and warm stone editorial minimalism.

---

## 1. Design Philosophy & Aesthetic Pillars

1. **Observability Infrastructure (New Relic Aesthetic):**
   - Clean, terminal-grade precision.
   - Status indicators (`● TELEMETRY: ACTIVE`, `CLUSTER_OK`), monospaced metric values, hairline dividers, and console card structures.
   - High visual contrast: Deep forest (`#1b4332`) and crisp charcoal text (`#0e1e17`) layered over a warm stone canvas.

2. **Warm Stone Foundation (`#e5e4d8`):**
   - Replaces cold sterile whites or generic dark modes with a warm, tactile, stone/linen canvas (`#e5e4d8`).
   - Cards use high-contrast white surfaces (`#ffffff`) framed by hairline borders (`#cfcdc1`).

3. **Subtle Telemetry Mesh (Grafana Gradients):**
   - Multi-layer linear pastel gradients (peach, lavender, sky, cyan) blended into `rgb(229, 228, 216)` (`#e5e4d8`) to simulate high-tech telemetry waveforms without distracting from foreground data.

4. **Information Density & Responsive Desktop Coverage:**
   - Full edge-to-edge desktop utilization (100vw, 100vh flex & grid layouts).
   - High scannability: KPIs, 7-day Area charts, polymer segregation progress meters, and cluster health ribbons.

---

## 2. Color System & Palette

### Core Canvas & Neutral Palette

| Token Variable | Hex Value | RGB / Description | Intended Role |
| :--- | :--- | :--- | :--- |
| `--color-background` | `#e5e4d8` | `rgb(229, 228, 216)` | Primary application canvas (warm stone/linen) |
| `--color-background-alt` | `#dedcd0` | `rgb(222, 220, 208)` | Secondary sections, nested console backdrops |
| `--color-background-dark` | `#0e1e17` | `rgb(14, 30, 23)` | Technical dark footer, high-contrast CTA sections |
| `--color-card` | `#ffffff` | `rgb(255, 255, 255)` | Metric cards, console widgets, telemetry tables |
| `--color-card-muted` | `#f2f1e8` | `rgb(242, 241, 232)` | Inset containers, code blocks, row hover states |
| `--color-border` | `#cfcdc1` | `rgb(207, 205, 193)` | Primary hairline border (1px solid) |
| `--color-border-subtle` | `#dbd9ce` | `rgb(219, 217, 206)` | Grid lines, internal dividers, chart axes |
| `--color-foreground` | `#0e1e17` | `rgb(14, 30, 23)` | Primary headings, KPI numbers, high-emphasis text |
| `--color-muted-foreground` | `#4a5c53` | `rgb(74, 92, 83)` | Descriptive labels, secondary links, telemetry tags |
| `--color-subtle-foreground` | `#718379` | `rgb(113, 131, 121)` | Chart axis labels, timestamp metadata, icons |

### Semantic & Brand Telemetry Palette

| Token Variable | Hex Value | Semantic Meaning | Usage Context |
| :--- | :--- | :--- | :--- |
| `--color-primary` | `#1b4332` | Deep Forest Green | Brand mark, primary action buttons, active navigation states |
| `--color-leaf` | `#228b22` | Leaf Green | Healthy telemetry signals, verified circular offset indicators |
| `--color-brand` | `#008c5a` | Emerald Observability | Active ping indicators, real-time sync badges |
| `--color-accent` | `#ea580c` | Sunset Orange | Critical anomaly thresholds, single-use consumption warnings |
| `--color-sky` | `#87ceeb` | Cyan / Sky Blue | Secondary polymer categories (Household PP #5), network tags |
| `--color-sun` | `#ffb300` | Amber Sun | Warning alerts, review-needed compliance statuses |
| `--color-destructive` | `#dc2626` | Error Crimson | Ingestion pipeline errors, critical violations |

### Background Gradients

```css
/* Grafana-inspired telemetry mesh fading into #e5e4d8 */
.bg-mesh-top {
  background-image: 
    linear-gradient(rgb(229, 228, 216) 20%, rgba(229, 228, 216, 0)), 
    linear-gradient(120deg, rgb(247, 191, 163) 10%, rgb(230, 179, 230) 40%, rgb(163, 216, 247) 75%, rgb(123, 231, 231));
}
```

---

## 3. Typography Hierarchy

- **Display & Headings**: `'Mona Sans'`, sans-serif (Bold 700, SemiBold 600, tracking-tight)
- **Body & UI Interface**: `'Inter'`, sans-serif (Regular 400, Medium 500)
- **Telemetry, Data & Code**: `'Geist Mono'`, monospace (Medium 500, Bold 700, tracking-wider, uppercase)
