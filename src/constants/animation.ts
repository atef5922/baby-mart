export const animation = {
  spring: { type: "spring", stiffness: 260, damping: 24 },
  premiumEase: [0.22, 1, 0.36, 1] as const,
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  }
} as const;
