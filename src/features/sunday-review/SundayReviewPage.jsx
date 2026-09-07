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
  const ceilingGrams = 40; // Target daily limit

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

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  const weekData = useMemo(() => {
    if (history.length > 0) {
      const last7 = history.slice(-7);
      return last7.map((entry) => {
        const date = new Date(entry.timestamp);
        return {
          day: days[date.getDay()],
          grams: entry.totalGrams || 0,
          isBest: false
        };
      });
    }
    return [
      { day: 'MON', grams: 38, isBest: false },
      { day: 'TUE', grams: 42, isBest: false },
      { day: 'WED', grams: 12, isBest: false },
      { day: 'THU', grams: 35, isBest: false },
      { day: 'FRI', grams: 48, isBest: false },
      { day: 'SAT', grams: 52, isBest: false },
      { day: 'SUN', grams: 25, isBest: false }
    ];
  }, [history]);

  // Find lowest consumption day
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

  // Compute Impact Badge
  let badgeName = "Conscious Reducer";
  let badgeColor = "bg-emerald-50 text-emerald-800 border-emerald-300";
  let badgeIcon = ShieldCheck;
  let badgeDescription = "Maintaining solid personal consumption control.";

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

  const BadgeIcon = badgeIcon;

  return (
    <div className="w-full max-w-[1800px] mx-auto space-y-6 font-body">
      
      {/* Top Banner Ribbon */}
      <section className="infra-card p-4 bg-white/50 backdrop-blur-xl border border-border flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
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
            {cleanDays}/{weekData.length || 7} DAYS UNDER LIMIT
          </span>
        </div>
      </section>

      {/* 3 Summary Metric Cards + Badge */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Weekly Mass */}
        <div className="infra-card p-5 bg-white/50 backdrop-blur-xl border border-border">
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
        </div>

        {/* Daily Average */}
        <div className="infra-card p-5 bg-white/50 backdrop-blur-xl border border-border">
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
        </div>

        {/* Goal Met */}
        <div className="infra-card p-5 bg-white/50 backdrop-blur-xl border border-border">
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
        </div>

        {/* Dynamic Status Badge */}
        <div className="infra-card p-5 bg-white/50 backdrop-blur-xl border border-border flex flex-col justify-between">
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
        </div>
      </div>

      {/* 7-Day Bar Chart */}
      <section className="infra-card p-6 bg-white/50 backdrop-blur-xl border border-border space-y-4">
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

        {/* The Bar Chart Canvas Container */}
        <div className="relative w-full h-72 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl p-4 border border-white/50 overflow-hidden shadow-inner transition-all">
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
        </div>
      </section>

      {/* Tailored Weekly Reduction Challenges */}
      <section className="space-y-4">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TAILORED_CHALLENGES.map((challenge, idx) => (
            <div
              key={idx}
              className="infra-card p-5 bg-white/50 backdrop-blur-xl border border-border flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
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

              <Link
                to={challenge.link}
                className="w-full py-2.5 px-3 rounded-lg border border-border hover:bg-primary hover:text-white hover:border-primary text-foreground transition-all font-mono text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer group mt-4 shadow-2xs"
              >
                <span>{challenge.actionText}</span>
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
