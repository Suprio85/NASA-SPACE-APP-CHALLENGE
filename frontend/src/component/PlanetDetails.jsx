import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import * as THREE from "three";

const Planet = ({ radius, position, name, textureUrl, orbitRadius }) => {
  const meshRef = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    new THREE.TextureLoader().load(textureUrl, setTexture);
  }, [textureUrl]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      if (orbitRadius) {
        const angle = clock.getElapsedTime() * 0.5;
        meshRef.current.position.x = Math.cos(angle) * orbitRadius;
        meshRef.current.position.z = Math.sin(angle) * orbitRadius;
      }
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <Text
        position={[0, radius + 0.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
};

const Star = () => (
  <mesh>
    <sphereGeometry args={[0.5, 32, 32]} />
    <meshBasicMaterial color="#FDB813" />
    <pointLight color="#FDB813" intensity={1} distance={50} />
  </mesh>
);

const Orbit = ({ radius }) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]}>
    <ringGeometry args={[radius, radius + 0.05, 64]} />
    <meshBasicMaterial color="#ffffff" transparent opacity={0.3} side={THREE.DoubleSide} />
  </mesh>
);

const SolarSystem = ({ isAnimated }) => (
  <group>
    <Star />
    <Orbit radius={5} />
    <Planet
      name="Earth"
      radius={0.3}
      position={isAnimated ? [0, 0, 0] : [0, 0, 0]}
      textureUrl="/api/placeholder/400/400?text=Earth"
      orbitRadius={isAnimated ? 5 : null}
    />
  </group>
);

const ExoplanetSystem = ({ planet, isAnimated }) => (
  <group>
    <Star />
    <Orbit radius={planet.distance * 2} />
    <Planet
      name={planet.name}
      radius={planet.radius * 0.3}
      position={isAnimated ? [planet.distance * 2, 0, 0] : [planet.distance * 2, 0, 0]}
      textureUrl={`/api/placeholder/400/400?text=${planet.name}`}
      orbitRadius={isAnimated ? planet.distance * 2 : null}
    />
  </group>
);

const ExoplanetGame3D = () => {
  const [planet, setPlanet] = useState({
    name: "Exoplanet",
    radius: 1,
    temp: 288,
    distance: 1,
    habitable: false,
  });

  const [editablePlanet, setEditablePlanet] = useState({
    radius: planet.radius,
    temp: planet.temp,
    distance: planet.distance,
  });

  const [isAnimated, setIsAnimated] = useState(false);

  const checkHabitability = () => {
    const { radius, temp, distance } = editablePlanet;
    const habitable = (
      radius >= 0.5 && radius <= 2 &&
      temp >= 260 && temp <= 310 &&
      distance >= 0.95 && distance <= 1.4
    );

    setPlanet(prevState => ({
      ...prevState,
      ...editablePlanet,
      habitable,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditablePlanet(prevState => ({
      ...prevState,
      [name]: parseFloat(value),
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Exoplanet Habitability Simulator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-900 rounded-lg overflow-hidden" style={{ height: "400px" }}>
          <Canvas camera={{ position: [0, 10, 20] }}>
            <ambientLight intensity={0.2} />
            <SolarSystem isAnimated={isAnimated} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
            <OrbitControls />
          </Canvas>
        </div>
        <div className="bg-gray-900 rounded-lg overflow-hidden" style={{ height: "400px" }}>
          <Canvas camera={{ position: [0, 10, 20] }}>
            <ambientLight intensity={0.2} />
            <ExoplanetSystem planet={planet} isAnimated={isAnimated} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
            <OrbitControls />
          </Canvas>
        </div>
      </div>

      <div className="bg-blue-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Exoplanet Parameters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Radius (Earth Radii):</label>
            <input
              type="number"
              name="radius"
              value={editablePlanet.radius}
              onChange={handleInputChange}
              step="0.1"
              min="0.1"
              max="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Temperature (K):</label>
            <input
              type="number"
              name="temp"
              value={editablePlanet.temp}
              onChange={handleInputChange}
              step="1"
              min="0"
              max="1000"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Distance from Star (AU):</label>
            <input
              type="number"
              name="distance"
              value={editablePlanet.distance}
              onChange={handleInputChange}
              step="0.1"
              min="0.1"
              max="5"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={checkHabitability}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Check Habitability
          </button>
          <button
            onClick={() => setIsAnimated(!isAnimated)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            {isAnimated ? "Stop Animation" : "Start Animation"}
          </button>
        </div>
      </div>

      {planet.habitable ? (
        <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
          <p className="font-bold">Congratulations! You've created a habitable exoplanet!</p>
          <p>Your exoplanet has the right conditions to potentially support life. Great job balancing the crucial factors!</p>
        </div>
      ) : (
        <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p className="font-bold">The exoplanet is not habitable yet.</p>
          <p>Keep adjusting the parameters. Remember, a habitable planet needs the right size, temperature, and distance from its star.</p>
        </div>
      )}
    </div>
  );
};

export default ExoplanetGame3D;