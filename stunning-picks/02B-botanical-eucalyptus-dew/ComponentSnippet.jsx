import React from 'react';

/**
 * Botanical Eucalyptus & Dewdrops Background Component
 * Elegant botanical vignettes framing the margins.
 */
export default function BotanicalEucalyptusBackground({ children, className = "" }) {
  return (
    <div className={`relative w-full overflow-hidden bg-[#f5f3ec] text-[#0e1e17] ${className}`}>
      {/* Top-Left Foliage Shadow */}
      <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-emerald-900/8 blur-3xl pointer-events-none" />
      
      {/* Bottom-Right Foliage Shadow */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-emerald-800/10 blur-3xl pointer-events-none" />

      {/* Subtle Leaf Vein Pattern */}
      <svg className="absolute top-10 right-10 w-48 h-48 opacity-15 stroke-[#1e3b2b] pointer-events-none" fill="none" strokeWidth="1.5">
        <path d="M10 90 Q 50 40 110 20 M30 70 Q 70 60 90 50 M50 50 Q 90 40 100 30" />
      </svg>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
