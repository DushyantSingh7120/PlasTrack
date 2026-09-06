import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Menu, Bell, Settings, User } from 'lucide-react';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Immersive Background overlay with Grafana Mesh */}
      <div className="absolute inset-0 z-0 bg-mesh-top opacity-60 pointer-events-none" />

      {/* Sidebar - Glassmorphism */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="z-10 w-64 h-full flex flex-col border-r border-border glass-panel bg-white/60"
      >
        <div className="p-6 flex items-center gap-3 border-b border-border">
          <div className="bg-primary text-white p-2 rounded-lg">
            <Activity size={24} />
          </div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-primary">PlastiTrack</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {['Dashboard', 'Tracker', 'Analytics', 'Reports'].map((item, idx) => (
            <div
              key={item}
              className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${
                idx === 0 ? 'bg-primary text-white font-medium shadow-sm shadow-primary/20' : 'hover:bg-black/5 text-muted-foreground hover:text-foreground'
              }`}
            >
              {item}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 p-3 hover:bg-black/5 rounded-lg cursor-pointer transition-colors">
            <Settings size={20} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Settings</span>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="z-10 flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-8 glass-panel bg-white/60">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-muted-foreground hover:bg-black/5 rounded-lg">
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-semibold text-foreground">Overview</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-muted-foreground hover:bg-black/5 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary cursor-pointer hover:bg-primary/20 transition-colors">
              <User size={16} />
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
