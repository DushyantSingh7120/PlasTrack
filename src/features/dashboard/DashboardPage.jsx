import React from 'react';
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
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 26 } }
};

export default function DashboardPage() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto space-y-6 font-body"
    >
      
      {/* Telemetry Console Ribbon */}
      <motion.div variants={itemVariants} className="infra-card p-4 bg-white/85 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-foreground">PROD-STREAM // ENVIRONMENTAL METRICS</span>
          </div>
          <span className="text-border">|</span>
          <span className="text-muted-foreground">NODE: PERSONAL-HUB-01 // CAMPUS LOG</span>
          <span className="text-border hidden sm:inline">|</span>
          <span className="text-muted-foreground hidden sm:inline">RESOLUTION: 100ms</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold text-[11px]">
            HEALTHY (99.9%)
          </span>
          <span className="px-2 py-0.5 rounded bg-forest text-white font-semibold text-[11px]">
            CHE110 READY
          </span>
        </div>
      </motion.div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          code="METRIC_01"
          title="Total 7-Day Mass" 
          value="252 g" 
          trend="-34% vs 385g baseline" 
          icon={<Trash2 size={18} className="text-accent" />}
          trendType="positive"
        />
        <StatCard 
          code="METRIC_02"
          title="Recyclable Fraction" 
          value="186 g (74%)" 
          trend="High recapture potential" 
          icon={<Recycle size={18} className="text-emerald-700" />}
          trendType="positive"
        />
        <StatCard 
          code="METRIC_03"
          title="Days Over Ceiling (40g)" 
          value="2 / 7" 
          trend="Fri & Sat excess spikes" 
          icon={<AlertTriangle size={18} className="text-amber-600" />}
          trendType="negative"
        />
        <StatCard 
          code="METRIC_04"
          title="Carbon Footprint" 
          value="~552 g CO2e" 
          trend="0.55 kg lifecycle equivalent" 
          icon={<TrendingDown size={18} className="text-primary" />}
          trendType="positive"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Trend Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2 infra-card p-6 bg-white/90">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground uppercase">
                <Activity size={14} className="text-primary" />
                <span>TELEMETRY_SERIES // 7-DAY INGESTION (GRAMS)</span>
              </div>
              <h3 className="text-lg font-bold font-heading text-foreground mt-1 tracking-tight">
                Daily Plastic Consumption Trajectory
              </h3>
            </div>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-black/5 text-muted-foreground">
              TIME_SPAN: 168h
            </span>
          </div>

          <div className="h-[290px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
        <motion.div variants={itemVariants} className="infra-card p-6 bg-white/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
              <span className="font-mono text-[11px] text-muted-foreground uppercase">
                POLYMERS // CATEGORICAL
              </span>
              <span className="font-mono text-xs text-primary font-bold">100%</span>
            </div>
            <h3 className="text-lg font-bold font-heading text-foreground mb-1 tracking-tight">
              Polymer Segregation
            </h3>
            <p className="text-xs text-muted-foreground mb-6">
              Classification by chemical resin composition
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-4">
            <CategoryBar label="Beverages (PET #1)" percentage={41} color="bg-primary" />
            <CategoryBar label="Foodware (PP #5)" percentage={36} color="bg-leaf" />
            <CategoryBar label="Packaging (Films LDPE #4)" percentage={5} color="bg-sky" />
            <CategoryBar label="Cutlery & Multi (PS/Misc)" percentage={18} color="bg-accent" />
          </div>

          <div className="pt-4 mt-6 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>AUDIT STATUS</span>
            <span className="text-emerald-700 font-semibold">VERIFIED</span>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}

function StatCard({ code, title, value, trend, icon, trendType }) {
  const trendColors = {
    positive: 'text-emerald-700',
    negative: 'text-accent',
    neutral: 'text-muted-foreground'
  };

  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className="infra-card p-5 bg-white/90 flex flex-col justify-between group"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="p-2.5 bg-black/5 rounded-lg border border-border group-hover:bg-primary group-hover:text-white transition-colors">
          {icon}
        </div>
        <span className="font-mono text-[10px] text-muted-foreground tracking-wider">{code}</span>
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
