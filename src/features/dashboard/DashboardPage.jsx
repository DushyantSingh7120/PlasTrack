import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Trash2, Recycle, AlertTriangle, TrendingDown } from 'lucide-react';

const mockData = [
  { name: 'Mon', plastic: 4.2 },
  { name: 'Tue', plastic: 3.8 },
  { name: 'Wed', plastic: 5.1 },
  { name: 'Thu', plastic: 4.5 },
  { name: 'Fri', plastic: 6.2 },
  { name: 'Sat', plastic: 5.8 },
  { name: 'Sun', plastic: 3.9 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function DashboardPage() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto space-y-6"
    >
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Plastic Used" 
          value="33.5 kg" 
          trend="+12% this week" 
          icon={<Trash2 size={20} className="text-accent" />}
          trendType="negative"
        />
        <StatCard 
          title="Recycled" 
          value="14.2 kg" 
          trend="+5% this week" 
          icon={<Recycle size={20} className="text-emerald-500" />}
          trendType="positive"
        />
        <StatCard 
          title="Critical Alerts" 
          value="2" 
          trend="Single-use peaks detected" 
          icon={<AlertTriangle size={20} className="text-amber-500" />}
          trendType="neutral"
        />
        <StatCard 
          title="Carbon Offset" 
          value="45 kg CO2" 
          trend="Equivalent saved" 
          icon={<TrendingDown size={20} className="text-primary" />}
          trendType="positive"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Trend Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-panel bg-white/70 p-6 rounded-2xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Weekly Usage Trend</h3>
            <p className="text-sm text-muted-foreground">Plastic consumption over the last 7 days</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPlastic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 500 }}
                  itemStyle={{ color: '#0F172A' }}
                />
                <Area type="monotone" dataKey="plastic" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorPlastic)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Secondary Info / Breakdown */}
        <motion.div variants={itemVariants} className="glass-panel bg-white/70 p-6 rounded-2xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Usage by Category</h3>
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-4">
            <CategoryBar label="Single-use (PET)" percentage={45} color="bg-accent" />
            <CategoryBar label="Packaging (HDPE)" percentage={30} color="bg-primary" />
            <CategoryBar label="Household (PP)" percentage={15} color="bg-emerald-500" />
            <CategoryBar label="Other" percentage={10} color="bg-slate-400" />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}

function StatCard({ title, value, trend, icon, trendType }) {
  const trendColors = {
    positive: 'text-emerald-600',
    negative: 'text-accent',
    neutral: 'text-muted-foreground'
  };

  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-panel bg-white/70 p-6 rounded-2xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-1">{title}</h4>
        <div className="text-3xl font-bold text-foreground font-mono mb-2">{value}</div>
        <div className={`text-xs font-medium ${trendColors[trendType]}`}>{trend}</div>
      </div>
    </motion.div>
  );
}

function CategoryBar({ label, percentage, color }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500 font-mono">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className={`h-full rounded-full ${color}`} 
        />
      </div>
    </div>
  );
}
