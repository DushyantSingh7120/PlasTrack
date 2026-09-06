# 🎨 Application Performance Monitoring & Error Tracking Software | Sentry

> Application performance monitoring for developers & software teams to see errors clearer, solve issues faster & continue learning continuously. Get started at sentry.io.

## 1. Colors

The color system is defined by scales from 50 (lightest) to 950 (darkest), alongside semantic colors for specific intents.

### Primary

| Shade | Hex | Token Variable |
|-------|-----|----------------|
| 50 | `#f6f5fa` | `--color-primary-50` |
| 100 | `#eeeaf5` | `--color-primary-100` |
| 200 | `#d7cfe8` | `--color-primary-200` |
| 300 | `#b9a9da` | `--color-primary-300` |
| 400 | `#8f76c7` | `--color-primary-400` |
| 500 | `#6d4db2` | `--color-primary-500` |
| 600 | `#5b4196` | `--color-primary-600` |
| 700 | `#4a3479` | `--color-primary-700` |
| 800 | `#39285d` | `--color-primary-800` |
| 900 | `#2d2244` | `--color-primary-900` |
| 950 | `#1f1633` | `--color-primary-950` |

### Secondary

| Shade | Hex | Token Variable |
|-------|-----|----------------|
| 50 | `#f6f5fa` | `--color-secondary-50` |
| 100 | `#eeebf4` | `--color-secondary-100` |
| 200 | `#d7d0e6` | `--color-secondary-200` |
| 300 | `#baadd7` | `--color-secondary-300` |
| 400 | `#917bc1` | `--color-secondary-400` |
| 500 | `#6f53ac` | `--color-secondary-500` |
| 600 | `#5e4690` | `--color-secondary-600` |
| 700 | `#4c3975` | `--color-secondary-700` |
| 800 | `#3a2b59` | `--color-secondary-800` |
| 900 | `#2e2442` | `--color-secondary-900` |
| 950 | `#181225` | `--color-secondary-950` |

### Accent

| Shade | Hex | Token Variable |
|-------|-----|----------------|
| 50 | `#f3f0fe` | `--color-accent-50` |
| 100 | `#e7e2fd` | `--color-accent-100` |
| 200 | `#c8bbfb` | `--color-accent-200` |
| 300 | `#9d85ff` | `--color-accent-300` |
| 400 | `#7553ff` | `--color-accent-400` |
| 500 | `#3300ff` | `--color-accent-500` |
| 600 | `#2b00d6` | `--color-accent-600` |
| 700 | `#2300ad` | `--color-accent-700` |
| 800 | `#1b0085` | `--color-accent-800` |
| 900 | `#19085e` | `--color-accent-900` |
| 950 | `#10053d` | `--color-accent-950` |

### Neutral

| Shade | Hex | Token Variable |
|-------|-----|----------------|
| 50 | `#ffffff` | `--color-neutral-50` |
| 100 | `#f0f0f0` | `--color-neutral-100` |
| 200 | `#dbdbdb` | `--color-neutral-200` |
| 300 | `#c2c2c2` | `--color-neutral-300` |
| 400 | `#9e9e9e` | `--color-neutral-400` |
| 500 | `#808080` | `--color-neutral-500` |
| 600 | `#6b6b6b` | `--color-neutral-600` |
| 700 | `#575757` | `--color-neutral-700` |
| 800 | `#424242` | `--color-neutral-800` |
| 900 | `#333333` | `--color-neutral-900` |
| 950 | `#212121` | `--color-neutral-950` |

### Semantic Intents

| Intent | Hex | Token Variable |
|--------|-----|----------------|
| Success | `#22c55e` | `--color-success` |
| Warning | `#f59e0b` | `--color-warning` |
| Error   | `#ef4444` | `--color-error` |

## 2. Typography

### Font Families

- **Sans (Body):** `Rubik, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol`
- **Display (Headings):** `Rubik`
- **Mono (Code):** `Monaco`

### Font Sizes

| Scale | Value | Token Variable |
|-------|-------|----------------|
| xs | `0.75rem` | `--font-size-xs` |
| sm | `0.875rem` | `--font-size-sm` |
| base | `1rem` | `--font-size-base` |
| lg | `1.25rem` | `--font-size-lg` |
| xl | `1.688rem` | `--font-size-xl` |
| 2xl | `1.875rem` | `--font-size-2xl` |
| 3xl | `3.75rem` | `--font-size-3xl` |
| 4xl | `5.5rem` | `--font-size-4xl` |

### Font Weights

| Name | Weight | Token Variable |
|------|--------|----------------|
| normal | `400` | `--font-weight-normal` |
| medium | `500` | `--font-weight-medium` |
| semibold | `600` | `--font-weight-semibold` |
| bold | `700` | `--font-weight-bold` |

## 3. Spacing & Sizing

| Scale | Value | Token Variable |
|-------|-------|----------------|
| 0 | `0` | `--spacing-0` |
| 1 | `0.125rem` | `--spacing-1` |
| 2 | `0.5rem` | `--spacing-2` |
| 3 | `0.75rem` | `--spacing-3` |
| 4 | `1rem` | `--spacing-4` |
| 5 | `1.25rem` | `--spacing-5` |
| 6 | `1.5rem` | `--spacing-6` |
| 8 | `2rem` | `--spacing-8` |
| 20 | `5rem` | `--spacing-20` |

## 4. Borders & Shadows

### Border Radius

| Name | Value | Token Variable |
|------|-------|----------------|
| none | `0` | `--radius-none` |
| sm | `0.5rem` | `--radius-sm` |
| md | `0.625rem` | `--radius-md` |
| lg | `0.75rem` | `--radius-lg` |
| xl | `0.75rem` | `--radius-xl` |
| 2xl | `1rem` | `--radius-2xl` |
| full | `9999px` | `--radius-full` |

### Shadows

| Name | Value | Token Variable |
|------|-------|----------------|
| sm | `rgba(0, 0, 0, 0.1) 0px 1px 3px 0px inset` | `--shadow-sm` |
| md | `rgba(0, 0, 0, 0.2) 0px 1px 3px 0px` | `--shadow-md` |
| lg | `rgba(0, 0, 0, 0.15) 0px 2px 10px 0px inset` | `--shadow-lg` |
| xl | `rgba(0, 0, 0, 0.08) 0px 2px 8px 0px` | `--shadow-xl` |
