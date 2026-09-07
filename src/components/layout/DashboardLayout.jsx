import React, { useState, useEffect } from 'react';
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
  CalendarCheck,
  Leaf,
  Sparkles
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { loadCampusDemoData, clearDemoData, isDemoDataActive } from '../../lib/demoData';

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const checkDemo = () => setIsDemo(isDemoDataActive());
    checkDemo();
    window.addEventListener('plastitrack-data-updated', checkDemo);
    window.addEventListener('storage', checkDemo);
    return () => {
      window.removeEventListener('plastitrack-data-updated', checkDemo);
      window.removeEventListener('storage', checkDemo);
    };
  }, []);

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
      name: 'Eco-Alternatives', 
      path: '/alternatives', 
      tag: '3D SWAPS', 
      icon: Leaf 
    },
    { 
      name: 'Daily Insights', 
      path: '/insights', 
      tag: 'RESEARCH', 
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
      case '/alternatives':
        return {
          title: 'Eco-Alternatives & Circular Payback Catalog',
          subtitle: '3D_CATALOG // VERIFIED SUSTAINABLE SWAPS & ANNUAL SAVINGS',
          badgeText: 'SWAPS: VERIFIED',
          badgeColor: 'text-emerald-700',
        };
      case '/insights':
        return {
          title: 'Scientific Research Dossier & Statutory Architecture',
          subtitle: 'RESEARCH_NODE // CPCB & NEJM BENCHMARKED DATA ARCHITECTURE',
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
        className="z-10 w-64 lg:w-72 h-full flex flex-col border-r border-white/60 bg-white/35 backdrop-blur-2xl shadow-sm shrink-0"
      >
        <div className="p-5 border-b border-white/50 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-[#1b4332] text-white p-2 rounded-xl group-hover:scale-105 transition-transform shadow-sm">
              <Activity size={20} className="text-emerald-400" />
            </div>
            <div>
              <h1 className="text-lg font-black font-heading tracking-tight text-[#1b4332] leading-none">
                PlastiTrack
              </h1>
              <span className="text-[10px] font-mono text-stone-800 font-black uppercase tracking-wider block mt-0.5">
                CONSOLE v2.4
              </span>
            </div>
          </Link>
        </div>

        {/* Cluster Telemetry Status Ribbon */}
        <div className="px-5 py-2.5 bg-black/[0.03] border-b border-white/50 flex items-center justify-between font-mono text-[11px] text-stone-950">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="font-black tracking-wide text-stone-950">CLUSTER_OK</span>
          </span>
          <span className="text-[10px] bg-white/70 px-2 py-0.5 rounded border border-white/80 font-black text-stone-950 shadow-2xs backdrop-blur-xs">
            PROD
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 p-3.5 space-y-2 overflow-y-auto">
          <div className="px-3 pt-1 pb-1 flex items-center justify-between text-[10px] font-mono font-black tracking-widest text-stone-700 uppercase">
            <span>Navigation Tabs</span>
            <span className="text-[9px] text-emerald-900 bg-white/70 px-1.5 py-0.2 rounded border border-emerald-300/80 font-black">
              CONSOLE
            </span>
          </div>

          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-all group ${
                  isActive 
                    ? 'bg-[#0f2c1f] text-white shadow-md border-2 border-emerald-500/80 ring-1 ring-emerald-400/30' 
                    : 'bg-white/25 hover:bg-white/55 text-stone-950 border border-white/50 hover:border-white/80 backdrop-blur-md shadow-2xs hover:shadow-xs'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {isActive ? (
                    <span className="w-2 h-5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] shrink-0"></span>
                  ) : (
                    <span className="w-2 h-5 rounded-full bg-transparent shrink-0"></span>
                  )}
                  <Icon 
                    size={19} 
                    className={isActive ? 'text-emerald-300 stroke-[2.3] shrink-0' : 'text-stone-800 group-hover:text-black stroke-[2.2] shrink-0'} 
                  />
                  <span className={isActive ? 'font-black tracking-tight text-white text-sm' : 'font-extrabold text-stone-950 group-hover:text-black text-sm'}>
                    {item.name}
                  </span>
                </div>
                {item.tag && (
                  <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-full tracking-wider ${
                    isActive 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-400/60' 
                      : 'bg-white/60 text-stone-950 border border-white/80 group-hover:bg-white/90'
                  }`}>
                    {item.tag}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Sidebar Footer */}
        <div className="p-4 border-t border-white/50 space-y-1">
          <Link 
            to="/" 
            className="flex items-center gap-2.5 px-3 py-2 hover:bg-white/40 rounded-lg cursor-pointer transition-colors text-stone-900 hover:text-black text-xs font-mono font-bold"
          >
            <ArrowLeft size={16} className="text-stone-800" />
            <span>Return to Landing</span>
          </Link>
          <div className="flex items-center gap-2.5 px-3 py-2 hover:bg-white/40 rounded-lg cursor-pointer transition-colors text-stone-900 hover:text-black text-xs font-mono font-bold">
            <Settings size={16} className="text-stone-800" />
            <span>System Settings</span>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="z-10 flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-white/50 flex items-center justify-between px-8 bg-white/35 backdrop-blur-2xl shrink-0">
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
          
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Demo Mode Toggle Button / Badge */}
            {isDemo ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/50 bg-amber-500/20 backdrop-blur-md font-mono text-xs text-amber-950 font-bold shadow-2xs">
                <Sparkles size={13} className="text-amber-700" />
                <span>DEMO ACTIVE</span>
                <button
                  onClick={() => clearDemoData()}
                  type="button"
                  className="ml-1 underline hover:text-amber-800 font-black cursor-pointer"
                  title="Clear Demo Data"
                >
                  Clear
                </button>
              </div>
            ) : (
              <button
                onClick={() => loadCampusDemoData()}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/50 bg-emerald-600/20 hover:bg-emerald-600/30 backdrop-blur-md font-mono text-xs text-emerald-950 font-black shadow-2xs transition cursor-pointer"
                title="Load 7-Day Campus Benchmark Demo Data"
              >
                <Sparkles size={13} className="text-emerald-700" />
                <span>⚡ Demo Data</span>
              </button>
            )}

            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/60 bg-white/40 backdrop-blur-md font-mono text-xs text-stone-900 font-bold shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{headerMeta.badgeText}</span>
            </div>
            <button className="p-2 text-stone-700 hover:text-stone-950 hover:bg-white/50 rounded-xl transition-colors relative cursor-pointer">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-[#e5e4d8]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-stone-300/80 border border-stone-400/60 flex items-center justify-center font-mono text-xs text-stone-800 font-bold shadow-inner">
              <User size={16} className="text-stone-700" />
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
