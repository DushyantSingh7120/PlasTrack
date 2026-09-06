import React from 'react';
import { motion } from 'framer-motion';

/**
 * 3D Living Flora & Floating Seeds Background Component
 * Soft botanical leaves and drifting dandelion seeds with gentle floating motion.
 */
export default function LivingFloraBackground({ children, className = "" }) {
  return (
    <div className={`relative w-full overflow-hidden bg-[#eeebe3] text-[#0e1e17] ${className}`}>
      {/* Floating Dandelion Seed 1 */}
      <motion.div
        className="absolute top-1/4 left-1/5 pointer-events-none opacity-60 text-stone-400"
        animate={{ y: [-12, 16, -12], x: [-6, 8, -6], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="12" y1="12" x2="12" y2="22" strokeLinecap="round" />
          <path d="M12 12L7 7M12 12L17 7M12 12L12 5M12 12L6 11M12 12L18 11" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Floating Dandelion Seed 2 */}
      <motion.div
        className="absolute top-1/2 left-2/3 pointer-events-none opacity-45 text-stone-400"
        animate={{ y: [10, -18, 10], x: [8, -6, 8], rotate: [-4, 6, -4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="12" y1="12" x2="12" y2="22" strokeLinecap="round" />
          <path d="M12 12L7 7M12 12L17 7M12 12L12 5M12 12L6 11M12 12L18 11" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Ambient Leaf Shadow Vignette */}
      <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-emerald-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
