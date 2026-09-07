/**
 * Plastitrack Campus Benchmark Demo Data Module
 * Provides a standardized 7-day plastic consumption dataset
 * calibrated to typical Indian university student consumption patterns.
 */

// Generate 7 days of realistic timestamps ending today
const now = new Date();
const getPastDate = (daysAgo) => {
  const d = new Date(now);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
};

export const CAMPUS_DEMO_HISTORY = [
  {
    timestamp: getPastDate(6),
    date: new Date(Date.now() - 6 * 86400000).toLocaleDateString(),
    counts: { 'pet-bottle-500': 2, 'chai-cup': 1 },
    totalGrams: 28, // 2x12g + 4g
    totalCostINR: 29, // 2x10 + 9
    maxDecomposition: 450
  },
  {
    timestamp: getPastDate(5),
    date: new Date(Date.now() - 5 * 86400000).toLocaleDateString(),
    counts: { 'pet-bottle-1000': 1, 'snack-wrapper': 2, 'carry-bag': 1 },
    totalGrams: 38, // 24g + 2x4g + 6g
    totalCostINR: 65, // 20 + 2x20 + 5
    maxDecomposition: 450
  },
  {
    timestamp: getPastDate(4),
    date: new Date(Date.now() - 4 * 86400000).toLocaleDateString(),
    counts: { 'chai-cup': 1, 'snack-wrapper': 1, 'meal-container': 1 },
    totalGrams: 24, // 4g + 4g + 16g
    totalCostINR: 149, // 9 + 20 + 120
    maxDecomposition: 30
  },
  {
    timestamp: getPastDate(3),
    date: new Date(Date.now() - 3 * 86400000).toLocaleDateString(),
    counts: { 'pet-bottle-1000': 1, 'milk-pouch': 1, 'chai-cup': 2, 'straw': 1 },
    totalGrams: 38, // 24g + 5g + 2x4g + 1g
    totalCostINR: 76, // 20 + 34 + 2x9 + 4
    maxDecomposition: 450
  },
  {
    timestamp: getPastDate(2),
    date: new Date(Date.now() - 2 * 86400000).toLocaleDateString(),
    counts: { 'pet-bottle-1000': 2, 'meal-container': 1 }, // High consumption day (study night)
    totalGrams: 64, // 2x24g + 16g
    totalCostINR: 160, // 2x20 + 120
    maxDecomposition: 450
  },
  {
    timestamp: getPastDate(1),
    date: new Date(Date.now() - 1 * 86400000).toLocaleDateString(),
    counts: { 'milk-pouch': 1, 'chai-cup': 1, 'snack-wrapper': 1 }, // Low conscious day
    totalGrams: 13, // 5g + 4g + 4g
    totalCostINR: 63, // 34 + 9 + 20
    maxDecomposition: 300
  },
  {
    timestamp: getPastDate(0),
    date: new Date().toLocaleDateString(),
    counts: { 'pet-bottle-1000': 1, 'meal-container': 1, 'chai-cup': 1 },
    totalGrams: 44, // 24g + 16g + 4g
    totalCostINR: 149, // 20 + 120 + 9
    maxDecomposition: 450
  }
];

export const DEMO_STORAGE_KEY = 'plastitrack_history';
export const DEMO_FLAG_KEY = 'plastitrack_is_demo';
export const DEMO_EVENT_NAME = 'plastitrack-data-updated';

/**
 * Loads calibrated campus benchmark demo data into localStorage
 */
export function loadCampusDemoData() {
  try {
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(CAMPUS_DEMO_HISTORY));
    localStorage.setItem(DEMO_FLAG_KEY, 'true');
    window.dispatchEvent(new Event(DEMO_EVENT_NAME));
    window.dispatchEvent(new Event('storage'));
    return true;
  } catch (e) {
    console.error('Failed to load demo data:', e);
    return false;
  }
}

/**
 * Clears demo data from localStorage and returns to clean zero state
 */
export function clearDemoData() {
  try {
    localStorage.removeItem(DEMO_STORAGE_KEY);
    localStorage.removeItem(DEMO_FLAG_KEY);
    window.dispatchEvent(new Event(DEMO_EVENT_NAME));
    window.dispatchEvent(new Event('storage'));
    return true;
  } catch (e) {
    console.error('Failed to clear demo data:', e);
    return false;
  }
}

/**
 * Checks if current dataset in localStorage is campus demo benchmark
 */
export function isDemoDataActive() {
  try {
    return localStorage.getItem(DEMO_FLAG_KEY) === 'true';
  } catch (e) {
    return false;
  }
}
