import React from 'react';
import { motion, useScroll, useSpring, useVelocity, useTransform } from 'framer-motion';
import { scrollSpringConfig } from '../../lib/motion';

/**
 * KineticScrollProgress: High-precision spring-damped scroll progress telemetry bar.
 * Connects to either the window or an inner scroll container.
 * Reacts to scroll velocity (Option C) with dynamic spring tension and luminous glow.
 */
export default function KineticScrollProgress({ 
  containerRef,
  className = "",
  height = 2.5
}) {
  const { scrollYProgress, scrollY } = useScroll(
    containerRef ? { container: containerRef } : {}
  );

  // Smooth spring physics for scroll position
  const scaleX = useSpring(scrollYProgress, scrollSpringConfig);

  // Measure scroll velocity for Option C dynamic responsiveness
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { stiffness: 350, damping: 30 });

  // Dynamically enhance glow and height on quick scrolls
  const barHeight = useTransform(smoothVelocity, [-2000, 0, 2000], [height + 1, height, height + 1]);
  const barGlow = useTransform(
    smoothVelocity, 
    [-1500, 0, 1500], 
    ['0 0 16px rgba(16, 185, 129, 0.8)', '0 0 4px rgba(16, 185, 129, 0.4)', '0 0 16px rgba(16, 185, 129, 0.8)']
  );

  return (
    <div 
      className={`pointer-events-none fixed top-0 left-0 right-0 z-[100] w-full overflow-hidden bg-black/5 ${className}`}
      style={{ height: `${height}px` }}
    >
      <motion.div
        style={{
          scaleX,
          height: barHeight,
          boxShadow: barGlow,
          transformOrigin: '0%'
        }}
        className="h-full w-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-teal-300"
      />
    </div>
  );
}
