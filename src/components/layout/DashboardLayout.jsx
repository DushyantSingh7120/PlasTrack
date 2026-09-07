import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KineticScrollProgress from '../ui/KineticScrollProgress';
import { kineticAmbientBreathe } from '../../lib/motion';
import { 
  Activity, 
  Menu, 
  X,
  Bell, 
  Settings, 
  User, 
  Radio, 
  ArrowLeft,
  LayoutGrid,
  BookOpen,
  CalendarCheck,
  Leaf,
  Sparkles,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { loadCampusDemoData, clearDemoData, isDemoDataActive } from '../../lib/demoData';
import SettingsModal from '../ui/SettingsModal';
import NotificationsModal from '../ui/NotificationsModal';
import CloudSyncModal from '../ui/CloudSyncModal';
import FooterLegalModal from '../ui/FooterLegalModal';
import { subscribeToAuth } from '../../lib/firebase';

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [isDemo, setIsDemo] = useState(() => isDemoDataActive());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCloudSyncOpen, setIsCloudSyncOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const mainScrollRef = useRef(null);

  useEffect(() => {
    const unsub = subscribeToAuth((user) => setCurrentUser(user));
    return () => unsub();
  }, []);

  useEffect(() => {
    const checkDemo = () => setIsDemo(isDemoDataActive());
    window.addEventListener('plastitrack-data-updated', checkDemo);
    window.addEventListener('storage', checkDemo);
    return () => {
      window.removeEventListener('plastitrack-data-updated', checkDemo);
      window.removeEventListener('storage', checkDemo);
    };
  }, []);

  const prevPathRef = useRef(location.pathname);
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      setIsMobileSidebarOpen(false);
    }
  }, [location.pathname]);

  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      tag: 'LIVE', 
      icon: LayoutGrid 
    },
    { 
      name: 'Plastic Tracker', 
      path: '/tracker', 
      tag: 'LOG', 
      icon: Radio 
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
    { 
      name: 'Research Dossier', 
      path: '/docs', 
      tag: 'DOCS', 
      icon: FileText 
    }
  ];

  const getHeaderMeta = () => {
    switch (location.pathname) {
      case '/tracker':
        return {
          title: 'Daily Plastic Tracker',
          subtitle: 'Quick-add logging console',
          badgeText: 'TRACKER',
          badgeColor: 'text-emerald-700',
        };
      case '/alternatives':
        return {
          title: 'Eco-Alternatives & Payback',
          subtitle: 'Verified sustainable swaps & savings',
          badgeText: 'SWAPS',
          badgeColor: 'text-emerald-700',
        };
      case '/insights':
        return {
          title: 'Scientific Research Dossier',
          subtitle: 'CPCB & NEJM Benchmarked Data',
          badgeText: 'RESEARCH',
          badgeColor: 'text-emerald-700',
        };
      case '/sunday-review':
        return {
          title: 'Weekly Habit Audit',
          subtitle: '7-Day Review & Reduction Playbook',
          badgeText: 'AUDIT',
          badgeColor: 'text-emerald-700',
        };
      case '/docs':
        return {
          title: 'Statutory Documentation',
          subtitle: 'CPCB & MoEFCC Publications',
          badgeText: 'DOCS',
          badgeColor: 'text-emerald-700',
        };
      case '/dashboard':
      default:
        return {
          title: 'Personal Dashboard',
          subtitle: 'Campus & Household Tracking',
          badgeText: 'DASHBOARD',
          badgeColor: 'text-emerald-700',
        };
    }
  };

  const headerMeta = getHeaderMeta();

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-white/50 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-[#1b4332] text-white p-2 rounded-xl group-hover:scale-105 transition-transform shadow-sm">
            <Activity size={20} className="text-emerald-400" />
          </div>
          <div>
            <h1 className="text-lg font-black font-heading tracking-tight text-[#1b4332] leading-none">
              PlastiTrack
            </h1>
          </div>
        </Link>
        {isMobileSidebarOpen && (
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-stone-700 hover:bg-stone-200/60"
          >
            <X size={20} />
          </button>
        )}
      </div>



      {/* Navigation Tabs */}
      <nav className="flex-1 p-3.5 space-y-2 overflow-y-auto custom-scrollbar">
        <div className="px-3 pt-1 pb-1 flex items-center justify-between text-[10px] font-mono font-black tracking-widest text-stone-700 uppercase">
          <span>Navigation</span>
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
                  size={18} 
                  className={isActive ? 'text-emerald-400' : 'text-stone-700 group-hover:text-black'} 
                />
                <span className={`text-xs font-mono font-bold tracking-tight ${isActive ? 'text-white' : 'text-stone-900'}`}>
                  {item.name}
                </span>
              </div>
              <span 
                className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border transition-colors ${
                  isActive 
                    ? 'bg-emerald-400 text-stone-950 border-emerald-300' 
                    : 'bg-white/60 text-stone-700 border-white/80 group-hover:bg-white'
                }`}
              >
                {item.tag}
              </span>
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
        <button
          onClick={() => setIsSettingsOpen(true)}
          type="button"
          className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-white/40 rounded-lg cursor-pointer transition-colors text-stone-900 hover:text-black text-xs font-mono font-bold text-left"
        >
          <Settings size={16} className="text-stone-800" />
          <span>System Settings</span>
        </button>
        <button
          onClick={() => setLegalModalType('privacy')}
          type="button"
          className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-white/40 rounded-lg cursor-pointer transition-colors text-stone-900 hover:text-black text-xs font-mono font-bold text-left"
        >
          <ShieldCheck size={16} className="text-stone-800" />
          <span>Privacy &amp; Terms</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden lg:flex z-10 w-64 lg:w-72 h-full flex-col border-r border-white/60 bg-white/35 backdrop-blur-2xl shadow-sm shrink-0"
      >
        {renderSidebarContent()}
      </motion.aside>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative z-10 w-72 h-full bg-stone-100/95 backdrop-blur-2xl border-r border-stone-300 shadow-2xl flex flex-col"
            >
              {renderSidebarContent()}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="z-10 flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-white/50 flex items-center justify-between px-4 sm:px-8 bg-white/35 backdrop-blur-2xl shrink-0">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              type="button"
              className="lg:hidden p-2 text-stone-700 hover:text-stone-950 hover:bg-black/5 rounded-xl cursor-pointer"
              aria-label="Open Navigation Sidebar"
            >
              <Menu size={22} />
            </button>
            <div className="truncate">
              <h2 className="text-base sm:text-lg font-bold font-heading text-stone-900 tracking-tight leading-tight truncate">
                {headerMeta.title}
              </h2>
              <div className="flex items-center gap-2 font-mono text-[11px] text-stone-600 truncate">
                <span className="truncate">{headerMeta.subtitle}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Demo Mode Toggle Button / Badge */}
            {isDemo ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/50 bg-amber-500/20 backdrop-blur-md font-mono text-xs text-amber-950 font-bold shadow-2xs">
                <Sparkles size={13} className="text-amber-700" />
                <span className="hidden sm:inline">DEMO ACTIVE</span>
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

            <motion.div 
              animate={kineticAmbientBreathe}
              className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/60 bg-white/40 backdrop-blur-md font-mono text-xs text-stone-900 font-bold shadow-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{headerMeta.badgeText}</span>
            </motion.div>

            {/* Notification Bell */}
            <button 
              onClick={() => setIsNotificationsOpen(true)}
              type="button"
              className="p-2 text-stone-700 hover:text-stone-950 hover:bg-white/50 rounded-xl transition-colors relative cursor-pointer"
              title="System Notifications"
            >
              <Bell size={18} />
            </button>

            {/* User Profile / Cloud Sync Indicator */}
            <button 
              onClick={() => setIsCloudSyncOpen(true)}
              type="button"
              className="w-8 h-8 rounded-full overflow-hidden bg-stone-300/80 hover:bg-stone-300 border border-stone-400/60 flex items-center justify-center font-mono text-xs text-stone-800 font-bold shadow-inner cursor-pointer transition"
              title={currentUser ? `Cloud Active: ${currentUser.displayName || currentUser.email}` : "Storage & Cloud Status"}
            >
              {currentUser?.photoURL ? (
                <img src={currentUser.photoURL} alt="User" className="w-full h-full object-cover" />
              ) : currentUser ? (
                <span className="text-emerald-950 font-black text-xs">
                  {(currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                </span>
              ) : (
                <User size={16} className="text-stone-700" />
              )}
            </button>
          </div>
        </header>

        {/* Precision Scroll Progress Telemetry Bar */}
        <KineticScrollProgress containerRef={mainScrollRef} height={3} />

        {/* Scrollable Page Content */}
        <div ref={mainScrollRef} className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8 custom-scrollbar">
          {children}
        </div>
      </main>

      {/* Modals */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onOpenLegal={(type) => {
          setIsSettingsOpen(false);
          setLegalModalType(type || 'privacy');
        }}
      />

      <NotificationsModal 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />

      <CloudSyncModal 
        isOpen={isCloudSyncOpen} 
        onClose={() => setIsCloudSyncOpen(false)} 
      />

      <FooterLegalModal
        isOpen={!!legalModalType}
        onClose={() => setLegalModalType(null)}
        modalType={legalModalType}
      />
    </div>
  );
}
