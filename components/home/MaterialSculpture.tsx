"use client";

import { Component, useEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import MaterialFallback from "./MaterialFallback";

class SceneBoundary extends Component<
  { children: ReactNode; stage: number },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <MaterialFallback stage={this.props.stage} />
    ) : (
      this.props.children
    );
  }
}

function Cloth({ stage }: { stage: number }) {
  const { viewport } = useThree();
  const mesh = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const morph = useRef(0);
  const geometry = useMemo(() => {
    const result = new THREE.PlaneGeometry(5.2, 3.6, 100, 72);
    const colors = new Float32Array(result.attributes.position.count * 3);
    for (let i = 0; i < result.attributes.position.count; i++) {
      const y = result.attributes.position.getY(i);
      const stripe = y > 1.46 && y < 1.65;
      const shade = stripe
        ? new THREE.Color("#ef3825")
        : new THREE.Color("#505a52");
      colors[i * 3] = shade.r;
      colors[i * 3 + 1] = shade.g;
      colors[i * 3 + 2] = shade.b;
    }
    result.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return result;
  }, []);
  const weave = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#999";
      ctx.fillRect(0, 0, 32, 32);
      for (let i = 0; i < 32; i += 4) {
        ctx.fillStyle = "#555";
        ctx.fillRect(i, 0, 1, 32);
        ctx.fillStyle = "#ccc";
        ctx.fillRect(0, i, 32, 1);
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(25, 18);
    return texture;
  }, []);
  useEffect(
    () => () => {
      geometry.dispose();
      weave.dispose();
    },
    [geometry, weave],
  );

  useFrame(({ clock, pointer }, delta) => {
    if (!mesh.current || !wire.current || !material.current) return;
    const elapsed = clock.getElapsedTime();
    morph.current = THREE.MathUtils.damp(morph.current, stage, 3, delta);
    const flat = Math.min(morph.current, 1);
    const digital = Math.max(0, morph.current - 1);
    const position = geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      const u = geometry.attributes.uv.getX(i);
      const v = geometry.attributes.uv.getY(i);
      const x = (u - 0.5) * 5.2;
      const y = (v - 0.5) * 3.6;
      const fold =
        Math.sin(x * 1.5 + y * 0.8 + elapsed * 0.18) * 0.85 +
        Math.cos(y * 1.2 - x * 0.7) * 0.62;
      // The sheet becomes a garment panel, including sleeves and a neckline.
      const halfWidth =
        v < 0.52
          ? 1.45
          : v < 0.6
            ? THREE.MathUtils.lerp(1.45, 2.35, (v - 0.52) / 0.08)
            : THREE.MathUtils.lerp(2.35, 1.5, (v - 0.6) / 0.4);
      const patternX = (u - 0.5) * halfWidth * 2;
      const patternY =
        y -
        Math.max(0, (v - 0.88) / 0.12) *
          Math.exp(-Math.pow((u - 0.5) * 7, 2)) *
          0.48;
      position.setXYZ(
        i,
        THREE.MathUtils.lerp(
          x + Math.sin(y * 1.6 + elapsed * 0.12) * 0.2,
          patternX,
          flat,
        ),
        THREE.MathUtils.lerp(y + Math.sin(x * 1.3) * 0.55, patternY, flat),
        (1 - flat) * fold +
          digital * Math.sin(x * 1.2) * Math.cos(y * 1.4) * 0.55,
      );
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
    mesh.current.rotation.x = THREE.MathUtils.damp(
      mesh.current.rotation.x,
      -0.4 * (1 - flat) + pointer.y * 0.12,
      2,
      delta,
    );
    mesh.current.rotation.y = THREE.MathUtils.damp(
      mesh.current.rotation.y,
      -0.25 + pointer.x * 0.22,
      2,
      delta,
    );
    mesh.current.rotation.z = THREE.MathUtils.damp(
      mesh.current.rotation.z,
      -0.46 * (1 - flat) + digital * 0.24,
      2,
      delta,
    );
    wire.current.rotation.copy(mesh.current.rotation);
    material.current.opacity = 1 - digital;
    material.current.depthWrite = digital < 0.01;
    mesh.current.visible = digital < 0.99;
    wire.current.visible = digital < 0.99;
    const wireMaterial = wire.current.material as THREE.MeshBasicMaterial;
    wireMaterial.opacity = flat * 0.12 * (1 - digital);
  });

  return (
    <group scale={Math.min(0.86, viewport.width / 7.5)}>
      <mesh ref={mesh} geometry={geometry}>
        <meshStandardMaterial
          ref={material}
          vertexColors
          side={THREE.DoubleSide}
          metalness={0.25}
          roughness={0.7}
          map={weave}
          bumpMap={weave}
          bumpScale={0.055}
          transparent
        />
      </mesh>
      <mesh ref={wire} geometry={geometry}>
        <meshBasicMaterial
          color="#45616b"
          wireframe
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function ConnectedSystem({ stage }: { stage: number }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const opacity = useRef(0);
  const nodes = useMemo(
    () =>
      Array.from(
        { length: 9 },
        (_, i) =>
          new THREE.Vector3(
            ((i % 3) - 1) * 1.75,
            (Math.floor(i / 3) - 1) * 1.3,
            i === 4 ? 0.35 : 0,
          ),
      ),
    [],
  );
  const links = useMemo(() => {
    const vertices: number[] = [];
    nodes.forEach((node, index) => {
      if (index === 4) return;
      vertices.push(...nodes[4].toArray(), ...node.toArray());
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3),
    );
    return geometry;
  }, [nodes]);
  useEffect(() => () => links.dispose(), [links]);
  useFrame(({ pointer }, delta) => {
    if (!group.current) return;
    opacity.current = THREE.MathUtils.damp(
      opacity.current,
      stage === 2 ? 1 : 0,
      3,
      delta,
    );
    group.current.visible = opacity.current > 0.01;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      -0.2 + pointer.x * 0.2,
      3,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      0.15 + pointer.y * 0.15,
      3,
      delta,
    );
    group.current.traverse((object) => {
      if (
        object instanceof THREE.Mesh ||
        object instanceof THREE.LineSegments
      ) {
        (object.material as THREE.Material).opacity = opacity.current;
      }
    });
  });
  return (
    <group
      ref={group}
      scale={Math.min(0.95, viewport.width / 6.5)}
      visible={false}
    >
      <lineSegments geometry={links}>
        <lineBasicMaterial color="#8d9b8e" transparent opacity={0} />
      </lineSegments>
      {nodes.map((position, index) => (
        <mesh key={index} position={position}>
          <boxGeometry
            args={index === 4 ? [0.85, 0.85, 0.24] : [0.86, 0.5, 0.12]}
          />
          <meshStandardMaterial
            color={index === 4 ? "#dc3c2b" : "#b4c0b3"}
            metalness={0.35}
            roughness={0.55}
            transparent
            opacity={0}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function MaterialSculpture({
  stage,
  active,
}: {
  stage: number;
  active: boolean;
}) {
  return (
    <SceneBoundary stage={stage}>
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 40 }}
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        fallback={<MaterialFallback stage={stage} />}
        style={{ touchAction: "pan-y" }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[-3, 5, 6]} intensity={4} color="#ffffff" />
        <directionalLight
          position={[4, -2, 3]}
          intensity={1.8}
          color="#d2ddd9"
        />
        <Cloth stage={stage} />
        <ConnectedSystem stage={stage} />
      </Canvas>
    </SceneBoundary>
  );
}
