import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import { Activity, BookOpen, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { loadCampusDemoData } from '../../lib/demoData';
import { getStoredHistory } from '../../lib/storage';
import KineticTiltCard from '../../components/ui/KineticTiltCard';
import AnimatedCounter from '../../components/ui/AnimatedCounter';
import FooterLegalModal from '../../components/ui/FooterLegalModal';
import { 
  kineticContainer, 
  kineticCard, 
  kineticBadge, 
  kineticHover, 
  kineticTap 
} from '../../lib/motion';

export default function LandingPage() {
  const navigate = useNavigate();
  const landingScrollRef = useRef(null);
  const [legalModalType, setLegalModalType] = useState(null);

  const handleLaunchDemo = () => {
    loadCampusDemoData();
    navigate('/dashboard');
  };

  const [history, setHistory] = React.useState(() => getStoredHistory() || []);

  React.useEffect(() => {
    const handleUpdate = () => setHistory(getStoredHistory() || []);
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('plastitrack-data-updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('plastitrack-data-updated', handleUpdate);
    };
  }, []);
  
  const { totalWeeklyGrams, avgDailyGrams, primaryItem } = React.useMemo(() => {
    if (!history || history.length === 0) return { totalWeeklyGrams: 0, avgDailyGrams: 0, primaryItem: 'None yet' };
    
    const sorted = [...history].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const last7Days = sorted.slice(0, 7);
    const total = last7Days.reduce((acc, entry) => acc + (entry.totalGrams || 0), 0);
    const avg = last7Days.length > 0 ? Math.round(total / last7Days.length) : 0;

    const itemTotals = {};
    last7Days.forEach(entry => {
      if (entry.counts) {
        Object.entries(entry.counts).forEach(([id, count]) => {
          const qty = Number(count) || 0;
          itemTotals[id] = (itemTotals[id] || 0) + qty;
        });
      }
    });

    let topId = null;
    let maxCount = 0;
    Object.entries(itemTotals).forEach(([id, qty]) => {
      if (qty > maxCount) {
        maxCount = qty;
        topId = id;
      }
    });

    const itemNames = {
      pet_bottle: 'PET Water Bottles',
      pet_bottle_500: 'PET Water Bottles',
      pet_bottle_1000: '1L PET Bottles',
      chai_cup: 'Chai / Coffee Cups',
      ldpe_bag: 'Carry Bags',
      carry_bag: 'Carry Bags',
      multi_pouch: 'Snack Pouches',
      takeout_box: 'Food Containers',
      ps_cutlery: 'Plastic Cutlery'
    };

    const primary = total === 0 ? 'None yet' : (itemNames[topId] || 'PET Water Bottles');
    
    return { totalWeeklyGrams: total, avgDailyGrams: avg, primaryItem: primary };
  }, [history]);

  return (
    <div ref={landingScrollRef} className="h-screen overflow-y-auto overflow-x-hidden custom-scrollbar bg-transparent font-body text-foreground selection:bg-primary selection:text-white">
      <Navbar containerRef={landingScrollRef} />
      
      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-20 md:pb-28 xl:pb-36 overflow-hidden">
        <div className="relative z-10 w-full px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
            
            {/* Left Column */}
            <motion.div 
              variants={kineticCard}
              initial="hidden"
              animate="visible"
              style={{ perspective: 1000, willChange: 'transform, opacity' }}
              className="lg:col-span-7 space-y-6 sm:space-y-8 lg:space-y-10"
            >
              
              <motion.div 
                variants={kineticBadge}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/70 backdrop-blur-md border border-border text-xs sm:text-sm font-mono tracking-wide text-foreground shadow-xs"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>PERSONAL PLASTIC TRACKER</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] 2xl:text-[88px] font-bold font-heading tracking-tight text-foreground leading-[1.08]">
                <span className="sr-only">PlastiTrack — </span>
                Track your plastic.<br />
                <span className="text-primary underline decoration-emerald-600/70 decoration-wavy decoration-2 sm:decoration-[3px] xl:decoration-[4px] underline-offset-8">
                  Change your habits.
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl xl:text-2xl text-muted-foreground font-body max-w-2xl xl:max-w-3xl leading-relaxed">
                A simple, user-friendly tracker to help you understand your daily plastic usage and discover easy ways to reduce it.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <motion.div whileHover={kineticHover} whileTap={kineticTap}>
                  <Link 
                    to="/dashboard" 
                    className="w-full sm:w-auto px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl bg-primary text-white font-mono text-sm sm:text-base font-semibold tracking-wider uppercase hover:bg-black transition-all shadow-md flex items-center justify-center gap-2.5 group cursor-pointer"
                  >
                    <span>Start Tracking Free</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div whileHover={kineticHover} whileTap={kineticTap}>
                  <Link 
                    to="/insights" 
                    className="w-full sm:w-auto px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl bg-white/70 backdrop-blur-md border border-white/60 text-foreground font-semibold text-sm sm:text-base hover:bg-white hover:border-foreground/30 transition-all text-center flex items-center justify-center"
                  >
                    Learn the Facts
                  </Link>
                </motion.div>

                <motion.button
                  whileHover={kineticHover}
                  whileTap={kineticTap}
                  onClick={handleLaunchDemo}
                  type="button"
                  className="w-full sm:w-auto px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl bg-emerald-800 hover:bg-emerald-950 text-white font-mono text-sm sm:text-base font-black transition-all shadow-md flex items-center justify-center gap-2 border border-emerald-400/50 cursor-pointer"
                >
                  <Sparkles size={17} className="text-emerald-300" />
                  <span>⚡ Load Campus Demo</span>
                </motion.button>
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

            {/* Right Column: Friendly Weekly Summary Visual with Kinetic Spring */}
            <motion.div 
              variants={kineticCard}
              initial="hidden"
              animate="visible"
              style={{ perspective: 1000, willChange: 'transform, opacity' }}
              className="lg:col-span-5 flex justify-center lg:justify-end w-full"
            >
              <KineticTiltCard 
                tiltDegree={8}
                className="w-full max-w-xl 2xl:max-w-2xl infra-card p-6 sm:p-8 lg:p-10 xl:p-12 bg-white/40 backdrop-blur-xl border border-border hover:border-black shadow-xl rounded-2xl relative transition-all duration-300"
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
                  <h3 className="text-6xl sm:text-7xl xl:text-8xl font-bold font-mono tracking-tighter text-stone-900">
                    <AnimatedCounter value={totalWeeklyGrams} />
                    <span className="text-2xl sm:text-3xl xl:text-4xl text-stone-500 font-normal">g</span>
                  </h3>
                  <p className="text-sm sm:text-base xl:text-lg font-medium text-stone-600">Total plastic logged</p>
                  <p className="text-xs sm:text-sm font-mono text-emerald-700 mt-2 px-3.5 py-1 bg-emerald-50 rounded-full inline-block">
                    ★ {totalWeeklyGrams > 0 ? 'Tracking Active' : 'Start tracking today'}
                  </p>
                </div>

                <div className="space-y-4 pt-5 border-t border-border">
                  <div className="flex justify-between items-center font-mono text-xs sm:text-sm xl:text-base">
                    <span className="text-stone-600">Daily Average</span>
                    <span className="font-bold text-stone-900"><AnimatedCounter value={avgDailyGrams} suffix="g" /></span>
                  </div>
                  <div className="flex justify-between items-center font-mono text-xs sm:text-sm xl:text-base">
                    <span className="text-stone-600">Primary Item</span>
                    <span className="font-bold text-stone-900">{primaryItem}</span>
                  </div>
                </div>
              </KineticTiltCard>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Section with Kinetic Staggered Wave */}
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

          <motion.div 
            variants={kineticContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            style={{ perspective: 1000 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10"
          >
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
          </motion.div>

        </div>
      </section>

      {/* How it Works Section with Kinetic Step Badges */}
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

              <motion.div 
                variants={kineticContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="mt-8 xl:mt-12 space-y-6 sm:space-y-8"
              >
                <motion.div variants={kineticCard} className="flex items-start gap-4 sm:gap-6">
                  <motion.div 
                    variants={kineticBadge}
                    className="h-9 w-9 sm:h-11 sm:w-11 xl:h-12 xl:w-12 rounded-full bg-emerald-100 text-forest flex items-center justify-center font-bold text-sm sm:text-base xl:text-lg shrink-0 shadow-2xs"
                  >
                    1
                  </motion.div>
                  <div>
                    <span className="text-lg sm:text-xl xl:text-2xl font-bold font-heading text-foreground">Log your items</span>
                    <p className="text-sm sm:text-base xl:text-lg text-muted-foreground font-body mt-1">Add bottles, wrappers, and containers as you use them throughout the day.</p>
                  </div>
                </motion.div>

                <motion.div variants={kineticCard} className="flex items-start gap-4 sm:gap-6">
                  <motion.div 
                    variants={kineticBadge}
                    className="h-9 w-9 sm:h-11 sm:w-11 xl:h-12 xl:w-12 rounded-full bg-emerald-100 text-forest flex items-center justify-center font-bold text-sm sm:text-base xl:text-lg shrink-0 shadow-2xs"
                  >
                    2
                  </motion.div>
                  <div>
                    <span className="text-lg sm:text-xl xl:text-2xl font-bold font-heading text-foreground">Review your week</span>
                    <p className="text-sm sm:text-base xl:text-lg text-muted-foreground font-body mt-1">Check the dashboard to see your trends against a healthy daily limit.</p>
                  </div>
                </motion.div>

                <motion.div variants={kineticCard} className="flex items-start gap-4 sm:gap-6">
                  <motion.div 
                    variants={kineticBadge}
                    className="h-9 w-9 sm:h-11 sm:w-11 xl:h-12 xl:w-12 rounded-full bg-emerald-100 text-forest flex items-center justify-center font-bold text-sm sm:text-base xl:text-lg shrink-0 shadow-2xs"
                  >
                    3
                  </motion.div>
                  <div>
                    <span className="text-lg sm:text-xl xl:text-2xl font-bold font-heading text-foreground">Make simple swaps</span>
                    <p className="text-sm sm:text-base xl:text-lg text-muted-foreground font-body mt-1">Use our actionable playbook to find easy ways to bring your numbers down.</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Fact of the Day Card with Kinetic Spring & 3D Tilt */}
            <motion.div 
              variants={kineticCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              style={{ perspective: 1000, willChange: 'transform, opacity' }}
              className="lg:col-span-5 flex justify-center lg:justify-end w-full"
            >
              <KineticTiltCard 
                tiltDegree={8}
                className="w-full max-w-xl 2xl:max-w-2xl bg-white/40 backdrop-blur-xl rounded-2xl border border-border hover:border-black p-6 sm:p-8 lg:p-10 xl:p-12 shadow-lg transition-all duration-300"
              >
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
              </KineticTiltCard>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Dark Technical Footer Call to Action - EXPLICITLY PRESERVED STATIC (no entrance jumps) */}
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

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm font-mono text-white/60">
            <div>&copy; 2026 PlastiTrack. Built for positive environmental change.</div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Link 
                to="/docs" 
                className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>RESEARCH DOSSIER</span>
              </Link>
              <button 
                onClick={() => setLegalModalType('privacy')}
                type="button"
                className="hover:text-white transition-colors cursor-pointer"
              >
                PRIVACY
              </button>
              <button 
                onClick={() => setLegalModalType('terms')}
                type="button"
                className="hover:text-white transition-colors cursor-pointer"
              >
                TERMS
              </button>
              <button 
                onClick={() => setLegalModalType('methodology')}
                type="button"
                className="hover:text-white transition-colors cursor-pointer"
              >
                METHODOLOGY
              </button>
              <button 
                onClick={() => setLegalModalType('resources')}
                type="button"
                className="hover:text-white transition-colors cursor-pointer"
              >
                RESOURCES
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Footer Legal / Academic Modal */}
      <FooterLegalModal 
        isOpen={!!legalModalType} 
        onClose={() => setLegalModalType(null)} 
        modalType={legalModalType} 
      />

    </div>
  );
}

function ModuleCard({ icon, title, desc }) {
  return (
    <motion.div 
      variants={kineticCard}
      style={{ perspective: 1200, willChange: 'transform, opacity' }}
      className="h-full"
    >
      <KineticTiltCard
        tiltDegree={16}
        className="h-full bg-white/45 hover:bg-white/60 backdrop-blur-xl rounded-2xl border border-border hover:border-emerald-600 hover:ring-2 hover:ring-emerald-500/25 p-6 sm:p-8 lg:p-9 xl:p-11 cursor-pointer flex flex-col justify-between transition-[border-color,ring,background-color] duration-200"
      >
        <div style={{ transform: 'translateZ(26px)', transformStyle: 'preserve-3d' }}>
          <div className="flex items-center justify-between mb-5 xl:mb-6">
            <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-50 text-forest group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-200 shadow-2xs">
              {icon}
            </div>
            <span className="text-[10px] font-mono font-bold text-stone-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2 py-0.5 rounded bg-black/5">
              ACTIVE
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl xl:text-3xl font-bold font-heading text-stone-900 mb-3 xl:mb-4 tracking-tight">
            {title}
          </h3>
          <p className="text-sm sm:text-base xl:text-lg text-stone-600 font-body leading-relaxed">
            {desc}
          </p>
        </div>

        <div className="mt-5 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-mono font-bold text-emerald-800">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5">
            <span>Explore Feature</span>
            <ArrowRight size={13} />
          </span>
          <span className="text-[10px] text-stone-600 font-mono tracking-wider">
            3D KINETIC
          </span>
        </div>
      </KineticTiltCard>
    </motion.div>
  );
}
