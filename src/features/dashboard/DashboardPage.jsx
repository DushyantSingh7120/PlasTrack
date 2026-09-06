import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Trash2, Recycle, AlertTriangle, TrendingDown, Radio, Activity, Terminal } from 'lucide-react';

const mockData = [
  { name: 'Mon', plastic: 38 },
  { name: 'Tue', plastic: 42 },
  { name: 'Wed', plastic: 12 },
  { name: 'Thu', plastic: 35 },
  { name: 'Fri', plastic: 48 },
  { name: 'Sat', plastic: 52 },
  { name: 'Sun', plastic: 25 },
];

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
  // Try to load history from local storage
  const [history, setHistory] = useState([]);
  
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

  // Use real data if available, else fallback to mock
  const chartData = history.length > 0 ? history.map((entry, i) => ({
    name: new Date(entry.timestamp).toLocaleDateString('en-US', { weekday: 'short' }),
    plastic: entry.totalGrams
  })).slice(-7) : mockData;

  const totalGrams = chartData.reduce((sum, day) => sum + day.plastic, 0);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full max-w-[1800px] mx-auto space-y-6 font-body"
    >
      
      {/* Clean Top Ribbon */}
      <motion.div variants={itemVariants} className="infra-card p-4 bg-white/40 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-foreground">PLASTITRACK // DASHBOARD</span>
          </div>
          <span className="text-border hidden sm:inline">|</span>
          <span className="text-muted-foreground hidden sm:inline">Overview of your tracked plastic</span>
        </div>
      </motion.div>

      {/* Top Stats Row (Cleaned up, no CO2) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard 
          title="Total 7-Day Weight" 
          value={`${totalGrams} g`} 
          trend="Total plastic logged" 
          icon={<Trash2 size={18} className="text-accent" />}
          trendType="neutral"
        />
        <StatCard 
          title="Recyclable Fraction" 
          value="~74%" 
          trend="Based on common polymers" 
          icon={<Recycle size={18} className="text-emerald-700" />}
          trendType="positive"
        />
        <StatCard 
          title="Days Tracked" 
          value={history.length > 0 ? history.length : 7} 
          trend="Keep up the habit" 
          icon={<Activity size={18} className="text-primary" />}
          trendType="neutral"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Trend Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2 infra-card p-6 bg-white/40 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground uppercase">
                <Activity size={14} className="text-primary" />
                <span>7-DAY TRACKING (GRAMS)</span>
              </div>
              <h3 className="text-lg font-bold font-heading text-foreground mt-1 tracking-tight">
                Daily Plastic Weight
              </h3>
            </div>
          </div>

          <div className="h-[290px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPlastic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1b4332" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#1b4332" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dbd9ce" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#718379', fontSize: 12, fontFamily: 'Geist Mono' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#718379', fontSize: 12, fontFamily: 'Geist Mono' }} unit="g" />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #cfcdc1', 
                    backgroundColor: '#ffffff',
                    boxShadow: '0 8px 20px -4px rgba(14, 30, 23, 0.1)', 
                    fontFamily: 'Geist Mono',
                    fontSize: '12px'
                  }}
                  itemStyle={{ color: '#0e1e17', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="plastic" stroke="#1b4332" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPlastic)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Secondary Info / Breakdown */}
        <motion.div variants={itemVariants} className="infra-card p-6 bg-white/40 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
              <span className="font-mono text-[11px] text-muted-foreground uppercase">
                COMMON PLASTICS
              </span>
            </div>
            <h3 className="text-lg font-bold font-heading text-foreground mb-1 tracking-tight">
              Average Breakdown
            </h3>
            <p className="text-xs text-muted-foreground mb-6">
              Most common items logged by users
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-4">
            <CategoryBar label="Beverages (PET #1)" percentage={41} color="bg-primary" />
            <CategoryBar label="Foodware (PP #5)" percentage={36} color="bg-leaf" />
            <CategoryBar label="Packaging (LDPE #4)" percentage={5} color="bg-sky" />
            <CategoryBar label="Misc (PS/Multi)" percentage={18} color="bg-accent" />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}

function StatCard({ title, value, trend, icon, trendType }) {
  const trendColors = {
    positive: 'text-emerald-700',
    negative: 'text-accent',
    neutral: 'text-muted-foreground'
  };

  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className="infra-card p-5 bg-white/40 backdrop-blur-xl flex flex-col justify-between group"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="p-2.5 bg-black/5 rounded-lg border border-border group-hover:bg-primary group-hover:text-white transition-colors">
          {icon}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-medium text-muted-foreground mb-1">{title}</h4>
        <div className="text-3xl font-bold text-foreground font-mono tracking-tight mb-1.5">{value}</div>
        <div className={`text-xs font-mono font-medium ${trendColors[trendType]}`}>{trend}</div>
      </div>
    </motion.div>
  );
}

function CategoryBar({ label, percentage, color }) {
  return (
    <div className="space-y-1.5 font-mono">
      <div className="flex justify-between text-xs">
        <span className="text-foreground font-medium">{label}</span>
        <span className="text-muted-foreground font-semibold">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-stone rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className={`h-full rounded-full ${color}`} 
        />
      </div>
    </div>
  );
}
