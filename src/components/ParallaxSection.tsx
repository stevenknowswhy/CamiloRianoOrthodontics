"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  offset?: number;
}

export function ParallaxSection({
  children,
  offset = 30,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.15], [offset, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0.85, 1]);

  return (
    <div ref={ref}>
      <motion.div style={{ y, opacity }}>
        {children}
      </motion.div>
    </div>
  );
}
