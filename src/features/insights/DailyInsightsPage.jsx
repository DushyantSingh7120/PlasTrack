import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Atom, 
  FlaskConical, 
  Layers, 
  Recycle, 
  Sparkles, 
  Flame,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const RESIN_CODES = [
  {
    code: '1',
    symbol: '♳',
    name: 'PET (Polyethylene Terephthalate)',
    formula: '(C₁₀H₈O₄)ₙ',
    meltingPoint: '260°C (500°F)',
    stream: 'Bottle-to-fiber / rPET',
    status: 'HIGH RECYCLABILITY',
    statusBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    borderColor: 'border-emerald-200 bg-emerald-50/50 text-forest',
    uses: 'Beverage bottles, clamshell containers, synthetic polyester textiles.',
  },
  {
    code: '2',
    symbol: '♴',
    name: 'HDPE (High-Density Polyethylene)',
    formula: '(C₂H₄)ₙ (High linearity)',
    meltingPoint: '130°C (266°F)',
    stream: 'High-purity mechanical regrind',
    status: 'EXCELLENT (CLOSED-LOOP)',
    statusBadge: 'bg-teal-50 text-teal-800 border-teal-200',
    borderColor: 'border-teal-200 bg-teal-50/50 text-teal-700',
    uses: 'Milk jugs, detergent bottles, agricultural piping, geomembranes.',
  },
  {
    code: '3',
    symbol: '♵',
    name: 'PVC (Polyvinyl Chloride)',
    formula: '(C₂H₃Cl)ₙ',
    meltingPoint: '212°C (414°F)',
    stream: 'Hazardous Cl contamination',
    status: 'VERY LOW (<1%)',
    statusBadge: 'bg-amber-50 text-amber-800 border-amber-200',
    borderColor: 'border-amber-200 bg-amber-50/50 text-amber-700',
    uses: 'Construction pipes, medical tubing, cable sheathing, blood bags.',
  },
  {
    code: '4',
    symbol: '♶',
    name: 'LDPE (Low-Density Polyethylene)',
    formula: '(C₂H₄)ₙ (Branched)',
    meltingPoint: '110°C (230°F)',
    stream: 'Film consolidation drop-offs',
    status: 'MODERATE RECOVERY',
    statusBadge: 'bg-stone-100 text-stone-700 border-stone-300',
    borderColor: 'border-stone-300 bg-stone-100 text-stone-700',
    uses: 'Squeeze bottles, grocery bags, shrink wrap, bubble liners.',
  },
  {
    code: '5',
    symbol: '♷',
    name: 'PP (Polypropylene)',
    formula: '(C₃H₆)ₙ',
    meltingPoint: '165°C (329°F)',
    stream: 'Curbside expansion underway',
    status: 'GROWING (NIR SORT)',
    statusBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    borderColor: 'border-emerald-200 bg-emerald-50/50 text-emerald-700',
    uses: 'Takeout meal boxes, bottle caps, yogurt tubs, automotive battery casings.',
  },
  {
    code: '6',
    symbol: '♸',
    name: 'PS (Polystyrene)',
    formula: '(C₈H₈)ₙ',
    meltingPoint: '240°C (464°F)',
    stream: 'Economically unviable',
    status: 'POOR / LEACH RISK',
    statusBadge: 'bg-stone-200 text-stone-700 border-stone-300',
    borderColor: 'border-stone-300 bg-stone-100 text-stone-700',
    uses: 'Styrofoam cups, disposable cutlery, CD jewel cases, meat trays.',
  },
];

const BIOPOLYMERS = [
  {
    tag: 'Bio-Polyester',
    name: 'PLA (Polylactic Acid)',
    co2: '-68% CO₂e',
    source: 'Fermented plant starches (Corn / Cassava)',
    degradability: 'Industrial 58°C, 90d',
    strength: '50–70 MPa',
    target: 'Cold food packaging, 3D printing filaments, agricultural mulches.',
    accent: 'text-forest',
  },
  {
    tag: 'Bacterial Polymer',
    name: 'PHA (Polyhydroxyalkanoates)',
    co2: '-80% CO₂e',
    source: 'Microbial fermentation of lipids/sugars',
    degradability: 'Marine & Soil (6-12 mo)',
    strength: 'Zero Microplastics',
    target: 'Marine coatings, single-use food wraps, biomedical suture scaffolds.',
    accent: 'text-teal-700',
  },
  {
    tag: 'Fungal Bio-Composite',
    name: 'Mycelium Composite Packaging',
    co2: '100% REGENERATIVE',
    source: 'Fungal vegetative root network on hemp/sawdust',
    degradability: 'Home Compost (30–45 days)',
    strength: 'Exceeds EPS foam',
    target: 'Custom shock-absorbing packaging, thermal cool boxes, acoustic insulation.',
    accent: 'text-amber-700',
  },
];

export default function DailyInsightsPage() {
  const [selectedResin, setSelectedResin] = useState(null);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Tracker Top Banner */}
      <section className="bg-white/85 backdrop-blur-sm border border-[#cfcdc1] rounded-xl px-5 py-3 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-400"></span>
            <span className="font-bold text-stone-900 tracking-wide">
              ● CURATED_INSIGHT // ARCHIVE ID: RES-2026-M4
            </span>
          </div>
          <span className="text-stone-300">|</span>
          <span>DISCIPLINE: <span className="text-stone-800 font-semibold">POLYMER SCIENCE & ECO-TOXICOLOGY</span></span>
          <span className="text-stone-300">|</span>
          <span>SOURCE: <span className="text-forest font-semibold">JOURNAL OF MACROMOLECULAR CHEMISTRY</span></span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold">
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/80">
            PEER REVIEWED (Q1)
          </span>
          <span className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 border border-stone-300">
            DEGRADATION MODEL NIST-ALIGNED
          </span>
        </div>
      </section>

      {/* SECTION A: Top Featured Hero Card */}
      <section className="bg-white rounded-2xl border border-[#cfcdc1] p-6 md:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200/80">
          <div className="flex items-center gap-2 text-forest font-mono text-xs font-semibold tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>RESEARCH BRIEF // PET CHEMICAL DYNAMICS & ENVIRONMENTAL PERSISTENCE</span>
          </div>
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-stone-100 text-stone-700 border border-stone-200 font-semibold">
            FEATURED INSIGHT
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold font-heading text-stone-900 tracking-tight leading-snug">
              PET Photolytic & Hydrolytic Degradation: The 450-Year Half-Life Paradox
            </h3>
            <p className="text-sm md:text-base text-stone-700 leading-relaxed font-body">
              Polyethylene Terephthalate (PET, <span className="font-mono font-semibold text-stone-900">(C₁₀H₈O₄)ₙ</span>) is engineered for immense tensile strength and barrier resistance via ester bonds that resist standard microbial enzymatic cleavage. In terrestrial and ocean conditions, PET breaks down primarily via mechanical shearing and UV photolysis into sub-5mm secondary microplastics and nanoplastics (&lt;100nm) rather than mineralizing, accumulating persistent synthetic additives into marine food webs.
            </p>

            {/* Chemical Formula Reaction Box */}
            <div className="p-4 rounded-xl bg-stone-100/75 border border-stone-200 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-stone-500 font-semibold text-[11px]">
                <span>REACTION BACKBONE & ESTER BOND CLEAVAGE</span>
                <span className="text-forest">HYDROLYSIS ΔG° = +18.4 kJ/mol</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-stone-300 text-stone-900 font-bold overflow-x-auto tracking-wide text-xs">
                [—CO—C₆H₄—CO—O—CH₂—CH₂—O—]ₙ + H₂O ⟶ [—CO—C₆H₄—COOH] + [HO—CH₂—CH₂—O—]ₙ
              </div>
              <p className="text-[11px] text-stone-600">
                High activation energy required for ester bond scission under ambient temperatures yields extreme biological recalcitrance.
              </p>
            </div>
          </div>

          {/* Right Stat Column: 3 Key Metrics */}
          <div className="lg:col-span-4 space-y-3">
            <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200">
              <p className="font-mono text-[11px] text-stone-500 uppercase tracking-wider font-medium">Half-Life Estimate</p>
              <p className="font-mono text-2xl font-bold text-stone-900 tracking-tight mt-0.5">450+ Years</p>
              <p className="font-mono text-[11px] text-stone-600 mt-1">Hydrolytic resistance in marine basins</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200">
              <p className="font-mono text-[11px] text-amber-700 uppercase tracking-wider font-medium">Ocean Microplastic Fragmentation</p>
              <p className="font-mono text-2xl font-bold text-stone-900 tracking-tight mt-0.5">1.8M Particles / kg</p>
              <p className="font-mono text-[11px] text-stone-600 mt-1">Estimated surface area degradation yield</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200">
              <p className="font-mono text-[11px] text-emerald-800 uppercase tracking-wider font-medium">Enzymatic Breakthrough</p>
              <p className="font-mono text-2xl font-bold text-forest tracking-tight mt-0.5">72 Hours</p>
              <p className="font-mono text-[11px] text-stone-600 mt-1">PETase / Cutinase engineered depolymerization speed</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: Polymer Resin Identification & Thermochemical Directory */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
          <div>
            <div className="flex items-center gap-2 text-stone-700 font-mono text-xs font-semibold tracking-wider">
              <Layers size={16} className="text-forest" />
              <span className="uppercase font-bold text-stone-900 text-sm font-heading">
                Polymer Resin Identification & Thermochemical Directory
              </span>
            </div>
            <p className="text-xs text-stone-500 font-mono mt-0.5">
              STANDARDIZED RESIN CODES // ASTM D7611 THERMOPLASTIC CHARACTERISTICS
            </p>
          </div>
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-white text-stone-700 border border-stone-300 font-semibold">
            {RESIN_CODES.length} CODES CATALOGED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESIN_CODES.map((resin) => (
            <div
              key={resin.code}
              className="bg-white rounded-2xl border border-[#cfcdc1] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
              onClick={() => setSelectedResin(resin)}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-base ${resin.borderColor}`}>
                    {resin.symbol} {resin.code}
                  </div>
                  <span className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded border ${resin.statusBadge}`}>
                    {resin.status}
                  </span>
                </div>
                <div className="mt-3">
                  <h4 className="text-base font-bold text-stone-900 group-hover:text-forest transition-colors">
                    {resin.name}
                  </h4>
                  <p className="font-mono text-xs text-stone-500 mt-0.5">Formula: {resin.formula}</p>
                </div>
                <div className="mt-3 space-y-1.5 font-mono text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Melting Point:</span>
                    <span className="font-bold text-stone-900">{resin.meltingPoint}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Stream:</span>
                    <span className="font-bold text-forest">{resin.stream}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-600">
                <span className="font-medium text-stone-800 block text-[11px] uppercase font-mono mb-1">
                  Common Uses
                </span>
                <p className="leading-relaxed font-body">{resin.uses}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION C: Circular Alternatives & Next-Generation Biopolymer Matrix */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
          <div>
            <div className="flex items-center gap-2 text-stone-700 font-mono text-xs font-semibold tracking-wider">
              <Recycle size={16} className="text-forest" />
              <span className="uppercase font-bold text-stone-900 text-sm font-heading">
                Circular Alternatives & Next-Generation Biopolymer Matrix
              </span>
            </div>
            <p className="text-xs text-stone-500 font-mono mt-0.5">
              CIRCULAR HORIZON // BIO-BENIGN REPLACEMENTS & ENZYMATIC ADVANCEMENTS
            </p>
          </div>
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-forest text-white font-semibold">
            {BIOPOLYMERS.length} BENCHMARKS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BIOPOLYMERS.map((bio) => (
            <div
              key={bio.name}
              className="bg-white rounded-2xl border border-[#cfcdc1] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold tracking-wider uppercase ${bio.accent}`}>
                    {bio.tag}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                    {bio.co2}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-stone-900 mt-2 font-heading">{bio.name}</h4>
                <p className="text-xs text-stone-600 mt-1 font-mono">Source: {bio.source}</p>

                <div className="mt-4 space-y-2 font-mono text-xs">
                  <div className="p-2.5 rounded-lg bg-stone-100/70 border border-stone-200 flex justify-between">
                    <span className="text-stone-600">Degradability:</span>
                    <span className="font-bold text-stone-900">{bio.degradability}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-100/70 border border-stone-200 flex justify-between">
                    <span className="text-stone-600">Strength/Metric:</span>
                    <span className={`font-bold ${bio.accent}`}>{bio.strength}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 text-xs text-stone-600 font-mono">
                <span className="text-[11px] font-bold text-stone-800 block uppercase mb-1">Target Application</span>
                <p className="font-body text-xs text-stone-700">{bio.target}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
