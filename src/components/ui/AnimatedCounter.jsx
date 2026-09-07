import React, { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

/**
 * AnimatedCounter: High-performance spring-driven number roll-up component.
 * Rolls numbers from 0 to target value when entering viewport.
 */
export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  _duration = 1.2,
  className = ""
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Extract numerical value if passed as a string like "249 g" or "~450 Yrs"
  const numericTarget = typeof value === 'number' 
    ? value 
    : parseFloat(String(value).replace(/[^0-9.-]/g, '')) || 0;

  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    stiffness: 85,
    damping: 18,
    mass: 0.7
  });

  const [displayVal, setDisplayVal] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionVal.set(numericTarget);
    }
  }, [isInView, numericTarget, motionVal]);

  useEffect(() => {
    const unsubscribe = springVal.on('change', (latest) => {
      setDisplayVal(latest.toFixed(decimals));
    });
    return () => unsubscribe();
  }, [springVal, decimals]);

  // If the original value had a non-numeric prefix like "~" or "₹", preserve it
  const leadingSymbol = prefix || (typeof value === 'string' && value.startsWith('~') ? '~' : '') || (typeof value === 'string' && value.startsWith('₹') ? '₹' : '');
  const trailingSymbol = suffix || (typeof value === 'string' && value.endsWith('%') ? '%' : '');

  return (
    <span ref={ref} className={`inline-flex items-baseline font-mono ${className}`}>
      {leadingSymbol && <span>{leadingSymbol}</span>}
      <span>{displayVal}</span>
      {trailingSymbol && <span>{trailingSymbol}</span>}
    </span>
  );
}
