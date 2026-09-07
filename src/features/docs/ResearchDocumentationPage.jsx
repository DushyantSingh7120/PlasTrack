import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ShieldCheck, 
  FileText, 
  Printer, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Layers, 
  HeartPulse, 
  Truck, 
  ArrowLeft,
  Copy,
  Check,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TABS = [
  { id: 'overview', label: 'Executive Summary', icon: BookOpen },
  { id: 'statutory', label: 'CPCB & MoEFCC Data', icon: ShieldCheck },
  { id: 'chemistry', label: 'Polymer Chemistry & Lifespans', icon: Layers },
  { id: 'clinical', label: 'Clinical & Health Impact', icon: HeartPulse },
  { id: 'solutions', label: 'Indian Engineering Solutions', icon: Truck },
  { id: 'playbook', label: 'Actionable 5R Playbook', icon: CheckCircle2 },
  { id: 'telemetry', label: 'PlastiTrack Equations', icon: Activity },
  { id: 'references', label: 'Official Citations & Repos', icon: FileText }
];

export default function ResearchDocumentationPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedCitation, setCopiedCitation] = useState(false);
  const printContainerRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const copyCitation = () => {
    const citation = `PlastiTrack Environmental Systems Research Group. (2026). "Empirical Observability & Material Flow Tracking of Post-Consumer Plastics in Indian Higher-Education Ecosystems." CHE110 Academic Research Dossier, Department of Environmental Studies. Integrating CPCB PWM Rules (2016-2022), Nature (2024), and NEJM (2024) Clinical Telemetry.`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  return (
    <div id="docs-main-container" className="h-screen overflow-y-auto overflow-x-hidden custom-scrollbar bg-[#08120e] text-stone-100 font-body selection:bg-emerald-500 selection:text-black">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#08120e]/85 backdrop-blur-xl border-b border-emerald-900/40 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link 
            to="/" 
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition border border-white/10 flex items-center gap-1.5 text-xs font-mono"
            title="Return to Landing"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Landing</span>
          </Link>
          <div className="h-5 w-px bg-white/10 hidden sm:block"></div>
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400">
                Official Research Dossier
              </span>
            </div>
            <h1 className="font-heading font-black text-sm sm:text-lg text-white leading-tight tracking-tight">
              PlastiTrack Academic & Statutory Documentation
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={copyCitation}
            type="button"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-stone-200 text-xs font-mono transition cursor-pointer"
          >
            {copiedCitation ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copiedCitation ? "Copied APA" : "Cite Research"}</span>
          </button>

          <button
            onClick={handlePrint}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-black transition cursor-pointer shadow-sm"
          >
            <Printer size={14} />
            <span>Print Dossier</span>
          </button>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition border border-white/15"
          >
            <span>Launch App</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Banner Hero */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0e241b] to-[#0a1a14] border border-emerald-500/25 shadow-2xl relative overflow-hidden mb-8">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
              CHE110 CA1 Project Dossier
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-stone-300 font-mono text-xs">
              Topic 13: Plastic Usage Tracker
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-semibold">
              Data Horizon: 2020–2026
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black font-heading tracking-tight text-white mb-3">
            Observability, Material Flow Analysis & Behavioral Interventions in Indian Plastic Ecology
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-4xl">
            This publication consolidates statutory empirical data from the <strong>Ministry of Environment, Forest and Climate Change (MoEFCC)</strong>, 
            the <strong>Central Pollution Control Board (CPCB)</strong>, and <strong>NITI Aayog</strong>, synthesized alongside groundbreaking clinical 
            and materials research from <em>Nature</em> (2024), <em>The New England Journal of Medicine</em> (2024), and the <em>Indian Roads Congress</em>.
          </p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 custom-scrollbar mb-8 border-b border-white/10">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-mono text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  isActive 
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-black' 
                    : 'bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border border-white/10'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Content Area */}
        <div ref={printContainerRef} className="space-y-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
                  <span className="font-mono text-xs text-emerald-400 font-bold block mb-1">GLOBAL BASELINE</span>
                  <div className="text-3xl font-black font-heading text-white mb-2">9.2 Billion MT</div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Total virgin synthetic plastic produced worldwide since 1950. Less than 10% has ever been mechanically recycled; the remainder persists in landfills, soils, and oceans.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
                  <span className="font-mono text-xs text-amber-400 font-bold block mb-1">INDIA ANNUAL GENERATION</span>
                  <div className="text-3xl font-black font-heading text-white mb-2">4.14 Million MT</div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Over <strong>11,332 metric tonnes per day</strong> officially recorded by CPCB. Urban metropolitan centers alone generate 4,059 tonnes every 24 hours.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
                  <span className="font-mono text-xs text-blue-400 font-bold block mb-1">THE PER-CAPITA PARADOX</span>
                  <div className="text-3xl font-black font-heading text-white mb-2">~11–15 kg/year</div>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    India’s per capita consumption is 1/3rd of the global average (~35 kg) and 1/10th of the USA (~109 kg), yet India faces disproportionate mismanaged waste due to sachet packaging and collection gaps.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
                <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                  <Info size={18} className="text-emerald-400" />
                  Why PlastiTrack Was Built: The Behavioral Feedback Loop
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed">
                  Plastic pollution cannot be solved by regulatory bans alone. In campus cafeterias, hostel rooms, and convenience retail, 
                  consumption is driven by unconscious micro-decisions: grabbing a 500ml PET bottle (+12g, ₹20), using a non-recyclable multi-layered chip packet (+4g, ₹10), 
                  or taking an unneeded plastic carry bag (+5g).
                </p>
                <p className="text-sm text-stone-300 leading-relaxed">
                  PlastiTrack bridges environmental science and behavioral ergonomics by providing <strong>instant observability</strong>. 
                  By logging daily plastic items in seconds, students observe their cumulative mass in grams, calculated financial burden in INR, 
                  comparison against the CPCB national urban benchmark of <strong>34 grams/day</strong>, and biological degradation horizons spanning centuries.
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB 2: CPCB & MoEFCC STATUTORY DATA */}
          {activeTab === 'statutory' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
                <h3 className="text-xl font-bold font-heading text-white">
                  1. CPCB Annual National Waste Audits (PWM Rules Compliance)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/15 text-stone-400">
                        <th className="py-3 px-4">Financial Cycle</th>
                        <th className="py-3 px-4">Total Plastic Waste (TPA)</th>
                        <th className="py-3 px-4">Daily Average (TPD)</th>
                        <th className="py-3 px-4">Reporting Compliance Context</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-stone-200">
                      <tr>
                        <td className="py-3.5 px-4 font-bold text-white">2020 – 2021</td>
                        <td className="py-3.5 px-4">4,126,808 Tonnes</td>
                        <td className="py-3.5 px-4">~11,306 Tonnes/Day</td>
                        <td className="py-3.5 px-4 text-stone-400">Base statutory audit across 35 State Boards/Committees</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-bold text-white">2021 – 2022</td>
                        <td className="py-3.5 px-4">3,901,802 Tonnes</td>
                        <td className="py-3.5 px-4">~10,689 Tonnes/Day</td>
                        <td className="py-3.5 px-4 text-stone-400">Swachh Bharat Mission urban collection enhancement</td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-bold text-emerald-400">2022 – 2023</td>
                        <td className="py-3.5 px-4 font-bold text-emerald-400">4,136,188 Tonnes</td>
                        <td className="py-3.5 px-4 font-bold text-emerald-400">~11,332 Tonnes/Day</td>
                        <td className="py-3.5 px-4 text-stone-400">Post nationwide single-use plastic ban baseline</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* The 19 Banned Items */}
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-heading text-white">
                    2. The Nationwide Ban on 19 Single-Use Plastic (SUP) Items (MoEFCC)
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 font-mono">
                    Enacted under Gazette Notification G.S.R. 571(E), effective July 1, 2022. Selected due to lowest utility and highest littering index:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
                  {[
                    "Ear buds with plastic sticks",
                    "Plastic sticks for balloons",
                    "Plastic flags",
                    "Candy sticks",
                    "Ice-cream sticks",
                    "Polystyrene (Thermocol) decoration",
                    "Plastic plates",
                    "Plastic cups",
                    "Plastic glasses",
                    "Plastic cutlery (forks)",
                    "Plastic cutlery (spoons)",
                    "Plastic cutlery (knives)",
                    "Plastic beverage straws",
                    "Plastic beverage stirrers",
                    "Plastic trays",
                    "Sweet box wrapping films",
                    "Invitation card wrapping films",
                    "Cigarette packet packaging films",
                    "PVC banners under 100 microns"
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-black/40 border border-red-500/20 text-stone-300 flex items-center gap-2.5">
                      <span className="h-5 w-5 rounded-md bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-mono">
                  <strong>Statutory Bag Thickness Mandate:</strong> Minimum thickness escalated from 50μm &rarr; 75μm (Sep 2021) &rarr; <strong>120 microns (Dec 31, 2022)</strong> to ensure informal waste pickers can feasibly collect and bale them for mechanical recycling.
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: POLYMER CHEMISTRY & DEGRADATION LIFESPANS */}
          {activeTab === 'chemistry' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
                <h3 className="text-xl font-bold font-heading text-white">
                  Resin Identification Codes, Chemistry & Environmental Lifespans
                </h3>
                <p className="text-xs text-stone-400 font-mono">
                  Synthetic polymers are engineered with durable covalent carbon-carbon backbones ($—C—C—$) that resist natural microbial enzymatic cleavage:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/15 text-stone-400">
                        <th className="py-3 px-3">Resin Code</th>
                        <th className="py-3 px-3">Chemical Name</th>
                        <th className="py-3 px-3">Common Items</th>
                        <th className="py-3 px-3">Degradation Lifespan</th>
                        <th className="py-3 px-3">Recyclability Rating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-stone-200">
                      <tr>
                        <td className="py-3 px-3 font-bold text-emerald-400">#1 PET</td>
                        <td className="py-3 px-3">Polyethylene Terephthalate</td>
                        <td className="py-3 px-3">Water & beverage bottles, blister packs</td>
                        <td className="py-3 px-3 text-amber-400 font-bold">~450 Years</td>
                        <td className="py-3 px-3 text-emerald-400">High (Flakes & Yarn)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-bold text-blue-400">#2 HDPE</td>
                        <td className="py-3 px-3">High-Density Polyethylene</td>
                        <td className="py-3 px-3">Milk jugs, shampoo bottles, pipes</td>
                        <td className="py-3 px-3 text-amber-400 font-bold">~100 Years</td>
                        <td className="py-3 px-3 text-emerald-400">High (Extrusion)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-bold text-red-400">#3 PVC</td>
                        <td className="py-3 px-3">Polyvinyl Chloride</td>
                        <td className="py-3 px-3">Plumbing pipes, credit cards, vinyl wrap</td>
                        <td className="py-3 px-3 text-red-400 font-bold">Indefinite (Dioxins on burning)</td>
                        <td className="py-3 px-3 text-red-400">Very Low (Toxic)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-bold text-purple-400">#4 LDPE</td>
                        <td className="py-3 px-3">Low-Density Polyethylene</td>
                        <td className="py-3 px-3">Grocery bags, squeeze bottles, shrink film</td>
                        <td className="py-3 px-3 text-amber-400 font-bold">20 – 100 Years</td>
                        <td className="py-3 px-3 text-yellow-400">Medium (If &gt;120μm)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-bold text-emerald-400">#5 PP</td>
                        <td className="py-3 px-3">Polypropylene</td>
                        <td className="py-3 px-3">Canteen meal trays, bottle caps, straws</td>
                        <td className="py-3 px-3 text-amber-400 font-bold">~450 Years</td>
                        <td className="py-3 px-3 text-emerald-400">High (Degreased)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-bold text-red-400">#6 PS</td>
                        <td className="py-3 px-3">Polystyrene / Expanded Styrofoam</td>
                        <td className="py-3 px-3">Disposable cutlery, thermocol trays</td>
                        <td className="py-3 px-3 text-red-400 font-bold">~500 Years</td>
                        <td className="py-3 px-3 text-red-400">Negligible (Brittle)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-bold text-stone-400">#7 Other / MLP</td>
                        <td className="py-3 px-3">Multi-Layered Plastics (Aluminium/BOPP)</td>
                        <td className="py-3 px-3">Chip bags, shampoo sachets, tetrapacks</td>
                        <td className="py-3 px-3 text-red-400 font-bold">Centuries (Nanoplastics)</td>
                        <td className="py-3 px-3 text-red-400">Zero (Cement Kiln only)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: CLINICAL & HEALTH IMPACT */}
          {activeTab === 'clinical' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* NEJM Study */}
                <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 font-mono text-xs font-bold">
                    <HeartPulse size={14} />
                    New England Journal of Medicine (March 2024)
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white">
                    Microplastics Detected in 58.4% of Human Arterial Plaques
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed font-mono">
                    A clinical prospective study tracking 257 carotid endarterectomy patients (<em>Marfella et al.</em>) revealed jagged polyethylene 
                    and PVC particles embedded directly inside atheromas.
                  </p>
                  <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-xs font-mono text-red-200">
                    <strong>Hazard Ratio 4.53:</strong> Patients with microplastics inside their carotid plaque had a 
                    <strong> 4.53 times higher risk</strong> of suffering a heart attack, stroke, or mortality over 34 months, 
                    correlated with elevated systemic inflammatory cytokines (IL-6, IL-18, TNF-&alpha;).
                  </div>
                </div>

                {/* Toxics Link India Study */}
                <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold">
                    <AlertTriangle size={14} />
                    Toxics Link Indian Food Staples Audit (2024)
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white">
                    100% Contamination in Commercial Salt & Sugar
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed font-mono">
                    Independent lab testing across commercial brands in Indian markets detected microscopic plastic filaments (0.1 mm &ndash; 5 mm) 
                    in <strong>every single sample tested</strong>.
                  </p>
                  <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs font-mono text-amber-200">
                    <strong>Concentrations:</strong> Iodized table salt revealed <strong>6.71 to 89.15 particles per kg</strong>. 
                    Commercial sugar contained <strong>11.85 to 68.25 particles per kg</strong>, predominantly polyethylene and polyester fibres.
                  </div>
                </div>
              </div>

              {/* Bovine Impaction */}
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
                <h3 className="text-xl font-bold font-heading text-white">
                  The Urban Bovine Crisis: Rumen Plastic Impaction
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed">
                  In Indian municipal areas, household vegetable scraps and leftover food are routinely discarded wrapped in polythene bags. 
                  Stray cows consume the entire bag. Because cows are ruminants, synthetic polymers cannot pass into the digestive tract. 
                  Veterinary surgeons across Rajasthan, Uttar Pradesh, and Tamil Nadu routinely perform surgical rumenotomies, extracting 
                  <strong> 30 kg to over 70 kg of solid plastic bags</strong> from a single cow’s stomach.
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB 5: INDIAN ENGINEERING SOLUTIONS */}
          {activeTab === 'solutions' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Prof Vasudevan */}
                <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
                    IRC:SP:98-2020 Statutory Standard
                  </span>
                  <h3 className="text-xl font-bold font-heading text-white">
                    Prof. Rajagopalan Vasudevan: Plastic Roads Technology
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed font-mono">
                    Patented by Padma Shri Dr. Vasudevan (Thiagarajar College of Engineering), shredded scrap plastic (carry bags, cups, MLP) 
                    is sprayed over stone aggregates heated to <strong>165&deg;C</strong>. The molten plastic coats the stone in 30 seconds, 
                    bonding dramatically with 160&deg;C bitumen.
                  </p>
                  <ul className="text-xs font-mono text-stone-300 space-y-2 list-disc list-inside">
                    <li>3x higher compressive strength; virtually eliminates monsoon potholes.</li>
                    <li>Saves <strong>1 tonne of bitumen per kilometre</strong> of single-lane highway.</li>
                    <li>Over <strong>100,000 kilometres</strong> of plastic roads built across India under PMGSY.</li>
                  </ul>
                </div>

                {/* Cement Kiln Co-Processing */}
                <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 font-mono text-xs font-bold">
                    CPCB Industrial Co-Processing
                  </span>
                  <h3 className="text-xl font-bold font-heading text-white">
                    Rotary Cement Kiln Co-Processing at 1,500&deg;C
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed font-mono">
                    For multi-layered plastic (MLP) sachets that cannot be mechanically recycled, modern cement kilns inject 
                    Refuse Derived Fuel (RDF) at temperatures exceeding <strong>1,400&deg;C &ndash; 1,500&deg;C</strong>.
                  </p>
                  <ul className="text-xs font-mono text-stone-300 space-y-2 list-disc list-inside">
                    <li>Complete hydrocarbon mineralization with &gt;2 sec residence time.</li>
                    <li>Zero synthesis of toxic dioxins and furans compared to open burning.</li>
                    <li>Mineral residue integrates safely into the cement clinker lattice, replacing coal.</li>
                  </ul>
                </div>
              </div>

              {/* Informal Recycling Sector */}
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
                <h3 className="text-xl font-bold font-heading text-white">
                  India&apos;s Informal Army: 70%&ndash;80% PET Recycling Rate
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed">
                  While western media often portrays India solely as a plastic emissions hotspot, India’s informal sector of 
                  <strong> 1.5 to 4 million waste pickers (kabadiwalas)</strong> achieves a remarkable <strong>70% to 80% PET mechanical recycling rate</strong>, 
                  drastically outperforming the United States (~29%) and the European Union (~50%). 
                  NITI Aayog policy monographs advocate formalizing these workers into registered Self-Help Groups (SHGs) with direct health insurance and formal Material Recovery Facility (MRF) integration.
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB 6: ACTIONABLE 5R PLAYBOOK */}
          {activeTab === 'playbook' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
                <h3 className="text-xl font-bold font-heading text-white">
                  Individual Student Commitments: The 5 R Framework
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-5 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-2">
                    <span className="text-emerald-400 font-black text-sm">1. REFUSE</span>
                    <p className="text-stone-300">
                      Say no to single-use cutlery, straws, and ₹20 packaged water bottles. Saves ~300 PET bottles and ₹6,000 per student every year.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-black/40 border border-blue-500/30 space-y-2">
                    <span className="text-blue-400 font-black text-sm">2. REDUCE</span>
                    <p className="text-stone-300">
                      Purchase institutional size refills for shampoo and detergent instead of ₹2 sachets. Cuts non-recyclable flexible MLP by 70%.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-black/40 border border-purple-500/30 space-y-2">
                    <span className="text-purple-400 font-black text-sm">3. REUSE</span>
                    <p className="text-stone-300">
                      Carry the &ldquo;Campus Triple&rdquo;: 1L stainless steel bottle, 1 foldable cotton bag, and 1 steel spoon set. One cotton tote replaces 400 plastic carry bags.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-black/40 border border-amber-500/30 space-y-2">
                    <span className="text-amber-400 font-black text-sm">4. REPURPOSE</span>
                    <p className="text-stone-300">
                      Rinse and dry takeaway food containers. Clean containers can be reused for stationery, cable storage, or clean baling.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-black/40 border border-red-500/30 space-y-2">
                    <span className="text-red-400 font-black text-sm">5. RECYCLE</span>
                    <p className="text-stone-300">
                      Segregate rigid PET and HDPE plastics into blue dry-waste bins for formal MRF processing under CPCB EPR tracking.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-2">
                    <span className="text-emerald-300 font-black text-sm">&starf; MILK POUCH RULE</span>
                    <p className="text-stone-300">
                      <strong>Never snip off the small triangular corner</strong> of milk pouches completely. Keep it attached so the micro-triangle doesn&apos;t escape into storm drains!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 7: PLASTITRACK EQUATIONS & TELEMETRY */}
          {activeTab === 'telemetry' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
                <h3 className="text-xl font-bold font-heading text-white">
                  Mathematical Formulations Driving the PlastiTrack Observability Engine
                </h3>

                <div className="space-y-6 font-mono text-xs">
                  <div className="p-5 rounded-2xl bg-black/50 border border-white/15">
                    <span className="text-emerald-400 font-bold block mb-2">1. CPCB National Urban Deviation Percentage</span>
                    <div className="p-3 bg-black rounded-lg text-stone-200 mb-2 font-mono">
                      Deviation % = ((Daily_Average_g - 34) / 34) &times; 100
                    </div>
                    <p className="text-stone-400">
                      Where 34 grams/day is the statutory baseline per-capita plastic generation derived from CPCB urban municipality annual audits.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-black/50 border border-white/15">
                    <span className="text-blue-400 font-bold block mb-2">2. Embodied Carbon Dioxide Equivalent (CO2e)</span>
                    <div className="p-3 bg-black rounded-lg text-stone-200 mb-2 font-mono">
                      Embodied CO2e (kg) = Total_Plastic_Mass (kg) &times; 2.50
                    </div>
                    <p className="text-stone-400">
                      Embodied life-cycle cradle-to-gate greenhouse emission factor for mixed petroleum polymer extrusion (IPCC / EPA WARM model).
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-black/50 border border-white/15">
                    <span className="text-amber-400 font-bold block mb-2">3. Life-Cycle Degradation Persistence Score</span>
                    <div className="p-3 bg-black rounded-lg text-stone-200 mb-2 font-mono">
                      Degradation_Score = &Sigma; (Item_Count_i &times; Mass_i &times; Half_Life_Years_i)
                    </div>
                    <p className="text-stone-400">
                      Weights items based on environmental persistence (e.g. PET bottle = 450 yrs, Carry bag = 100 yrs, MLP = 500+ yrs).
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 8: OFFICIAL CITATIONS & REPOSITORIES */}
          {activeTab === 'references' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
                <h3 className="text-xl font-bold font-heading text-white">
                  Statutory Portals, Peer-Reviewed Papers & Project Repositories
                </h3>

                <div className="space-y-3 font-mono text-xs">
                  {[
                    {
                      title: "Central Pollution Control Board (CPCB) — Annual PWM Rules Implementation Reports",
                      meta: "Govt. of India (2020-2023)",
                      url: "https://cpcb.nic.in"
                    },
                    {
                      title: "MoEFCC Gazette G.S.R. 571(E) — Plastic Waste Management (Amendment) Rules, 2021",
                      meta: "19 SUP banned items & 120-micron carry bags",
                      url: "https://moef.gov.in"
                    },
                    {
                      title: "Nature Journal — 'A local-to-global emissions inventory of macroplastic pollution'",
                      meta: "Cottom, J.W., Cook, E., Velis, C.A. (September 2024, Nature 633, 101–108)",
                      url: "https://doi.org/10.1038/s41586-024-07758-6"
                    },
                    {
                      title: "New England Journal of Medicine (NEJM) — 'Microplastics and Nanoplastics in Atheromas'",
                      meta: "Marfella, R., et al. (March 2024, N Engl J Med 390:900-910)",
                      url: "https://doi.org/10.1056/NEJMoa2309822"
                    },
                    {
                      title: "Indian Roads Congress — IRC:SP:98-2020 Guidelines for Use of Waste Plastic in Road Construction",
                      meta: "Dr. R. Vasudevan dry process polymer bitumen modification",
                      url: "https://irc.nic.in"
                    },
                    {
                      title: "Toxics Link — 'Microplastics in Salt and Sugar: An Unseen Contaminant in Common Staples'",
                      meta: "Analytical laboratory survey of Indian retail brands (2024)",
                      url: "https://toxicslink.org"
                    },
                    {
                      title: "NITI Aayog — 'Alternative Products and Technologies to Plastics and their Applications'",
                      meta: "Policy monograph on circular economy and informal sector integration (2022)",
                      url: "https://niti.gov.in"
                    }
                  ].map((ref, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-4">
                      <div>
                        <div className="font-bold text-white text-sm">{ref.title}</div>
                        <div className="text-stone-400 text-xs mt-0.5">{ref.meta}</div>
                      </div>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500 hover:text-black transition text-stone-300 shrink-0"
                        title="Open Source"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
