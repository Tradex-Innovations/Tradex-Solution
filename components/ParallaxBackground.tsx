"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Subtle parallax effect on background elements based on mouse movement
 * Creates depth without being distracting
 */
export function ParallaxBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for natural movement
  const springConfig = { damping: 30, stiffness: 100 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Normalize to -1 to 1 range
      const xPct = (clientX / innerWidth - 0.5) * 2;
      const yPct = (clientY / innerHeight - 0.5) * 2;
      
      // Subtle movement (max 20px)
      mouseX.set(xPct * 20);
      mouseY.set(yPct * 20);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Animated gradient blobs with parallax */}
      <motion.div
        style={{ x, y }}
        className="pointer-events-none absolute left-[-12rem] top-20 -z-10 h-80 w-80 rounded-full bg-[#ed1c24]/14 blur-3xl"
      />
      <motion.div
        style={{ x: useSpring(mouseX.get() * -0.5, springConfig), y: useSpring(mouseY.get() * -0.5, springConfig) }}
        className="pointer-events-none absolute right-[-10rem] top-[32rem] -z-10 h-96 w-96 rounded-full bg-red-950/35 blur-3xl"
      />
    </>
  );
}
