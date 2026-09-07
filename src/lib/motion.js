// src/lib/motion.js
// PlastiTrack Kinetic Spring Pro Motion Engine
// Hardware-accelerated 3D spring physics across all viewports

export const springConfig = {
  type: "spring",
  stiffness: 420,
  damping: 20,
  mass: 0.8
};

export const badgeSpringConfig = {
  type: "spring",
  stiffness: 500,
  damping: 16
};

export const kineticContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04
    }
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04
    }
  }
};

export const kineticDenseContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02
    }
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02
    }
  }
};

export const kineticCard = {
  hidden: {
    opacity: 0,
    y: 48,
    scale: 0.86,
    rotateX: 7
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: springConfig
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: springConfig
  }
};

export const kineticChartCard = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.93
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 360,
      damping: 24
    }
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 360,
      damping: 24
    }
  }
};

export const kineticBadge = {
  hidden: {
    opacity: 0,
    scale: 0.3,
    rotate: -25
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: badgeSpringConfig
  },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: badgeSpringConfig
  }
};

export const kineticHover = {
  y: -6,
  rotate: 0.6,
  transition: { duration: 0.16, ease: "easeOut" }
};

export const kineticTap = {
  scale: 0.96,
  transition: { duration: 0.08 }
};

// Continuous Post-Entrance Physics Tokens (Option B + Option C)

export const tiltSpringConfig = {
  stiffness: 400,
  damping: 25,
  mass: 0.5
};

export const scrollSpringConfig = {
  stiffness: 450,
  damping: 32,
  mass: 0.2
};

// Ambient subtle breathing micro-animation for live chips & telemetry
export const kineticAmbientBreathe = {
  scale: [1, 1.025, 1],
  opacity: [0.94, 1, 0.94],
  transition: {
    duration: 3.2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Radar pulse beacon for active streams and live sensors
export const kineticRadarPulse = {
  scale: [1, 1.8, 2.2],
  opacity: [0.8, 0.2, 0],
  transition: {
    duration: 2.4,
    repeat: Infinity,
    ease: "easeOut"
  }
};

