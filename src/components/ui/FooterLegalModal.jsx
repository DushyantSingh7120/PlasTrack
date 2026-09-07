import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText, Scale, ExternalLink, BookOpen, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FooterLegalModal({ isOpen, onClose, modalType }) {
  if (!isOpen) return null;

  const contentMap = {
    privacy: {
      title: "Privacy & Data Integrity Charter",
      badge: "ZERO TRACKING // LOCAL-FIRST",
      icon: ShieldCheck,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed font-body">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-mono text-xs">
            <strong>Key Guarantee:</strong> PlastiTrack operates on a <strong>Local-First Architecture</strong>. Your personal consumption logs, dates, and item choices remain stored exclusively inside your browser&apos;s sandboxed local storage on your device.
          </div>
          <h4 className="font-bold font-heading text-stone-900 text-sm sm:text-base">1. Zero Third-Party Telemetry</h4>
          <p>
            PlastiTrack does not sell, trade, or monetize your individual data. We do not inject marketing pixels, tracking cookies, or advertising beacons.
          </p>
          <h4 className="font-bold font-heading text-stone-900 text-sm sm:text-base">2. Storage & Clearing</h4>
          <p>
            All daily logs are indexed under the unified <code className="bg-stone-200 px-1.5 py-0.5 rounded font-mono text-xs text-stone-800">plastitrack_logs</code> key in standard Web Storage (localStorage). You retain 100% sovereign control over your data: clicking &ldquo;Clear All Data&rdquo; in System Settings instantly and permanently purges all records.
          </p>
          <h4 className="font-bold font-heading text-stone-900 text-sm sm:text-base">3. Academic & Student Ethical Compliance</h4>
          <p>
            Developed as part of the CHE110 Environmental Studies curriculum, this project complies with institutional student privacy principles and the Digital Personal Data Protection (DPDP) Act 2023 standards for educational demonstrations.
          </p>
        </div>
      )
    },
    terms: {
      title: "Terms of Use & Academic Disclosure",
      badge: "CHE110 CA1 PROJECT // MIT LICENSE",
      icon: Scale,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed font-body">
          <div className="p-4 rounded-xl bg-stone-100 border border-stone-300 text-stone-900 font-mono text-xs">
            <strong>Academic Fair Use:</strong> PlastiTrack is a non-commercial, open-source educational software suite developed for academic evaluation under Topic 13 (Plastic Usage Tracker).
          </div>
          <h4 className="font-bold font-heading text-stone-900 text-sm sm:text-base">1. Open Access & Educational Freedom</h4>
          <p>
            All telemetry models, polymer reference datasets, and user-interface components are provided free for non-commercial student learning, environmental auditing, and habit change research.
          </p>
          <h4 className="font-bold font-heading text-stone-900 text-sm sm:text-base">2. Scientific Calculations Disclaimer</h4>
          <p>
            Calculated environmental metrics (such as embodied CO2 emissions and degradation timelines) utilize empirical constants published by the IPCC, CPCB, and EPA WARM models. While curated with rigorous scientific methodology, outputs are intended for educational observability and personal habit benchmarking.
          </p>
          <h4 className="font-bold font-heading text-stone-900 text-sm sm:text-base">3. Intellectual Property & Citations</h4>
          <p>
            Statutory guidelines cited from the Central Pollution Control Board (CPCB) and Ministry of Environment, Forest & Climate Change (MoEFCC) remain the public intellectual domain of the Government of India.
          </p>
        </div>
      )
    },
    methodology: {
      title: "Scientific Calculation Methodology",
      badge: "CPCB 34G BENCHMARK // IPCC EMISSIONS",
      icon: FileText,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed font-body">
          <p>
            PlastiTrack calculates real-time personal plastic footprints using verified constants derived from Indian statutory audits and polymer lifecycle analyses:
          </p>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-stone-100 border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">National Urban Benchmark: 34 Grams/Day</span>
              <p className="text-stone-600">
                Derived from the CPCB 2022–2023 national audit of 4.14 Million Tonnes/year distributed across urban municipal populations.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-stone-100 border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">Embodied CO2 Factor: 2.50 kg CO2e / kg Plastic</span>
              <p className="text-stone-600">
                Based on cradle-to-factory-gate life cycle assessments for virgin PET, LDPE, and PP synthesis (IPCC & EPA WARM standard).
              </p>
            </div>
            <div className="p-3 rounded-lg bg-stone-100 border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">7-Day Moving Habit Window</span>
              <p className="text-stone-600">
                Calculates cumulative plastic mass across Monday–Sunday cycles to categorize behavioral trends into &ldquo;Conscious Reducer&rdquo; (&le;34g/day) or &ldquo;High Footprint&rdquo; (&gt;34g/day).
              </p>
            </div>
          </div>
        </div>
      )
    },
    resources: {
      title: "Official Resources & Verified Repositories",
      badge: "OFFICIAL GOVERNMENT PORTALS & PAPERS",
      icon: Database,
      body: (
        <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed font-body">
          <p className="mb-2">
            Click any resource to open the official government gazette, peer-reviewed journal, or data portal:
          </p>
          <div className="space-y-2 font-mono text-xs">
            {[
              { name: "CPCB EPR Portal (Govt. of India)", url: "https://cpcb.nic.in" },
              { name: "MoEFCC PWM Rules Gazette G.S.R. 571(E)", url: "https://moef.gov.in" },
              { name: "Nature Journal Plastic Emissions Study (2024)", url: "https://doi.org/10.1038/s41586-024-07758-6" },
              { name: "NEJM Microplastics in Arterial Atheromas (2024)", url: "https://doi.org/10.1056/NEJMoa2309822" },
              { name: "IRC:SP:98-2020 Plastic Roads Standard", url: "https://irc.nic.in" },
              { name: "Toxics Link Indian Salt & Sugar Microplastic Audit", url: "https://toxicslink.org" }
            ].map((res, idx) => (
              <a
                key={idx}
                href={res.url}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-stone-100 hover:bg-emerald-100/60 border border-stone-200 hover:border-emerald-300 flex items-center justify-between text-stone-900 transition font-medium"
              >
                <span>{res.name}</span>
                <ExternalLink size={14} className="text-stone-500" />
              </a>
            ))}
          </div>
        </div>
      )
    }
  };

  const current = contentMap[modalType] || contentMap.privacy;
  const Icon = current.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 26 }}
          className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-3xl shadow-2xl p-6 sm:p-8 font-body text-stone-900 max-h-[85vh] overflow-y-auto custom-scrollbar"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-900">
                <Icon size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 tracking-wider uppercase block">
                  {current.badge}
                </span>
                <h3 className="text-base sm:text-lg font-black font-heading text-stone-900 leading-tight">
                  {current.title}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="p-2 rounded-xl text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="py-2">
            {current.body}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <Link
              to="/docs"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-900 font-bold underline"
            >
              <BookOpen size={14} />
              <span>Read Full Research Dossier &rarr;</span>
            </Link>
            <button
              onClick={onClose}
              type="button"
              className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-black text-white font-bold transition cursor-pointer shadow-xs ml-auto"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
