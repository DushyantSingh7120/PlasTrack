import React from 'react';

/**
 * Ocean Shoreline & Sea Glass Background Component
 * Soft water caustics, sea glass frosted badges, and aquatic ripple effects.
 */
export default function OceanShoreBackground({ children, className = "" }) {
  return (
    <div className={`relative w-full overflow-hidden bg-[#dedacb] text-[#0e1e17] ${className}`}>
      {/* Water Ripple SVG */}
      <svg className="absolute top-0 left-1/3 w-[600px] h-[600px] opacity-20 pointer-events-none stroke-[#3a7d65]" fill="none" strokeWidth="1">
        <circle cx="300" cy="300" r="80" />
        <circle cx="300" cy="300" r="160" />
        <circle cx="300" cy="300" r="240" />
      </svg>

      {/* Frosted Sea-Glass Decorative Orb */}
      <div className="absolute top-12 right-16 w-32 h-32 rounded-3xl bg-teal-600/15 backdrop-blur-md border border-white/40 shadow-inner rotate-12 pointer-events-none" />

      {/* Floating Translucent Bubble */}
      <div className="absolute bottom-20 left-16 w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm border border-white/60 shadow-lg pointer-events-none" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
