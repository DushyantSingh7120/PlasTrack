# PlastiTrack Implementation Plan (Updated)

We are building a React-based web application to track daily plastic usage. **We have removed the AI Scanner** to ensure 100% reliability, zero API cost limits, and to keep the project strictly focused on tracking and behavior change (Topic 13), rather than bleeding into the AI Classification topic (Topic 3).

## User Review Required
> [!IMPORTANT]
> **External Accounts Needed**
> 1. **Firebase**: We will need a Firebase project for the database. I will write all the code, but you will need to go to the Firebase Console, create a free project, enable **Firestore** and **Anonymous Authentication**, and paste the config keys here later.
> *(Note: The Gemini API key requirement has been completely removed!)*

## Proposed Changes

### 1. Project Initialization
- Scaffold a new React project using Vite.
- Install Tailwind CSS for modern, clean, eco-themed styling (Forest Green & Warm Amber).
- Install dependencies: `firebase`, `react-router-dom` (for navigation), `lucide-react` (for icons), `recharts` (for charts), and `framer-motion` (for mind-blowing animations).

### 2. Frontend Architecture (The 4 Screens)
- **Home / Dashboard**: Displays a rotating Fact-of-the-Day, today's summary, and an animated 7-day bar chart showing plastic consumption.
- **Log Plastic**: Quick-add buttons (Bottle, Bag, Wrapper, Straw, Packaging, Cutlery, Other) with satisfying spring animations.
- **Eco-Alternatives Catalog (Replaces AI Scanner)**: A visually stunning, swipeable 3D-like carousel built with Framer Motion. It shows common plastic items on one side, and when you swipe/flip the card, it reveals the sustainable alternative, cost savings, and environmental impact.
- **Weekly Insights**: A dedicated screen that calculates the user's worst plastic category and provides specific, actionable reduction tips.

### 3. Database Schema (Firebase Firestore)
We will use a simple, flat NoSQL structure:
```
plasticLogs (collection)
  └── {logId} (document)
        userId: string (from Anonymous Auth)
        category: string (e.g., "Bottle")
        quantity: number
        grams: number
        timestamp: date
```

## Verification Plan
1. I will run the local development server (`npm run dev`).
2. We will verify the Framer Motion animations are smooth and the UI looks premium.
3. We will log a dummy item and check if the Dashboard chart updates via Firebase.
4. Once verified locally, we will prepare the repository for Vercel deployment.
