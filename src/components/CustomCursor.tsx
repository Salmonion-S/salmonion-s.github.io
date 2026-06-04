/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Smooth trail spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable custom cursor if not on desktop / fine pointer devices
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) {
      return;
    }

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button") ||
          target.closest(".interactive") ||
          target.classList.contains("interactive"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-sky-400 rounded-full z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />

      {/* Floating Organic Halo */}
      <motion.div
        className="fixed top-0 left-0 w-11 h-11 border border-sky-400/55 rounded-full z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          x: trailX,
          y: trailY,
        }}
        animate={{
          scale: isHovered ? 1.6 : 1.0,
          backgroundColor: isHovered ? "rgba(56, 189, 248, 0.15)" : "rgba(255, 255, 255, 0)",
          borderColor: isHovered ? "rgba(56, 189, 248, 0.85)" : "rgba(56, 189, 248, 0.35)",
          boxShadow: isHovered
            ? "0 0 16px rgba(56, 189, 248, 0.55)"
            : "0 0 0px rgba(0, 0, 0, 0)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
        }}
      />
    </>
  );
}
