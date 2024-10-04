import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

const ExoplanetVisualizer = () => {
  const [exoplanets, setExoplanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const controlsRef = useRef();

  useEffect(() => {
    // Fetch data from NASA Exoplanet Archive API
    const fetchData = async () => {
      const response = await fetch(
        'https://cors-anywhere.herokuapp.com/https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+top+10+pl_name,sy_dist,ra,dec+from+pscomppars&format=json'
      );
      const data = await response.json();
      setExoplanets(data);
    };
    fetchData();
  }, []);

  // Convert RA, DEC, and distance into 3D coordinates (simple transformation)
  const convertTo3D = (ra, dec, dist) => {
    const phi = (ra * Math.PI) / 180; // Convert RA to radians
    const theta = (dec * Math.PI) / 180; // Convert DEC to radians
    const x = dist * Math.cos(theta) * Math.cos(phi);
    const y = dist * Math.cos(theta) * Math.sin(phi);
    const z = dist * Math.sin(theta);
    return [x, y, z];
  };

  // Function to handle planet click and move the camera to center on the clicked planet
  const handlePlanetClick = (position) => {
    if (controlsRef.current) {
      controlsRef.current.target.set(...position);
      controlsRef.current.update();
    }
    setSelectedPlanet(position); // Optional: Keep track of selected planet position
  };

  return (
    <div className="w-full h-screen bg-gray-900">
      <Canvas camera={{ position: [0, 0, 100] }}>
        {/* Starry background */}
        <Stars radius={300} depth={50} count={5000} factor={7} fade />

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Orbit controls with reference for camera movement */}
        <OrbitControls ref={controlsRef} enableZoom={true} />

        {/* Center sphere (representing Earth) */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={'blue'} />
        </mesh>

        {/* Render all exoplanets */}
        {exoplanets.map((planet, index) => {
          const [x, y, z] = convertTo3D(planet.ra, planet.dec, planet.sy_dist || 0); // Handle null distance values
          
          return (
            <group key={index}>
              {/* Planet sphere */}
              <mesh 
                position={[x, y, z]} 
                onClick={() => handlePlanetClick([x, y, z])} // Set the planet as the new center
              >
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color={'cyan'} />
              </mesh>

              {/* Planet name displayed under the planet */}
              <Text
                position={[x, y - 1.2, z]}
                fontSize={0.3}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                {planet.pl_name}
              </Text>
            </group>
          );
        })}
      </Canvas>

      <div className="absolute top-5 left-5 text-white">
        <h1 className="text-2xl">Exoplanet Viewer</h1>
        <p>Click on any planet to make it the center.</p>
      </div>
    </div>
  );
};

export default ExoplanetVisualizer;
