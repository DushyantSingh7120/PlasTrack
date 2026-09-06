import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Menu, 
  Bell, 
  Settings, 
  User, 
  Radio, 
  ArrowLeft,
  LayoutGrid,
  BookOpen,
  CalendarCheck
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function DashboardLayout({ children }) {
  const location = useLocation();

  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      tag: 'LIVE', 
      icon: LayoutGrid 
    },
    { 
      name: 'Daily Tracker', 
      path: '/tracker', 
      tag: 'LOG', 
      icon: Activity 
    },
    { 
      name: 'Daily Insights', 
      path: '/insights', 
      tag: 'CHE110', 
      icon: BookOpen 
    },
    { 
      name: 'Sunday Review', 
      path: '/sunday-review', 
      tag: '7-DAY', 
      icon: CalendarCheck 
    },
  ];

  const getHeaderMeta = () => {
    switch (location.pathname) {
      case '/tracker':
        return {
          title: 'Daily Plastic Tracker',
          subtitle: 'INGESTION_LOG // QUICK-ADD LOGGING CONSOLE',
          badgeText: 'TRACKER: ACTIVE',
          badgeColor: 'text-emerald-700',
        };
      case '/insights':
        return {
          title: 'Daily Scientific Insights & Polymer Chemistry',
          subtitle: 'RESEARCH_NODE // POLYMER DEGRADATION DYNAMICS & CIRCULAR BIO-ALTERNATIVES',
          badgeText: 'LAB_KNOWLEDGE: SYNCED',
          badgeColor: 'text-emerald-700',
        };
      case '/sunday-review':
        return {
          title: 'Weekly Habit Audit & Sunday Review',
          subtitle: 'AUDIT_CYCLE // 7-DAY RESIN CONSUMPTION & REDUCTION PLAYBOOK',
          badgeText: 'AUDIT: VERIFIED',
          badgeColor: 'text-emerald-700',
        };
      case '/dashboard':
      default:
        return {
          title: 'Environmental Telemetry Console',
          subtitle: 'TELEMETRY_STREAM // CAMPUS & HOUSEHOLD OBSERVABILITY',
          badgeText: 'STREAM: ACTIVE',
          badgeColor: 'text-emerald-700',
        };
    }
  };

  const headerMeta = getHeaderMeta();

  return (
    <div className="flex h-screen w-full bg-transparent font-body text-foreground overflow-hidden selection:bg-primary selection:text-white">

      {/* Sidebar - PlastiTrack Observability Console Style */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="z-10 w-64 lg:w-72 h-full flex flex-col border-r border-[#cfcdc1]/60 bg-white/40 backdrop-blur-2xl shadow-xs shrink-0"
      >
        <div className="p-5 border-b border-[#cfcdc1]/60 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-forest text-white p-2 rounded-xl group-hover:scale-105 transition-transform shadow-sm">
              <Activity size={20} className="text-emerald-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-heading tracking-tight text-forest leading-none">
                PlastiTrack
              </h1>
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block mt-0.5">
                CONSOLE v2.4
              </span>
            </div>
          </Link>
        </div>

        {/* Cluster Telemetry Status Ribbon */}
        <div className="px-5 py-2.5 bg-black/[0.02] border-b border-[#cfcdc1]/60 flex items-center justify-between font-mono text-[11px] text-stone-700">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="font-semibold tracking-wide">CLUSTER_OK</span>
          </span>
          <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#cfcdc1] font-semibold text-stone-600">
            PROD
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 p-3.5 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3.5 py-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                  isActive 
                    ? 'bg-forest text-white font-medium shadow-sm font-heading' 
                    : 'hover:bg-[#d8d7cb] text-stone-700 hover:text-stone-950 font-body text-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    size={18} 
                    className={isActive ? 'text-emerald-400' : 'text-stone-500'} 
                  />
                  <span>{item.name}</span>
                </div>
                {item.tag && (
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full tracking-wider ${
                    isActive 
                      ? 'bg-emerald-800/80 text-emerald-200 border border-emerald-600/40' 
                      : 'bg-stone-200 text-stone-600'
                  }`}>
                    {item.tag}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Sidebar Footer */}
        <div className="p-4 border-t border-[#cfcdc1]/70 space-y-1">
          <Link 
            to="/" 
            className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#dcdbd0] rounded-lg cursor-pointer transition-colors text-stone-600 hover:text-stone-900 text-xs font-mono"
          >
            <ArrowLeft size={16} />
            <span>Return to Landing</span>
          </Link>
          <div className="flex items-center gap-2.5 px-3 py-2 hover:bg-[#dcdbd0] rounded-lg cursor-pointer transition-colors text-stone-600 hover:text-stone-900 text-xs font-mono">
            <Settings size={16} />
            <span>System Settings</span>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="z-10 flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-[#cfcdc1]/60 flex items-center justify-between px-8 bg-white/40 backdrop-blur-2xl shrink-0">
          <div className="flex items-center gap-4 min-w-0">
            <button className="lg:hidden p-2 text-stone-600 hover:bg-black/5 rounded-lg">
              <Menu size={20} />
            </button>
            <div className="truncate">
              <h2 className="text-base sm:text-lg font-bold font-heading text-stone-900 tracking-tight leading-tight truncate">
                {headerMeta.title}
              </h2>
              <div className="flex items-center gap-2 font-mono text-[11px] text-stone-600 truncate">
                <span className="truncate">{headerMeta.subtitle}</span>
                <span className="hidden sm:inline">&bull;</span>
                <span className="hidden sm:inline text-forest font-semibold">ZERO LOSS BUFFER</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#cfcdc1] bg-white/80 font-mono text-xs text-stone-800 font-medium shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{headerMeta.badgeText}</span>
            </div>
            <button className="p-2 text-stone-600 hover:text-stone-900 hover:bg-white/60 rounded-lg transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-[#e5e4d8]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-stone-300 border border-stone-400/60 flex items-center justify-center font-mono text-xs text-stone-700 font-semibold shadow-inner">
              <User size={16} className="text-stone-600" />
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
