"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface StaggerGridProps {
  children: ReactNode[];
  className?: string;
}

/** Grid whose children animate in with a stagger as they enter the viewport. */
export function StaggerGrid({ children, className }: StaggerGridProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? undefined : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {children.map((child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
