import React from 'react';
import { Menu, Activity, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white/50 backdrop-blur-2xl transition-all">
      <div className="w-full px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          
          {/* Logo & Tracker Indicator */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <Activity size={22} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold font-heading tracking-tight text-foreground leading-none">
                  PlastiTrack
                </span>
                <span className="font-mono text-[10px] sm:text-xs text-muted-foreground tracking-wider uppercase mt-0.5">
                  Personal Tracker
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-10">
            <Link to="/" className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-medium">
              Home
            </Link>
            <Link to="/dashboard" className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-medium">
              Dashboard
            </Link>
            <Link to="/tracker" className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-medium">
              Tracker
            </Link>
            <Link to="/alternatives" className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-medium">
              Eco-Swaps
            </Link>
            <Link to="/insights" className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-medium">
              Insights
            </Link>
            <Link to="/sunday-review" className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-medium">
              Sunday Review
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              to="/dashboard" 
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-primary text-white font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-black transition-all shadow-sm flex items-center gap-2"
            >
              <span>Launch App</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-foreground cursor-pointer rounded-lg hover:bg-black/5">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
