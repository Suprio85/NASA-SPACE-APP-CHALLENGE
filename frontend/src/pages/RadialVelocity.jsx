import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

function StarAndPlanet({
  starSize,
  planetSize,
  starMass,
  planetMass,
  setShiftFactor,
  setMaxShift,
}) {
  const starRef = useRef();
  const planetRef = useRef();
  const starOrbitRef = useRef();
  const planetOrbitRef = useRef();

  const { camera } = useThree();

  // Load textures using useLoader
  const starTexture = useLoader(
    TextureLoader,
    'https://cors-anywhere.herokuapp.com/https://img.freepik.com/free-photo/creative-abstract-mixed-red-color-painting-with-marble-liquid-effect-panorama_1258-91857.jpg?t=st=1727734167~exp=1727737767~hmac=2cb393e23f1bc8007a46c1901d29b85ac847bdc4b72f0092a5a3b43df4bd0295&w=740'
  );
  const planetTexture = useLoader(
    TextureLoader,
    'https://cors-anywhere.herokuapp.com/https://img.freepik.com/free-photo/top-view-tie-dye-cloth_23-2148778171.jpg?t=st=1727715841~exp=1727719441~hmac=cf278e693fd37be9944141459c342cbe05dbedd0750af61197e3c78cbe364a8b&w=1380'
  );

  useEffect(() => {
    // Set crossOrigin to anonymous to handle CORS
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');

    // Preload textures
    loader.load(
      'https://cors-anywhere.herokuapp.com/https://img.freepik.com/free-photo/creative-abstract-mixed-red-color-painting-with-marble-liquid-effect-panorama_1258-91857.jpg?t=st=1727734167~exp=1727737767~hmac=2cb393e23f1bc8007a46c1901d29b85ac847bdc4b72f0092a5a3b43df4bd0295&w=740',
      (texture) => {
        starRef.current.material.map = texture;
        starRef.current.material.needsUpdate = true;
      },
      undefined,
      (error) => {
        console.error('Error loading star texture:', error);
      }
    );

    loader.load(
      'https://cors-anywhere.herokuapp.com/https://img.free-photo/top-view-tie-dye-cloth_23-2148778171.jpg?t=st=1727715841~exp=1727719441~hmac=cf278e693fd37be9944141459c342cbe05dbedd0750af61197e3c78cbe364a8b&w=1380',
      (texture) => {
        planetRef.current.material.map = texture;
        planetRef.current.material.needsUpdate = true;
      },
      undefined,
      (error) => {
        console.error('Error loading planet texture:', error);
      }
    );
  }, []);

  const totalMass = starMass + planetMass;
  const orbitScaleFactor = 5;
  const starDistance = (planetMass / totalMass) * 2 * orbitScaleFactor;
  const planetDistance = (starMass / totalMass) * 2 * orbitScaleFactor * 2;

  useEffect(() => {
    // Create star orbit
    const starOrbitGeometry = new THREE.BufferGeometry();
    const starOrbitPoints = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      starOrbitPoints.push(
        new THREE.Vector3(
          Math.cos(angle) * starDistance,
          Math.sin(angle) * starDistance,
          0
        )
      );
    }
    starOrbitGeometry.setFromPoints(starOrbitPoints);
    starOrbitRef.current.geometry = starOrbitGeometry;

    // Create planet orbit
    const planetOrbitGeometry = new THREE.BufferGeometry();
    const planetOrbitPoints = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      planetOrbitPoints.push(
        new THREE.Vector3(
          Math.cos(angle) * planetDistance,
          Math.sin(angle) * planetDistance,
          0
        )
      );
    }
    planetOrbitGeometry.setFromPoints(planetOrbitPoints);
    planetOrbitRef.current.geometry = planetOrbitGeometry;

    setMaxShift(starDistance / orbitScaleFactor);
  }, [starDistance, planetDistance, setMaxShift]);

  useFrame(({ clock, camera }) => {
    const time = clock.getElapsedTime();
    const angle = time * 0.5;
  
    // Orbit movement
    starRef.current.position.x = Math.cos(angle) * starDistance;
    starRef.current.position.y = Math.sin(angle) * starDistance;
  
    planetRef.current.position.x = Math.cos(angle + Math.PI) * planetDistance;
    planetRef.current.position.y = Math.sin(angle + Math.PI) * planetDistance;
  
    // Axial rotation of star and planet
    starRef.current.rotation.y += 0.01; // Star rotates around its Y-axis
    planetRef.current.rotation.y += 0.02; // Planet rotates around its Y-axis
  
    // Get camera direction and calculate the angle between the camera direction and the Z-axis
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
  
    // Angle between the camera direction and the normal to the XY plane (the Z-axis)
    const angleToXYPlane = Math.abs(
      cameraDirection.angleTo(new THREE.Vector3(0, 0, 1))
    );
  
    const topViewThreshold = Math.PI / 6; // Customize the threshold for what is considered "top view"
    const bottomViewThreshold = Math.PI - topViewThreshold; // Also handle bottom view
  
    if (angleToXYPlane <= topViewThreshold || angleToXYPlane >= bottomViewThreshold) {
      // Looking from the top or bottom view, no shift in the spectrum
      setShiftFactor(0); // No Doppler shift
    } else {
      // Looking from the side view, apply the shift
      const radialVelocity = Math.sin(angle);
      const shiftFactor = (radialVelocity + 1) / 2; // Normalize to [0, 1]
      setShiftFactor(shiftFactor);
    }
  });
  

  return (
    <>
      <line ref={starOrbitRef}>
        <lineBasicMaterial attach="material" color="yellow" opacity={0.5} transparent />
      </line>
      <line ref={planetOrbitRef}>
        <lineBasicMaterial attach="material" color="white" opacity={0.5} transparent />
      </line>
      <mesh ref={starRef}>
        <sphereGeometry args={[starSize, 32, 32]} />
        <meshStandardMaterial map={null} color="white" /> {/* Fallback to yellow */}
      </mesh>
      <mesh ref={planetRef}>
        <sphereGeometry args={[planetSize, 32, 32]} />
        <meshStandardMaterial map={null} color="gray" /> {/* Fallback to blue */}
      </mesh>
    </>
  );
}

function LightSpectrum({ shiftFactor, maxShift }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.17, 'orange');
    gradient.addColorStop(0.33, 'yellow');
    gradient.addColorStop(0.5, 'green');
    gradient.addColorStop(0.67, 'blue');
    gradient.addColorStop(0.83, 'indigo');
    gradient.addColorStop(1, 'violet');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const basePositions = [80, 160, 240, 320, 400];

    basePositions.forEach((pos) => {
      const shift = (shiftFactor - 0.5) * maxShift * 80;
      ctx.beginPath();
      ctx.moveTo(pos + shift, 0);
      ctx.lineTo(pos + shift, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'black';
      ctx.stroke();
    });
  }, [shiftFactor, maxShift]);

  return <canvas ref={canvasRef} width={400} height={80} />;
}

function StarryBackground() {
  return <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />;
}

export default function WobbleMethodSimulation() {
  const [starSize, setStarSize] = useState(2);
  const [planetSize, setPlanetSize] = useState(0.5);
  const [starMass, setStarMass] = useState(2);
  const [planetMass, setPlanetMass] = useState(0.5);
  const [shiftFactor, setShiftFactor] = useState(0.5);
  const [maxShift, setMaxShift] = useState(1);

  const updateStarSize = (newSize) => setStarSize(newSize);
  const updatePlanetSize = (newSize) => setPlanetSize(newSize);
  const updateStarMass = (newMass) => setStarMass(newMass);
  const updatePlanetMass = (newMass) => setPlanetMass(newMass);

  return (
    <div className='absolute top-0 left-0' style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 20] }} style={{ flex: 1 }}>
        <ambientLight intensity={2.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <OrbitControls />
        <StarryBackground />
        <Suspense fallback={null}>
          <StarAndPlanet
            starSize={starSize}
            planetSize={planetSize}
            starMass={starMass}
            planetMass={planetMass}
            setShiftFactor={setShiftFactor}
            setMaxShift={setMaxShift}
          />
        </Suspense>
      </Canvas>
      <div className="fixed top-10 left-10 text-3xl font-Saira font-bold">
        Radial Velocity Method Simulation
      </div>

      <div
        className="absolute w-60 rounded-lg bottom-10 left-10 font-semibold"
        style={{}}
      >
        <div>
          <label>
            Star Size: {starSize.toFixed(1)}
            <input
              type="range"
              min="2"
              max="3"
              step="0.1"
              value={starSize}
              onChange={(e) => updateStarSize(parseFloat(e.target.value))}
              className="range bg-gray-700 bg-opacity-30"
            />
          </label>
        </div>
        <div>
          <label>
            Planet Size: {planetSize.toFixed(1)}
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={planetSize}
              className="range bg-gray-700 bg-opacity-30"
              onChange={(e) => updatePlanetSize(parseFloat(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            Star Mass: {starMass.toFixed(1)}
            <input
              type="range"
              min="2"
              max="3.5"
              step="0.1"
              className="range bg-gray-700 bg-opacity-30"
              value={starMass}
              onChange={(e) => updateStarMass(parseFloat(e.target.value))}
            />
          </label>
        </div>
        <div>
          <label>
            Planet Mass: {planetMass.toFixed(1)}
            <input
              type="range"
              min="0.5"
              max="1.4"
              step="0.1"
              className="range bg-gray-700 bg-opacity-30"
              value={planetMass}
              onChange={(e) => updatePlanetMass(parseFloat(e.target.value))}
            />
          </label>
        </div>
      </div>
      <div className="h-screen absolute top-0 right-10 flex justify-end items-center">
        <div className="bg-slate-800 p-2 rounded-xl bg-opacity-50">
          <div className="flex justify-center text-slate-200 text-xl">
            Light Spectrum (Doppler Shift)
          </div>
          <LightSpectrum shiftFactor={shiftFactor} maxShift={maxShift} />
        </div>
      </div>
    </div>
  );
}
