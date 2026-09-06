import React from 'react';
import { Menu, Activity, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Telemetry Indicator */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <Activity size={20} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-heading tracking-tight text-foreground leading-none">
                  PlastiTrack
                </span>
                <span className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">
                  OBSERVABILITY
                </span>
              </div>
            </Link>

            {/* Live Telemetry Ping Badge (New Relic style) */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/5 border border-border text-[11px] font-mono text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span>TELEMETRY: ACTIVE</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-medium">
              Features
            </a>
            <a href="#telemetry" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-medium">
              Telemetry
            </a>
            <a href="#calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-medium">
              Calculator
            </a>
            <a href="#impact" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-medium">
              Impact
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              to="/dashboard" 
              className="text-sm text-muted-foreground hover:text-foreground font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Sign In
            </Link>
            <Link 
              to="/dashboard" 
              className="px-4 py-2 rounded-lg bg-primary text-white font-mono text-xs font-semibold uppercase tracking-wider hover:bg-black/90 transition-all shadow-sm flex items-center gap-2"
            >
              <ShieldCheck size={15} />
              <span>Launch Console</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-foreground cursor-pointer rounded-lg hover:bg-black/5">
            <Menu size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}
