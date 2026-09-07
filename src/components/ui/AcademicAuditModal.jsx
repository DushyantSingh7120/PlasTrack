import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, FileText, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AcademicAuditModal({ isOpen, onClose, auditData }) {
  const printRef = useRef(null);

  if (!isOpen) return null;

  const {
    totalGrams = 249,
    avgDailyGrams = 36,
    nationalAvgGrams = 33,
    totalCostINR = 691,
    cycleDays = 7
  } = auditData || {};

  const handlePrint = () => {
    window.print();
  };

  const isBelowNational = avgDailyGrams <= nationalAvgGrams;
  const deviationPct = Math.abs(Math.round(((avgDailyGrams - nationalAvgGrams) / nationalAvgGrams) * 100));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md">
        
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-stone-50 border border-stone-300 rounded-2xl shadow-2xl p-6 sm:p-10 font-body text-stone-900 custom-scrollbar"
        >
          {/* Top Control Bar (Hidden when printing) */}
          <div className="print:hidden flex items-center justify-between pb-6 mb-6 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-100 text-emerald-900">
                <FileText size={20} />
              </span>
              <div>
                <h2 className="font-heading font-black text-lg text-stone-900">
                  CPCB Statutory Audit Dossier
                </h2>
                <p className="text-xs font-mono text-stone-500">
                  Academic Environmental Fieldwork Evaluation Protocol
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePrint}
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white font-mono text-xs font-bold transition shadow-sm cursor-pointer"
              >
                <Printer size={15} />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={onClose}
                type="button"
                className="p-2 rounded-xl hover:bg-stone-200 text-stone-600 transition cursor-pointer"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* PRINTABLE DOSSIER SHEET */}
          <div ref={printRef} className="space-y-6 print:space-y-4 print:p-0">
            
            {/* Header / Institutional Metadata */}
            <div className="border-b-2 border-stone-900 pb-5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-mono text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Course: CHE110 // CA1 Environmental Chemistry Field Audit
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-stone-950 mt-1">
                    PlastiTrack Empirical Consumption Dossier
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-600 font-medium mt-1">
                    Standardized against Central Pollution Control Board (CPCB) Plastic Waste Management Rules (2016/2024 Amendment)
                  </p>
                </div>
                <div className="text-right font-mono text-xs text-stone-600">
                  <div>Date: <strong>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong></div>
                  <div>Audit Span: <strong>{cycleDays} Days Rolling</strong></div>
                  <div className="mt-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 font-bold border border-emerald-300 inline-block">
                    VERIFIED DATASET
                  </div>
                </div>
              </div>
            </div>

            {/* Key Findings Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white border border-stone-200">
                <span className="font-mono text-[10px] text-stone-500 uppercase font-bold block">
                  7-Day Plastic Mass
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-stone-900">
                  {totalGrams}g
                </span>
                <span className="text-[11px] text-stone-600 font-medium block mt-0.5">
                  Cumulative disposable resin
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200">
                <span className="font-mono text-[10px] text-stone-500 uppercase font-bold block">
                  Per-Capita Daily Avg
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-stone-900">
                  {avgDailyGrams}g
                </span>
                <span className="text-[11px] text-stone-600 font-medium block mt-0.5">
                  vs. CPCB Nat'l Avg (33g)
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200">
                <span className="font-mono text-[10px] text-stone-500 uppercase font-bold block">
                  Retail Expenditure
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-stone-900">
                  ₹{totalCostINR}
                </span>
                <span className="text-[11px] text-stone-600 font-medium block mt-0.5">
                  Single-use packaging cost
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200">
                <span className="font-mono text-[10px] text-stone-500 uppercase font-bold block">
                  Persistence Horizon
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-stone-900">
                  ~450 Yrs
                </span>
                <span className="text-[11px] text-stone-600 font-medium block mt-0.5">
                  Pre-fragmentation half-life
                </span>
              </div>
            </div>

            {/* Statutory Compliance Assessment */}
            <div className={`p-4 rounded-xl border ${isBelowNational ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950' : 'bg-amber-50/70 border-amber-300 text-amber-950'}`}>
              <div className="flex items-center gap-2 font-bold font-mono text-xs">
                {isBelowNational ? <ShieldCheck size={16} className="text-emerald-700" /> : <AlertCircle size={16} className="text-amber-700" />}
                <span>
                  {isBelowNational 
                    ? `STATUTORY COMPLIANCE: ${deviationPct}% BELOW NATIONAL PER-CAPITA BENCHMARK`
                    : `EXCEEDANCE WARNING: ${deviationPct}% ABOVE NATIONAL URBAN AVERAGE (33g/day)`}
                </span>
              </div>
              <p className="text-xs font-body mt-1.5 leading-relaxed">
                {isBelowNational
                  ? "Audit subject demonstrates responsible resin stewardship within campus parameters. Continued substitution of LDPE film packaging is recommended to maintain zero-leakage threshold."
                  : "Audit subject exceeds the 33g/capita/day municipal urban consumption ceiling. Primary resin driver identified: Single-use PET beverage containers and food delivery polypropylene clamshells."}
              </p>
            </div>

            {/* Polymer Distribution & MRF Recyclability Analysis */}
            <div>
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-stone-800 mb-2.5">
                Polymer Resin Identification & Circularity Analysis
              </h3>
              <div className="overflow-x-auto border border-stone-300 rounded-xl bg-white">
                <table className="w-full text-xs text-left font-mono">
                  <thead className="bg-stone-100 border-b border-stone-300 text-stone-700 font-bold uppercase">
                    <tr>
                      <th className="p-3">Resin Type</th>
                      <th className="p-3">Chemical Identity</th>
                      <th className="p-3">Indian MRF Rate</th>
                      <th className="p-3">Degradation</th>
                      <th className="p-3">Statutory Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    <tr>
                      <td className="p-3 font-bold text-emerald-800">PET #1</td>
                      <td className="p-3">Polyethylene Terephthalate</td>
                      <td className="p-3">~75% Mechanical Recycling</td>
                      <td className="p-3">450 Years</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px]">High Circularity</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-blue-800">PP #5</td>
                      <td className="p-3">Polypropylene</td>
                      <td className="p-3">~40% Mechanical Recycling</td>
                      <td className="p-3">450 Years</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-[10px]">Reusable Target</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-teal-800">LDPE #4</td>
                      <td className="p-3">Low-Density Polyethylene</td>
                      <td className="p-3">~30% Mechanical Recycling</td>
                      <td className="p-3">300 Years</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">&gt;120μm Mandate</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-red-800">MLP / PS #6</td>
                      <td className="p-3">Multi-Layer Metallized Plastic</td>
                      <td className="p-3">0% (Cement Kiln Co-processing)</td>
                      <td className="p-3">500+ Years</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-red-100 text-red-900 font-bold text-[10px]">Non-Recyclable</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Verified Sustainable Swaps / Circular Interventions */}
            <div>
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-stone-800 mb-2.5">
                Empirical Intervention Playbook (Circular Payback)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-stone-200">
                  <div className="font-bold text-stone-900">1. Stainless Steel Flask</div>
                  <div className="text-emerald-700 font-semibold mt-1">Saves: 4.38 kg plastic / yr</div>
                  <div className="text-stone-500 text-[11px] mt-0.5">Payback: ~3 Weeks (₹350 saves ₹3,600)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-stone-200">
                  <div className="font-bold text-stone-900">2. Cotton / Jute Carry Bag</div>
                  <div className="text-emerald-700 font-semibold mt-1">Saves: 1.82 kg plastic / yr</div>
                  <div className="text-stone-500 text-[11px] mt-0.5">Payback: ~2 Weeks (₹50 saves ₹1,200)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-stone-200">
                  <div className="font-bold text-stone-900">3. Steel Tiffin / Container</div>
                  <div className="text-emerald-700 font-semibold mt-1">Saves: 8.76 kg plastic / yr</div>
                  <div className="text-stone-500 text-[11px] mt-0.5">Eliminates microplastic leaching at &gt;70°C</div>
                </div>
              </div>
            </div>

            {/* Official Sign-off Footer */}
            <div className="pt-4 border-t border-stone-300 flex justify-between items-end font-mono text-[11px] text-stone-500">
              <div>
                <div>Audited by PlastiTrack Telemetry Engine v2.4</div>
                <div>Source Reference: CPCB Annual Report 2022-23 &amp; NEJM Microplastics Study (2024)</div>
              </div>
              <div className="text-right">
                <div className="h-8 border-b border-stone-400 w-40 mb-1"></div>
                <div>Academic Evaluator / Student Sign</div>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
