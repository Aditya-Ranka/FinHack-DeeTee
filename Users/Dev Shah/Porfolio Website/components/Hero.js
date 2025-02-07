"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Blob() {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.x += 0.005;
    mesh.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={mesh} scale={1.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="cyan"
        roughness={0.2}
        metalness={1}
        wireframe={false}
      />
    </mesh>
  );
}

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-black text-white">
      <Canvas className="absolute top-0 left-0 w-full h-full">
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} intensity={2} />
        <OrbitControls enableZoom={false} />
        <Blob />
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
      </Canvas>

      {/* Hero Text */}
      <div className="z-10 text-center">
        <h1 className="text-6xl font-bold tracking-wide text-glow">
          Welcome to My Universe
        </h1>
        <p className="text-lg opacity-80">A Journey into Digital Art</p>
      </div>
    </section>
  );
}
