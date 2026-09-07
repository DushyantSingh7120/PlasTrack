import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  RotateCw, 
  IndianRupee, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Leaf, 
  TrendingUp,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { ECO_ALTERNATIVES } from '../../lib/alternativesData';
import { 
  kineticContainer, 
  kineticCard, 
  kineticHover, 
  kineticTap 
} from '../../lib/motion';

export default function AlternativesPage() {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalAnnualGrams = ECO_ALTERNATIVES.reduce((sum, item) => sum + item.annualPlasticSavedGrams, 0);
  const totalAnnualRupees = ECO_ALTERNATIVES.reduce((sum, item) => sum + item.annualMoneySavedINR, 0);

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
            <Sparkles size={16} className="text-emerald-700" />
            <span>INTERACTIVE CIRCULAR CATALOG // 3D FLIP ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl font-bold font-heading text-foreground tracking-tight">
            Eco-Alternatives & Tangible Payback Engine
          </h2>
          <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
            Tap any card to flip between the disposable single-use hazard and its permanent, certified sustainable replacement.
          </p>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold shadow-2xs">
            Cumulative Savings: <strong className="text-foreground">₹{totalAnnualRupees.toLocaleString('en-IN')}/yr</strong>
          </div>
          <div className="px-3 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20 font-semibold shadow-2xs">
            Diverts: <strong className="text-foreground">{(totalAnnualGrams / 1000).toFixed(1)} kg plastic/yr</strong>
          </div>
        </div>
      </motion.div>

      {/* Instruction Tip */}
      <div className="flex items-center justify-between px-2 text-xs font-mono text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <RotateCw size={14} className="text-primary animate-spin-slow" />
          <span>Click or tap any card to flip front (Hazard) and back (Solution)</span>
        </span>
        <span className="hidden sm:inline">
          6 Verified High-Impact Daily Swaps
        </span>
      </div>

      {/* 3D Flip-Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ECO_ALTERNATIVES.map((item) => {
          const isFlipped = !!flippedCards[item.id];

          return (
            <motion.div 
              key={item.id} 
              variants={kineticCard}
              whileHover={kineticHover}
              whileTap={kineticTap}
              style={{ perspective: 1000, willChange: 'transform, opacity' }}
              className="h-[430px] cursor-pointer group select-none"
              onClick={() => toggleFlip(item.id)}
            >
              <motion.div
                className="w-full h-full relative transition-transform duration-500 rounded-2xl"
                style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* FRONT OF CARD: The Disposable Plastic Problem */}
                <div 
                  className="absolute inset-0 w-full h-full p-6 bg-white/35 hover:bg-white/45 backdrop-blur-xl border border-white/60 hover:border-white/90 flex flex-col justify-between rounded-2xl shadow-md transition-all"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-black/10">
                      <span className="font-mono text-[10px] font-black px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-200">
                        DISPOSABLE HAZARD
                      </span>
                      <span className="font-mono text-[11px] text-stone-700 font-bold flex items-center gap-1">
                        <Clock size={12} />
                        <span>{item.lifespan}</span>
                      </span>
                    </div>

                    <div className="mt-4">
                      <span className="font-mono text-[11px] text-stone-600 font-black uppercase tracking-wider block">
                        Target Disposable Item
                      </span>
                      <h3 className="text-xl font-black font-heading text-stone-950 mt-1">
                        {item.plasticTarget}
                      </h3>
                    </div>

                    <div className="mt-5 space-y-3 font-mono text-xs">
                      <div className="p-3 rounded-xl bg-orange-100/70 border border-orange-300/80 text-orange-950">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[11px] font-bold">Ecological Hazard Index</span>
                          <span className="font-black text-amber-900">{item.hazardScore}</span>
                        </div>
                        <p className="text-[11px] text-stone-800 font-body font-medium leading-relaxed">
                          Resistant to enzymatic digestion; leaches chemical plasticizers into soil and aquifers.
                        </p>
                      </div>

                      <div className="flex justify-between items-center py-1 border-b border-black/10">
                        <span className="text-stone-600 font-medium">Decomposition:</span>
                        <span className="font-black text-stone-950">{item.lifespan}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-black/10">
                        <span className="text-stone-600 font-medium">Annual Waste Generated:</span>
                        <span className="font-black text-red-700">~{(item.annualPlasticSavedGrams / 1000).toFixed(2)} kg</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono text-emerald-900 font-bold">
                    <span className="flex items-center gap-1.5">
                      <RotateCw size={13} />
                      <span>Tap to view sustainable swap</span>
                    </span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* BACK OF CARD: The Sustainable Green Alternative */}
                <div 
                  className="absolute inset-0 w-full h-full p-6 bg-white/45 hover:bg-white/55 backdrop-blur-xl border-2 border-emerald-500/80 flex flex-col justify-between rounded-2xl shadow-lg transition-all"
                  style={{ 
                    transform: 'rotateY(180deg)', 
                    WebkitTransform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden', 
                    WebkitBackfaceVisibility: 'hidden' 
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                        SUSTAINABLE REPLACEMENT
                      </span>
                      <span className="font-mono text-[11px] text-emerald-800 font-bold">
                        Payback: ~{item.paybackPeriodDays} Days
                      </span>
                    </div>

                    <div className="mt-4">
                      <span className="font-mono text-[11px] text-emerald-800 uppercase tracking-wider block font-semibold">
                        {item.material}
                      </span>
                      <h3 className="text-lg font-bold font-heading text-foreground mt-0.5">
                        {item.alternativeName}
                      </h3>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-center">
                      <div className="p-2.5 rounded-xl bg-white/40 backdrop-blur-md border border-white/60 shadow-2xs">
                        <span className="text-[10px] text-stone-700 font-bold block uppercase">Saves Money</span>
                        <span className="text-base font-black text-emerald-900">₹{item.annualMoneySavedINR}/yr</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/40 backdrop-blur-md border border-white/60 shadow-2xs">
                        <span className="text-[10px] text-stone-700 font-bold block uppercase">Diverts Plastic</span>
                        <span className="text-base font-black text-emerald-950">{(item.annualPlasticSavedGrams / 1000).toFixed(1)} kg/yr</span>
                      </div>
                    </div>

                    <div className="mt-3.5 space-y-1.5 text-xs text-stone-700 font-body">
                      {item.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-1.5 leading-snug">
                          <CheckCircle2 size={13} className="text-emerald-700 shrink-0 mt-0.5" />
                          <span className="text-[11px]">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-emerald-200 flex items-center justify-between text-xs font-mono text-stone-700">
                    <span className="font-semibold text-emerald-900">
                      Commitment: {item.actionCommitment}
                    </span>
                    <RotateCw size={13} className="text-stone-500 shrink-0" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

    </motion.div>
  );
}
