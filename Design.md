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

.bg-mesh-bottom {
  background-image: 
    linear-gradient(rgba(229, 228, 216, 0), rgb(229, 228, 216) 80%), 
    linear-gradient(120deg, rgb(247, 191, 163) 10%, rgb(230, 179, 230) 40%, rgb(163, 216, 247) 75%, rgb(123, 231, 231));
}
```

---

## 3. Typography Hierarchy

| Role | Font Family | Fallbacks | Weight Scales | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- |
| **Display & Headings** | `'Mona Sans'` | `sans-serif` | Bold (700), SemiBold (600) | `tracking-tight` (`-0.025em`) |
| **Body & UI Interface** | `'Inter'` | `-apple-system, sans-serif` | Regular (400), Medium (500) | Normal (`0`) |
| **Telemetry, Data & Code**| `'Geist Mono'` | `'Fira Code', monospace` | Medium (500), Bold (700) | `tracking-wider` (`0.05em`) |

### Typographic Scale

- **Display Hero (H1):** `48px – 68px` / `line-height: 1.08` / Font: `Mona Sans Bold`
- **Section Heading (H2):** `28px – 36px` / `line-height: 1.2` / Font: `Mona Sans Bold`
- **Card Heading (H3):** `18px – 20px` / `line-height: 1.3` / Font: `Mona Sans SemiBold`
- **KPI Metric Value:** `30px – 36px` / `line-height: 1` / Font: `Geist Mono Bold`
- **Body Large:** `16px – 18px` / `line-height: 1.6` / Font: `Inter Regular`
- **Body Base:** `14px` / `line-height: 1.5` / Font: `Inter Regular`
- **Telemetry Tag / Badge:** `10px – 12px` / `line-height: 1.2` / Font: `Geist Mono Medium Uppercase`

---

## 4. Component Architectural Specs

### 1. Infrastructure Card (`.infra-card`)
- **Background:** `#ffffff` with optional `backdrop-blur-xl` at `90% – 95%` opacity.
- **Border:** `1px solid #cfcdc1` (Hairline).
- **Corner Radius:** `16px` (`rounded-xl` or `rounded-2xl`).
- **Shadow:** `0 4px 20px -2px rgba(14, 30, 23, 0.05)`.
- **Hover State:** `translateY(-2px)`, border transitions to `#1b4332`, shadow expands to `0 12px 30px -4px rgba(14, 30, 23, 0.1)`.

### 2. Live Telemetry Ribbon
- **Container:** Full-bleed horizontal ticker bar.
- **Background:** `rgba(0, 0, 0, 0.02)` on stone `#e5e4d8`.
- **Border:** `1px solid #cfcdc1` top and bottom.
- **Typography:** `font-mono text-xs text-muted-foreground uppercase`.
- **Live Indicator:** `h-2 w-2 rounded-full bg-emerald-500` with an outer pulsing ping ring (`animate-ping`).

### 3. Action Buttons
- **Primary Button (Console Style):**
  - Background: `#1b4332` (Forest Green).
  - Hover: `#0e1e17` (Deep Slate).
  - Text: `#ffffff` / `font-mono text-xs uppercase font-bold tracking-wider`.
  - Padding: `14px 28px`.
  - Border Radius: `10px` or `12px` (pill optional for marketing).
- **Secondary / Ghost Button:**
  - Background: `rgba(255, 255, 255, 0.8)`.
  - Border: `1px solid #cfcdc1`.
  - Text: `#0e1e17` / `font-medium text-sm`.
  - Hover: Background `#ffffff`, border `#0e1e17/40`.

### 4. Categorical Polymer Progress Meters
- **Track:** Height `8px` (`h-2`), background `#e5e4d8` (`bg-stone`), `border-radius: 9999px`.
- **Bar:** Height `100%`, smooth transition (`duration-1000 ease-out`).
- **Resin Colors:**
  - PET #1: `#1b4332`
  - HDPE #2: `#228b22`
  - PP #5: `#87ceeb`
  - Misc #7: `#718379`

---

## 5. Motion & Interaction Rules

- **Entrance Animations:** Staggered child reveals via Framer Motion:
  ```js
  staggerChildren: 0.08
  initial: { opacity: 0, y: 16 }
  animate: { opacity: 1, y: 0 }
  transition: { type: "spring", stiffness: 300, damping: 26 }
  ```
- **Live Pings:** Continuous CSS keyframe pulse on status nodes (`@keyframes ping`).
- **Interactive Hover:** Snappy micro-interactions (`duration: 0.15s – 0.25s`) on cards, buttons, and navigation rows.
- **No Unnecessary Fluff:** Zero bouncing animations without functional feedback; every motion communicates state changes, real-time stream ingestion, or hierarchy.

---

## 6. Stitch System Prompt / Instructions Block

*(Copy & paste the block below directly into Stitch or AI UI tools)*

```markdown
Role: Senior UI/UX Systems Designer & Frontend Architect.
Project: PlastiTrack Environmental Observability Platform.
Aesthetic Directive: New Relic Observability Infrastructure + Warm Stone Minimalist Canvas.

Tokens:
- Background: #e5e4d8 (Warm Stone)
- Cards & Surfaces: #ffffff with 1px solid #cfcdc1 border, radius 16px
- Text Foreground: #0e1e17
- Text Muted: #4a5c53
- Primary Brand: #1b4332 (Deep Forest)
- Telemetry Accents: #228b22 (Leaf), #008c5a (Emerald), #ea580c (Orange Alert), #87ceeb (Cyan)
- Fonts: 
  - Headings: 'Mona Sans', sans-serif (Bold, tracking-tight)
  - Body: 'Inter', sans-serif
  - Metrics / Telemetry / Numbers: 'Geist Mono', monospace (Uppercase, tracking-wider)

Layout Rules:
1. Cover full edge-to-edge desktop viewport (100vw, 100vh layout, no 16:9 phone boxing).
2. Use hairline borders (#cfcdc1) instead of heavy shadows or purple gradients.
3. Every data widget must display telemetry metadata: node ID, timestamp (e.g. 168h, 4s ago), and live status dot.
4. Chart areas must use subtle semi-transparent fills with deep emerald stroke (#1b4332).
```
