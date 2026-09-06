import React from 'react';

/**
 * Ambient Aura Glow Background Component
 * Soft, diffused radial glow orbs for an ultra-modern aesthetic.
 */
export default function AmbientAuraBackground({ children, className = "" }) {
  return (
    <div className={`relative w-full overflow-hidden bg-[#e5e4d8] text-[#0e1e17] ${className}`}>
      {/* Top-Left Peach Glow */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full bg-[#f7bfa3]/35 blur-[90px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />

      {/* Bottom-Center Mint Glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-[#a3e6c8]/30 blur-[100px] pointer-events-none" />

      {/* Right-Side Sky Blue Glow */}
      <div className="absolute top-20 right-10 w-[450px] h-[450px] rounded-full bg-[#a3d8f7]/35 blur-[90px] pointer-events-none" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
