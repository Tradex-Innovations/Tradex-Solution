"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function NebulaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nebulaCanvasRef = useRef<HTMLCanvasElement>(null);
  const asteroidCanvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Cinematic forward motion transforms
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
  const nebulaScale = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.9, 0.7, 0.5]);

  // Photorealistic nebula animation with fluid dynamics - OPTIMIZED
  useEffect(() => {
    const canvas = nebulaCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { 
      alpha: true,
      desynchronized: true, // Better performance
      willReadFrequently: false
    });
    if (!ctx) return;

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2); // Limit DPR for performance
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    let animationFrame: number;
    let time = 0;
    let scrollProgress = 0;

    // Subscribe to scroll progress
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      scrollProgress = latest;
    });

    // REDUCED particle count for better performance
    const nebulaParticles: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      size: number;
      color: { r: number; g: number; b: number };
      opacity: number;
      noiseOffsetX: number;
      noiseOffsetY: number;
    }> = [];

    // Create fewer, larger nebula particles
    const createNebulaParticles = () => {
      const particleCount = 120; // Increased from 80
      
      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * window.innerWidth * 2;
        const y = (Math.random() - 0.5) * window.innerHeight * 2;
        const z = Math.random() * 1000 + 500;
        
        let color;
        const zone = Math.random();
        
        if (zone < 0.3) {
          color = { r: 15 + Math.random() * 30, g: 30 + Math.random() * 50, b: 80 + Math.random() * 80 };
        } else if (zone < 0.6) {
          color = { r: 20 + Math.random() * 40, g: 80 + Math.random() * 100, b: 120 + Math.random() * 80 };
        } else if (zone < 0.85) {
          color = { r: 60 + Math.random() * 70, g: 40 + Math.random() * 60, b: 120 + Math.random() * 100 };
        } else {
          color = { r: 5 + Math.random() * 15, g: 8 + Math.random() * 20, b: 15 + Math.random() * 30 };
        }

        nebulaParticles.push({
          x, y, z,
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
          size: 100 + Math.random() * 250, // Larger particles
          color,
          opacity: 0.2 + Math.random() * 0.3,
          noiseOffsetX: Math.random() * 1000,
          noiseOffsetY: Math.random() * 1000,
        });
      }
    };

    createNebulaParticles();

    // Simplified noise function
    const noise = (x: number, y: number) => {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      return Math.sin(X * 12.9898 + Y * 78.233) * 43758.5453 % 1;
    };

    let lastTime = performance.now();
    const targetFPS = 60;
    const frameTime = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      
      // Skip frame if running too fast
      if (deltaTime < frameTime - 1) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }
      
      lastTime = currentTime - (deltaTime % frameTime);
      time += 0.0005;
      
      // Clear canvas
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Calculate forward motion speed
      const forwardSpeed = scrollProgress * 4 + 0.3;

      // Sort by depth (far to near)
      nebulaParticles.sort((a, b) => b.z - a.z);

      // Update and draw nebula particles
      nebulaParticles.forEach((particle) => {
        // Simplified flow field
        const flowX = noise(particle.x * 0.001 + time, particle.y * 0.001) * 0.02;
        const flowY = noise(particle.x * 0.001, particle.y * 0.001 + time) * 0.02;

        particle.vx += flowX * 0.01;
        particle.vy += flowY * 0.01;
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Forward motion
        particle.z -= forwardSpeed;
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Reset particle
        if (particle.z < 1) {
          particle.z = 1500;
          particle.x = (Math.random() - 0.5) * window.innerWidth * 2;
          particle.y = (Math.random() - 0.5) * window.innerHeight * 2;
        }

        // 3D projection
        const scale = 800 / particle.z;
        const x2d = particle.x * scale + window.innerWidth / 2;
        const y2d = particle.y * scale + window.innerHeight / 2;
        const size2d = particle.size * scale;

        // Cull off-screen particles
        if (x2d < -size2d * 2 || x2d > window.innerWidth + size2d * 2 || 
            y2d < -size2d * 2 || y2d > window.innerHeight + size2d * 2) {
          return;
        }

        const depthFade = Math.min(1, particle.z / 1000);
        const breathe = Math.sin(time * 3 + particle.noiseOffsetX) * 0.1;
        const currentOpacity = (particle.opacity + breathe) * depthFade;

        // Draw with gradient
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size2d);
        gradient.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${currentOpacity})`);
        gradient.addColorStop(0.5, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${currentOpacity * 0.4})`);
        gradient.addColorStop(1, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(x2d - size2d, y2d - size2d, size2d * 2, size2d * 2);
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrame);
      unsubscribe();
    };
  }, [scrollYProgress]);

  // Star field animation - OPTIMIZED
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      desynchronized: true,
      willReadFrequently: false
    });
    if (!ctx) return;

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    let scrollProgress = 0;
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      scrollProgress = latest;
    });

    // Reduced star count
    const stars: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      twinkleOffset: number;
    }> = [];

    for (let i = 0; i < 1500; i++) { // Increased from 800 to 1500
      stars.push({
        x: (Math.random() - 0.5) * window.innerWidth * 3,
        y: (Math.random() - 0.5) * window.innerHeight * 3,
        z: Math.random() * 2000,
        size: Math.random() * 1.5,
        opacity: Math.random(),
        twinkleSpeed: 0.0005 + Math.random() * 0.002,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    let animationFrame: number;
    let time = 0;
    let lastTime = performance.now();
    const targetFPS = 60;
    const frameTime = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime < frameTime - 1) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }
      
      lastTime = currentTime - (deltaTime % frameTime);
      time += 1;
      
      // Clear canvas
      ctx.fillStyle = "rgba(0, 3, 8, 0.4)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      const forwardSpeed = scrollProgress * 10 + 0.5;

      // Draw stars
      stars.forEach((star) => {
        star.z -= forwardSpeed;

        if (star.z < 1) {
          star.z = 2000;
          star.x = (Math.random() - 0.5) * window.innerWidth * 3;
          star.y = (Math.random() - 0.5) * window.innerHeight * 3;
        }

        const scale = 800 / star.z;
        const x2d = star.x * scale + window.innerWidth / 2;
        const y2d = star.y * scale + window.innerHeight / 2;
        const size2d = star.size * scale;

        if (x2d < 0 || x2d > window.innerWidth || y2d < 0 || y2d > window.innerHeight) {
          return;
        }

        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const depthFade = 1 - (star.z / 2000) * 0.5;
        const currentOpacity = star.opacity * (0.5 + twinkle * 0.5) * depthFade;
        
        // Draw star trail only when moving fast
        if (forwardSpeed > 3) {
          ctx.beginPath();
          const trailLength = Math.min(forwardSpeed * 1.5, 30);
          ctx.moveTo(x2d, y2d);
          ctx.lineTo(x2d, y2d + trailLength * scale);
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentOpacity * 0.2})`;
          ctx.lineWidth = size2d * 0.5;
          ctx.stroke();
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(x2d, y2d, size2d, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();

        // Glow for larger stars
        if (size2d > 1.2) {
          const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size2d * 2.5);
          gradient.addColorStop(0, `rgba(200, 220, 255, ${currentOpacity * 0.3})`);
          gradient.addColorStop(1, "rgba(200, 220, 255, 0)");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x2d, y2d, size2d * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrame);
      unsubscribe();
    };
  }, [scrollYProgress]);

  // Asteroid field animation - NEW
  useEffect(() => {
    const canvas = asteroidCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      desynchronized: true,
      willReadFrequently: false
    });
    if (!ctx) return;

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    let scrollProgress = 0;
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      scrollProgress = latest;
    });

    // Asteroid particles
    const asteroids: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      shape: number; // Different asteroid shapes
      color: { r: number; g: number; b: number };
    }> = [];

    // Create asteroids
    for (let i = 0; i < 40; i++) {
      asteroids.push({
        x: (Math.random() - 0.5) * window.innerWidth * 4,
        y: (Math.random() - 0.5) * window.innerHeight * 4,
        z: Math.random() * 1500 + 500,
        size: 3 + Math.random() * 12,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        shape: Math.floor(Math.random() * 3), // 3 different shapes
        color: {
          r: 80 + Math.random() * 60,
          g: 70 + Math.random() * 50,
          b: 60 + Math.random() * 40,
        },
      });
    }

    let animationFrame: number;
    let lastTime = performance.now();
    const targetFPS = 60;
    const frameTime = 1000 / targetFPS;

    const drawAsteroid = (x: number, y: number, size: number, rotation: number, shape: number, color: { r: number; g: number; b: number }, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Different asteroid shapes
      ctx.beginPath();
      if (shape === 0) {
        // Irregular polygon
        const points = 6;
        for (let i = 0; i < points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const radius = size * (0.7 + Math.random() * 0.3);
          const px = Math.cos(angle) * radius;
          const py = Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
      } else if (shape === 1) {
        // Rough circle
        const points = 8;
        for (let i = 0; i < points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const radius = size * (0.8 + Math.random() * 0.2);
          const px = Math.cos(angle) * radius;
          const py = Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
      } else {
        // Elongated shape
        ctx.ellipse(0, 0, size, size * 0.6, 0, 0, Math.PI * 2);
      }
      ctx.closePath();

      // Fill with gradient
      const gradient = ctx.createRadialGradient(-size * 0.3, -size * 0.3, 0, 0, 0, size);
      gradient.addColorStop(0, `rgba(${color.r + 40}, ${color.g + 30}, ${color.b + 20}, ${opacity})`);
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Add some texture/detail
      ctx.strokeStyle = `rgba(${color.r - 20}, ${color.g - 20}, ${color.b - 20}, ${opacity * 0.5})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    };

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime < frameTime - 1) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }
      
      lastTime = currentTime - (deltaTime % frameTime);
      
      // Clear canvas
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const forwardSpeed = scrollProgress * 6 + 0.4;

      // Draw asteroids
      asteroids.forEach((asteroid) => {
        asteroid.z -= forwardSpeed;
        asteroid.rotation += asteroid.rotationSpeed;

        if (asteroid.z < 1) {
          asteroid.z = 2000;
          asteroid.x = (Math.random() - 0.5) * window.innerWidth * 4;
          asteroid.y = (Math.random() - 0.5) * window.innerHeight * 4;
        }

        const scale = 800 / asteroid.z;
        const x2d = asteroid.x * scale + window.innerWidth / 2;
        const y2d = asteroid.y * scale + window.innerHeight / 2;
        const size2d = asteroid.size * scale;

        if (x2d < -size2d * 2 || x2d > window.innerWidth + size2d * 2 || 
            y2d < -size2d * 2 || y2d > window.innerHeight + size2d * 2) {
          return;
        }

        const depthFade = 1 - (asteroid.z / 2000) * 0.3;
        const opacity = 0.7 * depthFade;

        drawAsteroid(x2d, y2d, size2d, asteroid.rotation, asteroid.shape, asteroid.color, opacity);
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrame);
      unsubscribe();
    };
  }, [scrollYProgress]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient - deep space */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000308] via-[#020510] to-[#000308]" />
      
      {/* Animated photorealistic nebula clouds with 3D depth and forward motion */}
      <motion.div
        style={{ scale: nebulaScale, opacity }}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
      >
        <canvas
          ref={nebulaCanvasRef}
          className="absolute inset-0"
        />
      </motion.div>

      {/* Animated stars canvas with 3D forward motion */}
      <motion.div
        style={{ scale, opacity }}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
        />
      </motion.div>

      {/* Asteroid field canvas */}
      <motion.div
        style={{ 
          scale: useTransform(scrollYProgress, [0, 1], [1, 2]),
          opacity 
        }}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
      >
        <canvas
          ref={asteroidCanvasRef}
          className="absolute inset-0"
        />
      </motion.div>

      {/* Motion overlay for speed effect */}
      <motion.div 
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.2, 0.4])
        }}
        className="absolute inset-0 pointer-events-none will-change-opacity"
      >
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(0, 3, 8, 0.3) 100%)",
          }}
        />
      </motion.div>

      {/* Speed lines for cinematic effect - OPTIMIZED */}
      <motion.div 
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.5, 1], [0, 0.05, 0.15, 0.25])
        }}
        className="absolute inset-0 pointer-events-none overflow-hidden will-change-opacity"
      >
        {[...Array(12)].map((_, i) => {
          // Reduced from 20 to 12 for better performance
          const left = ((i * 37 + 13) % 100);
          const top = ((i * 53 + 29) % 100);
          const width = 50 + ((i * 23) % 100);
          const rotation = (i * 18) % 360;
          const duration = 2 + ((i * 0.5) % 2);
          const delay = (i * 0.15) % 2;
          
          return (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${width}px`,
                transform: `rotate(${rotation}deg)`,
              }}
              animate={{
                opacity: [0, 0.4, 0],
                scale: [0.5, 1, 1.5],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "linear",
              }}
            />
          );
        })}
      </motion.div>

      {/* Dust particles for additional depth */}
      <motion.div 
        style={{ 
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.8]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.3, 0.2])
        }}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        {[...Array(30)].map((_, i) => {
          const left = ((i * 47 + 23) % 100);
          const top = ((i * 67 + 41) % 100);
          const size = 1 + ((i * 3) % 4);
          const duration = 3 + ((i * 0.7) % 3);
          const delay = (i * 0.2) % 3;
          
          return (
            <motion.div
              key={`dust-${i}`}
              className="absolute rounded-full bg-cyan-300/20"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
              }}
              animate={{
                opacity: [0.1, 0.4, 0.1],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </motion.div>

      {/* Vignette effect - intensifies with scroll */}
      <motion.div 
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 1], [0.6, 0.8])
        }}
        className="absolute inset-0 pointer-events-none will-change-opacity"
      >
        <div
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.9) 100%)",
            width: "100%",
            height: "100%",
          }}
        />
      </motion.div>
    </div>
  );
}
