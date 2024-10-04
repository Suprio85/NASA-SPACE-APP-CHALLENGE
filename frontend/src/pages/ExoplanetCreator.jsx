import React, { useState, useRef,useEffect, forwardRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Sun = () => {
  const sunRef = useRef();

  // Rotate the sun around its own Y-axis
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.x += 0.01; // Adjust rotation speed if necessary
    }
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial color={0xffff00} /> {/* Yellow for Sun */}
    </mesh>
  );
};

const Stars = forwardRef(({ radius = 100, depth = 50, count = 5000, factor = 4, fade = false }, ref) => {
    const [positions] = useState(() => {
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = radius + depth * Math.random();
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        positions.set([x, y, z], i * 3);
      }
      return positions;
    });
  
    return (
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.1} sizeAttenuation={true} color={0xffffff} transparent opacity={fade ? 0.8 : 1} />
      </points>
    );
  });
  
  const RotatingStars = () => {
    const starsRef = useRef();
  
    useFrame(() => {
      if (starsRef.current) {
        starsRef.current.rotation.x += 0.001;
        starsRef.current.rotation.y += 0.001;
      }
    });
  
    return <Stars ref={starsRef} />;
  };


const Planet = ({ params }) => {
  const planetRef = useRef();

  useFrame(() => {
    if (planetRef.current) {
      const { semi_majorAxis, eccentricity } = params;
      const elapsedTime = performance.now() * 0.001; // Use time for orbit movement
      const angle = elapsedTime * 0.2; // Adjust speed of orbit
      const x = semi_majorAxis * Math.cos(angle);
      const y = semi_majorAxis * Math.sqrt(1 - eccentricity * eccentricity) * Math.sin(angle);
      planetRef.current.position.set(x, y, 0);
    }
  });

  return (
    <mesh ref={planetRef}>
      <sphereGeometry args={[params.radius, 32, 32]} />
      <meshStandardMaterial color={0x44aa88} />
    </mesh>
  );
};

const Orbit = ({ params }) => {
  const orbitRef = useRef();

  useEffect(() => {
    if (orbitRef.current) {
      const { semi_majorAxis, eccentricity } = params;
      const points = [];
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        const x = semi_majorAxis * Math.cos(angle);
        const y = semi_majorAxis * Math.sqrt(1 - eccentricity * eccentricity) * Math.sin(angle);
        points.push(new THREE.Vector3(x, y, 0));
      }
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
      orbitRef.current.geometry = orbitGeometry;
    }
  }, [params]);

  return (
    <line ref={orbitRef}>
      <bufferGeometry />
      <lineBasicMaterial color={0xffffff} />
    </line>
  );
};

const ExoplanetCreator = () => {
  const [params, setParams] = useState({
    orbital_period: 365,
    semi_majorAxis: 5,
    radius: 1,
    mass: 1,
    flux: 1,
    distance: 10,
    eccentricity: 0,
  });
  const [prediction, setPrediction] = useState('');

  const handleParamChange = (name, value) => {
    setParams(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handlePredict = async () => {
    try {
      const response = await fetch('/api/predict-exoplanet-name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error predicting exoplanet name:', error);
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <h1 className="text-center my-4 text-xl font-bold">Create Your Own Exoplanet</h1>
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 20], fov: 75 }} className="w-full h-full">
          <RotatingStars />
          <OrbitControls />
          <Sun />
          <Planet params={params} />
          <Orbit params={params} />
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 0]} intensity={1.5} />
        </Canvas>
      </div>
      <div className="absolute top-10 left-10 w-72 bg-white bg-opacity-80 p-4 rounded-lg z-10">
        {Object.entries(params).map(([name, value]) => (
          <div key={name} className="mb-4">
            <label className="block mb-1 text-sm font-semibold">
              {name.replace('_', ' ')}: {value.toFixed(2)}
            </label>
            <input
              type="range"
              min={0}
              max={name === 'eccentricity' ? 1 : name === 'semi_majorAxis' ? 20 : 100}
              step={0.01}
              value={value}
              onChange={(e) => handleParamChange(name, e.target.value)}
              className="w-full"
            />
          </div>
        ))}
        <button
          onClick={handlePredict}
          className="px-4 py-2 bg-green-500 text-white rounded-lg w-full hover:bg-green-600 transition"
        >
          Predict Exoplanet Name
        </button>
        {prediction && (
          <p className="mt-4 text-center text-gray-700">Predicted Exoplanet Name: {prediction}</p>
        )}
      </div>
    </div>
  );
};

export default ExoplanetCreator;
