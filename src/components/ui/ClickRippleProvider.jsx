import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ClickRippleProvider: Renders a distinct, double-wave water-caustic kinetic ripple
 * on every pointer click/tap across the entire application.
 * Perfectly visible on warm stone, frosted glass, and dark elements.
 */
export default function ClickRippleProvider({ children }) {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    // Respect accessibility reduced-motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handlePointerDown = (e) => {
      // Primary left click or touch only
      if (e.button !== undefined && e.button !== 0) return;

      const newRipple = {
        id: `${Date.now()}-${Math.random()}`,
        x: e.clientX,
        y: e.clientY
      };

      setRipples((prev) => [...prev.slice(-6), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 700);
    };

    // Use capture: true so all clicks (buttons, links, background) trigger reliably
    window.addEventListener('pointerdown', handlePointerDown, { capture: true });
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return (
    <>
      {children}
      <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
        <AnimatePresence>
          {ripples.map((ripple) => (
            <div 
              key={ripple.id}
              style={{
                position: 'absolute',
                left: ripple.x,
                top: ripple.y,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none'
              }}
            >
              {/* Primary Outer Caustic Wave */}
              <motion.div
                initial={{
                  width: 22,
                  height: 22,
                  scale: 0.25,
                  opacity: 1
                }}
                animate={{
                  scale: 4.2,
                  opacity: 0
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.62,
                  ease: [0.12, 0.85, 0.25, 1]
                }}
                style={{
                  background: 'radial-gradient(circle, rgba(52, 211, 153, 0.4) 0%, rgba(16, 185, 129, 0.18) 45%, transparent 70%)',
                  boxShadow: '0 0 18px rgba(16, 185, 129, 0.85), inset 0 0 12px rgba(52, 211, 153, 0.5)'
                }}
                className="rounded-full border-2 border-emerald-400"
              />

              {/* Secondary Inner Follower Wave (Fluid Water Physics) */}
              <motion.div
                initial={{
                  width: 16,
                  height: 16,
                  scale: 0.2,
                  opacity: 0.95,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: -8,
                  marginLeft: -8
                }}
                animate={{
                  scale: 2.8,
                  opacity: 0
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.05,
                  ease: [0.12, 0.85, 0.25, 1]
                }}
                style={{
                  boxShadow: '0 0 14px rgba(5, 150, 105, 0.75), inset 0 0 8px rgba(16, 185, 129, 0.45)'
                }}
                className="rounded-full border border-teal-300"
              />

              {/* Center Droplet Contact Flash */}
              <motion.div
                initial={{
                  width: 10,
                  height: 10,
                  scale: 0.6,
                  opacity: 1,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: -5,
                  marginLeft: -5
                }}
                animate={{
                  scale: 2,
                  opacity: 0
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1]
                }}
                style={{
                  boxShadow: '0 0 14px rgba(52, 211, 153, 1)'
                }}
                className="rounded-full bg-emerald-300"
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
