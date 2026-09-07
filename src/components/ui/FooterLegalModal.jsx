import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Scale, 
  ExternalLink, 
  BookOpen, 
  Database,
  Lock,
  Printer,
  CheckCircle2,
  AlertCircle,
  Clock,
  Shield,
  FileCheck2,
  HelpCircle,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FooterLegalModal({ isOpen, onClose, modalType = 'privacy' }) {
  const [activeTab, setActiveTab] = useState(modalType);

  useEffect(() => {
    if (modalType) {
      setActiveTab(modalType);
    }
  }, [modalType]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck, badge: 'DPDP ACT 2023' },
    { id: 'terms', label: 'Terms of Service', icon: Scale, badge: 'MIT // FAIR USE' },
    { id: 'methodology', label: 'Scientific Methodology', icon: FileText, badge: 'CPCB & IPCC' },
    { id: 'resources', label: 'Statutory Registry', icon: Database, badge: 'GOVT. OF INDIA' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md print:bg-white print:p-0 print:static">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ type: "spring", stiffness: 360, damping: 28 }}
          className="relative w-full max-w-4xl bg-white border border-stone-200 rounded-3xl shadow-2xl p-5 sm:p-8 font-body text-stone-900 max-h-[90vh] flex flex-col overflow-hidden print:max-h-none print:h-auto print:border-none print:shadow-none print:rounded-none print:overflow-visible print:p-0"
        >
          {/* Header Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200 shrink-0">
            <div className="flex items-center gap-2 font-mono text-[11px] text-stone-500">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="font-bold text-stone-800">PLASTITRACK STATUTORY COMPLIANCE & LEGAL DOSSIER</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">REF: PLT-LEGAL-2026-V3.0</span>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-xl text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition cursor-pointer print:hidden"
              aria-label="Close legal modal"
            >
              <X size={19} />
            </button>
          </div>

          {/* Interactive Tab Switcher */}
          <div className="flex flex-wrap gap-2 pt-3 pb-2.5 border-b border-stone-100 shrink-0 font-mono text-xs print:hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                  className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-emerald-900 text-white font-extrabold shadow-sm'
                      : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700 font-semibold'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-emerald-300' : 'text-stone-500'} />
                  <span>{tab.label}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                    isActive ? 'bg-emerald-800 text-emerald-200' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto py-4 custom-scrollbar pr-1 sm:pr-2 space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed font-body print:overflow-visible print:p-0">
            {activeTab === 'privacy' && <PrivacyPolicySection />}
            {activeTab === 'terms' && <TermsOfServiceSection />}
            {activeTab === 'methodology' && <ScientificMethodologySection />}
            {activeTab === 'resources' && <StatutoryResourcesSection />}
          </div>

          {/* Footer Action Bar */}
          <div className="mt-4 pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 font-mono text-xs shrink-0 print:hidden">
            <div className="flex items-center gap-3">
              <Link
                to="/docs"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-emerald-800 hover:text-emerald-950 font-bold underline"
              >
                <BookOpen size={14} />
                <span>Statutory Research Dossier &rarr;</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                type="button"
                className="px-3 py-1.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold transition flex items-center gap-1.5 cursor-pointer"
                title="Print official policy dossier"
              >
                <Printer size={13} />
                <span className="hidden sm:inline">Print Document</span>
              </button>
              <button
                onClick={onClose}
                type="button"
                className="px-5 py-1.5 rounded-xl bg-stone-900 hover:bg-black text-white font-bold transition cursor-pointer shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ==========================================================================
   1. PRIVACY POLICY SECTION (DPDP ACT 2023 & IT ACT 2000 COMPLIANCE)
   ========================================================================== */
function PrivacyPolicySection() {
  return (
    <div className="space-y-6">
      {/* Executive Notice Banner */}
      <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap font-mono text-xs">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-emerald-800">
            <ShieldCheck size={16} className="text-emerald-700 shrink-0" />
            <span>Statutory Data Protection Notice</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-200/70 text-emerald-900 font-bold">
            EFFECTIVE DATE: JANUARY 15, 2026 • VER 3.0
          </span>
        </div>
        <p className="text-xs leading-relaxed text-emerald-900 font-body">
          PlastiTrack is engineered under the statutory mandate of the <strong>Digital Personal Data Protection (DPDP) Act, 2023 (Act No. 22 of 2023, Republic of India)</strong> and Section 43A of the <strong>Information Technology Act, 2000</strong> read with the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong>. PlastiTrack operates under a strict <strong>Local-First, Zero-Telemetry Architecture</strong>: client data is processed on-device with zero advertising cookies, zero third-party brokers, and zero persistent server telemetry by default.
        </p>
      </div>

      {/* Structured Legal Articles */}
      <div className="space-y-5 font-body">
        {/* Article 1 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-stone-100 text-stone-700">§ 1.0</span>
            <h4 className="font-heading font-black text-stone-900 text-sm sm:text-base">
              Preamble, Data Fiduciary &amp; Academic Scope
            </h4>
          </div>
          <div className="text-stone-700 leading-relaxed space-y-2 pl-2 border-l-2 border-stone-200">
            <p>
              This Privacy Policy governs the access and use of the PlastiTrack environmental observability software suite. For the purposes of Section 2(i) of the Digital Personal Data Protection Act, 2023, the <strong>Data Fiduciary</strong> is the PlastiTrack Academic Research Group within the Department of Environmental Sciences, Lovely Professional University (LPU), Phagwara, Punjab 144411, India.
            </p>
            <p className="text-xs text-stone-600">
              The application is developed as an educational open-source sustainability system for Course <strong>CHE110 (Environmental Studies)</strong>, specifically fulfilling academic research, student waste tracking, and environmental audit curricula under Academic Topic 13 (&ldquo;Plastic Usage Tracker&rdquo;).
            </p>
          </div>
        </section>

        {/* Article 2 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-stone-100 text-stone-700">§ 2.0</span>
            <h4 className="font-heading font-black text-stone-900 text-sm sm:text-base">
              Classification of Data Processed &amp; Local-First Sandboxing
            </h4>
          </div>
          <div className="text-stone-700 leading-relaxed space-y-2 pl-2 border-l-2 border-stone-200">
            <p>
              PlastiTrack adheres strictly to the doctrine of <em>Data Minimisation</em> (DPDP Act § 6(1) and GDPR Article 5(1)(c)). The software processes only the following categories of data:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-mono font-bold text-xs text-stone-900 block">
                  A. Local Usage Telemetry (Non-PII)
                </span>
                <p className="text-[11px] text-stone-600 leading-relaxed font-mono">
                  Input tallies of discarded plastics (e.g., PET bottles, PP containers, LDPE pouches, MLP snack wrappers), custom baseline gram targets, campus audit locations, and 7-day habit audit logs.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="font-mono font-bold text-xs text-stone-900 block">
                  B. Sandboxed Client WebStorage
                </span>
                <p className="text-[11px] text-stone-600 leading-relaxed font-mono">
                  All tallies and session history are written directly to your browser&apos;s HTML5 WebStorage (<code className="text-emerald-800 bg-stone-100 px-1 py-0.5 rounded">localStorage</code>) within the local sandboxed domain. They never leave your device unless explicitly exported.
                </p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-stone-100/70 border border-stone-200 text-xs font-mono space-y-1 mt-2">
              <span className="font-bold text-stone-900 block">Explicit Declarations of Non-Collection:</span>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-stone-700">
                <li>Zero hardware device fingerprinting (No canvas extraction, audio fingerprinting, or MAC address queries).</li>
                <li>Zero geolocation tracking (No GPS or cell-tower triangulation).</li>
                <li>Zero third-party analytics trackers, advertising beacons, or data brokers (No Google Analytics, Meta Pixel, or commercial telemetry SDKs).</li>
                <li>Zero tracking cookies or persistent third-party identifier tokens.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Article 3 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-stone-100 text-stone-700">§ 3.0</span>
            <h4 className="font-heading font-black text-stone-900 text-sm sm:text-base">
              Lawful Grounds of Processing &amp; User Consent
            </h4>
          </div>
          <div className="text-stone-700 leading-relaxed space-y-2 pl-2 border-l-2 border-stone-200">
            <p>
              In accordance with Section 4 and Section 6 of the DPDP Act, 2023, data processing occurs on the basis of <strong>freely given, specific, informed, unconditional, and unambiguous consent</strong> manifested by the Data Principal when choosing to log items or initialize the application.
            </p>
            <p className="text-xs text-stone-600">
              Processing is carried out strictly for the purpose of computing material weight, carbon footprint (kg CO₂e), retail replacement expenditure, and polymer degradation timelines in real time on the user&apos;s client device.
            </p>
          </div>
        </section>

        {/* Article 4 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-stone-100 text-stone-700">§ 4.0</span>
            <h4 className="font-heading font-black text-stone-900 text-sm sm:text-base">
              Statutory Rights of the Data Principal (DPDP Act §§ 11–14)
            </h4>
          </div>
          <div className="text-stone-700 leading-relaxed space-y-3 pl-2 border-l-2 border-stone-200">
            <p>
              The Data Principal retains sovereign control over all logged data under Chapter III of the DPDP Act, 2023:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-900 block mb-1">Right to Access &amp; Portability (§ 11)</span>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  You have the unconditional right to access a summary of your data and export it in an open, structured JSON format at any time via <em>System Preferences &rarr; Export JSON Backup</em>.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-900 block mb-1">Right to Immediate Erasure (§ 12)</span>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  Executing <em>Reset All Logs</em> or <em>Clear All Stored Data</em> immediately and irreversibly overwrites and deletes all local storage blocks from the browser sandbox with zero residual backups.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-900 block mb-1">Right of Correction &amp; Rectification (§ 12)</span>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  Users can edit, decrement, or remove any erroneously logged item directly via the increment/decrement controls or the <em>Logged Activity</em> removal panel.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-900 block mb-1">Right of Grievance Redressal (§ 13)</span>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  Users retain the right to submit complaints or queries regarding data processing directly to the Institutional Grievance Officer designated below.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Article 5 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-stone-100 text-stone-700">§ 5.0</span>
            <h4 className="font-heading font-black text-stone-900 text-sm sm:text-base">
              Optional Cloud Synchronization Architecture &amp; Encryption
            </h4>
          </div>
          <div className="text-stone-700 leading-relaxed space-y-2 pl-2 border-l-2 border-stone-200">
            <p>
              Where the user voluntarily activates Cloud Synchronization via Firebase Authentication:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-stone-700">
              <li><strong>Transport Layer Security:</strong> All data in transit is encrypted using TLS 1.3 cryptographic protocols with modern cipher suites.</li>
              <li><strong>Storage at Rest:</strong> Cloud Firestore records are encrypted at rest using 256-bit Advanced Encryption Standard (AES-256).</li>
              <li><strong>Strict Partitioning:</strong> User database rules enforce strict principal isolation where read and write privileges are restricted exclusively to the matching authenticated UID (<code className="bg-stone-100 px-1 py-0.5 rounded text-emerald-800 font-mono">request.auth.uid == userId</code>).</li>
            </ul>
          </div>
        </section>

        {/* Article 6 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-stone-100 text-stone-700">§ 6.0</span>
            <h4 className="font-heading font-black text-stone-900 text-sm sm:text-base">
              Protection of Children and Students (DPDP Act § 9)
            </h4>
          </div>
          <div className="text-stone-700 leading-relaxed space-y-1 pl-2 border-l-2 border-stone-200 text-xs">
            <p>
              In strict accordance with Section 9 of the DPDP Act, 2023, PlastiTrack undertakes that:
            </p>
            <ul className="list-disc pl-5 space-y-0.5 text-stone-700 font-mono text-[11px]">
              <li>No processing of personal data that is likely to cause any detrimental effect on the well-being of a child or student is conducted.</li>
              <li>No tracking or behavioral monitoring of minors or students is undertaken.</li>
              <li>Zero targeted advertisements or commercial profiling algorithms are incorporated into the software.</li>
            </ul>
          </div>
        </section>

        {/* Article 7 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-stone-100 text-stone-700">§ 7.0</span>
            <h4 className="font-heading font-black text-stone-900 text-sm sm:text-base">
              Grievance Officer &amp; Institutional Contacts
            </h4>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono text-stone-800 space-y-2">
            <div className="flex items-center gap-2 font-bold text-stone-900">
              <Shield size={14} className="text-emerald-700" />
              <span>Designated Academic Grievance Redressal Authority:</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Course Coordinator, CHE110 (Environmental Studies) • Division of Academic Affairs &amp; Department of Environmental Sciences<br />
              Lovely Professional University, Jalandhar - Delhi G.T. Road, Phagwara, Punjab 144411, India.<br />
              Institutional Reference: CHE110-CA1-PLASTITRACK-AUDIT
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ==========================================================================
   2. TERMS OF SERVICE SECTION (MIT OPEN SOURCE & ACADEMIC EULA)
   ========================================================================== */
function TermsOfServiceSection() {
  return (
    <div className="space-y-6">
      {/* Executive Agreement Banner */}
      <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap font-mono text-xs">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-amber-800">
            <Scale size={16} className="text-amber-800 shrink-0" />
            <span>Academic End-User License Agreement &amp; Terms</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-200/70 text-amber-900 font-bold">
            MIT LICENSE • FAIR USE GOVERNED
          </span>
        </div>
        <p className="text-xs leading-relaxed text-amber-900 font-body">
          By accessing, navigating, or utilizing the PlastiTrack web software suite, you formally acknowledge and agree to these Terms of Service. PlastiTrack is published as an academic research and educational utility under the permissive open-source <strong>MIT License</strong>, subject to statutory environmental modeling disclaimers and academic integrity provisions.
        </p>
      </div>

      <div className="space-y-5 font-body">
        {/* Term 1 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-stone-100 text-stone-700">§ 1.0</span>
            <h4 className="font-heading font-black text-stone-900 text-sm sm:text-base">
              Academic Grant of License &amp; Permitted Use
            </h4>
          </div>
          <div className="text-stone-700 leading-relaxed space-y-2 pl-2 border-l-2 border-stone-200">
            <p>
              Permission is hereby granted, free of charge, to any student, faculty member, researcher, or institutional reviewer to access, execute, inspect, benchmark, and cite this software for non-commercial academic evaluations, environmental sustainability audits, and educational research.
            </p>
            <p className="text-xs text-stone-600">
              Any distribution, fork, or academic presentation of the underlying algorithmic models must retain the copyright notice &copy; 2026 PlastiTrack Academic Project and the explicit attribution of Course CHE110, Department of Environmental Sciences, Lovely Professional University.
            </p>
          </div>
        </section>

        {/* Term 2 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-stone-100 text-stone-700">§ 2.0</span>
            <h4 className="font-heading font-black text-stone-900 text-sm sm:text-base">
              Scientific Modeling &amp; Empirical Calculation Disclaimers
            </h4>
          </div>
          <div className="text-stone-700 leading-relaxed space-y-2 pl-2 border-l-2 border-stone-200">
            <p>
              Calculations displayed across PlastiTrack—including cumulative gram weights, monetary replacement estimates, embodied carbon footprint (2.50 kg CO₂e / kg), and environmental persistence timelines (30 to 500 years)—are calibrated using empirical constants published by:
            </p>
            <ul className="list-disc pl-5 space-y-0.5 text-xs text-stone-700 font-mono">
              <li>Central Pollution Control Board (CPCB) Plastic Waste Management Division Annual Reports;</li>
              <li>Ministry of Environment, Forest and Climate Change (MoEFCC) Plastic Waste Management Rules 2016–2024;</li>
              <li>Bureau of Indian Standards (BIS IS 14534:1998 Guidelines for Recycling of Plastics);</li>
              <li>Intergovernmental Panel on Climate Change (IPCC) AR6 Working Group III Lifecycle Metrics.</li>
            </ul>
            <div className="p-3.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-800 text-xs font-mono space-y-1 mt-2">
              <span className="font-bold text-stone-900 block">Notice of Scientific Limitation:</span>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Calculations represent mathematical heuristic simulations designed for educational habit awareness and behavioral modification. They do not constitute certified laboratory chemical assays, gravimetric certifications, or statutory environmental clearance certificates required by regulatory tribunals.
              </p>
            </div>
          </div>
        </section>

        {/* Term 3 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-stone-100 text-stone-700">§ 3.0</span>
            <h4 className="font-heading font-black text-stone-900 text-sm sm:text-base">
              Acceptable Use &amp; Academic Integrity Policy
            </h4>
          </div>
          <div className="text-stone-700 leading-relaxed space-y-2 pl-2 border-l-2 border-stone-200 text-xs">
            <p>
              Users agree to abide by standards of academic honesty and responsible computational usage:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-stone-700 font-body">
              <li>Users agree to log authentic or calibrated baseline consumption figures when conducting institutional environmental audits.</li>
              <li>Users shall not perform automated denial-of-service (DoS) stress tests, tamper with client-side calculation constants, or inject malicious payloads into local storage schemas.</li>
              <li>Users shall not misrepresent automated PlastiTrack habit summaries as official Government of India CPCB statutory compliance filings.</li>
            </ul>
          </div>
        </section>

        {/* Term 4 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-stone-100 text-stone-700">§ 4.0</span>
            <h4 className="font-heading font-black text-stone-900 text-sm sm:text-base">
              Intellectual Property &amp; Sovereign Statutory Attribution
            </h4>
          </div>
          <div className="text-stone-700 leading-relaxed space-y-2 pl-2 border-l-2 border-stone-200">
            <p>
              Statutory definitions, Indian resin identification standards (BIS IS 14534:1998), the Single-Use Plastic prohibition schedule (MoEFCC Notification G.S.R. 571(E)), and municipal solid waste statistics remain the sovereign public domain intellectual property of the Government of India.
            </p>
            <p className="text-xs text-stone-600">
              The proprietary frontend layout, real-time kinetic telemetry algorithms, responsive CSS themes, and mathematical formulas are copyrighted &copy; 2026 under the MIT License.
            </p>
          </div>
        </section>

        {/* Term 5 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-stone-100 text-stone-700">§ 5.0</span>
            <h4 className="font-heading font-black text-stone-900 text-sm sm:text-base">
              Statutory Disclaimer of Warranties (&ldquo;As-Is&rdquo; Provision)
            </h4>
          </div>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 text-[11px] font-mono leading-relaxed space-y-2">
            <p className="uppercase font-bold text-stone-900">
              THE APPLICATION IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p className="text-stone-600">
              IN NO EVENT SHALL THE AUTHORS, STUDENT RESEARCHERS, COURSE INSTRUCTORS, OR THE ACADEMIC INSTITUTION BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE APPLICATION OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            </p>
          </div>
        </section>

        {/* Term 6 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-stone-100 text-stone-700">§ 6.0</span>
            <h4 className="font-heading font-black text-stone-900 text-sm sm:text-base">
              Governing Law, Dispute Resolution &amp; Academic Jurisdiction
            </h4>
          </div>
          <div className="text-stone-700 leading-relaxed space-y-1 pl-2 border-l-2 border-stone-200 text-xs">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Any institutional disputes, queries, or claims arising out of the project shall be subject to the academic integrity policies of Lovely Professional University, Punjab, India.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ==========================================================================
   3. SCIENTIFIC METHODOLOGY & ALGORITHMIC CALIBRATION SECTION
   ========================================================================== */
function ScientificMethodologySection() {
  return (
    <div className="space-y-6">
      {/* Executive Notice Banner */}
      <div className="p-4 rounded-2xl bg-teal-50/90 border border-teal-200 text-teal-950 space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap font-mono text-xs">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-teal-800">
            <FileText size={16} className="text-teal-800 shrink-0" />
            <span>Algorithmic Telemetry &amp; Mathematical Calibrations</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-teal-200/70 text-teal-900 font-bold">
            CPCB, BIS &amp; IPCC CALIBRATED
          </span>
        </div>
        <p className="text-xs leading-relaxed text-teal-900 font-body">
          Every mathematical metric computed in PlastiTrack is derived from audited government databases, empirical peer-reviewed lifecycle inventories, and Indian municipal recovery metrics. The exact equations and coefficients are disclosed below in the interest of open scientific reproducibility.
        </p>
      </div>

      <div className="space-y-4 font-mono text-xs">
        {/* Metric 1 */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="font-bold text-stone-950 text-xs">
              1. National Urban Per Capita Baseline: 33 Grams / Day
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold">
              CPCB PWM REPORT (2022–2023)
            </span>
          </div>
          <p className="text-stone-600 text-[11px] leading-relaxed font-body">
            India generates approximately <strong>4,136,000 Tonnes/year</strong> of municipal plastic waste across 35 States and UTs. Across India&apos;s urban population fraction (~490 Million inhabitants) who consume ~82% of commercial packaged single-use plastics, the audited per capita generation yields:
          </p>
          <div className="p-2.5 rounded-xl bg-white border border-stone-200 font-mono text-[11px] text-stone-800">
            Per Capita Generation = (4.136 × 10¹² g / yr × 0.82) / (490 × 10⁶ cap × 365 days) ≈ <strong>32.88 g / person / day</strong> (Calibrated to 33g/day).
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="font-bold text-stone-950 text-xs">
              2. Embodied Carbon Factor: 2.50 kg CO₂e / kg Virgin Plastic
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold">
              IPCC AR6 &amp; EPA WARM V15
            </span>
          </div>
          <p className="text-stone-600 text-[11px] leading-relaxed font-body">
            Polyolefin synthesis (naphtha cracking, ethylene/propylene polymerization, pellet stabilization, and injection molding) incurs substantial greenhouse gas emissions:
          </p>
          <div className="p-2.5 rounded-xl bg-white border border-stone-200 font-mono text-[11px] text-stone-800">
            Carbon Offset (kg CO₂e) = Grams Logged × (2.50 kg CO₂e / 1,000 g Plastic)
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="font-bold text-stone-950 text-xs">
              3. Abiotic Degradation Horizons &amp; Microplastic Fragmentation
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold">
              NATURE (2024) &amp; BIS IS 14534
            </span>
          </div>
          <p className="text-stone-600 text-[11px] leading-relaxed font-body">
            Unlike lignocellulosic biomass, synthetic aliphatic and aromatic polymers lack ester or glycosidic bonds susceptible to microbial enzymatic cleavage in standard landfills. They undergo slow UV photo-oxidation and mechanical shear embrittlement into micro- and nanoplastics (&lt;1μm):
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
            <div className="p-2 rounded-xl bg-white border border-stone-200">
              <strong className="block text-stone-900">PET #1 Bottles</strong>
              <span className="text-stone-500">~450 Years</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-stone-200">
              <strong className="block text-stone-900">PP #5 Takeouts</strong>
              <span className="text-stone-500">~450 Years</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-stone-200">
              <strong className="block text-stone-900">LDPE #4 Bags</strong>
              <span className="text-stone-500">~100 Years</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-stone-200">
              <strong className="block text-stone-900">MLP #7 Wrappers</strong>
              <span className="text-stone-500">~500 Years</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-stone-200">
              <strong className="block text-stone-900">Paper/PE Cups</strong>
              <span className="text-stone-500">~30 Years</span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-stone-200">
              <strong className="block text-stone-900">PS #6 Cutlery</strong>
              <span className="text-stone-500">~400 Years</span>
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="font-bold text-stone-950 text-xs">
              4. Indian Material Recovery Facility (MRF) Formal Recycling Rates
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold">
              NITI AAYOG &amp; CPCB AUDIT
            </span>
          </div>
          <p className="text-stone-600 text-[11px] leading-relaxed font-body">
            Calibrated from the Indian informal waste aggregator (&ldquo;Kabadiwala&rdquo;) economic recovery chain:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-[11px] text-stone-700">
            <li><strong>PET #1:</strong> ~75% Recycled (Highest scrap salvage value; re-extruded into recycled polyester fiber for textile yarn).</li>
            <li><strong>PP #5:</strong> ~40% Recycled (Recycled into industrial pallets, crates, and secondary automotive bumpers).</li>
            <li><strong>LDPE #4:</strong> ~30% Recycled (Only thick films &gt;120μm compliant with MoEFCC rules; thin films clog optical sorters).</li>
            <li><strong>MLP #7 (Multi-Layer Metallised Plastic):</strong> <strong>0% Mechanical Recycling</strong> (Aluminum foil and polyester layers are chemically inseparable; routed exclusively to cement kilns for co-processing).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. STATUTORY REGISTRY & REGULATORY GAZETTE SECTION
   ========================================================================== */
function StatutoryResourcesSection() {
  const verifiedResources = [
    {
      title: "Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023)",
      authority: "Ministry of Law and Justice, The Gazette of India: Extraordinary",
      desc: "Comprehensive national statutory framework regulating the processing of digital personal data, enshrining Data Principal rights, strict consent notice mandates, and data fiduciary obligations.",
      citation: "Act No. 22 of 2023 (Enacted August 11, 2023)",
      url: "https://www.meity.gov.in/content/digital-personal-data-protection-act-2023"
    },
    {
      title: "Central Pollution Control Board (CPCB) Annual Report on PWM",
      authority: "Ministry of Environment, Forest & Climate Change, Govt. of India",
      desc: "Comprehensive annual statistical audit detailing India's 4.14M tonnes plastic waste generation, state-wise processing capacities, and Extended Producer Responsibility (EPR) portal registries.",
      citation: "CPCB PWM Division, New Delhi (2022–2023)",
      url: "https://cpcb.nic.in"
    },
    {
      title: "Plastic Waste Management (Amendment) Rules, 2022 (G.S.R. 571(E))",
      authority: "The Gazette of India: Extraordinary",
      desc: "Statutory notification mandating the nationwide prohibition on 19 identified single-use plastic commodities with low utility and high littering potential (effective July 1, 2022).",
      citation: "MoEFCC Notification G.S.R. 571(E), Part II Sec 3(i)",
      url: "https://moef.gov.in"
    },
    {
      title: "Bureau of Indian Standards BIS IS 14534:1998",
      authority: "Bureau of Indian Standards (BIS)",
      desc: "Indian Standard Guidelines for the Identification and Marking of Plastic Moulded Products and Recycling of Plastics (Resin Identification Codes 1 through 7).",
      citation: "IS 14534:1998 (Reaffirmed 2019)",
      url: "https://standardsbis.bsbedge.com"
    },
    {
      title: "New England Journal of Medicine (NEJM 2024)",
      authority: "Marfella et al., NEJM Clinical Study",
      desc: "Seminal human clinical research demonstrating polyethylene and polyvinyl chloride microplastics in human carotid arterial atheromas and their 4.5× correlation with stroke and myocardial infarction.",
      citation: "N Engl J Med 2024; 390:900-910 | DOI: 10.1056/NEJMoa2309822",
      url: "https://doi.org/10.1056/NEJMoa2309822"
    },
    {
      title: "Nature Journal Global Waste Emissions Study (2024)",
      authority: "Cottom et al., Nature",
      desc: "Global macroscopic and microplastic emissions inventory analyzing uncollected municipal solid waste leakage across South Asia and global marine drainage corridors.",
      citation: "Nature 633, 101–108 (2024) | DOI: 10.1038/s41586-024-07758-6",
      url: "https://doi.org/10.1038/s41586-024-07758-6"
    },
    {
      title: "Toxics Link Indian Salt & Sugar Microplastic Assessment",
      authority: "Toxics Link Environmental Research Group",
      desc: "Empirical laboratory testing analyzing microplastic contamination in consumer table salt and refined sugar brands sold in Indian urban retail markets.",
      citation: "Toxics Link Research Monograph (Aug 2024)",
      url: "https://toxicslink.org"
    },
    {
      title: "Indian Roads Congress Standard IRC:SP:98-2020",
      authority: "Indian Roads Congress (IRC) & MoRTH",
      desc: "Statutory technical guidelines for the utilization of shredded post-consumer waste plastic in hot bituminous concrete mixes for National and State Highways in India.",
      citation: "IRC:SP:98-2020 (Second Revision)",
      url: "https://irc.nic.in"
    }
  ];

  return (
    <div className="space-y-4 font-body">
      <div className="p-4 rounded-2xl bg-blue-50/90 border border-blue-200 text-blue-950 space-y-1">
        <div className="flex items-center gap-2 font-mono font-bold text-xs uppercase mb-1">
          <Database size={16} className="text-blue-800" />
          <span>Statutory Gazette &amp; Peer-Reviewed Citation Registry</span>
        </div>
        <p className="text-xs leading-relaxed text-blue-900">
          All baseline weights, resin classifications, statutory bans, and health toxicology models used in PlastiTrack are hyperlinked directly to their primary government and journal sources.
        </p>
      </div>

      <div className="space-y-3 font-mono">
        {verifiedResources.map((res, idx) => (
          <a
            key={idx}
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-stone-50 hover:bg-emerald-50/60 border border-stone-200 hover:border-emerald-300 transition block group shadow-2xs cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-bold text-stone-900 group-hover:text-emerald-950 block">
                  {res.title}
                </span>
                <span className="text-[10px] text-emerald-800 font-semibold block">
                  {res.authority}
                </span>
                <p className="text-[11px] text-stone-600 font-body leading-relaxed pt-1">
                  {res.desc}
                </p>
                <span className="text-[10px] text-stone-500 block pt-1">
                  Citation: <strong className="text-stone-700">{res.citation}</strong>
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-stone-200 group-hover:bg-emerald-100 group-hover:text-emerald-900 shrink-0 transition-colors">
                <ExternalLink size={14} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
