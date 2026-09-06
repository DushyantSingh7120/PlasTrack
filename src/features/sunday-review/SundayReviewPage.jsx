import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  TrendingDown, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Coffee,
  ShoppingBag,
  UtensilsCrossed
} from 'lucide-react';

const REDUCTION_TIPS = [
  {
    icon: Coffee,
    title: 'Ditch the Disposable Cup',
    impact: '-100 Cups / Year',
    description: 'Most paper coffee cups are lined with plastic to make them waterproof, making them nearly impossible to recycle. Carrying a reusable mug can save over 100 cups a year from the landfill.',
    action: 'Commit for Next Week',
  },
  {
    icon: ShoppingBag,
    title: 'Bring Your Own Bag',
    impact: 'High Impact',
    description: 'Over 1 trillion plastic grocery bags are used worldwide every year, and they jam recycling machinery. A simple cloth bag replaces hundreds of plastic ones over its lifetime.',
    action: 'Commit for Next Week',
  },
  {
    icon: UtensilsCrossed,
    title: 'Say No to Plastic Cutlery',
    impact: 'Save Microplastics',
    description: 'Plastic cutlery is too small and oddly shaped to be processed by most recycling facilities. Carry a small set of bamboo or metal utensils in your bag for takeout meals.',
    action: 'Commit for Next Week',
  },
];

export default function SundayReviewPage() {
  const [history, setHistory] = useState([]);
  const ceilingGrams = 40;
  const baselineGrams = 55;

  useEffect(() => {
    const saved = localStorage.getItem('plastitrack_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history");
      }
    }
  }, []);

  // Use history to generate last 7 days of data, pad with mock data if empty
  const weekData = [];
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  if (history.length > 0) {
    const last7 = history.slice(-7);
    last7.forEach(entry => {
      const date = new Date(entry.timestamp);
      weekData.push({
        day: days[date.getDay()],
        grams: entry.totalGrams,
        isBest: false // Will calculate below
      });
    });
  } else {
    // Fallback Mock Data
    weekData.push(
      { day: 'MON', grams: 38 },
      { day: 'TUE', grams: 42 },
      { day: 'WED', grams: 12 },
      { day: 'THU', grams: 35 },
      { day: 'FRI', grams: 48 },
      { day: 'SAT', grams: 52 },
      { day: 'SUN', grams: 25 }
    );
  }

  // Calculate "Best" day (lowest grams)
  if (weekData.length > 0) {
    let bestIdx = 0;
    for (let i = 1; i < weekData.length; i++) {
      if (weekData[i].grams < weekData[bestIdx].grams) {
        bestIdx = i;
      }
    }
    weekData[bestIdx].isBest = true;
  }

  const totalWeeklyGrams = weekData.reduce((acc, d) => acc + d.grams, 0);
  const avgDaily = weekData.length > 0 ? Math.round(totalWeeklyGrams / weekData.length) : 0;
  const cleanDays = weekData.filter((d) => d.grams <= ceilingGrams).length;

  return (
    <div className="w-full max-w-[1800px] mx-auto space-y-6 font-body">
      {/* Top Banner Ribbon */}
      <section className="bg-white/40 backdrop-blur-xl border border-[#cfcdc1]/60 rounded-xl px-5 py-3 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-400"></span>
            <span className="font-bold text-stone-900 tracking-wide">
              SUNDAY REVIEW
            </span>
          </div>
          <span className="text-stone-300 hidden sm:inline">|</span>
          <span className="hidden sm:inline">CYCLE: <span className="text-stone-800 font-semibold">WEEKLY AUDIT</span></span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold">
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80">
            {cleanDays}/{weekData.length || 7} DAYS UNDER LIMIT
          </span>
        </div>
      </section>

      {/* 3 Summary Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Weekly Mass */}
        <div className="bg-white/40 backdrop-blur-xl rounded-2xl border border-[#cfcdc1]/60 p-5 shadow-xs">
          <div className="flex justify-between items-center text-stone-500 font-mono text-xs">
            <span>TOTAL WEEKLY MASS</span>
            <TrendingDown size={16} className="text-emerald-600" />
          </div>
          <p className="font-mono text-3xl font-bold text-stone-900 tracking-tight mt-2">
            {totalWeeklyGrams} <span className="text-lg font-normal text-stone-500">g</span>
          </p>
        </div>

        {/* Daily Average */}
        <div className="bg-white/40 backdrop-blur-xl rounded-2xl border border-[#cfcdc1]/60 p-5 shadow-xs">
          <div className="flex justify-between items-center text-stone-500 font-mono text-xs">
            <span>DAILY AVERAGE</span>
            <ShieldCheck size={16} className="text-forest" />
          </div>
          <p className="font-mono text-3xl font-bold text-stone-900 tracking-tight mt-2">
            {avgDaily} <span className="text-lg font-normal text-stone-500">g/day</span>
          </p>
        </div>

        {/* Clean Days */}
        <div className="bg-white/40 backdrop-blur-xl rounded-2xl border border-[#cfcdc1]/60 p-5 shadow-xs">
          <div className="flex justify-between items-center text-stone-500 font-mono text-xs">
            <span>GOAL MET</span>
            <Award size={16} className="text-amber-600" />
          </div>
          <p className="font-mono text-3xl font-bold text-forest tracking-tight mt-2">
            {cleanDays} <span className="text-lg font-normal text-stone-500">/ {weekData.length || 7}</span>
          </p>
        </div>
      </div>

      {/* SECTION: 7-Day High-Fidelity Bar Chart */}
      <section className="bg-white/40 backdrop-blur-xl rounded-2xl border border-[#cfcdc1]/60 p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200/80">
          <div>
            <h3 className="text-lg font-bold font-heading text-stone-900">
              Weekly Tracker
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-stone-600">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0 border-t-2 border-dashed border-amber-600"></span>
                <span>Limit (40g)</span>
              </div>
            </div>
          </div>
        </div>

        {/* The Bar Chart Canvas Container */}
        <div className="relative w-full h-80 bg-stone-50/70 rounded-xl p-4 border border-stone-200 overflow-hidden">
          {/* Y-Axis Gridlines */}
          <div className="absolute inset-x-10 top-6 bottom-12 flex flex-col justify-between pointer-events-none text-stone-400 font-mono text-[10px]">
            {[100, 80, 60, 40, 20, 0].map((val) => (
              <div key={val} className="w-full flex items-center gap-2">
                <span className="w-7 text-right">{val}g</span>
                <div className="flex-1 h-px bg-stone-200/80"></div>
              </div>
            ))}
          </div>

          {/* Ceiling Overlay Line (40g = 40% from bottom of scale 0-100) */}
          <div className="absolute inset-x-16 bottom-[136px] pointer-events-none flex items-center z-20">
            <div className="w-full h-0 border-t-2 border-dashed border-amber-600/80"></div>
            <span className="absolute right-0 -top-3.5 bg-amber-100 text-amber-900 font-mono text-[10px] px-2 py-0.5 rounded uppercase font-bold border border-amber-300 shadow-xs">
              LIMIT: 40g
            </span>
          </div>

          {/* 7 Daily Bars */}
          <div className="relative h-full pl-10 pr-6 pb-8 pt-4 grid grid-cols-7 gap-3 sm:gap-6 items-end z-10">
            {weekData.map((item, idx) => {
              const heightPct = `${Math.min(100, item.grams)}%`;
              const isOver = item.grams > ceilingGrams;
              return (
                <div
                  key={`${item.day}-${idx}`}
                  className="group flex flex-col items-center justify-end h-full relative cursor-pointer"
                >
                  {/* Badge for Best Day */}
                  {item.isBest && (
                    <span className="px-1.5 py-0.5 bg-emerald-100 text-forest font-mono text-[9px] rounded-full font-bold mb-1 border border-emerald-300">
                      ★ BEST
                    </span>
                  )}

                  {/* Mass Label */}
                  <div className={`font-mono text-xs font-bold mb-1 group-hover:scale-110 transition-transform ${
                    item.isBest ? 'text-forest' : isOver ? 'text-amber-700' : 'text-stone-700'
                  }`}>
                    {item.grams}g
                  </div>

                  {/* Bar Shape */}
                  <div
                    className={`w-full max-w-[48px] rounded-t-lg transition-all duration-300 group-hover:opacity-90 ${
                      item.isBest
                        ? 'bg-emerald-600 shadow-xs'
                        : isOver
                        ? 'bg-amber-600'
                        : 'bg-forest'
                    }`}
                    style={{ height: heightPct }}
                  ></div>

                  {/* Day Label */}
                  <span className={`font-mono text-xs uppercase mt-2 font-semibold ${
                    item.isBest ? 'text-forest font-bold' : 'text-stone-500'
                  }`}>
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION: Personal Habit Audit & Reduction Playbook */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
          <div>
            <div className="flex items-center gap-2 text-stone-700 font-mono text-xs font-semibold tracking-wider">
              <Sparkles size={16} className="text-forest" />
              <span className="uppercase font-bold text-stone-900 text-sm font-heading">
                Actionable Reduction Tips
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Simple swaps to lower your plastic footprint based on our research.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REDUCTION_TIPS.map((tip) => {
            const Icon = tip.icon;
            return (
              <div
                key={tip.title}
                className="bg-white/40 backdrop-blur-xl rounded-2xl border border-[#cfcdc1]/60 p-5 shadow-xs hover:shadow-md hover:bg-white/50 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center justify-center text-forest">
                      <Icon size={20} />
                    </div>
                    <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {tip.impact}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-stone-900 mt-3 font-heading leading-snug">
                    {tip.title}
                  </h4>
                  <p className="text-sm text-stone-600 mt-2 font-body leading-relaxed">
                    {tip.description}
                  </p>
                </div>

                <button
                  type="button"
                  className="w-full py-2 px-3 rounded-lg border border-stone-300 hover:bg-forest hover:text-white hover:border-forest text-stone-700 transition-colors font-mono text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer group mt-4"
                >
                  <span>{tip.action}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
