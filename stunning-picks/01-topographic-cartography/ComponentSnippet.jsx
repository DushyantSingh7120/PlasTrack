import React from 'react';

/**
 * Topographic Cartography Background Component
 * Pure SVG elevation curves layered over a warm stone background.
 */
export default function TopographicBackground({ children, className = "" }) {
  return (
    <div className={`relative w-full overflow-hidden bg-[#e5e4d8] text-[#0e1e17] ${className}`}>
      {/* SVG Contour Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-25 pointer-events-none stroke-[#1b4332]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        strokeWidth="1.2"
      >
        <path d="M-100 200 C 150 100, 300 350, 600 220 S 900 120, 1400 300 S 1800 150, 2200 350" />
        <path d="M-100 320 C 200 200, 350 480, 700 340 S 1000 220, 1500 420 S 1900 260, 2200 460" />
        <path d="M-100 440 C 250 300, 400 580, 800 460 S 1100 320, 1600 540 S 2000 380, 2200 580" />
        <path d="M-100 560 C 300 400, 450 680, 900 580 S 1200 420, 1700 660 S 2100 500, 2200 700" />
        <path d="M-100 80 C 120 50, 280 200, 520 120 S 850 50, 1300 180 S 1750 80, 2200 200" />
      </svg>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
