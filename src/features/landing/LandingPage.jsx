import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import { Activity, BookOpen, Sparkles, CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { loadCampusDemoData } from '../../lib/demoData';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleLaunchDemo = () => {
    loadCampusDemoData();
    navigate('/dashboard');
  };
  return (
    <div className="bg-transparent min-h-screen font-body text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-20 md:pb-28 xl:pb-36 overflow-hidden">
        <div className="relative z-10 w-full px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
            
            {/* Left Column */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 sm:space-y-8 lg:space-y-10"
            >
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/70 backdrop-blur-md border border-border text-xs sm:text-sm font-mono tracking-wide text-foreground shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>PERSONAL PLASTIC TRACKER</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] 2xl:text-[88px] font-bold font-heading tracking-tight text-foreground leading-[1.08]">
                Track your plastic.<br />
                <span className="text-primary underline decoration-emerald-600/70 decoration-wavy decoration-2 sm:decoration-[3px] xl:decoration-[4px] underline-offset-8">
                  Change your habits.
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl xl:text-2xl text-muted-foreground font-body max-w-2xl xl:max-w-3xl leading-relaxed">
                A simple, user-friendly tracker to help you understand your daily plastic usage and discover easy ways to reduce it.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link 
                  to="/dashboard" 
                  className="px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl bg-primary text-white font-mono text-sm sm:text-base font-semibold tracking-wider uppercase hover:bg-black transition-all shadow-md flex items-center justify-center gap-2.5 group cursor-pointer"
                >
                  <span>Start Tracking Free</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/insights" 
                  className="px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl bg-white/70 backdrop-blur-md border border-white/60 text-foreground font-semibold text-sm sm:text-base hover:bg-white hover:border-foreground/30 transition-all text-center"
                >
                  Learn the Facts
                </Link>
                <button
                  onClick={handleLaunchDemo}
                  type="button"
                  className="px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl bg-emerald-800 hover:bg-emerald-950 text-white font-mono text-sm sm:text-base font-black transition-all shadow-md flex items-center justify-center gap-2 border border-emerald-400/50 cursor-pointer"
                >
                  <Sparkles size={17} className="text-emerald-300" />
                  <span>⚡ Load Campus Demo</span>
                </button>
              </div>

              <div className="pt-4 border-t border-border/80 flex flex-wrap gap-6 sm:gap-8 text-xs sm:text-sm font-mono text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>Free to use</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>No login required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>Real science facts</span>
                </div>
              </div>

            </motion.div>

            {/* Right Column: Friendly Weekly Summary Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-5 flex justify-center lg:justify-end w-full"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-full max-w-xl 2xl:max-w-2xl infra-card p-6 sm:p-8 lg:p-10 xl:p-12 bg-white/40 backdrop-blur-xl border border-border hover:border-black shadow-xl rounded-2xl relative transform -rotate-2 hover:rotate-0 transition-all duration-500"
              >
                <div className="flex items-center justify-between pb-5 border-b border-border">
                  <div className="flex items-center gap-2.5 text-stone-900 font-bold font-heading text-base sm:text-lg xl:text-xl">
                    <Activity size={22} className="text-primary" />
                    <span>Weekly Summary</span>
                  </div>
                  <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 font-mono font-semibold text-xs">
                    THIS WEEK
                  </span>
                </div>
                
                <div className="py-8 xl:py-10 text-center space-y-2">
                  <h3 className="text-6xl sm:text-7xl xl:text-8xl font-bold font-mono tracking-tighter text-stone-900">182<span className="text-2xl sm:text-3xl xl:text-4xl text-stone-500 font-normal">g</span></h3>
                  <p className="text-sm sm:text-base xl:text-lg font-medium text-stone-600">Total plastic logged</p>
                  <p className="text-xs sm:text-sm font-mono text-emerald-700 mt-2 px-3.5 py-1 bg-emerald-50 rounded-full inline-block">
                    ★ 5 Days under limit
                  </p>
                </div>

                <div className="space-y-4 pt-5 border-t border-border">
                  <div className="flex justify-between items-center font-mono text-xs sm:text-sm xl:text-base">
                    <span className="text-stone-600">Daily Average</span>
                    <span className="font-bold text-stone-900">26g</span>
                  </div>
                  <div className="flex justify-between items-center font-mono text-xs sm:text-sm xl:text-base">
                    <span className="text-stone-600">Primary Item</span>
                    <span className="font-bold text-stone-900">PET Water Bottles</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 xl:py-28 border-t border-border bg-white/10 backdrop-blur-md">
        <div className="w-full px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          
          <div className="max-w-3xl xl:max-w-4xl mb-14 xl:mb-20 text-center mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-heading text-foreground tracking-tight">
              Everything you need to reduce your footprint
            </h2>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-muted-foreground font-body mt-4">
              We took complex sustainability science and turned it into simple tools anyone can use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
            <ModuleCard 
              icon={<Activity size={28} className="text-primary" />}
              title="Log Daily Usage"
              desc="Easily record the plastic items you use every day. We do the math to show you your footprint in grams."
            />
            <ModuleCard 
              icon={<BookOpen size={28} className="text-primary" />}
              title="Bite-Sized Insights"
              desc="Learn the real facts about microplastics, ocean pollution, and recycling without the dense scientific jargon."
            />
            <ModuleCard 
              icon={<Sparkles size={28} className="text-primary" />}
              title="Actionable Tips"
              desc="Get a personalized Sunday Review with simple, real-world lifestyle swaps to lower your usage."
            />
          </div>

        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 xl:py-28 border-t border-border bg-white/20 backdrop-blur-md">
        <div className="w-full px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
            
            <div className="lg:col-span-7 space-y-6 lg:space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-heading text-foreground tracking-tight">
                How PlastiTrack works
              </h2>
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-muted-foreground font-body leading-relaxed">
                Start building better habits in three simple steps. No complicated setup required.
              </p>

              <div className="mt-8 xl:mt-12 space-y-6 sm:space-y-8">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="h-9 w-9 sm:h-11 sm:w-11 xl:h-12 xl:w-12 rounded-full bg-emerald-100 text-forest flex items-center justify-center font-bold text-sm sm:text-base xl:text-lg shrink-0">
                    1
                  </div>
                  <div>
                    <span className="text-lg sm:text-xl xl:text-2xl font-bold font-heading text-foreground">Log your items</span>
                    <p className="text-sm sm:text-base xl:text-lg text-muted-foreground font-body mt-1">Add bottles, wrappers, and containers as you use them throughout the day.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="h-9 w-9 sm:h-11 sm:w-11 xl:h-12 xl:w-12 rounded-full bg-emerald-100 text-forest flex items-center justify-center font-bold text-sm sm:text-base xl:text-lg shrink-0">
                    2
                  </div>
                  <div>
                    <span className="text-lg sm:text-xl xl:text-2xl font-bold font-heading text-foreground">Review your week</span>
                    <p className="text-sm sm:text-base xl:text-lg text-muted-foreground font-body mt-1">Check the dashboard to see your trends against a healthy daily limit.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="h-9 w-9 sm:h-11 sm:w-11 xl:h-12 xl:w-12 rounded-full bg-emerald-100 text-forest flex items-center justify-center font-bold text-sm sm:text-base xl:text-lg shrink-0">
                    3
                  </div>
                  <div>
                    <span className="text-lg sm:text-xl xl:text-2xl font-bold font-heading text-foreground">Make simple swaps</span>
                    <p className="text-sm sm:text-base xl:text-lg text-muted-foreground font-body mt-1">Use our actionable playbook to find easy ways to bring your numbers down.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Graphic */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 flex justify-center lg:justify-end w-full"
            >
              <div className="w-full max-w-xl 2xl:max-w-2xl bg-white/40 backdrop-blur-xl rounded-2xl border border-border hover:border-black p-6 sm:p-8 lg:p-10 xl:p-12 shadow-lg transform -rotate-2 hover:rotate-0 hover:scale-[1.02] transition-all duration-500">
                <div className="flex items-center gap-2 text-forest font-mono text-xs sm:text-sm font-semibold tracking-wider mb-4">
                  <BookOpen size={18} />
                  <span>FACT OF THE DAY</span>
                </div>
                <h3 className="text-xl sm:text-2xl xl:text-3xl font-bold font-heading text-stone-900 mb-2 sm:mb-4">The 9% Problem</h3>
                <p className="text-sm sm:text-base xl:text-lg text-stone-700 leading-relaxed">
                  Of the 9 billion metric tons of plastic produced since the 1950s, only about 9% has been successfully recycled. 
                </p>
                <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-white/60 text-stone-700 rounded text-[11px] sm:text-xs font-mono font-semibold">RECYCLING REALITY</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Dark Technical Footer Call to Action (Preserved dark theme, cleaned jargon) */}
      <section className="py-20 xl:py-28 bg-background-dark text-white border-t border-black/20 relative z-10">
        <div className="w-full px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="md:col-span-8 space-y-4 xl:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 font-mono text-xs sm:text-sm text-emerald-400">
                <span>100% FREE & OPEN // BUILT FOR HABIT CHANGE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-heading tracking-tight">
                Ready to take control of your plastic footprint?
              </h2>
              <p className="text-white/70 font-body text-base sm:text-lg xl:text-xl max-w-xl xl:max-w-2xl">
                Log your daily items in seconds, track your progress week over week, and build cleaner habits effortlessly. Free forever, no login required.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3.5 xl:gap-4">
              <Link 
                to="/dashboard" 
                className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all text-center shadow-lg"
              >
                Launch PlastiTrack Free
              </Link>
              <Link 
                to="/insights" 
                className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all text-center"
              >
                Explore Facts & Insights
              </Link>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm font-mono text-white/50">
            <div>&copy; 2026 PlastiTrack. Built for positive environmental change.</div>
            <div className="flex gap-6">
              <span className="hover:text-white transition-colors cursor-pointer">PRIVACY</span>
              <span className="hover:text-white transition-colors cursor-pointer">TERMS</span>
              <span className="hover:text-white transition-colors cursor-pointer">METHODOLOGY</span>
              <span className="hover:text-white transition-colors cursor-pointer">RESOURCES</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

function ModuleCard({ icon, title, desc }) {
  return (
    <div className="bg-white/40 backdrop-blur-xl rounded-2xl border border-border hover:border-black hover:ring-1 hover:ring-black p-6 sm:p-8 lg:p-9 xl:p-11 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-5 xl:mb-6">
          <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-50 text-forest group-hover:scale-110 transition-transform">{icon}</div>
        </div>
        <h3 className="text-xl sm:text-2xl xl:text-3xl font-bold font-heading text-stone-900 mb-3 xl:mb-4">{title}</h3>
        <p className="text-sm sm:text-base xl:text-lg text-stone-600 font-body leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
