import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarCheck, 
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

const WEEK_DATA = [
  { day: 'MON', grams: 38, isBest: false, detail: '38g (PET #1 Bottle, PP Wrap)', sub: '-2g under target' },
  { day: 'TUE', grams: 42, isBest: false, detail: '42g (+2g marginal excess)', sub: '1 PET beverage' },
  { day: 'WED', grams: 12, isBest: true, detail: '12g (★ Cleanest Day)', sub: 'Only 1 medicine blister strip' },
  { day: 'THU', grams: 35, isBest: false, detail: '35g (-5g under target)', sub: 'Snack wrapper only' },
  { day: 'FRI', grams: 48, isBest: false, detail: '48g (+8g weekend kickoff)', sub: 'Takeout meal container' },
  { day: 'SAT', grams: 52, isBest: false, detail: '52g (+12g social dining)', sub: 'Takeout box + drink lid' },
  { day: 'SUN', grams: 25, isBest: false, detail: '25g (Audit Day)', sub: 'Home-cooked prep only' },
];

const REDUCTION_TIPS = [
  {
    icon: Coffee,
    title: 'Campus & Commute Fluid Protocol',
    resin: 'Target: PET #1 (-140g/wk)',
    impact: '-65% Beverage Waste',
    description: 'Carrying a 750ml insulated stainless flask to the library and lecture halls directly substitutes 6–7 single-use PET bottles weekly, eliminating 140g of virgin polyester resin.',
    action: 'Commit for Week 37',
  },
  {
    icon: ShoppingBag,
    title: 'Bulk Canteen & Grocery Optimization',
    resin: 'Target: LDPE #4 Films (-25g/wk)',
    impact: '-100% Bag Waste',
    description: 'Keep two foldable canvas bags in your backpack. Reject thin plastic polythene grocery bags for fruit, snacks, and departmental stationery pickups.',
    action: 'Commit for Week 37',
  },
  {
    icon: UtensilsCrossed,
    title: 'Takeout Dining Container Policy',
    resin: 'Target: PP #5 & PS #6 (-105g/wk)',
    impact: '-50% Container Mass',
    description: 'Toggle the "Do Not Include Disposable Cutlery" option on meal delivery apps. When ordering hostel takeout, provide your own clean steel tiffin box.',
    action: 'Commit for Week 37',
  },
];

export default function SundayReviewPage() {
  const [viewMode, setViewMode] = useState('mass'); // 'mass' | 'resin'
  const ceilingGrams = 40;
  const baselineGrams = 55;

  const totalWeeklyGrams = WEEK_DATA.reduce((acc, d) => acc + d.grams, 0);
  const avgDaily = Math.round(totalWeeklyGrams / 7);
  const cleanDays = WEEK_DATA.filter((d) => d.grams <= ceilingGrams).length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Banner Ribbon */}
      <section className="bg-white/85 backdrop-blur-sm border border-[#cfcdc1] rounded-xl px-5 py-3 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-400"></span>
            <span className="font-bold text-stone-900 tracking-wide">
              ● AUDIT_SESSION // WEEK 36 RETROSPECTIVE
            </span>
          </div>
          <span className="text-stone-300">|</span>
          <span>CYCLE: <span className="text-stone-800 font-semibold">7-DAY HABIT AUDIT</span></span>
          <span className="text-stone-300">|</span>
          <span>STATUS: <span className="text-forest font-semibold">VERIFIED REPORT</span></span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold">
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80">
            {cleanDays}/7 DAYS UNDER CEILING
          </span>
          <span className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 border border-stone-300">
            -34% VS BASELINE
          </span>
        </div>
      </section>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Weekly Mass */}
        <div className="bg-white rounded-2xl border border-[#cfcdc1] p-5 shadow-xs">
          <div className="flex justify-between items-center text-stone-500 font-mono text-xs">
            <span>TOTAL 7-DAY MASS</span>
            <TrendingDown size={16} className="text-emerald-600" />
          </div>
          <p className="font-mono text-3xl font-bold text-stone-900 tracking-tight mt-2">
            {totalWeeklyGrams} <span className="text-lg font-normal text-stone-500">g</span>
          </p>
          <p className="font-mono text-xs text-emerald-700 mt-1 flex items-center gap-1">
            <span className="font-semibold">-34.5%</span> vs 385g baseline
          </p>
        </div>

        {/* Daily Average */}
        <div className="bg-white rounded-2xl border border-[#cfcdc1] p-5 shadow-xs">
          <div className="flex justify-between items-center text-stone-500 font-mono text-xs">
            <span>DAILY AVERAGE</span>
            <ShieldCheck size={16} className="text-forest" />
          </div>
          <p className="font-mono text-3xl font-bold text-stone-900 tracking-tight mt-2">
            {avgDaily} <span className="text-lg font-normal text-stone-500">g/day</span>
          </p>
          <p className="font-mono text-xs text-stone-600 mt-1">
            Ceiling is <span className="font-bold text-stone-900">{ceilingGrams}g</span>
          </p>
        </div>

        {/* Clean Days */}
        <div className="bg-white rounded-2xl border border-[#cfcdc1] p-5 shadow-xs">
          <div className="flex justify-between items-center text-stone-500 font-mono text-xs">
            <span>CLEAN DAYS RATIO</span>
            <Award size={16} className="text-amber-600" />
          </div>
          <p className="font-mono text-3xl font-bold text-forest tracking-tight mt-2">
            {cleanDays} <span className="text-lg font-normal text-stone-500">/ 7</span>
          </p>
          <p className="font-mono text-xs text-emerald-700 mt-1 font-semibold">
            71.4% Target Compliance
          </p>
        </div>

        {/* Primary Culprit Resin */}
        <div className="bg-white rounded-2xl border border-[#cfcdc1] p-5 shadow-xs">
          <div className="flex justify-between items-center text-stone-500 font-mono text-xs">
            <span>PRIMARY CULPRIT</span>
            <AlertCircle size={16} className="text-amber-500" />
          </div>
          <p className="font-mono text-xl font-bold text-stone-900 tracking-tight mt-2">
            PP #5 Rigid
          </p>
          <p className="font-mono text-xs text-stone-600 mt-1">
            105g (41.6% of week's waste)
          </p>
        </div>
      </div>

      {/* SECTION: 7-Day High-Fidelity Bar Chart */}
      <section className="bg-white rounded-2xl border border-[#cfcdc1] p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200/80">
          <div>
            <h3 className="text-lg font-bold font-heading text-stone-900">
              7-Day Material Telemetry & Ceiling Trajectory
            </h3>
            <p className="text-xs text-stone-500 font-mono mt-0.5">
              OBSERVED DAILY MASS VS. 40g SUSTAINABILITY CEILING
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-stone-600">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-forest"></span>
                <span>Logged Mass (g)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0 border-t-2 border-dashed border-amber-600"></span>
                <span>Ceiling (40g)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0 border-t border-dotted border-stone-500"></span>
                <span>Baseline (55g)</span>
              </div>
            </div>

            <div className="inline-flex rounded-lg bg-stone-100 p-1 font-mono text-xs">
              <button
                onClick={() => setViewMode('mass')}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  viewMode === 'mass'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                MASS (g)
              </button>
              <button
                onClick={() => setViewMode('resin')}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  viewMode === 'resin'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                RESIN CODES
              </button>
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
              CEILING: 40g
            </span>
          </div>

          {/* Baseline Average Line (55g) */}
          <div className="absolute inset-x-16 bottom-[172px] pointer-events-none flex items-center z-20">
            <div className="w-full h-0 border-t border-dotted border-stone-400"></div>
            <span className="absolute left-0 -top-3.5 bg-stone-200 text-stone-700 font-mono text-[10px] px-2 py-0.5 rounded font-semibold border border-stone-300">
              BASELINE: 55g
            </span>
          </div>

          {/* 7 Daily Bars */}
          <div className="relative h-full pl-10 pr-6 pb-8 pt-4 grid grid-cols-7 gap-3 sm:gap-6 items-end z-10">
            {WEEK_DATA.map((item) => {
              const heightPct = `${Math.min(100, item.grams)}%`;
              const isOver = item.grams > ceilingGrams;
              return (
                <div
                  key={item.day}
                  className="group flex flex-col items-center justify-end h-full relative cursor-pointer"
                >
                  {/* Badge for Best Day */}
                  {item.isBest && (
                    <span className="px-1.5 py-0.5 bg-emerald-100 text-forest font-mono text-[9px] rounded-full font-bold mb-1 border border-emerald-300 animate-pulse">
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

                  {/* Hover Tooltip Popover */}
                  <div className="absolute -top-14 hidden group-hover:flex flex-col items-center bg-stone-900 text-white px-3 py-1.5 rounded-lg text-xs z-30 shadow-lg whitespace-nowrap font-mono pointer-events-none">
                    <span className="font-bold">{item.detail}</span>
                    <span className="text-emerald-400 text-[10px]">{item.sub}</span>
                  </div>
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
                Weekly Habit Audit & Actionable Reduction Playbook
              </span>
            </div>
            <p className="text-xs text-stone-500 font-mono mt-0.5">
              DATA-DRIVEN HABIT SWAPS TAILORED FOR CAMPUS & HOUSEHOLD LIFESTYLE
            </p>
          </div>
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-forest text-white font-semibold">
            3 INTERVENTIONS READY
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REDUCTION_TIPS.map((tip) => {
            const Icon = tip.icon;
            return (
              <div
                key={tip.title}
                className="bg-white rounded-2xl border border-[#cfcdc1] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
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
                  <p className="font-mono text-xs text-forest font-semibold mt-1">
                    {tip.resin}
                  </p>
                  <p className="text-xs text-stone-600 mt-2 font-body leading-relaxed">
                    {tip.description}
                  </p>
                </div>

                <button
                  type="button"
                  className="w-full py-2 px-3 rounded-lg border border-stone-300 hover:bg-forest hover:text-white hover:border-forest text-stone-700 transition-colors font-mono text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer group"
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
