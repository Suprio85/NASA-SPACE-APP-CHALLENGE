import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion'; // Import framer-motion

const Sun = () => {
  const sunRef = useRef();
  const [texture, setTexture] = useState('/Textureimg/sun.jpg');
  const [error, setError] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      '/Textureimg/sun.jpg',
      (loadedTexture) => setTexture(loadedTexture),
      undefined,
      (err) => {
        console.error("Error loading texture:", err);
        setError(true);
      }
    );
  }, []);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.z += 0.01;
    }
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[2, 32, 32]} />
      {texture && !error ? (
        <meshStandardMaterial map={texture} />
      ) : (
        <meshStandardMaterial color={error ? "red" : "yellow"} />
      )}
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
      <pointsMaterial size={0.1} sizeAttenuation color={0xffffff} transparent opacity={fade ? 0.8 : 1} />
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

const calculatePlanetColor = (mass, radius) => {
  const gasGiantColor = new THREE.Color(0xFFA500); 
  const rockyPlanetColor = new THREE.Color(0x8B4513); 
  const earthLikeColor = new THREE.Color(0x4169E1); 
  const superEarthColor = new THREE.Color(0x32CD32); 
  const dwarfPlanetColor = new THREE.Color(0xC0C0C0);

  const volume = (4/3) * Math.PI * Math.pow(radius, 3);
  const density = mass / volume;

  if (mass > 50 && radius > 5) {
    return gasGiantColor;
  } else if (density > 5) {
    return rockyPlanetColor;
  } else if (mass >= 0.5 && mass <= 2 && radius >= 0.8 && radius <= 1.5) {
    return earthLikeColor;
  } else if (mass > 2 && mass <= 10 && radius > 1.5 && radius <= 2.5) {
    return superEarthColor;
  } else if (mass < 0.5 && radius < 0.8) {
    return dwarfPlanetColor;
  } else {
    const t = Math.min(1, radius / 5);
    return new THREE.Color(0x002244).lerp(new THREE.Color(0x44aa88), t);
  }
};

const Planet = ({ params }) => {
  const planetRef = useRef();
  const { semi_majorAxis, eccentricity, mass, radius } = params;

  useFrame(() => {
    if (planetRef.current) {
      const elapsedTime = performance.now() * 0.001;
      const angle = elapsedTime * 0.2;
      const x = semi_majorAxis * Math.cos(angle);
      const y = semi_majorAxis * Math.sqrt(1 - eccentricity * eccentricity) * Math.sin(angle);
      planetRef.current.position.set(x, y, 0);
    }
  });

  const size = radius;
  const color = calculatePlanetColor(mass, radius);

  return (
    <mesh ref={planetRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
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

const Modal = ({ prediction, onClose }) => (
  <AnimatePresence>
    {prediction && (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg p-6 text-center shadow-lg transform transition-all duration-300"
          initial={{ scale: 0.8, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: -20 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Prediction Result</h2>
          <p className="mb-4 text-gray-600 text-lg">Predicted Exoplanet Name: <span className="font-semibold text-green-500">{prediction}</span></p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 transform hover:scale-105"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ExoplanetCreator = () => {
  const [params, setParams] = useState({
    orbital_period: 365,
    semi_majorAxis: 18,
    radius: 1,
    mass: 1,
    flux: 1,
    distance: 100,
    eccentricity: 0,
  });
  const [prediction, setPrediction] = useState('');

  const handleParamChange = (name, value) => {
    setParams(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handlePredict = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/predict/predictname', {
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

  const closeModal = () => setPrediction('');

  return (
    <div className="relative h-screen w-screen">
      <h1 className="text-center my-4 text-xl font-bold">Create Your Own Exoplanet</h1>
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 40], fov: 75 }} className="w-full h-full">
          <RotatingStars />
          <OrbitControls />
          <Sun />
          <Planet params={params} />
          <Orbit params={params} />
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 0]} intensity={1.5} />
        </Canvas>
      </div>
      <div className="absolute bottom-0 left-0 p-6">
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(params).map((param) => (
            <div key={param} className="flex flex-col">
              <label className="text-gray-700 capitalize range">{param}</label>
              <input
              type="range"
              min={param === 'radius' ? 0.1 : param === 'semi_majorAxis' ? 5.76 : 0}
              max={param === 'eccentricity' ? 1 : param === 'semi_majorAxis' ? 40 : param === 'radius' ? 10 : 100}
              step={param === 'radius' ? 0.1 : 0.01}
              value={params[param]}
              onChange={(e) => handleParamChange(param, e.target.value)}
              className="w-full"
            />
              <span>{params[param]}</span>
            </div>
          ))}
          <button
            onClick={handlePredict}
            className="col-span-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Predict Exoplanet Name
          </button>
        </div>
      </div>
      <Modal prediction={prediction} onClose={closeModal} />
    </div>
  );
};

export default ExoplanetCreator;
