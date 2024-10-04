import React, { useEffect, useRef } from "react";
import { useFrame, Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Sun Component with basic material
const Sun = () => {
  const sunRef = useRef();

  // Self-rotation for the Sun
  useFrame(() => {
    sunRef.current.rotation.y += 0.002; // Adjust speed for Sun's rotation
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
};

// Planet Component with self-rotation
const Planet = ({ radius, speed, rotationSpeed, color }) => {
  const planetRef = useRef();

  // Rotate the planet in orbit and on its own axis
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * speed;
    planetRef.current.position.set(Math.cos(time) * radius, 0, Math.sin(time) * radius); // Orbit rotation
    planetRef.current.rotation.y += rotationSpeed; // Self-rotation on its axis
  });

  return (
    <mesh ref={planetRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Orbit Component (visual path)
const Orbit = ({ radius }) => {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.05, 16, 100]} />
      <meshBasicMaterial color="gray" />
    </mesh>
  );
};

// Main Solar System Component without shader
const SolarSystem = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!window.WebGLRenderingContext) {
      console.error("WebGL is not supported on this browser.");
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.dispose(); // Cleanup WebGL context
      }
    };
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      className="h-screen"
      camera={{ position: [17, 5, 15], fov: 90 }}
      onCreated={({ gl }) => {
        if (!gl) {
          console.error("Error creating WebGL context.");
        }
      }}
    >
      <ambientLight intensity={3.3} />
      <pointLight intensity={1.5} position={[0, 0, 0]} />

      {/* Sun */}
      <Sun />

      {/* Orbits */}
      <Orbit radius={5} />
      <Orbit radius={8} />
      <Orbit radius={11} />

      {/* Planets */}
      <Planet radius={5} speed={0.5} rotationSpeed={0.01} color="blue" />
      <Planet radius={8} speed={0.3} rotationSpeed={0.02} color="red" />
      <Planet radius={11} speed={0.2} rotationSpeed={0.015} color="green" />

      <OrbitControls />
    </Canvas>
  );
};

const SolarSystemSim = () => {
  return (

      <div className="absolute  top-10 flex items-center justify-center h-full w-full">
        <SolarSystem />

    </div>
  );
};

export default SolarSystemSim;
