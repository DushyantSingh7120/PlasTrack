import React, { useState } from 'react';
import { Menu, X, Activity, BookOpen, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import KineticScrollProgress from '../ui/KineticScrollProgress';
import { kineticAmbientBreathe } from '../../lib/motion';

export default function Navbar({ containerRef }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Tracker', path: '/tracker' },
    { name: 'Eco-Swaps', path: '/alternatives' },
    { name: 'Insights', path: '/insights' },
    { name: 'Sunday Review', path: '/sunday-review' },
    { name: 'Research Dossier', path: '/docs', isHighlight: true }
  ];

  return (
    <>
      <KineticScrollProgress containerRef={containerRef} height={3} />
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white/50 backdrop-blur-2xl transition-all">
        <div className="w-full px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            
            {/* Logo & Tracker Indicator */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3 group">
                <motion.div 
                  animate={kineticAmbientBreathe}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform"
                >
                  <Activity size={22} className="text-white" />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold font-heading tracking-tight text-foreground leading-none">
                    PlastiTrack
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-mono text-[10px] sm:text-xs text-muted-foreground tracking-wider uppercase">
                      Personal Tracker
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                if (link.isHighlight) {
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 hover:bg-emerald-500/20 text-xs sm:text-sm font-mono font-bold transition-colors cursor-pointer"
                    >
                      <BookOpen size={13} className="text-emerald-700" />
                      <span>{link.name}</span>
                    </Link>
                  );
                }
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm sm:text-base transition-colors cursor-pointer font-medium ${
                      isActive ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link 
                to="/dashboard" 
                className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-primary text-white font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-black transition-all shadow-sm flex items-center gap-2"
              >
                <span>Launch App</span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 text-foreground cursor-pointer rounded-xl hover:bg-black/5 transition"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="absolute top-16 right-0 bottom-0 w-4/5 max-w-sm bg-white/95 backdrop-blur-2xl border-l border-border shadow-2xl p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="font-mono text-xs font-bold text-stone-500 uppercase tracking-widest pb-2 border-b border-stone-200">
                  Navigation
                </div>
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition ${
                          isActive 
                            ? 'bg-primary text-white shadow-sm font-bold' 
                            : 'hover:bg-stone-100 text-stone-800'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {link.isHighlight && <BookOpen size={16} className={isActive ? 'text-white' : 'text-emerald-600'} />}
                          <span>{link.name}</span>
                        </span>
                        <ChevronRight size={16} className="opacity-50" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quick Launch */}
              <div className="pt-6 border-t border-stone-200">
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3.5 rounded-xl bg-primary text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-black transition text-center block shadow-md"
                >
                  Launch PlastiTrack App
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
