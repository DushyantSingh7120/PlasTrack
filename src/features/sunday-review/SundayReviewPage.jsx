import React, { useState, useEffect, useMemo } from 'react';
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
  UtensilsCrossed,
  Flame,
  Zap,
  Leaf
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadCampusDemoData, clearDemoData, isDemoDataActive } from '../../lib/demoData';
import { 
  kineticContainer, 
  kineticCard, 
  kineticChartCard, 
  kineticBadge, 
  kineticHover, 
  kineticTap 
} from '../../lib/motion';

const TAILORED_CHALLENGES = [
  {
    category: 'Beverages',
    title: 'The 7-Day Campus Flask Challenge',
    impact: 'Save ~₹140 & 84g Plastic this week',
    description: 'Packaged water bottles were your highest weekly plastic contributor. Carry a 1L stainless steel bottle to campus and refill at water stations for the next 7 days.',
    badge: 'High Payback',
    actionText: 'View Steel Flask in Catalog',
    link: '/alternatives'
  },
  {
    category: 'Packaging',
    title: 'The Bulk Snack Swap Challenge',
    impact: 'Cut 100% Non-Recyclable MLP',
    description: 'Multi-layer metallized film (chip wrappers and sachets) cannot be mechanically recycled by waste pickers. Swap individual sachets for home-packed glass containers this week.',
    badge: 'Zero MLP',
    actionText: 'View Bulk Storage Swap',
    link: '/alternatives'
  },
  {
    category: 'Films',
    title: 'The 2-Tote Pocket Habit',
    impact: 'Protect Urban Livestock',
    description: 'Polyethylene carry bags degrade into dangerous micro-litter and cause cattle rumen impaction. Keep two foldable jute/cotton bags in your bag at all times.',
    badge: 'Animal Welfare',
    actionText: 'View Jute Tote Swap',
    link: '/alternatives'
  }
];

export default function SundayReviewPage() {
  const [history, setHistory] = useState([]);
  const [isDemo, setIsDemo] = useState(false);
  const ceilingGrams = 40; // Target daily limit

  const syncData = () => {
    const saved = localStorage.getItem('plastitrack_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        setHistory([]);
      }
    } else {
      setHistory([]);
    }
    setIsDemo(isDemoDataActive());
  };

  useEffect(() => {
    syncData();
    window.addEventListener('plastitrack-data-updated', syncData);
    window.addEventListener('storage', syncData);
    return () => {
      window.removeEventListener('plastitrack-data-updated', syncData);
      window.removeEventListener('storage', syncData);
    };
  }, []);

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  const weekData = useMemo(() => {
    if (history.length > 0) {
      const last7 = history.slice(-7);
      const mapped = last7.map((entry) => {
        const date = new Date(entry.timestamp);
        return {
          day: days[date.getDay()],
          grams: entry.totalGrams || 0,
          isBest: false
        };
      });

      if (mapped.length > 0) {
        let bestIdx = 0;
        for (let i = 1; i < mapped.length; i++) {
          if (mapped[i].grams < mapped[bestIdx].grams) {
            bestIdx = i;
          }
        }
        mapped[bestIdx].isBest = true;
      }
      return mapped;
    }
    return [];
  }, [history]);

  const hasData = weekData.length > 0;
  const totalWeeklyGrams = hasData ? weekData.reduce((acc, d) => acc + d.grams, 0) : 0;
  const avgDaily = hasData ? Math.round(totalWeeklyGrams / weekData.length) : 0;
  const cleanDays = hasData ? weekData.filter((d) => d.grams <= ceilingGrams).length : 0;

  // Compute Impact Badge
  let badgeName = hasData ? "Conscious Reducer" : "Awaiting Entries";
  let badgeColor = hasData ? "bg-emerald-50 text-emerald-800 border-emerald-300" : "bg-stone-100 text-stone-700 border-stone-300";
  let badgeIcon = ShieldCheck;
  let badgeDescription = hasData ? "Maintaining solid personal consumption control." : "Log daily items or load campus demo data to generate your Sunday badge.";

  if (hasData) {
    if (avgDaily < 25) {
      badgeName = "Eco-Guardian";
      badgeColor = "bg-forest text-white border-forest";
      badgeIcon = Sparkles;
      badgeDescription = "Exceptional! Well below India's 33g/day national average.";
    } else if (avgDaily > 45) {
      badgeName = "High Footprint Alert";
      badgeColor = "bg-red-50 text-red-700 border-red-300";
      badgeIcon = AlertCircle;
      badgeDescription = "Exceeding metropolitan average. Adopt weekly swaps below.";
    }
  }

  const BadgeIcon = badgeIcon;

  return (
    <motion.div 
      variants={kineticContainer}
      initial="hidden"
      animate="visible"
      className="w-full max-w-[1800px] mx-auto space-y-6 font-body"
    >
      
      {/* Top Banner Ribbon */}
      <motion.section 
        variants={kineticCard}
        style={{ perspective: 1000, willChange: 'transform, opacity' }}
        className="infra-card p-4 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl flex flex-wrap items-center justify-between gap-4 font-mono text-xs shadow-sm"
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-foreground tracking-wide">
              SUNDAY HABIT AUDIT // 7-DAY REVIEW
            </span>
          </div>
          <span className="text-border hidden sm:inline">|</span>
          <span className="hidden sm:inline text-muted-foreground">National Benchmark: <strong className="text-foreground">33g / day</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
            {cleanDays}/{hasData ? weekData.length : 0} DAYS UNDER LIMIT
          </span>
        </div>
      </motion.section>

      {/* Demo Benchmark Active Ribbon */}
      {isDemo && (
        <motion.div 
          variants={kineticCard}
          style={{ perspective: 1000 }}
          className="p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 shadow-sm text-amber-950 font-mono text-xs sm:text-sm"
        >
          <div className="flex items-center gap-2.5 font-bold">
            <Sparkles size={18} className="text-amber-700 shrink-0" />
            <span>DEMO BENCHMARK ACTIVE: 7-Day Campus Audit Data Loaded</span>
          </div>
          <motion.button
            whileHover={kineticHover}
            whileTap={kineticTap}
            onClick={() => clearDemoData()}
            type="button"
            className="px-3.5 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-black text-xs transition shadow-xs cursor-pointer"
          >
            Clear Demo Data
          </motion.button>
        </motion.div>
      )}

      {/* 3 Summary Metric Cards + Badge */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Weekly Mass */}
        <motion.div 
          variants={kineticCard}
          whileHover={kineticHover}
          style={{ perspective: 1000 }}
          className="infra-card p-5 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl shadow-sm"
        >
          <div className="flex justify-between items-center text-muted-foreground font-mono text-xs">
            <span>TOTAL 7-DAY MASS</span>
            <TrendingDown size={16} className="text-emerald-700" />
          </div>
          <p className="font-mono text-3xl font-bold text-foreground tracking-tight mt-2">
            {totalWeeklyGrams} <span className="text-base font-normal text-muted-foreground">g</span>
          </p>
          <span className="font-mono text-[10px] text-stone-500 mt-1 block">
            {(totalWeeklyGrams / 1000).toFixed(2)} kg plastic logged
          </span>
        </motion.div>

        {/* Daily Average */}
        <motion.div 
          variants={kineticCard}
          whileHover={kineticHover}
          style={{ perspective: 1000 }}
          className="infra-card p-5 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl shadow-sm"
        >
          <div className="flex justify-between items-center text-muted-foreground font-mono text-xs">
            <span>DAILY AVERAGE</span>
            <ShieldCheck size={16} className="text-primary" />
          </div>
          <p className="font-mono text-3xl font-bold text-foreground tracking-tight mt-2">
            {avgDaily} <span className="text-base font-normal text-muted-foreground">g/day</span>
          </p>
          <span className="font-mono text-[10px] text-stone-500 mt-1 block">
            {avgDaily <= 33 ? "Below India's 33g baseline" : "Above national per capita"}
          </span>
        </motion.div>

        {/* Goal Met */}
        <motion.div 
          variants={kineticCard}
          whileHover={kineticHover}
          style={{ perspective: 1000 }}
          className="infra-card p-5 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl shadow-sm"
        >
          <div className="flex justify-between items-center text-muted-foreground font-mono text-xs">
            <span>TARGET COMPLIANCE</span>
            <Award size={16} className="text-amber-600" />
          </div>
          <p className="font-mono text-3xl font-bold text-primary tracking-tight mt-2">
            {cleanDays} <span className="text-base font-normal text-muted-foreground">/ {weekData.length || 7} Days</span>
          </p>
          <span className="font-mono text-[10px] text-stone-500 mt-1 block">
            Days under 40g limit
          </span>
        </motion.div>

        {/* Dynamic Status Badge */}
        <motion.div 
          variants={kineticCard}
          whileHover={kineticHover}
          style={{ perspective: 1000 }}
          className="infra-card p-5 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl flex flex-col justify-between shadow-sm"
        >
          <div className="flex justify-between items-center text-muted-foreground font-mono text-xs">
            <span>AUDIT STATUS BADGE</span>
            <BadgeIcon size={16} className="text-primary" />
          </div>
          <div className="mt-2">
            <span className={`inline-block font-mono text-xs font-bold px-2.5 py-1 rounded-lg border ${badgeColor}`}>
              {badgeName}
            </span>
            <p className="text-[11px] text-stone-600 font-body mt-1 leading-snug">
              {badgeDescription}
            </p>
          </div>
        </motion.div>
      </div>

      {/* 7-Day Bar Chart */}
      <motion.section 
        variants={kineticChartCard}
        style={{ perspective: 1000, willChange: 'transform, opacity' }}
        className="infra-card p-6 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl space-y-4 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-border">
          <div>
            <h3 className="text-lg font-bold font-heading text-foreground">
              7-Day Daily Consumption Breakdown
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Identifies your highest consumption days and lowest impact baseline.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-0 border-t-2 border-dashed border-amber-600"></span>
              <span>Target Limit (40g)</span>
            </div>
          </div>
        </div>

        {/* Chart Canvas Area */}
        <div className="h-64 sm:h-72 w-full relative bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl border border-white/50 p-4 transition-all duration-300">
          {hasData ? (
            <>
              {/* Y-Axis Gridlines */}
              <div className="absolute inset-x-10 top-6 bottom-10 flex flex-col justify-between pointer-events-none text-stone-700 font-mono text-[10px] font-bold">
                {[100, 80, 60, 40, 20, 0].map((val) => (
                  <div key={val} className="w-full flex items-center gap-2">
                    <span className="w-7 text-right">{val}g</span>
                    <div className="flex-1 h-px bg-black/10"></div>
                  </div>
                ))}
              </div>

              {/* Ceiling Overlay Line (40g) */}
              <div className="absolute inset-x-16 bottom-[125px] pointer-events-none flex items-center z-20">
                <div className="w-full h-0 border-t-2 border-dashed border-amber-600/90"></div>
                <span className="absolute right-0 -top-3.5 bg-amber-100/90 text-amber-950 font-mono text-[10px] px-2.5 py-0.5 rounded-full uppercase font-black border border-amber-300/80 shadow-2xs backdrop-blur-xs">
                  TARGET: 40g
                </span>
              </div>

              {/* 7 Daily Bars */}
              <div className="relative h-full pl-10 pr-6 pb-6 pt-4 grid grid-cols-7 gap-3 sm:gap-6 items-end z-10">
                {weekData.map((item, idx) => {
                  const heightPct = `${Math.min(100, item.grams)}%`;
                  const isOver = item.grams > ceilingGrams;
                  return (
                    <div
                      key={`${item.day}-${idx}`}
                      className="group flex flex-col items-center justify-end h-full relative cursor-pointer"
                    >
                      {item.isBest && (
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-950 font-mono text-[9px] rounded-full font-black mb-1 border border-emerald-400/60 shadow-2xs backdrop-blur-xs">
                          ★ LOWEST
                        </span>
                      )}

                      <div className={`font-mono text-xs font-black mb-1 group-hover:scale-110 transition-transform ${
                        item.isBest ? 'text-emerald-950' : isOver ? 'text-amber-900' : 'text-stone-900'
                      }`}>
                        {item.grams}g
                      </div>

                      <div
                        className={`w-full max-w-[48px] rounded-t-xl transition-all duration-300 shadow-xs ${
                          item.isBest
                            ? 'bg-emerald-700'
                            : isOver
                            ? 'bg-amber-600'
                            : 'bg-[#1b4332]'
                        }`}
                        style={{ height: heightPct }}
                      ></div>

                      <span className={`font-mono text-xs uppercase mt-2 font-black ${
                        item.isBest ? 'text-emerald-950' : 'text-stone-900'
                      }`}>
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-11 h-11 rounded-2xl bg-emerald-700/20 border border-emerald-600/40 flex items-center justify-center text-emerald-950 mb-2">
                <Award size={22} />
              </div>
              <h4 className="text-base font-black font-heading text-stone-950">No Weekly Audit Data Found</h4>
              <p className="text-xs text-stone-800 font-medium max-w-sm mt-0.5 mb-3">
                Log daily entries or load the Campus Benchmark demo dataset to generate your Sunday Habit breakdown and lowest-impact day.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => loadCampusDemoData()}
                  type="button"
                  className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-950 text-white font-mono text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer border border-emerald-400/50"
                >
                  <Sparkles size={14} className="text-emerald-300" />
                  <span>⚡ Load Campus Demo Data</span>
                </button>
                <Link
                  to="/tracker"
                  className="px-3.5 py-1.5 bg-white/70 hover:bg-white text-stone-950 border border-white/80 font-mono text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                >
                  + Go to Daily Tracker
                </Link>
              </div>
            </div>
          )}
        </div>
      </motion.section>

      {/* Tailored Weekly Reduction Challenges */}
      <motion.section 
        variants={kineticCard}
        style={{ perspective: 1000, willChange: 'transform, opacity' }}
        className="space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
          <div>
            <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold tracking-wider uppercase">
              <Zap size={16} />
              <span>Tailored Weekly Action Challenges</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Personalized reduction plans addressing the highest-mass polymer categories from your audits.
            </p>
          </div>
        </div>

        <motion.div 
          variants={kineticContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {TAILORED_CHALLENGES.map((challenge, idx) => (
            <motion.div
              key={idx}
              variants={kineticCard}
              whileHover={kineticHover}
              style={{ perspective: 1000 }}
              className="infra-card p-5 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-white/60 text-stone-800 border border-white/80">
                    {challenge.category}
                  </span>
                  <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {challenge.impact}
                  </span>
                </div>

                <h4 className="text-base font-bold text-foreground mt-3 font-heading leading-snug">
                  {challenge.title}
                </h4>
                <p className="text-xs text-stone-600 mt-2 font-body leading-relaxed">
                  {challenge.description}
                </p>
              </div>

              <motion.div whileHover={kineticHover} whileTap={kineticTap}>
                <Link
                  to={challenge.link}
                  className="w-full py-2.5 px-3 rounded-xl border border-border hover:bg-primary hover:text-white hover:border-primary text-foreground transition-all font-mono text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer group mt-4 shadow-2xs"
                >
                  <span>{challenge.actionText}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
