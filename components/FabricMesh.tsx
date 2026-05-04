"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { BufferAttribute, Mesh } from "three";

const SEGMENTS = 48;

function WavyPlane() {
  const meshRef = useRef<Mesh>(null);
  const didInitialize = useRef(false);
  const basePositions = useMemo(
    () => new Float32Array((SEGMENTS + 1) * (SEGMENTS + 1) * 3),
    [],
  );

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    const position = mesh.geometry.attributes.position as BufferAttribute;
    const positions = position.array as Float32Array;

    if (!didInitialize.current) {
      basePositions.set(positions);
      didInitialize.current = true;
    }

    for (let index = 0; index < position.count; index += 1) {
      const offset = index * 3;
      const x = basePositions[offset];
      const y = basePositions[offset + 1];

      positions[offset + 2] =
        Math.sin(x * 1.35 + elapsed * 0.35) * 0.13 +
        Math.cos(y * 1.8 + elapsed * 0.24) * 0.1;
    }

    position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-1.1, 0.1, 0.2]} scale={1.5}>
      <planeGeometry args={[5.8, 5.8, SEGMENTS, SEGMENTS]} />
      <meshBasicMaterial
        color="#ed1c24"
        opacity={0.17}
        transparent
        wireframe
      />
    </mesh>
  );
}

export default function FabricMesh() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <Canvas
        camera={{ fov: 42, position: [0, 0, 3.6] }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <WavyPlane />
      </Canvas>
    </div>
  );
}
