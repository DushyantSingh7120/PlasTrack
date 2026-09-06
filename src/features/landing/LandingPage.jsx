import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import { Activity, Cpu, ShieldCheck, Database, BarChart3, ArrowUpRight, CheckCircle2, Layers } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-background min-h-screen font-body text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      
      {/* Infrastructure Telemetry Ticker Ribbon */}
      <div className="pt-16 border-b border-border bg-black/[0.02] text-xs font-mono text-muted-foreground overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-8 whitespace-nowrap">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="font-semibold text-foreground">CLUSTER: GLOBAL-OCEAN-01</span>
            </span>
            <span>INGESTION: 1.2M OPS/SEC</span>
            <span>DATA INTEGRITY: 99.98%</span>
            <span>SCOPES: I, II &amp; SUPPLY CHAIN</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px]">
            <span className="text-foreground font-semibold">STANDARDS: ISO 14064 // GRI // GHG PROTOCOL</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:py-24 overflow-hidden bg-mesh-bottom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: New Relic style Headline & Narrative */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Infrastructure Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-border text-xs font-mono tracking-wide text-foreground shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>ENVIRONMENTAL OBSERVABILITY PLATFORM</span>
              </div>

              {/* Mona Sans Hero Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-bold font-heading tracking-tight text-foreground leading-[1.08]">
                See your plastic impact. <br />
                <span className="text-primary underline decoration-emerald-500/30 decoration-wavy">
                  Trace every gram.
                </span>
              </h1>

              {/* Inter Body Copy */}
              <p className="text-lg sm:text-xl text-muted-foreground font-body max-w-xl leading-relaxed">
                The all-in-one observability system for single-use plastic telemetry, real-time lifecycle tracking, and verified reduction analytics.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link 
                  to="/dashboard" 
                  className="px-7 py-3.5 rounded-xl bg-primary text-white font-mono text-sm font-semibold tracking-wider uppercase hover:bg-black transition-all shadow-md flex items-center justify-center gap-2.5 group"
                >
                  <span>Start Live Telemetry</span>
                  <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <a 
                  href="#telemetry" 
                  className="px-6 py-3.5 rounded-xl bg-white/80 border border-border text-foreground font-medium text-sm hover:bg-white hover:border-foreground/30 transition-all text-center"
                >
                  Explore Infrastructure Demo
                </a>
              </div>

              {/* Proof Points */}
              <div className="pt-4 border-t border-border/80 flex flex-wrap gap-8 text-xs font-mono text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>Zero-config ingestion</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>SOC2 &amp; ISO compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>Real-time emission alerts</span>
                </div>
              </div>

            </div>

            {/* Right Column: New Relic Telemetry Console Widget */}
            <div className="lg:col-span-5">
              <div className="infra-card p-6 md:p-8 bg-white/95 backdrop-blur-xl border border-border shadow-xl relative">
                
                {/* Console Window Header */}
                <div className="flex items-center justify-between pb-5 border-b border-border text-xs font-mono text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400/80"></span>
                    <span className="h-3 w-3 rounded-full bg-amber-400/80"></span>
                    <span className="h-3 w-3 rounded-full bg-emerald-400/80"></span>
                    <span className="ml-2 font-medium text-foreground">telemetry.live.dashboard</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[10px]">
                    LIVE SYNC
                  </span>
                </div>

                {/* Telemetry Gauge Display */}
                <div className="py-6 text-center">
                  <div className="relative inline-block">
                    <svg className="w-44 h-44" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-border-subtle)" strokeWidth="8"></circle>
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="52" 
                        fill="none" 
                        stroke="#1b4332" 
                        strokeWidth="8" 
                        strokeLinecap="round" 
                        strokeDasharray="326.7" 
                        strokeDashoffset="98" 
                        transform="rotate(-90 60 60)"
                      ></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold font-mono text-foreground tracking-tight">12.4</span>
                      <span className="text-xs font-mono text-muted-foreground uppercase">KG / CYCLE</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs font-mono text-muted-foreground">
                    STREAM HEALTH: <span className="text-emerald-700 font-semibold">98.4% NOMINAL</span>
                  </div>
                </div>

                {/* Telemetry Metrics Breakdown */}
                <div className="space-y-3.5 pt-2 border-t border-border font-mono text-xs">
                  <TelemetryRow label="PET // SINGLE-USE POLYMER" value="4.8 kg" pct="38%" barColor="bg-primary" />
                  <TelemetryRow label="HDPE // PACKAGING INGESTION" value="3.6 kg" pct="29%" barColor="bg-leaf" />
                  <TelemetryRow label="PP // INDUSTRIAL CONSUMPTION" value="4.0 kg" pct="33%" barColor="bg-sky" />
                </div>

                {/* Console Footer */}
                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>LAST REFRESH: 4s AGO</span>
                  <span className="text-primary font-medium hover:underline cursor-pointer">
                    VIEW RAW LOGS &rarr;
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features & Architecture Grid */}
      <section id="features" className="py-20 border-t border-border bg-background-alt/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14">
            <span className="font-mono text-xs text-primary font-semibold uppercase tracking-widest">
              [ 01 // OBSERVABILITY MODULES ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mt-2 tracking-tight">
              Enterprise Telemetry Built for Sustainability Teams
            </h2>
            <p className="text-base text-muted-foreground font-body mt-3">
              Full-stack environmental monitoring and data analytics that connects every department, supply chain partner, and audit workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <ModuleCard 
              code="MOD_01"
              icon={<Cpu size={22} className="text-primary" />}
              title="Real-Time Data Ingestion"
              desc="Connect ERP, procurement orders, and waste logistics via automated webhook agents with sub-second processing."
            />
            <ModuleCard 
              code="MOD_02"
              icon={<BarChart3 size={22} className="text-primary" />}
              title="Categorical Telemetry"
              desc="Instant segregation by polymer chemistry: PET, HDPE, LDPE, PP, PS, and composite multi-layer packaging."
            />
            <ModuleCard 
              code="MOD_03"
              icon={<ShieldCheck size={22} className="text-primary" />}
              title="Automated ESG Auditing"
              desc="One-click cryptographic audit reports prepared for GRI 306, CSRD, ISO 14001, and plastic packaging tax filings."
            />
          </div>

        </div>
      </section>

      {/* Telemetry Architecture Section */}
      <section id="telemetry" className="py-20 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <span className="font-mono text-xs text-primary font-semibold uppercase tracking-widest">
                [ 02 // REAL-TIME TRACING ]
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mt-2 tracking-tight">
                Single pane of glass for all environmental metrics
              </h2>
              <p className="text-base text-muted-foreground font-body mt-4 leading-relaxed">
                Traditional plastic tracking relies on manual spreadsheets updated once a year. PlastiTrack turns environmental data into streaming observability metrics with root-cause traces and automated threshold warnings.
              </p>

              <div className="mt-8 space-y-4 font-mono text-sm">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded bg-primary/10 text-primary flex items-center justify-center font-bold text-xs mt-0.5">
                    1
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Continuous Data Pipeline:</span>
                    <p className="text-xs text-muted-foreground font-body mt-0.5">Stream inventory scans and disposal receipts via lightweight collector APIs.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded bg-primary/10 text-primary flex items-center justify-center font-bold text-xs mt-0.5">
                    2
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Anomaly &amp; Peak Detection:</span>
                    <p className="text-xs text-muted-foreground font-body mt-0.5">Detect unexpected spikes in single-use consumption across offices and factories.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded bg-primary/10 text-primary flex items-center justify-center font-bold text-xs mt-0.5">
                    3
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Automated Circular Offsets:</span>
                    <p className="text-xs text-muted-foreground font-body mt-0.5">Direct API handoff to verified ocean recovery initiatives for verified plastic-neutral certification.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Architecture Card Visual */}
            <div className="infra-card p-6 bg-white border border-border shadow-md">
              <div className="font-mono text-xs text-muted-foreground pb-4 border-b border-border flex justify-between items-center">
                <span>SYSTEM TOPOLOGY // TELEMETRY PIPELINE</span>
                <span className="text-emerald-700 font-semibold">100% OPERATIONAL</span>
              </div>
              <div className="py-6 space-y-4">
                <PipelineNode title="Sources: ERP, Procurement, Barcode Scanners" status="ONLINE" rate="4.2k events/s" />
                <div className="w-0.5 h-6 bg-border mx-auto"></div>
                <PipelineNode title="Ingestion Engine &amp; Polymer Classifier" status="PROCESSING" rate="0.8ms latency" />
                <div className="w-0.5 h-6 bg-border mx-auto"></div>
                <PipelineNode title="PlastiTrack Analytics &amp; Compliance Store" status="SYNCED" rate="Encrypted SOC2" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Dark Technical Footer Call to Action (New Relic / Sentry Style) */}
      <section className="py-20 bg-background-dark text-white border-t border-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 font-mono text-xs text-emerald-400">
                <span>NEW RELEASE v2.4 // FULL TRACE MATRIX</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight">
                Ready to deploy environmental observability?
              </h2>
              <p className="text-white/70 font-body text-base max-w-xl">
                Get comprehensive visibility across all plastic materials in less than 5 minutes. Free for individual teams and community projects.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3">
              <Link 
                to="/dashboard" 
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all text-center shadow-lg"
              >
                Launch PlastiTrack Free
              </Link>
              <Link 
                to="/dashboard" 
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all text-center"
              >
                View Live Telemetry Demo
              </Link>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-white/50">
            <div>&copy; 2026 PlastiTrack Systems Inc. All rights reserved.</div>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer">PRIVACY</span>
              <span className="hover:text-white cursor-pointer">TERMS</span>
              <span className="hover:text-white cursor-pointer">TELEMETRY DOCS</span>
              <span className="hover:text-white cursor-pointer">API</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

function TelemetryRow({ label, value, pct, barColor }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-foreground">{value}</span>
      </div>
      <div className="h-2 w-full bg-stone rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: pct }}></div>
      </div>
    </div>
  );
}

function ModuleCard({ code, icon, title, desc }) {
  return (
    <div className="infra-card p-6 bg-white border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2.5 rounded-lg bg-black/5">{icon}</div>
        <span className="font-mono text-[11px] text-muted-foreground tracking-wider">{code}</span>
      </div>
      <h3 className="text-lg font-bold font-heading text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground font-body leading-relaxed">{desc}</p>
    </div>
  );
}

function PipelineNode({ title, status, rate }) {
  return (
    <div className="p-3.5 rounded-lg bg-background-alt/50 border border-border flex items-center justify-between font-mono text-xs">
      <div className="flex items-center gap-2.5">
        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
        <span className="font-medium text-foreground">{title}</span>
      </div>
      <div className="flex items-center gap-3 text-muted-foreground">
        <span className="hidden sm:inline">{rate}</span>
        <span className="px-1.5 py-0.5 rounded bg-black/5 text-[10px] text-foreground font-semibold">{status}</span>
      </div>
    </div>
  );
}
