"use client";

import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Group, Mesh } from "three";

function OrbCluster() {
  const groupRef = useRef<Group>(null);
  const shellRef = useRef<Mesh>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const group = groupRef.current;
    const shell = shellRef.current;

    if (group) {
      const pulse = 1 + Math.sin(elapsed * 1.5) * 0.06;
      group.rotation.y = elapsed * 0.18;
      group.rotation.x = Math.sin(elapsed * 0.4) * 0.12;
      group.scale.setScalar(pulse);
    }

    if (shell) {
      shell.rotation.y = -elapsed * 0.12;
      shell.rotation.z = elapsed * 0.18;
    }
  });

  return (
    <Float speed={1.15} rotationIntensity={0.12} floatIntensity={0.4}>
      <group ref={groupRef} position={[0.65, 0.15, 0]}>
        <mesh>
          <sphereGeometry args={[0.92, 48, 48]} />
          <meshStandardMaterial
            color="#ed1c24"
            emissive="#ed1c24"
            emissiveIntensity={1.35}
            metalness={0.08}
            opacity={0.92}
            roughness={0.22}
            transparent
          />
        </mesh>

        <mesh ref={shellRef} scale={1.3}>
          <sphereGeometry args={[0.92, 32, 32]} />
          <meshBasicMaterial
            color="#7f1d1d"
            opacity={0.1}
            transparent
            wireframe
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function EnergyOrb() {
  const [isClient, setIsClient] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setIsClient(true);
    
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        console.warn('WebGL not supported - 3D content will not render');
      }
    } catch (e) {
      setHasWebGL(false);
      console.warn('WebGL check failed:', e);
    }
  }, []);

  // Don't render on server or if WebGL is not supported
  if (!isClient || !hasWebGL) {
    return null;
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <Canvas
        camera={{ fov: 40, position: [0, 0, 4.2] }}
        dpr={[1, 2]}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight color="#ed1c24" intensity={16} position={[1.8, 1.5, 2.4]} />
        <pointLight color="#7f1d1d" intensity={8} position={[-2, -1.5, 1.5]} />
        <OrbCluster />
      </Canvas>
    </div>
  );
}

