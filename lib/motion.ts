export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// Cinematic animation curves
export const cinematicEase = [0.22, 1, 0.36, 1];
export const cinematicEaseOut = [0.16, 1, 0.3, 1];

// Particle animation variants
export const particleVariants = {
  birth: {
    opacity: [0, 1],
    scale: [0, 1],
    transition: {
      duration: 0.6,
      ease: cinematicEase,
    },
  },
  gather: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: cinematicEase,
    },
  },
  assemble: {
    opacity: [1, 0.8, 1],
    scale: [1, 1.06, 1],
    transition: {
      duration: 0.7,
      ease: cinematicEase,
    },
  },
};

// Stagger container for particles
export const particleStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.008,
      delayChildren: 0.1,
    },
  },
};
