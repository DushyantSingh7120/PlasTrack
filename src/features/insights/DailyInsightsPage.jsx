import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Layers, 
  Info, 
  Scale, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { FACTS_DATABASE } from '../../lib/factsDatabase';
import { RESIN_CODES } from '../../lib/plasticData';
import { 
  kineticContainer, 
  kineticDenseContainer, 
  kineticCard, 
  kineticHover 
} from '../../lib/motion';

const POLICY_HIGHLIGHTS = [
  {
    title: "19 Banned Single-Use Plastics",
    authority: "MoEFCC / Central Pollution Control Board",
    date: "Enforced July 1, 2022",
    description: "Prohibited manufacture, stocking, sale, and use of 19 items with high littering potential (plastic straws, cutlery, ear bud sticks, thermocol decoration, and wrapping films).",
    badge: "Statutory Law",
    badgeColor: "bg-red-50 text-red-700 border-red-200"
  },
  {
    title: "120-Micron Minimum Thickness",
    authority: "Plastic Waste Management Rules",
    date: "Enforced Dec 31, 2022",
    description: "Escalated carry bag thickness from 50μm to 75μm, and finally to 120μm, ensuring bags can be economically collected, washed, and mechanically recycled by waste pickers.",
    badge: "Carry Bag Mandate",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
  },
  {
    title: "Centralized EPR Digital Portal",
    authority: "CPCB Guidelines",
    date: "Operational Since Feb 2022",
    description: "Mandates Producers, Importers, and Brand Owners (PIBOs) to meet rigorous statutory recycling targets across rigid, flexible, multi-layer (MLP), and compostable plastics.",
    badge: "Producer Compliance",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  {
    title: "IRC:SP:98 Plastic Roads Standard",
    authority: "Indian Roads Congress & MoRTH",
    date: "Over 100,000 km Laid",
    description: "Patented by Prof. Rajagopalan Vasudevan ('Plastic Man of India'). Post-consumer shredded plastic coats aggregate at 165°C, preventing potholes and saving 1T bitumen/km.",
    badge: "National Infrastructure",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200"
  }
];

const ACTION_STEPS = [
  {
    id: "step-1",
    action: "Never Snip Milk Packet Corners Off",
    why: "Snipping off small triangular tips creates billions of micro-scraps that escape MRF sorting screens and enter marine food webs. Keep the corner attached when pouring!",
    impact: "Stops micro-litter"
  },
  {
    id: "step-2",
    action: "Rinse & Air-Dry Before Disposal",
    why: "Greasy, curry-stained plastic containers cannot be processed mechanically by kabadiwalas and are diverted straight to landfills. A 5-second rinse makes them recyclable.",
    impact: "100% Recyclability"
  },
  {
    id: "step-3",
    action: "Carry the 'Campus Triple'",
    why: "Keep 1 refillable stainless steel bottle (1L), 1 compact cotton tote bag, and 1 bamboo/steel spoon in your bag. Saves ~300 single-use bottles and ₹6,000+ per year.",
    impact: "₹6,000 / year saved"
  },
  {
    id: "step-4",
    action: "Say 'No' to Single-Serve Sachets",
    why: "Multi-Layered Plastics (MLP) in chip packets and shampoo sachets bond foil with polymers. Buy in larger family packs or bulk glass jars to eliminate MLP waste.",
    impact: "Cuts 70% MLP waste"
  },
  {
    id: "step-5",
    action: "Ditch Hot Liquid in Thin Plastic",
    why: "Pouring hot tea (chai) into flimsy plastic cups or leaving PET bottles inside hot cars (>40°C) accelerates microplastic shedding and antimony catalyst leaching.",
    impact: "Health Protection"
  }
];

export default function DailyInsightsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const categories = ["All", "CPCB & Indian Policy", "Medical & Health", "Breakthrough Solutions", "Polymer Chemistry", "Food Safety"];

  const filteredFacts = useMemo(() => {
    return activeCategory === "All" 
      ? FACTS_DATABASE 
      : FACTS_DATABASE.filter(f => f.category === activeCategory);
  }, [activeCategory]);

  const factsLength = filteredFacts.length;
  const safeIndex = factsLength > 0 ? (currentFactIndex % factsLength + factsLength) % factsLength : 0;
  const activeFact = factsLength > 0 ? filteredFacts[safeIndex] : (FACTS_DATABASE[0] || {});

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentFactIndex(0);
  };

  const handleNextFact = () => {
    if (factsLength > 0) {
      setCurrentFactIndex(prev => (prev + 1) % factsLength);
    }
  };

  const handlePrevFact = () => {
    if (factsLength > 0) {
      setCurrentFactIndex(prev => (prev - 1 + factsLength) % factsLength);
    }
  };

  return (
    <motion.div 
      variants={kineticContainer}
      initial="hidden"
      animate="visible"
      className="w-full max-w-[1800px] mx-auto space-y-8 font-body"
    >
      
      {/* Top Header Banner */}
      <motion.div 
        variants={kineticCard}
        style={{ perspective: 1000, willChange: 'transform, opacity' }}
        className="infra-card p-6 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-sm"
      >
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-primary font-semibold tracking-wider uppercase mb-1">
            <Sparkles size={16} />
            <span>EMPIRICAL RESEARCH & STATUTORY TELEMETRY</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-foreground tracking-tight">
            Environmental Intelligence & Verified Research Dossier
          </h2>
          <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
            Sourced directly from CPCB Annual Reports, MoEFCC Gazette Notifications, NITI Aayog Monographs, NEJM (March 2024), and Nature (Sept 2024).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <Link
            to="/docs"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0e241b] hover:bg-black text-white font-mono text-xs font-bold transition shadow-sm border border-emerald-500/40"
          >
            <BookOpen size={14} className="text-emerald-400" />
            <span>View Full 8-Part Dossier</span>
            <ArrowRight size={13} />
          </Link>
          <span className="hidden sm:inline-flex px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
            CPCB Verified 2023-24
          </span>
          <span className="hidden md:inline-flex px-3 py-2 rounded-xl bg-stone-100 text-stone-700 border border-stone-200 font-medium">
            NEJM 2024 Cited
          </span>
        </div>
      </motion.div>

      {/* Interactive Fact Carousel Section */}
      <motion.section 
        variants={kineticCard}
        style={{ perspective: 1000, willChange: 'transform, opacity' }}
        className="infra-card p-7 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl relative overflow-hidden shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border/70">
          <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold tracking-wider">
            <BookOpen size={17} />
            <span>RESEARCH SPOTLIGHT ({safeIndex + 1} OF {filteredFacts.length})</span>
          </div>
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`text-[11px] font-mono px-2.5 py-1 rounded-md transition-all ${
                  activeCategory === cat 
                    ? "bg-primary text-white font-semibold shadow-xs" 
                    : "bg-white/60 text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFact.id || `fact-${safeIndex}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-6 max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 font-mono text-xs text-accent font-semibold mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
              <span>{activeFact.tag} • {activeFact.category}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight mb-3">
              {activeFact.title}
            </h3>
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-body">
              {activeFact.content}
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-stone-800 font-mono bg-white/30 backdrop-blur-md p-2.5 rounded-xl border border-white/60 inline-flex shadow-2xs">
              <Info size={14} className="text-emerald-800 shrink-0" />
              <span>Verified Citation: <strong className="text-stone-950 font-bold">{activeFact.source}</strong></span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Steppers */}
        <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground">
            Swipe or use controls to browse research points
          </span>
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrevFact}
              className="p-2 rounded-lg border border-border hover:bg-white hover:border-primary text-foreground transition-all"
              title="Previous Fact"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={handleNextFact}
              className="p-2 rounded-lg border border-border hover:bg-white hover:border-primary text-foreground transition-all"
              title="Next Fact"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </motion.section>

      {/* Statutory Policy Framework of India */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-1">
          <div>
            <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold tracking-wider">
              <Scale size={16} />
              <span className="uppercase font-bold text-foreground text-sm font-heading">
                Statutory Architecture of India (MoEFCC & CPCB)
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              National legislation and technical standards governing polymer manufacturing and disposal.
            </p>
          </div>
        </div>

        <motion.div 
          variants={kineticDenseContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {POLICY_HIGHLIGHTS.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={kineticCard}
              whileHover={kineticHover}
              style={{ perspective: 1000 }}
              className="infra-card p-5 bg-white/35 backdrop-blur-xl border border-white/60 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground font-medium">
                    {item.date}
                  </span>
                </div>
                <h4 className="text-base font-bold font-heading text-foreground mt-2">
                  {item.title}
                </h4>
                <div className="text-[11px] font-mono text-primary font-medium mt-1">
                  {item.authority}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed mt-3">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Action Roadmap: What Each & Everybody Should Do */}
      <section className="infra-card p-6 bg-white/35 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-border/70 mb-5">
          <div>
            <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold tracking-wider">
              <CheckCircle2 size={16} className="text-emerald-700" />
              <span className="uppercase font-bold text-foreground text-sm font-heading">
                Actionable Roadmap: 5 High-Impact Personal Changes
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Proven everyday micro-habits that directly divert plastic from Indian landfills, cows, and waterways.
            </p>
          </div>
          <span className="hidden sm:inline font-mono text-xs px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full font-semibold">
            Zero Cost • Immediate Impact
          </span>
        </div>

        <motion.div 
          variants={kineticContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {ACTION_STEPS.map((step) => (
            <motion.div 
              key={step.id} 
              variants={kineticCard}
              whileHover={kineticHover}
              style={{ perspective: 1000 }}
              className="p-5 rounded-2xl bg-white/35 hover:bg-white/50 backdrop-blur-xl border border-white/60 hover:border-white/90 shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] font-black text-emerald-800 uppercase">
                    {step.id}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-100/70 text-emerald-950 font-bold border border-emerald-300">
                    {step.impact}
                  </span>
                </div>
                <h4 className="text-base font-black font-heading text-stone-950">
                  {step.action}
                </h4>
                <p className="text-xs text-stone-800 leading-relaxed font-medium mt-2">
                  {step.why}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Resin Code Telemetry & Indian MRF Recycling Index */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
          <div>
            <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold tracking-wider">
              <Layers size={16} />
              <span className="uppercase font-bold text-foreground text-sm font-heading">
                Resin Identification Code & Indian Sorting Telemetry (IS 14534)
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Standardized polymer taxonomy and actual mechanical recovery rates across Indian Material Recovery Facilities (MRFs).
            </p>
          </div>
        </div>

        <motion.div 
          variants={kineticDenseContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {RESIN_CODES.map((resin) => (
            <motion.div
              key={resin.code}
              variants={kineticCard}
              whileHover={kineticHover}
              style={{ perspective: 1000 }}
              className="infra-card p-5 bg-white/35 backdrop-blur-xl border border-white/60 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-xl border border-white/60 bg-white/40 backdrop-blur-md flex items-center justify-center font-mono font-black text-xl text-stone-950 group-hover:border-emerald-600 transition-colors shadow-2xs">
                    {resin.symbol}
                  </div>
                  <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
                    resin.recyclable 
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}>
                    {resin.recyclable ? "Recyclable" : "Non-Recyclable"}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="font-mono text-[11px] text-muted-foreground font-semibold">
                    {resin.shortName} • {resin.decompositionYears} Yrs Degradation
                  </div>
                  <h4 className="text-sm font-bold text-foreground font-heading mt-0.5">
                    {resin.fullName}
                  </h4>
                </div>
                <div className="mt-2.5 font-mono text-[11px] text-emerald-800 bg-emerald-50/60 p-1.5 rounded border border-emerald-100">
                  MRF Rate: <strong>{resin.indianMRFRate}</strong>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border text-xs text-stone-600 leading-relaxed">
                <p className="font-medium text-stone-800 mb-1">Common items: {resin.commonItems.slice(0, 2).join(", ")}</p>
                <p className="text-[11px] text-muted-foreground">{resin.chemicalNotes}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

    </motion.div>
  );
}
