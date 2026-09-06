# PlastiTrack — Technical Specification (Tech.md)

---

## 1. Complete Tech Stack & Dependency Matrix

| Layer | Package / Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Runtime / Bundler** | `Vite` | `^5.4.0` | Ultra-fast HMR and optimized production bundle |
| **Frontend Framework** | `React` / `React-DOM` | `^18.3.0` | Component-based UI rendering |
| **Routing** | `react-router-dom` | `^6.26.0` | Client-side tab navigation |
| **Styling** | `Tailwind CSS` + `Autoprefixer` | `^3.4.0` | Utility-first glassmorphism and mobile styling |
| **Animations** | `framer-motion` | `^11.5.0` | Spring physics, page transitions, 3D flip card |
| **Icons** | `lucide-react` | `^0.440.0` | Crisp, modern eco and UI icons |
| **Data Visualization** | `recharts` | `^2.12.0` | Responsive SVG bar chart for weekly insights |
| **Cloud Database** | `firebase` | `^10.13.0` | Firestore NoSQL & Anonymous Authentication |
| **Visual Effects** | `canvas-confetti` | `^1.9.0` | Celebration micro-interactions on logging streaks |

---

## 2. Mathematical Impact Calculation Engine

### 2.1 Standardized Weight & Cost Lookup Matrix
```javascript
export const PLASTIC_CATEGORIES = {
  bottle: {
    id: "bottle",
    name: "PET Bottle",
    avgGrams: 25,
    avgCostINR: 20,
    degradeYears: 450,
    icon: "Bottle"
  },
  bag: {
    id: "bag",
    name: "Poly Carry Bag",
    avgGrams: 5,
    avgCostINR: 5,
    degradeYears: 20,
    icon: "ShoppingBag"
  },
  wrapper: {
    id: "wrapper",
    name: "Snack / Food Wrapper",
    avgGrams: 3,
    avgCostINR: 10,
    degradeYears: 80,
    icon: "Cookie"
  },
  straw: {
    id: "straw",
    name: "Plastic Straw / Cutlery",
    avgGrams: 2,
    avgCostINR: 2,
    degradeYears: 200,
    icon: "CupSoda"
  },
  packaging: {
    id: "packaging",
    name: "Delivery Packaging",
    avgGrams: 15,
    avgCostINR: 15,
    degradeYears: 300,
    icon: "Package"
  },
  cutlery: {
    id: "cutlery",
    name: "Disposable Cutlery/Plate",
    avgGrams: 6,
    avgCostINR: 5,
    degradeYears: 100,
    icon: "Utensils"
  },
  other: {
    id: "other",
    name: "Other Plastic Waste",
    avgGrams: 10,
    avgCostINR: 10,
    degradeYears: 150,
    icon: "Sparkles"
  }
};
```

### 2.2 Calculations
*   **Total Plastic Mass**: $\text{Mass (grams)} = \sum (\text{Quantity}_i \times \text{avgGrams}_i)$
*   **Total Money Wasted**: $\text{Cost (₹)} = \sum (\text{Quantity}_i \times \text{avgCostINR}_i)$
*   **Cumulative Decomposition Hazard**: $\text{Decomposition Score} = \max(\text{degradeYears}_i)$

---

## 3. Curated Academic Research Dossier (Fact-of-the-Day Sample)

The app includes a rotating 50-fact research database to satisfy Course Outcome 1 (CO1). A sample of the sourced data:

1. *"Only ~9% of all plastic ever produced globally has been recycled; ~12% was incinerated, and ~79% accumulated in landfills or the natural environment."* — **UNEP / Geyer et al.**
2. *"A standard 500ml PET water bottle takes approximately 450 years to break down into microplastics in terrestrial environments."* — **NOAA Marine Debris Program**
3. *"India generates approximately 3.9 million tonnes of plastic waste annually according to CPCB (2022-23), with per capita consumption rising steadily."* — **Central Pollution Control Board**
4. *"Microplastic particles have now been empirically detected in human blood, lung tissue, and maternal placenta."* — **Environment International / Vethaak et al.**
5. *"Switching from disposable plastic bottles to a single stainless-steel flask prevents up to 167 plastic bottles from entering landfills each year per person."* — **EarthDay.org Global Data**

---

## 4. Environment & Secrets Management

Per project rules, sensitive credentials must never be hardcoded into source code.
*   `.env.example` (Committed to Git with placeholder values):
    ```env
    VITE_FIREBASE_API_KEY="your-api-key-here"
    VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
    VITE_FIREBASE_PROJECT_ID="your-project-id"
    VITE_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
    VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
    VITE_FIREBASE_APP_ID="your-app-id"
    ```
*   `.env.local` (Gitignored — contains the actual Firebase credentials).
