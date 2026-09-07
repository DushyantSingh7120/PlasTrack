import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { tiltSpringConfig } from '../../lib/motion';

/**
 * KineticTiltCard: High-performance, GPU-driven 3D magnetic tilt wrapper.
 * Executes on the GPU composite thread with zero React re-renders.
 * Features dynamic spring elevation, parallax depth, and vivid specular glare.
 */
export default function KineticTiltCard({ 
  children, 
  className = "", 
  tiltDegree = 15,
  glare = true,
  scaleOnHover = 1.035,
  style = {},
  ...props 
}) {
  const cardRef = useRef(null);
  
  // Normalized mouse coordinates: [-0.5, 0.5]
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isHovered = useMotionValue(0);

  // Smooth spring physics with real mass and damping
  const springX = useSpring(x, tiltSpringConfig);
  const springY = useSpring(y, tiltSpringConfig);
  const hoverSpring = useSpring(isHovered, { stiffness: 350, damping: 22 });

  // Transform coordinates to 3D rotation angles
  const rotateX = useTransform(springY, [-0.5, 0.5], [tiltDegree, -tiltDegree]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-tiltDegree, tiltDegree]);

  // Dynamic spring scale and 3D elevation
  const scale = useTransform(hoverSpring, [0, 1], [1, scaleOnHover]);
  const shadow = useTransform(
    hoverSpring,
    [0, 1],
    [
      '0 4px 15px -2px rgba(0,0,0,0.06), 0 2px 6px -1px rgba(0,0,0,0.04)',
      '0 22px 35px -8px rgba(0,0,0,0.16), 0 10px 18px -4px rgba(16,185,129,0.12)'
    ]
  );

  // Glare position coordinates
  const glareX = useTransform(springX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(springY, [-0.5, 0.5], ['0%', '100%']);
  const glareOpacity = useSpring(useTransform(isHovered, [0, 1], [0, 1]), { stiffness: 300, damping: 20 });
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle 280px at ${gx} ${gy}, rgba(255,255,255,0.45) 0%, rgba(16,185,129,0.09) 40%, rgba(255,255,255,0) 80%)`
  );

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / Math.max(rect.height, 1) - 0.5);
    isHovered.set(1);
  };

  const handleMouseEnter = () => {
    isHovered.set(1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    isHovered.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        boxShadow: shadow,
        transformStyle: 'preserve-3d',
        perspective: 1200,
        ...style
      }}
      whileTap={{ scale: 0.98 }}
      className={`relative will-change-transform group ${className}`}
      {...props}
    >
      {children}

      {/* Dynamic Specular Glare Reflection */}
      {glare && (
        <motion.div
          style={{
            opacity: glareOpacity,
            background: glareBackground
          }}
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-200 z-20"
        />
      )}
    </motion.div>
  );
}

