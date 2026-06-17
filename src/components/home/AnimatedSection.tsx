"use client";

import { motion } from "framer-motion";
import { animation } from "@/constants/animation";

export function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section {...animation.fadeUp} className={className}>
      {children}
    </motion.section>
  );
}
