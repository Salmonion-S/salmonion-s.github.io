/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useReducedMotion } from "motion/react";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  scale?: number;
  key?: string | number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  yOffset = 30,
  scale = 0.95,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              y: yOffset,
              scale: scale,
              filter: "blur(12px)",
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1], // Custom premium bezier curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerChildrenDelay?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerChildrenDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerChildrenDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  yOffset?: number;
  key?: string | number;
}

export function StaggerItem({
  children,
  className = "",
  yOffset = 20,
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: yOffset, filter: "blur(8px)", scale: 0.97 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: {
            ease: [0.16, 1, 0.3, 1],
            duration: 0.6,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
