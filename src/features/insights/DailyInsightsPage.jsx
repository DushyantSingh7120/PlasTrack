import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Layers, Info } from 'lucide-react';

const DAILY_FACTS = [
  {
    id: "fact-001",
    category: "Microplastics",
    title: "The Hidden Diet",
    content: "Studies indicate that the average human consumes up to 5 grams of microplastics a week through water, seafood, and even salt. That's the equivalent weight of a credit card.",
    source: "Open Academic Journals"
  },
  {
    id: "fact-002",
    category: "Ocean Impacts",
    title: "The Great Pacific Garbage Patch",
    content: "The largest accumulation of ocean plastic covers an estimated surface area of 1.6 million square kilometers, an area twice the size of Texas or three times the size of France.",
    source: "Marine Environment Data"
  },
  {
    id: "fact-003",
    category: "Polymer Chemistry",
    title: "Why Doesn't It Degrade?",
    content: "Plastics like PET and PVC are composed of long, tightly bound polymer chains containing carbon-carbon bonds. These synthetic bonds do not exist in nature, meaning natural bacteria and enzymes cannot easily break them apart.",
    source: "Chemistry Open Data"
  },
  {
    id: "fact-004",
    category: "Recycling Reality",
    title: "The 9% Problem",
    content: "Of the 9 billion metric tons of plastic produced since the 1950s, only about 9% has been successfully recycled. The vast majority ends up in landfills or the natural environment.",
    source: "Global Waste Statistics"
  }
];

const RESIN_CODES = [
  {
    code: '1',
    symbol: '♳',
    name: 'PET (Polyethylene Terephthalate)',
    status: 'Recyclable',
    statusBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    borderColor: 'border-emerald-200 bg-emerald-50/50 text-forest',
    uses: 'Water and soda bottles. Recyclable, but degrades in quality with each cycle.',
  },
  {
    code: '2',
    symbol: '♴',
    name: 'HDPE (High-Density Polyethylene)',
    status: 'Highly Recyclable',
    statusBadge: 'bg-teal-50 text-teal-800 border-teal-200',
    borderColor: 'border-teal-200 bg-teal-50/50 text-teal-700',
    uses: 'Milk jugs, detergent bottles. Highly recyclable and sturdy.',
  },
  {
    code: '3',
    symbol: '♵',
    name: 'PVC (Polyvinyl Chloride)',
    status: 'Rarely Recycled',
    statusBadge: 'bg-amber-50 text-amber-800 border-amber-200',
    borderColor: 'border-amber-200 bg-amber-50/50 text-amber-700',
    uses: 'Plumbing pipes, medical tubing. Toxic to manufacture; rarely recycled.',
  },
  {
    code: '4',
    symbol: '♶',
    name: 'LDPE (Low-Density Polyethylene)',
    status: 'Hard to Recycle',
    statusBadge: 'bg-stone-100 text-stone-700 border-stone-300',
    borderColor: 'border-stone-300 bg-stone-100 text-stone-700',
    uses: 'Grocery bags, shrink wrap. Difficult to recycle at curbside because it jams machinery.',
  },
  {
    code: '5',
    symbol: '♷',
    name: 'PP (Polypropylene)',
    status: 'Recyclable',
    statusBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    borderColor: 'border-emerald-200 bg-emerald-50/50 text-emerald-700',
    uses: 'Yogurt containers, straws, bottle caps. Heat resistant, recycling rates are improving.',
  },
  {
    code: '6',
    symbol: '♸',
    name: 'PS (Polystyrene)',
    status: 'Very Hard to Recycle',
    statusBadge: 'bg-stone-200 text-stone-700 border-stone-300',
    borderColor: 'border-stone-300 bg-stone-100 text-stone-700',
    uses: 'Takeout boxes, Styrofoam cups. Shatters easily into microplastics. Extremely hard to recycle.',
  },
  {
    code: '7',
    symbol: '♹',
    name: 'Other Plastics',
    status: 'Not Recyclable',
    statusBadge: 'bg-stone-200 text-stone-700 border-stone-300',
    borderColor: 'border-stone-300 bg-stone-100 text-stone-700',
    uses: 'A catch-all category. Usually not recyclable at standard facilities.',
  }
];

export default function DailyInsightsPage() {
  // Rotate fact based on current day of the year so it changes daily
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const factIndex = dayOfYear % DAILY_FACTS.length;
  const currentFact = DAILY_FACTS[factIndex];

  return (
    <div className="w-full max-w-[1800px] mx-auto space-y-8 font-body">
      
      {/* Fact of the Day Section */}
      <section className="bg-white/40 backdrop-blur-xl rounded-2xl border border-[#cfcdc1]/60 p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200/80">
          <div className="flex items-center gap-2 text-forest font-mono text-xs font-semibold tracking-wider">
            <BookOpen size={16} />
            <span>FACT OF THE DAY</span>
          </div>
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-stone-100 text-stone-700 border border-stone-200 font-semibold">
            {currentFact.category}
          </span>
        </div>

        <div className="mt-5 max-w-3xl">
          <h3 className="text-2xl font-bold font-heading text-stone-900 tracking-tight mb-3">
            {currentFact.title}
          </h3>
          <p className="text-base text-stone-700 leading-relaxed">
            {currentFact.content}
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-stone-500 font-mono">
            <Info size={14} />
            <span>Source: {currentFact.source}</span>
          </div>
        </div>
      </section>

      {/* Polymer Directory */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
          <div>
            <div className="flex items-center gap-2 text-stone-700 font-mono text-xs font-semibold tracking-wider">
              <Layers size={16} className="text-forest" />
              <span className="uppercase font-bold text-stone-900 text-sm font-heading">
                Plastic Identification Guide
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Learn which plastics are easily recycled and which to avoid.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESIN_CODES.map((resin) => (
            <div
              key={resin.code}
              className="bg-white/40 backdrop-blur-xl rounded-2xl border border-[#cfcdc1]/60 p-5 shadow-xs hover:shadow-md hover:bg-white/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-lg ${resin.borderColor}`}>
                    {resin.symbol} {resin.code}
                  </div>
                  <span className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded border ${resin.statusBadge}`}>
                    {resin.status}
                  </span>
                </div>
                <div className="mt-3">
                  <h4 className="text-base font-bold text-stone-900">
                    {resin.name}
                  </h4>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-sm text-stone-600">
                <p className="leading-relaxed">{resin.uses}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
