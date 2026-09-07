import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Trash2, 
  Recycle, 
  Activity, 
  Clock, 
  IndianRupee, 
  BookOpen, 
  Info, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFactOfTheDay } from '../../lib/factsDatabase';
import { loadCampusDemoData, clearDemoData, isDemoDataActive } from '../../lib/demoData';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 26 } }
};

export default function DashboardPage() {
  const [history, setHistory] = useState([]);
  const [isDemo, setIsDemo] = useState(false);
  const factOfTheDay = useMemo(() => getFactOfTheDay(), []);

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

  // Compute 7-day chart data
  const chartData = useMemo(() => {
    if (history.length > 0) {
      return history.slice(-7).map((entry) => ({
        name: new Date(entry.timestamp).toLocaleDateString('en-US', { weekday: 'short' }),
        plastic: entry.totalGrams || 0,
        cost: entry.totalCostINR || Math.round((entry.totalGrams || 0) * 1.2)
      }));
    }
    return [];
  }, [history]);

  const hasData = chartData.length > 0;
  const totalGrams = hasData ? chartData.reduce((sum, day) => sum + day.plastic, 0) : 0;
  const totalCost = hasData ? chartData.reduce((sum, day) => sum + (day.cost || 0), 0) : 0;
  const avgDailyGrams = hasData ? Math.round(totalGrams / chartData.length) : 0;
  
  // National per capita benchmark: ~12kg/yr / 365 = ~32.8g/day (~33g)
  const nationalAvgGrams = 33;
  const vsNationalPct = hasData ? Math.round(((avgDailyGrams - nationalAvgGrams) / nationalAvgGrams) * 100) : 0;

  const currentYear = new Date().getFullYear();
  const maxDecompositionYears = hasData ? 450 : 0;
  const persistenceYear = hasData ? currentYear + maxDecompositionYears : currentYear;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full max-w-[1800px] mx-auto space-y-6 font-body"
    >
      
      {/* Top Telemetry Status Ribbon */}
      <motion.div 
        variants={itemVariants} 
        className="p-4 sm:p-5 rounded-2xl bg-white/30 hover:bg-white/40 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 border border-white/60 shadow-sm transition-all"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="font-black text-stone-950 tracking-wide">PLASTITRACK TELEMETRY</span>
          </div>
          <span className="text-stone-400 hidden sm:inline">|</span>
          <span className="text-xs sm:text-sm text-stone-800 font-semibold hidden sm:inline">
            CPCB & NEJM Benchmarked Empirical Engine
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm text-stone-800 font-medium">
            Cycle: <strong className="text-stone-950 font-bold">{hasData ? `${chartData.length}-Day Trajectory` : "No Active Data"}</strong>
          </span>
          <Link 
            to="/tracker" 
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-950 text-white rounded-xl font-mono text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span>+ Quick Log</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>

      {/* Demo Mode Active Banner (Only shown when Demo Data is active) */}
      {isDemo && (
        <motion.div
          variants={itemVariants}
          className="p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 shadow-sm text-amber-950 font-mono text-xs sm:text-sm"
        >
          <div className="flex items-center gap-2.5 font-bold">
            <Sparkles size={18} className="text-amber-700 shrink-0" />
            <span>DEMO BENCHMARK ACTIVE: Displaying Calibrated 7-Day Indian Campus Student Audit</span>
          </div>
          <button
            onClick={() => clearDemoData()}
            type="button"
            className="px-3.5 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-black text-xs transition shadow-xs cursor-pointer"
          >
            Clear Demo Data
          </button>
        </motion.div>
      )}

      {/* Fact of the Day Highlight Banner */}
      <motion.div 
        variants={itemVariants}
        className="p-6 sm:p-7 rounded-2xl bg-white/35 hover:bg-white/45 backdrop-blur-xl border border-white/60 shadow-md relative overflow-hidden transition-all"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-black/10">
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-emerald-950 font-black tracking-wider uppercase">
            <BookOpen size={18} className="text-emerald-800 shrink-0" />
            <span>DAILY RESEARCH DOSSIER // FACT OF THE DAY</span>
          </div>
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-white/60 text-emerald-950 border border-white/80 font-black shadow-2xs">
            {factOfTheDay.tag}
          </span>
        </div>

        <div className="mt-4 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="max-w-4xl space-y-2">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-heading text-stone-950 tracking-tight leading-tight">
              {factOfTheDay.title}
            </h3>
            <p className="text-base sm:text-lg text-stone-900 leading-relaxed font-medium">
              {factOfTheDay.content}
            </p>
            <div className="pt-2 flex items-center gap-2 font-mono text-xs sm:text-sm text-stone-800 font-semibold">
              <Info size={15} className="text-emerald-800 shrink-0" />
              <span>Verified Source: <strong className="text-stone-950 font-black">{factOfTheDay.source}</strong></span>
            </div>
          </div>
          <Link 
            to="/insights"
            className="shrink-0 self-start lg:self-center px-5 py-2.5 bg-white/60 hover:bg-white/90 text-stone-950 border border-white/70 rounded-xl font-mono text-xs sm:text-sm font-black shadow-2xs flex items-center gap-2 transition-all cursor-pointer backdrop-blur-md"
          >
            <span>Read 20+ Facts</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </motion.div>

      {/* 4 Telemetry Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="7-Day Cumulative Mass" 
          value={hasData ? `${totalGrams} g` : "0 g"} 
          subValue={hasData ? `Avg: ${avgDailyGrams} g / day` : "Zero items recorded"}
          trend={hasData ? (avgDailyGrams <= nationalAvgGrams ? "Below India Avg" : "Above India Avg") : "Zero Baseline"}
          icon={<Trash2 size={22} className="text-amber-700" />}
          badgeClass={hasData && avgDailyGrams > nationalAvgGrams ? "text-amber-950 bg-amber-100/70 border-amber-300" : "text-emerald-950 bg-emerald-100/70 border-emerald-300"}
        />
        <StatCard 
          title="Money Spent on Disposables" 
          value={hasData ? `₹${totalCost}` : "₹0"} 
          subValue={hasData ? "Retail expenditure" : "Zero expense recorded"}
          trend={hasData ? "Save via eco-swaps" : "Zero Waste"} 
          icon={<IndianRupee size={22} className="text-emerald-800" />}
          badgeClass="text-emerald-950 bg-emerald-100/70 border-emerald-300"
        />
        <StatCard 
          title="Decomposition Horizon" 
          value={hasData ? "~450 Yrs" : "0 Yrs"} 
          subValue={hasData ? `Persists to year ~${persistenceYear}` : "No waste persisting"}
          trend={hasData ? "Degrades to microplastics" : "Pure Zero"} 
          icon={<Clock size={22} className="text-teal-800" />}
          badgeClass="text-teal-950 bg-teal-100/70 border-teal-300"
        />
        <StatCard 
          title="Recyclable Fraction" 
          value={hasData ? "~74%" : "0%"} 
          subValue={hasData ? "PET #1 & PP #5 items" : "No items logged"}
          trend={hasData ? "High Indian MRF value" : "Zero Waste"} 
          icon={<Recycle size={22} className="text-green-800" />}
          badgeClass="text-green-950 bg-green-100/70 border-green-300"
        />
      </div>

      {/* Main Charts & Breakdown Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Trend Area Chart */}
        <motion.div 
          variants={itemVariants} 
          className="lg:col-span-2 p-6 sm:p-7 rounded-2xl bg-white/35 hover:bg-white/40 backdrop-blur-xl border border-white/60 shadow-md transition-all"
        >
          <div className="flex flex-wrap items-center justify-between mb-6 pb-4 border-b border-black/10 gap-3">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-emerald-950 font-black uppercase tracking-wider">
                <Activity size={16} className="text-emerald-800" />
                <span>DAILY CONSUMPTION OBSERVABILITY (GRAMS)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-heading text-stone-950 mt-1 tracking-tight">
                7-Day Plastic Weight Trajectory
              </h3>
            </div>
            <div className="font-mono text-xs sm:text-sm text-stone-900 flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-black">
                <span className="w-3 h-3 rounded-full bg-emerald-900"></span>
                <span>Your Logged Grams</span>
              </span>
              <span className="flex items-center gap-1.5 font-bold text-stone-600">
                <span className="w-3 h-3 rounded-full bg-stone-400"></span>
                <span>India Avg (33g)</span>
              </span>
            </div>
          </div>
          <div className="h-[310px] w-full">
            {hasData ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPlastic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1b4332" stopOpacity={0.45}/>
                      <stop offset="95%" stopColor="#1b4332" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#0e1e17', fontSize: 13, fontFamily: 'Geist Mono', fontWeight: 800 }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#0e1e17', fontSize: 13, fontFamily: 'Geist Mono', fontWeight: 800 }} 
                    unit="g" 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: '1px solid rgba(255, 255, 255, 0.8)', 
                      backgroundColor: 'rgba(255, 255, 255, 0.92)',
                      backdropFilter: 'blur(16px)',
                      boxShadow: '0 12px 28px -4px rgba(0, 0, 0, 0.15)', 
                      fontFamily: 'Inter',
                      fontSize: '13px',
                      fontWeight: 700,
                      padding: '10px 14px'
                    }}
                    itemStyle={{ color: '#0e1e17', fontWeight: 800 }}
                  />
                  <Area type="monotone" dataKey="plastic" stroke="#1b4332" strokeWidth={3.5} fillOpacity={1} fill="url(#colorPlastic)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center text-center p-6 bg-white/20 backdrop-blur-md rounded-2xl border border-white/50">
                <div className="w-12 h-12 rounded-2xl bg-emerald-700/20 border border-emerald-600/40 flex items-center justify-center text-emerald-950 mb-3">
                  <Activity size={24} />
                </div>
                <h4 className="text-lg font-black font-heading text-stone-950">No Plastic Waste Logged Yet</h4>
                <p className="text-xs sm:text-sm text-stone-800 font-medium max-w-md mt-1 mb-4">
                  Start logging your daily plastic items in the tracker, or load the pre-calibrated 7-day Campus Benchmark demo dataset to explore full live telemetry and trends.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => loadCampusDemoData()}
                    type="button"
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-950 text-white font-mono text-xs sm:text-sm font-bold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer border border-emerald-400/50"
                  >
                    <Sparkles size={15} className="text-emerald-300" />
                    <span>⚡ Load Campus Demo Data</span>
                  </button>
                  <Link
                    to="/tracker"
                    className="px-4 py-2 bg-white/70 hover:bg-white text-stone-950 border border-white/80 font-mono text-xs sm:text-sm font-bold rounded-xl shadow-xs transition cursor-pointer"
                  >
                    + Go to Daily Tracker
                  </Link>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* National Benchmark & Polymer Breakdown */}
        <motion.div 
          variants={itemVariants} 
          className="p-6 sm:p-7 rounded-2xl bg-white/35 hover:bg-white/40 backdrop-blur-xl border border-white/60 shadow-md flex flex-col justify-between transition-all"
        >
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/10">
              <span className="font-mono text-xs sm:text-sm text-stone-950 font-black uppercase tracking-wider">
                NATIONAL BENCHMARK
              </span>
              <span className="font-mono text-xs text-stone-800 font-bold">CPCB Per Capita</span>
            </div>

            {/* National Benchmark Comparison */}
            <div className="p-4 rounded-xl bg-white/15 border border-white/40 mb-6 font-mono">
              <div className="flex justify-between items-center text-xs sm:text-sm mb-1.5">
                <span className="text-stone-800 font-bold">Your Daily Average:</span>
                <span className="font-black text-stone-950 text-sm sm:text-base">{avgDailyGrams}g / day</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm mb-2.5">
                <span className="text-stone-700 font-bold">India National Per Capita:</span>
                <span className="font-black text-stone-800">{nationalAvgGrams}g / day</span>
              </div>
              <div className="w-full h-2.5 bg-black/10 rounded-full overflow-hidden relative">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    avgDailyGrams <= nationalAvgGrams ? 'bg-emerald-700' : 'bg-orange-600'
                  }`}
                  style={{ width: `${Math.min(100, Math.round((avgDailyGrams / (nationalAvgGrams * 1.5)) * 100))}%` }}
                />
              </div>
              <div className="mt-2.5 text-xs text-stone-900 font-body font-bold leading-snug">
                {hasData 
                  ? (avgDailyGrams <= nationalAvgGrams 
                      ? "✓ Great! You are consuming less plastic than India's national average."
                      : `⚠️ Notice: You are ${Math.abs(vsNationalPct)}% above India's national per capita average.`)
                  : "No consumption logged yet. Log items or load demo data to benchmark against national baseline."}
              </div>
            </div>

            <h4 className="text-base font-black font-heading text-stone-950 mb-3.5">
              Polymer Sorting Telemetry
            </h4>

            <div className="space-y-4 font-mono">
              <CategoryBar label="Beverages (PET #1)" percentage={42} color="bg-emerald-800" detail="~75% Recycled in India" />
              <CategoryBar label="Foodware (PP #5)" percentage={34} color="bg-emerald-700" detail="~40% Recycled" />
              <CategoryBar label="Films (LDPE #4)" percentage={8} color="bg-teal-700" detail="~30% Recycled (>120μm)" />
              <CategoryBar label="Packaging (MLP #7)" percentage={16} color="bg-orange-700" detail="0% Recyclable (Cement Kiln only)" />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-black/10">
            <Link 
              to="/insights" 
              className="text-xs sm:text-sm font-mono font-black text-emerald-950 hover:text-emerald-800 flex items-center justify-between transition-colors"
            >
              <span>Explore full IS 14534 resin codes</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}

function StatCard({ title, value, subValue, trend, icon, badgeClass }) {
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      className="p-5 sm:p-6 rounded-2xl bg-white/35 hover:bg-white/45 backdrop-blur-xl border border-white/60 hover:border-white/90 flex flex-col justify-between group shadow-md hover:shadow-xl transition-all duration-200"
    >
      <div className="flex justify-between items-start mb-3.5">
        <div className="p-3 rounded-xl bg-white/60 border border-white/70 shadow-2xs group-hover:scale-105 transition-transform duration-200">
          {icon}
        </div>
        <span className={`text-xs font-mono font-black px-2.5 py-1 rounded-md border shadow-2xs ${badgeClass}`}>
          {trend}
        </span>
      </div>
      <div>
        <h4 className="text-xs sm:text-sm font-black text-stone-900 tracking-wide font-mono uppercase mb-1">{title}</h4>
        <div className="text-3xl sm:text-4xl font-black text-stone-950 font-mono tracking-tight mb-1">{value}</div>
        <div className="text-xs sm:text-sm font-bold text-stone-800">{subValue}</div>
      </div>
    </motion.div>
  );
}

function CategoryBar({ label, percentage, color, detail }) {
  return (
    <div className="space-y-1 font-mono">
      <div className="flex justify-between text-xs sm:text-sm">
        <span className="text-stone-900 font-bold">{label}</span>
        <span className="text-stone-900 font-extrabold">{percentage}%</span>
      </div>
      <div className="h-2.5 w-full bg-stone-200 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className={`h-full rounded-full ${color}`} 
        />
      </div>
      <div className="text-xs text-stone-600 font-medium">{detail}</div>
    </div>
  );
}

