import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  RotateCcw, 
  Save, 
  Zap,
  Clock,
  IndianRupee,
  AlertTriangle,
  Lightbulb,
  ShieldAlert,
  Info
} from 'lucide-react';
import { STANDARDIZED_ITEMS, RESIN_CODES } from '../../lib/plasticData';

const TRACKER_PRESETS = [
  {
    id: 'pet_bottle_500',
    name: '500ml Water Bottle',
    resin: 'PET #1',
    resinCode: 1,
    unitWeight: 12,
    unitCostINR: 20,
    degradationYears: 450,
    category: 'Beverages',
    polymerGroup: 'PET #1',
    mrfRate: '~75% Recycled in India',
    isRecyclable: true,
    tip: 'Carrying a 1L steel flask saves ~365 bottles & ₹6,800/yr.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M10 2h4" />
        <path d="M10 5h4" />
        <path d="M8 8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V8z" />
      </svg>
    ),
    iconBg: 'border-emerald-200 bg-emerald-50/70 text-forest',
  },
  {
    id: 'pet_bottle_1000',
    name: '1000ml (1L) Bottle',
    resin: 'PET #1',
    resinCode: 1,
    unitWeight: 24,
    unitCostINR: 20,
    degradationYears: 450,
    category: 'Beverages',
    polymerGroup: 'PET #1',
    mrfRate: '~75% Recycled in India',
    isRecyclable: true,
    tip: 'Antimony catalyst can leach at temperatures above 40°C in cars.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M10 2h4" />
        <path d="M9 6h6" />
        <path d="M7 9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9z" />
      </svg>
    ),
    iconBg: 'border-emerald-200 bg-emerald-50/70 text-forest',
  },
  {
    id: 'ldpe_bag',
    name: 'Carry Bag (>120μm)',
    resin: 'LDPE #4',
    resinCode: 4,
    unitWeight: 5,
    unitCostINR: 5,
    degradationYears: 100,
    category: 'Films',
    polymerGroup: 'LDPE #4',
    mrfRate: '~30% Recycled',
    isRecyclable: true,
    tip: 'Discarded carry bags cause rumen impaction (30-70kg) in stray cows.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" x2="21" y1="6" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    iconBg: 'border-teal-200 bg-teal-50/70 text-teal-700',
  },
  {
    id: 'multi_pouch',
    name: 'Chip / Snack Pouch (MLP)',
    resin: 'MLP #7',
    resinCode: 7,
    unitWeight: 4,
    unitCostINR: 20,
    degradationYears: 500,
    category: 'Packaging',
    polymerGroup: 'PS #6 & Multi',
    mrfRate: '0% Mechanical (Cement Kiln only)',
    isRecyclable: false,
    tip: 'Multi-layer foil + plastic cannot be separated by kabadiwalas.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect height="16" rx="2" width="12" x="6" y="4" />
        <line x1="6" x2="18" y1="8" y2="8" />
      </svg>
    ),
    iconBg: 'border-amber-200 bg-amber-50/70 text-amber-700',
  },
  {
    id: 'takeout_box',
    name: 'Food Delivery Container',
    resin: 'PP #5',
    resinCode: 5,
    unitWeight: 20,
    unitCostINR: 10,
    degradationYears: 450,
    category: 'Foodware',
    polymerGroup: 'PP #5',
    mrfRate: '~40% Recycled',
    isRecyclable: true,
    tip: 'A 5-second rinse removes oils and makes this 100% recyclable.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
    iconBg: 'border-emerald-200 bg-emerald-50/70 text-emerald-700',
  },
  {
    id: 'ps_cutlery',
    name: 'Plastic Cutlery / Straw',
    resin: 'PS / PP',
    resinCode: 6,
    unitWeight: 3,
    unitCostINR: 3,
    degradationYears: 400,
    category: 'Foodware',
    polymerGroup: 'PS #6 & Multi',
    mrfRate: 'Banned Item (July 2022 MoEFCC)',
    isRecyclable: false,
    tip: 'Banned under July 1, 2022 MoEFCC single-use plastic notification.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <line x1="12" x2="12" y1="5" y2="19" />
        <line x1="5" x2="19" y1="12" y2="12" />
      </svg>
    ),
    iconBg: 'border-red-200 bg-red-50/70 text-red-700',
  },
];

const CATEGORIES = ['All Items', 'Beverages', 'Packaging', 'Foodware', 'Films'];

export default function DailyTrackerPage() {
  const [counts, setCounts] = useState(() => {
    const saved = localStorage.getItem('plastitrack_tracker_counts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    const initial = {};
    TRACKER_PRESETS.forEach(item => initial[item.id] = 0);
    return initial;
  });

  const [activeCategory, setActiveCategory] = useState('All Items');
  const [notification, setNotification] = useState(null);

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
    TRACKER_PRESETS.forEach((item) => (zeroed[item.id] = 0));
    setCounts(zeroed);
    showNotice('Counters reset to zero');
  };

  const { totalGrams, totalCostINR, maxDecomposition, polymerTotals, recyclableGrams, nonRecyclableGrams } = useMemo(() => {
    let grams = 0;
    let cost = 0;
    let maxYears = 0;
    let recyclable = 0;
    let nonRecyclable = 0;

    const groups = {
      'PET #1': 0,
      'PP #5': 0,
      'LDPE #4': 0,
      'PS #6 & Multi': 0,
    };

    TRACKER_PRESETS.forEach((item) => {
      const qty = counts[item.id] || 0;
      if (qty > 0) {
        const itemGrams = qty * item.unitWeight;
        const itemCost = qty * item.unitCostINR;
        grams += itemGrams;
        cost += itemCost;
        if (item.degradationYears > maxYears) {
          maxYears = item.degradationYears;
        }
        if (item.isRecyclable) {
          recyclable += itemGrams;
        } else {
          nonRecyclable += itemGrams;
        }
        if (groups[item.polymerGroup] !== undefined) {
          groups[item.polymerGroup] += itemGrams;
        }
      }
    });

    return {
      totalGrams: grams,
      totalCostINR: cost,
      maxDecomposition: maxYears,
      polymerTotals: groups,
      recyclableGrams: recyclable,
      nonRecyclableGrams: nonRecyclable
    };
  }, [counts]);

  const handleLog = () => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      counts,
      totalGrams,
      totalCostINR,
      maxDecomposition
    };
    const history = JSON.parse(localStorage.getItem('plastitrack_history') || '[]');
    history.push(logEntry);
    localStorage.setItem('plastitrack_history', JSON.stringify(history));
    window.dispatchEvent(new Event('plastitrack-data-updated'));
    window.dispatchEvent(new Event('storage'));
    showNotice(`Logged ${totalGrams}g (₹${totalCostINR}) to your daily history!`);
  };

  const showNotice = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4500);
  };

  const filteredItems = TRACKER_PRESETS.filter((item) =>
    activeCategory === 'All Items' ? true : item.category === activeCategory
  );

  const currentYear = new Date().getFullYear();
  const persistenceYear = maxDecomposition > 0 ? currentYear + maxDecomposition : currentYear;

  return (
    <div className="w-full max-w-[1800px] mx-auto space-y-6 font-body">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 right-8 z-50 px-4 py-3 bg-[#0a1f16] text-white rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_24px_rgba(16,185,129,0.25)] border-2 border-emerald-400/80 flex items-center gap-3 backdrop-blur-2xl"
          >
            <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center shrink-0">
              <Check size={16} className="text-emerald-300 stroke-[3]" />
            </div>
            <div className="flex flex-col pr-1">
              <span className="text-[9px] font-mono font-black text-emerald-400 uppercase tracking-widest leading-tight">
                SYSTEM NOTICE
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wide">
                {notification}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Quick-Add Catalog */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white/35 backdrop-blur-2xl rounded-2xl border border-white/60 p-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border/70">
              <div>
                <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold tracking-wider uppercase">
                  <Zap size={14} className="text-emerald-600" />
                  <span>1-TAP CONSUMPTION LOGGER (CPCB & BIS CALIBRATED)</span>
                </div>
                <p className="text-xs text-stone-700 font-medium mt-1">
                  Tap to add single-use items. Standardized gram weights and retail prices are pre-calibrated.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-3 font-mono text-xs">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    type="button"
                    className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#0f2c1f] text-white font-extrabold shadow-sm border-2 border-emerald-500/80 ring-2 ring-emerald-500/20'
                        : 'bg-white/30 hover:bg-white/50 text-stone-950 font-bold border border-white/60 shadow-2xs'
                    }`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const qty = counts[item.id] || 0;
              const subtotalGrams = qty * item.unitWeight;
              const subtotalCost = qty * item.unitCostINR;

              return (
                <div
                  key={item.id}
                  className="bg-white/35 backdrop-blur-xl rounded-2xl border border-white/60 p-5 shadow-xs hover:shadow-md hover:bg-white/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${item.iconBg}`}>
                        {item.icon}
                      </div>
                      <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
                        item.isRecyclable 
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}>
                        {item.resin}
                      </span>
                    </div>

                    <div className="mt-3">
                      <h4 className="text-sm font-bold text-foreground leading-snug">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground mt-1">
                        <span>{item.unitWeight}g / unit</span>
                        <span>•</span>
                        <span className="text-stone-700 font-semibold">₹{item.unitCostINR}</span>
                      </div>
                      <div className="font-mono text-[10px] text-stone-500 mt-1">
                        MRF: {item.mrfRate}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-stone-100/80 border border-border rounded-lg p-1">
                      <button
                        onClick={() => updateCount(item.id, -1)}
                        className="w-7 h-7 rounded bg-white hover:bg-stone-200 text-stone-700 font-mono font-bold flex items-center justify-center transition shadow-xs disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        type="button"
                        disabled={qty === 0}
                      >
                        -
                      </button>
                      <span className="font-mono text-sm font-bold text-foreground w-5 text-center">
                        {qty}
                      </span>
                      <button
                        onClick={() => updateCount(item.id, 1)}
                        className="w-7 h-7 rounded bg-primary hover:bg-black text-white font-mono font-bold flex items-center justify-center transition shadow-xs cursor-pointer"
                        type="button"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-[10px] text-muted-foreground block uppercase">Subtotal</span>
                      <span className={`text-xs font-bold ${subtotalGrams > 0 ? 'text-primary' : 'text-stone-400'}`}>
                        {subtotalGrams}g • ₹{subtotalCost}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Micro-Habit Alert Banner */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900 font-body">
            <Lightbulb size={18} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block font-heading">Empirical Micro-Habit Rule:</strong>
              When opening milk packets, never snip off the small triangular corner completely. Keeping it attached prevents micro-scraps from escaping MRF sorting lines into ocean corridors!
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Calculation Summary */}
        <div className="lg:col-span-5 bg-white/35 backdrop-blur-2xl rounded-2xl border border-white/60 p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border/70">
              <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>REAL-TIME FOOTPRINT TELEMETRY</span>
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">
                TODAY'S ACCUMULATION
              </span>
            </div>

            {/* Total Mass & Cost Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white/30 hover:bg-white/45 backdrop-blur-md border border-white/60 shadow-xs transition-all">
                <p className="text-[11px] font-bold text-stone-700 font-mono uppercase tracking-wider">
                  Total Mass
                </p>
                <p className="font-mono text-3xl font-black text-stone-950 tracking-tight mt-1">
                  {totalGrams} <span className="text-sm font-normal text-stone-600">g</span>
                </p>
                <span className="font-mono text-[10px] text-stone-700 font-semibold mt-1 block">
                  {(totalGrams / 1000).toFixed(3)} kg logged
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/30 hover:bg-white/45 backdrop-blur-md border border-white/60 shadow-xs transition-all">
                <p className="text-[11px] font-bold text-stone-700 font-mono uppercase tracking-wider">
                  Money Spent
                </p>
                <p className="font-mono text-3xl font-black text-stone-950 tracking-tight mt-1">
                  ₹{totalCostINR}
                </p>
                <span className="font-mono text-[10px] text-stone-700 font-semibold mt-1 block">
                  On disposable items
                </span>
              </div>
            </div>

            {/* Decomposition Horizon Display */}
            <div className="p-4 rounded-2xl bg-white/30 border border-white/60 backdrop-blur-md flex items-start gap-3">
              <Clock size={20} className="text-emerald-800 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-xs font-black text-stone-950 uppercase block">
                  Decomposition Horizon
                </span>
                <p className="text-xs text-stone-800 mt-1 leading-relaxed font-medium">
                  Items logged today will persist in landfills and waterways for up to <strong className="text-stone-950 font-black">{maxDecomposition || 0} years</strong> (until approximately <strong className="text-stone-950 font-black">{persistenceYear} AD</strong>).
                </p>
              </div>
            </div>

            {/* Polymer Breakdown Bars */}
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-border text-xs font-mono font-semibold text-muted-foreground">
                <span>POLYGON BREAKDOWN</span>
                <span>{totalGrams > 0 ? `${Math.round((recyclableGrams / totalGrams) * 100)}% Recyclable` : '0%'}</span>
              </div>
              
              <div className="mt-4 space-y-3 font-mono text-xs">
                {(() => {
                  const g = polymerTotals['PET #1'];
                  const pct = totalGrams > 0 ? Math.round((g / totalGrams) * 100) : 0;
                  return (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-stone-800 font-medium">PET (Bottles)</span>
                        <span className="font-bold text-foreground">{pct}% ({g}g)</span>
                      </div>
                      <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })()}

                {(() => {
                  const g = polymerTotals['PP #5'];
                  const pct = totalGrams > 0 ? Math.round((g / totalGrams) * 100) : 0;
                  return (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-stone-800 font-medium">PP (Takeout)</span>
                        <span className="font-bold text-foreground">{pct}% ({g}g)</span>
                      </div>
                      <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full transition-all duration-300" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })()}

                {(() => {
                  const g = polymerTotals['LDPE #4'];
                  const pct = totalGrams > 0 ? Math.round((g / totalGrams) * 100) : 0;
                  return (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-stone-800 font-medium">LDPE (Bags)</span>
                        <span className="font-bold text-foreground">{pct}% ({g}g)</span>
                      </div>
                      <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-600 rounded-full transition-all duration-300" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })()}

                {(() => {
                  const g = polymerTotals['PS #6 & Multi'];
                  const pct = totalGrams > 0 ? Math.round((g / totalGrams) * 100) : 0;
                  return (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-stone-800 font-medium text-amber-900">MLP & PS (Non-Recyclable)</span>
                        <span className="font-bold text-amber-700">{pct}% ({g}g)</span>
                      </div>
                      <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full transition-all duration-300" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4 border-t border-border">
            <button
              onClick={handleLog}
              className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-black text-white font-medium text-sm transition-all shadow-xs flex items-center justify-center gap-2 group cursor-pointer font-mono"
              type="button"
            >
              <Check className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Save Today's Log</span>
            </button>
            <div className="flex gap-2 font-mono text-xs">
              <button
                onClick={handleReset}
                className="w-full py-2 px-3 rounded-lg border border-border hover:bg-stone-100 text-stone-600 hover:text-foreground transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                type="button"
              >
                <RotateCcw size={13} />
                <span>Reset Counters</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
