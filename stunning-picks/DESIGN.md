# Stunning Picks Design Vault & Theme System

This vault archives the complete visual design systems, color tokens, typography, motion physics, and ready-to-use code snippets for the alternative background themes created during the PlastiTrack design process.

You can drop these themes, backgrounds, or components into any project or sub-page without starting from scratch.

---

## Catalog of Themes

| Folder | Theme Name | Mood / Genre | Best Suited For |
|---|---|---|---|
| `01-topographic-cartography/` | **Eco-Cartography Contours** | Technical, Scientific, Earthy | GIS, Environmental Dashboards, Research Platforms |
| `02-floating-flora-dandelion/` | **Living Flora & Floating Seeds** | Organic, Ethereal, Dynamic | Consumer Eco Apps, Habit Trackers, Wellness |
| `02A-ocean-shore-sea-glass/` | **Ocean Shoreline & Sea Glass** | Aquatic, Tactile, Calming | Ocean Plastic Initiatives, Marine Conservation |
| `02B-botanical-eucalyptus-dew/` | **Botanical Growth & Morning Dew** | Lush, Greenhouse, Restorative | Sustainable Agriculture, Plant Care, Green Lifestyle |
| `03-ambient-aura-glow/` | **Ambient Aura Glow** | Minimalist, Modern, Tech | Modern SaaS, Web3, Clean Productivity Tools |

---

## 1. Topographic Cartography (`01-topographic-cartography/`)
* **Palette:**
  * Base Sand: `#e5e4d8`
  * Contour Primary: `#1b4332` (20% - 40% opacity)
  * Secondary Elevation: `#8b9a89`
  * Deep Accent: `#0e1e17`
* **Typography:**
  * Heading: `Mona Sans`, `font-bold`, `-0.025em` letter spacing
  * Body: `Inter`, `font-normal`
  * Metric / Data: `Geist Mono` or `Fira Code`
* **Background Technique:**
  * Multi-layer SVG quadratic Bézier curves (`<path d="M... Q..." />`) layered over a subtle fractal noise paper grain.
* **Component Snippet:** Check [`01-topographic-cartography/ComponentSnippet.jsx`](file:///c:/Users/atuls/OneDrive/My%20Game%20Studio/Antigravity/CHE110/CA1--%20Project/stunning-picks/01-topographic-cartography/ComponentSnippet.jsx).

---

## 2. Living Flora & Floating Seeds (`02-floating-flora-dandelion/`)
* **Palette:**
  * Background Stone: `#eeebe3`
  * Leaf Emerald: `#2d5a27`
  * Fresh Sprout: `#528a47`
  * Dandelion Tuft: `#f4f2ea`
* **Motion Guidelines:**
  * Floating seeds: Framer-motion with infinite vertical drift (`y: [-10, 15, -10]`, duration: 6-8s, ease: "easeInOut").
  * Leaves: Depth-of-field blur (`filter: blur(2px)` for background layers, crisp for foreground).
* **Component Snippet:** Check [`02-floating-flora-dandelion/ComponentSnippet.jsx`](file:///c:/Users/atuls/OneDrive/My%20Game%20Studio/Antigravity/CHE110/CA1--%20Project/stunning-picks/02-floating-flora-dandelion/ComponentSnippet.jsx).

---

## 3. Ocean Shoreline & Sea Glass (`02A-ocean-shore-sea-glass/`)
* **Palette:**
  * Wet Sand: `#dedacb`
  * Sea Glass Jade: `#3a7d65`
  * Sea Foam Aqua: `#72b1a4`
  * Ocean Deep: `#0f3b30`
* **Tactile Shader / Effects:**
  * Rounded glass pebbles with `backdrop-filter: blur(8px)`, subtle white inner glow border `border-white/40`, and soft drop shadow.
* **Component Snippet:** Check [`02A-ocean-shore-sea-glass/ComponentSnippet.jsx`](file:///c:/Users/atuls/OneDrive/My%20Game%20Studio/Antigravity/CHE110/CA1--%20Project/stunning-picks/02A-ocean-shore-sea-glass/ComponentSnippet.jsx).

---

## 4. Botanical Growth & Morning Dew (`02B-botanical-eucalyptus-dew/`)
* **Palette:**
  * Pure Paper Cream: `#f5f3ec`
  * Eucalyptus Silver-Green: `#5c7c69`
  * Monstera Deep Green: `#1e3b2b`
  * Dewdrop Highlight: `#ffffff`
* **Layout Structure:**
  * Corner framing vignettes: Large botanical leaf silhouettes in top-left, bottom-right, and bottom-center, leaving the middle wide open for headline + interactive cards.
* **Component Snippet:** Check [`02B-botanical-eucalyptus-dew/ComponentSnippet.jsx`](file:///c:/Users/atuls/OneDrive/My%20Game%20Studio/Antigravity/CHE110/CA1--%20Project/stunning-picks/02B-botanical-eucalyptus-dew/ComponentSnippet.jsx).

---

## 5. Ambient Aura Glow (`03-ambient-aura-glow/`)
* **Palette:**
  * Ambient Peach: `rgba(247, 191, 163, 0.45)`
  * Ambient Mint: `rgba(163, 230, 200, 0.4)`
  * Ambient Sky: `rgba(163, 216, 247, 0.45)`
  * Base Slate Cream: `#e5e4d8`
* **CSS / Tailwind Implementation:**
  * Pure CSS radial gradients with `filter: blur(80px)` and gentle continuous CSS breathing animation.
* **Component Snippet:** Check [`03-ambient-aura-glow/ComponentSnippet.jsx`](file:///c:/Users/atuls/OneDrive/My%20Game%20Studio/Antigravity/CHE110/CA1--%20Project/stunning-picks/03-ambient-aura-glow/ComponentSnippet.jsx).
