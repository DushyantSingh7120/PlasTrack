/**
 * PlastiTrack Standardized Plastic Telemetry & Resin Data
 * Sourced from CPCB, BIS standards, and municipal sorting audits in India.
 */

export const RESIN_CODES = [
  {
    code: 1,
    symbol: "♳",
    shortName: "PET",
    fullName: "Polyethylene Terephthalate",
    recyclable: true,
    indianMRFRate: "~75% Recycled",
    decompositionYears: 450,
    commonItems: ["500ml/1L Water Bottles", "Soda Bottles", "Cooking Oil Jars"],
    chemicalNotes: "Can release antimony trioxide if exposed to high ambient heat (>40°C). Highly mechanically recyclable into polyester yarn."
  },
  {
    code: 2,
    symbol: "♴",
    shortName: "HDPE",
    fullName: "High-Density Polyethylene",
    recyclable: true,
    indianMRFRate: "~65% Recycled",
    decompositionYears: 400,
    commonItems: ["Milk Pouches/Jugs", "Shampoo Bottles", "Engine Oil Containers"],
    chemicalNotes: "High strength-to-density ratio. Safe, stable polymer chain; readily granulated and re-extruded into pallets."
  },
  {
    code: 3,
    symbol: "♵",
    shortName: "PVC",
    fullName: "Polyvinyl Chloride",
    recyclable: false,
    indianMRFRate: "<5% Recycled",
    decompositionYears: 500,
    commonItems: ["Pipes", "Cable Insulation", "Faux Leather", "Blister Packaging"],
    chemicalNotes: "Contains high chlorine content and heavy metal stabilizers. Releases dangerous dioxins and hydrochloric acid when incinerated."
  },
  {
    code: 4,
    symbol: "♶",
    shortName: "LDPE",
    fullName: "Low-Density Polyethylene",
    recyclable: true,
    indianMRFRate: "~30% Recycled",
    decompositionYears: 300,
    commonItems: ["Carry Bags (>120µm)", "Squeeze Bottles", "Bread Bags", "Bubble Wrap"],
    chemicalNotes: "Thin films (<50µm) are economically non-viable for informal waste pickers. 120-micron statutory minimum rule allows collection."
  },
  {
    code: 5,
    symbol: "♷",
    shortName: "PP",
    fullName: "Polypropylene",
    recyclable: true,
    indianMRFRate: "~40% Recycled",
    decompositionYears: 400,
    commonItems: ["Food Takeaway Containers", "Medicine Bottles", "Bottle Caps", "Straws"],
    chemicalNotes: "High thermal tolerance (microwaveable). Good chemical resistance. Frequently used for reusable containers."
  },
  {
    code: 6,
    symbol: "♸",
    shortName: "PS / EPS",
    fullName: "Polystyrene / Thermocol",
    recyclable: false,
    indianMRFRate: "<2% Recycled",
    decompositionYears: 500,
    commonItems: ["Disposable Foam Cups", "Thermocol Packaging", "CD Cases", "Plastic Cutlery"],
    chemicalNotes: "Extremely low bulk density (95% air) makes transport prohibitively expensive for recyclers. Highly brittle, fragments easily into microplastics."
  },
  {
    code: 7,
    symbol: "♹",
    shortName: "OTHER / MLP",
    fullName: "Multi-Layered Plastics / Polycarbonate / Acrylic",
    recyclable: false,
    indianMRFRate: "0% Mechanically (Kiln co-processing only)",
    decompositionYears: 1000,
    commonItems: ["Chips/Namkeen Pouches", "Shampoo Sachets", "Tetra Pak Poly-Al", "E-Commerce Mailers"],
    chemicalNotes: "Bonded aluminium foil and multi-polymer layers. Cannot be flaked or separated. Primary contributor to urban drainage blockage."
  }
];

export const STANDARDIZED_ITEMS = [
  {
    id: "pet_bottle_500",
    name: "500ml Water Bottle",
    resinCode: 1,
    resin: "PET #1",
    category: "Beverages",
    unitGrams: 12,
    retailCostINR: 20,
    degradationYears: 450,
    hazardIndex: "Medium",
    replacesDailyCount: 1,
    annualCostSpent: 7300,
    annualGrams: 4380
  },
  {
    id: "pet_bottle_1000",
    name: "1000ml (1L) Packaged Bottle",
    resinCode: 1,
    resin: "PET #1",
    category: "Beverages",
    unitGrams: 24,
    retailCostINR: 20,
    degradationYears: 450,
    hazardIndex: "Medium",
    replacesDailyCount: 1,
    annualCostSpent: 7300,
    annualGrams: 8760
  },
  {
    id: "ldpe_carry_bag",
    name: "Polyethylene Carry Bag",
    resinCode: 4,
    resin: "LDPE #4",
    category: "Packaging",
    unitGrams: 5,
    retailCostINR: 5,
    degradationYears: 100,
    hazardIndex: "High",
    replacesDailyCount: 2,
    annualCostSpent: 3650,
    annualGrams: 3650
  },
  {
    id: "mlp_chips_pouch",
    name: "Snack / Chip Wrapper (MLP)",
    resinCode: 7,
    resin: "MLP #7",
    category: "Packaging",
    unitGrams: 4,
    retailCostINR: 20,
    degradationYears: 500,
    hazardIndex: "Severe (Non-recyclable)",
    replacesDailyCount: 2,
    annualCostSpent: 14600,
    annualGrams: 2920
  },
  {
    id: "takeout_pp_container",
    name: "Food Delivery Container",
    resinCode: 5,
    resin: "PP #5",
    category: "Foodware",
    unitGrams: 20,
    retailCostINR: 10,
    degradationYears: 450,
    hazardIndex: "Medium",
    replacesDailyCount: 1,
    annualCostSpent: 3650,
    annualGrams: 7300
  },
  {
    id: "plastic_straw",
    name: "Plastic Straw / Stirrer",
    resinCode: 5,
    resin: "PP #5",
    category: "Foodware",
    unitGrams: 0.8,
    retailCostINR: 2,
    degradationYears: 200,
    hazardIndex: "High (Marine Ingestion)",
    replacesDailyCount: 1,
    annualCostSpent: 730,
    annualGrams: 292
  },
  {
    id: "plastic_cutlery_fork",
    name: "Single-Use Plastic Cutlery",
    resinCode: 6,
    resin: "PS #6",
    category: "Foodware",
    unitGrams: 5,
    retailCostINR: 3,
    degradationYears: 400,
    hazardIndex: "High",
    replacesDailyCount: 1,
    annualCostSpent: 1095,
    annualGrams: 1825
  },
  {
    id: "ecommerce_mailer",
    name: "E-Commerce Courier Mailer",
    resinCode: 4,
    resin: "LDPE #4",
    category: "Packaging",
    unitGrams: 15,
    retailCostINR: 10,
    degradationYears: 300,
    hazardIndex: "Medium",
    replacesDailyCount: 0.5,
    annualCostSpent: 1825,
    annualGrams: 2737
  }
];
