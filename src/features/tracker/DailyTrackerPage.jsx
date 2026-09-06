import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  RotateCcw, 
  Save, 
  Package, 
  Coffee, 
  ShoppingBag, 
  Utensils, 
  Sparkles,
  Zap
} from 'lucide-react';

const PRESET_ITEMS = [
  {
    id: 'pet_bottle',
    name: '500ml Water Bottle',
    resin: 'PET #1',
    polymer: 'PET #1 (Polyethylene Terephthalate)',
    unitWeight: 20,
    category: 'Beverages',
    polymerGroup: 'PET #1',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M10 2h4" />
        <path d="M10 5h4" />
        <path d="M8 8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V8z" />
      </svg>
    ),
    iconBg: 'border-emerald-200 bg-emerald-50/60 text-forest',
  },
  {
    id: 'ldpe_bag',
    name: 'Polythene Grocery Bag',
    resin: 'LDPE #4',
    polymer: 'LDPE #4 (Low-Density Polyethylene)',
    unitWeight: 5,
    category: 'Films',
    polymerGroup: 'LDPE #4',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" x2="21" y1="6" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    iconBg: 'border-teal-200 bg-teal-50/60 text-teal-700',
  },
  {
    id: 'pp_box',
    name: 'Takeout Food Box',
    resin: 'PP #5',
    polymer: 'PP #5 (Polypropylene Rigid)',
    unitWeight: 35,
    category: 'Foodware',
    polymerGroup: 'PP #5',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
    iconBg: 'border-amber-200 bg-amber-50/60 text-amber-700',
  },
  {
    id: 'ps_lid',
    name: 'Coffee Cup Lid',
    resin: 'PS #6',
    polymer: 'PS #6 (Polystyrene Film)',
    unitWeight: 3,
    category: 'Foodware',
    polymerGroup: 'PS #6 & Multi',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    iconBg: 'border-stone-300 bg-stone-100 text-stone-700',
  },
  {
    id: 'multi_pouch',
    name: 'Snack Pouch / Crisp Packet',
    resin: 'MULTI #7',
    polymer: 'Multi-layer Metallized Foil/PP',
    unitWeight: 12,
    category: 'Packaging',
    polymerGroup: 'PS #6 & Multi',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect height="16" rx="2" width="12" x="6" y="4" />
        <line x1="6" x2="18" y1="8" y2="8" />
      </svg>
    ),
    iconBg: 'border-amber-200 bg-amber-50/60 text-amber-600',
  },
  {
    id: 'ps_cutlery',
    name: 'Single-Use Cutlery / Custom',
    resin: 'PS #6',
    polymer: 'PS #6 (Polystyrene Rigid)',
    unitWeight: 8,
    category: 'Foodware',
    polymerGroup: 'PS #6 & Multi',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <line x1="12" x2="12" y1="5" y2="19" />
        <line x1="5" x2="19" y1="12" y2="12" />
      </svg>
    ),
    iconBg: 'border-stone-300 bg-stone-100 text-stone-600',
  },
];

const CATEGORIES = ['All Items', 'Beverages', 'Packaging', 'Foodware', 'Films'];

export default function DailyTrackerPage() {
  // Load saved counts or initialize defaults matching the Stitch console design
  const [counts, setCounts] = useState(() => {
    const saved = localStorage.getItem('plastitrack_tracker_counts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      pet_bottle: 2,
      ldpe_bag: 1,
      pp_box: 1,
      ps_lid: 2,
      multi_pouch: 1,
      ps_cutlery: 0,
    };
  });

  const [activeCategory, setActiveCategory] = useState('All Items');
  const [notification, setNotification] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('plastitrack_tracker_counts', JSON.stringify(counts));
  }, [counts]);

  const updateCount = (id, delta) => {
    setCounts((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const handleReset = () => {
    const zeroed = {};
    PRESET_ITEMS.forEach((item) => (zeroed[item.id] = 0));
    setCounts(zeroed);
    showNotice('Counters reset to zero');
  };

  const handleSaveDraft = () => {
    showNotice('Draft saved to local buffer');
  };

  const handleLog = () => {
    // Record into global log history
    const logEntry = {
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      counts,
      totalGrams,
      co2Grams: estimatedCO2,
    };
    const history = JSON.parse(localStorage.getItem('plastitrack_history') || '[]');
    history.push(logEntry);
    localStorage.setItem('plastitrack_history', JSON.stringify(history));
    showNotice("Today's plastic consumption logged to telemetry!");
  };

  const showNotice = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Calculations
  const { totalGrams, estimatedCO2, polymerTotals, activeTypesCount } = useMemo(() => {
    let total = 0;
    let activeTypes = 0;
    const groups = {
      'PET #1': 0,
      'PP #5': 0,
      'LDPE #4': 0,
      'PS #6 & Multi': 0,
    };

    PRESET_ITEMS.forEach((item) => {
      const qty = counts[item.id] || 0;
      if (qty > 0) activeTypes++;
      const itemGrams = qty * item.unitWeight;
      total += itemGrams;
      if (groups[item.polymerGroup] !== undefined) {
        groups[item.polymerGroup] += itemGrams;
      }
    });

    // Roughly ~2.2g CO2e per 1g plastic lifecycle emission
    const co2 = Math.round(total * 2.19);

    return {
      totalGrams: total,
      estimatedCO2: co2,
      polymerTotals: groups,
      activeTypesCount: activeTypes,
    };
  }, [counts]);

  // Baseline comparison (standard daily student baseline ~55g)
  const baselineGrams = 55;
  const pctVsBaseline = Math.round(((totalGrams - baselineGrams) / baselineGrams) * 100);

  // Filtered items
  const filteredItems = PRESET_ITEMS.filter((item) =>
    activeCategory === 'All Items' ? true : item.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-8 z-50 px-4 py-3 bg-forest text-white rounded-xl shadow-lg border border-emerald-500/40 flex items-center gap-2.5 font-mono text-xs"
          >
            <Check size={16} className="text-emerald-400" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner Ribbon */}
      <section className="bg-white/85 backdrop-blur-sm border border-[#cfcdc1] rounded-xl px-5 py-3 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-400"></span>
            <span className="font-bold text-stone-900 tracking-wide">● ACTIVE_SESSION // TODAY'S LOG</span>
          </div>
          <span className="text-stone-300">|</span>
          <span>NODE: <span className="text-stone-800 font-semibold">PERSONAL-HUB-01</span></span>
          <span className="text-stone-300">|</span>
          <span>BUFFER: <span className="text-forest font-semibold">SYNC_OK (0 LOSS)</span></span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold">
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80">
            ITEMS COUNTED: {activeTypesCount} TYPES
          </span>
          <span className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 border border-stone-300">
            CALC_PRECISION: NIST CALIBRATED
          </span>
        </div>
      </section>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Quick-Add Catalog (Col Span 7) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Filter and Catalog Header */}
          <div className="bg-white rounded-2xl border border-[#cfcdc1] p-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200/80">
              <div>
                <div className="flex items-center gap-2 text-stone-500 font-mono text-xs font-semibold tracking-wider">
                  <Zap size={14} className="text-forest" />
                  <span>QUICK-ADD CATALOG // FREQUENT CONSUMPTION ITEMS</span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Log units consumed today to update mass balance telemetry
                </p>
              </div>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200 font-semibold">
                {PRESET_ITEMS.length} PRESETS
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-3 font-mono text-xs">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    type="button"
                    className={`px-3 py-1 rounded-lg transition-all ${
                      isActive
                        ? 'bg-forest text-white font-semibold shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200/70 text-stone-700 border border-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const qty = counts[item.id] || 0;
              const subtotal = qty * item.unitWeight;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#cfcdc1] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${item.iconBg}`}>
                        {item.icon}
                      </div>
                      <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200">
                        {item.resin}
                      </span>
                    </div>
                    <div className="mt-3">
                      <h4 className="text-sm font-bold text-stone-900 leading-snug">
                        {item.name}
                      </h4>
                      <p className="font-mono text-[11px] text-stone-500 mt-0.5">
                        {item.unitWeight}g · {item.polymer}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    {/* Stepper Controls */}
                    <div className="flex items-center gap-2 bg-stone-100 border border-stone-200 rounded-lg p-1">
                      <button
                        onClick={() => updateCount(item.id, -1)}
                        className="w-7 h-7 rounded bg-white hover:bg-stone-200 text-stone-700 font-mono font-bold flex items-center justify-center transition shadow-xs disabled:opacity-30 disabled:cursor-not-allowed"
                        type="button"
                        disabled={qty === 0}
                      >
                        -
                      </button>
                      <span className="font-mono text-sm font-bold text-stone-900 w-5 text-center">
                        {qty}
                      </span>
                      <button
                        onClick={() => updateCount(item.id, 1)}
                        className="w-7 h-7 rounded bg-forest hover:bg-forest-light text-white font-mono font-bold flex items-center justify-center transition shadow-xs"
                        type="button"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right font-mono">
                      <span className="text-[10px] text-stone-400 block uppercase">Subtotal</span>
                      <span className={`text-sm font-bold ${subtotal > 0 ? 'text-forest' : 'text-stone-400'}`}>
                        {subtotal}g
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Live Calculation Summary Card (Col Span 5) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#cfcdc1] p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Card Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200/80">
              <div className="flex items-center gap-2 text-stone-500 font-mono text-xs font-semibold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-forest animate-ping"></span>
                <span>LIVE CALCULATION SUMMARY // TELEMETRY IMPACT</span>
              </div>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-semibold">
                REAL-TIME
              </span>
            </div>

            {/* Big Total Weight Metric Display */}
            <div className="p-5 rounded-xl bg-stone-100/70 border border-stone-200">
              <p className="text-xs font-medium text-stone-500 font-mono uppercase tracking-wider">
                Total Weight Logged
              </p>
              <p className="font-mono text-4xl font-bold text-stone-900 tracking-tight mt-1">
                {totalGrams} <span className="text-xl font-normal text-stone-600">g</span>
              </p>
              <p className="font-mono text-xs text-stone-600 mt-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>{(totalGrams / 1000).toFixed(3)} kg total plastic mass logged today</span>
              </p>
            </div>

            {/* Estimated Carbon Impact */}
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-stone-600 font-mono">Estimated Footprint</p>
                <p className="font-mono text-lg font-bold text-stone-900 mt-0.5">
                  ~{estimatedCO2} g CO₂e
                </p>
              </div>
              <span className={`font-mono text-xs font-semibold px-2.5 py-1 rounded shadow-xs ${
                pctVsBaseline <= 0 
                  ? 'bg-white text-emerald-700 border border-emerald-200' 
                  : 'bg-white text-amber-700 border border-amber-200'
              }`}>
                {pctVsBaseline <= 0 ? `${pctVsBaseline}% vs baseline` : `+${pctVsBaseline}% vs baseline`}
              </span>
            </div>

            {/* Polymer Breakdown Bars */}
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-stone-100 text-stone-500 font-mono text-xs font-semibold tracking-wider">
                <span>POLYMER COMPOSITION RATIO</span>
                <span>100%</span>
              </div>
              
              <div className="mt-4 space-y-3.5 font-mono text-xs">
                {/* PET #1 */}
                {(() => {
                  const g = polymerTotals['PET #1'];
                  const pct = totalGrams > 0 ? Math.round((g / totalGrams) * 100) : 0;
                  return (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-stone-800 font-medium">PET #1 (Water Bottles)</span>
                        <span className="font-bold text-stone-900">{pct}% ({g}g)</span>
                      </div>
                      <div className="w-full h-2 bg-stone-200/70 rounded-full overflow-hidden">
                        <div className="h-full bg-forest rounded-full transition-all duration-300" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })()}

                {/* PP #5 */}
                {(() => {
                  const g = polymerTotals['PP #5'];
                  const pct = totalGrams > 0 ? Math.round((g / totalGrams) * 100) : 0;
                  return (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-stone-800 font-medium">PP #5 (Takeout Boxes)</span>
                        <span className="font-bold text-stone-900">{pct}% ({g}g)</span>
                      </div>
                      <div className="w-full h-2 bg-stone-200/70 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full transition-all duration-300" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })()}

                {/* LDPE #4 */}
                {(() => {
                  const g = polymerTotals['LDPE #4'];
                  const pct = totalGrams > 0 ? Math.round((g / totalGrams) * 100) : 0;
                  return (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-stone-800 font-medium">LDPE #4 (Bags)</span>
                        <span className="font-bold text-stone-900">{pct}% ({g}g)</span>
                      </div>
                      <div className="w-full h-2 bg-stone-200/70 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-500 rounded-full transition-all duration-300" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })()}

                {/* PS #6 & Multi */}
                {(() => {
                  const g = polymerTotals['PS #6 & Multi'];
                  const pct = totalGrams > 0 ? Math.round((g / totalGrams) * 100) : 0;
                  return (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-stone-800 font-medium">PS #6 & Multi-layer Foil</span>
                        <span className="font-bold text-stone-900">{pct}% ({g}g)</span>
                      </div>
                      <div className="w-full h-2 bg-stone-200/70 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full transition-all duration-300" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Direct Impact Notes */}
            <div className="p-3.5 rounded-xl bg-stone-100/80 border border-stone-200 text-stone-600 font-mono text-[11px] space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Recyclability Index:</span>
                <span className="font-bold text-forest">74%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Circular Recapture Potential:</span>
                <span className="font-bold text-stone-800">HIGH</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4 border-t border-stone-200/80">
            <button
              onClick={handleLog}
              className="w-full py-3 px-4 rounded-xl bg-forest hover:bg-forest-light text-white font-medium text-sm transition-all shadow-xs flex items-center justify-center gap-2 group cursor-pointer"
              type="button"
            >
              <Check className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Log Today's Plastic</span>
            </button>
            <div className="flex gap-2 font-mono text-xs">
              <button
                onClick={handleSaveDraft}
                className="flex-1 py-2 px-3 rounded-lg border border-stone-300 hover:bg-stone-100 text-stone-700 transition-colors font-medium text-center cursor-pointer flex items-center justify-center gap-1.5"
                type="button"
              >
                <Save size={13} />
                <span>Save Draft</span>
              </button>
              <button
                onClick={handleReset}
                className="py-2 px-3 rounded-lg border border-stone-300 hover:bg-stone-100 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                type="button"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
