"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpAnimationProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

/**
 * Animates a number counting up from 0 to target value
 * Triggers when element enters viewport
 */
export function CountUpAnimation({ end, duration = 2, suffix = "", className = "" }: CountUpAnimationProps) {
  const [count, setCount] = useState(end);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    hasAnimated.current = false;
    setCount(end);
  }, [end]);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startValue = end > 0 ? 1 : 0;
    setCount(startValue);

    const startTime = performance.now();
    const endTime = startTime + duration * 1000;
    let animationFrame = 0;

    const updateCount = (now: number) => {
      const progress = Math.min((now - startTime) / (endTime - startTime), 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.max(startValue, Math.floor(easeOutQuart * end)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}
