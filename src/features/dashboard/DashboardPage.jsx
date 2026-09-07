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
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFactOfTheDay } from '../../lib/factsDatabase';
import { loadCampusDemoData, clearDemoData, isDemoDataActive } from '../../lib/demoData';
import { getStoredHistory } from '../../lib/storage';
import { 
  kineticContainer, 
  kineticCard, 
  kineticChartCard, 
  kineticHover, 
  kineticTap 
} from '../../lib/motion';
import KineticTiltCard from '../../components/ui/KineticTiltCard';
import AnimatedCounter from '../../components/ui/AnimatedCounter';
import FrequentItemsShelf from '../../components/ui/FrequentItemsShelf';
import AcademicAuditModal from '../../components/ui/AcademicAuditModal';

export default function DashboardPage() {
  const [history, setHistory] = useState(() => getStoredHistory());
  const [isDemo, setIsDemo] = useState(() => isDemoDataActive());
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const factOfTheDay = useMemo(() => getFactOfTheDay(), []);

  const syncData = () => {
    setHistory(getStoredHistory());
    setIsDemo(isDemoDataActive());
  };

  useEffect(() => {
    window.addEventListener('plastitrack-data-updated', syncData);
    window.addEventListener('storage', syncData);
    return () => {
      window.removeEventListener('plastitrack-data-updated', syncData);
      window.removeEventListener('storage', syncData);
    };
  }, []);

  // Compute 7-day chart data with timestamp and number sanitization
  const chartData = useMemo(() => {
    if (Array.isArray(history) && history.length > 0) {
      return history.slice(-7).map((entry) => {
        const d = entry?.timestamp ? new Date(entry.timestamp) : new Date();
        const isValid = !isNaN(d.getTime());
        return {
          name: isValid ? d.toLocaleDateString('en-US', { weekday: 'short' }) : 'Day',
          plastic: Number(entry?.totalGrams) || 0,
          cost: Number(entry?.totalCostINR) || Math.round((Number(entry?.totalGrams) || 0) * 1.2)
        };
      });
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
      variants={kineticContainer}
      initial="hidden"
      animate="show"
      className="w-full max-w-[1800px] mx-auto space-y-6 font-body"
    >
      
      {/* Top Telemetry Status Ribbon */}
      <motion.div 
        variants={kineticCard} 
        style={{ perspective: 1000, willChange: 'transform, opacity' }}
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

          <motion.button
            whileHover={kineticHover}
            whileTap={kineticTap}
            onClick={() => setIsAuditModalOpen(true)}
            type="button"
            className="px-3 py-2 bg-white/70 hover:bg-white text-stone-900 border border-stone-300/80 rounded-xl font-mono text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
            title="Generate Official CPCB Academic Environmental Audit Report (Print / PDF)"
          >
            <FileText size={14} className="text-emerald-700" />
            <span className="hidden sm:inline">Academic CPCB Audit</span>
            <span className="sm:hidden">Audit</span>
          </motion.button>

          <motion.div whileHover={kineticHover} whileTap={kineticTap}>
            <Link 
              to="/tracker" 
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-950 text-white rounded-xl font-mono text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>+ Full Tracker</span>
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* 1-Click Campus Quick-Log Shelf with Expanded Hit Targets */}
      <FrequentItemsShelf />

      {/* Demo Mode Active Banner (Only shown when Demo Data is active) */}
      {isDemo && (
        <motion.div
          variants={kineticCard}
          style={{ perspective: 1000 }}
          className="p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 shadow-sm text-amber-950 font-mono text-xs sm:text-sm"
        >
          <div className="flex items-center gap-2.5 font-bold">
            <Sparkles size={18} className="text-amber-700 shrink-0" />
            <span>DEMO BENCHMARK ACTIVE: Displaying Calibrated 7-Day Indian Campus Student Audit</span>
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

      {/* Fact of the Day Highlight Banner with 3D Magnetic Tilt */}
      <motion.div 
        variants={kineticCard}
        style={{ perspective: 1000, willChange: 'transform, opacity' }}
      >
        <KineticTiltCard
          tiltDegree={6}
          scaleOnHover={1.018}
          className="p-6 sm:p-7 rounded-2xl bg-white/35 hover:bg-white/45 backdrop-blur-xl border border-white/60 shadow-md relative overflow-hidden transition-[background-color,border-color] duration-200"
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
        </KineticTiltCard>
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
          variants={kineticChartCard} 
          style={{ willChange: 'transform, opacity' }}
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
          </div>
          <div className="h-[310px] w-full">
            {hasData ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="plasticGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#064e3b" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#064e3b" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.08)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700, fontFamily: 'monospace' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700, fontFamily: 'monospace' }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.92)', 
                      borderRadius: '12px', 
                      border: '1px solid rgba(0,0,0,0.15)',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                      fontFamily: 'monospace',
                      color: '#0c0a09',
                      fontWeight: 'bold'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="plastic" 
                    stroke="#064e3b" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#plasticGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-white/10 rounded-xl border border-dashed border-stone-300">
                <Trash2 size={36} className="text-stone-400 mb-3" />
                <h4 className="text-base font-bold text-stone-800 font-heading">No Plastic Logs Found</h4>
                <p className="text-xs sm:text-sm text-stone-600 max-w-sm mt-1">
                  Start logging your daily plastic items to see your 7-day trajectory chart, or load sample campus benchmark data.
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5 justify-center">
                  <button
                    onClick={() => loadCampusDemoData()}
                    type="button"
                    className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-950 text-white rounded-lg font-mono text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles size={13} className="text-emerald-300" />
                    <span>Load Campus Demo</span>
                  </button>
                  <Link
                    to="/tracker"
                    className="px-3.5 py-1.5 bg-white/80 hover:bg-white text-stone-900 border border-stone-300 rounded-lg font-mono text-xs font-bold transition shadow-xs"
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
          variants={kineticCard} 
          style={{ perspective: 1000, willChange: 'transform, opacity' }}
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
                {hasData 
                  ? (avgDailyGrams <= nationalAvgGrams 
                      ? "✓ Great! You are consuming less plastic than India's national average."
                      : `⚠️ Notice: You are ${Math.abs(vsNationalPct)}% above India's national per capita average.`)
                  : "No consumption logged yet. Log items or load demo data to benchmark against national baseline."}
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

      {/* Academic CPCB Environmental Audit Report Modal */}
      <AcademicAuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        auditData={{
          totalGrams,
          avgDailyGrams,
          nationalAvgGrams,
          totalCostINR: totalCost,
          cycleDays: chartData.length || 7,
          chartData
        }}
      />
    </motion.div>
  );
}

function StatCard({ title, value, subValue, trend, icon, badgeClass }) {
  return (
    <motion.div 
      variants={kineticCard}
      style={{ perspective: 1000, willChange: 'transform, opacity' }}
      className="h-full"
    >
      <KineticTiltCard
        tiltDegree={8}
        className="h-full p-5 sm:p-6 rounded-2xl bg-white/35 hover:bg-white/45 backdrop-blur-xl border border-white/60 hover:border-white/90 flex flex-col justify-between group shadow-md hover:shadow-xl transition-all duration-200"
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
          <div className="text-3xl sm:text-4xl font-black text-stone-950 font-mono tracking-tight mb-1">
            <AnimatedCounter value={value} />
          </div>
          <div className="text-xs sm:text-sm font-bold text-stone-800">{subValue}</div>
        </div>
      </KineticTiltCard>
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

